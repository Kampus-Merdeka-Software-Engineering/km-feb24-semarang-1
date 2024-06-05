document.addEventListener('DOMContentLoaded', async function () {
//   const data = await fetch('data.json').then(response => response.json());
  const fs = require('fs');

// Path ke file data.json
const filePath = 'data/data.json';

// Membaca file JSON
fs.readFile(filePath, 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file:", err);
        return;
    }
    try {
        const data = JSON.parse(jsonString);
        // Menampilkan data yang telah dibaca
        console.log(data);
    } catch (err) {
        console.log("Error parsing JSON string:", err);
    }
});


  const ctxQuarter = document.getElementById('quarterly-sales-chart');
  const ctxMonth = document.getElementById('monthly-sales-chart');
  const ctxCategory = document.getElementById('category-sales-chart');
  const ctxLocation = document.getElementById('location-sales-chart');
  const ctxPayment = document.getElementById('payment-method-sales-chart');

  let charts = {};

  function updateChart(chart, data) {
      chart.data = data;
      chart.update();
  }

  function filterData(filters) {
      return data.filter(entry => {
          const matchesCategory = filters.category === 'all' || entry.category === filters.category;
          const matchesMachine = filters.machine === 'all' || entry.machine === filters.machine;
          const matchesMonth = filters.month === 'all' || new Date(entry.trans_date).getMonth() + 1 == filters.month;

          return matchesCategory && matchesMachine && matchesMonth;
      });
  }

  function createDataSet(data, key) {
      const groupedData = data.reduce((acc, curr) => {
          if (!acc[curr[key]]) {
              acc[curr[key]] = {
                  totalSales: 0,
                  itemSales: 0
              };
          }
          acc[curr[key]].totalSales += parseFloat(curr.transtotal.replace('$', ''));
          acc[curr[key]].itemSales += curr.rqty;
          return acc;
      }, {});

      const labels = Object.keys(groupedData);
      const totalSales = labels.map(label => groupedData[label].totalSales);
      const itemSales = labels.map(label => groupedData[label].itemSales);

      return {
          labels,
          datasets: [
              {
                  label: 'Total Sales',
                  data: totalSales,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderWidth: 1
              },
              {
                  label: 'Item Sales',
                  data: itemSales,
                  borderColor: 'rgba(153, 102, 255, 1)',
                  backgroundColor: 'rgba(153, 102, 255, 0.2)',
                  borderWidth: 1
              }
          ]
      };
  }

  function renderCharts(filteredData) {
      const quarterlyData = createDataSet(filteredData, 'quarter');
      const monthlyData = createDataSet(filteredData, 'month');
      const categoryData = createDataSet(filteredData, 'category');
      const locationData = createDataSet(filteredData, 'location');
      const paymentData = createDataSet(filteredData, 'type');

      if (charts.quarter) {
          updateChart(charts.quarter, quarterlyData);
      } else {
          charts.quarter = new Chart(ctxQuarter, {
              type: 'line',
              data: quarterlyData,
              options: {
                  responsive: true,
                  scales: {
                      x: {
                          type: 'category',
                          labels: quarterlyData.labels
                      }
                  }
              }
          });
      }

      if (charts.month) {
          updateChart(charts.month, monthlyData);
      } else {
          charts.month = new Chart(ctxMonth, {
              type: 'line',
              data: monthlyData,
              options: {
                  responsive: true,
                  scales: {
                      x: {
                          type: 'category',
                          labels: monthlyData.labels
                      }
                  }
              }
          });
      }

      if (charts.category) {
          updateChart(charts.category, categoryData);
      } else {
          charts.category = new Chart(ctxCategory, {
              type: 'bar',
              data: categoryData,
              options: {
                  responsive: true,
                  scales: {
                      x: {
                          type: 'category',
                          labels: categoryData.labels
                      }
                  }
              }
          });
      }

      if (charts.location) {
          updateChart(charts.location, locationData);
      } else {
          charts.location = new Chart(ctxLocation, {
              type: 'bar',
              data: locationData,
              options: {
                  indexAxis: 'y',
                  responsive: true,
                  scales: {
                      x: {
                          type: 'category',
                          labels: locationData.labels
                      }
                  }
              }
          });
      }

      if (charts.payment) {
          updateChart(charts.payment, paymentData);
      } else {
          charts.payment = new Chart(ctxPayment, {
              type: 'pie',
              data: paymentData,
              options: {
                  responsive: true
              }
          });
      }
  }

  function populateFilters() {
      const categories = Array.from(new Set(data.map(entry => entry.category)));
      const machines = Array.from(new Set(data.map(entry => entry.machine)));
      const months = Array.from(new Set(data.map(entry => new Date(entry.trans_date).getMonth() + 1)));

      const categoryFilter = document.getElementById('selectCategory');
      const machineFilter = document.getElementById('selectMachine');
      const monthFilter = document.getElementById('selectMonth');

      categories.forEach(category => {
          const option = document.createElement('option');
          option.value = category;
          option.textContent = category;
          categoryFilter.appendChild(option);
      });

      machines.forEach(machine => {
          const option = document.createElement('option');
          option.value = machine;
          option.textContent = machine;
          machineFilter.appendChild(option);
      });

      months.forEach(month => {
          const option = document.createElement('option');
          option.value = month;
          option.textContent = `Month ${month}`;
          monthFilter.appendChild(option);
      });
  }

  document.getElementById('selectCategory').addEventListener('change', () => {
      const filters = {
          category: document.getElementById('selectCategory').value,
          machine: document.getElementById('selectMachine').value,
          month: document.getElementById('selectMonth').value
      };
      const filteredData = filterData(filters);
      renderCharts(filteredData);
  });

  document.getElementById('selectMachine').addEventListener('change', () => {
      const filters = {
          category: document.getElementById('selectCategory').value,
          machine: document.getElementById('selectMachine').value,
          month: document.getElementById('selectMonth').value
      };
      const filteredData = filterData(filters);
      renderCharts(filteredData);
  });

  document.getElementById('selectMonth').addEventListener('change', () => {
      const filters = {
          category: document.getElementById('selectCategory').value,
          machine: document.getElementById('selectMachine').value,
          month: document.getElementById('selectMonth').value
      };
      const filteredData = filterData(filters);
      renderCharts(filteredData);
  });

  populateFilters();
  renderCharts(data);
});
