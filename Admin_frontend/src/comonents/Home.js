import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CategoryModal from "./CategoryModal";
import PostModal from "./PostModal";
import UserModal from "./UserModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const history = useNavigate()
  const [post, setPost] = useState([]);
  const [categoryData, setCategoryData] = useState([])
  const [userData,setUserData] = useState([])
  const fetchPost = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/products`);
      // console.log(resp.data.data);
      setPost(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // const myfun = (ids)=>{
  //   alert("id is", ids)
  //   console.log("id" , ids)
  // }
  const fetchCategory = async() =>{
    try {
      const resp = await axios.get(`http://localhost:5000/categorys`)
      // console.log("cattttttttt", resp.data)
      setCategoryData(resp.data)
    } catch (error) {
      console.log("Category error",error)
    }
  }

  const fetchUser = async() =>{
    try {
      const resp = await axios.get(`http://localhost:5000/users`)
      // console.log("userrrrrrrrr", resp.data)
      setUserData(resp.data)
    } catch (error) {
      console.log("Category error",error)
    }
  }
  useEffect(() => {
    fetchPost();
    fetchCategory()
    fetchUser()
  }, []);

  
  return (
    <div>
      {/* HEADER */}

      <header id="main-header" className="py-2 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-cog"></i> Dashboard
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/*ACTIONS */}
      <section id="actions" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <NavLink
                to="#"
                className="btn btn-primary btn-block"
                data-toggle="modal"
                data-target="#addPostModal"
              >
                <i className="fas fa-plus"></i> Add Post
              </NavLink>
            </div>
            <div className="col-md-3">
              <NavLink
                to="#"
                className="btn btn-success btn-block"
                data-toggle="modal"
                data-target="#addCategoryModal"
              >
                <i className="fas fa-plus"></i> Add Category
              </NavLink>
            </div>
            <div className="col-md-3">
              <NavLink
                to="#"
                className="btn btn-warning btn-block"
                data-toggle="modal"
                data-target="#addUserModal"
              >
                <i className="fas fa-plus"></i> Add User
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/*POSTS */}
      <section id="posts">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="card">
                <div className="card-header">
                  <h4>Latest Posts</h4>
                </div>
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Image</th>

                      
                      <th>Name</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th></th>
                      {/* /public/images/ */}
                    </tr>
                  </thead>
                  <tbody>
                    {post.slice(0,5).map((item, index) => {
                      const createdAtDate = new Date(item.createdAt)

                       // Formate createdAtDate to 'MM DD YYYY'
                       const formattedDate = createdAtDate.toLocaleDateString("en-US",{
                        month:"short",
                        day:"numeric",
                        year:"numeric"
                       })

                      return (
                        <>
                          <tr>
                            <td>{index+1}</td>
                            <td>
                              <img src={`http://localhost:5000/public/images/${item.pImage}`} style={{width:"4rem"}}/>
                            </td>
                            <td>{item.pName}</td>
                            <td>{item.pPrice}</td>
                            <td>{item.category}</td>
                            <td>{formattedDate}</td>
                         

                            {/* <td>
                              <NavLink
                                to={`/post-details/${item._id}`}
                                // onClick={()=>{history(`/details/${item._id}`)}}
                                className="btn btn-secondary"
                              >
                                <i className="fas fa-angle-double-right"></i>{" "}
                                Details
                              </NavLink>
                            </td> */}
                          </tr>
                        </>
                      );
                    })}
                    
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center bg-primary text-white mb-3">
                <div className="card-body">
                  <h3>Posts</h3>
                  <h4 className="display-4">
                    <i className="fas fa-pencil-alt"></i> {post.length}
                  </h4>
                  <NavLink to="/posts" className="btn btn-outline-light btn-sm">
                    View
                  </NavLink>
                </div>
              </div>

              <div className="card text-center bg-success text-white mb-3">
                <div className="card-body">
                  <h3>Categories</h3>
                  <h4 className="display-4">
                    <i className="fas fa-folder"></i> {categoryData.length}
                  </h4>
                  <NavLink
                    to="/categories"
                    className="btn btn-outline-light btn-sm"
                  >
                    View
                  </NavLink>
                </div>
              </div>

              <div className="card text-center bg-warning text-white mb-3">
                <div className="card-body">
                  <h3>Users</h3>
                  <h4 className="display-4">
                    <i className="fas fa-users"></i> {userData.length}
                  </h4>
                  <NavLink to="/users" className="btn btn-outline-light btn-sm">
                    View
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODALS */}

      <PostModal />

      <CategoryModal />

      <UserModal />
      <ToastContainer/>
    </div>
  );
};

export default Home;
