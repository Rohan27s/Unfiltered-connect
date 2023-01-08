import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from 'react-router';
import axios from 'axios'
import Header from '../partials/Header';
import Footer from '../partials/Footer';
const EventDetails = () => {
  const [upcomingEvent, setUpcomingEvent] = useState([]);
  const { _id } = useParams();
  const [loading, setLoading] = useState(true);

  //API call for finding individual event by id
  useEffect(() => {
    axios({
      method: 'get',
      url: `https://unfiltered-connect-backend.vercel.app/api/eventfind/${_id}`,
    }).then(response => {
      setUpcomingEvent(response.data);
      setLoading(false);

      console.log(upcomingEvent);
    }).catch(response => {
      console.log(response);
    })
  }, []);
  //Toggle faq section onclick
const [isOpen, setIsOpen] = useState(false)
  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };
  //Opening the registration form on a new page
  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
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
              <span >
                <img className='soc-event-avatar' src={upcomingEvent.Logo} alt='cover' />
              </span>
            </div>

            <h2>Presents</h2>
            <h3>{upcomingEvent.title}</h3>

            <button onClick={() => openInNewTab(upcomingEvent.registerLink)}>Register Now</button>
            <a href="#about1">View More Details</a>
            </div>
          </div>
        </div>
        <div className="gap" id="about1"></div>
        <div className="content" >
          <h1 >About the Event</h1>
          <p>{upcomingEvent.description}</p>
          <ul>
            <li><b>Event Date : </b>{upcomingEvent.date}</li>
            <li><b>Event Timmings :  </b>{upcomingEvent.time}</li>
            <li><b>Event Venue :  </b>{upcomingEvent.venue}</li>
          </ul>
          <div className="faqs">
            <h2>FAQs</h2>
            <div
              className={"faq " + (isOpen ? "open" : "")}
              onClick={toggleFAQ}
            >
              <div className="faq-question">{upcomingEvent.question1}</div>
              <div className="faq-answer">{upcomingEvent.answer1}</div>
            </div>
          </div>
        </div>

      </main>
    </div>}
    <Footer/>

    </>
  )
}

export default EventDetails