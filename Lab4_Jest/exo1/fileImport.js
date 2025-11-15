const calculateMean = require('./notation');

const testScores = [15, 18, 12, 19, 10];

const average = calculateMean(testScores);

console.log("Scores:", testScores);
console.log("The average score (mean) is:", average);