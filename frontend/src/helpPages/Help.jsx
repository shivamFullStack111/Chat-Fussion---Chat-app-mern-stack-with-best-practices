import { motion } from "framer-motion";
import React from "react";
import companyLogo from "../images/brandLogo.png";

const HelpPage = () => {
  const helpTopics = [
    {
      title: "Getting Started",
      description:
        "Learn how to sign up, create your profile, and start chatting with friends.",
      link: "#",
    },
    {
      title: "Account Issues",
      description: "Resolve login problems or recover your account.",
      link: "#",
    },
    {
      title: "Privacy & Security",
      description:
        "Understand how we keep your data safe and manage your privacy settings.",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto py-10 px-4">
        {/* Header with Logo and Page Title */}
        <div className="flex items-center justify-center space-x-3 mb-10">
          <img
            src={companyLogo} // Replace with the actual logo path
            alt="Chat App Logo"
            className="w-12 h-12"
          />
          <h1 className="text-3xl font-bold text-teal-400">Chat Help Center</h1>
        </div>

        {/* Help Topics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
          }}
        >
          {helpTopics.map((topic, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h3 className="text-lg font-semibold text-teal-400 mb-2">
                {topic.title}
              </h3>
              <p className="text-gray-400 mb-4">{topic.description}</p>
              <a
                href={topic.link}
                className="text-teal-500 hover:text-teal-300 font-medium"
              >
                Learn More →
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Us Section */}
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-teal-400 mb-4">Contact Us</h2>
          <p className="text-gray-400 mb-6">
            If you need further assistance, please fill out the form below, and
            our support team will get back to you.
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-700 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 border border-gray-700 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Message
              </label>
              <textarea
                className="w-full p-3 border border-gray-700 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="How can we help you?"
                rows="5"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-gray-900 py-3 rounded-lg hover:bg-teal-400 transition-colors duration-300"
            >
              Submit
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpPage;
