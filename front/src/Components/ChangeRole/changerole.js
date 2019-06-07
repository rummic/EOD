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
              swal("Rola nie została zmieniona");
            } else {
              swal("Poprawnie zmieniono dane");
              this.props.history.push("/userslist");
            }
          });
      }
    }
   
  }

  updateUserData() {
    const obj = this.state;
    fetch("https://localhost:44388/api/Users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      },
      body: JSON.stringify({
        login: obj.login,
        password: obj.password,
        firstName: obj.firstName,
        lastName: obj.lastName,
        email: obj.email,
        phoneNumber: obj.phoneNumber,
        role: obj.role
        
      })
    })
      .then(response => response.json())
      .then(parseJSON => {
        console.log(parseJSON);
        if (parseJSON.hasErrors) {
          swal(parseJSON.errors)
        } else {
          swal("Poprawnie zmieniono dane");
          this.props.history.push("/index");
        }
      });
  }
  showFirstNameInput() {
    document.getElementById("firstNameOutput").style.display = "none";
    document.getElementById("firstNameButton").style.display = "none";
    document.getElementById("showInputButtonFirstName").style.display = "inline";
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
                        Zmień umię użytkownika
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
                      onClick={() => this.updateUserData()}
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
                      <input
                        type="text"
                        value={this.state.lastName}
                        name="lastName"
                        onChange={this.onChange}
                      />
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
                      <input
                        type="text"
                        value={this.state.email}
                        name="email"
                        onChange={this.onChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Rola:</label>
                    </td>
                    <td>
                      <Dropdown name="role" onChange={this.onChange}>
                        <Dropdown.Toggle variant="secondary" size="lg">
                          Zmień rolęużytkownika, aktualna rola {obj.role}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item name="role" onChange={this.onChange}>
                            Admin
                          </Dropdown.Item>
                          <Dropdown.Item name="role" onChange={this.onChange}>
                            User
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                </tbody>
              </Table>
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
