import React, { useState } from 'react';
import EmptyList from '../partials/common/EmptyList';
import BlogList from '../partials/Home/BlogList';
import SearchBar from '../partials/Home/SearchBar';
import { blogList } from '../partials/config/data';
import Header from '../partials/Home/Header';
import { Link } from 'react-router-dom';

const RegisteredSocieties = () => {
  const [blogs, setBlogs] = useState(blogList);
  const [searchKey, setSearchKey] = useState('');

  // Search submit
  const handleSearchBar = (e) => {
    e.preventDefault();
    handleSearchResults();
  };

  // Search for blog by category
  const handleSearchResults = () => {
    const allBlogs = blogList;
    const filteredBlogs = allBlogs.filter((blog) =>
      blog.category.toLowerCase().includes(searchKey.toLowerCase().trim())
    );
    setBlogs(filteredBlogs);
  };

  // Clear search and show all blogs
  const handleClearSearch = () => {
    setBlogs(blogList);
    setSearchKey('');
  };

  return (
    <div>
        <Link className='blog-goBack' to='/'>
        <span> &#8592;</span> <span>Go Back</span>
      </Link>
        <Header/>
      <SearchBar
        value={searchKey}
        clearSearch={handleClearSearch}
        formSubmit={handleSearchBar}
        handleSearchKey={(e) => setSearchKey(e.target.value)}
      />
      {/* Blog List & Empty View */}
      <div className='soc-card'>

      {!blogs.length ? <EmptyList /> : <BlogList blogs={blogs} />}
      </div>
    </div>
  );
};

export default RegisteredSocieties;
