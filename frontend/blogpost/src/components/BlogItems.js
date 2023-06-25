import React, { useContext } from "react";
import blogContext from "../context/blogs/blogContext";

const BlogItems = (props) => {
  const { DeleteBlog } = useContext(blogContext);

  return (
    <div className="card shadow p-3 mb-3 bg-white rounded my-3">
      <div className="card-body">
        <h5 className="card-title">{props.blog.title}</h5>
        <p className="card-text">{props.blog.discription}</p>
        <p>
          <small className="text-body-secondary">{props.blog.categories}</small>
        </p>
        {props.editBlog &&
        <div className="d-flex flex-row-reverse">
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={()=>{props.handleShow(props.blog)}}>
            Edit
          </button>

          <button
            type="button"
            className="btn btn-outline-danger btn-sm mx-2"
            onClick={() => {
              DeleteBlog(props.blog._id);
              props.showAlert("successfully deleted",'success');
            }}
          >
            Delete
          </button>
        </div>
}
      </div>
    </div>
  );
};

export default BlogItems;
