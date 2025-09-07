import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
          className="text-2xl md:text-3xl font-poppins font-bold text-transparent bg-clip-text bg-gradient-to-r from-navy to-forest tracking-wide transform transition-transform duration-300 hover:scale-110"
        >
          Green Vision
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 lg:space-x-16 font-poppins text-[#214b45] font-extrabold tracking-wide">
          <li className="cursor-pointer transition-colors duration-300 hover:text-forest">
            <Link to="/knowmore">Know More</Link>
          </li>
          <li className="cursor-pointer transition-colors duration-300 hover:text-forest">
            <Link to="/map">Map</Link>
          </li>
          <li className="cursor-pointer transition-colors duration-300 hover:text-forest">
            <Link to="/ecohacks">EcoHacks</Link>
          </li>
          <li className="cursor-pointer transition-colors duration-300 hover:text-forest">
            <Link to="/about">About Us</Link>
          </li>
        </ul>

        {/* Mobile Menu Button (no hover effects) */}
        <div className="md:hidden">
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              text-navy
              transition-none
              hover:text-navy hover:opacity-100 hover:scale-100 hover:bg-transparent
              active:scale-100 focus:outline-none
              select-none touch-manipulation
              [-webkit-tap-highlight-color:transparent]
            "
          >
            {menuOpen ? (
              <svg
                className="w-7 h-7 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-7 h-7 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Scan Object Button (Desktop only) */}
        <Link
          to="/scanobject"
          className="hidden md:block ml-10 px-6 py-2 rounded-lg
            bg-gradient-to-r from-forest/80 to-mint/80
            text-navy font-poppins font-semibold shadow-sm
            transition-all duration-500 transform
            hover:scale-105
            hover:bg-gradient-to-l hover:from-forest/80 hover:to-mint/80
            hover:text-navy text-center"
        >
          Scan Object
        </Link>
      </nav>

      {/* Mobile Navigation Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-soft shadow-lg px-6 py-4 space-y-4 font-poppins text-[#214b45] font-bold transition-all duration-500 animate-slideDown">
          <Link to="/knowmore" onClick={() => setMenuOpen(false)} className="block">Know More</Link>
          <Link to="/map" onClick={() => setMenuOpen(false)} className="block">Map</Link>
          <Link to="/ecohacks" onClick={() => setMenuOpen(false)} className="block">EcoHacks</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block">About Us</Link>
          <Link
            to="/scanobject"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-2 rounded-lg bg-gradient-to-r from-forest/80 to-mint/80 text-navy text-center"
          >
            Scan Object
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
