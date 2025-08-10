import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // adjust path as needed

const Laptop = () => {
  const [laptops, setLaptops] = useState([]);
  const navigate = useNavigate();
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/product/getProducts');
        const allProducts = res.data.products || res.data;

        const laptopProducts = allProducts.filter(
          (product) => product.category.toLowerCase() === 'laptop'
        );

        setLaptops(laptopProducts);
      } catch (err) {
        console.error('Error fetching laptop products:', err.message);
      }
    };

    fetchLaptops();
  }, []);

  // ✅ Updated Add to Cart function
  const handleAddToCart = async (product) => {
    if (!token) {
      alert('Please login first!');
      navigate('/login');
      return;
    }

    try {
      const cartItem = {
        productId: product._id,
        title: product.title,
        price: product.price,
        qty: 1,
        imgSrc: product.imgSrc,
      };

      const response = await axios.post(
        'http://localhost:5000/api/cart/add',
        cartItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('✅ Product added to cart!');
      console.log('Cart updated:', response.data);
    } catch (err) {
      console.error('❌ Add to cart error:', err.response?.data || err.message);
      alert('❌ Failed to add to cart');
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 bg-gradient-to-r from-gray-100 to-gray-200">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-14 tracking-tight">
        💻 Trending Laptops Collection
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {laptops.length > 0 ? (
          laptops.map((product) => (
            <div
              key={product._id}
              className="group relative bg-white rounded-3xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  className="h-48 w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{product.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-indigo-600 text-lg font-bold">${product.price}</span>
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full uppercase tracking-wide">
                    {product.category}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md transition"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg">No laptop products found.</p>
        )}
      </div>
    </div>
  );
};

export default Laptop;
