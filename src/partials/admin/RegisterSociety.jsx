import React from 'react'
import { useState,useRef } from 'react'
import axios from 'axios'
const RegisterSociety = () => {
  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const ref8 = useRef(null);
  const ref9 = useRef(null);
  const ref10 = useRef(null);
  const ref11 = useRef(null);
  const ref12 = useRef(null);
  const ref13 = useRef(null);

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
      setDetails("");
      ref.current.value = '';
      ref1.current.value = '';
      ref2.current.value = '';
      ref3.current.value = '';
      ref4.current.value = '';
      ref5.current.value = '';
      ref6.current.value = '';
      ref7.current.value = '';
      ref8.current.value = '';
      ref9.current.value = '';
      ref10.current.value = '';
      ref11.current.value = '';
      ref12.current.value = '';
      ref13.current.value = '';
    })
    .catch(function (error) {
      alert("Error! Try Again");
    });
    
  }
  return (
    <div className='register-event'>
      <h1>Register Society</h1>
      <form onSubmit={handleSubmit}>
        <h3>Society Name: <p style={{color:'red',display:'inline'}}>*</p></h3><input ref={ref} type="text" name="name" placeholder='Please enter the name of the society' onChange={handleChange} required />
        <h3>Category: <p style={{color:'red',display:'inline'}}>*</p></h3><input ref={ref1}type="text" name="category" placeholder='Please enter the category of the society' onChange={handleChange} required />
        <h3>Description: <p style={{color:'red',display:'inline'}}>*</p></h3><textarea ref={ref2}type="text" name="description" placeholder='Please enter the description about the society' onChange={handleChange} required />
        <h3>Logo: <p style={{color:'red',display:'inline'}}>*</p></h3><input ref={ref3}type="text" name="cover" placeholder='Please enter the url of the logo' onChange={handleChange} required />
        <h2>Core Members (with their contact number)</h2>
        <h3>President: <p style={{color:'red',display:'inline'}}>*</p></h3><input ref={ref4}type="text" name="President" placeholder='Please enter the details in the following format: Name (+91 XXXXXXXXXX)' onChange={handleChange} required />
        <h3>Vice President: <p style={{color:'red',display:'inline'}}>*</p></h3><input ref={ref5}type="text" name="VicePresident" placeholder='Please enter the details in the following format: Name (+91 XXXXXXXXXX)' onChange={handleChange} required />
        <h3>General Secretary: <p style={{color:'red',display:'inline'}}>*</p></h3><input ref={ref6}type="text" placeholder='Please enter the details in the following format: Name (+91 XXXXXXXXXX)' name="GeneralSecretary" onChange={handleChange} required />
        <h3>Events Head: <p style={{color:'red',display:'inline'}}>*</p></h3><input ref={ref7}type="text" name="EventsHead" placeholder='Please enter the details in the following format: Name (+91 XXXXXXXXXX)' onChange={handleChange} required />
        <h3>Design Head: <p style={{color:'red',display:'inline'}}>*</p></h3><input ref={ref8} type="text" name="DesignHead" placeholder='Please enter the details in the following format: Name (+91 XXXXXXXXXX)' onChange={handleChange} required />
        <h3>PR & Out reach Head: <p style={{color:'red',display:'inline'}}>*</p></h3><input ref={ref9} type="text" name="PRandOutreachHead" placeholder='Please enter the details in the following format: Name (+91 XXXXXXXXXX)' onChange={handleChange} required />
        <h3>Content Head: <p style={{color:'red',display:'inline'}}>*</p></h3><input ref={ref10} type="text" name="ContentHead" placeholder='Please enter the details in the following format: Name (+91 XXXXXXXXXX)' onChange={handleChange} required />

        <h2>Photo Gallery Section </h2>
        <h3>Image 1: <p style={{color:'red',display:'inline'}}>*</p></h3><input ref={ref11} type="text" name="url1" placeholder='Please enter the image url' onChange={handleChange} required />
        <h3>Image 2: <p style={{color:'red',display:'inline'}}>*</p></h3><input ref={ref12} type="text" name="url2" placeholder='Please enter the image url' onChange={handleChange} required />
        <h3>Image 3: <p style={{color:'red',display:'inline'}}>*</p></h3><input ref={ref13} type="text" name="url3" placeholder='Please enter the image url' onChange={handleChange} required />
        <div><button type="submit" id="submit-form">Submit</button></div>
      </form>
    </div>
  )
}

export default RegisterSociety