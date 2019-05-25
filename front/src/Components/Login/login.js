import React, { Component } from 'react';
import { Form, Button, FormGroup } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import './login.css';

export function PostData(type,userData){

    let url = 'http://localhost:60148/api/Users/';

    return new Promise((resolve,reject)=>{
        fetch(url+type,{
            method:'POST',
            headers : { 
                'Content-Type': 'application/json'
               },
            body: JSON.stringify(userData)
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            resolve(responseJson);
        })
        .catch((error)=>{
            reject(error);
        });
    });
}

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
    }
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }



  login() {
    if (this.state.login && this.state.password) {
      PostData('Authenticate', this.state).then((result) => {
        let responseJSON = result;
        
        if (responseJSON.value) {
          sessionStorage.setItem('login',responseJSON.value.login);
          sessionStorage.setItem('token',responseJSON.value.token);
          sessionStorage.setItem('id',responseJSON.value.id);
          this.props.history.push("/index")

        } else {
          document.getElementById("badLogin").innerHTML = "Błędne dane logowania";
          document.getElementById("badLogin").style.color = "red";
        }
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })

  }

  render() {
    if(sessionStorage.getItem("token")){
      return(<Redirect to={'/index'}/>) 
    }

    return (
        <div className="loginbox">
          <div className="login-content-box">
          <Form.Group controlId="formBasicLogin">
            <Form.Label>Login</Form.Label>
            <Form.Control type="text" required placeholder="Login" name="login" onChange={this.onChange} />
          </Form.Group>
          <Form.Group controlId="formBasicPassowrd">
            <Form.Label>Hasło</Form.Label>
            <Form.Control type="password" required placeholder="Hasło" name="password" onChange={this.onChange} />
          </Form.Group>
          <FormGroup>
            <p id="badLogin"></p>
          </FormGroup>
          <Button variant="primary" type="submit" block onClick={this.login}>
            Zaloguj
                    </Button>

          </div>
        </div>
    );
  }
}

export default login;