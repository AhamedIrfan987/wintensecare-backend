"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api/api";
import SimpleLineChart, {
  TelemetryPoint,
} from "@/app/components/SimpleLineChart";

/* ===== TYPES ===== */

type TelemetryResponse = {
  range: string;
  points: TelemetryPoint[];
  summary: {
    battery: number;
  };
};

/* ===== PAGE ===== */

export default function BatteryPage() {
  const [data, setData] = useState<TelemetryResponse | null>(null);

  useEffect(() => {
    const deviceId = localStorage.getItem("deviceId");
    if (!deviceId) return;

    api<TelemetryResponse>(
      `/telemetry/history?deviceId=${deviceId}&range=1h`
    ).then(setData);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>🔋 Battery History</h2>

      {data && (
        <>
          <p>Current Battery: {data.summary.battery}%</p>

          <SimpleLineChart
            data={data.points}
            dataKey="battery"
            color="#81c784"
          />
        </>
      )}
    </div>
  );
}
