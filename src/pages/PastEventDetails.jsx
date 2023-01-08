import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from 'react-router';
import axios from 'axios';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
const PastEventDetails = () => {
  const [pastevent, setPastEvent] = useState([]);  
  const { _id } = useParams(); //Getting id from the url
  const [loading, setLoading] = useState(true);

  //Api call for finding individual past event
  useEffect(() => {
    axios({
      method: 'get',
      url: `https://unfiltered-connect-backend.vercel.app/api/pasteventfind/${_id}`,
    }).then(response => {
      setPastEvent(response.data);
      setLoading(false);
    }).catch(response => {
      console.log(response);
    })
  }, []);
  return (
    <>
    <Header/>

    {loading ? <div className='loading'> <h1 >Loading...</h1></div> :

      <div className="flex flex-col min-h-screen overflow-hidden">
        <main className="flex-grow">
          <div className="cover">
            <img className='banner-details' src="https://res.cloudinary.com/rohangotwal/image/upload/v1671699702/WhatsApp_Image_2022-12-22_at_14.30.39_k7pl8a.jpg" alt="" />
            <div className="overlay">
              <div className='pastEvent'>
              <div className="soc-names">
                <span>
                  <img className='soc-event-avatar' src={pastevent.Logo} alt='cover' />
                </span>
              </div>
              <h2>organized</h2>
              <h3>{pastevent.title}</h3>
              <a href="#about1">View Highlights</a>
              </div>
            </div>
          </div>
          <div className="gap" id="about1"></div>
          <div className="content" >
            <h1 >Event Summary</h1>
            <p>{pastevent.description}</p>
            <ul>
              <li><b>Event Date : </b>{pastevent.date}</li>
              <li><b>Event Timmings :  </b>{pastevent.time}</li>
              <li><b>Event Venue :  </b>{pastevent.venue}</li>

            </ul>
            {pastevent.First?
            <>
            <h2 className='winner-head'>{pastevent.title} Winner Details </h2>
            <div className='oneline' style={{ display: "flex" }}>
              <span><img className='medals'
                src="https://res.cloudinary.com/rohangotwal/image/upload/v1671647978/Blog/medal_b7kshr.png" alt="" />{pastevent.First} </span>
              <span><img className='medals'
                src="https://res.cloudinary.com/rohangotwal/image/upload/v1671648007/Blog/medal_1_ulhtt4.png" alt="" />{pastevent.Second}</span>
              <span><img className='medals'
                src="https://res.cloudinary.com/rohangotwal/image/upload/v1671648038/Blog/medal_2_gzoket.png" alt="" />{pastevent.Third}</span>
            </div>
            </>:""}
          </div>
        </main>
      </div>}
    <Footer/>

    </>
  )
}

export default PastEventDetails
