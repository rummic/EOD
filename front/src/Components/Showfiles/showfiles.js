import React, { Component } from "react";
import Sidebar from "../Navbar/sidebar";
import { Redirect, Link } from "react-router-dom";
import { Table } from "react-bootstrap";

import Search from '@material-ui/icons/Search';
import MaterialTable from "material-table";

const token = sessionStorage.getItem("token");
const tableIcons = {
  Search: Search
}
class showfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cases: []
    };
    this.OnChange = this.OnChange.bind(this);
  }

  OnChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    document.title = 'Lista dokumentów';
    fetch("https://localhost:44388/api/Cases", {
      method: "GET",
      headers: {
        "Content-Type": "aplication/json",
        Authorization: `bearer ${token}`
      }
    }).then(response =>
      response.json().then(responseJSON => {
        console.log(responseJSON);
        this.setState({
          cases: responseJSON.value || []
        });
      })
    );
  }

  render() {
    if (!sessionStorage.getItem("token")) {
      return <Redirect to={"/home"} />;
    }
    return (
      <div className="UsersetBox">
        <Sidebar history={this.props.history} />
        <div className="UsersetBox-content">
          <div className="UsersetBox-form">
            <div className="UsersetBox-form-content">
              <div className="UsersetBox">
                
                  <MaterialTable
        icons = {tableIcons}
          columns={[
            { title: "Tytuł", field: "title" },
            { title: "Dzial", field: "departmentName" },
            {title: "Status", field: "state"},
            {title: "Data wysłania", field: "sendDate"},
            
            {title: "", field:"buttonek"}
            
          ]}
         
           data={this.state.cases.map((item, i) => ({ 
              
           title:  item.title,
           departmentName: item.departmentName,
           state: item.status,
           sendDate: item.sendDate,
           buttonek:<Link to={{pathname:"./filedetails", state: item}}> <button>Ustawienia </button></Link>
           
        
            
})) }

          title="Lista użytkowników"
          />
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default showfiles;
