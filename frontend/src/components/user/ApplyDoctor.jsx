import { Col, Form, Input, Row, TimePicker, message } from 'antd';
import { Container } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

function ApplyDoctor({ userId }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    const timings = values.timings.map(t => moment(t).format("HH:mm"));

    const doctorData = {
      ...values,
      timings,
    };

    try {
      setLoading(true);
      const res = await axios.post(
        'http://localhost:8001/api/user/registerdoc',
        { doctor: doctorData, userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        form.resetFields(); // clear form
      } else {
        message.error(res.data.message || "Submission failed");
      }
    } catch (error) {
      console.error(error);
      message.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="apply-doctor-container">
      <h2 className='apply-doctor-title'>Apply for Doctor</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit} className="apply-doctor-form">
        <h4>Personal Details:</h4>
        <Row gutter={20}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Full Name" name="fullName" rules={[{ required: true }]}>
              <Input placeholder='Enter full name' />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
              <Input type='number' placeholder='Your phone' />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
              <Input placeholder='Your email' />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Address" name="address" rules={[{ required: true }]}>
              <Input placeholder='Your address' />
            </Form.Item>
          </Col>
        </Row>

        <h4>Professional Details:</h4>
        <Row gutter={20}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Specialization" name="specialization" rules={[{ required: true }]}>
              <Input placeholder='Your specialization' />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Experience" name="experience" rules={[{ required: true }]}>
              <Input type='number' placeholder='Your experience' />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Fees" name="fees" rules={[{ required: true }]}>
              <Input type='number' placeholder='Consultation fees' />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Timings" name="timings" rules={[{ required: true }]}>
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
        </Row>

        <button className="btn btn-primary btn-submit" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
        </button>

      </Form>
    </Container>
  );
}

export default ApplyDoctor;
