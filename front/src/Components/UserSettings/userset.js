
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from '../Navbar/sidebar';
import './userset.css'

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
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount() {
    fetch('https://localhost:44388/api/Users/' + sessionStorage.getItem("id"), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `bearer ${token}`,
      },
    }).then(response => response.json())
      .then(parseJSON => {
        this.setState({
          firstName: parseJSON.value.firstName,
          lastName: parseJSON.value.lastName,
          email: parseJSON.value.email,
          phoneNumber: parseJSON.value.phoneNumber,
          role: parseJSON.value.role,
        })
      })
  }

  update() {
    fetch('https://localhost:44388/api/Users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `bearer ${token}`
      },
      body: JSON.stringify({
        "login": sessionStorage.getItem('login'),
        "password": this.state.password,
        "firstName": this.state.firstName,
        "lastName": this.state.lastName,
        "email": this.state.email,
        "phoneNumber": this.state.phoneNumber,
        "role": this.state.role
      })
    })
      .then(response => response.json())
      .then(parseJSON => {
        if (parseJSON.hasErrors) {
          document.getElementById("badData").innerHTML = parseJSON.errors;
          document.getElementById("badData").style.color = "red";
        } else {
          alert("Poprawnie zmieniono dane")
          this.props.history.push("/index")
        }
      })
  }

  showInput() {
    document.getElementById("password").style.display = "inline";
    document.getElementById("hideButton").style.display = "none"
  }
  render() {
    if (!sessionStorage.getItem("token")) {
      return (<Redirect to={'/login'} />)
    }
    return (
        <div className="UsersetBox">
        <Sidebar history={this.props.history}/>
           <div className="UsersetBox-content"> 
                <div className="UsersetBox-form">
                <div className="UsersetBox-form-content">
                <label>Imie :</label><input type="text"  disabled value={this.state.firstName} name="firstName" onChange={this.onChange}/>
                <label>Nazwisko :</label><input type="text"  disabled value={this.state.lastName} name="lastName" onChange={this.onChange}/>
                <label>Nick :</label><input type="text"  disabled value={sessionStorage.getItem('login')} name="login" onChange={this.onChange}/>
                <label>Email :</label><input type="text"  value={this.state.email} name="email" onChange={this.onChange}/>
                <label>Hasło :</label>
                <button id="hideButton" variant="primary" onClick={this.showInput} >Zmień hasło</button>
                <input type="password" id="password" placeholder="Podaj hasło" name="password" onChange={this.onChange}/>
                </div>
                <button className="UsersetBox-form-button" onClick={this.update.bind(this)}>Zmień dane</button>
            </div>
        </div>
        </div>
    );
  }
}

export default userset;