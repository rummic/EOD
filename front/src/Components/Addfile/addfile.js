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
      title: "",
      departmentId: 1,
      documents: [],
      selectedFile: null,
      documentsType: [],
      documentsTypename: "",
      departments: [],
      value: ""
    };
    this.onChange = this.onChange.bind(this);
  }
 
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
 
  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }
 
  componentDidMount() {
      document.title = 'Dodawanie dokumentu';
    fetch("https://localhost:44388/api/Departments")
      .then(response => response.json())
      .then(parseJSON => {
        this.setState({
          departments: parseJSON.value
        });
      });
      
        
       
    console.log(this.state.departmentId)
    console.log(this.state.documentsType)
    
  }





  fileUploadHandler = () => {
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
      
      .then(parseJSON => {
        this.setState({
          value: parseJSON.value
        });
        if (!parseJSON.hasErrors) {
          
          const fd = new FormData();
          fd.append('document', this.state.selectedFile, this.state.selectedFile.name)
          
             axios.post('https://localhost:44388/api/Documents/'+this.state.value, fd,{
              headers: {
                "Content-Type": "aplication/json",
                Authorization: `bearer ${token}`
            }})
            
            .then(res => {
              console.log(res)
            })
            fetch("https://localhost:44388/api/DocumentsType/"+this.state.departmentId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      },
      body: JSON.stringify({
        
        name: this.state.name
        
      })
    })
            
   
          
        
          alert("Plik został porpawnie dodany");
          this.props.history.push("/userdocument");
        } else {
          alert("Niestety plik nie został dodany");
        }
      },
      () => this.addFiles());
  }

  setdepartmentId = () => {
    this.setState((prevdepartmenId , currentdepartmentId)=> {return {departmentId: !prevdepartmenId.departmentId}})
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
              <select value={this.state.departmentsId} name="departmentsId" onChange={(e) => this.setState({departmentId: e.target.value})} >
                {this.state.departments.map((item, i) => (
                 
                  <option   key={i}  value={item.id}  >{item.name} </option>
                  
                ))}
              </select>
              
            </div>
            <div className="AddfileBox-form-files">
              <input type="file"  onChange={this.fileSelectedHandler}  />
            </div>
          </div>
          <div className="addButton">
              <button
                type="button"
                id="add"
                 onClick={this.fileUploadHandler}
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

