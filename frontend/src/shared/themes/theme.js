import { createMuiTheme } from "@material-ui/core/styles";

const lightBlue = "#42a5f5";
const lightPink = "#e91e63";

const theme = createMuiTheme({
  palette: {
    common: {
      blue: lightBlue,
      pink: lightPink,
    },
    primary: {
      main: lightBlue,
    },
    secondary: {
      main: lightPink,
    },
  },
  typography: {
    h2: {
      fontWeight: "400",
      color: lightPink,
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: "300",
      color: lightBlue,
    },
    body1: {
      fontSize: "1.5rem",
    },
    h6: {
      color: lightPink,
    },
    cardTitle: {
      fontFamily: "Roboto",
      fontWeight: "300",
      fontSize: "3rem",
      lineHeight: "1.167",
      letterSpacing: "0em",
      color: lightPink
    },
  },
});

export default theme;
