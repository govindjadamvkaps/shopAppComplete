import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StatusCodes } from 'http-status-codes'


const Login = () => {
  // const[email, setEmail] = useState("")
  // const[password, setPassword]= useState("")
  const location = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  // const [token, setToken]=useState(null)

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
        e.preventDefault();
        const resp = await axios.post("http://localhost:5000/login", loginData);
        // console.log(resp.data.token);
        // console.log(resp.data.admin._id)
        const tokenData = resp.data.token

        if(resp.status===StatusCodes.OK){
            localStorage.setItem("token", JSON.stringify(tokenData))
            localStorage.setItem("_id", resp.data.data._id)
            // alert("Login Successful");
           toast.success("Login successful",{
            position:"top-center"
        })
        setLoginData({ email: "", password: "" });
        location("/");
        }
    
        
    } catch (error) {
        console.log("error in Registration", error)
        toast.error("Error in login user",{
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
              <img
                src="https://images.unsplash.com/photo-1621256326941-98d9e045e2ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                height="300px"
                width="400px"
              />
            </div>
          </div>
          <div className="col-xl-6 ">
            <div className="container">
              <div
                className="alert alert-primary mt-5 text-center"
                role="alert"
              >
                Login !
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={loginData.email}
                  name="email"
                  onChange={handleChange}
                  aria-describedby="emailHelp"
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
                  value={loginData.password}
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Login;