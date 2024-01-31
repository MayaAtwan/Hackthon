// pages/profilePage.js
import React from 'react';
import styles from './ProfilePage.module.css';
import NavBar from '../Components/Navbar';

const ProfilePage = () => {
    return (
      <div>
        <NavBar /> {/* Include the NavBar component */}
        <div className={styles.container}>
          <div className={styles.profileContainer}>
            <h1 className={styles.profileLabel}>Profile Information</h1>
            <div className={styles.profileInfo}>
              {/* Your profile information here */}
              <p>Name: John Doe</p>
              <p>Username: johndoe123</p>
              <p>Email: johndoe@example.com</p>
              <p>Age: 25</p>
              <p>Coins: 100</p>
            </div>
            <button className={styles.profileButton}>Edit Profile</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfilePage;