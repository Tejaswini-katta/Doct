const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const {
  getAllUsers,
  getAllDoctors,
  approveDoctor,
  rejectDoctor,
  getAppointments,
  approveAppointment,
  rejectAppointment
} = require("../controllers/adminController");

const router = express.Router();

router.get("/getallusers", verifyToken, getAllUsers);
router.get("/getalldoctors", verifyToken, getAllDoctors);
router.post("/getapprove", verifyToken, approveDoctor);
router.post("/getreject", verifyToken, rejectDoctor);
router.get("/getappointments", verifyToken, getAppointments);
router.post("/approve-appointment", verifyToken, approveAppointment);
router.post("/reject-appointment", verifyToken, rejectAppointment);

module.exports = router;
