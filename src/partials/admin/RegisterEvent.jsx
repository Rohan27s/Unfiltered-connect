import React from 'react'

const RegisterEvent = () => {
    return (
        <div className='register-event'>
        <div>
          <div>
            <h1>Register Event</h1>
            <div>id:</div>
            <input type="text" name="id" placeholder="Enter the name of the society" required />
          </div>
          <div>
            <div>category:</div>
            <input type="text" placeholder="Enter the category" />
          </div>
          <div>description:</div>
          <input type="text" placeholder="Enter the description" required />
          <div>cover:</div>
          <input type="text" placeholder="Enter the url for the logo" required />
          <div>members:</div>
          <input type="text" placeholder="Members" required />
          <div><button>Submit</button></div>
          <div>
          </div>
        </div>
      </div>
    )
}

export default RegisterEvent