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
      recipient: "",
      value: null,
      documentname: "",
      frontRedirect : "http://localhost:3000/sharedfiles/",
      val: "",
      patch: ""

    };
    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
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

  /* login(){
    var str = this.state.documents[0].path
    var split = str.split("\\");
    var nazwadokumentu = split[split.length-1]
    console.log(nazwadokumentu)
    console.log(this.state.recipient)
    fetch("http://localhost:44388/api/Documents/SharedDocument?recipient="+ this.state.recipient +"&documentName= " + nazwadokumentu, {
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
        this.setState({
          value: parseJSON.value.value
        });
        console.log(this.state.value)
        if (parseJSON.hasErrors) {
          alert("nie działa")
        } else {
          alert("Zaakceptowano");
          this.props.history.push("/index");
        }
      });
   }*/
   login() {
   // var str = this.state.documents[0].path
    var split = this.state.documents[0].path.split("\\");
    this.state.documentname = split[split.length-1]
    fetch("https://localhost:44388/api/Documents/SharedDocument", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        recipient : this.state.recipient,
        documentname: this.state.documentname
      })
    })
      .then(response => response.json())
      .then(parseJSON => {
        this.setState({
          value: parseJSON.value
        });
        console.log(this.state.value)
        console.log(this.state.documentname)
        if (parseJSON.hasErrors ) {
          console.log("elo")
        } else {
          fetch("https://localhost:44388/api/Documents/SendMail?id=" +this.state.value + "&redirect=" +this.state.frontRedirect,{
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${token}`
            },
          })
            .then(response => response.json())
            .then(parseJSON => {
              console.log(this.state.value)
              console.log(this.state.frontRedirect)
              console.log(parseJSON);
              if (parseJSON.hasErrors) {
                alert("nie działa")
              } else {
                alert("Poprawnie zmieniono dane");
              }
            });

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
    document.getElementById("hideButton").style.display = "none";

  }

  showMail(){
    document.getElementById("recepient").style.display = "inline";
    document.getElementById("showButton").style.display = "none";
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

//    console.log(this.state.documents[0].path)
  render() {

    if (!sessionStorage.getItem("token")) {
      return <Redirect to={"/home"} />;
    }
    const obj = this.state;
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
                  <button  id="showButton" onClick={this.showMail}>
                      Dzare
                  </button>
                  <div id="recepient">
                  <input type="email" name="recipient" onChange={this.onChange.bind(this)}/>
                  <button onClick={this.login}>
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
