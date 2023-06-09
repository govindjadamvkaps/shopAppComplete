import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const history = useNavigate();
  const [data, setData] = useState([]);
  const [query,setQuery] = useState("")

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  // console.log("hello ", query)

  const fetchCategory = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/categorys`);
      setData(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
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

      <section id="search" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6 ml-auto">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Categories..."
                  onChange={(e)=>setQuery(e.target.value)}

                />
                <div className="input-group-append">
                  <button className="btn btn-success">Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="categories">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4>Latest Categories</h4>
                </div>
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.filter((val)=>val.category.toLowerCase().includes(query)).map((item, index) => {
                       const createdAtDate = new Date(item.createdAt)

                       // Formate createdAtDate to 'MM DD YYYY'
                       const formattedDate = createdAtDate.toLocaleDateString("en-US",{
                        month:"short",
                        day:"numeric",
                        year:"numeric"
                       })
                      return (
                        <>
                          <tr key={index}>
                            <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
                            <td>{item.category}</td>
                            <td>{formattedDate}</td>
                            <td>
                              <NavLink
                                to={`/category-details/${item._id}`}
                                // onClick= {()=>{history(`/details/${item._id}`)}}
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

export default Categories;
