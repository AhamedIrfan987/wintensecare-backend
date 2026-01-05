"use client";

import { useEffect, useState } from "react";
import Protected from "@/lib/api/protected";
import { api } from "@/lib/api/api";
import {
  Box,
  Button,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ================= TYPES ================= */

type TelemetryPoint = {
  ts: string; // 👈 backend field
  heartRate: number;
};

type TelemetryResponse = {
  range: string;
  points: TelemetryPoint[];
  summary: {
    minHeartRate: number;
    avgHeartRate: number;
    maxHeartRate: number;
   
  };
};

/* ================= RANGES ================= */

const ranges = [
  { label: "30M", value: "30m" },
  { label: "1H", value: "1h" },
  { label: "8H", value: "8h" },
  { label: "1D", value: "1d" },
  { label: "1W", value: "7d" },
] as const;

type Range = (typeof ranges)[number]["value"];

/* ================= PAGE ================= */

export default function HeartRatePage() {
  const [range, setRange] = useState<Range>("1h");
  const [data, setData] = useState<TelemetryResponse | null>(null);

  /* ===== FETCH TELEMETRY ===== */
  useEffect(() => {
    const deviceId = localStorage.getItem("deviceId");
    if (!deviceId) return;

    async function load() {
      try {
        const res = await api<TelemetryResponse>(
          `/telemetry/history?deviceId=${deviceId}&range=${range}`
        );
        setData(res);
      } catch (e) {
        console.error("Failed to load heart rate data", e);
      }
    }

    load();
  }, [range]);

  const latest = data?.points.at(-1);

  const telemetryTime = latest
  ? new Date(latest.ts).toLocaleTimeString()
  : "--";


  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#ffffff",
        color: "#111827",
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ================= HEADER ================= */}
      <Typography variant="h6" mb={1}>
        ❤️ Heart Rate
      </Typography>

      {/* ================= RANGE SELECTOR ================= */}
      <Stack direction="row" spacing={1} mb={1}>
        {ranges.map((r) => (
          <Button
            key={r.value}
            size="small"
            variant={range === r.value ? "contained" : "outlined"}
            onClick={() => setRange(r.value)}
          >
            {r.label}
          </Button>
        ))}
      </Stack>

      {/* ================= SUMMARY ================= */}
      {data && (
        <Stack direction="row" spacing={3} mb={1}>
          <Summary label="Min" value={data.summary.minHeartRate} unit="bpm" />
          <Summary label="Avg" value={data.summary.avgHeartRate} unit="bpm" />
          <Summary label="Max" value={data.summary.maxHeartRate} unit="bpm" />
        </Stack>
      )}

      <Divider sx={{ my: 1, borderColor: "#1e5a66" }} />

      {/* ================= CURRENT HR + TIME ================= */}
      <Stack direction="row" spacing={3} mb={1}>
        <Summary label="Current HR" value={latest?.heartRate} unit="bpm" />

        <Box>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            Time
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {latest
              ? new Date(latest.ts).toLocaleTimeString()
              : "--"}
          </Typography>
        </Box>
      </Stack>
      

      {/* ================= CHART ================= */}
      <Box sx={{ flex: 1, bgcolor: "#f9fafb", borderRadius: 2, p: 1 }}>
        <Typography variant="caption">Heart Rate Over Time</Typography>

        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data?.points || []}>
            <XAxis
              dataKey="ts"
              tickFormatter={(t) =>
                new Date(t).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
              stroke="#aaa"
            />

            <YAxis stroke="#aaa" />

           <Tooltip
  labelFormatter={(t) => new Date(t as string).toLocaleString()}
  formatter={(value: number | undefined) => [
    value !== undefined ? `${value} bpm` : "--",
    "Heart Rate",
  ]}
/>


            {/* MAIN HEART RATE */}
            <Line
              type="monotone"
              dataKey="heartRate"
              stroke="#ff5252"
              strokeWidth={2}
              dot={false}
            />

            {/* MIN */}
            {data && (
              <Line
                type="monotone"
                dataKey={() => data.summary.minHeartRate}
                stroke="#4caf50"
                strokeDasharray="4 4"
                dot={false}
              />
            )}

            {/* AVG */}
            {data && (
              <Line
                type="monotone"
                dataKey={() => data.summary.avgHeartRate}
                stroke="#ffeb3b"
                strokeDasharray="4 4"
                dot={false}
              />
            )}

            {/* MAX */}
            {data && (
              <Line
                type="monotone"
                dataKey={() => data.summary.maxHeartRate}
                stroke="#2196f3"
                strokeDasharray="4 4"
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

/* ================= COMPONENT ================= */

function Summary({
  label,
  value,
  unit,
}: {
  label: string;
  value?: number;
  unit?: string;
}) {
   return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography fontWeight={600}>
        {value ?? "--"} {unit}
      </Typography>
    </Box>
  );
}
