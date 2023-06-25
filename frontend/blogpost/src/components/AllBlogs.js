import React, { useState,useEffect } from "react";
import BlogItems from "./BlogItems";
import { useNavigate } from 'react-router-dom';

function AllBlogs() {
    let navigate = useNavigate();
    const host = "http://localhost:5000";
    const blogListInitial = [];
    const [blogListstate, setblogListstate] = useState(blogListInitial);
    const fetchAllBlogs=async()=>{
        const response = await fetch(`${host}/api/blog/fetchallblogs`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token":
                localStorage.getItem('token'),
            },
          });
          const json = await response.json();
          setblogListstate(json)
    }

    useEffect(() => {
        if (localStorage.getItem('token')){
            fetchAllBlogs();
        }
        else{
          navigate('/login');
        }
        
      }, []);

  return (
    <div className="container my-5 ">
        <h2>All blogs</h2>
        <div className="card-deck">
          <div>
            {blogListstate.length===0 && 'No blogs to display'}
          </div>
          {blogListstate.map((blog) => {
            return (
              <BlogItems key={blog._id} blog={blog} editBlog={false}/>
            );
          })}
        </div>
      </div>
  )
}

export default AllBlogs