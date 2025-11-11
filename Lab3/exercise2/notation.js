const mean = function (scores) {
    if (scores.length === 0) {
        return 0;
    }
    const sum = scores.reduce((total, current) => total + current, 0);
    return sum / scores.length;
};

module.exports = mean;