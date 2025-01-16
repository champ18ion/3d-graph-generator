import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const LineChartDisplay = ({
  data,
  chartType = "simple", // default type for line chart
  customTitle = "Line Chart",
  legendPosition = "bottom",
  enableToolbox = true,
}) => {
  if (!data || data.length === 0) {
    return <div>No data available for the line chart.</div>;
  }

  const option = {
    title: {
      text: customTitle,
      left: "center",
      textStyle: {
        color: "#ccc",
      },
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      orient: "horizontal",
      left: "center",
      top: legendPosition,
    },
    toolbox: enableToolbox
      ? {
          show: true,
          feature: {
            mark: { show: true },
            dataView: {
              show: true,
              readOnly: false,
              lang: ["Data View", "Close", "Refresh"],
            },
            restore: { show: true },
            saveAsImage: {
              show: true,
              title: "Save as Image",
              type: "png",
              background: "transparent",
              pixelRatio: 3,
              name: "chart_export",
            },
          },
        }
      : {},
    xAxis: {
      type: "category",
      data: data[0]?.data.map((item) => item.label), // Ensure data[0] exists before accessing
    },
    yAxis: {
      type: "value",
    },
    series: data.map((line, index) => ({
      name: line.label,
      data: line.data.map((item) => item.value),
      type: "line",
      smooth: line.smooth, // Apply line smoothness if specified
      stack: line.stack ? "Total" : undefined, // Stack the area chart if 'stack' is true
      areaStyle: line.area ? {} : null, // Apply area style if 'area' is true
      itemStyle: {
        color: line.color || "#000", // Apply custom color or fallback
      },
      emphasis: {
        focus: 'series'
      },
      lineStyle: line.gradient
        ? {
            type: "linear",
            colorStops: [
              { offset: 0, color: "#FF5733" }, // Start color
              { offset: 1, color: "#33FF57" }, // End color
            ],
            global: false, // Whether to use global coordinates
          }
        : {}, // Gradient if 'gradient' is true
    })),
  };

  return (
    <ReactECharts
      key={chartType + JSON.stringify(data)} // Force re-render when chartType or data change
      option={option}
      echarts={echarts}
      style={{ height: "600px", width: "100%" }}
    />
  );
};

export default LineChartDisplay;
