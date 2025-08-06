// theme.ts
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3D74B6",
      contrastText: "#F0EBD8",
    },
    secondary: {
      main: "#FBF5DE",
      contrastText: "#3D74B6",
    },
  },
});

export default darkTheme;
