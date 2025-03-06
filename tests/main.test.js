// @ts-nocheck
const assert = require('assert');
const Damon = require('damon2');
const DamonUtils = require('../DamonUtils.js');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const document = (new JSDOM(`...`)).window.document;
const h = require('../helpers.js')(document);
const beautify = require('js-beautify/js').html;

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
                JSON.parse(damonUtils.implicitMapToSExpression(damon.damonToMap(sExpression)))
            );
        });
    });
    describe('## DIFF', function () {
        it('Returns an html list', function () {
            const firstMap =
                `- Divide: {}
                    - n: null
                    - Add: {}
                        - 1
                        - n`,
                secondMap =
                `- Divide: {}
                    - n: null
                    - b: {}
                        - 1
                        - n`,
                expectedOutput =
                h.html`<ul class="DAMON-List">
                    <li class=""><code><span class="type-key">Divide</span>: {}</code>
                        <ul>
                            <li class=""><code><span class="type-key">n</span>: <span class="type-null">null</span></code></li>
                            <li class="red-diff"><code><span class="type-key">b</span>: {}</code>
                                <ul>
                                    <li class="red-diff"><code><span class="type-key">1</span></code></li>
                                    <li class="red-diff"><code><span class="type-key">n</span></code></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>`.innerHTML.replaceAll('\n' + '    '.repeat(4), '\n'),
                renderDiff = damonUtils._mapsDiff(damon.damonToMap(firstMap), damon.damonToMap(secondMap)),
                htmlOutput = damonUtils.renderDiff(damon.damonToMap(firstMap), damon.damonToMap(secondMap));
            assert.equal(expectedOutput, beautify(htmlOutput.outerHTML));
        });
    });

    describe('## LIST', function () {
        it('Returns an html list', function () {
            let damonList =
                `- {}
                    - key0: null
                    - k\\ney1: []
                        - []
                            - {}
                            - [1, 1, 1]
                            - "abc"
                    - 1: {}
                        - key: 1
                        - othe: \\"rKey: ": \\"1e10"
                    - More_complex_case: {}
                        - key: ["1e10", "abc"]
                    - list: []
                        - {}
                        - {}`.replaceAll('\n' + '    '.repeat(4), '\n'),
                htmlList =
                `<ul class="DAMON-List">
                    <li><code><span class="type-key">key0</span>: <span class="type-null">null</span></code></li>
                    <li><code><span class="type-key">k
                            ey1</span>: []</code>
                        <ul>
                            <li><code>[]</code>
                                <ul>
                                    <li><code>{}</code>
                                        <ul></ul>
                                    </li>
                                    <li><code>[<span class="type-number">1</span>, <span class="type-number">1</span>, <span class="type-number">1</span>]</code>
                                        <ul></ul>
                                    </li>
                                    <li><code class="type-string">"abc"</code>
                                        <ul></ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li><code><span class="type-key">1</span>: {}</code>
                        <ul>
                            <li><code><span class="type-key">key</span>: <span class="type-number">1</span></code></li>
                            <li><code><span class="type-key">othe: "rKey</span>: <span class="type-string">": "1e10"</span></code></li>
                        </ul>
                    </li>
                    <li><code><span class="type-key">More_complex_case</span>: {}</code>
                        <ul>
                            <li><code><span class="type-key">key</span>: [<span class="type-string">"1e10"</span>, <span class="type-string">"abc"</span>]</code>
                                <ul></ul>
                            </li>
                        </ul>
                    </li>
                    <li><code><span class="type-key">list</span>: []</code>
                        <ul>
                            <li><code>{}</code>
                                <ul></ul>
                            </li>
                            <li><code>{}</code>
                                <ul></ul>
                            </li>
                        </ul>
                    </li>
                </ul>`.replaceAll('\n' + '    '.repeat(4), '\n');
            assert.equal(beautify(damonUtils.mapToHtmlList(damon.damonToMap(damonList)).outerHTML), beautify(htmlList));
        });
    });
    describe('## TABLE', function () {
        it('Returns an html table', function () {
            var tableTest =
                `- {}
                    - 00: "Caption"
                    - 0: {}
                        - heading1
                        - heading2
                        - heading3
                    - 1: {}
                        - A
                        - B
                        - C
                    - 2: {}
                        - A
                        - B
                        - C`;
            var htmlTable =
                `<table class="DAMON-Table">
                    <caption>Caption</caption>
                    <thead>
                        <tr>
                            <th>heading1</th>
                            <th>heading2</th>
                            <th>heading3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>A</td>
                            <td>B</td>
                            <td>C</td>
                        </tr>
                        <tr>
                            <td>A</td>
                            <td>B</td>
                            <td>C</td>
                        </tr>
                    </tbody>
                </table>`.replaceAll('\n' + '    '.repeat(4), '\n');
            assert.equal(
                beautify(
                    damonUtils.mapToHtmlTable(damon.damonToMap(tableTest)).outerHTML,
                ),
                beautify(htmlTable)
            );
        });
    });
});
