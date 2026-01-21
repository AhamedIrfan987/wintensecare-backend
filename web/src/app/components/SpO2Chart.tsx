"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  Legend,
} from "recharts";
import { Box, CircularProgress, Typography } from "@mui/material";

export type SpO2Point = {
  ts: string;
  avg: number;
  min: number;
  max: number;
  drops: number;
};

function formatXAxis(ts: string, range: string) {
  const d = new Date(ts);

  if (range === "7d") {
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  }

  if (range === "1d" || range === "8h") {
    return d.toLocaleTimeString([], { hour: "2-digit" });
  }

  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}


export default function SpO2Chart({
  pointsspo2,
  loading,
  range,
  showMin = false,
}: {
  pointsspo2: SpO2Point[];
  loading: boolean;
  range: "30m" | "1h" | "8h" | "1d" | "7d";
  showMin?: boolean;
}) {
  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <Box
        sx={{
          height: 280,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={28} />
      </Box>
    );
  }

  /* ---------- EMPTY ---------- */
  if (!pointsspo2.length) {
    return (
      <Box
        sx={{
          height: 280,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography fontSize={13} color="text.secondary" align="center">
          Collecting SpO₂ data.<br />
          Wear the device for a few minutes to see trends.
        </Typography>
      </Box>
    );
  }

  /* ---------- CHART ---------- */
  return (
    <Box sx={{ height: 280, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={pointsspo2}>
            <Legend
  verticalAlign="top"
  align="right"
  iconType="line"
  formatter={(value) =>
    value === "avg" ? "Average SpO₂" : "Lowest SpO₂"
  }
/>

          <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />

          <XAxis
            dataKey="ts"
            tickFormatter={(v) => formatXAxis(v, range)}
            stroke="#64748b"
            tick={{ fontSize: 12 }}
            minTickGap={20}
          />

     <YAxis
  domain={[80, 100]}
  tickCount={6}
  tick={{ fontSize: 12 }}
/>

          {/* NORMAL & WARNING LEVELS */}
          <ReferenceLine y={95} stroke="#22c55e" strokeDasharray="4 4" />
          <ReferenceLine y={90} stroke="#f97316" strokeDasharray="4 4" />

          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const p = payload[0].payload as SpO2Point;

            return (
  <Box sx={{ p: 1, bgcolor: "white", borderRadius: 1 }}>
    <Typography fontSize={12}>
      {new Date(p.ts).toLocaleString()}
    </Typography>

    <Typography fontSize={12}>Avg: {p.avg}%</Typography>
    <Typography fontSize={12}>Min: {p.min}%</Typography>
    <Typography fontSize={12}>Max: {p.max}%</Typography>

    <Typography
      fontSize={11}
      color="text.secondary"
      sx={{ mt: 0.5 }}
    >
      Normal ≥ 95% · Low &lt; 90%
    </Typography>

    {p.drops > 0 && (
      <Typography fontSize={12} color="error">
        Drops detected
      </Typography>
    )}
  </Box>
);

            }}
          />

          <Line
            type="monotone"
            dataKey="avg"
            stroke="#0ea5e9"
            strokeWidth={3}
            dot={false}
            isAnimationActive={false}
          />

          {showMin && (
            <Line
              type="monotone"
              dataKey="min"
              stroke="#f97316"
              strokeWidth={1.5}
              dot={false}
              isAnimationActive={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
