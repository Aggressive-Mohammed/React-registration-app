import React, { useState,} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Validation from './SignupValidation';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (Event) => {
   Event.preventDefault();
   setErrors(Validation(values));
   if(errors.name ==="" && errors.email==="" && errors.password ===""){
    axios.post('http://localhost:3000/signup', values)
    .then(res => {
      navigate('/');
    })
    .catch(err => console.log(err)); 
   }
  };


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="bg-white p-3 rounded w-25">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              name="name"
              onChange={handleInput}
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <strong>Email address</strong>{" "}
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              name="email"
              onChange={handleInput}
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              name="password"
              onChange={handleInput}
            />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          <button type="submit" className="btn btn-success w-100">
            <strong>Signup</strong>
          </button>
          <p>You agree to our terms and conditions</p>
          <Link to="/login" className="btn btn-default border w-100 bg-light">
            <strong>Create Account</strong>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
