import React, { useReducer, useContext, useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { VALIDATOR_EMAIL, validate } from "../../../shared/util/validators";
import { useHttpRequest } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";

const ACTIONS = {
  EMAILVALUE: "emailValue",
  EMAILTOUCED: "emailTouched",
  EMAILCONFIRMVALUE: "emailConfirmValue",
  EMAILCONFIRMTOUCHED: "emailConfirmTouched",
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
    case ACTIONS.EMAILTOUCED:
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
    case ACTIONS.EMAILCONFIRMTOUCHED:
      return {
        ...state,
        emailConfirmTouched: true,
        emailConfirmValid: state.email === state.emailConfirm,
      };
    default:
      return { ...state };
  }
};

const ChangeEmail = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();
  const auth = useContext(AuthContext);
  const [resMsg, setResMsg] = useState("");
  const [state, dispatch] = useReducer(formReducer, {
    email: "",
    emailValid: false,
    emailTouched: false,
    emailConfirm: "",
    emailConfirmValid: false,
    emailConfirmTouched: false,
  });

  const changeEmail = async (event) => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "settings/changeemail",
        "POST",
        JSON.stringify({
          email: state.email,
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
  }

  const emailChangeHandler = (event) => {
    dispatch({
      type: ACTIONS.EMAILVALUE,
      val: event.target.value,
      validators: [VALIDATOR_EMAIL()],
    });
  };

  const emailTouchedHandler = () => {
    dispatch({ type: ACTIONS.EMAILTOUCED });
  };

  const emailConfirmChangeHandler = (event) => {
    dispatch({
      type: ACTIONS.EMAILCONFIRMVALUE,
      val: event.target.value,
      validators: [VALIDATOR_EMAIL()],
    });
  };

  const emailConfirmTouchedHandler = () => {
    dispatch({ type: ACTIONS.EMAILCONFIRMTOUCHED });
  };

  return (
    <Dialog
      open={props.openChangeEmailForm}
      onClose={() => props.setOpenChangeEmailForm(false)}
    >
      <form onSubmit={changeEmail}>
        <DialogContent>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h3">Email Settings</Typography>
            </Grid>
            <Grid item>
              <TextField
                id="email"
                label="New Email"
                value={state.email}
                onChange={emailChangeHandler}
                onBlur={emailTouchedHandler}
                helperText={
                  !state.emailValid &&
                  state.emailTouched &&
                  "must enter a valid email"
                }
                error={!state.emailValid && state.emailTouched}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                id="email"
                label="Re-Type Email"
                value={state.emailConfirm}
                onChange={emailConfirmChangeHandler}
                onBlur={emailConfirmTouchedHandler}
                helperText={
                  !state.emailConfirmValid &&
                  state.emailConfirmTouched &&
                  "emails must match"
                }
                error={!state.emailConfirmValid && state.emailConfirmTouched}
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
                  disabled={!state.emailValid || !state.emailConfirmValid}
                  onClick={clearMessagesHandler}
                >
                  Change Email
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

export default ChangeEmail;
