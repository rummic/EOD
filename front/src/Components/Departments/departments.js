import React, { Component } from "react";
import { Redirect,Link } from "react-router-dom";
import Sidebar from "../Navbar/sidebar";
import { Breadcrumb, Table } from "react-bootstrap";

const token = sessionStorage.getItem("token");

class departments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments:[],
      role: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  

  componentDidMount() {
      document.title = 'Lista działów';
    fetch("https://localhost:44388/api/Users/" + sessionStorage.getItem('id'), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(parseJSON => {
        this.setState({
          role: parseJSON.value.role
        });
      });

    fetch("https://localhost:44388/api/Departments" , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(parseJSON => {
      this.setState({
        departments: parseJSON.value || []
      });
    });
    console.log(this.state.departments);

  }

  render() {
    if (!sessionStorage.getItem("token") || this.state.role === "User" || this.state.role === "Admin" ) {
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
                    <Link to={{ pathname: "./adddepartment" }}>
                      Dodaj dział
                    </Link>
                  </button>
                <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Nazwa</th>
                      </tr>
                    </thead>
                    {this.state.departments.map((item, i) => (
                      <tbody key={i}>
                        <tr>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>
                            <button>
                            <Link
                                to={{ pathname: "./changemenager", state: item }}
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

export default departments;
