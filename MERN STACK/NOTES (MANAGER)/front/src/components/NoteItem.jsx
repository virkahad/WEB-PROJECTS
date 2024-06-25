import React, {useContext} from 'react'
import { counterContext } from '../context/context'
import '../components/Noteiem.css'


const NoteItem = (props) => {
  const { note} = props
  const {EditNote,deleteNote}=useContext(counterContext)



  return (
    <>
      <div className="item hover">
        <div className="title flex">
          <h3>Title:</h3>
          <p>{note.title}</p>

        </div>
        <div className="description flex">
          <h3>Description:</h3>
          <p>{note.description}</p>

        </div>
        <div className=" justify">
          <h4>{note.tag}</h4>
          <div className="icons flex">
          <i onClick={()=>{deleteNote(note._id)}} className="fa-solid fa-trash hover"></i>
          <i onClick={()=>{EditNote(note)}} className="fa-solid fa-pen hover"></i>
          </div>

        </div>

      </div>

    </>
  )
}

export default NoteItem
