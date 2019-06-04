import React, { Component } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./login.css";

class getpassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      email: ""
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  
  getpassword() {
    fetch("https://localhost:44388/api/Users/"+  {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,

      })
    })
      .then(response => response.json())
      .then(parseJSON => {
        if (parseJSON.hasErrors) {
          alert("Zły mail")
        } else {
          this.props.history.push("/login");
        }
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (sessionStorage.getItem("token")) {
      return <Redirect to={"/index"} />;
    }
    return (
      <div className="loginbox">
        <div className="login-content-box">
          <Form.Group controlId="formBasicLogin">
            <Form.Label>Login</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Login"
              name="login"
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassowrd">
            <Form.Label>Hasło</Form.Label>
            <Form.Control
              type="password"
              required
              placeholder="Hasło"
              name="password"
              onChange={this.onChange}
            />
          </Form.Group>
          <FormGroup>
            <p id="badLogin" />
          </FormGroup>
          <Button variant="primary" type="submit" block onClick={this.login}>
            Zaloguj
          </Button>
        </div>
      </div>
    );
  }
}

export default getpassword;
