import React from "react";
import {
  TableContainer,
  Typography,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableCell,
  Paper,
} from "@mui/material";
import { Container } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";

export default class WatchListTable extends React.Component {
  render() {
    // console.log(this.props.watchList);

    const watchTheme = createTheme({
      palette: {
        primary: {
          main: grey[900],
        },
        secondary: {
          main: blueGrey[900],
        },
      },
    });

    return (
      <div>
        <ThemeProvider theme={watchTheme}>
          <Container style={{ textAlign: "center" }}>
            <Typography variant="h5" style={{ margin: 18, color: "white" }}>
              Watch List
            </Typography>
          </Container>
          <Container>
            <TableContainer component={Paper} color="primary">
              <Table>
                <TableHead>
                  <TableRow>
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
                  {this.props.watchList && this.props.watchList.length > 0
                    ? this.props.watchList.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell style={{ display: "flex", gap: 15 }}>
                            <img src={row.image} alt={row.coin} height="50" />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 12,
                                }}
                              >
                                {row.name}
                              </span>
                              <span style={{ color: "darkgrey" }}>
                                {row.symbol}
                              </span>
                            </div>
                            <div>
                              <button
                                onClick={() => this.props.removeWatchList(row)}
                              >
                                Remove
                              </button>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            {row.currentPrice}
                          </TableCell>
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
                      ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </ThemeProvider>
      </div>
    );
  }
}
