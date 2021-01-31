import React from "react";

import VocabItemList from "../component/VocabItemList";

const QuizEnglish = (props) => {
  return (
    <VocabItemList learningType="EnglishQuiz" setTabValue={props.setTabValue} />
  );
};

export default QuizEnglish;
