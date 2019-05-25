import React, { Component } from 'react';

import Sidebar from '../Navbar/sidebar';
import {Redirect, Link} from 'react-router-dom';
import './home.css'


class home extends Component {

    render(){
      if(!sessionStorage.getItem("token")){
        return(<Redirect to={'/login'}/>) 
      }
  return (
    <div className="homeb">
    <Sidebar history={this.props.history}/>
    <div className="homebox">
      <div className="homebox-options">
        <Link to="/login"><div className="homebox-option">
        <div className="homebox-option-content"><p>jkhjk</p></div>
        </div></Link>
        <Link to="/login"><div className="homebox-option">
        <div className="homebox-option-content"><p>jkhjk</p></div>
        </div></Link>
      </div>
    </div>
    </div>
  )
}}

export default home;