const express = require("express");
const router = express.Router();

const auth = require("../../middlewares/auth.middleware")
const {
  createSleep,
  getSleepHistory
} = require("../../controllers/vitals/sleep.controller");

router.post("/sleep", auth, createSleep);
router.get("/sleep", auth, getSleepHistory);

module.exports = router;
