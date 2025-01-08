import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function SweetItems() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/sweets/getsweets?limit=8'); 
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-transparent py-16 w-full">
      <div className="relative mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div>
            <h2 className="text-3xl font-bold">Sweets</h2>
            <p className="text-md text-gray-600">Check out some of Sweet Items. These top buying Sweets!</p>
          </div>
          <Link to="/sweets">
            <button className="text-md bg-black text-white py-2 px-4 hover:bg-blue-700 rounded-lg">
              View All
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-100 p-4 rounded-lg shadow-lg">
              <Link to={`/sweet/${product.slug}`}>
                <img src={product.mainImage} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-black">{product.title}</h3>
              </Link>
              <p className="text-lg font-bold text-blue-600">Rs. {product.price}</p>
              <p className="text-md text-gray-600">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}