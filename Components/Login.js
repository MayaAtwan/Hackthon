import React from 'react';
import { useRouter } from 'next/router';
import styles from './Login.module.css';

const Login = () => {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push('/QuestionsPage');
  };

  const handleSignup = () => {
    router.push('./pages/Signup');
  };

  const handleForgotPassword = () => {
    // Add functionality to handle forgot password action here
    alert('Forgot your password?');
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSignup}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.formLabel}>
              <i className="fas fa-user"></i> {/* Font Awesome user icon */}
              <span className={styles.labelText}>Username</span>
            </label>
            <input type="text" id="username" className={styles.formInput} placeholder="Enter your username" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              <i className="fas fa-lock"></i> {/* Font Awesome lock icon */}
              <span className={styles.labelText}>Password</span>
            </label>
            <input type="password" id="password" className={styles.formInput} placeholder="Enter your password" />
            <a href="#" className={styles.forgotPasswordLink} onClick={handleForgotPassword}>
              <span className={styles.forgotPasswordText}>Forgot your password?</span>
            </a>
          </div>
          <button className={styles.submitButton} type="submit">Sign Up</button>
        </form>
        {/* Add sign-up button */}
        <button className={styles.signupButton} onClick={handleLogin}>Sign In</button>
      </div>
    </div>
  );
};

export default Login;
