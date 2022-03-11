import { createMuiTheme } from "@material-ui/core/styles";

const blue = "#0079C1";
const mainBlack = "#212121";
const mainWhite = "#fafafa";
const theme = createMuiTheme({
  palette: {
    common: {
      black: mainBlack,
      white: mainWhite,
      blue: blue,
    },
    primary: {
      main: blue,
    },
    secondary: {
      main: mainWhite,
    },
    info: {
      main: blue,
    },
  },
  typography: {
    h1: {
      fontSize: "2.25rem",
      fontWeight: 500,
      fontFamily: 'Poppins',
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 500,
      fontFamily: 'Poppins',
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 500,
      fontFamily: 'Poppins',
    },
    h4: {
      fontSize: "1.10rem",
      fontWeight: 500,
      fontFamily: 'Poppins',
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 500,
      fontFamily: 'Poppins',
    },
  },
});

export default theme;