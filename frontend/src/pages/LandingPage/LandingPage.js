import React, { useState } from "react";
import ReactPlayer from "react-player";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import conversationImg from "../../content/internal/ConversationHero.svg";
import stopwatchIcon from "../../content/internal/StopwatchIcon.gif";
import conversationIcon from "../../content/internal/ConversationIcon.gif";
import easyIcon from "../../content/internal/EasyIcon.gif";
import OfferBlock from "./components/OfferBlock";

import SignUpForm from "./components/SignUpForm";

const offerBlockObjects = [
  {
    headline: "It's never been easier!",
    body:
      "Get the most common words right now, in the optimal way. On your phone, tablet, or computer. Vocabulary FAST will track your progress and help you reach your language learning goals. We promise.",
    icon: easyIcon,
    alt: "Easy Icon",
    specialCase: true,
  },
  {
    headline: "Learn at a record pace!",
    body:
      "Vocabulary FAST intelligently teaches you the right words, at the right time. Revisiting past words at the perfect time, FOR YOU! you will be blown away how fast you learn.",
    icon: stopwatchIcon,
    alt: "Stopwatch Icon",
    specialCase: false,
  },
  {
    headline: "Start conversations!",
    body:
      "Studies show if you know the 1000 most common words in a language you will understand 80% of day to day conversation. Learn the core words and start real conversations.",
    icon: conversationIcon,
    alt: "Conversation icon",
    specialCase: false,
  },
];

const useStyle = makeStyles((theme) => ({
  hero: {
    width: "100%",
  },
  card: {
    width: "55%",
    borderRadius: "50px",
    marginTop: "3em",
    marginBottom: "3em",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  story: {
    margin: "1em",
  },
  sectionTwo: {
    marginTop: "5em",
    [theme.breakpoints.down("xs")]: {
      marginTop: "0em",
    },
  },
  button: {
    fontSize: "3em",
    marginTop: "1.5em",
    borderRadius: "100px",
  },
  signupText: {
    marginTop: "1.5em",
    marginBottom: "1.5em",
  },
}));

const LandingPage = (props) => {
  const classes = useStyle();
  const theme = useTheme();
  const screenXS = useMediaQuery(theme.breakpoints.down("xs"));

  const [openSignupForm, setOpenSignupForm] = useState(false);

  return (
    <React.Fragment>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="row"
            style={{
              margin: 0,
              width: "100%",
            }}
          >
            <Grid item xl={6} sm={12}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={{
                  margin: 0,
                  width: "100%",
                }}
              >
                <Grid item>
                  <Typography variant="h3" align="center">
                    Learn core words and start conversations
                  </Typography>
                  <Typography variant="h2" align="center">
                    FASTER THAN EVER!
                  </Typography>
                  <div className={classes.headline} />
                </Grid>
                <Grid item align="center">
                  <ReactPlayer
                    width={screenXS ? "320px" : "640px"}
                    height={screenXS ? "180px" : "360px"}
                    className={classes.card}
                    url="https://youtu.be/7yznlssp0_k"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6} sm={12}>
              <img
                className={classes.hero}
                src={conversationImg}
                alt="Two people talking."
              ></img>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.sectionTwo}>
          <Grid
            container
            justify="space-evenly"
            alignItems="center"
            direction="row"
            spacing={10}
            style={{
              margin: 0,
              width: "100%",
            }}
          >
            {offerBlockObjects.map((offer, index) => {
              return (
                <OfferBlock
                  key={`${offer}${index}`}
                  headline={offer.headline}
                  icon={offer.icon}
                  alt={offer.alt}
                  specialCase={offer.specialCase}
                >
                  {offer.body}
                </OfferBlock>
              );
            })}
          </Grid>
        </Grid>
        <Grid item>
          <Typography
            variant="h3"
            align="center"
            className={classes.signupText}
          >
            Signup today and begin learning for free
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.button}
            onClick={() => setOpenSignupForm(true)}
          >
            SignUp
          </Button>
        </Grid>
      </Grid>
      <SignUpForm
        openSignupForm={openSignupForm}
        setOpenSignupForm={setOpenSignupForm}
      />
    </React.Fragment>
  );
};

export default LandingPage;
