
In addition to automated rules, please abide to the ones defined in the "MANUAL" section.

- Guiding principle
    - consistency and editability before line count minimalization and ease of debugging
    - js style guide
        - inspired by idiomatic.js
    - if a line presents an issue or prevents editability, break it into two lines

# MANUAL

```js
method() {
    let $ = this;
}
```

```js
class ClassName {

}
```

````js
_privateMethod() {}
````

````js
eventHandler() {}
````

````js
document.addEventListener();
````

# AUTOMATED

- You can find those in:
    - .editorconfig
        - docs
    - .eslintrc
        - docs
    - jsconfig.json
        - docs