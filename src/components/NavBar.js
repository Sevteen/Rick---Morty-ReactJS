import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow">
          <div className="container-fluid">
            <Link className='navbar-brand ps-3 fw-bold fs-4' to="/">Rick & Morty</Link>
            <button className="navbar-toggler me-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse px-5" id="navbarSupportedContent">
              <div className="navbar-nav ms-auto mb-2 mb-lg-0">
                <NavLink to="/" className='nav-link'>Characters List</NavLink>
                <NavLink to="/CharacterLocation" className='nav-link'>Character Location</NavLink>
              </div>
            </div>
          </div>
        </nav>
    </div>
  )
}

export default NavBar