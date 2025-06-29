const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const {
  getDoctorAppointments,
  handleStatus
} = require("../controllers/doctorController");

const router = express.Router();

// ✅ Get all appointments for a logged-in doctor
router.get("/getdoctorappointments", verifyToken, getDoctorAppointments);

// ✅ Doctor handles appointment status (approve/reject)
router.post("/handlestatus", verifyToken, handleStatus);

module.exports = router;
