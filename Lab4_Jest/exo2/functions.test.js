const { first, last, concatenateArray, chunk } = require('./functions');

describe('Functions Tests', () => {

    const data = [10, 20, 30, 40, 50];

    test('first(array, 3) should return first N elements', () => {
        expect(first(data, 3)).toEqual([10, 20, 30]);
    });
    test('first(array, null) should return the first element', () => {
        expect(first(data, null)).toBe(10);
    });
    test('first(array, 0) should return empty array', () => {
        expect(first(data, 0)).toEqual([]);
    });

    test('last(array, 3) should return last N elements', () => {
        expect(last(data, 3)).toEqual([30, 40, 50]);
    });
    test('last(array, null) should return the last element', () => {
        expect(last(data, null)).toBe(50);
    });
    test('last(array, -1) should return empty array', () => {
        expect(last(data, -1)).toEqual([]);
    });

    const myColor = ["Red", "Green", "White", "Black"];
    test('concatenateArray(array, "toString") should join with comma', () => {
        expect(concatenateArray(myColor, 'toString')).toBe("Red,Green,White,Black");
    });
    test('concatenateArray(array, "empty") should join with no separator', () => {
        expect(concatenateArray(myColor, 'empty')).toBe("RedGreenWhiteBlack");
    });

    test('chunk([1, 2, 3, 4, 5, 6, 7], 3) should create sub-arrays', () => {
        expect(chunk([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
    });
    test('chunk(array, size > length) should return single chunk', () => {
        expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
    });
});