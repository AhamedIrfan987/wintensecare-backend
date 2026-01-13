
export const ingestSpO2 = async (req, res) => {
  try {
    const { deviceId, value, quality } = req.body;

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
        quality: quality ?? 100
      }
    });

    res.json({ success: true });
  } catch (err) {
    console.error("SpO2 error:", err);
    res.status(500).json({ error: "Internal error" });
  }
};
