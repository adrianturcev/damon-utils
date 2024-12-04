const assert = require('assert');
const Damon = require('damon2');
const DamonUtils = require('../DamonUtils.js');

describe('# DAMON UTILS', function () {
    const damon = new Damon(),
        damonUtils = new DamonUtils(damon);
    describe('## S-EXPRESSION', function () {
        it('Turns a Damon map-based S-expression into a JSON array-based S-expression.', function () {
            let sExpression =
                `- Divide: {}
                    - n
                    - Add: {}
                        - 1
                        - n`;
            assert.deepEqual(
                [
                    "Divide",
                    "n",
                    [
                        "Add",
                        "1",
                        "n"
                    ]
                ],
                JSON.parse(damon.implicitMapToSExpression(damon.damonToMap(sExpression)))
            );
        });
    });
});
