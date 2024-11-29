import { motion } from "framer-motion";
import React, { useState } from "react";
import companyLogo from "../images/brandLogo.png";
import { Link } from "react-router-dom";

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How do I sign up for the chat app?",
      answer:
        "You can sign up by clicking the 'Sign Up' button on the home page and filling out the registration form. Once registered, you'll gain instant access to all our features.",
    },
    {
      question: "Is the chat app free to use?",
      answer:
        "Yes, the chat app is completely free to use with no hidden charges. Premium features may be added in the future.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "Go to the login page, click 'Forgot Password,' and follow the instructions to reset your password via email.",
    },
    {
      question: "How secure is my data?",
      answer:
        "We use industry-standard encryption and secure servers to ensure that your personal data is safe and protected.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto py-10 px-4">
        {/* Header with Logo and Title */}
        <div className="flex items-center justify-center space-x-3 mb-10">
          <img src={companyLogo} alt="Chat App Logo" className="w-12 h-12" />
          <h1 className="text-3xl font-bold text-teal-400">Chat Fusion FAQ</h1>
        </div>

        {/* FAQ Section */}
        <motion.div
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 shadow-md rounded-lg overflow-hidden"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left text-lg font-medium text-teal-400 hover:bg-gray-700 transition duration-300 focus:outline-none"
              >
                <span>{faq.question}</span>
                <motion.span
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="transform text-gray-300"
                >
                  ▼
                </motion.span>
              </button>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 py-4 text-gray-400"
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Section */}
        <div className="mt-10 text-center">
          <p className="text-gray-400">
            Do not find what you were looking for?{" "}
            <Link
              to="/help"
              className="text-teal-400 hover:text-teal-300 underline"
            >
              Contact our support team
            </Link>{" "}
            for further assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
