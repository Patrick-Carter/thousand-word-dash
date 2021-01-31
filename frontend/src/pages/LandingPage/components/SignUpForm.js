import React, { useReducer, useContext } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdorment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CircularProgress from "@material-ui/core/CircularProgress";

import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpRequest } from "../../../shared/hooks/http-hook";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  validate,
} from "../../../shared/util/validators";

const useStyles = makeStyles((theme) => ({
  errorMessage: { color: "RED" },
}));

const ACTIONS = {
  EMAILVALUE: "emailValue",
  EMAILTOUCHED: "emailTouched",
  EMAILCONFIRMVALUE: "emailConfirmValue",
  EMAILCONFIRMTOUCH: "emailConfirmTouch",
  PASSWORDVISIBLE: "passwordVisible",
  PASSWORDVALUE: "passwordValue",
  PASSWORDTOUCHED: "passwordTouched",
  PASSWORDCONFIRMVALUE: "passwordConfirmValue",
  PASSWORDCONFIRMTOUCH: "passwordConfirmTouch",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.EMAILVALUE:
      return {
        ...state,
        email: action.val,
        emailValid: validate(action.val, action.validators),
        emailConfirmValid: action.val === state.emailConfirm,
      };
    case ACTIONS.EMAILTOUCHED:
      return {
        ...state,
        emailTouched: true,
        emailConfirmValid: state.email === state.emailConfirm,
      };
    case ACTIONS.EMAILCONFIRMVALUE:
      return {
        ...state,
        emailConfirm: action.val,
        emailConfirmValid: state.email === action.val,
      };
    case ACTIONS.EMAILCONFIRMTOUCH:
      return {
        ...state,
        emailConfirmTouched: true,
        emailConfirmValid: state.email === state.emailConfirm,
      };
    case ACTIONS.PASSWORDVALUE:
      return {
        ...state,
        password: action.val,
        passwordValid: validate(action.val, action.validators),
        passwordConfirmValid: action.val === state.passwordConfirm,
      };
    case ACTIONS.PASSWORDTOUCHED:
      return {
        ...state,
        passwordTouched: true,
        passwordConfirmValid: state.password === state.passwordConfirm,
      };
    case ACTIONS.PASSWORDCONFIRMVALUE:
      return {
        ...state,
        passwordConfirm: action.val,
        passwordConfirmValid: state.password === action.val,
      };
    case ACTIONS.PASSWORDCONFIRMTOUCH:
      return {
        ...state,
        passwordConfirmTouched: true,
        passwordConfirmValid: state.password === state.passwordConfirm,
      };
    case ACTIONS.PASSWORDVISIBLE:
      return {
        ...state,
        showPassword:
          state.showPassword === "password"
            ? (state.showPassword = "text")
            : (state.showPassword = "password"),
      };
    default:
      return { ...state };
  }
};

