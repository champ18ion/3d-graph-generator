import React from 'react';

const ChartConfig = ({ config, setConfig, is3D, chartType }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig({
      ...config,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="flex flex-col gap-4 text-sm font-medium text-gray-700">
      <div className="flex flex-col gap-1">
        <label htmlFor="title">Chart Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={config.title}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm outline-none"
        />
      </div>

      {(!['pie'].includes(chartType) || is3D) && (
        <>
          <div className="flex flex-col gap-1">
            <label htmlFor="xAxisLabel">X-Axis Label</label>
            <input
              type="text"
              id="xAxisLabel"
              name="xAxisLabel"
              value={config.xAxisLabel}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="yAxisLabel">Y-Axis Label</label>
            <input
              type="text"
              id="yAxisLabel"
              name="yAxisLabel"
              value={config.yAxisLabel}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm outline-none"
            />
          </div>
        </>
      )}

      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          id="showLegend"
          name="showLegend"
          checked={config.showLegend}
          onChange={handleChange}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="showLegend" className="cursor-pointer">Show Legend</label>
      </div>

      <div className="flex flex-col gap-1 mt-2">
         <label htmlFor="theme">Color Theme</label>
         <select
            id="theme"
            name="theme"
            value={config.theme}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm outline-none bg-white"
         >
            <option value="default">Default Palette</option>
            <option value="dark">Dark Theme</option>
            <option value="vintage">Vintage</option>
            <option value="macarons">Macarons</option>
         </select>
      </div>
    </div>
  );
};

export default ChartConfig;