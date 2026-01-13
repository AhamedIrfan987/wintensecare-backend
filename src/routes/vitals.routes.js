const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const spo2 = require("../controllers/vitals/spo2.controller");
const ecg = require("../controllers/vitals/ecg.controller");

// ECG
router.post("/ecg", auth, ecg.createECG);
router.get("/ecg", auth, ecg.getECGHistory);



module.exports = router;
