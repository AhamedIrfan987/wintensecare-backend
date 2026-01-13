const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');

const telemetryController = require('../controllers/telemetry.controller');



router.post('/', authMiddleware, telemetryController.createTelemetry);
router.get('/', authMiddleware, telemetryController.getTelemetry);
router.get('/history', authMiddleware, telemetryController.getTelemetryHistory);



module.exports = router;
