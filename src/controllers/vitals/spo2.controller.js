import prisma from "../../config/prisma.js";

export const ingestSpO2 = async (req, res) => {
  try {
    const { deviceId, value, perfusion } = req.body;

    if (!deviceId || value == null) {
      return res.status(400).json({ error: "Missing data" });
    }

    if (value < 50 || value > 100) {
      return res.status(400).json({ error: "Invalid SpO2 value" });
    }

    await prisma.spO2Sample.create({
      data: {
        deviceId,
        value,
        perfusion
      }
    });

    res.json({ success: true });
  } catch (err) {
    console.error("SpO2 error:", err);
    res.status(500).json({ error: "Internal error" });
  }
};
export const getSpO2Raw = async (req, res) => {
  try {
    const { deviceId, minutes = 10 } = req.query;

    const since = new Date(Date.now() - minutes * 60 * 1000);

    const data = await prisma.spO2Sample.findMany({
      where: {
        deviceId,
        createdAt: { gte: since }
      },
      orderBy: { createdAt: "desc" }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getSpO2Summary = async (req, res) => {
  try {
    const { deviceId } = req.query;

    const data = await prisma.spO2Summary.findMany({
      where: { deviceId },
      orderBy: { createdAt: "desc" },
      take: 10
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
