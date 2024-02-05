import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import the useRouter hook
import Modal from './Modal'; // Assuming the Modal component is in the same directory
import styles from './QuestionsPage.module.css';
import Navbar from '../Components/Navbar.js';
import questions from '../public/questionnaire.json';

const QuestionsPage = () => {
  const router = useRouter(); // Initialize the router
  const [user, setUser] = useState(null); // State to hold user information
  const [userResponses, setUserResponses] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const newScore = Object.keys(userResponses).reduce((totalScore, questionIndex) => {
      if (userResponses[questionIndex] === questions[questionIndex].answer) {
        return totalScore + 1;
      }
      return totalScore;
    }, 0);
    setScore(newScore);
    setSubmitted(true);
    // Redirect to profile page after submission and pass user information
    router.push({
      pathname: '/ProfilePage',
      query: { user: JSON.stringify(user) }
    });
  };

  const resetQuiz = () => {
    setUserResponses({});
    setScore(null);
    setSubmitted(false);
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
              {question.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  className={`${styles.optionButton} ${submitted ? styles.disabled : ''} ${
                    userResponses[index] === option ? styles.selected : ''
                  }`}
                  onClick={() => {
                    if (!submitted) {
                      setUserResponses(prevState => ({ ...prevState, [index]: option }));
                    }
                  }}
                  disabled={submitted}
                >
                  {option}
                </button> 
              ))}
            </div>
          </div>
        ))}
        <button className={styles.optionButton} onClick={handleSubmit} disabled={submitted}>
          Submit
        </button>
       
        {submitted && (
          <Modal
            message="Quiz submitted."
            score={score}
            totalQuestions={questions.length} // Pass the totalQuestions prop
            onClose={() => setSubmitted(false)}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionsPage;
