import React from 'react'
import { AppUrl } from '../../../Api/AppUrl'
import { Link, useParams } from 'react-router-dom'

export default function AdminProductItem({ product, handleClick }) {
    // console.log("🚀 ~ file: AdminProductItem.jsx:5 ~ AdminProductItem ~ product:", product)


    let myview = product.attributes.publishedAt == null ? (<input type='range' min="0" max="1" value="0" />) : (<input type='range' min="0" max="1" value="1" />)
    return (
        <tr className="odd">

            <td>{product.id}</td>
            <td>{product.attributes.productName}</td>
            <td>
                <img style={{ height: '70px', width: "100px" }} src={AppUrl.ImageUrl + product.attributes.image?.data[0].attributes.url} alt='hinh '></img>
            </td>
            <td>{product.attributes.price}</td>
            <td>{myview}</td>

            <td style={{ fontSize: "20px" }}>
                <i class="icon-eye-open"></i>
                <Link to={'/admin/product/edit/' + product.id}>
                    <i class="icon-edit"></i>
                </Link>

                <i name={product.id} class="icon-trash" onClick={handleClick}></i>
            </td>
        </tr>
    )
}
