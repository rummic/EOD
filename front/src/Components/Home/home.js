import React, { Component } from "react";
import { GoFile, GoFileSymlinkFile } from "react-icons/go";
import Sidebar from "../Navbar/sidebar";
import { Redirect, Link } from "react-router-dom";
import "./home.css";

class home extends Component {
  render() {
    if (!sessionStorage.getItem("token")) {
      return <Redirect to={"/login"} />;
    }
    return (
      <div className="homeb">
        <Sidebar history={this.props.history} />
        <div className="homebox">
          <div className="homebox-options">
            <Link to="/userdocument">
              <div className="homebox-option">
                <div className="homebox-option-content">
                  <div className="homebox-option-content-con">
                    <GoFile className="option-image" />
                    <p>Zobacz dokumenty</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/addfile">
              <div className="homebox-option">
                <div className="homebox-option-content">
                  <div className="homebox-option-content-con">
                    <GoFileSymlinkFile className="option-image" />
                    <p>Dodaj dokumenty</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default home;
