import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import 'aos/dist/aos.css';
import AOS from 'aos';

export default function DesignCake() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser) {
      navigate('/sign-in');
      return;
    }

    AOS.init({
      duration: 1000, // Animation duration in ms
      once: true, // Animation only triggers once
    });

    const fetchAdmins = async () => {
      try {
        const res = await fetch('/api/user/getadmins', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setAdmins(data.admins); // Assuming the response includes an 'admins' array
      } catch (error) {
        setError('Failed to fetch admin accounts');
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, [currentUser, navigate]);

  const handleSelectShop = (shop) => {
    navigate('/designform', { state: { shopId: shop._id, shopName: shop.username } });
  };

  if (!currentUser) {
    return null; // Prevent rendering while redirecting
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-b from-purple-50 to-purple-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12 text-purple-700">Available Cake Shops</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {admins.map((admin, index) => (
          <div
            key={admin._id}
            className="border rounded-lg p-6 flex flex-col items-center shadow-lg bg-white transform transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer"
            data-aos="fade-up"
            data-aos-delay={index * 100}
            onClick={() => handleSelectShop(admin)}
          >
            <img
              src={admin.profilePicture || 'https://via.placeholder.com/150'}
              alt={`${admin.username}'s profile`}
              className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-purple-300"
            />
            <h3 className="text-xl font-semibold text-purple-800">{admin.username}</h3>
            <p className="text-gray-500">{admin.adress || 'Address not provided'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
