/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { FaStore } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [usernames, setUsernames] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Default items per page

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await fetch("/api/cakes/featured");
        const data = await res.json();
        if (res.ok) {
          setFeaturedProducts(data);
          // Fetch usernames based on userId after fetching the products
          fetchUsernames(data);
        } else {
          console.log("Error fetching featured products");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const fetchUsernames = async (products) => {
    const fetchedUsernames = {};
    for (const product of products) {
      try {
        const res = await fetch(`/api/user/getuserById/${product.userId}`);
        const data = await res.json();
        if (res.ok) {
          fetchedUsernames[product.userId] = data.username; // Assuming the API response contains the username
        }
      } catch (error) {
        console.log("Error fetching username", error.message);
      }
    }
    setUsernames(fetchedUsernames); // Save fetched usernames
  };

  useEffect(() => {
    // Dynamically adjust the number of items per page based on screen width
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) setItemsPerPage(1); // Small screens (mobile)
      else if (window.innerWidth < 768) setItemsPerPage(2); // Medium screens (tablets)
      else if (window.innerWidth < 1024) setItemsPerPage(3); // Large screens (small desktops)
      else setItemsPerPage(4); // Extra large screens
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredProducts.length - itemsPerPage : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === featuredProducts.length - itemsPerPage ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-transparent border-r-emerald-900 py-16 w-full">
      <div className="w-full px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-center md:text-left">
            Signature Cakes
          </h2>
          <p className="text-md text-gray-600 max-w-md text-center md:text-left">
            Discover Signature Cakes selected for their outstanding quality and
            design. These items are sure to enhance your events.
          </p>
        </div>

        {featuredProducts.length > 0 && (
          <div className="relative w-full mt-8">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{
                  transform: `translateX(-${(currentIndex * 100) / itemsPerPage}%)`,
                }}
              >
                {featuredProducts.map((product, index) => (
                  <div
                    key={product._id}
                    className={`flex-shrink-0 px-2 w-[${
                      100 / itemsPerPage
                    }%]`}
                    style={{
                      width: `${100 / itemsPerPage}%`,
                    }}
                  >
                    <Link to={`/cake/${product.slug}`}>
                      <div className="bg-gray-100 p-4 rounded-lg shadow-lg h-full flex flex-col">
                        <img
                          src={product.mainImage}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2 text-black">
                          {product.title}
                        </h3>
                        <p className="text-lg font-bold text-blue-600">
                          Rs. {product.price}
                        </p>
                        <div className="text-center flex justify-center items-center space-x-2 text-gray-600">
                          <FaStore />
                          <p>
                            {/* Access the username from the fetched usernames state */}
                            Shop: {usernames[product.userId] || "Loading..."}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-gray-500 text-white rounded-full z-10 w-8 h-8 flex items-center justify-center"
              onClick={prevSlide}
            >
              &lt;
            </button>
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-gray-500 text-white rounded-full z-10 w-8 h-8 flex items-center justify-center"
              onClick={nextSlide}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
