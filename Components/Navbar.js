// // pages/index.js
// import React, { useState } from 'react';
// import questions from '../public/questionnaire.json';
// import styles from '../style.module.css';
// import Navbar from '../Components/Navbar';

// export default function Home() {
//   const [userResponses, setUserResponses] = useState({});
//   const [score, setScore] = useState(null);

//   const handleSubmit = () => {
//     // Calculate the score based on user responses
//     // (You need to implement the scoring logic here)

//     // For simplicity, let's just count the number of correct answers
//     const newScore = Object.values(userResponses).filter(
//       (response, index) => response === questions[index].answer
//     ).length;

//     setScore(newScore);
//   };

//   const resetQuiz = () => {
//     setUserResponses({});
//     setScore(null);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className={styles.container}>
//         <h1>Questionnaire</h1>
//         {/* Your questionnaire JSX */}
//         <button className={styles.optionButton} onClick={handleSubmit}>
//           Submit
//         </button>
//         {score !== null && (
//           <div>
//             <p className={styles.score}>Your score: {score} out of {questions.length}</p>
//             <button className={styles.optionButton} onClick={resetQuiz}>
//               Retake Quizs
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// components/Navbar.js
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/">
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <span>Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}



// // // components/Navbar.js
// // import Link from 'next/link';
// // import styles from './Navbar.module.css';

// // export default function Navbar() {
// //   return (
// //     <nav className={styles.navbar}>
// //       <ul>
// //         <li>
// //           <Link href="/">
// //             <span>Home</span>
// //           </Link>
// //         </li>
// //         <li>
// //           <Link href="/profile">
// //             <span>Profile</span>
// //           </Link>
// //         </li>
// //       </ul>
// //     </nav>
// //   );
// // }
