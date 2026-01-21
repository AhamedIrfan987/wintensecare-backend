import prisma from "../../config/prisma.js";
import { computeECGSummary } from "../../services/ecgSummary.service.js";

const { eCG, eCGSummary } = prisma;

export async function createECG(req, res) {
  try {
    console.log("BODY RECEIVED:", req.body);

    const { deviceId, signal, samplingRate, durationMs } = req.body;

    if (
      !deviceId ||
      !Array.isArray(signal) ||
      signal.length < 10 ||
      !samplingRate ||
      !durationMs
    ) {
      return res.status(400).json({ message: "Invalid ECG data" });
    }

    // 1️⃣ Save raw ECG
    await eCG.create({
      data: {
        deviceId,
        signal,
        samplingRate,
        durationMs,
      },
    });

    // 2️⃣ Compute summary
    const summary = computeECGSummary(signal, samplingRate);

    // 3️⃣ Save summary
    await eCGSummary.create({
      data: {
        deviceId,
        window: "1m",
        avgHR: summary.avgHR,
        minHR: summary.minHR,
        maxHR: summary.maxHR,
        rrVar: summary.rrVar,
        pvcCount: summary.pvcCount,
        quality: summary.quality,
      },
    });

    res.status(201).json({ message: "ECG stored & summarized" });
  } catch (err) {
    console.error("ECG error:", err);
    res.status(500).json({ message: "ECG failed", error: err.message });
  }
}

export async function getECGHistory(req, res) {
  try {
    const { deviceId, limit = 5 } = req.query;

    const data = await eCG.findMany({
      where: { deviceId },
      orderBy: { createdAt: "desc" },
      take: Number(limit),
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
}
