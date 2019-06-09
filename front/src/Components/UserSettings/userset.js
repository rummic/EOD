import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../Navbar/sidebar";
import "./userset.css";
import { Breadcrumb } from 'react-bootstrap';



const token = sessionStorage.getItem("token");

class userset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
 
  
  componentDidMount() {
    document.title = 'Moje konto';
    
  }

  update() {
    fetch(
          "https://localhost:44388/api/Users",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              newPassword: this.state.newPassword,
              currentPassword: this.state.currentPassword,
              confirmNewPassword: this.state.confirmNewPassword
            })
          }
        )
          .then(response => response.json())
          .then(parseJSON => {
            if (parseJSON.hasErrors) {
              document.getElementById("badtitle").innerHTML = parseJSON.errors[0];
              document.getElementById("badtitle").style.color = "red";
            } else {
              alert("Dane zostały zmienione");
              this.props.history.push("/index");
            }
          });
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
              
              <label>Stare hasło :</label>
              <input
                type="password"
                required
                placeholder="Podaj hasło"
                name="currentPassword"
                onChange={this.onChange}
              />
              <label>Nowe hasło :</label>
              <input
                type="password"
                required
                placeholder="Podaj hasło"
                name="newPassword"
                onChange={this.onChange}
              />
              
              <label>Powtórz hasło :</label>
              <input
                type="password"
                required
                placeholder="Podaj hasło"
                name="confirmNewPassword"
                onChange={this.onChange}
              />
              
              
            </div>
            <p id="badtitle" style={{fontSize:'20px', marginLeft: '30%' } } />
            <div className="UsersetBox-form-button-back">
            <button
              className="UsersetBox-form-button"
              onClick={this.update.bind(this)}
            >
              Zmień hasło
            </button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default userset;
