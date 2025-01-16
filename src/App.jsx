// import React, { useState } from 'react';
// import ReactECharts from 'echarts-for-react';
// import 'echarts/theme/macarons';
// import html2canvas from 'html2canvas';

// const App = () => {
//   const [chartData, setChartData] = useState({
//     title: 'Sales Data',
//     chartType: 'line', // line, bar, pie
//     xAxisLabel: 'Months',
//     yAxisLabel: 'Sales',
//     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
//     series: [
//       {
//         name: 'Product A',
//         data: [10, 20, 30, 40, 50],
//         color: '#ff0000',
//       },
//       {
//         name: 'Product B',
//         data: [5, 15, 25, 35, 45],
//         color: '#00ff00',
//       },
//     ],
//     rotation3D: false,
//   });

//   // Handle changes in chart customization for line and bar charts
//   const handleDataChange = (index, e) => {
//     const newSeries = [...chartData.series];
//     newSeries[index].data = e.target.value.split(',').map(Number);
//     setChartData({ ...chartData, series: newSeries });
//   };

//   const handleColorChange = (index, e) => {
//     const newSeries = [...chartData.series];
//     newSeries[index].color = e.target.value;
//     setChartData({ ...chartData, series: newSeries });
//   };

//   const handleChartTypeChange = (e) => {
//     setChartData({ ...chartData, chartType: e.target.value });
//   };

//   const handleTitleChange = (e) => {
//     setChartData({ ...chartData, title: e.target.value });
//   };

//   const handleRotationChange = () => {
//     setChartData({ ...chartData, rotation3D: !chartData.rotation3D });
//   };

//   // Handle pie chart data input change (for multiple slices with individual colors)
//   const handlePieDataChange = (index, label, field, e) => {
//     const newSeries = [...chartData.series];
//     newSeries[index].data = newSeries[index].data.map(item =>
//       item.name === label ? { ...item, [field]: e.target.value } : item
//     );
//     setChartData({ ...chartData, series: newSeries });
//   };

//   // Add a new slice to pie chart
//   const addPieSlice = (index) => {
//     const newSeries = [...chartData.series];
//     newSeries[index].data.push({ name: `New Slice ${newSeries[index].data.length + 1}`, value: 0, color: '#000000' });
//     setChartData({ ...chartData, series: newSeries });
//   };

//   // Remove a slice from pie chart
//   const removePieSlice = (index, label) => {
//     const newSeries = [...chartData.series];
//     newSeries[index].data = newSeries[index].data.filter(item => item.name !== label);
//     setChartData({ ...chartData, series: newSeries });
//   };

//   // Prepare the chart options
//   const getOption = () => {
//     const seriesData = chartData.series.map((series) => {
//       const commonProps = {
//         name: series.name,
//         itemStyle: { color: series.color },
//       };

//       if (chartData.chartType === 'pie') {
//         return {
//           ...commonProps,
//           type: chartData.chartType,
//           data: series.data.map(item => ({ ...item, itemStyle: { color: item.color } })), // Apply color for each slice
//         };
//       }

//       return {
//         ...commonProps,
//         type: chartData.chartType,
//         data: series.data, // Line and Bar charts use simple arrays
//       };
//     });

//     return {
//       title: {
//         text: chartData.title,
//       },
//       tooltip: {},
//       xAxis: {
//         type: 'category',
//         data: chartData.categories,
//         name: chartData.xAxisLabel,
//       },
//       yAxis: {
//         type: 'value',
//         name: chartData.yAxisLabel,
//       },
//       series: seriesData,
//       ...(chartData.rotation3D && {
//         graphic: {
//           type: 'text',
//           left: 'center',
//           top: 'center',
//           style: {
//             text: '3D Mode Enabled',
//             font: '20px sans-serif',
//             fill: '#333',
//           },
//         },
//       }),
//     };
//   };

//   // Export chart as image
//   const exportChart = () => {
//     const chartContainer = document.getElementById('chart-container');
//     html2canvas(chartContainer).then((canvas) => {
//       const image = canvas.toDataURL('image/png');
//       const link = document.createElement('a');
//       link.href = image;
//       link.download = 'chart.png';
//       link.click();
//     });
//   };

//   return (
//     <div>
//       <h1>Customizable Chart Generator</h1>

//       {/* Chart Type Selector */}
//       <div>
//         <label>Chart Type: </label>
//         <select onChange={handleChartTypeChange} value={chartData.chartType}>
//           <option value="line">Line</option>
//           <option value="bar">Bar</option>
//           <option value="pie">Pie</option>
//         </select>
//       </div>

//       {/* Chart Title Input */}
//       <div>
//         <label>Chart Title: </label>
//         <input
//           type="text"
//           value={chartData.title}
//           onChange={handleTitleChange}
//         />
//       </div>

//       {/* Series Customization for Different Chart Types */}
//       {chartData.chartType !== 'pie' && (
//         <>
//           {chartData.series.map((series, index) => (
//             <div key={index}>
//               <h3>{series.name}</h3>
//               <div>
//                 <label>Data (comma-separated): </label>
//                 <input
//                   type="text"
//                   value={series.data.join(',')}
//                   onChange={(e) => handleDataChange(index, e)}
//                 />
//               </div>
//               <div>
//                 <label>Color: </label>
//                 <input
//                   type="color"
//                   value={series.color}
//                   onChange={(e) => handleColorChange(index, e)}
//                 />
//               </div>
//             </div>
//           ))}
//         </>
//       )}

//       {/* Pie Chart Customization */}
//       {chartData.chartType === 'pie' && (
//         <>
//           {chartData.series.map((series, index) => (
//             <div key={index}>
//               <h3>{series.name}</h3>
//               {series.data.map((item, itemIndex) => (
//                 <div key={itemIndex}>
//                   <label>{item.name}: </label>
//                   <input
//                     type="text"
//                     value={item.name}
//                     onChange={(e) => handlePieDataChange(index, item.name, 'name', e)}
//                   />
//                   <input
//                     type="number"
//                     value={item.value}
//                     onChange={(e) => handlePieDataChange(index, item.name, 'value', e)}
//                   />
//                   <input
//                     type="color"
//                     value={item.color}
//                     onChange={(e) => handlePieDataChange(index, item.name, 'color', e)}
//                   />
//                   <button onClick={() => removePieSlice(index, item.name)}>Remove Slice</button>
//                 </div>
//               ))}
//               <button onClick={() => addPieSlice(index)}>Add Slice</button>
//             </div>
//           ))}
//         </>
//       )}

//       {/* 3D Rotation Toggle */}
//       <div>
//         <label>Enable 3D Rotation: </label>
//         <input
//           type="checkbox"
//           checked={chartData.rotation3D}
//           onChange={handleRotationChange}
//         />
//       </div>

//       {/* Render Chart */}
//       <div id="chart-container">
//         <ReactECharts
//           option={getOption()}
//           style={{ height: '500px', width: '100%' }}
//           theme="macarons"
//         />
//       </div>

//       {/* Export Button */}
//       <button onClick={exportChart}>Export Chart as Image</button>
//     </div>
//   );
// };

// export default App;

import React from 'react';
import ChartSelector from './components/ChartSelector';
import Layout from './components/Layout';

const App = () => {
  return (
    <Layout>
      <ChartSelector />
    </Layout>
  );
};

export default App;

