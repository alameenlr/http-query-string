
# http-query-string

  

> Parse HTTP [Query String](https://en.wikipedia.org/wiki/Query_string) to [JSON Object](https://en.wikipedia.org/wiki/JSON), and Build HTTP [Query String](https://en.wikipedia.org/wiki/Query_string) from [JSON Object](https://en.wikipedia.org/wiki/JSON).

---

## Install

  

```sh

npm  install  http-query-string

```

For browser usage, this package targets the latest version of Chrome, Firefox, and Safari.


## Usage

  

```js

import  httpQueryString  from  'http-query-string';

  

console.log(location.search);

//=> '?foo=bar'

  

const  parsed = httpQueryString.parse(location.search);

console.log(parsed);

//=> {foo: 'bar'}

  

console.log(location.hash);

//=> '#token=bada55cafe'

  

const  parsedHash = httpQueryString.parse(location.hash);

console.log(parsedHash);

//=> {token: 'bada55cafe'}

  

parsed.foo = 'unicorn';

parsed.ilike = 'pizza';

  

const  stringified = httpQueryString.stringify(parsed);

//=> 'foo=unicorn&ilike=pizza'

  

location.search = stringified;

// note that `location.search` automatically prepends a question mark

console.log(location.search);

//=> '?foo=unicorn&ilike=pizza'

let  obj  = {
	"a":1,
	"b":10.5,
	"c":{
		"d":"abcd",
		"e":"pqrs",
		"f":{
			"af":"af0",
			"bf":{
				"a":10,
				"b":20,
				"c":30
			}
		}
	}
}
let  queryStr  =  httpQueryString.stringify(obj);
console.log(queryStr);
//=> 'a=1&b=10.5&c[d]=abcd&c[e]=pqrs&c[f][af]=af0&c[f][bf][a]=10&c[f][bf][b]=20&c[f][bf][c]=30'

obj  =  httpQueryString.parse(queryStr)
console.log(obj);
//=> {"a":1,"b":10.5,"c":{"d":"abcd","e":"pqrs","f":{"af":"af0","bf":{"a":10,"b":20,"c":30}}}}

```

  

## API

  

### .parse(string, options?)

  

Parse a query string into an object. Leading `?` or `#` are ignored, so you can pass `location.search` or `location.hash` directly.

  

The returned object is created with [`Object.create(null)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) and thus does not have a `prototype`.

  

#### options

  

Type: `object`

  

##### decode

  

Type: `boolean`\

Default: `true`

  

Decode the keys and values. URL components are decoded with [`decode-uri-component`](https://github.com/SamVerschueren/decode-uri-component).

  

##### arrayFormat

  

Type: `string`\

Default: `'none'`

  

-  `'bracket'`: Parse arrays with bracket representation:

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.parse('foo[]=1&foo[]=2&foo[]=3', {arrayFormat:  'bracket'});

//=> {foo: ['1', '2', '3']}

```

  

-  `'index'`: Parse arrays with index representation:

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.parse('foo[0]=1&foo[1]=2&foo[3]=3', {arrayFormat:  'index'});

//=> {foo: ['1', '2', '3']}

```

  

-  `'comma'`: Parse arrays with elements separated by comma:

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.parse('foo=1,2,3', {arrayFormat:  'comma'});

//=> {foo: ['1', '2', '3']}

```

  

-  `'separator'`: Parse arrays with elements separated by a custom character:

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.parse('foo=1|2|3', {arrayFormat:  'separator', arrayFormatSeparator:  '|'});

//=> {foo: ['1', '2', '3']}

```

  

-  `'bracket-separator'`: Parse arrays (that are explicitly marked with brackets) with elements separated by a custom character:

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.parse('foo[]', {arrayFormat:  'bracket-separator', arrayFormatSeparator:  '|'});

//=> {foo: []}

  

httpQueryString.parse('foo[]=', {arrayFormat:  'bracket-separator', arrayFormatSeparator:  '|'});

//=> {foo: ['']}

  

httpQueryString.parse('foo[]=1', {arrayFormat:  'bracket-separator', arrayFormatSeparator:  '|'});

//=> {foo: ['1']}

  

httpQueryString.parse('foo[]=1|2|3', {arrayFormat:  'bracket-separator', arrayFormatSeparator:  '|'});

//=> {foo: ['1', '2', '3']}

  

httpQueryString.parse('foo[]=1||3|||6', {arrayFormat:  'bracket-separator', arrayFormatSeparator:  '|'});

//=> {foo: ['1', '', 3, '', '', '6']}

  

httpQueryString.parse('foo[]=1|2|3&bar=fluffy&baz[]=4', {arrayFormat:  'bracket-separator', arrayFormatSeparator:  '|'});

//=> {foo: ['1', '2', '3'], bar: 'fluffy', baz:['4']}

```

  

-  `'colon-list-separator'`: Parse arrays with parameter names that are explicitly marked with `:list`:

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.parse('foo:list=one&foo:list=two', {arrayFormat:  'colon-list-separator'});

//=> {foo: ['one', 'two']}

```

  

-  `'none'`: Parse arrays with elements using duplicate keys:

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.parse('foo=1&foo=2&foo=3');

//=> {foo: ['1', '2', '3']}

```

  

##### arrayFormatSeparator

  

Type: `string`\

Default: `','`

  

The character used to separate array elements when using `{arrayFormat: 'separator'}`.

  

##### sort

  

Type: `Function | boolean`\

Default: `true`

  

Supports both `Function` as a custom sorting function or `false` to disable sorting.

  

##### parseNumbers

  

Type: `boolean`\

Default: `false`

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.parse('foo=1', {parseNumbers:  true});

//=> {foo: 1}

```

  

Parse the value as a number type instead of string type if it's a number.

  

##### parseBooleans

  

Type: `boolean`\

Default: `false`

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.parse('foo=true', {parseBooleans:  true});

//=> {foo: true}

```

  

Parse the value as a boolean type instead of string type if it's a boolean.

  

### .stringify(object, options?)

  

Stringify an object into a query string and sorting the keys.

  

#### options

  

Type: `object`

  

##### strict

  

Type: `boolean`\

Default: `true`

  

Strictly encode URI components. It uses [encodeURIComponent](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) if set to false. You probably [don't care](https://github.com/sindresorhus/http-query-string/issues/42) about this option.

  

##### encode

  

Type: `boolean`\

Default: `true`

  

[URL encode](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) the keys and values.

  

##### arrayFormat

  

Type: `string`\

Default: `'none'`

  

-  `'bracket'`: Serialize arrays using bracket representation:

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.stringify({foo: [1, 2, 3]}, {arrayFormat:  'bracket'});

//=> 'foo[]=1&foo[]=2&foo[]=3'

```

  

-  `'index'`: Serialize arrays using index representation:

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.stringify({foo: [1, 2, 3]}, {arrayFormat:  'index'});

//=> 'foo[0]=1&foo[1]=2&foo[2]=3'

```

  

-  `'comma'`: Serialize arrays by separating elements with comma:

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.stringify({foo: [1, 2, 3]}, {arrayFormat:  'comma'});

//=> 'foo=1,2,3'

  

httpQueryString.stringify({foo: [1, null, '']}, {arrayFormat:  'comma'});

//=> 'foo=1,,'

// Note that typing information for null values is lost

// and `.parse('foo=1,,')` would return `{foo: [1, '', '']}`.

```

  

-  `'separator'`: Serialize arrays by separating elements with a custom character:

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.stringify({foo: [1, 2, 3]}, {arrayFormat:  'separator', arrayFormatSeparator:  '|'});

//=> 'foo=1|2|3'

```

  

-  `'bracket-separator'`: Serialize arrays by explicitly post-fixing array names with brackets and separating elements with a custom character:

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.stringify({foo: []}, {arrayFormat:  'bracket-separator', arrayFormatSeparator:  '|'});

//=> 'foo[]'

  

httpQueryString.stringify({foo: ['']}, {arrayFormat:  'bracket-separator', arrayFormatSeparator:  '|'});

//=> 'foo[]='

  

httpQueryString.stringify({foo: [1]}, {arrayFormat:  'bracket-separator', arrayFormatSeparator:  '|'});

//=> 'foo[]=1'

  

httpQueryString.stringify({foo: [1, 2, 3]}, {arrayFormat:  'bracket-separator', arrayFormatSeparator:  '|'});

//=> 'foo[]=1|2|3'

  

httpQueryString.stringify({foo: [1, '', 3, null, null, 6]}, {arrayFormat:  'bracket-separator', arrayFormatSeparator:  '|'});

//=> 'foo[]=1||3|||6'

  

httpQueryString.stringify({foo: [1, '', 3, null, null, 6]}, {arrayFormat:  'bracket-separator', arrayFormatSeparator:  '|', skipNull:  true});

//=> 'foo[]=1||3|6'

  

httpQueryString.stringify({foo: [1, 2, 3], bar:  'fluffy', baz: [4]}, {arrayFormat:  'bracket-separator', arrayFormatSeparator:  '|'});

//=> 'foo[]=1|2|3&bar=fluffy&baz[]=4'

```

  

-  `'colon-list-separator'`: Serialize arrays with parameter names that are explicitly marked with `:list`:

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.stringify({foo: ['one', 'two']}, {arrayFormat:  'colon-list-separator'});

//=> 'foo:list=one&foo:list=two'

```

  

-  `'none'`: Serialize arrays by using duplicate keys:

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.stringify({foo: [1, 2, 3]});

//=> 'foo=1&foo=2&foo=3'

```

  

##### arrayFormatSeparator

  

Type: `string`\

Default: `','`

  

The character used to separate array elements when using `{arrayFormat: 'separator'}`.

  

##### sort

  

Type: `Function | boolean`

  

Supports both `Function` as a custom sorting function or `false` to disable sorting.

  

```js

import  httpQueryString  from  'http-query-string';

  

const  order = ['c', 'a', 'b'];

  

httpQueryString.stringify({a:  1, b:  2, c:  3}, {

sort: (a, b) =>  order.indexOf(a) - order.indexOf(b)

});

//=> 'c=3&a=1&b=2'

```

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.stringify({b:  1, c:  2, a:  3}, {sort:  false});

//=> 'b=1&c=2&a=3'

```

  

If omitted, keys are sorted using `Array#sort()`, which means, converting them to strings and comparing strings in Unicode code point order.

  

##### skipNull

  

Skip keys with `null` as the value.

  

Note that keys with `undefined` as the value are always skipped.

  

Type: `boolean`\

Default: `false`

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.stringify({a:  1, b:  undefined, c:  null, d:  4}, {

skipNull:  true

});

//=> 'a=1&d=4'

```

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.stringify({a:  undefined, b:  null}, {

skipNull:  true

});

//=> ''

```

  

##### skipEmptyString

  

Skip keys with an empty string as the value.

  

Type: `boolean`\

Default: `false`

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.stringify({a:  1, b:  '', c:  '', d:  4}, {

skipEmptyString:  true

});

//=> 'a=1&d=4'

```

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.stringify({a:  '', b:  ''}, {

skipEmptyString:  true

});

//=> ''

```

  

### .extract(string)

  

Extract a query string from a URL that can be passed into `.parse()`.

  

Note: This behaviour can be changed with the `skipNull` option.

  

### .parseUrl(string, options?)

  

Extract the URL and the query string as an object.

  

Returns an object with a `url` and `query` property.

  

If the `parseFragmentIdentifier` option is `true`, the object will also contain a `fragmentIdentifier` property.

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.parseUrl('https://foo.bar?foo=bar');

//=> {url: 'https://foo.bar', query: {foo: 'bar'}}

  

httpQueryString.parseUrl('https://foo.bar?foo=bar#xyz', {parseFragmentIdentifier:  true});

//=> {url: 'https://foo.bar', query: {foo: 'bar'}, fragmentIdentifier: 'xyz'}

```

  

#### options

  

Type: `object`

  

The options are the same as for `.parse()`.

  

Extra options are as below.

  

##### parseFragmentIdentifier

  

Parse the fragment identifier from the URL.

  

Type: `boolean`\

Default: `false`

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.parseUrl('https://foo.bar?foo=bar#xyz', {parseFragmentIdentifier:  true});

//=> {url: 'https://foo.bar', query: {foo: 'bar'}, fragmentIdentifier: 'xyz'}

```

  

### .stringifyUrl(object, options?)

  

Stringify an object into a URL with a query string and sorting the keys. The inverse of [`.parseUrl()`](https://github.com/sindresorhus/http-query-string#parseurlstring-options)

  

The `options` are the same as for `.stringify()`.

  

Returns a string with the URL and a query string.

  

Query items in the `query` property overrides queries in the `url` property.

  

The `fragmentIdentifier` property overrides the fragment identifier in the `url` property.

  

```js

httpQueryString.stringifyUrl({url:  'https://foo.bar', query: {foo:  'bar'}});

//=> 'https://foo.bar?foo=bar'

  

httpQueryString.stringifyUrl({url:  'https://foo.bar?foo=baz', query: {foo:  'bar'}});

//=> 'https://foo.bar?foo=bar'

  

httpQueryString.stringifyUrl({

url:  'https://foo.bar',

query: {

top:  'foo'

},

fragmentIdentifier:  'bar'

});

//=> 'https://foo.bar?top=foo#bar'

```

  

#### object

  

Type: `object`

  

##### url

  

Type: `string`

  

The URL to stringify.

  

##### query

  

Type: `object`

  

Query items to add to the URL.

  

### .pick(url, keys, options?)

### .pick(url, filter, options?)

  

Pick query parameters from a URL.

  

Returns a string with the new URL.

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.pick('https://foo.bar?foo=1&bar=2#hello', ['foo']);

//=> 'https://foo.bar?foo=1#hello'

  

httpQueryString.pick('https://foo.bar?foo=1&bar=2#hello', (name, value) =>  value === 2, {parseNumbers:  true});

//=> 'https://foo.bar?bar=2#hello'

```

  

### .exclude(url, keys, options?)

### .exclude(url, filter, options?)

  

Exclude query parameters from a URL.

  

Returns a string with the new URL.

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.exclude('https://foo.bar?foo=1&bar=2#hello', ['foo']);

//=> 'https://foo.bar?bar=2#hello'

  

httpQueryString.exclude('https://foo.bar?foo=1&bar=2#hello', (name, value) =>  value === 2, {parseNumbers:  true});

//=> 'https://foo.bar?foo=1#hello'

```

  

#### url

  

Type: `string`

  

The URL containing the query parameters to filter.

  

#### keys

  

Type: `string[]`

  

The names of the query parameters to filter based on the function used.

  

#### filter

  

Type: `(key, value) => boolean`

  

A filter predicate that will be provided the name of each query parameter and its value. The `parseNumbers` and `parseBooleans` options also affect `value`.

  

#### options

  

Type: `object`

  

[Parse options](#options) and [stringify options](#options-1).

  

## Nesting

  

This module intentionally doesn't support nesting as it's not spec'd and varies between implementations, which causes a lot of [edge cases](https://github.com/visionmedia/node-querystring/issues).

  

You're much better off just converting the object to a JSON string:

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.stringify({

foo:  'bar',

nested:  JSON.stringify({

unicorn:  'cake'

})

});

//=> 'foo=bar&nested=%7B%22unicorn%22%3A%22cake%22%7D'

```

  

However, there is support for multiple instances of the same key:

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.parse('likes=cake&name=bob&likes=icecream');

//=> {likes: ['cake', 'icecream'], name: 'bob'}

  

httpQueryString.stringify({color: ['taupe', 'chartreuse'], id:  '515'});

//=> 'color=taupe&color=chartreuse&id=515'

```

  

## Falsy values

  

Sometimes you want to unset a key, or maybe just make it present without assigning a value to it. Here is how falsy values are stringified:

  

```js

import  httpQueryString  from  'http-query-string';

  

httpQueryString.stringify({foo:  false});

//=> 'foo=false'

  

httpQueryString.stringify({foo:  null});

//=> 'foo'

  

httpQueryString.stringify({foo:  undefined});

//=> ''

```

  

## FAQ

  

### Why is it parsing `+` as a space?

  

See [this answer](https://github.com/sindresorhus/http-query-string/issues/305).