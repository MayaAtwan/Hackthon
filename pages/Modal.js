// Modal.js

import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ message, score, totalQuestions, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>{message}</p>
        {score !== null && <p>Your score: {score} out of {totalQuestions}</p>}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
