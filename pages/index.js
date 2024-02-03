
import React from 'react';
import Login from '../Components/Login'; // Adjust the path to import Login component
=======
// pages/index.js
import React, { useState } from 'react';
import questions from '../public/questionnaire.json';
import styles from '../Style/style.module.css';
import Navbar from '../Components/Navbar';

export default function Home() {
  const [userResponses, setUserResponses] = useState({});
  const [score, setScore] = useState(null);

  const handleSubmit = () => {
    // Calculate the score based on user responses
    const newScore = Object.values(userResponses).filter(
      (response, index) => response === questions[index].answer
    ).length;

    setScore(newScore);
  };

  const resetQuiz = () => {
    setUserResponses({});
    setScore(null);
  };


const Index = () => {
  return (
    <div>
      <Login /> {/* Render the Login component */}
    </div>
  );
};

export default Index;
