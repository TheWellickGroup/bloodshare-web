"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import "../styles/globals.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fc7d7b",
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            autoHideDuration={1000}
            maxSnack={3}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            {children}
          </SnackbarProvider>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
