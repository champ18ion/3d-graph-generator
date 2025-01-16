import React from "react";
import ChartSelector from "./ChartSelector";

const Layout = ({ children }) => {
  const [selectedChart, setSelectedChart] = React.useState(null); // Initial state as null

  // Handle chart tab selection
  const handleTabClick = (chartType) => {
    setSelectedChart(chartType);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-light shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-sm font-bold">Chart Builder</h1>
          {/* Tab navigation */}
          <div className="flex space-x-4">
            <button
              onClick={() => handleTabClick("pie")}
              className={`px-4 py-2 rounded ${
                selectedChart === "pie"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Pie Chart
            </button>
            <button
              onClick={() => handleTabClick("line")}
              className={`px-4 py-2 rounded ${
                selectedChart === "line"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Line Chart
            </button>
            <button
              onClick={() => handleTabClick("bar")}
              className={`px-4 py-2 rounded ${
                selectedChart === "bar"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Bar Chart
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-6">
        {/* Pass the selected chart type to children */}
        <ChartSelector selectedChart={selectedChart} />
      </main>
    </div>
  );
};

export default Layout;
