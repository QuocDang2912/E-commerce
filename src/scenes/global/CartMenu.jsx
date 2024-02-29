import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppUrl } from '../../Api/AppUrl'
import { addToCart, decreaseCount, increaseCount, removeFromCart } from '../../state/CartSlice'

export default function CartMenu() {

    const dispatch = useDispatch()

    let cartItem = useSelector((state) => state.cart.items)
    console.log("🚀 ~ file: CartMenu.jsx:11 ~ CartMenu ~ cartItem:", cartItem)
    const totalItem = cartItem.reduce((total, item) => {
        return total + item.count
    }, 0)

    const total = cartItem.reduce((totalPrice, item) => {
        return totalPrice + item.count * item.attributes.price
    }, 0)



    let view = cartItem.map((item) => (
        <tr>
            <td><img width={100} src={AppUrl.ImageUrl + item.attributes.image.data[0].attributes.url} alt='tam' /></td>
            <td>{item.attributes.productName}</td>
            <td> - </td>
            <td><span className="shopBtn"><span className="icon-ok" /></span> </td>
            <td>{item.attributes.price}</td>
            <td>
                <input className="span1" style={{ maxWidth: 34 }} placeholder={item.count} id="appendedInputButtons" size={16} type="text" value={item.count} />
                <div className="input-append">
                    <button className="btn btn-mini" type="button" onClick={() => dispatch(decreaseCount({ id: item.id }))}>-</button>
                    <button className="btn btn-mini" type="button" onClick={() => dispatch(increaseCount({ id: item.id }))}> + </button>
                    <button className="btn btn-mini btn-danger" type="button" onClick={() => dispatch(removeFromCart({ id: item.id }))}>
                        <span className="icon-remove" />
                    </button>
                </div>
            </td>
            <td>{item.attributes.price * item.count}</td>
        </tr>
    ))



    return (
        <div className="well well-small">
            <h1>Check Out <small className="pull-right"> 2 Items are in the cart </small></h1>
            <hr className="soften" />
            <table className="table table-bordered table-condensed">
                <thead>
                    <tr>
                        <th>image</th>
                        <th>product name</th>
                        <th>	Ref. </th>
                        <th>Avail.</th>
                        <th>Unit price</th>
                        <th>Qty </th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>

                    {view}

                    <tr>
                        <td colSpan={6} className="alignR">Total products:{totalItem}	</td>
                        <td> ${total}</td>
                    </tr>

                </tbody>
            </table><br />


            <a href="products.html" className="shopBtn btn-large"><span className="icon-arrow-left" /> Continue Shopping </a>
            <a href="login.html" className="shopBtn btn-large pull-right">Next <span className="icon-arrow-right" /></a>
        </div>

    )
}
