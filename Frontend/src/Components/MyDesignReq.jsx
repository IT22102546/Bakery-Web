import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'flowbite-react';
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa';

export default function MyDesignRequests() {
  const [designRequests, setDesignRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchDesignRequests = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/designs/getDesignRequestsByUser/${currentUser._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw ('No Available requests');
        }

        const data = await response.json();
        setDesignRequests(data.designs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchDesignRequests();
    }
  }, [currentUser]);

  if (loading) {
    return <p className="text-center text-lg mt-20">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 mt-20">Error: {error}</p>;
  }

  return (
    <div
      className="p-6 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <h1 className="text-3xl font-extrabold mb-8 text-center text-purple-800">
        My Design Requests
      </h1>
      {designRequests.length === 0 ? (
        <p className="text-center text-gray-500">No design requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {designRequests.map((designRequest) => (
            <Card
              key={designRequest._id}
              className="shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 bg-white border border-gray-200 rounded-lg"
            >
              <div className="flex flex-col items-center p-6">
                <h2 className="text-2xl font-semibold text-purple-700 mb-4">
                  {designRequest.shopName}
                </h2>
                <p className="text-gray-600">
                  <strong>Cake Type:</strong> {designRequest.cakeType}
                </p>
                <p className="text-gray-600">
                  <strong>Cake Shape:</strong> {designRequest.cakeShape}
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Cake Size:</strong> {designRequest.cakeSize}
                </p>
                <div className="flex items-center space-x-2">
                  {designRequest.isAccept ? (
                    <div className="flex items-center space-x-2">
                      <FaCheckCircle className="text-green-500 text-3xl" />
                      <p className="text-green-600 font-medium text-center">
                        Your request is accepted.<br /> The shop will contact you soon!
                      </p>
                    </div>
                  ) : designRequest.isReject ? (
                    <div className="flex items-center space-x-2">
                      <FaTimesCircle className="text-red-500 text-3xl" />
                      <p className="text-red-600 font-medium text-center">
                        Your request was rejected.<br /> Please try different designs.
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <FaHourglassHalf className="text-yellow-500 text-3xl" />
                      <p className="text-yellow-600 font-medium text-center">
                        Your request is pending.<br /> Please wait for a response.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
