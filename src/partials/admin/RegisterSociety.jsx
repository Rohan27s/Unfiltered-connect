import React from 'react'
import { useState } from 'react'
const RegisterSociety = () => {
  const [members, setMembers] = useState({
    President:"",
    VicePresident:"",
    GeneralSecretary:"",
    EventsHead:"",
    DesignHead:"",
    PRandOutreachHead:"",
    ContentHead:""
    // President:President,
    // VicePresident:VicePresident,
    // GeneralSecretary:GeneralSecretary,
    // EventsHead:EventsHead,
    // DesignHead:DesignHead,
    // PRandOutreachHead:PRandOutreachHead,
    // ContentHead:ContentHead,
  })
  const [details, setDetails] = useState({
    id:"",
    category:"",
    description:"",
    members:members
  })
  const handleChange = (e) =>{
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
  const handleChange1 = (e) =>{
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
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(details);
  }
  return (
    <div className='register-event'>
      <form onSubmit={handleSubmit}>
        <h3>id:</h3><input type="text" name="id" onChange={handleChange}/>
        <h3>category:</h3><input type="text" name="category" onChange={handleChange}/>
        <h3>description:</h3><input type="text" name="description" onChange={handleChange}/>
        <h2>Core Members</h2>
        <h3>President:</h3><input type="text" name="President" onChange={handleChange1}/>
        <h3>VicePresident:</h3><input type="text" name="VicePresident" onChange={handleChange1}/>
        <h3>GeneralSecretary:</h3><input type="text" name="GeneralSecretary" onChange={handleChange1}/>
        <h3>EventsHead:</h3><input type="text" name="EventsHead" onChange={handleChange1}/>
        <h3>DesignHead:</h3><input type="text" name="DesignHead" onChange={handleChange1}/>
        <h3>PRandOutreachHead:</h3><input type="text" name="PRandOutreachHead" onChange={handleChange1}/>
        <h3>ContentHead:</h3><input type="text" name="ContentHead" onChange={handleChange1}/>
        <div><button type="submit">Submit</button></div>
      </form>
    </div>
  )
}

export default RegisterSociety