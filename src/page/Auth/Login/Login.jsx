import React from "react";
import LoginForm from "../../../components/AuthComponents/LoginForm/LoginForm";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <h2 className="titleAuth">Login</h2>
      <div className="boxLink">
        <LoginForm />
        <Link to={"/register"} className="link">
          Not have an account? Register !
        </Link>
      </div>
    </div>
  );
}

export default Login;
