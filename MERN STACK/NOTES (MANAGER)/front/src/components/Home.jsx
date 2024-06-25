
import { useForm } from "react-hook-form"
import '../components/Home.css'
import React, { useContext,useEffect } from 'react'
import { counterContext } from '../context/context'
import Notes from "./Notes"
import LoginForm from "./LoginForm"
import {useNavigate } from 'react-router-dom';


const Home = () => {
  const { notes, addnote, Login } = useContext(counterContext)
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
    addnote(data)
    reset()

  }

  useEffect(() => {
    if(!Login){
      navigate('/Login')

    }
  });
  // console.log("hedhgj  "+notes.length)


  return (
    <>
      
        <div className="home">

          <div>
            <h1>Add A New Note</h1>
            <form action="" className='form' onSubmit={handleSubmit(onSubmit)}>

              <div className="error">
                {errors.Title && <div className='red'>{errors.Title.message}</div>}
              </div>
              <input className="inp" placeholder='TITLE' {...register("Title", { required: { value: true, message: "Title is required" } })} type="text" />

              <div className="error">
                {errors.Description && <div className='red'>{errors.Description.message}</div>}
              </div>
              <input className="inp" placeholder='Description'  {...register("Description", { required: { value: true, message: "Description is required" }, minLength: { value: 5, message: "Min length of Description is 5" }, })} type="text" />

              <div className="error">
                {errors.Tag && <div className='red'>{errors.Tag.message}</div>}
              </div>
              <input className="inp" placeholder='Tag'  {...register("Tag", { required: { value: true, message: "Tag is required " } })} type="text" />


              <input className=" submitbtn" disabled={isSubmitting} type="submit" value="Add " />
            </form>
          </div>


          <h1 className="yournote">Your Notes</h1>
          <div className="notesContainer">

            {/* {notes.length===0 ? "No Notes Here": <Notes/>} */}


            <Notes />

          </div>
        </div>


    </>
  )
}

export default Home
