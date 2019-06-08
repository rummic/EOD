import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Sidebar from "../Navbar/sidebar";
import swal from "sweetalert";
import { Dropdown, Table } from "react-bootstrap";
import './changerole.css'
const token = sessionStorage.getItem("token");

class changerole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      role: "",
      user: []
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    document.title = 'Szczegóły ' + this.state.firstName + ' '+ this.state.lastName;
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
      password: obj.password,
      login: obj.login,
      firstName: obj.firstName,
      lastName: obj.lastName,
      email: obj.email,
      role: obj.role
    });
  }

 

  updateData() {
    fetch("https://localhost:44388/api/Users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      },
      body: JSON.stringify({
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
          swal("Udana zmiana")
        } else {
          swal("Poprawnie zmieniono dane");
          window.location.reload(true);
        }
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
  showFirstNameInput() {
    document.getElementById("firstNameOutput").style.display = "none";
    document.getElementById("firstNameButton").style.display = "none";
    document.getElementById("showInputButtonFirstName").style.display = "inline";
    
  }

  showLastNameInput() {
    document.getElementById("lastNameOutput").style.display = "none";
    document.getElementById("lastNameButton").style.display = "none";
    document.getElementById("showLastNameInput").style.display = "inline";
    
  }

  showEmailInput() {
    document.getElementById("emailOutput").style.display = "none";
    document.getElementById("emailButton").style.display = "none";
    document.getElementById("showEmailInput").style.display = "inline";
    
  }
  showRoleSelect() {
    document.getElementById("currentRole").style.display = "none";
    document.getElementById("roleButton").style.display = "none";
    document.getElementById("showRoleSelect").style.display = "inline";
    
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
              <Table responsive borderless>
                <tbody>
                  <tr>
                    <td>
                      <label>Imie:</label>
                    </td>
                    <td>
                      <output id="firstNameOutput">{obj.firstName}</output>
                      <button
                        id="firstNameButton"
                        className="password-button"
                        variant="primary"
                        onClick={this.showFirstNameInput}
                      >
                        Zmień imię użytkownika
                      </button><div id="showInputButtonFirstName">
                      <input
                        type="text"
                        id="firstNameInput"
                        value={this.state.firstName}
                        name="firstName"
                        onChange={this.onChange}
                      />
                      
                      <button
                      id="changeFirstNameButton"
                      className="password-button"
                      variant="primary"
                      onClick={() => this.update(obj.id)}
                      >
                        Zmień imię
                      </button>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label>Nazwisko:</label>
                    </td>
                    <td>
                    <output id="lastNameOutput">{obj.lastName}</output>
                      <button
                        id="lastNameButton"
                        className="password-button"
                        variant="primary"
                        onClick={this.showLastNameInput}
                      >
                        Zmień nazwisko użytkownika
                      </button><div id="showLastNameInput">
                      <input
                        type="text"
                        id="lastNameInput"
                        value={this.state.lastName}
                        name="lastName"
                        onChange={this.onChange}
                      />
                      
                      <button
                      id="changeLastNameButton"
                      className="password-button"
                      variant="primary"
                      onClick={() => this.updateData()}
                      >
                        Zmień nazwisko
                      </button>
                      </div>
                      
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Login:</label>
                    </td>
                    <td>
                    
              <output>{obj.login}</output>
                      
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label>Email:</label>
                    </td>
                    <td>
                    <output id="emailOutput">{obj.email}</output>
                      <button
                        id="emailButton"
                        className="password-button"
                        variant="primary"
                        onClick={this.showEmailInput}
                      >
                        Zmień umię użytkownika
                      </button><div id="showEmailInput">
                      <input
                        type="text"
                        id="emailInput"
                        value={this.state.email}
                        name="email"
                        onChange={this.onChange}
                      />
                      
                      <button
                      id="changeEmail"
                      className="password-button"
                      variant="primary"
                      onClick={() => this.updateData()}
                      >
                        Zmień email
                      </button>
                      </div>
                      </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Rola:</label>
                    </td>
                    <td>
                    <output id="currentRole">{obj.role}</output>
                      <button
                        id="roleButton"
                        className="password-button"
                        variant="primary"
                        onClick={this.showRoleSelect}
                      >
                        Zmień rolę użytkownika
                      </button><div id="showRoleSelect">
                      
                      <select  name="role" onChange={this.onChange} placeholder="Rola użytkownika">
                <option name="role" onChange={this.onChange}>
                  Admin
                </option>
                <option name="role" onChange={this.onChange}>
                  User
                </option>
                      
                      <button
                      id="changeEmail"
                      className="password-button"
                      variant="primary"
                      onClick={() => this.update()}
                      >
                        Zmień email
                      </button>
                      </select>
                      </div>
                      </td>
                  </tr>
                </tbody>
              </Table>
            </div><Link to={{ pathname: "./userslist" }}>
            <button
              className="UsersetBox-form-button"
              variant="primary"
            >
               
                      Wróc
                    
            </button></Link>
          </div>
        </div>
      </div>
    );
  }
}

export default changerole;
