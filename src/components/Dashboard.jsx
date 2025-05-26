import StatsCard from '../components/StatsCard';
import TradesTable from '../components/TradesTable';
import InsightsPanel from '../components/InsightsPanel';
import NewTradeForm from '../components/NewTradeForm';
import { stats } from '../data/statsData';

const Dashboard = ({ refreshKey, handleRefresh }) => {
  return (
    <div className="p-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(card => (
          <StatsCard key={card.title} {...card} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Trades</h2>
            <TradesTable key={refreshKey} limit={5} />
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Add New Trade</h2>
            <NewTradeForm onSuccess={handleRefresh} />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Insights</h2>
            <InsightsPanel key={refreshKey} limit={5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;