import React, { Component } from "react";
//import './App.css';
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./Components/Home/home";
import Login from "./Components/Login/login";
import Index from "./Components/Home/home";
import AddFile from "./Components/Addfile/addfile";
import UserSettings from "./Components/UserSettings/userset";
import UsersList from "./Components/UsersList/userslist";
import ChangeRole from "./Components/ChangeRole/changerole";
import AddUser from "./Components/AddUser/AddUser";
import Showfiles from "./Components/Showfiles/showfiles";
import Filedetails from "./Components/Filedetails/filedetails";
import Departments from "./Components/Departments/departments";
import AddDepartments from "./Components/Departments/adddepartment";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={Login} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/index" component={Index} />
          <Route path="/addfile" component={AddFile} />
          <Route path="/userset" component={UserSettings} />
          <Route path="/userslist" component={UsersList} />
          <Route path="/changerole" component={ChangeRole} />
          <Route path="/AddUser" component={AddUser} />
          <Route path="/showfiles" component={Showfiles} />
          <Route path="/filedetails" component={Filedetails} />
          <Route path="/departments" component={Departments}/>
          <Route path="/adddepartment" component={AddDepartments}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
