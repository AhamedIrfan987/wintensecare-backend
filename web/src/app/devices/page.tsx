"use client";

import { useEffect, useState } from "react";
import Protected from "@/lib/api/protected";
import { getDevices, addDevice, Device } from "@/lib/api/devices";
import { useRouter } from "next/navigation";

export default function Devices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function loadDevices() {
      try {
        const res = await getDevices();
        setDevices(res);
      } catch (err) {
        console.error("Failed to load devices", err);
      }
    }

    loadDevices();
  }, []);

  async function handleAddDevice() {
    try {
      const res = await addDevice({
        name: "My Watch",
        type: "ANDROID_WEARABLE",
      });

      localStorage.setItem("deviceId", res.id);
      router.replace("/dashboard");
    } catch (err) {
      console.error("Failed to add device", err);
    }
  }

  function selectDevice(deviceId: string) {
    localStorage.setItem("deviceId", deviceId);
    router.replace("/dashboard");
  }

  return (
    <Protected>
      <h1>Select Device</h1>

      {devices.length === 0 && (
        <>
          <p>No devices found</p>
          <button onClick={handleAddDevice}>+ Add Device</button>
        </>
      )}

      <ul>
        {devices.map((d) => (
          <li key={d.id}>
            <button onClick={() => selectDevice(d.id)}>
              {d.name}
            </button>
          </li>
        ))}
      </ul>
    </Protected>
  );
}





