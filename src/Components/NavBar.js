import React from "react";
import { AppBar, Container, Typography } from "@mui/material";

export default class Nav extends React.Component {
  render() {
    return (
      <AppBar color="transparent" position="static">
        <Container>
          <Typography color="white">Coin Tracker</Typography>
        </Container>
      </AppBar>
    );
  }
}
