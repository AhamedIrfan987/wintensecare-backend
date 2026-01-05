const prisma = require('../config/prisma');
const { evaluateAlerts } = require('../services/alert.service');


// ---------- CREATE TELEMETRY ----------
async function createTelemetry(req, res) {
  const { deviceId, heartRate, steps, battery } = req.body;

  if (!deviceId || heartRate == null || steps == null || battery == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const device = await prisma.device.findFirst({
    where: {
      id: deviceId,
      userId: req.user.id,
    },
  });

  if (!device) {
    return res.status(403).json({ message: 'Device not found or access denied' });
  }

  const telemetry = await prisma.telemetry.create({
    data: {
      deviceId,
      heartRate,
      steps,
      battery,
    },
  });
  await evaluateAlerts(deviceId, req.user.id);


  return res.status(201).json(telemetry);
}

// ---------- GET RAW TELEMETRY ----------
async function getTelemetry(req, res) {
  const { deviceId, limit = 50 } = req.query;

  if (!deviceId) {
    return res.status(400).json({ message: 'deviceId is required' });
  }

  const device = await prisma.device.findFirst({
    where: {
      id: deviceId,
      userId: req.user.id,
    },
  });

  if (!device) {
    return res.status(403).json({ message: 'Device not found or access denied' });
  }

  const telemetry = await prisma.telemetry.findMany({
    where: { deviceId },
    orderBy: { createdAt: 'desc' },
    take: Number(limit),
  });

  return res.json(telemetry);
}

// ---------- RANGE UTILITY ----------
function getRangeStart(range) {
  const now = new Date();

  switch (range) {
    case '30m':
      return new Date(now.getTime() - 30 * 60 * 1000);
    case '1h':
      return new Date(now.getTime() - 60 * 60 * 1000);
    case '8h':
      return new Date(now.getTime() - 8 * 60 * 60 * 1000);
    case '1d':
      return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    case '7d':
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    default:
      return null;
  }
}

// ---------- TELEMETRY HISTORY ----------
async function getTelemetryHistory(req, res) {
  const { deviceId, range } = req.query;

  if (!deviceId || !range) {
    return res.status(400).json({ message: 'deviceId and range are required' });
  }

  const startTime = getRangeStart(range);
  if (!startTime) {
    return res.status(400).json({ message: 'Invalid range value' });
  }

  const device = await prisma.device.findFirst({
    where: {
      id: deviceId,
      userId: req.user.id,
    },
  });

  if (!device) {
    return res.status(403).json({ message: 'Device not found or access denied' });
  }

  const telemetry = await prisma.telemetry.findMany({
    where: {
      deviceId,
      createdAt: { gte: startTime },
    },
    orderBy: { createdAt: 'asc' },
  });

  if (telemetry.length === 0) {
    return res.json({
      range,
      points: [],
      summary: {
        avgHeartRate: 0,
        maxHeartRate: 0,
        minHeartRate: 0,
        steps: 0,
        battery: null,
      },
    });
  }

  let hrSum = 0;
  let maxHr = telemetry[0].heartRate;
  let minHr = telemetry[0].heartRate;
  let totalSteps = 0;

  telemetry.forEach(t => {
    hrSum += t.heartRate;
    maxHr = Math.max(maxHr, t.heartRate);
    minHr = Math.min(minHr, t.heartRate);
    totalSteps += t.steps;
  });

  const avgHr = Math.round(hrSum / telemetry.length);
  const lastBattery = telemetry[telemetry.length - 1].battery;

  const points = telemetry.map(t => ({
    ts: t.createdAt,
    heartRate: t.heartRate,
  }));

  return res.json({
    range,
    points,
    summary: {
      avgHeartRate: avgHr,
      maxHeartRate: maxHr,
      minHeartRate: minHr,
      steps: totalSteps,
      battery: lastBattery,
    },
  });
}

// ---------- EXPORTS ----------
module.exports = {
  createTelemetry,
  getTelemetry,
  getTelemetryHistory,
};
