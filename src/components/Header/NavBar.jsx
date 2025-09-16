import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

export const NavBar = () => {
  return (
    <div className='navbar'>
      <div className="nav-search">
        <input type="text" placeholder='Encuentra la carta que buscas'/>
        <button className='navbutton'><b>Buscar</b></button>
      </div>
      <div className="nav-links">
        <Link to="/explore" className="nav-link">Explorar</Link>
        <Link to="/sell-cards" className="nav-link">Vender</Link>
      </div>
    </div>
  )
}
