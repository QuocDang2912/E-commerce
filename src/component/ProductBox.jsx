import React from 'react'
import Product from './Product'

export default function ProductBox({ product }) {

    let view = product.map(product => (
        <li key={product.id} className="span3" style={{ height: '350px', margin: "1px" }}>
            <Product product={product} />
        </li>
    ))
    return (
        <div className="well well-small">
            <h3>Our Products </h3>
            <div className="row-fluid">
                <ul className="thumbnails">
                    {/* 
                    <li className="span3">
                        <Product />
                    </li>
                    <li className="span3">
                        <Product />
                    </li>
                    <li className="span3">
                        <Product />
                    </li> */}
                    {view}


                </ul>
            </div>
        </div>

    )
}
