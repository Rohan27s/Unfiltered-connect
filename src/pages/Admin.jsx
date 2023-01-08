import React from 'react'
import {  useState } from 'react';
import RegisterEvent from '../partials/admin/RegisterEvent';
import RegisterSociety from '../partials/admin/RegisterSociety';
import Default from '../partials/admin/Default';
import { useNavigate } from "react-router-dom";
import RegisterPastEvent from '../partials/admin/RegisterPastEvent';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
const Admin = () => {
  let navigate = useNavigate(); 
  const [isActive, setActive] = useState(false);
  const [isActive1, setActive1] = useState(false);
  const [isActive2, setActive2] = useState(false);

  //Redirect to admin login
    const handleLogout=()=>{
        let path = `/admin`; 
        navigate(path);
    }
    //Set Underline under active headings
    const handleClick =()=>{
        setCurr(<RegisterEvent />)
         setActive(true)
         setActive1(false)
         setActive2(false)    
      }
      const handleClick1 =()=>{
        setCurr(<RegisterPastEvent />)
        setActive(false)
        setActive1(true)
        setActive2(false)    
    
      }
      const handleClick2 =()=>{
        setCurr(<RegisterSociety />)
        setActive(false)
        setActive1(false)
        setActive2(true)  
    
      }
    const [curr, setCurr] = useState(<Default/>);  
    return (
      <>
      {/* <Header/> */}
        <div className='main-admin'>           
            <div className="admin-nav">
                <button className="logout"onClick={handleLogout}>Logout</button>
                <ul>
                    <li><button className={isActive ? "active" : null} onClick={handleClick}>Register New Event</button></li>
                    <li>|</li>
                    <li><button className={isActive1 ? "active" : null} onClick={handleClick1}>Register Past Event</button></li>
                    <li>|</li>

                    <li><button className={isActive2 ? "active" : null} onClick={handleClick2}>Register Society</button></li>
                </ul>
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