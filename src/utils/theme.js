import { createTheme } from "@mui/material";

export const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "::selection": {
          // color: "#561AD9",
          color: "#662483",
          background: "#fff",
        },
      },
    },
  },
  palette: {
    primary: {
      // main: "#561AD9",
      main: "#662483",
    },
    secondary: {
      main: "#604F83",
    },
    grey: {
      main: "#727070",
    },
    accent: {
      main: "#9DD91A",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: {
      fontFamily: "Mulish, sans-serif",
    },
    h2: {
      fontFamily: "Mulish, sans-serif",
    },
    h3: {
      fontFamily: "Mulish, sans-serif",
    },
    h4: {
      fontFamily: "Mulish, sans-serif",
    },
    h5: {
      fontFamily: "Mulish, sans-serif",
    },
    h6: {
      fontFamily: "Mulish, sans-serif",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          boxShadow: "0 0 6px rgba(0, 0, 0, 0.15)",
          background: "#fff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          paddingLeft: "50px",
          paddingRight: "50px",
          borderRadius: "12px",
          textTransform: "none",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: "Mulish, sans-serif",
          textTransform: "capitalize",
          letterSpacing: 1.2,
          fontSize: 18,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: 40,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            background: "#561AD9 !important",
            color: "#fff",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "15px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "17px",
        },
      },
    },
  },
});
