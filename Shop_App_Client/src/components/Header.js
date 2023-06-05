import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";

const Header = () => {

  // const [tokenn, setTokenn] = useState(null);

  // const storedToken = localStorage.getItem("token");
  // if (storedToken && !tokenn) {
  //   // set the token from local storage
  //   setTokenn(storedToken);
  // }
  
  const [cartData, setCartData]=useState([])
  const user_id = localStorage.getItem("_id")

  const fetchCart = async()=>{
    try {
      const resp  = await axios.get(`http://localhost:5000/get-cart/${user_id}`)
      // console.log("header response",resp.data.data)
      setCartData(resp.data.data.productId)

    } catch (error) {
      console.log("errror in fetching cart by user id", error)
    }
  }

  useEffect(()=>{
    fetchCart()
  },[cartData])


    const totalCart = ()=>{
      if (cartData.length === 0) {
        return 0;
      }
  
      return cartData.reduce((num1, num2) => {
            
        // const total = num1+num2.totalPrice
        // console.log("total",total)
        return num1 + num2.qty;
      },0);
      
    }
    // console.log("fjlfakfd",totalCart())

  return (
    <>
      <header className="site-navbar" role="banner">
        <div className="site-navbar-top">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-6 col-md-4 order-2 order-md-1 site-search-icon text-left">
                <form action="" className="site-block-top-search">
                  <span className="icon icon-search2" />
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Search"
                  />
                </form>
              </div>
              <div className="col-12 mb-3 mb-md-0 col-md-4 order-1 order-md-2 text-center">
                <div className="site-logo">
                  <NavLink to="/" className="js-logo-clone">
                    Shoppers
                  </NavLink>
                </div>
              </div>
              <div className="col-6 col-md-4 order-3 order-md-3 text-right">
                <div className="site-top-icons">
                {
                  // localStorage.getItem("token")?
                  ! localStorage.getItem("token")? null:
                (  <ul>
                    <li>
                      <NavLink to="#">
                        <span className="icon icon-person" />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="#">
                        <span className="icon icon-heart-o" />
                      </NavLink>
                    </li>
                    <li>
                    
                      <NavLink to="/cart" className="site-cart">
                        <span className="icon icon-shopping_cart" />
                        <span className="count">{totalCart()}</span>
                      </NavLink>
                      
                    </li>
                    <li className="d-inline-block d-md-none ml-md-0">
                      <NavLink to="#" className="site-menu-toggle js-menu-toggle">
                        <span className="icon-menu" />
                      </NavLink>
                    </li>
                  </ul>
                  )
                  
                }
                </div>
              </div>
            </div>
          </div>
        </div>

        <NavBar />
      </header>
    </>
  );
};

export default Header;
