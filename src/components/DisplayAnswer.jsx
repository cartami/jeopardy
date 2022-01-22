import React, { useState } from "react";

const DisplayAnswer = ({ question, answer }) => {
  //state for showing answer
  const [showAnswer, setAnswerStateHandler] = useState(false);

  const ShowAnswerhandler = () => {
    // sets to opposite value whenever clicked
    setAnswerStateHandler(!showAnswer);
  };

  return (
    <>
      <div className="display-question"> {question} </div>
      <button className="display-answer-button" onClick={ShowAnswerhandler}>
        Show Answer
      </button>
      {/*if boolean value shows true then answer will show*/}
      <div className="display-answer"> {showAnswer && answer} </div>
    </>
  );
};

export default DisplayAnswer;
