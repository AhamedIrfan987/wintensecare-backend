"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api/api";
import type {
  TelemetryPoint,
  TelemetryResponse,
  Alert,
  Range,
} from "@/types/heart";
import { getRangeMs } from "@/lib/utils/range";

/* Hook: encapsulates fetching, polling, and derived values */
export function useHeartRate(initialRange: Range = "1h") {
  const [range, setRange] = useState<Range>(initialRange);
  const [data, setData] = useState<TelemetryResponse | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const load = useCallback(async () => {
    try {
      if (typeof window === "undefined") return;

      const deviceId = localStorage.getItem("deviceId");
      if (!deviceId) return;

      const res = await api<TelemetryResponse>(
        `/telemetry/history?deviceId=${deviceId}&range=${range}`
      );

      const now = Date.now();
      const windowMs = getRangeMs(range);

      const filteredPoints: TelemetryPoint[] = (res.points || [])
        .map((p) => ({ ...p, ts: new Date(p.ts).getTime() }))
        .filter((p) => p.ts >= now - windowMs)
        .sort((a, b) => a.ts - b.ts);

      setData({
        ...res,
        points: filteredPoints,
      });

      const alertsRes = await api<Alert[]>("/alerts");
      setAlerts(alertsRes);
    } catch (e) {
      // keep simple: log error, UI shows empty state
      // caller may want to show an error toast
      // console.error("useHeartRate.load:", e);
    }
  }, [range]);

  useEffect(() => {
    // initial load + polling
    let timer: ReturnType<typeof setInterval> | undefined;
    let mounted = true;

    if (mounted) {
      load();
      timer = setInterval(load, 5000);
    }

    return () => {
      mounted = false;
      if (timer) clearInterval(timer);
    };
  }, [load, range]);

  const latest = data && data.points && data.points.length > 0 ? data.points[data.points.length - 1] : undefined;

  const criticalAlertTimes = alerts
    ?.filter((a) => a.severity === "CRITICAL")
    .map((a) => new Date(a.createdAt).getTime()) ?? [];

  return {
    // state
    range,
    data,
    alerts,
    latest,
    criticalAlertTimes,
    // actions
    setRange,
    reload: load,
  } as const;
}