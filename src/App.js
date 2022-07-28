import React from "react";
import "./App.css";
import Nav from "./Components/NavBar";
import CoinTable from "./Components/Table";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <Nav />
        </header>
        <main>
          <CoinTable />
        </main>
      </div>
    );
  }
}

export default App;
