import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddressPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    phoneNumber: ''
  });

  // GET Address API
  const fetchAddress = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/addrees/get', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.address) {
        setAddress(data.address);
      }
    } catch (err) {
      console.error('Error fetching address:', err);
    } finally {
      setLoading(false);
    }
  };

  // POST Address API
  const saveAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/addrees/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        setAddress(data.address);
        navigate('/payment'); // ✅ Save hone ke baad Payment page pe redirect
      } else {
        alert(data.message || 'Failed to save address');
      }
    } catch (err) {
      console.error('Error saving address:', err);
    }
  };

  useEffect(() => {
    if (token) fetchAddress();
  }, [token]);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📍 Checkout - Address</h2>

      {address ? (
        <div className="bg-white p-4 rounded shadow">
          <p><strong>{address.fullName}</strong></p>
          <p>{address.address}, {address.city}, {address.state}</p>
          <p>{address.country} - {address.pincode}</p>
          <p>📞 {address.phoneNumber}</p>

          <button
            className="mt-4 px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => navigate('/payment')}
          >
            Proceed to Pay
          </button>
        </div>
      ) : (
        <form onSubmit={saveAddress} className="space-y-3 bg-white p-4 rounded shadow">
          <input type="text" placeholder="Full Name" className="w-full border p-2 rounded"
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required />
          <input type="text" placeholder="Address" className="w-full border p-2 rounded"
            onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
          <input type="text" placeholder="City" className="w-full border p-2 rounded"
            onChange={(e) => setFormData({ ...formData, city: e.target.value })} required />
          <input type="text" placeholder="State" className="w-full border p-2 rounded"
            onChange={(e) => setFormData({ ...formData, state: e.target.value })} required />
          <input type="text" placeholder="Country" className="w-full border p-2 rounded"
            onChange={(e) => setFormData({ ...formData, country: e.target.value })} required />
          <input type="number" placeholder="Pincode" className="w-full border p-2 rounded"
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} required />
          <input type="number" placeholder="Phone Number" className="w-full border p-2 rounded"
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} required />

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Save Address
          </button>
        </form>
      )}
    </div>
  );
};

export default AddressPage;
