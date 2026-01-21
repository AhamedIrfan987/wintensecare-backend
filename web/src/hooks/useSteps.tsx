"use client";
 
import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api/api";
import type { TelemetryResponse, Range } from "@/types/steps";
import { getRangeMs } from "@/lib/utils/stepsUtils";
 
export function useSteps(initialRange: Range = "1h") {
  const [rangestep, setRangestep] = useState<Range>(initialRange);
  const [data, setData] = useState<TelemetryResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
 
  const load = useCallback(async () => {
    try {
      if (typeof window === "undefined") return;
 
      const deviceId = localStorage.getItem("deviceId");
      if (!deviceId) return;
 
      setLoading(true);
 
      // ✅ Your backend returns array from /telemetry
      const res = await api<any[]>(`/telemetry?deviceId=${deviceId}`);
 
      const now = Date.now();
      const windowMs = getRangeMs(rangestep);
 
      // ✅ Convert backend format -> frontend format
      let points = (res || [])
        .map((p) => ({
          ts: p.createdAt, // backend key
          steps: typeof p.steps === "number" ? p.steps : 0,
        }))
        .sort((a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime());
 
      // filter by selected range
      points =
        rangestep === "7d"
          ? points
          : points.filter((p) => new Date(p.ts).getTime() >= now - windowMs);
 
      const totalSteps = points.reduce((sum, p) => sum + p.steps, 0);
 
      setData({
        range: rangestep,
        points,
        summary: { steps: totalSteps },
      } as TelemetryResponse);
    } catch (e) {
      console.error("useSteps.load:", e);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [rangestep]);
 
  useEffect(() => {
    load();
    const timer = setInterval(load, 5000);
    return () => clearInterval(timer);
  }, [load]);
 
  const points = data?.points ?? [];
  const totalSteps = data?.summary?.steps ?? 0;
 
  const startTime =
    points.length > 0
      ? new Date(points[0].ts).toLocaleTimeString("en-GB", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      : "--";
 
  const endTime =
    points.length > 0
      ? new Date(points[points.length - 1].ts).toLocaleTimeString("en-GB", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      : "--";
 
  return {
    rangestep,
    setRangestep,
    data,
    points,
    totalSteps,
    loading,
    startTime,
    endTime,
  } as const;
}