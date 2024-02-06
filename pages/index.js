import React, { useState } from 'react';
import questions from '../public/questionnaire.json';
import styles from '../Style/style.module.css';
import Navbar from '../Components/Navbar';
import Login from '../Components/Login';

export default function Home() {
  const [userResponses, setUserResponses] = useState({});
  const [score, setScore] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          setIsLoggedIn(true);
        } else {
          console.log('Invalid email or password');
        }
      } else {
        console.log('Error during login:', response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserResponses({});
    setScore(null);
  };

  const handleSubmit = () => {
    if (isLoggedIn) {
      const newScore = Object.values(userResponses).filter(
        (response, index) => response === questions[index].answer
      ).length;
      setScore(newScore);
    } else {
      console.log('User is not logged in');
    }
  };

  const resetQuiz = () => {
    setUserResponses({});
    setScore(null);
  };

  return (
    <div>
      {/* Render Navbar only if isLoggedIn is true */}
      {isLoggedIn && <Navbar />}
      {isLoggedIn ? (
        <div>
          <h2>Quiz</h2>
          <button onClick={handleSubmit}>Submit Quiz</button>
          <button onClick={resetQuiz}>Reset Quiz</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}
