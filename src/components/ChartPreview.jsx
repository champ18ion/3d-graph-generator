import React, { useRef, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import getChartOption from '../utils/getChartOption';
// Import 'echarts-gl' for 3D charts, but we need to do it correctly so it attaches to echarts
import * as echarts from 'echarts';
import 'echarts-gl';
import 'echarts/theme/macarons';
import 'echarts/theme/vintage';
import 'echarts/theme/dark';

const ChartPreview = ({ chartType, dataset, config, is3D }) => {
  const chartRef = useRef(null);

  const option = useMemo(() => {
    return getChartOption(chartType, dataset, config, is3D);
  }, [chartType, dataset, config, is3D]);

  const handleExport = () => {
    if (chartRef.current) {
      const echartInstance = chartRef.current.getEchartsInstance();
      // Using pixelRatio 3 for high quality 4k-like exports
      const dataUrl = echartInstance.getDataURL({
        type: 'png',
        pixelRatio: 3,
        backgroundColor: '#fff',
      });

      const a = document.createElement('a');
      a.download = `${config.title || 'chart'}_${Date.now()}.png`;
      a.href = dataUrl;
      a.click();
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleExport}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Export High-Res PNG
        </button>
      </div>
      <div className="flex-1 w-full relative">
        <ReactECharts
          ref={chartRef}
          option={option}
          theme={config.theme !== 'default' ? config.theme : undefined}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      </div>
    </div>
  );
};

export default ChartPreview;