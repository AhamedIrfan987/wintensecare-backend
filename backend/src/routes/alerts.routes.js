const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const alertsController = require('../controllers/alerts.controller');

router.get('/', authMiddleware, alertsController.getAlerts);
router.post('/:id/ack', authMiddleware, alertsController.acknowledgeAlert);

module.exports = router;
