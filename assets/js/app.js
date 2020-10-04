// ./src/js/app.js
    
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import '../css/app.css';

import Home from './components/Home';

const auth =  
    <Router> 
        <Home />
    </Router>

const root = <Router><Home /></Router>;
    
ReactDOM.render(auth, document.getElementById('root'));