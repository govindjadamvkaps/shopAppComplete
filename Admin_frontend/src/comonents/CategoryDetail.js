import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const CategoryDetail = () => {
  const history = useNavigate()
  const { id } = useParams()
  const [getCategory, setCategory] = useState([]);
  // console.log("Categoty id",id)
  const [title, setTitle] = useState([])




  const deleteData = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/categorys/delete/${id}`)
      console.log('RES=>', res);

      if (res.status === StatusCodes.NO_CONTENT) {
        // alert("post deleted")
        toast.success("Post deleted successfully", {
          position: "top-center"
        })
        history('/deshboard')
      }

    } catch (error) {
      toast.error("error in deleted ", {
        position: "top-center"
      })
    }
  }
  const getCategoryName = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/categorys/${id}`);
      console.log("res=>", res);

      // alert('post added successfully')
      setCategory(res.data);
    } catch (error) { }
  };


  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const resp = await axios.put(`http://localhost:5000/categorys/update/${id}`, { title })
      console.log("category update resp==>", resp)

      if (resp.status === StatusCodes.OK) {
        toast.success("category update successfully", {
          position: "top-center"
        })
      }
    } catch (error) {
      toast.error("error in updating category", {
        position: "top-center"
      })
    }
  }

  useEffect(() => {
    getCategoryName();
  }, []);
  return (
    <>
      {/* HEADER */}
      <header id="main-header" className="py-2 bg-success text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-folder"></i> Categories
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
              <NavLink className="btn btn-danger btn-block" onClick={deleteData}>
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
                  <h4>Category</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>

                    {/* <div className="form-group">
                      <label for="category">Category</label>
                      <select
                        className="form-control"
                        onChange={(e) => { setTitle(e.target.value) }}
                        {...register("CategoryId")}
                        name="title"
                      >
                        <option value=""> Select Category</option>
                        {getCategory.length &&
                          getCategory?.map((name) => (
                            <option key={name._id} defaultValue={name.category} >
                              {name.category}
                            </option>
                          ))}
                      </select>
                    </div> */}

                    <div className="form-group">
                      <label for="title">Category</label>
                      <input
                        type="text"
                        className="form-control"
                        // defaultValue={getCategory.category}
                        value={getCategory.category}
                        name='category'
                        // onChange={(e) => {setCategory(e.target.value) }}
                      />
                    </div>

                    {/* <Button className="btn btn-primary" type="submit">Save Changes</Button> */}
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

export default CategoryDetail;
