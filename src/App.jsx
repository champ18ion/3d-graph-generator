import React, { useState } from 'react';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import DataEditor from './components/DataEditor';
import ChartConfig from './components/ChartConfig';
import ChartPreview from './components/ChartPreview';

const defaultDataset = [
  ['Category', 'Series 1', 'Series 2', 'Series 3'],
  ['Jan', 43.3, 85.8, 93.7],
  ['Feb', 83.1, 73.4, 55.1],
  ['Mar', 86.4, 65.2, 82.5],
  ['Apr', 72.4, 53.9, 39.1],
  ['May', 50.1, 60.2, 70.3],
];

const App = () => {
  const [chartType, setChartType] = useState('bar');
  const [is3D, setIs3D] = useState(false);

  const [dataset, setDataset] = useState(defaultDataset);

  const [config, setConfig] = useState({
    title: 'Sample Chart',
    theme: 'default',
    colors: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
    xAxisLabel: 'X Axis',
    yAxisLabel: 'Y Axis',
    showLegend: true,
  });

  return (
    <Layout
      sidebar={<Sidebar chartType={chartType} setChartType={setChartType} is3D={is3D} setIs3D={setIs3D} />}
      editor={<DataEditor dataset={dataset} setDataset={setDataset} />}
      config={<ChartConfig config={config} setConfig={setConfig} is3D={is3D} chartType={chartType} />}
      preview={<ChartPreview chartType={chartType} dataset={dataset} config={config} is3D={is3D} />}
    />
  );
};

export default App;
