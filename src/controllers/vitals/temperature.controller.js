const prisma = require('../../config/prisma')

exports.createTemperature = async (req, res) => {
  const { deviceId, value } = req.body;

  if (!deviceId || value == null)
    return res.status(400).json({ message: "Invalid data" });

  const record = await prisma.temperature.create({
    data: { deviceId, value }
  });

  res.status(201).json(record);
};

exports.getTemperatureHistory = async (req, res) => {
  const { deviceId } = req.query;

  const data = await prisma.temperature.findMany({
    where: { deviceId },
    orderBy: { createdAt: "asc" }
  });

  res.json(data);
};
