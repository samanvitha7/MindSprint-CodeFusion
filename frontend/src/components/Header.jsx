import React, { useState, useEffect } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-soft shadow-lg" // 🌸 soft background when scrolled
          : "bg-transparent shadow-md" // transparent at top
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 md:px-10 py-4">
        
        {/* Logo with gradient text */}
        <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-navy to-forest tracking-wide transform transition-transform duration-300 hover:scale-110">
          Green Vision
        </div>

        {/* Navigation items */}
        <ul className="hidden md:flex space-x-8 lg:space-x-16 font-poppins text-navy font-semibold tracking-wide">
          <li className="cursor-pointer transition-colors duration-300 hover:text-forest">
            Know More
          </li>
          <li className="cursor-pointer transition-colors duration-300 hover:text-forest">
            Map
          </li>
          <a href="../pages/Aboutus.jsx">
          <li className="cursor-pointer transition-colors duration-300 hover:text-forest">
            About Us
          </li>
          </a>
          
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
<button
  className="hidden md:block ml-10 px-6 py-2 rounded-lg
  bg-gradient-to-r from-forest/80 to-mint/80
  text-navy font-poppins font-semibold shadow-sm
  transition-all duration-500 transform
  hover:scale-105
  hover:bg-gradient-to-l from-forest/80 to-mint/80 
  hover:text-navy "
>
  Scan Object
</button>



      </nav>
    </header>
  );
};

export default Header;
