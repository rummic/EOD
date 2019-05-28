import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../Navbar/sidebar";

const token = sessionStorage.getItem("token");

class changerole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
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
    const obj = this.props.location.state;
    this.setState({
      id: obj.id,
      firstName: obj.firstName,
      lastName: obj.lastName,
      email: obj.email,
      login: obj.login,
      role: obj.role
    });
  }

  update(id) {
    fetch("https://localhost:44388/api/Users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      },
      body: JSON.stringify({
        id: id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        login: this.state.loin,
        role: this.state.role
      })
    })
      .then(response => response.json())
      .then(parseJSON => {
        console.log(parseJSON);
        if (parseJSON.hasErrors) {
          alert("Błąd przy zmianie roli użytkownika");
        } else {
          alert("Poprawnie zmieniono roli użytkownika");
          console.log("suc");
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
              <label>ID.</label>
              <output>{obj.id}</output>
              <label>Imie :</label>
              <output>{obj.firstName}</output>
              <label>Nazwisko :</label>
              <output type="text" name="lastName">
                {obj.lastName}
              </output>
              <label>Nick :</label>
              <output type="text">{obj.login}</output>
              <label>Email :</label>
              <output type="text" name="email">
                {obj.email}
              </output>
              <label>Hasło :</label>
              <output type="password" name="password">
                {obj.password}
              </output>
              <label>Rola :</label>
              <select name="role">
                <option onChange={this.onChange}>Administrator</option>
                <option onChange={this.onChange}>Użytkownik</option>
              </select>
            </div>
            <button
              className="UsersetBox-form-button"
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
