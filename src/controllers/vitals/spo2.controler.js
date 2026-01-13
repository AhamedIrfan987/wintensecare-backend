const prisma = require('../../config/prisma')

exports.createSpO2 = async (req, res) => {
   
    

  const { deviceId, value } = req.body;

  if (!deviceId || value == null)
    return res.status(400).json({ message: "Invalid data" });

  const record = await prisma.spO2.create({
    data: { deviceId, value }
  });

  res.status(201).json(record);
};

exports.getSpO2History = async (req, res) => {
  const { deviceId } = req.query;

  const data = await prisma.spO2.findMany({
    where: { deviceId },
    orderBy: { createdAt: "asc" }
  });

  res.json(data);
};
