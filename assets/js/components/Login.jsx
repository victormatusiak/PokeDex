import React, {Component} from 'react';

class Login extends Component {
    
    render() {
        return (
            <form className="container" method="post">
            
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputUsername">Username</label>

                <input type="text" name="username" id="inputUsername" className="form-control" required ></input>
                <label htmlFor="inputPassword">Password</label>
                <input type="password" name="password" id="inputPassword" className="form-control" required></input>
            
                <input type="hidden" name="_csrf_token" value={window.csrf}></input>
        
            
                <button className="btn btn-lg btn-primary" type="submit">
                    Sign in
                </button>
            </form>
        )
    }
}

export default Login;