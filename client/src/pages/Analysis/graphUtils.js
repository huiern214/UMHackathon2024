const { generatePieChartData, generateLineGraphData, generateBarGraphData } = require('./dataGeneration');

const questionTypeKeywords = {
    comparison: ['line', 'compare', 'comparison', 'trend', 'change over time', 'versus', 'vs.', 'growth', 'increase', 'decrease', 'higher', 'lower'],
    proportions: ['pie', 'proportion', 'percentage', 'share', 'part of total', 'breakdown', 'composition', 'ratio', 'fraction', 'contribution'],
    distribution: ['bar', 'distribution', 'frequency', 'spread', 'pattern', 'variation', 'occurrence', 'density', 'histogram', 'scatter', 'variability'],
};

function matchKeywords(userInput, keywords) {
    const lowerCaseInput = userInput.toLowerCase();
    return keywords.some(keyword => lowerCaseInput.includes(keyword));
}

function choose_graph(userInput) {
    for (const [questionType, keywords] of Object.entries(questionTypeKeywords)) {
        if (matchKeywords(userInput, keywords)) {
            if (questionType === 'comparison') {
                // Use line graph for comparing values over time
                return { graphType: 'line', data: generateLineGraphData() };
            } else if (questionType === 'proportions') {
                // Use pie chart for showing proportions or percentages
                return { graphType: 'pie', data: generatePieChartData() };
            } else if (questionType === 'distribution') {
                // Use bar graph for showing distribution or frequency
                return { graphType: 'bar', data: generateBarGraphData() };
            }
        }
    }

    // Default to bar graph if question type is unclear or no keywords match
    return { graphType: 'bar', data: generateBarGraphData() };
}

module.exports = { choose_graph };
