import React, {Component} from 'react';
import {Route, Switch,Redirect, Link, withRouter, useLocation} from 'react-router-dom';
import Callback from './Callback';

import Login from './Login';
import Navbar from './Navbar';
import Pokedex from './Pokedex';
    
class Home extends Component {
    
    render() {
        return (
           <div>
               <Navbar />
               <Switch>
                   <Redirect exact from="/" to="/pokedex" />
                   <Route path="/pokedex" component={Pokedex} />
                   <Route path="/login" component={Login} />
                   <Route path="/callback" component={Callback} />
                   <Route path="/logout" />
               </Switch>
           </div>
        )
    }
}
    
export default Home;