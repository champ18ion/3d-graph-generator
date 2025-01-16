import React from 'react';
import ReactECharts from 'echarts-for-react';

const EChartsPie = ({ data, title }) => {
    const option = {
        title: {
            text: title,
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
        },
        series: [
            {
                name: 'Data',
                type: 'pie',
                radius: '50%',
                data: data.map((item) => ({
                    value: item.value,
                    name: item.label,
                })),
            },
        ],
    };

    return <ReactECharts option={option} />;
};

export default EChartsPie;
