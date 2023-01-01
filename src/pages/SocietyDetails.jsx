import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { blogList } from '../partials/config/data';
import EmptyList from '../partials/common/EmptyList';
import '../App.css'
import axios from 'axios';
const SocietyDetails = () => {
  const { _id } = useParams();
  const [blog, setBlog] = useState(null);
  useEffect(() => {    
    axios({
      method: 'get',
      url: `https://unfiltered-connect-backend.vercel.app/api/societyfind/${_id}`,
    }).then(response => {
        setBlog(response.data);
        console.log(blog);
      }).catch(response => {
        console.log(response);
      })
  }, []);

  return (
    <>
      {blog ? (
        <div className='blog-wrap'>
          <div className="soc-banner">
            <img src={blog.cover} alt='cover' />
          </div>
          <div className='about-soc-div'>
            <h2 className='about-soc-head'>About {blog.name}</h2>
            <p className='blog-desc'>{blog.description}</p>
          </div>
          <div className="about-soc">

            <h1>Core Team</h1>
            <ul>
              <li className="blog-desc"><h3>President : </h3>{blog.President}</li>
              <li className="blog-desc"><h3>Vice President : </h3>{blog.VicePresident}</li>
              <li className="blog-desc"><h3>General Secretary : </h3>{blog.GeneralSecretary}</li>
              <li className="blog-desc"><h3>Events Head : </h3>{blog.EventsHead}</li>
              <li className="blog-desc"><h3>Design Head : </h3>{blog.DesignHead}</li>
              <li className="blog-desc"><h3>PR and Out reach Head : </h3>{blog.PRandOutreachHead}</li>
              <li className="blog-desc"><h3>Content Head : </h3>{blog.ContentHead}</li>
            </ul>
          </div>
        </div>
      ) : (
        <>
        <div><h1>Loading....</h1></div>        
        </>
      )}
    </>
  );
};

export default SocietyDetails;