const SignUpForm = (props) => {
  const classes = useStyles();
  const auth = useContext(AuthContext);

  const [state, dispatch] = useReducer(formReducer, {
    email: "",
    emailValid: false,
    emailTouched: false,
    emailConfirm: "",
    emailConfirmValid: false,
    emailConfirmTouched: false,
    password: "",
    passwordValid: false,
    passwordTouched: false,
    passwordConfirm: "",
    passwordConfirmValid: false,
    passwordConfirmTouched: false,
    showPassword: "password",
  });
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();

  const emailHandler = (event) => {
    dispatch({
      type: ACTIONS.EMAILVALUE,
      val: event.target.value,
      validators: [VALIDATOR_EMAIL()],
    });
  };

  const emailTouchHandler = () => {
    dispatch({ type: ACTIONS.EMAILTOUCHED });
  };

  const emailConfirmHandler = (event) => {
    dispatch({
      type: ACTIONS.EMAILCONFIRMVALUE,
      val: event.target.value,
    });
  };

  const emailConfirmTouchedHandler = () => {
    dispatch({ type: ACTIONS.EMAILCONFIRMTOUCH });
  };

  const passwordHandler = (event) => {
    dispatch({
      type: ACTIONS.PASSWORDVALUE,
      val: event.target.value,
      validators: [VALIDATOR_MINLENGTH(5)],
    });
  };

  const passwordTouchedHandler = () => {
    dispatch({ type: ACTIONS.PASSWORDTOUCHED });
  };

  const passwordVisibilityHandler = () => {
    dispatch({ type: ACTIONS.PASSWORDVISIBLE });
  };

  const passwordConfirmHandler = (event) => {
    dispatch({
      type: ACTIONS.PASSWORDCONFIRMVALUE,
      val: event.target.value,
    });
  };

  const passwordConfirmTouchedHandler = () => {
    dispatch({ type: ACTIONS.PASSWORDCONFIRMTOUCH });
  };

  const mouseDownPasswordHandler = (event) => {
    event.preventDefault();
  };

  const signupHandler = async (event) => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "user/signup",
        "POST",
        JSON.stringify({
          email: state.email,
          password: state.password,
        }),
        { "Content-Type": "application/json" }
      );

      auth.login(responseData.token);
    } catch (err) {}
  };

  return (
    <Dialog
      open={props.openSignupForm}
      onClose={() => props.setOpenSignupForm(false)}
    >
      <form onSubmit={signupHandler}>
        <DialogContent>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <Typography variant="h3">Signup</Typography>
            </Grid>
            <Grid item>
              <TextField
                id="email"
                label="Email"
                value={state.email}
                onChange={emailHandler}
                onBlur={emailTouchHandler}
                InputProps={{
                  endAdornment: (
                    <InputAdorment position="end">
                      <AccountCircle />
                    </InputAdorment>
                  ),
                }}
                helperText={
                  !state.emailValid &&
                  state.emailTouched &&
                  "please enter a valid email"
                }
                error={!state.emailValid && state.emailTouched}
                required
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                id="email-confirm"
                label="Confirm Email"
                value={state.emailConfirm}
                onChange={emailConfirmHandler}
                onBlur={emailConfirmTouchedHandler}
                InputProps={{
                  endAdornment: (
                    <InputAdorment position="end">
                      <AccountCircle />
                    </InputAdorment>
                  ),
                }}
                helperText={
                  !state.emailConfirmValid &&
                  state.emailConfirmTouched &&
                  "emails must match"
                }
                error={!state.emailConfirmValid && state.emailConfirmTouched}
                required
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                id="password"
                label="Password"
                type={state.showPassword}
                value={state.password}
                onChange={passwordHandler}
                onBlur={passwordTouchedHandler}
                InputProps={{
                  endAdornment: (
                    <InputAdorment position="end">
                      <IconButton
                        tabIndex="-1"
                        style={{ margin: "0", padding: "0" }}
                        aria-label="toggle password visibility"
                        onClick={passwordVisibilityHandler}
                        onMouseDown={mouseDownPasswordHandler}
                      >
                        {state.showPassword === "password" ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdorment>
                  ),
                }}
                helperText={
                  !state.passwordValid &&
                  state.passwordTouched &&
                  "password must be atleast 5 charactors"
                }
                error={!state.passwordValid && state.passwordTouched}
                required
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                id="password-confirm"
                label="Confirm Password"
                type={state.showPassword}
                value={state.passwordConfirm}
                onChange={passwordConfirmHandler}
                onBlur={passwordConfirmTouchedHandler}
                InputProps={{
                  endAdornment: (
                    <InputAdorment position="end">
                      <IconButton
                        tabIndex="-1"
                        style={{ margin: "0", padding: "0" }}
                        aria-label="toggle password visibility"
                        onClick={passwordVisibilityHandler}
                        onMouseDown={mouseDownPasswordHandler}
                      >
                        {state.showPassword === "password" ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdorment>
                  ),
                }}
                helperText={
                  !state.passwordConfirmValid &&
                  state.passwordConfirmTouched &&
                  "passwords must match"
                }
                error={
                  !state.passwordConfirmValid && state.passwordConfirmTouched
                }
                required
                fullWidth
              />
            </Grid>
            <Grid item>
              <DialogActions>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={clearError}
                  style={{ borderRadius: "100px" }}
                  disabled={
                    !state.passwordValid ||
                    !state.emailValid ||
                    !state.emailConfirmValid ||
                    !state.passwordConfirmValid
                  }
                >
                  Start Learning!
                </Button>
              </DialogActions>
            </Grid>
            {isLoading && (
              <Grid>
                <CircularProgress color="primary" />
              </Grid>
            )}
            {error && (
              <Grid>
                <Typography variant="body1" className={classes.errorMessage}>
                  {error}
                </Typography>
              </Grid>
            )}
          </Grid>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default SignUpForm;
