import React, { useContext, useState } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
//import { useTheme } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import { AuthContext } from "../../../shared/context/auth-context";

const useStyle = makeStyles((theme) => ({
  item: { paddingBottom: "5rem" },
  button: { borderRadius: "100px" },
}));

const DashSettings = (props) => {
  //const theme = useTheme();
  const classes = useStyle();
  const auth = useContext(AuthContext);

  const [openChangeEmailForm, setOpenChangeEmailForm] = useState(false);
  const [openChangePasswordForm, setOpenChangePasswordForm] = useState(false);

  const logoutHandler = () => {
    auth.logout();
  };

  const openChangeEmailFormHandler = () => {
    setOpenChangeEmailForm(true);
  };

  const openChangePasswordFormHandler = () => {
    setOpenChangePasswordForm(true);
  };

  return (
    <React.Fragment>
      <Grid item xs={12} className={classes.item}>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
          spacing={4}
          style={{
            margin: 0,
            width: "100%",
          }}
        >
          <Grid item>
            <Typography variant="h3" align="center">
              Settings
            </Typography>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={classes.button}
              onClick={logoutHandler}
            >
              Logout
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={classes.button}
              onClick={openChangeEmailFormHandler}
            >
              Change Email
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={classes.button}
              onClick={openChangePasswordFormHandler}
            >
              Change Password
            </Button>
          </Grid>

          <Grid item>
            <Divider style={{ width: "80vw", marginTop: "5rem" }} />
          </Grid>
        </Grid>
      </Grid>
      <ChangeEmail
        openChangeEmailForm={openChangeEmailForm}
        setOpenChangeEmailForm={setOpenChangeEmailForm}
      />
      <ChangePassword
        openChangePasswordForm={openChangePasswordForm}
        setOpenChangePasswordForm={setOpenChangePasswordForm}
      />
    </React.Fragment>
  );
};

export default DashSettings;
