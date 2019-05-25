import React, { Component } from 'react';
//import './App.css';
import {BrowserRouter,Route} from 'react-router-dom';

import Home from "./Components/Home/home";
import Login from "./Components/Login/login";
import Index from "./Components/Home/home";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <div>
      <Route path="/" component={Login} exact/>
      <Route path="/home" component={Home} exact/>
      <Route path="/login" component={Login}/>
      <Route path="/index" component={Index}/>
      
      </div>
      </BrowserRouter>
    );
  
  }
}

export default App;