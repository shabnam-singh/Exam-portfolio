import React from 'react'
import { NavLink } from 'react-router-dom'


function Navbar() {
  return (
    <div>
       <nav className="navbar navbar-expand-lg bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand fw-bold text-white" href="/">Exam Portal </a>
    <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
      <form className="d-flex" role="search">
       <NavLink to='/' className='btn btn-secondary'>Home</NavLink>
      </form>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar