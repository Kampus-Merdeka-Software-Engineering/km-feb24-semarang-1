let salesData = [];

Promise.all([
  fetch('data/sales_by_location.json').then(response => response.json()),
  fetch('data/sales_by_category.json').then(response => response.json()),
  fetch('data/sales_per_month.json').then(response => response.json()),
  fetch('data/sales_per_quarter.json').then(response => response.json()),
  fetch('data/sales_by_payment_method.json').then(response => response.json()),
  fetch('data/data.json').then(response => response.json())
]).then(([locationData, categoryData, monthData, quarterData, paymentMethodData, allData]) => {
  salesData = { locationData, categoryData, monthData, quarterData, paymentMethodData, allData };
  populateFilters();
  renderCharts();
});

function populateFilters() {
  const machines = [...new Set(salesData.allData.map(sale => sale.machine))];
  const categories = [...new Set(salesData.allData.map(sale => sale.category))];
  const months = [...new Set(salesData.allData.map(sale => sale.month))];

  const machineFilter = document.getElementById('machine-filter');
  const categoryFilter = document.getElementById('category-filter');
  const monthFilter = document.getElementById('month-filter');

  machines.forEach(machine => {
    let option = document.createElement('option');
    option.value = machine;
    option.textContent = machine;
    machineFilter.appendChild(option);
  });

  categories.forEach(category => {
    let option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  months.forEach(month => {
    let option = document.createElement('option');
    option.value = month;
    option.textContent = month;
    monthFilter.appendChild(option);
  });

  document.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', renderCharts);
  });
}

function renderCharts() {
  // Retrieve filter values
  const selectedMachine = document.getElementById('machine-filter').value;
  const selectedCategory = document.getElementById('category-filter').value;
  const selectedMonth = document.getElementById('month-filter').value;

  // Filter data based on selected filters
  const filteredData = salesData.allData.filter(sale => 
    (selectedMachine ? sale.machine === selectedMachine : true) &&
    (selectedCategory ? sale.category === selectedCategory : true) &&
    (selectedMonth ? sale.month === selectedMonth : true)
  );

  // Monthly Sales Line Chart
  const monthlySalesData = aggregateMonthlySales(filteredData);
  createLineChart('monthly-sales-chart', 'Monthly Sales', monthlySalesData.labels, monthlySalesData.values);

  // Quarterly Sales Line Chart
  const quarterlySalesData = aggregateQuarterlySales(filteredData);
  createLineChart('quarterly-sales-chart', 'Quarterly Sales', quarterlySalesData.labels, quarterlySalesData.values);

  // Category Sales Bar Chart
  const categorySalesData = aggregateCategorySales(filteredData);
  createBarChart('category-sales-chart', 'Sales by Category', categorySalesData.labels, categorySalesData.values);

  // Location Sales Bar Chart
  const locationSalesData = aggregateLocationSales(filteredData);
  createBarChart('location-sales-chart', 'Sales by Location', locationSalesData.labels, locationSalesData.values, 'horizontal');

  // Payment Method Sales Pie Chart
  const paymentMethodSalesData = aggregatePaymentMethodSales(filteredData);
  createPieChart('payment-method-sales-chart', 'Sales by Payment Method', paymentMethodSalesData.labels, paymentMethodSalesData.values);
}

// Aggregate functions (implement these based on your data structure)
function aggregateMonthlySales(data) {
  // Implement logic to aggregate sales by month
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const sales = months.map(month => data.filter(sale => sale.month === month).reduce((sum, sale) => sum + sale.amount, 0));
  return { labels: months, values: sales };
}

function aggregateQuarterlySales(data) {
  // Implement logic to aggregate sales by quarter
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const sales = quarters.map(quarter => data.filter(sale => sale.quarter === quarter).reduce((sum, sale) => sum + sale.amount, 0));
  return { labels: quarters, values: sales };
}

function aggregateCategorySales(data) {
  // Implement logic to aggregate sales by category
  const categories = [...new Set(data.map(sale => sale.category))];
  const sales = categories.map(category => data.filter(sale => sale.category === category).reduce((sum, sale) => sum + sale.amount, 0));
  return { labels: categories, values: sales };
}

function aggregateLocationSales(data) {
  // Implement logic to aggregate sales by location
  const locations = [...new Set(data.map(sale => sale.location))];
  const sales = locations.map(location => data.filter(sale => sale.location === location).reduce((sum, sale) => sum + sale.amount, 0));
  return { labels: locations, values: sales };
}

function aggregatePaymentMethodSales(data) {
  // Implement logic to aggregate sales by payment method
  const paymentMethods = [...new Set(data.map(sale => sale.paymentMethod))];
  const sales = paymentMethods.map(method => data.filter(sale => sale.paymentMethod === method).reduce((sum, sale) => sum + sale.amount, 0));
  return { labels: paymentMethods, values: sales };
}

// Chart creation functions
function createLineChart(elementId, title, labels, data) {
  new Chart(document.getElementById(elementId), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: title,
        data: data,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Time'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Sales Amount'
          }
        }
      }
    }
  });
}

function createBarChart(elementId, title, labels, data, orientation = 'vertical') {
  new Chart(document.getElementById(elementId), {
    type: orientation === 'horizontal' ? 'bar' : 'horizontalBar',
    data: {
      labels: labels,
      datasets: [{
        label: title,
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      indexAxis: orientation === 'horizontal' ? 'y' : 'x',
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: orientation === 'horizontal' ? 'Sales Amount' : 'Category'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: orientation === 'horizontal' ? 'Category' : 'Sales Amount'
          }
        }
      }
    }
  });
}

function createPieChart(elementId, title, labels, data) {
  new Chart(document.getElementById(elementId), {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: title,
        data: data,
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 205, 86, 1)', 'rgba(54, 162, 235, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true
    }
  });
}
