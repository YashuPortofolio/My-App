import React, { useState, useContext } from 'react';
import { loginUser } from '../utils/fakeAuth';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const result = loginUser(formData.username, formData.password);
    if (result.success) {
      login(result.user.username, result.user.role);
      
      // Check if user is admin and navigate accordingly
      if (result.user.role === 'admin') {
        navigate('/admin');  // Redirect to AdminPage
      } else {
        navigate('/dashboard');  // Redirect to User Dashboard
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <div className={styles['login-container']}>
      <h2 className={styles['login-title']}>Login</h2>
      {error && <p className={styles['error-message']}>{error}</p>}
      <form className={styles['login-form']} onSubmit={handleSubmit}>
        <input
          className={styles['login-input']}
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          className={styles['login-input']}
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          required
        />
        <button className={styles['login-button']} type="submit">
          Login
        </button>
      </form>
      <div className={styles.link}>
        Don't have an account? <a href="/register">Register here</a>
      </div>
    </div>
  );
};

export default Login;
