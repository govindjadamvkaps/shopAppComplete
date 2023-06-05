// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import Shop from './Shop'

// const FetchData = () => {

//     const [productData, setProductData] = useState([])
//     const fetchProduct = async () => {
//         try {
//             const resp = await axios.get(`http://localhost:5000/products`)
//             // console.log(resp.data.data)
//             setProductData(resp.data.data)

//         } catch (error) {
//             console.log("error in fetching products", error)
//         }
//     }

//     useEffect(() => {
//         fetchProduct()
//     }, [])

//     return (
//         <>
//         {
//             productData!=""?
//             <Shop productData={productData} />:
//             null
//         }
//         </>
//     )
// }

// export default FetchData
