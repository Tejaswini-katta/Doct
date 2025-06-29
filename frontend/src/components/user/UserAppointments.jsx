// src/components/user/UserAppointments.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { Table, Container, Alert } from "react-bootstrap";

const UserAppointments = () => {
  const [userAppointments, setUserAppointments] = useState([]);

  const getUserAppointment = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userData"));
      if (!user?._id) return;

      const res = await axios.get("http://localhost:8001/api/user/getuserappointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { userId: user._id },
      });

      if (res.data.success) {
        setUserAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getUserAppointment();
  }, []);

  return (
    <div>
      <h2 className="text-center p-3">Your Appointments</h2>
      <Container>
        {userAppointments.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {userAppointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.doctorName}</td> {/* ✅ now displays correctly */}
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Alert variant="info">No appointments to show</Alert>
        )}
      </Container>
    </div>
  );
};

export default UserAppointments;
