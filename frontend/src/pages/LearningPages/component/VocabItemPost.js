import React, { useContext } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useHttpRequest } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";

import checkBox from "../../../content/internal/VocabEvaluation/CheckmarkCOMP.png";
import x from "../../../content/internal/VocabEvaluation/xCOMP.png";

const useStyles = makeStyles((theme) => ({
  wordImg: {
    width: "75%",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "2rem",
    [theme.breakpoints.down("sm")]: {
      marginTop: "2rem",
      marginBottom: "2rem",
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      marginTop: "1rem",
      marginBottom: "2rem",
    },
  },
  button: {
    fontSize: "1.6rem",
    marginLeft: "1.5rem",
    borderRadius: "100px",
    marginBottom: "2rem",
    [theme.breakpoints.down("xs")]: {
      marginTop: "2rem",
    },
  },
  text: { textAlign: "center", marginBottom: "2rem", marginRight: "1rem" },
}));
const VocabItemPost = (props) => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpRequest();

  let {
    englishWord,
    spanishWord,
    answer,
    learningType,
    evaluation,
    setHasAnswered,
    setAnswer,
    setWordID,
  } = props;

  const nextWordHandler = () => {
    setAnswer("");
    setWordID(false);
    setHasAnswered(false);
  };

  const addToQuizHandler = async () => {
    try {
      const responseData = await sendRequest(
        learningType === "EnglishToSpanish"
          ? process.env.REACT_APP_BACKEND_URL + "quiz/addquizetos"
          : process.env.REACT_APP_BACKEND_URL + "quiz/addquizstoe",
        "POST",
        JSON.stringify({ english_spanish_words_id: props.wordID }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      if (responseData) {
      }
    } catch (err) {}

    setAnswer("");
    setHasAnswered(false);
  };

  return (
    <React.Fragment>
      <Grid item>
        <Slide in={true}>
          <img
            src={evaluation ? checkBox : x}
            alt={evaluation ? "Correct" : "Incorrect"}
            className={classes.wordImg}
          />
        </Slide>
      </Grid>

      {evaluation && (
        <Grid item>
          <Slide in={true}>
            <Typography variant="h2" className={classes.text}>
              Good Job!
            </Typography>
          </Slide>
        </Grid>
      )}

      {learningType === "EnglishToSpanish" && evaluation === false && (
        <Grid item>
          <Grid item container direction="row" alignItems="center">
            <Grid item xs={12} sm>
              <Slide in={true}>
                <Typography variant="h2" className={classes.text}>
                  Word:
                </Typography>
              </Slide>
            </Grid>
            <Grid item xs={12} sm>
              <Slide in={true}>
                <Typography variant="h3" className={classes.text}>
                  {englishWord}
                </Typography>
              </Slide>
            </Grid>
          </Grid>

          <Grid item container direction="row" alignItems="center">
            <Grid item xs={12} sm>
              <Slide in={true}>
                <Typography variant="h2" className={classes.text}>
                  Answer:
                </Typography>
              </Slide>
            </Grid>
            <Grid item xs={12} sm>
              <Slide in={true}>
                <Typography variant="h3" className={classes.text}>
                  {spanishWord}
                </Typography>
              </Slide>
            </Grid>
          </Grid>

          <Grid item container direction="row" alignItems="center">
            <Grid item xs={12} sm>
              <Slide in={true}>
                <Typography variant="h2" className={classes.text}>
                  Submission:
                </Typography>
              </Slide>
            </Grid>
            <Grid item xs={12} sm>
              <Slide in={true}>
                <Typography variant="h3" className={classes.text}>
                  {answer}
                </Typography>
              </Slide>
            </Grid>
          </Grid>
        </Grid>
      )}

      {learningType === "SpanishToEnglish" && evaluation === false && (
        <Grid item>
          <Grid item container direction="row" alignItems="center">
            <Grid item xs={12} sm>
              <Slide in={true}>
                <Typography variant="h2" className={classes.text}>
                  Word:
                </Typography>
              </Slide>
            </Grid>
            <Grid item xs={12} sm>
              <Slide in={true}>
                <Typography variant="h3" className={classes.text}>
                  {spanishWord}
                </Typography>
              </Slide>
            </Grid>
          </Grid>

          <Grid item container direction="row" alignItems="center">
            <Grid item xs={12} sm>
              <Slide in={true}>
                <Typography variant="h2" className={classes.text}>
                  Possible Answers:
                </Typography>
              </Slide>
            </Grid>
            <Grid item xs={12} sm>
              <Slide in={true}>
                <Typography variant="h3" className={classes.text}>
                  {englishWord}
                </Typography>
              </Slide>
            </Grid>
          </Grid>

          <Grid item container direction="row" alignItems="center">
            <Grid item xs={12} sm>
              <Slide in={true}>
                <Typography variant="h2" className={classes.text}>
                  Submission:
                </Typography>
              </Slide>
            </Grid>
            <Grid item xs={12} sm>
              <Slide in={true}>
                <Typography variant="h3" className={classes.text}>
                  {answer}
                </Typography>
              </Slide>
            </Grid>
          </Grid>
        </Grid>
      )}

      <Grid item>
        <Slide in={true}>
          <Button
            color="secondary"
            variant="contained"
            className={classes.button}
            onClick={nextWordHandler}
            disabled={isLoading !== true ? false : true}
          >
            Next
          </Button>
        </Slide>
      </Grid>
      <Grid item>
        <Slide in={true}>
          <Button
            color="secondary"
            variant="contained"
            className={classes.button}
            onClick={addToQuizHandler}
            disabled={isLoading !== true ? false : true}
          >
            Add To Quiz
          </Button>
        </Slide>
      </Grid>
      {isLoading && (
        <Grid item>
          <CircularProgress color="primary" />
        </Grid>
      )}
    </React.Fragment>
  );
};

export default VocabItemPost;
