import React, { useEffect, useContext, useState } from "react";

import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";

import { useHttpRequest } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import ListItem from "./ListItem";
import NoWordsHere from "./NoWordsHere.js";

const VocabItemList = (props) => {
  const auth = useContext(AuthContext);

  const { sendRequest } = useHttpRequest();
  const [wordList, setWordList] = useState();
  const [wordType, setWordType] = useState("");
  const [wordAnswer, setWordAnswer] = useState("");

  useEffect(() => {
    const fetchWords = async (url) => {
      try {
        const responseData = await sendRequest(url, "GET", null, {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        });
        setWordList(responseData.words);
      } catch (err) {}
    };

    switch (props.learningType) {
      case "EnglishQuiz":
        setWordType("english_word");
        setWordAnswer("spanish_word");
        fetchWords(process.env.REACT_APP_BACKEND_URL + "quiz/english");
        break;
      case "SpanishQuiz":
        setWordType("spanish_word");
        setWordAnswer("english_word");
        fetchWords(process.env.REACT_APP_BACKEND_URL + "quiz/spanish");
        break;
      case "LearnedEnglish":
        setWordType("english_word");
        setWordAnswer("spanish_word");
        fetchWords(process.env.REACT_APP_BACKEND_URL + "learned/english");
        break;
      case "LearnedSpanish":
        setWordType("spanish_word");
        setWordAnswer("english_word");
        fetchWords(process.env.REACT_APP_BACKEND_URL + "learned/spanish");
        break;
      default:
        break;
    }
  }, [sendRequest, auth.token, props.learningType]);

  return (
    <Grid container direction="column" alignItems="center">
      {!wordList && (
        <Grid item>
          <LinearProgress style={{ width: "80vw" }} />
        </Grid>
      )}

      {wordList && wordList.length < 1 && (
        <NoWordsHere
          learningType={props.learningType}
          setTabValue={props.setTabValue}
        />
      )}

      {wordList &&
        wordList.map((word, index) => {
          return (
            <ListItem
              key={`${word}${index}`}
              vocabKey={word[wordType][wordType]}
              vocabAnswer={word[wordType][wordAnswer]}
              wordID={word.english_spanish_words_id}
              learningType={props.learningType}
            />
          );
        })}
    </Grid>
  );
};

export default VocabItemList;
