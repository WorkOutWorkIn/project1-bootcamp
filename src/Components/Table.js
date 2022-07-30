import {
  TableContainer,
  TextField,
  Typography,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableCell,
  Paper,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import WatchListTable from "../WatchListTable";
import { ThemeProvider, createTheme } from "@mui/material";

export default class CoinTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coins: [],
      search: "",
      watchlist: [],
    };
    this.deleteWatchListSubmit = this.deleteWatchListSubmit.bind(this);
  }

  componentDidMount() {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Ctether%2Cusd-coin%2Cbinancecoin%2Cbinance-usd%2Cripple%2Ccardano%2Csolana%2Cdogecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((response) => {
        return response.json();
      })
      .then((getData) => {
        let coinData = getData.map((info) => {
          const coinData_all = {
            name: info.name,
            image: info.image,
            currentPrice: info.current_price,
            priceChange: info.price_change_percentage_24h,
            marketCap: info.market_cap,
            symbol: info.symbol,
          };
          return coinData_all;
        });
        let data = [];
        // localStorage.getItem("current-watchlist") === undefined
        //   ? JSON.parse(localStorage.getItem("current-watchlist"))
        //   : [];
        if (localStorage.getItem("current-watchlist") == null || undefined) {
          data = [];
          console.log(`no data`);
        } else {
          console.log(`output data`);

          data = JSON.parse(localStorage.getItem("current-watchlist"));
          console.log(data);
        }
        this.setState({ coins: coinData, watchlist: data });
      });
  }

  // componentdidmount
  // check local storage for watchlist and if it exist
  // take data and setstate in the component
  // JSON.strinifgy to local storage
  // .parse to use the data

  // add in componentdidupdate, if the prevstate.watchlist != state.watchlist
  // storeitem watchlist into local storage

  //updates when object in the watchlist array is taken in or out

  componentDidUpdate(prevstate) {
    if (prevstate.watchlist !== this.state.watchlist) {
      if (this.state.watchlist.length === 0) {
        console.log(`empty`);
      } else {
        localStorage.setItem(
          "current-watchlist",
          JSON.stringify(this.state.watchlist)
        );
      }
    }
    console.log(JSON.stringify(this.state.watchlist));
  }

  // handleSearch = () => {
  //   return this.state.coins.filter(
  //     (coin) =>
  //       coin.coin.toLowerCase().includes(this.state.search) ||
  //       coin.symbol.toLowerCase().includes(this.state.search)
  //   );
  // };

  // button func to add coin data to watchlist array
  addWatchListSubmit = (coins) => {
    // console.log(coins);
    this.setState({
      watchlist: [...this.state.watchlist, coins],
    });
  };

  // Add delete watchlist too.
  // delete from local storage too
  deleteWatchListSubmit = (coins) => {
    this.setState({
      watchlist: this.state.watchlist.filter(
        (coin) => coins.name !== coin.name
      ),
    });
    let store = this.state.watchlist.filter((coin) => coins.name !== coin.name);
    console.log(store);
    localStorage.setItem("current-watchlist", JSON.stringify(store));
  };

  //
  render() {
    console.log(this.state.search);
    console.log(this.state.watchlist);

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
      <div>
        <ThemeProvider theme={theme}>
          <Container style={{ textAlign: "center" }}>
            <Typography variant="h2" style={{ margin: 18, color: "white" }}>
              Cryptocurrency Tracker
            </Typography>
          </Container>
          <Container style={{ textAlign: "center" }}>
            <Typography variant="h5" style={{ margin: 18, color: "white" }}>
              Cryptocurrency Prices by Market Cap
            </Typography>

            <TextField
              label="Search by coin/symbol"
              variant="standard"
              style={{ marginBottom: 20, width: "100%" }}
              onChange={(e) => this.setState({ search: e.target.value })}
              sx={{
                label: { color: "white" },
                input: {
                  border: "white 0.5px solid",
                  padding: 2,
                  color: "white",
                },
              }}
            />
          </Container>
          <Container>
            <TableContainer component={Paper} color="primary">
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#1617a" }}>
                    {["Coin", "Price", "24h Change", "Market Cap"].map(
                      (head) => (
                        <TableCell
                          key={head}
                          align={head === "Coin" ? "" : "right"}
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.coins
                    .filter(
                      (coin) =>
                        coin.name.toLowerCase().includes(this.state.search) ||
                        coin.symbol.toLowerCase().includes(this.state.search)
                    )
                    .map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell style={{ display: "flex", gap: 15 }}>
                          <img src={row.image} alt={row.coin} height="50" />

                          <div>{row.name}</div>
                          <div>{row.symbol}</div>
                          <div>
                            <button
                              onClick={() => this.addWatchListSubmit(row)}
                            >
                              Add to WatchList
                            </button>
                          </div>
                        </TableCell>
                        <TableCell align="right">{row.currentPrice}</TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: row.priceChange > 0 ? "green" : "red",
                            fontWeight: 600,
                          }}
                        >
                          {row.priceChange}%
                        </TableCell>
                        <TableCell align="right">
                          {row.marketCap.toString().slice(0, -9)} Billions
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
          <div>
            <WatchListTable
              watchList={this.state.watchlist}
              removeWatchList={this.deleteWatchListSubmit}
            />
          </div>
        </ThemeProvider>
      </div>
    );
  }
}
