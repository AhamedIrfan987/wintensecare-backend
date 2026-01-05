"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ===== TYPES ===== */

export type TelemetryPoint = {
  ts: string;
  heartRate?: number;
  steps?: number;
  battery?: number;
};

type SimpleLineChartProps = {
  data: TelemetryPoint[];
  dataKey: "heartRate" | "steps" | "battery";
  color?: string;
};

/* ===== COMPONENT ===== */

export default function SimpleLineChart({
  data,
  dataKey,
  color = "#4fc3f7",
}: SimpleLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={100}>
      <LineChart data={data}>
        <XAxis dataKey="ts" hide />
        <YAxis hide />
        <Tooltip />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
