import React from 'react';
import SocietyItem from './SocietyItem';
import './styles.css';
import EmptyList from '../../common/EmptyList';

const SocietiesAdmin = ({ societies }) => {
  const sortedResults = societies.sort((a, b) => a.name.localeCompare(b.name));

  const results = sortedResults.map((society) => (
    <SocietyItem society={society} key={society.name} />
  ));

  const content = results?.length ? results : <EmptyList />;

  return (
    <div className='soc-card'>

      <div className='blogList-wrap'>
        {content}
      </div>
    </div>
  );
};

export default SocietiesAdmin;
