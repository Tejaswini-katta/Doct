const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  registerDoctor,
  getAllDoctors,
  getAppointments,
  bookAppointment,
  getUserData
} = require("../controllers/userController");

const router = express.Router();

// Auth routes (no token required)
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes (token required)
router.post("/registerdoc", verifyToken, registerDoctor);
router.get("/getalldoctorsu", verifyToken, getAllDoctors);
router.get("/getuserappointments", verifyToken, getAppointments);
router.post("/getappointment", verifyToken, bookAppointment); // <-- FormData handled in controller
router.post("/getuserdata", verifyToken, getUserData);

module.exports = router;
