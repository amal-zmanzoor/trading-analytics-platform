import { FaDatabase as Database, FaChartLine as TrendingUp, FaDollarSign, FaBox } from 'react-icons/fa';

// Some mock data I used to have a better UI
export const stats = [
  { title: 'Total Trades',      value: '254',    trend: '+8.5%',  isPositive: true,  icon: Database },
  { title: 'Total Volume',      value: '32.5K',  trend: '+4.2%',  isPositive: true,  icon: TrendingUp },
  { title: 'Avg. Price',        value: '$87.55', trend: '-1.4%', isPositive: false, icon: FaDollarSign },
  { title: 'Commodities',       value: '5',      trend: '+12%',   isPositive: true,  icon: FaBox }
];