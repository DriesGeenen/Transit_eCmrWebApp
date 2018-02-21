import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Switch, Route, HashRouter, NavLink, Link } from "react-router-dom";

export default inject("LoginStore")(observer(class Navbar extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        this.props.LoginStore.LogOut();
    }

    render() {
        var adminLinks = (<li><NavLink to="/login">Login</NavLink></li>);

        if (this.props.LoginStore.LoggedIn) {
            var adminLinks = [];
            adminLinks.push(<li key={1}><Link to="/login" onClick={this.onLogout}>Logout</Link></li>
            );
        }

        return (
            <nav>
                <div className="nav-wrapper grey darken-3">
                    <a href="#!" className="brand-logo hide-on-med-and-down"><img src="https://i.imgur.com/YxVHfN8.png" height="45px" width="45px"/></a>
                    <ul id="nav-mobile" className="right marginRight-20 marginTop-20">
                        <li><NavLink to="/dashboard">Home</NavLink></li>
                        {adminLinks}
                    </ul>
                </div>
            </nav>
        );
    }
}))