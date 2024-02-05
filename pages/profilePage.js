import React from 'react';
import Navbar from '../Components/Navbar';
import styles from './ProfilePage.module.css';

const ProfilePage = ({ user }) => {
    return (
      <div>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.profileContainer}>
            <h1 className={styles.profileLabel}>Profile Information</h1>
            <div className={styles.profileInfo}>
              {user && (
                <>
                  <p>Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                </>
              )}
            </div>
            <button className={styles.profileButton}>Edit Profile</button>
          </div>
        </div>
      </div>
    );
};

export default ProfilePage;
