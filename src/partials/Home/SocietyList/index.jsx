import React from 'react';
import SocietyItem from './SocietyItem';
import './styles.css';
import EmptyList from '../../common/EmptyList';

const SocietyList = ({ searchResult }) => {
  const sortedResults = searchResult.sort((a, b) => a.name.localeCompare(b.name));
  
  const results = sortedResults.map((society) => (
    <SocietyItem blog={society} key={society.name} />
  ));

  const content = results?.length ? results : <EmptyList />;
  
  return (
    <div className='blogList-wrap'>
      {content}
    </div>
  );
};

export default SocietyList;
