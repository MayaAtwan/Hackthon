// components/Login.js
import React from 'react';
import { useRouter } from 'next/router'; // Correct import statement
import styles from './Login.module.css';

const Login = () => {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Redirect to questions page upon clicking login button
    router.push('/QuestionsPage'); // Correct the path to match the route for QuestionsPage
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.heading}>Not Only Fan</h2>
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.formLabel}>Username</label>
            <input type="text" id="username" className={styles.formInput} placeholder="Enter your username" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>Password</label>
            <input type="password" id="password" className={styles.formInput} placeholder="Enter your password" />
          </div>
          <button className={styles.submitButton} type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
