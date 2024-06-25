
import React, { useState, useContext } from 'react'
import { useForm } from "react-hook-form"
import { counterContext } from '../context/context'
import '../components/EditForm.css'

const EditForm = (props) => {
    const {note } = props;
    const { hanldeRemoveclick,update } = useContext(counterContext)

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            Title: note.title,
            Description: note.description,
            Tag:note.tag
        }
    });


    const onSubmit = async (data) => {
    const editedNote=note;
    editedNote.title=data.Title
    editedNote.description=data.Description
    editedNote.tag=data.Tag
    update(editedNote)


    }

    return (
        <>

            <div className="component">
                <div className="icon"><i onClick={hanldeRemoveclick} className="fa-solid fa-xmark"></i></div>

                <form action="" className='Editform' onSubmit={handleSubmit(onSubmit)}>

                    <div className="error">
                        {errors.Title && <div className='red'>{errors.Title.message}</div>}
                    </div>
                    <input className="inp" placeholder='TITLE' {...register("Title", { required: { value: true, message: "Title is required" }, })} type="text" />

                    <div className="error">
                        {errors.Description && <div className='red'>{errors.Description.message}</div>}
                    </div>
                    <input className="inp" placeholder='Description'  {...register("Description", { required: { value: true, message: "Description is required" }, minLength: { value: 5, message: "Min length of Description is 5" }, })} type="text" />

                    <div className="error">
                        {errors.Tag && <div className='red'>{errors.Tag.message}</div>}
                    </div>
                    <input className="inp" placeholder='Tag'  {...register("Tag", { required: { value: true, message: "Tag is required " }, })} type="text" />


                    <input className=" submitbtn" disabled={isSubmitting} type="submit" value="Update " />
                </form>
            </div>
        </>
    )
}

export default EditForm
