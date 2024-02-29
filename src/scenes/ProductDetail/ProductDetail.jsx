import React, { useEffect, useState } from 'react'
import PictureBox from './PictureBox'
import { useParams } from 'react-router-dom'
import Loading from '../../component/Loading'
import ProductApi from '../../Api/ProductApi'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../state/CartSlice'

export default function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState({})
    console.log("🚀 ~ file: ProductDetail.jsx:10 ~ ProductDetail ~ product:", product)
    const [loading, setloading] = useState(true)

    let params = {
        populate: "*"
    }
    // call Api
    useEffect(() => {

        const fetchProduct = async () => {
            const response = await ProductApi.get(id, params)
            setProduct(response.data.data.attributes)
            setloading(false)
        }
        fetchProduct()

    }, [])

    // redux
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


    let infoRight =
        (<div>

            {/* <h3>{product.attributes.productName}</h3> */}
            <h3>{product.productName}</h3>
            <hr className="soft" />
            <form className="form-horizontal qtyFrm">
                <div className="control-group">
                    <label className="control-label"><span>${product.price}</span></label>
                    <div className="controls">
                        <input type="number" className="span6" placeholder="Qty." />
                    </div>
                </div>

                <button type="submit" className="shopBtn">
                    <span onClick={handleClickToCart} className=" icon-shopping-cart" />
                    Add to cart</button>
            </form>
        </div>
        )
    let viewInfo = (
        <p>
            {product.description}
        </p>
    )


    let ViewPictureBox = loading === true ? <Loading /> : <PictureBox image={product.image.data} />
    let ViewRight = loading === true ? <Loading /> : infoRight
    let View3 = loading === true ? <Loading /> : viewInfo
    return (
        <div className="well well-small">
            <div className="row-fluid">
                <div className="span5">
                    {ViewPictureBox}
                </div>
                <div className="span7">
                    {ViewRight}
                </div>
            </div>
            <hr className="softn clr" />
            <ul id="productDetail" className="nav nav-tabs">
                <li className="active"><a href="#home" data-toggle="tab">Product Details</a></li>
            </ul>
            <div id="myTabContent" className="tab-content tabWrapper">
                <div className="tab-pane fade active in" id="home">
                    <h4>Product Information</h4>
                    {View3}
                </div>
            </div>
        </div>

    )
}
