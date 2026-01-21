"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api/api";
import { clearToken } from "@/lib/api/auth";
import type {
  User,
  Device,
  TelemetryItem,
  LatestTelemetry,
  Alert,
  ECGSession,
} from "@/types/dashboard";
import { getLatestTelemetry } from "@/lib/utils/getLatestTelemetry";

export function useDashboard() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [device, setDevice] = useState<Device | null>(null);
  const [latestTelemetry, setLatestTelemetry] =
    useState<LatestTelemetry | null>(null);
  const [dailySteps, setDailySteps] = useState<number | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuView, setMenuView] = useState<"user" | "device">("user");
  const [avgHeartRate1h, setAvgHeartRate1h] = useState<number | null>(null);
  const [currentECG, setCurrentECG] = useState<number | null>(null);
  const [latestECGTime, setLatestECGTime] = useState<string | null>(null);

  // deviceId debug
  useEffect(() => {
    const did = typeof window !== "undefined" && localStorage.getItem("deviceId");
    if (!did) {
      console.warn("⚠️ deviceId missing – dashboard will be empty");
    } else {
      console.log("✅ deviceId found:", did);
    }
  }, []);

  // clock
  const [currentTime, setCurrentTime] = useState<string>(() =>
    new Date().toLocaleTimeString()
  );
  useEffect(() => {
    const t = setInterval(
      () => setCurrentTime(new Date().toLocaleTimeString()),
      1000
    );
    return () => clearInterval(t);
  }, []);
  const currentDate = new Date().toLocaleDateString();

  // init
  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const me = await api<User>("/users/me");
        if (!mounted) return;
        setUser(me);

        const devices = await api<Device[]>("/devices");

        // read stored deviceId
        let did = typeof window !== "undefined" && localStorage.getItem("deviceId");

        // no devices
        if (devices.length === 0) {
          console.warn("⚠️ No devices found for this user");
          setDevice(null);
          setLatestTelemetry(null);
          return;
        }

        // choose device if missing or invalid
        const deviceExists = devices.some((d) => d.id === did);

        if (!did || !deviceExists) {
          did = devices[0].id;
          localStorage.setItem("deviceId", did);
        }

        const selectedDevice = devices.find((d) => d.id === did) || null;
        setDevice(selectedDevice);

        if (did) {
          const history = await api<TelemetryItem[]>(
            `/telemetry?deviceId=${did}`
          );
          const latest = getLatestTelemetry(history);
          setLatestTelemetry(latest as LatestTelemetry | null);

          const hrSummary = await api<{
            summary: { avgHeartRate: number };
          }>(`/telemetry/history?deviceId=${did}&range=1h`);
          setAvgHeartRate1h(hrSummary.summary.avgHeartRate);

          const stepsRes = await api<{ summary: { steps: number } }>(
            `/telemetry/history?deviceId=${did}&range=1d`
          );
          setDailySteps(stepsRes.summary.steps);
        }

        const ecgSessions = await api<ECGSession[]>(
          `/vitals/ecg?deviceId=${did}`
        );

        const latestECG = ecgSessions
          .slice()
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          .at(-1);
        const latestValue = latestECG?.signal.at(-1);

        setCurrentECG(latestValue ?? null);
        setLatestECGTime(latestECG?.createdAt ?? null);

        const alertsRes = await api<Alert[]>("/alerts");
        setAlerts(alertsRes);
      } catch (err) {
        clearToken();
        router.replace("/login");
      }
    }

    init();

    return () => {
      mounted = false;
    };
  }, [router]);

  // refresh function (exposed and used by interval)
  const refreshLiveData = useCallback(
    async (did: string) => {
      try {
        const history = await api<TelemetryItem[]>(
          `/telemetry?deviceId=${did}`
        );
        const latest = getLatestTelemetry(history);
        setLatestTelemetry(latest as LatestTelemetry | null);

        const ecgSessions = await api<ECGSession[]>(
          `/vitals/ecg?deviceId=${did}`
        );

        const latestECG = ecgSessions
          .slice()
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          .at(-1);

        setCurrentECG(latestECG?.signal.at(-1) ?? null);
        setLatestECGTime(latestECG?.createdAt ?? null);

        const alertsRes = await api<Alert[]>("/alerts");

        setAlerts(
          alertsRes.filter((a) => !a.acknowledged && a.deviceId === did)
        );
      } catch (e: unknown) {
        if (e instanceof Error && e.message === "UNAUTHORIZED") {
          console.warn("Session expired – stopping refresh");
          return;
        }
        console.error("Live refresh failed", e);
      }
    },
    []
  );

  // interval refresh when device changes
  useEffect(() => {
    if (!device?.id) return;

    const t = setInterval(() => {
      refreshLiveData(device.id);
    }, 5000);

    return () => clearInterval(t);
  }, [device?.id, refreshLiveData]);

  // actions
  async function acknowledgeAlert(id: string) {
    await api(`/alerts/${id}/ack`, { method: "POST" });
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)));
  }

  async function logout() {
    try {
      await api("/auth/logout", { method: "POST" });
    } catch {}
    clearToken();
    if (typeof window !== "undefined") localStorage.removeItem("deviceId");

    // stop dashboard activity
    setDevice(null);
    setLatestTelemetry(null);
    setAlerts([]);

    router.replace("/login");
  }

  const activeAlerts = alerts.filter((a) => !a.acknowledged);
  const vitalAlerts = activeAlerts.filter(
    (a) => a.metric === "HEART_RATE" || a.metric === "BATTERY"
  );

  const unifiedMeasurementTime = (() => {
    const t1 = latestTelemetry?.createdAt ? new Date(latestTelemetry.createdAt).getTime() : 0;
    const t2 = latestECGTime ? new Date(latestECGTime).getTime() : 0;
    const latest = Math.max(t1, t2);
    return latest ? new Date(latest) : null;
  })();

  return {
    // state
    user,
    device,
    latestTelemetry,
    dailySteps,
    alerts,
    menuOpen,
    menuView,
    avgHeartRate1h,
    currentECG,
    latestECGTime,
    currentTime,
    currentDate,
    unifiedMeasurementTime,
    activeAlerts,
    vitalAlerts,
    // setters/actions
    setMenuOpen,
    setMenuView,
    acknowledgeAlert,
    logout,
    refreshLiveData,
    setDevice,
  } as const;
}