
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from '../Navbar/sidebar';

const token = sessionStorage.getItem("token");

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
        login: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      role: "User",
      user: []
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }


componentDidUpdate() {
    fetch('https://localhost:44388/api/Users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `bearer ${token}`
      },
      body: JSON.stringify({
        "login": this.state.login,
        "password": this.state.password,
        "firstName": this.state.firstName,
        "lastName": this.state.lastName,
        "email": this.state.email,
        "role": this.state.role
      })
    })
      .then(response => response.json())
      .then(parseJSON => {
        if (parseJSON.hasErrors) {
          alert("Nie dodano użytkownika")
        } else {
          alert("Pomyślnie dodano użytkownika")
          this.props.history.push("/index")
        }
      })
  }

  render() {
    if (!sessionStorage.getItem("token")) {
      return (<Redirect to={'/home'} />)
    }
    return (
        <div className="UsersetBox">
        <Sidebar history={this.props.history}/>
           <div className="UsersetBox-content"> 
                <div className="UsersetBox-form">
                <div className="UsersetBox-form-content">
                    <label>Imie :</label><input type="text"  name="firstName" onChange={this.onChange}/>
                <label>Nazwisko :</label><input type="text"  name="lastName" onChange={this.onChange}/>
                <label>Nick :</label><input type="text"   name="login" onChange={this.onChange}/>
                <label>Email :</label><input type="text"  name="email" onChange={this.onChange}/>
                <label>Hasło :</label>
                
                <input type="password" name="password" onChange={this.onChange}/>
                </div>
                <button className="UsersetBox-form-button" onClick={this.componentDidUpdate.bind(this)}>Zmień dane</button>
            </div>
        </div>
        </div>
    );
  }
}

export default AddUser;