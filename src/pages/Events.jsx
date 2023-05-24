import React, { useEffect } from 'react';
import Header from '../partials/Header';
import CardComponent from '../partials/CardComponent';
import PastCardComponent from '../partials/PastCardComponent';
import Footer from '../partials/Footer';

import { useState } from 'react';

const Events = () => {
  const [isActive, setActive] = useState(false);
  const [isActive1, setActive1] = useState(true);
  const [eventType, setEventType] = useState(null);

  // Check session storage for stored event type on initial render
  useEffect(() => {
    const storedEventType = sessionStorage.getItem('eventType');
    if (storedEventType === 'past') {
      setEventType(<PastCardComponent />);
      setActive(true);
      setActive1(false);
    } else {
      setEventType(<CardComponent />);
      setActive1(true);
      setActive(false);
    }
  }, []);

  // Update event type and store in session storage
  const handleClick = () => {
    setEventType(<PastCardComponent />);
    setActive(true);
    setActive1(false);
    sessionStorage.setItem('eventType', 'past');
  };

  // Update event type and store in session storage
  const handleClick1 = () => {
    setEventType(<CardComponent />);
    setActive1(true);
    setActive(false);
    sessionStorage.setItem('eventType', 'upcoming');
  };

  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden" style={{ paddingBottom: "5%" }}>
        <Header />
        <div className="bg-white backdrop-blur-sm shadow-lg bottombar">
          <li>
            <button className={isActive ? "active" : null} onClick={handleClick} >Past Events</button>
          </li>
          <li>|</li>
          <li>
            <button className={isActive1 ? "active" : null} onClick={handleClick1}>Upcoming Events</button>
          </li>
        </div>
        <div className="cards">
          {eventType}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Events;
