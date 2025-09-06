// app/recycle-tutorials/page.jsx (if using Next.js App Router)
// or pages/recycle-tutorials.jsx (if using Pages Router)

import React from "react";
import Hacks from "../components/Hacks"; // adjust path if needed
import Header from "../components/Header"; // adjust path if needed
import Footer from "../components/Footer"; // adjust path if needed

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Header/>
      <Hacks />
      <Footer />
    </main>
  );
}
