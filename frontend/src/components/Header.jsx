import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-soft shadow-2xl sticky top-0 z-50 transition-all duration-500 hover:shadow-[0_0_25px_rgba(42,98,80,0.6)]">
      <nav className="container mx-auto flex items-center justify-between px-10 py-4">
        {/* Logo */}
        <div className="text-2xl md:text-3xl font-bold text-forest tracking-wide drop-shadow-md transform transition-transform duration-300 hover:scale-110">
          Green Vision
        </div>

        {/* Nav Links */}
        <ul className="flex space-x-16 font-poppins text-navy font-semibold tracking-wide">
          {["Know More", "Map", "About Us"].map((item, index) => (
            <li key={index} className="relative">
              <span className="cursor-pointer transition-colors duration-300 hover:text-forest">
                {item}
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-forest transition-all duration-300 hover:w-full rounded"></span>
            </li>
          ))}
        </ul>

        {/* Routed Button */}
        <Link
          to="/scanobject"
          className="ml-10 px-6 py-2 rounded-lg bg-mint text-navy font-poppins font-semibold shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:bg-forest hover:text-soft hover:shadow-[0_0_15px_rgba(151,206,173,0.8)]"
        >
          Scan Object
        </Link>
      </nav>
    </header>
  );
};

export default Header;
