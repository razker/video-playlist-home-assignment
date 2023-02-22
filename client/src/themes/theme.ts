import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#6a1b9a",
      light: "#c480d0",
    },
    secondary: {
      main: "#af4fbf",
    },
  },
  typography: {
    fontFamily: "Roboto,Arial",
  },
});
