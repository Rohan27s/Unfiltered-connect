import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'
import emailjs from '@emailjs/browser';

const RegisterEvent = () => {
  const formRef = useRef(null);
  const [emails, setEmails] = useState();

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

  const [eventData, setEventData] = useState({
    title: '',
    content: '',
    societies: [{ name: '', logo: '' }],
    description: '',
    date: '',
    venue: '',
    fromTime: '', // Updated: Added fromTime and toTime
    toTime: '', // Updated: Added fromTime and toTime
    img: '',
    registerLink: '',
    faq: [{ ques: '', ans: '' }],
  });

  const handleInputChange = (e, index, field, subField) => {
    const { name, value } = e.target;
    const updatedEventData = { ...eventData };

    if (subField) {
      if (!updatedEventData[field]) {
        updatedEventData[field] = [{ [subField]: value }];
      } else if (index >= 0 && index < updatedEventData[field].length) {
        updatedEventData[field][index][subField] = value;
      }
    } else {
      if (index >= 0 && index < updatedEventData[field].length) {
        updatedEventData[field][index][name] = value;
      } else if (field === 'fromTime' || field === 'toTime') { // Updated: Check for fromTime and toTime
        updatedEventData[field] = value;
        updatedEventData['time'] = mergeTime(updatedEventData); // Updated: Call mergeTime
      } else {
        updatedEventData[name] = value;
      }
    }

    setEventData(updatedEventData);
  };

  const mergeTime = (data) => {
    const fromTime = data.fromTime || '';
    const toTime = data.toTime || '';
    return `${fromTime} to ${toTime}`;
  };


  const handleAddField = (field) => {
    const updatedEventData = { ...eventData };
    if (!updatedEventData[field]) {
      updatedEventData[field] = [];
    }
    updatedEventData[field].push(field === 'societies' ? { name: '', logo: '' } : { ques: '', ans: '' });
    setEventData(updatedEventData);
  };

  const handleRemoveField = (index, field) => {
    const updatedEventData = { ...eventData };
    updatedEventData[field].splice(index, 1);
    setEventData(updatedEventData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the eventData to the database or perform any other necessary actions
    const formattedDate = formatDate(eventData.date);
    const updatedEventData = { ...eventData, date: formattedDate };
    console.log(eventData);
    var config = {
      method: 'post',
      url: 'https://unfiltered-connect-backend.vercel.app/api/eventadd',
      headers: {
        'Content-Type': 'application/json'
      },
      data: updatedEventData
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
        setEventData({
          title: '',
          content: '',
          societies: [{ name: '', logo: '' }],
          description: '',
          date: '',
          venue: '',
          fromTime: '', // Updated: Added fromTime and toTime
          toTime: '', // Updated: Added fromTime and toTime
          img: '',
          registerLink: '',
          faq: [{ ques: '', ans: '' }],
        });
        formRef.current.reset();
      })
      .catch(function (error) {
        alert("Error! Please Try Again")
      });
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  return (
    <div className='register-event'>
      <h1>Register a New Event</h1>

      <form onSubmit={handleSubmit} ref={formRef}>
        <h3>Title: <p style={{ color: 'red', display: 'inline' }}>*</p></h3>
        <input
          type="text"
          name="title"
          value={eventData.title}
          onChange={handleInputChange}
          required
        />
        <br />

        <h3>Presenters: <p style={{ color: 'red', display: 'inline' }}>*</p></h3>
        <input
          name="content"
          type='text'
          value={eventData.content}
          onChange={handleInputChange}
          required
        />
        <br />
        <div className="event-winner-head">
          <h2>Societies:</h2>
          <button className='addSocbtn' type="button" onClick={() => handleAddField('societies')}>
          Add Society
        </button>
        </div>

        {eventData.societies.map((society, index) => (
          <div key={index} className="society-names">
            <h3>Name({index+1}): <p style={{ color: 'red', display: 'inline' }}>*</p></h3><input
              type="text"
              name="name"
              value={society.name}
              onChange={(e) => handleInputChange(e, index, 'societies')}
              required
            />
            <h3>Logo({index+1}): <p style={{ color: 'red', display: 'inline' }}>*</p></h3><input
              type="text"
              name="logo"
              value={society.logo}
              onChange={(e) => handleInputChange(e, index, 'societies')}
              required
            />
            {index > 0 && (
              <button className='remove-btn' type="button" onClick={() => handleRemoveField(index, 'societies')}>
                Remove
              </button>
            )}
          </div>
        ))}
       
        <br />
        <h3>Description <p style={{ color: 'red', display: 'inline' }}>*</p></h3>   
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
          />
        <br />
        <h3>Date: <p style={{ color: 'red', display: 'inline' }}>*</p></h3>   
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleInputChange}
          />
        
        <br />
        <h3>Venue: <p style={{ color: 'red', display: 'inline' }}>*</p></h3>   
          <input
            type="text"
            name="venue"
            value={eventData.venue}
            onChange={handleInputChange}
          />
        <br />
        <h3>Time: <p style={{ color: 'red', display: 'inline' }}>*</p></h3>

        <span className='time-range'>
          <span className="from-time">
            <p>From</p>
            <input
              type="time"
              name="fromTime"
              value={eventData.fromTime}
              onChange={(e) => handleInputChange(e, null, 'fromTime')} // Updated: Use 'fromTime' field
            />
          </span>
          <span className="to-time">
            <p>To</p>
            <input
              type="time"
              name="toTime"
              value={eventData.toTime}
              onChange={(e) => handleInputChange(e, null, 'toTime')} // Updated: Use 'toTime' field
            />
          </span>
        </span>

        <br />
        <h3>Poster: <p style={{ color: 'red', display: 'inline' }}>*</p></h3>   
          <input
            type="url"
            name="img"
            value={eventData.img}
            onChange={handleInputChange}
          />
        <br />
        <h3>  Registration Link:
<p style={{ color: 'red', display: 'inline' }}>*</p></h3>   
          <input
            type="text"
            name="registerLink"
            value={eventData.registerLink}
            onChange={handleInputChange}
          />
        <br />
        <div className="event-winner-head">
          <h2>FAQ Section</h2>
          <button className='addSocbtn' type="button" onClick={() => handleAddField('faq')}>
            Add FAQ
          </button>
        </div>
        <div className="faq-list">

          {eventData.faq.map((faq, index) => (
            <div key={index}>
             <h3>Question ({index+1}) <p style={{ color: 'red', display: 'inline' }}>*</p></h3> <input
                type="text"
                name="ques"
                value={faq.ques}
                onChange={(e) => handleInputChange(e, index, 'faq')}
              />
               <h3>Answer ({index+1})<p style={{ color: 'red', display: 'inline' }}>*</p></h3><input
                type="text"
                name="ans"
                value={faq.ans}
                onChange={(e) => handleInputChange(e, index, 'faq')}
              />
              
              {index > 0 && (
                <button className='remove-btn' type="button" onClick={() => handleRemoveField(index, 'faq')}>
                  Remove
                </button>
              )}
            </div>
          ))}

        </div>

        <br />
        <div><button type="submit" id="submit-form">Publish</button></div>
      </form>
    </div>

  );
};

export default RegisterEvent;
