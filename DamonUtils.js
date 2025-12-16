const DOMPurify = require('dompurify');
const Papa = require('papaparse');
const jsonLogic = require('json-logic-js');

//#### Utils
module.exports =
class DamonUtils {

    /**
     * Creates an instance of DamonUtils.
     * @param {object} damon
     */
    constructor(damon) {
        let $ = this;
        $.damon = damon;
        $.domPurify = DOMPurify;
        $.websiteRegex = /^(https?:\/\/)?[-a-zA-Z0-9]*[a-zA-Z0-9]+(\.[-a-zA-Z0-9]*[a-zA-Z0-9]+)+/;
        $.httpRegex = /^https?:\/\//;
        $.pathRegex = /^\.*\//;
    }

    /**
     * @param {string} damonString
     * @returns {string}
     */
    damonToHtmlTable(damonString) {
        const $ = this;
        return $.mapToHtmlTable($.damon.damonToMap(damonString, 0, true));
    }

    /**
     * @param {string} damonString
     * @returns {string}
     */
    damonToSExpression(damonString) {
        const $ = this;
        return $.prefixedKeysMapToSExpression($.damon.damonToMap(damonString, 0, true));
    }

    /**
     * @param {string} jsonString
     * @returns {string}
     */
    sExpressionToDamon(jsonString) {
        const $ = this;
        return $.damon.mapToDamon($.sExpressionToPrefixedKeysMap(jsonString), false, true);
    }

