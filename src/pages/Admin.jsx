import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RegisterEvent from '../partials/admin/RegisterEvent';
import RegisterSociety from '../partials/admin/RegisterSociety';
import Default from '../partials/admin/Default';
import RegisterPastEvent from '../partials/admin/RegisterPastEvent';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import Societies from '../partials/admin/Societies';
import PastEvents from '../partials/admin/PastEvents';
import NewEvents from '../partials/admin/NewEvents';

const Admin = () => {
  let navigate = useNavigate();
  const [isActive, setActive] = useState(false);
  const [isActive1, setActive1] = useState(false);
  const [isActive2, setActive2] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Track the state of sidebar collapse

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      let path = `/admin`;
      navigate(path);
    }
  }, []);

  // Redirect to admin login
  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    let path = `/admin`;
    navigate(path);
  }

  // Set Underline under active headings
  const handleClick = () => {
    // setCurr(<RegisterEvent />)
    setCurr(<NewEvents />)

    setActive(true)
    setActive1(false)
    setActive2(false)
  }

  const handleClick1 = () => {
    // setCurr(<RegisterPastEvent />)
    setCurr(<PastEvents />)

    setActive(false)
    setActive1(true)
    setActive2(false)
  }

  const handleClick2 = () => {
    // setCurr(<RegisterSociety />)
    setCurr(<Societies />)

    setActive(false)
    setActive1(false)
    setActive2(true)
  }

  const [curr, setCurr] = useState(<Default />);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  }

  return (
    <>
      <div className={`main-admin ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="admin-nav">
          <div className="top-admin-nav">
            {/* Logo */}
            <button className={`sidebar-toggle ${sidebarCollapsed ? 'collapsed' : ''}`} onClick={toggleSidebar}>
              {sidebarCollapsed ? <i class="fa-solid fa-chevron-right"></i> : <i class="fa-solid fa-chevron-left"></i>}
            </button>
            <Link to="/" className="block logo" aria-label="Cruip">
              <img className='nav-logo' src="https://res.cloudinary.com/rohangotwal/image/upload/v1671085611/Blog/logo_cy14jc.png" alt="" />
              {sidebarCollapsed ? "" : <h2>Unfiltered Connect</h2>}
            </Link>
          </div>
          <ul className={`mid-admin-nav ${sidebarCollapsed ? 'collapsed' : ''}`}>
            <li><button className={isActive ? "active" : null} style={{ textTransform: "uppercase" }} onClick={handleClick}>Upcoming Events</button></li>
            <li><button className={isActive1 ? "active" : null} style={{ textTransform: "uppercase" }} onClick={handleClick1}>Past Events</button></li>
            <li><button className={isActive2 ? "active" : null} style={{ textTransform: "uppercase" }} onClick={handleClick2}>Societies</button></li>
          </ul>
          <div className="bottom-nav-admin">
            <button className={`mid-admin-nav ${sidebarCollapsed ? 'logout collapsed' : 'logout'}`} onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div className="admin-container">
          {curr}
        </div>
      </div>
    </>
  )
}

export default Admin;
