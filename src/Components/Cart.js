import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Cart Data
  const fetchCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.cart && data.cart.items) {
        setCartItems(data.cart.items);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('❌ Error fetching cart:', error.message);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  // Decrease Quantity API
  const handleDecrease = async (productId) => {
    try {
      const response = await fetch('http://localhost:5000/api/cart/decrease-qty', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error('Failed to decrease quantity');
      }

      const data = await response.json();

      if (data.cart && data.cart.items) {
        setCartItems(data.cart.items);
      } else {
        setCartItems((prev) =>
          prev
            .map((item) =>
              item.productId === productId ? { ...item, qty: item.qty - 1 } : item
            )
            .filter((item) => item.qty > 0)
        );
      }
    } catch (error) {
      console.error('❌ Error decreasing quantity:', error.message);
    }
  };

  // Remove Item API
  const handleRemove = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove item');
      }

      const data = await response.json();

      if (data.cart && data.cart.items) {
        setCartItems(data.cart.items);
      } else {
        setCartItems((prev) => prev.filter((item) => item.productId !== productId));
      }
    } catch (error) {
      console.error('❌ Error removing item:', error.message);
    }
  };

  // Clear Cart API
  const handleClearCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart/clear', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }

      setCartItems([]);
    } catch (error) {
      console.error('❌ Error clearing cart:', error.message);
    }
  };

  // ✅ Total Price Calculation
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">🛒 Your Cart</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-xl shadow-md"
              >
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  className="w-24 h-24 object-contain mb-4 md:mb-0"
                />
                <div className="flex-1 md:ml-6 text-center md:text-left">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                  <p className="text-blue-600 font-semibold">
                    ${item.price} x {item.qty} = ${(item.price * item.qty).toFixed(2)}
                  </p>

                  <div className="mt-2 flex gap-2 justify-center md:justify-start">
                    <button
                      onClick={() => handleDecrease(item.productId)}
                      className="px-3 py-1 bg-yellow-200 hover:bg-yellow-300 rounded"
                    >
                      ➖
                    </button>
                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="px-3 py-1 bg-red-200 hover:bg-red-300 rounded"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Total Price & Checkout */}
          <div className="mt-6 bg-gray-100 p-4 rounded-xl text-center shadow">
            <h3 className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</h3>
            <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={handleClearCart}
                className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                🧹 Clear Cart
              </button>
             <button
  onClick={() => navigate('/checkout/address')}
  className="px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600"
>
  ✅ Proceed to Checkout
</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
