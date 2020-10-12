import React, {Component} from 'react';
import {Route, Switch,Redirect, Link, withRouter, useLocation, useParams} from 'react-router-dom';
import Callback from './Callback';

import Login from './Login';
import Navbar from './Navbar';
import Pokedex from './Pokedex';
import Pokemon from './Pokemon';
import Logout from './Logout';
    
class Home extends Component {
    
    render() {
        return (
           <div className={"h-100"}>
               <Navbar />
               <Switch>
                   <Redirect exact from="/" to="/pokedex" />
                   <Route path="/pokedex" component={Pokedex} />
                   <Route path="/login" component={Login} />
                   <Route path={`/pokemon/:pokemonName`} component={Pokemon} />
                   <Route path="/callback" component={Callback} />
                   <Route path="/auth/logout" component={Logout}/>
               </Switch>
           </div>
        )
    }
}

export default Home;