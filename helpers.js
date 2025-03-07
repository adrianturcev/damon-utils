module.exports = function (document) {
    this.document = document;
    return {
// For sanity's sake

    // # Nil

    // I like the NOT operator's conciseness when testing for null or undefined
    // I like strict type checking
    // So I made a strictly typed equivalent functions with:
    // - 3-letters name
    // - single argument

    /**
     * Nil
     * Neither null nor undefined
     * @param { boolean } exp
     * @returns { boolean }
     */
    nil(exp) { // values implicitly considered functions
        if (
            exp === null
        || typeof exp === 'undefined'
        ) {
            return true;
        } else {
            return false;

        }
    },

    // # Hack

    // .slice() uses a closed-open interval
    // the *sane* convention goes closed-closed

    /**
     * Hack
     * @param { number } start
     * @param { number } end
     * @returns
     */
    hack(array, start, end) {
        return array.slice(start, end + 1);
    },

    // # Prune/Pick

    // Javascript inherited spreadsheet-like .filter()
    // It felt confusing there
    // It feels confusing here too

    /**
     * Pick
     * @param {*} array
     * @param {*} pruningFunction
     * @returns
     */
    pick(array, pruningFunction) {
        return array.filter(pruningFunction);
    },

    /**
     * Prune
     * The inverse of filter()
     * @param {*} array
     * @param {*} filteringFunction
     * @returns
     */
    prune(array, filteringFunction) {
        return array.filter(function (x) {
            return !filteringFunction(x);
        });
    },

    // # Check

    // .every() just sounds weird
    /**
     * Check
     * @param {*} array
     * @param {*} checkingFunction
     * @returns
     */
    check(array, checkingFunction) {
        return array.every(checkingFunction);
    },

    /**
     * Escape
     * @param { string } string
     * @returns
     */
    escape(string) {
        return string
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    },

    /**
     * DOM-rendering template tag
     * @param {*} strings
     * @returns {object} a DocumentFragment
     */
    html(strings) {
        let output = strings[0], // assumes empty string start?
            max = Math.max(strings.length, arguments.length - 1);
        for (let i = 1; i < max; i++) {
            output += arguments[i];
            output += strings[i];
        }
        let fragment = document.createDocumentFragment();
        fragment.innerHTML = output;
        return fragment;
    },

    // # DATA-STATE

    // Alternative CSS state management with data-attributes rather than classes
    // - using data-attributes css selectors instead of classes in dynamic cases fits the MVC pattern better
    //     - makes it easier to match model and vue in css and html
    //     - using dataset instead of classlist allows to distinguish static .class from dynamic state
    //     - classes essentialy work as booleans types like ".walked"
    //         - you have to notice their abscence, amongst other potential use of .class
    //     - data-state work as a string type you can dedicate to store state only, and more than one state

    /**
     * Add
     * @param { object } element
     * @param { string } state
     */
    addDataState(element, state) {
        let stateArray = [];
        if (
            element.dataset.state
        && element.dataset.state.indexOf(' ') > -1
        ) {
            stateArray = element.dataset.state.split(' ');
        } else {
            stateArray = [element.dataset.state];
        }
        if (stateArray.indexOf(state) === -1) {
            stateArray.push(state);
            element.dataset.state = stateArray.join(' ');
        }
    },

    /**
     * Remove
     * @param { object } element
     * @param { string } state
     */
    removeDataState(element, state) {
        let stateArray = [];
        if (
            element.dataset.state
        && element.dataset.state.indexOf(' ') > -1
        ) {
            stateArray = element.dataset.state.split(' ');
        } else {
            stateArray = [element.dataset.state];
        }
        element.dataset.state =
        stateArray
            .filter(element => (element !== state))
            .join(' ');
    },

    /**
     * Replace
     * @param { object } element
     * @param { string } stateToRemove
     * @param { string } stateToAdd
     */
    replaceDataState(element, stateToRemove, stateToAdd) {
        this.removeDataState(element, stateToRemove);
        this.addDataState(element, stateToAdd);
    },

    /**
     * Toggle
     * @param { object } element
     * @param { string } state
     */
    toggleDataState(element, state) {
        let stateArray = element.dataset.state.split(' ');
        if (stateArray.indexOf(state) == -1) {
            this.addDataState(element, state);
        } else {
            this.removeDataState(element, state);
        }
    },

    //# AJAX Functions

    /**
     * AJAX GET
     * @param {string} url The target url
     * @param {function} callback
     * @param {boolean} isJson Response contains json
     * @param {object} callbackContext
     */
    ajaxGet(url, callback, isJson, callbackContext) {
        var req = new XMLHttpRequest();
        req.open("GET", url);
        req.addEventListener("load", function () {
            if (req.status >= 200 && req.status < 400) {
                if (isJson) {
                // Transforme la donnée du format JSON vers le format texte avant le callback
                    var json = {};
                    try {
                        json = JSON.parse(req.responseText);
                    } catch (error) {
                        console.error("Get request returned invalid JSON.")
                    }
                    callbackContext === undefined ? callback(json) : callback.apply(callbackContext, [json]);
                } else {
                // Appelle la fonction callback en lui passant la réponse de la requête
                    callbackContext === undefined ? callback(req.responseText) : callback.apply(callbackContext, [req.responseText]);
                }
            } else {
                console.error(req.status + " " + req.statusText + " " + url);
            }
        });
        req.addEventListener("error", function () {
            console.error("Erreur réseau avec l'URL " + url);
        });
        req.send(null);
    },

    /**
     * Exécute un appel AJAX POST
     * Prend en paramètres l'URL cible, la donnée à envoyer et la fonction callback appelée en cas de succès
     * Le paramètre isJson permet d'indiquer si l'envoi concerne des données JSON
     * @param {string} url
     * @param {string} data
     * @param {function} successCallback
     * @param {function} failureCallback
     * @param {boolean} isJson
     * @param {object} successCallbackContext
     * @param {object} failureCallbackContext
     */
    ajaxPost(url, data, successCallback, failureCallback, isJson, successCallbackContext, failureCallbackContext) {
        var req = new XMLHttpRequest();
        req.open("POST", url);
        req.addEventListener("load", function () {
            if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
                successCallbackContext === undefined ? successCallback(req) : successCallback.apply(successCallbackContext, [req]);
            } else {
            // Appelle la fonction callback en lui passant la réponse de la requête
                failureCallbackContext === undefined ? failureCallback(req) : failureCallback.apply(failureCallbackContext, [req]);
                console.error(req.status + " " + req.statusText + " " + url);
            }
        });
        req.addEventListener("error", function () {
            console.error("Erreur réseau avec l'URL " + url);
        });
        if (isJson) {
        // Définit le contenu de la requête comme étant du JSON
            req.setRequestHeader("Content-Type", "application/json");
            // Transforme la donnée du format JSON vers le format texte avant l'envoi
            data = JSON.stringify(data);
        }
        req.send(data);
    },

    /**
     * Pipe
     * Function piping with initial input
     * @param {*} functions
     * @param {*} input
     * @returns {*}
     */
    pipe(input, ...functions) {
        return functions.reduce((res, fun) => fun(res), input);
    }
};};
