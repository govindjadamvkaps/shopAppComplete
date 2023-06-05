import React from 'react'
import { NavLink } from 'react-router-dom'

const Items = ({ pImage, pName, pDescription, pPrice, _id }) => {
    return (
        <>
            <div className="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
                <div className="block-4 text-center border">
                    <figure className="block-4-image">
                        <NavLink href="/shop-single">
                            <img
                                src={`http://localhost:5000/public/images/${pImage}`}
                                alt="Image placeholder"
                                className="img-fluid"
                            />
                        </NavLink>
                    </figure>
                    <div className="block-4-text p-4">
                        <h3>
                            <NavLink to={`/shop-single/${_id}`}>{pName}</NavLink>
                        </h3>
                        <p className="mb-0">{pDescription} </p>
                        <p className="text-primary font-weight-bold">&#8377; {pPrice}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Items
