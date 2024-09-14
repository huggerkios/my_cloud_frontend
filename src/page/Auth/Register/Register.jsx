import React from "react";
import RegisterForm from "../../../components/AuthComponents/RegisterForm/RegisterForm";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div>
      <h2 className="titleAuth">Register</h2>
      <div className="boxLink">
        <RegisterForm />
        <Link to={"/login"} className="link">
          Already have an account? Login !
        </Link>
      </div>
    </div>
  );
}

export default Register;
