import { ThemeProvider } from "@emotion/react";
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

export default class CoinTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coins: [],
      search: "",
    };
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
            PriceChange: info.price_change_percentage_24h,
            marketCap: info.market_cap,
            Symbol: info.symbol,
          };
          return coinData_all;
        });
        this.setState({ coins: coinData });
      });
  }

  handleSearch = () => {
    return this.state.coins.filter(
      (coin) =>
        coin.coin.toLowerCase().includes(this.state.search) ||
        coin.symbol.toLowerCase().includes(this.state.search)
    );
  };

  render() {
    console.log(this.state.search);
    return (
      <div>
        <Container>
          <Typography variant="h4" style={{ margin: 18 }}>
            Cryptocurrency Prices by Market Cap
          </Typography>
          <TextField
            label="search"
            variant="outlined"
            onChange={(e) => this.setState({ search: e.target.value })}
          />
        </Container>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                  <TableCell key={head} align={head === "Coin" ? "" : "right"}>
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.coins
                .filter((coin) =>
                  coin.name.toLowerCase().includes(this.state.search)
                )
                .map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell style={{ display: "flex", gap: 15 }}>
                      {row.name}
                      <div>{row.image}</div>
                    </TableCell>
                    <TableCell align="right">{row.currentPrice}</TableCell>
                    <TableCell align="right">{row.PriceChange}</TableCell>
                    <TableCell align="right">{row.marketCap}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

{
  /* conditional is use as the array is loading in */
}
{
  /* {this.state.coins && this.state.coins.length > 0
          ? this.state.coins.map((coins) => (
              <div key={coins.coin}>{coins.coin}</div>
            ))
          : `not rendered`} */
}
