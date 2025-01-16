import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const BarChartDisplay = ({
  data,
  barChartType = "simple", // default type for bar chart
  customTitle = "Bar Chart",
  legendPosition = "bottom",
  enableToolbox = true,
}) => {
  if (!data || data.length === 0) {
    return <div>No data available for the bar chart.</div>;
  }

  // Common series options
  const commonSeries = {
    data: data.map((item) => ({
      value: item.value,
      itemStyle: {
        color: item.color || "#4CAF50", // Ensure the color is set for each individual bar
      },
      label: {
        show: true,
        position: item.labelPosition || "top", // Default to top if no position is specified
        formatter: "{c}", // Display the value inside the bar
        color: "#fff", // Make label text white to ensure visibility
      },
    })),
    type: "bar",
    emphasis: {
      focus: "series",
    },
  };

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
              name: "bar_chart_export",
            },
          },
        }
      : {},
    xAxis: {
      type: "category",
      data: data.map((item) => item.label),
    },
    yAxis: {
      type: "value",
    },
    series: [],
  };

  // Handle different chart types
  if (barChartType === "stacked") {
    option.series = [
      {
        ...commonSeries,
        stack: "total", // Enable stacking for 'stacked' chart type
      },
    ];
  } else if (barChartType === "stacked-horizontal") {
    option.series = [
      {
        ...commonSeries,
        stack: "total", // Enable stacking for 'stacked-horizontal'
        barWidth: "50%", // Adjust for horizontal stacking
        type: "bar",
      },
    ];
    option.xAxis = {
      type: "value",
    };
    option.yAxis = {
      type: "category",
      data: data.map((item) => item.label),
    };
  } else if (barChartType === "bar-race") {
    // Bar race logic can be added here if you have any dynamic or time-based effects
    option.series = [
      {
        ...commonSeries,
        animation: true, // Enable animation for bar race
      },
    ];
  } else {
    // Default bar chart
    option.series = [commonSeries];
  }

  return (
    <ReactECharts
      key={barChartType + JSON.stringify(data)} // Force re-render when chartType or data change
      option={option}
      echarts={echarts}
      style={{ height: "600px", width: "100%" }}
    />
  );
};

export default BarChartDisplay;