    /**
     * @param {string} string
     * @returns {string}
     */
    escape(string) {
        return string
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    /**
     * @typedef {Map<string, damonValue>} damonMap
     * @typedef {Array<damonValue>} damonArray
     * @typedef {damonMap|damonArray|string|number|boolean|null} damonValue
     * @param {damonValue} jsonMap
     * @param {boolean} safeHTML
     * @param {string} jsonContext
     * @returns {object} DOM
     */
    mapToHtmlList(jsonMap, safeHTML = false, jsonContext = undefined) {
        let $ = this;
        // Parsing check
        try {
            $.damon.mapToJSON(jsonMap);
        } catch (error) {
            throw new Error("Provided map value doesn't passes JSON.parse()");
        }
        var jsonItemIndex = 0,
            list = document.createElement('ul'),
            schema;
        if (jsonContext !== undefined) {
            schema = JSON.parse(jsonContext);
        }
        list.className = 'DAMON-List';
        recurse(jsonMap, list);
        return list;
        /**
         * @param {damonValue} jsonMap
         * @param {object} listItem
         * @returns {object} DOM
         */
        function recurse(jsonMap, listItem, path = []) {// imitate renderDiff
            if (
                typeof listItem !== 'object'
                || listItem == null
                || Array.isArray(listItem)
            ) {
                throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
            }
            if (
                typeof jsonMap === 'object'
                && jsonMap !== null
                && !Array.isArray(jsonMap)
                && jsonMap instanceof Map
                && jsonMap.constructor === Map
            ) {
                if (listItem.tagName == "UL") {
                    for (const [key, value] of jsonMap) {
                        let newList = document.createElement('ul'),
                            newDiv = document.createElement('code'),
                            keySpan = document.createElement('span'),
                            newListItem = document.createElement('li');
                        newListItem.dataset.graphArbo = Array.from(jsonMap.keys()).indexOf(key);
                        if (path.length > 0)
                            newListItem.dataset.graphArbo =
                                path.join('-') + '-' + Array.from(jsonMap.keys()).indexOf(key);
                        keySpan.className = "type-key";
                        if (
                            $.websiteRegex.test(key)
                            || $.pathRegex.test(key)
                        ) {
                            let fullUrl = key;
                            if (
                                $.websiteRegex.test(key)
                                && !$.httpRegex.test(key)
                            )
                                fullUrl = ('https://' + key);
                            let keyLink = DOMPurify.sanitize(`<a href="${ fullUrl }"><span>${ fullUrl }</span></a>`);
                            keySpan.innerHTML = keyLink;
                        } else {
                            if (
                                jsonContext !== undefined
                                && key in schema['@context']
                            ) {
                                keySpan.innerHTML =
                                    DOMPurify.sanitize(
                                        `<a href="${ schema['@context'][key]['@id'] }"><span>${ key }</span></a>`
                                    );
                            } else {
                                keySpan.textContent = key;
                            }
                        }
                        if (
                            typeof value === 'object'
                            && value !== null
                        ) {
                            if (Array.isArray(value)) {
                                if (
                                    jsonMap.damonInlineArrays !== undefined
                                    && jsonMap.damonInlineArrays.indexOf(key) > -1
                                ) {
                                    newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>[';
                                    for (let j = 0, k = value.length; j < k; j++) {
                                        let childValueSpan = document.createElement('span'),
                                            childValue = value[j];
                                        if (childValue === true) {
                                            childValueSpan.textContent = "true";
                                            childValueSpan.className = "type-boolean";
                                        } else if (childValue === false) {
                                            childValueSpan.textContent = "false";
                                            childValueSpan.className = "type-boolean";
                                        } else if (childValue === null) {
                                            childValueSpan.textContent = "null";
                                            childValueSpan.className = "type-null";
                                        } else if (
                                            Number.isFinite(childValue)
                                            && !Number.isNaN(childValue)
                                        ) {
                                            childValueSpan.textContent = childValue + "";
                                            childValueSpan.className = "type-number";
                                        } else {
                                            if (safeHTML) {
                                                if (
                                                    $.websiteRegex.test(childValue)
                                                    || $.pathRegex.test(childValue)
                                                ) {
                                                    let fullUrl = childValue;
                                                    if (
                                                        $.websiteRegex.test(childValue)
                                                        && !$.httpRegex.test(childValue)
                                                    )
                                                        fullUrl = 'https://' + childValue;
                                                    childValueSpan.innerHTML =
                                                        DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                                } else {
                                                    childValueSpan.innerHTML = `"${childValue}"`;
                                                }
                                            } else {
                                                if (
                                                    $.websiteRegex.test(childValue)
                                                    || $.pathRegex.test(childValue)
                                                ) {
                                                    let fullUrl = childValue;
                                                    if (
                                                        !$.httpRegex.test(childValue)
                                                        && $.websiteRegex.test(childValue)
                                                    )
                                                        fullUrl = 'https://' + childValue;
                                                    childValueSpan.innerHTML =
                                                        DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                                } else {
                                                    childValueSpan.textContent = `"${childValue}"`;
                                                }
                                            }
                                            childValueSpan.className = "type-string";
                                        }
                                        if (j !== 0) {
                                            newDiv.innerHTML += ', ';
                                        }
                                        newDiv.appendChild(childValueSpan);
                                    }
                                    newDiv.innerHTML += ']';
                                    newListItem.appendChild(newDiv);
                                    newListItem.appendChild(newList);
                                    listItem.appendChild(newListItem);
                                } else {
                                    newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>[]';
                                    newListItem.appendChild(newDiv);
                                    newListItem.appendChild(newList);
                                    listItem.appendChild(newListItem);
                                    recurse(value, newList, path.concat([Array.from(jsonMap.keys()).indexOf(key)]));
                                }
                            } else {
                                if (
                                    jsonMap.implicitMaps !== undefined
                                    && jsonMap.implicitMaps.indexOf(key) > -1
                                ) {
                                    newDiv.innerHTML = keySpan.outerHTML;
                                } else {
                                    newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>{}';
                                }
                                newListItem.appendChild(newDiv);
                                newListItem.appendChild(newList);
                                listItem.appendChild(newListItem);
                                recurse(value, newList, path.concat([Array.from(jsonMap.keys()).indexOf(key)]));
                            }
                        } else {
                            jsonItemIndex++;
                            newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>';
                            let valueSpan = document.createElement('span');
                            let childText = value;
                            if (childText === true) {
                                valueSpan.textContent = "true";
                                valueSpan.className = "type-boolean";
                            } else if (childText === false) {
                                valueSpan.textContent = "false";
                                valueSpan.className = "type-boolean";
                            } else if (childText === null) {
                                valueSpan.textContent = "null";
                                valueSpan.className = "type-null";
                            } else if (
                                Number.isFinite(childText)
                                && !Number.isNaN(childText)
                            ) {
                                valueSpan.textContent = childText + "";
                                valueSpan.className = "type-number";
                            } else {
                                if (safeHTML) {
                                    if (
                                        $.websiteRegex.test(childText)
                                        || $.pathRegex.test(childText)
                                    ) {
                                        let fullUrl = childText;
                                        if (
                                            !$.httpRegex.test(childText)
                                            && $.websiteRegex.test(childText)
                                        )
                                            fullUrl = 'https://' + childText;
                                        valueSpan.innerHTML =
                                            DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                    } else {
                                        valueSpan.innerHTML = `"${childText}"`;
                                    }
                                } else {
                                    if (
                                        $.websiteRegex.test(childText)
                                        || $.pathRegex.test(childText)
                                    ) {
                                        let fullUrl = childText;
                                        if (
                                            !$.httpRegex.test(childText)
                                            && $.websiteRegex.test(childText)
                                        )
                                            fullUrl = 'https://' + childText;
                                        valueSpan.innerHTML =
                                            DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                    } else {
                                        valueSpan.textContent = `"${childText}"`;
                                    }
                                }
                                valueSpan.className = "type-string";
                            }
                            if (
                                jsonMap.implicitNulls === undefined
                                || jsonMap.implicitNulls.indexOf(key) == -1
                            ) {
                                newDiv.appendChild(valueSpan);
                            } else {
                                newDiv.innerHTML = newDiv.innerHTML.slice(0, -2);
                            }
                            newListItem.appendChild(newDiv);
                            listItem.appendChild(newListItem);
                        }
                    }
                }
            } else if (Array.isArray(jsonMap)) {
                for (var i = 0, c = jsonMap.length; i < c; i++) {
                    let newList = document.createElement('ul'),
                        newDiv = document.createElement('code'),
                        newListItem = document.createElement('li');
                    newListItem.dataset.graphArbo = i;
                    if (path.length > 0)
                        newListItem.dataset.graphArbo = path.join('-') + '-' + i;
                    if (
                        typeof jsonMap[i] === 'object'
                        && jsonMap[i] !== null
                    ) {
                        if (Array.isArray(jsonMap[i])) {
                            if (
                                jsonMap.damonInlineArrays !== undefined
                                && jsonMap.damonInlineArrays.indexOf(i) > -1
                            ) {
                                newDiv.innerHTML += '[';
                                for (let j = 0, k = jsonMap[i].length; j < k; j++) {
                                    let valueSpan = document.createElement('span'),
                                        value = jsonMap[i][j];
                                    if (value === true) {
                                        valueSpan.textContent = "true";
                                        valueSpan.className = "type-boolean";
                                    } else if (value === false) {
                                        valueSpan.textContent = "false";
                                        valueSpan.className = "type-boolean";
                                    } else if (value === null) {
                                        valueSpan.textContent = "null";
                                        valueSpan.className = "type-null";
                                    } else if (
                                        Number.isFinite(value)
                                        && !Number.isNaN(value)
                                    ) {
                                        valueSpan.textContent = value + "";
                                        valueSpan.className = "type-number";
                                    } else {
                                        if (safeHTML) {
                                            if (
                                                $.websiteRegex.test(value)
                                                || $.pathRegex.test(value)
                                            ) {
                                                let fullUrl = value;
                                                if (
                                                    !$.httpRegex.test(value)
                                                    && $.websiteRegex.test(value)
                                                )
                                                    fullUrl = ('https://' + value);
                                                valueSpan.innerHTML =
                                                    DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                            } else {
                                                valueSpan.innerHTML = `"${value}"`;
                                            }
                                        } else {
                                            if (
                                                $.websiteRegex.test(value)
                                                || $.pathRegex.test(value)
                                            ) {
                                                let fullUrl = value;
                                                if (
                                                    !$.httpRegex.test(value)
                                                    && $.websiteRegex.test(value)
                                                )
                                                    fullUrl = ('https://' + value);
                                                valueSpan.innerHTML =
                                                    DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                            } else {
                                                valueSpan.textContent = `"${value}"`;
                                            }
                                        }
                                        valueSpan.className = "type-string";
                                    }
                                    if (j !== 0) {
                                        newDiv.innerHTML += ', ';
                                    }
                                    newDiv.appendChild(valueSpan);
                                }
                                newDiv.innerHTML += ']';
                                newListItem.appendChild(newDiv);
                                newListItem.appendChild(newList);
                                listItem.appendChild(newListItem);
                            } else {
                                newDiv.textContent = "[]";
                                newListItem.appendChild(newDiv);
                                newListItem.appendChild(newList);
                                listItem.appendChild(newListItem);
                                recurse(jsonMap[i], newList, path.concat(i));
                            }
                        } else {
                            newDiv.textContent = "{}";
                            newListItem.appendChild(newDiv);
                            newListItem.appendChild(newList);
                            listItem.appendChild(newListItem);
                            recurse(jsonMap[i], newList, path.concat(i));
                        }
                    } else {
                        jsonItemIndex++;
                        let childText = jsonMap[i];
                        if (childText === true) {
                            newDiv.textContent = "true";
                            newDiv.className = "type-boolean";
                        } else if (childText === false) {
                            newDiv.textContent = "false";
                            newDiv.className = "type-boolean";
                        } else if (childText === null) {
                            newDiv.textContent = "null";
                            newDiv.className = "type-null";
                        } else if (
                            Number.isFinite(childText)
                            && !Number.isNaN(childText)
                        ) {
                            newDiv.textContent = childText + "";
                            newDiv.className = "type-number";
                        } else {
                            if (safeHTML) {
                                if (
                                    $.websiteRegex.test(childText)
                                    || $.pathRegex.test(childText)
                                ) {
                                    let fullUrl = childText;
                                    if (
                                        !$.httpRegex.test(childText)
                                        && $.websiteRegex.test(childText)
                                    )
                                        fullUrl = 'https://' + childText;
                                    newDiv.innerHTML =
                                        DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                } else {
                                    newDiv.innerHTML = `"${childText}"`;
                                }
                            } else {
                                if (
                                    $.websiteRegex.test(childText)
                                    || $.pathRegex.test(childText)
                                ) {
                                    let fullUrl = childText;
                                    if (
                                        !$.httpRegex.test(childText)
                                        && $.websiteRegex.test(childText)
                                    )
                                        fullUrl = 'https://' + childText;
                                    newDiv.innerHTML =
                                        DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                } else {
                                    newDiv.textContent = `"${childText}"`;
                                }
                            }
                            newDiv.className = "type-string";
                        }
                        newListItem.appendChild(newDiv);
                        newListItem.appendChild(newList);
                        listItem.appendChild(newListItem);
                    }
                }
            }
        }
    }

    sliceIjsonKey(key) {
        let indexPrefixMatch = key.match(/^[0-9]+-/);
        if (indexPrefixMatch[0] !== null) {
            return key.slice(indexPrefixMatch[0].length);
        } else {
            throw new Error(`Key "${ key }" fails IJSON validation.`);
        }
    }

    /**
     * @param {damonValue} jsonMap
     * @param {boolean} [safeHTML=false]
     * @returns {object} DOM
     */
    mapToHtmlTable(jsonMap, safeHTML = false) {
        let $ = this;
        // Parsing check
        try {
            $.damon.mapToJSON(jsonMap);
        } catch (error) {
            throw new Error("Provided value doesn't passes JSON.parse().");
        }
        var jsonItemIndex = 0,
            table = document.createElement('table'),
            tHead = document.createElement('thead'),
            tBody = document.createElement('tbody'),
            headingsEncountered = false,
            columnsLength = 0;
        table.className = 'DAMON-Table';
        if (
            typeof jsonMap !== 'object'
            || jsonMap == null
            || Array.isArray(jsonMap)
            || !(jsonMap instanceof Map)
            || jsonMap.constructor !== Map
        ) {
            throw new Error("Error: expected an Object value, saw otherwise.");
        }
        for (const [key, value] of jsonMap) {
            if (
                typeof value === 'object'
                && value !== null
                && !Array.isArray(value)
                && value instanceof Map
                && value.constructor === Map
            ) {
                if (jsonItemIndex == 0) {
                    let slicedSubMapKeys = Array.from(value.keys()).map($.sliceIjsonKey),
                        slicedSubMapKeysSet = new Set(slicedSubMapKeys);
                    if (slicedSubMapKeys.length !== slicedSubMapKeysSet.size) {
                        throw new Error('Duplicate in headings.');
                    }
                    let row = document.createElement('tr');
                    columnsLength = value.length;
                    for (const [cK, childValue] of value) {
                        let childKey = $.sliceIjsonKey(cK);
                        if (childValue === null) {
                            let headerCell = document.createElement('th');
                            headerCell.dataset.graphArbo = jsonItemIndex + '-' + row.children.length;
                            if (safeHTML) {
                                if (
                                    $.websiteRegex.test(childKey)
                                    || $.pathRegex.test(childKey)
                                ) {
                                    headerCell.innerHTML =
                                        DOMPurify.sanitize(`<a href="${ childKey }">${ childKey }</a>`);
                                } else {
                                    headerCell.innerHTML = `${childKey}`;
                                }
                            } else {
                                if (
                                    $.websiteRegex.test(childKey)
                                    || $.pathRegex.test(childKey)
                                ) {
                                    headerCell.innerHTML =
                                        DOMPurify.sanitize(`<a href="${ childKey }">${ childKey }</a>`);
                                } else {
                                    headerCell.textContent = `${childKey}`;
                                }
                            }
                            row.appendChild(headerCell);
                        } else {
                            throw new Error(
                                "Error row " + jsonItemIndex + ": expected implicit null property, saw otherwise."
                            );
                        }
                    }
                    tHead.appendChild(row);
                    headingsEncountered = true;
                } else {
                    if (value.length != columnsLength) {
                        // unmatching columns length
                        throw new Error(
                            "Error row " + jsonItemIndex + ": cells total doesn't match the header's."
                        );
                    }
                    let row = document.createElement('tr');
                    for (const [cK, childValue] of value) {
                        let childKey = $.sliceIjsonKey(cK);
                        if (childValue === null) {
                            let dataCell = document.createElement('td');
                            dataCell.dataset.graphArbo = jsonItemIndex + '-' + row.children.length;
                            if (safeHTML) {
                                if (
                                    $.websiteRegex.test(childKey)
                                    || $.pathRegex.test(childKey)
                                ) {
                                    dataCell.innerHTML =
                                        DOMPurify.sanitize(`<a href="${ childKey }">${ childKey }</a>`);
                                } else {
                                    dataCell.innerHTML = `${childKey}`;
                                }
                            } else {
                                if (
                                    $.websiteRegex.test(childKey)
                                    || $.pathRegex.test(childKey)
                                ) {
                                    dataCell.innerHTML =
                                        DOMPurify.sanitize(`<a href="${ childKey }">${ childKey }</a>`);
                                } else {
                                    dataCell.textContent = `${childKey}`;
                                }
                            }
                            row.appendChild(dataCell);
                        } else {
                            throw new Error(
                                "Error row " + jsonItemIndex + ": expected implicit null property, saw otherwise."
                            );
                        }
                    }
                    tBody.appendChild(row);
                }
            } else {
                throw new Error("Error row " + jsonItemIndex + ": expected an Object value, saw otherwise.");
            }
            jsonItemIndex++;
        }
        if (headingsEncountered) {
            table.appendChild(tHead);
        }
        table.appendChild(tBody);
        return table;
    }

    /**
     * @param {damonMap} jsonMap
     * @returns {string}
     */
    prefixedKeysMapToSExpression(jsonMap) {
        const $ = this;
        var list = ``;
         if (
            typeof jsonMap === 'object'
            && jsonMap !== null
            && jsonMap instanceof Map
            && jsonMap.constructor === Map
        ) {
            list += "[\r\n";
            _recurse(jsonMap);
            list += "]";
            JSON.parse(list);
            return list;
        } else {
            if (typeof jsonMap == 'string') {
                jsonMap = '"' + jsonMap + '"';
            }
            JSON.parse(jsonMap);
            return jsonMap;
        }
        /**
         * @param {Map<string, any>|Array<any>} jsonMap
         * @param {number} [level=1]
         * @returns {string}
         */
        function _recurse(jsonMap, level = 1) {
            if (
                typeof jsonMap === 'object'
                && jsonMap !== null
                && !Array.isArray(jsonMap)
                && jsonMap instanceof Map
                && jsonMap.constructor === Map
            ) {
                let i = -1;
                for (const [k, value] of jsonMap) {
                    i++;
                    let key = $.sliceIjsonKey(k);
                    if (
                        typeof value === 'object'
                        && value !== null
                    ) {
                        if (Array.isArray(value)) {
                            if (value.length > 0) {
                                list += '    '.repeat(level) + `${JSON.stringify(key)}, [\r\n`;
                                _recurse(value, level + 1);
                                list += '    '.repeat(level) + `]`;
                            } else {
                                list += '    '.repeat(level) + `${JSON.stringify(key)}, []`;
                            }
                        } else {
                            if (Array.from(value.keys()).length > 0) {
                                if (level == 1) {
                                    if (i == 0) {
                                        list = "";
                                    } else {
                                        throw new Error("Multiple S-Expression roots");
                                    }
                                }
                                list += '    '.repeat(level) + `[${JSON.stringify(key)}, \r\n`;
                                _recurse(value, level + 1);
                                if (level != 1) {
                                    list += '    '.repeat(level) + `]`;
                                }
                            } else {
                                list += '    '.repeat(level) + `${JSON.stringify(key)}, []`;
                            }
                        }
                    } else {
                        if (value === true) {
                            throw new Error('Booleans require quotes');
                        } else if (value === false) {
                            throw new Error('Booleans require quotes');
                        } else if (value === null) {
                            list += '    '.repeat(level) + `${JSON.stringify(key)}`;
                        } else if (
                            Number.isFinite(value)
                            && !Number.isNaN(value)
                        ) {
                            list += '    '.repeat(level) + `${JSON.stringify(key)}` + ', ' + value;
                        } else {
                            list += '    '.repeat(level) + `${JSON.stringify(key)}` + ', ' + JSON.stringify(value);
                        }
                    }
                    let lastKey = Array.from(jsonMap.keys())[Array.from(jsonMap.keys()).length - 1];
                    if (k != lastKey) {
                        list += ",\r\n";
                    } else {
                        list += "\r\n";
                    }
                }
            } else if (Array.isArray(jsonMap)) {
                for (var i = 0, c = jsonMap.length; i < c; i++) {
                    if (
                        typeof jsonMap[i] === 'object'
                        && jsonMap[i] !== null
                    ) {
                        if (Array.isArray(jsonMap[i])) {
                            if (jsonMap[i].length > 0) {
                                list += '    '.repeat(level) + `[\r\n`;
                                _recurse(jsonMap[i], level + 1);
                                list += '    '.repeat(level) + `]`;
                            } else {
                                list += '    '.repeat(level) + `[]`;
                            }
                        } else {
                            if (Array.from(jsonMap[i].keys()).length > 0) {
                                list += '    '.repeat(level) + `[\r\n`;
                                _recurse(jsonMap[i], level + 1);
                                list += '    '.repeat(level) + `]`;
                            } else {
                                list += '    '.repeat(level) + `[]`;
                            }
                        }
                    } else {
                        if (jsonMap[i] === true) {
                            throw new Error('Booleans require quotes');
                        } else if (jsonMap[i] === false) {
                            throw new Error('Booleans require quotes');
                        } else if (jsonMap[i] === null) {
                            throw new Error('Array-nulls require quotes');
                        } else if (
                            Number.isFinite(jsonMap[i])
                            && !Number.isNaN(jsonMap[i])
                        ) {
                            list += '    '.repeat(level) + jsonMap[i];
                        } else {
                            list += '    '.repeat(level) + JSON.stringify(jsonMap[i]);
                        }
                    }
                    if (i != c - 1) {
                        list += ",\r\n";
                    } else {
                        list += "\r\n";
                    }
                }
            }
        }
    }

    /**
     *
     *
     * @param {String} sExpression
     * @returns {Map}
     */
    sExpressionToPrefixedKeysMap(sExpression) {
        const $ = this;
        let damonMap = new Map();
        damonMap.headless = true;
        _recurse(JSON.parse(sExpression), damonMap, 0);
        return damonMap;
        function _recurse(sExpressionArray, map, i) {
            let childMap = new Map();
            map.set(i + '-' + sExpressionArray[0], childMap);
            for (let i = 1, c = sExpressionArray.length; i < c; i++) {
                if (Array.isArray(sExpressionArray[i])) {
                    _recurse(sExpressionArray[i], childMap, i - 1);
                } else {
                    let indexPrefixedKey = (i - 1) + '-' + sExpressionArray[i];
                    childMap.set(indexPrefixedKey, null);
                }
            }
        }
    }

    /**
     * Arrays of inline-arrays produce array-parameters
     * @param {string} damonString
     * @return {string} mathJs
     */
    prefixedKeysMapToMathJs(damonMap) {
        const $ = this;
        let mathJs = '';
        if (Array.isArray(damonMap)) {
            _recurse(damonMap);
            return mathJs.slice(0, -1);
        } else if (
            typeof damonMap === 'object'
            && damonMap !== null
            && damonMap instanceof Map
            && damonMap.constructor === Map
        ) {
            _recurse(damonMap);
            return mathJs.slice(0, -1);
        } else {8
            if (typeof damonMap == 'string') {
                damonMap = JSON.stringify(damonMap);
            }
            JSON.parse(damonMap);
            return damonMap;
        }

        function _minusculize(string) {
            return string[0].toLowerCase() + string.slice(1);
        }
        /**
         * @param {Map<string, any>|Array<any>} damonMap
         * @param {number} [level=1]
         * @returns {string}
         */
        function _recurse(damonMap, level = 0) {
            if (
                typeof damonMap === 'object'
                && damonMap !== null
                && !Array.isArray(damonMap)
                && damonMap instanceof Map
                && damonMap.constructor === Map
            ) {
                for (const [k, value] of damonMap) {
                    let key = $.sliceIjsonKey(k);
                    // Normalizing to katex
                    if (key == 'Power')
                        key = 'Pow';
                    if (key == 'e')
                        key = '2.718281828459045';
                    if (key == 'i')
                        key = 'sqrt(-1)';
                    if (key == 'LN2')
                        key = '0.6931471805599453';
                    if (key == 'LN10')
                        key = '2.302585092994046';
                    if (key == 'LOG2E')
                        key = '1.4426950408889634';
                    if (key == 'LOG10E')
                        key = '0.4342944819032518';
                    if (key == 'phi')
                        key = '1.618033988749895';
                    if (key == 'pi')
                        key = '3.141592653589793';
                    if (key == 'SQRT1_2')
                        key = '0.7071067811865476';
                    if (key == 'SQRT2')
                        key = '1.4142135623730951';
                    if (key == 'tau')
                        key = '6.283185307179586';
                    if (
                        typeof value === 'object'
                        && value !== null
                    ) {
                        if (Array.isArray(value)) {
                            if (value.length > 0) {
                                mathJs += '    '.repeat(level) + `${JSON.stringify(_minusculize(key)).slice(1, -1)}(\n`;
                                _recurse(value, level + 1);
                                mathJs += '    '.repeat(level) + `)`;
                            } else {
                                mathJs += '    '.repeat(level) + `${JSON.stringify(_minusculize(key)).slice(1, -1)}()`;
                            }
                        } else {
                            if (Array.from(value.keys()).length > 0) {
                                mathJs += '    '.repeat(level) + `${JSON.stringify(_minusculize(key)).slice(1, -1)}(\n`;
                                _recurse(value, level + 1);
                                mathJs += '    '.repeat(level) + `)`;
                            } else {
                                mathJs += '    '.repeat(level) + `${JSON.stringify(_minusculize(key)).slice(1, -1)}()`;
                            }
                        }
                    } else {
                        if (value === true) {
                            mathJs += '    '.repeat(level) + `${JSON.stringify(_minusculize(key)).slice(1, -1)}` + "(true)";
                        } else if (value === false) {
                            mathJs += '    '.repeat(level) + `${JSON.stringify(_minusculize(key)).slice(1, -1)}` + "(false)";
                        } else if (value === null) {
                            mathJs += '    '.repeat(level) + `${JSON.stringify(_minusculize(key)).slice(1, -1)}`;
                        } else if (
                            Number.isFinite(value)
                            && !Number.isNaN(value)
                        ) {
                            mathJs += '    '.repeat(level) + `${JSON.stringify(_minusculize(key)).slice(1, -1)}` + '(' + value + ')';
                        } else {
                            mathJs +=
                                '    '.repeat(level)
                                + `${JSON.stringify(_minusculize(key)).slice(1, -1)}`
                                + '(' + JSON.stringify(value) + ')';
                        }
                    }
                    let lastKey = Array.from(damonMap.keys())[Array.from(damonMap.keys()).length - 1];
                    if (k != lastKey) {
                        mathJs += ",\n";
                    } else {
                        mathJs += "\n";
                    }
                }
            } else if (Array.isArray(damonMap)) {
                for (var i = 0, c = damonMap.length; i < c; i++) {
                    if (
                        typeof damonMap[i] === 'object'
                        && damonMap[i] !== null
                    ) {
                        if (Array.isArray(damonMap[i])) {
                            if (damonMap[i].length > 0) {
                                if (
                                    damonMap.damonInlineArrays !== undefined
                                    && damonMap.damonInlineArrays.indexOf(i) > -1
                                ) {
                                    if (damonMap[i] === true) {
                                        mathJs += '    '.repeat(level) + "true";
                                    } else if (damonMap[i] === false) {
                                        mathJs += '    '.repeat(level) + "false";
                                    } else if (damonMap[i] === null) {
                                        mathJs += '    '.repeat(level) + "null";
                                    } else if (
                                        Number.isFinite(damonMap[i])
                                        && !Number.isNaN(damonMap[i])
                                    ) {
                                        mathJs += '    '.repeat(level) + damonMap[i];
                                    } else {
                                        mathJs += '    '.repeat(level) + JSON.stringify(damonMap[i]).slice(1, -1);
                                    }
                                } else {
                                    mathJs += '    '.repeat(level) + `(\n`;
                                    _recurse(damonMap[i], level + 1);
                                    mathJs += '    '.repeat(level) + `)`;
                                }
                            } else {
                                mathJs += '    '.repeat(level) + `()`;
                            }
                        } else {
                            if (Array.from(damonMap[i].keys()).length > 0) {
                                mathJs += '    '.repeat(level) + `(\n`;
                                _recurse(damonMap[i], level + 1);
                                mathJs += '    '.repeat(level) + `)`;
                            } else {
                                mathJs += '    '.repeat(level) + `()`;
                            }
                        }
                    } else {
                        if (damonMap[i] === true) {
                            mathJs += '    '.repeat(level) + "true";
                        } else if (damonMap[i] === false) {
                            mathJs += '    '.repeat(level) + "false";
                        } else if (damonMap[i] === null) {
                            mathJs += '    '.repeat(level) + "null";
                        } else if (
                            Number.isFinite(damonMap[i])
                            && !Number.isNaN(damonMap[i])
                        ) {
                            mathJs += '    '.repeat(level) + damonMap[i];
                        } else {
                            mathJs += '    '.repeat(level) + JSON.stringify(damonMap[i]).slice(1, -1);
                        }
                    }
                    if (i != c - 1) {
                        mathJs += ",\n";
                    } else {
                        mathJs += "\n";
                    }
                }
            }
        }
    }

    /**
     * @param {damonValue} firstMap
     * @param {damonValue} secondMap
    */
    _mapsDiff(firstMap, secondMap) {
        let $ = this;
        // Parsing check
        try {
            $.damon.mapToJSON(firstMap);
            $.damon.mapToJSON(secondMap);
        } catch (error) {
            throw new Error("Provided map value doesn't passes JSON.parse()");
        }
        if (
            typeof firstMap !== typeof secondMap
            || (
                (
                    typeof firstMap === 'object'
                    && firstMap !== null
                    && !Array.isArray(firstMap)
                    && firstMap instanceof Map
                    && firstMap.constructor === Map
                ) && (
                    secondMap == null
                    || Array.isArray(secondMap)
                    || !(secondMap instanceof Map)
                    || secondMap.constructor !== Map
                )
            )
        ) {
            // fully red render
            throw new Error("Different root types.");
        }
        var diffMap;
        if (
            typeof firstMap === 'object'
            && firstMap !== null
            && !Array.isArray(firstMap)
            && firstMap instanceof Map
            && firstMap.constructor === Map
        ) {
            diffMap = new Map();
            _walkAndDiff(firstMap);
            return diffMap;
            // # Red-Green-Yellow diffMap
            // - Checks key, value-structure and position: "green" && recurse
            // - Fails key or value-structure: red
            // - Fails position: yellow
            // - Check value structure: green
            // # Rendering
            // - Render from Red-Green-Yellow
            // - optimization: lookahead and group
            // Intersection, Substraction, Addition
            // can't use mapToDamon for deep equal
            // strict map ordering check
            // red: diff
            // green: add
            // yellow: displaced
        } else if (Array.isArray(firstMap)) {
            diffMap = [];
            _walkAndDiff(firstMap);
            return diffMap;
            // array case
        }

        /**
         * @param {Map<string, any>|Array<any>} map
         * @param {Array<string|number>} targetPath
         * @param {Array<string|number>} [currentPath=[]]
        */
        function _walkAndDiff(map, currentPath = []) {
            if (
                typeof map === 'object'
                && map !== null
                && !Array.isArray(map)
                && map instanceof Map
                && map.constructor === Map
            ) {
                let secondMapKey = "",
                    secondMapValue = null,
                    secondMapCurrentFractal = secondMap;
                for (let i = 0, c = currentPath.length; i < c; i++) {
                    if (
                        typeof secondMapCurrentFractal === 'object'
                        && secondMapCurrentFractal !== null
                        && !Array.isArray(secondMapCurrentFractal)
                        && secondMapCurrentFractal instanceof Map
                        && secondMapCurrentFractal.constructor === Map
                    ) {
                        secondMapCurrentFractal =
                            secondMapCurrentFractal.get(Array.from(secondMapCurrentFractal.keys())[currentPath[i]]);
                    } else {
                        secondMapCurrentFractal = secondMapCurrentFractal[currentPath[i]];
                    }
                }
                let diffMapCurrentFractal = diffMap;
                for (let i = 0, c = currentPath.length; i < c; i++) {
                    if (
                        typeof diffMapCurrentFractal === 'object'
                        && diffMapCurrentFractal !== null
                        && !Array.isArray(diffMapCurrentFractal)
                        && diffMapCurrentFractal instanceof Map
                        && diffMapCurrentFractal.constructor === Map
                        && Array.from(diffMapCurrentFractal.keys()).length
                    ) {
                        diffMapCurrentFractal =
                            diffMapCurrentFractal.get(Array.from(diffMapCurrentFractal.keys())[currentPath[i]]);
                    } else {
                        diffMapCurrentFractal = diffMapCurrentFractal[currentPath[i]];
                    }
                }
                let index = 0;
                for (const [key, value] of map) {
                    if (index > Array.from(secondMapCurrentFractal.keys()).length - 1) {
                        if (
                            typeof value === 'object'
                            && value !== null
                            && !Array.isArray(value)
                            && value instanceof Map
                            && value.constructor === Map
                        ) {
                            if (
                                Array.from(secondMapCurrentFractal.keys()).indexOf(key) !== -1
                                && (
                                    typeof secondMapCurrentFractal.get(key) === 'object'
                                    && secondMapCurrentFractal.get(key) !== null
                                    && !Array.isArray(secondMapCurrentFractal.get(key))
                                    && secondMapCurrentFractal.get(key) instanceof Map
                                    && secondMapCurrentFractal.get(key).constructor === Map
                                )
                            ) {
                                diffMapCurrentFractal.set(index + '-yellow', null);
                            } else {
                                diffMapCurrentFractal.set(index + '-red', null);
                            }
                        } else if (Array.isArray(value)) {
                            if (
                                Array.from(secondMapCurrentFractal.keys()).indexOf(key) !== -1
                                && Array.isArray(secondMapCurrentFractal.get(key))
                            ) {
                                diffMapCurrentFractal.set(index + '-yellow', null);
                            } else {
                                diffMapCurrentFractal.set(index + '-red', null);
                            }
                        } else {
                            if (
                                Array.from(secondMapCurrentFractal.keys()).indexOf(key) !== -1
                                && value === secondMapCurrentFractal.get(key)
                            ) {
                                diffMapCurrentFractal.set(index + '-yellow', null);
                            } else {
                                diffMapCurrentFractal.set(index + '-red', null);
                            }
                        }
                    } else {
                        secondMapKey = Array.from(secondMapCurrentFractal.keys())[index];
                        secondMapValue = secondMapCurrentFractal.get(secondMapKey);
                        if (
                            typeof value === 'object'
                            && value !== null
                            && !Array.isArray(value)
                            && value instanceof Map
                            && value.constructor === Map
                        ) {
                            if (
                                typeof secondMapValue === 'object'
                                && secondMapValue !== null
                                && !Array.isArray(secondMapValue)
                                && secondMapValue instanceof Map
                                && secondMapValue.constructor === Map
                            ) {
                                if (key === secondMapKey) {
                                    diffMapCurrentFractal.set(index + '-green', new Map());
                                    if (Array.from(value.keys()).length > 0) {
                                        _walkAndDiff(value, currentPath.concat([index]));
                                    }
                                } else {
                                    diffMapCurrentFractal.set(index + '-red', null);
                                }
                            } else {
                                diffMapCurrentFractal.set(index + '-red', null);
                            }
                        } else if (Array.isArray(value)) {
                            if (Array.isArray(secondMapValue)) {
                                if (key === secondMapKey) {
                                    diffMapCurrentFractal.set(index + '-green', []);
                                    if (value.length > 0) {
                                        _walkAndDiff(value, currentPath.concat([index]));
                                    }
                                } else {
                                    diffMapCurrentFractal.set(index + '-red', null);
                                }
                            } else {
                                diffMapCurrentFractal.set(index + '-red', null);
                            }
                        } else {
                            if (value === secondMapValue) {
                                if (key === secondMapKey) {
                                    diffMapCurrentFractal.set(index + '-green', 'green');
                                } else {
                                    diffMapCurrentFractal.set(index + '-red', null);
                                }
                            } else {
                                diffMapCurrentFractal.set(index + '-red', null);
                            }
                        }
                    }
                    index++;
                }
                if (Array.from(map.keys()).length < Array.from(secondMapCurrentFractal.keys()).length) {
                    let secondMapIndex = 0;
                    for (let [key, value] of secondMapCurrentFractal) {
                        if (secondMapIndex <= index - 1) {
                            secondMapIndex++;
                            continue;
                        }
                        if (
                            typeof value === 'object'
                            && value !== null
                            && !Array.isArray(value)
                            && value instanceof Map
                            && value.constructor === Map
                        ) {
                            if (
                                Array.from(map.keys()).indexOf(key) !== -1
                                && (
                                    typeof map.get(key) === 'object'
                                    && map.get(key) !== null
                                    && !Array.isArray(map.get(key))
                                    && map.get(key) instanceof Map
                                    && map.get(key).constructor === Map
                                )
                            ) {
                                diffMapCurrentFractal.set(index + '-yellow', null);
                            } else {
                                diffMapCurrentFractal.set(index + '-red', null);
                            }
                        } else if (Array.isArray(value)) {
                            if (
                                Array.from(map.keys()).indexOf(key) !== -1
                                && Array.isArray(map.get(key))
                            ) {
                                diffMapCurrentFractal.set(index + '-yellow', null);
                            } else {
                                diffMapCurrentFractal.set(index + '-red', null);
                            }
                        } else {
                            if (
                                Array.from(map.keys()).indexOf(key) !== -1
                                && value === map.get(key)
                            ) {
                                diffMapCurrentFractal.set(index + '-yellow', null);
                            } else {
                                diffMapCurrentFractal.set(index + '-red', null);
                            }
                        }
                        secondMapIndex++;
                    }
                }
            } else {
                let secondMapValue = null,
                    secondMapCurrentFractal = secondMap;
                for (let z = 0, x = currentPath.length; z < x; z++) {
                    if (
                        typeof secondMapCurrentFractal === 'object'
                        && secondMapCurrentFractal !== null
                        && !Array.isArray(secondMapCurrentFractal)
                        && secondMapCurrentFractal instanceof Map
                        && secondMapCurrentFractal.constructor === Map
                        && Array.from(secondMapCurrentFractal.keys()).length
                    ) {
                        secondMapCurrentFractal =
                            secondMapCurrentFractal.get(Array.from(secondMapCurrentFractal.keys())[currentPath[z]]);
                    } else {
                        secondMapCurrentFractal = secondMapCurrentFractal[currentPath[z]];
                    }
                }
                let diffMapCurrentFractal = diffMap;
                for (let i = 0, c = currentPath.length; i < c; i++) {
                    if (
                        typeof diffMapCurrentFractal === 'object'
                        && diffMapCurrentFractal !== null
                        && !Array.isArray(diffMapCurrentFractal)
                        && diffMapCurrentFractal instanceof Map
                        && diffMapCurrentFractal.constructor === Map
                        && Array.from(diffMapCurrentFractal.keys()).length
                    ) {
                        diffMapCurrentFractal =
                            diffMapCurrentFractal.get(Array.from(diffMapCurrentFractal.keys())[currentPath[i]]);
                    } else {
                        diffMapCurrentFractal = diffMapCurrentFractal[currentPath[i]];
                    }
                }
                for (let i = 0, c = map.length; i < c; i++) {
                    if (i > secondMapCurrentFractal.length - 1) {
                        diffMapCurrentFractal[i] = 'red';
                    } else {
                        secondMapValue = secondMapCurrentFractal[i];
                        if (
                            typeof map[i] === 'object'
                            && map[i] !== null
                            && !Array.isArray(map[i])
                            && map[i] instanceof Map
                            && map[i].constructor === Map
                        ) {
                            if (
                                typeof secondMapValue === 'object'
                                && secondMapValue !== null
                                && !Array.isArray(secondMapValue)
                                && secondMapValue instanceof Map
                                && secondMapValue.constructor === Map
                            ) {
                                diffMapCurrentFractal[i] = new Map();
                                if (Array.from(map[i].keys()).length > 0) {
                                    _walkAndDiff(map[i], currentPath.concat([i]));
                                }
                            } else {
                                diffMapCurrentFractal[i] = 'red';
                            }
                        } else if (Array.isArray(map[i])) {
                            if (Array.isArray(secondMapValue)) {
                                diffMapCurrentFractal[i] = [];
                                if (map[i].length > 0) {
                                    _walkAndDiff(map[i], currentPath.concat([i]));
                                }
                            } else {
                                diffMapCurrentFractal[i] = 'red';
                            }
                        } else {
                            if (map[i] === secondMapValue) {
                                diffMapCurrentFractal[i] = 'green';
                            } else {
                                diffMapCurrentFractal[i] = 'red';
                            }
                        }
                    }
                }
                if (map.length < secondMapCurrentFractal.length) {
                    for (let i = 0, c = secondMapCurrentFractal.length; i < c; i++) {
                        if (i <= map.length - 1) {
                            continue;
                        }
                        diffMapCurrentFractal[i] = 'red';
                    }
                }
            }
        }
    }

    /**
     * @param {Map<string, damonValue>} firstMap
     * @param {Map<string, damonValue>} secondMap
     * @returns {Map<string, damonValue>} outputMap
     */
    sortMap(firstMap, secondMap) {
        let $ = this,
            firstMapKeys = Array.from(firstMap.keys()),
            secondMapKeys = Array.from(secondMap.keys()),
            outputMap = new Map();
        for (let i = 0, c = firstMapKeys.length; i < c; i++) {
            if (secondMap.get(firstMapKeys[i]) !== undefined) {
                outputMap.set(firstMapKeys[i], secondMap.get(firstMapKeys[i]));
            }
        }
        for (let i = 0, c = secondMapKeys.length; i < c; i++) {
            if (firstMapKeys.indexOf(secondMapKeys[i]) == -1) {
                outputMap.set(secondMapKeys[i], secondMap.get(secondMapKeys[i]));
            }
        }
        return outputMap;
    }

    /**
     * Produces a blocks diff
     * @param {damonValue} firstMap
     * @param {damonValue} secondMap
     * @returns {string} list
     */
    renderDiff(firstMap, secondMap, safeHTML = false) {
        let $ = this,
            diff = document.createElement('div'),
            legend = document.createElement('div'),
            list = document.createElement('ul'),
            diffMap = $._mapsDiff(firstMap, secondMap);
        diff.className = 'DAMON-Diff';
        legend.className = 'DAMON-Diff-legend';
        list.className = 'DAMON-List';
        legend.innerHTML =
            '<span id="damonDiffRed"><span>Red</span>: Difference</span>; '
            + '<span id="damonDiffBlue"><span>Blue</span>: Addition</span>; '
            + '<span id="damonDiffGreen"><span>Green</span>: Displacement</span>';
        recurseDiffMap(diffMap, list);
        diff.appendChild(legend);
        diff.appendChild(list);
        return diff;
        /**
         * @param {damonValue} diffMap
         * @param {HTMLElement} list
         * @param {Array<string>} [path=[]]
         * @param {string} [color=undefined]
         */
        function recurseDiffMap(diffMap, list, path = [], color = 'green') {
            if (color === 'green') {
                if (
                    typeof list !== 'object'
                    || list == null
                    || Array.isArray(list)
                ) {
                    throw new Error("Error List Item " + path.concat('-') + ": @param { {} } list");
                }
                if (
                    typeof diffMap === 'object'
                    && diffMap !== null
                    && !Array.isArray(diffMap)
                    && diffMap instanceof Map
                    && diffMap.constructor === Map
                ) {
                    if (list.tagName == "UL") {
                        let firstMapKey = "",
                            firstMapValue = null,
                            firstMapCurrentFractal = firstMap;
                        for (let i = 0, c = path.length; i < c; i++) {
                            if (
                                typeof firstMapCurrentFractal === 'object'
                                && firstMapCurrentFractal !== null
                                && !Array.isArray(firstMapCurrentFractal)
                                && firstMapCurrentFractal instanceof Map
                                && firstMapCurrentFractal.constructor === Map
                            ) {
                                firstMapCurrentFractal =
                                    firstMapCurrentFractal.get(Array.from(firstMapCurrentFractal.keys())[path[i]]);
                            } else {
                                firstMapCurrentFractal = firstMapCurrentFractal[path[i]];
                            }
                        }
                        let secondMapKey = "",
                            secondMapValue = null,
                            secondMapCurrentFractal = secondMap;
                        for (let i = 0, c = path.length; i < c; i++) {
                            if (
                                typeof secondMapCurrentFractal === 'object'
                                && secondMapCurrentFractal !== null
                                && !Array.isArray(secondMapCurrentFractal)
                                && secondMapCurrentFractal instanceof Map
                                && secondMapCurrentFractal.constructor === Map
                            ) {
                                secondMapCurrentFractal =
                                    secondMapCurrentFractal.get(Array.from(secondMapCurrentFractal.keys())[path[i]]);
                            } else {
                                secondMapCurrentFractal = secondMapCurrentFractal[path[i]];
                            }
                        }
                        let index = 0;
                        for (let [key, value] of diffMap) {
                            let diffMapKeyColor = Array.from(diffMap.keys())[index].split('-')[1],
                                diffMapValue = diffMap.get(Array.from(diffMap.keys())[index]);
                            let newList = document.createElement('ul'),
                                newDiv = document.createElement('code'),
                                keySpan = document.createElement('span'),
                                newListItem = document.createElement('li');
                            keySpan.className = "type-key";
                            // Setting color
                            newListItem.className = diffMapKeyColor + '-diff';
                            if (
                                newListItem.className === 'red-diff'
                                && index <= Array.from(firstMapCurrentFractal.keys()).length - 1
                            ) {
                                if (index > Array.from(secondMapCurrentFractal.keys()).length -  1) {
                                    key = '';
                                    value = '';
                                } else {
                                    if (index > Array.from(firstMapCurrentFractal.keys()).length -  1) {
                                        newListItem.className = 'blue-diff';
                                        newListItem.setAttribute('aria-describedby', 'damonDiffBlue');
                                    }
                                    secondMapKey = Array.from(secondMapCurrentFractal.keys())[index];
                                    secondMapValue = secondMapCurrentFractal.get(secondMapKey);
                                    key = secondMapKey;
                                    value = secondMapValue;
                                }
                            } else {
                                if (newListItem.className === 'green-diff') {
                                    newListItem.dataset.graphArbo = index;
                                    if (path.length > 0)
                                        newListItem.dataset.graphArbo = path.join('-') + '-' + index;
                                    newListItem.className = '';
                                    firstMapKey = Array.from(secondMapCurrentFractal.keys())[index];
                                    firstMapValue = secondMapCurrentFractal.get(firstMapKey);
                                    key = firstMapKey;
                                    value = firstMapValue;
                                } else if (newListItem.className === 'yellow-diff') {
                                    if (index > Array.from(firstMapCurrentFractal.keys()).length -  1) {
                                        newListItem.className = 'green-diff';
                                        newListItem.setAttribute('aria-describedby', 'damonDiffGreen');
                                        firstMapKey = Array.from(secondMapCurrentFractal.keys())[index];
                                        firstMapValue = secondMapCurrentFractal.get(firstMapKey);
                                        key = firstMapKey;
                                        value = firstMapValue;
                                    } else {
                                        key = '';
                                        value = '';
                                        newListItem.className = 'red-diff';
                                        newListItem.setAttribute('aria-describedby', 'damonDiffRed');
                                    }
                                } else {
                                    newListItem.className = 'blue-diff';
                                    newListItem.setAttribute('aria-describedby', 'damonDiffBlue');
                                    firstMapKey = Array.from(secondMapCurrentFractal.keys())[index];
                                    firstMapValue = secondMapCurrentFractal.get(firstMapKey);
                                    key = firstMapKey;
                                    value = firstMapValue;
                                }
                            }
                            if (newListItem.className === 'red-diff')
                                newListItem.setAttribute('aria-describedby', 'damonDiffRed');
                            if (
                                $.websiteRegex.test(key)
                                || $.pathRegex.test(key)
                            ) {
                                let fullUrl = key;
                                if (
                                    !$.httpRegex.test(key)
                                    && $.websiteRegex.test(key)
                                )
                                    fullUrl = ('https://' + key);
                                let keyLink = DOMPurify.sanitize(`<a href="${ fullUrl }"><span>${ fullUrl }</span></a>`);
                                keySpan.innerHTML = keyLink;
                            } else {
                                keySpan.textContent = key;
                            }
                            if (
                                typeof value === 'object'
                                && value !== null
                            ) {
                                if (Array.isArray(value)) {
                                    if (
                                        firstMap.damonInlineArrays !== undefined
                                        && firstMap.damonInlineArrays.indexOf(key) > -1
                                    ) {
                                        newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>[';
                                        for (let j = 0, k = value.length; j < k; j++) {
                                            let childValueSpan = document.createElement('span'),
                                                childValue = value[j];
                                            if (childValue === true) {
                                                childValueSpan.textContent = "true";
                                                childValueSpan.className = "type-boolean";
                                            } else if (childValue === false) {
                                                childValueSpan.textContent = "false";
                                                childValueSpan.className = "type-boolean";
                                            } else if (childValue === null) {
                                                childValueSpan.textContent = "null";
                                                childValueSpan.className = "type-null";
                                            } else if (
                                                Number.isFinite(childValue)
                                                && !Number.isNaN(childValue)
                                            ) {
                                                childValueSpan.textContent = childValue + "";
                                                childValueSpan.className = "type-number";
                                            } else {
                                                if (safeHTML) {
                                                    if (
                                                        $.websiteRegex.test(childValue)
                                                        || $.pathRegex.test(childValue)
                                                    ) {
                                                        let fullUrl = childValue;
                                                        if (
                                                            !$.httpRegex.test(childValue)
                                                            && $.websiteRegex.test(childValue)
                                                        )
                                                            fullUrl = 'https://' + childValue;
                                                        childValueSpan.innerHTML =
                                                            DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                                    } else {
                                                        childValueSpan.innerHTML = `"${childValue}"`;
                                                    }
                                                } else {
                                                    if (
                                                        $.websiteRegex.test(childValue)
                                                        || $.pathRegex.test(childValue)
                                                    ) {
                                                        let fullUrl = childValue;
                                                        if (
                                                            !$.httpRegex.test(childValue)
                                                            && $.websiteRegex.test(childValue)
                                                        )
                                                            fullUrl = 'https://' + childValue;
                                                        childValueSpan.innerHTML =
                                                            DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                                    } else {
                                                        childValueSpan.textContent = `"${childValue}"`;
                                                    }
                                                }
                                                childValueSpan.className = "type-string";
                                            }
                                            if (j !== 0) {
                                                newDiv.innerHTML += ', ';
                                            }
                                            newDiv.appendChild(childValueSpan);
                                        }
                                        newDiv.innerHTML += ']';
                                        newListItem.appendChild(newDiv);
                                        newListItem.appendChild(newList);
                                        list.appendChild(newListItem);
                                    } else {
                                        newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>[]';
                                        newListItem.appendChild(newDiv);
                                        newListItem.appendChild(newList);
                                        list.appendChild(newListItem);
                                        if (diffMapKeyColor == 'green') {
                                            recurseDiffMap(diffMapValue, newList, path.concat([index]), diffMapKeyColor);
                                        } else {
                                            recurseDiffMap(diffMapValue, newList, path.concat([index]), diffMapKeyColor);
                                        }
                                    }
                                } else {
                                    if (
                                        firstMap.implicitMaps !== undefined
                                        && firstMap.implicitMaps.indexOf(key) > -1
                                    ) {
                                        newDiv.innerHTML = keySpan.outerHTML;
                                    } else {
                                        newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>{}';
                                    }
                                    newListItem.appendChild(newDiv);
                                    newListItem.appendChild(newList);
                                    list.appendChild(newListItem);
                                    if (diffMapKeyColor == 'green') {
                                        recurseDiffMap(diffMapValue, newList, path.concat([index]), diffMapKeyColor);
                                    } else {
                                        recurseDiffMap(diffMapValue, newList, path.concat([index]), diffMapKeyColor);
                                    }
                                }
                            } else {
                                newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>';
                                let valueSpan = document.createElement('span');
                                let childText = value;
                                if (childText === true) {
                                    valueSpan.textContent = "true";
                                    valueSpan.className = "type-boolean";
                                } else if (childText === false) {
                                    valueSpan.textContent = "false";
                                    valueSpan.className = "type-boolean";
                                } else if (childText === null) {
                                    valueSpan.textContent = "null";
                                    valueSpan.className = "type-null";
                                } else if (
                                    Number.isFinite(childText)
                                    && !Number.isNaN(childText)
                                ) {
                                    valueSpan.textContent = childText + "";
                                    valueSpan.className = "type-number";
                                } else {
                                    if (safeHTML) {
                                        if (
                                            $.websiteRegex.test(childText)
                                            || $.pathRegex.test(childText)
                                        ) {
                                            let fullUrl = childText;
                                            if (
                                                !$.httpRegex.test(childText)
                                                && $.websiteRegex.test(childText)
                                            )
                                                fullUrl = 'https://' + childText;
                                            valueSpan.innerHTML =
                                                DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                        } else {
                                            valueSpan.innerHTML = `"${childText}"`;
                                        }
                                    } else {
                                        if (
                                            $.websiteRegex.test(childText)
                                            || $.pathRegex.test(childText)
                                        ) {
                                            let fullUrl = childText;
                                            if (
                                                !$.httpRegex.test(childText)
                                                && $.websiteRegex.test(childText)
                                            )
                                                fullUrl = 'https://' + childText;
                                            valueSpan.innerHTML =
                                                DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                        } else {
                                            valueSpan.textContent = `"${childText}"`;
                                        }
                                    }
                                    valueSpan.className = "type-string";
                                }
                                if (
                                    firstMap.implicitNulls === undefined
                                    || firstMap.implicitNulls.indexOf(key) == -1
                                ) {
                                    newDiv.appendChild(valueSpan);
                                } else {
                                    newDiv.innerHTML = newDiv.innerHTML.slice(0, -2);
                                }
                                newListItem.appendChild(newDiv);
                                list.appendChild(newListItem);
                            }
                            index++;
                        }
                    }
                } else if (Array.isArray(diffMap)) {
                    let firstMapCurrentFractal = firstMap;
                    for (let z = 0, x = path.length; z < x; z++) {
                        if (
                            typeof firstMapCurrentFractal === 'object'
                            && firstMapCurrentFractal !== null
                            && !Array.isArray(firstMapCurrentFractal)
                            && firstMapCurrentFractal instanceof Map
                            && firstMapCurrentFractal.constructor === Map
                            && Array.from(firstMapCurrentFractal.keys()).length
                        ) {
                            firstMapCurrentFractal =
                                firstMapCurrentFractal.get(Array.from(firstMapCurrentFractal.keys())[path[z]]);
                        } else {
                            firstMapCurrentFractal = firstMapCurrentFractal[path[z]];
                        }
                    }
                    let secondMapCurrentFractal = secondMap;
                    for (let z = 0, x = path.length; z < x; z++) {
                        if (
                            typeof secondMapCurrentFractal === 'object'
                            && secondMapCurrentFractal !== null
                            && !Array.isArray(secondMapCurrentFractal)
                            && secondMapCurrentFractal instanceof Map
                            && secondMapCurrentFractal.constructor === Map
                            && Array.from(secondMapCurrentFractal.keys()).length
                        ) {
                            secondMapCurrentFractal =
                                secondMapCurrentFractal.get(Array.from(secondMapCurrentFractal.keys())[path[z]]);
                        } else {
                            secondMapCurrentFractal = secondMapCurrentFractal[path[z]];
                        }
                    }
                    for (var i = 0, c = diffMap.length; i < c; i++) {
                        let newList = document.createElement('ul'),
                            newDiv = document.createElement('code'),
                            newListItem = document.createElement('li'),
                            itemColor = 'green',
                            value;
                        newListItem.className = 'green-diff';
                        if (typeof diffMap[i] === 'string') {
                            itemColor = diffMap[i];
                            // Setting color
                            newListItem.className = diffMap[i] + '-diff';
                        }
                        if (
                            newListItem.className === 'red-diff'
                            && i <= firstMapCurrentFractal.length - 1
                        ) {
                            if (i > secondMapCurrentFractal.length - 1) {
                                value = '';
                            } else {
                                if (i > firstMapCurrentFractal.length -  1) {
                                    if (newListItem.className == 'red-diff') {
                                        newListItem.className = 'blue-diff';
                                        newListItem.setAttribute('aria-describedby', 'damonDiffBlue');
                                    } else {
                                        newListItem.className = 'green-diff';
                                        newListItem.setAttribute('aria-describedby', 'damonDiffGreen');
                                    }
                                }
                                value = secondMapCurrentFractal[i];
                            }
                        } else {
                            if (newListItem.className === 'green-diff') {
                                newListItem.dataset.graphArbo = i;
                                if (path.length > 0)
                                    newListItem.dataset.graphArbo = path.join('-') + '-' + i;
                                newListItem.className = '';
                            } else {
                                newListItem.className = 'blue-diff';
                                newListItem.setAttribute('aria-describedby', 'damonDiffBlue');
                            }
                            value = firstMapCurrentFractal[i];
                        }
                        if (newListItem.className === 'red-diff')
                            newListItem.setAttribute('aria-describedby', 'damonDiffRed');
                        if (
                            typeof value === 'object'
                            && value !== null
                        ) {
                            if (Array.isArray(value)) {
                                if (
                                    firstMap.damonInlineArrays !== undefined
                                    && firstMap.damonInlineArrays.indexOf(i) > -1
                                ) {
                                    newDiv.innerHTML += '[';
                                    for (let j = 0, k = value.length; j < k; j++) {
                                        let arrayValueSpan = document.createElement('span'),
                                            arrayValue = value[j];
                                        if (arrayValue === true) {
                                            arrayValueSpan.textContent = "true";
                                            arrayValueSpan.className = "type-boolean";
                                        } else if (arrayValue === false) {
                                            arrayValueSpan.textContent = "false";
                                            arrayValueSpan.className = "type-boolean";
                                        } else if (arrayValue === null) {
                                            arrayValueSpan.textContent = "null";
                                            arrayValueSpan.className = "type-null";
                                        } else if (
                                            Number.isFinite(arrayValue)
                                            && !Number.isNaN(arrayValue)
                                        ) {
                                            arrayValueSpan.textContent = arrayValue + "";
                                            arrayValueSpan.className = "type-number";
                                        } else {
                                            if (safeHTML) {
                                                if (
                                                    $.websiteRegex.test(arrayValue)
                                                    || $.pathRegex.test(arrayValue)
                                                ) {
                                                    let fullUrl = arrayValue;
                                                    if (
                                                        !$.httpRegex.test(arrayValue)
                                                        && $.websiteRegex.test(arrayValue)
                                                    )
                                                        fullUrl = ('https://' + arrayValue);
                                                    arrayValueSpan.innerHTML =
                                                        DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                                } else {
                                                    arrayValueSpan.innerHTML = `"${arrayValue}"`;
                                                }
                                            } else {
                                                if (
                                                    $.websiteRegex.test(arrayValue)
                                                    || $.pathRegex.test(arrayValue)
                                                ) {
                                                    let fullUrl = arrayValue;
                                                    if (
                                                        !$.httpRegex.test(arrayValue)
                                                        && $.websiteRegex.test(arrayValue)
                                                    )
                                                        fullUrl = ('https://' + arrayValue);
                                                    arrayValueSpan.innerHTML =
                                                        DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                                } else {
                                                    arrayValueSpan.textContent = `"${arrayValue}"`;
                                                }
                                            }
                                            arrayValueSpan.className = "type-string";
                                        }
                                        if (j !== 0) {
                                            newDiv.innerHTML += ', ';
                                        }
                                    }
                                    newDiv.innerHTML += ']';
                                    newListItem.appendChild(newDiv);
                                    newListItem.appendChild(newList);
                                    list.appendChild(newListItem);
                                } else {
                                    newDiv.textContent = "[]";
                                    newListItem.appendChild(newDiv);
                                    newListItem.appendChild(newList);
                                    list.appendChild(newListItem);
                                    recurseDiffMap(diffMap[i], newList, path.concat([i]), itemColor);
                                }
                            } else {
                                newDiv.textContent = "{}";
                                newListItem.appendChild(newDiv);
                                newListItem.appendChild(newList);
                                list.appendChild(newListItem);
                                recurseDiffMap(diffMap[i], newList, path.concat([i]), itemColor);
                            }
                        } else {
                            let childText = value;
                            if (childText === true) {
                                newDiv.textContent = "true";
                                newDiv.className = "type-boolean";
                            } else if (childText === false) {
                                newDiv.textContent = "false";
                                newDiv.className = "type-boolean";
                            } else if (childText === null) {
                                newDiv.textContent = "null";
                                newDiv.className = "type-null";
                            } else if (
                                Number.isFinite(childText)
                                && !Number.isNaN(childText)
                            ) {
                                newDiv.textContent = childText + "";
                                newDiv.className = "type-number";
                            } else {
                                if (safeHTML) {
                                    if (
                                        $.websiteRegex.test(childText)
                                        || $.pathRegex.test(childText)
                                    ) {
                                        let fullUrl = childText;
                                        if (
                                            !$.httpRegex.test(childText)
                                            && $.websiteRegex.test(childText)
                                        )
                                            fullUrl = 'https://' + childText;
                                        newDiv.innerHTML =
                                            DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                    } else {
                                        newDiv.innerHTML = `"${childText}"`;
                                    }
                                } else {
                                    if (
                                        $.websiteRegex.test(childText)
                                        || $.pathRegex.test(childText)
                                    ) {
                                        let fullUrl = childText;
                                        if (
                                            !$.httpRegex.test(childText)
                                            && $.websiteRegex.test(childText)
                                        )
                                            fullUrl = 'https://' + childText;
                                        newDiv.innerHTML =
                                            DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                    } else {
                                        newDiv.textContent = `"${childText}"`;
                                    }
                                }
                                newDiv.className = "type-string";
                            }
                            newListItem.appendChild(newDiv);
                            newListItem.appendChild(newList);
                            list.appendChild(newListItem);
                        }
                    }
                }
            } else if (['red', 'yellow'].indexOf(color) > -1) {
                let secondMapCurrentFractal = secondMap;
                for (let i = 0, c = path.length; i < c; i++) {
                    if (
                        typeof secondMapCurrentFractal === 'object'
                        && secondMapCurrentFractal !== null
                        && !Array.isArray(secondMapCurrentFractal)
                        && secondMapCurrentFractal instanceof Map
                        && secondMapCurrentFractal.constructor === Map
                    ) {
                        secondMapCurrentFractal =
                            secondMapCurrentFractal.get(Array.from(secondMapCurrentFractal.keys())[path[i]]);
                    } else {
                        secondMapCurrentFractal = secondMapCurrentFractal[path[i]];
                    }
                }
                recurseSecondMap(secondMapCurrentFractal, list, path, color);
            }
        }
        function recurseSecondMap(secondMap, list, path, color) {
            if (
                typeof list !== 'object'
                || list == null
                || Array.isArray(list)
            ) {
                throw new Error("Error List Item " + path.concat('-') + ": @param { {} } list");
            }
            if (
                typeof secondMap === 'object'
                && secondMap !== null
                && !Array.isArray(secondMap)
                && secondMap instanceof Map
                && secondMap.constructor === Map
            ) {
                if (list.tagName == "UL") {
                    let index = 0;
                    for (const [key, value] of secondMap) {
                        let newList = document.createElement('ul'),
                            newDiv = document.createElement('code'),
                            keySpan = document.createElement('span'),
                            newListItem = document.createElement('li');
                        keySpan.className = "type-key";
                        // Setting color
                        newListItem.className = 'red-diff';
                        newListItem.setAttribute('aria-describedby', 'damonDiffRed');
                        if (
                            $.websiteRegex.test(key)
                            || $.pathRegex.test(key)
                        ) {
                            let fullUrl = key;
                            if (
                                !$.httpRegex.test(key)
                                && $.websiteRegex.test(key)
                            )
                                fullUrl = ('https://' + key);
                            let keyLink = DOMPurify.sanitize(`<a href="${ fullUrl }">${ fullUrl }</a>`);
                            keySpan.innerHTML = keyLink;
                        } else {
                            keySpan.textContent = key;
                        }
                        if (
                            typeof value === 'object'
                            && value !== null
                        ) {
                            if (Array.isArray(value)) {
                                if (
                                    secondMap.damonInlineArrays !== undefined
                                    && secondMap.damonInlineArrays.indexOf(key) > -1
                                ) {
                                    newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>[';
                                    for (let j = 0, k = value.length; j < k; j++) {
                                        let childValueSpan = document.createElement('span'),
                                            childValue = value[j];
                                        if (childValue === true) {
                                            childValueSpan.textContent = "true";
                                            childValueSpan.className = "type-boolean";
                                        } else if (childValue === false) {
                                            childValueSpan.textContent = "false";
                                            childValueSpan.className = "type-boolean";
                                        } else if (childValue === null) {
                                            childValueSpan.textContent = "null";
                                            childValueSpan.className = "type-null";
                                        } else if (
                                            Number.isFinite(childValue)
                                            && !Number.isNaN(childValue)
                                        ) {
                                            childValueSpan.textContent = childValue + "";
                                            childValueSpan.className = "type-number";
                                        } else {
                                            if (safeHTML) {
                                                if (
                                                    $.websiteRegex.test(childValue)
                                                    || $.pathRegex.test(childValue)
                                                ) {
                                                    let fullUrl = childValue;
                                                    if (
                                                        !$.httpRegex.test(childValue)
                                                        && $.websiteRegex.test(childValue)
                                                    )
                                                        fullUrl = 'https://' + childValue;
                                                    childValueSpan.innerHTML =
                                                        DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                                } else {
                                                    childValueSpan.innerHTML = `"${childValue}"`;
                                                }
                                            } else {
                                                if (
                                                    $.websiteRegex.test(childValue)
                                                    || $.pathRegex.test(childValue)
                                                ) {
                                                    let fullUrl = childValue;
                                                    if (
                                                        !$.httpRegex.test(childValue)
                                                        && $.websiteRegex.test(childValue)
                                                    )
                                                        fullUrl = 'https://' + childValue;
                                                    childValueSpan.innerHTML =
                                                        DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                                } else {
                                                    childValueSpan.textContent = `"${childValue}"`;
                                                }
                                            }
                                            childValueSpan.className = "type-string";
                                        }
                                        if (j !== 0) {
                                            newDiv.innerHTML += ', ';
                                        }
                                        newDiv.appendChild(childValueSpan);
                                    }
                                    newDiv.innerHTML += ']';
                                    newListItem.appendChild(newDiv);
                                    newListItem.appendChild(newList);
                                    list.appendChild(newListItem);
                                } else {
                                    newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>[]';
                                    newListItem.appendChild(newDiv);
                                    newListItem.appendChild(newList);
                                    list.appendChild(newListItem);
                                    recurseSecondMap(value, newList, path.concat([index]), color);
                                }
                            } else {
                                if (
                                    secondMap.implicitMaps !== undefined
                                    && secondMap.implicitMaps.indexOf(key) > -1
                                ) {
                                    newDiv.innerHTML = keySpan.outerHTML;
                                } else {
                                    newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>{}';
                                }
                                newListItem.appendChild(newDiv);
                                newListItem.appendChild(newList);
                                list.appendChild(newListItem);
                                recurseSecondMap(value, newList, path.concat([index]), color);
                            }
                        } else {
                            newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>';
                            let valueSpan = document.createElement('span');
                            let childText = value;
                            if (childText === true) {
                                valueSpan.textContent = "true";
                                valueSpan.className = "type-boolean";
                            } else if (childText === false) {
                                valueSpan.textContent = "false";
                                valueSpan.className = "type-boolean";
                            } else if (childText === null) {
                                valueSpan.textContent = "null";
                                valueSpan.className = "type-null";
                            } else if (
                                Number.isFinite(childText)
                                && !Number.isNaN(childText)
                            ) {
                                valueSpan.textContent = childText + "";
                                valueSpan.className = "type-number";
                            } else {
                                if (safeHTML) {
                                    if (
                                        $.websiteRegex.test(childText)
                                        || $.pathRegex.test(childText)
                                    ) {
                                        let fullUrl = childText;
                                        if (
                                            !$.httpRegex.test(childText)
                                            && $.websiteRegex.test(childText)
                                        )
                                            fullUrl = 'https://' + childText;
                                        valueSpan.innerHTML =
                                            DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                    } else {
                                        valueSpan.innerHTML = `"${childText}"`;
                                    }
                                } else {
                                    if (
                                        $.websiteRegex.test(childText)
                                        || $.pathRegex.test(childText)
                                    ) {
                                        let fullUrl = childText;
                                        if (
                                            !$.httpRegex.test(childText)
                                            && $.websiteRegex.test(childText)
                                        )
                                            fullUrl = 'https://' + childText;
                                        valueSpan.innerHTML =
                                            DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                    } else {
                                        valueSpan.textContent = `"${childText}"`;
                                    }
                                }
                                valueSpan.className = "type-string";
                            }
                            if (
                                secondMap.implicitNulls === undefined
                                || secondMap.implicitNulls.indexOf(key) == -1
                            ) {
                                newDiv.appendChild(valueSpan);
                            } else {
                                newDiv.innerHTML = newDiv.innerHTML.slice(0, -2);
                            }
                            newListItem.appendChild(newDiv);
                            list.appendChild(newListItem);
                        }
                        index++;
                    }
                }
            } else if (Array.isArray(secondMap)) {
                for (var i = 0, c = secondMap.length; i < c; i++) {
                    let newList = document.createElement('ul'),
                        newDiv = document.createElement('code'),
                        newListItem = document.createElement('li');
                    // Setting color
                    newListItem.className = secondMap[i] + '-diff';
                    newListItem.setAttribute('aria-describedby', 'damonDiffRed');
                    if (
                        typeof secondMap[i] === 'object'
                        && secondMap[i] !== null
                    ) {
                        if (Array.isArray(secondMap[i])) {
                            if (
                                secondMap.damonInlineArrays !== undefined
                                && secondMap.damonInlineArrays.indexOf(i) > -1
                            ) {
                                newDiv.innerHTML += '[';
                                for (let j = 0, k = secondMap[i].length; j < k; j++) {
                                    let valueSpan = document.createElement('span'),
                                        value = secondMap[i][j];
                                    if (value === true) {
                                        valueSpan.textContent = "true";
                                        valueSpan.className = "type-boolean";
                                    } else if (value === false) {
                                        valueSpan.textContent = "false";
                                        valueSpan.className = "type-boolean";
                                    } else if (value === null) {
                                        valueSpan.textContent = "null";
                                        valueSpan.className = "type-null";
                                    } else if (
                                        Number.isFinite(value)
                                        && !Number.isNaN(value)
                                    ) {
                                        valueSpan.textContent = value + "";
                                        valueSpan.className = "type-number";
                                    } else {
                                        if (safeHTML) {
                                            if (
                                                $.websiteRegex.test(value)
                                                || $.pathRegex.test(value)
                                            ) {
                                                let fullUrl = value;
                                                if (
                                                    !$.httpRegex.test(value)
                                                    && $.websiteRegex.test(value)
                                                )
                                                    fullUrl = ('https://' + value);
                                                valueSpan.innerHTML =
                                                    DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                            } else {
                                                valueSpan.innerHTML = `"${value}"`;
                                            }
                                        } else {
                                            if (
                                                $.websiteRegex.test(value)
                                                || $.pathRegex.test(value)
                                            ) {
                                                let fullUrl = value;
                                                if (
                                                    !$.httpRegex.test(value)
                                                    && $.websiteRegex.test(value)
                                                )
                                                    fullUrl = ('https://' + value);
                                                valueSpan.innerHTML =
                                                    DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                            } else {
                                                valueSpan.textContent = `"${value}"`;
                                            }
                                        }
                                        valueSpan.className = "type-string";
                                    }
                                    if (j !== 0) {
                                        newDiv.innerHTML += ', ';
                                    }
                                    newDiv.appendChild(valueSpan);
                                }
                                newDiv.innerHTML += ']';
                                newListItem.appendChild(newDiv);
                                newListItem.appendChild(newList);
                                list.appendChild(newListItem);
                            } else {
                                newDiv.textContent = "[]";
                                newListItem.appendChild(newDiv);
                                newListItem.appendChild(newList);
                                list.appendChild(newListItem);
                                recurseSecondMap(secondMap[i], newList, path.concat([i]), color);
                            }
                        } else {
                            newDiv.textContent = "{}";
                            newListItem.appendChild(newDiv);
                            newListItem.appendChild(newList);
                            list.appendChild(newListItem);
                            recurseSecondMap(secondMap[i], newList, path.concat([i]), color);
                        }
                    } else {
                        let childText = secondMap[i];
                        if (childText === true) {
                            newDiv.textContent = "true";
                            newDiv.className = "type-boolean";
                        } else if (childText === false) {
                            newDiv.textContent = "false";
                            newDiv.className = "type-boolean";
                        } else if (childText === null) {
                            newDiv.textContent = "null";
                            newDiv.className = "type-null";
                        } else if (
                            Number.isFinite(childText)
                            && !Number.isNaN(childText)
                        ) {
                            newDiv.textContent = childText + "";
                            newDiv.className = "type-number";
                        } else {
                            if (safeHTML) {
                                if (
                                    $.websiteRegex.test(childText)
                                    || $.pathRegex.test(childText)
                                ) {
                                    let fullUrl = childText;
                                    if (
                                        !$.httpRegex.test(childText)
                                        && $.websiteRegex.test(childText)
                                    )
                                        fullUrl = 'https://' + childText;
                                    newDiv.innerHTML =
                                        DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                } else {
                                    newDiv.innerHTML = `"${childText}"`;
                                }
                            } else {
                                if (
                                    $.websiteRegex.test(childText)
                                    || $.pathRegex.test(childText)
                                ) {
                                    let fullUrl = childText;
                                    if (
                                        !$.httpRegex.test(childText)
                                        && $.websiteRegex.test(childText)
                                    )
                                        fullUrl = 'https://' + childText;
                                    newDiv.innerHTML =
                                        DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                } else {
                                    newDiv.textContent = `"${childText}"`;
                                }
                            }
                            newDiv.className = "type-string";
                        }
                        newListItem.appendChild(newDiv);
                        newListItem.appendChild(newList);
                        list.appendChild(newListItem);
                    }
                }
            }
        }
    }

    /**
     * @param {damonValue} map
     * @returns  {string}
     */
    damonTableMapToCSV(map) {
        const $ = this;
        let output = '',
            index = -1;
        for (const [key, value] of map) {
            index++;
            let valueKeys = Array.from(value.keys());
            if (index == 0) {
                let slicedSubMapKeys = Array.from(valueKeys).map($.sliceIjsonKey),
                    slicedSubMapKeysSet = new Set(slicedSubMapKeys);
                if (slicedSubMapKeys.length !== slicedSubMapKeysSet.size) {
                    throw new Error('Duplicate in headings.');
                }
            }
            for (let i = 0, c = valueKeys.length; i < c; i++) {
                let childKey = $.sliceIjsonKey(valueKeys[i]);
                output += Papa.unparse([[childKey]], {quotes: true});
                if (i != (c - 1)) {
                    output += ',';
                }
            }
            output += '\n';
        }
        return output.slice(0, -1);
    }

    /**
     * @param {damonValue} map
     * @returns {string}
     */
    damonTableMapToJSON(map, format = 'array-rows') {
        const $ = this;
        if (format == 'array-rows') {
            let output = '[\n',
                index = -1;
            for (const [key, value] of map) {
                index++;
                output += '    [';
                let valueKeys = Array.from(value.keys());
                for (let i = 0, c = valueKeys.length; i < c; i++) {
                    let childKey = $.sliceIjsonKey(valueKeys[i]);
                    output += JSON.stringify(childKey);
                    if (i != (c - 1)) {
                        output += ', ';
                    }
                }
                output += '],\n';
            }
            output = output.slice(0, -2) + '\n]';
            return output;
        } else {
            let output = '[\n',
                index = -1,
                headerMap = new Map();
            for (const [key, value] of map) {
                index++;
                if (index === 0) {
                    let slicedSubMapKeys = Array.from(value.keys()).map($.sliceIjsonKey),
                        slicedSubMapKeysSet = new Set(slicedSubMapKeys);
                    if (slicedSubMapKeys.length !== slicedSubMapKeysSet.size) {
                        throw new Error('Duplicate in headings.');
                    }
                    for (const [subKey, subValue] of value) {
                        headerMap.set($.sliceIjsonKey(subKey), null);
                    }
                } else {
                    let z = -1;
                    let subMapKeys = Array.from(value.keys());
                    // Fails to update headermap
                    for (const [headerKey, headerValue] of headerMap) {
                        z++;
                        if (subMapKeys[z]) {
                            headerMap.set(headerKey, $.sliceIjsonKey(subMapKeys[z]));
                        } else {
                            headerMap.set(headerKey, null);
                        }
                    }
                    output += $.damon.mapToJSON(headerMap).split('\n').map(x => '   ' + x).join('\n');
                    output += ',\n';
                }
            }
            output = output.slice(0, -2) + '\n]';
            return output;
        }
    }

    /**
     * @param {String} string
     * @returns {string}
     */
    csvToDamonTable(string) {
        const $ = this;
        let parseResult = Papa.parse(string);
        if (parseResult.meta.aborted)
            throw new Error('CSV parsing failed');
        return $.jsonToDamonTable(JSON.stringify(parseResult.data));
    }

    /**
     * @param {String} string
     * @returns {string}
     */
    jsonToDamonTable(string, format = 'array-rows') {
        const $ = this;
        let damonMap = new Map();
        if (format === 'array-rows') {
            let lines = JSON.parse(string);
            for (let i = 0, c = lines.length; i < c; i++) {
                let rowMap = new Map(),
                    indexedKey = i + "-" + (i + "");
                rowMap.implicitNulls = [];
                damonMap.set(indexedKey, rowMap);
                let lineValues = lines[i];
                for (let z = 0, x = lineValues.length; z < x; z++) {
                    damonMap.get(indexedKey).set(z + "-" + lineValues[z], null);
                    damonMap.get(indexedKey).implicitNulls.push(lineValues[z]);
                }
            }
        } else {
            let map = $.damon.jsonToMap(string);
            damonMap.set('0-0', new Map());
            let i = -1;
            for (const [key, value] of map[0]) {
                i++;
                damonMap.get('0-0').set(i + "-" + key, null);
            }
            for (let z = 0, x = map.length; z < x; z++) {
                let indexPrefixedKey = (z + 1) + '-' + (z + 1);
                damonMap.set(indexPrefixedKey, new Map());
                let index = -1;
                for (const [key, value] of map[z]) {
                    index++;
                    damonMap.get(indexPrefixedKey).set(index + "-" + value, null);
                }
            }
        }
        damonMap.headless = true;
        return $.damon.mapToDamon(damonMap, false, true);
    }

    /**
     * @param {HTMLCollection} listItems
     */
    wrapListContentsForStyling(listItems) {
        let $ = this;
        for (let i = 0, c = listItems.length; i < c; i++) {
            let div = document.createElement('div');
            for (let z = listItems[i].childNodes.length - 1; z >= 0; z--) {
                if (
                    (
                        listItems[i].childNodes[z].tagName
                        && (
                            listItems[i].childNodes[z].tagName !== 'UL'
                            && listItems[i].childNodes[z].tagName !== 'OL'
                        )
                    ) || (
                        listItems[i].childNodes[z].nodeType == 3
                        && listItems[i].childNodes[z].data != '\n'
                        && listItems[i].childNodes[z].data != '\r\n'
                    )
                ) {
                    if (div.childNodes.length == 0) {
                        div.appendChild(listItems[i].childNodes[z]);
                    } else {
                        div.insertBefore(listItems[i].childNodes[z], div.childNodes[0]);
                    }
                }
            }
            if (listItems[i].firstElementChild) {
                listItems[i].insertBefore(div, listItems[i].firstElementChild);
            } else {
                listItems[i].appendChild(div);
            }
        }
    }

    /**
     * Must occur after rendering
     * @param {NodeList} listItems
     * @param {string} damon
     */
    addLineNumbers(damon, container, startLine = 0) {
        let $ = this,
            listItems = container.querySelectorAll('li[data-graph-arbo]');
        for (let i = 0, c = listItems.length; i < c; i++) {
            let lineNumberDiv = document.createElement('div');
            lineNumberDiv.className = 'damon-line-number';
            let currentLevel = $.damon.damonToMap(damon),
                abstractPath = listItems[i].dataset.graphArbo.split('-'),
                concretePath = [];
            for (let z = 0, x = abstractPath.length; z < x; z++) {
                if (
                    typeof currentLevel === 'object'
                    && currentLevel !== null
                    && !Array.isArray(currentLevel)
                    && currentLevel instanceof Map
                    && currentLevel.constructor === Map
                ) {
                    concretePath.push(Array.from(currentLevel.keys())[abstractPath[z]]);
                    currentLevel = currentLevel.get(concretePath[z]);
                } else {
                    concretePath.push(parseInt(abstractPath[z]));
                    currentLevel = currentLevel[concretePath[z]];
                }
            }
            lineNumberDiv.textContent =
                $.damon.getRangeFromPath(
                    damon,
                    concretePath
                )[0][0] + 1 + startLine;
            lineNumberDiv.id = 'damonLine' + lineNumberDiv.textContent;
            listItems[i].setAttribute("aria-labelledBy", lineNumberDiv.id);
            lineNumberDiv.style.top =
                container.scrollTop
                + listItems[i].firstElementChild.getBoundingClientRect().top
                - container.getBoundingClientRect().top + 'px';
            container.appendChild(lineNumberDiv);
        }
    }

    /**
     * Must occur after rendering
     * @param {NodeList} listItems
     * @param {string} damon
     */
    addTableLineNumbers(damon, container, startLine = 0) {
        let $ = this,
            nodeList = container.querySelectorAll('th[data-graph-arbo]:first-child, td[data-graph-arbo]:first-child');
        for (let i = 0, c = nodeList.length; i < c; i++) {
            let lineNumberDiv = document.createElement('div');
            lineNumberDiv.className = 'damon-line-number';
            lineNumberDiv.textContent =
                $.damon.getRangeFromPath(
                    damon,
                    [Array.from($.damon.damonToMap(damon).keys())[i]]
                )[0][0] + 1 + startLine;
            lineNumberDiv.id = 'damonLine' + lineNumberDiv.textContent;
            nodeList[i].setAttribute("aria-labelledBy", lineNumberDiv.id);
            lineNumberDiv.style.top =
                container.scrollTop
                + nodeList[i].getBoundingClientRect().top
                - container.getBoundingClientRect().top + 'px';
            container.appendChild(lineNumberDiv);
        }
    }

    /**
     * @param {damonValue} map
     * @param {number} [startLine=0]
     * @returns {string}
     */
    damonGraphMapToMermaid(map, startLine = 0) {
        let $ = this;
        let mermaid = '';
        if (
            typeof map !== 'object'
            || map === null
            || Array.isArray(map)
            || !(map instanceof Map)
            || map.constructor !== Map
        ) {
            throw new Error("Error: input does not conform to Map type");
        }
        let mapIndex = 0;
        for (const [key, value] of map) {
            mapIndex++;
            if (value === null) {
                mermaid += key + '\r\n';
                continue;
            }
            if (
                typeof value !== 'object'
                || Array.isArray(value)
                || !(value instanceof Map)
                || value.constructor !== Map
            ) {
                throw new Error(
                    "Error line "
                    + $.damon.mapIndexToLine(map, mapIndex) + startLine + ": value does not conform to Map type"
                );
            }
            if (Array.from(value.keys()).length) {
                for (const [subKey, subValue] of value) {
                    mapIndex++;
                    if (typeof subValue !== "string") {
                        throw new Error(
                            "Error line "
                            + $.damon.mapIndexToLine(map, mapIndex) + startLine + ": value does not conform to String type"
                        );
                    }
                    let adjacents = subValue.split(",");
                    for (let i = 0, c = adjacents.length; i < c; i++) {
                        mermaid += key + ' ' + subKey + ' ' + adjacents[i] + '\r\n';
                    }
                }
            } else {
                mermaid += key + '\r\n';
            }
        }
        return mermaid.slice(0, -2);
    }

    /**
     * @param {damonValue} damonMap
     * @param {number | undefined} yStart
     * @param {number | undefined} yEnd
     * @param {number | undefined} xStart
     * @param {number | undefined} xEnd
     * @returns {HTMLElement}
     */
    damonDecisionMapToHtmlTable(damonMap, yStart, yEnd, xStart, xEnd) {
        let $ = this;
        return $.arrayDecisionTableToHtml($.damonDecisionMapToArrayTable(damonMap, yStart, yEnd, xStart, xEnd));
    }

    /**
     * @param {damonValue} damonMap
     * @param {number | undefined} yStart
     * @param {number | undefined} yEnd
     * @param {number | undefined} xStart
     * @param {number | undefined} xEnd
     * @returns {Array<Array<damonValue>>}
     */
    damonDecisionMapToArrayTable(damonMap, yStart, yEnd, xStart, xEnd) {
        let $ = this;
        let keysMap =
            Array.from(damonMap.keys())
                .map((x) => [$.sliceIjsonKey(x), x]),
            tableData = [],
            befores = [],
            booleans = [],
            afters = [],
            rows = [];
        if (keysMap.find((x) => x[0] == 'rows') !== undefined) {
            rows
                = JSON.parse(
                    $.damonTableMapToJSON(damonMap.get(keysMap.find((x) => x[0] == 'rows')[1]))
                );
        }
        if (keysMap.find((x) => x[0] == 'booleans') !== undefined) {
            booleans =
                Array.from(damonMap.get(keysMap.find((x) => x[0] == 'booleans')[1]).keys());
            let slicedBooleans = booleans.map($.sliceIjsonKey),
                slicedBooleansSet = new Set(slicedBooleans);
            if (slicedBooleans.length !== slicedBooleansSet.size) {
                throw new Error('Duplicate in booleans.');
            }
            tableData = $.generateTruthTable(booleans, yStart, yEnd, xStart, xEnd);
        }
        if (keysMap.find((x) => x[0] == 'befores') !== undefined) {
            let beforeKey = keysMap.find((x) => x[0] == 'befores')[1],
                beforeValue = damonMap.get(beforeKey);
            if (
                typeof beforeValue !== 'object'
                || beforeValue === null
                || Array.isArray(beforeValue)
                || !(beforeValue instanceof Map)
                || beforeValue.constructor !== Map
            ) {
                throw new Error('"befores" key requires a dictionary.');
            }
            befores = Array.from(beforeValue.keys());
            let slicedBefores = befores.map($.sliceIjsonKey),
                slicedBeforesSet = new Set(slicedBefores);
            if (slicedBefores.length !== slicedBeforesSet.size) {
                throw new Error('Duplicate in befores.');
            }
            let beforesKeysArray = [];
            for (let i = 0, c = befores.length; i < c; i++) {
                beforesKeysArray.push(rows.map((x) => x[i]));
            }
            let max = Math.max.apply(null, beforesKeysArray.map(x => x.length).concat([tableData.length]));
            for (let i = beforesKeysArray.length - 1, c = -1; i > c; i--) {
                for (let z = 0, x = max; z < x; z++) {
                    let overflow = false;
                    if (!tableData[z]) {
                        tableData[z] = [];
                        overflow = true;
                    }
                    if (z < beforesKeysArray[i].length) {
                        tableData[z].unshift(
                            beforesKeysArray[i][z]
                        );
                    } else {
                        tableData[z].unshift('');
                    }
                    if (overflow) {
                        for (let j = 0, k = booleans.length; j < k; j++) {
                            tableData[z].push('');
                        }
                    }
                }
            }
        }

        if (keysMap.find((x) => x[0] == 'afters') !== undefined) {
            let afterKey = keysMap.find((x) => x[0] == 'afters')[1],
                afterValue = damonMap.get(afterKey);
            if (
                typeof afterValue !== 'object'
                || afterValue === null
                || Array.isArray(afterValue)
                || !(afterValue instanceof Map)
                || afterValue.constructor !== Map
            ) {
                throw new Error('"afters" key requires a dictionary.');
            }
            afters = Array.from(afterValue.keys());
            let slicedAfters = afters.map($.sliceIjsonKey),
                slicedAftersSet = new Set(slicedAfters);
            if (slicedAfters.length !== slicedAftersSet.size) {
                throw new Error('Duplicate in afters.');
            }
            let aftersKeysArray = [];
            for (let i = 0, c = afters.length; i < c; i++) {
                aftersKeysArray.push(rows.map((x) => x[i + befores.length]));
            }
            let max = Math.max.apply(null, aftersKeysArray.map(x => x.length).concat([tableData.length]));
            for (let i = 0, c = aftersKeysArray.length; i < c; i++) {
                for (let z = 0, x = max; z < x; z++) {
                    if (!tableData[z]) {
                        tableData[z] = [];
                    }
                    let rowLength = befores.length + booleans.length;
                    if (tableData[z].length < rowLength) {
                        for (let j = 0, k = rowLength; j < k; j++) {
                            tableData[z].push('');
                        }
                    }
                    if (z < aftersKeysArray[i].length) {
                        tableData[z].push(
                            aftersKeysArray[i][z]
                        );
                    } else {
                        tableData[z].push('');
                    }
                }
            }
            if (keysMap.find((x) => x[0] == 'rules') !== undefined) {
                let ruleKey = keysMap.find((x) => x[0] == 'rules')[1],
                    ruleValue = damonMap.get(ruleKey);
                if (
                    typeof ruleValue !== 'object'
                    || ruleValue === null
                    || Array.isArray(ruleValue)
                    || !(ruleValue instanceof Map)
                    || ruleValue.constructor !== Map
                ) {
                    throw new Error('"rules" key requires a dictionary.');
                }
                function test(a, b) {
                    let r = new regex(a);
                    return r.test(b);
                }
                jsonLogic.add_operation('RegExp.test', test);
                jsonLogic.add_operation('Math', Math);
                let rules = Array.from(ruleValue.keys());
                let slicedRules = rules.map($.sliceIjsonKey),
                    slicedRulesSet = new Set(slicedRules);
                if (slicedRules.length !== slicedRulesSet.size) {
                    throw new Error('Duplicate in rules.');
                }
                for (let i = 0, c = rules.length; i < c; i++) {
                    let aftersIndex =
                        afters.findIndex(function (x) {
                            return (
                                $.sliceIjsonKey(x)
                                === $.sliceIjsonKey(rules[i])
                            )
                        });
                    if (aftersIndex == -1) {
                        throw new Error(
                            'Rule "'
                            + $.sliceIjsonKey(rules[i])
                            + '" matches no afters.'
                        );
                    }
                    let ruleValues = Array.from(ruleValue.get(rules[i]).keys());
                    for (let z = 0, x = tableData.length; z < x; z++) {
                        for (let j = 0, k = ruleValues.length; j < k; j++) {
                            try {
                                let jsonLogicRule =
                                    JSON.parse(
                                        $.indexPrefixedMapToJsonLogic(ruleValue.get(rules[i]).get(ruleValues[j]))
                                    );
                                let rowObject = {};
                                let beforesAndBooleans = befores.concat(booleans);
                                let header = beforesAndBooleans.concat(afters);
                                for (let a = 0, b = header.length; a < b; a++) {
                                    rowObject[$.sliceIjsonKey(header[a])] = tableData[z][a];
                                }
                                if (jsonLogic.apply(jsonLogicRule, rowObject)) {
                                    tableData[z][beforesAndBooleans.length - 1 + aftersIndex + 1]
                                        = $.sliceIjsonKey(ruleValues[j]);
                                }
                            } catch (error) {
                                console.log('DamonUtils.js:2768:', error);
                                throw new Error(
                                    '"'
                                    + $.sliceIjsonKey(rules[i])
                                    + '" rule fails JsonLogic parsing.'
                                )
                            }
                        }
                    }
                }
            }
        }

        let header = booleans.map($.sliceIjsonKey);
        if (befores.length) {
            header = befores.map($.sliceIjsonKey).concat(header);
        }
        if (afters.length) {
            header = header.concat(afters.map($.sliceIjsonKey));
        }
        let headerSet = new Set(header);
        if (header.length !== headerSet.size) {
            throw new Error('Duplicate in headings.');
        }
        tableData.unshift(header);
        return tableData;
    }

    /**
     * @param {Array<string>} booleans
     * @param {number | undefined} yStart
     * @param {number | undefined} yEnd
     * @param {number | undefined} xStart
     * @param {number | undefined} xEnd
     * @returns {Array<Array<damonValue>>}
     */
    generateTruthTable(booleans, yStart, yEnd = yStart, xStart, xEnd = xStart) {
        let possibilities = Math.pow(2, booleans.length),
            result = [];
        if (yStart === undefined) {
            yStart = 0;
            yEnd = possibilities - 1;
        }
        if (xStart === undefined) {
            xStart = 0;
            xEnd = booleans.length - 1;
        }
        for (let i = yStart, c = yEnd + 1; i < c; i++) {
            let row = [];
            result.push(row);
        }
        for (let z = xStart, x = xEnd + 1; z < x; z++) {
            let segments = Math.pow(2, z + 1),
                segmentSize = possibilities / segments,
                index = yStart,
                currentSegment = Math.floor(yStart / segmentSize),
                remainder = yStart % segmentSize;
            segmentsLoop:
            for (let i = currentSegment, c = segments; i < c; i++) {
                let boolean = i % 2 == 0;
                for (let j = remainder, k = segmentSize; j < k; j++) {
                    if (index > yStart - 1) {
                        if (index < yEnd + 1) {
                            result[index - yStart].push(boolean);
                        } else {
                            break segmentsLoop;
                        }
                    }
                    index++;
                }
            }
        }

        return result;
    }

    /**
     * @param {damonMap} jsonMap
     * @returns {string}
     */
    indexPrefixedMapToJsonLogic(jsonMap) {
        let $ = this;
        var list = ``;
         if (
            typeof jsonMap === 'object'
            && jsonMap !== null
            && jsonMap instanceof Map
            && jsonMap.constructor === Map
        ) {
            _recurse(jsonMap);
            // Removes duplicate keys and validates.
            return JSON.stringify(JSON.parse(list));
        } else {
            if (typeof jsonMap == 'boolean') {
                return jsonMap;
            } else {
                throw new Error('JsonLogic requires either an object or a boolean value.')
            }
        }
        /**
         * @param {Map<string, any>|Array<any>} jsonMap
         * @param {number} [level=1]
         * @returns {string}
         */
        function _recurse(jsonMap, level = 1) {
            if (
                typeof jsonMap === 'object'
                && jsonMap !== null
                && !Array.isArray(jsonMap)
                && jsonMap instanceof Map
                && jsonMap.constructor === Map
            ) {
                for (const [k, value] of jsonMap) {
                    let key = $.sliceIjsonKey(k);
                    if (
                        typeof value === 'object'
                        && value !== null
                    ) {
                        if (Array.isArray(value)) {
                            if (value.length > 0) {
                                list += '    '.repeat(level) + `{${JSON.stringify(key)}: [\r\n`;
                                _recurse(value, level + 1);
                                list += '    '.repeat(level) + `]}`;
                            } else {
                                list += '    '.repeat(level) + `{${JSON.stringify(key)}: []}`;
                            }
                        } else {
                            if (Array.from(value.keys()).length > 0) {
                                list += '    '.repeat(level) + `{${JSON.stringify(key)}: [\r\n`;
                                for (const [sK, subValue] of value) {
                                    let subKey = $.sliceIjsonKey(sK);
                                    if (
                                        typeof subValue === 'object'
                                        && subValue !== null
                                    ) {
                                        if (Array.isArray(subValue)) {
                                            if (subValue.length > 0) {
                                                list += '    '.repeat(level + 1) + `[${JSON.stringify(subKey)}: [\r\n`;
                                                _recurse(subValue, level + 2);
                                                list += '    '.repeat(level + 1) + `]]`;
                                            } else {
                                                list += '    '.repeat(level + 1) + `[${JSON.stringify(subKey)}: []]`;
                                            }
                                        } else {
                                            if (Array.from(subValue.keys()).length > 0) {
                                                list += '    '.repeat(level + 1) + `{${JSON.stringify(subKey)}: [\r\n`;
                                                _recurse(subValue, level + 2);
                                                list += '    '.repeat(level + 1) + `]}`;
                                            } else {
                                                list += '    '.repeat(level + 1) + `{${JSON.stringify(subKey)}: {}}`;
                                            }
                                        }
                                    } else if (subValue === null) {
                                        list += '    '.repeat(level + 1) + `${JSON.stringify(subKey)}`;
                                    } else {
                                        list +=
                                            '    '.repeat(level + 1)
                                            + `{${JSON.stringify(subKey)}: ${JSON.stringify(subValue)}}`;
                                    }
                                    let lastKey = Array.from(value.keys())[Array.from(value.keys()).length - 1];
                                    if (sK != lastKey) {
                                        list += ",\r\n";
                                    } else {
                                        list += "\r\n";
                                    }
                                }
                                list += '    '.repeat(level) + `]}`;
                            } else {
                                list += '    '.repeat(level) + `${JSON.stringify(key)}: []}`;
                            }
                        }
                    } else {
                        if (value === true) {
                            list += '    '.repeat(level) + `{${JSON.stringify(key)}` + ': ' + "true}";
                        } else if (value === false) {
                            list += '    '.repeat(level) + `{${JSON.stringify(key)}` + ': ' + "false}";
                        } else if (value === null) {
                            list += '    '.repeat(level) + `${JSON.stringify(key)}`
                        } else if (
                            Number.isFinite(value)
                            && !Number.isNaN(value)
                        ) {
                            list += '    '.repeat(level) + `{${JSON.stringify(key)}` + ': ' + value + '}';
                        } else {
                            list +=
                                '    '.repeat(level) + `{${JSON.stringify(key)}` + ': ' + JSON.stringify(value) + '}';
                        }
                    }
                    let lastKey = Array.from(jsonMap.keys())[Array.from(jsonMap.keys()).length - 1];
                    if (k != lastKey) {
                        list += ",\r\n";
                    } else {
                        list += "\r\n";
                    }
                }
            } else if (Array.isArray(jsonMap)) {
                for (var i = 0, c = jsonMap.length; i < c; i++) {
                    if (
                        typeof jsonMap[i] === 'object'
                        && jsonMap[i] !== null
                    ) {
                        if (Array.isArray(jsonMap[i])) {
                            if (jsonMap[i].length > 0) {
                                list += '    '.repeat(level) + `[\r\n`;
                                _recurse(jsonMap[i], level + 1);
                                list += '    '.repeat(level) + `]`;
                            } else {
                                list += '    '.repeat(level) + `[]`;
                            }
                        } else {
                            if (Array.from(jsonMap[i].keys()).length > 0) {
                                list += '    '.repeat(level) + `{\r\n`;
                                _recurse(jsonMap[i], level + 1);
                                list += '    '.repeat(level) + `}`;
                            } else {
                                list += '    '.repeat(level) + `{}`;
                            }
                        }
                    } else {
                        if (jsonMap[i] === true) {
                            list += '    '.repeat(level) + "true";
                        } else if (jsonMap[i] === false) {
                            list += '    '.repeat(level) + "false";
                        } else if (jsonMap[i] === null) {
                            list += '    '.repeat(level) + "null";
                        } else if (
                            Number.isFinite(jsonMap[i])
                            && !Number.isNaN(jsonMap[i])
                        ) {
                            list += '    '.repeat(level) + jsonMap[i];
                        } else {
                            list += '    '.repeat(level) + JSON.stringify(jsonMap[i]);
                        }
                    }
                    if (i != c - 1) {
                        list += ",\r\n";
                    } else {
                        list += "\r\n";
                    }
                }
            }
        }
    }

    /**
     * @param {Array<Array<boolean|string>>} array
     * @returns {Array<object>}
     */
    arrayTableToPandasRecords(array) {
        let $ = this;
        let records = [],
            rowLength = array[0].length;
        for (let i = 1, c = array.length; i < c; i++) {
            let record = {};
            for (let z = 0, x = rowLength; z < x; z++) {
                record[array[0][z]] = array[i][z];
            }
            records.push(record);
        }
        return records;
    }

    /**
     * @param {Array<Array<damonValue>>} tableData
     * @param {Array<string>} booleans
     * @returns {HTMLElement}
     */
    arrayDecisionTableToHtml(tableData) {
        let $ = this;
        let table = document.createElement('table'),
            tHead = document.createElement('thead'),
            tBody = document.createElement('tbody');
        table.className = 'DAMON-Decision';
        let headRow = document.createElement('tr');
        for (let z = 0, x = tableData.length; z < x; z++) {
            let cell = document.createElement('th');
            if (z !== 0) {
                cell.textContent = z;
                cell.dataset.graphArbo = z - 1;
            }
            headRow.appendChild(cell);
        }
        tHead.appendChild(headRow);
        for (let i = 0, c = tableData[0].length; i < c; i++) {
            let row = document.createElement('tr');
            tBody.appendChild(row);
        }
        for (let i = 0, c = tableData.length; i < c; i++) {
            for (let z = 0, x = tableData[i].length; z < x; z++) {
                let cell = {};
                if (i == 0) {
                    cell = document.createElement('th');
                    if (
                        $.websiteRegex.test(tableData[i][z])
                        || $.pathRegex.test(tableData[i][z])
                    ) {
                        cell.innerHTML =
                            DOMPurify.sanitize(`<a href="${ tableData[i][z] }">${ tableData[i][z] }</a>`);
                    } else {
                        cell.textContent = `${tableData[i][z]}`;
                    }
                    tBody.children[z].appendChild(cell);
                } else {
                    cell = document.createElement('td');
                    if (typeof tableData[i][z] == 'boolean') {
                        if (tableData[i][z]) {
                            cell.className = 'true';
                        } else {
                            cell.className = 'false';
                        }
                        cell.innerHTML = tableData[i][z] ? 'T': 'F';
                    } else {
                        if (
                            $.websiteRegex.test(tableData[i][z])
                            || $.pathRegex.test(tableData[i][z])
                        ) {
                            cell.innerHTML =
                                DOMPurify.sanitize(`<a href="${ tableData[i][z] }">${ tableData[i][z] }</a>`);
                        } else {
                            cell.textContent = `${tableData[i][z]}`;
                        }
                    }
                    tBody.children[z].appendChild(cell);
                }
            }
        }
        table.appendChild(tHead);
        table.appendChild(tBody);
        return table;
    }

    /**
     * @param {damonValue} jsonMap
     * @returns {string}
     */
    indexPrefixedMapToPaths(jsonMap) {
        const $ = this;
        var list = ``;
        if (Array.isArray(jsonMap)) {
            throw new Error('Expected a map of maps. Saw an array.');
        } else if (
            typeof jsonMap === 'object'
            && jsonMap !== null
            && jsonMap instanceof Map
            && jsonMap.constructor === Map
        ) {
            list += "[\r\n";
            _recurse(jsonMap);
            list = list.slice(0, -3);
            list += "\r\n]";
            return list;
        } else {
            throw new Error('Expected a map of maps. Saw a non-null leaf-value instead.');
        }
        /**
         * @param {Map<string, any>|Array<any>} jsonMap
         * @param {number} [level=1]
         * @returns {string}
         */
        function _recurse(jsonMap, level = 1, path = []) {
            if (
                typeof jsonMap === 'object'
                && jsonMap !== null
                && !Array.isArray(jsonMap)
                && jsonMap instanceof Map
                && jsonMap.constructor === Map
            ) {
                for (const [k, value] of jsonMap) {
                    let key = $.sliceIjsonKey(k);
                    if (
                        typeof value === 'object'
                        && value !== null
                    ) {
                        if (Array.isArray(value)) {
                            throw new Error('Expected a map of maps. Saw an array.');
                        } else {
                            if (Array.from(value.keys()).length > 0) {
                                list += `    ${JSON.stringify(path.concat([key]).join('/'))},\r\n`;
                                _recurse(value, level + 1, path.concat([key]));
                            } else {
                                list += `    ${JSON.stringify(path.concat([key]).join('/'))},\r\n`;
                            }
                        }
                    } else {
                        if (value === true) {
                            throw new Error('Expected a map of maps. Saw a boolean.');
                        } else if (value === false) {
                            throw new Error('Expected a map of maps. Saw a boolean.');
                        } else if (value === null) {
                            list += `    ${JSON.stringify(path.concat([key]).join('/'))},\r\n`;
                        } else if (
                            Number.isFinite(value)
                            && !Number.isNaN(value)
                        ) {
                            throw new Error('Expected a map of maps. Saw a number.');
                        } else {
                            throw new Error('Expected a map of maps. Saw a string.');
                        }
                    }
                }
            } else {
                throw new Error('Expected a map of maps. Saw an array.');
            }
        }
    }
};
