/**
 * Created by dmorales on 19/01/2016.
 */

Library = {
    repeated: function(initialState, nextStateFunction) {
        for (var state = initialState; state[0] !== null;
             state = nextStateFunction(state)) {
        }
        return state[1];
    }
};

logTest = function() {
    var
        log = function(line) {
            return console.log(line);
        },
        testCases = [
            [0, "sum 0"],
            [10, "sum 1"],
            [32, "sum 5"],
            ["32", "non-number, sum undefined"],
            [null, "non-number, sum undefined"],
            [10.7, "non-integer, sum undefined"],
            [-3, "negative number, sum undefined"]
        ],
        functionNames = [
            "digitSumReport",
            "digitSumReport1",
            "digitSumReport2",
            "digitSumReport3"
        ],
        assertEqualError = function(value, expected, message) {
            return value === expected ? null :
            "ASSERTION FAILED: " + message +
            ": expected " + expected + ", got " + value;
        },
        functionErrors = function(functionName) {
            return Library.repeated([0, []], function(state) {
                var
                    i = state[0],
                    testCase = testCases[i],
                    errors = state[1];
                return testCase ? (function() {
                    var
                        input = testCase[0],
                        output = testCase[1],
                        description = functionName + "(" + input + ")",
                        f = window[functionName],
                        error = assertEqualError(f(input), output, description);
                    return [i + 1, error ? errors.concat(error) : errors];
                })() : [null, errors];
            });
        },
        allFunctionErrors = function() {
            return Library.repeated([0, []], function(state) {
                var
                    i = state[0],
                    errors = state[1],
                    name = functionNames[i];
                return name ? [i + 1, errors.concat(functionErrors(name))] :
                    [null, errors];
            });
        };
    return (function() {
        var
            entries = [].
            concat("Testing...").
            concat(allFunctionErrors()).
            concat("...done.");
        return Library.repeated([0, null], function(state) {
            var
                i = state[0],
                entry = entries[i];
            return entry ? [i + 1, log(entry)] : [null, null];
        });
    })();
};

logTest();