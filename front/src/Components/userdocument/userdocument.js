import React, { Component } from "react";
import Sidebar from "../Navbar/sidebar";
import { Redirect, Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const token = sessionStorage.getItem("token");

class showfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cases: []
    };
    this.OnChange = this.OnChange.bind(this);
  }

  OnChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    fetch("http://localhost:60148/api/Cases/User", {
      method: "GET",
      headers: {
        "Content-Type": "aplication/json",
        Authorization: `bearer ${token}`
      }
    }).then(response =>
      response.json().then(responseJSON => {
        console.log(responseJSON);
        this.setState({
          cases: responseJSON.value || []
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
            <div className="UsersetBox-form-content">
              <div className="UsersetBox">
                <div>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Tytuł</th>
                        <th>Dział</th>
                        <th>Status</th>
                        <th>Komentarz</th>
                      </tr>
                    </thead>
                    {this.state.cases.map((item, i) => (
                      <tbody key={i}>
                        <tr>
                          <td>{item.id}</td>
                          <td>{item.title}</td>
                          <td>{item.departmentName}</td>
                          <td>{item.status}</td>
                          <td>{item.comment}</td>
                          <td>
                            <button>
                              <Link
                                to={{ pathname: "./filedetails", state: item }}
                              >
                                informacje
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

export default showfiles;
