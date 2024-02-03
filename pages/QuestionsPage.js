// pages/QuestionsPage.js
import React, { useState } from 'react';
import questions from '../public/questionnaire.json';
import styles from './QuestionsPage.module.css';
import Navbar from '../Components/Navbar.js';

const QuestionsPage = () => {
  const [userResponses, setUserResponses] = useState({});
  const [score, setScore] = useState(null);

  const handleSubmit = () => {
    // Calculate the score based on user responses
    // (You need to implement the scoring logic here)

    // For simplicity, let's just count the number of correct answers
    const newScore = Object.values(userResponses).filter(
      (response, index) => response === questions[index].answer
    ).length;

    setScore(newScore);
  };

  const resetQuiz = () => {
    setUserResponses({});
    setScore(null);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1>Questionnaire</h1>
        {questions.map((question, index) => (
          <div key={index} className={styles.questionContainer}>
            <p className={styles.question}>{question.question}</p>
            <div className={styles.options}>
              <button
                className={`${styles.optionButton} ${userResponses[index] === 'Yes' ? styles.yes : ''}`}
                onClick={() => setUserResponses({ ...userResponses, [index]: 'Yes' })}
              >
                Yes
              </button>
              <button
                className={`${styles.optionButton} ${userResponses[index] === 'No' ? styles.no : ''}`}
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
        {score !== null && (
          <div>
            <p className={styles.score}>Your score: {score} out of {questions.length}</p>
            <button className={styles.optionButton} onClick={resetQuiz}>
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionsPage;
