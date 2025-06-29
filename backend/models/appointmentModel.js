// backend/models/appointmentModel.js
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  patientName: { type: String, required: true },
  doctorName: { type: String, required: true }, // ✅ correct field name
  date: { type: String, required: true },
  time: { type: String, required: true },
  document: {
    path: String,
    filename: String,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
