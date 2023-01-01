import React from 'react'
import { useState } from 'react'

const RegisterEvent = () => {

  const [details, setDetails] = useState({
    id: "",
    category: "",
    description: "",
    President: "",
    VicePresident: "",
    GeneralSecretary: "",
    EventsHead: "",
    DesignHead: "",
    PRandOutreachHead: "",
    ContentHead: ""
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
    console.log(details);
  }
  const Field = () => {
    return <><h3>Society Name:</h3><input type="text" name="content" placeholder='Enter the names of the society' onChange={handleChange} required />
      <h3>Logo:</h3><input type="text" name="content" placeholder='Enter the url of logo of the society' onChange={handleChange} required /></>
  }
  const [societies, setSocieties] = useState([])
  const addMore = event => {
    setSocieties(societies.concat(<Field />));
    console.log(societies);
  }
  return (
    <div className='register-event'>
      <h1>Register an Event</h1>
      <form onSubmit={handleSubmit}>
        <h3>Event Title</h3><input type="text" name="title" placeholder='Enter the name of the event' onChange={handleChange} required />
        <h3>Event Presenters:</h3><input type="text" name="content" placeholder='Enter the names of the societies/presenters' onChange={handleChange} required />
        <h2>Names of the Societies with their logo:</h2>
        <a className='addMore' onClick={addMore}>Add more</a>

        <h3>Society Name:</h3><input type="text" name="content" placeholder='Enter the names of the society' onChange={handleChange} required />
        <h3>Logo:</h3><input type="text" name="content" placeholder='Enter the url of logo of the society' onChange={handleChange} required />
        {societies}
        <h3>Description:</h3><textarea type="text" name="description" placeholder='Enter the description of the society' onChange={handleChange} required />
        <h3>Event Date:</h3><input type="text" name="date" placeholder='Enter the date of the event' onChange={handleChange} required />
        <h3>Venue:</h3><input type="text" name="venue" placeholder='Enter the venue of the event' onChange={handleChange} required />
        <h3>Time:</h3><input type="text" name="time" placeholder='Enter the time of the event' onChange={handleChange} required />
        <h3>Event Poster:</h3><input type="text" name="img" placeholder='Enter the url for the poster of the event' onChange={handleChange} required />

        <h2>FAQ Section</h2>
        <h3>Question 1:</h3><input type="text" name="img" placeholder='Enter the first question' onChange={handleChange} required />
        <h3>Answer 1:</h3><input type="text" name="img" placeholder='Enter the answer for the above question' onChange={handleChange} required />

        <h3>Question 2:</h3><input type="text" name="img" placeholder='Enter the second question' onChange={handleChange} />
        <h3>Answer 2:</h3><input type="text" name="img" placeholder='Enter the answer for the above question' onChange={handleChange} />

        <h3>Question 3:</h3><input type="text" name="img" placeholder='Enter the third question' onChange={handleChange} />
        <h3>Answer 3:</h3><input type="text" name="img" placeholder='Enter the answer for the above question' onChange={handleChange} />
        <div><button type="submit" id="submit-form">Submit</button></div>
      </form>
    </div>
  )
}

export default RegisterEvent