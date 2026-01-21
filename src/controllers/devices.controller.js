import prisma from '../config/prisma.js';

export async function createDevice(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Device name required' });
  }

  const device = await prisma.device.create({
    data: {
      name,
      type: 'Wearable_device',
      userId: req.user.id,
    },
  });

  return res.status(201).json(device);
}

export async function getDevices(req, res) {
  const devices = await prisma.device.findMany({
    where: { userId: req.user.id },
  });

  return res.json(devices);
}

export async function deleteDevice(req, res) {
  const { id } = req.params;

  const device = await prisma.device.findFirst({
    where: { id, userId: req.user.id },
  });

  if (!device) {
    return res.status(404).json({ message: 'Device not found' });
  }

  await prisma.device.delete({
    where: { id },
  });

  return res.json({ message: 'Device removed' });
}
