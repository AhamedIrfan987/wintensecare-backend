"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api/api";

export type SpO2Range = "30m" | "1h" | "8h" | "1d" | "7d";

export type SpO2Point = {
  ts: string;
  avg: number;
  min: number;
  max: number;
  drops: number;
};

export function useSpO2(defaultRange: SpO2Range = "1h") {
  const [rangeSpO2, setRangeSpO2] = useState<SpO2Range>(defaultRange);
  const [pointsspo2, setPointsspo2] = useState<SpO2Point[]>([]);
  const [resolution, setResolution] = useState<string>("5m");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setPointsspo2([]);

    api<{ points: SpO2Point[]; resolution: string }>(
      `/vitals/spo2/summary?deviceId=${deviceId}&range=${rangeSpO2}`
    )
      .then((res) => {
        setPointsspo2(res.points || []);
        setResolution(res.resolution || "5m");
      })
      .finally(() => setLoading(false));
  }, [rangeSpO2]);

  return {
    rangeSpO2,
    setRangeSpO2,
    pointsspo2,
    resolution,
    loading,
  };
}
