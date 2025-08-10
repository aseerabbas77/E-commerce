// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <div className="font-bold text-xl text-indigo-600">
        <Link to="/">Ecommerce</Link>
      </div>

      <div className="space-x-4 flex items-center">
        <Link to="/mobile" className="hover:text-indigo-600">Mobile</Link>
        <Link to="/laptop" className="hover:text-indigo-600">Laptop</Link>

        {user && (
          <>
            <Link to="/cart" className="hover:text-indigo-600">🛒 Cart</Link>
            <button
              onClick={logout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          </>
        )}

        {!user && (
          <>
            <Link to="/login" className="hover:text-indigo-600">Login</Link>
            <Link to="/signup" className="hover:text-indigo-600">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
