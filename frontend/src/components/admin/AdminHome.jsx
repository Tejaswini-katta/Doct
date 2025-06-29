import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Badge } from 'antd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicationIcon from '@mui/icons-material/Medication';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People'; // icon for users
import Notification from '../common/Notification';
import AdminUsers from './AdminUsers';
import AdminDoctors from './AdminDoctors';
import AdminAppointments from './AdminAppointments';

const AdminHome = () => {
  const [userdata, setUserData] = useState({});
  const [activeMenuItem, setActiveMenuItem] = useState('adminappointments');

  const getUserData = async () => {
    try {
      const res = await axios.post('http://localhost:8001/api/user/getuserdata', {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        },
      });
      if (res.data.success) {
        setUserData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    window.location.href = "/";
  };

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <div className='main'>
      {/* Top Navigation Bar */}
      <div className="topbar">
        <h2 className="logo">DocSpot Admin</h2>
        <div className="nav-menu">
          <span className={`nav-item ${activeMenuItem === 'adminusers' ? 'active' : ''}`} onClick={() => handleMenuItemClick('adminusers')}>
            <PeopleIcon className='icon' /> Users
          </span>
          <span className={`nav-item ${activeMenuItem === 'admindoctors' ? 'active' : ''}`} onClick={() => handleMenuItemClick('admindoctors')}>
            <MedicationIcon className='icon' /> Doctors
          </span>
          <span className={`nav-item ${activeMenuItem === 'adminappointments' ? 'active' : ''}`} onClick={() => handleMenuItemClick('adminappointments')}>
            <CalendarMonthIcon className='icon' /> Appointments
          </span>
          <span className="nav-item" onClick={logout}>
            <LogoutIcon className='icon' /> Logout
          </span>
        </div>
      </div>

      {/* Page Content */}
      <div className="body">
        {activeMenuItem === 'notification' && <Notification />}
        {activeMenuItem === 'adminusers' && <AdminUsers />}
        {activeMenuItem === 'admindoctors' && <AdminDoctors />}
        {activeMenuItem === 'adminappointments' && <AdminAppointments />}
      </div>
    </div>
  );
};

export default AdminHome;
