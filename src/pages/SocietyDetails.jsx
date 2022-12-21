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

          <img  src={blog.cover} alt='cover' />
          <header>
            <h1>{blog.title}</h1>
          </header>
          </div>
          <p className='blog-desc'>{blog.description}</p>
          <h4 className='blog-desc'>{blog.members.President}</h4>

        </div>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default SocietyDetails;
