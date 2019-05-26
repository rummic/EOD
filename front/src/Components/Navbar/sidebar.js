import React, { Component } from 'react';
import './sidebar.css'
import { Redirect } from 'react-router-dom';
import 'react-bootstrap';



class sidebar extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        sessionStorage.clear();    
        this.props.history.push("/login");
    }

    render(){
      if(!sessionStorage.getItem("token")){
        return(<Redirect to={'/login'}/>) 
      }
  return (
      <div className="sidebar">
      Sidebar
      <div className="apiOptions">
        <ul>
            <li>
                Opcja1
            </li>
            <li>
                opcja2
            </li>
            <li>
                opcja3
            </li>
        </ul>
      </div>
      <div className="userOptions">
      <ul>
            <li>
            
           <p onClick={this.logout} >wyloguj</p>

            </li>
            <li>
            <p >ustawienia konta</p>
            </li>
        </ul>
      </div>
      </div>
  )
}}

export default sidebar;