import React from "react";

import VocabItemList from "../component/VocabItemList";

const LearnedEnglish = (props) => {
  return (
    <VocabItemList
      learningType="LearnedEnglish"
      setTabValue={props.setTabValue}
    />
  );
};

export default LearnedEnglish;
