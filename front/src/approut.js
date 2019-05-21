import React, { Component } from 'react';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom';

import Home from "./Components/Home/home";
import Login from "./Components/Login/login";
class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <div>
      <Route path="/" component={Home} exact/>
      <Route path="/home" component={Home} exact/>
      <Route path="/login" component={Login}/>

      </div>
      </BrowserRouter>
    );
  
  }
}

export default App;