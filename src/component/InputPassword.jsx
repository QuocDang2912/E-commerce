import React from 'react'

export default function InputPassword({ register, label, validateconfirmPassword }) {

    const togglePassWord = (e) => {
        const password = e.target.previousElementSibling
        console.log("🚀 ~ file: InputPassword.jsx:7 ~ togglePassWord ~ password:", password)
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password'
        password.setAttribute('type', type);
        e.target.classList.toggle('fa-eye-slash')
    }

    return (
        <>
            <input {...register(label, {
                validate: validateconfirmPassword,
                required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
            })} type="password" className="span3" placeholder="Password" />
            <i onClick={togglePassWord} className='fa fa-eye' aria-hidden="true" style={{ marginLeft: '-30px', cursor: 'pointer', verticalAlign: '5px' }}></i>
        </>


    )
}
