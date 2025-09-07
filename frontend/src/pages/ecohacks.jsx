// pages/ecohacks.jsx
import React from "react";
import Hacks from "../components/Hacks";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Ecohacks() {
  return (
    <>
    <main className="min-h-screen bg-gray-100">
      <Header />
      <Hacks />
      <Footer />
    </main>
    </>
  );
}
