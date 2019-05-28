import React, { Component } from 'react';
import './sidebar.css'
import { Redirect, Link } from 'react-router-dom';
import 'react-bootstrap';
import { IoIosBuild, IoMdPower } from "react-icons/io";
import { GoFile, GoFileSymlinkFile, GoInbox, GoHome, GoPerson } from "react-icons/go";



class sidebar extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        sessionStorage.clear();
        this.props.history.push("/login");
    }

    render() {
        if (!sessionStorage.getItem("token")) {
            return (<Redirect to={'/login'} />)
        }
        return (
            <div className="sidebar">
                <div className="sidebar-logo">Sidebar</div>
                <div className="apiOptions">
                    <div className="apiOptions-CategorieUser">Menu główne</div>
                    <ul>
                        <li>
                            <Link to="/index" className="linker"><p><GoHome /> Stron główna</p></Link>
                        </li>
                        <li>
                            <Link to="/addfile" className="linker"><p><GoFileSymlinkFile /> Dodaj Dokumenty</p></Link>
                        </li>
                        <li>
                            <p><GoFile /> Zobacz dokumentu</p>
                        </li>
                        <li>
                            <p><GoInbox /> Skrzynka odbiorcza</p>
                        </li>
                        <li>
                            <Link to="/userslist" className="linker"><p><GoPerson />Lista użytkowników</p></Link>
                        </li>
                    </ul>
                </div>
                <div className="userOptions">
                    <ul>
                        <li>

                            <p onClick={this.logout} ><IoMdPower /> Wyloguj</p>

                        </li>
                        <li>
                            <Link to="/userset" className="linker"><p><IoIosBuild /> Ustawienia konta</p></Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default sidebar;