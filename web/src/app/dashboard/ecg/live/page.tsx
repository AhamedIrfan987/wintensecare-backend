"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Protected from "@/lib/api/protected";
import { api } from "@/lib/api/api";
import { Box, Typography, Stack, Paper } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { Activity, HeartPulse } from "lucide-react";

/* ================= TYPES ================= */

type ECGSession = {
  id: string;
  signal: number[];
  samplingRate: number;
  durationMs: number;
  createdAt: string;
};

type Point = {
  t: number; // seconds
  v: number; // mV
};

/* ================= CONFIG ================= */

const WINDOW_SECONDS = 8;          // visible ECG window
const POLL_INTERVAL = 3000;        // backend ECG arrival
const VOLTAGE_RANGE: [number, number] = [-2, 2];

/* ================= PAGE ================= */

export default function LiveECGMonitor() {
  const [points, setPoints] = useState<Point[]>([]);
  const lastSessionId = useRef<string | null>(null);
  const timeCursor = useRef(0);

  /* ================= POLL ECG ================= */

  useEffect(() => {
    const deviceId = localStorage.getItem("deviceId");
    if (!deviceId) return;

    async function poll() {
      try {
        const sessions = await api<ECGSession[]>(
          `/vitals/ecg?deviceId=${deviceId}`
        );

        const latest = sessions.at(-1);
        if (!latest || latest.id === lastSessionId.current) return;

        lastSessionId.current = latest.id;

        const newPoints: Point[] = latest.signal.map((v, i) => ({
          t: timeCursor.current + i / latest.samplingRate,
          v,
        }));

        timeCursor.current =
          newPoints[newPoints.length - 1].t;

        setPoints((prev) => [...prev, ...newPoints]);
      } catch (e) {
        console.error("ECG polling failed", e);
      }
    }

    poll();
    const t = setInterval(poll, POLL_INTERVAL);
    return () => clearInterval(t);
  }, []);

  /* ================= SLIDING WINDOW ================= */

  const visiblePoints = useMemo(() => {
    if (points.length === 0) return [];
    const latestT = points[points.length - 1].t;
    return points.filter((p) => p.t >= latestT - WINDOW_SECONDS);
  }, [points]);

  /* ================= SIMPLE ECG METRICS ================= */

  const heartRate = useMemo(() => {
    if (points.length < 2) return "--";
    return Math.round((60 * points.length) / WINDOW_SECONDS);
  }, [points]);

  /* ================= UI ================= */

  return (
    <Protected>
      <Box sx={{ minHeight: "100vh", bgcolor: "#081a33", p: 3 }}>
        {/* HEADER */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Activity color="#4ade80" />
          <Typography color="#fff" fontSize={18} fontWeight={600}>
            Electrocardiogram Monitor
          </Typography>
        </Stack>

        {/* ECG METRICS */}
        <Stack direction="row" spacing={2} mt={2}>
          <Metric label="Heart Rate" value={`${heartRate} bpm`} />
          <Metric label="PR Interval" value="— ms" />
          <Metric label="QT Interval" value="— ms" />
          <Metric label="QRS Duration" value="— ms" />
        </Stack>

        {/* ECG WAVEFORM */}
        <Paper
          sx={{
            mt: 3,
            p: 2,
            bgcolor: "#081a33",
            border: "1px solid #1e3a5f",
            borderRadius: 2,
          }}
        >
          <Typography color="#4ade80" fontSize={13} mb={1}>
            ● Live Signal
          </Typography>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={visiblePoints}>
              {/* MEDICAL GRID */}
           <CartesianGrid stroke="#1e3a8a" strokeDasharray="1 4" />
<CartesianGrid stroke="#1e40af" vertical={false} />


              <XAxis hide />
           <YAxis
  domain={[-2, 2]}
  tickCount={9}
  stroke="#94a3b8"
/>


              <ReferenceLine y={0} stroke="#64748b" />

           <Line
  type="linear"
  dataKey="v"
  stroke="#22d3ee"
  strokeWidth={2}
  dot={false}
  isAnimationActive={false}
/>

            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </Protected>
  );
}

/* ================= COMPONENT ================= */

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Paper
      sx={{
        px: 2,
        py: 1.5,
        bgcolor: "#0b2a4a",
        border: "1px solid #1e3a5f",
        borderRadius: 2,
        minWidth: 140,
      }}
    >
      <Typography fontSize={12} color="#94a3b8">
        {label}
      </Typography>
      <Typography
        fontSize={18}
        fontWeight={600}
        color="#4ade80"
      >
        {value}
      </Typography>
    </Paper>
  );
}
