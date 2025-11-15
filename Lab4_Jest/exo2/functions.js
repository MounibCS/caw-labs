const first = function (array, n) {
    if (array == null || n <= 0)
        return [];
    if (n == null)
        return array[0];
    return array.slice(0, n);
};

const last = function (array, n) {
    if (array == null)
        return [];
    if (n == null)
        return array[array.length - 1];
    if (n <= 0)
        return [];
    return array.slice(Math.max(array.length - n, 0));
};

const concatenateArray = function (array, separator) {
    if (separator === 'toString') {
        return array.join(',');
    }
    if (separator === 'empty') {
        return array.join('');
    }
    return array.join(separator);
};

const chunk = function (array, size) {
    if (array == null || size <= 0) {
        return [];
    }
    var chunkedArr = [];
    var index = 0;
    while (index < array.length) {
        chunkedArr.push(array.slice(index, size + index));
        index += size;
    }
    return chunkedArr;
};

module.exports = { first, last, concatenateArray, chunk };