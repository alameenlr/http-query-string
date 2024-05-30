/// export * as default from './base.js';

// Workaround for TS missing feature.
import * as httpQueryString from './base.js';

export default httpQueryString;

export {
	type ParseOptions,
	type ParsedQuery,
	type ParsedUrl,
	type StringifyOptions,
	type Stringifiable,
	type StringifiableRecord,
	type UrlObject,
} from './base.js';
