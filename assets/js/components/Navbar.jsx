import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth0Client from '../utils/Auth';
import LoginButton from './LoginButton';
    
function Navbar () {

    const logOut = () => {
        
    };

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className={"navbar-brand"} to={"/"}>Logo</Link>
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
                        </li>
                    </ul>

                    <form className="form-inline my-2 my-lg-0">               
                        <Link className={"nav-link"} to={"/login"}> 
                            
                            <button className="btn btn-outline-success my-2 my-sm-0">Log In</button>
                        </Link> 
                    </form>
               </div>
           </nav>
    )
}
    
export default withRouter(Navbar);