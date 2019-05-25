import React, { Component } from 'react';
import Button  from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';
import './home.css'
import Sidebar from '../Navbar/sidebar';

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
      if(!sessionStorage.getItem("token")){
        return(<Redirect to={'/login'}/>) 
      }
  return (
    <div>
    <Sidebar/>
    <div className="homebox">
      <Button variant="primary" size="lg" block href="/login">
      login
      </Button>
      <Button onClick={this.logout} variant="primary"> Wyloguj</Button>
    </div>
    </div>
  )
}}

export default home;