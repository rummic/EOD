import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../Navbar/sidebar";
const token = sessionStorage.getItem("token");

class changerole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
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
  componentDidMount() {
    fetch("https://localhost:44388/api/Users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      }
    }).then(response =>
      response.json().then(responseJSON => {
        console.log(responseJSON);
        this.setState({
          users: responseJSON.value || []
        });
      })
    );
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
    for (let i = 0; this.state.users.length > i; i++) {
      if (id === this.state.users[i].id) {
        fetch(
          "https://localhost:44388/api/Users/ChangeRole?id=" +
            id +
            "&role=" +
            this.state.role,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        )
          .then(response => response.json())
          .then(parseJSON => {
            if (parseJSON.hasErrors) {
              alert("Rola nie została zmieniona");
            } else {
              alert("Poprawnie zmieniono dane");
              this.props.history.push("/userslist");
            }
          });
      }
    }
  }
  render() {
    if (!sessionStorage.getItem("token")) {
      return <Redirect to={"/home"} />;
    }
    const obj = this.state;
    return (
      <div className="UsersetBox">
        <Sidebar history={this.props.history} />
        <div className="UsersetBox-content">
          <div className="UsersetBox-form">
            <div className="UsersetBox-form-content">
              <label>Imie :</label>
              <output>{obj.firstName}</output>
              <br />
              <label>Nazwisko :</label>
              <output>{obj.lastName}</output>
              <br />
              <label>Login :</label>
              <output>{obj.login}</output>
              <br />
              <label>Email :</label>
              <output>{obj.email}</output>
              <br />
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
