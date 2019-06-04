import React, { Component } from "react";
import Sidebar from "../Navbar/sidebar";
import { Redirect } from "react-router-dom";
import { Table } from "react-bootstrap";
import "./filedetails.css";

const token = sessionStorage.getItem("token");

class filedetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: "",
      status: "",
      departmentName: "",
      sendDate: "",
      sender: [],
      documents: [],
      comment: "",
      recipient: ""
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
      title: obj.title,
      status: obj.status,
      departmentName: obj.departmentName,
      sendDate: obj.sendDate,
      sender: obj.sender,
      documents: obj.documents
    });
    }

  /* getpath(){
    const obj = this.props.location.state;
    fetch('https://localhost:44388/api/Cases/' +  obj.id)
        .then(response => response.json())
        .then(responseJSON => {
          if (responseJSON.hasErrors) {
            console.log(responseJSON.errors);
          } else {
            this.setState({
              documents: responseJSON.value
            })
          }
        })
   } */

   sendMail(){
    var str = this.state.documents[0].path
    var split = str.split("\\");
    var nazwadokumentu = split[split.length-1]
    console.log(nazwadokumentu)
    console.log(this.state.recipient)
    fetch("https://localhost:44388/api/Documents/SendMail?recipient="+ this.state.recipient +"&documentUrl=localhost:3000/sharedfiles/" + nazwadokumentu, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      },
      body: JSON.stringify({
        recipient: this.state.recipient
      })
    })
      .then(response => response.json())
      .then(parseJSON => {
        if (parseJSON.hasErrors) {
          alert("nie działa")
        } else {
          alert("Zaakceptowano");
          this.props.history.push("/index");
        }
      });
   }
  

  acceptDocument(){
    const obj = this.props.location.state;
    fetch("https://localhost:44388/api/Cases?id="+ obj.id +"&status=Accepted", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      },
      body: JSON.stringify({
        status: obj.status
      })
    })
      .then(response => response.json())
      .then(parseJSON => {
        console.log(obj.status)
        if (parseJSON.hasErrors) {
          alert("nie działa")
        } else {
          alert("Zaakceptowano");
          this.props.history.push("/index");
        }
      });
  }

  showInput() {
    document.getElementById("coment").style.display = "inline";
    document.getElementById("recepient").style.display = "inline";
    document.getElementById("hideButton").style.display = "none";
  }

  rejectedDocument(){
    const obj = this.props.location.state;
    fetch("https://localhost:44388/api/Cases?id="+ obj.id +"&status=Rejected&comment=" + this.state.comment,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      },
      body: JSON.stringify({
        status: obj.status,
        comment: this.state.comment
      })
    })
      .then(response => response.json())
      .then(parseJSON => {
        console.log(obj.status)
        if (parseJSON.hasErrors) {
          alert("nie działa")
        } else {
          alert("Odrzucono");
          this.props.history.push("/index");
        }
      });
  }


  render() {
    if (!sessionStorage.getItem("token")) {
      return <Redirect to={"/home"} />;
    }
    const obj = this.state;
    console.log(this.state.documents[0].path)
    if (obj.status === "Sent"){
        obj.status = "Oczekiwanie na akceptację"
    }
    if (obj.status === "Accepted") {
      obj.status = "Plik został zaakceptowany"
    }
    if (obj.status === "Rejected") {
      obj.status = "Plik został odrzucony"
    }
    return (
      console.log(
        "Wysyłający:",
        this.state.sender,
        "Dokument:",
        this.state.documents
      ),
      (
        <div className="UsersetBox">
          <Sidebar history={this.props.history} />
          <div className="UsersetBox-content">
            <div className="UsersetBox-form">
              <div className="UsersetBox-form-content">
                <div className="UsersetBox">
                  <Table striped bordered hover size="sm">
                    <tbody>
                      <tr>
                        <td>
                          <tr>
                            <th>Nazwa dokumentu</th>
                          </tr>
                          <td>{obj.title}</td>
                        </td>
                        <td>
                          <tr>
                          <th>Wysłane do działu:</th>
                          </tr>
                          <td>
                            <output>{obj.departmentName}</output>
                          </td>
                        </td>
                        <td>
                          <tr>
                          <th>Data wysłania:</th>
                          </tr>
                          <td>
                          <td>{obj.sendDate}</td>
                          </td>
                        </td>
                        <td>
                          <tr>
                          <th>Status dokumentu</th>
                          </tr>
                          <td>
                          <th>{obj.status}</th>
                          </td>
                        </td>
                      </tr>
                      <tr>Wysyłający</tr>
                      <tr>
                        <td>
                          <tr>
                          <th>Imię</th>
                          </tr>
                          <td>{obj.sender.firstName}</td>
                        </td>
                        <td>
                          <tr>
                          <th>Nazwisko</th>
                          </tr>
                          <td>{obj.sender.lastName}</td>
                        </td>
                        <td>
                          <tr>
                          <th>Login:</th>
                          </tr>
                          <td>{obj.sender.login}</td>
                        </td>
                        <td>
                          <tr>
                          <th>E-mail:</th>
                          </tr>
                          <td>{obj.sender.email}</td>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <button>
                      Wyświetl plik
                  </button>
                  <div style= {{display : obj.status ==='Plik został zaakceptowany' || obj.status === 'Plik został odrzucony' ? 'none' : 'block'}}>
                  <button onClick={ this.acceptDocument.bind(this)}>
                      Akceptuj
                  </button>
                  <button  id="hideButton" onClick={this.showInput}>
                      Odrzuć
                  </button>
                  <div id="coment">
                  <textarea name="comment" onChange={this.onChange}></textarea>
                  <button onClick={ this.rejectedDocument.bind(this)}>
                      Wyslij
                  </button>
                  </div>
                  </div>
                  <button  id="hideButton" onClick={this.showInput}>
                      Dzare
                  </button>
                  <div id="recepient">
                  <input type="email" name="recipient" onChange={this.onChange}/>
                  <button onClick={ this.sendMail.bind(this)}>
                      Wyslij
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default filedetails;
