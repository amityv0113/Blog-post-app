import React, { useContext, useState } from "react";
import blogContext from "../context/blogs/blogContext";

function AddBlog(props) {
  const { AddBlog } = useContext(blogContext);
  const [blog, setblog] = useState({
    title: "",
    discription: "",
    categories: "",
  });
  const onClickHandle = (e) => {
    e.preventDefault();
    AddBlog(blog);
    setblog({
      title: "",
      discription: "",
      categories: "",
    })
    props.showAlert("successfully added","success")
  };
  const onChangeHandle = (e) => {
    setblog({ ...blog, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h2>Add New Blog</h2>
      <form>
        <div className="mb-3 my-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="title"
            name="title"
            onChange={onChangeHandle}
            minLength={3}
            required
            value={blog.title}
          />
        </div>
        <div className="mb-3 my-3">
          <label htmlFor="categories" className="form-label">
            categories
          </label>
          <input
            type="text"
            className="form-control"
            id="categories"
            placeholder="categories"
            name="categories"
            onChange={onChangeHandle}
            value={blog.categories}
          />
        </div>
        <div className="mb-3 my-3">
          <label htmlFor="discription" className="form-label">
            discription
          </label>
          <textarea
            className="form-control"
            id="discription"
            placeholder="discription"
            rows="3"
            name="discription"
            onChange={onChangeHandle}
            minLength={5}
            required
            value={blog.discription}
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onClickHandle}
          disabled={blog.title.length<3 || blog.discription.length<5}
        >
          Add Blog
        </button>
      </form>
    </>
  );
}

export default AddBlog;
