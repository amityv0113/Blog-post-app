import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import BlogState from "./context/blogs/blogState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import AllBlogs from "./components/AllBlogs";

function App() {

  const [alert, setalert] = useState(null)
  const showAlert =(message,type)=>{
    setalert({
      msg:message,
      type:type
  },setTimeout(()=>{
    setalert(null)
  },1500));
  }
  return (
    <>
      <BlogState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
              <Route exact path="/blogs" element={<AllBlogs/>} />
              
            </Routes>
          </div>
        </Router>
      </BlogState>
    </>
  );
}

export default App;
