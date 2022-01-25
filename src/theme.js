import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ece4db",
      light: '#757ce8',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      main: "#4a4e69",
      light: '#ff7961',
      dark: '#ba000d',
      contrastText: '#000',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#ece4db",
    },
  },
  typography: {
    allVariants: {
      color: "#58442C",
    },
  },
});

theme.overrides = {
  MuiButton: {
    root: {
      margin: 10,
    },
  },
};

export default theme;
