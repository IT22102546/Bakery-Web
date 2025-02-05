import { useEffect, useState } from "react";
import { FaShoppingCart, FaStore } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/cart/cartSlice"; // Import cart action

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [usernames, setUsernames] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const { currentUser: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await fetch("/api/cakes/featured");
        const data = await res.json();
        if (res.ok) {
          setFeaturedProducts(data);
          fetchUsernames(data);
        } else {
          console.error("Error fetching featured products");
        }
      } catch (error) {
        console.error("Fetch Error:", error.message);
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
          fetchedUsernames[product.userId] = data.username;
        }
      } catch (error) {
        console.error("Error fetching username:", error.message);
      }
    }
    setUsernames(fetchedUsernames);
  };

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 768) setItemsPerPage(2);
      else if (window.innerWidth < 1024) setItemsPerPage(3);
      else setItemsPerPage(4);
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

  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Prevents navigation
    if (user) {
      dispatch(addToCart({ product, userId: user.id, storename: usernames[product.userId] }));
      alert("Product added to the cart");
    } else {
      alert("Please log in to add items to the cart.");
    }
  };

  return (
    <div className="bg-transparent border-r-emerald-900 py-16 w-full">
      <div className="w-full px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-center md:text-left">Signature Cakes</h2>
          <p className="text-md text-gray-600 max-w-md text-center md:text-left">
            Discover Signature Cakes selected for their outstanding quality and design. These items are sure to enhance your events.
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
                {featuredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="flex-shrink-0 px-2"
                    style={{
                      width: `${100 / itemsPerPage}%`,
                    }}
                  >
                    <div className="bg-gray-100 p-4 rounded-lg shadow-lg h-full flex flex-col">
                      {/* Wrap image and title in Link (Clickable for product details) */}
                      <Link to={`/cake/${product.slug}`} className="block">
                        <img
                          src={product.mainImage}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2 text-black">{product.title}</h3>
                      </Link>

                      <p className="text-lg font-bold text-blue-600">Rs. {product.price}</p>
                      <div className="text-center flex justify-center items-center space-x-2 text-gray-600">
                        <FaStore />
                        <p>Shop: {usernames[product.userId] || "Loading..."}</p>
                      </div>

                      {/* Add to Cart Button (OUTSIDE the <Link> tag) */}
                      <div className="flex justify-center mt-4">
                        <button
                          className="bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-700 transition-all"
                          onClick={(e) => handleAddToCart(e, product)}
                        >
                          <FaShoppingCart className="inline mr-2" /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
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
