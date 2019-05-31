import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from '../Navbar/sidebar';
 
 
const token = sessionStorage.getItem("token");
 
class adduser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
            role: "",
        };
        this.onChange = this.onChange.bind(this);
    }
 
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
 
    addU() {
        fetch('https://localhost:44388/api/Users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `bearer ${token}`
            },
            body: JSON.stringify({
                "login": this.state.login,
                "password": this.state.password,
                "firstName": this.state.firstName,
                "lastName": this.state.lastName,
                "email": this.state.email,
                "role": this.state.role
            })
        })
            .then(response => response.json())
            .then(parseJSON => {
                if (parseJSON.hasErrors) {
                    alert("Użytkownik nie został dodany")
                } else {
                    alert("Użytkownik został dodany")
                    this.props.history.push("/usersList")
                }
            })
    }
 
    render() {
        if (!sessionStorage.getItem("token")) {
            return (<Redirect to={'/home'} />)
        }
        return (
            <div className="UsersetBox">
                <Sidebar history={this.props.history} />
                <div className="UsersetBox-content">
                    <div className="UsersetBox-form">
                        <div className="UsersetBox-form-content">
                            <label>Imie :</label><input type="text"  placeholder="Podaj Imię" name="firstName" onChange={this.onChange} required/>
                            <label>Nazwisko :</label><input type="text" placeholder="Podaj Nazwisko" name="lastName" onChange={this.onChange} required/>
                            <label>Login :</label><input type="text" placeholder="Podaj Login" name="login" onChange={this.onChange} required/>
                            <label>Email :</label><input type="text" placeholder="Podaj E-mail" name="email" onChange={this.onChange} required/>
                            <label>Hasło :</label><input type="password" placeholder="Podaj hasło" name="password" onChange={this.onChange} required/>
                            <label>Rola : </label>
                            <select name="role" onChange={this.onChange} required>
                                <option value="" disabled selected>Wybierz rolę</option>
                                <option name="role" onChange={this.onChange}>Administrator</option>
                                <option name="role" onChange={this.onChange}>Użytkownik</option>
                            </select>
                        </div>
                        <button className="UsersetBox-form-button" onClick={this.addU.bind(this)}>Dodaj użytkownika</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default adduser;