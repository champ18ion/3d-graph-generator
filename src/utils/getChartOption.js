const getChartOption = (chartType, dataset, config, is3D) => {
  // Validate dataset structure
  if (!dataset || dataset.length < 2) return {};

  const headers = dataset[0];
  const option = {
    title: {
      text: config.title,
      left: 'center',
      top: 10,
      textStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    legend: {
      show: config.showLegend,
      bottom: 10,
    },
    dataset: {
      source: dataset,
    },
    grid: {
      top: 80,
      bottom: 60,
      left: '10%',
      right: '10%',
      containLabel: true,
    },
    // Adding toolbox for extra features
    toolbox: {
      feature: {
        saveAsImage: {
          show: true,
          title: 'Save Image',
          pixelRatio: 3, // Premium export directly from ECharts if they click the native button
        },
      },
    },
  };

  if (!is3D) {
    if (chartType === 'pie') {
      // Modify dataset structure implicitly for Pie using encode
      option.tooltip.trigger = 'item';
      option.series = [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '50%'],
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: true,
            formatter: '{b}: {c} ({d}%)',
          },
          // Pie chart typically just uses first category and first series data
          encode: { itemName: 0, value: 1 },
        },
      ];
      // Grid is not needed for pie
      delete option.grid;
      delete option.xAxis;
      delete option.yAxis;

    } else {
      // 2D Line, Bar, Scatter
      option.xAxis = {
        type: 'category',
        name: config.xAxisLabel,
        nameLocation: 'middle',
        nameGap: 30,
        nameTextStyle: {
          fontWeight: 'bold',
          fontSize: 14,
        },
      };
      option.yAxis = {
        type: 'value',
        name: config.yAxisLabel,
        nameLocation: 'middle',
        nameGap: 50,
        nameTextStyle: {
          fontWeight: 'bold',
          fontSize: 14,
        },
      };

      // Generate series dynamically based on columns
      const seriesCount = headers.length - 1;
      option.series = Array.from({ length: seriesCount }).map(() => ({
        type: chartType, // 'bar', 'line', 'scatter'
        smooth: chartType === 'line', // Smooth lines
        emphasis: { focus: 'series' },
        symbolSize: chartType === 'scatter' ? 12 : undefined,
      }));
    }
  } else {
    // 3D Charts using echarts-gl
    delete option.grid; // Remove 2D grid

    // We need to transform dataset into coordinates for 3D
    // Assuming format: [xCategory, yCategory, value] or transforming simple dataset

    option.tooltip = {};
    option.visualMap = {
      max: 100, // This should be calculated dynamically in real app based on max value
      inRange: {
        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
      }
    };

    option.xAxis3D = {
      type: 'category',
      name: config.xAxisLabel || 'X',
    };
    option.yAxis3D = {
      type: 'category', // ECharts 3D usually uses category for both X and Y if it's a grid
      name: 'Categories',
    };
    option.zAxis3D = {
      type: 'value',
      name: config.yAxisLabel || 'Z',
    };
    option.grid3D = {
      boxWidth: 200,
      boxDepth: 80,
      viewControl: {
        projection: 'perspective',
        alpha: 30, // viewing angle
        beta: 40,
      },
      light: {
        main: {
          intensity: 1.2,
          shadow: true
        },
        ambient: {
          intensity: 0.3
        }
      }
    };

    // Transform 2D dataset to 3D scatter/bar format: [xIndex, yIndex, value]
    const data3D = [];
    for (let r = 1; r < dataset.length; r++) {
      for (let c = 1; c < headers.length; c++) {
        // x = category (row label), y = series name (col header), z = value
        // We use string labels because axis type is 'category'
        data3D.push([dataset[r][0], headers[c], dataset[r][c]]);
      }
    }

    option.series = [
      {
        type: chartType === 'bar' ? 'bar3D' : 'scatter3D',
        data: data3D,
        shading: 'lambert',
        label: {
          show: false, // Turn off text labels in 3D by default for cleanliness
          textStyle: {
            fontSize: 16,
            borderWidth: 1
          }
        },
        itemStyle: {
          opacity: 0.8
        },
        emphasis: {
          label: {
            show: true,
            textStyle: {
              fontSize: 20,
              color: '#900'
            }
          },
          itemStyle: {
            color: '#900'
          }
        }
      }
    ];

    // Auto-calculate max for visualMap
    let maxVal = 0;
    data3D.forEach(item => {
      if (item[2] > maxVal) maxVal = item[2];
    });
    option.visualMap.max = maxVal;
  }

  return option;
};

export default getChartOption;