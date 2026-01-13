const express = require("express");
const router = express.Router();

const auth = require("../../middlewares/auth.middleware")
const {
  createTemperature,
  getTemperatureHistory
} = require("../../controllers/vitals/temperature.controller")

router.post("/temperature", auth, createTemperature);
router.get("/temperature", auth, getTemperatureHistory);

module.exports = router;
