import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic (clear user session, etc.)
    navigate('/login');
  };

  return (
    <div className={styles['dashboard-container']}>
      <h2 className={styles['dashboard-title']}>Welcome to the Dashboard</h2>
      <p className={styles['dashboard-info']}>Hello, {user.username}. Here are your options:</p>
      
      <div className={styles['dashboard-card-container']}>
        <div className={styles['dashboard-card']}>
          <h3>Profile</h3>
          <p>View and update your profile details.</p>
        </div>
        <div className={styles['dashboard-card']}>
          <h3>Settings</h3>
          <p>Adjust your preferences and settings.</p>
        </div>
        <div className={styles['dashboard-card']}>
          <h3>Notifications</h3>
          <p>Check your recent notifications and updates.</p>
        </div>
      </div>

      <button className={styles['dashboard-button']} onClick={handleLogout}>
        Logout
      </button>

      <div className={styles['dashboard-footer']}>
        <p>&copy; 2024 MyApp. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Dashboard;
