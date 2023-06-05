import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StatusCodes } from 'http-status-codes'
const Registration = () => {
  const location = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
        
    
    e.preventDefault();

    const resp = await axios.post(
      "http://localhost:5000/sign-up",
      formData
      );
      console.log(resp.data.data);
    if(resp.status===StatusCodes.CREATED){
        // alert("registration successful")
        toast.success("Registration successful",{
            position:"top-center"
        })
        // alert("Registration successfully");
        setFormData({
          fname: "",
          lname: "",
          email: "",
          phone: "",
          password: "",
        });
        location("/login");
    }
} catch (error) {
    console.log("error in Registration", error)
    toast.error("Error in registration",{
        position:"top-center"
    })
}
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="container mt-5 text-center">
            <img src="https://images.unsplash.com/photo-1627061801305-c0c5b688b420?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" height="300px" width="400px" />
            </div>
          </div>
          <div className="col-xl-6 ">
            <div className="container">
              <div
                className="alert alert-primary mt-5 text-center"
                role="alert"
              >
                Registration !
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Enter Your First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={formData.fname}
                  name="fname"
                  onChange={handleChange}
                  aria-describedby="emailHelp"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Enter Your Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={formData.lname}
                  name="lname"
                  onChange={handleChange}
                  aria-describedby="emailHelp"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                  aria-describedby="emailHelp"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Phone
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={formData.phone}
                  name="phone"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={formData.password}
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  required
                />
                <label className="form-check-label" for="exampleCheck1">
                  Check me out
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default Registration;