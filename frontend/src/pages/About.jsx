import React from "react";
import Header from "../components/Header";  // ✅ Import Header
import AboutUsComp from "../components/AboutUsComp";

const About = () => {
  return (
    <div className="min-h-screen bg-soft">
      {/* Navbar */}
      <Header />   

      <AboutUsComp />
    </div>
  );
};

export default About;
