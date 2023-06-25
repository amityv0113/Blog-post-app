import React, { useContext, useEffect } from "react";
import blogContext from "../context/blogs/blogContext";
import BlogItems from "./BlogItems";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Blogs = (props) => {
  let navigate = useNavigate();
  const { blogListstate, GetAllBlogsForUser,EditBlog } = useContext(blogContext);
  useEffect(() => {
    if (localStorage.getItem('token')){
      GetAllBlogsForUser();
    }
    else{
      navigate('/login');
    }
    
  }, []);

  const [showModal, setShow] = useState(false);

  const [eblog, seteblog] = useState({
    id:"",
    etitle: "",
    ediscription: "",
    ecategories: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = (blog) => {
    setShow(true);
    seteblog({
      eid:blog._id,
      etitle: blog.title,
      ediscription: blog.discription, 
      ecategories: blog.categories,
    });
  };

  const onClickHandle = (e) => {
    handleClose()
    e.preventDefault();
    EditBlog(eblog.eid,eblog.etitle,eblog.ediscription,eblog.ecategories);
    props.showAlert("successfully edited",'success')
  };
  const onChangeHandle = (e) => {
    seteblog({ ...eblog, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3 my-3">
              <label htmlFor="etitle" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="etitle"
                name="etitle"
                onChange={onChangeHandle}
                value={eblog.etitle}
                minLength={3}
                required
              />
            </div>
            <div className="mb-3 my-3">
              <label htmlFor="ecategories" className="form-label">
                categories
              </label>
              <input
                type="text"
                className="form-control"
                id="ecategories"
                name="ecategories"
                onChange={onChangeHandle}
                value={eblog.ecategories}
              />
            </div>
            <div className="mb-3 my-3">
              <label htmlFor="ediscription" className="form-label">
                discription
              </label>
              <textarea
                className="form-control"
                id="ediscription"
                rows="3"
                name="ediscription"
                onChange={onChangeHandle}
                value={eblog.ediscription}
                minLength={5}
                required
              ></textarea>
            </div>
            {/* <button
              type="button"
              className="btn btn-primary"
              onClick={onClickHandle}
            >
              Add Blog
            </button> */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClickHandle} disabled={eblog.etitle.length<3 || eblog.ediscription.length<5}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container my-5 ">
        <h2>Your blogs</h2>
        <div className="card-deck">
          <div>
            {blogListstate.length===0 && 'No blogs to display'}
          </div>
          {blogListstate.map((blog) => {
            return (
              <BlogItems key={blog._id} handleShow={handleShow} blog={blog} showAlert={props.showAlert} editBlog={true}/>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Blogs;
