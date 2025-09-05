import React from "react";
import Header from "../components/Header.jsx"; 
import Section1 from "../components/Section1.jsx"
import Section2 from "../components/Section2.jsx"

const HomePage = () => {
  return (
    <div className="min-h-screen bg-soft">
      {/* Navbar */}
      <Header />   

      {/* Page Content */}
      <main className="container mx-auto px-6 py-12 text-center">
        
           <Section1/>
           <Section2/>

      </main>
   
    </div>
  );
};

export default HomePage;