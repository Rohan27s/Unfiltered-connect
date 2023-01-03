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
        alert("Past Event Registered Successfully");
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      alert("Error! Please Try Again")

      console.log(error);
    });
  }

  return (
    <div className='register-event'>
      <h1>Register a past Event</h1>
      <form onSubmit={handleSubmit}>
        <h3>Event Title <p style={{color:'red',display:'inline'}}>*</p></h3><input type="text" name="title" placeholder='Please enter the name of the event' onChange={handleChange} required />
        <h3>Event Presenters: <p style={{color:'red',display:'inline'}}>*</p></h3><input type="text" name="content" placeholder='Please enter the names of the societies/presenters' onChange={handleChange} required />
        <h3>Society Name: <p style={{color:'red',display:'inline'}}>*</p></h3><input type="text" name="Name" placeholder='Please enter the names of the society' onChange={handleChange} required />
        <h3>Society Logo: <p style={{color:'red',display:'inline'}}>*</p></h3><input type="text" name="Logo" placeholder='Please enter the url for logo of the society' onChange={handleChange} required />
        <h3>Event Poster: <p style={{color:'red',display:'inline'}}>*</p></h3><input type="text" name="img" placeholder='Please enter the url for the poster of the event' onChange={handleChange} required />
        <h3>Description: <p style={{color:'red',display:'inline'}}>*</p></h3><textarea type="text" name="description" placeholder='Please enter the description of the society' onChange={handleChange} required />
        <h3>Event Date: <p style={{color:'red',display:'inline'}}>*</p></h3><input type="text" name="date" placeholder='Please enter the date of the event' onChange={handleChange} required />
        <h3>Venue: <p style={{color:'red',display:'inline'}}>*</p></h3><input type="text" name="venue" placeholder='Please enter the venue of the event' onChange={handleChange} required />
        <h3>Time: <p style={{color:'red',display:'inline'}}>*</p></h3><input type="text" name="time" placeholder='Please enter the time of the event' onChange={handleChange} required />       

        <h2>Event  Winners</h2>
        <h3>First:</h3><input type="text" name="First" placeholder='Please enter the name' onChange={handleChange}  />
        <h3>Second:</h3><input type="text" name="Second" placeholder='Please enter the name' onChange={handleChange}  />
        <h3>Third:</h3><input type="text" name="Third" placeholder='Please enter the name' onChange={handleChange}  />
       
        <div><button type="submit" id="submit-form">Submit</button></div>
      </form>
    </div>
  )
}

export default RegisterPastEvent