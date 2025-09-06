// Section3.jsx
import React, { useEffect, useRef, useState } from "react";
import "./Section2.css";

const handleAnimationComplete = () => {
  console.log("✅ All letters have animated!");
};

const Section2 = () => {
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
      className={`section2 ${revealed ? "revealed" : ""}`}
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
      
    </div>
  );
};

export default Section2;
