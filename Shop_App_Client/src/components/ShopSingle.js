import axios from 'axios'
import { StatusCodes } from 'http-status-codes'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { toast ,ToastContainer} from 'react-toastify'


const ShopSingle = () => {
  const {id} = useParams()
  const userId = localStorage.getItem("_id")
  const history= useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [singleData, setSingleData] = useState([])

  const fetchSingleProduct = async()=>{
    try {
      const resp = await axios.get(`http://localhost:5000/products/single/${id}`)
      // console.log("single Product", resp.data)
      setSingleData(resp.data)
      
    } catch (error) {
      console.log("error in finding single product" ,error)
    }
    
    
  }

  useEffect(()=>{
    fetchSingleProduct()
  },[])

  const handleClick = async() =>{
    try {
      const value = singleData.pPrice *quantity
      console.log(value)
      console.log(quantity)
      const resp = await axios.post(`http://localhost:5000/insert-cart`,{
        productId: id,
        userId :userId,
        totalPrice:value,
        quantity:quantity
      })
      console.log(resp)

      if(resp.status===StatusCodes.CREATED)
      {
        toast.success("product is added",{
          position:"top-center"
        })
        history("/cart")
      }
    } catch (error) {
      console.log("error in send cart data ", error)
      toast.error("error")
    }
  }
  const decrementValue =async() =>{
    try {
      if(quantity==1)
      {
        setQuantity(1)
      }
      else{
        setQuantity(quantity-1)
      }
    } catch (error) {
      setQuantity(quantity-1)
    }
  }


  return (
    <>
        
  <div className="bg-light py-3">
    <div className="container">
      <div className="row">
        <div className="col-md-12 mb-0">
          <NavLink to="/">Home</NavLink> <span className="mx-2 mb-0">/</span>{" "}
          <strong className="text-black">{singleData.pName}</strong>
        </div>
      </div>
    </div>
  </div>

  <div className="site-section">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={`http://localhost:5000/public/images/${singleData.pImage}`} alt="Image" className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2 className="text-black">{singleData.pName}</h2>
          <p>
          {singleData.pDescription}
          </p>
          
          <p>
            <strong className="text-primary h4">&#8377; {singleData.pPrice}</strong>
          </p>
          <div className="mb-1 d-flex">
            <label htmlFor="option-sm" className="d-flex mr-3 mb-3">
              <span
                className="d-inline-block mr-2"
                style={{ top: "-2px", position: "relative" }}
              >
                <input type="radio" id="option-sm" name="shop-sizes" />
              </span>{" "}
              <span className="d-inline-block text-black">Small</span>
            </label>
            <label htmlFor="option-md" className="d-flex mr-3 mb-3">
              <span
                className="d-inline-block mr-2"
                style={{ top: "-2px", position: "relative" }}
              >
                <input type="radio" id="option-md" name="shop-sizes" />
              </span>{" "}
              <span className="d-inline-block text-black">Medium</span>
            </label>
            <label htmlFor="option-lg" className="d-flex mr-3 mb-3">
              <span
                className="d-inline-block mr-2"
                style={{ top: "-2px", position: "relative" }}
              >
                <input type="radio" id="option-lg" name="shop-sizes" />
              </span>{" "}
              <span className="d-inline-block text-black">Large</span>
            </label>
            <label htmlFor="option-xl" className="d-flex mr-3 mb-3">
              <span
                className="d-inline-block mr-2"
                style={{ top: "-2px", position: "relative" }}
              >
                <input type="radio" id="option-xl" name="shop-sizes" />
              </span>{" "}
              <span className="d-inline-block text-black"> Extra Large</span>
            </label>
          </div>
          <div className="mb-5">
            <div className="input-group mb-3" style={{ maxWidth: 120 }}>
              <div className="input-group-prepend">
                <button
                  className="btn btn-outline-primary js-btn-minus"
                  type="button"
                  onClick={decrementValue}
                >
                  −
                </button>
              </div>
              <input
                type="text"
                className="form-control text-center"
                value={quantity}
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-primary js-btn-plus"
                  type="button"
                  onClick={()=>setQuantity(quantity+1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>  
          {/* to={`/cart/${singleData._id}`} */}
          <p>
            <NavLink  className="buy-now btn btn-sm btn-primary" onClick={handleClick}>
              Add To Cart
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  </div>

  <div className="site-section block-3 site-blocks-2 bg-light">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 site-section-heading text-center pt-4">
          <h2>Featured Products</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="nonloop-block-3 owl-carousel">
            <div className="item">
              <div className="block-4 text-center">
                <figure className="block-4-image">
                  <img
                    src="images/cloth_1.jpg"
                    alt="Image placeholder"
                    className="img-fluid"
                  />
                </figure>
                <div className="block-4-text p-4">
                  <h3>
                    <a href="#">Tank Top</a>
                  </h3>
                  <p className="mb-0">Finding perfect t-shirt</p>
                  <p className="text-primary font-weight-bold">$50</p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="block-4 text-center">
                <figure className="block-4-image">
                  <img
                    src="images/shoe_1.jpg"
                    alt="Image placeholder"
                    className="img-fluid"
                  />
                </figure>
                <div className="block-4-text p-4">
                  <h3>
                    <a href="#">Corater</a>
                  </h3>
                  <p className="mb-0">Finding perfect products</p>
                  <p className="text-primary font-weight-bold">$50</p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="block-4 text-center">
                <figure className="block-4-image">
                  <img
                    src="images/cloth_2.jpg"
                    alt="Image placeholder"
                    className="img-fluid"
                  />
                </figure>
                <div className="block-4-text p-4">
                  <h3>
                    <a href="#">Polo Shirt</a>
                  </h3>
                  <p className="mb-0">Finding perfect products</p>
                  <p className="text-primary font-weight-bold">$50</p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="block-4 text-center">
                <figure className="block-4-image">
                  <img
                    src="images/cloth_3.jpg"
                    alt="Image placeholder"
                    className="img-fluid"
                  />
                </figure>
                <div className="block-4-text p-4">
                  <h3>
                    <a href="#">T-Shirt Mockup</a>
                  </h3>
                  <p className="mb-0">Finding perfect products</p>
                  <p className="text-primary font-weight-bold">$50</p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="block-4 text-center">
                <figure className="block-4-image">
                  <img
                    src="images/shoe_1.jpg"
                    alt="Image placeholder"
                    className="img-fluid"
                  />
                </figure>
                <div className="block-4-text p-4">
                  <h3>
                    <a href="#">Corater</a>
                  </h3>
                  <p className="mb-0">Finding perfect products</p>
                  <p className="text-primary font-weight-bold">$50</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

          <ToastContainer/>
    </>
  )
}

export default ShopSingle