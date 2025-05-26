import React, { useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:8000';

/**
 * TradesTable component: fetches and displays a list of trades,
 */
const TradesTable = ( {limit} ) => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const displayTrades = limit ? trades.slice(0, limit) : trades;

  // Load trades from backend
  const loadTrades = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/trades`, {
        method: 'GET',
        mode: 'cors'
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setTrades(data);
    } catch (err) {
      setError(`Failed to load trades: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrades();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading trades...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

return (
  <div className="w-full">
    {trades.length === 0 ? (
      <div className="text-center text-gray-400">No trades available.</div>
    ) : (
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-800 text-blue-400">
              <th className="border-b border-gray-700 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-200">#</th>
              <th className="border-b border-gray-700 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Commodity</th>
              <th className="border-b border-gray-700 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Trader ID</th>
              <th className="border-b border-gray-700 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
              <th className="border-b border-gray-700 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
              <th className="border-b border-gray-700 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 bg-gray-800/50">
            {displayTrades.map((t, idx) => (
              <tr 
                key={idx} 
                className="text-gray-300 hover:bg-gray-700/50 transition-colors duration-150"
              >
                <td className="px-4 py-2.5 text-sm">{idx + 1}</td>
                <td className="px-4 py-2.5 text-sm font-medium">{t.commodity}</td>
                <td className="px-4 py-2.5 text-sm">{t.traderId}</td>
                <td className="px-4 py-2.5 text-sm">{t.quantity.toLocaleString()}</td>
                <td className="px-4 py-2.5 text-sm font-medium text-gray-400">
                  ${t.price.toFixed(2)}
                </td>
                <td className="px-4 py-2.5 text-sm text-gray-400">
                  {new Date(t.timestamp).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
         {limit && trades.length > limit && (
            <div className="bg-gray-800 px-4 py-2 text-sm text-gray-400 border-t border-gray-700">
              Showing {limit} of {trades.length} trades
            </div>
          )}
      </div>
    )}
  </div>
);
};

export default TradesTable;
