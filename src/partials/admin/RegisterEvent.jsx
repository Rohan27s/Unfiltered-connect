import React from 'react'

const RegisterEvent = () => {
    return (
        <div className='register-event'>
            <h1>Register event</h1>
            <form action="" className='event-form'>
                <li><label/>title:<input type="text" /></li>
                <li><label/>content:<input type="text" /></li>
                <li><label/>societies:<input multiple={true} /></li>
                <li><label/>description:<input type="textarea" /></li>
                <li><label/>date:<input type="text" /></li>
                <li><label/>venue:<input type="text" /></li>
                <li><label/>time:<input type="text" /></li>
                <li><label/>img:<input type="text" /></li>
                <li><label/>registerLink:<input type="text" /></li>
                <li><label/>questions:<input multiple={true} /></li>
                <li><button>Submit</button></li>
            </form>
        </div>
    )
}

export default RegisterEvent