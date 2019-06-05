import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../Navbar/sidebar";

const token = sessionStorage.getItem("token");

class adduser extends Component {
  constructor(props) {
    super(props);
    this.state = {
    departmentId: 1,
      name: "",
      role: ""

    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount(){
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

  }

  addDepartment() {
    fetch("https://localhost:44388/api/Departments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      },
      body: JSON.stringify({
        name: this.state.name
      })
    })
      .then(response => response.json())
      .then(parseJSON => {
          console.log(this.state.name)
        if (parseJSON.hasErrors) {
          alert("Dział nie został dodany");
        } else {
          alert("Dział został dodany");
          this.props.history.push("/departments");
        }
      });
  }

  render() {
    if (!sessionStorage.getItem("token") || this.role === "User" || this.role === "Admin") {
      return <Redirect to={"/home"} />;
    }
    return (
      <div className="UsersetBox">
        <Sidebar history={this.props.history} />
        <div className="UsersetBox-content">
          <div className="UsersetBox-form">
            <div className="UsersetBox-form-content">
              <label>Nazwa :</label>
              <input
                type="text"
                placeholder="Podaj nazwe"
                name="name"
                onChange={this.onChange}
                required
              />
            </div>
            <button
              className="UsersetBox-form-button"
              onClick={this.addDepartment.bind(this)}
            >
              Dodaj
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default adduser;