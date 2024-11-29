import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Navigate to the home route
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-4 animate-bounce">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <button
          onClick={handleGoHome}
          className="bg-blue-600  text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
