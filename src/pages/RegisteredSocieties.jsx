import React, { useState, useEffect } from 'react';
import SocietyList from '../partials/Home/SocietyList';
import SearchBar from '../partials/Home/SearchBar';
import Header from '../partials/Home/Header';
import Header1 from '../partials/Header';
import Footer from '../partials/Footer';


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
  //API call for getting all the societies
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
      <Header1/>
      <Header />
      <SearchBar
        post={post}
        setSearchResult={setSearchResult}
      />
      <div className='soc-card'>
        <SocietyList searchResult={searchResult}/>
      </div>
      <Footer/>
    </div>}
    </>
  );
};

export default RegisteredSocieties;
