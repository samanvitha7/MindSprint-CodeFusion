import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <>
      <div className="min-h-screen bg-soft">
        <Header />
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-navy mb-8">Privacy Policy</h1>
            
            <div className="bg-mint/10 p-6 rounded-lg mb-8">
              <p className="text-forest text-sm">
                <strong>Last updated:</strong> January 7, 2025
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-navy mb-4">Introduction</h2>
                <p className="text-forest mb-4">
                  At Green Vision, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and protect your data when you use our AI-powered waste classification platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-navy mb-4">Information We Collect</h2>
                <div className="text-forest">
                  <h3 className="text-lg font-medium mb-2">Images and Classification Data</h3>
                  <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>Images you upload for waste classification</li>
                    <li>Classification results and confidence scores</li>
                    <li>Usage patterns and interaction data</li>
                  </ul>

                  <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                  <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>Email addresses submitted through contact forms</li>
                    <li>Feedback and suggestions you provide</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-navy mb-4">How We Use Your Information</h2>
                <ul className="list-disc list-inside text-forest space-y-2">
                  <li>Provide AI-powered waste classification services</li>
                  <li>Improve our machine learning models</li>
                  <li>Respond to your inquiries and feedback</li>
                  <li>Enhance user experience and platform functionality</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-navy mb-4">Data Security</h2>
                <p className="text-forest mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-navy mb-4">Contact Us</h2>
                <p className="text-forest">
                  If you have any questions about this Privacy Policy or our data practices, please contact us through our About page.
                </p>
              </section>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
