import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from 'react-router';
import axios from 'axios';
const PastEventDetails = () => {
  const [pastevent, setPastEvent] = useState([]);
  const { _id } = useParams();
  useEffect(() => {
    axios({
      method: 'get',
      url: `https://unfiltered-connect-backend.vercel.app/api/pasteventfind/${_id}`,
    }).then(response => {
      setPastEvent(response.data);
      console.log(pastevent);
    }).catch(response => {
      console.log(response);
    })
  }, []);
  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <main className="flex-grow">
          <div className="cover">
            <img className='banner-details' src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
            <div className="overlay">

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
          <div className="gap" id="about1"></div>
          <div className="content" >
            <h1 >Event Summary</h1>
            <p>{pastevent.description}</p>
            <ul>
              <li><b>Event Date : </b>{pastevent.date}</li>
              <li><b>Event Timmings :  </b>{pastevent.time}</li>
              <li><b>Event Venue :  </b>{pastevent.venue}</li>

            </ul>
            <h2 className='winner-head'>{pastevent.title} Winner Details </h2>
            <div className='oneline' style={{ display: "flex" }}>
              <span><img className='medals'
                src="https://res.cloudinary.com/rohangotwal/image/upload/v1671647978/Blog/medal_b7kshr.png" alt="" />{pastevent.First} </span>
              <span><img className='medals'
                src="https://res.cloudinary.com/rohangotwal/image/upload/v1671648007/Blog/medal_1_ulhtt4.png" alt="" />{pastevent.Second}</span>
              <span><img className='medals'
                src="https://res.cloudinary.com/rohangotwal/image/upload/v1671648038/Blog/medal_2_gzoket.png" alt="" />{pastevent.Third}</span>
            </div>

          </div>
        </main>
      </div>
    </>
  )
}

export default PastEventDetails
