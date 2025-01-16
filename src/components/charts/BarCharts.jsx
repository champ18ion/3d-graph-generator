import React from 'react';
import ReactECharts from 'echarts-for-react';

const EChartsBar = ({ data, title }) => {
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
                type: 'bar',
            },
        ],
    };

    return <ReactECharts option={option} />;
};

export default EChartsBar;
