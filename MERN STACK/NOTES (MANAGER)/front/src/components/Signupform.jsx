import { useForm } from "react-hook-form"
import React, { useContext } from 'react'
import { counterContext } from '../context/context'
import { useNavigate } from "react-router-dom";


const Signupform = () => {
    const navigate = useNavigate();
    const { setLogin, } = useContext(counterContext)

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();
    const onSubmit = async (data) => {
        console.log(data)
        signupUser(data)
        reset()

    }

    const signupUser = async (credentials) => {
        // const navigate=useNavigate()
        // const {name,password,email}=credentials

        const url = "http://localhost:3000/api/auth/SignUp"
        console.log(credentials.password);
        console.log(credentials.email)
        console.log(credentials.name)
        const response = await fetch(url, {
            method: "POST",
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ name: credentials.name, password: credentials.password, email: credentials.email }),
        });
        const fresponse = await (response.json())
        console.log(fresponse)
        if (fresponse.authtoken) {
            console.log("i am present ")
            localStorage.setItem("token", fresponse.authtoken)
            setLogin(true)
            navigate("/")

        }
       

    }
    return (
        <>
            <form action="" className='form' onSubmit={handleSubmit(onSubmit)}>

                <div className="error">
                    {errors.name && <div className='red'>{errors.name.message}</div>}
                </div>
                <input className="inp" placeholder='NAME' {...register("name", { required: { value: true, message: "Name is required" } })} type="text" />

                <div className="error">
                    {errors.password && <div className='red'>{errors.password.message}</div>}
                </div>
                <input className="inp" placeholder='PASSWORD'  {...register("password", { required: { value: true, message: "Description is required" }, minLength: { value: 5, message: "Min length of Password is 5" }, })} type="text" />

                <div className="error">
                    {errors.Tag && <div className='red'>{errors.Tag.message}</div>}
                </div>
                <input className="inp" placeholder='EMAIL'  {...register("email", {
                    required: { value: true, message: "Email is required " }, pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please enter a valid email',
                    },
                })} type="email" />


                <input className=" submitbtn" disabled={isSubmitting} type="submit" value="SignUp " />
            </form>
        </>
    )
}

export default Signupform
