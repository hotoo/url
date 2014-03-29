# URL

---

[![Build Status](https://travis-ci.org/hotoo/url.png)](https://travis-ci.org/hotoo/url)
[![Coverage Status](https://coveralls.io/repos/hotoo/url/badge.png?branch=master)](https://coveralls.io/r/hotoo/url)

Uniform Resource Locator.

---

## Usage

```js
var Url = require("url");

var url = new Url("https://www.example.com/path/to/page?pa=A1&pa=A2&pb=B#hash");
console.log(url);
console.log(url.getParam("pa")); // "A1"
console.log(url.getParams("pa")); // ["A1", "A2"]
```

## API

### new Url(String url)

Constructor.

* `origin`: readonly, and not changed when protocol, hostname, port modified!
  until one day most of all browseres supports `Object.defineProperty()`.
* `protocol`: read+write.
* `username`: read+write.
* `password`: read+write.
* `host`: readonly, not changed same the `origin` property.
* `hostname`: read+write.
* `port`: read+write.
* `path`: read+write.
* `search`: **readonly!** Please use `setParam()`, `addParam()`, `delParam()`,
  and `clearParams()` method to modify query.
* `hash`: read+write.

### String getParam(String name)

Get named `name` param string the first.

### Array getParams(String name)

Get named `name` params string of all.

### Url delParam(String name)

Delete named `name` params.

### Url addParam(String name, String|Array value)

Add params named `name`.

### Url setParam(String name, String|Array)

Add or replace param values named `name`.

### Url clearParams()

Clear all param datas.

### String toString()

Return url string.

### Boolean Url.verify(String url)

Static method.


## Licenses

MIT
