import React, { useState, useContext } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Divider from "@material-ui/core/Divider";
import Slide from "@material-ui/core/Slide";

import theme from "../../../shared/themes/theme";
import { useHttpRequest } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  item: {
    marginBottom: "1rem",
  },
  divider: {
    width: "80%",
    marginBottom: "1rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  answer: {
    color: theme.palette.common.pink,
    textAlign: "center",
    marginLeft: "1rem",
  },
  key: { textAlign: "center" },
}));

const ListItem = (props) => {
  const classes = useStyles();
  const screenSM = useMediaQuery(theme.breakpoints.down("sm"));
  const auth = useContext(AuthContext);

  const [showAnswer, setShowAnswer] = useState(false);
  const { sendRequest } = useHttpRequest();
  const [hasBeenRemoved, setHasBeenRemoved] = useState(false);

  const showAnswerHandler = () => {
    setShowAnswer(!showAnswer);
  };

  const removeQuizItem = async () => {
    try {
      const responseData = await sendRequest(
        props.learningType === "EnglishQuiz"
          ? process.env.REACT_APP_BACKEND_URL + "quiz/removequizetos"
          : process.env.REACT_APP_BACKEND_URL + "quiz//removequizstoe",
        "POST",
        JSON.stringify({ english_spanish_words_id: props.wordID }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      if (responseData) {
        setHasBeenRemoved(true);
      }
    } catch (err) {}
  };

  if (hasBeenRemoved === true) {
    return null;
  }

  return (
    <React.Fragment>
      <Grid
        item
        container
        direction={screenSM ? "column" : "row"}
        justify="space-between"
        alignItems="center"
        className={classes.container}
      >
        <Grid item className={classes.item}>
          <Slide in={true} direction="right" timeout={400}>
            <Typography variant="h3" className={classes.key}>
              {props.vocabKey}
            </Typography>
          </Slide>
        </Grid>
        {!showAnswer && (
          <Grid item className={classes.item}>
            <Slide in={true} direction="left">
              <ButtonGroup variant="contained" color="secondary">
                <Button onClick={showAnswerHandler}>Reveal</Button>
                <Button onClick={removeQuizItem}>Remove</Button>
              </ButtonGroup>
            </Slide>
          </Grid>
        )}

        {showAnswer && (
          <Grid item>
            <Grid
              container
              direction="row"
              className={classes.item}
              alignItems="center"
            >
              <Grid>
                <Slide in={true} direction="left">
                  <ButtonGroup variant="contained" color="secondary">
                    <Button onClick={showAnswerHandler}>Hide</Button>
                    <Button onClick={removeQuizItem}>Remove</Button>
                  </ButtonGroup>
                </Slide>
              </Grid>
              <Grid>
                <Slide in={true} direction="left">
                  <Typography
                    variant="h3"
                    onClick={showAnswerHandler}
                    className={classes.answer}
                  >
                    {props.vocabAnswer}
                  </Typography>
                </Slide>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Divider className={classes.divider}></Divider>
    </React.Fragment>
  );
};

export default ListItem;
