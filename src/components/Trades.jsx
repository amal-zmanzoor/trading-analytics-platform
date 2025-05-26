import TradesTable from '../components/TradesTable';

const Trades = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-6">All Trades</h1>
      <div className="bg-gray-800 rounded-lg p-6">
        <TradesTable />
      </div>
    </div>
  );
};

export default Trades;