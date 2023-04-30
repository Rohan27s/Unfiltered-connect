import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'
import emailjs from '@emailjs/browser';
import DatePicker from "react-datepicker";
import TimeRangePicker from '@wojtekmaj/react-timerange-picker'
import "react-datepicker/dist/react-datepicker.css";
import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css';
import 'react-clock/dist/Clock.css';
const RegisterEvent = () => {
  const formRef = useRef(null);
  const [startDate, setStartDate] = useState(new Date());

  const [societyinputValues, setsocietyInputValues] = useState([{ name: "", logo: "" }]);
  const [societyComponent, setsocietyComponent] = useState([]);

  const [faqinputValues, setfaqInputValues] = useState([{ ques: "", ans: "" }]);
  const [faqComponent, setfaqComponent] = useState([]);

  const [emails, setEmails] = useState();
  const [details, setDetails] = useState({
    title: "",
    content: "",
    registerLink: "",
    description: "",
    date: "",
    venue: "",
    time: "",
    img: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  }
  //API call for getting all the emails which all subscribed to our newsletter
  useEffect(() => {
    var config1 = {
      method: 'get',
      url: 'https://unfiltered-connect-backend.vercel.app/api/allemail',
    };
    axios(config1)
      .then(function (response) {
        setEmails(response.data);
        // console.log(emails);
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [emails]);


  const handleSubmit = (e) => {
    e.preventDefault();
    //API call for saving the new event in our MongoDB
    const societies = societyinputValues.map(({ name, logo }) => ({ name, logo }));
    const faq = faqinputValues.map(({ ques, ans }) => ({ ques, ans }));
    const newDetails = { ...details, societies, faq };
    console.log(newDetails);
    var config = {
      method: 'post',
      url: 'https://unfiltered-connect-backend.vercel.app/api/eventadd',
      headers: {
        'Content-Type': 'application/json'
      },
      data: newDetails
    };

    axios(config)
      .then(function (response) {
        alert("New Event Registered Successfully");
        // console.log(JSON.stringify(response.data));
        // emails.map((data) => (
        //   emailjs.send('unfilteredconnect', 'template_ypg5vgn', data, 'IzhHvKXIND2eDZuyD')
        //     .then((result) => {
        //       // console.log(result.text);
        //     }).catch((result) => {
        //       // console.log(result.text);
        //     })
        // ))
        setDetails({
          title: "",
          content: "",
          registerLink: "",
          description: "",
          date: "",
          venue: "",
          time: "",
          img: "",
        });
        formRef.current.reset();
      })
      .catch(function (error) {
        alert("Error! Please Try Again")
      });
  }

  const handleRemoveSocietyFields = (e, index) => {
    e.preventDefault();
    const newSocietyComponent = [...societyComponent];
    const newSocietyInputValues = [...societyinputValues];
    newSocietyComponent.splice(index, 1);
    newSocietyInputValues.splice(index, 1);
    setsocietyComponent(newSocietyComponent);
    setsocietyInputValues(newSocietyInputValues);
  };

  const handleRemoveFaqFields = (e, index) => {
    e.preventDefault();

    const newFaqComponent = [...faqComponent];
    newFaqComponent.splice(index, 1);

    const newFaqInputValues = [...faqinputValues];
    newFaqInputValues.splice(index, 1);

    setfaqComponent(newFaqComponent);
    setfaqInputValues(newFaqInputValues);
  };

  const societyhandleInputChange = (e, index, field) => {
    const newInputValues = [...societyinputValues];
    const newValue = e.target.value;
    newInputValues[index] = { ...newInputValues[index], [field]: newValue };
    setsocietyInputValues(newInputValues);
    console.log(societyinputValues);

  };

  const addSociety = (e) => {
    e.preventDefault();
    const newSocietyComponent = [
      ...societyComponent,
      <li key={societyComponent.length}>
        <div className="dynamic-single-buttons">
          <button className='remove-btn' onClick={(e) => handleRemoveSocietyFields(e, societyComponent.length)}>Remove</button>
        </div>
        <h3>Society Name: <p style={{ color: 'red', display: 'inline' }}>*</p></h3>
        <input type="text" onChange={(e) => societyhandleInputChange(e, societyComponent.length, "name")} name="Name" placeholder='Please enter the names of the society' required />
        <h3>Society Logo: <p style={{ color: 'red', display: 'inline' }}>*</p></h3>
        <input type="text" onChange={(e) => societyhandleInputChange(e, societyComponent.length, "logo")} name="Logo" placeholder='Please enter the url for the logo of the society' required />
      </li>
    ];
    setsocietyComponent(newSocietyComponent);
    const newSocietyInputValues = [...societyinputValues, { name: "", logo: "" }];
    setsocietyInputValues(newSocietyInputValues);
  };
  const addfaq = (e) => {
    e.preventDefault();
    const newFaqComponent = [...faqComponent, <li key={faqComponent.length}>
      <div className="dynamic-single-buttons"> <button className='remove-btn' onClick={(e) => handleRemoveFaqFields(e, faqComponent.length)}>Remove</button></div>
      <h3>Question <p style={{ color: 'red', display: 'inline' }}>*</p></h3><input type="text" onChange={(e) => faqhandleInputChange(e, faqComponent.length, "ques")} name="Question" placeholder='Please enter the question' required />
      <h3>Answer <p style={{ color: 'red', display: 'inline' }}>*</p></h3><input type="text" onChange={(e) => faqhandleInputChange(e, faqComponent.length, "ans")} name="Answer" placeholder='Please enter the answer' required />
    </li>];
    setfaqComponent(newFaqComponent);
    const newfaqInputValues = [...faqinputValues, { ques: "", ans: "" }];
    setfaqInputValues(newfaqInputValues);

  }

  const faqhandleInputChange = (e, index, field) => {
    const newInputValues = [...faqinputValues];
    if (!newInputValues[index]) {
      newInputValues[index] = {};
    }
    newInputValues[index][field] = e.target.value;
    setfaqInputValues(newInputValues);
    console.log(faqinputValues);
  };


  return (
    <div className='register-event'>
      <h1>Register a New Event</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <h3>Event Title: <p style={{ color: 'red', display: 'inline' }}>*</p></h3><input type="text" name="title" placeholder='Please enter the name of the event' onChange={handleChange} required />
        <h3>Event Presenters: <p style={{ color: 'red', display: 'inline' }}>*</p></h3><input type="text" name="content" placeholder='Please enter the names of the societies/presenters' onChange={handleChange} required />
        <div className="event-winner-head">
          <h2>Hosting Societies:</h2>
          <button onClick={addSociety} name="addSocietyButton">Add more</button>
        </div>
        <div className="society-names">
          {societyComponent.map((element) => (
            // Render each element in the list array
            element
          ))}
        </div>
        <h3>Event Poster: <p style={{ color: 'red', display: 'inline' }}>*</p></h3><input type="text" name="img" placeholder='Please enter the url for the poster of the event' onChange={handleChange} required />
        <h3>Registration Link: <p style={{ color: 'red', display: 'inline' }}>*</p></h3><input type="text" name="registerLink" placeholder='Please enter the url for the registrations of the event' onChange={handleChange} required />
        <h3>Description: <p style={{ color: 'red', display: 'inline' }}>*</p></h3><textarea type="text" name="description" placeholder='Please enter the description of the society' onChange={handleChange} required />
        {/* <h3>Event Date: <p style={{ color: 'red', display: 'inline' }}>*</p></h3><input ref={ref7} type="text" name="date" placeholder='Please enter the date of the event' onChange={handleChange} required /> */}
        <h3>Event Date: <p style={{ color: 'red', display: 'inline' }}>*</p></h3>    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />


        <h3>Venue: <p style={{ color: 'red', display: 'inline' }}>*</p></h3><input type="text" name="venue" placeholder='Please enter the venue of the event' onChange={handleChange} required />
        {/* <h3>Time: <p style={{ color: 'red', display: 'inline' }}>*</p></h3><input ref={ref9} type="text" name="time" placeholder='Please enter the time of the event' onChange={handleChange} required /> */}
        <h3>Time: <p style={{ color: 'red', display: 'inline' }}>*</p></h3><span className='time-range'><TimeRangePicker className="time-range-picker" onChange={handleChange} /></span>

        <div className="event-winner-head">
          <h2>FAQ Section</h2>
          <button onClick={addfaq} name="addfaqButton">Add more</button>

        </div>
        <div className="faq-list">
          {faqComponent.map((element) => (
            // Render each element in the list array
            element
          ))}
        </div>
        <div><button type="submit" id="submit-form">Publish</button></div>
      </form>
    </div>
  )
}

export default RegisterEvent