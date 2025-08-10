import React, { useState } from 'react';

const PaymentPage = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = () => {
    // ✅ Ye abhi sirf dummy logic hai
    setTimeout(() => {
      setPaymentStatus("✅ Payment Successful!");
    }, 2000); // Simulate payment delay
  };

  return (
    <div className="p-6 max-w-2xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">💳 Payment</h2>
      <p className="mb-4">Click below to simulate payment.</p>

      {!paymentStatus ? (
        <button
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handlePayment}
        >
          Pay Now
        </button>
      ) : (
        <p className="text-green-600 font-semibold mt-4">{paymentStatus}</p>
      )}
    </div>
  );
};

export default PaymentPage;
