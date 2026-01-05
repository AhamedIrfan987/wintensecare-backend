"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api/api";
import { Box, Button, Stack, Typography } from "@mui/material";

/* ================= TYPES ================= */

type TelemetryPoint = {
  ts: string;
  steps: number;
};

type TelemetryResponse = {
  range: string;
  points: TelemetryPoint[];
   summary: {
    steps: number;
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

export default function StepsPage() {
  const [range, setRange] = useState<Range>("1h");
  const [data, setData] = useState<TelemetryResponse | null>(null);

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
        console.error("Failed to load steps", e);
      }
    }

    load();
  }, [range]);

  const points = data?.points ?? [];

  const totalSteps = data?.summary.steps ?? 0;

  const latestTime =
    points.length > 0
      ? new Date(points[points.length - 1].ts).toLocaleTimeString()
      : "--";

  /* ===== CIRCLE CALC ===== */
  const radius = 90;
  const stroke = 10;
  const circumference = 2 * Math.PI * radius;

  // Assume 10,000 steps = full circle (you can change this)
  const maxSteps = 12000;
  const progress = Math.min(totalSteps / maxSteps, 1);
  const offset = circumference * (1 - progress);
  const distanceKm = Number((totalSteps * 0.0008).toFixed(2));
  


  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0f3c46",
        color: "#fff",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* ================= HEADER ================= */}
      <Typography variant="h6" mb={1}>
        🚶 Steps
      </Typography>

      {/* ================= RANGE SELECTOR ================= */}
      <Stack direction="row" spacing={1} mb={3}>
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

      {/* ================= CIRCULAR GRAPH ================= */}
      <Box
        sx={{
          position: "relative",
          width: 220,
          height: 220,
        }}
      >
        <svg width="220" height="220">
          {/* BACKGROUND CIRCLE */}
          <circle
            cx="110"
            cy="110"
            r={radius}
            stroke="#1e5a66"
            strokeWidth={stroke}
            fill="none"
          />

          {/* PROGRESS CIRCLE */}
          <circle
            cx="110"
            cy="110"
            r={radius}
            stroke="#4caf50"
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 110 110)"
          />
        </svg>

        {/* ================= CENTER CONTENT ================= */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography fontSize={26} fontWeight={700}>
            {totalSteps}
          </Typography>

          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            steps
          </Typography>

           <Typography
             fontSize={14}
             fontWeight={600}
             sx={{ mt: 0.5, color: "#4caf50" }}
           >
            {distanceKm} km
           </Typography>

          <Typography
            variant="caption"
            sx={{ opacity: 0.6, mt: 1 }}
          >
            {latestTime}
          </Typography>
        </Box>
      </Box>

      {/* ================= FOOT NOTE ================= */}
      <Typography
        variant="caption"
        sx={{ opacity: 0.6, mt: 3 }}
      >
        Progress based on {maxSteps.toLocaleString()} steps
      </Typography>
    </Box>
  );
}
