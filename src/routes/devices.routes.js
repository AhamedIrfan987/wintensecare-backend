const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const devicesController = require('../controllers/devices.controller');

console.log('DEVICES CONTROLLER:', devicesController);
console.log('AUTH MIDDLEWARE:', authMiddleware);

router.post('/', authMiddleware, devicesController.createDevice);
router.get('/', authMiddleware, devicesController.getDevices);
router.delete('/:id', authMiddleware, devicesController.deleteDevice);

module.exports = router;
