import React, { useState ,useEffect} from 'react';
import EmptyList from '../partials/common/EmptyList';
import BlogList from '../partials/Home/BlogList';
import SearchBar from '../partials/Home/SearchBar';
import Header from '../partials/Home/Header';
import axios from 'axios';

const RegisteredSocieties = () => {
  const [blogs, setBlogs] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://unfiltered-connect-backend.vercel.app/api/societies',
  })
  .then(response => {
    setBlogs(response.data);
    setLoading(false);
  }).catch(response=>{
    console.log(response)
  })
  },)
  
  
  const [searchKey, setSearchKey] = useState('');

  // Search submit
  const handleSearchBar = (e) => {
    e.preventDefault();
    handleSearchResults();
  };

  // Search for blog by category
  const handleSearchResults = () => {
    const allBlogs = blogs;
    const filteredBlogs = allBlogs.filter((blog) =>
      blog.category.toLowerCase().includes(searchKey.toLowerCase().trim())
    );
    setBlogs(filteredBlogs);
  };

  const handleClearSearch = () => {
    setBlogs(blogs);
    setSearchKey('');
  };

  return (
    <div>
      <Header />
      <SearchBar
        value={searchKey}
        clearSearch={handleClearSearch}
        formSubmit={handleSearchBar}
        handleSearchKey={(e) => setSearchKey(e.target.value)}
      />  
      <div className='soc-card'>
        {!blogs.length? <EmptyList /> : <BlogList blogs={blogs} />}        
      </div>
    </div>
  );
};

export default RegisteredSocieties;
