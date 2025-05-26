const BASE_URL = 'http://localhost:8000';

/**
 * Fetch the list of all trades.
 * @returns {Promise<Array>} Array of trade objects
 */
export async function fetchTrades() {
  const response = await fetch(`${BASE_URL}/trades`);
  if (!response.ok) {
    throw new Error(`Error fetching trades: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Post new trades to the backend.
 * @param {Array} newTrades - Array of trade objects
 * @returns {Promise<Object>} Server response message
 */
export async function postTrades(newTrades) {
  const response = await fetch(`${BASE_URL}/trades`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTrades)
  });
  const data = await response.json();
  if (!response.ok) {
    const errorMessage = data.detail || data.message || 'Error adding trades';
    throw new Error(errorMessage);
  }
  return data;
}

/**
 * Fetch computed insights from the backend.
 * @returns {Promise<Object>} Insights data including volumes and top traders
 */
export async function fetchInsights() {
  const response = await fetch(`${BASE_URL}/insights`);
  const data = await response.json();
  if (!response.ok) {
    const errorMessage = data.detail || 'Error fetching insights';
    throw new Error(errorMessage);
  }
  return data;
}
