import React from 'react';
import BlogItem from './BlogItem';
import './styles.css';

const BlogList = ({ blogs }) => {
  return (
    <div className='blogList-wrap'>
      {blogs.map((blog) => (
        <BlogItem blog={blog} key={blog.name}/>
      ))}
    </div>
  );
};

export default BlogList;
