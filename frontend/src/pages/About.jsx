import React from "react";
import Header from "../components/Header.jsx";  
import AboutUsComp from "../components/AboutUsComp.jsx";
import Footer from "../components/Footer.jsx";

const About = () => {
  return (
    <div className="min-h-screen bg-soft">
      {/* Navbar */}
      <Header />   

      <AboutUsComp />
      <Footer/>
    </div>
  );
};

export default About;
