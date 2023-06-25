import BlogContext from "./blogContext";
import { useState } from "react";

const host = "http://localhost:5000";

const BlogState = (props) => {
  const blogListInitial = [];
  const [blogListstate, setblogListstate] = useState(blogListInitial);

  // GetAll blogs
  const GetAllBlogsForUser = async () => {
    //API call
    const response = await fetch(`${host}/api/blog/fetchallblogsforuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setblogListstate(json)
  };

  // Add blogs
  const AddBlog = async (blog) => {
    //api call
    const response = await fetch(`${host}/api/blog/createblog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify(blog)

    });
    const json = await response.json();
    console.log(json)

    setblogListstate(blogListstate.concat(blog));
  };

  // Delete blog
  const DeleteBlog = async (id) => {
    // api call
    const response = await fetch(`${host}/api/blog/deleteblog/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      // body: JSON.stringify(data),
    });
    const json = await response.json();

    console.log("deleting blog for id" + id);
    const newBlogListstate = blogListstate.filter((blog) => {
      return blog._id !== id;
    });
    setblogListstate(newBlogListstate);
  };

  // Edit blog
  const EditBlog = async (id, title, discription, categories) => {
    // api call toDo
    const response = await fetch(`${host}/api/blog/updateblog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({title:title,discription:discription,categories:categories}),
    });
    const json = await response.json();
    
    let newBlogListstate=JSON.parse(JSON.stringify(blogListstate));
    for (let i = 0; i < blogListstate.length; i++) {
      if (newBlogListstate[i]._id === id) {
        newBlogListstate[i].title = title;
        newBlogListstate[i].discription = discription;
        newBlogListstate[i].categories = categories;
        break
      }
    }
    
    setblogListstate(newBlogListstate)
  };

  return (
    <BlogContext.Provider
      value={{
        blogListstate,
        AddBlog,
        DeleteBlog,
        EditBlog,
        GetAllBlogsForUser,
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogState;
