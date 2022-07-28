import React from "react";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      username: "",
    };
  }

  // name variable for each input of the form
  handleChange = (e) => {
    let { name } = e.target;
    this.setState({
      [name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    alert(this.state.username, this.state.password, this.state.email);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} style={{ textAlign: "center" }}>
          <label>Name:</label>
          <input
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="enter your username"
          />
          <br />
          <label>Password:</label>
          <input
            name="password"
            type="text"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="enter your password"
          />
          <br />
          <label>Email:</label>
          <input
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="enter your email"
          />
          <br />
          <input type="submit" value="Signup" />
        </form>
      </div>
    );
  }
}
