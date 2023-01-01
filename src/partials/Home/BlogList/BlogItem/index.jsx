import React from 'react';
import { Link } from 'react-router-dom';
import Chip from '../../../common/Chip';
import './styles.css';

const BlogItem = ({
  blog: {
    cover,
    category,
    name,
    _id,
  },
}) => {
  return (
    <div className='blogItem-wrap soc-single-card'>
      <img className='blogItem-cover' src={cover} alt='cover' />
      <Chip label={category} />
      <h3>{name}</h3>
        <Link className='blogItem-link' to={`/registered-societies/${_id}`}>
          View More ➝
        </Link>
    </div>
  );
};

export default BlogItem;
