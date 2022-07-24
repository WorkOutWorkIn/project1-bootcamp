import React from "react";
import logo from "./logo.png";
import "./App.css";
import Nav from "./Components/NavBar";
import CoinTable from "./Components/Table";

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
