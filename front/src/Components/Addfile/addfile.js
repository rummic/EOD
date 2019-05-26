import React, { Component } from 'react';
import Sidebar from '../Navbar/sidebar';
import {Redirect} from 'react-router-dom';
import './addfile.css'


class addfile extends Component {

    render(){
      if(!sessionStorage.getItem("token")){
        return(<Redirect to={'/login'}/>) 
      }
  return (
    <div className="AddfileBox">
    <Sidebar history={this.props.history}/>
       <div className="AddfileBox-content"> 
            <div className="AddfileBox-form">
            <div className="AddfileBox-form-content">
            <label>Tytuł :</label><input type="text" placeholder="Podaj tytuł"/>
            <label>Dział :</label><select >
                <option>kk</option>
                <option>kk</option>
            </select>
            </div>
            <div className="AddfileBox-form-files">
            <input type="file"/>
            </div>
            </div>
        </div>
    </div>
  )
}}

export default addfile;