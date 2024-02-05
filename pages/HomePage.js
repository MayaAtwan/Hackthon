import React from 'react';
import styles from './HomePage.module.css';

const HomePage = () => {
  const handleQues = (e) => {
    e.preventDefault();
    // Navigate to the exam page
  };

  return (
    <div className={styles.container}>
      <h1>Welcome to the Home Page</h1>
      <div className={styles.videoContainer}>
        <div className={styles.videoWrapper}>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID_1" frameBorder="0" allowFullScreen title="Video 1"></iframe>
          <button className={styles.examButton} onClick={handleQues}>Take the Exam</button>
        </div>
        <div className={styles.videoWrapper}>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID_2" frameBorder="0" allowFullScreen title="Video 2"></iframe>
          <button className={styles.examButton} onClick={handleQues}>Take the Exam</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
