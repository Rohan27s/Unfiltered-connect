import React from 'react'
import { useState } from 'react'
import axios from 'axios'
const RegisterSociety = () => {
  
  const [details, setDetails] = useState({
    name: "",
    category: "",
    description: "",
    cover: "",
    President: "",
    VicePresident: "",
    GeneralSecretary: "",
    EventsHead: "",
    DesignHead: "",
    PRandOutreachHead: "",
    ContentHead: "",
    url1:"",
    url2:"",
    url3:"",
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
      url: 'https://unfiltered-connect-backend.vercel.app/api/societyadd',
      data : details
    };
    
    axios(config)
    .then(function (response) {
      console.log(details);
      alert("Society Added Successfully");
    })
    .catch(function (error) {
      alert("Error! Try Again");
    });
    
  }
  return (
    <div className='register-event'>
      <h1>Register Society</h1>
      <form onSubmit={handleSubmit}>
        <h3>Society Name: <p style={{color:'red',display:'inline'}}>*</p></h3><input type="text" name="name" placeholder='Please enter the name of the society' onChange={handleChange} required />
        <h3>Category: <p style={{color:'red',display:'inline'}}>*</p></h3><input type="text" name="category" placeholder='Please enter the category of the society' onChange={handleChange} required />
        <h3>Description: <p style={{color:'red',display:'inline'}}>*</p></h3><textarea type="text" name="description" placeholder='Please enter the description about the society' onChange={handleChange} required />
        <h3>Logo: <p style={{color:'red',display:'inline'}}>*</p></h3><input type="text" name="cover" placeholder='Please enter the url of the logo' onChange={handleChange} required />
        <h2>Core Members (with their contact number)</h2>
        <h3>President: <p style={{color:'red',display:'inline'}}>*</p></h3><input type="text" name="President" placeholder='Please enter the details in the following format: Name (+91 XXXXXXXXXX)' onChange={handleChange} required />
        <h3>Vice President: <p style={{color:'red',display:'inline'}}>*</p></h3><input type="text" name="VicePresident" placeholder='Please enter the details in the following format: Name (+91 XXXXXXXXXX)' onChange={handleChange} required />
        <h3>General Secretary: <p style={{color:'red',display:'inline'}}>*</p></h3><input type="text" placeholder='Please enter the details in the following format: Name (+91 XXXXXXXXXX)' name="GeneralSecretary" onChange={handleChange} required />
        <h3>Events Head: <p style={{color:'red',display:'inline'}}>*</p></h3><input type="text" name="EventsHead" placeholder='Please enter the details in the following format: Name (+91 XXXXXXXXXX)' onChange={handleChange} required />
        <h3>Design Head: <p style={{color:'red',display:'inline'}}>*</p></h3><input type="text" name="DesignHead" placeholder='Please enter the details in the following format: Name (+91 XXXXXXXXXX)' onChange={handleChange} required />
        <h3>PR & Out reach Head: <p style={{color:'red',display:'inline'}}>*</p></h3><input type="text" name="PRandOutreachHead" placeholder='Please enter the details in the following format: Name (+91 XXXXXXXXXX)' onChange={handleChange} required />
        <h3>Content Head: <p style={{color:'red',display:'inline'}}>*</p></h3><input type="text" name="ContentHead" placeholder='Please enter the details in the following format: Name (+91 XXXXXXXXXX)' onChange={handleChange} required />

        <h2>Image Slider Section</h2>
        <h3>Image 1:</h3><input type="text" name="url1" placeholder='Enter the image url' onChange={handleChange} required />
        <h3>Image 2:</h3><input type="text" name="url2" placeholder='Enter the image url' onChange={handleChange} required />
        <h3>Image 3:</h3><input type="text" name="url3" placeholder='Enter the image url' onChange={handleChange} required />
        <div><button type="submit" id="submit-form">Submit</button></div>
      </form>
    </div>
  )
}

export default RegisterSociety