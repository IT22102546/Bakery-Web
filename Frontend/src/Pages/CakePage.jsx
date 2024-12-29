import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cart/cartSlice';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

export default function CakePage() {
  const location = useLocation();
  const { category } = queryString.parse(location.search);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [notification, setNotification] = useState({ visible: false, message: '' });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const categories = ['Birthday', 'Wedding', 'Anniversary', 'Custom']; // Example categories
  const priceRanges = [
    { label: 'Under Rs. 1000', value: '0-1000' },
    { label: 'Rs. 1000 - Rs. 3000', value: '1000-3000' },
    { label: 'Above Rs. 3000', value: '3000-' },
  ]; // Example price ranges

  useEffect(() => {
    fetchProducts();
    AOS.init();
  }, [currentPage, searchTerm, selectedCategory, selectedPriceRange]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `/api/cakes/getcakes?searchTerm=${searchTerm}&page=${currentPage}&category=${selectedCategory}&priceRange=${selectedPriceRange}`
      );
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products);
        setTotalProducts(data.totalProducts);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePriceRangeChange = (e) => {
    setSelectedPriceRange(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleAddToCart = (product) => {
    if (user) {
      dispatch(addToCart({ product, userId: user.id }));
      showNotification('Product added to the cart');
    } else {
      console.log('User not logged in');
    }
  };

  const showNotification = (message) => {
    setNotification({ visible: true, message });
    setTimeout(() => {
      setNotification({ visible: false, message: '' });
    }, 3000);
  };

  return (
    <div className="flex container mx-auto py-6">
      {/* Sidebar Filters */}
      <div className="w-1/4 p-4 bg-gray-100 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Filters</h3>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search cakes..."
            className="border px-4 py-2 rounded w-full"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="mb-4">
          <h4 className="font-semibold mb-2">Categories</h4>
          <select
            className="border px-4 py-2 rounded w-full"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Price Range</h4>
          <select
            className="border px-4 py-2 rounded w-full"
            value={selectedPriceRange}
            onChange={handlePriceRangeChange}
          >
            <option value="">All Price Ranges</option>
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="w-3/4 ml-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg shadow-lg p-4"
              data-aos="fade-up"
              data-aos-duration="500"
            >
              <Link to={`/cake/${product.slug}`}>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-60 object-cover mb-4"
                />
              </Link>
              <h3 className="text-lg font-semibold text-center mb-2">
                <Link to={`/cake/${product.slug}`}>{product.title}</Link>
              </h3>
              <p className="text-center text-gray-600">Price: Rs. {product.price}</p>
              <div className="flex justify-center mt-4 space-x-2">
                <button
                  className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Notification */}
      {notification.visible && (
        <div className="fixed bottom-0 right-0 m-4 p-2 bg-green-500 text-white rounded">
          {notification.message}
        </div>
      )}
    </div>
  );
}
