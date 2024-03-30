// dataGeneration.js

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Function to generate data for a pie chart
  const generatePieChartData = () => {
    const allLabels = ['Utilities', 'Other Expenses', 'Shopping', 'Debts/Overpayments', 'Transportation', 'Investment', 'Dining', 'Groceries', 'Insurance', 'Government Services'];
    const selectedLabels = shuffleArray(allLabels).slice(0, 5); // Randomly select 5 labels
    const data = selectedLabels.map(() => parseFloat((Math.random() * 700).toFixed(2))); // Generate random data

    return {
      labels: selectedLabels,
      data: data, // Change this property to 'data' instead of 'datasets'
    };
  };
  
  // Function to generate data for a line graph
  const generateLineGraphData = () => {
    const labels = ['January', 'February', 'March'];
    const data = labels.map(() => parseFloat((Math.random() * 2500).toFixed(2)));
  
    return {
      labels,
      datasets: [
        {
          borderColor: '#FF6384',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          data,
        },
      ],
    };
  };
  
  // Function to generate data for a bar graph
  const generateBarGraphData = () => {
    const allLabels = ['Direct Debit', 'Card Payment', 'Bank Transfer', 'Online Payment', 'Cheque', 'Debit Card', 'Cash'];
    const selectedLabels = shuffleArray(allLabels).slice(0, 5);
    const data = selectedLabels.map(() => parseFloat((Math.random() * 300).toFixed(2)));
    const backgroundColors = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
    ]; // Example colors
  
    return {
      labels: selectedLabels,
      data: data, // Change this property to 'data' instead of 'datasets'
    };
  };
  
  module.exports = { generatePieChartData, generateLineGraphData, generateBarGraphData };
  