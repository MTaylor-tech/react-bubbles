import React from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", this.state.credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        this.props.func();
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Err is: ", err);
      });
  };

  render() {
    return (
      <div className="loginForm">
        <form onSubmit={this.login}>
          <h2>Please Log In</h2>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
            placeholder="Username"
          /><br />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
            placeholder="Password"
          /><br />
          <button className="loginBtn">Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;
