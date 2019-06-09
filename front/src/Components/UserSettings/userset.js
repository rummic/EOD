import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../Navbar/sidebar";
import "./userset.css";
import { Breadcrumb } from 'react-bootstrap';
import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false,
})

const token = sessionStorage.getItem("token");

class userset extends Component {
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
    document.title = 'Moje konto';
    fetch("https://localhost:44388/api/Users/" + sessionStorage.getItem("id"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(parseJSON => {
        this.setState({
          firstName: parseJSON.value.firstName,
          lastName: parseJSON.value.lastName,
          email: parseJSON.value.email,
          phoneNumber: parseJSON.value.phoneNumber,
          role: parseJSON.value.role
        });
      });
  }

  update() {
        swalWithBootstrapButtons.fire({
      title: 'Czy chcesz zaakceptować dokument',
      text: "Tej czynności nie będzie można cofnąć!",
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Akceptuj',
      cancelButtonText: 'Cofnij',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
    fetch("https://localhost:44388/api/Users/" + sessionStorage.getItem("id"), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      },
      body: JSON.stringify({
        password: this.state.password,
      })
    })
      .then(response => response.json())
      .then(parseJSON => {
        console.log(parseJSON);
        if (parseJSON.hasErrors) {
          alert("nie działa")
        } else {
          alert("Poprawnie zmieniono dane");
          this.props.history.push("/index");
        }
      });
    
    } else if (
      // Read more about handling dismissals
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })}

  showInput() {
    document.getElementById("password").style.display = "inline";
    document.getElementById("hideButton").style.display = "none";
  }
  render() {
    if (!sessionStorage.getItem("token")) {
      return <Redirect to={"/login"} />;
    }
    return (
      <div className="UsersetBox">
        <Sidebar history={this.props.history} />
        <div className="UsersetBox-content">
          <div className="UsersetBox-form">
          <Breadcrumb>
              <Breadcrumb.Item href="/index">EOD</Breadcrumb.Item>
              <Breadcrumb.Item active>Ustawienia konta</Breadcrumb.Item>
            </Breadcrumb>
            <div className="UsersetBox-form-content">
              
              <label>Hasło :</label>
              <button
                id="hideButton"
                className="password-button"
                variant="primary"
                onClick={this.showInput}
              >
                Zmień hasło
              </button>
              <input
                type="password"
                id="password"
                placeholder="Podaj hasło"
                name="password"
                onChange={this.onChange}
              />
              
            </div>
            <div className="UsersetBox-form-button-back">
            <button
              className="UsersetBox-form-button"
              onClick={this.update.bind(this)}
            >
              Zmień dane
            </button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default userset;
