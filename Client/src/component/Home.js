import React from 'react'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <div className='parent-home'>
      <div className="child-home">
        <div className='image1-view'>
          <img src="./graduate.png" />
        </div>
        <h1>Online Exam Portal</h1>
        <div className='image2-view'>
          <NavLink to='/adminlogin' className="div1">
            <img src="./person.png" alt="Image 2" className='img2' /><h3>Admin's</h3>
          </NavLink>
          <NavLink to='/userlogin' className="div1 ">
            <img src="/group.png" alt="Image 3" className='img2' /><h3>User's</h3>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Home;
