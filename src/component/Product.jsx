import React from 'react'
import { AppUrl } from '../Api/AppUrl'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../state/CartSlice'

export default function Product({ product }) {

    const dispatch = useDispatch()

    const handleClickToCart = () => {
        dispatch(
            addToCart(
                {
                    item: { ...product, count: 1 }
                }
            )
        )
    }


    return (
        <div className="thumbnail" style={{ height: '340px' }}>


            <Link to={'/product/' + product.id}>
                <img style={{ height: '200px' }} src={AppUrl.ImageUrl + product.attributes.image.data[0].attributes.url} alt='tam' />
            </Link>
            <div className="caption cntr">
                <Link to={'/product/' + product.id}><p>{product.attributes.productName}</p></Link >
                <p><strong> {product.attributes.price}$</strong></p>
                <p><strong> {product.attributes.category.data?.attributes.categoryName}</strong></p>
                <h4>

                    <Link onClick={handleClickToCart} className="shopBtn" to='#st'>Add to cart</Link>
                </h4>

                <br className="clr" />
            </div>
        </div>

    )
}
