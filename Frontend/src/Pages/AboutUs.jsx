import React from 'react';

export default function AboutUs() {
  return (
    <div className="bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300 py-10 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Header Section */}
        <h1 className="text-4xl font-bold text-pink-800 mb-6">
          Welcome to <span className="text-pink-600">OB TASTE</span> - OverBlessings Taste
        </h1>
        <p className="text-lg text-pink-700 leading-relaxed">
          Where sweetness meets perfection! 🌟
        </p>

        {/* Image Section */}
        <div className="mt-6">
          <img
            src="https://i.pinimg.com/736x/1a/a1/ed/1aa1ed00ccf1d426ffe7cb5d0a279139.jpg"
            alt="OB TASTE"
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>

        {/* Mission Section */}
        <div className="mt-10 text-left bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-pink-800 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At OB TASTE, we deliver not just desserts but an experience of joy and satisfaction, crafted with love and care. Every bite of our creations is a celebration of quality, freshness, and the essence of homemade goodness.
          </p>
        </div>

        {/* Why Choose OB TASTE Section */}
        <div className="mt-8 text-left bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-pink-800 mb-4">Why Choose OB TASTE?</h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed">
            <li>
              <span className="font-semibold text-pink-600">Premium Quality:</span> We use the finest ingredients to ensure every product is as indulgent as it is delightful.
            </li>
            <li>
              <span className="font-semibold text-pink-600">Freshly Made:</span> All our items are crafted with care and baked fresh to order.
            </li>
            <li>
              <span className="font-semibold text-pink-600">Convenience:</span> From browsing our menu to doorstep delivery, we make it easy for you to enjoy the treats you love.
            </li>
          </ul>
        </div>

        {/* Promise Section */}
        <div className="mt-8 text-left bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-pink-800 mb-4">Our Promise</h2>
          <p className="text-gray-700 leading-relaxed">
            At OB TASTE, customer satisfaction is our top priority. We’re committed to delivering exceptional products and service every time you order.
          </p>
        </div>

        {/* Contact Section */}
        <div className="mt-8 text-left bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-pink-800 mb-4">Get in Touch</h2>
          <p className="text-gray-700 leading-relaxed">
            Ready to satisfy your sweet cravings? Explore our menu, place your order, and experience the magic of <span className="text-pink-600 font-semibold">OB TASTE</span> today!
          </p>
        </div>

        {/* Footer Section */}
        <div className="mt-10">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} OB TASTE - All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
