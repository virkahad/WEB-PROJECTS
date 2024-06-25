import { useEffect, useState, useRef } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home';
import About from './components/About';
import EditForm from './components/EditForm';
import { counterContext } from './context/context'
import LoginForm from './components/LoginForm';
import Signupform from './components/Signupform';



function App() {
  const [notes, setnotes] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editnote, seteditnote] = useState({});
  const [Login, setLogin] = useState(false)
  const editref = useRef()
  const Mainref = useRef()
  // const navigate = useNavigate();


  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar />
          <Home />
        </div>
      ),
    },
    {
      path: "/About",
      element: <div><Navbar /><About /></div>,
    },
    {
      path: "/SignUp",
      element: <div><Navbar /><Signupform/></div>,
    },
    {
      path: "/Login",
      element: <div><Navbar /><LoginForm/></div>,
    },

  ]);

  const getNotes = async () => {

    const url = "http://localhost:3000/api/notes/GetAllNotes";
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const res = await response.json();
    setnotes(res)

  }

  const addnote = async (note) => {
    // Adding note with respect to the database
    const url = "http://localhost:3000/api/notes/AddNote"
    const newnote = {
      "title": note.Title,
      "description": note.Description,
      "tag": note.Tag
    }


    const response = await fetch(url, {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')

      },
      body: JSON.stringify(newnote),
    });
    const res = await (response.json())
    console.log("add response " + res)

    // Adding notes with respect to the frontEnd
    // setting Notes Array
    setnotes(notes.concat(res))
  }

  const deleteNote = async (id) => {
    console.log("in the delete of the app ")

    const url = `http://localhost:3000/api/notes/Delete/${id}`


    const response = await fetch(url, {
      method: "DELETE",
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    const res = await (response.json())
    console.log(res + "al last the response  ")
    const newnotes = notes.filter((note) => {
      if (note._id !== id) {
        return note;
      }
    })
    setnotes(newnotes)



  }
  const EditNote = (notee) => {

    console.log("in the edit of the Main App")
    seteditnote(notee)
    Mainref.current.style.opacity = "0.2"
    editref.current.style.top = "52px"
    setShowEdit(true)
    console.log("edit of the app  " + editnote.etitle)


  }

  const update = async (Note) => {

    const url = `http://localhost:3000/api/notes/Updating/${Note._id}`
    const newnote = {
      "title": Note.title,
      "description": Note.description,
      "tag": Note.tag
    }

    const response = await fetch(url, {
      method: "PUT",
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },
      body: JSON.stringify(newnote),
    });
    const res = await (response.json())

    const newnotes = notes.filter((note) => {
      if (note._id !== Note._id) {
        return note;
      }

    })
    const newnotesss = newnotes.concat(res.note)
    setnotes(newnotesss)
    hanldeRemoveclick()


  }

  const hanldeRemoveclick = () => {


    editref.current.style.top = "-356px"
    Mainref.current.style.opacity = "1"
    setShowEdit(false)
  }


  return (

    <>

      <counterContext.Provider value={{ notes, Login,setLogin, update, setnotes, getNotes, addnote, deleteNote, EditNote, hanldeRemoveclick }}>
       
          <div className="wrap">
            <div ref={Mainref} className="allOtherRoutes">
              <RouterProvider router={router} />
            </div>
            <div ref={editref} className="editform">
              {showEdit && <EditForm note={editnote} />}
            </div>
          </div>

      </counterContext.Provider>



    </>
  )
}

export default App
