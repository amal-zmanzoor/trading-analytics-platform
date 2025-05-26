import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Trades from './components/Trades'
import Insights from './components/Insights';

const App = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => setRefreshKey(prev => prev + 1);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <div className="flex">
          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 p-6">
            <h1 className="text-2xl font-bold text-white mb-8">Trade Analytics</h1>
            <nav className="space-y-4">
              <Link to="/" className="block text-gray-300 hover:text-white">Dashboard</Link>
              <Link to="/trades" className="block text-gray-300 hover:text-white">Trades</Link>
              <Link to="/insights" className="block text-gray-300 hover:text-white">Insights</Link>
            </nav>
          </div>

          {/* Main Content */}
          <div className="ml-64 flex-1">
            <Routes>
              <Route 
                path="/" 
                element={<Dashboard refreshKey={refreshKey} handleRefresh={handleRefresh} />} 
              />
              <Route 
                path="/trades" 
                element={<Trades />} 
              />
              <Route 
                path="/insights" 
                element={<Insights refreshKey={refreshKey} />} 
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;