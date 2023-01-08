import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="max-w-full mx-auto px-1 sm:px-6">

        {/* Top area: Blocks */}
        <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-gray-200">

          {/* 1st block */}
          <div className="sm:col-span-12">
            <div>
              {/* Logo */}
              <Link to="/" className="block logo" aria-label="Cruip">
                <img className='nav-logo' src="https://res.cloudinary.com/rohangotwal/image/upload/v1671085611/Blog/logo_cy14jc.png" alt="" />
                <h2>Unfiltered Connect</h2>
              </Link>
            </div>

          </div>
        </div>

        {/* Bottom area */}
        <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">


          {/* Copyrights note */}
          <div className="text-sm text-wheat-600 mr-4">Made by Akshat Jain, Raghav Sharma & Rohan.<br />All rights reserved.</div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
