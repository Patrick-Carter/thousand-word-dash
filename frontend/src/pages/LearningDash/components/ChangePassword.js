import React, { useReducer, useState, useContext } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { VALIDATOR_MINLENGTH, validate } from "../../../shared/util/validators";
import { useHttpRequest } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";

const ACTIONS = {
  PASSWORDVALUE: "PASSWORDVALUE",
  PASSWORDTOUCHED: "passwordTouched",
  PASSWORDCONFIRMVALUE: "PASSWORDCONFIRMVALUE",
  PASSWORDCONFIRMTOUCH: "passwordConfirmTouched",
};

const formReducer = (state, action) => {
  switch (action.type) {
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
    default:
      return { ...state };
  }
};

const ChangePassword = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();
  const auth = useContext(AuthContext);
  const [resMsg, setResMsg] = useState("");
  const [state, dispatch] = useReducer(formReducer, {
    password: "",
    passwordValid: false,
    passwordTouched: false,
    passwordConfirm: "",
    passwordConfirmValid: false,
    passwordConfirmTouched: false,
  });

  const changepassword = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "settings/changepassword",
        "POST",
        JSON.stringify({
          password: state.password,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      setResMsg(responseData.message);
    } catch (err) {}
  };

  const clearMessagesHandler = () => {
    clearError();
    setResMsg("");
  };

  const passwordChangeHandler = (event) => {
    dispatch({
      type: ACTIONS.PASSWORDVALUE,
      val: event.target.value,
      validators: [VALIDATOR_MINLENGTH(5)],
    });
  };

  const passwordTouchedHandler = () => {
    dispatch({ type: ACTIONS.PASSWORDTOUCHED });
  };

  const passwordConfirmChangeHandler = (event) => {
    dispatch({
      type: ACTIONS.PASSWORDCONFIRMVALUE,
      val: event.target.value,
      validators: [VALIDATOR_MINLENGTH(5)],
    });
  };

  const passwordConfirmTouchedHandler = () => {
    dispatch({ type: ACTIONS.PASSWORDCONFIRMTOUCH });
  };

  return (
    <Dialog
      open={props.openChangePasswordForm}
      onClose={() => props.setOpenChangePasswordForm(false)}
    >
      <form onSubmit={changepassword}>
        <DialogContent>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h3">Password Settings</Typography>
            </Grid>
            <Grid item>
              <TextField
                id="password"
                label="New password"
                value={state.password}
                onChange={passwordChangeHandler}
                onBlur={passwordTouchedHandler}
                helperText={
                  !state.passwordValid &&
                  state.passwordTouched &&
                  "must enter a valid password"
                }
                error={!state.passwordValid && state.passwordTouched}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                id="password"
                label="Re-Type password"
                value={state.passwordConfirm}
                onChange={passwordConfirmChangeHandler}
                onBlur={passwordConfirmTouchedHandler}
                helperText={
                  !state.passwordConfirmValid &&
                  state.passwordConfirmTouched &&
                  "password must be atleast 5 charactors"
                }
                error={
                  !state.passwordConfirmValid && state.passwordConfirmTouched
                }
                required
              />
            </Grid>
            <DialogActions>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  style={{ borderRadius: "100px" }}
                  disabled={!state.passwordValid || !state.passwordConfirmValid}
                  onClick={clearMessagesHandler}
                >
                  Change Password
                </Button>
              </Grid>
            </DialogActions>
            {isLoading && (
              <Grid>
                <CircularProgress color="primary" />
              </Grid>
            )}
            {resMsg && (
              <Grid>
                <Typography variant="h3" style={{ textAlign: "center" }}>
                  {resMsg}
                </Typography>
              </Grid>
            )}
            {error && (
              <Grid>
                <Typography
                  variant="h3"
                  style={{ color: "red", textAlign: "center" }}
                >
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

export default ChangePassword;
