import React from "react";

import VocabItemList from "../component/VocabItemList";

const QuizSpanish = (props) => {
  return (
    <VocabItemList learningType="SpanishQuiz" setTabValue={props.setTabValue} />
  );
};

export default QuizSpanish;
