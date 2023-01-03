import React from 'react'
import { useState } from 'react'
import axios from  'axios'
const RegisterEvent = () => {
  const [details, setDetails] = useState({
    title: "",
    content: "",
    Name:"",
    Logo:"",
    registerLink:"",
    description: "",
    date: "",
    venue: "",
    time: "",
    img: "",
    question1: "",
    answer1:""
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
      url: 'https://unfiltered-connect-backend.vercel.app/api/eventadd',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : details
    };
    
    axios(config)
    .then(function (response) {
      alert("New Event Registered Successfully");
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      alert("Error! Please Try Again")
      console.log(error);
    });
  }

  return (
    <div className='register-event'>
      <h1>Register a new Event</h1>
      <form onSubmit={handleSubmit}>
        <h3>Event Title</h3><input type="text" name="title" placeholder='Enter the name of the event' onChange={handleChange} required />
        <h3>Event Presenters:</h3><input type="text" name="content" placeholder='Enter the names of the societies/presenters' onChange={handleChange} required />
        <h3>Society Name:</h3><input type="text" name="Name" placeholder='Enter the names of the society' onChange={handleChange} required />
        <h3>Society Logo:</h3><input type="text" name="Logo" placeholder='Enter the url for logo of the society' onChange={handleChange} required />
        <h3>Event Poster:</h3><input type="text" name="img" placeholder='Enter the url for the poster of the event' onChange={handleChange} required />
        <h3>Registration Link:</h3><input type="text" name="registerLink" placeholder='Enter the url for the registrations of the event' onChange={handleChange} required />
        <h3>Description:</h3><textarea type="text" name="description" placeholder='Enter the description of the society' onChange={handleChange} required />
        <h3>Event Date:</h3><input type="text" name="date" placeholder='Enter the date of the event' onChange={handleChange} required />
        <h3>Venue:</h3><input type="text" name="venue" placeholder='Enter the venue of the event' onChange={handleChange} required />
        <h3>Time:</h3><input type="text" name="time" placeholder='Enter the time of the event' onChange={handleChange} required />       

        <h2>FAQ Section</h2>
        <h3>Question:</h3><input type="text" name="question1" placeholder='Enter the  question' onChange={handleChange} required />
        <h3>Answer:</h3><input type="text" name="answer1" placeholder='Enter the answer for the above question' onChange={handleChange} required />
       
        <div><button type="submit" id="submit-form">Submit</button></div>
      </form>
    </div>
  )
}

export default RegisterEvent