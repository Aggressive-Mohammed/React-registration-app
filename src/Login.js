import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation"; 
import axios from "axios";

function Login() {

  const [values, setValues] = useState({
    email:'',
    password: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});


  const handleInput = (Event)=>{
    setValues(prev => ({...prev, [Event.target.name]:[Event.target.value]}))
  };

  const handleSubmit = (Event) => {
    Event.preventDefault();
    setErrors(Validation(values));

    if(errors.email==="" && errors.password ===""){
      axios.post('http://localhost:3000/login', values)
      .then(res => {
        if(res.data === "Success"){
          navigate('/home');
        }else{
          alert('no record exist!');
        }
      })
      .catch(err => console.log(err)); 
     }
  };


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="bg-white p-3 rounded w-25 border border-2 shadow p-3 mb-5 bg-body rounded" >
        <h2>Login</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <strong>Email address</strong>
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              onChange={handleInput}
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <strong>Passwords</strong>
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="enter you password"
              onChange={handleInput}
            />
               {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          <button type="submit" className="btn btn-success w-100 ">
            <strong>Login</strong>
          </button>
          <p>You agree to our terms and condition</p>
          <Link
            to={"/signup"}
            type="button"
            className="btn btn-default border w-100 bg-light"
          >
            <strong>Create Account</strong>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
