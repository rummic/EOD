import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../Navbar/sidebar";
import Swal from 'sweetalert2';

const token = sessionStorage.getItem("token");

class adduser extends Component {
  constructor(props) {
    super(props);
    this.state = {
    departmentId: 1,
    userId:1,
      name: "",
      role: "",
      users: []

    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount(){
    document.title = 'Dodawanie działu';
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
          this.setState({
            value: parseJSON.value
          });
        if (parseJSON.hasErrors) {
          Swal.fire({
            type: 'error',
            title: 'Błąd',
            text: 'Dział nie został dodany',
          })
        } else {
          fetch(
            "http://localhost:60148/api/Departments?id=" + this.state.value +"&userId=" + this.state.userId ,{
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
                Swal.fire({
                  type: 'error',
                  title: 'Błąd',
                  text: 'Dział nie został dodany',
                })
              } else {
                Swal.fire({
                  type: 'success',
                  title: 'Sukces',
                  text: 'Dział został dodany pomyślnie',
                })
                this.props.history.push("/departments");
              }
            });
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
              <label>Wybierz kierownika :</label>
              <select  value={this.state.userId} name="userId" onChange={(e) => this.setState({userId: e.target.value})}>
                {this.state.users.map((item, i) => (
                 
                  <option   key={i}  value={item.id} style = {{display : item.role ==='Admin' ? 'block' : 'none'}} >{item.login} </option>
                  
                ))}
              </select>
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