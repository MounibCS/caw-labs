const mean = require('./notation');

describe('Mean Function Tests', () => {

    test('should calculate the average of a standard array of scores (14.8)', () => {
        const scores = [15, 18, 12, 19, 10];
        expect(mean(scores)).toBe(14.8);
    });

    test('should return 0 for an empty array', () => {
        const scores = [];
        expect(mean(scores)).toBe(0);
    });

    test('should return the number itself for an array with one element', () => {
        const scores = [5];
        expect(mean(scores)).toBe(5);
    });

    test('should correctly calculate the mean of scores including zero', () => {
        const scores = [10, 0, 20];
        expect(mean(scores)).toBe(10);
    });
});