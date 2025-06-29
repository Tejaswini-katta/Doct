import React, { useEffect, useState } from 'react';
import { Table, Button, Alert, Container } from 'react-bootstrap';
import axios from 'axios';
import { message } from 'antd';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:8001/api/admin/getappointments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.error(error);
      message.error('Failed to fetch appointments');
    }
  };

  const handleApprove = async (appointmentId) => {
    try {
      const res = await axios.post(
        'http://localhost:8001/api/admin/approve-appointment',
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        fetchAppointments();
      }
    } catch (error) {
      console.error(error);
      message.error('Approval failed');
    }
  };

  const handleReject = async (appointmentId) => {
    try {
      const res = await axios.post(
        'http://localhost:8001/api/admin/reject-appointment',
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        fetchAppointments();
      }
    } catch (error) {
      console.error(error);
      message.error('Rejection failed');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div>
      <h2 className='p-3 text-center'>All Appointments</h2>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((apt) => (
                <tr key={apt._id}>
                  <td>{apt.patientName}</td>
                  <td>{apt.doctorName}</td>
                  <td>{apt.date}</td>
                  <td>{apt.time}</td>
                  <td>{apt.status}</td>
                  <td>
                    {apt.status === 'pending' && (
                      <>
                        <Button variant="success" size="sm" onClick={() => handleApprove(apt._id)} className="mx-1">Approve</Button>
                        <Button variant="danger" size="sm" onClick={() => handleReject(apt._id)}>Reject</Button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <Alert variant="info">No appointments available.</Alert>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default AdminAppointments;
