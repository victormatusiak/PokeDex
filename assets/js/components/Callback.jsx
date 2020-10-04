// assets/js/components/Callback.js

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import auth0Client from '../utils/Auth';
import Profile from './Profile';


class Callback extends Component {

    render() {
        return (
            <Profile></Profile>
        );
    }
}

export default Callback;