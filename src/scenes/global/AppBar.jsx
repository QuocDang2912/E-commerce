import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AuthBox from './AuthBox'




export default function AppBar() {

    // redux thấy thông tin cart total

    let cartItem = useSelector((state) => state.cart.items)
    const totalItem = cartItem.reduce((total, item) => {
        return total + item.count
    }, 0)

    const total = cartItem.reduce((totalPrice, item) => {
        return totalPrice + item.count * item.attributes.price
    }, 0)



    return (
        <div className="navbar navbar-inverse navbar-fixed-top">
            <div className="topNav">
                <div className="container">
                    <div className="alignR">
                        <div className="pull-left socialNw">
                            <a href="#st"><span className="icon-twitter" /></a>
                            <a href="#st"><span className="icon-facebook" /></a>
                            <a href="#st"><span className="icon-youtube" /></a>
                            <a href="#st"><span className="icon-tumblr" /></a>
                        </div>
                        <a href="index.html"> <span className="icon-home" /> Home</a>
                        <AuthBox />
                        <a href="contact.html"><span className="icon-envelope" /> Contact us</a>
                        <Link to='/cart'>
                            <span className="icon-shopping-cart" /> {totalItem} Item(s) - <span className="badge badge-warning">{total}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>



    )
}
