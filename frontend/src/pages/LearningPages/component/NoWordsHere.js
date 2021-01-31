import React from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: "1.6rem",
    marginLeft: "1.5rem",
    borderRadius: "100px",
    marginTop: "5rem",
    [theme.breakpoints.down("xs")]: {
      marginTop: "2rem",
    },
  },
  text: { textAlign: "center" },
}));

const NoWordsHere = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {props.learningType === "EnglishQuiz" && (
        <React.Fragment>
          <Grid item>
            <Typography variant="h3" className={classes.text}>
              Add english words to quiz yourself!
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={classes.button}
              onClick={() => props.setTabValue(0)}
              component={Link}
              to={"/LearningDash/EnglishToSpanish/"}
            >
              English To Spanish
            </Button>
          </Grid>
        </React.Fragment>
      )}

      {props.learningType === "SpanishQuiz" && (
        <React.Fragment>
          <Grid item>
            <Typography variant="h3" className={classes.text}>
              Add spanish words to quiz yourself!
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={classes.button}
              onClick={() => props.setTabValue(1)}
              component={Link}
              to={"/LearningDash/SpanishToEnglish/"}
            >
              Spanish To English
            </Button>
          </Grid>
        </React.Fragment>
      )}

      {(props.learningType === "LearnedEnglish" ||
        props.learningType === "LearnedSpanish") && (
        <React.Fragment>
          <Grid item>
            <Typography variant="h3" className={classes.text}>
              You have not completed any words yet. Get to learning!
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={classes.button}
              onClick={() => props.setTabValue(0)}
              component={Link}
              to={"/LearningDash/EnglishToSpanish/"}
            >
              English To Spanish
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={classes.button}
              onClick={() => props.setTabValue(1)}
              component={Link}
              to={"/LearningDash/SpanishToEnglish/"}
            >
              Spanish To English
            </Button>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default NoWordsHere;
