import React from "react";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/private-theming";
import { createTheme } from "@mui/system";
import { makeStyles } from "@mui/material";
import { grey, blueGrey } from "@mui/material/colors";

export default class Nav extends React.Component {
  render() {
    const theme = createTheme({
      palette: {
        primary: {
          main: "#fff",
        },
        // secondary: {
        //   main: blueGrey[900],
        // },
        type: "dark",
      },
    });

    return (
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              style={{ color: "white", fontWeight: "bold", flexGrow: 1 }}
            >
              Coin Tracker
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
