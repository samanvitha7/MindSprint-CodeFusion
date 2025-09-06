import React from "react";
import {Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ScanObjectPage from "./pages/ScanObjectPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/scanobject" element={<ScanObjectPage />} />
    </Routes>
  );
}

export default App;
