import React from "react";

import AddVocab from "./AddVocab";

const AddEnglishVocab = (props) => {
  return (
    <AddVocab
      wordType="English"
      tabValue={props.tabValue}
      setTabValue={props.setTabValue}
    />
  );
};

export default AddEnglishVocab;
