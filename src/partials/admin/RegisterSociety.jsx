import React from 'react'
import { useState } from 'react'
const RegisterSociety = () => {
  const [members, setMembers] = useState({
    President: "",
    VicePresident: "",
    GeneralSecretary: "",
    EventsHead: "",
    DesignHead: "",
    PRandOutreachHead: "",
    ContentHead: ""
    // President:President,
    // VicePresident:VicePresident,
    // GeneralSecretary:GeneralSecretary,
    // EventsHead:EventsHead,
    // DesignHead:DesignHead,
    // PRandOutreachHead:PRandOutreachHead,
    // ContentHead:ContentHead,
  })
  const [details, setDetails] = useState({
    id: "",
    category: "",
    description: "",
    members: members
  })
  const handleChange = (e) => {
    //  const {name,value}=e.target;
    //  setDetails((prev)=>{
    //   return {...prev,[name]:value}
    //  }) 
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  }
  const handleChange1 = (e) => {
    //  const {name,value}=e.target;
    //  setDetails((prev)=>{
    //   return {...prev,[name]:value}
    //  }) 
    const { name, value } = e.target;
    setMembers({
      ...members,
      [name]: value,
    });
    console.log(members);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(details);
  }
  return (
    <div className='register-event'>
      <h1>Register Society</h1>
      <form onSubmit={handleSubmit}>
        <h3>Society Name</h3><input type="text" name="id" placeholder='Enter the name of the society' onChange={handleChange} required />
        <h3>Category:</h3><input type="text" name="category" placeholder='Enter the category of the society' onChange={handleChange} required />
        <h3>Description:</h3><textarea type="text" name="description" placeholder='Enter the description of the society' onChange={handleChange} required />
        <h3>Logo:</h3><input type="text" name="cover" placeholder='Enter the url of the logo' onChange={handleChange} required />
        <h2>Core Members</h2>
        <h3>President:</h3><input type="text" name="President" placeholder='Enter the name of the president' onChange={handleChange1} required />
        <h3>Vice President:</h3><input type="text" name="VicePresident" placeholder='Enter the name of the Vice President' onChange={handleChange1} required />
        <h3>General Secretary:</h3><input type="text" placeholder='Enter the name of the General Scretary' name="GeneralSecretary" onChange={handleChange1} required />
        <h3>Events Head:</h3><input type="text" name="EventsHead" placeholder='Enter the name of the Event Head' onChange={handleChange1} required />
        <h3>Design Head:</h3><input type="text" name="DesignHead" placeholder='Enter the name of the Design Head' onChange={handleChange1} required />
        <h3>PR & Out reach Head:</h3><input type="text" name="PRandOutreachHead" placeholder='Enter the name of the PR and out reach head' onChange={handleChange1} required />
        <h3>Content Head:</h3><input type="text" name="ContentHead" placeholder='Enter the name of the Content Head' onChange={handleChange1} required />
        <div><button type="submit" id="submit-form">Submit</button></div>
      </form>
    </div>
  )
}

export default RegisterSociety