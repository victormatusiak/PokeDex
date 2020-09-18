import React, {Component} from 'react';
import {Route, Switch,Redirect, Link, withRouter} from 'react-router-dom';
import Users from './Users';
import Posts from './Posts';
import Pokedex from './Pokedex';
    
class Home extends Component {
    
    render() {
        return (
           <div>
               <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className={"navbar-brand"} to={"/"}> Symfony React Project </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                   <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                           <li className="nav-item">
                               <Link className={"nav-link"} to={"/pokedex"}> Pokedex </Link>
                           </li>
                        </ul>
                   </div>
               </nav>
               <Switch>
                   <Redirect exact from="/" to="/pokedex" />
                   <Route path="/pokedex" component={Pokedex} />
               </Switch>
           </div>
        )
    }
}
    
export default Home;