import React from 'react'
import { useState } from 'react'
import axios from  'axios'
const RegisterPastEvent = () => {
  const [details, setDetails] = useState({
    title: "",
    content: "",
    Name:"",
    Logo:"",
    description: "",
    date: "",
    venue: "",
    time: "",
    img: "",
    First: "",
    Second:"",
    Third:""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    var config = {
      method: 'post',
      url: 'https://unfiltered-connect-backend.vercel.app/api/pasteventadd',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : details
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className='register-event'>
      <h1>Register a past Event</h1>
      <form onSubmit={handleSubmit}>
        <h3>Event Title</h3><input type="text" name="title" placeholder='Enter the name of the event' onChange={handleChange} required />
        <h3>Event Presenters:</h3><input type="text" name="content" placeholder='Enter the names of the societies/presenters' onChange={handleChange} required />
        <h3>Society Name:</h3><input type="text" name="Name" placeholder='Enter the names of the society' onChange={handleChange} required />
        <h3>Society Logo:</h3><input type="text" name="Logo" placeholder='Enter the url for logo of the society' onChange={handleChange} required />
        <h3>Event Poster:</h3><input type="text" name="img" placeholder='Enter the url for the poster of the event' onChange={handleChange} required />
        <h3>Description:</h3><textarea type="text" name="description" placeholder='Enter the description of the society' onChange={handleChange} required />
        <h3>Event Date:</h3><input type="text" name="date" placeholder='Enter the date of the event' onChange={handleChange} required />
        <h3>Venue:</h3><input type="text" name="venue" placeholder='Enter the venue of the event' onChange={handleChange} required />
        <h3>Time:</h3><input type="text" name="time" placeholder='Enter the time of the event' onChange={handleChange} required />       

        <h2>Event  Winners</h2>
        <h3>First:</h3><input type="text" name="First" placeholder='Enter the name' onChange={handleChange}  />
        <h3>Second:</h3><input type="text" name="Second" placeholder='Enter the name' onChange={handleChange}  />
        <h3>Third:</h3><input type="text" name="Third" placeholder='Enter the name' onChange={handleChange}  />
       
        <div><button type="submit" id="submit-form">Submit</button></div>
      </form>
    </div>
  )
}

export default RegisterPastEvent