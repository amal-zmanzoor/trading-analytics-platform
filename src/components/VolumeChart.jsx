import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { date: 'Jan', volume: 1500 },
  { date: 'Feb', volume: 2000 },
  { date: 'Mar', volume: 1800 },
  { date: 'Apr', volume: 2400 },
  { date: 'May', volume: 2200 },
  { date: 'Jun', volume: 2600 },
  { date: 'Jul', volume: 3000 },
];

const VolumeChart = () => {
  const [data] = useState(mockData);

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-gray-100">Volume Over Time</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#8884d8" />
          <YAxis stroke="#8884d8" />
          <Tooltip />
          <Line type="monotone" dataKey="volume" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VolumeChart;
