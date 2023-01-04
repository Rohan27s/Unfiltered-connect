import React, { useState, useEffect } from 'react';
import BlogList from '../partials/Home/BlogList';
import SearchBar from '../partials/Home/SearchBar';
import Header from '../partials/Home/Header';
import axios from 'axios';

const RegisteredSocieties = () => {
  const [searchKey, setSearchKey] = useState('');
  const [societies, setSocieties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const handleSearchResults = () => {
    const allSocieties = societies;
    const filteredSocieties = allSocieties.filter((society) =>
      society.category.toLowerCase().includes(searchKey.toLowerCase().trim())
    );
    setSocieties(filteredSocieties);
  };
  const handleClearSearch = () => {
    setSocieties(societies);
    setSearchKey('');
  };
  const handleSearchBar = (e) => {
    e.preventDefault();
    handleSearchResults();
  };
  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://unfiltered-connect-backend.vercel.app/api/societies',
    })
      .then(response => {
        setPost(response.data);
        setSearchResult(response.data);
        console.log(searchResult);
        setSocieties(response.data);
        setLoading(false);
      }).catch(response => {
        console.log(response)
      })
  }, [])

  return (
    <>
    {loading ? <div className='loading'> <h1 >Loading...</h1></div> :
    <div>

      <Header />
      <SearchBar
        post={post}
        setSearchResult={setSearchResult}
      />
      <div className='soc-card'>
        <BlogList searchResult={searchResult}/>
      </div>
    </div>}
    </>
  );
};

export default RegisteredSocieties;
