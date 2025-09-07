import React from "react";
import Header from "../components/Header";  
import AboutUsComp from "../components/AboutUsComp";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactUs"; // ✅ correct import

const About = () => {
  return (
    <>
      <div className="min-h-screen bg-soft">
        {/* Navbar */}
        <Header />

      {/* About content */}
      <AboutUsComp />

      {/* ✅ New Contact Form */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </div>
    </>
  );
};

export default About;
