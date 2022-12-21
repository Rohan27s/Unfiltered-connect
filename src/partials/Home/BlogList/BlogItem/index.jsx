import React from 'react';
import { Link } from 'react-router-dom';
import Chip from '../../../common/Chip';
import './styles.css';

const BlogItem = ({
  blog: {
    title,
    cover,
    category,
    id,
  },
}) => {
  return (
    <div className='blogItem-wrap soc-single-card'>
      <img className='blogItem-cover' src={cover} alt='cover' />
      <Chip label={category} />
      <h3>{title}</h3>
        <Link className='blogItem-link' to={`/registered-societies/${id}`}>
          View More ➝
        </Link>
    </div>
  );
};

export default BlogItem;
