import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name:"", email: "", cpassword: "" });

  let navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:  credentials.name,
        email: credentials.email,
        password: credentials.cpassword,
      }),
    });

    const json = await response.json();
 
    if (json.success) {
      //save token and redirect
      console.log(json);
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert('Account Created Successfully','success');
    } else {
      props.showAlert('Invalid Credentials','danger');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Enter Name"
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleChange}
            name="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
            minLength={5}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmpassword"
            placeholder="Password"
            onChange={handleChange}
            name="cpassword"
            minLength={5}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
