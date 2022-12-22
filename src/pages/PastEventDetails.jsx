import React from 'react'
import FAQ from '../partials/FAQ';
import Header from '../partials/Header';
import { useState, useEffect } from "react";
import { pastEvent } from '../partials/config/event';
import { useParams } from 'react-router';
const PastEventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [society, setSociety] = useState([{}]);

  useEffect(() => {
    let event = pastEvent.find((event) => event.id === id);
    if (event) {
      setEvent(event);
      setSociety(event.societies);
    }
  }, []);
  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <main className="flex-grow">
          <div className="cover">
            <img className='banner-details' src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
            <div className="overlay">

              <div className="soc-names">
                {society.map((items, key) => (
                  <>
                    <span>
                      <img className='soc-event-avatar' src={items.Logo} alt='cover' /><h1>{items.Name}</h1>
                    </span>
                  </>
                ))}
              </div>
              <h2>organized</h2>
              <h3>{event.title}</h3>
              <a href="#about1">View Highlights</a>
            </div>
          </div>
          <div className="gap" id="about1"></div>
          <div className="content" >
            <h1 >Event Summary</h1>
            <p>{event.description}</p>
            <ul>
              <li><b>Event Date : </b>{event.date}</li>
              <li><b>Event Timmings :  </b>{event.time}</li>
              <li><b>Event Venue :  </b>{event.venue}</li>

            </ul>
            <h2 className='winner-head'>{event.title} Winner Details </h2>
            <div className='oneline' style={{ display: "flex" }}>
              <span><img className='medals'
                src="https://res.cloudinary.com/rohangotwal/image/upload/v1671647978/Blog/medal_b7kshr.png" alt="" />{event.First} </span>
              <span><img className='medals'
                src="https://res.cloudinary.com/rohangotwal/image/upload/v1671648007/Blog/medal_1_ulhtt4.png" alt="" />{event.Second}</span>
              <span><img className='medals'
                src="https://res.cloudinary.com/rohangotwal/image/upload/v1671648038/Blog/medal_2_gzoket.png" alt="" />{event.Third}</span>
            </div>

          </div>
        </main>
      </div>
    </>
  )
}

export default PastEventDetails
