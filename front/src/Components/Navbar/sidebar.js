import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './sidebar.css'

class sidebar extends Component {
    
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
                wyloguj
            </li>
            <li>
                ustawienia konta
            </li>
        </ul>
      </div>
      </div>
  )
}}

export default sidebar;