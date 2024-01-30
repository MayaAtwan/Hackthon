// Components/Login.js
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
        <h2 className={styles.heading}>Login</h2>
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>Email</label>
            <input type="email" id="email" className={styles.formInput} placeholder="Enter your email" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>Password</label>
            <input type="password" id="password" className={styles.formInput} placeholder="Enter your password" />
          </div>
          <button className={styles.submitButton} type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
