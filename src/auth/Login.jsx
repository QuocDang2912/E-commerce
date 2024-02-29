import React, { useState } from 'react'
import InputPassword from '../component/InputPassword'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setCurrent, setRole, setToken } from '../state/UserSlice'
import { UserApi } from '../Api/UserApi'
import { ToastContainer, toast } from 'react-toastify'
import Loading from '../component/Loading'
import { Navigate } from 'react-router-dom'

export default function Login() {
    const [userRole, setuserRole] = useState('Public')
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const dispatch = useDispatch()

    let myview = loading === true ? <Loading /> : ''

    const onSubmit = (data) => {
        console.log("🚀 ~ file: Register.jsx:20 ~ onSubmit ~ data:", data)
        alert('call App register')
        const login = async (data) => {
            try {
                setLoading(true)
                const response = await UserApi.login(data)
                dispatch(
                    setCurrent(response.data.user) // thông tin user
                )
                dispatch(
                    setToken(response.data.jwt) // thông tin token
                )
                // save local
                localStorage.setItem('user', JSON.stringify(response.data.user))
                localStorage.setItem('token', response.data.jwt)
                toast.success('login thanh cong');

                setLoading(false)
                reset()
                ///   get user info
                const getInfo = async () => {
                    var response1 = await UserApi.me({ populate: '*' })
                    console.log("🚀 ~ file: Login.jsx:47 ~ getInfo ~ response:", response1)
                    localStorage.setItem('role', response1.data?.role?.name)
                    dispatch(setRole(response1.data?.role?.name))
                    setuserRole(response1.data.role.name)
                }
                getInfo()


            } catch (error) {
                toast.error('login thanh cong', error);
            }

        }
        login(data)


    }
    return (
        <div >

            {
                (userRole === 'adminWeb') && (
                    <Navigate to='/admin/product' replace={true} />
                )

            }
            {
                (userRole === 'Authenticated') && (
                    <Navigate to='/product' replace={true} />
                )
            }


            <ul className="breadcrumb">
                <li><a href="index.html">Home</a> <span className="divider">/</span></li>
                <li className="active">Login</li>
            </ul>
            <h3> Login</h3>
            <hr className="soft" />
            <div className="row">
                <div className="span1"> &nbsp;</div>
                <div className="span4">
                    <div className="well">
                        <h5>ALREADY REGISTERED ?</h5>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* handleSubmit: kiểm tra validate nếu khô có lỗi thì thực thi tiếp hàm onSubmit */}
                            <div className="control-group">
                                <label className="control-label" htmlFor="username">username</label>
                                <div className="controls">
                                    <input {...register('identifier', { required: true, minLength: 2 })} type="text" id="username" placeholder="First Name" />
                                    {/*  thông báo lỗi */}
                                    {errors.identifier?.type === 'required' && <p style={{ color: 'red', }}>username is required</p>}
                                    {errors.identifier?.type === 'minLength' && <p style={{ color: 'red', }}>username must have at least 2</p>}
                                </div>
                            </div>
                            <div className="control-group">
                                <label className="control-label" htmlFor="inputPassword">Password</label>
                                <div className="controls">
                                    <InputPassword label='password' register={register} validateconfirmPassword={() => { return true }} />
                                    {errors.password?.type === 'required' && <p style={{ color: 'red', }}>passWord is required</p>}
                                    {errors.password?.type === 'pattern' && <p style={{ color: 'red', }}>password Tối thiểu tám ký tự, ít nhất một chữ cái và một số</p>}
                                </div>
                            </div>
                            <div className="control-group">
                                <div className="controls">
                                    {myview}
                                    <button type="submit" className="defaultBtn">Sign in</button> <a href="#st">Forget password?</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
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
