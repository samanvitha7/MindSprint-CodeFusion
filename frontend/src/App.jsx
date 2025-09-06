import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

import KnowMore from "./pages/KnowMore";
import About from "./pages/About";
import MapPage from "./pages/MapPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
<<<<<<< HEAD
      <Route path="/map" element={<MapPage />} />
=======
      <Route path="/knowmore" element={<KnowMore />} />
>>>>>>> 63c4868e2d1cbf08a1eee1eb6e6c1553a79a6121
    </Routes>
  );
}

export default App;
