import React, { Component } from "react";
import "./sidebar.css";
import { Redirect, Link } from "react-router-dom";
import "react-bootstrap";
import { IoIosBuild, IoMdPower } from "react-icons/io";
import {
  GoFile,
  GoFileSymlinkFile,
  GoInbox,
  GoHome,
  GoPerson
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
        <div className="sidebar-logo">Sidebar</div>
        <div className="apiOptions">
          <div className="apiOptions-CategorieUser">Menu główne</div>
          <ul>
            <li>
              <Link to="/index" className="linker">
                <p>
                  <GoHome /> Stron główna
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
              <Link to="/showfiles" className="linker">
              <p>
                <GoFile /> Zobacz dokumenty
              </p>
              </Link>
            </li>
            <li>
              <p>
                <GoInbox /> Skrzynka odbiorcza
              </p>
            </li>
            <li>
              <Link to="/userslist" className="linker">
                <p>
                  <GoPerson />
                  Lista użytkowników
                </p>
              </Link>
            </li>
          </ul>
        </div>
          <div style = {{display : this.state.role ==='Admin' || this.state.role === 'SuperAdmin' ? 'block' : 'none'}}>jkhjk</div>
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
