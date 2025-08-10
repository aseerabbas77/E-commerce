import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Mobile = () => {
  const [mobiles, setMobiles] = useState([]);
  const navigate = useNavigate();
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchMobiles = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/product/getProducts');
        const allProducts = res.data.products || res.data;

        const mobileProducts = allProducts.filter(
          (product) => product.category.toLowerCase() === 'mobile'
        );

        setMobiles(mobileProducts);
      } catch (err) {
        console.error('Error fetching mobile products:', err.message);
      }
    };

    fetchMobiles();
  }, []);

  // ✅ Add to Cart logic based on your backend API
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
        qty: 1, // Start with 1 qty
        imgSrc: product.imgSrc,
      };

      const response = await axios.post(
        'http://localhost:5000/api/cart/add',
        cartItem,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token to validate user
          },
        }
      );

      alert('✅ Item added to cart successfully!');
      console.log('Cart updated:', response.data);

    } catch (error) {
      console.error('❌ Error adding to cart:', error.response?.data || error.message);
      alert('❌ Failed to add item to cart');
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 bg-gradient-to-r from-blue-50 to-blue-100">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-14 tracking-tight">
        📱 Trending Mobiles Collection
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {mobiles.length > 0 ? (
          mobiles.map((product) => (
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
          <p className="text-center col-span-full text-gray-500 text-lg">No mobile products found.</p>
        )}
      </div>
    </div>
  );
};

export default Mobile;
