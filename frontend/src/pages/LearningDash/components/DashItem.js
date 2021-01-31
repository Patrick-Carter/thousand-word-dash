import React from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
//import { useTheme } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const useStyle = makeStyles((theme) => ({
  item: { paddingBottom: "5rem" },
  button: {borderRadius: "100px"}
}));

const DashItem = (props) => {
  //const theme = useTheme();
  const classes = useStyle();

  return (
    <React.Fragment>
      <Grid item sm={12} className={classes.item}>
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
              {props.title}
            </Typography>
            <Typography variant="h6" align="center">
              {props.subtitle}
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="body1" align="center">
              {props.children}
            </Typography>
          </Grid>

          {!props.buttonGroup && (
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                className={classes.button}
                component={Link}
                to={props.route}
                onClick={() => {
                  props.setTabValue(props.buttonNumber + 1);
                }}
              >
                GO!
              </Button>
            </Grid>
          )}
          {props.buttonGroup && (
            <React.Fragment>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  className={classes.button}
                  component={Link}
                  to={props.route}
                  onClick={() => {
                    props.setTabValue(props.buttonNumber + 1);
                  }}
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
                  component={Link}
                  to={props.route2}
                  onClick={() => {
                    props.setTabValue(props.buttonNumber + 1);
                  }}
                >
                  Spanish To English
                </Button>
              </Grid>
            </React.Fragment>
          )}

          <Grid item>
            <Divider style={{ width: "80vw", marginTop: "5rem" }} />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default DashItem;
