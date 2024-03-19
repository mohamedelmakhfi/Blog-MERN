import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {FaBars} from "react-icons/fa"
import {AiOutlineClose} from "react-icons/ai"


const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false)
  const closeNavBar = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false)
    } else {
      setIsNavShowing(true)
    }
  }
  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className='nav__logo' onClick={closeNavBar}>
          <img src=""  alt="Logo"/>
        </Link>
        {isNavShowing && <ul className="nav__menu">
          <li><Link to={"/profile/gdfsg"} onClick={closeNavBar}>Blogmed</Link></li>
          <li><Link to={"create"} onClick={closeNavBar}>Create Post</Link></li>
          <li><Link to={"/authors"} onClick={closeNavBar}>Authors</Link></li>
          <li><Link to={"/Logout"} onClick={closeNavBar}>Logout  </Link></li>
        </ul>}
        <button className="nav__toggle-btn" onClick={() => setIsNavShowing(!isNavShowing)}>
         {isNavShowing ? <AiOutlineClose/> : <FaBars />}
        </button>
      </div>
    </nav>
  )
}

export default Header