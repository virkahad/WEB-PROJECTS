import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
    const eyeref = useRef()
    const [showPassword, setshowPasswrod] = useState(false);
    const [passwrodarray, setpasswordArray] = useState([])

    const {
        register,
        handleSubmit,
        setError,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();


    const onSubmit = async (data) => {
        
        let editCheck = await (passwrodarray.filter((item) => { return item.Site != data.Site }))
        setpasswordArray(editCheck)
        let addingArray = await (editCheck.concat(data))
        setpasswordArray(addingArray)
        reset()
        toast('Password Saved Successfully', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

            });


    }

    const passwrodshow = () => {
        console.log("in th efunction")


        if (eyeref.current.src.includes('/eyeclosed.svg')) {
            eyeref.current.src = "/eye.svg"
            setshowPasswrod(true)

        }
        else {
            eyeref.current.src = "/eyeclosed.svg"
            setshowPasswrod(false)

        }

    }
    const handleCopyClick = (dataTocopy) => {
        console.log("copy btn is clicked")
        navigator.clipboard.writeText(dataTocopy)
        toast('Copied To Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

            });
            



    }
    const deleteBtnClick = (data) => {
        console.log("delete btn is clicked  ")
        console.log(data)
        toast('Password Deleted Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

            });

    }

    const editBtnClicked = (data) => {
        console.log("edit btn is clicked")
        console.log(data)
        setValue('Site', data.Site, { shouldValidate: true })
        setValue('UserName', data.UserName, { shouldValidate: true })
        setValue('Password', data.Password, { shouldValidate: true })
    }

    return (

        <>

            <ToastContainer
                position="top-right"
                autoClose={3000}
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

            <div className="cont h-[82.9vh]">
                {/* heading component */}
                <h1 className='flex flex-col justify-center   items-center gap-2 text-2xl mt-2'>
                    <div className="logo flex gap-3">
                        <span>&lt;/</span>
                        <p className='font-bold '>PASS<span className='text-green-500 font-bold'>OP</span></p>
                        <span>&gt;</span>
                    </div>
                    <p className='head'>
                        Your Password Manager
                    </p>
                </h1>

                {/* form component */}
                <form className='w-[80vw] m-auto flex flex-col gap-4 justify-center items-center mt-3' onSubmit={handleSubmit(onSubmit)}>

                    <input type='text' placeholder='Site URL' className='w-[30vw] h-7 rounded-lg border-2 border-black' {...register("Site", { required: true })} />
                    {errors.Site && <span>This field is required</span>}

                    <div className="twoinputs flex w-[30vw] justify-between">

                        {errors.UserName && <span>This field is required</span>}
                        <input type='text' placeholder="Site UserName" className='w-[13vw] h-7 rounded-lg border-2 border-black' {...register("UserName", { required: true })} />

                        <div className="passwordinp w-[13vw]  flex bg-white border-2 border-black rounded-lg">

                            <input placeholder="Site Password" {...register("Password", { required: true })} className='w-[10vw] h-7 rounded-lg outline-none' type={showPassword ? "text" : `password`} />

                            <img ref={eyeref} onClick={passwrodshow} className='cursor-pointer' src="/eyeclosed.svg" alt="no img " />
                        </div>
                    </div>

                    <input onClick={handleSubmit(onSubmit)} className='rounded-lg bg-slate-600 pl-6 pr-6 p-2 cursor-pointer text-white font-bold' type="submit" value="Add" />
                </form>


                {/* Table component */}
                <div className="passwordsContainer w-[90vw] m-auto">


                    <table className='border-1 w-[85vw] m-auto mt-3 rounded-lg overflow-hidden'>
                        <thead >

                            <tr className=' bg-green-500'>
                                <th className='text-center w-[25vw] overflow-hidden'>Site</th>
                                <th className='text-center w-[25vw] overflow-hidden'>UserName</th>
                                <th className='text-center w-[25vw] overflow-hidden'>Password</th>
                            </tr>
                        </thead>
                        <tbody className='gap-6'>

                            {passwrodarray && passwrodarray.map((item, index) => {
                                return < tr key={index} className='bg-green-300 border-spacing-3'>
                                    <td className=' w-[26vw]  p-1.5'>
                                        <div className='flex justify-around'>
                                            <div className='w-[18vw] overflow-hidden' >
                                                <a target='_blank' href={item.Site}>{item.Site}</a>

                                            </div>

                                            <img className='cursor-pointer' onClick={() => { handleCopyClick(item.Site) }} src="/copy.svg" alt="" />

                                        </div>

                                    </td>
                                    <td className=' w-[20vw] p-1.5'>
                                        <div className='flex'>
                                            <div className='w-[15vw] overflow-hidden'>{item.UserName}</div>
                                            <div className="img flex gap-6">
                                                <img className='cursor-pointer' onClick={() => { handleCopyClick(item.UserName) }} src="/copy.svg" alt="" />


                                            </div>

                                        </div>



                                    </td>
                                    <td className='w-[20vw] p-1.5'>
                                        <div className='flex'>
                                            <div className='w-[15vw] overflow-hidden'>{item.Password}</div>
                                            <div className="img flex gap-6">

                                                <img className='cursor-pointer' onClick={() => { handleCopyClick(item.Password) }} src="/copy.svg" alt="" />
                                                <img onClick={() => { deleteBtnClick(item) }} className='cursor-pointer' src="/delete.svg" alt="" />
                                                <img onClick={() => { editBtnClicked(item) }} className='cursor-pointer' src="/edit.svg" alt="" />
                                            </div>
                                        </div>

                                    </td>

                                </tr>
                            })}
                            {!passwrodarray && <tr>
                                <td>No Content IN the Table</td>
                            </tr>}

                        </tbody>
                    </table>




                </div>

            </div>

        </>
    )
}

export default Main
