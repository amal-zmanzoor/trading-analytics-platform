import React, { useState } from 'react';
import { postTrades } from '../api';

/**
 * NewTradeForm component: collects trade details and submits to backend
 * @param {Function} onSuccess - callback to invoke after successful submission
 */
const NewTradeForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    commodity: '',
    traderId: '',
    price: '',
    quantity: '',
    timestamp: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

 const validate = async () => {
    const { commodity, traderId, price, quantity, timestamp } = form;
    
    if (!commodity || !traderId || !price || !quantity || !timestamp) {
      return 'All fields are required.';
    }

    // Add trader ID format validation
    if (!/^T\d+$/.test(traderId)) {
      return 'Trader ID must start with T followed by numbers (e.g., T123)';
    }

    // Check for duplicate trader ID
    try {
      const response = await fetch('http://localhost:8000/trades');
      const existingTrades = await response.json();
      const isDuplicate = existingTrades.some(trade => trade.traderId === traderId);
      if (isDuplicate) {
        return 'This Trader ID already exists. Please use a unique ID.';
      }
    } catch (err) {
      console.error('Error checking for duplicates:', err);
      return 'Error checking for duplicate trades';
    }

    if (parseFloat(price) <= 0 || isNaN(parseFloat(price))) {
      return 'Price must be a positive number.';
    }
    if (!Number.isInteger(Number(quantity)) || Number(quantity) <= 0) {
      return 'Quantity must be a positive integer.';
    }
    if (isNaN(new Date(timestamp).getTime())) {
      return 'Timestamp must be a valid date-time.';
    }
    return null;
};

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const validationError = await validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await postTrades([{ ...form, price: parseFloat(form.price), quantity: parseInt(form.quantity, 10) }]);
      setForm({ commodity: '', traderId: '', price: '', quantity: '', timestamp: '' });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000); 
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-900/50 border border-red-500/50 text-red-400 px-4 py-2.5 rounded-md text-sm">
          {error}
        </div>
      )}

      {showSuccess && (
        <div className="bg-green-900/50 border border-green-500/50 text-green-400 px-4 py-2.5 rounded-md text-sm">
          Trade added successfully!
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label htmlFor="commodity" className="block text-sm font-medium text-gray-300">
            Commodity
          </label>
          <input
            type="text"
            name="commodity"
            id="commodity"
            value={form.commodity}
            onChange={handleChange}
            className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter commodity"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="traderId" className="block text-sm font-medium text-gray-300">
            Trader ID
          </label>
          <input
            type="text"
            name="traderId"
            id="traderId"
            value={form.traderId}
            onChange={handleChange}
            className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter trader ID"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="price" className="block text-sm font-medium text-gray-300">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            name="price"
            id="price"
            value={form.price}
            onChange={handleChange}
            className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="0.00"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-300">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter quantity"
          />
        </div>

        <div className="col-span-2 space-y-1.5">
          <label htmlFor="timestamp" className="block text-sm font-medium text-gray-300">
            Timestamp
          </label>
          <input
            type="datetime-local"
            name="timestamp"
            id="timestamp"
            value={form.timestamp}
            onChange={handleChange}
            className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
        >
          {loading ? 'Adding Trade...' : 'Add Trade'}
        </button>
      </div>
    </form>
  );
};

export default NewTradeForm;

