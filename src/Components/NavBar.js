import React from "react";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";

export default class Nav extends React.Component {
  render() {
    return (
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              style={{ color: "white", fontWeight: "bold", flexGrow: 1 }}
            >
              Cryptocurrency Tracker
            </Typography>
            <Typography style={{ color: "white", flexGrow: 0.1 }}>
              Charts
            </Typography>
            <Typography style={{ color: "white" }}>Login</Typography>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}
