import AddBlog from "./AddBlog";
import Blogs from "./Blogs";

const Home = (props) => {
  return (
    <div>
      <div className="container my-3">
        <AddBlog showAlert={props.showAlert}/>
        <Blogs showAlert={props.showAlert}/>
      </div>
    </div>
  );
};

export default Home;