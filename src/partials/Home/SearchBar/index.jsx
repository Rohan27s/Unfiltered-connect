import React from 'react';
import './styles.css';

const SearchBar = ({ post, setSearchResult }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResult(post)
    const resultsArray = post.filter(posts => posts.category.toLowerCase().includes(e.target.value.toLowerCase().trim()))
    setSearchResult(resultsArray)
  }
  return (
    <>
      <div className='searchBar-wrap'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Search By Category'
            onChange={handleSearchChange}
          />
          <button>Go</button>
        </form>
      </div>
    </>
  );
};
export default SearchBar;
