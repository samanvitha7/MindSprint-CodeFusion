import React from "react";
import Header from "../components/Header";  
import AboutUsComp from "../components/AboutUsComp";
import Footer from "../components/Footer";

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
