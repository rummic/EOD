
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from '../Navbar/sidebar';

const token = sessionStorage.getItem("token");


class changeuserset extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id :0,
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      role: "",
      user: []
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount() {
    const obj = this.props.location.state;
        this.setState({
            id: obj.id,
            firstName: obj.firstName,
          role: obj.role,
        })
      
  }

  update(id) {
    fetch('https://localhost:44388/api/Users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `bearer ${token}`
      },
      body: JSON.stringify({
          "id": id,
          "firstName": this.state.firstName,
        "role": this.state.role
      })
    })
      .then(response => response.json())
      .then(parseJSON => {
        if (parseJSON.hasErrors) {
         console.log("Suc")
        } else {
          alert("Poprawnie zmieniono dane")
        }
      })
  }



  render() {
    if (!sessionStorage.getItem("token")) {
      return (<Redirect to={'/home'} />)
    }
    const obj = this.state;
    return (
        <div className="UsersetBox">
        <Sidebar history={this.props.history}/>
           <div className="UsersetBox-content"> 
                <div className="UsersetBox-form">
                <div className="UsersetBox-form-content">

                 
               <label>Imie</label>
               <input value={obj.firstName}></input>
                <label>Rola</label>
                <select name="role" onChange={this.onChange}>
                <option>Admin</option>
                <option>User</option>
            </select>
                </div>
                <button className="UsersetBox-form-button" onClick={()=> this.update(obj.id)}>Zmień dane</button>
            </div>
        </div>
        </div>
    );
  }
}

export default changeuserset;