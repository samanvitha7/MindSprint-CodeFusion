

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-soft shadow-lg" : "bg-transparent shadow-md"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 md:px-10 py-4">
        {/* Logo */}
        <Link 
    to="/" 
    className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-navy to-forest tracking-wide transform transition-transform duration-300 hover:scale-110"
    >
    Green Vision
    </Link>


        {/* Navigation */}
       <ul className="hidden md:flex space-x-8 lg:space-x-16 font-poppins text-[#214b45] font-extrabold tracking-wide">

          <li className="cursor-pointer transition-colors duration-300 hover:text-forest">
            <Link to="/knowmore">Know More</Link>
          </li>
          <li className="cursor-pointer transition-colors duration-300 hover:text-forest">
            <Link to="/map">Map</Link>
          </li>
          <li className="cursor-pointer transition-colors duration-300 hover:text-forest">
            <Link to="/about">About Us</Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="text-navy hover:text-forest transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Button */}
                {/* Routed Button */}
        <Link
          to="/scanobject"
          className="ml-10 px-6 py-2 rounded-lg bg-mint text-navy font-poppins font-semibold shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:bg-forest hover:text-soft hover:shadow-[0_0_15px_rgba(151,206,173,0.8)]"
        >
        <button
          className="hidden md:block ml-10 px-6 py-2 rounded-lg
          bg-gradient-to-r from-forest/80 to-mint/80
          text-navy font-poppins font-semibold shadow-sm
          transition-all duration-500 transform
          hover:scale-105
          hover:bg-gradient-to-l from-forest/80 to-mint/80 hover:text-navy
          "
        />
      </Link>
    </nav>
  </header>
);
};

export default Header;
