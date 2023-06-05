import React from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import axios from "axios";
import { StatusCodes } from "http-status-codes";

const Contact = () => {

const { handleSubmit, register ,formState:{errors}, reset  }  =useForm()

const postData = async(data)=>{
  // console.log("form data",data)
  try {
    const  resp = await axios.post(`http://localhost:5000/post-message`,data)
    console.log(resp.data.data)

    if(resp.status===StatusCodes.CREATED)
    {
      toast.success("message send",{
        position:"top-center"
      })
      reset()
    }
  } catch (error) {
    toast.error("error in send message ",{
      position:"top-center"
    })
  }
}

  return (
    <>
      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0">
            <NavLink to="/">Home</NavLink> <span className="mx-2 mb-0">/</span>{" "}
              <strong className="text-black">Contact</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="h3 mb-3 text-black">Get In Touch</h2>
            </div>
            <div className="col-md-7">
              <form onSubmit={handleSubmit(postData)}>
                <div className="p-3 p-lg-5 border">
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="c_fname" className="text-black">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                       {...register('fname',{required:true})}
                      />
                      {errors.fname && <p style={{color:"red"}}>First name is required</p>}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="c_lname" className="text-black">
                        Last Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        {...register('lname',{required:true})}
                      />
                      {errors.lname && <p style={{color:"red"}}>Last name is required</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="c_email" className="text-black">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        {...register('email',{required:true})}
                      />
                      {errors.email && <p style={{color:"red"}}>email is required</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="c_subject" className="text-black">
                        Subject{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                       {...register('subject',{required:true})}
                      />
                      {errors.subject && <p style={{color:"red"}}>subject is required</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="c_message" className="text-black">
                        Message{" "}
                      </label>
                      <textarea
                       {...register('message',{required:true})}
                        cols={30}
                        rows={7}
                        className="form-control"
                        defaultValue={""}
                      />
                      {errors.message && <p style={{color:"red"}}>message is required</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-12">
                      <input
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                        defaultValue="Send Message"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-5 ml-auto">
              <div className="p-4 border mb-3">
                <span className="d-block text-primary h6 text-uppercase">
                  New York
                </span>
                <p className="mb-0">
                  203 Fake St. Mountain View, San Francisco, California, USA
                </p>
              </div>
              <div className="p-4 border mb-3">
                <span className="d-block text-primary h6 text-uppercase">
                  London
                </span>
                <p className="mb-0">
                  203 Fake St. Mountain View, San Francisco, California, USA
                </p>
              </div>
              <div className="p-4 border mb-3">
                <span className="d-block text-primary h6 text-uppercase">
                  Canada
                </span>
                <p className="mb-0">
                  203 Fake St. Mountain View, San Francisco, California, USA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default Contact;
