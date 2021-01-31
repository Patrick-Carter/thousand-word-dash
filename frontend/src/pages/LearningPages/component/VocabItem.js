import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

import { useHttpRequest } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import VocabItemPre from "./VocabItemPre";
import VocabItemPost from "./VocabItemPost";

const useStyles = makeStyles((theme) => ({
  mainGrid: { height: "100%", width: "100%" },
  errorMessage: { color: "RED" },
  text: { fontSize: "6rem", fontWeight: "400" },
  loadingBar: { width: "80vw" },
}));

const Vocab = (props) => {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();

  const [englishWord, setEnglishWord] = useState();
  const [spanishWord, setSpanishWord] = useState();
  const [answer, setAnswer] = useState("");
  const [wordID, setWordID] = useState();
  const [stage, setStage] = useState();
  const [nextStage, setNextStage] = useState();
  const [hasAnswered, setHasAnswered] = useState(false);
  const [evaluation, setEvaluation] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpRequest();

  if (error) {
    clearError();
  }

  useEffect(() => {
    if (!hasAnswered) {
      const fetchWord = async (url, key_word) => {
        try {
          const responseData = await sendRequest(url, "GET", null, {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          });

          if (responseData.noWords === true) {
            if (key_word === "english_word") {
              history.push("/LearningDash/AddEnglishVocab/");
            } else {
              history.push("/LearningDash/AddSpanishVocab/");
            }
          }

          setEnglishWord(responseData.word.english_word);
          setSpanishWord(responseData.word.spanish_word);
          setStage(responseData.stage);
          setNextStage(responseData.nextStage);
          setWordID(responseData.word.id);
        } catch (err) {}
      };

      switch (props.learningType) {
        case "EnglishToSpanish":
          fetchWord(process.env.REACT_APP_BACKEND_URL + "etos", "english_word");
          break;
        case "SpanishToEnglish":
          fetchWord(process.env.REACT_APP_BACKEND_URL + "stoe", "spanish_word");
          break;
        default:
          break;
      }
    }
  }, [props.learningType, sendRequest, auth.token, hasAnswered, history]);

  const sendAnswerHandler = async () => {
    const checkWord = async (url) => {
      try {
        const responseData = await sendRequest(
          url,
          "POST",
          JSON.stringify({
            answer: answer,
            key:
              props.learningType === "EnglishToSpanish"
                ? spanishWord
                : englishWord,
            english_spanish_words_id: wordID,
            add_quiz: false,
            next_stage: nextStage,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );

        setEvaluation(responseData.answerCheck);
        setHasAnswered(true);
      } catch (err) {}
    };

    switch (props.learningType) {
      case "EnglishToSpanish":
        checkWord(process.env.REACT_APP_BACKEND_URL + "etos/checketos");
        break;
      case "SpanishToEnglish":
        checkWord(process.env.REACT_APP_BACKEND_URL + "stoe/checkstoe");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (
      stage &&
      stage === "learn" &&
      props.learningType === "EnglishToSpanish"
    ) {
      setAnswer(spanishWord);
    } else if (
      stage &&
      stage === "learn" &&
      props.learningType === "SpanishToEnglish"
    ) {
      setAnswer(englishWord);
    }
  }, [stage, props.learningType, spanishWord, englishWord]);

  const textFieldHandler = (e) => {
    setAnswer(e.target.value);
  };

  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
      alignItems="center"
      className={classes.mainGrid}
    >
      {!wordID && isLoading && (
        <Grid item>
          <LinearProgress className={classes.loadingBar} />
        </Grid>
      )}

      {!isLoading && !hasAnswered && (
        <VocabItemPre
          englishWord={englishWord}
          spanishWord={spanishWord}
          answer={answer}
          textFieldHandler={textFieldHandler}
          sendAnswerHandler={sendAnswerHandler}
          wordID={wordID}
          stage={stage}
          learningType={props.learningType}
        />
      )}

      {hasAnswered && (
        <VocabItemPost
          englishWord={englishWord}
          spanishWord={spanishWord}
          answer={answer}
          wordID={wordID}
          setWordID={setWordID}
          learningType={props.learningType}
          evaluation={evaluation}
          setHasAnswered={setHasAnswered}
          setAnswer={setAnswer}
        />
      )}
    </Grid>
  );
};

export default Vocab;
