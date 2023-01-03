import React from 'react'
import { useEffect, useState } from 'react';
import RegisterEvent from '../partials/admin/RegisterEvent';
import RegisterSociety from '../partials/admin/RegisterSociety';
import Default from '../partials/admin/Default';
import { useNavigate } from "react-router-dom";
import RegisterPastEvent from '../partials/admin/RegisterPastEvent';
const Admin = () => {
  let navigate = useNavigate(); 

    const handleLogout=()=>{
        let path = `/admin`; 
        navigate(path);
    }
    const [curr, setCurr] = useState(<Default/>);  
    return (
        <div className='main-admin'>           
            <div className="admin-nav">
                <button className="logout"onClick={handleLogout}>Logout</button>
                <ul>
                    <li><button onClick={() => setCurr(<RegisterEvent />)}>Register new Event</button></li>
                    <li><button onClick={() => setCurr(<RegisterPastEvent />)}>Register Past Event</button></li>
                    <li><button onClick={() => setCurr(<RegisterSociety />)}>Register Society</button></li>
                </ul>
            </div>
            <div className="admin-container">
                {curr}
            </div>
        </div>
    )
}

export default Admin