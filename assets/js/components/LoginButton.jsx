import React from "react";
import {Link} from 'react-router-dom';

const LoginButton = (props) => {
  let button;

  function refreshPage() {
    window.location.reload(false);
  }

  if(props.loggedIn){
    button = <Link className={"nav-link"} to={"/auth/logout"}><button className="btn btn-outline-success my-2 my-sm-0">Log out {props.user.name}</button></Link>
  }else {
    button = <Link className={"nav-link"} to={"/login"}><button className="btn btn-outline-success my-2 my-sm-0">Log In</button></Link>
  }

  return <form className="form-inline my-2 my-lg-0">{button}</form>;
    
};

export default LoginButton;