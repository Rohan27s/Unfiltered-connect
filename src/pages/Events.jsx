import React from 'react'
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import CardComponent from '../partials/CardComponent';

const Events = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      {/* <Footer /> */}
      <main className="flex-grow">
      <CardComponent/>
      </main>
      </div>
  )
}

export default Events