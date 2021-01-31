import React from "react";

import AddVocab from "./AddVocab";

const AddSpanishVocab = (props) => {
  return (
    <AddVocab
      wordType="Spanish"
      tabValue={props.tabValue}
      setTabValue={props.setTabValue}
    />
  );
};

export default AddSpanishVocab;
