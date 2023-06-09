import React, { useState } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserModal = () => {
  const [userData, setUserData] = useState({
    fname: "",
    lname:"",
    email: "",
    phone:"",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value })
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const resp = await axios.post(`http://localhost:5000/sign-up`, userData);

      if (resp.status === StatusCodes.CREATED) {
        // alert("User added successfully");
        toast.success('User added successfully',{
          position: "top-center"
        })
        setUserData({ fname: "",lname:"", email: "", password: "", phone: "",  });
      }
    } catch (error) {
      console.log("user post error", error);
      // alert(error.message);
      toast.error(error.message,{
        position: "top-center"
      })
    }
  };

  return (
    <>
      <div class="modal fade" id="addUserModal">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header bg-warning text-white">
              <h5 class="modal-title">Add User</h5>
              <button class="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmit}>
                <div class="form-group">
                  <label for="name">First Name</label>
                  <input
                    type="text"
                    class="form-control"
                    value={userData.fname}
                    name="fname"
                    onChange={handleChange}
                  />
                </div>
                <div class="form-group">
                  <label for="name">Last Name</label>
                  <input
                    type="text"
                    class="form-control"
                    value={userData.lname}
                    name="lname"
                    onChange={handleChange}
                  />
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    value={userData.email}
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div class="form-group">
                  <label for="email">Phone</label>
                  <input
                    type="phone"
                    class="form-control"
                    value={userData.phone}
                    name="phone"
                    onChange={handleChange}
                  />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    value={userData.password}
                    name="password"
                    onChange={handleChange}
                  />
                </div>
               

                <div class="modal-footer">
                  <button class="btn btn-warning" type="submit">
                    Save Changes
                  </button>
                  {/* data-dismiss="modal" */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default UserModal;
