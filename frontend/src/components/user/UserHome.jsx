import React, { useEffect, useState } from 'react';
import { Badge } from 'antd';
import Notification from '../common/Notification';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicationIcon from '@mui/icons-material/Medication';
import LogoutIcon from '@mui/icons-material/Logout';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ApplyDoctor from './ApplyDoctor';
import UserAppointments from './UserAppointments';
import DoctorList from './DoctorList';
import p2 from '../../images/p2.png';

const UserHome = () => {
  const [doctors, setDoctors] = useState([]);
  const [userdata, setUserData] = useState({});
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const navigate = useNavigate();

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      setUserData(user);
    }
  };

  const getUserData = async () => {
    try {
      await axios.post('http://localhost:8001/api/user/getuserdata', {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getDoctorData = async () => {
    try {
      const res = await axios.get('http://localhost:8001/api/user/getalldoctorsu', {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getUserData();
    getDoctorData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate('/');
  };

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <div className="main">
      {/* Top Navigation Bar */}
      <div className="topbar">
        <h2 className="logo">DocSpot</h2>
        <div className="nav-menu">
          <span className={`nav-item ${activeMenuItem === 'userappointments' ? 'active' : ''}`} onClick={() => handleMenuItemClick('userappointments')}>
            <CalendarMonthIcon className='icon' /> Appointments
          </span>
          <span className={`nav-item ${activeMenuItem === 'doctorlist' ? 'active' : ''}`} onClick={() => handleMenuItemClick('doctorlist')}>
            <MedicalServicesIcon className='icon' /> Doctor List
          </span>
          {userdata.isdoctor !== true && (
            <span className={`nav-item ${activeMenuItem === 'applyDoctor' ? 'active' : ''}`} onClick={() => handleMenuItemClick('applyDoctor')}>
              <MedicationIcon className='icon' /> Apply Doctor
            </span>
          )}
          <span className="nav-item" onClick={logout}>
            <LogoutIcon className='icon' /> Logout
          </span>
        </div>
      </div>

      {/* Header below Topbar */}
      <div className="header">
        <div className="header-content">
          {userdata.isdoctor && <h3>Dr. </h3>}
          <h3>{userdata.fullName}</h3>
        </div>
      </div>

      {/* Page Body */}
      <div className="body">
        {activeMenuItem === 'applyDoctor' && <ApplyDoctor userId={userdata._id} />}
        {activeMenuItem === 'notification' && <Notification />}
        {activeMenuItem === 'userappointments' && <UserAppointments />}
        {activeMenuItem === 'doctorlist' && (
          <div className="doctor-grid-container">
            <h2 className="text-center" style={{ marginBottom: '2rem' }}>Available Doctors</h2>
            <div className="doctor-grid">
              {doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <DoctorList
                    key={doctor._id}
                    doctor={doctor}
                    userDoctorId={userdata._id}
                    userdata={userdata}
                  />
                ))
              ) : (
                <p>No approved doctors available at the moment.</p>
              )}
            </div>
          </div>
        )}

        {/* Welcome section if no tab selected */}
        {activeMenuItem === '' && (
          <div className="welcome-section">
            <div className="welcome-box">
              <h1 className="home-title">Welcome to DocSpot</h1>
              <p className="home-subtitle">You're logged in as a user!</p>
            </div>
            <div className="welcome-image">
              <img src={p2} alt="Welcome" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHome;
