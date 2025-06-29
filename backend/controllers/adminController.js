const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const Appointment = require("../models/appointmentModel");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error getting users" });
  }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error getting doctors" });
  }
};

// Approve doctor
exports.approveDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.body.doctorId, { status: "approved" });
    const user = await User.findById(doctor.userId);

    user.isDoctor = true;
    user.notification.push({ message: "Your doctor request is approved" });
    await user.save();

    res.status(200).json({ success: true, message: "Doctor approved" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to approve doctor" });
  }
};

// Reject doctor
exports.rejectDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.body.doctorId, { status: "rejected" });
    const user = await User.findById(doctor.userId);

    user.notification.push({ message: "Your doctor request was rejected" });
    await user.save();

    res.status(200).json({ success: true, message: "Doctor rejected" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to reject doctor" });
  }
};

// Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctorId")
      .populate("userId");

    const data = appointments.map((apt) => ({
      _id: apt._id,
      patientName: apt.userId?.fullName || "N/A",
      doctorName: apt.doctorId?.fullName || "N/A",
      date: apt.date,
      time: apt.time,
      status: apt.status,
    }));

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching appointments" });
  }
};

// Approve appointment
exports.approveAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.body.appointmentId, {
      status: "approved",
    });

    const user = await User.findById(appointment.userId);
    user.notification.push({ message: "Your appointment is approved" });
    await user.save();

    res.status(200).json({ success: true, message: "Appointment approved" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to approve appointment" });
  }
};

// Reject appointment
exports.rejectAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.body.appointmentId, {
      status: "rejected",
    });

    const user = await User.findById(appointment.userId);
    user.notification.push({ message: "Your appointment was rejected" });
    await user.save();

    res.status(200).json({ success: true, message: "Appointment rejected" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to reject appointment" });
  }
};
