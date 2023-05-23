import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const RegisterPastEvent = () => {
  const formRef = useRef(null);
  const [societies, setSocieties] = useState([]);
  const [selectedSociety, setSelectedSociety] = useState({ name: "", logo: "" });
  const [eventData, setEventData] = useState({
    title: '',
    content: '',
    societies: [],
    sliderImage: [{ img: '' }],
    reportpdf: '',
    description: '',
    time: '',
    date: '',
    venue: '',
    img: '',
    winners: [{ positionname: '', positionholder: '' }],
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
      } else {
        updatedEventData[name] = value;
      }
    }

    setEventData(updatedEventData);
  };

  const handleAddField = (field) => {
    const updatedEventData = { ...eventData };
    if (!updatedEventData[field]) {
      updatedEventData[field] = [];
    }
    updatedEventData[field].push(
      field === 'societies'
        ? { name: '', logo: '' }
        : field === 'sliderImage'
          ? { img: '' }
          : { positionname: '', positionholder: '' }
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
    // Save the eventData to the database or perform any other necessary actions
    const formattedDate = formatDate(eventData.date);
    const updatedEventData = { ...eventData, date: formattedDate };
    console.log(eventData);
    var config = {
      method: 'post',
      url: 'https://unfiltered-connect-backend.vercel.app/api/pasteventadd',
      headers: {
        'Content-Type': 'application/json',
      },
      data: updatedEventData,
    };

    axios(config)
      .then(function (response) {
        alert('Past Event Registered Successfully');
        setEventData({
          title: '',
          content: '',
          societies: [{ name: '', logo: '' }],
          sliderImage: [{ img: '' }],
          reportpdf: '',
          description: '',
          time: '',
          date: '',
          venue: '',
          img: '',
          winners: [{ positionname: '', positionholder: '' }],
        });
        formRef.current.reset();
      })
      .catch(function (error) {
        alert('Error! Please Try Again');
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
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
  const handleRemoveFieldsociety = (index, field) => {
    const updatedEventData = { ...eventData };
    updatedEventData[field].splice(index, 1);
    setEventData(updatedEventData);
  };

  return (
    <div className='register-event'>
      <h1 className='admin-headings'>Register a Past Event</h1>

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
          type="text"
          name="content"
          value={eventData.content}
          onChange={handleInputChange}
          required
        />
        <br />

        <div className="event-winner-head">
          <h2>Societies:</h2>

        </div>

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
        <div className="event-winner-head">

          <h2>Carousel Images:</h2>

        </div>
        {eventData.sliderImage.map((image, index) => (
          <div key={`sliderImage-${index}`} className="society-names">
            <h3>Image({index + 1}): </h3>
            <input
              type="url"
              name="img"
              placeholder="Image URL"
              value={image.img}
              onChange={(e) => handleInputChange(e, index, 'sliderImage', 'img')}
            />
            {index > 0 && (
              <button
                type="button"
                className='remove-btn'
                onClick={() => handleRemoveField(index, 'sliderImage')}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" className='addSocbtn' onClick={() => handleAddField('sliderImage')}>
          Add Image
        </button>


        <br />

        <h3>Report:</h3>
        <input
          type="url"
          name="reportpdf"
          value={eventData.reportpdf}
          onChange={handleInputChange}
        />
        <br />

        <h3>Description:</h3>
        <textarea
          name="description"
          value={eventData.description}
          onChange={handleInputChange}
        />
        <br />

        <h3>Date:</h3>
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleInputChange}
        />
        <br />



        <h3>Venue:</h3>
        <input
          type="text"
          name="venue"
          value={eventData.venue}
          onChange={handleInputChange}
        />
        <br />

        <h3>Poster:</h3>
        <input
          type="text"
          name="img"
          value={eventData.img}
          onChange={handleInputChange}
        />
        <br />

        <div className="event-winner-head">
          <h2>Winners:</h2>

        </div>

        {eventData.winners.map((winner, index) => (
          <div key={`winner-${index}`} className="society-names">
            <h3>Position({index + 1}):</h3>
            <input
              type="text"
              name="positionname"
              placeholder="Position Name"
              value={winner.positionname}
              onChange={(e) => handleInputChange(e, index, 'winners', 'positionname')}
            />
            <h3>Name({index + 1}):</h3>
            <input
              type="text"
              name="positionholder"
              placeholder="Position Holder"
              value={winner.positionholder}
              onChange={(e) => handleInputChange(e, index, 'winners', 'positionholder')}
            />
            {index > 0 && (
              <button
                type="button"
                className='remove-btn'
                onClick={() => handleRemoveField(index, 'winners')}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className='addSocbtn'
          onClick={() => handleAddField('winners')}
        >
          Add Winner
        </button>
        <br />

        <button type="submit" className='submit-btn' id="submit-form">Submit</button>
      </form>
    </div>
  );
};

export default RegisterPastEvent;
