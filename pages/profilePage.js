import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [showCaption, setShowCaption] = useState(false);
  const router = useRouter(); 

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleCoinsClick = () => {
    router.push('/CouponPage');
    setShowCaption(true);
    setTimeout(() => setShowCaption(false), 3000);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.profileContainer}>
          <h1 className={styles.profileLabel}>
            <i className={`${styles.profileIcon} fas fa-user-circle`} />
            Welcome, {user && user.fullName}
          </h1>
          <div className={styles.profileInfo}>
            {user && (
              <>
                <p><span className={styles.infoLabel}>Name:</span> {user.fullName}</p>
                <p><span className={styles.infoLabel}>Email:</span> {user.email}</p>
                <p><span className={styles.infoLabel}>Phone:</span> {user.phone}</p>
                <p onClick={handleCoinsClick} className={styles.coins} style={{cursor: 'pointer'}}>
                  <span className={styles.infoLabel}>Coins:</span> {user.coins} <span role="img" aria-label="coins">💰</span>
                </p> 
                {showCaption && <p className={styles.coinsCaption}>Click again to see what you can do with these coins!</p>}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
