import { useForm } from "react-hook-form"
import React, { useContext } from 'react'
import { counterContext } from '../context/context'
import {useNavigate } from 'react-router-dom';

const LoginForm = () => {

    const { setLogin, Login ,setauthtoken} = useContext(counterContext)
        const navigate=useNavigate()


    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();
    const onSubmit = async (data) => {
        console.log(data)
      loginuser(data);
        reset()

    }
    const loginuser=async(credentials)=>{
        // const navigate=useNavigate()

        const url = "http://localhost:3000/api/auth/Login"    
        console.log(credentials.Password);
        console.log(credentials.Email)
        const response = await fetch(url, {
          method: "POST",
          mode: "cors", // no-cors, *cors, same-origin
          headers: {
            "Content-Type": "application/json",
    
          },
          body: JSON.stringify({password:credentials.Password,email:credentials.Email}),
        });
        const fresponse=await(response.json())
        console.log(fresponse)
        if(fresponse.authtoken){
            console.log("i am present ")
           localStorage.setItem("token",fresponse.authtoken)
            setLogin(true)
            navigate("/")

        }
        else{
            console.log("in the else box of the login...")
            alert("invalid Credentials")
        }


    }
    return (
        <div>
            <h1>Login To Access Your Notes</h1>
            <form action="" className='form' onSubmit={handleSubmit(onSubmit)}>

                <div className="error">
                    {errors.Password && <div className='red'>{errors.Title.message}</div>}
                </div>
                <input className="inp" placeholder='Password' {...register("Password", { required: { value: true, message: "Password is required" } })} type="text" />

                <div className="error">
                    {errors.Email && <div className='red'>{errors.Email.message}</div>}
                </div>
                <input className="inp" placeholder='Email'  {...register("Email", { required: { value: true, message: "Email is required" }, pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Please enter a valid email',
        }, })} type="email" />


                <input className=" submitbtn" disabled={isSubmitting} type="submit" value="Login " />
            </form>

        </div>
    )
}

export default LoginForm
