// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Initialize charts
  const categoryCtx = document.getElementById('category-sales-chart');
  const quarterCtx = document.getElementById('quarterly-sales-chart');
  const monthCtx = document.getElementById('monthly-sales-chart');
  const locationCtx = document.getElementById('location-sales-chart');
  const paymentCtx = document.getElementById('payment-method-sales-chart');

  // Sample data
  const sampleData = {
      categories: {
          labels: ['Beverages', 'Snacks', 'Candies'],
          data: [5000, 3000, 2000]
      },
      quarters: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          data: [10000, 8000, 12000, 15000]
      },
      months: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          data: [2000, 1800, 2200, 2500, 3000]
      },
      locations: {
          labels: ['Location1', 'Location2', 'Location3'],
          data: [4000, 5000, 6000]
      },
      payments: {
          labels: ['Cash', 'Card', 'Mobile Payment'],
          data: [10000, 8000, 6000]
      }
  };

  const categoryChart = new Chart(categoryCtx, {
      type: 'bar',
      data: {
          labels: sampleData.categories.labels,
          datasets: [{
              label: 'Sales',
              data: sampleData.categories.data,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false
      }
  });

  const quarterChart = new Chart(quarterCtx, {
      type: 'line',
      data: {
          labels: sampleData.quarters.labels,
          datasets: [{
              label: 'Sales',
              data: sampleData.quarters.data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false
      }
  });

  const monthChart = new Chart(monthCtx, {
      type: 'line',
      data: {
          labels: sampleData.months.labels,
          datasets: [{
              label: 'Sales',
              data: sampleData.months.data,
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false
      }
  });

  const locationChart = new Chart(locationCtx, {
    type: 'bar',
    data: {
        labels: sampleData.categories.labels,
        datasets: [{
            label: 'Sales',
            indexAxis: 'y',
            data: sampleData.categories.data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});


  const paymentChart =  new Chart(paymentCtx, {
      type: 'pie',
      data: {
          labels: sampleData.payments.labels,
          datasets: [{
              label: 'Sales',
              data: sampleData.payments.data,
              backgroundColor: [
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false
      }
  });

  // Filters
  document.getElementById('categoryFilter').addEventListener('change', updateCharts);
  document.getElementById('machineFilter').addEventListener('change', updateCharts);
  document.getElementById('monthFilter').addEventListener('change', updateCharts);

  function updateCharts() {
      const selectedCategory = document.getElementById('categoryFilter').value;
      const selectedMachine = document.getElementById('machineFilter').value;
      const selectedMonth = document.getElementById('monthFilter').value;

      // Update the chart data based on the selected filters
      // This is a sample update, adjust it according to your real data logic
      if (selectedCategory) {
          categoryChart.data.datasets[0].data = [3000, 2000, 1000];
      } else {
          categoryChart.data.datasets[0].data = sampleData.categories.data;
      }

      if (selectedMachine) {
          quarterChart.data.datasets[0].data = [5000, 4000, 6000, 7000];
      } else {
          quarterChart.data.datasets[0].data = sampleData.quarters.data;
      }

      if (selectedMonth) {
          monthChart.data.datasets[0].data = [1500, 1200, 1800, 2000, 2500];
      } else {
          monthChart.data.datasets[0].data = sampleData.months.data;
      }

      categoryChart.update();
      quarterChart.update();
      monthChart.update();
  }
});









// const ctx = document.getElementById('category-sales-chart');
//   new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//       datasets: [{
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: [
//         'rgba(97, 174, 231, 1)'],
//         borderWidth: 1
        
//       }]
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   });

//   const ctx2 = document.getElementById('payment-method-sales-chart');

//   new Chart(ctx2, {
//     type: 'pie',
//     data: {
//       labels: ['Cash', 'Credit'],
//       datasets: [{
//         label: '# of Votes',
//         data: [75,25],
//         backgroundColor: [
//           'rgb(41, 100, 143)',
//           'rgba(97, 174, 231, 1)',
          
          
//         ],
//         borderColor: [
//           'rgb(255, 255, 255)',
//           'rgb(255, 255, 255)',
  
//         ],
       
//       }]
//     },
//   });

//   const ctx3 = document.getElementById('quarterly-sales-chart');

//   new Chart(ctx3, {
//     type: 'line',
//     data: {
//       labels: ['Q1', 'Q2', 'Q3', 'Q4'],
//       datasets: [{
//         label: 'My First Dataset',
//         data: [65, 59, 80, 81],
//         borderColor: 'rgba(97, 174, 231, 1)',
//         tension: 0.1
//       }]
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   });

//   const ctx4 = document.getElementById('monthly-sales-chart');

//   new Chart(ctx4, {
//     type: 'line',
//     data: {
//       labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June','July', 'Aug','Sept','Oct','Nov','Dec'],
//       datasets: [{
//         label: 'My First Dataset',
//         data: [65, 59, 80, 81, 56, 55, 40,90,80,70,50,100],
//         borderColor: 'rgba(97, 174, 231, 1)',
//         tension: 0.1
//       }]
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   });


//   const ctx5 = document.getElementById('location-sales-chart');
//   new Chart(ctx5, {
//     type: 'bar',
//     data: {
//     labels: ['Gutten Plans','EB Public Library','Brunswick Sq Mall','Earle Asphalt'],
//     datasets: [{
//     indexAxis: 'y',
//       label: 'My First Dataset',
//       data: [65, 80, 40, 55 ],
//       fill: false,
//       backgroundColor: [
//         'rgb(41, 100, 143)',
//         'rgb(41, 100, 143)',
//         'rgb(41, 100, 143)',
        
//       ],
//       borderColor: [
//         'rgb(255, 255, 255)',
//         'rgb(255, 255, 255)',
//         'rgb(255, 255, 255)',
//         'rgb(255, 255, 255)',

//       ],
//       borderWidth: 1
//     }]
// }

// });





