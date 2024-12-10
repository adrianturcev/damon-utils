# Damon-utils

A post-processing library for [DAMON](https://github.com/adrianturcev/DAMON)

## Installation

Node:

```bash
npm install damon-utils
```

## Building

```Bash
npm run watch # dev
npm run build # distribuable
```

## Usage

Core methods:

```js
const Damon = require('damon2'),
    DamonUtils = require('damon-utils);
let damon = new Damon(),
    damonUtils = new DamonUtils(damon);

let damonString = `
    - Divide: {}
        - n
        - Add: {}
            - 1
            - n`;

console.log(damonUtils.damonToSExpression(damonString));
// [
//     "Divide",
//     "n",
//     [
//         "Add",
//         "1",
//         "n"
//     ]
// ],
```

## License

Copyright (c) Adrian Turcev. All rights reserved.

Licensed under the MPL-2.0 license.
