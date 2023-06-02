import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import SimpleImageSlider from "react-simple-image-slider";
import '../App.css';
import axios from 'axios';
import Header from '../partials/Header';
import Loading from '../partials/Loading';
import Footer from '../partials/Footer';

const SocietyDetails = () => {
  const { _id } = useParams(); // Getting id from the URL
  const [society, setSociety] = useState(null);

  // API call for finding individual society by id
  useEffect(() => {
    axios({
      method: 'get',
      url: `https://unfiltered-connect-backend.vercel.app/api/societyfind/${_id}`,
    })
      .then((response) => {
        const sortedMembers = response.data.members.sort((a, b) => a.rank - b.rank);
        setSociety({ ...response.data, members: sortedMembers });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [_id]);

  return (
    <>
      {society ? (
        <>
          <Header />
          <div className='blog-wrap'>
            <div className="soc-banner">
              <img src={society.cover} alt='cover' />
            </div>
            <div className='about-soc-div'>
              <h2 className='about-soc-head'>About {society.name}</h2>
              <p className='soc-desc'>{society.description}</p>
            </div>

            <div className="about-soc">
              <h1>Core Team</h1>
              <div className="table-soc">
              <table style={{ width: '100%', textAlign: 'center' }}>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Mobile Number</th>
                  </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                  {society.members.map((member) => (
                    <tr key={member.name}>
                      <td className="blog-desc">{member.designame}</td>
                      <td className="blog-desc">
                        {member.photoUrl ? (
                          <img className="avatar" src={member.photoUrl} alt={member.desigholder} />
                        ) : (
                          <div className="avatar">{member.desigholder[0]}</div>
                        )}
                      </td>
                      {/* Add additional table data for the remaining headers */}
                      <td className="blog-desc">{member.desigholder}</td>
                      <td className="blog-desc">{member.number}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </div>
          <div className="social-media-overlay">
            <ul>
              {society?.Fblink?.length > 0 && <li><a href={society?.Fblink} target='_blank'><i className="fab fa-facebook-f"></i></a></li>}
              {society?.Linkedlink?.length > 0 &&<li><a href={society?.Linkedlink} target='_blank'><i className="fab fa-linkedin"></i></a></li>}
              {society?.Twitlink?.length > 0 &&<li><a href={society?.Twitlink} target='_blank'><i className="fab fa-twitter"></i></a></li>}
              {society?.Instalink?.length > 0 && <li><a href={society?.Instalink} target='_blank'><i className="fab fa-instagram"></i></a></li>}
              {society?.Youlink?.length > 0 &&<li><a href={society?.Youlink} target='_blank'><i className="fab fa-youtube"></i></a></li>}
            </ul>
          </div>
          <Footer />
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
};

export default SocietyDetails;
