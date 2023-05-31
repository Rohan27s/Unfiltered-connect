import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const RegisterPastEvent = ({id,type}) => {
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
    if (type === "edit") {
      axios({
        method: 'get',
        url: `https://unfiltered-connect-backend.vercel.app/api/pasteventfind/${id}`,
      })
        .then((response) => {
          setEventData({ ...response.data});
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);
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
    var config;
    if (type === "create") {
      config = {
        method: 'post',
        url: 'https://unfiltered-connect-backend.vercel.app/api/pasteventadd',
        headers: {
          'Content-Type': 'application/json',
        },
        data: updatedEventData, // Use the updatedEventData
      };
    }
    else if (type === "edit") {
    
      config = {
        method: 'put',
        url: `https://unfiltered-connect-backend.vercel.app/api/pasteventfind/${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: updatedEventData, // Use the updatedEventData
      };
    }
    axios(config)
      .then(function (response) {
        if (type === "edit") {
          alert('Past Event Updated Successfully');
        }
        else {
          alert('Past Event Registered Successfully');
        }
        if (type === "create") {
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
      }
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
      {/* <h1 className='admin-headings'>Report a Past Event</h1> */}

      <form onSubmit={handleSubmit} ref={formRef}>
        <span className="full-input one-input-label">
          <p className='admin-labels'>Title: <p style={{ color: 'red', display: 'inline' }}>*</p></p>
          <input
            type="text"
            name="title"
            placeholder="Please enter the title"
            value={eventData.title}
            onChange={handleInputChange}
            required
          />
        </span>
        <br />
        <span className="full-input one-input-label">
          <p className='admin-labels'>Presenter/s: <p style={{ color: 'red', display: 'inline' }}>*</p></p>
          <input
            type="text"
            name="content"
            placeholder="Please enter the presenter/s"
            value={eventData.content}
            onChange={handleInputChange}
            required
          />
        </span>
        <br />

        <div className="full-input one-input-label">
          <p className='admin-labels'>Societies:<p style={{ color: 'red', display: 'inline' }}>*</p></p >

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
        </div>

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
            <span className="full-input one-input-label">
              <p className='admin-labels'>Image({index + 1}): </p>
              <input
                type="url"
                name="img"
                placeholder="Please enter the Image URL"
                value={image.img}
                onChange={(e) => handleInputChange(e, index, 'sliderImage', 'img')}
              />
            </span>
            {index > 0 && (
              <div className='end-button'>
                <button
                  type="button"
                  className='remove-btn'
                  onClick={() => handleRemoveField(index, 'sliderImage')}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
        <div className='end-button'>
          <button type="button" id='spacing' className='addSocbtn' onClick={() => handleAddField('sliderImage')}>
            Add Image
          </button>
        </div>



        <br />
        <span className="full-input one-input-label">
          <p className='admin-labels'>Report:</p>
          <input
          placeholder="Please enter the Report URL"
            type="url"
            name="reportpdf"
            value={eventData.reportpdf}
            onChange={handleInputChange}
          />
        </span>
        <br />

        <h3>Description:<p style={{ color: 'red', display: 'inline' }}>*</p></h3>
        <textarea
          name="description"
          placeholder="Please enter the description" 
          value={eventData.description}
          onChange={handleInputChange}
          required
        />
        <br />

        <div className="split-input-columns">
          <span className="full-input one-input-label">
            <p className='admin-labels'>Date:<p style={{ color: 'red', display: 'inline' }}>*</p></p>
            <input
              type="date"
              name="date"
              required
              id='date-input'
              value={eventData.date}
              pattern="[0-9]{2} [0-9]{2} [0-9]{4}"
              onChange={handleInputChange}
            />
          </span>
          <br />


          <span className="full-input one-input-label">
            <p className='admin-labels'>Venue:<p style={{ color: 'red', display: 'inline' }}>*</p></p>
            <input
              required
              type="text"
              name="venue"
              placeholder="Please enter the venue"
              value={eventData.venue}
              onChange={handleInputChange}
            />
          </span>
        </div>
        <br />

        <span className="full-input one-input-label">
          <p className='admin-labels'>Poster:<p style={{ color: 'red', display: 'inline' }}>*</p></p>
          <input
            type="text"
            name="img"
            placeholder="Please enter the Poster URL"
            value={eventData.img}
            onChange={handleInputChange}
            required
          />
        </span>
        <br />

        <div className="event-winner-head">
          <h2>Winners:</h2>

        </div>

        {eventData.winners.map((winner, index) => (
          <div   key={`winner-${index}`} className="society-names">
            <div  id={'spacing-1'} className="split-input-columns">
              <span  className="full-input one-input-label">
                <p className='admin-labels'>Position({index + 1}):</p>
                <input
                id='date-input'
                  type="text"
                  name="positionname"
                  placeholder="Please enter the position "
                  value={winner.positionname}
                  onChange={(e) => handleInputChange(e, index, 'winners', 'positionname')}
                />
              </span>
              <span className="full-input one-input-label">
                <p className='admin-labels'>Name({index + 1}):</p>
                <input
                  type="text"
                  name="positionholder"
                  
                  placeholder="Please enter the position holder's name"
                  value={winner.positionholder}
                  onChange={(e) => handleInputChange(e, index, 'winners', 'positionholder')}
                />
              </span>
            </div>
            {index > 0 && (
              <div className='end-button'>
                <button
                  type="button"
                  className='remove-btn'
                  onClick={() => handleRemoveField(index, 'winners')}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
        <div className='end-button'>
          <button
          id='spacing'
            type="button"
            className='addSocbtn'
            onClick={() => handleAddField('winners')}
          >
            Add Winner
          </button>
        </div>
        <br />
        <div className='end-button'>
          <button type="submit" className='submit-btn' id="submit-form">{type==="edit"?"Update":"Submit"}</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPastEvent;
