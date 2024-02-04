import React, { useState } from 'react';
import questions from '../public/questionnaire.json';
import styles from '../Style/style.module.css';
import Navbar from '../Components/Navbar';
import Login from '../Components/Login';

export default function Home() {
  const [userResponses, setUserResponses] = useState({});
  const [score, setScore] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for tracking login status

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

        // Check if the server response indicates successful login
        if (responseData.success) {
          // Set the login status to true upon successful login
          setIsLoggedIn(true);
        } else {
          // Handle cases where the login credentials are incorrect
          console.log('Invalid email or password');
        }
      } else {
        // Handle other errors (e.g., server error)
        console.log('Error during login:', response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = () => {
    // Perform logout logic
    // Set the login status to false upon logout
    setIsLoggedIn(false);
    // Optionally, reset other state values like userResponses and score
    setUserResponses({});
    setScore(null);
  };

  const handleSubmit = () => {
    // If the user is logged in, calculate the quiz score
    if (isLoggedIn) {
      const newScore = Object.values(userResponses).filter(
        (response, index) => response === questions[index].answer
      ).length;
      setScore(newScore);
    } else {
      // Handle cases where the user is not logged in
      // You might redirect to the login page or show a message
      console.log('User is not logged in');
    }
  };

  const resetQuiz = () => {
    setUserResponses({});
    setScore(null);
  };

  return (
    <div>
      <Navbar />
      {isLoggedIn ? (
        // If the user is logged in, render the quiz content
        <div>
          <h2>Quiz</h2>
          {/* Quiz content goes here */}
          <button onClick={handleSubmit}>Submit Quiz</button>
          <button onClick={resetQuiz}>Reset Quiz</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        // If the user is not logged in, render the login component
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}
