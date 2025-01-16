import React, { useState } from "react";
import PieChartBuilder from "./PieChart/PieChartBuilder";
import PieChartDisplay from "./PieChart/PieChartDisplay";
import BarChartBuilder from "./BarChart/BarChartBuilder";
import BarChartDisplay from "./BarChart/BarChartDisplay";
import LineChartBuilder from "./LineChart/LineChartBuilder";
import LineChartDisplay from "./LineChart/LineChartDisplay";

const ChartSelector = ({ selectedChart }) => {
  const [selectedPieType, setSelectedPieType] = useState("type1");
  const [slices, setSlices] = useState([]);
  const [barData, setBarData] = useState([]);
  const [barChartType, setBarChartType] = useState('basic'); // barChartType state
  const [lineData, setLineData] = useState([
    {
      label: "Line 1",
      data: [
        { label: "Point 1", value: 30 },
        { label: "Point 2", value: 50 },
      ],
    },
  ]);

  // Handle pie chart type selection
  const handlePieChartTypeChange = (e) => {
    setSelectedPieType(e.target.value);
  };


  if (!selectedChart) {
    return (
      <div className="flex justify-center items-center h-full">
        <h2 className="text-xl font-semibold text-gray-700">
          Please select a chart type to continue.
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left pane for customization */}
      <div className="w-full md:w-1/3 p-6 bg-gradient-to-r from-indigo-100 via-blue-200 to-indigo-300 rounded-lg shadow-xl space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800">
          Chart Customization
        </h3>

        {/* Pie Chart Type Selection */}
        {selectedChart === "pie" && (
          <>
            <div className="mt-6 text-sm text-gray-600">
              <p className="font-medium">Select a type for your Pie chart:</p>
              <p>
                {selectedPieType === "type1"
                  ? "Nightingale Chart (Rose)"
                  : selectedPieType === "type2"
                  ? "Standard Pie Chart"
                  : "Customized Pie Chart"}
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2 justify-between items-center">
                <button
                  onClick={() => setSelectedPieType("simple")}
                  className={`py-2 px-2 rounded-full text-xs font-semibold ${
                    selectedPieType === "simple"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500"
                  } border-2 border-blue-500 transition-all duration-300`}
                >
                  Simple
                </button>
                <button
                  onClick={() => setSelectedPieType("type1")}
                  className={`py-2 px-2 rounded-full text-xs font-semibold ${
                    selectedPieType === "type1"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500"
                  } border-2 border-blue-500 transition-all duration-300`}
                >
                  Nightingale
                </button>
                <button
                  onClick={() => setSelectedPieType("type2")}
                  className={`py-2 px-2 rounded-full text-xs font-semibold ${
                    selectedPieType === "type2"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500"
                  } border-2 border-blue-500 transition-all duration-300`}
                >
                  Doughnut
                </button>
                <button
                  onClick={() => setSelectedPieType("type3")}
                  className={`py-2 px-2 rounded-full text-xs font-semibold ${
                    selectedPieType === "type3"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500"
                  } border-2 border-blue-500 transition-all duration-300`}
                >
                  RosePie
                </button>
              </div>
            </div>
          </>
        )}
        {selectedChart === "bar" && (
          <>
            <div className="mt-6 text-sm text-gray-600">
              <p className="font-medium">Select a type for your Bar chart:</p>
              <p>
                {barChartType === "basic"
                  ? "Basic Bar Chart"
                  : barChartType === "stacked"
                  ? "Stacked Column"
                  : barChartType === "stacked-horizontal"
                  ? "Stacked Horizontal"
                  : "Bar Race"}
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2 justify-center items-center">
                <button
                  onClick={() => setBarChartType("basic")}
                  className={`py-2 px-2 rounded-full text-xs font-semibold ${
                    barChartType === "basic"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500"
                  } border-2 border-blue-500 transition-all duration-300`}
                >
                  Basic
                </button>
                <button
                  onClick={() => setBarChartType("stacked-horizontal")}
                  className={`py-2 px-2 rounded-full text-xs font-semibold ${
                    barChartType === "stacked-horizontal"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500"
                  } border-2 border-blue-500 transition-all duration-300`}
                >
                 Horizontal
                </button>
              </div>
            </div>
          </>
        )}

        {/* Render Pie Chart Builder */}
        {selectedChart === "pie" && (
          <div className="mt-6 bg-transparent p-4 rounded-lg max-w-xl mx-auto space-y-4">
            <PieChartBuilder onUpdate={setSlices} />
          </div>
        )}

        {/* Render Bar and Line Chart Builders (for respective chart types) */}
        {selectedChart === "bar" && (
          <BarChartBuilder onUpdate={setBarData} chartType={barChartType} />
        )}
        {selectedChart === "line" && (
          <LineChartBuilder onUpdate={setLineData} data={lineData} />
        )}
      </div>

      {/* Right pane for chart display (Seamlessly merges with background) */}
      <div className="flex-1 p-6 bg-transparent">
        <div className="h-full">
          {/* Display Pie Chart */}
          {selectedChart === "pie" && (
            <PieChartDisplay slices={slices} chartType={selectedPieType} />
          )}

          {/* Display Bar Chart */}
          {selectedChart === "bar" && (
            <BarChartDisplay data={barData} barChartType={barChartType} />
          )}

          {/* Display Line Chart */}
          {selectedChart === "line" && <LineChartDisplay data={lineData} />}
        </div>
      </div>
    </div>
  );
};

export default ChartSelector;
