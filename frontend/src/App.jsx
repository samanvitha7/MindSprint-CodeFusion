// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ScanObjectPage from "./pages/ScanObjectPage.jsx";
import KnowMore from "./pages/KnowMore";
import About from "./pages/About";
import MapPage from "./pages/MapPage";
import Ecohacks from "./pages/ecohacks"; // ✅ Correct import

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scanobject" element={<ScanObjectPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/knowmore" element={<KnowMore />} />
          <Route path="/ecohacks" element={<Ecohacks />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          toastClassName="toast-custom"
        />
      </>
    </Router>
  );
}

export default App;
