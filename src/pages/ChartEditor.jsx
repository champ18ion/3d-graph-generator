import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DataInputForm from '../components/DataInputForms';
import EChartsPie from '../components/charts/PieChart';
import EChartsBar from '../components/charts/BarCharts';
import EChartsLine from '../components/charts/LineChart';

const ChartEditor = () => {
    const [chartType, setChartType] = useState('pie');
    const [chartData, setChartData] = useState([
        { label: 'A', value: 30 },
        { label: 'B', value: 70 },
        { label: 'C', value: 50 },
    ]);
    const [chartTitle, setChartTitle] = useState('Chart Title');

    const handleOptionsChange = (name, value) => {
        if (name === 'chartType') {
            setChartType(value);
        } else if (name === 'chartTitle') {
            setChartTitle(value);
        }
    };

    const renderChart = () => {
        switch (chartType) {
            case 'pie':
                return <EChartsPie data={chartData} title={chartTitle} />;
            case 'bar':
                return <EChartsBar data={chartData} title={chartTitle} />;
            case 'line':
                return <EChartsLine data={chartData} title={chartTitle} />;
            default:
                return null;
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar onChartSelect={setChartType} />
            <main style={{ flex: 1 }}>
                <DataInputForm onDataSubmit={setChartData} onOptionsChange={handleOptionsChange} />
                <div style={{ marginTop: '20px' }}>
                    {renderChart()}
                </div>
            </main>
        </div>
    );
};

export default ChartEditor;
