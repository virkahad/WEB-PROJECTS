import React, {useContext} from 'react'
import { counterContext } from '../context/context'
import NoteItem from './NoteItem';
import { useEffect } from 'react';
import '../components/Notes.css'


function Notes() {

    const {notes,getNotes}=useContext(counterContext)
    useEffect(()=>{
          getNotes()

    },[])

  return (
    <>
    {notes.length==0 && "No notes Here"}
    {notes.map(note => {
      return <NoteItem key={note._id} note={note}/>
      // return <NoteItem/>
    })}
    </>
    
  )
}

export default Notes
