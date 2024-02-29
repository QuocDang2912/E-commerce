import React, { useState } from 'react'

import InputPassword from '../component/InputPassword'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setCurrent, setToken } from '../state/UserSlice'
import { UserApi } from '../Api/UserApi'
import { ToastContainer, toast } from 'react-toastify'
import Loading from '../component/Loading'

export default function Register() {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm()

    const dispatch = useDispatch()

    const validateconfirmPassword = (value) => {
        let { password } = getValues()
        return value === password
    }

    let myview = loading === true ? <Loading /> : ''

    const onSubmit = (data) => {
        console.log("🚀 ~ file: Register.jsx:20 ~ onSubmit ~ data:", data)
        alert('call App register')
        const register = async (data) => {
            try {
                setLoading(true)
                const response = await UserApi.register(data)
                dispatch(
                    setCurrent(response.data.user) // thông tin user
                )
                dispatch(
                    setToken(response.data.jwt) // thông tin token
                )
                // save local
                localStorage.setItem('user', JSON.stringify(response.data.user))
                localStorage.setItem('token', JSON.stringify(response.data.jwt))
                toast.success('register thanh cong');

                setLoading(false)
                reset()


            } catch (error) {
                toast.error('register thanh cong', error);
            }

        }
        register(data)
    }

    return (
        <div >
            <ul className="breadcrumb">
                <li><a href="index.html">Home</a> <span className="divider">/</span></li>
                <li className="active">Registration</li>
            </ul>
            <h3> Registration</h3>
            <hr className="soft" />
            <div className="well">
                <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                    {/* handleSubmit: kiểm tra validate nếu khô có lỗi thì thực thi tiếp hàm onSubmit */}
                    <h3>Your Personal Details</h3>
                    <div className="control-group">
                        <label className="control-label" htmlFor="inputFname">username <sup>*</sup></label>
                        <div className="controls">
                            <input {...register('username', { required: true, minLength: 2 })} type="text" id="username" placeholder="First Name" />
                            {/*  thông báo lỗi */}
                            {errors.username?.type === 'required' && <p style={{ color: 'red', }}>username is required</p>}
                            {errors.username?.type === 'minLength' && <p style={{ color: 'red', }}>username must have at least 2</p>}
                        </div>
                    </div>
                    <div className="control-group">
                        <label className="control-label" htmlFor="inputEmail">Email <sup>*</sup></label>
                        <div className="controls">
                            <input {...register('email', { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })} type="text" placeholder="Email" />
                            {errors.email?.type === 'required' && <p style={{ color: 'red', }}>email is required</p>}
                            {errors.email?.type === 'pattern' && <p style={{ color: 'red', }}>wrong email</p>}
                        </div>
                    </div>
                    <div className="control-group">
                        <label className="control-label">Password <sup>*</sup></label>
                        <div className="controls">
                            <InputPassword label='password' register={register} validateconfirmPassword={() => { return true }} />
                            {errors.password?.type === 'required' && <p style={{ color: 'red', }}>passWord is required</p>}
                            {errors.password?.type === 'pattern' && <p style={{ color: 'red', }}>password Tối thiểu tám ký tự, ít nhất một chữ cái và một số</p>}
                        </div>
                    </div>
                    <div className="control-group">
                        <label className="control-label">Confirm Password <sup>*</sup></label>
                        <div className="controls">
                            <InputPassword label='confirmPassword' register={register} validateconfirmPassword={validateconfirmPassword} />
                            {errors.confirmPassword?.type === 'required' && <p style={{ color: 'red', }}>confirmPassword is required</p>}
                            {errors.confirmPassword?.type === 'pattern' && <p style={{ color: 'red', }}>confirmPassword Tối thiểu tám ký tự, ít nhất một chữ cái và một số</p>}
                            {errors.confirmPassword?.type === 'validate' && <p style={{ color: 'red', }}>confirmPassword phải = passWord</p>}
                        </div>
                    </div>
                    <div className="control-group">
                        <div className="controls">
                            {myview}
                            <input type="submit" name="submitAccount" defaultValue="Register" className="exclusive shopBtn" />
                        </div>
                    </div>
                </form>
            </div>



            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />


        </div>

    )
}
