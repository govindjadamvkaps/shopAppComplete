import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Category from './Category'
import Items from './Items'
import { CartContext } from './Shop'
import FetchData from './FetchData'
import axios from 'axios'

const ContextCart = () => {

    const { productData } = useContext(CartContext)
    const [category, setCategory] = useState('')
    const [categoryData, setCategoryData] = useState([])
    const [productCategoryData, setProductCategoryData] = useState([])
    const [men, setMen] = useState([])
    const [women, setWomen] = useState([])
    const [children, setChildren] = useState([])

    // fetch All cetegories
    const fetchCategory = async () => {
        try {
            const resp = await axios.get(`http://localhost:5000/categorys`)
            // console.log("category is",resp.data)
            setCategoryData(resp.data)
        } catch (error) {
            console.log("error in fetching category", error)
        }
    }

    // fetch product of category men
    const fetchMen = async () => {
        try {
            const resp = await axios.get(`http://localhost:5000/products/category/men`)
            setMen(resp.data)
        } catch (error) {
            console.log('error in fetchig product of men', error)
        }
    }

    // fetch product of category women
    const fetChWomen = async () => {
        try {
            const resp = await axios.get(`http://localhost:5000/products/category/women`)
            setWomen(resp.data)
        } catch (error) {
            console.log('error in fetchig product of women', error)
        }
    }

    // fetch product of category Children
    const fetchChildren = async () => {
        try {
            const resp = await axios.get(`http://localhost:5000/products/category/children`)
            setChildren(resp.data)
        } catch (error) {
            console.log('error in fetchig product of children', error)
        }
    }

    useEffect(() => {
        fetchCategory()
        fetchMen()
        fetChWomen()
        fetchChildren()
    }, [])

    const fetchProduct = async (category) => {
        try {
            const resp = await axios.get(`http://localhost:5000/products/${category}`)
            // console.log("product by category", resp.data.data)
            setProductCategoryData(resp.data.data)
        } catch (error) {
            console.log("error in fetching product by categorys", error)
        }
    }


    useEffect(() => {
        fetchProduct(category)
    }, [category])

    // console.log("productData", productData)

    return (
        <>
            <div className="bg-light py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-0">
                            <NavLink to="/">Home</NavLink> <span className="mx-2 mb-0">/</span>{" "}
                            <strong className="text-black">Shop</strong>
                        </div>
                    </div>
                </div>
            </div>


            <div className="site-section">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-md-9 order-2">
                            <div className="row">
                                <div className="col-md-12 mb-5">
                                    <div className="float-md-left mb-4">
                                        <h2 className="text-black h5">Shop All</h2>
                                    </div>
                                    <div className="d-flex">                                             <div class="form-floating">
                                            <select
                                                class="form-select"
                                                id="floatingSelect"
                                                aria-label="Floating label select example"
                                                name='cat'
                                                onChange={(e) => setCategory(e.target.value)}
                                            >
                                                <option value="" selected="">Latest</option>
                                                {
                                                    categoryData.map((item, index) => {
                                                        return (<>

                                                            <option value={item.category} key={index}>{item.category}</option>
                                                        </>)
                                                    })

                                                }
                                            </select>

                                        </div>

                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="btn btn-secondary btn-sm dropdown-toggle"
                                                id="dropdownMenuReference"
                                                data-toggle="dropdown"
                                            >
                                                Reference
                                            </button>
                                            <div
                                                className="dropdown-menu"
                                                aria-labelledby="dropdownMenuReference"
                                            >
                                                <a className="dropdown-item" href="#">
                                                    Relevance
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    Name, A to Z
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    Name, Z to A
                                                </a>
                                                <div className="dropdown-divider" />
                                                <a className="dropdown-item" href="#">
                                                    Price, low to high
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    Price, high to low
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-5">
                                {
                                    productCategoryData.map((item, index) => {
                                        return (
                                            <>
                                                <Items key={index} {...item} />
                                            </>
                                        )
                                    })

                                }

                            </div>
                            {/* <div className="row" data-aos="fade-up">
                                <div className="col-md-12 text-center">
                                    <div className="site-block-27">
                                        <ul>
                                            <li>
                                                <a href="#">&lt;</a>
                                            </li>
                                            <li className="active">
                                                <span>1</span>
                                            </li>
                                            <li>
                                                <a href="#">2</a>
                                            </li>
                                            <li>
                                                <a href="#">3</a>
                                            </li>
                                            <li>
                                                <a href="#">4</a>
                                            </li>
                                            <li>
                                                <a href="#">5</a>
                                            </li>
                                            <li>
                                                <a href="#">&gt;</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div> */}
                        </div>


                        <div className="col-md-3 order-1 mb-5 mb-md-0">
                            <div className="border p-4 rounded mb-4">
                                <h3 className="mb-3 h6 text-uppercase text-black d-block">
                                    Categories
                                </h3>

                                <ul className="list-unstyled mb-0">

                                    <li className="mb-1">
                                        <NavLink to=""  value="men" onClick={(e)=>setCategory('men')} className="d-flex">
                                            <span>Men</span>{" "}
                                            <span className="text-black ml-auto">({men.length})</span>
                                        </NavLink>
                                    </li>

                                    <li className="mb-1">
                                        <NavLink to="" value="women" onClick={(e)=>setCategory('women')} className="d-flex">
                                            <span>Women</span>{" "}
                                            <span className="text-black ml-auto">({women.length})</span>
                                        </NavLink>
                                    </li>

                                    <li className="mb-1">
                                        <NavLink to="" value="children" onClick={(e)=>setCategory('children')} className="d-flex">
                                            <span>Children</span>{" "}
                                            <span className="text-black ml-auto">({children.length})</span>
                                        </NavLink>
                                    </li>

                                </ul>

                            </div>

                            <div className="border p-4 rounded mb-4">
                                <div className="mb-4">
                                    <h3 className="mb-3 h6 text-uppercase text-black d-block">
                                        Filter by Price
                                    </h3>
                                    <div id="slider-range" className="border-primary" />
                                    <input
                                        type="text"
                                        name="text"
                                        id="amount"
                                        className="form-control border-0 pl-0 bg-white"
                                        disabled=""
                                    />
                                </div>
                                <div className="mb-4">
                                    <h3 className="mb-3 h6 text-uppercase text-black d-block">
                                        Size
                                    </h3>
                                    <label htmlFor="s_sm" className="d-flex">
                                        <input type="checkbox" id="s_sm" className="mr-2 mt-1" />{" "}
                                        <span className="text-black">Small (2,319)</span>
                                    </label>
                                    <label htmlFor="s_md" className="d-flex">
                                        <input type="checkbox" id="s_md" className="mr-2 mt-1" />{" "}
                                        <span className="text-black">Medium (1,282)</span>
                                    </label>
                                    <label htmlFor="s_lg" className="d-flex">
                                        <input type="checkbox" id="s_lg" className="mr-2 mt-1" />{" "}
                                        <span className="text-black">Large (1,392)</span>
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <h3 className="mb-3 h6 text-uppercase text-black d-block">
                                        Color
                                    </h3>
                                    <a href="#" className="d-flex color-item align-items-center">
                                        <span className="bg-danger color d-inline-block rounded-circle mr-2" />{" "}
                                        <span className="text-black">Red (2,429)</span>
                                    </a>
                                    <a href="#" className="d-flex color-item align-items-center">
                                        <span className="bg-success color d-inline-block rounded-circle mr-2" />{" "}
                                        <span className="text-black">Green (2,298)</span>
                                    </a>
                                    <a href="#" className="d-flex color-item align-items-center">
                                        <span className="bg-info color d-inline-block rounded-circle mr-2" />{" "}
                                        <span className="text-black">Blue (1,075)</span>
                                    </a>
                                    <a href="#" className="d-flex color-item align-items-center">
                                        <span className="bg-primary color d-inline-block rounded-circle mr-2" />{" "}
                                        <span className="text-black">Purple (1,075)</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Category />

                </div>
            </div>
        </>
    )
}

export default ContextCart
