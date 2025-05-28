const globals = require("globals");
const js = require("@eslint/js");
const jsdoc = require('eslint-plugin-jsdoc');

module.exports = [
    {
        "ignores": ["**/node_modules/**/*", "**/build"],
    },
    js.configs.recommended,
    jsdoc.configs['flat/recommended'],
    {
        "languageOptions": {
            "ecmaVersion": 2022,
            "sourceType": "commonjs",
            "globals": {
                ...globals.browser,
                ...globals.commonjs,
                ...globals.mocha,
            },
        },
        "plugins": {
            "jsdoc": jsdoc
        },
        "rules": {
            // Suggestions
            "accessor-pairs": "warn",
            "arrow-body-style": "warn",
            "block-scoped-var": "warn",
            "camelcase": "warn",
            "consistent-this": "warn",
            "curly": "off",
            "default-param-last": "warn",
            "dot-notation": "warn",
            "eqeqeq": [
                "warn",
                "smart"
            ],
            "func-style": [
                "warn",
                "declaration"
            ],
            "max-classes-per-file": [
                "warn",
                {
                    "ignoreExpressions": true
                }
            ],
            "max-nested-callbacks": "warn",
            "new-cap": "warn",
            "no-confusing-arrow": "warn",
            "no-console": "warn",
            "no-continue": "warn",
            "no-extra-label": "warn",
            "no-implicit-coercion": [
                "warn",
                {
                    "allow": [
                        "+",
                        "*"
                    ]
                }
            ],
            "no-inline-comments": "warn",
            "no-lonely-if": "off",
            "no-multi-str": "warn",
            "no-return-assign": [
                "warn",
                "always"
            ],
            "no-sequences": "warn",
            "no-ternary": "warn",
            "no-throw-literal": "warn",
            "no-unused-expressions": "warn",
            "no-unused-vars": "warn",
            "no-undefined": "warn",
            "one-var": "warn",
            "one-var-declaration-per-line": [
                "warn",
                "always"
            ],
            "prefer-const": "warn",
            "spaced-comment": "warn",
            "yoda": "warn",
            // Layout & Formatting
            "array-bracket-spacing": "warn",
            "arrow-spacing": "warn",
            "brace-style": "warn",
            "comma-style": "warn",
            "computed-property-spacing": "warn",
            "dot-location": ["warn", "property"],
            "eol-last": "warn",
            "func-call-spacing": "warn",
            "implicit-arrow-linebreak": "warn",
            "indent": "off",
            "key-spacing": "warn",
            "keyword-spacing": "warn",
            "linebreak-style": ["warn", "windows"],
            "max-len": [
                "warn",
                {
                    "code": 120,
                    "ignoreRegExpLiterals": true
                }
            ],
            "new-parens": "warn",
            "newline-per-chained-call": "warn",
            "no-trailing-spaces": [
                "warn",
                {
                    "skipBlankLines": true
                }
            ],
            "no-whitespace-before-property": "warn",
            "object-curly-spacing": "warn",
            "object-property-newline": "warn",
            "operator-linebreak": [
                "warn",
                "before",
                {
                    "overrides": {
                        "=": "after",
                        "+=": "after",
                        "-=": "after",
                        "*=": "after",
                        "/=": "after",
                        "%=": "after",
                        "**=": "after",
                        "<<=": "after",
                        ">>=": "after",
                        ">>>=": "after",
                        "&=": "after",
                        "^=": "after",
                        "|=": "after",
                        "&&=": "after",
                        "||=": "after",
                        "??=": "after"
                    }
                }
            ],
            "padded-blocks": ["warn", "never"],
            "quotes": [
                "off",
                "single",
                {
                    "avoidEscape": true,
                    "allowTemplateLiterals": true
                }
            ],
            "rest-spread-spacing": "warn",
            "semi": "warn",
            "semi-spacing": "warn",
            "semi-style": "warn",
            "space-before-blocks": "warn",
            "space-before-function-paren": [
                "off",
                {
                    "anonymous": "always",
                    "named": "never",
                    "asyncArrow": "always"
                }
            ],
            "space-in-parens": "off",
            "space-infix-ops": "warn",
            "space-unary-ops": "warn",
            "switch-colon-spacing": "warn",
            "template-curly-spacing": ["off", "always"],
            "template-tag-spacing": "warn",
            // JSDOC
            "jsdoc/check-access": 1, // Recommended
            "jsdoc/check-alignment": 1, // Recommended
            "jsdoc/check-examples": 0,
            "jsdoc/check-indentation": 1,
            "jsdoc/check-line-alignment": 1,
            "jsdoc/check-param-names": 1, // Recommended
            "jsdoc/check-property-names": 1, // Recommended
            "jsdoc/check-syntax": 1,
            "jsdoc/check-tag-names": 1, // Recommended
            "jsdoc/check-types": 1, // Recommended
            "jsdoc/check-values": 1, // Recommended
            "jsdoc/empty-tags": 1, // Recommended
            "jsdoc/implements-on-classes": 1, // Recommended
            "jsdoc/match-description": 1,
            "jsdoc/multiline-blocks": 1, // Recommended
            "jsdoc/no-bad-blocks": 1,
            "jsdoc/no-defaults": 1,
            "jsdoc/no-missing-syntax": 0,
            "jsdoc/no-multi-asterisks": 1, // Recommended
            "jsdoc/no-restricted-syntax": 0,
            "jsdoc/no-types": 0,
            "jsdoc/no-undefined-types": 1, // Recommended
            "jsdoc/require-asterisk-prefix": 1,
            "jsdoc/require-description": 1,
            "jsdoc/require-description-complete-sentence": 1,
            "jsdoc/require-example": 0,
            "jsdoc/require-file-overview": 0,
            "jsdoc/require-hyphen-before-param-description": 1,
            "jsdoc/require-jsdoc": 1, // Recommended
            "jsdoc/require-param": 1, // Recommended
            "jsdoc/require-param-description": 1, // Recommended
            "jsdoc/require-param-name": 1, // Recommended
            "jsdoc/require-param-type": 1, // Recommended
            "jsdoc/require-property": 1, // Recommended
            "jsdoc/require-property-description": 1, // Recommended
            "jsdoc/require-property-name": 1, // Recommended
            "jsdoc/require-property-type": 1, // Recommended
            "jsdoc/require-returns": 1, // Recommended
            "jsdoc/require-returns-check": 1, // Recommended
            "jsdoc/require-returns-description": 1, // Recommended
            "jsdoc/require-returns-type": 1, // Recommended
            "jsdoc/require-throws": 1,
            "jsdoc/require-yields": 1, // Recommended
            "jsdoc/require-yields-check": 1, // Recommended
            "jsdoc/tag-lines": 1, // Recommended
            "jsdoc/valid-types": 1 // Recommended
        }
    },
];
