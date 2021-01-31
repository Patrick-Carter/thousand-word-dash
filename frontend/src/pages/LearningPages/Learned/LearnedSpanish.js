import React from "react";

import VocabItemList from "../component/VocabItemList";

const LearnedSpanish = (props) => {
  return (
    <VocabItemList
      learningType="LearnedSpanish"
      tabValue={props.tabValue}
      setTabValue={props.setTabValue}
    />
  );
};

export default LearnedSpanish;
