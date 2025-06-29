// src/components/user/DoctorList.jsx
import React, { useState } from 'react';
import { message } from 'antd';
import axios from 'axios';
import { Form, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

const DoctorList = ({ userDoctorId, doctor, userdata }) => {
  const [dateTime, setDateTime] = useState('');
  const [show, setShow] = useState(false);
  const currentDate = new Date().toISOString().slice(0, 16);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => setDateTime(e.target.value);

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      const [date, time] = dateTime.split('T');
      const appointmentData = {
        userId: userDoctorId,
        doctorId: doctor._id,
        doctorName: doctor.fullName, // ✅ Correct field name
        patientName: userdata.fullName,
        date,
        time,
      };

      const res = await axios.post('http://localhost:8001/api/user/getappointment', appointmentData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (res.data.success) {
        message.success(res.data.message);
        handleClose();
      } else {
        message.error(res.data.message || 'Booking failed');
      }
    } catch (error) {
      console.error(error);
      message.error('Something went wrong');
    }
  };

  return (
    <>
      <Card className="doctor-card" style={{ maxWidth: '300px' }}>
        <Card.Body>
          <Card.Title>Dr. {doctor.fullName}</Card.Title>
          <Card.Text><strong>Phone:</strong> {doctor.phone}</Card.Text>
          <Card.Text><strong>Address:</strong> {doctor.address}</Card.Text>
          <Card.Text><strong>Specialization:</strong> {doctor.specialization}</Card.Text>
          <Card.Text><strong>Experience:</strong> {doctor.experience} yrs</Card.Text>
          <Card.Text><strong>Fees:</strong> ₹{doctor.fees}</Card.Text>
          <Card.Text>
            <strong>Timing:</strong>{" "}
            {doctor.timings?.length === 2 ? `${doctor.timings[0]} - ${doctor.timings[1]}` : "Not specified"}
          </Card.Text>
          <div className="d-flex justify-content-center">
            <Button variant="primary" onClick={handleShow}>Book Now</Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleBook}>
          <Modal.Body>
            <strong>Doctor:</strong> Dr. {doctor.fullName}<br />
            <strong>Specialization:</strong> {doctor.specialization}
            <hr />
            <Row className="mb-3">
              <Col md={{ span: 10, offset: 1 }}>
                <Form.Group controlId="formDateTime">
                  <Form.Label>Appointment Date & Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    min={currentDate}
                    value={dateTime}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button type="submit" variant="primary">Book</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default DoctorList;
