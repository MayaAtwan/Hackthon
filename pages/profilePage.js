import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user information from localStorage
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // Empty dependency array to run this effect only once on component mount

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.profileContainer}>
          <h1 className={styles.profileLabel}>Profile Information</h1>
          <div className={styles.profileInfo}>
            {user && (
              <>
                <p>Name:  {user.fullName}</p>
                <p>Email: {user.email}</p>
                <p>coins: {user.coins}</p>
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
