import React, { Component } from "react";
import Sidebar from "../Navbar/sidebar";
import { Redirect } from "react-router-dom";
import { Table } from "react-bootstrap";

class filedetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      status: "",
      departmentName: "",
      sendDate: "",
      sender: [],
      documents: []
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillMount() {
    const obj = this.props.location.state;
    this.setState({
      title: obj.title,
      status: obj.status,
      departmentName: obj.departmentName,
      sendDate: obj.sendDate,
      sender: obj.sender,
      documents: obj.documents
    });
  }

  render() {
    if (!sessionStorage.getItem("token")) {
      return <Redirect to={"/home"} />;
    }
    const obj = this.state;
    if (obj.status == "Sent"){
        obj.status = "Oczekiwanie na akceptację"
    }
    if (obj.status == "Accepted") {
      obj.status = "Plik został zaakceptowany"
    }
    if (obj.status == "Rejected") {
      obj.status = "Plik został odrzucony"
    }
    return (
      console.log(
        "Wysyłający:",
        this.state.sender,
        "Dokument:",
        this.state.documents
      ),
      (
        <div className="UsersetBox">
          <Sidebar history={this.props.history} />
          <div className="UsersetBox-content">
            <div className="UsersetBox-form">
              <div className="UsersetBox-form-content">
                <div className="UsersetBox">
                  <Table striped bordered hover size="sm">
                    <tbody>
                      <tr>
                        <td>
                          <tr>
                            <th>Nazwa dokumentu</th>
                          </tr>
                          <td>{obj.title}</td>
                        </td>
                        <td>
                          <tr>
                          <th>Wysłane do działu:</th>
                          </tr>
                          <td>
                            <output>{obj.departmentName}</output>
                          </td>
                        </td>
                        <td>
                          <tr>
                          <th>Data wysłania:</th>
                          </tr>
                          <td>
                          <td>{obj.sendDate}</td>
                          </td>
                        </td>
                        <td>
                          <tr>
                          <th>Status dokumentu</th>
                          </tr>
                          <td>
                          <th>{obj.status}</th>
                          </td>
                        </td>
                      </tr>
                      <tr>Wysyłający</tr>
                      <tr>
                        <td>
                          <tr>
                          <th>Imię</th>
                          </tr>
                          <td>{obj.sender.firstName}</td>
                        </td>
                        <td>
                          <tr>
                          <th>Nazwisko</th>
                          </tr>
                          <td>{obj.sender.lastName}</td>
                        </td>
                        <td>
                          <tr>
                          <th>Login:</th>
                          </tr>
                          <td>{obj.sender.login}</td>
                        </td>
                        <td>
                          <tr>
                          <th>E-mail:</th>
                          </tr>
                          <td>{obj.sender.email}</td>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <button>
                      Wyświetl plik
                  </button>

                  <div />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default filedetails;
