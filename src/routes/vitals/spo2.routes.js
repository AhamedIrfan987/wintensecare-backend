import express from "express";
import { ingestSpO2 } from "../../controllers/vitals/spo2.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Raw SpO2 data from watch / phone
router.post("/", authMiddleware, ingestSpO2);

export default router;
