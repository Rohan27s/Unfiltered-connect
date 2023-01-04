import React from 'react';
import BlogItem from './BlogItem';
import './styles.css';
import EmptyList from '../../common/EmptyList';
const BlogList = ({ searchResult }) => {
  const results=searchResult.map((society) => (
    <BlogItem blog={society} key={society.name}/>
  ))
  const content = results?.length ? results : <EmptyList />
  return (
    <div className='blogList-wrap'>
      {content}
    </div>
  );
};

export default BlogList;
