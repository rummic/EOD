import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Sidebar from "../Navbar/sidebar";
import "./userslist.css";
import { Table,Breadcrumb } from "react-bootstrap";

const token = sessionStorage.getItem("token");

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      users: []
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

  render() {
    if (!sessionStorage.getItem("token")) {
      return <Redirect to={"/home"} />;
    }
    return (
      <div className="UsersetBox">
        <Sidebar history={this.props.history} />
        <div className="UsersetBox-content">
          <div className="UsersetBox-form">
          <Breadcrumb>
              <Breadcrumb.Item href="/index">EOD</Breadcrumb.Item>
              <Breadcrumb.Item active>Lista Użytkowników</Breadcrumb.Item>
            </Breadcrumb>
            <div className="UsersetBox-form-content">
              <div className="UsersetBox">
                <div>
                  <button>
                    <Link to={{ pathname: "./adduser" }}>
                      Dodaj użytkownika
                    </Link>
                  </button>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Login</th>
                        <th>Email</th>
                        <th>Rola</th>
                      </tr>
                    </thead>
                    {this.state.users.map((item, i) => (
                      <tbody key={i}>
                        <tr>
                          <td>{(this.state.id = this.state.id + 1)}</td>
                          <td>{item.firstName}</td>
                          <td>{item.lastName}</td>
                          <td>{item.login}</td>
                          <td>{item.email}</td>
                          <td>{item.role}</td>
                          <td>
                            <button>
                              <Link
                                to={{ pathname: "./changerole", state: item }}
                              >
                                Ustawienia
                              </Link>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserList;
