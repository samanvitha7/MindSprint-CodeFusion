import React from "react";
import Header from "../components/Header.jsx";
import Map from "../components/Map.jsx";
import Footer from "../components/Footer.jsx";

const MapPage = () => {
  return (
    <>
    <div className="min-h-screen bg-soft flex flex-col">
      <Header />
      <div>
        <Map />
      </div>
      
      <Footer />
    </div>
    </>
  );
};

export default MapPage;
