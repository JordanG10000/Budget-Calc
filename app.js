// --- DOM elements ---
const canvas = document.getElementById("doughnut");
const careerBtn = document.getElementById("career");
const eduBtn = document.getElementById("edu");
const housingBtn = document.getElementById("hous");
const personalBtn = document.getElementById("personal");
const savingsBtn = document.getElementById("savings");
const pages = document.querySelectorAll(".career, .edu, .hous, .personal, .savings");
const salary = document.getElementById("salary");
let annualSalary = 0;

// Calculations

// let eduTotal = input 1 + input 2
/* for page in pages {
      for every input in that page add the inputted numbers;
}*/

// chart data [edu,]


// Array of final totals
// [taxes, edu, housing, personal, savings]
const defined_totals = [0, 0, 0, 0, 0];

// taxes

function taxItUP(salary) {
  let preTax = salary;
  let taxes = 0;
  preTax -= 16100;

  if (preTax <= 0) {
    return 0;
  }

  taxes += preTax * .0145; // medicare
  taxes += preTax * .062; // social security
  taxes += preTax * .04; // state tax

  preTax -= taxes;

  if (preTax > 50400) {
    taxes += (preTax - 50400) * .22;
    taxes += (50400 - 12401) * .12;
  }
  else if (preTax >= 12401) {
    taxes += (preTax - 12400) * .12;
  }

  taxes += 12400 * .1;
  return taxes / 12;

}




const edu_values = new Map();
const hous_values = new Map();
const personal_values = new Map();
const savings_values = new Map();



function inputTotals() {

  // Calculates the total per page
  defined_totals[0] = taxItUP(Number(salary.innerText));
  updateTotals('edu', edu_values, 1);
  updateTotals('hous', hous_values, 2);
  updateTotals('personal', personal_values, 3);
  updateTotals('savings', savings_values, 4);
}  


function updateTotals(page, page_values, index) {
  for (const input of document.querySelectorAll(`.${page} .textInputs`)) {
    page_values.set(input.placeholder, 0);
    input.addEventListener('input', (/** @type {InputEvent & { target: HTMLInputElement }} */ { target }) => {
      const input_value = Number(target.value);
      page_values.set(target.placeholder, input_value);
      const total = page_values.values().reduce((a, b) => a + b, 0);
      defined_totals[index] = total;
    });
  }
};

// Career Select Dropdown
async function careerSelect() {
  const selectElement = document.getElementById('occu');
  // const salary = document.querySelector("#salary")
  const occupationSalaryMap = new Map();
  try {
    const response = await fetch('https://eecu-data-server.vercel.app/data');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const careers = await response.json();

    careers.forEach(career => {
      occupationSalaryMap.set(career["Occupation"], career["Salary"]);
      const option = new Option(career["Occupation"], career["Occupation"]);
      selectElement.add(option);
    });

    selectElement.addEventListener('change', () => {
      salary.textContent = occupationSalaryMap.get(selectElement.value) || '';
      annualSalary = occupationSalaryMap.get(selectElement.value) || 0;
      console.log(annualSalary);
    });
  } catch (error) {
    console.error('Error populating user select:', error);
  }
}
careerSelect();






// Chart does not update correctly
let currentChart = null;

// --- Chart ---
function buildChartConfig() {
  inputTotals();

  const labels = ["Taxes", "Education", "Housing", "Personal", "Savings"];

  // chart_data might not be updating
  const chart_data = defined_totals;

  return {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Cost",
          data: chart_data,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Budget",
        }
      }
    }
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



// Start a chart, refreshes every 2 seconds
initChart();
// setInterval(refreshChart, 2000);
const inputs = document.querySelectorAll("input");
inputs.forEach( i => {
  i.addEventListener("change", refreshChart)
});



// Function to change the page
function changePage(targetClass, navTarget) {
  const target = document.querySelector(targetClass);
  navTarget.style.backgroundColor = "#8dc6fc";
  for (let page of pages) {
    page.classList.remove('show');
    page.classList.add('hide');
  }
  target.classList.remove('hide');
  target.classList.add('show');
}

changePage(".career", careerBtn);



// Event listeners
careerBtn.addEventListener('click', (e) => {
  resetColors();
  changePage(".career", e.target);
});
eduBtn.addEventListener('click', (e) => {
  resetColors();
  changePage(".edu", e.target);
});
housingBtn.addEventListener('click', (e) => {
  resetColors();
  changePage(".hous", e.target);
});
personalBtn.addEventListener('click', (e) => {
  resetColors();
  changePage(".personal", e.target);
});
savingsBtn.addEventListener('click', (e) => {
  resetColors();
  changePage(".savings", e.target);
});

function resetColors() {
  careerBtn.style.backgroundColor = "white";
  eduBtn.style.backgroundColor = "white";
  housingBtn.style.backgroundColor = "white";
  personalBtn.style.backgroundColor = "white";
  savingsBtn.style.backgroundColor = "white";
}


