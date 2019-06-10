import React, { Component } from "react";
import Sidebar from "../Navbar/sidebar";
import { Redirect } from "react-router-dom";
import { Table } from "react-bootstrap";
import "./filedetails.css";
import Swal from 'sweetalert2';

const token = sessionStorage.getItem("token");
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false,
})
class filedetails extends Component {
  componentDidMount() {
    document.title = 'Szczegóły ' + this.state.title;
  }
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
      patch: "",
      users: [],
      role: ""

    };
    this.onChange = this.onChange.bind(this);
    this.sendmail = this.sendmail.bind(this);
    this.showFile = this.showFile.bind(this);
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
    }

    showFile(){
      window.open('https://localhost:44388/Documents/'+ this.state.documents[0].path, "_blank")
    }
   sendmail() {
    
    fetch("https://localhost:44388/api/Documents/SharedDocument", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        recipient : this.state.recipient,
        documentname: this.state.documents[0].path
      })
    })
      .then(response => response.json())
      .then(parseJSON => {
        this.setState({
          value: parseJSON.value
        });
        console.log(this.state.value)
        console.log(this.state.documents[0].path)
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
    swalWithBootstrapButtons.fire({
      title: 'Czy chcesz zaakceptować dokument',
      text: "Tej czynności nie będzie można cofnąć!",
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Akceptuj',
      cancelButtonText: 'Cofnij',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
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
          Swal.fire({
            type: 'error',
            title: 'Błąd',
            text: 'Plik nie został zaakceptowany',
          })
        } else {
          this.props.history.push("/showfiles");
          Swal.fire({
          type: 'success',
          title: 'Sukces!',
          text: 'Plik został zaakceptowany',
        });
      
                }
      });
  }
       else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Anulowano zmiany',
          'Plik nie został zaakceptowany',
          'info'
        )
      }
    })}




    

  showInput() {
    document.getElementById("coment").style.display = "inline";
    document.getElementById("hideButton").style.display = "none";

  }

  showMail(){
    document.getElementById("recepient").style.display = "inline";
    document.getElementById("showButtonelo").style.display = "none";
  }

  rejectedDocument(){
    swalWithBootstrapButtons.fire({
      title: 'Czy chcesz odrzucić dokument',
      text: "Tej czynności nie będzie można cofnąć!",
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Akceptuj',
      cancelButtonText: 'Cofnij',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
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
          Swal.fire({
            type: 'error',
            title: 'Błąd',
            text: 'Plik nie został odrzucony',
          })
        } else {
          this.props.history.push("/showfiles");
          Swal.fire({
          type: 'success',
          title: 'Sukces!',
          text: 'Plik został odrzucony',
        });
      
                }
      });
  }
       else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Anulowano zmiany',
          'Plik nie został odrzucony',
          'info'
        )
      }
    })}

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
      console.log(this.state.role),
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
                  <button onClick={this.showFile}>
                      Wyświetl plik
                  </button>
                  <div style= {{display : obj.status ==='Plik został zaakceptowany' || obj.status === 'Plik został odrzucony' ? 'none' : 'block'}}>
                  <button onClick={ this.acceptDocument.bind(this)} style = {{display : this.state.role ==='Admin' || this.state.role === 'SuperAdmin' ? 'block' : 'none'}}>
                      Akceptuj
                  </button>
                  <button  id="hideButton" onClick={this.showInput} style = {{display : this.state.role ==='Admin' || this.state.role === 'SuperAdmin' ? 'block' : 'none'}}>
                      Odrzuć
                  </button>
                  <div id="coment">
                  <textarea name="comment" onChange={this.onChange}></textarea>
                  <button onClick={ this.rejectedDocument.bind(this)}>
                      Wyslij
                  </button>
                  </div>
                  </div>
                  <button  id="showButtonelo" onClick={this.showMail}>
                      Udostępnij dokument
                  </button>
                  <div id="recepient">
                  <input type="email" name="recipient" onChange={this.onChange.bind(this)}/>
                  <button onClick={this.sendmail}>
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
