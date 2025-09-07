import React from "react";
import Header from "../components/Header.jsx"; 
import Section1 from "../components/Section1.jsx"
import Section2 from "../components/Section2.jsx"
import Section3 from "../components/Section3.jsx"
import Section4 from "../components/Section4.jsx"
import Section5 from "../components/Section5.jsx"
import Footer from "../components/Footer.jsx";

const HomePage = () => {
  return (
    <>
    <div className="min-h-screen bg-soft">
      {/* Navbar */}
      <Header />   

      
      <div>
      <Section1/>
      <Section2/>
      <Section3/>
      <Section4/>
      <Section5/>
      </div>

    
      <Footer/>
   
    </div>
    </>
  
  );
};

export default HomePage;