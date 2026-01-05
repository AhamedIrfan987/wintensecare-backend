"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type Point = {
  ts: string;
  heartRate: number;
};

export default function HeartRateChart({ points }: { points: Point[] }) {
  const data = {
    labels: points.map((p) =>
      new Date(p.ts).toLocaleTimeString()
    ),
    datasets: [
      {
        label: "Heart Rate (bpm)",
        data: points.map((p) => p.heartRate),
        borderColor: "#ff5252",
        backgroundColor: "rgba(255,82,82,0.2)",
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 🔥 KEY FIX
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: { color: "#aaa" },
      },
      y: {
        ticks: { color: "#aaa" },
      },
    },
  };

  return (
    <div style={{ height: "100%" }}>
      <Line data={data} options={options} />
    </div>
  );
}
