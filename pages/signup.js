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
    password: '',
    confirmPassword: '', // Add password confirmation field
  });

  const [signupStatus, setSignupStatus] = useState({
    success: false,
    error: null,
    loading: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (formData.password !== formData.confirmPassword) {
      setSignupStatus({ success: false, error: 'Passwords do not match', loading: false });
      return;
    }

    try {
      setSignupStatus({ success: false, error: null, loading: true });

      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setSignupStatus({ success: true, error: null, loading: false });
        setFormData({
          email: '',
          fullName: '',
          age: '',
          phone: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        setSignupStatus({ success: false, error: responseData.message, loading: false });
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setSignupStatus({ success: false, error: 'Internal server error', loading: false });
    }
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
          <div className={signupStyles.formGroup}>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={signupStyles.formGroup}>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {signupStatus.loading && <div>Loading...</div>}

          {signupStatus.success && (
            <div className={signupStyles.successMessage}>
              Sign-up successful! You can now log in.
            </div>
          )}

          {signupStatus.error && (
            <div className={signupStyles.errorMessage}>
              Error: {signupStatus.error}
            </div>
          )}

          <button type="submit" disabled={signupStatus.loading}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
