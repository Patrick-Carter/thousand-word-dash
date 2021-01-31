import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyle = makeStyles((theme) => ({
  offerImgEasy: {
    marginLeft: "5em",
    [theme.breakpoints.down("md")]: {
      marginLeft: "3.2em",
    },
  },
  offerHeadline: {
    marginTop: "-1em",
    marginBottom: "1em",
  },
}));

const OfferBlock = (props) => {
  const classes = useStyle();
  return (
    <Grid item md={4}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={5}
        style={{
          margin: 0,
          width: "100%",
        }}
      >
        <Grid item>
          <img src={props.icon} alt={props.alt} className={props.specialCase ? classes.offerImgEasy : classes.offerImg} />
        </Grid>
        <Grid item>
          <Typography
            variant="h6"
            align="center"
            className={classes.offerHeadline}
          >
            {props.headline}
          </Typography>
          <Typography variant="body2" align="center">
            {props.children}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OfferBlock;
