import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ emailaddr: "", password: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  let navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ emailaddr: credentials.emailaddr, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    }
    if (json.success) {
      localStorage.setItem('userEmail', credentials.emailaddr);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/home");
      }, 1000);
    }
    
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">Plant Disease Detection</h1>
          <p className="col-lg-10 fs-4">Enter your email address and password to log in.</p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={handlesubmit}>
            {showSuccess && (
              <div className="alert alert-success" role="alert">
                Login successful! Redirecting...
              </div>
            )}
            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name='emailaddr' value={credentials.emailaddr} onChange={onChange} required />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password' value={credentials.password} onChange={onChange} required />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-success" type="submit">Log In</button>
            <hr className="my-4" />
            <small className="text-body-secondary">Not a User? <Link to="/createuser"><b>Register</b></Link></small>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
