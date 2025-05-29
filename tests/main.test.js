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
                h.html`<div class="DAMON-Diff">
                    <div class="DAMON-Diff-legend"><span id="damonDiffRed"><span>Red</span>: Difference</span>; <span id="damonDiffBlue"><span>Blue</span>: Addition</span>; <span id="damonDiffGreen"><span>Green</span>: Displacement</span></div>
                    <ul class="DAMON-List">
                        <li class="" data-graph-arbo="0"><code><span class="type-key">Divide</span>: {}</code>
                            <ul>
                                <li class="" data-graph-arbo="0-0"><code><span class="type-key">n</span>: <span class="type-null">null</span></code></li>
                                <li class="red-diff" aria-describedby="damonDiffRed"><code><span class="type-key">b</span>: {}</code>
                                    <ul>
                                        <li class="red-diff" aria-describedby="damonDiffRed"><code><span class="type-key">1</span></code></li>
                                        <li class="red-diff" aria-describedby="damonDiffRed"><code><span class="type-key">n</span></code></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>`.innerHTML.replaceAll('\n' + '    '.repeat(4), '\n'),
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
                    <li data-graph-arbo="0"><code><span class="type-key">key0</span>: <span class="type-null">null</span></code></li>
                    <li data-graph-arbo="1"><code><span class="type-key">k
                                ey1</span>: []</code>
                        <ul>
                            <li data-graph-arbo="1-0"><code>[]</code>
                                <ul>
                                    <li data-graph-arbo="1-0-0"><code>{}</code>
                                        <ul></ul>
                                    </li>
                                    <li data-graph-arbo="1-0-1"><code>[<span class="type-number">1</span>, <span class="type-number">1</span>, <span class="type-number">1</span>]</code>
                                        <ul></ul>
                                    </li>
                                    <li data-graph-arbo="1-0-2"><code class="type-string">"abc"</code>
                                        <ul></ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li data-graph-arbo="2"><code><span class="type-key">1</span>: {}</code>
                        <ul>
                            <li data-graph-arbo="2-0"><code><span class="type-key">key</span>: <span class="type-number">1</span></code></li>
                            <li data-graph-arbo="2-1"><code><span class="type-key">othe: "rKey</span>: <span class="type-string">": "1e10"</span></code></li>
                        </ul>
                    </li>
                    <li data-graph-arbo="3"><code><span class="type-key">More_complex_case</span>: {}</code>
                        <ul>
                            <li data-graph-arbo="3-0"><code><span class="type-key">key</span>: [<span class="type-string">"1e10"</span>, <span class="type-string">"abc"</span>]</code>
                                <ul></ul>
                            </li>
                        </ul>
                    </li>
                    <li data-graph-arbo="4"><code><span class="type-key">list</span>: []</code>
                        <ul>
                            <li data-graph-arbo="4-0"><code>{}</code>
                                <ul></ul>
                            </li>
                            <li data-graph-arbo="4-1"><code>{}</code>
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
        it('Returns a csv table', function () {
            var tableTestTwo =
                `- {}
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
                        - C`.replaceAll('\n' + '    '.repeat(4), '\n');
                var csv =
                `"heading1","heading2","heading3"
                "A","B","C"
                "A","B","C"`.replaceAll('\n' + '    '.repeat(4), '\n');
            var jsonTable =
                `[
                    ["heading1", "heading2", "heading3"],
                    ["A", "B", "C"],
                    ["A", "B", "C"]
                ]`.replaceAll('\n' + '    '.repeat(4), '\n');
            assert.equal(damonUtils.damonTableToCSV(tableTestTwo), csv);
            assert.equal(damonUtils.csvToDamonTable(csv), tableTestTwo);
            assert.equal(damonUtils.damonTableToJSON(tableTestTwo), jsonTable);
            assert.equal(damonUtils.jsonToDamonTable(jsonTable), tableTestTwo);
        });
    });
    describe('## List contents wrapping', function () {
        it('Returns a list with item contents wrapped in divs', function () {
            let damonList =
                `- {}
                    - key: null
                    - list: []
                        - {}
                        - {}`.replaceAll('\n' + '    '.repeat(4), '\n'),
                returnValue =
                `<ul class="DAMON-List">
                    <li data-graph-arbo="0">
                        <div><code><span class="type-key">key</span>: <span class="type-null">null</span></code></div>
                    </li>
                    <li data-graph-arbo="1">
                        <div><code><span class="type-key">list</span>: []</code></div>
                        <ul>
                            <li data-graph-arbo="1-0">
                                <div><code>{}</code></div>
                                <ul></ul>
                            </li>
                            <li data-graph-arbo="1-1">
                                <div><code>{}</code></div>
                                <ul></ul>
                            </li>
                        </ul>
                    </li>
                </ul>`.replaceAll('\n' + '    '.repeat(4), '\n');
            let test = damonUtils.mapToHtmlList(damon.damonToMap(damonList));
            damonUtils.wrapListContentsForStyling(test.getElementsByTagName('li'));
            assert.equal(beautify(test.outerHTML), returnValue);
        });
    });

    describe('## DAMON GRAPH TO MERMAID', function () {
        it('Returns a mermaid flowchart document', function () {
            let damonGraph =
                `
                - A
                    - a: "B"
                - B
                    - : "C"
                - C
                    - : "A,B"
                `.replaceAll('\n' + '    '.repeat(4), '\n');
            let mermaidGraph =
                `A -- a --> B
                B --> C
                C --> A
                C --> B`.replaceAll('\n' + '    '.repeat(4), '\r\n');
            assert.equal(damonUtils.damonGraphToMermaid(damonGraph), mermaidGraph);
        });
    });
});
