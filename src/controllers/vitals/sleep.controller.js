const prisma = require('../../config/prisma')
exports.createSleep = async (req, res) => {
  const data = req.body;

  const record = await prisma.sleepSession.create({ data });
  res.status(201).json(record);
};

exports.getSleepHistory = async (req, res) => {
  const { deviceId } = req.query;

  const data = await prisma.sleepSession.findMany({
    where: { deviceId },
    orderBy: { startTime: "desc" }
  });

  res.json(data);
};
