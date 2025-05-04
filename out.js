(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/dompurify/dist/purify.cjs.js
  var require_purify_cjs = __commonJS({
    "node_modules/dompurify/dist/purify.cjs.js"(exports, module) {
      "use strict";
      var {
        entries,
        setPrototypeOf,
        isFrozen,
        getPrototypeOf,
        getOwnPropertyDescriptor
      } = Object;
      var {
        freeze,
        seal,
        create
      } = Object;
      var {
        apply,
        construct
      } = typeof Reflect !== "undefined" && Reflect;
      if (!freeze) {
        freeze = function freeze2(x) {
          return x;
        };
      }
      if (!seal) {
        seal = function seal2(x) {
          return x;
        };
      }
      if (!apply) {
        apply = function apply2(fun, thisValue, args) {
          return fun.apply(thisValue, args);
        };
      }
      if (!construct) {
        construct = function construct2(Func, args) {
          return new Func(...args);
        };
      }
      var arrayForEach = unapply(Array.prototype.forEach);
      var arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
      var arrayPop = unapply(Array.prototype.pop);
      var arrayPush = unapply(Array.prototype.push);
      var arraySplice = unapply(Array.prototype.splice);
      var stringToLowerCase = unapply(String.prototype.toLowerCase);
      var stringToString = unapply(String.prototype.toString);
      var stringMatch = unapply(String.prototype.match);
      var stringReplace = unapply(String.prototype.replace);
      var stringIndexOf = unapply(String.prototype.indexOf);
      var stringTrim = unapply(String.prototype.trim);
      var objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
      var regExpTest = unapply(RegExp.prototype.test);
      var typeErrorCreate = unconstruct(TypeError);
      function unapply(func) {
        return function(thisArg) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          return apply(func, thisArg, args);
        };
      }
      function unconstruct(func) {
        return function() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          return construct(func, args);
        };
      }
      function addToSet(set, array) {
        let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
        if (setPrototypeOf) {
          setPrototypeOf(set, null);
        }
        let l = array.length;
        while (l--) {
          let element = array[l];
          if (typeof element === "string") {
            const lcElement = transformCaseFunc(element);
            if (lcElement !== element) {
              if (!isFrozen(array)) {
                array[l] = lcElement;
              }
              element = lcElement;
            }
          }
          set[element] = true;
        }
        return set;
      }
      function cleanArray(array) {
        for (let index = 0; index < array.length; index++) {
          const isPropertyExist = objectHasOwnProperty(array, index);
          if (!isPropertyExist) {
            array[index] = null;
          }
        }
        return array;
      }
      function clone(object) {
        const newObject = create(null);
        for (const [property, value] of entries(object)) {
          const isPropertyExist = objectHasOwnProperty(object, property);
          if (isPropertyExist) {
            if (Array.isArray(value)) {
              newObject[property] = cleanArray(value);
            } else if (value && typeof value === "object" && value.constructor === Object) {
              newObject[property] = clone(value);
            } else {
              newObject[property] = value;
            }
          }
        }
        return newObject;
      }
      function lookupGetter(object, prop) {
        while (object !== null) {
          const desc = getOwnPropertyDescriptor(object, prop);
          if (desc) {
            if (desc.get) {
              return unapply(desc.get);
            }
            if (typeof desc.value === "function") {
              return unapply(desc.value);
            }
          }
          object = getPrototypeOf(object);
        }
        function fallbackValue() {
          return null;
        }
        return fallbackValue;
      }
      var html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
      var svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
      var svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
      var svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
      var mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]);
      var mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
      var text = freeze(["#text"]);
      var html = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]);
      var svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
      var mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
      var xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
      var MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
      var ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
      var TMPLIT_EXPR = seal(/\$\{[\w\W]*/gm);
      var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/);
      var ARIA_ATTR = seal(/^aria-[\-\w]+$/);
      var IS_ALLOWED_URI = seal(
        /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
        // eslint-disable-line no-useless-escape
      );
      var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
      var ATTR_WHITESPACE = seal(
        /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
        // eslint-disable-line no-control-regex
      );
      var DOCTYPE_NAME = seal(/^html$/i);
      var CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
      var EXPRESSIONS = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        ARIA_ATTR,
        ATTR_WHITESPACE,
        CUSTOM_ELEMENT,
        DATA_ATTR,
        DOCTYPE_NAME,
        ERB_EXPR,
        IS_ALLOWED_URI,
        IS_SCRIPT_OR_DATA,
        MUSTACHE_EXPR,
        TMPLIT_EXPR
      });
      var NODE_TYPE = {
        element: 1,
        attribute: 2,
        text: 3,
        cdataSection: 4,
        entityReference: 5,
        // Deprecated
        entityNode: 6,
        // Deprecated
        progressingInstruction: 7,
        comment: 8,
        document: 9,
        documentType: 10,
        documentFragment: 11,
        notation: 12
        // Deprecated
      };
      var getGlobal = function getGlobal2() {
        return typeof window === "undefined" ? null : window;
      };
      var _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, purifyHostElement) {
        if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") {
          return null;
        }
        let suffix = null;
        const ATTR_NAME = "data-tt-policy-suffix";
        if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
          suffix = purifyHostElement.getAttribute(ATTR_NAME);
        }
        const policyName = "dompurify" + (suffix ? "#" + suffix : "");
        try {
          return trustedTypes.createPolicy(policyName, {
            createHTML(html2) {
              return html2;
            },
            createScriptURL(scriptUrl) {
              return scriptUrl;
            }
          });
        } catch (_) {
          console.warn("TrustedTypes policy " + policyName + " could not be created.");
          return null;
        }
      };
      var _createHooksMap = function _createHooksMap2() {
        return {
          afterSanitizeAttributes: [],
          afterSanitizeElements: [],
          afterSanitizeShadowDOM: [],
          beforeSanitizeAttributes: [],
          beforeSanitizeElements: [],
          beforeSanitizeShadowDOM: [],
          uponSanitizeAttribute: [],
          uponSanitizeElement: [],
          uponSanitizeShadowNode: []
        };
      };
      function createDOMPurify() {
        let window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
        const DOMPurify = (root) => createDOMPurify(root);
        DOMPurify.version = "3.2.4";
        DOMPurify.removed = [];
        if (!window2 || !window2.document || window2.document.nodeType !== NODE_TYPE.document || !window2.Element) {
          DOMPurify.isSupported = false;
          return DOMPurify;
        }
        let {
          document: document2
        } = window2;
        const originalDocument = document2;
        const currentScript = originalDocument.currentScript;
        const {
          DocumentFragment,
          HTMLTemplateElement,
          Node,
          Element,
          NodeFilter,
          NamedNodeMap = window2.NamedNodeMap || window2.MozNamedAttrMap,
          HTMLFormElement,
          DOMParser,
          trustedTypes
        } = window2;
        const ElementPrototype = Element.prototype;
        const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
        const remove = lookupGetter(ElementPrototype, "remove");
        const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
        const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
        const getParentNode = lookupGetter(ElementPrototype, "parentNode");
        if (typeof HTMLTemplateElement === "function") {
          const template = document2.createElement("template");
          if (template.content && template.content.ownerDocument) {
            document2 = template.content.ownerDocument;
          }
        }
        let trustedTypesPolicy;
        let emptyHTML = "";
        const {
          implementation,
          createNodeIterator,
          createDocumentFragment,
          getElementsByTagName
        } = document2;
        const {
          importNode
        } = originalDocument;
        let hooks = _createHooksMap();
        DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
        const {
          MUSTACHE_EXPR: MUSTACHE_EXPR2,
          ERB_EXPR: ERB_EXPR2,
          TMPLIT_EXPR: TMPLIT_EXPR2,
          DATA_ATTR: DATA_ATTR2,
          ARIA_ATTR: ARIA_ATTR2,
          IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA2,
          ATTR_WHITESPACE: ATTR_WHITESPACE2,
          CUSTOM_ELEMENT: CUSTOM_ELEMENT2
        } = EXPRESSIONS;
        let {
          IS_ALLOWED_URI: IS_ALLOWED_URI$1
        } = EXPRESSIONS;
        let ALLOWED_TAGS = null;
        const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
        let ALLOWED_ATTR = null;
        const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
        let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
          tagNameCheck: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: null
          },
          attributeNameCheck: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: null
          },
          allowCustomizedBuiltInElements: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: false
          }
        }));
        let FORBID_TAGS = null;
        let FORBID_ATTR = null;
        let ALLOW_ARIA_ATTR = true;
        let ALLOW_DATA_ATTR = true;
        let ALLOW_UNKNOWN_PROTOCOLS = false;
        let ALLOW_SELF_CLOSE_IN_ATTR = true;
        let SAFE_FOR_TEMPLATES = false;
        let SAFE_FOR_XML = true;
        let WHOLE_DOCUMENT = false;
        let SET_CONFIG = false;
        let FORCE_BODY = false;
        let RETURN_DOM = false;
        let RETURN_DOM_FRAGMENT = false;
        let RETURN_TRUSTED_TYPE = false;
        let SANITIZE_DOM = true;
        let SANITIZE_NAMED_PROPS = false;
        const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
        let KEEP_CONTENT = true;
        let IN_PLACE = false;
        let USE_PROFILES = {};
        let FORBID_CONTENTS = null;
        const DEFAULT_FORBID_CONTENTS = addToSet({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
        let DATA_URI_TAGS = null;
        const DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
        let URI_SAFE_ATTRIBUTES = null;
        const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
        const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
        const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
        const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
        let NAMESPACE = HTML_NAMESPACE;
        let IS_EMPTY_INPUT = false;
        let ALLOWED_NAMESPACES = null;
        const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
        let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ["mi", "mo", "mn", "ms", "mtext"]);
        let HTML_INTEGRATION_POINTS = addToSet({}, ["annotation-xml"]);
        const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
        let PARSER_MEDIA_TYPE = null;
        const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
        const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
        let transformCaseFunc = null;
        let CONFIG = null;
        const formElement = document2.createElement("form");
        const isRegexOrFunction = function isRegexOrFunction2(testValue) {
          return testValue instanceof RegExp || testValue instanceof Function;
        };
        const _parseConfig = function _parseConfig2() {
          let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          if (CONFIG && CONFIG === cfg) {
            return;
          }
          if (!cfg || typeof cfg !== "object") {
            cfg = {};
          }
          cfg = clone(cfg);
          PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
          SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
          transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
          ALLOWED_TAGS = objectHasOwnProperty(cfg, "ALLOWED_TAGS") ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
          ALLOWED_ATTR = objectHasOwnProperty(cfg, "ALLOWED_ATTR") ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
          ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, "ALLOWED_NAMESPACES") ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
          URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, "ADD_URI_SAFE_ATTR") ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
          DATA_URI_TAGS = objectHasOwnProperty(cfg, "ADD_DATA_URI_TAGS") ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
          FORBID_CONTENTS = objectHasOwnProperty(cfg, "FORBID_CONTENTS") ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
          FORBID_TAGS = objectHasOwnProperty(cfg, "FORBID_TAGS") ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
          FORBID_ATTR = objectHasOwnProperty(cfg, "FORBID_ATTR") ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
          USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES : false;
          ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
          ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
          ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
          ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
          SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
          SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
          WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
          RETURN_DOM = cfg.RETURN_DOM || false;
          RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
          RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
          FORCE_BODY = cfg.FORCE_BODY || false;
          SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
          SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
          KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
          IN_PLACE = cfg.IN_PLACE || false;
          IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
          NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
          MATHML_TEXT_INTEGRATION_POINTS = cfg.MATHML_TEXT_INTEGRATION_POINTS || MATHML_TEXT_INTEGRATION_POINTS;
          HTML_INTEGRATION_POINTS = cfg.HTML_INTEGRATION_POINTS || HTML_INTEGRATION_POINTS;
          CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
          if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
            CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
          }
          if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
            CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
          }
          if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") {
            CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
          }
          if (SAFE_FOR_TEMPLATES) {
            ALLOW_DATA_ATTR = false;
          }
          if (RETURN_DOM_FRAGMENT) {
            RETURN_DOM = true;
          }
          if (USE_PROFILES) {
            ALLOWED_TAGS = addToSet({}, text);
            ALLOWED_ATTR = [];
            if (USE_PROFILES.html === true) {
              addToSet(ALLOWED_TAGS, html$1);
              addToSet(ALLOWED_ATTR, html);
            }
            if (USE_PROFILES.svg === true) {
              addToSet(ALLOWED_TAGS, svg$1);
              addToSet(ALLOWED_ATTR, svg);
              addToSet(ALLOWED_ATTR, xml);
            }
            if (USE_PROFILES.svgFilters === true) {
              addToSet(ALLOWED_TAGS, svgFilters);
              addToSet(ALLOWED_ATTR, svg);
              addToSet(ALLOWED_ATTR, xml);
            }
            if (USE_PROFILES.mathMl === true) {
              addToSet(ALLOWED_TAGS, mathMl$1);
              addToSet(ALLOWED_ATTR, mathMl);
              addToSet(ALLOWED_ATTR, xml);
            }
          }
          if (cfg.ADD_TAGS) {
            if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
              ALLOWED_TAGS = clone(ALLOWED_TAGS);
            }
            addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
          }
          if (cfg.ADD_ATTR) {
            if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
              ALLOWED_ATTR = clone(ALLOWED_ATTR);
            }
            addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
          }
          if (cfg.ADD_URI_SAFE_ATTR) {
            addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
          }
          if (cfg.FORBID_CONTENTS) {
            if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
              FORBID_CONTENTS = clone(FORBID_CONTENTS);
            }
            addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
          }
          if (KEEP_CONTENT) {
            ALLOWED_TAGS["#text"] = true;
          }
          if (WHOLE_DOCUMENT) {
            addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
          }
          if (ALLOWED_TAGS.table) {
            addToSet(ALLOWED_TAGS, ["tbody"]);
            delete FORBID_TAGS.tbody;
          }
          if (cfg.TRUSTED_TYPES_POLICY) {
            if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") {
              throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
            }
            if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") {
              throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
            }
            trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
            emptyHTML = trustedTypesPolicy.createHTML("");
          } else {
            if (trustedTypesPolicy === void 0) {
              trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
            }
            if (trustedTypesPolicy !== null && typeof emptyHTML === "string") {
              emptyHTML = trustedTypesPolicy.createHTML("");
            }
          }
          if (freeze) {
            freeze(cfg);
          }
          CONFIG = cfg;
        };
        const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
        const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
        const _checkValidNamespace = function _checkValidNamespace2(element) {
          let parent = getParentNode(element);
          if (!parent || !parent.tagName) {
            parent = {
              namespaceURI: NAMESPACE,
              tagName: "template"
            };
          }
          const tagName = stringToLowerCase(element.tagName);
          const parentTagName = stringToLowerCase(parent.tagName);
          if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
            return false;
          }
          if (element.namespaceURI === SVG_NAMESPACE) {
            if (parent.namespaceURI === HTML_NAMESPACE) {
              return tagName === "svg";
            }
            if (parent.namespaceURI === MATHML_NAMESPACE) {
              return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
            }
            return Boolean(ALL_SVG_TAGS[tagName]);
          }
          if (element.namespaceURI === MATHML_NAMESPACE) {
            if (parent.namespaceURI === HTML_NAMESPACE) {
              return tagName === "math";
            }
            if (parent.namespaceURI === SVG_NAMESPACE) {
              return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
            }
            return Boolean(ALL_MATHML_TAGS[tagName]);
          }
          if (element.namespaceURI === HTML_NAMESPACE) {
            if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
              return false;
            }
            if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
              return false;
            }
            return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
          }
          if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) {
            return true;
          }
          return false;
        };
        const _forceRemove = function _forceRemove2(node) {
          arrayPush(DOMPurify.removed, {
            element: node
          });
          try {
            getParentNode(node).removeChild(node);
          } catch (_) {
            remove(node);
          }
        };
        const _removeAttribute = function _removeAttribute2(name, element) {
          try {
            arrayPush(DOMPurify.removed, {
              attribute: element.getAttributeNode(name),
              from: element
            });
          } catch (_) {
            arrayPush(DOMPurify.removed, {
              attribute: null,
              from: element
            });
          }
          element.removeAttribute(name);
          if (name === "is") {
            if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
              try {
                _forceRemove(element);
              } catch (_) {
              }
            } else {
              try {
                element.setAttribute(name, "");
              } catch (_) {
              }
            }
          }
        };
        const _initDocument = function _initDocument2(dirty) {
          let doc = null;
          let leadingWhitespace = null;
          if (FORCE_BODY) {
            dirty = "<remove></remove>" + dirty;
          } else {
            const matches = stringMatch(dirty, /^[\r\n\t ]+/);
            leadingWhitespace = matches && matches[0];
          }
          if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) {
            dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
          }
          const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
          if (NAMESPACE === HTML_NAMESPACE) {
            try {
              doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
            } catch (_) {
            }
          }
          if (!doc || !doc.documentElement) {
            doc = implementation.createDocument(NAMESPACE, "template", null);
            try {
              doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
            } catch (_) {
            }
          }
          const body = doc.body || doc.documentElement;
          if (dirty && leadingWhitespace) {
            body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
          }
          if (NAMESPACE === HTML_NAMESPACE) {
            return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
          }
          return WHOLE_DOCUMENT ? doc.documentElement : body;
        };
        const _createNodeIterator = function _createNodeIterator2(root) {
          return createNodeIterator.call(
            root.ownerDocument || root,
            root,
            // eslint-disable-next-line no-bitwise
            NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION,
            null
          );
        };
        const _isClobbered = function _isClobbered2(element) {
          return element instanceof HTMLFormElement && (typeof element.nodeName !== "string" || typeof element.textContent !== "string" || typeof element.removeChild !== "function" || !(element.attributes instanceof NamedNodeMap) || typeof element.removeAttribute !== "function" || typeof element.setAttribute !== "function" || typeof element.namespaceURI !== "string" || typeof element.insertBefore !== "function" || typeof element.hasChildNodes !== "function");
        };
        const _isNode = function _isNode2(value) {
          return typeof Node === "function" && value instanceof Node;
        };
        function _executeHooks(hooks2, currentNode, data) {
          arrayForEach(hooks2, (hook) => {
            hook.call(DOMPurify, currentNode, data, CONFIG);
          });
        }
        const _sanitizeElements = function _sanitizeElements2(currentNode) {
          let content = null;
          _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
          if (_isClobbered(currentNode)) {
            _forceRemove(currentNode);
            return true;
          }
          const tagName = transformCaseFunc(currentNode.nodeName);
          _executeHooks(hooks.uponSanitizeElement, currentNode, {
            tagName,
            allowedTags: ALLOWED_TAGS
          });
          if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
            _forceRemove(currentNode);
            return true;
          }
          if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
            _forceRemove(currentNode);
            return true;
          }
          if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
            _forceRemove(currentNode);
            return true;
          }
          if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
            if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
              if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
                return false;
              }
              if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
                return false;
              }
            }
            if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
              const parentNode = getParentNode(currentNode) || currentNode.parentNode;
              const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
              if (childNodes && parentNode) {
                const childCount = childNodes.length;
                for (let i = childCount - 1; i >= 0; --i) {
                  const childClone = cloneNode(childNodes[i], true);
                  childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
                  parentNode.insertBefore(childClone, getNextSibling(currentNode));
                }
              }
            }
            _forceRemove(currentNode);
            return true;
          }
          if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
            _forceRemove(currentNode);
            return true;
          }
          if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
            _forceRemove(currentNode);
            return true;
          }
          if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
            content = currentNode.textContent;
            arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
              content = stringReplace(content, expr, " ");
            });
            if (currentNode.textContent !== content) {
              arrayPush(DOMPurify.removed, {
                element: currentNode.cloneNode()
              });
              currentNode.textContent = content;
            }
          }
          _executeHooks(hooks.afterSanitizeElements, currentNode, null);
          return false;
        };
        const _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
          if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
            return false;
          }
          if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR2, lcName)) ;
          else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR2, lcName)) ;
          else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))
            ) ;
            else {
              return false;
            }
          } else if (URI_SAFE_ATTRIBUTES[lcName]) ;
          else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
          else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]) ;
          else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA2, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
          else if (value) {
            return false;
          } else ;
          return true;
        };
        const _isBasicCustomElement = function _isBasicCustomElement2(tagName) {
          return tagName !== "annotation-xml" && stringMatch(tagName, CUSTOM_ELEMENT2);
        };
        const _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
          _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
          const {
            attributes
          } = currentNode;
          if (!attributes || _isClobbered(currentNode)) {
            return;
          }
          const hookEvent = {
            attrName: "",
            attrValue: "",
            keepAttr: true,
            allowedAttributes: ALLOWED_ATTR,
            forceKeepAttr: void 0
          };
          let l = attributes.length;
          while (l--) {
            const attr = attributes[l];
            const {
              name,
              namespaceURI,
              value: attrValue
            } = attr;
            const lcName = transformCaseFunc(name);
            let value = name === "value" ? attrValue : stringTrim(attrValue);
            hookEvent.attrName = lcName;
            hookEvent.attrValue = value;
            hookEvent.keepAttr = true;
            hookEvent.forceKeepAttr = void 0;
            _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
            value = hookEvent.attrValue;
            if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name")) {
              _removeAttribute(name, currentNode);
              value = SANITIZE_NAMED_PROPS_PREFIX + value;
            }
            if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|title)/i, value)) {
              _removeAttribute(name, currentNode);
              continue;
            }
            if (hookEvent.forceKeepAttr) {
              continue;
            }
            _removeAttribute(name, currentNode);
            if (!hookEvent.keepAttr) {
              continue;
            }
            if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
              _removeAttribute(name, currentNode);
              continue;
            }
            if (SAFE_FOR_TEMPLATES) {
              arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
                value = stringReplace(value, expr, " ");
              });
            }
            const lcTag = transformCaseFunc(currentNode.nodeName);
            if (!_isValidAttribute(lcTag, lcName, value)) {
              continue;
            }
            if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function") {
              if (namespaceURI) ;
              else {
                switch (trustedTypes.getAttributeType(lcTag, lcName)) {
                  case "TrustedHTML": {
                    value = trustedTypesPolicy.createHTML(value);
                    break;
                  }
                  case "TrustedScriptURL": {
                    value = trustedTypesPolicy.createScriptURL(value);
                    break;
                  }
                }
              }
            }
            try {
              if (namespaceURI) {
                currentNode.setAttributeNS(namespaceURI, name, value);
              } else {
                currentNode.setAttribute(name, value);
              }
              if (_isClobbered(currentNode)) {
                _forceRemove(currentNode);
              } else {
                arrayPop(DOMPurify.removed);
              }
            } catch (_) {
            }
          }
          _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
        };
        const _sanitizeShadowDOM = function _sanitizeShadowDOM2(fragment) {
          let shadowNode = null;
          const shadowIterator = _createNodeIterator(fragment);
          _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
          while (shadowNode = shadowIterator.nextNode()) {
            _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
            _sanitizeElements(shadowNode);
            _sanitizeAttributes(shadowNode);
            if (shadowNode.content instanceof DocumentFragment) {
              _sanitizeShadowDOM2(shadowNode.content);
            }
          }
          _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
        };
        DOMPurify.sanitize = function(dirty) {
          let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          let body = null;
          let importedNode = null;
          let currentNode = null;
          let returnNode = null;
          IS_EMPTY_INPUT = !dirty;
          if (IS_EMPTY_INPUT) {
            dirty = "<!-->";
          }
          if (typeof dirty !== "string" && !_isNode(dirty)) {
            if (typeof dirty.toString === "function") {
              dirty = dirty.toString();
              if (typeof dirty !== "string") {
                throw typeErrorCreate("dirty is not a string, aborting");
              }
            } else {
              throw typeErrorCreate("toString is not a function");
            }
          }
          if (!DOMPurify.isSupported) {
            return dirty;
          }
          if (!SET_CONFIG) {
            _parseConfig(cfg);
          }
          DOMPurify.removed = [];
          if (typeof dirty === "string") {
            IN_PLACE = false;
          }
          if (IN_PLACE) {
            if (dirty.nodeName) {
              const tagName = transformCaseFunc(dirty.nodeName);
              if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
                throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
              }
            }
          } else if (dirty instanceof Node) {
            body = _initDocument("<!---->");
            importedNode = body.ownerDocument.importNode(dirty, true);
            if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") {
              body = importedNode;
            } else if (importedNode.nodeName === "HTML") {
              body = importedNode;
            } else {
              body.appendChild(importedNode);
            }
          } else {
            if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
            dirty.indexOf("<") === -1) {
              return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
            }
            body = _initDocument(dirty);
            if (!body) {
              return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
            }
          }
          if (body && FORCE_BODY) {
            _forceRemove(body.firstChild);
          }
          const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
          while (currentNode = nodeIterator.nextNode()) {
            _sanitizeElements(currentNode);
            _sanitizeAttributes(currentNode);
            if (currentNode.content instanceof DocumentFragment) {
              _sanitizeShadowDOM(currentNode.content);
            }
          }
          if (IN_PLACE) {
            return dirty;
          }
          if (RETURN_DOM) {
            if (RETURN_DOM_FRAGMENT) {
              returnNode = createDocumentFragment.call(body.ownerDocument);
              while (body.firstChild) {
                returnNode.appendChild(body.firstChild);
              }
            } else {
              returnNode = body;
            }
            if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
              returnNode = importNode.call(originalDocument, returnNode, true);
            }
            return returnNode;
          }
          let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
          if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
            serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
          }
          if (SAFE_FOR_TEMPLATES) {
            arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
              serializedHTML = stringReplace(serializedHTML, expr, " ");
            });
          }
          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
        };
        DOMPurify.setConfig = function() {
          let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          _parseConfig(cfg);
          SET_CONFIG = true;
        };
        DOMPurify.clearConfig = function() {
          CONFIG = null;
          SET_CONFIG = false;
        };
        DOMPurify.isValidAttribute = function(tag, attr, value) {
          if (!CONFIG) {
            _parseConfig({});
          }
          const lcTag = transformCaseFunc(tag);
          const lcName = transformCaseFunc(attr);
          return _isValidAttribute(lcTag, lcName, value);
        };
        DOMPurify.addHook = function(entryPoint, hookFunction) {
          if (typeof hookFunction !== "function") {
            return;
          }
          arrayPush(hooks[entryPoint], hookFunction);
        };
        DOMPurify.removeHook = function(entryPoint, hookFunction) {
          if (hookFunction !== void 0) {
            const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
            return index === -1 ? void 0 : arraySplice(hooks[entryPoint], index, 1)[0];
          }
          return arrayPop(hooks[entryPoint]);
        };
        DOMPurify.removeHooks = function(entryPoint) {
          hooks[entryPoint] = [];
        };
        DOMPurify.removeAllHooks = function() {
          hooks = _createHooksMap();
        };
        return DOMPurify;
      }
      var purify = createDOMPurify();
      module.exports = purify;
    }
  });

  // DamonUtils.js
  var require_DamonUtils = __commonJS({
    "DamonUtils.js"(exports, module) {
      var DOMPurify = require_purify_cjs();
      module.exports = class DamonUtils {
        //# MODEL
        constructor(damon) {
          let $ = this;
          $.damon = damon;
          $.websiteRegex = /^(https?:\/\/)?[-a-zA-Z0-9]*[a-zA-Z0-9]+(\.[-a-zA-Z0-9]*[a-zA-Z0-9]+)+/;
          $.httpRegex = /^https?:\/\//;
        }
        /**
         * @param {string} damonString
         * @returns {string}
         */
        damonToSExpression(damonString) {
          const $ = this;
          return $.implicitMapToSExpression($.damon.damonToMap(damonString));
        }
        /**
         * @param {string} string
         * @returns {string}
         */
        escape(string) {
          return string.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
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
        mapToHtmlList(jsonMap, safeHTML = false, jsonContext = void 0) {
          let $ = this;
          try {
            $.damon.mapToJSON(jsonMap);
          } catch (error) {
            console.log(error);
            throw new Error("Provided map value doesn't passes JSON.parse()");
          }
          var jsonItemIndex = 0, list = document.createElement("ul"), schema;
          if (jsonContext !== void 0) {
            schema = JSON.parse(jsonContext);
          }
          list.className = "DAMON-List";
          recurse2(jsonMap, list);
          return list;
          function recurse2(jsonMap2, listItem) {
            if (typeof listItem !== "object" || listItem == null || Array.isArray(listItem)) {
              throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
            }
            if (typeof jsonMap2 === "object" && jsonMap2 !== null && !Array.isArray(jsonMap2) && jsonMap2 instanceof Map && jsonMap2.constructor === Map) {
              if (listItem.tagName == "UL") {
                for (const [key, value] of jsonMap2) {
                  let newList = document.createElement("ul"), newDiv = document.createElement("code"), keySpan = document.createElement("span"), newListItem = document.createElement("li");
                  keySpan.className = "type-key";
                  if ($.websiteRegex.test(key)) {
                    let fullUrl = key;
                    if (!$.httpRegex.test(key))
                      fullUrl = "https://" + key;
                    let keyLink = DOMPurify.sanitize(`<a href="${fullUrl}">${fullUrl}</a>`);
                    keySpan.innerHTML = keyLink;
                  } else {
                    if (jsonContext !== void 0 && key in schema["@context"]) {
                      keySpan.innerHTML = DOMPurify.sanitize(`<a href="${schema["@context"][key]["@id"]}">${key}</a>`);
                    } else {
                      keySpan.textContent = key;
                    }
                  }
                  if (typeof value === "object" && value !== null) {
                    if (Array.isArray(value)) {
                      if (jsonMap2.damonInlineArrays !== void 0 && jsonMap2.damonInlineArrays.indexOf(key) > -1) {
                        newDiv.innerHTML = keySpan.outerHTML + ": [";
                        for (let j = 0, k = value.length; j < k; j++) {
                          let childValueSpan = document.createElement("span"), childValue = value[j];
                          if (childValue === true) {
                            childValueSpan.textContent = "true";
                            childValueSpan.className = "type-boolean";
                          } else if (childValue === false) {
                            childValueSpan.textContent = "false";
                            childValueSpan.className = "type-boolean";
                          } else if (childValue === null) {
                            childValueSpan.textContent = "null";
                            childValueSpan.className = "type-null";
                          } else if (Number.isFinite(childValue) && !Number.isNaN(childValue)) {
                            childValueSpan.textContent = childValue + "";
                            childValueSpan.className = "type-number";
                          } else {
                            if (safeHTML) {
                              if ($.websiteRegex.test(childValue)) {
                                let fullUrl = childValue;
                                if (!$.httpRegex.test(childValue))
                                  fullUrl = "https://" + childValue;
                                childValueSpan.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                              } else {
                                childValueSpan.innerHTML = `"${childValue}"`;
                              }
                            } else {
                              if ($.websiteRegex.test(childValue)) {
                                let fullUrl = childValue;
                                if (!$.httpRegex.test(childValue))
                                  fullUrl = "https://" + childValue;
                                childValueSpan.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                              } else {
                                childValueSpan.textContent = `"${childValue}"`;
                              }
                            }
                            childValueSpan.className = "type-string";
                          }
                          if (j !== 0) {
                            newDiv.innerHTML += ", ";
                          }
                          newDiv.appendChild(childValueSpan);
                        }
                        newDiv.innerHTML += "]";
                        newListItem.appendChild(newDiv);
                        newListItem.appendChild(newList);
                        listItem.appendChild(newListItem);
                      } else {
                        newDiv.innerHTML = keySpan.outerHTML + ": []";
                        newListItem.appendChild(newDiv);
                        newListItem.appendChild(newList);
                        listItem.appendChild(newListItem);
                        recurse2(value, newList);
                      }
                    } else {
                      if (jsonMap2.implicitMaps !== void 0 && jsonMap2.implicitMaps.indexOf(key) > -1) {
                        newDiv.innerHTML = keySpan.outerHTML;
                      } else {
                        newDiv.innerHTML = keySpan.outerHTML + ": {}";
                      }
                      newListItem.appendChild(newDiv);
                      newListItem.appendChild(newList);
                      listItem.appendChild(newListItem);
                      recurse2(value, newList);
                    }
                  } else {
                    jsonItemIndex++;
                    newDiv.innerHTML = keySpan.outerHTML + ": ";
                    let valueSpan2 = document.createElement("span");
                    let childText = value;
                    if (childText === true) {
                      valueSpan2.textContent = "true";
                      valueSpan2.className = "type-boolean";
                    } else if (childText === false) {
                      valueSpan2.textContent = "false";
                      valueSpan2.className = "type-boolean";
                    } else if (childText === null) {
                      valueSpan2.textContent = "null";
                      valueSpan2.className = "type-null";
                    } else if (Number.isFinite(childText) && !Number.isNaN(childText)) {
                      valueSpan2.textContent = childText + "";
                      valueSpan2.className = "type-number";
                    } else {
                      if (safeHTML) {
                        if ($.websiteRegex.test(childText)) {
                          let fullUrl = childText;
                          if (!$.httpRegex.test(childText))
                            fullUrl = "https://" + childText;
                          valueSpan2.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                        } else {
                          valueSpan2.innerHTML = `"${childText}"`;
                        }
                      } else {
                        if ($.websiteRegex.test(childText)) {
                          let fullUrl = childText;
                          if (!$.httpRegex.test(childText))
                            fullUrl = "https://" + childText;
                          valueSpan2.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                        } else {
                          valueSpan2.textContent = `"${childText}"`;
                        }
                      }
                      valueSpan2.className = "type-string";
                    }
                    if (jsonMap2.implicitNulls === void 0 || jsonMap2.implicitNulls.indexOf(key) == -1) {
                      newDiv.appendChild(valueSpan2);
                    } else {
                      newDiv.innerHTML = newDiv.innerHTML.slice(0, -2);
                    }
                    newListItem.appendChild(newDiv);
                    listItem.appendChild(newListItem);
                  }
                }
              }
            } else if (Array.isArray(jsonMap2)) {
              for (var i = 0, c = jsonMap2.length; i < c; i++) {
                let newList = document.createElement("ul"), newDiv = document.createElement("code"), newListItem = document.createElement("li");
                if (typeof jsonMap2[i] === "object" && jsonMap2[i] !== null) {
                  if (Array.isArray(jsonMap2[i])) {
                    if (jsonMap2.damonInlineArrays !== void 0 && jsonMap2.damonInlineArrays.indexOf(i) > -1) {
                      newDiv.innerHTML += "[";
                      for (let j = 0, k = jsonMap2[i].length; j < k; j++) {
                        let valueSpan2 = document.createElement("span"), value = jsonMap2[i][j];
                        if (value === true) {
                          valueSpan2.textContent = "true";
                          valueSpan2.className = "type-boolean";
                        } else if (value === false) {
                          valueSpan2.textContent = "false";
                          valueSpan2.className = "type-boolean";
                        } else if (value === null) {
                          valueSpan2.textContent = "null";
                          valueSpan2.className = "type-null";
                        } else if (Number.isFinite(value) && !Number.isNaN(value)) {
                          valueSpan2.textContent = value + "";
                          valueSpan2.className = "type-number";
                        } else {
                          if (safeHTML) {
                            if ($.websiteRegex.test(value)) {
                              let fullUrl = value;
                              if (!$.httpRegex.test(value))
                                fullUrl = "https://" + value;
                              valueSpan2.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                            } else {
                              valueSpan2.innerHTML = `"${value}"`;
                            }
                          } else {
                            if ($.websiteRegex.test(value)) {
                              let fullUrl = value;
                              if (!$.httpRegex.test(value))
                                fullUrl = "https://" + value;
                              valueSpan2.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                            } else {
                              valueSpan2.textContent = `"${value}"`;
                            }
                          }
                          valueSpan2.className = "type-string";
                        }
                        if (j !== 0) {
                          newDiv.innerHTML += ", ";
                        }
                        newDiv.appendChild(valueSpan2);
                      }
                      newDiv.innerHTML += "]";
                      newListItem.appendChild(newDiv);
                      newListItem.appendChild(newList);
                      listItem.appendChild(newListItem);
                    } else {
                      newDiv.textContent = "[]";
                      newListItem.appendChild(newDiv);
                      newListItem.appendChild(newList);
                      listItem.appendChild(newListItem);
                      recurse2(jsonMap2[i], newList);
                    }
                  } else {
                    newDiv.textContent = "{}";
                    newListItem.appendChild(newDiv);
                    newListItem.appendChild(newList);
                    listItem.appendChild(newListItem);
                    recurse2(jsonMap2[i], newList);
                  }
                } else {
                  jsonItemIndex++;
                  let childText = jsonMap2[i];
                  if (childText === true) {
                    newDiv.textContent = "true";
                    newDiv.className = "type-boolean";
                  } else if (childText === false) {
                    newDiv.textContent = "false";
                    newDiv.className = "type-boolean";
                  } else if (childText === null) {
                    newDiv.textContent = "null";
                    newDiv.className = "type-null";
                  } else if (Number.isFinite(childText) && !Number.isNaN(childText)) {
                    newDiv.textContent = childText + "";
                    newDiv.className = "type-number";
                  } else {
                    if (safeHTML) {
                      if ($.websiteRegex.test(childText)) {
                        let fullUrl = childText;
                        if (!$.httpRegex.test(childText))
                          fullUrl = "https://" + childText;
                        newDiv.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                      } else {
                        newDiv.innerHTML = `"${childText}"`;
                      }
                    } else {
                      if ($.websiteRegex.test(childText)) {
                        let fullUrl = childText;
                        if (!$.httpRegex.test(childText))
                          fullUrl = "https://" + childText;
                        newDiv.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
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
          try {
            $.damon.mapToJSON(jsonMap);
          } catch (error) {
            throw new Error("Provided map value doesn't passes JSON.parse()");
          }
          var jsonItemIndex = 0, table = document.createElement("table"), tHead = document.createElement("thead"), tBody = document.createElement("tbody"), headingsEncountered = false, columnsLength = 0;
          table.className = "DAMON-Table";
          if (typeof jsonMap !== "object" || jsonMap == null || Array.isArray(jsonMap) || !(jsonMap instanceof Map) || jsonMap.constructor !== Map) {
            throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
          }
          for (const [key, value] of jsonMap) {
            if (typeof value === "object" && value !== null && !Array.isArray(value) && value instanceof Map && value.constructor === Map) {
              if (key == "0" && !headingsEncountered) {
                let row = document.createElement("tr");
                columnsLength = value.length;
                for (const [childKey, childValue] of value) {
                  if (childValue === null) {
                    let headerCell = document.createElement("th");
                    if (safeHTML) {
                      if ($.websiteRegex.test(childKey)) {
                        headerCell.innerHTML = DOMPurify.sanitize(`<a href="${childKey}">${childKey}</a>`);
                      } else {
                        headerCell.innerHTML = `${childKey}`;
                      }
                    } else {
                      if ($.websiteRegex.test(childKey)) {
                        headerCell.innerHTML = DOMPurify.sanitize(`<a href="${childKey}">${childKey}</a>`);
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
                  throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
                }
                let row = document.createElement("tr");
                for (const [childKey, childValue] of value) {
                  if (childValue === null) {
                    let dataCell = document.createElement("td");
                    if (safeHTML) {
                      if ($.websiteRegex.test(childKey)) {
                        dataCell.innerHTML = DOMPurify.sanitize(`<a href="${childKey}">${childKey}</a>`);
                      } else {
                        dataCell.innerHTML = `${childKey}`;
                      }
                    } else {
                      if ($.websiteRegex.test(childKey)) {
                        dataCell.innerHTML = DOMPurify.sanitize(`<a href="${childKey}">${childKey}</a>`);
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
            } else if (typeof value !== "object" && key == "00") {
              let caption = document.createElement("caption");
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
          try {
            $.damon.mapToJSON(jsonMap);
          } catch (error) {
            throw new Error("Provided map value doesn't passes JSON.parse()");
          }
          var jsonItemIndex = 0, expectedDepth = 0, table = document.createElement("table"), tHead = document.createElement("thead"), tBody = document.createElement("tbody"), headingsEncountered = false;
          table.className = "DAMON-LeavesToTable";
          if (typeof jsonMap !== "object" || jsonMap == null || Array.isArray(jsonMap) || !(jsonMap instanceof Map) || jsonMap.constructor !== Map) {
            throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
          }
          for (const [key, value] of jsonMap) {
            if (typeof value === "object" && !Array.isArray(value)) {
              if (key == "head" && !headingsEncountered) {
                try {
                  recurse2(value, tHead);
                } catch (e) {
                  return;
                }
                headingsEncountered = true;
              } else if (key == "body") {
                try {
                  recurse2(value, tBody);
                } catch (e) {
                  return;
                }
              }
            } else if (typeof value !== "object" && key == "caption") {
              let caption = document.createElement("caption");
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
          function recurse2(jsonMap2, tableSubContainer, level = 0, line = []) {
            if (typeof tableSubContainer !== "object" || tableSubContainer == null) {
              throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
            }
            if (typeof jsonMap2 === "object" && jsonMap2 !== null && !Array.isArray(jsonMap2) && jsonMap2 instanceof Map && jsonMap2.constructor === Map) {
              if (tableSubContainer.tagName == "THEAD") {
                if (Array.from(jsonMap2.keys()).length == 1) {
                  if (typeof jsonMap2.get(Array.from(jsonMap2.keys())[0]) === "object" && jsonMap2.get(Array.from(jsonMap2.keys())[0]) !== null) {
                    jsonItemIndex++;
                    recurse2(
                      jsonMap2.get(Array.from(jsonMap2.keys())[0]),
                      tableSubContainer,
                      level + 1,
                      line.concat([Array.from(jsonMap2.keys())[0]])
                    );
                  } else {
                    throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
                  }
                } else {
                  throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
                }
              } else if (tableSubContainer.tagName == "TBODY") {
                if (Array.from(jsonMap2.keys()).length == 0) {
                  throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
                }
                for (const [key, value] of jsonMap2) {
                  if (typeof value === "object" && value !== null) {
                    jsonItemIndex++;
                    recurse2(value, tableSubContainer, level + 1, line.concat([key]));
                  } else {
                    throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
                  }
                }
              }
            } else if (Array.isArray(jsonMap2)) {
              if (tableSubContainer.tagName == "THEAD") {
                if (jsonMap2.length == 1) {
                  jsonItemIndex++;
                  expectedDepth = level;
                  let tableRow = document.createElement("tr");
                  line.push(jsonMap2[0]);
                  for (let i = 0, c = line.length; i < c; i++) {
                    let headerCell = document.createElement("th");
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
              } else if (tableSubContainer.tagName == "TBODY") {
                if (level == expectedDepth) {
                  if (jsonMap2.length == 0) {
                    throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
                  }
                  for (let i = 0, c = jsonMap2.length; i < c; i++) {
                    jsonItemIndex++;
                    let tableRow = document.createElement("tr");
                    for (let z = 0, x = line.length; z < x; z++) {
                      let dataCell2 = document.createElement("td");
                      if (safeHTML) {
                        dataCell2.innerHTML = line[z];
                      } else {
                        dataCell2.textContent = line[z];
                      }
                      tableRow.appendChild(dataCell2);
                    }
                    let dataCell = document.createElement("td");
                    if (safeHTML) {
                      dataCell.innerHTML = jsonMap2[i];
                    } else {
                      dataCell.textContent = jsonMap2[i];
                    }
                    dataCell.textContent = jsonMap2[i];
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
          if (list.firstElementChild.textContent == "{}") {
            return $._mapToJSON(recurse2(list, /* @__PURE__ */ new Map()));
          } else if (list.firstElementChild.textContent == "[]") {
            return $._mapToJSON(recurse2(list, []));
          }
          function recurse2(list2, jsonMap) {
            if (typeof list2 !== "object" || list2 == null || Array.isArray(list2)) {
              throw new Error("Error List Item number " + listItemIndex + ": @param { {} } list");
            }
            if (typeof jsonMap === "object" && jsonMap !== null && !Array.isArray(jsonMap) && jsonMap instanceof Map && jsonMap.constructor === Map) {
              for (let i = 0, c = list2.children.length; i < c; i++) {
                listItemIndex++;
                if (list2.children[i].tagName == "LI") {
                  if (list2.children[i].firstElementChild.tagName == "CODE") {
                    if (list2.children[i].firstElementChild.innerHTML.length) {
                      let text = list2.children[i].firstElementChild.innerHTML.trim();
                      if (text[text.length - 1] == ":" && text.length > 1) {
                        let secondGrandChild = list2.children[i].children[1];
                        if (secondGrandChild.tagName == "UL" && secondGrandChild.firstElementChild.tagName == "LI" && secondGrandChild.children.length == 1 && secondGrandChild.firstElementChild.firstElementChild.tagName == "CODE") {
                          listItemIndex++;
                          let childText = secondGrandChild.firstElementChild.firstElementChild.textContent.trim();
                          if (childText == "true") {
                            jsonMap.set(text.slice(0, -1), true);
                          } else if (childText == "false") {
                            jsonMap.set(text.slice(0, -1), false);
                          } else if (childText == "null") {
                            jsonMap.set(text.slice(0, -1), null);
                          } else if (isFinite(childText) && !isNaN(parseFloat(childText))) {
                            jsonMap.set(text.slice(0, -1), childText * 1);
                          } else {
                            jsonMap.set(text.slice(0, -1), childText);
                          }
                        } else {
                          throw new Error(
                            "Error List Item number " + listItemIndex + ": not DAMON-compliant."
                          );
                        }
                      } else if (text[text.length - 4] == ":" && text.length > 4) {
                        if (text.slice(-3) == " []") {
                          jsonMap.set(text.slice(0, -4), []);
                          if (list2.children[i].children[1].tagName == "UL") {
                            recurse2(list2.children[i].children[1], jsonMap.get(text.slice(0, -4)));
                          } else {
                            throw new Error(
                              "Error List Item number " + listItemIndex + ": not DAMON-compliant."
                            );
                          }
                        } else if (text.slice(-3) == " {}") {
                          jsonMap.set(text.slice(0, -4), /* @__PURE__ */ new Map());
                          if (list2.children[i].children[1].tagName == "UL") {
                            recurse2(list2.children[i].children[1], jsonMap.get(text.slice(0, -4)));
                          } else {
                            throw new Error(
                              "Error List Item number " + listItemIndex + ": not DAMON-compliant."
                            );
                          }
                        }
                      } else {
                        throw new Error(
                          "Error List Item number " + listItemIndex + ": map items need a key"
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
              for (let i = 0, c = list2.children.length; i < c; i++) {
                listItemIndex++;
                if (list2.children[i].tagName == "LI") {
                  if (list2.children[i].firstElementChild.tagName == "CODE") {
                    if (list2.children[i].firstElementChild.innerHTML.length) {
                      let text = list2.children[i].firstElementChild.innerHTML.trim();
                      if (text[text.length - 1] == ":" && text.length > 1) {
                        throw new Error(
                          "Error List Item number " + listItemIndex + ": lists can't have keys."
                        );
                      } else if (text[text.length - 4] == ":" && text.length > 4) {
                        throw new Error(
                          "Error List Item number " + listItemIndex + ": not DAMON-compliant."
                        );
                      } else {
                        if (text == "[]") {
                          jsonMap.push([]);
                          if (list2.children[i].children[1] && list2.children[i].children[1].tagName == "UL") {
                            recurse2(list2.children[i].children[1], jsonMap[jsonMap.length - 1]);
                          } else {
                            throw new Error(
                              "Error List Item number " + listItemIndex + ": not DAMON-compliant."
                            );
                          }
                        } else if (text == "{}") {
                          jsonMap.push({});
                          if (list2.children[i].children[1] && list2.children[i].children[1].tagName == "UL") {
                            recurse2(list2.children[i].children[1], jsonMap[jsonMap.length - 1]);
                          } else {
                            throw new Error(
                              "Error List Item number " + listItemIndex + ": not DAMON-compliant."
                            );
                          }
                        } else if (text == "true") {
                          jsonMap.push(true);
                        } else if (text == "false") {
                          jsonMap.push(false);
                        } else if (text == "null") {
                          jsonMap.push(null);
                        } else if (isFinite(text) && !isNaN(parseFloat(text))) {
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
          if (typeof jsonMap === "object" && jsonMap !== null && jsonMap instanceof Map && jsonMap.constructor === Map) {
            list += "[\r\n";
            _recurse(jsonMap);
            list += "]";
            JSON.parse(list);
            return list;
          } else {
            if (typeof jsonMap == "string") {
              jsonMap = '"' + jsonMap + '"';
            }
            JSON.parse(jsonMap);
            return jsonMap;
          }
          function _recurse(jsonMap2, level = 1) {
            if (typeof jsonMap2 === "object" && jsonMap2 !== null && !Array.isArray(jsonMap2) && jsonMap2 instanceof Map && jsonMap2.constructor === Map) {
              let i2 = -1;
              for (const [key, value] of jsonMap2) {
                i2++;
                if (typeof value === "object" && value !== null) {
                  if (Array.isArray(value)) {
                    if (value.length > 0) {
                      list += "    ".repeat(level) + `${JSON.stringify(key)}, [\r
`;
                      _recurse(value, level + 1);
                      list += "    ".repeat(level) + `]`;
                    } else {
                      list += "    ".repeat(level) + `${JSON.stringify(key)}, []`;
                    }
                  } else {
                    if (Array.from(value.keys()).length > 0) {
                      if (level == 1) {
                        if (i2 == 0) {
                          list = "";
                        } else {
                          throw new Error("Multiple S-Expression roots");
                        }
                      }
                      list += "    ".repeat(level) + `[${JSON.stringify(key)}, \r
`;
                      _recurse(value, level + 1);
                      if (level != 1) {
                        list += "    ".repeat(level) + `]`;
                      }
                    } else {
                      list += "    ".repeat(level) + `${JSON.stringify(key)}, []`;
                    }
                  }
                } else {
                  if (value === true) {
                    throw new Error("Booleans require quotes");
                  } else if (value === false) {
                    throw new Error("Booleans require quotes");
                  } else if (value === null) {
                    list += "    ".repeat(level) + `${JSON.stringify(key)}`;
                  } else if (Number.isFinite(value) && !Number.isNaN(value)) {
                    list += "    ".repeat(level) + `${JSON.stringify(key)}, ` + value;
                  } else {
                    list += "    ".repeat(level) + `${JSON.stringify(key)}, "${value}"`;
                  }
                }
                if (key != Array.from(jsonMap2.keys())[Array.from(jsonMap2.keys()).length - 1]) {
                  list += ",\r\n";
                } else {
                  list += "\r\n";
                }
              }
            } else if (Array.isArray(jsonMap2)) {
              for (var i = 0, c = jsonMap2.length; i < c; i++) {
                if (typeof jsonMap2[i] === "object" && jsonMap2[i] !== null) {
                  if (Array.isArray(jsonMap2[i])) {
                    if (jsonMap2[i].length > 0) {
                      list += "    ".repeat(level) + `[\r
`;
                      _recurse(jsonMap2[i], level + 1);
                      list += "    ".repeat(level) + `]`;
                    } else {
                      list += "    ".repeat(level) + `[]`;
                    }
                  } else {
                    if (Array.from(jsonMap2[i].keys()).length > 0) {
                      list += "    ".repeat(level) + `[\r
`;
                      _recurse(jsonMap2[i], level + 1);
                      list += "    ".repeat(level) + `]`;
                    } else {
                      list += "    ".repeat(level) + `[]`;
                    }
                  }
                } else {
                  if (jsonMap2[i] === true) {
                    throw new Error("Booleans require quotes");
                  } else if (jsonMap2[i] === false) {
                    throw new Error("Booleans require quotes");
                  } else if (jsonMap2[i] === null) {
                    throw new Error("Array-nulls require quotes");
                  } else if (Number.isFinite(jsonMap2[i]) && !Number.isNaN(jsonMap2[i])) {
                    list += "    ".repeat(level) + jsonMap2[i];
                  } else {
                    list += "    ".repeat(level) + JSON.stringify(jsonMap2[i]);
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
         * @param {string} damonString
         * @returns {Array<Array<string|number>>} pathsList
         */
        getPathsList(damonString) {
          const $ = this;
          let damonMap = $.damon.damonToMap(damonString), pathsList = [];
          _walkAndPushPaths(damonMap);
          return pathsList;
          function _walkAndPushPaths(map, currentPath = []) {
            if (typeof map === "object" && map !== null && !Array.isArray(map) && map instanceof Map && map.constructor === Map) {
              for (const [key, value] of map) {
                if (typeof value === "object" && value !== null && !Array.isArray(value) && value instanceof Map && value.constructor === Map && Array.from(value.keys()).length) {
                  pathsList.push(currentPath.concat(key));
                  _walkAndPushPaths(value, currentPath.concat([key]));
                } else if (Array.isArray(value) && (map.damonInlineArrays == void 0 || map.damonInlineArrays.indexOf(key) === -1) && value.length) {
                  pathsList.push(currentPath.concat(key));
                  _walkAndPushPaths(value, currentPath.concat([key]));
                } else {
                  pathsList.push(currentPath.concat(key).concat(value));
                }
              }
            } else {
              for (let i = 0, c = map.length; i < c; i++) {
                if (typeof map[i] === "object" && map[i] !== null && !Array.isArray(map[i]) && map[i] instanceof Map && map[i].constructor === Map && Array.from(map[i].keys()).length) {
                  pathsList.push(currentPath.concat(i));
                  _walkAndPushPaths(map[i], currentPath.concat([i]));
                } else if (Array.isArray(map[i]) && (map.damonInlineArrays == void 0 || map.damonInlineArrays.indexOf(i) === -1) && map[i].length) {
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
         * @param {string} damonString
         * @return {string} mathJs
         */
        damonToMathJs(damonString) {
          const $ = this;
          let mathJs = "", damonMap = $.damon.damonToMap(damonString);
          if (Array.isArray(damonMap)) {
            mathJs += "(\r\n";
            _recurse(damonMap);
            mathJs += ")";
            return mathJs;
          } else if (typeof damonMap === "object" && damonMap !== null && damonMap instanceof Map && damonMap.constructor === Map) {
            mathJs += "(\r\n";
            _recurse(damonMap);
            mathJs += ")";
            return mathJs;
          } else {
            if (typeof damonMap == "string") {
              damonMap = JSON.stringify(damonMap);
            }
            JSON.parse(damonMap);
            return damonMap;
          }
          function _minusculize(string) {
            return string[0].toLowerCase + string.slice(1);
          }
          function _recurse(damonMap2, level = 1) {
            if (typeof damonMap2 === "object" && damonMap2 !== null && !Array.isArray(damonMap2) && damonMap2 instanceof Map && damonMap2.constructor === Map) {
              for (const [key, value] of damonMap2) {
                if (typeof value === "object" && value !== null) {
                  if (Array.isArray(value)) {
                    if (value.length > 0) {
                      mathJs += "    ".repeat(level) + `"${JSON.stringify(_minusculize(key))}"(\r
`;
                      _recurse(value, level + 1);
                      mathJs += "    ".repeat(level) + `)`;
                    } else {
                      mathJs += "    ".repeat(level) + `"${JSON.stringify(_minusculize(key))}"()`;
                    }
                  } else {
                    if (Array.from(value.keys()).length > 0) {
                      mathJs += "    ".repeat(level) + `"${JSON.stringify(_minusculize(key))}"(\r
`;
                      _recurse(value, level + 1);
                      mathJs += "    ".repeat(level) + `)`;
                    } else {
                      mathJs += "    ".repeat(level) + `"${JSON.stringify(_minusculize(key))}"()`;
                    }
                  }
                } else {
                  if (value === true) {
                    mathJs += "    ".repeat(level) + `"${JSON.stringify(_minusculize(key))}"(true)`;
                  } else if (value === false) {
                    mathJs += "    ".repeat(level) + `"${JSON.stringify(_minusculize(key))}"(false)`;
                  } else if (value === null) {
                    mathJs += "    ".repeat(level) + `"${JSON.stringify(_minusculize(key))}"(null)`;
                  } else if (Number.isFinite(value) && !Number.isNaN(value)) {
                    mathJs += "    ".repeat(level) + `"${JSON.stringify(_minusculize(key))}"(` + value + ")";
                  } else {
                    mathJs += "    ".repeat(level) + `"${JSON.stringify(_minusculize(key))}"("` + JSON.stringify(value) + '")';
                  }
                }
                if (key != Array.from(damonMap2.keys())[Array.from(damonMap2.keys()).length - 1]) {
                  mathJs += ",\r\n";
                } else {
                  mathJs += "\r\n";
                }
              }
            } else if (Array.isArray(damonMap2)) {
              for (var i = 0, c = damonMap2.length; i < c; i++) {
                if (typeof damonMap2[i] === "object" && damonMap2[i] !== null) {
                  if (Array.isArray(damonMap2[i])) {
                    if (damonMap2[i].length > 0) {
                      if (damonMap2.damonInlineArrays !== void 0 && damonMap2.damonInlineArrays.indexOf(i) > -1) {
                        mathJs += "    ".repeat(level) + JSON.stringify(damonMap2[i]);
                      } else {
                        mathJs += "    ".repeat(level) + `(\r
`;
                        _recurse(damonMap2[i], level + 1);
                        mathJs += "    ".repeat(level) + `)`;
                      }
                    } else {
                      mathJs += "    ".repeat(level) + `()`;
                    }
                  } else {
                    if (Array.from(damonMap2[i].keys()).length > 0) {
                      mathJs += "    ".repeat(level) + `(\r
`;
                      _recurse(damonMap2[i], level + 1);
                      mathJs += "    ".repeat(level) + `)`;
                    } else {
                      mathJs += "    ".repeat(level) + `()`;
                    }
                  }
                } else {
                  if (damonMap2[i] === true) {
                    mathJs += "    ".repeat(level) + "true";
                  } else if (damonMap2[i] === false) {
                    mathJs += "    ".repeat(level) + "false";
                  } else if (damonMap2[i] === null) {
                    mathJs += "    ".repeat(level) + "null";
                  } else if (Number.isFinite(damonMap2[i]) && !Number.isNaN(damonMap2[i])) {
                    mathJs += "    ".repeat(level) + damonMap2[i];
                  } else {
                    mathJs += "    ".repeat(level) + `"${JSON.stringify(_minusculize(damonMap2[i]))}"`;
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
        _mapsDiff(firstMap, secondMap) {
          let $ = this;
          try {
            $.damon.mapToJSON(firstMap);
            $.damon.mapToJSON(secondMap);
          } catch (error) {
            throw new Error("Provided map value doesn't passes JSON.parse()");
          }
          if (typeof firstMap !== typeof secondMap || typeof firstMap === "object" && firstMap !== null && !Array.isArray(firstMap) && firstMap instanceof Map && firstMap.constructor === Map && (secondMap == null || Array.isArray(secondMap) || !(secondMap instanceof Map) || secondMap.constructor !== Map)) {
            throw new Error("Different root types.");
          }
          var diffMap;
          if (typeof firstMap === "object" && firstMap !== null && !Array.isArray(firstMap) && firstMap instanceof Map && firstMap.constructor === Map) {
            diffMap = /* @__PURE__ */ new Map();
            _walkAndDiff(firstMap);
            return diffMap;
          } else if (Array.isArray(firstMap)) {
            diffMap = [];
            _walkAndDiff(firstMap);
            return diffMap;
          }
          function _walkAndDiff(map, currentPath = []) {
            if (typeof map === "object" && map !== null && !Array.isArray(map) && map instanceof Map && map.constructor === Map) {
              let secondMapKey = "", secondMapValue = null, secondMapCurrentFractal = secondMap;
              for (let i = 0, c = currentPath.length; i < c; i++) {
                if (typeof secondMapCurrentFractal === "object" && secondMapCurrentFractal !== null && !Array.isArray(secondMapCurrentFractal) && secondMapCurrentFractal instanceof Map && secondMapCurrentFractal.constructor === Map) {
                  secondMapCurrentFractal = secondMapCurrentFractal.get(Array.from(secondMapCurrentFractal.keys())[currentPath[i]]);
                } else {
                  secondMapCurrentFractal = secondMapCurrentFractal[currentPath[i]];
                }
              }
              let diffMapCurrentFractal = diffMap;
              for (let i = 0, c = currentPath.length; i < c; i++) {
                if (typeof diffMapCurrentFractal === "object" && diffMapCurrentFractal !== null && !Array.isArray(diffMapCurrentFractal) && diffMapCurrentFractal instanceof Map && diffMapCurrentFractal.constructor === Map && Array.from(diffMapCurrentFractal.keys()).length) {
                  diffMapCurrentFractal = diffMapCurrentFractal.get(Array.from(diffMapCurrentFractal.keys())[currentPath[i]]);
                } else {
                  diffMapCurrentFractal = diffMapCurrentFractal[currentPath[i]];
                }
              }
              let index = 0;
              for (const [key, value] of map) {
                if (index > Array.from(secondMapCurrentFractal.keys()).length - 1) {
                  if (typeof value === "object" && value !== null && !Array.isArray(value) && value instanceof Map && value.constructor === Map) {
                    if (Array.from(secondMapCurrentFractal.keys()).indexOf(key) !== -1 && (typeof secondMapCurrentFractal.get(key) === "object" && secondMapCurrentFractal.get(key) !== null && !Array.isArray(secondMapCurrentFractal.get(key)) && secondMapCurrentFractal.get(key) instanceof Map && secondMapCurrentFractal.get(key).constructor === Map)) {
                      diffMapCurrentFractal.set(index + "-yellow", null);
                    } else {
                      diffMapCurrentFractal.set(index + "-red", null);
                    }
                  } else if (Array.isArray(value)) {
                    if (Array.from(secondMapCurrentFractal.keys()).indexOf(key) !== -1 && Array.isArray(secondMapCurrentFractal.get(key))) {
                      diffMapCurrentFractal.set(index + "-yellow", null);
                    } else {
                      diffMapCurrentFractal.set(index + "-red", null);
                    }
                  } else {
                    if (Array.from(secondMapCurrentFractal.keys()).indexOf(key) !== -1 && value === secondMapCurrentFractal.get(key)) {
                      diffMapCurrentFractal.set(index + "-yellow", null);
                    } else {
                      diffMapCurrentFractal.set(index + "-red", null);
                    }
                  }
                } else {
                  secondMapKey = Array.from(secondMapCurrentFractal.keys())[index];
                  secondMapValue = secondMapCurrentFractal.get(secondMapKey);
                  if (typeof value === "object" && value !== null && !Array.isArray(value) && value instanceof Map && value.constructor === Map) {
                    if (typeof secondMapValue === "object" && secondMapValue !== null && !Array.isArray(secondMapValue) && secondMapValue instanceof Map && secondMapValue.constructor === Map) {
                      if (key === secondMapKey) {
                        diffMapCurrentFractal.set(index + "-green", /* @__PURE__ */ new Map());
                        if (Array.from(value.keys()).length > 0) {
                          _walkAndDiff(value, currentPath.concat([index]));
                        }
                      } else if (Array.from(secondMapCurrentFractal.keys()).indexOf(key) !== -1 && (typeof secondMapCurrentFractal.get(key) === "object" && secondMapCurrentFractal.get(key) !== null && !Array.isArray(secondMapCurrentFractal.get(key)) && secondMapCurrentFractal.get(key) instanceof Map && secondMapCurrentFractal.get(key).constructor === Map)) {
                        diffMapCurrentFractal.set(index + "-yellow", null);
                      } else {
                        diffMapCurrentFractal.set(index + "-red", null);
                      }
                    } else {
                      diffMapCurrentFractal.set(index + "-red", null);
                    }
                  } else if (Array.isArray(value)) {
                    if (Array.isArray(secondMapValue)) {
                      if (key === secondMapKey) {
                        diffMapCurrentFractal.set(index + "-green", []);
                        if (value.length > 0) {
                          _walkAndDiff(value, currentPath.concat([index]));
                        }
                      } else if (Array.from(secondMapCurrentFractal.keys()).indexOf(key) !== -1 && Array.isArray(secondMapCurrentFractal.get(key))) {
                        diffMapCurrentFractal.set(index + "-yellow", null);
                      } else {
                        diffMapCurrentFractal.set(index + "-red", null);
                      }
                    } else {
                      diffMapCurrentFractal.set(index + "-red", null);
                    }
                  } else {
                    if (value === secondMapValue) {
                      if (key === secondMapKey) {
                        diffMapCurrentFractal.set(index + "-green", "green");
                      } else if (Array.from(secondMapCurrentFractal.keys()).indexOf(key) !== -1 && value === secondMapCurrentFractal.get(key)) {
                        diffMapCurrentFractal.set(index + "-yellow", null);
                      } else {
                        diffMapCurrentFractal.set(index + "-red", null);
                      }
                    } else {
                      diffMapCurrentFractal.set(index + "-red", null);
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
                  if (typeof value === "object" && value !== null && !Array.isArray(value) && value instanceof Map && value.constructor === Map) {
                    if (Array.from(map.keys()).indexOf(key) !== -1 && (typeof map.get(key) === "object" && map.get(key) !== null && !Array.isArray(map.get(key)) && map.get(key) instanceof Map && map.get(key).constructor === Map)) {
                      diffMapCurrentFractal.set(index + "-yellow", null);
                    } else {
                      diffMapCurrentFractal.set(index + "-red", null);
                    }
                  } else if (Array.isArray(value)) {
                    if (Array.from(map.keys()).indexOf(key) !== -1 && Array.isArray(map.get(key))) {
                      diffMapCurrentFractal.set(index + "-yellow", null);
                    } else {
                      diffMapCurrentFractal.set(index + "-red", null);
                    }
                  } else {
                    if (Array.from(map.keys()).indexOf(key) !== -1 && value === map.get(key)) {
                      diffMapCurrentFractal.set(index + "-yellow", null);
                    } else {
                      diffMapCurrentFractal.set(index + "-red", null);
                    }
                  }
                  secondMapIndex++;
                }
              }
            } else {
              let secondMapValue = null, secondMapCurrentFractal = secondMap;
              for (let z = 0, x = currentPath.length; z < x; z++) {
                if (typeof secondMapCurrentFractal === "object" && secondMapCurrentFractal !== null && !Array.isArray(secondMapCurrentFractal) && secondMapCurrentFractal instanceof Map && secondMapCurrentFractal.constructor === Map && Array.from(secondMapCurrentFractal.keys()).length) {
                  secondMapCurrentFractal = secondMapCurrentFractal.get(Array.from(secondMapCurrentFractal.keys())[currentPath[z]]);
                } else {
                  secondMapCurrentFractal = secondMapCurrentFractal[currentPath[z]];
                }
              }
              let diffMapCurrentFractal = diffMap;
              for (let i = 0, c = currentPath.length; i < c; i++) {
                if (typeof diffMapCurrentFractal === "object" && diffMapCurrentFractal !== null && !Array.isArray(diffMapCurrentFractal) && diffMapCurrentFractal instanceof Map && diffMapCurrentFractal.constructor === Map && Array.from(diffMapCurrentFractal.keys()).length) {
                  diffMapCurrentFractal = diffMapCurrentFractal.get(Array.from(diffMapCurrentFractal.keys())[currentPath[i]]);
                } else {
                  diffMapCurrentFractal = diffMapCurrentFractal[currentPath[i]];
                }
              }
              for (let i = 0, c = map.length; i < c; i++) {
                if (i > secondMapCurrentFractal.length - 1) {
                  diffMapCurrentFractal[i] = "red";
                } else {
                  secondMapValue = secondMapCurrentFractal[i];
                  if (typeof map[i] === "object" && map[i] !== null && !Array.isArray(map[i]) && map[i] instanceof Map && map[i].constructor === Map) {
                    if (typeof secondMapValue === "object" && secondMapValue !== null && !Array.isArray(secondMapValue) && secondMapValue instanceof Map && secondMapValue.constructor === Map) {
                      diffMapCurrentFractal[i] = /* @__PURE__ */ new Map();
                      if (Array.from(map[i].keys()).length > 0) {
                        _walkAndDiff(map[i], currentPath.concat([i]));
                      }
                    } else {
                      diffMapCurrentFractal[i] = "red";
                    }
                  } else if (Array.isArray(map[i])) {
                    if (Array.isArray(secondMapValue)) {
                      diffMapCurrentFractal[i] = [];
                      if (map[i].length > 0) {
                        _walkAndDiff(map[i], currentPath.concat([i]));
                      }
                    } else {
                      diffMapCurrentFractal[i] = "red";
                    }
                  } else {
                    if (map[i] === secondMapValue) {
                      diffMapCurrentFractal[i] = "green";
                    } else {
                      diffMapCurrentFractal[i] = "red";
                    }
                  }
                }
              }
              if (map.length < secondMapCurrentFractal.length) {
                for (let i = 0, c = secondMapCurrentFractal.length; i < c; i++) {
                  if (i <= map.length - 1) {
                    continue;
                  }
                  diffMapCurrentFractal[i] = "red";
                }
              }
            }
          }
        }
        /**
         * @param {*} firstMap
         * @param {*} secondMap
         * @returns {Map} outputMap
         */
        sortMap(firstMap, secondMap) {
          let $ = this, firstMapKeys = Array.from(firstMap.keys()), secondMapKeys = Array.from(secondMap.keys()), outputMap = /* @__PURE__ */ new Map();
          for (let i = 0, c = firstMapKeys.length; i < c; i++) {
            if (secondMap.get(firstMapKeys[i]) !== void 0) {
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
         * @param {*} firstMap
         * @param {*} secondMap
         * @returns {string} list
         */
        renderDiff(firstMap, secondMap, safeHTML = false) {
          let $ = this, diff = document.createElement("div"), legend = document.createElement("div"), list = document.createElement("ul"), diffMap = $._mapsDiff(firstMap, secondMap);
          diff.className = "DAMON-Diff";
          legend.className = "DAMON-Diff-legend";
          list.className = "DAMON-List";
          legend.innerHTML = '<span id="damonDiffRed"><span>Red</span>: Difference</span>; <span id="damonDiffBlue"><span>Blue</span>: Addition</span>; <span id="damonDiffGreen"><span>Green</span>: Displacement</span>';
          recurseDiffMap(diffMap, list);
          diff.appendChild(legend);
          diff.appendChild(list);
          return diff;
          function recurseDiffMap(diffMap2, list2, path = [], color = "green") {
            if (color === "green") {
              if (typeof list2 !== "object" || list2 == null || Array.isArray(list2)) {
                throw new Error("Error List Item " + path.concat("-") + ": @param { {} } list");
              }
              if (typeof diffMap2 === "object" && diffMap2 !== null && !Array.isArray(diffMap2) && diffMap2 instanceof Map && diffMap2.constructor === Map) {
                if (list2.tagName == "UL") {
                  let firstMapKey = "", firstMapValue = null, firstMapCurrentFractal = firstMap;
                  for (let i2 = 0, c2 = path.length; i2 < c2; i2++) {
                    if (typeof firstMapCurrentFractal === "object" && firstMapCurrentFractal !== null && !Array.isArray(firstMapCurrentFractal) && firstMapCurrentFractal instanceof Map && firstMapCurrentFractal.constructor === Map) {
                      firstMapCurrentFractal = firstMapCurrentFractal.get(Array.from(firstMapCurrentFractal.keys())[path[i2]]);
                    } else {
                      firstMapCurrentFractal = firstMapCurrentFractal[path[i2]];
                    }
                  }
                  let secondMapKey = "", secondMapValue = null, secondMapCurrentFractal = secondMap;
                  for (let i2 = 0, c2 = path.length; i2 < c2; i2++) {
                    if (typeof secondMapCurrentFractal === "object" && secondMapCurrentFractal !== null && !Array.isArray(secondMapCurrentFractal) && secondMapCurrentFractal instanceof Map && secondMapCurrentFractal.constructor === Map) {
                      secondMapCurrentFractal = secondMapCurrentFractal.get(Array.from(secondMapCurrentFractal.keys())[path[i2]]);
                    } else {
                      secondMapCurrentFractal = secondMapCurrentFractal[path[i2]];
                    }
                  }
                  let index = 0;
                  for (let [key, value] of diffMap2) {
                    let diffMapKeyColor = Array.from(diffMap2.keys())[index].split("-")[1], diffMapValue = diffMap2.get(Array.from(diffMap2.keys())[index]);
                    let newList = document.createElement("ul"), newDiv = document.createElement("code"), keySpan = document.createElement("span"), newListItem = document.createElement("li");
                    keySpan.className = "type-key";
                    newListItem.className = diffMapKeyColor + "-diff";
                    if (newListItem.className === "red-diff" && index <= Array.from(firstMapCurrentFractal.keys()).length - 1) {
                      if (index > Array.from(secondMapCurrentFractal.keys()).length - 1) {
                        key = "";
                        value = "";
                      } else {
                        if (index > Array.from(firstMapCurrentFractal.keys()).length - 1) {
                          if (newListItem.className == "red-diff") {
                            newListItem.className = "blue-diff";
                            newListItem.setAttribute("aria-describedby", "damonDiffBlue");
                          } else {
                            newListItem.className = "green-diff";
                            newListItem.setAttribute("aria-describedby", "damonDiffGreen");
                          }
                        }
                        secondMapKey = Array.from(secondMapCurrentFractal.keys())[index];
                        secondMapValue = secondMapCurrentFractal.get(secondMapKey);
                        key = secondMapKey;
                        value = secondMapValue;
                      }
                    } else {
                      if (newListItem.className === "green-diff") {
                        newListItem.dataset.graphArbo = index;
                        if (path.length > 0)
                          newListItem.dataset.graphArbo = path.join("-") + "-" + index;
                        newListItem.className = "";
                      } else {
                        newListItem.className = "blue-diff";
                        newListItem.setAttribute("aria-describedby", "damonDiffBlue");
                      }
                      firstMapKey = Array.from(secondMapCurrentFractal.keys())[index];
                      firstMapValue = secondMapCurrentFractal.get(firstMapKey);
                      key = firstMapKey;
                      value = firstMapValue;
                    }
                    if (newListItem.className === "red-diff")
                      newListItem.setAttribute("aria-describedby", "damonDiffRed");
                    if ($.websiteRegex.test(key)) {
                      let fullUrl = key;
                      if (!$.httpRegex.test(key))
                        fullUrl = "https://" + key;
                      let keyLink = DOMPurify.sanitize(`<a href="${fullUrl}">${fullUrl}</a>`);
                      keySpan.innerHTML = keyLink;
                    } else {
                      keySpan.textContent = key;
                    }
                    if (typeof value === "object" && value !== null) {
                      if (Array.isArray(value)) {
                        if (firstMap.damonInlineArrays !== void 0 && firstMap.damonInlineArrays.indexOf(key) > -1) {
                          newDiv.innerHTML = keySpan.outerHTML + ": [";
                          for (let j = 0, k = value.length; j < k; j++) {
                            let childValueSpan = document.createElement("span"), childValue = value[j];
                            if (childValue === true) {
                              childValueSpan.textContent = "true";
                              childValueSpan.className = "type-boolean";
                            } else if (childValue === false) {
                              childValueSpan.textContent = "false";
                              childValueSpan.className = "type-boolean";
                            } else if (childValue === null) {
                              childValueSpan.textContent = "null";
                              childValueSpan.className = "type-null";
                            } else if (Number.isFinite(childValue) && !Number.isNaN(childValue)) {
                              childValueSpan.textContent = childValue + "";
                              childValueSpan.className = "type-number";
                            } else {
                              if (safeHTML) {
                                if ($.websiteRegex.test(childValue)) {
                                  let fullUrl = childValue;
                                  if (!$.httpRegex.test(childValue))
                                    fullUrl = "https://" + childValue;
                                  childValueSpan.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                                } else {
                                  childValueSpan.innerHTML = `"${childValue}"`;
                                }
                              } else {
                                if ($.websiteRegex.test(childValue)) {
                                  let fullUrl = childValue;
                                  if (!$.httpRegex.test(childValue))
                                    fullUrl = "https://" + childValue;
                                  childValueSpan.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                                } else {
                                  childValueSpan.textContent = `"${childValue}"`;
                                }
                              }
                              childValueSpan.className = "type-string";
                            }
                            if (j !== 0) {
                              newDiv.innerHTML += ", ";
                            }
                            newDiv.appendChild(childValueSpan);
                          }
                          newDiv.innerHTML += "]";
                          newListItem.appendChild(newDiv);
                          newListItem.appendChild(newList);
                          list2.appendChild(newListItem);
                        } else {
                          newDiv.innerHTML = keySpan.outerHTML + ": []";
                          newListItem.appendChild(newDiv);
                          newListItem.appendChild(newList);
                          list2.appendChild(newListItem);
                          if (diffMapKeyColor == "green") {
                            recurseDiffMap(diffMapValue, newList, path.concat([index]), diffMapKeyColor);
                          } else {
                            recurseDiffMap(diffMapValue, newList, path.concat([index]), diffMapKeyColor);
                          }
                        }
                      } else {
                        if (firstMap.implicitMaps !== void 0 && firstMap.implicitMaps.indexOf(key) > -1) {
                          newDiv.innerHTML = keySpan.outerHTML;
                        } else {
                          newDiv.innerHTML = keySpan.outerHTML + ": {}";
                        }
                        newListItem.appendChild(newDiv);
                        newListItem.appendChild(newList);
                        list2.appendChild(newListItem);
                        if (diffMapKeyColor == "green") {
                          recurseDiffMap(diffMapValue, newList, path.concat([index]), diffMapKeyColor);
                        } else {
                          recurseDiffMap(diffMapValue, newList, path.concat([index]), diffMapKeyColor);
                        }
                      }
                    } else {
                      newDiv.innerHTML = keySpan.outerHTML + ": ";
                      let valueSpan2 = document.createElement("span");
                      let childText = value;
                      if (childText === true) {
                        valueSpan2.textContent = "true";
                        valueSpan2.className = "type-boolean";
                      } else if (childText === false) {
                        valueSpan2.textContent = "false";
                        valueSpan2.className = "type-boolean";
                      } else if (childText === null) {
                        valueSpan2.textContent = "null";
                        valueSpan2.className = "type-null";
                      } else if (Number.isFinite(childText) && !Number.isNaN(childText)) {
                        valueSpan2.textContent = childText + "";
                        valueSpan2.className = "type-number";
                      } else {
                        if (safeHTML) {
                          if ($.websiteRegex.test(childText)) {
                            let fullUrl = childText;
                            if (!$.httpRegex.test(childText))
                              fullUrl = "https://" + childText;
                            valueSpan2.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                          } else {
                            valueSpan2.innerHTML = `"${childText}"`;
                          }
                        } else {
                          if ($.websiteRegex.test(childText)) {
                            let fullUrl = childText;
                            if (!$.httpRegex.test(childText))
                              fullUrl = "https://" + childText;
                            valueSpan2.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                          } else {
                            valueSpan2.textContent = `"${childText}"`;
                          }
                        }
                        valueSpan2.className = "type-string";
                      }
                      if (firstMap.implicitNulls === void 0 || firstMap.implicitNulls.indexOf(key) == -1) {
                        newDiv.appendChild(valueSpan2);
                      } else {
                        newDiv.innerHTML = newDiv.innerHTML.slice(0, -2);
                      }
                      newListItem.appendChild(newDiv);
                      list2.appendChild(newListItem);
                    }
                    index++;
                  }
                }
              } else if (Array.isArray(diffMap2)) {
                let firstMapValue = null, firstMapCurrentFractal = firstMap;
                for (let z = 0, x = path.length; z < x; z++) {
                  if (typeof firstMapCurrentFractal === "object" && firstMapCurrentFractal !== null && !Array.isArray(firstMapCurrentFractal) && firstMapCurrentFractal instanceof Map && firstMapCurrentFractal.constructor === Map && Array.from(firstMapCurrentFractal.keys()).length) {
                    firstMapCurrentFractal = firstMapCurrentFractal.get(Array.from(firstMapCurrentFractal.keys())[path[z]]);
                  } else {
                    firstMapCurrentFractal = firstMapCurrentFractal[path[z]];
                  }
                }
                let secondMapValue = null, secondMapCurrentFractal = secondMap;
                for (let z = 0, x = path.length; z < x; z++) {
                  if (typeof secondMapCurrentFractal === "object" && secondMapCurrentFractal !== null && !Array.isArray(secondMapCurrentFractal) && secondMapCurrentFractal instanceof Map && secondMapCurrentFractal.constructor === Map && Array.from(secondMapCurrentFractal.keys()).length) {
                    secondMapCurrentFractal = secondMapCurrentFractal.get(Array.from(secondMapCurrentFractal.keys())[path[z]]);
                  } else {
                    secondMapCurrentFractal = secondMapCurrentFractal[path[z]];
                  }
                }
                for (var i = 0, c = diffMap2.length; i < c; i++) {
                  let itemColor = diffMap2[i].split("-")[1];
                  let newList = document.createElement("ul"), newDiv = document.createElement("code"), newListItem = document.createElement("li"), value;
                  newListItem.className = diffMap2[i].split("-")[1] + "-diff";
                  if (newListItem.className === "red-diff" && i <= firstMapCurrentFractal.length - 1) {
                    if (i > secondMapCurrentFractal.length - 1) {
                      value = "";
                    } else {
                      if (i > firstMapCurrentFractal.length - 1) {
                        if (newListItem.className == "red-diff") {
                          newListItem.className = "blue-diff";
                          newListItem.setAttribute("aria-describedby", "damonDiffBlue");
                        } else {
                          newListItem.className = "green-diff";
                          newListItem.setAttribute("aria-describedby", "damonDiffGreen");
                        }
                      }
                      value = secondMapCurrentFractal[i];
                    }
                  } else {
                    if (newListItem.className === "green-diff") {
                      newListItem.dataset.graphArbo = i;
                      if (path.length > 0)
                        newListItem.dataset.graphArbo = path.join("-") + "-" + i;
                      newListItem.className = "";
                    } else {
                      newListItem.className = "blue-diff";
                      newListItem.setAttribute("aria-describedby", "damonDiffBlue");
                    }
                    value = firstMapCurrentFractal[i];
                  }
                  if (newListItem.className === "red-diff")
                    newListItem.setAttribute("aria-describedby", "damonDiffRed");
                  if (typeof value === "object" && value !== null) {
                    if (Array.isArray(value)) {
                      if (firstMap.damonInlineArrays !== void 0 && firstMap.damonInlineArrays.indexOf(i) > -1) {
                        newDiv.innerHTML += "[";
                        for (let j = 0, k = value.length; j < k; j++) {
                          let arrayValueSpan = document.createElement("span"), arrayValue = value[j];
                          if (arrayValue === true) {
                            arrayValueSpan.textContent = "true";
                            arrayValueSpan.className = "type-boolean";
                          } else if (arrayValue === false) {
                            arrayValueSpan.textContent = "false";
                            arrayValueSpan.className = "type-boolean";
                          } else if (arrayValue === null) {
                            arrayValueSpan.textContent = "null";
                            arrayValueSpan.className = "type-null";
                          } else if (Number.isFinite(arrayValue) && !Number.isNaN(arrayValue)) {
                            arrayValueSpan.textContent = arrayValue + "";
                            arrayValueSpan.className = "type-number";
                          } else {
                            if (safeHTML) {
                              if ($.websiteRegex.test(arrayValue)) {
                                let fullUrl = arrayValue;
                                if (!$.httpRegex.test(arrayValue))
                                  fullUrl = "https://" + arrayValue;
                                arrayValueSpan.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                              } else {
                                arrayValueSpan.innerHTML = `"${arrayValue}"`;
                              }
                            } else {
                              if ($.websiteRegex.test(arrayValue)) {
                                let fullUrl = arrayValue;
                                if (!$.httpRegex.test(arrayValue))
                                  fullUrl = "https://" + arrayValue;
                                arrayValueSpan.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                              } else {
                                arrayValueSpan.textContent = `"${arrayValue}"`;
                              }
                            }
                            arrayValueSpan.className = "type-string";
                          }
                          if (j !== 0) {
                            newDiv.innerHTML += ", ";
                          }
                          newDiv.appendChild(valueSpan);
                        }
                        newDiv.innerHTML += "]";
                        newListItem.appendChild(newDiv);
                        newListItem.appendChild(newList);
                        list2.appendChild(newListItem);
                      } else {
                        newDiv.textContent = "[]";
                        newListItem.appendChild(newDiv);
                        newListItem.appendChild(newList);
                        list2.appendChild(newListItem);
                        recurseDiffMap(value, newList, path.concat([i]), itemColor);
                      }
                    } else {
                      newDiv.textContent = "{}";
                      newListItem.appendChild(newDiv);
                      newListItem.appendChild(newList);
                      list2.appendChild(newListItem);
                      recurseDiffMap(value, newList, path.concat([i]), itemColor);
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
                    } else if (Number.isFinite(childText) && !Number.isNaN(childText)) {
                      newDiv.textContent = childText + "";
                      newDiv.className = "type-number";
                    } else {
                      if (safeHTML) {
                        if ($.websiteRegex.test(childText)) {
                          let fullUrl = childText;
                          if (!$.httpRegex.test(childText))
                            fullUrl = "https://" + childText;
                          newDiv.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                        } else {
                          newDiv.innerHTML = `"${childText}"`;
                        }
                      } else {
                        if ($.websiteRegex.test(childText)) {
                          let fullUrl = childText;
                          if (!$.httpRegex.test(childText))
                            fullUrl = "https://" + childText;
                          newDiv.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                        } else {
                          newDiv.textContent = `"${childText}"`;
                        }
                      }
                      newDiv.className = "type-string";
                    }
                    newListItem.appendChild(newDiv);
                    newListItem.appendChild(newList);
                    list2.appendChild(newListItem);
                  }
                }
              }
            } else if (["red", "yellow"].indexOf(color) > -1) {
              let secondMapKey = "", secondMapValue = null, secondMapCurrentFractal = secondMap;
              for (let i2 = 0, c2 = path.length; i2 < c2; i2++) {
                if (typeof secondMapCurrentFractal === "object" && secondMapCurrentFractal !== null && !Array.isArray(secondMapCurrentFractal) && secondMapCurrentFractal instanceof Map && secondMapCurrentFractal.constructor === Map) {
                  secondMapCurrentFractal = secondMapCurrentFractal.get(Array.from(secondMapCurrentFractal.keys())[path[i2]]);
                } else {
                  secondMapCurrentFractal = secondMapCurrentFractal[path[i2]];
                }
              }
              recurseSecondMap(secondMapCurrentFractal, list2, path, color);
            }
          }
          function recurseSecondMap(secondMap2, list2, path, color) {
            if (typeof list2 !== "object" || list2 == null || Array.isArray(list2)) {
              throw new Error("Error List Item " + path.concat("-") + ": @param { {} } list");
            }
            if (typeof secondMap2 === "object" && secondMap2 !== null && !Array.isArray(secondMap2) && secondMap2 instanceof Map && secondMap2.constructor === Map) {
              if (list2.tagName == "UL") {
                let index = 0;
                for (const [key, value] of secondMap2) {
                  let newList = document.createElement("ul"), newDiv = document.createElement("code"), keySpan = document.createElement("span"), newListItem = document.createElement("li");
                  keySpan.className = "type-key";
                  newListItem.className = "red-diff";
                  newListItem.setAttribute("aria-describedby", "damonDiffRed");
                  if ($.websiteRegex.test(key)) {
                    let fullUrl = key;
                    if (!$.httpRegex.test(key))
                      fullUrl = "https://" + key;
                    let keyLink = DOMPurify.sanitize(`<a href="${fullUrl}">${fullUrl}</a>`);
                    keySpan.innerHTML = keyLink;
                  } else {
                    keySpan.textContent = key;
                  }
                  if (typeof value === "object" && value !== null) {
                    if (Array.isArray(value)) {
                      if (secondMap2.damonInlineArrays !== void 0 && secondMap2.damonInlineArrays.indexOf(key) > -1) {
                        newDiv.innerHTML = keySpan.outerHTML + ": [";
                        for (let j = 0, k = value.length; j < k; j++) {
                          let childValueSpan = document.createElement("span"), childValue = value[j];
                          if (childValue === true) {
                            childValueSpan.textContent = "true";
                            childValueSpan.className = "type-boolean";
                          } else if (childValue === false) {
                            childValueSpan.textContent = "false";
                            childValueSpan.className = "type-boolean";
                          } else if (childValue === null) {
                            childValueSpan.textContent = "null";
                            childValueSpan.className = "type-null";
                          } else if (Number.isFinite(childValue) && !Number.isNaN(childValue)) {
                            childValueSpan.textContent = childValue + "";
                            childValueSpan.className = "type-number";
                          } else {
                            if (safeHTML) {
                              if ($.websiteRegex.test(childValue)) {
                                let fullUrl = childValue;
                                if (!$.httpRegex.test(childValue))
                                  fullUrl = "https://" + childValue;
                                childValueSpan.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                              } else {
                                childValueSpan.innerHTML = `"${childValue}"`;
                              }
                            } else {
                              if ($.websiteRegex.test(childValue)) {
                                let fullUrl = childValue;
                                if (!$.httpRegex.test(childValue))
                                  fullUrl = "https://" + childValue;
                                childValueSpan.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                              } else {
                                childValueSpan.textContent = `"${childValue}"`;
                              }
                            }
                            childValueSpan.className = "type-string";
                          }
                          if (j !== 0) {
                            newDiv.innerHTML += ", ";
                          }
                          newDiv.appendChild(childValueSpan);
                        }
                        newDiv.innerHTML += "]";
                        newListItem.appendChild(newDiv);
                        newListItem.appendChild(newList);
                        list2.appendChild(newListItem);
                      } else {
                        newDiv.innerHTML = keySpan.outerHTML + ": []";
                        newListItem.appendChild(newDiv);
                        newListItem.appendChild(newList);
                        list2.appendChild(newListItem);
                        recurse(value, newList, path.concat([index]), color);
                      }
                    } else {
                      if (secondMap2.implicitMaps !== void 0 && secondMap2.implicitMaps.indexOf(key) > -1) {
                        newDiv.innerHTML = keySpan.outerHTML;
                      } else {
                        newDiv.innerHTML = keySpan.outerHTML + ": {}";
                      }
                      newListItem.appendChild(newDiv);
                      newListItem.appendChild(newList);
                      list2.appendChild(newListItem);
                      recurseSecondMap(value, newList, path.concat([index]), color);
                    }
                  } else {
                    newDiv.innerHTML = keySpan.outerHTML + ": ";
                    let valueSpan2 = document.createElement("span");
                    let childText = value;
                    if (childText === true) {
                      valueSpan2.textContent = "true";
                      valueSpan2.className = "type-boolean";
                    } else if (childText === false) {
                      valueSpan2.textContent = "false";
                      valueSpan2.className = "type-boolean";
                    } else if (childText === null) {
                      valueSpan2.textContent = "null";
                      valueSpan2.className = "type-null";
                    } else if (Number.isFinite(childText) && !Number.isNaN(childText)) {
                      valueSpan2.textContent = childText + "";
                      valueSpan2.className = "type-number";
                    } else {
                      if (safeHTML) {
                        if ($.websiteRegex.test(childText)) {
                          let fullUrl = childText;
                          if (!$.httpRegex.test(childText))
                            fullUrl = "https://" + childText;
                          valueSpan2.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                        } else {
                          valueSpan2.innerHTML = `"${childText}"`;
                        }
                      } else {
                        if ($.websiteRegex.test(childText)) {
                          let fullUrl = childText;
                          if (!$.httpRegex.test(childText))
                            fullUrl = "https://" + childText;
                          valueSpan2.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                        } else {
                          valueSpan2.textContent = `"${childText}"`;
                        }
                      }
                      valueSpan2.className = "type-string";
                    }
                    if (secondMap2.implicitNulls === void 0 || secondMap2.implicitNulls.indexOf(key) == -1) {
                      newDiv.appendChild(valueSpan2);
                    } else {
                      newDiv.innerHTML = newDiv.innerHTML.slice(0, -2);
                    }
                    newListItem.appendChild(newDiv);
                    list2.appendChild(newListItem);
                  }
                  index++;
                }
              }
            } else if (Array.isArray(secondMap2)) {
              for (var i = 0, c = secondMap2.length; i < c; i++) {
                let newList = document.createElement("ul"), newDiv = document.createElement("code"), newListItem = document.createElement("li");
                newListItem.className = secondMap2[i] + "-diff";
                newListItem.setAttribute("aria-describedby", "damonDiffRed");
                if (typeof secondMap2[i] === "object" && secondMap2[i] !== null) {
                  if (Array.isArray(secondMap2[i])) {
                    if (secondMap2.damonInlineArrays !== void 0 && secondMap2.damonInlineArrays.indexOf(i) > -1) {
                      newDiv.innerHTML += "[";
                      for (let j = 0, k = secondMap2[i].length; j < k; j++) {
                        let valueSpan2 = document.createElement("span"), value = secondMap2[i][j];
                        if (value === true) {
                          valueSpan2.textContent = "true";
                          valueSpan2.className = "type-boolean";
                        } else if (value === false) {
                          valueSpan2.textContent = "false";
                          valueSpan2.className = "type-boolean";
                        } else if (value === null) {
                          valueSpan2.textContent = "null";
                          valueSpan2.className = "type-null";
                        } else if (Number.isFinite(value) && !Number.isNaN(value)) {
                          valueSpan2.textContent = value + "";
                          valueSpan2.className = "type-number";
                        } else {
                          if (safeHTML) {
                            if ($.websiteRegex.test(value)) {
                              let fullUrl = value;
                              if (!$.httpRegex.test(value))
                                fullUrl = "https://" + value;
                              valueSpan2.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                            } else {
                              valueSpan2.innerHTML = `"${value}"`;
                            }
                          } else {
                            if ($.websiteRegex.test(value)) {
                              let fullUrl = value;
                              if (!$.httpRegex.test(value))
                                fullUrl = "https://" + value;
                              valueSpan2.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                            } else {
                              valueSpan2.textContent = `"${value}"`;
                            }
                          }
                          valueSpan2.className = "type-string";
                        }
                        if (j !== 0) {
                          newDiv.innerHTML += ", ";
                        }
                        newDiv.appendChild(valueSpan2);
                      }
                      newDiv.innerHTML += "]";
                      newListItem.appendChild(newDiv);
                      newListItem.appendChild(newList);
                      list2.appendChild(newListItem);
                    } else {
                      newDiv.textContent = "[]";
                      newListItem.appendChild(newDiv);
                      newListItem.appendChild(newList);
                      list2.appendChild(newListItem);
                      recurseSecondMap(secondMap2[i], newList, path.concat([i]), color);
                    }
                  } else {
                    newDiv.textContent = "{}";
                    newListItem.appendChild(newDiv);
                    newListItem.appendChild(newList);
                    list2.appendChild(newListItem);
                    recurseSecondMap(secondMap2[i], newList, path.concat([i]), color);
                  }
                } else {
                  let childText = secondMap2[i];
                  if (childText === true) {
                    newDiv.textContent = "true";
                    newDiv.className = "type-boolean";
                  } else if (childText === false) {
                    newDiv.textContent = "false";
                    newDiv.className = "type-boolean";
                  } else if (childText === null) {
                    newDiv.textContent = "null";
                    newDiv.className = "type-null";
                  } else if (Number.isFinite(childText) && !Number.isNaN(childText)) {
                    newDiv.textContent = childText + "";
                    newDiv.className = "type-number";
                  } else {
                    if (safeHTML) {
                      if ($.websiteRegex.test(childText)) {
                        let fullUrl = childText;
                        if (!$.httpRegex.test(childText))
                          fullUrl = "https://" + childText;
                        newDiv.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                      } else {
                        newDiv.innerHTML = `"${childText}"`;
                      }
                    } else {
                      if ($.websiteRegex.test(childText)) {
                        let fullUrl = childText;
                        if (!$.httpRegex.test(childText))
                          fullUrl = "https://" + childText;
                        newDiv.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                      } else {
                        newDiv.textContent = `"${childText}"`;
                      }
                    }
                    newDiv.className = "type-string";
                  }
                  newListItem.appendChild(newDiv);
                  newListItem.appendChild(newList);
                  list2.appendChild(newListItem);
                }
              }
            }
          }
        }
        /**
         * @param {String} string
         * @returns
         */
        damonTableToCSV(string) {
          const $ = this;
          let map = $.damon.damonToMap(string), output = "";
          let index = 0;
          for (const [key, value] of map) {
            if (index === 0 && key === "00") {
              output += '"' + value + '"\n';
              index++;
              continue;
            }
            let valueKeys = Array.from(value.keys());
            for (let i = 0, c = valueKeys.length; i < c; i++) {
              output += '"' + valueKeys[i] + '"';
              if (i != c - 1) {
                output += ",";
              }
            }
            output += "\n";
            index++;
          }
          return output.slice(0, -1);
        }
        /**
         * @param {String} string
         * @returns
         */
        csvToDamonTable(string) {
          const $ = this;
          let lines = string.split("\n"), damonMap = /* @__PURE__ */ new Map();
          for (let i = 0, c = lines.length; i < c; i++) {
            let rowMap = /* @__PURE__ */ new Map();
            rowMap.implicitNulls = [];
            damonMap.set(i + "", rowMap);
            let lineValues = lines[i].split(",");
            for (let z = 0, x = lineValues.length; z < x; z++) {
              if (lineValues[z][0] === '"' && lineValues[z][lineValues[z].length - 1] === '"') {
                try {
                  damonMap.get(i + "").set(JSON.parse(lineValues[z]), null);
                  damonMap.get(i + "").implicitNulls.push(lineValues[z]);
                } catch (error) {
                  damonMap.get(i + "").set(
                    JSON.parse(JSON.stringify(lineValues[z].slice(1, -1))),
                    null
                  );
                  damonMap.get(i + "").implicitNulls.push(JSON.parse(JSON.stringify(lineValues[z].slice(1, -1))));
                }
              } else {
                try {
                  damonMap.get(i + "").set(JSON.parse(`"${lineValues[z]}"`), null);
                  damonMap.get(i + "").implicitNulls.push(`"${lineValues[z]}"`);
                } catch (error) {
                  damonMap.get(i + "").set(
                    JSON.parse(JSON.stringify(lineValues[z])),
                    null
                  );
                  damonMap.get(i + "").implicitNulls.push(JSON.stringify(lineValues[z]));
                }
              }
            }
          }
          return $.damon.mapToDamon(damonMap);
        }
        /**
         * @param {HTMLCollection} listItems
         */
        wrapListContentsForStyling(listItems) {
          let $ = this;
          for (let i = 0, c = listItems.length; i < c; i++) {
            let div = document.createElement("div");
            for (let z = listItems[i].childNodes.length - 1; z >= 0; z--) {
              if (listItems[i].childNodes[z].tagName && listItems[i].childNodes[z].tagName !== "UL" || listItems[i].childNodes[z].nodeType == 3 && listItems[i].childNodes[z].data != "\n" && listItems[i].childNodes[z].data != "\r\n") {
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
      };
    }
  });

  // main.js
  (function() {
    window.DamonUtils = require_DamonUtils();
  })();
})();
/*! Bundled license information:

dompurify/dist/purify.cjs.js:
  (*! @license DOMPurify 3.2.4 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.4/LICENSE *)
*/
//# sourceMappingURL=out.js.map
