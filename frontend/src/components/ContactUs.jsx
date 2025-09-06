import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

function ContactForm() {
  const [formData, setFormData] = useState({
    userEmail: "",
    ourEmail: "ourkalasangam2025@gmail.com", // ✅ Pre-filled email
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prefill userEmail from sessionStorage
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("prefillEmail");
    if (storedEmail) {
      setFormData(prev => ({ ...prev, userEmail: storedEmail }));
      sessionStorage.removeItem("prefillEmail"); // clear after use

      // Scroll form into view
      const form = document.getElementById("simple-contact");
      if (form) {
        form.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Backend will handle sending the mail
      const response = await axios.post("/api/simple-contact", formData);
      if (response.data.success) {
        alert("Submitted successfully!");
        setFormData({
          userEmail: "",
          ourEmail: "ourkalasangam2025@gmail.com",
          description: "",
        });
      }
    } catch (error) {
      console.error("Error submitting:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="simple-contact"
       className="relative bg-gradient-to-r from-forest/80 to-mint/80 py-16 px-6 rounded-2xl shadow-2xl mt-16 mb-24 max-w-4xl mx-auto overflow-hidden font-[Poppins]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Heading */}
      <div className="relative z-10 text-center mb-10">
        <motion.h2
          className="text-3xl font-bold mb-4 font-[Poppins] bg-gradient-to-r from-navy to-forest bg-clip-text text-transparent"
        >
          Contact Us
        </motion.h2>
        <p className="text-lg leading-relaxed font-[poppins] text-forest">
          Fill in your details below and we’ll get back to you.
        </p>
      </div>

      {/* Form */}
      <motion.form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        {/* User Email */}
        <div>
          <label
            htmlFor="userEmail"
            className="block text-sm font-medium mb-2 bg-gradient-to-r from-navy to-forest bg-clip-text text-transparent"
          >
            Your Email Address
          </label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-mint focus:outline-none focus:ring-2 focus:ring-forest bg-soft/80"
            placeholder="your@email.com"
          />
        </div>

        {/* Our Email (read-only) */}
        <div>
          <label
            htmlFor="ourEmail"
            className="block text-sm font-medium mb-2 bg-gradient-to-r from-navy to-forest bg-clip-text text-transparent"
          >
            Our Email
          </label>
          <input
            type="email"
            id="ourEmail"
            name="ourEmail"
            value={formData.ourEmail}
            readOnly
            className="w-full px-4 py-3 rounded-lg border border-mint bg-soft text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2 bg-gradient-to-r from-navy to-forest bg-clip-text text-transparent"
          >
            Message / Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-mint focus:outline-none focus:ring-2 focus:ring-forest bg-soft/80 resize-none"
            placeholder="Write your message..."
          />
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-gradient-to-r from-navy to-forest text-soft font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </motion.button>
      </motion.form>
    </motion.section>
  );
}

export default ContactForm;
