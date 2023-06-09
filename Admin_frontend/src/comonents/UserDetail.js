import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StatusCodes } from "http-status-codes";


const UserDetail = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [userData, setUserData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

// update user 

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const resp = await axios.put(`http://localhost:5000/users/update/${id}`,{name,email});
      
      console.log("update ===>",resp)
      toast.success('User update successfully',{
        position: "top-center"
      })

    } catch (error) {
      toast.error('Error in updating user',{
        position: "top-center"
      })
    }
  };

// fetch user by Id

  const fetchUser = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/users/${id}`);
      console.log("user by id", resp);
      setUserData(resp.data);
    } catch (error) {
      console.log("errrrr", error);
    }
  };

  // delete user

  const deleteUser = async() =>{
    try {
      const resp = await axios.delete(`http://localhost:5000/users/delete/${id}`)
      console.log(resp)
      if(resp.status===StatusCodes.NO_CONTENT)
      {
        alert("User deleted")
        // toast.success("Post deleted successfully",{
        //   position:"top-center"
        // })
        history('/deshboard')
      }
    } catch (error) {
      console.log("deleing errr", error)
      toast.error("error in deleting User",{
        position:"top-center"
      })
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {/* HEADER */}
      <header id="main-header" className="py-2 bg-warning text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-users"></i> Users
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* ACTIONS */}
      <section id="actions" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <NavLink to="/deshboard" className="btn btn-light btn-block">
                <i className="fas fa-arrow-left"></i> Back To Dashboard
              </NavLink>
            </div>
            {/* <div className="col-md-3">
              <NavLink to="/deshboard" className="btn btn-success btn-block">
                <i className="fas fa-check"></i> Save Changes
              </NavLink>
            </div> */}
            <div className="col-md-3">
              <NavLink  className="btn btn-danger btn-block" onClick={deleteUser}>
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
                  <h4> User</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label for="title">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={userData.fname}
                        name = 'name'
                        onChange = {(e)=>{setName(e.target.value)}}
                      />
                    </div>
                    <div className="form-group">
                      <label for="title">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={userData.lname}
                        name = 'lname'
                        onChange = {(e)=>{setName(e.target.value)}}
                      />
                    </div>
                    <div className="form-group">
                      <label for="title">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={userData.phone}
                        name = 'phone'
                        onChange = {(e)=>{setName(e.target.value)}}
                      />
                    </div>
                    <div className="form-group">
                      <label for="category">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={userData.email}
                        name='email'
                        onChange={(e)=>{setEmail(e.target.value)}}
                      />
                    </div>
                    {/* <Button type="submit" className="btn btn-primary mt-2">
                      Save Changes
                    </Button> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer/>
    </>
  );
};

export default UserDetail;
