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
  PASSWORDVISIBLE: "passwordVisible",
  PASSWORDVALUE: "passwordValue",
  PASSWORDTOUCHED: "passwordTouched",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.EMAILVALUE:
      return {
        ...state,
        email: action.val,
        emailValid: validate(action.val, action.validators),
      };
    case ACTIONS.EMAILTOUCHED:
      return { ...state, emailTouched: true };
    case ACTIONS.PASSWORDVALUE:
      return {
        ...state,
        password: action.val,
        passwordValid: validate(action.val, action.validators),
      };
    case ACTIONS.PASSWORDTOUCHED:
      return { ...state, passwordTouched: true };
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

const LoginForm = (props) => {
  const auth = useContext(AuthContext);

  const classes = useStyles();
  const [state, dispatch] = useReducer(formReducer, {
    showPassword: "password",
    password: "",
    passwordValid: false,
    passwordTouched: false,
    email: "",
    emailValid: false,
    emailTouched: false,
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

  const passwordHandler = (event) => {
    dispatch({
      type: ACTIONS.PASSWORDVALUE,
      val: event.target.value,
      validators: [VALIDATOR_MINLENGTH(5)],
    });
  };

  const passwordTouchHandler = () => {
    dispatch({ type: ACTIONS.PASSWORDTOUCHED });
  };

  const passwordVisibilityHandler = () => {
    dispatch({ type: ACTIONS.PASSWORDVISIBLE });
  };

  const mouseDownPasswordHandler = (event) => {
    event.preventDefault();
  };

  const loginHandler = async (event) => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "user/login",
        "POST",
        JSON.stringify({ email: state.email, password: state.password }),
        { "Content-Type": "application/json" }
      );

      auth.login(responseData.token);
    } catch (err) {}
  };

  return (
    <Dialog
      open={props.openLoginForm}
      onClose={() => props.setOpenLoginForm(false)}
    >
      <form onSubmit={loginHandler}>
        <DialogContent>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <Typography variant="h3">Login</Typography>
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
                id="password"
                label="Password"
                type={state.showPassword}
                value={state.password}
                onChange={passwordHandler}
                onBlur={passwordTouchHandler}
                InputProps={{
                  endAdornment: (
                    <InputAdorment position="end">
                      <IconButton
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
              <DialogActions>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={clearError}
                  style={{ borderRadius: "100px" }}
                  disabled={!state.passwordValid || !state.emailValid}
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

export default LoginForm;
