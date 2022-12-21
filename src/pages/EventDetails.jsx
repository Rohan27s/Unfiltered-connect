import React from 'react'
import FAQ from '../partials/FAQ';
import Header from '../partials/Header';
import { useState ,useEffect} from "react";
import { upcomingEvent } from '../partials/config/event';
import { useParams } from 'react-router';

const EventDetails = () => {
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
  const [faqs, setFaqs] = useState([
    {
      question: "Question 1",
      answer:
        "Answer 1 ",
      open: false
    },
    {
      question: "Question 2",
      answer: "Answer 2",
      open: false
    },
    {
      question:"Question 3",
      answer: "Answer 3",
      open: false
    }
  ]);
  const { title } = useParams();

  const [event, setEvent] = useState({});
  useEffect(() => {
    let event = upcomingEvent.find((event) => event.title === title);
    if (event) {
      setEvent(event);
      console.log(event);
    }
  }, []);
    
    
      
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="flex-grow">
      <div className="cover">
        <img className='banner-details' src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
        <div className="overlay">
            <h1>{event.societies}</h1>
            <h2>Presents</h2>
            <h1>{title}</h1>
            <button>Register Now</button>
            <a href="#about1">View More Details</a>
        </div>        
      </div>
      <div className="gap" id="about1"></div>
      <div className="content" >
        <h1 >About the Event</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum accusamus sapiente voluptate minus magnam, qui autem error velit provident soluta! Eos placeat minus maiores reiciendis, aliquam voluptas corporis dolore incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente a architecto magnam, excepturi nam unde dolor eos laboriosam quod aliquam in beatae pariatur voluptas quos quas autem alias, dolore cumque?Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum accusamus sapiente voluptate minus magnam, qui autem error velit provident soluta! Eos placeat minus maiores reiciendis, aliquam voluptas corporis dolore incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente a architecto magnam, excepturi nam unde dolor eos laboriosam quod aliquam in beatae pariatur voluptas quos quas autem alias, dolore cumque?Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum accusamus sapiente voluptate minus magnam, qui autem error velit provident soluta! Eos placeat minus maiores reiciendis, aliquam voluptas corporis dolore incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente a architecto magnam, excepturi nam unde dolor eos laboriosam quod aliquam in beatae pariatur voluptas quos quas autem alias, dolore cumque?</p>
        <ul>
            <li><b>Event Date : </b>20th December 2022</li>
            <li><b>Event Timmings :  </b>10:00 AM to 02:00 PM</li>
            <li><b>Event Venue :  </b>Auditorium</li>

        </ul>
        <h2></h2>
      </div>

      <div className="faqs">
        <h2>FAQ</h2>
        {faqs.map((faq, index) => (
          <FAQ faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
        ))}
      </div>
      </main>
      </div>
  )
}

export default EventDetails