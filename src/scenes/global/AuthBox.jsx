import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { setCurrent, setRole, setToken } from '../../state/UserSlice'

export default function AuthBox() {

    const dispatch = useDispatch()

    let user = useSelector((state) => state.user.current)
    const [userRole, setuserRole] = useState(useSelector((state) => state.user.role))

    const handleLogout = () => {
        // reset current user and token
        dispatch(setCurrent({}))
        dispatch(setToken(''))
        dispatch(setRole('Public'))
        localStorage.clear()
        setuserRole('Public')
    }


    let myview = JSON.stringify(user) === '{}' ?
        <span>
            <Link to='/register'><span className="icon-edit" /> Free Register </Link>
            <Link to='/login'><span className="icon-sigin" /> login </Link>
        </span>
        :
        <span>
            <a href="#st"><span className="icon-user" />webcome ,{user.username}  </a>
            <a href="#st"><span className="icon-user" /> My Account</a>
            <button onClick={handleLogout} href="#st"><span className="icon-signout" />Logout</button>
        </span>
    return (
        <>
            {
                (userRole == 'Public') && (
                    <Navigate to='/product' replace={true}></Navigate>
                )
            }
            {myview}
        </>
    )
}
