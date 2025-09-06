
import React, { useEffect, useRef, useState } from "react";
import "./Section1.css";

const Section1 = () => {
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
      className={`section1 ${revealed ? "revealed" : ""}`}
    >
      {mounted ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-bg"
          src="https://res.cloudinary.com/dgt1r41n8/video/upload/v1757101479/Section1_zbszkr.mp4"
        />
      ) : (
        <div className="hero-bg placeholder" />
      )}

      {/* Text overlay */}
      <div className="text">
        <h1 className="text-title winky-font text-soft">The Problem</h1>

      </div>
    </div>
  );
};

export default Section1;
