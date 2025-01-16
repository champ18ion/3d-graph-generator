import React from 'react';
import ReactECharts from 'echarts-for-react';

const EChartsLine = ({ data, title }) => {
    const option = {
        title: {
            text: title,
            left: 'center',
        },
        xAxis: {
            type: 'category',
            data: data.map((item) => item.label),
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: data.map((item) => item.value),
                type: 'line',
                smooth: true,
            },
        ],
    };

    return <ReactECharts option={option} />;
};

export default EChartsLine;
