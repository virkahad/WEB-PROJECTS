import React, { useContext } from 'react'
import { counterContext } from '../context/context'
import { Link } from "react-router-dom";
import '../components/Navbar.css'
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const { Login ,setLogin} = useContext(counterContext)
  const navigate=useNavigate();
  const handleLogOut=()=>{
    setLogin(false)
    localStorage.removeItem('token')
    navigate('/')
    

  }


  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="about">About</Link></li>

        </ul>

        <h2>All Your Notes In One place</h2>

        <div className="buttons">
          {Login ? <button className='btn' onClick={handleLogOut}>LogOut</button> :
            <div className="btns">

              <button className='btn'><Link className='linkk' to="/SignUp">SignUp</Link></button>
              <button className='btn'><Link className='linkk' to="/Login">Login</Link></button>
            </div>
          }
        </div>
      </nav>

    </>
  )
}

export default Navbar
