import React, { useState } from 'react';
import './styles.css';

const SearchBar = ({ post, setSearchResult }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    filterPosts();
  };
  
  const handleSearchChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  
  const filterPosts = () => {
    if (!selectedCategory) {
      setSearchResult(post);
      return;
    }
    
    const resultsArray = post.filter(
      (item) => item.category.toLowerCase().includes(selectedCategory.toLowerCase().trim())
    );
    
    setSearchResult(resultsArray);
  };
  
  const categoryOptions = [...new Set(post.map((item) => item.category))];
  
  return (
    <>
      <div className='searchBar-wrap'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Search By Category'
            onChange={handleSearchChange}
          />
          <select value={selectedCategory} onChange={handleSearchChange}>
            <option value=''>All Categories</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button>Go</button>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
