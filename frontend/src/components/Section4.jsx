// Section4.jsx
import React, { useEffect, useRef, useState } from "react";
import "./Section4.css";

const handleAnimationComplete = () => {
  console.log("✅ All letters have animated!");
};

const Section4 = () => {
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
      className={`section4 ${revealed ? "revealed" : ""}`}
    >
      {mounted ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-bg"
          src="https://res.cloudinary.com/dgt1r41n8/video/upload/v1757104064/Section4_c1qrrm.mp4"
        />
      ) : (
        <div className="hero-bg placeholder" />
      )}
    
        <div className="my-text">Section4</div>
      
    </div>
  );
};

export default Section4;
