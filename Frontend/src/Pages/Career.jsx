import React from 'react';

export default function Career() {
  return (
    <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen p-10 text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-8">Join Our Team</h1>
      <p className="text-lg text-center mb-10">
        Whether you're a delivery person or a bakery shop, we have opportunities for you!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Delivery Persons Slot */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Delivery Persons</h2>
          <p className="text-gray-700 mb-6">
            Join us as a delivery person and help bring joy to our customers by delivering delicious cakes and treats!
          </p>
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            onClick={() => window.location.href = '/signupdelivery'}
          >
            Sign Up
          </button>
        </div>

        {/* Bakery Shops Slot */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Bakery Shops</h2>
          <p className="text-gray-700 mb-6">
            Partner with us as a bakery shop and share your amazing creations with a wider audience!
          </p>
          <button
            className="bg-purple-500 text-white font-bold py-2 px-4 rounded hover:bg-purple-600 transition duration-200"
            onClick={() => window.location.href = '/signupshops'}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
