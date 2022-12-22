import React from 'react'
import FAQ from '../partials/FAQ';
import Header from '../partials/Header';
import { useState, useEffect } from "react";
import { upcomingEvent } from '../partials/config/event';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const EventDetails = () => {
  const [faqs, setFaqs] = useState([{}]);
  const toggleFAQ = index => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };
  const { title } = useParams();

  const [event, setEvent] = useState({});
  const [society, setSociety] = useState([{}]);

  useEffect(() => {
    let event = upcomingEvent.find((event) => event.title === title);
    if (event) {
      setEvent(event);
      console.log(event);
      setFaqs(event.questions);
      setSociety(event.societies);
    }
  }, []);

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <main className="flex-grow">

        <div className="cover">
          <img className='banner-details' src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
          <div className="overlay">

            <div className="soc-names">
            {society.map((items, key) => (
              <>
                  <span >
                    <img className='soc-event-avatar' src={items.Logo} alt='cover' /><h1>{items.Name}</h1>
                  </span>
              </>
            ))}
            </div>

            <h2>Presents</h2>
            <h3>{title}</h3>

            <button onClick={() => openInNewTab(event.registerLink)}>Register Now</button>
            <a href="#about1">View More Details</a>
          </div>
        </div>
        <div className="gap" id="about1"></div>
        <div className="content" >
          <h1 >About {title}</h1>
          <p>{event.description}</p>
          <ul>
            <li><b>Event Date : </b>{event.date}</li>
            <li><b>Event Timmings :  </b>{event.time}</li>
            <li><b>Event Venue :  </b>{event.venue}</li>
          </ul>
          <div className="faqs">
            <h2>FAQs</h2>
            {faqs.map((faq, index) => (
              <FAQ faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}

export default EventDetails