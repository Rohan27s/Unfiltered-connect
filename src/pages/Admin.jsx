import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RegisterEvent from '../partials/admin/RegisterEvent';
import RegisterSociety from '../partials/admin/RegisterSociety';
import Default from '../partials/admin/Default';
import RegisterPastEvent from '../partials/admin/RegisterPastEvent';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

const Admin = () => {
  let navigate = useNavigate();
  const [isActive, setActive] = useState(false);
  const [isActive1, setActive1] = useState(false);
  const [isActive2, setActive2] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Track the state of sidebar collapse

  // Redirect to admin login
  const handleLogout = () => {
    let path = `/admin`;
    navigate(path);
  }

  // Set Underline under active headings
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
            {sidebarCollapsed?<i class="fa-solid fa-chevron-right"></i>:<i class="fa-solid fa-chevron-left"></i> }
          </button>
            <Link to="/" className="block logo" aria-label="Cruip">
              <img className='nav-logo' src="https://res.cloudinary.com/rohangotwal/image/upload/v1671085611/Blog/logo_cy14jc.png" alt="" />
              {sidebarCollapsed ? "" : <h2>Unfiltered Connect</h2>}
            </Link>
          </div>
          <ul className={`mid-admin-nav ${sidebarCollapsed ? 'collapsed' : ''}`}>
            <li><button className={isActive ? "active" : null} onClick={handleClick}>Register New Event</button></li>
            <li><button className={isActive1 ? "active" : null} onClick={handleClick1}>Report Past Event</button></li>
            <li><button className={isActive2 ? "active" : null} onClick={handleClick2}>Register Society</button></li>
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
