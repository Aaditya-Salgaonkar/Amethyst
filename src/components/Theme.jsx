import { createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      x15: 1536,
      x12: 1280,
      x10: 1024,
      x76: 768,
      x64: 640,
      x45: 475,
      x30: 300,
      x20: 290,
    },
  },

  typography: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 16,
    h1: { fontSize: "60px", fontWeight: 400, lineHeight: "60px" },
    h2: { fontSize: "48px", fontWeight: 400, lineHeight: "48px" },
    h3: { fontSize: "20px", fontWeight: 400, lineHeight: "28px" },
    body1: { fontSize: "16px", fontWeight: 400, lineHeight: "24px" },
    body2: { fontSize: "14px", fontWeight: 500, lineHeight: "20px" },
    caption: { fontSize: "18px", fontWeight: 400, lineHeight: "28px" },
  },
  palette: {
    primary: { main: "#f97316" },
    secondary: { main: "#c2410c" },
    background: {
      default: "#262626",
      paper: "rgb(25, 25, 25)",
      container: "rgb(29, 29, 29)",
    },
    text: {
      primary: "#ffffff",
      secondary: "#f97316",
      disabled: "#737373",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: "linear-gradient(to right, #f97316, #c2410c)",
          color: "#ffffff",
          "&:hover": {
            background: "linear-gradient(to right, #c2410c, #f97316)",
          },
        },
        outlined: {
          background: "transparent",
          border: "2px solid #f97316",
          color: "#f97316",
          "&:hover": {
            background: "transparent",
            borderColor: " #c2410c",
            color: " #c2410c",
          },
        },
      },
    },
  },
});
