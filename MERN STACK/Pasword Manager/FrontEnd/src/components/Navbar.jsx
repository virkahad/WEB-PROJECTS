import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav className=' bg-slate-800 text-white flex justify-between items-center p-5'>
        <div className="logo flex gap-3">
           <span>&lt;/</span>
<p className='font-bold'>PASS<span className='text-green-500 font-bold'>OP</span></p>
           <span>&gt;</span>
        </div>
        <ul className='flex gap-4'>
            <li className='cursor-pointer'>Home</li>
            <li className='cursor-pointer'>About</li>
            <li className='cursor-pointer'>Help</li>
        </ul>
    </nav>
    </>
  )
}

export default Navbar
