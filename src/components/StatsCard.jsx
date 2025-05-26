import { ArrowUp, ArrowDown } from 'lucide-react';

const StatsCard = ({ title, value, trend, isPositive, icon: Icon }) => (
  <div className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4">
    <Icon className="w-8 h-8 text-indigo-400" />
    <div className="flex-1">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-semibold text-white">{value}</p>
    </div>
    <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>{isPositive ? <ArrowUp className="w-5 h-5"/> : <ArrowDown className="w-5 h-5"/>}<span className="text-sm">{trend}</span></div>
  </div>
);

export default StatsCard;