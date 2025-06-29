import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../../App.css";
import registerImage from "../../images/doctor.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8001/api/user/login", {
        email,
        password,
      });

      if (res.data.success) {
        toast.success("Login successful");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userData", JSON.stringify(res.data.user));

        // ✅ Role-based redirection
        if (res.data.user.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/userhome");
        }
      } else {
        toast.error(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="home-container">
      <div className="home-content home-inner">
        <div className="home-image">
          <img src={registerImage} alt="Login" />
        </div>
        <div className="home-text">
          <h1 className="home-title">Login to DocSpot</h1>
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn">Login</button>
          </form>
          <p className="switch-link">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{ color: "#4eaaff", cursor: "pointer", textDecoration: "underline" }}
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
