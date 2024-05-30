import {expectType} from 'tsd';
import httpQueryString from './index.js';

// Stringify
expectType<string>(
	httpQueryString.stringify({
		str: 'bar',
		strArray: ['baz'],
		num: 123,
		numArray: [456],
		bool: true,
		boolArray: [false],
	}),
);

expectType<string>(httpQueryString.stringify({foo: 'bar'}, {strict: false}));
expectType<string>(httpQueryString.stringify({foo: 'bar'}, {encode: false}));
expectType<string>(
	httpQueryString.stringify({foo: 'bar'}, {arrayFormat: 'bracket'}),
);
expectType<string>(httpQueryString.stringify({foo: 'bar'}, {arrayFormat: 'index'}));
expectType<string>(httpQueryString.stringify({foo: 'bar'}, {arrayFormat: 'none'}));
expectType<string>(httpQueryString.stringify({foo: 'bar'}, {arrayFormat: 'comma'}));
expectType<string>(httpQueryString.stringify({foo: 'bar'}, {sort: false}));
expectType<string>(httpQueryString.stringify({foo: 'bar'}, {skipNull: true}));
expectType<string>(httpQueryString.stringify({foo: 'bar'}, {skipEmptyString: true}));
const order = ['c', 'a', 'b'];
expectType<string>(
	httpQueryString.stringify(
		{foo: 'bar'},
		{
			sort: (itemLeft, itemRight) =>
				order.indexOf(itemLeft) - order.indexOf(itemRight),
		},
	),
);

// Ensure it accepts an `interface`.
type Query = {
	foo: string;
};

const query: Query = {
	foo: 'bar',
};

httpQueryString.stringify(query);

// Parse
expectType<httpQueryString.ParsedQuery>(httpQueryString.parse('?foo=bar'));

expectType<httpQueryString.ParsedQuery>(
	httpQueryString.parse('?foo=bar', {decode: false}),
);
expectType<httpQueryString.ParsedQuery>(
	httpQueryString.parse('?foo=bar', {arrayFormat: 'bracket'}),
);
expectType<httpQueryString.ParsedQuery>(
	httpQueryString.parse('?foo=bar', {arrayFormat: 'index'}),
);
expectType<httpQueryString.ParsedQuery>(
	httpQueryString.parse('?foo=bar', {arrayFormat: 'none'}),
);
expectType<httpQueryString.ParsedQuery>(
	httpQueryString.parse('?foo=bar', {arrayFormat: 'comma'}),
);
expectType<httpQueryString.ParsedQuery<string | number>>(
	httpQueryString.parse('?foo=1', {parseNumbers: true}),
);
expectType<httpQueryString.ParsedQuery<string | boolean>>(
	httpQueryString.parse('?foo=true', {parseBooleans: true}),
);
expectType<httpQueryString.ParsedQuery<string | boolean | number>>(
	httpQueryString.parse('?foo=true', {parseBooleans: true, parseNumbers: true}),
);

// Parse URL
expectType<httpQueryString.ParsedUrl>(httpQueryString.parseUrl('?foo=bar'));

expectType<httpQueryString.ParsedUrl>(
	httpQueryString.parseUrl('?foo=bar', {decode: false}),
);
expectType<httpQueryString.ParsedUrl>(
	httpQueryString.parseUrl('?foo=bar', {arrayFormat: 'bracket'}),
);
expectType<httpQueryString.ParsedUrl>(
	httpQueryString.parseUrl('?foo=bar', {arrayFormat: 'index'}),
);
expectType<httpQueryString.ParsedUrl>(
	httpQueryString.parseUrl('?foo=bar', {arrayFormat: 'none'}),
);
expectType<httpQueryString.ParsedUrl>(
	httpQueryString.parseUrl('?foo=bar', {arrayFormat: 'comma'}),
);
expectType<httpQueryString.ParsedUrl>(
	httpQueryString.parseUrl('?foo=1', {parseNumbers: true}),
);
expectType<httpQueryString.ParsedUrl>(
	httpQueryString.parseUrl('?foo=true', {parseBooleans: true}),
);
expectType<httpQueryString.ParsedUrl>(
	httpQueryString.parseUrl('?foo=true#bar', {parseFragmentIdentifier: true}),
);

// Extract
expectType<string>(httpQueryString.extract('http://foo.bar/?abc=def&hij=klm'));

expectType<string>(
	httpQueryString.stringifyUrl({
		url: 'https://github.com/alameenlr',
		query: {
			fooMixedArray: [
				'a',
				1,
				true,
				null,
				undefined,
			],
			fooNumber: 1,
			fooBoolean: true,
			fooNull: null,
			fooUndefined: undefined,
			fooString: 'hi',
		},
	}),
);

// Pick
expectType<string>(httpQueryString.pick('http://foo.bar/?abc=def&hij=klm', ['abc']));

// Exclude
expectType<string>(httpQueryString.exclude('http://foo.bar/?abc=def&hij=klm', ['abc']));
