import React from 'react'
import Header from '../partials/Header';
import CardComponent from '../partials/CardComponent';
import PastCardComponent from '../partials/PastCardComponent';
import { upcomingEvent } from '../partials/config/event';
import { useState } from 'react';
const Events = () => {
  let currCards = <CardComponent />;
  const [eventType, setEventType] = useState(<CardComponent />)
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <div className="cards">       
     
        {eventType}
        <div className="bg-white backdrop-blur-sm shadow-lg bottombar">
          <li>
            <button onClick={() => setEventType(<PastCardComponent />)}>Past Events</button>
          </li>
           |
          <li> <button onClick={() => setEventType(<CardComponent />)}>Upcoming Events</button>   </li>
        </div>
      </div>
    </div>
  )
}

export default Events

