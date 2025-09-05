import React from "react";

const Header = () => {
  return (
    <header className="bg-soft shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Website Name */}
        <div className="text-2xl font-bold text-forest tracking-wide">
          Green Vision
        </div>

        {/* Links */}
        <ul className="flex space-x-8 text-navy font-medium">
          <li>
            <span className="hover:text-forest cursor-pointer transition-colors duration-200">
              Scan Object
            </span>
          </li>
          <li>
            <span className="hover:text-forest cursor-pointer transition-colors duration-200">
              Know More
            </span>
          </li>
          <li>
            <span className="hover:text-forest cursor-pointer transition-colors duration-200">
              About Us
            </span>
          </li>
        </ul>

        {/* Example Button */}
        <button className="ml-6 px-4 py-2 rounded-lg bg-mint text-navy font-semibold hover:bg-forest hover:text-white transition-colors duration-200">
          Get Started
        </button>
      </nav>
    </header>
  );
};

export default Header;