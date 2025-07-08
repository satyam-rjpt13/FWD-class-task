import React, { useState } from "react";
import "./App.css";

const questions = [
  {
    question: "What is the largest animal in the world?",
    answer: [
      { text: "Shark", correct: false },
      { text: "Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Human", correct: false }
    ]
  },
  {
    question: "Which is the longest river in the world?",
    answer: [
      { text: "Amazon", correct: false },
      { text: "Ganges", correct: false },
      { text: "Nile", correct: true },
      { text: "Yangtze", correct: false }
    ]
  },
  {
    question: "Which country has the largest population?",
    answer: [
      { text: "India", correct: true },
      { text: "USA", correct: false },
      { text: "Russia", correct: false },
      { text: "China", correct: false }
    ]
  },
  {
    question: "Which is the largest desert in the world?",
    answer: [
      { text: "Sahara", correct: false },
      { text: "Gobi", correct: false },
      { text: "Antarctic Desert", correct: true },
      { text: "Arabian Desert", correct: false }
    ]
  },
  {
    question: "Which is the highest mountain in the world?",
    answer: [
      { text: "K2", correct: false },
      { text: "Mount Everest", correct: true },
      { text: "Kanchenjunga", correct: false },
      { text: "Makalu", correct: false }
    ]
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleAnswer = (isCorrect, index) => {
    setSelected(index);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    const next = currentQuestion + 1;
    if (next < questions.length) {
      setCurrentQuestion(next);
      setSelected(null);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelected(null);
  };

  return (
    <div className="app">
      <h1>Simple Quiz</h1>
      {showScore ? (
        <div className="quiz">
          <h2>
            You scored {score} out of {questions.length}!
          </h2>
          <button id="next-btn" onClick={handleRestart}>
            Play Again
          </button>
        </div>
      ) : (
        <div className="quiz">
          <h2>
            {currentQuestion + 1}. {questions[currentQuestion].question}
          </h2>
          <div id="answer-buttons">
            {questions[currentQuestion].answer.map((ans, index) => (
              <button
                key={index}
                className={`btn ${
                  selected !== null
                    ? ans.correct
                      ? "correct"
                      : index === selected
                      ? "incorrect"
                      : ""
                    : ""
                }`}
                onClick={() => handleAnswer(ans.correct, index)}
                disabled={selected !== null}
              >
                {ans.text}
              </button>
            ))}
          </div>
          <button
            id="next-btn"
            style={{ display: selected !== null ? "block" : "none" }}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
