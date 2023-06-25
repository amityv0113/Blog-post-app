import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Login( props) {
  const [credential, setcredential] = useState({
    email: "",
    password: ""
  });

  let navigate = useNavigate();
  
  const handleLogin=async (credential)=>{
    
    const host ="http://localhost:5000"

    const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential)
  
      });
      const json = await response.json();
      console.log(json)
      if (json.success){
        //save the auth token and redirrect to home page
        localStorage.setItem('token',json.authtoken)
        navigate('/');
        props.showAlert("Logged in successfully","success")
      }
      else
      {
        props.showAlert("Invalid credentials","danger")
        //alert("Invalid credentials")
      }
  }
  const onClickHandle = (e) => {
    e.preventDefault();
    handleLogin(credential);
    setcredential({
        email: "",
        password: ""
    });
  };
  const onChangeHandle = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <div className="container my-3">
        <h2>Login</h2>
      </div>
      <form>
        <div className="form-outline mb-4">
          <input
            type="email"
            id="email"
            className="form-control"
            name="email"
            value={credential.email}
            onChange={onChangeHandle}
          />
          <label className="form-label" htmlFor="email">
            Email address
          </label>
        </div>
        <div className="form-outline mb-4">
          <input
            type="password"
            id="password"
            className="form-control"
            name="password"
            value={credential.password}
            onChange={onChangeHandle}
          />
          <label className="form-label" htmlFor="password">
            Password
          </label>
        </div>
        <button type="button" className="btn btn-primary btn-block mb-4" onClick={onClickHandle}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
