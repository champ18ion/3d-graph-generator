import React from 'react';

const Sidebar = ({ chartType, setChartType, is3D, setIs3D }) => {
  const chartTypes = [
    { id: 'bar', icon: '📊', label: 'Bar' },
    { id: 'line', icon: '📈', label: 'Line' },
    { id: 'pie', icon: '🍩', label: 'Pie' },
    { id: 'scatter', icon: '🧮', label: 'Scatter' },
  ];

  return (
    <div className="flex flex-col gap-2 mt-4">
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 lg:px-2 text-center lg:text-left">
        2D Charts
      </div>
      {chartTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => {
            setChartType(type.id);
            setIs3D(false);
          }}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-medium
            ${
              chartType === type.id && !is3D
                ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
          <span className="text-xl">{type.icon}</span>
          <span className="hidden lg:inline">{type.label}</span>
        </button>
      ))}

      <div className="mt-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 lg:px-2 text-center lg:text-left">
        3D Charts
      </div>

      <button
        onClick={() => {
          setChartType('bar');
          setIs3D(true);
        }}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-medium
          ${
            chartType === 'bar' && is3D
              ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
      >
        <span className="text-xl">🏢</span>
        <span className="hidden lg:inline">3D Bar</span>
      </button>

      <button
        onClick={() => {
          setChartType('scatter');
          setIs3D(true);
        }}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-medium
          ${
            chartType === 'scatter' && is3D
              ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
      >
        <span className="text-xl">🌌</span>
        <span className="hidden lg:inline">3D Scatter</span>
      </button>
    </div>
  );
};

export default Sidebar;