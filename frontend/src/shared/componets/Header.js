import React, { useState, useContext, useEffect } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import logo from "../../content/internal/TWDlogo.svg";
import LoginForm from "../../pages/LandingPage/components/LoginForm";
import SignUpForm from "../../pages/LandingPage/components/SignUpForm";
import { AuthContext } from "../context/auth-context";
import theme from "../themes/theme";

const muiTheme = theme;

const ElevationScroll = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 3 : 3,
  });
};

let useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "5.5em",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1em",
    },
  },
  logo: {
    marginLeft: "5px",
    height: "8em",
    [theme.breakpoints.down("sm")]: {
      height: "6em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "4.5em",
      marginRight: "1em",
    },
  },
  logoButton: {
    padding: "0",
    "&:hover": { backgroundColor: "transparent" },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "10px",
    },
  },
  auth: {
    marginLeft: "auto",
    marginRight: "2em",
    fontSize: "1.2rem",
    borderRadius: "100px",
    [theme.breakpoints.down("xs")]: {
      marginRight: "10px",
    },
  },
  signUpButton: {
    backgroundColor: "#d81b60",
    borderRadius: "100px",
    fontSize: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: ".8rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: ".8rem",
    },
  },
  loginButton: {
    borderRadius: "100px",
    fontSize: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: ".8rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: ".8rem",
    },
  },
  tabContainer: { color: "white", marginLeft: "auto" },
  tab: {
    textTransform: "none",
    fontSize: "1rem",
    minWidth: 10,
    marginRight: "25px",
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawIcon: {
    height: "2.5rem",
    width: "2.5rem",
    color: "white",
  },
  drawer: {
    backgroundColor: muiTheme.palette.common.blue,
  },
  drawerText: {
    ...muiTheme.typography.body1,
    color: "white",
    fontSize: "1rem",
  },
  appbar: {
    zIndex: muiTheme.zIndex.modal + 1,
  },
}));

const Header = (props) => {
  let { tabValue, setTabValue } = props;

  const auth = useContext(AuthContext);

  const theme = useTheme();

  const screenLG = useMediaQuery(theme.breakpoints.down("lg"));
  const screenSM = useMediaQuery(theme.breakpoints.down("sm"));
  const screenXS = useMediaQuery(theme.breakpoints.down("xs"));
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const classes = useStyles();

  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openSignupForm, setOpenSignupForm] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const url = window.location.pathname;

    if (url.includes("EnglishToSpanish")) {
      setTabValue(() => 0);
    } else if (url.includes("SpanishToEnglish")) {
      setTabValue(() => 1);
    } else if (url.includes("QuizEnglish")) {
      setTabValue(() => 2);
    } else if (url.includes("QuizSpanish")) {
      setTabValue(() => 3);
    } else if (url.includes("LearnedEnglish")) {
      setTabValue(() => 4);
    } else if (url.includes("LearnedSpanish")) {
      setTabValue(() => 5);
    }
  }, [tabValue, setTabValue]);

  const tabChangeHandler = (e, value) => {
    setTabValue(() => value);
  };

  const DefineButtonSize = () => {
    let buttonSize = "large";
    // be observent of correct order
    if (screenSM) buttonSize = "medium";
    if (screenXS) buttonSize = "small";

    return buttonSize;
  };

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        classes={{ paper: classes.drawer }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          <ListItem
            divider
            button
            selected={tabValue === 0}
            onClick={() => {
              setOpenDrawer(false);
              setTabValue(0);
            }}
            component={NavLink}
            to={"/LearningDash/EnglishToSpanish/"}
          >
            <ListItemText className={classes.drawerText} disableTypography>
              English To Spanish
            </ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            selected={tabValue === 1}
            onClick={() => {
              setOpenDrawer(false);
              setTabValue(1);
            }}
            component={NavLink}
            to={"/LearningDash/SpanishToEnglish/"}
          >
            <ListItemText className={classes.drawerText} disableTypography>
              Spanish To English
            </ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            selected={tabValue === 2}
            onClick={() => {
              setOpenDrawer(false);
              setTabValue(2);
            }}
            component={NavLink}
            to={"/LearningDash/Quiz/QuizEnglish/"}
          >
            <ListItemText className={classes.drawerText} disableTypography>
              English Quiz
            </ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            selected={tabValue === 3}
            onClick={() => {
              setOpenDrawer(false);
              setTabValue(3);
            }}
            component={NavLink}
            to={"/LearningDash/Quiz/QuizSpanish/"}
          >
            <ListItemText className={classes.drawerText} disableTypography>
              Spanish Quiz
            </ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            selected={tabValue === 4}
            onClick={() => {
              setOpenDrawer(false);
              setTabValue(4);
            }}
            component={NavLink}
            to="/LearningDash/LearnedEnglish/"
          >
            <ListItemText className={classes.drawerText} disableTypography>
              Learned English
            </ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            selected={tabValue === 5}
            onClick={() => {
              setOpenDrawer(false);
              setTabValue(5);
            }}
            component={NavLink}
            to="/LearningDash/LearnedSpanish/"
          >
            <ListItemText className={classes.drawerText} disableTypography>
              Learned Spanish
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon className={classes.drawIcon} />
      </IconButton>
    </React.Fragment>
  );

  const tabs = (
    <Tabs
      className={classes.tabContainer}
      value={tabValue}
      onChange={tabChangeHandler}
      variant="standard"
      indicatorColor="primary"
    >
      <Tab
        label="English To Spanish"
        className={classes.tab}
        component={NavLink}
        to={"/LearningDash/EnglishToSpanish/"}
      />
      <Tab
        label="Spanish To English"
        className={classes.tab}
        component={NavLink}
        to={"/LearningDash/SpanishToEnglish/"}
      />
      <Tab
        label="English Quiz"
        className={classes.tab}
        component={NavLink}
        to={"/LearningDash/Quiz/QuizEnglish/"}
      />
      <Tab
        label="Spanish Quiz"
        className={classes.tab}
        component={NavLink}
        to={"/LearningDash/Quiz/QuizSpanish/"}
      />
      <Tab
        label="Learned English"
        className={classes.tab}
        component={NavLink}
        to="/LearningDash/LearnedEnglish/"
      />
      <Tab
        label="Learned Spanish"
        className={classes.tab}
        component={NavLink}
        to="/LearningDash/LearnedSpanish/"
      />
    </Tabs>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar disableGutters>
            <Button
              className={classes.logoButton}
              component={NavLink}
              onClick={() => setTabValue(false)}
              to="/LearningDash"
              disableRipple
            >
              <img src={logo} alt="Company logo" className={classes.logo} />
            </Button>

            {auth.isLoggedIn && screenLG && drawer}
            {auth.isLoggedIn && !screenLG && tabs}

            {!auth.isLoggedIn && (
              <ButtonGroup
                className={classes.auth}
                variant="contained"
                color="secondary"
                size={DefineButtonSize()}
              >
                <Button
                  className={classes.loginButton}
                  onClick={() => setOpenLoginForm(true)}
                >
                  Login
                </Button>
                <Button
                  className={classes.signUpButton}
                  onClick={() => setOpenSignupForm(true)}
                >
                  SignUp
                </Button>
              </ButtonGroup>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
      {!auth.isLoggedIn && (
        <div>
          <LoginForm
            openLoginForm={openLoginForm}
            setOpenLoginForm={setOpenLoginForm}
          />
          <SignUpForm
            openSignupForm={openSignupForm}
            setOpenSignupForm={setOpenSignupForm}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default Header;
