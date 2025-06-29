const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");

// ✅ Get appointments for this doctor
exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.query.userId });
    res.status(200).json({ success: true, data: appointments, message: "Appointments loaded" });
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    res.status(500).json({ success: false, message: "Failed to load appointments" });
  }
};

// ✅ Update appointment status (approve/reject)
exports.handleStatus = async (req, res) => {
  const { userid, appointmentId, status } = req.body;
  try {
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status }, { new: true });
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.notification.push({ message: `Your appointment is ${status}` });
    await user.save();

    res.status(200).json({ success: true, message: `Appointment ${status}` });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
};
