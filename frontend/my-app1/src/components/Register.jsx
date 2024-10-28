import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css';

function Register() {
  const [credentials, setCredentials] = useState({ firstname: "", lastname: "", emailaddr: "", phone: "", address: "", password: "" });
  const [showSuccess, setShowSuccess] = useState(false); // State for showing success alert

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        firstname: credentials.firstname, 
        lastname: credentials.lastname, 
        emailaddr: credentials.emailaddr, 
        phone: credentials.phone, 
        address: credentials.address, 
        password: credentials.password 
      })
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    }
    if (json.success) {
      setShowSuccess(true); // Show the success alert

      // Hide the success alert after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000); // 3 seconds
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">Registration Form</h1>
          <p className="col-lg-10 fs-4">Fill in the form below to create an account. Ensure all fields are completed before submitting.</p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={handlesubmit}>
            
            {/* Success alert */}
            {showSuccess && (
              <div className="alert alert-success" role="alert">
                Registration successful!
              </div>
            )}

            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="firstName" placeholder="First Name" name='firstname' value={credentials.firstname} onChange={onChange} required />
              <label htmlFor="firstName">First Name</label>
            </div>

            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="lastName" placeholder="Last Name" name='lastname' value={credentials.lastname} onChange={onChange} required />
              <label htmlFor="lastName">Last Name</label>
            </div>

            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="email" placeholder="name@example.com" name='emailaddr' value={credentials.emailaddr} onChange={onChange} required />
              <label htmlFor="email">Email address</label>
            </div>

            <div className="form-floating mb-3">
              <input type="tel" className="form-control" id="phone" placeholder="Phone Number" name='phone' value={credentials.phone} onChange={onChange} required />
              <label htmlFor="phone">Phone Number</label>
            </div>

            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="address" placeholder="Address" name='address' value={credentials.address} onChange={onChange} required />
              <label htmlFor="address">Address</label>
            </div>

            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="password" placeholder="Password" name='password' value={credentials.password} onChange={onChange} required />
              <label htmlFor="password">Password</label>
            </div>

            <button className="w-100 btn btn-lg btn-success" type="submit">Register</button>
            <hr className="my-4" />
            <small className="text-body-secondary">Already have an account? <Link to="/Login"><b>Log In</b></Link></small>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
