
import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { Link ,useLocation} from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();
  let location = useLocation()
  useEffect(() => {
    console.log(location.pathname)
  }, [location]);

  const handleClick=()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/blogs">
          BlogApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==='/'?'dark':''}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className={`nav-link ${location.pathname==='/about'?'dark':''}`} to="/about">
                About
              </Link>
            </li> */}
          </ul>
          {
            !localStorage.getItem('token')?
          <form className="d-flex" role="search">
          <Link className="btn btn-primary btn-sm mx-1" to="/login" role="button">Login</Link>
          <Link className="btn btn-primary btn-sm mx-1" to="/signup" role="button">Signup</Link>
          </form>:<button className="btn btn-primary btn-sm mx-1" onClick={handleClick}>Logout</button>
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
