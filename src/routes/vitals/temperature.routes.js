import { Router } from "express";
const router = Router();

import { authMiddleware } from "../middlewares/auth.middleware.js";

import { createTemperature, getTemperatureHistory } from "../../controllers/vitals/temperature.controller.js";

router.post("/temperature", auth, createTemperature);
router.get("/temperature", auth, getTemperatureHistory);

export default router;
