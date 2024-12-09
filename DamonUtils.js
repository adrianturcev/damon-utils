const DOMPurify = require('dompurify');

//#### Utils
module.exports =
class DamonUtils {
    //# MODEL
    constructor(parentContext) {
        let $ = this;
        $.parentContext = parentContext;
        $.websiteRegex = /^(https?:\/\/)?[-a-zA-Z0-9]*[a-zA-Z0-9]+(\.[-a-zA-Z0-9]*[a-zA-Z0-9]+)+/;
        $.httpRegex = /^https?:\/\//;
    }

    /**
     * @param {string} damon
     * @returns {string}
     */
    damonToSExpression(damon) {
        const $ = this;
        return $.implicitMapToSExpression($.parentContext.damonToMap(damon));
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
            $.parentContext.mapToJSON(jsonMap);
        } catch (error) {
            console.log(error)
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
        function recurse(jsonMap, listItem) {
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
                        keySpan.className = "type-key";
                        if ($.websiteRegex.test(key)) {
                            let fullUrl = key;
                            if (!$.httpRegex.test(key))
                                fullUrl = ('https://' + key);
                            let keyLink = DOMPurify.sanitize(`<a href="${ fullUrl }">${ fullUrl }</a>`);
                            keySpan.innerHTML = keyLink;
                        } else {
                            if (
                                jsonContext !== undefined
                                && key in schema['@context']
                            ) {
                                keySpan.innerHTML =
                                    DOMPurify.sanitize(`<a href="${ schema['@context'][key]['@id'] }">${ key }</a>`);
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
                                    newDiv.innerHTML = keySpan.outerHTML + ': [';
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
                                                if ($.websiteRegex.test(childValue)) {
                                                    let fullUrl = childValue;
                                                    if (!$.httpRegex.test(childValue))
                                                        fullUrl = 'https://' + childValue;
                                                    childValueSpan.innerHTML =
                                                        DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                                } else {
                                                    childValueSpan.innerHTML = `"${childValue}"`;
                                                }
                                            } else {
                                                if ($.websiteRegex.test(childValue)) {
                                                    let fullUrl = childValue;
                                                    if (!$.httpRegex.test(childValue))
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
                                    newDiv.innerHTML = keySpan.outerHTML + ': []';
                                    newListItem.appendChild(newDiv);
                                    newListItem.appendChild(newList);
                                    listItem.appendChild(newListItem);
                                    recurse(value, newList);
                                }
                            } else {
                                if (
                                    jsonMap.implicitMaps !== undefined
                                    && jsonMap.implicitMaps.indexOf(key) > -1
                                ) {
                                    newDiv.innerHTML = keySpan.outerHTML;
                                } else {
                                    newDiv.innerHTML = keySpan.outerHTML + ': {}';
                                }
                                newListItem.appendChild(newDiv);
                                newListItem.appendChild(newList);
                                listItem.appendChild(newListItem);
                                recurse(value, newList);
                            }
                        } else {
                            jsonItemIndex++;
                            newDiv.innerHTML = keySpan.outerHTML + ': ';
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
                                    if ($.websiteRegex.test(childText)) {
                                        let fullUrl = childText;
                                        if (!$.httpRegex.test(childText))
                                            fullUrl = 'https://' + childText;
                                        valueSpan.innerHTML =
                                            DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                    } else {
                                        valueSpan.innerHTML = `"${childText}"`;
                                    }
                                } else {
                                    if ($.websiteRegex.test(childText)) {
                                        let fullUrl = childText;
                                        if (!$.httpRegex.test(childText))
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
                                            if ($.websiteRegex.test(value)) {
                                                let fullUrl = value;
                                                if (!$.httpRegex.test(value))
                                                    fullUrl = ('https://' + value);
                                                valueSpan.innerHTML =
                                                    DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                            } else {
                                                valueSpan.innerHTML = `"${value}"`;
                                            }
                                        } else {
                                            if ($.websiteRegex.test(value)) {
                                                let fullUrl = value;
                                                if (!$.httpRegex.test(value))
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
                                recurse(jsonMap[i], newList);
                            }
                        } else {
                            newDiv.textContent = "{}";
                            newListItem.appendChild(newDiv);
                            newListItem.appendChild(newList);
                            listItem.appendChild(newListItem);
                            recurse(jsonMap[i], newList);
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
                                if ($.websiteRegex.test(childText)) {
                                    let fullUrl = childText;
                                    if (!$.httpRegex.test(childText))
                                        fullUrl = 'https://' + childText;
                                    newDiv.innerHTML =
                                        DOMPurify.sanitize(`<a href="${ fullUrl }">"${ fullUrl }"</a>`);
                                } else {
                                    newDiv.innerHTML = `"${childText}"`;
                                }
                            } else {
                                if ($.websiteRegex.test(childText)) {
                                    let fullUrl = childText;
                                    if (!$.httpRegex.test(childText))
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

    /**
     * @param {damonValue} jsonMap
     * @param {boolean} [safeHTML=false]
     * @returns {object} DOM
     */
    mapToHtmlTable(jsonMap, safeHTML = false) {
        let $ = this;
        // Parsing check
        try {
            $.parentContext.mapToJSON(jsonMap);
        } catch (error) {
            throw new Error("Provided map value doesn't passes JSON.parse()");
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
            throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
        }
        for (const [key, value] of jsonMap) {
            if (
                typeof value === 'object'
                && value !== null
                && !Array.isArray(value)
                && value instanceof Map
                && value.constructor === Map
            ) {
                if (
                    key == "0"
                    && !headingsEncountered
                ) {
                    let row = document.createElement('tr');
                    columnsLength = value.length;

                    for (const [childKey, childValue] of value) {
                        if (childValue === null) {
                            let headerCell = document.createElement('th');
                            if (safeHTML) {
                                if ($.websiteRegex.test(childKey)) {
                                    headerCell.innerHTML =
                                        DOMPurify.sanitize(`<a href="${ childKey }">${ childKey }</a>`);
                                } else {
                                    headerCell.innerHTML = `${childKey}`;
                                }
                            } else {
                                if ($.websiteRegex.test(childKey)) {
                                    headerCell.innerHTML =
                                        DOMPurify.sanitize(`<a href="${ childKey }">${ childKey }</a>`);
                                } else {
                                    headerCell.textContent = `${childKey}`;
                                }
                            }
                            row.appendChild(headerCell);
                        } else {
                            throw new Error("Expected implicit null property, saw otherwise");
                        }
                    }
                    tHead.appendChild(row);
                    headingsEncountered = true;
                } else {
                    if (columnsLength == 0)
                        columnsLength = value.length;
                    if (value.length != columnsLength) {
                        // unmatching columns length
                        throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
                    }
                    let row = document.createElement('tr');
                    for (const [childKey, childValue] of value) {
                        if (childValue === null) {
                            let dataCell = document.createElement('td');
                            if (safeHTML) {
                                if ($.websiteRegex.test(childKey)) {
                                    dataCell.innerHTML =
                                        DOMPurify.sanitize(`<a href="${ childKey }">${ childKey }</a>`);
                                } else {
                                    dataCell.innerHTML = `${childKey}`;
                                }
                            } else {
                                if ($.websiteRegex.test(childKey)) {
                                    dataCell.innerHTML =
                                        DOMPurify.sanitize(`<a href="${ childKey }">${ childKey }</a>`);
                                } else {
                                    dataCell.textContent = `${childKey}`;
                                }
                            }
                            row.appendChild(dataCell);
                        } else {
                            throw new Error("Expected implicit null property, saw otherwise");
                        }
                    }
                    tBody.appendChild(row);
                }
            } else if (
                typeof value !== 'object'
                && key == "00"
            ) {
                let caption = document.createElement('caption');
                if (safeHTML) {
                    caption.innerHTML = value;
                } else {
                    caption.textContent = value;
                }
                table.appendChild(caption);
            } else {
                throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
            }
            jsonItemIndex++;
        }
        if (headingsEncountered) {
            table.appendChild(tHead);
        }
        table.appendChild(tBody);
        return table;
    }

    // Expects a complete tree (all terminal leaves at the same level)
    /**
     * @param {damonValue} jsonMap
     * @param {boolean} [safeHTML=false]
     * @returns {object} DOM
     */
    mapTreeLeavesToHtmlTable(jsonMap, safeHTML = false) {
        let $ = this;
        // Parsing check
        try {
            $.parentContext.mapToJSON(jsonMap);
        } catch (error) {
            throw new Error("Provided map value doesn't passes JSON.parse()")
        }
        var jsonItemIndex = 0,
            expectedDepth = 0,
            table = document.createElement('table'),
            tHead = document.createElement('thead'),
            tBody = document.createElement('tbody'),
            headingsEncountered = false;
        table.className = 'DAMON-LeavesToTable';
        if (
            typeof jsonMap !== 'object'
            || jsonMap == null
            || Array.isArray(jsonMap)
            || !(jsonMap instanceof Map)
            || jsonMap.constructor !== Map
        ) {
            throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
        }
        for (const [key, value] of jsonMap) {
            if (
                typeof value === 'object'
                && !Array.isArray(value)
            ) {
                if (
                    key == "head"
                    && !headingsEncountered
                ) {
                    try {
                        recurse(value, tHead);
                    } catch (e) {
                        return;
                    }
                    headingsEncountered = true;
                } else if (
                    key == "body"
                ) {
                    try {
                        recurse(value, tBody);
                    } catch (e) {
                        return;
                    }
                }
            } else if (
                typeof value !== 'object'
                && key == "caption"
            ) {
                let caption = document.createElement('caption');
                if (safeHTML) {
                    caption.innerHTML = value;
                } else {
                    caption.textContent = value;
                }
                table.appendChild(caption);
            } else {
                throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
            }
            jsonItemIndex++;
        }
        if (headingsEncountered) {
            table.appendChild(tHead);
        }
        table.appendChild(tBody);
        return table;
        /**
         * @param {damonValue} jsonMap
         * @param {object} tableSubContainer
         * @param {number} [level=0]
         * @param {array} [line=[]]
         */
        function recurse(jsonMap, tableSubContainer, level = 0, line = []) {
            if (
                typeof tableSubContainer !== 'object'
                || tableSubContainer == null
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
                if (tableSubContainer.tagName == "THEAD") {
                    if (Array.from(jsonMap.keys()).length == 1) {
                        if (
                            typeof jsonMap.get(Array.from(jsonMap.keys())[0]) === 'object'
                            && jsonMap.get(Array.from(jsonMap.keys())[0]) !== null
                        ) {
                            jsonItemIndex++;
                            recurse(
                                jsonMap.get(Array.from(jsonMap.keys())[0]),
                                tableSubContainer,
                                level + 1,
                                line.concat([Array.from(jsonMap.keys())[0]])
                            );
                        } else {
                            throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
                        }
                    } else {
                        throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
                    }
                } else if (
                    tableSubContainer.tagName == "TBODY"
                ) {
                    if (Array.from(jsonMap.keys()).length == 0) {
                        throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
                    }
                    for (const [key, value] of jsonMap) {
                        if (
                            typeof value === 'object'
                            && value !== null
                        ) {
                            jsonItemIndex++;
                            recurse(value, tableSubContainer, level + 1, line.concat([key]));
                        } else {
                            throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
                        }
                    }
                }
            } else if (Array.isArray(jsonMap)) {
                if (tableSubContainer.tagName == "THEAD") {
                    if (jsonMap.length == 1) {
                        jsonItemIndex++;
                        expectedDepth = level;
                        let tableRow = document.createElement('tr');
                        line.push(jsonMap[0]);
                        for (let i = 0, c = line.length; i < c; i++) {
                            let headerCell = document.createElement('th');
                            if (safeHTML) {
                                headerCell.innerHTML = line[i];
                            } else {
                                headerCell.textContent = line[i];
                            }
                            tableRow.appendChild(headerCell);
                        }
                        tableSubContainer.appendChild(tableRow);
                    } else {
                        throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
                    }
                } else if (
                    tableSubContainer.tagName == "TBODY"
                ) {
                    if (
                        level == expectedDepth
                    ) {
                        if (jsonMap.length == 0) {
                            throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
                        }
                        for (let i = 0, c = jsonMap.length; i < c; i++) {
                            jsonItemIndex++;
                            let tableRow = document.createElement('tr');
                            for (let z = 0, x = line.length; z < x; z++) {
                                let dataCell = document.createElement('td');
                                if (safeHTML) {
                                    dataCell.innerHTML = line[z];
                                } else {
                                    dataCell.textContent = line[z];
                                }
                                tableRow.appendChild(dataCell);
                            }
                            let dataCell = document.createElement('td');
                            if (safeHTML) {
                                dataCell.innerHTML = jsonMap[i];
                            } else {
                                dataCell.textContent = jsonMap[i];
                            }
                            dataCell.textContent = jsonMap[i];
                            tableRow.appendChild(dataCell);
                            tableSubContainer.appendChild(tableRow);
                        }
                    } else {
                        throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
                    }
                }
            }
        }
    }

    /**
     * @param {object} list DOM
     * @return {string}
     */
    htmlToJSON(list) {
        let $ = this;
        var listItemIndex = 0;
        if (list.firstElementChild.textContent == '{}') {
            return $._mapToJSON(recurse(list, new Map()));
        } else if (list.firstElementChild.textContent == '[]') {
            return $._mapToJSON(recurse(list, []));
        }
        /**
         * @param {object} list DOM
         * @param {damonValue} jsonMap
         * @returns {damonValue}
         */
        function recurse(list, jsonMap) {
            if (
                typeof list !== 'object'
                || list == null
                || Array.isArray(list)
            ) {
                throw new Error("Error List Item number " + listItemIndex + ": @param { {} } list");
            }
            if (
                typeof jsonMap === 'object'
                && jsonMap !== null
                && !Array.isArray(jsonMap)
                && jsonMap instanceof Map
                && jsonMap.constructor === Map
            ) {
                // {}
                for (let i = 0, c = list.children.length; i < c; i++) {
                    listItemIndex++;
                    if (list.children[i].tagName == "LI") {
                        if (list.children[i].firstElementChild.tagName == "CODE") {
                            if (list.children[i].firstElementChild.innerHTML.length) {
                                let text = list.children[i].firstElementChild.innerHTML.trim();
                                if (
                                    text[text.length - 1] == ":"
                                    && text.length > 1
                                ) {
                                    let secondGrandChild = list.children[i].children[1];
                                    if (
                                        secondGrandChild.tagName == "UL"
                                        && secondGrandChild.firstElementChild.tagName == "LI"
                                        && secondGrandChild.children.length == 1
                                        && secondGrandChild.firstElementChild.firstElementChild.tagName == "CODE"
                                    ) {
                                        listItemIndex++;
                                        let childText =
                                            secondGrandChild.firstElementChild.firstElementChild.textContent.trim();
                                        if (childText == "true") {
                                            jsonMap.set(text.slice(0, -1), true);
                                        } else if (childText == "false") {
                                            jsonMap.set(text.slice(0, -1), false);
                                        } else if (childText == "null") {
                                            jsonMap.set(text.slice(0, -1), null);
                                        } else if (
                                            isFinite(childText)
                                            && !isNaN(parseFloat(childText))
                                        ) {
                                            jsonMap.set(text.slice(0, -1), childText * 1);
                                        } else {
                                            jsonMap.set(text.slice(0, -1), childText);
                                        }
                                    } else {
                                        throw new Error(
                                            "Error List Item number "
                                            + listItemIndex
                                            + ": not DAMON-compliant."
                                        );
                                    }
                                } else if (
                                    text[text.length - 4] == ":"
                                    && text.length > 4
                                ) {
                                    if (text.slice(-3) == " []") {
                                        jsonMap.set(text.slice(0, -4), []);
                                        if (list.children[i].children[1].tagName == "UL") {
                                            recurse(list.children[i].children[1], jsonMap.get(text.slice(0, -4)));
                                        } else {
                                            throw new Error(
                                                "Error List Item number "
                                                + listItemIndex
                                                + ": not DAMON-compliant."
                                            );
                                        }
                                    } else if (text.slice(-3) == " {}") {
                                        jsonMap.set(text.slice(0, -4), new Map());
                                        if (list.children[i].children[1].tagName == "UL") {
                                            recurse(list.children[i].children[1], jsonMap.get(text.slice(0, -4)));
                                        } else {
                                            throw new Error(
                                                "Error List Item number "
                                                + listItemIndex
                                                + ": not DAMON-compliant."
                                            );
                                        }
                                    }
                                } else {
                                    throw new Error(
                                        "Error List Item number "
                                        + listItemIndex
                                        + ": map items need a key"
                                    );
                                }
                            } else {
                                throw new Error("Error List Item number " + listItemIndex + ": empty node.");
                            }
                        } else {
                            throw new Error("Error List Item number " + listItemIndex + ": not DAMON-compliant.");
                        }
                    }
                }
            } else if (Array.isArray(jsonMap)) {
                // []
                for (let i = 0, c = list.children.length; i < c; i++) {
                    listItemIndex++;
                    if (list.children[i].tagName == "LI") {
                        if (list.children[i].firstElementChild.tagName == "CODE") {
                            if (list.children[i].firstElementChild.innerHTML.length) {
                                let text = list.children[i].firstElementChild.innerHTML.trim();
                                if (
                                    text[text.length - 1] == ":"
                                    && text.length > 1
                                ) {
                                    throw new Error(
                                        "Error List Item number "
                                        + listItemIndex
                                        + ": lists can't have keys."
                                    );
                                } else if (
                                    text[text.length - 4] == ":"
                                    && text.length > 4
                                ) {
                                    throw new Error(
                                        "Error List Item number "
                                        + listItemIndex
                                        + ": not DAMON-compliant."
                                    );
                                } else {
                                    if (text == "[]") {
                                        jsonMap.push([]);
                                        if (
                                            list.children[i].children[1]
                                            && list.children[i].children[1].tagName == "UL"
                                        ) {
                                            recurse(list.children[i].children[1], jsonMap[jsonMap.length - 1]);
                                        } else {
                                            throw new Error(
                                                "Error List Item number "
                                                + listItemIndex
                                                + ": not DAMON-compliant."
                                            );
                                        }
                                    } else if (text == "{}") {
                                        jsonMap.push({});
                                        if (
                                            list.children[i].children[1]
                                            && list.children[i].children[1].tagName == "UL"
                                        ) {
                                            recurse(list.children[i].children[1], jsonMap[jsonMap.length - 1]);
                                        } else {
                                            throw new Error(
                                                "Error List Item number "
                                                + listItemIndex
                                                + ": not DAMON-compliant."
                                            );
                                        }
                                    } else if (text == "true") {
                                        jsonMap.push(true);
                                    } else if (text == "false") {
                                        jsonMap.push(false);
                                    } else if (text == "null") {
                                        jsonMap.push(null);
                                    } else if (
                                        isFinite(text)
                                        && !isNaN(parseFloat(text))
                                    ) {
                                        jsonMap.push(text * 1);
                                    } else {
                                        jsonMap.push(text);
                                    }
                                }
                            } else {
                                throw new Error("Error List Item number " + listItemIndex + ": empty node.");
                            }
                        } else {
                            throw new Error("Error List Item number " + listItemIndex + ": not DAMON-compliant.");
                        }
                    }
                }
            } else {
                throw new Error("Error List Item number " + listItemIndex + ": @param { {} | [] } jsonMap");
            }
            return jsonMap;
        }
    }

    /**
     * @param {damonMap} jsonMap
     * @returns {string}
     */
    implicitMapToSExpression(jsonMap) {
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
            JSON.parse(list)
            return list;
        } else {
            if (typeof jsonMap == 'string') {
                jsonMap = '"' + jsonMap + '"';
            }
            JSON.parse(jsonMap)
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
                for (const [key, value] of jsonMap) {
                    i++;
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
                            list += '    '.repeat(level) + `${JSON.stringify(key)}` + ', ' + `"${value}"`;
                        }
                    }
                    if (key != Array.from(jsonMap.keys())[Array.from(jsonMap.keys()).length - 1]) {
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
     * @param {string} damon
     * @returns {Array<Array<string|number>>} pathsList
     */
    getPathsList(damon) {
        const $ = this;
        let damonMap = $.parentContext.damonToMap(damon),
            pathsList = [];
        _walkAndPushPaths(damonMap);
        return pathsList;

        /**
         * @param {Map<string, any>|Array<any>} map
         * @param {Array<string|number>} targetPath
         * @param {Array<string|number>} [currentPath=[]]
        */
        function _walkAndPushPaths(map, currentPath = []) {
            if (
                typeof map === 'object'
                && map !== null
                && !Array.isArray(map)
                && map instanceof Map
                && map.constructor === Map
            ) {
                for (const [key, value] of map) {
                    if (
                        typeof value === 'object'
                        && value !== null
                        && !Array.isArray(value)
                        && value instanceof Map
                        && value.constructor === Map
                        && Array.from(value.keys()).length
                    ) {
                        pathsList.push(currentPath.concat(key));
                        _walkAndPushPaths(value, currentPath.concat([key]));
                    } else if (
                        Array.isArray(value)
                        && (
                            map.damonInlineArrays == undefined
                            || map.damonInlineArrays.indexOf(key) === -1
                        ) && value.length
                    ) {
                        pathsList.push(currentPath.concat(key));
                        _walkAndPushPaths(value, currentPath.concat([key]));
                    } else {
                        pathsList.push(currentPath.concat(key).concat(value));
                    }
                }
            } else {
                for (let i = 0, c = map.length; i < c; i++) {
                    if (
                        typeof map[i] === 'object'
                        && map[i] !== null
                        && !Array.isArray(map[i])
                        && map[i] instanceof Map
                        && map[i].constructor === Map
                        && Array.from(map[i].keys()).length
                    ) {
                        pathsList.push(currentPath.concat(i));
                        _walkAndPushPaths(map[i], currentPath.concat([i]));
                    } else if (
                        Array.isArray(map[i])
                        && (
                            map.damonInlineArrays == undefined
                            || map.damonInlineArrays.indexOf(i) === -1
                        ) && map[i].length
                    ) {
                        pathsList.push(currentPath.concat(i));
                        _walkAndPushPaths(map[i], currentPath.concat([i]));
                    } else {
                        pathsList.push(currentPath.concat(map[i]));
                    }
                }
            }
        }
    }

    /**
     * Arrays of inline-arrays produce array-parameters
     * @param {string} damon
     * @return {string} mathJs
     */
    damonToMathJs(damon) {
        const $ = this;
        let mathJs = '',
            damonMap = $.parentContext.damonToMap(damon);
        if (Array.isArray(damonMap)) {
            mathJs += "(\r\n";
            _recurse(damonMap);
            mathJs += ")";
            return mathJs;
        } else if (
            typeof damonMap === 'object'
            && damonMap !== null
            && damonMap instanceof Map
            && damonMap.constructor === Map
        ) {
            mathJs += "(\r\n";
            _recurse(damonMap);
            mathJs += ")";
            return mathJs;
        } else {
            if (typeof damonMap == 'string') {
                damonMap = JSON.stringify(damonMap);
            }
            JSON.parse(damonMap);
            return damonMap;
        }

        function _minusculize(string) {
            return string[0].toLowerCase + string.slice(1);
        }
        /**
         * @param {Map<string, any>|Array<any>} damonMap
         * @param {number} [level=1]
         * @returns {string}
         */
        function _recurse(damonMap, level = 1) {
            if (
                typeof damonMap === 'object'
                && damonMap !== null
                && !Array.isArray(damonMap)
                && damonMap instanceof Map
                && damonMap.constructor === Map
            ) {
                for (const [key, value] of damonMap) {
                    if (
                        typeof value === 'object'
                        && value !== null
                    ) {
                        if (Array.isArray(value)) {
                            if (value.length > 0) {
                                mathJs += '    '.repeat(level) + `"${JSON.stringify(_minusculize(key))}"(\r\n`;
                                _recurse(value, level + 1);
                                mathJs += '    '.repeat(level) + `)`;
                            } else {
                                mathJs += '    '.repeat(level) + `"${JSON.stringify(_minusculize(key))}"()`;
                            }
                        } else {
                            if (Array.from(value.keys()).length > 0) {
                                mathJs += '    '.repeat(level) + `"${JSON.stringify(_minusculize(key))}"(\r\n`;
                                _recurse(value, level + 1);
                                mathJs += '    '.repeat(level) + `)`;
                            } else {
                                mathJs += '    '.repeat(level) + `"${JSON.stringify(_minusculize(key))}"()`;
                            }
                        }
                    } else {
                        if (value === true) {
                            mathJs += '    '.repeat(level) + `"${JSON.stringify(_minusculize(key))}"` + "(true)";
                        } else if (value === false) {
                            mathJs += '    '.repeat(level) + `"${JSON.stringify(_minusculize(key))}"` + "(false)";
                        } else if (value === null) {
                            mathJs += '    '.repeat(level) + `"${JSON.stringify(_minusculize(key))}"` + "(null)";
                        } else if (
                            Number.isFinite(value)
                            && !Number.isNaN(value)
                        ) {
                            mathJs += '    '.repeat(level) + `"${JSON.stringify(_minusculize(key))}"` + '(' + value + ')';
                        } else {
                            mathJs +=
                                '    '.repeat(level)
                                + `"${JSON.stringify(_minusculize(key))}"`
                                + '("' + JSON.stringify(value) + '")';
                        }
                    }
                    if (key != Array.from(damonMap.keys())[Array.from(damonMap.keys()).length - 1]) {
                        mathJs += ",\r\n";
                    } else {
                        mathJs += "\r\n";
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
                                    mathJs += '    '.repeat(level) + JSON.stringify(damonMap[i]);
                                } else {
                                    mathJs += '    '.repeat(level) + `(\r\n`;
                                    _recurse(damonMap[i], level + 1);
                                    mathJs += '    '.repeat(level) + `)`;
                                }
                            } else {
                                mathJs += '    '.repeat(level) + `()`;
                            }
                        } else {
                            if (Array.from(damonMap[i].keys()).length > 0) {
                                mathJs += '    '.repeat(level) + `(\r\n`;
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
                            mathJs += '    '.repeat(level) + `"${JSON.stringify(_minusculize(damonMap[i]))}"`;
                        }
                    }
                    if (i != c - 1) {
                        mathJs += ",\r\n";
                    } else {
                        mathJs += "\r\n";
                    }
                }
            }
        }
    }

    /**
     * @param {damonValue} firstMap
     * @param {damonValue} secondMap
    */
    mapsDiff(firstMap, secondMap) {
        let $ = this;
        // Parsing check
        try {
            $.parentContext.mapToJSON(firstMap);
            $.parentContext.mapToJSON(secondMap);
        } catch (error) {
            throw new Error("Provided map value doesn't passes JSON.parse()");
        }
        if (typeof firstMap !== typeof secondMap) {
            let me = "go";
        }
        // keep track of firstMap lines
        // Intersection, Substraction, Addition
        // can't use mapToDamon for deep equal
        // strict map ordering check
        var list = ``;
        if (Array.isArray(firstMap)) {
            list += '- []\n';
        } else {
            list += '- {}\n';
        }
        _recurse(firstMap);
        return list.slice(0, -1); // last linefeed

        /**
         * @param {damonValue} jsonMap
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
                for (const [key, value] of jsonMap) {
                    if (
                        typeof value === 'object'
                        && value !== null
                    ) {
                        if (Array.isArray(value)) {
                            let nullsCounter = 0,
                                arrayOfPrimitives = value.filter(function (item) {
                                if (item === true) {
                                    return true;
                                } else if (item === false) {
                                    return true;
                                } else if (item === null) {
                                    nullsCounter++;
                                    return true;
                                } else if (typeof item == 'string') {
                                    return true;
                                } else if (
                                    isFinite(item)
                                    && !isNaN(parseFloat(item))
                                    && Number.isFinite(item * 1)
                        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN
                                    && !Number.isNaN(item * 1)
                                ) { // Number
                                    return true;
                                } else {
                                    return false;
                                }
                            });
                            if (
                                value.length == arrayOfPrimitives.length
                                && (level * 4 + 2 + value.join(', ').length + (nullsCounter * 4)) <= 80
                            ) {
                                // No nesting, fits on an archivable line
                                let line = '[' + value.map((x) => JSON.stringify(x)).join(', ') + ']';
                                list +=
                                    '    '.repeat(level)
                                    + '- ' + JSON.stringify(key).slice(1, -1) + ': ' + line + '\n';
                            } else {
                                list += '    '.repeat(level) + '- ' + JSON.stringify(key).slice(1, -1) + ': []\n';
                                _recurse(value, level + 1);
                            }
                        } else {
                            list += '    '.repeat(level) + '- ' + JSON.stringify(key).slice(1, -1) + ': {}\n';
                            _recurse(value, level + 1);
                        }
                    } else {
                        list += '    '.repeat(level) + '- ' + JSON.stringify(key).slice(1, -1) + ': ';
                        if (value === true) {
                            list += "true\n";
                        } else if (value === false) {
                            list += "false\n";
                        } else if (value === null) {
                            list += "null\n";
                        } else if (
                            Number.isFinite(value)
                            && !Number.isNaN(value)
                        ) {
                            list += value + "\n";
                        } else {
                            list += `${JSON.stringify(value)}\n`;
                        }
                    }
                }
            } else if (Array.isArray(jsonMap)) {
                for (var i = 0, c = jsonMap.length; i < c; i++) {
                    if (
                        typeof jsonMap[i] === 'object'
                        && jsonMap[i] !== null
                    ) {
                        if (Array.isArray(jsonMap[i])) {
                            let nullsCounter = 0,
                                arrayOfPrimitives = jsonMap[i].filter(function (item) {
                                if (item === true) {
                                    return true;
                                } else if (item === false) {
                                    return true;
                                } else if (item === null) {
                                    nullsCounter++;
                                    return true;
                                } else if (typeof item == 'string') {
                                    return true;
                                } else if (
                                    isFinite(item)
                                    && !isNaN(parseFloat(item))
                                    && Number.isFinite(item * 1)
                        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN
                                    && !Number.isNaN(item * 1)
                                ) { // Number
                                    return true;
                                } else {
                                    return false;
                                }
                            });
                            if (
                                jsonMap[i].length == arrayOfPrimitives.length
                                && (level * 4 + 2 + jsonMap[i].join(', ').length + (nullsCounter * 4)) <= 80
                            ) {
                                let line = '[' + jsonMap[i].map((x) => JSON.stringify(x)).join(', ') + ']';
                                list += '    '.repeat(level) + '- ' + line + '\n';
                            } else {
                                list += '    '.repeat(level) + "- []\n";
                                _recurse(jsonMap[i], level + 1);
                            }
                        } else {
                            list += '    '.repeat(level) + "- {}\n";
                            _recurse(jsonMap[i], level + 1);
                        }
                    } else {
                        if (jsonMap[i] === true) {
                            list += '    '.repeat(level) + "- true\n";
                        } else if (jsonMap[i] === false) {
                            list += '    '.repeat(level) + "- false\n";
                        } else if (jsonMap[i] === null) {
                            list += '    '.repeat(level) + "- null\n";
                        } else if (
                            Number.isFinite(jsonMap[i])
                            && !Number.isNaN(jsonMap[i])
                        ) {
                            list += '    '.repeat(level) + '- ' + jsonMap[i] + "\n";
                        } else {
                            list += '    '.repeat(level) + `- ${JSON.stringify(jsonMap[i])}\n`;
                        }
                    }
                }
            }
        }
    }
 };
