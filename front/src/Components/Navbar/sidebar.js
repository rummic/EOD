import React, { Component } from "react";
import "./sidebar.css";
import { Redirect, Link } from "react-router-dom";
import "react-bootstrap";
import { IoIosBuild, IoMdPower } from "react-icons/io";
import {
  GoFile,
  GoFileSymlinkFile,
  GoHome,
  GoPerson, GoOrganization
} from "react-icons/go";

const token = sessionStorage.getItem("token");

class sidebar extends Component {
  constructor(props) {
    super(props);
    this.state={
        role: ""
    }
    this.logout = this.logout.bind(this);
  }

  logout() {
    sessionStorage.clear();
    this.props.history.push("/login");
  }


  componentDidMount(){
    fetch("https://localhost:44388/api/Users/" + sessionStorage.getItem('id'), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(parseJSON => {
      this.setState({
        role: parseJSON.value.role
      });
    });

  }

  render() {
    if (!sessionStorage.getItem("token")) {
      return <Redirect to={"/login"} />;
    }
    return (
      <div className="sidebar">
        <div className="sidebar-logo">EOD</div>
        <div className="apiOptions">
          <div className="apiOptions-CategorieUser">Menu główne</div>
          <ul>
            <li>
              <Link to="/index" className="linker">
                <p>
                  <GoHome /> Strona główna
                </p>
              </Link>
            </li>
            <li>
              <Link to="/addfile" className="linker">
                <p>
                  <GoFileSymlinkFile /> Dodaj Dokumenty
                </p>
              </Link>
            </li>
            <li>
              <Link to="/userdocument" className="linker">
              <p>
                <GoFile /> Twoje dokumenty
              </p>
              </Link>
            </li>
          </ul>
          <div style = {{display : this.state.role ==='Admin' || this.state.role === 'SuperAdmin' ? 'block' : 'none'}}>
          <div className="apiOptions-CategorieUser apiOptions-PanelAdmin ">Panel Administracyjny</div>
          <ul>
          <li style = {{display :  this.state.role === 'SuperAdmin' ? 'block' : 'none'}}>
              <Link to="/showfiles" className="linker" >
              <p>
                <GoFile /> Zobacz/Akceptuj dokumenty
              </p>
              </Link>
            </li>
            <li style = {{display :  this.state.role === 'Admin' ? 'block' : 'none'}}>
              <Link to="/menagerfile" className="linker" >
              <p>
                <GoFile /> Zobacz/Akceptuj dokumenty
              </p>
              </Link>
            </li>
            <li style = {{display :  this.state.role === 'SuperAdmin' ? 'block' : 'none'}}>
              <Link to="/userslist" className="linker">
                <p>
                  <GoPerson />
                  Lista użytkowników
                </p>
              </Link>
            </li>
            <li style = {{display :  this.state.role === 'SuperAdmin' ? 'block' : 'none'}}>
              <Link to="/departments" className="linker">
                <p>
                  <GoOrganization /> Lista Działów
                </p>
              </Link>
            </li>
          </ul>
          </div>
          </div>
        <div className="userOptions">
          <ul>
            <li>
              <p onClick={this.logout}>
                <IoMdPower /> Wyloguj
              </p>
            </li>
            <li>
              <Link to="/userset" className="linker">
                <p>
                  <IoIosBuild /> Ustawienia konta
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default sidebar;
