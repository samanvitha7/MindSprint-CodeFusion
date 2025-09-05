import React from "react";
import Header from "../components/Header.jsx"; 
import Section1 from "../components/Section1.jsx"
import Section2 from "../components/Section2.jsx"

const HomePage = () => {
  return (
    <div className="min-h-screen bg-soft">
      {/* Navbar */}
      <Header />   

      
      <Section1/>
      <Section2/>
   
    </div>
  );
};

export default HomePage;