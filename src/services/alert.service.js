const prisma = require('../config/prisma');

/**
 * Evaluate alerts after telemetry insert
 */
async function evaluateAlerts(deviceId, userId) {
  // Fetch last 2 minutes telemetry
  const since = new Date(Date.now() - 2 * 60 * 1000);

  const telemetry = await prisma.telemetry.findMany({
    where: {
      deviceId,
      createdAt: { gte: since },
    },
    orderBy: { createdAt: 'asc' },
  });

  if (telemetry.length === 0) return;

  // ---- HEART RATE CHECK ----
  const avgHr =
    telemetry.reduce((sum, t) => sum + t.heartRate, 0) /
    telemetry.length;

  const steps = telemetry.reduce((sum, t) => sum + t.steps, 0);
  const lastBattery = telemetry[telemetry.length - 1].battery;

  // CRITICAL HR
  if (avgHr > 180 && steps < 20) {
    await createAlertOnce({
      userId,
      deviceId,
      metric: 'HEART_RATE',
      value: Math.round(avgHr),
      severity: 'CRITICAL',
      message: 'Sustained high heart rate detected',
    });
  }

  // WARNING HR
  else if (avgHr > 150) {
    await createAlertOnce({
      userId,
      deviceId,
      metric: 'HEART_RATE',
      value: Math.round(avgHr),
      severity: 'WARNING',
      message: 'Elevated heart rate detected',
    });
  }

  // ---- BATTERY CHECK ----
  if (lastBattery < 15) {
    await createAlertOnce({
      userId,
      deviceId,
      metric: 'BATTERY',
      value: lastBattery,
      severity: 'WARNING',
      message: 'Device battery is low',
    });
  }
}

/**
 * Prevent duplicate open alerts
 */
async function createAlertOnce(data) {
  const existing = await prisma.alert.findFirst({
    where: {
      deviceId: data.deviceId,
      metric: data.metric,
      severity: data.severity,
      acknowledged: false,
    },
  });

  if (existing) return;

  await prisma.alert.create({ data });
}

module.exports = {
  evaluateAlerts,
};
