const prisma = require('../config/prisma');

exports.evaluateSpO2Alerts = async (userId, deviceId, spo2) => {
  if (spo2 < 85) {
    await prisma.alert.create({
      data: {
        userId,
        deviceId,
        metric: "SPO2",
        value: spo2,
        severity: "CRITICAL",
        message: "Dangerously low blood oxygen detected"
      }
    });
  }
  else if (spo2 < 90) {
    await prisma.alert.create({
      data: {
        userId,
        deviceId,
        metric: "SPO2",
        value: spo2,
        severity: "WARNING",
        message: "Low blood oxygen detected"
      }
    });
  }
};
