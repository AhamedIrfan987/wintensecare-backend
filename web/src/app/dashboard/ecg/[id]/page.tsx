"use client";

import { useEffect, useState } from "react";
import Protected from "@/lib/api/protected";
import { api } from "@/lib/api/api";
import { Box, Typography, Button } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useParams } from "next/navigation";
import { Activity } from "lucide-react";


/* ================= TYPES ================= */

type ECGSession = {
  id: string;
  signal: number[];
  samplingRate: number;
  durationMs: number;
  createdAt: string;
};

type Point = {
  t: number; // time in milliseconds
  v: number; // voltage in mV
};

/* ================= PAGE ================= */

export default function ECGWaveformPage() {
  const { id } = useParams<{ id: string }>();
const WINDOW_MS = 6000; // 6 seconds ECG window

  const [fullData, setFullData] = useState<Point[]>([]);
  const [visibleData, setVisibleData] = useState<Point[]>([]);
  const [playing, setPlaying] = useState(false);
  const [meta, setMeta] = useState<ECGSession | null>(null);

  /* ================= FETCH ECG ================= */

  useEffect(() => {
    const deviceId = localStorage.getItem("deviceId");
    if (!deviceId || !id) return;

    api<ECGSession[]>(`/vitals/ecg?deviceId=${deviceId}`)
      .then((sessions) => {
        const session = sessions.find((s) => s.id === id);
        if (!session) return;

        // 👉 Convert to milliseconds (important)
        const points: Point[] = session.signal.map((v, i) => ({
          t: (i * 1000) / session.samplingRate,
          v,
        }));

        setMeta(session);
        setFullData(points);
        setVisibleData([]);
        setPlaying(true);
      })
      .catch((e) => console.error("ECG load failed", e));
  }, [id]);

  /* ================= PLAYBACK ================= */

  useEffect(() => {
    if (!playing || fullData.length === 0 || !meta) return;

    let index = 0;
    const intervalMs = 1000 / meta.samplingRate;

    const timer = setInterval(() => {
      index++;
      setVisibleData(fullData.slice(0, index));

      if (index >= fullData.length) {
        clearInterval(timer);
        setPlaying(false);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [playing, fullData, meta]);

  /* ================= UI ================= */

  return (
    <Protected>
      <Box sx={{ minHeight: "100vh", background: "#061a44", p: 3 }}>
        <Box
  sx={{
    display: "flex",
    alignItems: "center",
    gap: "2px",
    mb: 0.5,
  }}
>
  <Activity
    size={20}
    color="#22d3ee"
    style={{ marginBottom: 1 }} // aligns baseline
  />

  <Typography
    sx={{
      fontSize: 18,
      fontWeight: 600,
      lineHeight: 1,
      m: 0,               // ❗ removes default margin
      color: "#ffffff",
    }}
  >
    ECG Waveform
  </Typography>
</Box>


        {meta && (
          <Typography fontSize={12} color="#c7d2fe" mb={1}>
            Sampling: {meta.samplingRate} Hz · Duration: {meta.durationMs} ms ·
            Recorded at{" "}
            {new Date(meta.createdAt).toLocaleTimeString("en-GB", {
              hour12: false,
            })}
          </Typography>
        )}

        <Typography fontSize={12} color="#a5b4fc" mb={1}>
          {playing ? "Playing ECG signal…" : "Playback complete"}
        </Typography>

       <Box
  sx={{
    background: "linear-gradient(180deg, #0b1f4d, #061a44)",
    borderRadius: 3,
    p: 2,
    border: "2px solid #1e3a8a",
  }}
>
  {/* CHART + Y-AXIS LABEL */}
  <Box sx={{ display: "flex", alignItems: "center" }}>
    {/* Y AXIS LABEL */}
    <Typography
      fontSize={12}
      color="#93c5fd"
      sx={{
        transform: "rotate(-90deg)",
        mr: 1.5,
        whiteSpace: "nowrap",
      }}
    >
      Voltage (mV)
    </Typography>

    {/* ECG CHART */}
    <ResponsiveContainer width="100%" height={320}>
      <LineChart
        data={visibleData}
        margin={{ top: 10, right: 20, bottom: 10, left: 10 }}
      >
      {/* Small grid (1 mm) */}
<CartesianGrid stroke="#1e3a8a" strokeDasharray="1 4" />

{/* Big grid (5 mm) */}
<CartesianGrid stroke="#1e40af" vertical={false} />

<YAxis
  domain={[-2, 2]}
  tickCount={9}
  tickFormatter={(v) => `${v} mV`}
  stroke="#93c5fd"
  tick={{ fontSize: 12 }}
/>



        {/* VOLTAGE AXIS */}
        <YAxis
          domain={[-1, 1]}
          tickCount={5}
          stroke="#93c5fd"
          tick={{ fontSize: 12 }}
        />

        {/* ECG SIGNAL */}
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
  </Box>

  {/* X AXIS LABEL */}
  <Typography
    align="center"
    fontSize={12}
    color="#93c5fd"
    mt={1}
  >
    Time (milliseconds)
  </Typography>
</Box>


        {!playing && (
          <Button
            sx={{ mt: 2, color: "#93c5fd", borderColor: "#93c5fd" }}
            variant="outlined"
            onClick={() => {
              setVisibleData([]);
              setPlaying(true);
            }}
          >
            ▶ Replay ECG
          </Button>
        )}
      </Box>
    </Protected>
  );
}
