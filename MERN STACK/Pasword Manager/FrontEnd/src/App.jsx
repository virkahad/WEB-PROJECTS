import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Main from './components/Main'
import '../src/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-500 opacity-20 blur-[100px]"></div></div>
    <Navbar/>
    <Main/>
    <Footer/>
    </>
  )
}
export default App
