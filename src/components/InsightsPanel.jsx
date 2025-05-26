import React, { useState, useEffect } from 'react';
import { FaBoxes, FaDollarSign, FaUsers } from 'react-icons/fa';

const BASE_URL = 'http://localhost:8000';


const InsightsPanel = ({ limit = null }) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch insights from backend
  const loadInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/insights`, {
        method: 'GET',
        mode: 'cors'
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setInsights(data);
    } catch (err) {
      setError(`Failed to load insights: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading insights...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  if (!insights) {
  return (
    <div className="text-center p-4 text-gray-500">
      No insights available. Add some trades to see analytics.
    </div>
  );
}

  const { totalVolumeByCommodity, averagePriceByCommodity, topTradersByVolume } = insights;

return (
  <div className="space-y-4 text-gray-200">
    {/* Volume Section */}
    <div className="bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-indigo-500/50 transition-colors p-4">
      <div className="flex items-center gap-2 mb-1">
        <FaBoxes className="text-indigo-400 text-xl" />
        <h3 className="font-medium text-gray-200">Volume by Commodity</h3>
      </div>
      <p className="text-xs text-gray-400 mb-1">Total quantity traded for each commodity across all transactions</p>
      <div className="px-2">
        {Object.entries(totalVolumeByCommodity).slice(0, limit || undefined).map(([commodity, volume]) => (
          <div key={commodity} className="flex justify-between items-center rounded hover:bg-gray-700/50">
            <span className="text-gray-400">{commodity}</span>
            <span className="font-semibold">{volume.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Price Section */}
    <div className="bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-green-500/50 transition-colors p-4">
      <div className="flex items-center gap-2 mb-1">
        <FaDollarSign className="text-green-400 text-xl" />
        <h3 className="font-medium text-gray-200">Average Price</h3>
      </div>
      <p className="text-xs text-gray-400 mb-1">Mean price per unit for each commodity over time</p>
      <div className="px-2">
        {Object.entries(averagePriceByCommodity).slice(0, limit || undefined).map(([commodity, price]) => (
          <div key={commodity} className="flex justify-between items-center rounded hover:bg-gray-700/50">
            <span className="text-gray-400">{commodity}</span>
            <span className="font-semibold">${price.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Top Traders Section */}
    <div className="bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-colors p-4">
      <div className="flex items-center gap-2 mb-1">
        <FaUsers className="text-blue-400 text-xl" />
        <h3 className="font-medium text-gray-200">Top Traders</h3>
      </div>
      <p className="text-xs text-gray-400 mb-1">Highest volume traders ranked by total quantity traded</p>
      <div className="px-2">
        {topTradersByVolume.slice(0, 5).slice(0, Math.min(limit || 5, 5)).map(({ traderId, volume }, index) => (
          <div key={traderId} className="flex justify-between items-center rounded hover:bg-gray-700/50">
            <div className="flex items-center">
              <span className="text-gray-400 w-6">{index + 1}.</span>
              <span className="text-gray-300">{traderId}</span>
            </div>
            <span className="font-semibold">{volume.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

};

export default InsightsPanel;
