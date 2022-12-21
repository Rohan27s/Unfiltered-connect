import React from 'react'
import FAQ from '../partials/FAQ';
import Header from '../partials/Header';
import { useState ,useEffect} from "react";
import { pastEvent } from '../partials/config/event';
import { useParams } from 'react-router';

const PastEventDetails = () => {
  
  const { title } = useParams();

  const [event, setEvent] = useState(Object);
  useEffect(() => {
    let event = pastEvent.find((event) => event.title === title);
    if (event) {
      setEvent(event);
      console.log(event);
      console.log(event.winners.First);
    }
  }, []);    
    
      
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      <main className="flex-grow">
      <div className="cover">
        <img className='banner-details' src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
        <div className="overlay">
          
            <div className="soc-names"><img className='soc-event-avatar' src={event.cover} alt='cover' />
              <h1>{event.societies}</h1></div>
            <h2>organized</h2>
            <h3>{title}</h3>
            <a href="#about1">View Highlights</a>
        </div>        
      </div>
      <div className="gap" id="about1"></div>
      <div className="content" >
        <h1 >Event Summary</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum accusamus sapiente voluptate minus magnam, qui autem error velit provident soluta! Eos placeat minus maiores reiciendis, aliquam voluptas corporis dolore incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente a architecto magnam, excepturi nam unde dolor eos laboriosam quod aliquam in beatae pariatur voluptas quos quas autem alias, dolore cumque?Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum accusamus sapiente voluptate minus magnam, qui autem error velit provident soluta! Eos placeat minus maiores reiciendis, aliquam voluptas corporis dolore incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente a architecto magnam, excepturi nam unde dolor eos laboriosam quod aliquam in beatae pariatur voluptas quos quas autem alias, dolore cumque?Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum accusamus sapiente voluptate minus magnam, qui autem error velit provident soluta! Eos placeat minus maiores reiciendis, aliquam voluptas corporis dolore incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente a architecto magnam, excepturi nam unde dolor eos laboriosam quod aliquam in beatae pariatur voluptas quos quas autem alias, dolore cumque?</p>
        <ul>
            <li><b>Event Date : </b>{event.date}</li>
            <li><b>Event Timmings :  </b>{event.time}</li>
            <li><b>Event Venue :  </b>{event.venue}</li>

        </ul>
        <h2 className='winner-head'>{title} Winner Details </h2>
        <ul>
            {/* <li>1st Position: {event.winners.First} </li>
            <li>2nd Position: {event.winners.second}</li>
            <li>3rd Position: {event.winners.third}</li> */}
        </ul>
      </div>      
      </main>
      </div>
  )
}

export default PastEventDetails