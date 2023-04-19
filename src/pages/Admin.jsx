import React from 'react'
import { useState } from 'react';
import RegisterEvent from '../partials/admin/RegisterEvent';
import RegisterSociety from '../partials/admin/RegisterSociety';
import Default from '../partials/admin/Default';
import { useNavigate } from "react-router-dom";
import RegisterPastEvent from '../partials/admin/RegisterPastEvent';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import { Link } from 'react-router-dom';
const Admin = () => {
  let navigate = useNavigate();
  const [isActive, setActive] = useState(false);
  const [isActive1, setActive1] = useState(false);
  const [isActive2, setActive2] = useState(false);

  //Redirect to admin login
  const handleLogout = () => {
    let path = `/admin`;
    navigate(path);
  }
  //Set Underline under active headings
  const handleClick = () => {
    setCurr(<RegisterEvent />)
    setActive(true)
    setActive1(false)
    setActive2(false)
  }
  const handleClick1 = () => {
    setCurr(<RegisterPastEvent />)
    setActive(false)
    setActive1(true)
    setActive2(false)

  }
  const handleClick2 = () => {
    setCurr(<RegisterSociety />)
    setActive(false)
    setActive1(false)
    setActive2(true)

  }
  const [curr, setCurr] = useState(<Default />);
  return (
    <>
      <div className='main-admin'>
        {/* <Header className="head-ad
        min" /> */}
        <div className="admin-nav">
          <div className="top-admin-nav">
            {/* Logo */}
            <Link to="/" className="block logo" aria-label="Cruip">
              <img className='nav-logo' src="https://res.cloudinary.com/rohangotwal/image/upload/v1671085611/Blog/logo_cy14jc.png" alt="" />
              <h2>Unfiltered Connect</h2>
            </Link>
          </div>
          <ul className='mid-admin-nav'>
            <li><button className={isActive ? "active" : null} onClick={handleClick}>Register New Event</button></li>
            {/* <li>|</li> */}
            <li><button className={isActive1 ? "active" : null} onClick={handleClick1}>Report Past Event</button></li>
            {/* <li>|</li> */}

            <li><button className={isActive2 ? "active" : null} onClick={handleClick2}>Register Society</button></li>
          </ul>
          <div className="bottom-nav-admin">

            <button className="logout" onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div className="admin-container">
          {curr}
        </div>
      </div>
      {/* <Footer/> */}

    </>
  )
}

export default Admin