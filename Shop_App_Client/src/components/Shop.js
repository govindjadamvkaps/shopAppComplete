import axios from 'axios'
import React, { createContext, useEffect, useReducer, useState } from 'react'
import ContextCart from './ContextCart'
import { reducer } from './Reducer'


export const CartContext = createContext()


const Shop = () => {

  const [productData, setProductData] = useState([])
  const fetchProduct = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/products`)
      // console.log(resp.data.data)
      setProductData(resp.data.data)


    } catch (error) {
      console.log("error in fetching products", error)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])


  // if (productData != "") {
  //   console.log("product data", productData)

  //   var initialState = {
  //     productData: productData,
  //     totalAmount: 0,
  //     totalItems: 11

  //   }
  //   var init = initialState
  //   console.log("initialState", initialState)

  // }

  // var initialState = {
  //       productData: productData,
  //       totalAmount: 0,
  //       totalItems: 0
  // }

  // const [state, dispatch] = useReducer(reducer, initialState)
  // console.log("state=>", state)

  // console.log("product data", productData)

// incresase the item



  return (
    <>
      <CartContext.Provider value={{productData}}>
        <ContextCart />
      </CartContext.Provider>

    </>
  )
}

export default Shop