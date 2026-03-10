// --- DOM elements ---
const canvas = document.getElementById("doughnut");
const careerBtn = document.getElementById("career");
const eduBtn = document.getElementById("edu");
const housingBtn = document.getElementById("hous");
const personalBtn = document.getElementById("personal");
const savingsBtn = document.getElementById("savings");
const pages = document.querySelectorAll(".career, .edu, .hous, .personal, .savings");

// Calculations

// let eduTotal = input 1 + input 2
/* for page in pages {
      for every input in that page add the inputted numbers;
}*/

// chart data [edu,]

// Need to fix inputTotals

function inputTotals() {
  for (let page of pages) {
    console.log(page)
    for (let input of page.children) {
      input.value = 0;
      console.log(input.value);
    }
  }
}

// Career Select Dropdown
async function careerSelect() {
  const selectElement = document.getElementById('occu');
  const occupationSalaryMap = new Map();
  try {
    const response = await fetch('https://eecu-data-server.vercel.app/data');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const users = await response.json();

    users.forEach(user => {
      occupationSalaryMap.set(user["Occupation"], user["Salary"]);
      const option = new Option(user["Occupation"], user["Occupation"]);
      selectElement.add(option);
    });

    selectElement.addEventListener('change', () => {
      salary.textContent = occupationSalaryMap.get(selectElement.value) || '';
    });
  } catch (error) {
    console.error('Error populating user select:', error);
  }
}
careerSelect();


let currentChart = null;
// --- Chart ---
function buildChartConfig() {
  inputTotals();
  /*"const inputs" Put all of the inputs when you make them as consts*/

  const labels = ["Taxes", "Education", "Housing", "Personal", "Savings"];
  const data = [/* Totals is now definedtotals[1], totals[2], totals[3], totals[4],totals[5]*/];

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




