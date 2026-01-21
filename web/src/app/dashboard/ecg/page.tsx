"use client";

import { useEffect, useState } from "react";
import Protected from "@/lib/api/protected";
import { api } from "@/lib/api/api";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { Activity } from "lucide-react";


type ECGSession = {
  id: string;
  samplingRate: number;
  durationMs: number;
  createdAt: string;
};

export default function ECGPage() {
  const [data, setData] = useState<ECGSession[]>([]);
  const router = useRouter();

  useEffect(() => {
    const deviceId = localStorage.getItem("deviceId");
    if (!deviceId) return;

    api<ECGSession[]>(`/vitals/ecg?deviceId=${deviceId}`)
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <Protected>
     <Box
    sx={{
      minHeight: "100vh",
      bgcolor: "#ffffff",
      color: "#111827",
      p: 2,
    }}
  >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
  <Activity size={18} color="#0ea5e9" />
  <Typography
    sx={{
      fontSize: 18,
      fontWeight: 600,
      m: 0,
      lineHeight: 1,
    }}
  >
    Electrocardiogram (ECG) Sessions
  </Typography>
</Box>

        <Stack spacing={2} mt={2}>
          {data.map((ecg) => (
            <Box
              key={ecg.id}
              sx={{
                p: 2.5,
                borderRadius: 2,
                bgcolor: "#f9fafb",
                border: "1px solid #e5e7eb",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <Typography fontWeight={600} fontSize={15}>
  {new Date(ecg.createdAt).toLocaleString()}
</Typography>

<Typography fontSize={13} color="#6b7280">
  Duration: {ecg.durationMs} ms
</Typography>

<Typography fontSize={13} color="#6b7280">
  Sampling Rate: {ecg.samplingRate} Hz
</Typography>
<Typography fontSize={12} color="#16a34a">
  Lead I • 25 mm/s • 10 mm/mV
</Typography>


             <Button
  size="small"
  sx={{ mt: 1, fontWeight: 600 }}
  variant="contained"
  onClick={() => {
   sessionStorage.setItem(`ecg-${ecg.id}`, JSON.stringify(ecg));
    router.push(`/dashboard/ecg/${ecg.id}`);
  }}
>
  View Waveform →
</Button>

            </Box>
          ))}
        </Stack>
      </Box>
    </Protected>
  );
}


