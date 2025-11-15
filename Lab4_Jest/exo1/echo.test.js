const { exf } = require('./echo');

describe('exf function (Echo Test)', () => {
    let consoleSpy;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    test('should call console.log 5 times with the string "echo"', () => {
        exf("echo", 5);
        expect(consoleSpy).toHaveBeenCalledTimes(5);
        expect(consoleSpy).toHaveBeenCalledWith("echo");
    });

    test('should call console.log 10 times with the string "JS from server"', () => {
        exf("JS from server", 10);
        expect(consoleSpy).toHaveBeenCalledTimes(10);
        expect(consoleSpy).toHaveBeenCalledWith("JS from server");
    });

    test('should not call console.log when the count n is 0', () => {
        exf("test", 0);
        expect(consoleSpy).not.toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledTimes(0);
    });
});