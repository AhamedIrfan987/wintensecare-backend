"use client";
 
import React from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Tooltip,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  alpha,
  Stack,
  Chip,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
 
type HourlyPoint = { hour: string; steps: number };
type WeeklyPoint = { day: string; steps: number };
 
interface StepsChartProps {
  hourlyData: HourlyPoint[];
  weeklyData: WeeklyPoint[];
  maxHourly: number;
  maxWeekly: number;
  range: string; // "30m" | "1h" | "8h" | "1d" | "7d"
}
 
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
 
  return (
    <Box
      sx={{
        background: "white",
        p: 1.2,
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        border: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary" }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 800, color: "#22c55e" }}>
        {payload[0].value} steps
      </Typography>
    </Box>
  );
};
 
export default function StepsChart({
  hourlyData,
  weeklyData,
  maxHourly,
  maxWeekly,
  range,
}: StepsChartProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
 
  const isWeekly = range === "7d";
 
  // data + axis keys
  const chartData: (HourlyPoint | WeeklyPoint)[] = isWeekly ? weeklyData : hourlyData;
  const xKey: "hour" | "day" = isWeekly ? "day" : "hour";
  const maxY = isWeekly ? maxWeekly : maxHourly;
 
  // stats
  const totalSteps = chartData.reduce((sum, item) => sum + (Number(item.steps) || 0), 0);
  const avgSteps = chartData.length ? Math.round(totalSteps / chartData.length) : 0;
 
  const peakItem =
    chartData.length > 0
      ? chartData.reduce((max, item) => (item.steps > max.steps ? item : max))
      : null;
 
  // X-axis label formatting
  const formatXAxis = (value: string) => {
    if (isWeekly) return value; // Sun Mon Tue...
 
    // hourly labels: "00:00" -> "00", "13:00" -> "13"
    return value.split(":")[0];
  };
 
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
        background: theme.palette.background.paper,
        height: "100%",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Header */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1}
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {isWeekly ? "Weekly Step Distribution" : "Hourly Step Distribution"}
            </Typography>
 
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", gap: 0.6 }}
            >
              <AccessTimeIcon sx={{ fontSize: 14 }} />
              {isWeekly ? "Steps per day in the last 7 days" : "Steps per hour throughout the day"}
            </Typography>
          </Box>
 
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
            <Chip
              size="small"
              label={`Avg: ${avgSteps} steps/${isWeekly ? "day" : "hr"}`}
              color="primary"
              variant="outlined"
            />
            {peakItem && (
              <Chip
                size="small"
                label={`Peak: ${(peakItem as any)[xKey]} (${peakItem.steps})`}
                color="success"
                variant="outlined"
              />
            )}
          </Stack>
        </Stack>
 
        {/* Chart */}
        <Box sx={{ width: "100%", height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 8, right: 8, left: 0, bottom: 10 }}
              barCategoryGap={0}  // ✅ no space between bars
              barGap={0}          // ✅ no space between bars
            >
              {/* Apple watch style: remove heavy grid */}
              <CartesianGrid
                stroke={alpha(theme.palette.divider, 0.15)}
                strokeDasharray="3 3"
                vertical={false}
              />
 
              {/* X Axis visible */}
              <XAxis
                dataKey={xKey}
                tickFormatter={formatXAxis}
                stroke={alpha(theme.palette.text.secondary, 0.8)}
                tick={{ fontSize: isMobile ? 10 : 12 }}
                axisLine={false}
                tickLine={false}
                interval={0}
              />
 
              {/* Y axis hidden (Apple Watch style) */}
              <YAxis hide domain={[0, Math.ceil(maxY * 1.15)]} />
 
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
 
              {/* Gradient bars */}
              <defs>
                <linearGradient id="stepsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={1} />
                </linearGradient>
              </defs>
 
              <Bar
                dataKey="steps"
                fill="url(#stepsGradient)"
                radius={[14, 14, 0, 0]} // rounded top
                barSize={isWeekly ? 34 : 18}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill="url(#stepsGradient)"
                    stroke="transparent"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
 
        {/* Footer */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1}
          sx={{
            mt: 2,
            pt: 1.5,
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {isWeekly ? `Max: ${maxWeekly} steps/day` : `Max: ${maxHourly} steps/hr`}
          </Typography>
 
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <TrendingUpIcon sx={{ fontSize: 12 }} />
            Total: {totalSteps} steps
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
 