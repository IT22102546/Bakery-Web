import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function DesignCakeSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-300 via-red-200 to-pink-400">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-md text-center">
        {/* Success Illustration */}
        <img
          src="https://cdn.dribbble.com/users/199982/screenshots/5883065/success_gif.gif"
          alt="Success"
          className="w-40 mx-auto mb-4"
        />

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-purple-600 mb-3">
          🎉 Design Request Submitted!
        </h2>
        <p className="text-gray-700 mb-5">
          The shop will contact you soon. Check your request status in your profile.
        </p>

        {/* Back to Profile Button */}
        <button
          onClick={() => navigate("/dashboard?tab=mydesignreq")}
          className="flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 mx-auto"
        >
          <FaArrowLeft className="mr-2" /> Check the Status
        </button>
      </div>
    </div>
  );
}
