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

  //Getting the details of the registered societies
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

  //fetching subscribed people's email from the newsletter
  useEffect(() => {
    axios
      .get('https://unfiltered-connect-backend.vercel.app/api/allemail')
      .then((response) => {
        setEmails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      if (index >= 0 && index < updatedEventData[field].length && name !== 'fromTime' && name !== 'toTime') {
        updatedEventData[field][index][name] = value;
      } else if (name === 'fromTime') {
        updatedEventData.fromTime = value;
        console.log(value);

        updatedEventData.time = mergeTime(updatedEventData);
      } else if (name === 'toTime') {
        updatedEventData.toTime = value;
        console.log(value);
        updatedEventData.time = mergeTime(updatedEventData);
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
    // const mergedTime = `${eventData.fromTime} to ${eventData.toTime}`
    // const mergedDateTime = mergeDateTime(formattedDate, formattedTime);
    const formattedEventData = { ...eventData, date: formattedDate, time: formattedTime };
    console.log(formattedEventData);
    var config = {
      method: 'post',
      url: 'https://unfiltered-connect-backend.vercel.app/api/eventadd', // Provide the correct URL
      headers: {
        'Content-Type': 'application/json',
      },
      data: formattedEventData,
    };

    axios
      .post(config.url, formattedEventData) // Pass the URL and data as separate arguments
      .then(function (response) {
        alert("Event Registered Successfully!");
        sendEmails();
        setEventData({
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
        formRef.current.reset();

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

    return `${day}-${month}-${year}`;
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


  const handleRemoveFieldsociety = (index, field) => {
    const updatedEventData = { ...eventData };
    updatedEventData[field].splice(index, 1);
    setEventData(updatedEventData);
  };

  const sendEmails = () => {
    // EmailJS Initialization
    console.log(emails);
    emailjs.init('IzhHvKXIND2eDZuyD');

    // Email Parameters
    const templateParams = {
      to_emails: emails.map((email) => email.email),
      subject: `New Event: ${eventData.title}`,
      content: `    
    ${eventData.title} is being hosted on ${eventData.date} at ${eventData.time} onwards
  `,
    };

    // Email Sending
    emailjs
      .send('unfilteredconnect', 'template_ypg5vgn', templateParams)
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

        <span className="full-input one-input-label">
          <p className='admin-labels'>Title: <p style={{ color: 'red', display: 'inline' }}>*</p></p>
          <input
            type="text"
            name="title"
            value={eventData.title}
            placeholder='Please enter the title'
            onChange={handleInputChange}
            required
          />
        </span>
        <br />
        <span className="full-input one-input-label">

          <p className='admin-labels'>Presenter/s: <p style={{ color: 'red', display: 'inline' }}>*</p></p>
          <input
            name="content"
            type='text'
            placeholder='Please enter the presenter/s'
            value={eventData.content}
            onChange={handleInputChange}
            required
          />
        </span>
        <br />

        <span className="full-input one-input-label">

          <p className='admin-labels' >Societies:<p style={{ color: 'red', display: 'inline' }}>*</p></p>

          {societies?.length > 0 ?
            <>
              <select id='society-input'
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
        </span>
        {/* <button className='addSocbtn' type="button" onClick={() => handleAddField('societies')}>
            Add Society
          </button> */}
        <div className='selected-societies'>
          {eventData.societies.map((society, index) => (
            <div key={index} className='selected-society'>
              <img className='selected-soc-images' src={society.logo} alt={society.name} />
              <p>{society.name}</p>
              <button className='remove-btn' style={{ marginTop: "0" }} type="button" onClick={() => handleRemoveFieldsociety(index, 'societies')}>
                Remove
              </button>
            </div>
          ))}
        </div>
        <br />
        <h3 >Description: <p style={{ color: 'red', display: 'inline' }}>*</p></h3>
        <textarea
          placeholder='Please enter the description'
          name="description"
          value={eventData.description}
          onChange={handleInputChange}
          required
        />
        <br />
        <div className="split-input-columns">

          <span className="full-input one-input-label">
            <p className='admin-labels'>Date: <p style={{ color: 'red', display: 'inline' }}>*</p></p>
            <input

              type="date"
              name="date"
              id='date-input'
              value={eventData.date}
              onChange={handleInputChange}
              required
            />
          </span>
          <br />
          <span className="full-input one-input-label">

            <p className='admin-labels'>Venue: <p style={{ color: 'red', display: 'inline' }}>*</p></p>
            <input
              type="text"
              name="venue"
              placeholder='Please enter the venue'
              value={eventData.venue}

              onChange={handleInputChange}
              required
            />
          </span>
        </div>

        <br />

        <span className='full-input one-input-label'>
          <p className='admin-labels'>Time: <p style={{ color: 'red', display: 'inline' }}>*</p></p>
          <input
            type="time"
            name="fromTime"
            value={eventData.fromTime}
            required
            id='time-input'
            onChange={(e) => handleInputChange(e, null, 'fromTime')} // Updated: Use 'fromTime' field
          />
        </span>

        <br />

        <span className="full-input one-input-label">
          <p className='admin-labels'>Poster: <p style={{ color: 'red', display: 'inline' }}>*</p></p>
          <input
            type="url"
            name="img"
            placeholder="Please enter the Poster's URL"
            value={eventData.img}
            onChange={handleInputChange}
            required
          />
        </span>
        <br />
        <span className="full-input one-input-label">
          <p className='admin-labels'>  Registration Link:
            <p style={{ color: 'red', display: 'inline' }}>*</p></p>
          <input
            type="text"
            placeholder="Please enter the Registration link"
            name="registerLink"
            value={eventData.registerLink}
            onChange={handleInputChange}
            required
          />
        </span>
        <br />
        <div className="event-winner-head">
          <h2 >FAQ Section</h2>

        </div>
        <div className="faq-list">

          {eventData.faq.map((faq, index) => (
            <div key={index} className="society-names">
              <span className="full-input one-input-label">
                <p className='admin-labels'>Question ({index + 1}) <p style={{ color: 'red', display: 'inline' }}>*</p></p> <input
                  type="text"
                  name="ques"
                  id={'spacing-1'}
                  placeholder="Please enter the question"
                  value={faq.ques}
                  onChange={(e) => handleInputChange(e, index, 'faq')}
                />
              </span>
              <span className="full-input one-input-label">
                <p className='admin-labels'>Answer ({index + 1})<p style={{ color: 'red', display: 'inline' }}>*</p></p><input
                  type="text"
                  name="ans"
                  id={'spacing-1'}
                  placeholder="Please enter the answer to the above question"
                  value={faq.ans}
                  onChange={(e) => handleInputChange(e, index, 'faq')}
                />
              </span>
              {index > 0 && (
                <div className='end-button'>
                  <button className='remove-btn' type="button" onClick={() => handleRemoveField(index, 'faq')}>
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
          <div className='end-button'>
            <button className='addSocbtn' type="button" onClick={() => handleAddField('faq')}>
              Add FAQ
            </button>
          </div>
        </div>

        <br />
        <div className='end-button'><button type="submit" id="submit-form">Publish</button></div>
      </form>
    </div>

  );
};

export default RegisterEvent;
