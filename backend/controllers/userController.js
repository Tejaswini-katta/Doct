const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, password, isAdmin } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ success: false, message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword, isAdmin: isAdmin || false });
    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, "secretKey", { expiresIn: "1d" });

    res.status(200).json({ success: true, message: "Login successful", token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

// Get logged-in user data
exports.getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch user" });
  }
};

// Register Doctor
exports.registerDoctor = async (req, res) => {
  try {
    const newDoctor = new Doctor({ ...req.body.doctor, userId: req.body.userId });
    await newDoctor.save();

    const admin = await User.findOne({ isAdmin: true });
    if (admin) {
      admin.notification.push({
        type: "doctor-request",
        message: `${req.body.doctor.fullName} applied for doctor`,
      });
      await admin.save();
    }

    res.status(200).json({ success: true, message: "Doctor request sent" });
  } catch (error) {
    console.error("Register doctor error:", error);
    res.status(500).json({ success: false, message: "Error in doctor registration" });
  }
};

// Get All Approved Doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "approved" });
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    console.error("Fetch doctors error:", error);
    res.status(500).json({ success: false, message: "Error fetching doctors" });
  }
};

// Book Appointment
exports.bookAppointment = async (req, res) => {
  try {
    const {
      userId,
      doctorId,
      doctorName,   // ✅ Final field name
      patientName,
      date,
      time
    } = req.body;

    const appointment = new Appointment({
      userId,
      doctorId,
      doctorName,   // ✅ Save it properly
      patientName,
      date,
      time,
      status: "pending",
    });

    await appointment.save();
    res.status(200).json({ success: true, message: "Appointment requested", data: appointment });
  } catch (error) {
    console.error("Book appointment error:", error);
    res.status(500).json({ success: false, message: "Booking failed" });
  }
};

// Get Appointments for a User
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.query.userId });
    res.status(200).json({ success: true, data: appointments, message: "Appointments loaded" });
  } catch (error) {
    console.error("Fetch appointments error:", error);
    res.status(500).json({ success: false, message: "Could not fetch appointments" });
  }
};
