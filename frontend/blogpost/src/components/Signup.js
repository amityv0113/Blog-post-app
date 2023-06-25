import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Signup(props) {

  const [credential, setcredential] = useState({
    name:"",
    email: "",
    password: "",
    cpassword:""
  });

  let navigate = useNavigate();
  
  const handleSignup=async (credential)=>{
    
    const host ="http://localhost:5000"

    const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential)
  
      });
      const json = await response.json();
      console.log(json)
      if (json.success && credential.password===credential.cpassword){
        //save the auth token and redirrect to home page
        localStorage.setItem('token',json.authtoken)
        navigate('/');
        props.showAlert("account created successfully","success")
      }
      else
      {
        props.showAlert("Invalid credentials","danger")
      }
  }
  const onClickHandle = (e) => {
    e.preventDefault();
    handleSignup(credential);
    setcredential({
      name:"",
      email: "",
      password: "",
      cpassword:""
    });
  };
  const onChangeHandle = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <div className="container my-3">
      <h2>Signup</h2>
      </div>
      <form onSubmit={onClickHandle}>
        <div className="form-outline mb-4">
          <input type="text" id="name" className="form-control" name='name' onChange={onChangeHandle}  value={credential.name} required/>
          <label className="form-label" htmlFor="name">
            Name 
          </label>
        </div>
        <div className="form-outline mb-4">
          <input type="email" id="email" className="form-control" name='email' onChange={onChangeHandle}  value={credential.email} required/>
          <label className="form-label" htmlFor="email">
            Email address
          </label>
        </div>
        <div className="form-outline mb-4">
          <input type="password" id="password" className="form-control" name='password' onChange={onChangeHandle} value={credential.password} required minLength={5}/>
          <label className="form-label" htmlFor="password">
            Password
          </label>
        </div>
        <div className="form-outline mb-4">
          <input type="password" id="cpassword" className="form-control" name='cpassword' onChange={onChangeHandle} value={credential.cpassword} required minLength={5}/>
          <label className="form-label" htmlFor="cpassword">
            confirm Password
          </label>
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4">
          signup
        </button>
      </form>
    </div>
  )
}

export default Signup