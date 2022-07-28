import React from "react";
import { AppBar, Container, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/private-theming";
import { createTheme } from "@mui/system";
import { create } from "@mui/material/styles/createTransitions";
import CssBaseline from "@mui/material/CssBaseline";

export default class Nav extends React.Component {
  render() {
    return (
      <AppBar color="transparent" position="static">
        <Container>
          <Typography style={{ color: "white" }}>Coin Tracker</Typography>
        </Container>
      </AppBar>
    );
  }
}
