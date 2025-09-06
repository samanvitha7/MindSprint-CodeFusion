import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import KnowMore from "./pages/KnowMore";
import About from "./pages/About";
import MapPage from "./pages/MapPage";
import WasteScanPage from "./pages/WasteScanPage";
import Ecohacks from "./pages/ecohacks";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/scan" element={<WasteScanPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/knowmore" element={<KnowMore />} />
    </Routes>
  );
}

export default App;
