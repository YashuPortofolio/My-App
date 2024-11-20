import React, { useState } from 'react';
import { registerUser } from '../utils/fakeAuth';
import { useNavigate } from 'react-router-dom';
import styles from './Register.css';  // Ensure this path is correct

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const result = registerUser(formData.username, formData.password, formData.role);
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <input 
            name="username" 
            placeholder="Username" 
            onChange={handleChange} 
            value={formData.username} 
            required 
            className="input-field"
          />
        </div>
        <div className="form-group">
          <input 
            name="password" 
            placeholder="Password" 
            type="password" 
            onChange={handleChange} 
            value={formData.password} 
            required 
            className="input-field"
          />
        </div>
        <div className="form-group">
          <select 
            name="role" 
            onChange={handleChange} 
            value={formData.role} 
            className="input-field"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">Register</button>
        <div className={styles['login-link']}>
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
      </form>
      
    </div>
  );
};

export default Register;
