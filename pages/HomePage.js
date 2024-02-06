import React from 'react';
import Link from 'next/link';
import styles from './HomePage.module.css';
import Navbar from '../Components/Navbar';

const videos = [
  {
    id: 'VIDEO_ID_1',
    title: 'Social Media Safety',
    video_link: "Q_mqjS_E9mg?si=suGjq6ROVeJioNLe"
  },
  {
    id: 'VIDEO_ID_2',
    title: 'אזעקת אופק',
    video_link: "nqQc8rAwLrE?si=mK86YI-i-eZvo0dE"
  },
  {
    id: 'VIDEO_ID_3',
    title: 'Online Privacy for Kids',
    video_link: 'yiKeLOKc1tw?si=7oB9QW-MCV5TlQiy'
  },
  {
    id: 'VIDEO_ID_4',
    title: 'Being safe',
    video_link: 'HxySrSbSY7o?si=WsCCBbz0Xqu4OvZd'
  }
];

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.container} style={{ marginTop: '20px' }}>
        <div className={styles.videoContainer}>
          {videos.map((video, index) => (
            <div key={video.id} className={styles.videoBox}>
              <h2>{video.title}</h2>
              <div className={styles.videoWrapper}>
                <iframe
                  width="280" /* Adjusted video width */
                  height="158" /* Adjusted video height */
                  src={`https://www.youtube.com/embed/${video.video_link}`}
                  frameBorder="0"
                  allowFullScreen
                  title={`Video ${video.title}`}
                ></iframe>
              </div>
              <div className={styles.examButton}>
                <Link href="/QuestionsPage">
                  <button className={styles.examButton}>
                    Take the Exam
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
