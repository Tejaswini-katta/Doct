import React from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import doctorImage from "../../images/doctor.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-inner">
          <div className="home-image">
            <img src={doctorImage} alt="Doctor" />
          </div>
          <div className="home-text">
            <h1 className="home-title">DocSpot - Your Health, One Click Away</h1>
            <p className="home-subtitle">Login or Signup to continue</p>
            <p className="home-quote">“Where healthcare meets technology - faster, smarter, better.”</p>
            <div className="button-group">
              <button className="btn" onClick={() => navigate("/login")}>Login</button>
              <button className="btn btn-secondary" onClick={() => navigate("/register")}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;