import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LoginButton from './LoginButton';


class Navbar extends Component {
    
    constructor() {
        super();
        this.state = { 
           user: {},
           loggedIn: false,
        };
    }

    componentDidMount() {
        let user = window.user;

        if(user != 'undefined'){
            const promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve(window.user);
                }, 300);
            }).then((value) => {
                if(value){
                    this.setState({
                        user: value,
                        loggedIn: true,
                    })
                }
            })
        } 
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className={"navbar-brand"} to={"/"}><img className="logo" src="/build/img/logo.png"></img></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className={"nav-link"} to={"/pokedex"}> Pokedex </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={"nav-link"} to={"/inventory"}> Inventory </Link>
                            {this.state.loggedIn}
                        </li>
                    </ul>

                    <LoginButton
                        loggedIn = {this.state.loggedIn}
                        user = {this.state.user}
                    />
                </div>
            </nav>
        )
    }
}

export default Navbar;