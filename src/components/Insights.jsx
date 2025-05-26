import InsightsPanel from './InsightsPanel';

const Insights = ({ refreshKey }) => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Insights</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Full Insights</h2>
          <InsightsPanel key={refreshKey} />
        </div>
      </div>
    </div>
  );
};

export default Insights;