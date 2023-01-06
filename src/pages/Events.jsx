import React from 'react'
import Header from '../partials/Header';
import CardComponent from '../partials/CardComponent';
import PastCardComponent from '../partials/PastCardComponent';
import { useState } from 'react';
const Events = () => {
  const [isActive, setActive] = useState(false);
  const [isActive1, setActive1] = useState(true);  
  const [eventType, setEventType] = useState(<CardComponent />)
  //Underlining the selected nav links
  const handleClick =()=>{
    setEventType(<PastCardComponent />);
     setActive(true)
     setActive1(false)

  }
  //Underlining the selected nav links
  const handleClick1 =()=>{
    setEventType(<CardComponent />);
    setActive1(true)
    setActive(false)

  }
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <div className="cards">

        {eventType}
        <div className="bg-white backdrop-blur-sm shadow-lg bottombar">
          <li>
            <button className={isActive ? "active" : null} onClick={handleClick} >Past Events</button>
        </li>
        <li>|</li>
        <li> <button className={isActive1 ? "active" : null} onClick={handleClick1}>Upcoming Events</button>   </li>
      </div>
    </div>
    </div >
  )
}

export default Events

