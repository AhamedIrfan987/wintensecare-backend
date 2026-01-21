// src/styles/muiTheme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0ea5e9" }, // bright, modern blue
    secondary: { main: "#f97316" }, // warm accent / CTAs
    background: { default: "#f8fafc", paper: "#fff" },
    error: { main: "#ef4444" },
  },
  shape: { borderRadius: 14 }, // rounded "king-like" feel
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 10px 30px rgba(2,6,23,0.08)",
          borderRadius: 14,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: { root: { background: "#ffffff", color: "#111827", boxShadow: "none", borderBottom: "1px solid rgba(2,6,23,0.06)" } },
    },
  },
});

export default theme;