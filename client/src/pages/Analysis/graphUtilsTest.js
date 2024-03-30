// Import the choose_graph function and data generation functions from graphUtils.js and dataGeneration.js
const { choose_graph } = require('./graphUtils');
const { generatePieChartData, generateLineGraphData, generateBarGraphData } = require('./dataGeneration');

// Test cases
const testCases = [
    { userInput: 'compare sales trends', expectedGraphType: 'line' },
    { userInput: 'show percentage distribution', expectedGraphType: 'pie' },
    { userInput: 'analyze data distribution', expectedGraphType: 'bar' },
    { userInput: 'analyze revenue growth', expectedGraphType: 'line' },
    { userInput: 'display variation in stock prices', expectedGraphType: 'line' },
    { userInput: 'compare distribution by category', expectedGraphType: 'bar' },
    { userInput: 'plot frequency of transactions', expectedGraphType: 'bar' },
    { userInput: 'show trend in customer growth', expectedGraphType: 'line' },
    { userInput: 'plot percentage of market share', expectedGraphType: 'pie' },
    { userInput: 'analyze frequency of website visits', expectedGraphType: 'bar' },
    { userInput: 'Compare my withdrawal amounts for the last three months.', expectedGraphType: 'line' },
    { userInput: 'Show me a bar graph of my top five spending categories for this quarter.', expectedGraphType: 'bar' },
    { userInput: 'Visualize the distribution of my transactions by date for the previous month.', expectedGraphType: 'bar' }
];

// Run test cases
testCases.forEach((testCase, index) => {
    const { userInput, expectedGraphType } = testCase;
    const { graphType, data } = choose_graph(userInput);

    console.log(`Test case ${index + 1}: User input "${userInput}" => Selected graph type: ${graphType}`);
    console.log(`Expected graph type: ${expectedGraphType}`);
    console.log('Generated data:');
    console.log(data);
    console.log('----------------------------------------------');

    // Add assertions here to validate graphType against expectedGraphType
});

