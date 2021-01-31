import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Slide from "@material-ui/core/Slide";


const useStyles = makeStyles((theme) => ({
  wordImg: {
    width: "75%",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "3rem",
    marginBottom: "4rem",
    [theme.breakpoints.down("sm")]: {
      marginTop: "2rem",
      marginBottom: "4rem",
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
    [theme.breakpoints.down("xs")]: {
      marginTop: "2rem",
    },
  },
  text: { fontSize: "6rem", fontWeight: "400", textAlign: "center" },
}));

const VocabItemPre = (props) => {
  const classes = useStyles();

  let {
    wordID,
    englishWord,
    spanishWord,
    answer,
    sendAnswerHandler,
    textFieldHandler,
    learningType,
  } = props;

  return (
    <React.Fragment>
      <Grid item>
        {!wordID && (
          <Grid>
            <CircularProgress color="primary" />
          </Grid>
        )}

        {wordID && (
          <Slide in={true}>
            <Typography variant="h3" className={classes.text}>
              {learningType === "EnglishToSpanish" ? englishWord : spanishWord}
            </Typography>
          </Slide>
        )}
      </Grid>
      <Grid item>
        {wordID && (
          <Slide in={true}>
            <img
              src={require(`../../../content/internal/WordPictures/word${wordID}.png`)}
              alt="place holder"
              className={classes.wordImg}
            />
          </Slide>
        )}
      </Grid>
      <Grid
        item
        container
        justify="center"
        alignItems="center"
        className={classes.answer}
      >
        <Grid item>
          <Slide in={true}>
            <TextField
              variant="outlined"
              label="answer"
              value={answer}
              onChange={textFieldHandler}
            />
          </Slide>
        </Grid>
        <Grid item>
          <Slide in={true}>
            <Button
              variant="contained"
              color="secondary"
              lable="answer"
              size="large"
              onClick={sendAnswerHandler}
              className={classes.button}
            >
              Submit
            </Button>
          </Slide>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default VocabItemPre;
