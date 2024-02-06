import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Modal from './Modal';
import styles from './QuestionsPage.module.css';
import Navbar from '../Components/Navbar';
import questions from '../public/questionnaire.json';

const QuestionsPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userResponses, setUserResponses] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Retrieve user data from localStorage on component mount
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSubmit = () => {
    const newScore = Object.keys(userResponses).reduce((totalScore, questionIndex) => {
      if (userResponses[questionIndex] === questions[questionIndex].answer) {
        return totalScore + 1;
      }
      return totalScore;
    }, 0);
    setScore(newScore);
    setSubmitted(true);

    if (user !== null) {
      const updatedUser = { ...user, coins: user.coins + newScore };
      setUser(updatedUser);

      // Store updated user information back to localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
    }

    router.push('/ProfilePage'); // Redirect to profile page
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
            totalQuestions={questions.length}
            onClose={() => setSubmitted(false)}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionsPage;