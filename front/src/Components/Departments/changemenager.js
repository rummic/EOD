import React, { Component } from "react";
import Sidebar from "../Navbar/sidebar";
import { Redirect } from "react-router-dom";
import { Table } from "react-bootstrap";

const token = sessionStorage.getItem("token");

class filedetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: "",
      manager:[]

    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillMount() {
    const obj = this.props.location.state;
    this.setState({
      id: obj.id,
      name: obj.name,
      manager: obj.manager,
      users: [],
      userId:1
    });
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

    fetch("https://localhost:44388/api/Users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      }
    }).then(response =>
      response.json().then(responseJSON => {
        console.log(responseJSON);
        this.setState({
          users: responseJSON.value || []
        });
      })
    );

  }

  changeMenager(){
    fetch(
      "http://localhost:60148/api/Departments?id=" +this.props.location.state.id +"&userId=" + this.state.userId ,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then(response => response.json())
      .then(parseJSON => {
        if (parseJSON.hasErrors) {
          alert("Dział nie został dodany");
        } else {
          alert("Dział został dodany");
          this.props.history.push("/departments");
        }
      });
  }


  
  render() {

    if (!sessionStorage.getItem("token")) {
      return <Redirect to={"/home"} />;
    }
    const obj = this.state
    return (
      
      
        <div className="UsersetBox">
          <Sidebar history={this.props.history} />
          <div className="UsersetBox-content">
            <div className="UsersetBox-form">
              <div className="UsersetBox-form-content">
                <div className="UsersetBox">
                  <Table striped bordered hover size="sm">
                    <tbody>
                          <tr>
                            <th>Nazwa działu</th>
                            <th>Kierownik</th>
                            <th>Wybierz innego kierownika</th> 
                          </tr>
                          <tr>
                          <td>{obj.id}{obj.name}</td>
                          <td >
                            {obj.manager.login}
                          </td>
                          <td>
                          <select value={this.state.userId} name="userId" onChange={(e) => this.setState({userId: e.target.value})}>
                            {this.state.users.map((item, i) => (
                 
                            <option style = {{display : item.role !=='Admin' ? 'none' : 'block'}}  key={i}  value={item.id}  >{item.login} </option>
                  
                              ))}
                            </select>
                          </td>
                          </tr>
                    </tbody>
                  </Table>
                  <button
              className="UsersetBox-form-button"
              onClick={this.changeMenager.bind(this)}
            >
              Zamień
            </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    );
  }
}

export default filedetails;