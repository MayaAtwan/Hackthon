import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './Login.module.css';
import userData from '../users.json'; // Import JSON data

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleLogin = (e) => {
    e.preventDefault();
    const user = userData.find(u => u.email === username && u.password === password);
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      router.push('/QuestionsPage');
    } else {
      setError('Invalid username or password');
    }
  };
  const handleSignup = () => {
    router.push('/signup');
  };

  const handleForgotPassword = () => {
    // Add functionality to handle forgot password action here
    alert('Forgot your password?');
  };

  return (
<div className={styles.container}>
  <div className={styles.formContainer}>
    <form className={styles.form} onSubmit={handleLogin}>
      <div className={styles.formGroup}>
        <label htmlFor="username" className={styles.formLabel}>
          <i className="fas fa-user"></i> {/* Font Awesome user icon */}
          <span className={styles.labelText}>Username</span>
        </label>
        <input type="text" id="username" className={styles.formInput} placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.formLabel}>
          <i className="fas fa-lock"></i> {/* Font Awesome lock icon */}
          <span className={styles.labelText}>Password</span>
        </label>
        <input type="password" id="password" className={styles.formInput} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <a href="#" className={styles.forgotPasswordLink} onClick={handleForgotPassword}>
          <span className={styles.forgotPasswordText}>Forgot your password?</span>
        </a>
      </div>
      <button className={styles.signinButton}>Sign In</button>
    </form>
    <button className={styles.signupButton} onClick={handleSignup}>Sign Up</button>
  </div>
</div>
  );
};

export default Login;