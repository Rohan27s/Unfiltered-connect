import React from 'react'
import { useState } from 'react'

const RegisterEvent = () => {
  const [societyDetails, setSocietyDetails] = useState([{}]);
  const [questions, setQuestions] = useState([{}]);
  const [societies, setSocieties] = useState([]) //components adding
  const [faqs, setFaqs] = useState([]) //components adding
  const [details, setDetails] = useState({
    title: "",
    content: "",
    societies: societyDetails,
    description: "",
    date: "",
    venue: "",
    time: "",
    img: "",
    questions: questions
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  }
  const handleChange1 = (e) => {
    const { name, value } = e.target;
    const Name="", Logo="";
    if ([name] === "Name") {
      Name = value      
    }
    else if([name] === "Logo") {
      Logo = value      
    }
    const society = {
      Name:Name,
      Logo:Logo
    }
    setSocietyDetails([
      ...societyDetails, society
    ]);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(societyDetails);
    console.log(details);
  }
  const Field = () => {
    return <><h3>Society Name:</h3><input type="text" name="Name" placeholder='Enter the names of the society' onChange={handleChange1} required />
      <h3>Logo:</h3><input type="text" name="Logo" placeholder='Enter the url for logo of the society' onChange={handleChange1} required /></>
  }
  const Faq = () => {
    return <><h3>Question:</h3><input type="text" name="question" placeholder='Enter the question' onChange={handleChange} required />
      <h3>Answer:</h3><input type="text" name="answer" placeholder='Enter the answer for the above question' onChange={handleChange} required /></>
  }


  const addMore = () => {
    setSocieties(societies.concat(<Field />));
  }
  const addMorefaq = () => {
    setFaqs(faqs.concat(<Faq />));
  }
  return (
    <div className='register-event'>
      <h1>Register an Event</h1>
      <form onSubmit={handleSubmit}>
        <h3>Event Title</h3><input type="text" name="title" placeholder='Enter the name of the event' onChange={handleChange} required />
        <h3>Event Presenters:</h3><input type="text" name="content" placeholder='Enter the names of the societies/presenters' onChange={handleChange} required />
        <h2>Names of the Societies with their logo:</h2>
        <a className='addMore' onClick={addMore}>Add more</a>
        <h3>Society Name:</h3><input type="text" name="Name" placeholder='Enter the names of the society' onChange={handleChange1} required />
        <h3>Logo:</h3><input type="text" name="Logo" placeholder='Enter the url for logo of the society' onChange={handleChange1} required />
        {societies}
        <h3>Description:</h3><textarea type="text" name="description" placeholder='Enter the description of the society' onChange={handleChange} required />
        <h3>Event Date:</h3><input type="text" name="date" placeholder='Enter the date of the event' onChange={handleChange} required />
        <h3>Venue:</h3><input type="text" name="venue" placeholder='Enter the venue of the event' onChange={handleChange} required />
        <h3>Time:</h3><input type="text" name="time" placeholder='Enter the time of the event' onChange={handleChange} required />
        <h3>Event Poster:</h3><input type="text" name="img" placeholder='Enter the url for the poster of the event' onChange={handleChange} required />

        <h2>FAQ Section</h2>
        <a className='addMore' onClick={addMorefaq}>Add more</a>

        <h3>Question:</h3><input type="text" name="question" placeholder='Enter the  question' onChange={handleChange} required />
        <h3>Answer:</h3><input type="text" name="answer" placeholder='Enter the answer for the above question' onChange={handleChange} required />
        {faqs}
        <div><button type="submit" id="submit-form">Submit</button></div>
      </form>
    </div>
  )
}

export default RegisterEvent