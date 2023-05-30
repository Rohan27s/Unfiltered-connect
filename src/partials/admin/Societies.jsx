import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading';
import EmptyList from '../common/EmptyList';
import RegisterSociety from './RegisterSociety';
import Chip from '../common/Chip';
import './styles.css'
const Societies = () => {
  const [societies, setSocieties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [curr, setCurr] = useState(null);
  const [sortedResults, setsortedResults] = useState(null);

  const [reload, setReload] = useState(false);

  const [heading, setHeading] = useState("Registered Societies");


  //API call for getting all the societies
  useEffect(() => {
    setLoading(true)
    axios({
      method: 'get',
      url: 'https://unfiltered-connect-backend.vercel.app/api/societies',
    })
      .then(response => {
        console.log(response.data);
        let x = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setSocieties(x);
        setLoading(false);
        setReload(false);
      }).catch(response => {
        console.log(response)
        setReload(false);

      })
  }, [curr === null, reload === true])

  function deleteSociety(id) {
    const result = window.confirm('Are you sure you want to remove this society?');
    var config;
    if (result) {
      config = {
        method: 'delete',
        url: `https://unfiltered-connect-backend.vercel.app/api/societyfind/${id}`,
        headers: {
          'Content-Type': 'application/json',
        }
      };
      axios(config)
        .then(function (response) {
          alert("Society removed successfully!");
          setReload(true);
        }).catch(function (error) {
          alert('Error! Please Try Again');
        });
    }
  }


  return (
    <>
      {loading ? <Loading /> :
        <div className="register-event">
          <h1 className='admin-headings'>{heading}</h1>
          <div className="add-soc-admin-btn">
            {curr === null ? <button onClick={() => { setCurr(<RegisterSociety type={"create"} id={null} />); setHeading("Register a Society") }}>
              Add Society
            </button> :
              <button onClick={() => { setCurr(null); setHeading("Registered Societies") }}>
                Go back
              </button>}
          </div>

          <div className="admin-container" style={{ background: 'inherit' }}>
            {curr === null ?
              <div className='soc-card'>
                <div className='blogList-wrap'>
                  {societies?.map((society) => (
                    <div className='blogItem-wrap soc-single-card'>
                      <div className="soc-card-btns">
                        <i class="fa-regular fa-pen-to-square" onClick={() => { setCurr(<RegisterSociety type={"edit"} id={society._id} />); setHeading("Update Society Details") }} style={{ color: "green" }}></i>
                        <i class="fa-regular fa-trash-can" onClick={() => { deleteSociety(society._id) }} style={{ color: "red" }}></i>
                      </div>
                      <img className='blogItem-cover' src={society.cover} alt='cover' />
                      <Chip label={society.category} />
                      <h3 style={{ marginBottom: "7px" }}>{society.name}</h3>
                    </div>
                  ))}
                </div>
              </div> : ""}
            {curr}
          </div>
        </div>

      }
    </>
  )
}

export default Societies