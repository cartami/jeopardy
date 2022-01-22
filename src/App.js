import { useState, useEffect } from "react";
import React from "react";
import DisplayAnswer from "./components/DisplayAnswer";
import axios from "axios";
import "./App.css";

function App() {
  //initialize to empty array
  const [questions, setQuestions] = useState([]);

  //sets the score state
  const [score, setScore] = useState(0);
  const scoreIncrease = () => {
    setScore(score + 1);
  };
  const scoreDecrease = () => {
    setScore(score - 1);
  };
  const scoreReset = () => {
    setScore(0);
  };

  //use to keep track of question count
  const [indexOfQuestions, setIndex] = useState(0);
  const updateIndex = () => setIndex(indexOfQuestions + 1);

  //use async to use await and enable asynchronous, promise-based behavior to be written in a cleaner style,
  //avoiding the need to explicitly configure promise chains.
  const updateQuestions = async () => {
    try {
      //use axios and custom paramater to limit search to 10 questions
      const questions = await axios("https://jservice.io/api/random?count=10");
      setQuestions(questions.data); //holds response data
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  useEffect(() => {
    updateQuestions();
  }, []); //empty array acts like componentDidMount as in, it only runs once so GET call only once

  return (
    <div className='App'>
      <h1>Jeopardy</h1>
      <button className='getQuestion' onClick={updateIndex}>
        Get Question
      </button>
      <div className='answer-button-container'>
        <div className='answer-details'>
          <div>
            Score: {score}
          </div>
          <div>
            Category:
            {questions.map((currentQuestion, i) => {
              if (i === indexOfQuestions) return currentQuestion.category.title;
            })}
          </div>
          <div>
            Points:
            {questions.map((currentQuestion, i) => {
              if (i === indexOfQuestions) return currentQuestion.value;
            })}
          </div>
          <div className='flex-container score-buttons'>
            <button onClick={scoreIncrease} className='button-increase'>
              Increase
            </button>
            <button onClick={scoreDecrease} className='button-decrease'>
              Decrease
            </button>
            <button onClick={scoreReset} className='button-reset'>
              Reset
            </button>
          </div>
        </div>

        {questions.map((currentQuestion, i) => {
          if (i === indexOfQuestions)
            return (
              <DisplayAnswer
                question={currentQuestion.question}
                answer={currentQuestion.answer}
              />
            );
        })}
      </div>
    </div>
  );
}

export default App;
