import React, { Component } from 'react';
import './sidebar.css'
import { Redirect } from 'react-router-dom';
import 'react-bootstrap';
import { IoIosBuild,IoMdPower } from "react-icons/io";



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
      <div className="sidebar-logo">Sidebar</div>
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
            
           <p onClick={this.logout} ><IoMdPower /> Wyloguj</p>

            </li>
            <li>
            <p><IoIosBuild/> Ustawienia konta</p>
            </li>
        </ul>
      </div>
      </div>
  )
}}

export default sidebar;