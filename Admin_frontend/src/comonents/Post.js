import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const history = useNavigate();
  const [post, setPost] = useState([]);
  const [query,setQuery] = useState("")

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = post.slice(firstIndex, lastIndex);
  const npage = Math.ceil(post.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const fetchPost = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/products`);
      console.log(resp.data.data);
      setPost(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // const myfun = (ids)=>{
  //   alert("id is", ids)
  //   console.log("id" , ids)
  // }

  useEffect(() => {
    fetchPost();
  }, []);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePage = (id) => {
    setCurrentPage(id)
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <header id="main-header" className="py-2 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-pencil-alt"></i> Posts
              </h1>
            </div>
          </div>
        </div>
      </header>

      <section id="search" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6 ml-auto">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Posts..."
                  onChange={(e)=>setQuery(e.target.value)}
                />
                <div className="input-group-append">
                  <button className="btn btn-primary">Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="posts">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4>Latest Posts</h4>
                </div>
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.filter((val)=>val.pName.toLowerCase().includes(query) ||
                    val.category.toLowerCase().includes(query)
                ).map((item, index) => {
                      const createdAtDate = new Date(item.createdAt);

                      // Formate createdAtDate to 'MM DD YYYY'
                      const formattedDate = createdAtDate.toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      );

                      return (
                        <>
                          <tr>
                            <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
                            <td>
                              <img src={`http://localhost:5000/public/images/${item.pImage}`} style={{width:"4rem"}}/>
                            </td>
                            <td>{item.pName}</td>
                            <td>{item.category}</td>
                            <td>{formattedDate}</td>
                            <td>
                              <NavLink
                                to={`/post-details/${item._id}`}
                                onClick={() => {
                                  // history(`/details/${item._id}`);
                                }}
                                className="btn btn-secondary"
                              >
                                <i className="fas fa-angle-double-right"></i>{" "}
                                Details
                              </NavLink>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>

                <nav className="ml-4">
                  <ul className="pagination">
                    <li className="page-item ">
                      <NavLink to="#" className="page-link" onClick={prePage}>
                        Previous
                      </NavLink>
                    </li>
                    {numbers.map((item, i) => {
                      return (
                        <>
                          <li
                            className={`page-item ${
                              currentPage === item ? "active" : ""
                            }`}
                          >
                            <NavLink
                              to="#"
                              className="page-link"
                              onClick={() => changePage(item)}
                            >
                              {item}
                            </NavLink>
                          </li>
                        </>
                      );
                    })}

                   
                    <li className="page-item">
                      <NavLink to="#" className="page-link" onClick={nextPage}>
                        Next
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Post;
