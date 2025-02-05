import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCity, FaTruck } from "react-icons/fa"; 
import { MdOutlinePayments } from "react-icons/md";

export default function DeliveryDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, cartItems, subtotal, deliveryfee, totalcost } = location.state || {};

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",  // Fixed: Changed from state to city
    zip: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      userId,
      productsId: cartItems.map((item) => ({
        title: item.title,
        quantity: item.cartTotalQuantity,
        mainImage: item.mainImage,
        storename:item.storename
      })),
      ...formData,
      subtotal,
      deliveryfee,
      totalcost,
    };

    try {
      const response = await fetch("/api/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert("Order placed successfully!");
        navigate("/order-pay-success");
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 flex items-center justify-center gap-2">
        <FaTruck className="text-green-600" /> Delivery Details
      </h2>

      <div className="bg-gray-100 p-4 rounded-lg my-6">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <MdOutlinePayments className="text-green-600" /> Order Summary
        </h3>
        <div className="flex justify-between text-gray-700 mt-2">
          <span>Subtotal:</span> <span className="font-semibold">LKR {subtotal?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Delivery Fee:</span> <span className="font-semibold">LKR {deliveryfee?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold text-green-600">
          <span>Total Cost:</span> <span>LKR {totalcost?.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              required
              onChange={handleChange}
              className="w-full p-3 pl-10 border rounded-lg focus:ring focus:ring-green-200"
            />
          </div>
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              required
              onChange={handleChange}
              className="w-full p-3 pl-10 border rounded-lg focus:ring focus:ring-green-200"
            />
          </div>
        </div>

        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full p-3 pl-10 border rounded-lg focus:ring focus:ring-green-200"
          />
        </div>

        <div className="relative">
          <FaPhone className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            required
            onChange={handleChange}
            className="w-full p-3 pl-10 border rounded-lg focus:ring focus:ring-green-200"
          />
        </div>

        <div className="relative">
          <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            name="address"
            placeholder="Address"
            required
            onChange={handleChange}
            className="w-full p-3 pl-10 border rounded-lg focus:ring focus:ring-green-200"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <FaCity className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="city"  // Fixed: Changed from state to city
              placeholder="City"
              required
              onChange={handleChange}
              className="w-full p-3 pl-10 border rounded-lg focus:ring focus:ring-green-200"
            />
          </div>
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              required
              onChange={handleChange}
              className="w-full p-3 pl-10 border rounded-lg focus:ring focus:ring-green-200"
            />
          </div>
        </div>

        <button className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2">
          <FaTruck /> Place Order
        </button>
      </form>
    </div>
  );
}
