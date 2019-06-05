import React, { Component } from "react";
import Sidebar from "../Navbar/sidebar";
import { Redirect } from "react-router-dom";
import { Table } from "react-bootstrap";

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
      manager: obj.manager
    });
    }

 
  
  render() {

    if (!sessionStorage.getItem("token")) {
      return <Redirect to={"/home"} />;
    }
    const obj = this.state
    console.log(obj.manager.login);
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
                          </tr>
                          <tr>
                          <td>{obj.name}</td>
                          <td >
                            {obj.manager.login}
                          </td>
                          </tr>
                    </tbody>
                  </Table>
    
                </div>
              </div>
            </div>
          </div>
        </div>
      
    );
  }
}

export default filedetails;