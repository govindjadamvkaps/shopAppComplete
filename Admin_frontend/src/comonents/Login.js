import axios from "axios";
import { StatusCodes } from "http-status-codes";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const history = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const resp = await axios.post(`http://localhost:5000/admins/login`, loginData);
      // console.log(resp.data.token)
      if (resp.status === StatusCodes.OK) {
        toast.success("Admin login successful", {
          position: "top-center",
        });
        localStorage.setItem("token", resp.data.token)
        history("/deshboard");
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <>
      {/* HEADER */}
      <header id="main-header" className="py-2 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-user" /> Blogen Admin
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* ACTIONS */}
      <section id="actions" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row"></div>
        </div>
      </section>

      {/* LOGIN */}
      <section id="login">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <div className="card">
                <div className="card-header">
                  <h4>Account Login</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit} action="/">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        value={loginData.email}
                        name="email"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={loginData.password}
                        name="password"
                        onChange={handleChange}
                      />
                    </div>
                    <input
                      type="submit"
                      defaultValue="Login"
                      className="btn btn-primary btn-block"
                    />
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

export default Login;
