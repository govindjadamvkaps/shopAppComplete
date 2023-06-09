import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { StatusCodes } from 'http-status-codes'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {

  const [amount,setAmount] =useState()
  const history = useNavigate()
  const userId = localStorage.getItem('_id')
  const { handleSubmit, register, formState: { errors }, reset } = useForm()
  const [productData, setProductData]=useState([])
  const [cartData, setCartData] = useState([])
  const user_id = localStorage.getItem("_id")
  const countryData = ["Afghanistan", "India", "Algeria", "bangladesh", "Ghana", "Albania", "Bahrain", "Colombia", "Dominican Republic"]


  const fetchCart = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/get-cart/${user_id}`)
      setCartData(resp.data.data)
      setProductData(resp.data.data.productId)
      setAmount(resp.data.data.totalPrice)
      
      console.log("CartData response",resp.data.data)
      console.log("product data response", resp.data.data.productId)
      

    } catch (error) {
      console.log("errror in fetching cart by user id", error)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [cartData])


  // const totalCart = () => {
  //   if (cartData.length === 0) {
  //     return 0;
  //   }

  //   return cartData.reduce((num1, num2) => {

  //     // const total = num1+num2.totalPrice
  //     // console.log("total",total)
  //     return num1 + num2.totalPrice;
  //   }, 0);

  // }
  // console.log("fjlffdsfsdfsakfd",totalCart())

// useEffect(()=>{
//   setAmount(totalCart())
// })  
  const postData = async (data) => {
    // try {
      
     console.log(amount)
      const res = await axios.post('http://localhost:5000/payment/create-checkout-session', {
        userId:userId,
        amount:amount,
        cartId:cartData
      // user: (JSON.parse(Cookies.get('user')))._id
      });

      if(res.data.url){
          window.location.href = res.data.url;
      }
  // } catch (error) {
  //     console.log('Error while making payment : ', error.message);
  // }

    // try {
      console.log("checkoutdaata", data)
      const resp = await axios.post(`http://localhost:5000/post-checkout`, {data,userId:userId})
      console.log("response of billing details", resp)
      
      if (resp.status === StatusCodes.CREATED) {
        toast.success("Billing Details Added", {
          position: "top-center"
        })
        history('/thankyou')
      }
      reset()
    // } catch (error) {
    //   console.log("error in post details", error)
    //   // toast.error("Billing Details Added",{
    //   //   position:"top-center"
    //   // })
    // }
  }



  return (
    <>
      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0">
              <a href="index.html">Home</a> <span className="mx-2 mb-0">/</span>{" "}
              <a href="cart.html">Cart</a> <span className="mx-2 mb-0">/</span>{" "}
              <strong className="text-black">Checkout</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
        <form onSubmit={handleSubmit(postData)}>
          <div className="row mb-5">
            <div className="col-md-12">
              <div className="border p-4 rounded" role="alert">
                Returning customer? <NavLink to="">Click here</NavLink> to login
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-5 mb-md-0">
              <h2 className="h3 mb-3 text-black">Billing Details</h2>
              {/* <form onSubmit={handleSubmit(postData)}> */}
                <div className="p-3 p-lg-5 border">
                  <div className="form-group">
                    <label htmlFor="country" className="text-black">
                      Country <span className="text-danger">*</span>
                    </label>
                    <select id="country"
                      className="form-control"
                      {...register('country', { required: true })}
                    >
                      <option value="">Select a country</option>
                      {
                        countryData.map((val, ind) => {
                          return (
                            <>
                              <option value={val} key={ind}>{val}</option>

                            </>
                          )

                        })
                      }

                    </select>
                    {errors.country && <p style={{ color: "red" }}>Country name is required</p>}
                  </div>

                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="fname" className="text-black">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="fname"
                        name="fname"
                        {...register('fname', { required: true })}
                      />
                      {errors.fname && <p style={{ color: "red" }}>First name is required</p>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="lname" className="text-black">
                        Last Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lname"
                        name="lname"
                        {...register('lname', { required: true })}
                      />
                      {errors.lname && <p style={{ color: "red" }}>lname is required</p>}
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="company" className="text-black">
                        Company Name{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="company"
                        name="company"
                        {...register('company', { required: true })}
                      />
                      {errors.company && <p style={{ color: "red" }}>company is required</p>}
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="address" className="text-black">
                        Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        placeholder="Street address"
                        {...register('address', { required: true })}
                      />
                      {errors.address && <p style={{ color: "red" }}>address is required</p>}
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="state" className="text-black">
                        State / Country <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        name="state"
                        {...register('state', { required: true })}

                      />
                      {errors.state && <p style={{ color: "red" }}>state is required</p>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="pincode" className="text-black">
                        Posta / Zip <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="pincode"
                        name="pincode"
                        {...register('pincode', { required: true })}

                      />
                      {errors.pincode && <p style={{ color: "red" }}>pincode is required</p>}
                    </div>
                  </div>


                 
                  <div className="form-group row mb-5">
                    <div className="col-md-6">
                      <label htmlFor="email" className="text-black">
                        Email Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        {...register('email', { required: true })}
                      />
                      {errors.email && <p style={{ color: "red" }}>email is required</p>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="phone" className="text-black">
                        Phone <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Phone Number"
                        {...register('phone', { required: true })}
                      />
                      {errors.phone && <p style={{ color: "red" }}>phone number is required</p>}
                    </div>
                  </div>
                 

                  <div className="form-group">
                    <label htmlFor="orderNotes" className="text-black">
                      Order Notes
                    </label>
                    <textarea
                      name="orderNotes"
                      id="orderNotes"
                      cols={30}
                      rows={5}
                      className="form-control"
                      placeholder="Write your notes here..."
                      defaultValue={""}
                      {...register('orderNotes', { required: true })}
                    />
                    {errors.orderNotes && <p style={{ color: "red" }}>order Notes is required</p>}
                  </div>
                  {/* <button className="btn btn-primary btn-sm" type="submit"> Add </button> */}
                </div>

              {/* </form> */}
            </div>
            <div className="col-md-6">
             

              <div className="row mb-5">
                <div className="col-md-12">
                  <h2 className="h3 mb-3 text-black">Your Order</h2>
                  <div className="p-3 p-lg-5 border">
                    <table className="table site-block-order-table mb-5">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          productData.map((item, index) => {
                            return (<>
                              <tr>
                                <td>
                                  {item.pid.pName} <strong className="mx-2">x</strong> {item.qty}
                                </td>
                                <td>{item.pid.pPrice * item.qty}</td>
                              </tr>

                            </>)
                          })
                        }
                        <tr>
                          <td className="text-black font-weight-bold">
                            <strong>Cart Subtotal</strong>
                          </td>
                          <td className="text-black" >{cartData.totalPrice}</td>
                        </tr>
                        <tr>
                          <td className="text-black font-weight-bold">
                            <strong>Order Total</strong>
                          </td>
                          <td className="text-black font-weight-bold"  >
                            <strong {...register('totalamount')} >{cartData.totalPrice}</strong>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                    <div className="border p-3 mb-3">
                      <h3 className="h6 mb-0">
                        <a
                          className="d-block"
                          data-toggle="collapse"
                          href="#collapsebank"
                          role="button"
                          aria-expanded="false"
                          aria-controls="collapsebank"
                        >
                          Cash On Delevry
                        </a>
                      </h3>
                      <div className="collapse" id="collapsebank">
                        <div className="py-2">
                          <p className="mb-0">
                            Cash on delivery (COD) is a type of transaction where the recipient pays for a good at the time of delivery rather than using credit. The terms and accepted forms of payment vary according to the payment provisions of the purchase agreement.
                          </p>
                        </div>
                      </div>
                    </div>

                   

                    <div className="form-group">
                      <button
                        className="btn btn-primary btn-lg py-3 btn-block"
                        type="submit"
                        // onClick={()=>{history("payment")}}
                      >
                          Place Order
                        {/* <NavLink to="/thankyou"  style={{ color: "#fff" }}> Place Order</NavLink> */}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          </form>
        </div>
      </div>
      <ToastContainer />


    </>
  )
}

export default Checkout