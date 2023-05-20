import React, { useState, useRef } from 'react';
import axios from 'axios';
const RegisterSociety = () => {
  const formRef = useRef(null);

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
    // API call for adding society in our mongo db
    var config = {
      method: 'post',
      url: 'https://unfiltered-connect-backend.vercel.app/api/societyadd',
      data : details
    };
    
    axios(config)
    .then(function (response) {
      console.log(details);
      alert("Society Added Successfully");
      setDetails({
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
      });
      formRef.current.reset();
    })
    .catch(function (error) {
      alert("Error! Try Again");
    });
    
  }
  return (
    <div className='register-event'>
      <h1>Register Society</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <h3>Society Name: <p style={{color:'red',display:'inline'}}>*</p></h3><input type="text" name="name" placeholder='Please enter the name of the society' onChange={handleChange} required />
        <h3>Category: <p style={{color:'red',display:'inline'}}>*</p></h3><input type="text" name="category" placeholder='Please enter the category of the society' onChange={handleChange} required />
        <h3>Description: <p style={{color:'red',display:'inline'}}>*</p></h3><textarea type="text" name="description" placeholder='Please enter the description about the society' onChange={handleChange} required />
        <h3>Logo: <p style={{color:'red',display:'inline'}}>*</p></h3><input type="text" name="cover" placeholder='Please enter the url of the logo' onChange={handleChange} required />
       
       
        
        <div className="event-winner-head">
          <h2>Core Members (with their contact number)</h2>
          <button >Add more</button>
        </div>
        <div className="pos-holders">
          <h3>Designation Name</h3><input type="text" placeholder='Please enter the name of the Designation' />
          <h3>Designation Holder</h3><input placeholder='Please enter the name of Designation holder' />
          <h3>Mobile Number</h3><input placeholder='Please enter the name of Designation holder' />

          {/* {positions} */}
        </div>
        <h2>Photo Gallery Section </h2>
        <h3>Image 1: <p style={{color:'red',display:'inline'}}>*</p></h3><input  type="text" name="url1" placeholder='Please enter the image url' onChange={handleChange} required />
        <h3>Image 2: <p style={{color:'red',display:'inline'}}>*</p></h3><input  type="text" name="url2" placeholder='Please enter the image url' onChange={handleChange} required />
        <h3>Image 3: <p style={{color:'red',display:'inline'}}>*</p></h3><input  type="text" name="url3" placeholder='Please enter the image url' onChange={handleChange} required />
        <div><button type="submit" id="submit-form">Submit</button></div>
      </form>
    </div>
  )
}

export default RegisterSociety