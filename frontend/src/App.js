import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import UserHome from "./components/user/UserHome";
import AdminHome from "./components/admin/AdminHome";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🔐 Role-based route protection
const ProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem("userData"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRole === "admin" && !user.isAdmin) {
    return <Navigate to="/userhome" />;
  }

  if (allowedRole === "user" && user.isAdmin) {
    return <Navigate to="/admin" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={2000} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected User Route */}
        <Route
          path="/userhome"
          element={
            <ProtectedRoute allowedRole="user">
              <UserHome />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminHome />
            </ProtectedRoute>
          }
        />

        {/* Redirect unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
