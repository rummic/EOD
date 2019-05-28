import React, { Component } from "react";
import Sidebar from "../Navbar/sidebar";
import { Redirect } from "react-router-dom";
import axios, {post} from "axios";
import "./addfile.css";
import { statement } from "@babel/template";

const token = sessionStorage.getItem("token");

class addfile extends Component {
  constructor(props){
    super(props);

    this.state = {
      caseID: 0,
      title: "",
      department: "",
      documents: [],
      file: null
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e){
    this.this.setState({ [e.target.name]: e.target.value});
  }

  addFile(){
      this.setState({files: [...this.state.documents, ""]}) ;
  }

  addDocument(){
    fetch("https://localhost:44388/api/Documents/", {
      methos: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      },
    body: JSON.stringify({
      title: this.state.title,
      department: this.sate.department
      
    })})
      .then(response => response.json())

    .then(data => {
      console.log(data);
      if(!data.hasError) {
        var documentsArray = this.state.documents
        let formData = new FormData();
        formData.append("document", documentsArray);
        axios({
          url:"https://localhost:44388/api/Documents/" + data.value,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `bearer ${token}`
          },
          data: formData
        });

        alert("Dokument dodano poprawnie");
      } else{
        alert("Dokument nie został dodany");
      }
    }
    );
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
            <div className="AddfileBox-form-content">
              <label>Tytuł :</label>
              <input type="text" placeholder="Podaj tytuł" required name="title"/>
              <label>Dział :</label>
              <select placeholder="Wybierz dział" required name="department">
                <option>kk</option>
                <option>kk</option>
              </select>
            </div>
            <div className="AddfileBox-form-files">
              <input type="file" />
            </div>
            <div className="addButton">
                <button
                  type="button"
                  id="add"
                  onClick={e => this.addFile(e)}
                  className="btn btn-success btn-number plusbut"
                  data-type="plus"
                  data-field="quant[2]"
                >
                  <span className="glyphicon glyphicon-plus" />
                  Dodaj dokument
                </button>
                <button onClick={this.addDocument.bind(this)}>Dodaj dokument</button>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default addfile;
