import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { blogList } from '../partials/config/data';
import Chip from '../partials/common/Chip';
import EmptyList from '../partials/common/EmptyList';
import { Link } from 'react-router-dom';
import '../App.css'
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
      <Link className='blog-goBack' to='/registered-societies'>
        <span> &#8592;</span> <span>Go Back</span>
      </Link>
      {blog ? (
        <div className='blog-wrap'>
          <div className="soc-banner">
            <img src={blog.cover} alt='cover' />
            <header>
              <h1>{blog.title}</h1>
            </header>
          </div>
          <p className='blog-desc'>{blog.description}</p>
          <div className="about-soc">
            <h1>Core Team</h1>
            <ul>
              <li className="blog-desc"><h3>President : </h3>{blog.members.President}</li>
              <li className="blog-desc"><h3>Vice President : </h3>{blog.members.VicePresident}</li>
              <li className="blog-desc"><h3>General Secretary : </h3>{blog.members.GeneralSecretary}</li>
              <li className="blog-desc"><h3>Events Head : </h3>{blog.members.EventsHead}</li>
              <li className="blog-desc"><h3>Deputy Events Head : </h3>{blog.members.DeputyEventsHead}</li>
              <li className="blog-desc"><h3>Design Head : </h3>{blog.members.DesignHead}</li>
              <li className="blog-desc"><h3>Deputy Design Head : </h3>{blog.members.DeputyDesignHead}</li>
              <li className="blog-desc"><h3>PR and Out reach Head : </h3>{blog.members.PRandOutreachHead}</li>
              <li className="blog-desc"><h3>Deputy PR and Out reach Head : </h3>{blog.members.DeputyPRandOutreachHead}</li>
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
