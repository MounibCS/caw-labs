const calculateMean = require('./notation');

describe('fileImport Integration Test', () => {

    test('should correctly import and use the mean function to get the average (14.8)', () => {
        const testScores = [15, 18, 12, 19, 10]; 
        
        const expectedAverage = 14.8;
        
        const actualAverage = calculateMean(testScores);
        
        expect(actualAverage).toBe(expectedAverage);
    });
});