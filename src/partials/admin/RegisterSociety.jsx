import React, { useState, useRef } from 'react';
import axios from 'axios';

const RegisterSociety = () => {
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
      },
    ],
    url1: '',
    url2: '',
    url3: '',
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
    var config = {
      method: 'post',
      url: 'https://unfiltered-connect-backend.vercel.app/api/societyadd',
      headers: {
        'Content-Type': 'application/json',
      },
      data: societyData,
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
            },
          ],
          url1: '',
          url2: '',
          url3: '',
        });
        formRef.current.reset();
      })
      .catch(function (error) {
        alert('Error! Please Try Again');
      });
  };

  return (
    <div className="register-event">
      <h1>Register a Society</h1>

      <form onSubmit={handleSubmit} ref={formRef}>
        <h3>Society Name:<p style={{color:'red',display:'inline'}}>*</p></h3>
        <input 
          type="text"
          name="name"
          value={societyData.name}
          onChange={handleInputChange}
          required
        />
        <br />

        <h3>Society Category:<p style={{color:'red',display:'inline'}}>*</p></h3>
        <input
          type="text"
          name="category"
          value={societyData.category}
          onChange={handleInputChange}
          required
        />
        <br />

        <h3>Description:<p style={{color:'red',display:'inline'}}>*</p></h3>
        <textarea
          name="description"
          value={societyData.description}
          onChange={handleInputChange}
          required
        />
        <br />

        <h3>Cover Image URL:<p style={{color:'red',display:'inline'}}>*</p></h3>
        <input
          type="text"
          name="cover"
          value={societyData.cover}
          onChange={handleInputChange}
        />
        <br />
        <div className="event-winner-head">

        <h2>Member Details:<p style={{color:'red',display:'inline'}}>*</p></h2>   <button type="button" className='addSocbtn' onClick={() => handleAddField('members')}>
          Add Member
        </button>
        </div>
        {societyData.members.map((member, index) => (
          <div key={`member-${index}`} className="society-names">
           <h3>Designation Name({index+1}): <p style={{ color: 'red', display: 'inline' }}>*</p></h3> <input
              type="text"
              name="designame"
              placeholder="Designation Name"
              value={member.designame}
              onChange={(e) =>
                handleInputChange(e, index, 'members', 'designame')
              }
              required
            />
            <h3>Designation Holder's Name({index+1}): <p style={{ color: 'red', display: 'inline' }}>*</p></h3><input
              type="text"
              name="desigholder"
              placeholder="Designation Holder"
              value={member.desigholder}
              required
              onChange={(e) =>
                handleInputChange(e, index, 'members', 'desigholder')
              }
            />
            <h3>Mobile Number({index+1}): <p style={{ color: 'red', display: 'inline' }}>*</p></h3><input
              type="text"
              name="number"
              placeholder="Number"
              value={member.number}
              required
              onChange={(e) => handleInputChange(e, index, 'members', 'number')}
            />
            <h3>Member's Rank({index+1}): <p style={{ color: 'red', display: 'inline' }}>*</p></h3><input
              type="number"
              name="rank"
              placeholder="Rank"
              value={member.rank}
              required
              onChange={(e) => handleInputChange(e, index, 'members', 'rank')}
            />
            {index > 0 && (
              <button
                type="button"
                className='remove-btn'
                onClick={() => handleRemoveField(index, 'members')}
              >
                Remove
              </button>
            )}
          </div>
        ))}
     
        <br />
        
        

        <button type="submit"id="submit-form">Submit</button>
      </form>
    </div>
  );
};

export default RegisterSociety;
