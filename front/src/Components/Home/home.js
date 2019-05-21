import React, { Component } from 'react';
import Button  from 'react-bootstrap/Button';

class home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout() {
        sessionStorage.clear();    
        this.props.history.push("/home")
    }
    render(){
  return (
    <div className="App">
      elo elo 
      <Button variant="primary" size="lg" block href="/login">
    login
  </Button>
      <Button onClick={this.logout} variant="primary"> Wyloguj</Button>
    </div>
  )
}}

export default home;