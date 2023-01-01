import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { blogList } from '../partials/config/data';
import Chip from '../partials/common/Chip';
import EmptyList from '../partials/common/EmptyList';
import { Link } from 'react-router-dom';
import '../App.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const SocietyDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    let blog = blogList.find((blog) => blog.id === id);
    if (blog) {
      setBlog(blog);
      console.log(blog);
    }
  }, []);

  return (
    <>
      {blog ? (
        <div className='blog-wrap'>
          <div className="soc-banner">
            <img src={blog.cover} alt='cover' />
          </div>
          {/* <Carousel>  
                <div>  
                    <img src="https://images.unsplash.com/photo-1672530928013-bbefbf96a88a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />  
                    <p className="legend">Legend 1</p>  
                </div>  
                <div>  
                    <img src="https://images.unsplash.com/photo-1672530928013-bbefbf96a88a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />  
                    <p className="legend">Legend 2</p>  
                </div>  
                <div>  
                    <img src="https://images.unsplash.com/photo-1672530928013-bbefbf96a88a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />  
                    <p className="legend">Legend 3</p>  
                </div>  
            </Carousel>   */}
          <div className='about-soc-div'>
            <h2 className='about-soc-head'>What {blog.id} is about?</h2>
            <p className='blog-desc'>{blog.description}</p>
          </div>
          <div className="about-soc">
            
            <h1>Core Team</h1>
            <ul>
              <li className="blog-desc"><h3>President : </h3>{blog.members.President}</li>
              <li className="blog-desc"><h3>Vice President : </h3>{blog.members.VicePresident}</li>
              <li className="blog-desc"><h3>General Secretary : </h3>{blog.members.GeneralSecretary}</li>
              <li className="blog-desc"><h3>Events Head : </h3>{blog.members.EventsHead}</li>
              <li className="blog-desc"><h3>Design Head : </h3>{blog.members.DesignHead}</li>
              <li className="blog-desc"><h3>PR and Out reach Head : </h3>{blog.members.PRandOutreachHead}</li>
              <li className="blog-desc"><h3>Content Head : </h3>{blog.members.ContentHead}</li>
            </ul>
          </div>
        </div>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default SocietyDetails;
