import prisma from '../config/prisma.js';

export async function createTemperature(req, res) {
  const { deviceId, value } = req.body;

  if (!deviceId || value == null)
    return res.status(400).json({ message: "Invalid data" });

  const record = await temperature.create({
    data: { deviceId, value }
  });

  res.status(201).json(record);
}

export async function getTemperatureHistory(req, res) {
  const { deviceId } = req.query;

  const data = await temperature.findMany({
    where: { deviceId },
    orderBy: { createdAt: "asc" }
  });

  res.json(data);
}
