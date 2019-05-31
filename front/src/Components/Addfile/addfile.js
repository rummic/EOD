import React, { Component } from "react";
import Sidebar from "../Navbar/sidebar";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./addfile.css";
import { Breadcrumb } from 'react-bootstrap';

const token = sessionStorage.getItem("token");

class addfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      caseId: 1,
      title: "",
      departmentId: 1,
      documents: []
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  addDocument() {
    console.log(this.state.caseId, this.state.departmentId, this.state.title);
    fetch("https://localhost:44388/api/Cases/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      },
      body: JSON.stringify({
        title: this.state.title,
        departmentId: this.state.departmentId
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, "data");
        if (!data.hasErrors) {
            let formData = new FormData();
            console.log(data);
            axios({
              
              url: "https://localhost:44388/api/Documents/" + data.value,
              method: "POST",
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `bearer ${token}`
              },
              data: formData,
              caseId: this.state.caseId
            });
          alert("Plik został porpawnie dodany");
          this.props.history.push("/showfiles");
        } else {
          alert("Niestety plik nie został dodany");
        }
      });
  }

  render() {
    if (!sessionStorage.getItem("token")) {
      return <Redirect to={"/login"} />;
    }
    return (
      <div className="AddfileBox">
        <Sidebar history={this.props.history} />
        <div className="AddfileBox-content">
          <div className="AddfileBox-form">
          <Breadcrumb>
              <Breadcrumb.Item href="/index">EOD</Breadcrumb.Item>
              <Breadcrumb.Item active>Dodaj Dokument</Breadcrumb.Item>
            </Breadcrumb>
            <div className="AddfileBox-form-content">
              <label>Tytuł :</label>
              <input
                type="text"
                placeholder="Podaj tytuł"
                required
                name="title"
                onChange={this.onChange}
              />
              <div className="AddfileBox-form-content-select">
              <label>Dział :</label>
              <input type="text" name="departmentId" onChange={this.onchage} placeholer="1"/>
              <label>Case : </label>
              <input type="text" name="caseId" onChange={this.onchage}  placeholer="1"/>
              </div>
            </div>
            <div className="AddfileBox-form-files">
              <input type="file" />
            </div>
            <div className="addButton">
              <button
                type="button"
                id="add"
                onClick={this.addDocument.bind(this)}
                className="btn btn-success btn-number plusbut"
                data-type="plus"
                data-field="quant[2]"
              >
                <span className="glyphicon glyphicon-plus" />
                Dodaj dokument
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default addfile;
