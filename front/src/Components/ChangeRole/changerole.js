import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../Navbar/sidebar";

const token = sessionStorage.getItem("token");

class changerole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      role: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillMount() {
    const obj = this.props.location.state;
    this.setState({
      id: obj.id,
      login: obj.login,
      firstName: obj.firstName,
      lastName: obj.lastName,
      email: obj.email,
      role: obj.role
    });
  }
  update(id) {
    console.log(this.state.role);
    fetch("https://localhost:44388/api/Users", {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      },

      body: JSON.stringify({
        id: id,
        login: this.state.login,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        role: this.state.role
      })
    })
      .then(response => response.json())
      .then(parseJSON => {
        console.log(parseJSON);
        if (parseJSON.hasErrors) {
          alert("Rola nie została zmieniona");
        } else {
          alert("Poprawnie zmieniono dane");
          console.log(this.state.role, "rola");
          this.props.history.push("/userslist");
        }
      });
  }

  render() {
    if (!sessionStorage.getItem("token")) {
      return <Redirect to={"/login"} />;
    }
    const obj = this.state;
    return (
      <div className="UsersetBox">
        <Sidebar history={this.props.history} />
        <div className="UsersetBox-content">
          <div className="UsersetBox-form">
            <div className="UsersetBox-form-content">
              <label>Imie :</label>
              <input
                type="text"
                disabled
                value={obj.firstName}
                name="firstName"
                onChange={this.onChange}
              />
              <label>Nazwisko :</label>
              <input
                type="text"
                disabled
                value={obj.lastName}
                name="lastName"
                onChange={this.onChange}
              />
              <label>Login :</label>
              <input
                type="text"
                disabled
                value={obj.login}
                name="login"
                onChange={this.onChange}
              />
              <label>Email :</label>
              <input
                type="text"
                value={obj.email}
                name="email"
                onChange={this.onChange}
              />

              <label>Rola :</label>
              <select name="role" onChange={this.onChange} required>
                <option value={obj.role}>{obj.role}</option>
                <option name="role" onChange={this.onChange}>
                  Admin
                </option>
                <option name="role" onChange={this.onChange}>
                  User
                </option>
              </select>
            </div>
            <button
              className="UsersetBox-form-button"
              variant="primary"
              onClick={() => this.update(obj.id)}
            >
              Zmień dane
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default changerole;
