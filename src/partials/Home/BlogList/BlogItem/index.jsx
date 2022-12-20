import React from 'react';
import { Link } from 'react-router-dom';
import Chip from '../../../common/Chip';
import './styles.css';

const BlogItem = ({
  blog: {
    description,
    title,
    createdAt,
    authorName,
    authorAvatar,
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
      <footer>
        <div className='blogItem-author'>
        <Link className='blogItem-link' to={`/registered-societies/${id}`}>
          ➝
        </Link>
        </div>
      </footer>
    </div>
  );
};

export default BlogItem;
