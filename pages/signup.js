// pages/signup.js
import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import styles from '../Style/style.module.css';
import signupStyles from '../Style/signup.module.css';

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    age: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here, for example, send data to a server or perform validation
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <Navbar />
      <div className={`${styles.container} ${signupStyles.container}`}>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className={signupStyles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={signupStyles.formGroup}>
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={signupStyles.formGroup}>
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className={signupStyles.formGroup}>
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
