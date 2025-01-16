import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const PieChartDisplay = ({
  slices,
  chartType,
  legendPosition = "bottom",
  radius = ["50%", "70%"],
  customTitle = "Pie Chart",
  enableToolbox = true,
}) => {
  // Calculate the total value to show percentage
  const totalValue = slices.reduce((acc, slice) => acc + slice.value, 0);
  const updatedSlices = slices.map((slice) => ({
    ...slice,
    percentage: ((slice.value / totalValue) * 100).toFixed(2),
  }));

  console.log(chartType);

  const getOption = (type) => {
    console.log("Chart Type:", type); // Log to ensure correct type is passed
    switch (type) {
      case "simple": // Simple Pie Chart (No Rose Type)
        return {
          title: {
            text: "Simple Pie Chart", // Adjusted title for clarity
            left: "center",
          },
          tooltip: {
            trigger: "item",
          },
          legend: {
            orient: "vertical",
            left: "left",
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true }, // Marks the data
              dataView: {
                show: true,
                readOnly: false, // Allow editing the data view
                lang: ["Data View", "Close", "Refresh"], // Customize Data View button text
              },
              restore: { show: true }, // Restores the chart to its original state
              saveAsImage: {
                show: true,
                title: "Save as Image", // Tooltip text when hovering the export button
                type: "png",
                background: "transparent", // Export format: 'png', 'jpeg', 'svg'
                pixelRatio: 3, // High resolution for the exported image (higher value = higher quality)
                name: "chart_export", // Custom name for the exported file
                excludeComponents: ["toolbox"], // Exclude the toolbox itself from the exported image (optional)
              },
            },
          },

          series: [
            {
              name: "Simple Pie Chart",
              type: "pie",
              radius: "50%", // Regular pie chart radius
              data: updatedSlices.map((slice) => ({
                value: slice.value,
                name: slice.label,
                itemStyle: {
                  color: slice.color || "#ccc", // Apply custom color or fallback
                },
              })),
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };

      case "type1": // Nightingale (Rose) Chart with roseType: area
        return {
          legend: {
            top: legendPosition,
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true }, // Marks the data
              dataView: {
                show: true,
                readOnly: false, // Allow editing the data view
                lang: ["Data View", "Close", "Refresh"], // Customize Data View button text
              },
              restore: { show: true }, // Restores the chart to its original state
              saveAsImage: {
                show: true,
                title: "Save as Image", // Tooltip text when hovering the export button
                type: "png",
                background: "transparent", // Export format: 'png', 'jpeg', 'svg'
                pixelRatio: 3, // High resolution for the exported image (higher value = higher quality)
                name: "chart_export", // Custom name for the exported file
                excludeComponents: ["toolbox"], // Exclude the toolbox itself from the exported image (optional)
              },
            },
          },
          series: [
            {
              name: customTitle,
              type: "pie",
              radius: [50, 250],
              center: ["50%", "50%"],
              roseType: "area", // Ensure this is only here for Nightingale charts
              itemStyle: {
                borderRadius: 8,
              },
              data: updatedSlices.map((slice) => ({
                value: slice.value,
                name: slice.label,
                itemStyle: {
                  color: slice.color || "#ccc", // Apply custom color or fallback
                },
              })),
            },
          ],
        };

      case "type2": // Donut chart with inner and outer radius
        return {
          tooltip: {
            trigger: "item",
          },
          legend: {
            top: "5%",
            left: "center",
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true }, // Marks the data
              dataView: {
                show: true,
                readOnly: false, // Allow editing the data view
                lang: ["Data View", "Close", "Refresh"], // Customize Data View button text
              },
              restore: { show: true }, // Restores the chart to its original state
              saveAsImage: {
                show: true,
                title: "Save as Image", // Tooltip text when hovering the export button
                type: "png",
                background: "transparent", // Export format: 'png', 'jpeg', 'svg'
                pixelRatio: 3, // High resolution for the exported image (higher value = higher quality)
                name: "chart_export", // Custom name for the exported file
                excludeComponents: ["toolbox"], // Exclude the toolbox itself from the exported image (optional)
              },
            },
          },
          series: [
            {
              name: customTitle,
              type: "pie",
              radius: radius, // Dynamic radius control
              avoidLabelOverlap: false,
              padAngle: 5,
              itemStyle: {
                borderRadius: 10,
              },
              label: {
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: updatedSlices.map((slice) => ({
                value: slice.value,
                name: slice.label,
                itemStyle: {
                  color: slice.color || "#ccc", // Apply dynamic color for each slice
                },
              })),
            },
          ],
        };

      case "type3": // Customized Pie with unique itemStyle
        return {
          title: {
            text: customTitle,
            left: "center",
            top: 20,
            textStyle: {
              color: "#ccc",
            },
          },
          tooltip: {
            trigger: "item",
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true }, // Marks the data
              dataView: {
                show: true,
                readOnly: false, // Allow editing the data view
                lang: ["Data View", "Close", "Refresh"], // Customize Data View button text
              },
              restore: { show: true }, // Restores the chart to its original state
              saveAsImage: {
                show: true,
                title: "Save as Image", // Tooltip text when hovering the export button
                type: "png",
                background: "transparent", // Export format: 'png', 'jpeg', 'svg'
                pixelRatio: 3, // High resolution for the exported image (higher value = higher quality)
                name: "chart_export", // Custom name for the exported file
                excludeComponents: ["toolbox"], // Exclude the toolbox itself from the exported image (optional)
              },
            },
          },
          series: [
            {
              name: customTitle,
              type: "pie",
              radius: "55%",
              center: ["50%", "50%"],
              data: updatedSlices.map((slice) => ({
                value: slice.value,
                name: slice.label,
                itemStyle: {
                  color: slice.color || "#ccc", // Apply dynamic color for each slice
                  shadowBlur: 200,
                  shadowColor: "rgba(0, 0, 0, 0.3)",
                },
              })),
              roseType: "radius", // Specific rose-type property for type3
              label: {
                color: "rgb(36, 36, 36)",
              },
              labelLine: {
                lineStyle: {
                  color: "rgb(82, 81, 81)",
                },
                smooth: 0.2,
                length: 10,
                length2: 20,
              },
              selectedMode: "multiple",
              animationType: "scale",
              animationEasing: "elasticOut",
              animationDelay: function (idx) {
                return Math.random() * 200;
              },
            },
          ],
        };

      default:
        return {}; // Default empty option
    }
  };

  return (
    <ReactECharts
      key={chartType + JSON.stringify(slices)} // Force re-render when chartType or slices change
      option={getOption(chartType)}
      echarts={echarts}
      style={{ height: "600px", width: "100%" }}
    />
  );
};

export default PieChartDisplay;
