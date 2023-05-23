import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';


const RegisterEvent = () => {
  const formRef = useRef(null);
  const [emails, setEmails] = useState([]);
  const [societies, setSocieties] = useState([]);
  const [selectedSociety, setSelectedSociety] = useState({ name: "", logo: "" });
  const [eventData, setEventData] = useState({
    title: '',
    content: '',
    societies: [],
    description: '',
    date: '',
    venue: '',
    fromTime: '',
    toTime: '',
    img: '',
    registerLink: '',
    faq: [{ ques: '', ans: '' }],
  });

  useEffect(() => {
    axios
      .get('https://unfiltered-connect-backend.vercel.app/api/societies')
      .then((response) => {
        const societiesData = response.data.map((society) => ({
          name: society.name,
          logo: society.cover,
        }));
        setSocieties(societiesData);
        console.log(societiesData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get('https://unfiltered-connect-backend.vercel.app/api/allemail')
  //     .then((response) => {
  //       setEmails(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

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
      } else if (field === 'fromTime' || field === 'toTime') {
        updatedEventData[field] = value;
        updatedEventData['time'] = mergeTime(updatedEventData);
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

  const handleSelectSociety = () => {
    if (selectedSociety) {
      const societyObject = societies.find((society) => society.name === selectedSociety);
      if (societyObject) {
        const isSocietySelected = eventData.societies.some((society) => society.name === societyObject.name);
        if (!isSocietySelected) {
          const updatedEventData = { ...eventData };
          updatedEventData.societies.push({ name: societyObject.name, logo: societyObject.logo });
          setEventData(updatedEventData);
        } else {
          // Society is already selected
          // You can show an error message or perform any other action
          alert('This society has been already selected!')
        }
      }
      setSelectedSociety('');
    }
  };
  


  const handleAddField = (field) => {
    const updatedEventData = { ...eventData };
    if (!updatedEventData[field]) {
      updatedEventData[field] = [];
    }
    updatedEventData[field].push(
      field === 'societies' ? { name: '', logo: '' } : { ques: '', ans: '' }
    );
    setEventData(updatedEventData);
  };

  const handleRemoveField = (index, field) => {
    const updatedEventData = { ...eventData };
    updatedEventData[field].splice(index, 1);
    setEventData(updatedEventData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = formatDate(eventData.date);
    const formattedTime = formatTime(eventData.time);
    const mergedDateTime = mergeDateTime(formattedDate, formattedTime);
    const formattedEventData = { ...eventData, dateTime: mergedDateTime };
    const formData = new FormData(formRef.current);
    formData.append('eventData', JSON.stringify(formattedEventData));
    console.log(formattedEventData);
    axios
      .post('https://unfiltered-connect-backend.vercel.app/api/register-event', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          sendEmails();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const formatTime = (timeString) => {
    if (!timeString.includes(' ')) {
      return timeString;
    }

    const [time, period] = timeString.split(' ');
    let [hours, minutes] = time.split(':');
    const isPM = period.toLowerCase() === 'pm';

    if (isPM && hours !== '12') {
      hours = String(Number(hours) + 12);
    } else if (!isPM && hours === '12') {
      hours = '00';
    }

    return `${hours}:${minutes}`;
  };

  const mergeDateTime = (date, time) => {
    return `${date} ${time}`;
  };
  const handleRemoveFieldsociety = (index, field) => {
    const updatedEventData = { ...eventData };
    updatedEventData[field].splice(index, 1);
    setEventData(updatedEventData);
  };
  const sendEmails = () => {
    const templateParams = {
      to_emails: emails.map((email) => email.email),
      subject: `New Event: ${eventData.title}`,
      content: `
        <h1>New Event</h1>
        <h2>${eventData.title}</h2>
        <h3>Date: ${eventData.date}</h3>
        <h3>Time: ${eventData.time}</h3>
      `,
    };

    emailjs
      .send('unfilteredconnect', 'template_ypg5vgn', templateParams, 'Unfiltered Connect')
      .then((response) => {
        console.log('Emails sent successfully!', response);
      })
      .catch((error) => {
        console.error('Error sending emails:', error);
      });
  };
  return (
    <div className='register-event'>
      <h1 className='admin-headings'>Register a New Event</h1>

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

        <h3>Presenter/s: <p style={{ color: 'red', display: 'inline' }}>*</p></h3>
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

        </div>


        <h3>Societies:</h3>

        {societies?.length > 0 ?
          <>
            <select
              value={selectedSociety}
              onChange={(e) => setSelectedSociety(e.target.value)}
            >
              <option value='' >
                Select a society
              </option>
              {societies?.map((society, index) => (
                <option key={index} value={society.name}>
                  {society.name}
                </option>
              ))}
            </select>
            <button type='button' className='addSocbtn add-soc-btn' onClick={handleSelectSociety}>
              Add Society
            </button>
            <br />
          </>
          : "Loading..."}
        {/* <button className='addSocbtn' type="button" onClick={() => handleAddField('societies')}>
            Add Society
          </button> */}
        <div className='selected-societies'>
          {eventData.societies.map((society, index) => (
            <div key={index} className='selected-society'>
              <img className='selected-soc-images' src={society.logo} alt={society.name} />
              <p>{society.name}</p>
              <button className='remove-btn' style={{marginTop:"0"}} type="button" onClick={() => handleRemoveFieldsociety(index, 'societies')}>
        Remove
      </button>
            </div>
          ))}
        </div>
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

        </div>
        <div className="faq-list">

          {eventData.faq.map((faq, index) => (
            <div key={index}>
              <h3>Question ({index + 1}) <p style={{ color: 'red', display: 'inline' }}>*</p></h3> <input
                type="text"
                name="ques"
                value={faq.ques}
                onChange={(e) => handleInputChange(e, index, 'faq')}
              />
              <h3>Answer ({index + 1})<p style={{ color: 'red', display: 'inline' }}>*</p></h3><input
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
          <button className='addSocbtn' type="button" onClick={() => handleAddField('faq')}>
            Add FAQ
          </button>
        </div>

        <br />
        <div><button type="submit" id="submit-form">Publish</button></div>
      </form>
    </div>

  );
};

export default RegisterEvent;
