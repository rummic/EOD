import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./login.css";

class getpassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
 
      mail: "",

    };
    this.getpassword = this.getpassword.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  
  getpassword() {
    fetch("https://localhost:44388/api/Users/"+ this.state.mail,  {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mail: this.state.mail,

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
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              placeholder="mail"
              name="mail"
              onChange={this.onChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" block onClick={this.getpassword}>
            przypomnij
          </Button>
          <Button variant="primary" type="submit" block href="./login">
            Powrót
          </Button>
        </div>
      </div>
    );
  }
}

export default getpassword;
