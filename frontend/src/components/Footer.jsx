import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const [footerEmail, setFooterEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleFooterSubmit = () => {
    if (footerEmail) {
      // Save email in sessionStorage
      sessionStorage.setItem("prefillEmail", footerEmail);

      if (location.pathname === "/about") {
        // Already on About → scroll directly
        const contactForm = document.getElementById("contact-form");
        if (contactForm) {
          contactForm.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to About page first
        navigate("/about");
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-navy/95 to-forest/90 text-soft">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 md:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-mint tracking-wide mb-4">
              Green Vision
            </div>
            <p className="text-soft/80 leading-relaxed mb-6 max-w-md">
              Empowering sustainable choices through AI-powered waste
              classification and environmental awareness.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-mint mb-4 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-soft/80 hover:text-mint transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/knowmore"
                  className="text-soft/80 hover:text-mint transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  Know More
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-soft/80 hover:text-mint transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-bold text-mint mb-4 tracking-wide">
              Features
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/scanobject"
                  className="text-soft/80 hover:text-mint transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  AI Waste Classification
                </Link>
              </li>
              <li>
                <Link
                  to="/knowmore"
                  className="text-soft/80 hover:text-mint transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  Environmental Impact
                </Link>
              </li>
              <li>
                <Link
                  to="/map"
                  className="text-soft/80 hover:text-mint transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  Recycling Centers
                </Link>
              </li>
              <li>
                <Link
                  to="/ecohacks"
                  className="text-soft/80 hover:text-mint transition-colors duration-300 hover:translate-x-1 transform inline-block"
                >
                  Sustainability Tips
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-soft/20">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-bold text-mint mb-4 tracking-wide">
              Any Suggestions?
            </h3>
            <p className="text-soft/80 mb-6">
              Give us feedback here!!
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={footerEmail}
                onChange={(e) => setFooterEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-soft/10 border border-soft/20 text-soft placeholder-soft/60 focus:outline-none focus:ring-2 focus:ring-mint/50 transition-all duration-300"
              />
              <button
                onClick={handleFooterSubmit}
                className="px-6 py-3 rounded-lg bg-mint text-navy font-semibold transition-all duration-300 transform hover:scale-110"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-soft/20">
        <div className="container mx-auto px-4 md:px-10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-soft/80 text-sm">
              © 2025 Green Vision. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
