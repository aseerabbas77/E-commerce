// App.js ✅ — BrowserRouter اور AuthProvider یہاں مت ہٹانا اگر وہ index.js میں already ہیں
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.js';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './Components/Cart.js';
import Mobile from './Components/Mobile';
import Laptop from './Components/Laptop';
import ProtectedRoute from './Components/ProtectedRoute.js';

// ✅ New Pages
import AddressPage from './Components/AddressPage.js';
import PaymentPage from './Components/PaymentPage.js';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/laptop" element={<Laptop />} />

        {/* Protected Routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout/address"
          element={
            <ProtectedRoute>
              <AddressPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
