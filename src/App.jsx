import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import 'aos/dist/aos.css';
import './css/style.css';
import './App.css'
import AOS from 'aos';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import RegisteredSocieties from './pages/RegisteredSocieties';
import SocietyDetails from './pages/SocietyDetails';
import PastEventDetails from './pages/PastEventDetails';
import Admin from './pages/Admin';
// import EventForm from './partials/admin/EventForm';

function App() {
  const location = useLocation();
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });
  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        {/* Routes/Urls to all the pages */}
        <Route exact path="/" element={<Home />} />
        <Route path="/admin" element={<SignIn />} />
        <Route path="/adminPanel" element={<Admin />} />
        <Route path="/events" element={<Events />} />
        {/* <Route path="/form" element={<EventForm />} /> */}

        <Route path="/registered-societies" element={<RegisteredSocieties />} />
        <Route path='/registered-societies/:_id' element={<SocietyDetails/>} />
        <Route path='/event-details/:_id' element={<EventDetails/>} />
        <Route path='/past-event-details/:_id' element={<PastEventDetails/>} />
      </Routes>
    </>
  );
}

export default App;
