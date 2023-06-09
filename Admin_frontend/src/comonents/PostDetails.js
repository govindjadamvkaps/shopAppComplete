import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { StatusCodes } from "http-status-codes";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const PostDetails = () => {
  const history = useNavigate();
  const [getCategory, setCategory] = useState([]);
  const { setValue, register } = useForm();

  const { id } = useParams();
  // console.log("post id", id)
  const [postData, setPostData] = useState([]);
  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setBlogData({ ...blogData, [name]: value });
  };
  const handleImage = (e) => {
    setBlogData({ ...blogData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    // alert('gg')
    try {
      e.preventDefault();
      console.log('blogData', blogData)

      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("category", blogData.category);
      formData.append("image", blogData.image, blogData.image.name);
      formData.append("description", blogData.description);

      console.log("hello");
      const res = await axios.put(
        `http://localhost:5000/posts/update/${id}`,
        formData
      );
      // console.log(formData)
      if (res.status === StatusCodes.OK) {
        // alert('post added successfully')
        toast.success("Post update Successfully", {
          position: "top-center",
        });
        // setPostData({ title: "", category: "", image: "", description: "" });
      }

      console.log(res);
    } catch (error) {
      console.log("post update error",error)
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  const fetchPostById = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/products/single/${id}`);
      console.log("RESppp=>", resp.data);
      // const { title } = resp.data.data;
      // setValue("title", title);
      
      setPostData(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryName();
    fetchPostById();
  }, []);
  const getCategoryName = async () => {
    try {
      const res = await axios.get("http://localhost:5000/categorys/name");
      console.log("res=>", res);

      // alert('post added successfully')
      setCategory(res.data);
    } catch (error) {}
  };

  const deleteData = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/products/delete/${id}`
      );
      console.log("RES=>", res);

      if (res.status === StatusCodes.NO_CONTENT) {
        alert("post deleted");
        // toast.success("Post deleted successfully",{
        //   position:"top-center"
        // })
        history("/deshboard");
      }
    } catch (error) {
      toast.error("Error in deleting ", {
        position: "top-center",
      });
    }
  };
  return (
    <>
      <header id="main-header" className="py-2 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>Post One</h1>
            </div>
          </div>
        </div>
      </header>

      <section id="actions" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <NavLink to="/deshboard" className="btn btn-light btn-block">
                <i className="fas fa-arrow-left"></i> Back To Dashboard
              </NavLink>
            </div>
            {/* <div className="col-md-3">
              <NavLink
                to="/deshboard"
                className="btn btn-success btn-block"
                type="submit"
              >
                <i className="fas fa-check"></i> Save Changes
              </NavLink>
            </div> */}
            <div className="col-md-3">
              <NavLink
                className="btn btn-danger btn-block"
                onClick={deleteData}
              >
                <i className="fas fa-trash"></i> Delete Post
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <section id="details">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4> Product</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label for="title">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        // {...register("title")}
                        defaultValue={postData.pName}
                        name="title"
                        // onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label for="title">Price</label>
                      <input
                        type="text"
                        className="form-control"
                        // {...register("title")}
                        defaultValue={postData.pPrice}
                        name="pPrice"
                        // onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label for="title">Categories</label>
                      <input
                        type="text"
                        className="form-control"
                        // {...register("title")}
                        defaultValue={postData.category}
                        name="pPrice"
                        // onChange={handleChange}
                      />
                    </div>
                    {/* <div className="form-group">
                      <label for="category">Category</label>
                      <select
                        className="form-control"
                        onChange={handleChange}
                        defaultValue={postData.category}
                        // {...register("CategoryId")}
                        name="category"
                      >
                        <option value=""> Select Category</option>
                        {getCategory.length &&
                          getCategory?.map((name) => (
                            <option key={name._id} defaultValue={name.title}>
                              {name.title}
                            </option>
                          ))}
                      </select>
                    </div> */}
                    <img
                      src={`http://localhost:5000/public/images/${postData.pImage}`}
                      style={{ width: "4rem" }}
                    />
                    <div className="form-group">
                      <label for="image">Image</label>
                      {/* <div className="custom-file">
                        <img src={postData.image}/>
                        <input
                          type="file"
                          className="custom-file-input"
                          id="pImage"
                          name="pImage"
                          onChange={handleImage}
                          {...register("image")}
                        />
                        <label for="image" className="custom-file-label">
                          Choose File
                        </label>
                      </div>
                      <small className="form-text text-muted">
                        Max Size 3mb
                      </small> */}
                    </div>
                    <div className="form-group">
                      <label for="body">Description</label>
                      <textarea
                        defaultValue={postData.pDescription}
                        name="description"
                        // onChange={handleChange}
                        className="form-control"
                        // {...register("description")}
                      ></textarea>
                    </div>
                    {/* <Button className="btn btn-primary" type="submit">Post</Button> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default PostDetails;
