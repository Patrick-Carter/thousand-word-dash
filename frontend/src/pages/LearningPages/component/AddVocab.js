import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";

import { useHttpRequest } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";

const useStyles = makeStyles((theme) => ({
  text: {
    textAlign: "center",
    marginBottom: "3em",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2rem",
    },
  },
  button: {
    fontSize: "1.6rem",
    marginLeft: "8rem",
    marginRight: "8rem",
    marginBottom: "6em",
    borderRadius: "100px",
    paddingLeft: "1.5em",
    paddingRight: "1.5em",
    [theme.breakpoints.down("xs")]: {
      marginTop: "2rem",
      marginBottom: "2rem",
      marginLeft: "1rem",
      marginRight: "1rem",
    },
  },
}));

const AddVocab = (props) => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const classes = useStyles();

  const { sendRequest } = useHttpRequest();
  const [disableButtons, setDisableButtons] = useState(false);

  const addOneVocabHandler = async () => {
    setDisableButtons(true);

    try {
      const responseData = await sendRequest(
        props.wordType === "English"
          ? process.env.REACT_APP_BACKEND_URL + "etos/addmoreetos"
          : process.env.REACT_APP_BACKEND_URL + "stoe/addmorestoe",
        "POST",
        JSON.stringify({ add_amount: 1 }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      if (responseData !== null) {
        if (props.wordType === "English") {
          history.push("/LearningDash/EnglishToSpanish/");
        } else {
          history.push("/LearningDash/SpanishToEnglish/");
        }
      }
    } catch (err) {}
  };

  const addThreeVocabHandler = async () => {
    setDisableButtons(true);

    try {
      const responseData = await sendRequest(
        props.wordType === "English"
          ? process.env.REACT_APP_BACKEND_URL + "etos/addmoreetos"
          : process.env.REACT_APP_BACKEND_URL + "stoe/addmorestoe",
        "POST",
        JSON.stringify({ add_amount: 3 }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      if (responseData !== null) {
        if (props.wordType === "English") {
          history.push("/LearningDash/EnglishToSpanish/");
        } else {
          history.push("/LearningDash/SpanishToEnglish/");
        }
      }
    } catch (err) {}
  };

  const addFiveVocabHandler = async () => {
    setDisableButtons(true);

    try {
      const responseData = await sendRequest(
        props.wordType === "English"
          ? process.env.REACT_APP_BACKEND_URL + "etos/addmoreetos"
          : process.env.REACT_APP_BACKEND_URL + "stoe/addmorestoe",
        "POST",
        JSON.stringify({ add_amount: 5 }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      if (responseData !== null) {
        if (props.wordType === "English") {
          history.push("/LearningDash/EnglishToSpanish/");
        } else {
          history.push("/LearningDash/SpanishToEnglish/");
        }
      }
    } catch (err) {}
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <Slide in={true}>
          <Typography variant="h3" className={classes.text}>
            You have studied all your vocab today. Would you like to add more{" "}
            {props.wordType === "English"
              ? "English To Spanish"
              : "Spanish To English"}{" "}
            vocab?
          </Typography>
        </Slide>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
          <Slide in={true}>
            <Button
              id="addOne"
              className={classes.button}
              variant="contained"
              color="secondary"
              size="large"
              onClick={addOneVocabHandler}
              disabled={disableButtons}
            >
              +1
            </Button>
          </Slide>
        </Grid>
        <Grid item>
          <Slide in={true}>
            <Button
              id="addThree"
              className={classes.button}
              variant="contained"
              color="secondary"
              size="large"
              onClick={addThreeVocabHandler}
              disabled={disableButtons}
            >
              +3
            </Button>
          </Slide>
        </Grid>
        <Grid item>
          <Slide in={true}>
            <Button
              id="addFive"
              className={classes.button}
              variant="contained"
              color="secondary"
              size="large"
              onClick={addFiveVocabHandler}
              disabled={disableButtons}
            >
              +5
            </Button>
          </Slide>
        </Grid>
      </Grid>
      <Grid>
        <Slide in={true}>
          <Button
            id="noThankYou"
            className={classes.button}
            variant="contained"
            color="secondary"
            size="large"
            disabled={disableButtons}
            onClick={() => props.setTabValue(false)}
            component={Link}
            to={"/LearningDash"}
          >
            No Thanks
          </Button>
        </Slide>
      </Grid>
    </Grid>
  );
};

export default AddVocab;
