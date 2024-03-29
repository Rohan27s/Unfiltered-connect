import React from 'react';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function SignIn() {
  let navigate = useNavigate();   
  const [auth, setAuth] = useState({
    email:"",
    password:""
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      let path = `/adminPanel`;
      navigate(path);
    }
  }, []);

  const handleValue = (e) => {
    const { name, value } = e.target;
    setAuth({
      ...auth,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (auth.email === "admin" && auth.password === "SocialLife@008") {
      localStorage.setItem("isLoggedIn", "true");
      let path = `/adminPanel`;
      navigate(path);
    } else {
      localStorage.setItem("isLoggedIn", "false");
      alert("Enter Valid Email/Password");
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      {/*  Page content */}
      <main className="flex-grow">

        <section >
          <div className="admin-signin max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-2">
                <h1 className="h1">Admin Login</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email</label>
                      <input id="email" type="email" name="email"className="form-input w-full text-gray-800" onChange={handleValue} placeholder="Enter your email address" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Password</label>
                      </div>
                      <input id="password" type="password" name="password" className="form-input w-full text-gray-800" onChange={handleValue} placeholder="Enter your password" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full" onClick={handleSubmit}>Sign in</button>
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer/>
    </div>
  );
}

export default SignIn;