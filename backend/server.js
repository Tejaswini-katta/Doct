const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB(); // Connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/doctor", require("./routes/doctorRoutes"));

const PORT = 8001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
