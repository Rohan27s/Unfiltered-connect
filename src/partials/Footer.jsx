import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

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
          <div className="text-sm text-gray-600 mr-4">Made by Rohan, Akshat Jain & Raghav Sharma <br />All rights reserved.</div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
