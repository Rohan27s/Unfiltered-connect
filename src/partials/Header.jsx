import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {

  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px 
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);  

  return (
    <header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top && 'bg-white backdrop-blur-sm shadow-lg'}`}>
      <div className="max mx-auto px-2 sm:px-2">
        <div className="flex items-center justify-between h-16 md:h-20">

          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block logo" aria-label="Cruip">
             <img className='nav-logo' src="https://res.cloudinary.com/rohangotwal/image/upload/v1671085611/Blog/logo_cy14jc.png" alt="" />
             <h2>Unfiltered Connect</h2>
            </Link>
          </div>

          {/* Site navigation */}
          

        </div>
      </div>
    </header>
  );
}

export default Header;
