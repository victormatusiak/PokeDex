import React, {Component} from 'react';

function refreshPage() {
    window.location.reload(false);
}

class Logout extends Component {

    constructor() {
        super();
        this.state = { 
           user: {},
           loggedIn: false,
        };
    }

    componentDidMount(){
        refreshPage();
    }

    render(){
        return (
            <div className={'row text-center'}>
                <span className="fa fa-spin fa-spinner fa-4x"></span>
            </div>
        ) 
    }
};

export default Logout;