// pages/index.js
import React, { useState } from 'react';
import questions from '../public/questionnaire.json';
import styles from '../style.module.css';

export default function Home() {
  const [userResponses, setUserResponses] = useState({});
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    // Calculate the score based on user responses
    // (You need to implement the scoring logic here)

    // For simplicity, let's just count the number of correct answers
    const newScore = Object.values(userResponses).filter(
      (response, index) => response === questions[index].answer
    ).length;

    setScore(newScore);
  };

  return (
    <div className={styles.container}>
      <h1>Questionnaire</h1>
      {questions.map((question, index) => (
        <div key={index} className={styles.questionContainer}>
          <p className={styles.question}>{question.question}</p>
          <div className={styles.options}>
            <button
              className={styles.optionButton}
              onClick={() => setUserResponses({ ...userResponses, [index]: 'Yes' })}
            >
              Yes
            </button>
            <button
              className={styles.optionButton}
              onClick={() => setUserResponses({ ...userResponses, [index]: 'No' })}
            >
              No
            </button>
          </div>
        </div>
      ))}
      <button className={styles.optionButton} onClick={handleSubmit}>
        Submit
      </button>
      {score !== null && <p className={styles.score}>Your score: {score} out of {questions.length}</p>}
    </div>
  );
}
