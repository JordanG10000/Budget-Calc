// --- DOM elements ---
const canvas = document.getElementById("doughnut");

let currentChart = null;
// --- Chart ---
function buildChartConfig() {
  /*"const inputs" Put all of the inputs when you make them as consts*/

  const labels = ["Career", "Education", "Housing", "Personal", "Savings"];
  const data = [
    /*Put the consts in here*/ 2, 5, 626, 62, 6 /* <-- Example Values */,
  ];

  return {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          label: "Cost",
          data,
          backgroundColor: [
            "#7DFAFF",
            "#3300FF",
            "#FFEC00",
            "#FF4910",
            "#1BEDCA",
          ],
        },
      ],
    },
  };
}
// Initialize the chart setup
function initChart() {
  if (typeof Chart === "undefined") {
    console.warn("Chart.JS not found");
    return null;
  }

  const cfg = buildChartConfig();
  currentChart = new Chart(canvas, cfg);
  return currentChart;
}

//Update the existing chart as you input values
function refreshChart() {
  const cfg = buildChartConfig();
  if (!currentChart) {
    currentChart = initChart();
    return;
  }

  currentChart.datalabels = cfg.data.labels;
  currentChart.data.datasets[0].data = cfg.data.datasets[0].data;
  currentChart.options.plugins = cfg.options.plugins;
  currentChart.update();
}

// Start a refrehing chart to loop every two seconds
initChart();
setInterval(refreshChart, 2000);
