import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import SimpleImageSlider from "react-simple-image-slider";
import '../App.css'
import axios from 'axios';
const SocietyDetails = () => {
  const { _id } = useParams(); //Getting id from the url
  const [society, setSociety] = useState(null);
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");

  //API call for finding individual society by id
  useEffect(() => {
    axios({
      method: 'get',
      url: `https://unfiltered-connect-backend.vercel.app/api/societyfind/${_id}`,
    }).then(response => {

      setSociety(response.data); //Saving the data from api call in useState
      setUrl1(response.data.url1);
      setUrl2(response.data.url2);
      setUrl3(response.data.url3);

      console.log(society);
    }).catch(response => {
      console.log(response);
    })
  }, []);
  const images = [
    { url: url1 },
    { url: url2 },
    { url: url3 },
  ];
  return (
    <>
      {society ? (
        <div className='blog-wrap'>
          <div className="soc-banner">
            <img src={society.cover} alt='cover' />
          </div>
          <div className='about-soc-div'>
            <h2 className='about-soc-head'>About {society.name}</h2>
            <p className='blog-desc'>{society.description}</p>
          </div>

          <div className="about-soc">
            <h1>Core Team</h1>
            <ul style={{ border: '1px solid gray' }}>
              <li className="blog-desc"><h3>President : </h3>{society.President}</li>
              <li className="blog-desc"><h3>Vice President : </h3>{society.VicePresident}</li>
              <li className="blog-desc"><h3>General Secretary : </h3>{society.GeneralSecretary}</li>
              <li className="blog-desc"><h3>Events Head : </h3>{society.EventsHead}</li>
              <li className="blog-desc"><h3>Design Head : </h3>{society.DesignHead}</li>
              <li className="blog-desc"><h3>PR and Outreach Head : </h3>{society.PRandOutreachHead}</li>
              <li className="blog-desc"><h3>Content Head : </h3>{society.ContentHead}</li>
            </ul>
          </div>
          <div className='slider'>
            <SimpleImageSlider
              width={"90%"}
              height={"90vh"}
              images={images}
              showBullets={true}
              showNavs={true}
              style={{display:"flex",justifyContent:"center"}
            }
            />
          </div>
        </div>
      ) : (
        <>
          <div className='loading'> <h1 >Loading...</h1></div>
        </>
      )}
    </>
  );
};

export default SocietyDetails;
