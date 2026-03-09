// --- DOM elements ---
const canvas = document.getElementById("doughnut");
const careerBtn = document.getElementById("career");
const eduBtn = document.getElementById("edu");
const housingBtn = document.getElementById("hous");
const personalBtn = document.getElementById("personal");
const savingsBtn = document.getElementById("savings");
const pages = document.querySelectorAll(".career, .edu, .hous, .personal, .savings");


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

//Functions
function changePage(targetClass) {
  const target = document.querySelector(targetClass);

  for (let page of pages) {
    page.classList.remove('show');
    page.classList.add('hide');
  }
  target.classList.remove('hide');
  target.classList.add('show');
  console.log("running");
}

changePage(".career");

// Event listeners
careerBtn.addEventListener('click', () => {
  changePage(".career");
});
eduBtn.addEventListener('click', () => {
  changePage(".edu");
});
housingBtn.addEventListener('click', () => {
  changePage(".hous");
});
personalBtn.addEventListener('click', () => {
  changePage(".personal");
});
savingsBtn.addEventListener('click', () => {
  changePage(".savings");
});




