import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cart/cartSlice';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaSearch, FaShoppingCart, FaTag, FaStore } from 'react-icons/fa';

export default function Sweets() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const { category } = queryString.parse(location.search);  
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [notification, setNotification] = useState({ visible: false, message: '' });
  const { search: searchQuery } = queryString.parse(location.search);
  const [searchTerm, setSearchTerm] = useState(searchQuery || '');

  const categories = ['Vegan', 'Non-Vegan', 'Gluten-Free', 'Sugar-Free', 'Halal', 'Uncategorized'];
  const priceRanges = [
    { label: 'Under Rs. 1000', value: '0-1000' },
    { label: 'Rs. 1000 - Rs. 3000', value: '1000-3000' },
    { label: 'Above Rs. 3000', value: '3000-1000000000000' },
  ];

  useEffect(() => {
    fetchProducts();
    AOS.init();
  }, [searchTerm, selectedCategory, selectedPriceRange]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `/api/sweets/getsweets?searchTerm=${searchTerm}&category=${selectedCategory}&priceRange=${selectedPriceRange}`
      );
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (!searchTerm.trim()) return;
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    navigate(`/sweets?searchTerm=${encodedSearchTerm}&category=${selectedCategory}&priceRange=${selectedPriceRange}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearchSubmit();
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    navigate(`/sweets?searchTerm=${searchTerm}&category=${e.target.value}&priceRange=${selectedPriceRange}`);
  };

  const handlePriceRangeChange = (e) => {
    setSelectedPriceRange(e.target.value);
    navigate(`/sweets?searchTerm=${searchTerm}&category=${selectedCategory}&priceRange=${e.target.value}`);
  };

  const handleAddToCart = (product) => {
    if (user) {
      dispatch(addToCart({ product, userId: user.id , storename:product.userId.username }));
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
        <h3 className="text-xl font-semibold mb-4 text-center">Filters</h3>

        {/* Search Input */}
        <div className="mb-4">
          <div className="flex items-center border px-4 py-2 rounded w-full">
            <FaSearch className="mr-2 cursor-pointer" onClick={handleSearchSubmit} />
            <input
              type="text"
              placeholder="Search Sweets..."
              className="w-full outline-none"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        {/* Categories Filter */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Categories</h4>
          <select className="border px-4 py-2 rounded w-full" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <h4 className="font-semibold mb-2">Price Range</h4>
          <select className="border px-4 py-2 rounded w-full" value={selectedPriceRange} onChange={handlePriceRangeChange}>
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
            <div key={product._id} className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition-all" data-aos="fade-up" data-aos-duration="500">
              <Link to={`/sweet/${product.slug}`}>
                <img src={product.images[0]} alt={product.title} className="w-full h-60 object-cover mb-4 rounded" />
              </Link>
              <h3 className="text-lg font-semibold text-center mb-2 hover:text-blue-600">
                <Link to={`/sweet/${product.slug}`}>{product.title}</Link>
              </h3>
              <div className="text-center flex justify-center items-center space-x-2 text-gray-600">
                <FaTag />
                <p>Price: Rs. {product.price}</p>
              </div>
              <div className="text-center flex justify-center items-center space-x-2">
                <FaTag />
                <p className={`${product.isAvailable ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                  {product.isAvailable ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
              <div className="text-center flex justify-center items-center space-x-2 text-gray-600">
                <FaStore />
                <p>Shop: {product.userId?.username}</p>
              </div>
              <div className="flex justify-center mt-4 space-x-2">
                <button className="bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-700 transition-all" onClick={() => handleAddToCart(product)}>
                  <FaShoppingCart className="inline mr-2" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
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
