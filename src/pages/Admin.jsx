import React from 'react'
import { useEffect, useState } from 'react';
import RegisterEvent from '../partials/admin/RegisterEvent';
import RegisterSociety from '../partials/admin/RegisterSociety';
import Default from '../partials/admin/Default';

const Admin = () => {
    const [curr, setCurr] = useState(<Default/>);  

    return (
        <div className='main-admin'>
            <div className="admin-head">
                <h1>Welcome Back Admin</h1>
            </div>
            <div className="admin-nav">
                <ul>
                    <li><button onClick={() => setCurr(<RegisterEvent />)}>Register Event</button></li>
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