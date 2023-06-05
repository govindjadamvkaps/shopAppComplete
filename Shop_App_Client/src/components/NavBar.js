import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const NavBar = () => {
  // const [show ,setShow] =useState(false)

  const history = useNavigate()
  
  const [tokenn, setTokenn] = useState(null);

  const storedToken = localStorage.getItem("token");
  if (storedToken && !tokenn) {
    // set the token from local storage
    setTokenn(storedToken);
  }

  const handleClick = () => {
    const token = localStorage.removeItem("token")
    history("/login")
    localStorage.removeItem('_id')
    setTokenn(token)


    // history("/login")

  }
  return (
    <>
      <nav className="site-navigation text-right text-md-center" role="navigation">
        <div className="container">
          
          {tokenn ?(
            <ul className="site-menu js-clone-nav d-none d-md-block">
              <li className="has-children active">
                <NavLink to="/">Home</NavLink>
                <ul className="dropdown">
                  <li>
                    <NavLink to="#">Menu One</NavLink>
                  </li>
                  <li>
                    <NavLink to="#">Menu Two</NavLink>
                  </li>
                  <li>
                    <NavLink to="#">Menu Three</NavLink>
                  </li>
                  <li className="has-children">
                    <NavLink to="#">Sub Menu</NavLink>
                    <ul className="dropdown">
                      <li>
                        <NavLink to="#">Menu One</NavLink>
                      </li>
                      <li>
                        <NavLink to="#">Menu Two</NavLink>
                      </li>
                      <li>
                        <NavLink to="#">Menu Three</NavLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="has-children">
                <NavLink to="/about">About</NavLink>
                <ul className="dropdown">
                  <li>
                    <NavLink to="#">Menu One</NavLink>
                  </li>
                  <li>
                    <NavLink to="#">Menu Two</NavLink>
                  </li>
                  <li>
                    <NavLink to="#">Menu Three</NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink to="/shop">Shop</NavLink>
              </li>
              <li>
                <NavLink to="#">Catalogue</NavLink>
              </li>
              <li>
                <NavLink to="#">New Arrivals</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to='/login' onClick={handleClick}>Logout</NavLink>
              </li>
            </ul>
           ) :(
            <ul className="site-menu js-clone-nav d-none d-md-block">
              <li className="has-children active">
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/sign-up">Sign-Up</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </ul>
           )
          }
        </div>
      </nav>
    </>
  )
}

export default NavBar