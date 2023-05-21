import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import Loading from '../partials/Loading';
import SimpleImageSlider from "react-simple-image-slider";

const PastEventDetails = () => {
  const [pastevent, setPastEvent] = useState([]);
  const { _id } = useParams(); //Getting id from the url
  const [loading, setLoading] = useState(true);
  const hasWindow = typeof window !== 'undefined';
  const width1 = hasWindow ? window.innerWidth : null;
  const height1 = hasWindow ? window.innerHeight : null;
  let width, height;

  if (height1 > width1) {
    width = width1;
    height = '20vh';
  } else {
    width = width1;
    height = '80vh';
  }
  const [images, setimages] = useState(null)
  //Api call for finding individual past event
  useEffect(() => {
    axios({
      method: 'get',
      url: `https://unfiltered-connect-backend.vercel.app/api/pasteventfind/${_id}`,
    })
      .then((response) => {
        setPastEvent(response.data);
        setLoading(false);
        const imgs = response.data.sliderImage.map((i) => {
          return i.img;
        })
        setimages(imgs);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

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
                      <span>
                        <img
                          className="soc-event-avatar"
                          src={pastevent.Logo}
                          alt="cover"
                        />
                      </span>
                    </div>
                    <h2>organized</h2>
                    <h3>{pastevent.title}</h3>
                    <a href="#about1">View Highlights</a>
                  </div>
                </div>
              </div>
              <div className="gap" id="about1"></div>
              <div className="content">
                <h1>Event Summary</h1>
                <p>{pastevent.description}</p>
                <ul>
                  <li>
                    <b>Event Date :</b> {pastevent.date}
                  </li>

                  <li>
                    <b>Event Venue :</b> {pastevent.venue}
                  </li>
                </ul>
                {pastevent.winners.length > 0 ? (
                  <>
                    <h2 className="winner-head">
                      {pastevent.title} Winner Details
                    </h2>
                    <div
                      className="oneline position-main"
                      style={{ display: 'flex' }}
                    >
                      {pastevent.winners.map((position) => {
                        return <>
                          <span className='positions'>
                            <p className="position-holder">
                              {position.positionholder}
                            </p>
                            <p className="position-name">
                              {position.positionname}
                            </p>

                          </span>
                        </>
                      })}

                    </div>

                  </>
                ) : (
                  ''
                )}
                <div className='slider'>
                  <SimpleImageSlider
                    width={"90%"}
                    height={"50vh"}
                    images={images}
                    showBullets={true}
                    showNavs={true}
                    style={{ display: "flex", justifyContent: "center" }}
                  />
                </div>
              </div>

            </main>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default PastEventDetails;
