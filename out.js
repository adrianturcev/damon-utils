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
        apply = function apply2(func, thisArg) {
          for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
          }
          return func.apply(thisArg, args);
        };
      }
      if (!construct) {
        construct = function construct2(Func) {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }
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
          if (thisArg instanceof RegExp) {
            thisArg.lastIndex = 0;
          }
          for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            args[_key3 - 1] = arguments[_key3];
          }
          return apply(func, thisArg, args);
        };
      }
      function unconstruct(Func) {
        return function() {
          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }
          return construct(Func, args);
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
      var html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
      var svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
      var svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
      var svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
      var mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]);
      var mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
      var text = freeze(["#text"]);
      var html = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]);
      var svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
      var mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
      var xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
      var MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
      var ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
      var TMPLIT_EXPR = seal(/\$\{[\w\W]*/gm);
      var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/);
      var ARIA_ATTR = seal(/^aria-[\-\w]+$/);
      var IS_ALLOWED_URI = seal(
        /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
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
        DOMPurify.version = "3.3.0";
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
        const EXTRA_ELEMENT_HANDLING = Object.seal(create(null, {
          tagCheck: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: null
          },
          attributeCheck: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: null
          }
        }));
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
          FORBID_TAGS = objectHasOwnProperty(cfg, "FORBID_TAGS") ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : clone({});
          FORBID_ATTR = objectHasOwnProperty(cfg, "FORBID_ATTR") ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : clone({});
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
            if (typeof cfg.ADD_TAGS === "function") {
              EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
            } else {
              if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
                ALLOWED_TAGS = clone(ALLOWED_TAGS);
              }
              addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
            }
          }
          if (cfg.ADD_ATTR) {
            if (typeof cfg.ADD_ATTR === "function") {
              EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
            } else {
              if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
                ALLOWED_ATTR = clone(ALLOWED_ATTR);
              }
              addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
            }
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
          if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w!]/g, currentNode.innerHTML) && regExpTest(/<[/\w!]/g, currentNode.textContent)) {
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
          if (!(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName])) {
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
          else if (EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag)) ;
          else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName, lcTag)) || // Alternative, second condition checks if it's an `is`-attribute, AND
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
            const initValue = attrValue;
            let value = name === "value" ? initValue : stringTrim(initValue);
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
            if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|title|textarea)/i, value)) {
              _removeAttribute(name, currentNode);
              continue;
            }
            if (lcName === "attributename" && stringMatch(value, "href")) {
              _removeAttribute(name, currentNode);
              continue;
            }
            if (hookEvent.forceKeepAttr) {
              continue;
            }
            if (!hookEvent.keepAttr) {
              _removeAttribute(name, currentNode);
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
              _removeAttribute(name, currentNode);
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
            if (value !== initValue) {
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
                _removeAttribute(name, currentNode);
              }
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

  // node_modules/papaparse/papaparse.min.js
  var require_papaparse_min = __commonJS({
    "node_modules/papaparse/papaparse.min.js"(exports, module) {
      ((e, t) => {
        "function" == typeof define && define.amd ? define([], t) : "object" == typeof module && "undefined" != typeof exports ? module.exports = t() : e.Papa = t();
      })(exports, function r() {
        var n = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : {};
        var d, s = !n.document && !!n.postMessage, a = n.IS_PAPA_WORKER || false, o = {}, h = 0, v = {};
        function u(e) {
          this._handle = null, this._finished = false, this._completed = false, this._halted = false, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = true, this._completeResults = { data: [], errors: [], meta: {} }, function(e2) {
            var t = b(e2);
            t.chunkSize = parseInt(t.chunkSize), e2.step || e2.chunk || (t.chunkSize = null);
            this._handle = new i(t), (this._handle.streamer = this)._config = t;
          }.call(this, e), this.parseChunk = function(t, e2) {
            var i2 = parseInt(this._config.skipFirstNLines) || 0;
            if (this.isFirstChunk && 0 < i2) {
              let e3 = this._config.newline;
              e3 || (r2 = this._config.quoteChar || '"', e3 = this._handle.guessLineEndings(t, r2)), t = [...t.split(e3).slice(i2)].join(e3);
            }
            this.isFirstChunk && U(this._config.beforeFirstChunk) && void 0 !== (r2 = this._config.beforeFirstChunk(t)) && (t = r2), this.isFirstChunk = false, this._halted = false;
            var i2 = this._partialLine + t, r2 = (this._partialLine = "", this._handle.parse(i2, this._baseIndex, !this._finished));
            if (!this._handle.paused() && !this._handle.aborted()) {
              t = r2.meta.cursor, i2 = (this._finished || (this._partialLine = i2.substring(t - this._baseIndex), this._baseIndex = t), r2 && r2.data && (this._rowCount += r2.data.length), this._finished || this._config.preview && this._rowCount >= this._config.preview);
              if (a) n.postMessage({ results: r2, workerId: v.WORKER_ID, finished: i2 });
              else if (U(this._config.chunk) && !e2) {
                if (this._config.chunk(r2, this._handle), this._handle.paused() || this._handle.aborted()) return void (this._halted = true);
                this._completeResults = r2 = void 0;
              }
              return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(r2.data), this._completeResults.errors = this._completeResults.errors.concat(r2.errors), this._completeResults.meta = r2.meta), this._completed || !i2 || !U(this._config.complete) || r2 && r2.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = true), i2 || r2 && r2.meta.paused || this._nextChunk(), r2;
            }
            this._halted = true;
          }, this._sendError = function(e2) {
            U(this._config.error) ? this._config.error(e2) : a && this._config.error && n.postMessage({ workerId: v.WORKER_ID, error: e2, finished: false });
          };
        }
        function f(e) {
          var r2;
          (e = e || {}).chunkSize || (e.chunkSize = v.RemoteChunkSize), u.call(this, e), this._nextChunk = s ? function() {
            this._readChunk(), this._chunkLoaded();
          } : function() {
            this._readChunk();
          }, this.stream = function(e2) {
            this._input = e2, this._nextChunk();
          }, this._readChunk = function() {
            if (this._finished) this._chunkLoaded();
            else {
              if (r2 = new XMLHttpRequest(), this._config.withCredentials && (r2.withCredentials = this._config.withCredentials), s || (r2.onload = y(this._chunkLoaded, this), r2.onerror = y(this._chunkError, this)), r2.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !s), this._config.downloadRequestHeaders) {
                var e2, t = this._config.downloadRequestHeaders;
                for (e2 in t) r2.setRequestHeader(e2, t[e2]);
              }
              var i2;
              this._config.chunkSize && (i2 = this._start + this._config.chunkSize - 1, r2.setRequestHeader("Range", "bytes=" + this._start + "-" + i2));
              try {
                r2.send(this._config.downloadRequestBody);
              } catch (e3) {
                this._chunkError(e3.message);
              }
              s && 0 === r2.status && this._chunkError();
            }
          }, this._chunkLoaded = function() {
            4 === r2.readyState && (r2.status < 200 || 400 <= r2.status ? this._chunkError() : (this._start += this._config.chunkSize || r2.responseText.length, this._finished = !this._config.chunkSize || this._start >= ((e2) => null !== (e2 = e2.getResponseHeader("Content-Range")) ? parseInt(e2.substring(e2.lastIndexOf("/") + 1)) : -1)(r2), this.parseChunk(r2.responseText)));
          }, this._chunkError = function(e2) {
            e2 = r2.statusText || e2;
            this._sendError(new Error(e2));
          };
        }
        function l(e) {
          (e = e || {}).chunkSize || (e.chunkSize = v.LocalChunkSize), u.call(this, e);
          var i2, r2, n2 = "undefined" != typeof FileReader;
          this.stream = function(e2) {
            this._input = e2, r2 = e2.slice || e2.webkitSlice || e2.mozSlice, n2 ? ((i2 = new FileReader()).onload = y(this._chunkLoaded, this), i2.onerror = y(this._chunkError, this)) : i2 = new FileReaderSync(), this._nextChunk();
          }, this._nextChunk = function() {
            this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
          }, this._readChunk = function() {
            var e2 = this._input, t = (this._config.chunkSize && (t = Math.min(this._start + this._config.chunkSize, this._input.size), e2 = r2.call(e2, this._start, t)), i2.readAsText(e2, this._config.encoding));
            n2 || this._chunkLoaded({ target: { result: t } });
          }, this._chunkLoaded = function(e2) {
            this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(e2.target.result);
          }, this._chunkError = function() {
            this._sendError(i2.error);
          };
        }
        function c(e) {
          var i2;
          u.call(this, e = e || {}), this.stream = function(e2) {
            return i2 = e2, this._nextChunk();
          }, this._nextChunk = function() {
            var e2, t;
            if (!this._finished) return e2 = this._config.chunkSize, i2 = e2 ? (t = i2.substring(0, e2), i2.substring(e2)) : (t = i2, ""), this._finished = !i2, this.parseChunk(t);
          };
        }
        function p(e) {
          u.call(this, e = e || {});
          var t = [], i2 = true, r2 = false;
          this.pause = function() {
            u.prototype.pause.apply(this, arguments), this._input.pause();
          }, this.resume = function() {
            u.prototype.resume.apply(this, arguments), this._input.resume();
          }, this.stream = function(e2) {
            this._input = e2, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
          }, this._checkIsFinished = function() {
            r2 && 1 === t.length && (this._finished = true);
          }, this._nextChunk = function() {
            this._checkIsFinished(), t.length ? this.parseChunk(t.shift()) : i2 = true;
          }, this._streamData = y(function(e2) {
            try {
              t.push("string" == typeof e2 ? e2 : e2.toString(this._config.encoding)), i2 && (i2 = false, this._checkIsFinished(), this.parseChunk(t.shift()));
            } catch (e3) {
              this._streamError(e3);
            }
          }, this), this._streamError = y(function(e2) {
            this._streamCleanUp(), this._sendError(e2);
          }, this), this._streamEnd = y(function() {
            this._streamCleanUp(), r2 = true, this._streamData("");
          }, this), this._streamCleanUp = y(function() {
            this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
          }, this);
        }
        function i(m2) {
          var n2, s2, a2, t, o2 = Math.pow(2, 53), h2 = -o2, u2 = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, d2 = /^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/, i2 = this, r2 = 0, f2 = 0, l2 = false, e = false, c2 = [], p2 = { data: [], errors: [], meta: {} };
          function y2(e2) {
            return "greedy" === m2.skipEmptyLines ? "" === e2.join("").trim() : 1 === e2.length && 0 === e2[0].length;
          }
          function g2() {
            if (p2 && a2 && (k("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + v.DefaultDelimiter + "'"), a2 = false), m2.skipEmptyLines && (p2.data = p2.data.filter(function(e3) {
              return !y2(e3);
            })), _2()) {
              let t3 = function(e3, t4) {
                U(m2.transformHeader) && (e3 = m2.transformHeader(e3, t4)), c2.push(e3);
              };
              var t2 = t3;
              if (p2) if (Array.isArray(p2.data[0])) {
                for (var e2 = 0; _2() && e2 < p2.data.length; e2++) p2.data[e2].forEach(t3);
                p2.data.splice(0, 1);
              } else p2.data.forEach(t3);
            }
            function i3(e3, t3) {
              for (var i4 = m2.header ? {} : [], r4 = 0; r4 < e3.length; r4++) {
                var n3 = r4, s3 = e3[r4], s3 = ((e4, t4) => ((e5) => (m2.dynamicTypingFunction && void 0 === m2.dynamicTyping[e5] && (m2.dynamicTyping[e5] = m2.dynamicTypingFunction(e5)), true === (m2.dynamicTyping[e5] || m2.dynamicTyping)))(e4) ? "true" === t4 || "TRUE" === t4 || "false" !== t4 && "FALSE" !== t4 && (((e5) => {
                  if (u2.test(e5)) {
                    e5 = parseFloat(e5);
                    if (h2 < e5 && e5 < o2) return 1;
                  }
                })(t4) ? parseFloat(t4) : d2.test(t4) ? new Date(t4) : "" === t4 ? null : t4) : t4)(n3 = m2.header ? r4 >= c2.length ? "__parsed_extra" : c2[r4] : n3, s3 = m2.transform ? m2.transform(s3, n3) : s3);
                "__parsed_extra" === n3 ? (i4[n3] = i4[n3] || [], i4[n3].push(s3)) : i4[n3] = s3;
              }
              return m2.header && (r4 > c2.length ? k("FieldMismatch", "TooManyFields", "Too many fields: expected " + c2.length + " fields but parsed " + r4, f2 + t3) : r4 < c2.length && k("FieldMismatch", "TooFewFields", "Too few fields: expected " + c2.length + " fields but parsed " + r4, f2 + t3)), i4;
            }
            var r3;
            p2 && (m2.header || m2.dynamicTyping || m2.transform) && (r3 = 1, !p2.data.length || Array.isArray(p2.data[0]) ? (p2.data = p2.data.map(i3), r3 = p2.data.length) : p2.data = i3(p2.data, 0), m2.header && p2.meta && (p2.meta.fields = c2), f2 += r3);
          }
          function _2() {
            return m2.header && 0 === c2.length;
          }
          function k(e2, t2, i3, r3) {
            e2 = { type: e2, code: t2, message: i3 };
            void 0 !== r3 && (e2.row = r3), p2.errors.push(e2);
          }
          U(m2.step) && (t = m2.step, m2.step = function(e2) {
            p2 = e2, _2() ? g2() : (g2(), 0 !== p2.data.length && (r2 += e2.data.length, m2.preview && r2 > m2.preview ? s2.abort() : (p2.data = p2.data[0], t(p2, i2))));
          }), this.parse = function(e2, t2, i3) {
            var r3 = m2.quoteChar || '"', r3 = (m2.newline || (m2.newline = this.guessLineEndings(e2, r3)), a2 = false, m2.delimiter ? U(m2.delimiter) && (m2.delimiter = m2.delimiter(e2), p2.meta.delimiter = m2.delimiter) : ((r3 = ((e3, t3, i4, r4, n3) => {
              var s3, a3, o3, h3;
              n3 = n3 || [",", "	", "|", ";", v.RECORD_SEP, v.UNIT_SEP];
              for (var u3 = 0; u3 < n3.length; u3++) {
                for (var d3, f3 = n3[u3], l3 = 0, c3 = 0, p3 = 0, g3 = (o3 = void 0, new E({ comments: r4, delimiter: f3, newline: t3, preview: 10 }).parse(e3)), _3 = 0; _3 < g3.data.length; _3++) i4 && y2(g3.data[_3]) ? p3++ : (d3 = g3.data[_3].length, c3 += d3, void 0 === o3 ? o3 = d3 : 0 < d3 && (l3 += Math.abs(d3 - o3), o3 = d3));
                0 < g3.data.length && (c3 /= g3.data.length - p3), (void 0 === a3 || l3 <= a3) && (void 0 === h3 || h3 < c3) && 1.99 < c3 && (a3 = l3, s3 = f3, h3 = c3);
              }
              return { successful: !!(m2.delimiter = s3), bestDelimiter: s3 };
            })(e2, m2.newline, m2.skipEmptyLines, m2.comments, m2.delimitersToGuess)).successful ? m2.delimiter = r3.bestDelimiter : (a2 = true, m2.delimiter = v.DefaultDelimiter), p2.meta.delimiter = m2.delimiter), b(m2));
            return m2.preview && m2.header && r3.preview++, n2 = e2, s2 = new E(r3), p2 = s2.parse(n2, t2, i3), g2(), l2 ? { meta: { paused: true } } : p2 || { meta: { paused: false } };
          }, this.paused = function() {
            return l2;
          }, this.pause = function() {
            l2 = true, s2.abort(), n2 = U(m2.chunk) ? "" : n2.substring(s2.getCharIndex());
          }, this.resume = function() {
            i2.streamer._halted ? (l2 = false, i2.streamer.parseChunk(n2, true)) : setTimeout(i2.resume, 3);
          }, this.aborted = function() {
            return e;
          }, this.abort = function() {
            e = true, s2.abort(), p2.meta.aborted = true, U(m2.complete) && m2.complete(p2), n2 = "";
          }, this.guessLineEndings = function(e2, t2) {
            e2 = e2.substring(0, 1048576);
            var t2 = new RegExp(P(t2) + "([^]*?)" + P(t2), "gm"), i3 = (e2 = e2.replace(t2, "")).split("\r"), t2 = e2.split("\n"), e2 = 1 < t2.length && t2[0].length < i3[0].length;
            if (1 === i3.length || e2) return "\n";
            for (var r3 = 0, n3 = 0; n3 < i3.length; n3++) "\n" === i3[n3][0] && r3++;
            return r3 >= i3.length / 2 ? "\r\n" : "\r";
          };
        }
        function P(e) {
          return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }
        function E(C) {
          var S = (C = C || {}).delimiter, O = C.newline, x = C.comments, I = C.step, A = C.preview, T = C.fastMode, D = null, L = false, F = null == C.quoteChar ? '"' : C.quoteChar, j = F;
          if (void 0 !== C.escapeChar && (j = C.escapeChar), ("string" != typeof S || -1 < v.BAD_DELIMITERS.indexOf(S)) && (S = ","), x === S) throw new Error("Comment character same as delimiter");
          true === x ? x = "#" : ("string" != typeof x || -1 < v.BAD_DELIMITERS.indexOf(x)) && (x = false), "\n" !== O && "\r" !== O && "\r\n" !== O && (O = "\n");
          var z = 0, M = false;
          this.parse = function(i2, t, r2) {
            if ("string" != typeof i2) throw new Error("Input must be a string");
            var n2 = i2.length, e = S.length, s2 = O.length, a2 = x.length, o2 = U(I), h2 = [], u2 = [], d2 = [], f2 = z = 0;
            if (!i2) return w();
            if (T || false !== T && -1 === i2.indexOf(F)) {
              for (var l2 = i2.split(O), c2 = 0; c2 < l2.length; c2++) {
                if (d2 = l2[c2], z += d2.length, c2 !== l2.length - 1) z += O.length;
                else if (r2) return w();
                if (!x || d2.substring(0, a2) !== x) {
                  if (o2) {
                    if (h2 = [], k(d2.split(S)), R(), M) return w();
                  } else k(d2.split(S));
                  if (A && A <= c2) return h2 = h2.slice(0, A), w(true);
                }
              }
              return w();
            }
            for (var p2 = i2.indexOf(S, z), g2 = i2.indexOf(O, z), _2 = new RegExp(P(j) + P(F), "g"), m2 = i2.indexOf(F, z); ; ) if (i2[z] === F) for (m2 = z, z++; ; ) {
              if (-1 === (m2 = i2.indexOf(F, m2 + 1))) return r2 || u2.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: h2.length, index: z }), E2();
              if (m2 === n2 - 1) return E2(i2.substring(z, m2).replace(_2, F));
              if (F === j && i2[m2 + 1] === j) m2++;
              else if (F === j || 0 === m2 || i2[m2 - 1] !== j) {
                -1 !== p2 && p2 < m2 + 1 && (p2 = i2.indexOf(S, m2 + 1));
                var y2 = v2(-1 === (g2 = -1 !== g2 && g2 < m2 + 1 ? i2.indexOf(O, m2 + 1) : g2) ? p2 : Math.min(p2, g2));
                if (i2.substr(m2 + 1 + y2, e) === S) {
                  d2.push(i2.substring(z, m2).replace(_2, F)), i2[z = m2 + 1 + y2 + e] !== F && (m2 = i2.indexOf(F, z)), p2 = i2.indexOf(S, z), g2 = i2.indexOf(O, z);
                  break;
                }
                y2 = v2(g2);
                if (i2.substring(m2 + 1 + y2, m2 + 1 + y2 + s2) === O) {
                  if (d2.push(i2.substring(z, m2).replace(_2, F)), b2(m2 + 1 + y2 + s2), p2 = i2.indexOf(S, z), m2 = i2.indexOf(F, z), o2 && (R(), M)) return w();
                  if (A && h2.length >= A) return w(true);
                  break;
                }
                u2.push({ type: "Quotes", code: "InvalidQuotes", message: "Trailing quote on quoted field is malformed", row: h2.length, index: z }), m2++;
              }
            }
            else if (x && 0 === d2.length && i2.substring(z, z + a2) === x) {
              if (-1 === g2) return w();
              z = g2 + s2, g2 = i2.indexOf(O, z), p2 = i2.indexOf(S, z);
            } else if (-1 !== p2 && (p2 < g2 || -1 === g2)) d2.push(i2.substring(z, p2)), z = p2 + e, p2 = i2.indexOf(S, z);
            else {
              if (-1 === g2) break;
              if (d2.push(i2.substring(z, g2)), b2(g2 + s2), o2 && (R(), M)) return w();
              if (A && h2.length >= A) return w(true);
            }
            return E2();
            function k(e2) {
              h2.push(e2), f2 = z;
            }
            function v2(e2) {
              var t2 = 0;
              return t2 = -1 !== e2 && (e2 = i2.substring(m2 + 1, e2)) && "" === e2.trim() ? e2.length : t2;
            }
            function E2(e2) {
              return r2 || (void 0 === e2 && (e2 = i2.substring(z)), d2.push(e2), z = n2, k(d2), o2 && R()), w();
            }
            function b2(e2) {
              z = e2, k(d2), d2 = [], g2 = i2.indexOf(O, z);
            }
            function w(e2) {
              if (C.header && !t && h2.length && !L) {
                var s3 = h2[0], a3 = /* @__PURE__ */ Object.create(null), o3 = new Set(s3);
                let n3 = false;
                for (let r3 = 0; r3 < s3.length; r3++) {
                  let i3 = s3[r3];
                  if (a3[i3 = U(C.transformHeader) ? C.transformHeader(i3, r3) : i3]) {
                    let e3, t2 = a3[i3];
                    for (; e3 = i3 + "_" + t2, t2++, o3.has(e3); ) ;
                    o3.add(e3), s3[r3] = e3, a3[i3]++, n3 = true, (D = null === D ? {} : D)[e3] = i3;
                  } else a3[i3] = 1, s3[r3] = i3;
                  o3.add(i3);
                }
                n3 && console.warn("Duplicate headers found and renamed."), L = true;
              }
              return { data: h2, errors: u2, meta: { delimiter: S, linebreak: O, aborted: M, truncated: !!e2, cursor: f2 + (t || 0), renamedHeaders: D } };
            }
            function R() {
              I(w()), h2 = [], u2 = [];
            }
          }, this.abort = function() {
            M = true;
          }, this.getCharIndex = function() {
            return z;
          };
        }
        function g(e) {
          var t = e.data, i2 = o[t.workerId], r2 = false;
          if (t.error) i2.userError(t.error, t.file);
          else if (t.results && t.results.data) {
            var n2 = { abort: function() {
              r2 = true, _(t.workerId, { data: [], errors: [], meta: { aborted: true } });
            }, pause: m, resume: m };
            if (U(i2.userStep)) {
              for (var s2 = 0; s2 < t.results.data.length && (i2.userStep({ data: t.results.data[s2], errors: t.results.errors, meta: t.results.meta }, n2), !r2); s2++) ;
              delete t.results;
            } else U(i2.userChunk) && (i2.userChunk(t.results, n2, t.file), delete t.results);
          }
          t.finished && !r2 && _(t.workerId, t.results);
        }
        function _(e, t) {
          var i2 = o[e];
          U(i2.userComplete) && i2.userComplete(t), i2.terminate(), delete o[e];
        }
        function m() {
          throw new Error("Not implemented.");
        }
        function b(e) {
          if ("object" != typeof e || null === e) return e;
          var t, i2 = Array.isArray(e) ? [] : {};
          for (t in e) i2[t] = b(e[t]);
          return i2;
        }
        function y(e, t) {
          return function() {
            e.apply(t, arguments);
          };
        }
        function U(e) {
          return "function" == typeof e;
        }
        return v.parse = function(e, t) {
          var i2 = (t = t || {}).dynamicTyping || false;
          U(i2) && (t.dynamicTypingFunction = i2, i2 = {});
          if (t.dynamicTyping = i2, t.transform = !!U(t.transform) && t.transform, !t.worker || !v.WORKERS_SUPPORTED) return i2 = null, v.NODE_STREAM_INPUT, "string" == typeof e ? (e = ((e2) => 65279 !== e2.charCodeAt(0) ? e2 : e2.slice(1))(e), i2 = new (t.download ? f : c)(t)) : true === e.readable && U(e.read) && U(e.on) ? i2 = new p(t) : (n.File && e instanceof File || e instanceof Object) && (i2 = new l(t)), i2.stream(e);
          (i2 = (() => {
            var e2;
            return !!v.WORKERS_SUPPORTED && (e2 = (() => {
              var e3 = n.URL || n.webkitURL || null, t2 = r.toString();
              return v.BLOB_URL || (v.BLOB_URL = e3.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ", "(", t2, ")();"], { type: "text/javascript" })));
            })(), (e2 = new n.Worker(e2)).onmessage = g, e2.id = h++, o[e2.id] = e2);
          })()).userStep = t.step, i2.userChunk = t.chunk, i2.userComplete = t.complete, i2.userError = t.error, t.step = U(t.step), t.chunk = U(t.chunk), t.complete = U(t.complete), t.error = U(t.error), delete t.worker, i2.postMessage({ input: e, config: t, workerId: i2.id });
        }, v.unparse = function(e, t) {
          var n2 = false, _2 = true, m2 = ",", y2 = "\r\n", s2 = '"', a2 = s2 + s2, i2 = false, r2 = null, o2 = false, h2 = ((() => {
            if ("object" == typeof t) {
              if ("string" != typeof t.delimiter || v.BAD_DELIMITERS.filter(function(e2) {
                return -1 !== t.delimiter.indexOf(e2);
              }).length || (m2 = t.delimiter), "boolean" != typeof t.quotes && "function" != typeof t.quotes && !Array.isArray(t.quotes) || (n2 = t.quotes), "boolean" != typeof t.skipEmptyLines && "string" != typeof t.skipEmptyLines || (i2 = t.skipEmptyLines), "string" == typeof t.newline && (y2 = t.newline), "string" == typeof t.quoteChar && (s2 = t.quoteChar), "boolean" == typeof t.header && (_2 = t.header), Array.isArray(t.columns)) {
                if (0 === t.columns.length) throw new Error("Option columns is empty");
                r2 = t.columns;
              }
              void 0 !== t.escapeChar && (a2 = t.escapeChar + s2), t.escapeFormulae instanceof RegExp ? o2 = t.escapeFormulae : "boolean" == typeof t.escapeFormulae && t.escapeFormulae && (o2 = /^[=+\-@\t\r].*$/);
            }
          })(), new RegExp(P(s2), "g"));
          "string" == typeof e && (e = JSON.parse(e));
          if (Array.isArray(e)) {
            if (!e.length || Array.isArray(e[0])) return u2(null, e, i2);
            if ("object" == typeof e[0]) return u2(r2 || Object.keys(e[0]), e, i2);
          } else if ("object" == typeof e) return "string" == typeof e.data && (e.data = JSON.parse(e.data)), Array.isArray(e.data) && (e.fields || (e.fields = e.meta && e.meta.fields || r2), e.fields || (e.fields = Array.isArray(e.data[0]) ? e.fields : "object" == typeof e.data[0] ? Object.keys(e.data[0]) : []), Array.isArray(e.data[0]) || "object" == typeof e.data[0] || (e.data = [e.data])), u2(e.fields || [], e.data || [], i2);
          throw new Error("Unable to serialize unrecognized input");
          function u2(e2, t2, i3) {
            var r3 = "", n3 = ("string" == typeof e2 && (e2 = JSON.parse(e2)), "string" == typeof t2 && (t2 = JSON.parse(t2)), Array.isArray(e2) && 0 < e2.length), s3 = !Array.isArray(t2[0]);
            if (n3 && _2) {
              for (var a3 = 0; a3 < e2.length; a3++) 0 < a3 && (r3 += m2), r3 += k(e2[a3], a3);
              0 < t2.length && (r3 += y2);
            }
            for (var o3 = 0; o3 < t2.length; o3++) {
              var h3 = (n3 ? e2 : t2[o3]).length, u3 = false, d2 = n3 ? 0 === Object.keys(t2[o3]).length : 0 === t2[o3].length;
              if (i3 && !n3 && (u3 = "greedy" === i3 ? "" === t2[o3].join("").trim() : 1 === t2[o3].length && 0 === t2[o3][0].length), "greedy" === i3 && n3) {
                for (var f2 = [], l2 = 0; l2 < h3; l2++) {
                  var c2 = s3 ? e2[l2] : l2;
                  f2.push(t2[o3][c2]);
                }
                u3 = "" === f2.join("").trim();
              }
              if (!u3) {
                for (var p2 = 0; p2 < h3; p2++) {
                  0 < p2 && !d2 && (r3 += m2);
                  var g2 = n3 && s3 ? e2[p2] : p2;
                  r3 += k(t2[o3][g2], p2);
                }
                o3 < t2.length - 1 && (!i3 || 0 < h3 && !d2) && (r3 += y2);
              }
            }
            return r3;
          }
          function k(e2, t2) {
            var i3, r3;
            return null == e2 ? "" : e2.constructor === Date ? JSON.stringify(e2).slice(1, 25) : (r3 = false, o2 && "string" == typeof e2 && o2.test(e2) && (e2 = "'" + e2, r3 = true), i3 = e2.toString().replace(h2, a2), (r3 = r3 || true === n2 || "function" == typeof n2 && n2(e2, t2) || Array.isArray(n2) && n2[t2] || ((e3, t3) => {
              for (var i4 = 0; i4 < t3.length; i4++) if (-1 < e3.indexOf(t3[i4])) return true;
              return false;
            })(i3, v.BAD_DELIMITERS) || -1 < i3.indexOf(m2) || " " === i3.charAt(0) || " " === i3.charAt(i3.length - 1)) ? s2 + i3 + s2 : i3);
          }
        }, v.RECORD_SEP = String.fromCharCode(30), v.UNIT_SEP = String.fromCharCode(31), v.BYTE_ORDER_MARK = "\uFEFF", v.BAD_DELIMITERS = ["\r", "\n", '"', v.BYTE_ORDER_MARK], v.WORKERS_SUPPORTED = !s && !!n.Worker, v.NODE_STREAM_INPUT = 1, v.LocalChunkSize = 10485760, v.RemoteChunkSize = 5242880, v.DefaultDelimiter = ",", v.Parser = E, v.ParserHandle = i, v.NetworkStreamer = f, v.FileStreamer = l, v.StringStreamer = c, v.ReadableStreamStreamer = p, n.jQuery && ((d = n.jQuery).fn.parse = function(o2) {
          var i2 = o2.config || {}, h2 = [];
          return this.each(function(e2) {
            if (!("INPUT" === d(this).prop("tagName").toUpperCase() && "file" === d(this).attr("type").toLowerCase() && n.FileReader) || !this.files || 0 === this.files.length) return true;
            for (var t = 0; t < this.files.length; t++) h2.push({ file: this.files[t], inputElem: this, instanceConfig: d.extend({}, i2) });
          }), e(), this;
          function e() {
            if (0 === h2.length) U(o2.complete) && o2.complete();
            else {
              var e2, t, i3, r2, n2 = h2[0];
              if (U(o2.before)) {
                var s2 = o2.before(n2.file, n2.inputElem);
                if ("object" == typeof s2) {
                  if ("abort" === s2.action) return e2 = "AbortError", t = n2.file, i3 = n2.inputElem, r2 = s2.reason, void (U(o2.error) && o2.error({ name: e2 }, t, i3, r2));
                  if ("skip" === s2.action) return void u2();
                  "object" == typeof s2.config && (n2.instanceConfig = d.extend(n2.instanceConfig, s2.config));
                } else if ("skip" === s2) return void u2();
              }
              var a2 = n2.instanceConfig.complete;
              n2.instanceConfig.complete = function(e3) {
                U(a2) && a2(e3, n2.file, n2.inputElem), u2();
              }, v.parse(n2.file, n2.instanceConfig);
            }
          }
          function u2() {
            h2.splice(0, 1), e();
          }
        }), a && (n.onmessage = function(e) {
          e = e.data;
          void 0 === v.WORKER_ID && e && (v.WORKER_ID = e.workerId);
          "string" == typeof e.input ? n.postMessage({ workerId: v.WORKER_ID, results: v.parse(e.input, e.config), finished: true }) : (n.File && e.input instanceof File || e.input instanceof Object) && (e = v.parse(e.input, e.config)) && n.postMessage({ workerId: v.WORKER_ID, results: e, finished: true });
        }), (f.prototype = Object.create(u.prototype)).constructor = f, (l.prototype = Object.create(u.prototype)).constructor = l, (c.prototype = Object.create(c.prototype)).constructor = c, (p.prototype = Object.create(u.prototype)).constructor = p, v;
      });
    }
  });

  // DamonUtils.js
  var require_DamonUtils = __commonJS({
    "DamonUtils.js"(exports, module) {
      var DOMPurify = require_purify_cjs();
      var Papa = require_papaparse_min();
      module.exports = class DamonUtils {
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
          recurse(jsonMap, list);
          return list;
          function recurse(jsonMap2, listItem, path = []) {
            if (typeof listItem !== "object" || listItem == null || Array.isArray(listItem)) {
              throw new Error("Error List Item number " + jsonItemIndex + ": @param { {} } list");
            }
            if (typeof jsonMap2 === "object" && jsonMap2 !== null && !Array.isArray(jsonMap2) && jsonMap2 instanceof Map && jsonMap2.constructor === Map) {
              if (listItem.tagName == "UL") {
                for (const [key, value] of jsonMap2) {
                  let newList = document.createElement("ul"), newDiv = document.createElement("code"), keySpan = document.createElement("span"), newListItem = document.createElement("li");
                  newListItem.dataset.graphArbo = Array.from(jsonMap2.keys()).indexOf(key);
                  if (path.length > 0)
                    newListItem.dataset.graphArbo = path.join("-") + "-" + Array.from(jsonMap2.keys()).indexOf(key);
                  keySpan.className = "type-key";
                  if ($.websiteRegex.test(key) || $.pathRegex.test(key)) {
                    let fullUrl = key;
                    if ($.websiteRegex.test(key) && !$.httpRegex.test(key))
                      fullUrl = "https://" + key;
                    let keyLink = DOMPurify.sanitize(`<a href="${fullUrl}"><span>${fullUrl}</span></a>`);
                    keySpan.innerHTML = keyLink;
                  } else {
                    if (jsonContext !== void 0 && key in schema["@context"]) {
                      keySpan.innerHTML = DOMPurify.sanitize(
                        `<a href="${schema["@context"][key]["@id"]}"><span>${key}</span></a>`
                      );
                    } else {
                      keySpan.textContent = key;
                    }
                  }
                  if (typeof value === "object" && value !== null) {
                    if (Array.isArray(value)) {
                      if (jsonMap2.damonInlineArrays !== void 0 && jsonMap2.damonInlineArrays.indexOf(key) > -1) {
                        newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>[';
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
                              if ($.websiteRegex.test(childValue) || $.pathRegex.test(childValue)) {
                                let fullUrl = childValue;
                                if ($.websiteRegex.test(childValue) && !$.httpRegex.test(childValue))
                                  fullUrl = "https://" + childValue;
                                childValueSpan.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                              } else {
                                childValueSpan.innerHTML = `"${childValue}"`;
                              }
                            } else {
                              if ($.websiteRegex.test(childValue) || $.pathRegex.test(childValue)) {
                                let fullUrl = childValue;
                                if (!$.httpRegex.test(childValue) && $.websiteRegex.test(childValue))
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
                        newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>[]';
                        newListItem.appendChild(newDiv);
                        newListItem.appendChild(newList);
                        listItem.appendChild(newListItem);
                        recurse(value, newList, path.concat([Array.from(jsonMap2.keys()).indexOf(key)]));
                      }
                    } else {
                      if (jsonMap2.implicitMaps !== void 0 && jsonMap2.implicitMaps.indexOf(key) > -1) {
                        newDiv.innerHTML = keySpan.outerHTML;
                      } else {
                        newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>{}';
                      }
                      newListItem.appendChild(newDiv);
                      newListItem.appendChild(newList);
                      listItem.appendChild(newListItem);
                      recurse(value, newList, path.concat([Array.from(jsonMap2.keys()).indexOf(key)]));
                    }
                  } else {
                    jsonItemIndex++;
                    newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>';
                    let valueSpan = document.createElement("span");
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
                    } else if (Number.isFinite(childText) && !Number.isNaN(childText)) {
                      valueSpan.textContent = childText + "";
                      valueSpan.className = "type-number";
                    } else {
                      if (safeHTML) {
                        if ($.websiteRegex.test(childText) || $.pathRegex.test(childText)) {
                          let fullUrl = childText;
                          if (!$.httpRegex.test(childText) && $.websiteRegex.test(childText))
                            fullUrl = "https://" + childText;
                          valueSpan.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                        } else {
                          valueSpan.innerHTML = `"${childText}"`;
                        }
                      } else {
                        if ($.websiteRegex.test(childText) || $.pathRegex.test(childText)) {
                          let fullUrl = childText;
                          if (!$.httpRegex.test(childText) && $.websiteRegex.test(childText))
                            fullUrl = "https://" + childText;
                          valueSpan.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                        } else {
                          valueSpan.textContent = `"${childText}"`;
                        }
                      }
                      valueSpan.className = "type-string";
                    }
                    if (jsonMap2.implicitNulls === void 0 || jsonMap2.implicitNulls.indexOf(key) == -1) {
                      newDiv.appendChild(valueSpan);
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
                newListItem.dataset.graphArbo = i;
                if (path.length > 0)
                  newListItem.dataset.graphArbo = path.join("-") + "-" + i;
                if (typeof jsonMap2[i] === "object" && jsonMap2[i] !== null) {
                  if (Array.isArray(jsonMap2[i])) {
                    if (jsonMap2.damonInlineArrays !== void 0 && jsonMap2.damonInlineArrays.indexOf(i) > -1) {
                      newDiv.innerHTML += "[";
                      for (let j = 0, k = jsonMap2[i].length; j < k; j++) {
                        let valueSpan = document.createElement("span"), value = jsonMap2[i][j];
                        if (value === true) {
                          valueSpan.textContent = "true";
                          valueSpan.className = "type-boolean";
                        } else if (value === false) {
                          valueSpan.textContent = "false";
                          valueSpan.className = "type-boolean";
                        } else if (value === null) {
                          valueSpan.textContent = "null";
                          valueSpan.className = "type-null";
                        } else if (Number.isFinite(value) && !Number.isNaN(value)) {
                          valueSpan.textContent = value + "";
                          valueSpan.className = "type-number";
                        } else {
                          if (safeHTML) {
                            if ($.websiteRegex.test(value) || $.pathRegex.test(value)) {
                              let fullUrl = value;
                              if (!$.httpRegex.test(value) && $.websiteRegex.test(value))
                                fullUrl = "https://" + value;
                              valueSpan.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                            } else {
                              valueSpan.innerHTML = `"${value}"`;
                            }
                          } else {
                            if ($.websiteRegex.test(value) || $.pathRegex.test(value)) {
                              let fullUrl = value;
                              if (!$.httpRegex.test(value) && $.websiteRegex.test(value))
                                fullUrl = "https://" + value;
                              valueSpan.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                            } else {
                              valueSpan.textContent = `"${value}"`;
                            }
                          }
                          valueSpan.className = "type-string";
                        }
                        if (j !== 0) {
                          newDiv.innerHTML += ", ";
                        }
                        newDiv.appendChild(valueSpan);
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
                      recurse(jsonMap2[i], newList, path.concat(i));
                    }
                  } else {
                    newDiv.textContent = "{}";
                    newListItem.appendChild(newDiv);
                    newListItem.appendChild(newList);
                    listItem.appendChild(newListItem);
                    recurse(jsonMap2[i], newList, path.concat(i));
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
                      if ($.websiteRegex.test(childText) || $.pathRegex.test(childText)) {
                        let fullUrl = childText;
                        if (!$.httpRegex.test(childText) && $.websiteRegex.test(childText))
                          fullUrl = "https://" + childText;
                        newDiv.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                      } else {
                        newDiv.innerHTML = `"${childText}"`;
                      }
                    } else {
                      if ($.websiteRegex.test(childText) || $.pathRegex.test(childText)) {
                        let fullUrl = childText;
                        if (!$.httpRegex.test(childText) && $.websiteRegex.test(childText))
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
            throw new Error("Provided value doesn't passes JSON.parse().");
          }
          var jsonItemIndex = 0, table = document.createElement("table"), tHead = document.createElement("thead"), tBody = document.createElement("tbody"), headingsEncountered = false, columnsLength = 0;
          table.className = "DAMON-Table";
          if (typeof jsonMap !== "object" || jsonMap == null || Array.isArray(jsonMap) || !(jsonMap instanceof Map) || jsonMap.constructor !== Map) {
            throw new Error("Error: expected an Object value, saw otherwise.");
          }
          for (const [key, value] of jsonMap) {
            if (typeof value === "object" && value !== null && !Array.isArray(value) && value instanceof Map && value.constructor === Map) {
              if (jsonItemIndex == 0) {
                let row = document.createElement("tr");
                columnsLength = value.length;
                for (const [cK, childValue] of value) {
                  let childKey = cK.slice(cK.match(/^[0-9]+-/)[0].length);
                  if (childValue === null) {
                    let headerCell = document.createElement("th");
                    headerCell.dataset.graphArbo = jsonItemIndex + "-" + row.children.length;
                    if (safeHTML) {
                      if ($.websiteRegex.test(childKey) || $.pathRegex.test(childKey)) {
                        headerCell.innerHTML = DOMPurify.sanitize(`<a href="${childKey}">${childKey}</a>`);
                      } else {
                        headerCell.innerHTML = `${childKey}`;
                      }
                    } else {
                      if ($.websiteRegex.test(childKey) || $.pathRegex.test(childKey)) {
                        headerCell.innerHTML = DOMPurify.sanitize(`<a href="${childKey}">${childKey}</a>`);
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
                  throw new Error(
                    "Error row " + jsonItemIndex + ": cells total doesn't match the header's."
                  );
                }
                let row = document.createElement("tr");
                for (const [cK, childValue] of value) {
                  let childKey = cK.slice(cK.match(/^[0-9]+-/)[0].length);
                  if (childValue === null) {
                    let dataCell = document.createElement("td");
                    dataCell.dataset.graphArbo = jsonItemIndex + "-" + row.children.length;
                    if (safeHTML) {
                      if ($.websiteRegex.test(childKey) || $.pathRegex.test(childKey)) {
                        dataCell.innerHTML = DOMPurify.sanitize(`<a href="${childKey}">${childKey}</a>`);
                      } else {
                        dataCell.innerHTML = `${childKey}`;
                      }
                    } else {
                      if ($.websiteRegex.test(childKey) || $.pathRegex.test(childKey)) {
                        dataCell.innerHTML = DOMPurify.sanitize(`<a href="${childKey}">${childKey}</a>`);
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
              for (const [k, value] of jsonMap2) {
                i2++;
                let key = k.slice(k.match(/^[0-9]+-/)[0].length);
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
                    list += "    ".repeat(level) + `${JSON.stringify(key)}, ` + JSON.stringify(value);
                  }
                }
                if (k != Array.from(jsonMap2.keys())[Array.from(jsonMap2.keys()).length - 1]) {
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
         *
         *
         * @param {String} sExpression
         * @returns {Map}
         */
        sExpressionToPrefixedKeysMap(sExpression) {
          const $ = this;
          let damonMap = /* @__PURE__ */ new Map();
          damonMap.headless = true;
          _recurse(JSON.parse(sExpression), damonMap, 0);
          return damonMap;
          function _recurse(sExpressionArray, map, i) {
            let childMap = /* @__PURE__ */ new Map();
            map.set(i + "-" + sExpressionArray[0], childMap);
            for (let i2 = 1, c = sExpressionArray.length; i2 < c; i2++) {
              if (Array.isArray(sExpressionArray[i2])) {
                _recurse(sExpressionArray[i2], childMap, i2 - 1);
              } else {
                let indexPrefixedKey = i2 - 1 + "-" + sExpressionArray[i2];
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
          let mathJs = "";
          if (Array.isArray(damonMap)) {
            _recurse(damonMap);
            return mathJs.slice(0, -1);
          } else if (typeof damonMap === "object" && damonMap !== null && damonMap instanceof Map && damonMap.constructor === Map) {
            _recurse(damonMap);
            return mathJs.slice(0, -1);
          } else {
            8;
            if (typeof damonMap == "string") {
              damonMap = JSON.stringify(damonMap);
            }
            JSON.parse(damonMap);
            return damonMap;
          }
          function _minusculize(string) {
            return string[0].toLowerCase() + string.slice(1);
          }
          function _recurse(damonMap2, level = 0) {
            if (typeof damonMap2 === "object" && damonMap2 !== null && !Array.isArray(damonMap2) && damonMap2 instanceof Map && damonMap2.constructor === Map) {
              for (const [k, value] of damonMap2) {
                let key = k.slice(k.match(/^[0-9]+-/)[0].length);
                if (key == "Power")
                  key = "Pow";
                if (key == "e")
                  key = "2.718281828459045";
                if (key == "i")
                  key = "sqrt(-1)";
                if (key == "LN2")
                  key = "0.6931471805599453";
                if (key == "LN10")
                  key = "2.302585092994046";
                if (key == "LOG2E")
                  key = "1.4426950408889634";
                if (key == "LOG10E")
                  key = "0.4342944819032518";
                if (key == "phi")
                  key = "1.618033988749895";
                if (key == "pi")
                  key = "3.141592653589793";
                if (key == "SQRT1_2")
                  key = "0.7071067811865476";
                if (key == "SQRT2")
                  key = "1.4142135623730951";
                if (key == "tau")
                  key = "6.283185307179586";
                if (typeof value === "object" && value !== null) {
                  if (Array.isArray(value)) {
                    if (value.length > 0) {
                      mathJs += "    ".repeat(level) + `${JSON.stringify(_minusculize(key)).slice(1, -1)}(
`;
                      _recurse(value, level + 1);
                      mathJs += "    ".repeat(level) + `)`;
                    } else {
                      mathJs += "    ".repeat(level) + `${JSON.stringify(_minusculize(key)).slice(1, -1)}()`;
                    }
                  } else {
                    if (Array.from(value.keys()).length > 0) {
                      mathJs += "    ".repeat(level) + `${JSON.stringify(_minusculize(key)).slice(1, -1)}(
`;
                      _recurse(value, level + 1);
                      mathJs += "    ".repeat(level) + `)`;
                    } else {
                      mathJs += "    ".repeat(level) + `${JSON.stringify(_minusculize(key)).slice(1, -1)}()`;
                    }
                  }
                } else {
                  if (value === true) {
                    mathJs += "    ".repeat(level) + `${JSON.stringify(_minusculize(key)).slice(1, -1)}(true)`;
                  } else if (value === false) {
                    mathJs += "    ".repeat(level) + `${JSON.stringify(_minusculize(key)).slice(1, -1)}(false)`;
                  } else if (value === null) {
                    mathJs += "    ".repeat(level) + `${JSON.stringify(_minusculize(key)).slice(1, -1)}`;
                  } else if (Number.isFinite(value) && !Number.isNaN(value)) {
                    mathJs += "    ".repeat(level) + `${JSON.stringify(_minusculize(key)).slice(1, -1)}(` + value + ")";
                  } else {
                    mathJs += "    ".repeat(level) + `${JSON.stringify(_minusculize(key)).slice(1, -1)}(` + JSON.stringify(value) + ")";
                  }
                }
                if (k != Array.from(damonMap2.keys())[Array.from(damonMap2.keys()).length - 1]) {
                  mathJs += ",\n";
                } else {
                  mathJs += "\n";
                }
              }
            } else if (Array.isArray(damonMap2)) {
              for (var i = 0, c = damonMap2.length; i < c; i++) {
                if (typeof damonMap2[i] === "object" && damonMap2[i] !== null) {
                  if (Array.isArray(damonMap2[i])) {
                    if (damonMap2[i].length > 0) {
                      if (damonMap2.damonInlineArrays !== void 0 && damonMap2.damonInlineArrays.indexOf(i) > -1) {
                        if (damonMap2[i] === true) {
                          mathJs += "    ".repeat(level) + "true";
                        } else if (damonMap2[i] === false) {
                          mathJs += "    ".repeat(level) + "false";
                        } else if (damonMap2[i] === null) {
                          mathJs += "    ".repeat(level) + "null";
                        } else if (Number.isFinite(damonMap2[i]) && !Number.isNaN(damonMap2[i])) {
                          mathJs += "    ".repeat(level) + damonMap2[i];
                        } else {
                          mathJs += "    ".repeat(level) + JSON.stringify(damonMap2[i]).slice(1, -1);
                        }
                      } else {
                        mathJs += "    ".repeat(level) + `(
`;
                        _recurse(damonMap2[i], level + 1);
                        mathJs += "    ".repeat(level) + `)`;
                      }
                    } else {
                      mathJs += "    ".repeat(level) + `()`;
                    }
                  } else {
                    if (Array.from(damonMap2[i].keys()).length > 0) {
                      mathJs += "    ".repeat(level) + `(
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
                    mathJs += "    ".repeat(level) + JSON.stringify(damonMap2[i]).slice(1, -1);
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
                          newListItem.className = "blue-diff";
                          newListItem.setAttribute("aria-describedby", "damonDiffBlue");
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
                        firstMapKey = Array.from(secondMapCurrentFractal.keys())[index];
                        firstMapValue = secondMapCurrentFractal.get(firstMapKey);
                        key = firstMapKey;
                        value = firstMapValue;
                      } else if (newListItem.className === "yellow-diff") {
                        if (index > Array.from(firstMapCurrentFractal.keys()).length - 1) {
                          newListItem.className = "green-diff";
                          newListItem.setAttribute("aria-describedby", "damonDiffGreen");
                          firstMapKey = Array.from(secondMapCurrentFractal.keys())[index];
                          firstMapValue = secondMapCurrentFractal.get(firstMapKey);
                          key = firstMapKey;
                          value = firstMapValue;
                        } else {
                          key = "";
                          value = "";
                          newListItem.className = "red-diff";
                          newListItem.setAttribute("aria-describedby", "damonDiffRed");
                        }
                      } else {
                        newListItem.className = "blue-diff";
                        newListItem.setAttribute("aria-describedby", "damonDiffBlue");
                        firstMapKey = Array.from(secondMapCurrentFractal.keys())[index];
                        firstMapValue = secondMapCurrentFractal.get(firstMapKey);
                        key = firstMapKey;
                        value = firstMapValue;
                      }
                    }
                    if (newListItem.className === "red-diff")
                      newListItem.setAttribute("aria-describedby", "damonDiffRed");
                    if ($.websiteRegex.test(key) || $.pathRegex.test(key)) {
                      let fullUrl = key;
                      if (!$.httpRegex.test(key) && $.websiteRegex.test(key))
                        fullUrl = "https://" + key;
                      let keyLink = DOMPurify.sanitize(`<a href="${fullUrl}"><span>${fullUrl}</span></a>`);
                      keySpan.innerHTML = keyLink;
                    } else {
                      keySpan.textContent = key;
                    }
                    if (typeof value === "object" && value !== null) {
                      if (Array.isArray(value)) {
                        if (firstMap.damonInlineArrays !== void 0 && firstMap.damonInlineArrays.indexOf(key) > -1) {
                          newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>[';
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
                                if ($.websiteRegex.test(childValue) || $.pathRegex.test(childValue)) {
                                  let fullUrl = childValue;
                                  if (!$.httpRegex.test(childValue) && $.websiteRegex.test(childValue))
                                    fullUrl = "https://" + childValue;
                                  childValueSpan.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                                } else {
                                  childValueSpan.innerHTML = `"${childValue}"`;
                                }
                              } else {
                                if ($.websiteRegex.test(childValue) || $.pathRegex.test(childValue)) {
                                  let fullUrl = childValue;
                                  if (!$.httpRegex.test(childValue) && $.websiteRegex.test(childValue))
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
                          newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>[]';
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
                          newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>{}';
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
                      newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>';
                      let valueSpan = document.createElement("span");
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
                      } else if (Number.isFinite(childText) && !Number.isNaN(childText)) {
                        valueSpan.textContent = childText + "";
                        valueSpan.className = "type-number";
                      } else {
                        if (safeHTML) {
                          if ($.websiteRegex.test(childText) || $.pathRegex.test(childText)) {
                            let fullUrl = childText;
                            if (!$.httpRegex.test(childText) && $.websiteRegex.test(childText))
                              fullUrl = "https://" + childText;
                            valueSpan.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                          } else {
                            valueSpan.innerHTML = `"${childText}"`;
                          }
                        } else {
                          if ($.websiteRegex.test(childText) || $.pathRegex.test(childText)) {
                            let fullUrl = childText;
                            if (!$.httpRegex.test(childText) && $.websiteRegex.test(childText))
                              fullUrl = "https://" + childText;
                            valueSpan.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                          } else {
                            valueSpan.textContent = `"${childText}"`;
                          }
                        }
                        valueSpan.className = "type-string";
                      }
                      if (firstMap.implicitNulls === void 0 || firstMap.implicitNulls.indexOf(key) == -1) {
                        newDiv.appendChild(valueSpan);
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
                let firstMapCurrentFractal = firstMap;
                for (let z = 0, x = path.length; z < x; z++) {
                  if (typeof firstMapCurrentFractal === "object" && firstMapCurrentFractal !== null && !Array.isArray(firstMapCurrentFractal) && firstMapCurrentFractal instanceof Map && firstMapCurrentFractal.constructor === Map && Array.from(firstMapCurrentFractal.keys()).length) {
                    firstMapCurrentFractal = firstMapCurrentFractal.get(Array.from(firstMapCurrentFractal.keys())[path[z]]);
                  } else {
                    firstMapCurrentFractal = firstMapCurrentFractal[path[z]];
                  }
                }
                let secondMapCurrentFractal = secondMap;
                for (let z = 0, x = path.length; z < x; z++) {
                  if (typeof secondMapCurrentFractal === "object" && secondMapCurrentFractal !== null && !Array.isArray(secondMapCurrentFractal) && secondMapCurrentFractal instanceof Map && secondMapCurrentFractal.constructor === Map && Array.from(secondMapCurrentFractal.keys()).length) {
                    secondMapCurrentFractal = secondMapCurrentFractal.get(Array.from(secondMapCurrentFractal.keys())[path[z]]);
                  } else {
                    secondMapCurrentFractal = secondMapCurrentFractal[path[z]];
                  }
                }
                for (var i = 0, c = diffMap2.length; i < c; i++) {
                  let newList = document.createElement("ul"), newDiv = document.createElement("code"), newListItem = document.createElement("li"), itemColor = "green", value;
                  newListItem.className = "green-diff";
                  if (typeof diffMap2[i] === "string") {
                    itemColor = diffMap2[i];
                    newListItem.className = diffMap2[i] + "-diff";
                  }
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
                              if ($.websiteRegex.test(arrayValue) || $.pathRegex.test(arrayValue)) {
                                let fullUrl = arrayValue;
                                if (!$.httpRegex.test(arrayValue) && $.websiteRegex.test(arrayValue))
                                  fullUrl = "https://" + arrayValue;
                                arrayValueSpan.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                              } else {
                                arrayValueSpan.innerHTML = `"${arrayValue}"`;
                              }
                            } else {
                              if ($.websiteRegex.test(arrayValue) || $.pathRegex.test(arrayValue)) {
                                let fullUrl = arrayValue;
                                if (!$.httpRegex.test(arrayValue) && $.websiteRegex.test(arrayValue))
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
                        recurseDiffMap(diffMap2[i], newList, path.concat([i]), itemColor);
                      }
                    } else {
                      newDiv.textContent = "{}";
                      newListItem.appendChild(newDiv);
                      newListItem.appendChild(newList);
                      list2.appendChild(newListItem);
                      recurseDiffMap(diffMap2[i], newList, path.concat([i]), itemColor);
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
                        if ($.websiteRegex.test(childText) || $.pathRegex.test(childText)) {
                          let fullUrl = childText;
                          if (!$.httpRegex.test(childText) && $.websiteRegex.test(childText))
                            fullUrl = "https://" + childText;
                          newDiv.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                        } else {
                          newDiv.innerHTML = `"${childText}"`;
                        }
                      } else {
                        if ($.websiteRegex.test(childText) || $.pathRegex.test(childText)) {
                          let fullUrl = childText;
                          if (!$.httpRegex.test(childText) && $.websiteRegex.test(childText))
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
              let secondMapCurrentFractal = secondMap;
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
                  if ($.websiteRegex.test(key) || $.pathRegex.test(key)) {
                    let fullUrl = key;
                    if (!$.httpRegex.test(key) && $.websiteRegex.test(key))
                      fullUrl = "https://" + key;
                    let keyLink = DOMPurify.sanitize(`<a href="${fullUrl}">${fullUrl}</a>`);
                    keySpan.innerHTML = keyLink;
                  } else {
                    keySpan.textContent = key;
                  }
                  if (typeof value === "object" && value !== null) {
                    if (Array.isArray(value)) {
                      if (secondMap2.damonInlineArrays !== void 0 && secondMap2.damonInlineArrays.indexOf(key) > -1) {
                        newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>[';
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
                              if ($.websiteRegex.test(childValue) || $.pathRegex.test(childValue)) {
                                let fullUrl = childValue;
                                if (!$.httpRegex.test(childValue) && $.websiteRegex.test(childValue))
                                  fullUrl = "https://" + childValue;
                                childValueSpan.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                              } else {
                                childValueSpan.innerHTML = `"${childValue}"`;
                              }
                            } else {
                              if ($.websiteRegex.test(childValue) || $.pathRegex.test(childValue)) {
                                let fullUrl = childValue;
                                if (!$.httpRegex.test(childValue) && $.websiteRegex.test(childValue))
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
                        newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>[]';
                        newListItem.appendChild(newDiv);
                        newListItem.appendChild(newList);
                        list2.appendChild(newListItem);
                        recurseSecondMap(value, newList, path.concat([index]), color);
                      }
                    } else {
                      if (secondMap2.implicitMaps !== void 0 && secondMap2.implicitMaps.indexOf(key) > -1) {
                        newDiv.innerHTML = keySpan.outerHTML;
                      } else {
                        newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>{}';
                      }
                      newListItem.appendChild(newDiv);
                      newListItem.appendChild(newList);
                      list2.appendChild(newListItem);
                      recurseSecondMap(value, newList, path.concat([index]), color);
                    }
                  } else {
                    newDiv.innerHTML = keySpan.outerHTML + '<span class="operator">: </span>';
                    let valueSpan = document.createElement("span");
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
                    } else if (Number.isFinite(childText) && !Number.isNaN(childText)) {
                      valueSpan.textContent = childText + "";
                      valueSpan.className = "type-number";
                    } else {
                      if (safeHTML) {
                        if ($.websiteRegex.test(childText) || $.pathRegex.test(childText)) {
                          let fullUrl = childText;
                          if (!$.httpRegex.test(childText) && $.websiteRegex.test(childText))
                            fullUrl = "https://" + childText;
                          valueSpan.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                        } else {
                          valueSpan.innerHTML = `"${childText}"`;
                        }
                      } else {
                        if ($.websiteRegex.test(childText) || $.pathRegex.test(childText)) {
                          let fullUrl = childText;
                          if (!$.httpRegex.test(childText) && $.websiteRegex.test(childText))
                            fullUrl = "https://" + childText;
                          valueSpan.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                        } else {
                          valueSpan.textContent = `"${childText}"`;
                        }
                      }
                      valueSpan.className = "type-string";
                    }
                    if (secondMap2.implicitNulls === void 0 || secondMap2.implicitNulls.indexOf(key) == -1) {
                      newDiv.appendChild(valueSpan);
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
                        let valueSpan = document.createElement("span"), value = secondMap2[i][j];
                        if (value === true) {
                          valueSpan.textContent = "true";
                          valueSpan.className = "type-boolean";
                        } else if (value === false) {
                          valueSpan.textContent = "false";
                          valueSpan.className = "type-boolean";
                        } else if (value === null) {
                          valueSpan.textContent = "null";
                          valueSpan.className = "type-null";
                        } else if (Number.isFinite(value) && !Number.isNaN(value)) {
                          valueSpan.textContent = value + "";
                          valueSpan.className = "type-number";
                        } else {
                          if (safeHTML) {
                            if ($.websiteRegex.test(value) || $.pathRegex.test(value)) {
                              let fullUrl = value;
                              if (!$.httpRegex.test(value) && $.websiteRegex.test(value))
                                fullUrl = "https://" + value;
                              valueSpan.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                            } else {
                              valueSpan.innerHTML = `"${value}"`;
                            }
                          } else {
                            if ($.websiteRegex.test(value) || $.pathRegex.test(value)) {
                              let fullUrl = value;
                              if (!$.httpRegex.test(value) && $.websiteRegex.test(value))
                                fullUrl = "https://" + value;
                              valueSpan.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                            } else {
                              valueSpan.textContent = `"${value}"`;
                            }
                          }
                          valueSpan.className = "type-string";
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
                      if ($.websiteRegex.test(childText) || $.pathRegex.test(childText)) {
                        let fullUrl = childText;
                        if (!$.httpRegex.test(childText) && $.websiteRegex.test(childText))
                          fullUrl = "https://" + childText;
                        newDiv.innerHTML = DOMPurify.sanitize(`<a href="${fullUrl}">"${fullUrl}"</a>`);
                      } else {
                        newDiv.innerHTML = `"${childText}"`;
                      }
                    } else {
                      if ($.websiteRegex.test(childText) || $.pathRegex.test(childText)) {
                        let fullUrl = childText;
                        if (!$.httpRegex.test(childText) && $.websiteRegex.test(childText))
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
         * @param {damonValue} map
         * @returns  {string}
         */
        damonTableMapToCSV(map) {
          const $ = this;
          let output = "";
          for (const [key, value] of map) {
            let valueKeys = Array.from(value.keys());
            for (let i = 0, c = valueKeys.length; i < c; i++) {
              let childKey = valueKeys[i].slice(valueKeys[i].match(/^[0-9]+-/)[0].length);
              output += Papa.unparse([[childKey]], { quotes: true });
              if (i != c - 1) {
                output += ",";
              }
            }
            output += "\n";
          }
          return output.slice(0, -1);
        }
        /**
         * @param {damonValue} map
         * @returns {string}
         */
        damonTableMapToJSON(map, format = "array-rows") {
          const $ = this;
          if (format == "array-rows") {
            let output = "[\n";
            for (const [key, value] of map) {
              output += "    [";
              let valueKeys = Array.from(value.keys());
              for (let i = 0, c = valueKeys.length; i < c; i++) {
                let childKey = valueKeys[i].slice(valueKeys[i].match(/^[0-9]+-/)[0].length);
                output += JSON.stringify(childKey);
                if (i != c - 1) {
                  output += ", ";
                }
              }
              output += "],\n";
            }
            output = output.slice(0, -2) + "\n]";
            return output;
          } else {
            let output = "[\n", index = -1, headerMap = /* @__PURE__ */ new Map();
            for (const [key, value] of map) {
              index++;
              if (index === 0) {
                for (const [subKey, subValue] of value) {
                  headerMap.set(subKey.slice(subKey.match(/^[0-9]+-/)[0].length), null);
                }
              } else {
                let z = -1;
                let subMapKeys = Array.from(value.keys());
                for (const [headerKey, headerValue] of headerMap) {
                  z++;
                  if (subMapKeys[z]) {
                    headerMap.set(headerKey, subMapKeys[z].slice(subMapKeys[z].match(/^[0-9]+-/)[0].length));
                  } else {
                    headerMap.set(headerKey, null);
                  }
                }
                output += $.damon.mapToJSON(headerMap).split("\n").map((x) => "   " + x).join("\n");
                output += ",\n";
              }
            }
            output = output.slice(0, -2) + "\n]";
            return output;
          }
        }
        /**
         * @param {String} string
         * @returns {string}
         */
        csvToDamonTable(string, headless = false) {
          const $ = this;
          let parseResult = Papa.parse(string);
          if (parseResult.meta.aborted)
            throw new Error("CSV parsing failed");
          return $.jsonToDamonTable(JSON.stringify(parseResult.data));
        }
        /**
         * @param {String} string
         * @returns {string}
         */
        jsonToDamonTable(string, format = "array-rows") {
          const $ = this;
          let damonMap = /* @__PURE__ */ new Map();
          if (format === "array-rows") {
            let lines = JSON.parse(string);
            for (let i = 0, c = lines.length; i < c; i++) {
              let rowMap = /* @__PURE__ */ new Map(), indexedKey = i + "-" + (i + "");
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
            damonMap.set("0-0", /* @__PURE__ */ new Map());
            let i = -1;
            for (const [key, value] of map[0]) {
              i++;
              damonMap.get("0-0").set(i + "-" + key, null);
            }
            for (let z = 0, x = map.length; z < x; z++) {
              let indexPrefixedKey = z + 1 + "-" + (z + 1);
              damonMap.set(indexPrefixedKey, /* @__PURE__ */ new Map());
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
            let div = document.createElement("div");
            for (let z = listItems[i].childNodes.length - 1; z >= 0; z--) {
              if (listItems[i].childNodes[z].tagName && (listItems[i].childNodes[z].tagName !== "UL" && listItems[i].childNodes[z].tagName !== "OL") || listItems[i].childNodes[z].nodeType == 3 && listItems[i].childNodes[z].data != "\n" && listItems[i].childNodes[z].data != "\r\n") {
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
         * @param {NodeList } listItems
         * @param {String} damon
         */
        addLineNumbers(damon, container, startLine = 0) {
          let $ = this, listItems = container.querySelectorAll("li[data-graph-arbo]");
          for (let i = 0, c = listItems.length; i < c; i++) {
            let lineNumberDiv = document.createElement("div");
            lineNumberDiv.className = "damon-line-number";
            let currentLevel = $.damon.damonToMap(damon), abstractPath = listItems[i].dataset.graphArbo.split("-"), concretePath = [];
            for (let z = 0, x = abstractPath.length; z < x; z++) {
              if (typeof currentLevel === "object" && currentLevel !== null && !Array.isArray(currentLevel) && currentLevel instanceof Map && currentLevel.constructor === Map) {
                concretePath.push(Array.from(currentLevel.keys())[abstractPath[z]]);
                currentLevel = currentLevel.get(concretePath[z]);
              } else {
                concretePath.push(parseInt(abstractPath[z]));
                currentLevel = currentLevel[concretePath[z]];
              }
            }
            lineNumberDiv.textContent = $.damon.getRangeFromPath(
              damon,
              concretePath
            )[0][0] + 1 + startLine;
            lineNumberDiv.id = "damonLine" + lineNumberDiv.textContent;
            listItems[i].setAttribute("aria-labelledBy", lineNumberDiv.id);
            lineNumberDiv.style.top = container.scrollTop + listItems[i].firstElementChild.getBoundingClientRect().top - container.getBoundingClientRect().top + "px";
            container.appendChild(lineNumberDiv);
          }
        }
        /**
         * Must occur after rendering
         * @param {NodeList } listItems
         * @param {String} damon
         */
        addTableLineNumbers(damon, container, startLine = 0) {
          let $ = this, nodeList = container.querySelectorAll("th[data-graph-arbo]:first-child, td[data-graph-arbo]:first-child");
          for (let i = 0, c = nodeList.length; i < c; i++) {
            let lineNumberDiv = document.createElement("div");
            lineNumberDiv.className = "damon-line-number";
            lineNumberDiv.textContent = $.damon.getRangeFromPath(
              damon,
              [Array.from($.damon.damonToMap(damon).keys())[i]]
            )[0][0] + 1 + startLine;
            lineNumberDiv.id = "damonLine" + lineNumberDiv.textContent;
            nodeList[i].setAttribute("aria-labelledBy", lineNumberDiv.id);
            lineNumberDiv.style.top = container.scrollTop + nodeList[i].getBoundingClientRect().top - container.getBoundingClientRect().top + "px";
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
          let mermaid = "";
          if (typeof map !== "object" || map === null || Array.isArray(map) || !(map instanceof Map) || map.constructor !== Map) {
            throw new Error("Error: input does not conform to Map type");
          }
          let mapIndex = 0;
          for (const [key, value] of map) {
            mapIndex++;
            if (value === null) {
              mermaid += key + "\r\n";
              continue;
            }
            if (typeof value !== "object" || Array.isArray(value) || !(value instanceof Map) || value.constructor !== Map) {
              throw new Error(
                "Error line " + $.damon.mapIndexToLine(map, mapIndex) + startLine + ": value does not conform to Map type"
              );
            }
            if (Array.from(value.keys()).length) {
              for (const [subKey, subValue] of value) {
                mapIndex++;
                if (typeof subValue !== "string") {
                  throw new Error(
                    "Error line " + $.damon.mapIndexToLine(map, mapIndex) + startLine + ": value does not conform to String type"
                  );
                }
                let adjacents = subValue.split(",");
                for (let i = 0, c = adjacents.length; i < c; i++) {
                  mermaid += key + " " + subKey + " " + adjacents[i] + "\r\n";
                }
              }
            } else {
              mermaid += key + "\r\n";
            }
          }
          return mermaid.slice(0, -2);
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
  (*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE *)

papaparse/papaparse.min.js:
  (* @license
  Papa Parse
  v5.5.3
  https://github.com/mholt/PapaParse
  License: MIT
  *)
*/
//# sourceMappingURL=out.js.map
