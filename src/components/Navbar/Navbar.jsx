import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="navbar-left">
      <button className='navbtn'>SKINSTRIC</button>
      <h5>[ INTRO ]</h5>
         </div>
         <div className="navbar-right">
            <button className='btn-right'>ENTER CODE</button>
         </div>
    </div>
  )
}

export default Navbar
