import React from "react";
import Header from "../components/Header.jsx"; 
import Section1 from "../components/Section1.jsx"
import Section2 from "../components/Section2.jsx"
import Section3 from "../components/Section3.jsx"
import Section4 from "../components/Section4.jsx"

const HomePage = () => {
  return (
    <div className="min-h-screen bg-soft">
      {/* Navbar */}
      <Header />   

      
      <Section1/>
      <Section2/>
      <Section3/>
      <Section4/>
   
    </div>
  );
};

export default HomePage;