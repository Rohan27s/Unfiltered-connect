import React, { useState, useRef } from 'react';
import axios from 'axios';

const RegisterSociety = ({type,id}) => {
  const formRef = useRef(null);
  const [societyData, setSocietyData] = useState({
    name: '',
    category: '',
    description: '',
    cover: '',
    members: [
      {
        designame: '',
        desigholder: '',
        number: '',
        rank: 0,
        photoUrl: '',
      },
    ],
    Fblink: '',
    Linkedlink: '',
    Twitlink: '',
    Instalink: '',
    Youlink: '',
  });

  const handleInputChange = (e, index, field, subField) => {
    const { name, value } = e.target;
    const updatedSocietyData = { ...societyData };

    if (subField) {
      if (!updatedSocietyData[field]) {
        updatedSocietyData[field] = [{ [subField]: value }];
      } else if (index >= 0 && index < updatedSocietyData[field].length) {
        updatedSocietyData[field][index][subField] = value;
      }
    } else {
      if (index >= 0 && index < updatedSocietyData[field].length) {
        updatedSocietyData[field][index][name] = value;
      } else {
        updatedSocietyData[name] = value;
      }
    }

    setSocietyData(updatedSocietyData);
  };

  const handleAddField = (field) => {
    const updatedSocietyData = { ...societyData };
    if (!updatedSocietyData[field]) {
      updatedSocietyData[field] = [];
    }
    updatedSocietyData[field].push({
      designame: '',
      desigholder: '',
      number: '',
      rank: 0,
      photoUrl: '',
    });
    setSocietyData(updatedSocietyData);
  };

  const handleRemoveField = (index, field) => {
    const updatedSocietyData = { ...societyData };
    updatedSocietyData[field].splice(index, 1);
    setSocietyData(updatedSocietyData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the societyData to the database or perform any other necessary actions
    console.log(societyData);

    // Convert rank to number
    const updatedSocietyData = { ...societyData };
    updatedSocietyData.members = updatedSocietyData.members.map((member) => ({
      ...member,
      rank: parseInt(member.rank),
    }));

    var config = {
      method: 'post',
      url: 'https://unfiltered-connect-backend.vercel.app/api/societyadd',
      headers: {
        'Content-Type': 'application/json',
      },
      data: updatedSocietyData, // Use the updatedSocietyData
    };

    axios(config)
      .then(function (response) {
        alert('Society Registered Successfully');
        setSocietyData({
          name: '',
          category: '',
          description: '',
          cover: '',
          members: [
            {
              designame: '',
              desigholder: '',
              number: '',
              rank: 0,
              photoUrl: '',
            },
          ],
          Fblink: '',
          Linkedlink: '',
          Twitlink: '',
          Instalink: '',
          Youlink: '',
        });
        formRef.current.reset();
      })
      .catch(function (error) {
        alert('Error! Please Try Again');
      });
  };


  return (
    <div className="register-event">
      <h1 className='admin-headings'>{type}{id}</h1>

      <form onSubmit={handleSubmit} ref={formRef}>

        <span className="full-input one-input-label">


          <p>Name:<p style={{ color: 'red', display: 'inline' }}>*</p></p>
          <input
          placeholder="Please enter the name of the society"
            type="text"
            name="name"
            value={societyData.name}
            onChange={handleInputChange}
            required
          /></span>
        <br />
        <span className="full-input one-input-label">


          <p>Category:<p style={{ color: 'red', display: 'inline' }}>*</p></p>
          <input
            type="text"
            name="category"
            placeholder="Please enter the category"
            value={societyData.category}
            onChange={handleInputChange}
            required
          /></span>
        <br />
        <span className="full-input one-input-label">


          <p>Logo:<p style={{ color: 'red', display: 'inline' }}>*</p></p>
          <input
            type="text"
            name="cover"
            placeholder="Please enter the society's logo URL"
            value={societyData.cover}
            onChange={handleInputChange}
          />
        </span>
        <br />
        <h3>Description:<p style={{ color: 'red', display: 'inline' }}>*</p></h3>
        <textarea
          name="description"
          value={societyData.description}
          onChange={handleInputChange}
          placeholder="Please enter the description"
          required
        />
        <br />

        <div className="event-winner-head">

          <h2>CORE Team Details:<p style={{ color: 'red', display: 'inline' }}>*</p></h2>
        </div>
        {societyData.members.map((member, index) => (
          <div key={`member-${index}`} id='soc-inputs' className="society-names">
            <span className="one-input-label">
              <h3>Designation({index + 1}): <p style={{ color: 'red', display: 'inline' }}>*</p></h3> <input
                type="text"
                name="designame"
                placeholder="Enter Designation Name"
                value={member.designame}
                onChange={(e) =>
                  handleInputChange(e, index, 'members', 'designame')
                }
                required
              />
            </span>
            <span className="one-input-label">

              <h3>Name({index + 1}): <p style={{ color: 'red', display: 'inline' }}>*</p></h3><input
                type="text"
                name="desigholder"
                placeholder="Enter Designation Holder"
                value={member.desigholder}
                required
                onChange={(e) =>
                  handleInputChange(e, index, 'members', 'desigholder')
                }
              />
            </span>
            <span className="one-input-label">

              <h3>Mobile Number({index + 1}): <p style={{ color: 'red', display: 'inline' }}>*</p></h3><input
                type="text"
                name="number"
                placeholder="Enter Mobile Number"
                value={member.number}
                required
                onChange={(e) => handleInputChange(e, index, 'members', 'number')}
              /></span>
            <span className="one-input-label">

              <h3>Rank:({index + 1}): <p style={{ color: 'red', display: 'inline' }}>*</p></h3><input
                type="number"
                name="rank"
                placeholder="Rank"
                value={member.rank}
                required
                onChange={(e) => handleInputChange(e, index, 'members', 'rank')}
              /></span>
            <span className="complete-input one-input-label">

              <h3>Photo({index + 1}):</h3>
              <input
                type="url"
                name="photoUrl"
                placeholder="Enter the Photo URL of the member"
                className='complete-input'
                value={member.photoUrl}
                onChange={(e) => handleInputChange(e, index, 'members', 'photoUrl')}
              /></span>
            {index > 0 && (
              <div className='end-button'>
                <button
                  type="button"
                  className='remove-btn'
                  onClick={() => handleRemoveField(index, 'members')}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
        <div className='end-button'>
          <button type="button" className='addSocbtn' onClick={() => handleAddField('members')}>
            Add Member
          </button>
        </div>
        <h2>Social Media Handles</h2>

        <span className="full-input one-input-label">

          <p>Facebook:</p>
          <input
            type="text"
            placeholder="Please enter the link to the Facebook page of society"
            name="Fblink"
            value={societyData.Fblink}
            onChange={handleInputChange}
          />
        </span>
        <br />
        <span className="full-input one-input-label">


          <p>LinkedIn:</p>
          <input
            type="text"
            name="Linkedlink"
            placeholder="Please enter the link to the LinkedIn page of society"
            value={societyData.Linkedlink}
            onChange={handleInputChange}
          />
        </span>
        <br />
        <span className="full-input one-input-label">


          <p>Twitter:</p>
          <input
            type="text"
            name="Twitlink"
            placeholder="Please enter the link to the Twitter page of society"
            value={societyData.Twitlink}
            onChange={handleInputChange}
          /></span>
        <br />

        <span className="full-input one-input-label">


          <p>Instagram:</p>
          <input
            type="text"
            placeholder="Please enter the link to the Instagram page of society"
            name="Instalink"
            value={societyData.Instalink}
            onChange={handleInputChange}
          /></span>
        <br />

        <span className="full-input one-input-label">


          <p>YouTube:</p>
          <input
            type="text"
            name="Youlink"
            value={societyData.Youlink}
            placeholder="Please enter the link to the YouTube page of society"
            onChange={handleInputChange}
          /></span>
        <br />
        <div className='end-button'>
          <button type="submit" id="submit-form">Submit</button></div>
      </form>
    </div>
  );
};

export default RegisterSociety;
