import React,{useState} from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const history = useNavigate()
  const [tokenn, setTokenn] = useState(null);

  const storedToken = localStorage.getItem("token");
  if (storedToken && !tokenn) {
    // set the token from local storage
    setTokenn(storedToken);
  }

  const handleClick = ()=>{
    const token =   localStorage.removeItem("token")
  // localStorage.removeItem('_id')
    setTokenn(token)
    history("/")


    // history("/login")

  
  }
  return (
    <>
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark p-0">
        <div class="container">
          <NavLink to="#" className="navbar-brand">
            Blogen
          </NavLink>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            {tokenn? 
            <ul className="navbar-nav">
              <li className="nav-item px-2">
                <NavLink to="/deshboard" className="nav-link active">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink to="/posts" className="nav-link">
                  Posts
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink to="/categories" className="nav-link">
                  Categories
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink to="/users" className="nav-link">
                  Users
                </NavLink>
              </li>
              <li className="nav-item dropdown mr-3">
                <NavLink
                  to="#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <i className="fas fa-user"></i> Welcome Brad
                </NavLink>
                <div className="dropdown-menu">
                  <NavLink to="/profile" className="dropdown-item">
                    <i className="fas fa-user-circle"></i> Profile
                  </NavLink>
                  <NavLink to="/settings" className="dropdown-item">
                    <i className="fas fa-cog"></i> Settings
                  </NavLink>
                </div>
              </li>
              <li className="nav-item">
                <NavLink to="/" className="nav-link" onClick={handleClick}>
                  <i className="fas fa-user-times"></i> Logout
                </NavLink>
              </li>
            </ul>
            :

             <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  <i className="fas fa-user-times"></i> Login
                </NavLink>
              </li>
            </ul> 
            
             
}
            
            
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
