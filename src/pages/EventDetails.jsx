import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import Loading from '../partials/Loading';

const EventDetails = () => {
  const { _id } = useParams();
  const [loading, setLoading] = useState(true);
  const [upcomingEvent, setUpcomingEvent] = useState([]);
  const [activeFAQ, setActiveFAQ] = useState(null); // Track the active FAQ index

  // API call for finding individual event by id
  useEffect(() => {
    axios({
      method: 'get',
      url: `https://unfiltered-connect-backend.vercel.app/api/eventfind/${_id}`,
    })
      .then((response) => {
        setUpcomingEvent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Toggle faq section onclick
  const toggleFAQ = (index) => {
    setActiveFAQ(index === activeFAQ ? null : index);
  };

  // Opening the registration form on a new page
  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />

          <div className="flex flex-col min-h-screen overflow-hidden">
            <main className="flex-grow">
              <div className="cover">
                <img
                  className="banner-details"
                  src="https://res.cloudinary.com/rohangotwal/image/upload/v1671699702/WhatsApp_Image_2022-12-22_at_14.30.39_k7pl8a.jpg"
                  alt=""
                />
                <div className="overlay">
                  <div className="pastEvent">
                    <div className="soc-names">
                      {upcomingEvent.societies.map((society, index) => (
                        <React.Fragment key={society.name}>
                          {index > 0 && <span className="soc-separator">X</span>}
                          <span>
                            <img
                              className="soc-event-avatar"
                              src={society.logo}
                              alt={society.name}
                            />
                          </span>
                        </React.Fragment>
                      ))}
                    </div>

                    <h2>Presents</h2>
                    <h3>{upcomingEvent.title}</h3>

                    <button onClick={() => openInNewTab(upcomingEvent.registerLink)}>
                      Register Now
                    </button>
                    <a href="#about1">View More Details</a>
                  </div>
                </div>
              </div>
              <div className="gap" id="about1"></div>
              <div className="content">
                <h1>About the Event</h1>
                <p>{upcomingEvent.description}</p>
                <ul>
                  <li>
                    <b>Event Date : </b>
                    {upcomingEvent.date}
                  </li>
                  <li>
                    <b>Event Timmings : </b>
                    {upcomingEvent.time} Hrs onwards
                  </li>
                  <li>
                    <b>Event Venue : </b>
                    {upcomingEvent.venue}
                  </li>
                </ul>
                <div className="faqs">
                  <h2>FAQs</h2>
                  {upcomingEvent.faq.map((faq, index) => (
                    <div
                      className={`faq ${activeFAQ === index ? 'open' : ''}`}
                      key={`faq${index}`}
                      onClick={() => toggleFAQ(index)}
                    >
                      <div className="faq-question">{faq.ques}</div>
                      <div className="faq-answer">{faq.ans}</div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default EventDetails;
