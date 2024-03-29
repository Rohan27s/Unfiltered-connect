import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';


const RegisterEvent = ({ id, type }) => {
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
    time: '',
    img: '',
    registerLink: '',
    faq: [{ ques: '', ans: '' }],
  });
  useEffect(() => {
    if (type === "edit") {
      axios({
        method: 'get',
        url: `https://unfiltered-connect-backend.vercel.app/api/eventfind/${id}`,
      })
        .then((response) => {
          // setEventData({ ...response.data });
          const formattedDate = formatDateAdmin(response.data.date); // Assuming formatDate is a function that converts the date to "YYYY-MM-DD" format
console.log(formattedDate);
          const eventData = {
            ...response.data,
            date: formattedDate
          };

          setEventData(eventData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);
  function formatDateAdmin(dateString) {
    const parts = dateString.split('-');
    if (parts.length !== 3) {
      // Invalid date format
      return '';
    }
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are zero-based
    const year = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    if (isNaN(date.getTime())) {
      // Invalid date
      return '';
    }
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }
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
      if (index >= 0 && index < updatedEventData[field].length && name) {
        updatedEventData[field][index][name] = value;
      } else {
        updatedEventData[name] = value;
      }
    }

    setEventData(updatedEventData);
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
    const formattedEventData = { ...eventData, date: formattedDate };

    var config;
    if (type === "create") {
      config = {
        method: 'post',
        url: 'https://unfiltered-connect-backend.vercel.app/api/eventadd',
        headers: {
          'Content-Type': 'application/json',
        },
        data: formattedEventData,
      };
    } else if (type === "edit") {
      config = {
        method: 'put',
        url: `https://unfiltered-connect-backend.vercel.app/api/eventfind/${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: formattedEventData,
      };
    }
    console.log(formattedEventData);
    axios(config)
      .then(function (response) {
        if (type === "edit") {
          alert('Event Updated Successfully');
        } else {
          sendEmails();

          alert('Event Registered Successfully');
        }
        if (type === "create") {
          setEventData({
            title: '',
            content: '',
            societies: [],
            description: '',
            date: '',
            venue: '',
            time: '',
            toTime: '',
            img: '',
            registerLink: '',
            faq: [{ ques: '', ans: '' }],
          });
          formRef.current.reset();
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
     ${eventData.title} is being hosted by ${getSocietyNames()} on ${eventData.date} at ${eventData.time} Hrs.
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
  function getSocietyNames() {
    const societies = eventData.societies.map(society => society.name);
    let formattedOutput = '';

    if (societies.length === 1) {
      formattedOutput = societies[0];
    } else if (societies.length === 2) {
      formattedOutput = societies.join(' and ');
    } else if (societies.length > 2) {
      const lastSociety = societies.pop();
      formattedOutput = societies.join(', ') + ', and ' + lastSociety;
    }
    return formattedOutput;
  }
  return (
    <div className='register-event'>
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
            name="time"
            value={eventData.time}
            required
            id='time-input'
            onChange={(e) => setEventData({ ...eventData, time: e.target.value })} // Updated: Use 'e.target.value'
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
        <div className='end-button'><button type="submit" id="submit-form">{type === "edit" ? "Update" : "Publish"}</button></div>
      </form>
    </div>

  );
};

export default RegisterEvent;
