// Section5.jsx
import React, { useEffect, useRef, useState } from "react";
import "./Section5.css";

const handleAnimationComplete = () => {
  console.log("✅ All letters have animated!");
};

const Section5 = () => {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const top = sectionRef.current.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        setRevealed(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`section5 ${revealed ? "revealed" : ""}`}
    >
      {mounted ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-bg"
          src="https://res.cloudinary.com/dgt1r41n8/video/upload/v1757188328/Section4_p1egzi.mp4"
        />
      ) : (
        <div className="hero-bg placeholder" />
      )}
       <div className="text">
        <h1 className="text-title !text-[#e5f3dd]">The Result</h1>
      </div>
    </div>
  );
};

export default Section5;
