import React from "react";
import Header from "../components/Header.jsx"; 

const HomePage = () => {
  return (
    <div className="min-h-screen bg-soft">
      {/* Navbar */}
      <Header />   

      {/* Page Content */}
      <main className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-bold text-navy">
          Welcome to Green Vision 🌱
        </h1>
        <p className="mt-4 text-lg text-forest">
          Your platform to scan, learn, and explore sustainable solutions.
        </p>

        <button className="mt-8 px-6 py-3 rounded-lg bg-mint text-navy font-semibold hover:bg-forest hover:text-white transition-colors duration-200">
          Explore Now
        </button>
      </main>
    </div>
  );
};

export default HomePage;