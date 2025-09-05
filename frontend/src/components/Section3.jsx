// Section3.jsx
import React, { useEffect, useRef, useState } from "react";
import "./Section3.css";

const handleAnimationComplete = () => {
  console.log("✅ All letters have animated!");
};

const Section3 = () => {
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
      className={`section3 ${revealed ? "revealed" : ""}`}
    >
      {mounted ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-bg"
          src="https://res.cloudinary.com/dgt1r41n8/video/upload/v1757102506/Section2_omn0jd.mp4"
        />
      ) : (
        <div className="hero-bg placeholder" />
      )}
    
        <div className="my-text">Section3</div>
      
    </div>
  );
};

export default Section3;
