import React from 'react';
import { Link } from 'react-router-dom';
import Chip from '../../../common/Chip';
import './styles.css';

const SocietyItem = ({
  society: {
    cover,
    category,
    name,
    _id,
  },
}) => {
  return (
    <Link className='blogItem-link' to={`/registered-societies/${_id}`}>
      <div className='blogItem-wrap soc-single-card'>
        <div className="soc-card-btns">
          <i class="fa-regular fa-pen-to-square" onClick={() => {}} style={{ color: "green" }}></i>
          <i class="fa-regular fa-trash-can" style={{ color: "red" }}></i>
        </div>
        <img className='blogItem-cover' src={cover} alt='cover' />
        <Chip label={category} />
        <h3 style={{ marginBottom: "7px" }}>{name}</h3>
      </div>
    </Link>
  );
};

export default SocietyItem;
