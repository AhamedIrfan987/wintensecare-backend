import prisma from "../prisma.js";

export async function aggregateSpO2() {
  const devices = await prisma.device.findMany();

  for (const d of devices) {
    const since = new Date(Date.now() - 60_000);

    const samples = await prisma.spO2Sample.findMany({
      where: { deviceId: d.id, createdAt: { gte: since } }
    });

    if (samples.length < 5) continue;

    const values = samples.map(s => s.value);
    const avg = Math.round(values.reduce((a,b)=>a+b,0) / values.length);

    await prisma.spO2Minute.upsert({
      where: {
        deviceId_createdAt: {
          deviceId: d.id,
          createdAt: new Date(new Date().setSeconds(0,0))
        }
      },
      update: {},
      create: {
        deviceId: d.id,
        avgSpO2: avg,
        minSpO2: Math.min(...values),
        maxSpO2: Math.max(...values),
        samples: samples.length,
        quality: Math.round(samples.reduce((a,b)=>a+b.quality,0)/samples.length),
        createdAt: new Date(new Date().setSeconds(0,0))
      }
    });

    // 🚨 ALERT
    if (avg < 90) {
      await prisma.alert.create({
        data: {
          deviceId: d.id,
          userId: d.userId,
          metric: "SPO2",
          value: avg,
          severity: avg < 85 ? "CRITICAL" : "WARNING",
          message: `Low oxygen level: ${avg}%`
        }
      });
    }
  }
}
