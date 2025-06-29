import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../../App.css";
import registerImage from "../../images/doctor.png";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.warn("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8001/api/user/register", {
        fullName,
        email,
        password,
        isAdmin: role === "admin", // ✅ set isAdmin flag based on role
      });

      if (res.data.success) {
        toast.success("Registered successfully!");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="home-container">
      <div className="home-content home-inner">
        <div className="home-image">
          <img src={registerImage} alt="Register" />
        </div>
        <div className="home-text">
          <h1 className="home-title">Register for DocSpot</h1>
          <form className="login-form" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="customer">User</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" className="btn">Register</button>
          </form>
          <p className="switch-link">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{ color: "#4eaaff", cursor: "pointer", textDecoration: "underline" }}
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
