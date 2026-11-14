import { __commonJSMin, __esmMin, __exportAll, __require, __toCommonJS, __toESM } from "../../_runtime.mjs";
import { import_websocket, init_wrapper } from "./sdk.mjs";
import util from "util";
import crypto$1 from "crypto";
import stream, { Readable } from "stream";
import { randomFillSync, randomUUID } from "node:crypto";
import { resolve } from "path";
import { EventEmitter } from "events";
import http from "http";
import https from "https";
import url from "url";
import http2 from "http2";
import zlib from "zlib";
// node_modules/axios/lib/helpers/bind.js
/**
* Create a bound version of a function with a specified `this` context
*
* @param {Function} fn - The function to bind
* @param {*} thisArg - The value to be passed as the `this` parameter
* @returns {Function} A new function that will call the original function with the specified `this` context
*/
function bind(fn, thisArg) {
	return function wrap() {
		return fn.apply(thisArg, arguments);
	};
}
// node_modules/axios/lib/utils.js
var { toString: toString$1 } = Object.prototype;
var { getPrototypeOf } = Object;
var { iterator, toStringTag } = Symbol;
var hasOwnProperty = (({ hasOwnProperty }) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);
var isUnsafeObjectKey = (prop) => typeof prop === "string" && (prop === "__proto__" || prop === "constructor" || prop === "prototype");
/**
* Determine whether an inherited object must be treated as a shared-prototype
* boundary. Cross-realm Object.prototype objects cannot be distinguished
* reliably from application-created null-prototype objects because their
* properties are mutable, so all inherited terminal prototypes are excluded
* as a fail-closed boundary. A null-prototype source still keeps its own
* properties, as produced by mergeConfig and other safe materialization paths.
*
* @param {*} obj The object to inspect
* @param {*} prototype The object's prototype
* @param {boolean} source Whether obj is the original traversal source
*
* @returns {boolean} True when obj is a safe prototype traversal boundary
*/
var isPrototypeBoundary = (obj, prototype, source) => obj === Object.prototype || !source && prototype === null;
/**
* Determine whether an object can retain its identity through code paths that
* add, replace, and remove config properties without bypassing unsafe-key
* filtering. Immutable objects, unsafe-key-bearing objects, and objects with
* accessor or restricted data properties must be materialized instead.
*
* @param {*} obj The object to inspect
*
* @returns {boolean} True when every own property is safe and fully mutable
*/
var isSafeAndFullyMutable = (obj) => {
	if (!Object.isExtensible(obj)) return false;
	const props = Object.getOwnPropertyNames(obj);
	if (Object.getOwnPropertySymbols) props.push(...Object.getOwnPropertySymbols(obj));
	return props.every((prop) => {
		if (isUnsafeObjectKey(prop)) return false;
		const descriptor = Object.getOwnPropertyDescriptor(obj, prop);
		return !!descriptor && descriptor.configurable && descriptor.writable === true;
	});
};
/**
* Walk the prototype chain (excluding the source realm's Object.prototype)
* looking for an own `prop`. This distinguishes genuine own/inherited members
* — including class accessors and template prototypes — from members injected
* via Object.prototype pollution (e.g. `Object.prototype.username = '...'`),
* which live on Object.prototype itself and are therefore never matched.
*
* @param {*} thing The value whose chain to inspect
* @param {string|symbol} prop The property key to look for
*
* @returns {boolean} True when `prop` is owned below Object.prototype
*/
var hasOwnInPrototypeChain = (thing, prop) => {
	let obj = thing;
	const seen = [];
	while (obj != null) {
		if (seen.indexOf(obj) !== -1) return false;
		seen.push(obj);
		const prototype = getPrototypeOf(obj);
		if (isPrototypeBoundary(obj, prototype, obj === thing)) return false;
		if (hasOwnProperty(obj, prop)) return true;
		obj = prototype;
	}
	return false;
};
/**
* Read `obj[prop]` only when it is safe from Object.prototype pollution. Own
* properties and members inherited from a non-Object.prototype source (a class
* instance or template object) are honored; a value reachable only through a
* polluted Object.prototype is ignored and `undefined` is returned.
*
* @param {*} obj The source object
* @param {string|symbol} prop The property key to read
*
* @returns {*} The resolved value, or undefined when unsafe/absent
*/
var getSafeProp = (obj, prop) => obj != null && hasOwnInPrototypeChain(obj, prop) ? obj[prop] : void 0;
/**
* Flatten an object and its application-defined prototype chain into a
* null-prototype object. Members inherited only from the source realm's
* Object.prototype are deliberately excluded, while class/template members
* below that boundary are preserved.
*
* @param {*} thing The value to flatten
*
* @returns {*} A null-prototype copy, or the original value when it is already
* structurally safe or is not an object
*/
var toSafeFlatObject = (thing) => {
	if (thing == null || typeof thing !== "object" && typeof thing !== "function") return thing;
	const sourcePrototype = getPrototypeOf(thing);
	if (sourcePrototype === null && isSafeAndFullyMutable(thing)) return thing;
	const result = Object.create(null);
	const merged = Object.create(null);
	const seen = [];
	let current = thing;
	while (current != null) {
		if (seen.indexOf(current) !== -1) break;
		seen.push(current);
		const prototype = current === thing ? sourcePrototype : getPrototypeOf(current);
		if (isPrototypeBoundary(current, prototype, current === thing)) break;
		const props = Object.getOwnPropertyNames(current);
		if (Object.getOwnPropertySymbols) props.push(...Object.getOwnPropertySymbols(current));
		for (const prop of props) {
			if (isUnsafeObjectKey(prop)) continue;
			if (!hasOwnProperty(merged, prop)) {
				result[prop] = thing[prop];
				merged[prop] = true;
			}
		}
		current = prototype;
	}
	return result;
};
var kindOf = ((cache) => (thing) => {
	const str = toString$1.call(thing);
	return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));
var kindOfTest = (type) => {
	type = type.toLowerCase();
	return (thing) => kindOf(thing) === type;
};
var typeOfTest = (type) => (thing) => typeof thing === type;
/**
* Determine if a value is a non-null object
*
* @param {Object} val The value to test
*
* @returns {boolean} True if value is an Array, otherwise false
*/
var { isArray } = Array;
/**
* Determine if a value is undefined
*
* @param {*} val The value to test
*
* @returns {boolean} True if the value is undefined, otherwise false
*/
var isUndefined = typeOfTest("undefined");
/**
* Determine if a value is a Buffer
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a Buffer, otherwise false
*/
function isBuffer(val) {
	return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
/**
* Determine if a value is an ArrayBuffer
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is an ArrayBuffer, otherwise false
*/
var isArrayBuffer = kindOfTest("ArrayBuffer");
/**
* Determine if a value is a view on an ArrayBuffer
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
*/
function isArrayBufferView(val) {
	let result;
	if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) result = ArrayBuffer.isView(val);
	else result = val && val.buffer && isArrayBuffer(val.buffer);
	return result;
}
/**
* Determine if a value is a String
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a String, otherwise false
*/
var isString = typeOfTest("string");
/**
* Determine if a value is a Function
*
* @param {*} val The value to test
* @returns {boolean} True if value is a Function, otherwise false
*/
var isFunction$1 = typeOfTest("function");
/**
* Determine if a value is a Number
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a Number, otherwise false
*/
var isNumber = typeOfTest("number");
/**
* Determine if a value is an Object
*
* @param {*} thing The value to test
*
* @returns {boolean} True if value is an Object, otherwise false
*/
var isObject$1 = (thing) => thing !== null && typeof thing === "object";
/**
* Determine if a value is a Boolean
*
* @param {*} thing The value to test
* @returns {boolean} True if value is a Boolean, otherwise false
*/
var isBoolean = (thing) => thing === true || thing === false;
/**
* Determine if a value is a plain Object
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a plain Object, otherwise false
*/
var isPlainObject = (val) => {
	if (!isObject$1(val)) return false;
	const prototype = getPrototypeOf(val);
	return (prototype === null || prototype === Object.prototype || getPrototypeOf(prototype) === null) && !hasOwnInPrototypeChain(val, toStringTag) && !hasOwnInPrototypeChain(val, iterator);
};
/**
* Determine if a value is an empty object (safely handles Buffers)
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is an empty object, otherwise false
*/
var isEmptyObject = (val) => {
	if (!isObject$1(val) || isBuffer(val)) return false;
	try {
		return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
	} catch (e) {
		return false;
	}
};
/**
* Determine if a value is a Date
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a Date, otherwise false
*/
var isDate = kindOfTest("Date");
/**
* Determine if a value is a File
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a File, otherwise false
*/
var isFile = kindOfTest("File");
/**
* Determine if a value is a React Native Blob
* React Native "blob": an object with a `uri` attribute. Optionally, it can
* also have a `name` and `type` attribute to specify filename and content type
*
* @see https://github.com/facebook/react-native/blob/26684cf3adf4094eb6c405d345a75bf8c7c0bf88/Libraries/Network/FormData.js#L68-L71
*
* @param {*} value The value to test
*
* @returns {boolean} True if value is a React Native Blob, otherwise false
*/
var isReactNativeBlob = (value) => {
	return !!(value && typeof value.uri !== "undefined");
};
/**
* Determine if environment is React Native
* ReactNative `FormData` has a non-standard `getParts()` method
*
* @param {*} formData The formData to test
*
* @returns {boolean} True if environment is React Native, otherwise false
*/
var isReactNative$2 = (formData) => formData && typeof formData.getParts !== "undefined";
/**
* Determine if a value is a Blob
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a Blob, otherwise false
*/
var isBlob = kindOfTest("Blob");
/**
* Determine if a value is a FileList
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a FileList, otherwise false
*/
var isFileList = kindOfTest("FileList");
var isSet = kindOfTest("Set");
/**
* Determine if a value is a Stream
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a Stream, otherwise false
*/
var isStream = (val) => isObject$1(val) && isFunction$1(val.pipe);
/**
* Determine if a value is a FormData
*
* @param {*} thing The value to test
*
* @returns {boolean} True if value is an FormData, otherwise false
*/
function getGlobal() {
	if (typeof globalThis !== "undefined") return globalThis;
	if (typeof self !== "undefined") return self;
	if (typeof window !== "undefined") return window;
	if (typeof global !== "undefined") return global;
	return {};
}
var G = getGlobal();
var FormDataCtor = typeof G.FormData !== "undefined" ? G.FormData : void 0;
var isFormData = (thing) => {
	if (!thing) return false;
	if (FormDataCtor && thing instanceof FormDataCtor) return true;
	const proto = getPrototypeOf(thing);
	if (!proto || proto === Object.prototype) return false;
	if (!isFunction$1(thing.append)) return false;
	const kind = kindOf(thing);
	return kind === "formdata" || kind === "object" && isFunction$1(thing.toString) && thing.toString() === "[object FormData]";
};
/**
* Determine if a value is a URLSearchParams object
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a URLSearchParams object, otherwise false
*/
var isURLSearchParams = kindOfTest("URLSearchParams");
var [isReadableStream, isRequest, isResponse, isHeaders] = [
	"ReadableStream",
	"Request",
	"Response",
	"Headers"
].map(kindOfTest);
/**
* Trim excess whitespace off the beginning and end of a string
*
* @param {String} str The String to trim
*
* @returns {String} The String freed of excess whitespace
*/
var trim = (str) => {
	return str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
};
/**
* Iterate over an Array or an Object invoking a function for each item.
*
* If `obj` is an Array callback will be called passing
* the value, index, and complete array for each item.
*
* If 'obj' is an Object callback will be called passing
* the value, key, and complete object for each property.
*
* @param {Object|Array<unknown>} obj The object to iterate
* @param {Function} fn The callback to invoke for each item
*
* @param {Object} [options]
* @param {Boolean} [options.allOwnKeys = false]
* @returns {any}
*/
function forEach(obj, fn, { allOwnKeys = false } = {}) {
	if (obj === null || typeof obj === "undefined") return;
	let i;
	let l;
	if (typeof obj !== "object") obj = [obj];
	if (isArray(obj)) for (i = 0, l = obj.length; i < l; i++) fn.call(null, obj[i], i, obj);
	else {
		if (isBuffer(obj)) return;
		const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
		const len = keys.length;
		let key;
		for (i = 0; i < len; i++) {
			key = keys[i];
			fn.call(null, obj[key], key, obj);
		}
	}
}
/**
* Finds a key in an object, case-insensitive, returning the actual key name.
* Returns null if the object is a Buffer or if no match is found.
*
* @param {Object} obj - The object to search.
* @param {string} key - The key to find (case-insensitive).
* @returns {?string} The actual key name if found, otherwise null.
*/
function findKey(obj, key) {
	if (isBuffer(obj)) return null;
	key = key.toLowerCase();
	const keys = Object.keys(obj);
	let i = keys.length;
	let _key;
	while (i-- > 0) {
		_key = keys[i];
		if (key === _key.toLowerCase()) return _key;
	}
	return null;
}
var _global = (() => {
	if (typeof globalThis !== "undefined") return globalThis;
	return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
var isContextDefined = (context) => !isUndefined(context) && context !== _global;
/**
* Accepts varargs expecting each argument to be an object, then
* immutably merges the properties of each object and returns result.
*
* When multiple objects contain the same key the later object in
* the arguments list will take precedence.
*
* Example:
*
* ```js
* const result = merge({foo: 123}, {foo: 456});
* console.log(result.foo); // outputs 456
* ```
*
* @param {Object} obj1 Object to merge
*
* @returns {Object} Result of all merge properties
*/
function merge(...objs) {
	const { caseless, skipUndefined } = isContextDefined(this) && this || {};
	const result = {};
	const assignValue = (val, key) => {
		if (key === "__proto__" || key === "constructor" || key === "prototype") return;
		const targetKey = caseless && typeof key === "string" && findKey(result, key) || key;
		const existing = hasOwnProperty(result, targetKey) ? result[targetKey] : void 0;
		if (isPlainObject(existing) && isPlainObject(val)) result[targetKey] = merge(existing, val);
		else if (isPlainObject(val)) result[targetKey] = merge({}, val);
		else if (isArray(val)) result[targetKey] = val.slice();
		else if (!skipUndefined || !isUndefined(val)) result[targetKey] = val;
	};
	for (let i = 0, l = objs.length; i < l; i++) {
		const source = objs[i];
		if (!source || isBuffer(source)) continue;
		forEach(source, assignValue);
		if (typeof source !== "object" || isArray(source)) continue;
		const symbols = Object.getOwnPropertySymbols(source);
		for (let j = 0; j < symbols.length; j++) {
			const symbol = symbols[j];
			if (propertyIsEnumerable.call(source, symbol)) assignValue(source[symbol], symbol);
		}
	}
	return result;
}
/**
* Extends object a by mutably adding to it the properties of object b.
*
* @param {Object} a The object to be extended
* @param {Object} b The object to copy properties from
* @param {Object} thisArg The object to bind function to
*
* @param {Object} [options]
* @param {Boolean} [options.allOwnKeys]
* @returns {Object} The resulting value of object a
*/
var extend = (a, b, thisArg, { allOwnKeys } = {}) => {
	forEach(b, (val, key) => {
		if (thisArg && isFunction$1(val)) Object.defineProperty(a, key, {
			__proto__: null,
			value: bind(val, thisArg),
			writable: true,
			enumerable: true,
			configurable: true
		});
		else Object.defineProperty(a, key, {
			__proto__: null,
			value: val,
			writable: true,
			enumerable: true,
			configurable: true
		});
	}, { allOwnKeys });
	return a;
};
/**
* Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
*
* @param {string} content with BOM
*
* @returns {string} content value without BOM
*/
var stripBOM = (content) => {
	if (content.charCodeAt(0) === 65279) content = content.slice(1);
	return content;
};
/**
* Inherit the prototype methods from one constructor into another
* @param {function} constructor
* @param {function} superConstructor
* @param {object} [props]
* @param {object} [descriptors]
*
* @returns {void}
*/
var inherits = (constructor, superConstructor, props, descriptors) => {
	constructor.prototype = Object.create(superConstructor.prototype, descriptors);
	Object.defineProperty(constructor.prototype, "constructor", {
		__proto__: null,
		value: constructor,
		writable: true,
		enumerable: false,
		configurable: true
	});
	Object.defineProperty(constructor, "super", {
		__proto__: null,
		value: superConstructor.prototype
	});
	props && Object.assign(constructor.prototype, props);
};
/**
* Resolve object with deep prototype chain to a flat object
* @param {Object} sourceObj source object
* @param {Object} [destObj]
* @param {Function|Boolean} [filter]
* @param {Function} [propFilter]
*
* @returns {Object}
*/
var toFlatObject = (sourceObj, destObj, filter, propFilter) => {
	let props;
	let i;
	let prop;
	const merged = {};
	destObj = destObj || {};
	if (sourceObj == null) return destObj;
	do {
		props = Object.getOwnPropertyNames(sourceObj);
		i = props.length;
		while (i-- > 0) {
			prop = props[i];
			if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
				destObj[prop] = sourceObj[prop];
				merged[prop] = true;
			}
		}
		sourceObj = filter !== false && getPrototypeOf(sourceObj);
	} while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
	return destObj;
};
/**
* Determines whether a string ends with the characters of a specified string
*
* @param {String} str
* @param {String} searchString
* @param {Number} [position= 0]
*
* @returns {boolean}
*/
var endsWith = (str, searchString, position) => {
	str = String(str);
	if (position === void 0 || position > str.length) position = str.length;
	position -= searchString.length;
	const lastIndex = str.indexOf(searchString, position);
	return lastIndex !== -1 && lastIndex === position;
};
/**
* Returns new array from array like object or null if failed
*
* @param {*} [thing]
*
* @returns {?Array}
*/
var toArray = (thing) => {
	if (!thing) return null;
	if (isArray(thing)) return thing;
	let i = thing.length;
	if (!isNumber(i)) return null;
	const arr = new Array(i);
	while (i-- > 0) arr[i] = thing[i];
	return arr;
};
/**
* Checking if the Uint8Array exists and if it does, it returns a function that checks if the
* thing passed in is an instance of Uint8Array
*
* @param {TypedArray}
*
* @returns {Array}
*/
var isTypedArray = ((TypedArray) => {
	return (thing) => {
		return TypedArray && thing instanceof TypedArray;
	};
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
/**
* For each entry in the object, call the function with the key and value.
*
* @param {Object<any, any>} obj - The object to iterate over.
* @param {Function} fn - The function to call for each entry.
*
* @returns {void}
*/
var forEachEntry = (obj, fn) => {
	const _iterator = (obj && obj[iterator]).call(obj);
	let result;
	while ((result = _iterator.next()) && !result.done) {
		const pair = result.value;
		fn.call(obj, pair[0], pair[1]);
	}
};
/**
* It takes a regular expression and a string, and returns an array of all the matches
*
* @param {string} regExp - The regular expression to match against.
* @param {string} str - The string to search.
*
* @returns {Array<boolean>}
*/
var matchAll = (regExp, str) => {
	let matches;
	const arr = [];
	while ((matches = regExp.exec(str)) !== null) arr.push(matches);
	return arr;
};
var isHTMLForm = kindOfTest("HTMLFormElement");
var toCamelCase = (str) => {
	return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
		return p1.toUpperCase() + p2;
	});
};
var { propertyIsEnumerable } = Object.prototype;
/**
* Determine if a value is a RegExp object
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a RegExp object, otherwise false
*/
var isRegExp = kindOfTest("RegExp");
var reduceDescriptors = (obj, reducer) => {
	const descriptors = Object.getOwnPropertyDescriptors(obj);
	const reducedDescriptors = {};
	forEach(descriptors, (descriptor, name) => {
		let ret;
		if ((ret = reducer(descriptor, name, obj)) !== false) reducedDescriptors[name] = ret || descriptor;
	});
	Object.defineProperties(obj, reducedDescriptors);
};
/**
* Makes all methods read-only
* @param {Object} obj
*/
var freezeMethods = (obj) => {
	reduceDescriptors(obj, (descriptor, name) => {
		if (isFunction$1(obj) && [
			"arguments",
			"caller",
			"callee"
		].includes(name)) return false;
		const value = obj[name];
		if (!isFunction$1(value)) return;
		descriptor.enumerable = false;
		if ("writable" in descriptor) {
			descriptor.writable = false;
			return;
		}
		if (!descriptor.set) descriptor.set = () => {
			throw Error("Can not rewrite read-only method '" + name + "'");
		};
	});
};
/**
* Converts an array or a delimited string into an object set with values as keys and true as values.
* Useful for fast membership checks.
*
* @param {Array|string} arrayOrString - The array or string to convert.
* @param {string} delimiter - The delimiter to use if input is a string.
* @returns {Object} An object with keys from the array or string, values set to true.
*/
var toObjectSet = (arrayOrString, delimiter) => {
	const obj = {};
	const define = (arr) => {
		arr.forEach((value) => {
			obj[value] = true;
		});
	};
	isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
	return obj;
};
var noop = () => {};
var toFiniteNumber = (value, defaultValue) => {
	return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
/**
* If the thing is a FormData object, return true, otherwise return false.
*
* @param {unknown} thing - The thing to check.
*
* @returns {boolean}
*/
function isSpecCompliantForm(thing) {
	return !!(thing && isFunction$1(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
/**
* Recursively converts an object to a JSON-compatible object, handling circular references and Buffers.
*
* @param {Object} obj - The object to convert.
* @returns {Object} The JSON-compatible object.
*/
var toJSONObject = (obj) => {
	const visited = /* @__PURE__ */ new WeakSet();
	const visit = (source) => {
		if (isObject$1(source)) {
			if (visited.has(source)) return;
			if (isBuffer(source)) return source;
			if (!("toJSON" in source)) {
				visited.add(source);
				let target;
				if (isSet(source)) {
					target = [];
					for (const value of source) {
						const reducedValue = visit(value);
						!isUndefined(reducedValue) && target.push(reducedValue);
					}
				} else {
					target = isArray(source) ? [] : {};
					forEach(source, (value, key) => {
						const reducedValue = visit(value);
						!isUndefined(reducedValue) && (target[key] = reducedValue);
					});
				}
				visited.delete(source);
				return target;
			}
		}
		return source;
	};
	return visit(obj);
};
/**
* Determines if a value is an async function.
*
* @param {*} thing - The value to test.
* @returns {boolean} True if value is an async function, otherwise false.
*/
var isAsyncFn = kindOfTest("AsyncFunction");
/**
* Determines if a value is thenable (has then and catch methods).
*
* @param {*} thing - The value to test.
* @returns {boolean} True if value is thenable, otherwise false.
*/
var isThenable = (thing) => thing && (isObject$1(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing.catch);
/**
* Provides a cross-platform setImmediate implementation.
* Uses native setImmediate if available, otherwise falls back to postMessage or setTimeout.
*
* @param {boolean} setImmediateSupported - Whether setImmediate is supported.
* @param {boolean} postMessageSupported - Whether postMessage is supported.
* @returns {Function} A function to schedule a callback asynchronously.
*/
var _setImmediate = ((setImmediateSupported, postMessageSupported) => {
	if (setImmediateSupported) return setImmediate;
	return postMessageSupported ? ((token, callbacks) => {
		_global.addEventListener("message", ({ source, data }) => {
			if (source === _global && data === token) callbacks.length && callbacks.shift()();
		}, false);
		return (cb) => {
			callbacks.push(cb);
			_global.postMessage(token, "*");
		};
	})(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(typeof setImmediate === "function", isFunction$1(_global.postMessage));
/**
* Schedules a microtask or asynchronous callback as soon as possible.
* Uses queueMicrotask if available, otherwise falls back to process.nextTick or _setImmediate.
*
* @type {Function}
*/
var asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
var isIterable = (thing) => thing != null && isFunction$1(thing[iterator]);
/**
* Determine if a value is iterable via an iterator that is NOT sourced solely
* from a polluted Object.prototype. Use this instead of `isIterable` whenever
* the iterable comes from untrusted input (e.g. user-supplied header sources),
* so `Object.prototype[Symbol.iterator] = ...` cannot turn an ordinary object
* into an attacker-controlled entries iterator.
*
* @param {*} thing The value to test
*
* @returns {boolean} True if value has a non-polluted iterator
*/
var isSafeIterable = (thing) => thing != null && hasOwnInPrototypeChain(thing, iterator) && isIterable(thing);
var utils_default = {
	isArray,
	isArrayBuffer,
	isBuffer,
	isFormData,
	isArrayBufferView,
	isString,
	isNumber,
	isBoolean,
	isObject: isObject$1,
	isPlainObject,
	isEmptyObject,
	isReadableStream,
	isRequest,
	isResponse,
	isHeaders,
	isUndefined,
	isDate,
	isFile,
	isReactNativeBlob,
	isReactNative: isReactNative$2,
	isBlob,
	isRegExp,
	isFunction: isFunction$1,
	isStream,
	isURLSearchParams,
	isTypedArray,
	isFileList,
	forEach,
	merge,
	extend,
	trim,
	stripBOM,
	inherits,
	toFlatObject,
	kindOf,
	kindOfTest,
	endsWith,
	toArray,
	forEachEntry,
	matchAll,
	isHTMLForm,
	hasOwnProperty,
	hasOwnProp: hasOwnProperty,
	hasOwnInPrototypeChain,
	getSafeProp,
	toSafeFlatObject,
	reduceDescriptors,
	freezeMethods,
	toObjectSet,
	toCamelCase,
	noop,
	toFiniteNumber,
	findKey,
	global: _global,
	isContextDefined,
	isSpecCompliantForm,
	toJSONObject,
	isAsyncFn,
	isThenable,
	setImmediate: _setImmediate,
	asap,
	isIterable,
	isSafeIterable
};
// node_modules/axios/lib/helpers/parseHeaders.js
var ignoreDuplicateOf = utils_default.toObjectSet([
	"age",
	"authorization",
	"content-length",
	"content-type",
	"etag",
	"expires",
	"from",
	"host",
	"if-modified-since",
	"if-unmodified-since",
	"last-modified",
	"location",
	"max-forwards",
	"proxy-authorization",
	"referer",
	"retry-after",
	"user-agent"
]);
/**
* Parse headers into an object
*
* ```
* Date: Wed, 27 Aug 2014 08:58:49 GMT
* Content-Type: application/json
* Connection: keep-alive
* Transfer-Encoding: chunked
* ```
*
* @param {String} rawHeaders Headers needing to be parsed
*
* @returns {Object} Headers parsed into an object
*/
var parseHeaders_default = (rawHeaders) => {
	const parsed = {};
	let key;
	let val;
	let i;
	rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
		i = line.indexOf(":");
		key = line.substring(0, i).trim().toLowerCase();
		val = line.substring(i + 1).trim();
		const hasKey = utils_default.hasOwnProp(parsed, key);
		if (!key || hasKey && utils_default.hasOwnProp(ignoreDuplicateOf, key)) return;
		if (key === "set-cookie") {
			if (hasKey) parsed[key].push(val);
			else parsed[key] = [val];
		} else parsed[key] = hasKey ? parsed[key] + ", " + val : val;
	});
	return parsed;
};
// node_modules/axios/lib/helpers/sanitizeHeaderValue.js
function trimSPorHTAB(str) {
	let start = 0;
	let end = str.length;
	while (start < end) {
		const code = str.charCodeAt(start);
		if (code !== 9 && code !== 32) break;
		start += 1;
	}
	while (end > start) {
		const code = str.charCodeAt(end - 1);
		if (code !== 9 && code !== 32) break;
		end -= 1;
	}
	return start === 0 && end === str.length ? str : str.slice(start, end);
}
var INVALID_UNICODE_HEADER_VALUE_CHARS = /* @__PURE__ */ new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g");
var INVALID_BYTE_STRING_HEADER_VALUE_CHARS = /* @__PURE__ */ new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
function sanitizeValue(value, invalidChars) {
	if (utils_default.isArray(value)) return value.map((item) => sanitizeValue(item, invalidChars));
	return trimSPorHTAB(String(value).replace(invalidChars, ""));
}
var sanitizeHeaderValue = (value) => sanitizeValue(value, INVALID_UNICODE_HEADER_VALUE_CHARS);
var sanitizeByteStringHeaderValue = (value) => sanitizeValue(value, INVALID_BYTE_STRING_HEADER_VALUE_CHARS);
function toByteStringHeaderObject(headers) {
	const byteStringHeaders = Object.create(null);
	utils_default.forEach(headers.toJSON(), (value, header) => {
		byteStringHeaders[header] = sanitizeByteStringHeaderValue(value);
	});
	return byteStringHeaders;
}
// node_modules/axios/lib/core/AxiosHeaders.js
var $internals$1 = Symbol("internals");
function normalizeHeader(header) {
	return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
	if (value === false || value == null) return value;
	return utils_default.isArray(value) ? value.map(normalizeValue) : sanitizeHeaderValue(String(value));
}
function parseTokens(str) {
	const tokens = Object.create(null);
	const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
	let match;
	while (match = tokensRE.exec(str)) tokens[match[1]] = match[2];
	return tokens;
}
var parameterNameRE = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function trimOWS(value) {
	let start = 0;
	let end = value.length;
	while (start < end) {
		const code = value.charCodeAt(start);
		if (code !== 9 && code !== 32) break;
		start += 1;
	}
	while (end > start) {
		const code = value.charCodeAt(end - 1);
		if (code !== 9 && code !== 32) break;
		end -= 1;
	}
	return start === 0 && end === value.length ? value : value.slice(start, end);
}
function decodeQuotedString(value) {
	const last = value.length - 1;
	if (last < 1 || value.charCodeAt(0) !== 34 || value.charCodeAt(last) !== 34) return value;
	let decoded = "";
	for (let i = 1; i < last; i++) {
		const code = value.charCodeAt(i);
		if (code === 34) return value;
		if (code === 92) {
			i += 1;
			if (i >= last) return value;
		}
		decoded += value[i];
	}
	return decoded;
}
function parseParameters(value) {
	const parameters = Object.create(null);
	const str = String(value);
	let start = 0;
	let quoted = false;
	let escaped = false;
	function parseParameter(end) {
		const part = trimOWS(str.slice(start, end));
		const equals = part.indexOf("=");
		if (equals < 1) return;
		const name = trimOWS(part.slice(0, equals));
		if (!parameterNameRE.test(name)) return;
		const normalizedName = name.toLowerCase();
		if (normalizedName === "__proto__" || normalizedName === "constructor" || normalizedName === "prototype") return;
		const parameterValue = trimOWS(part.slice(equals + 1));
		parameters[normalizedName] = decodeQuotedString(parameterValue);
	}
	for (let i = 0; i < str.length; i++) {
		const code = str.charCodeAt(i);
		if (quoted) {
			if (escaped) escaped = false;
			else if (code === 92) escaped = true;
			else if (code === 34) quoted = false;
		} else if (code === 34) quoted = true;
		else if (code === 44 || code === 59) {
			parseParameter(i);
			start = i + 1;
		}
	}
	parseParameter(str.length);
	return parameters;
}
var isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
	if (utils_default.isFunction(filter)) return filter.call(this, value, header);
	if (isHeaderNameFilter) value = header;
	if (!utils_default.isString(value)) return;
	if (utils_default.isString(filter)) return value.indexOf(filter) !== -1;
	if (utils_default.isRegExp(filter)) return filter.test(value);
}
function formatHeader(header) {
	return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
		return char.toUpperCase() + str;
	});
}
function buildAccessors(obj, header) {
	const accessorName = utils_default.toCamelCase(" " + header);
	[
		"get",
		"set",
		"has"
	].forEach((methodName) => {
		Object.defineProperty(obj, methodName + accessorName, {
			__proto__: null,
			value: function(arg1, arg2, arg3) {
				return this[methodName].call(this, header, arg1, arg2, arg3);
			},
			configurable: true
		});
	});
}
var AxiosHeaders = class {
	constructor(headers) {
		headers && this.set(headers);
	}
	set(header, valueOrRewrite, rewrite) {
		const self = this;
		function setHeader(_value, _header, _rewrite) {
			const lHeader = normalizeHeader(_header);
			if (!lHeader) return;
			const key = utils_default.findKey(self, lHeader);
			if (!key || self[key] === void 0 || _rewrite === true || _rewrite === void 0 && self[key] !== false) self[key || _header] = normalizeValue(_value);
		}
		const setHeaders = (headers, _rewrite) => utils_default.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
		if (utils_default.isPlainObject(header) || header instanceof this.constructor) setHeaders(header, valueOrRewrite);
		else if (utils_default.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) setHeaders(parseHeaders_default(header), valueOrRewrite);
		else if (utils_default.isObject(header) && utils_default.isSafeIterable(header)) {
			let obj = Object.create(null), dest, key;
			for (const entry of header) {
				if (!utils_default.isArray(entry)) throw new TypeError("Object iterator must return a key-value pair");
				key = entry[0];
				if (utils_default.hasOwnProp(obj, key)) {
					dest = obj[key];
					obj[key] = utils_default.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]];
				} else obj[key] = entry[1];
			}
			setHeaders(obj, valueOrRewrite);
		} else header != null && setHeader(valueOrRewrite, header, rewrite);
		return this;
	}
	get(header, parser) {
		header = normalizeHeader(header);
		if (header) {
			const key = utils_default.findKey(this, header);
			if (key) {
				const value = this[key];
				if (!parser) return value;
				if (parser === true) return parseTokens(value);
				if (utils_default.isFunction(parser)) return parser.call(this, value, key);
				if (utils_default.isRegExp(parser)) return parser.exec(value);
				throw new TypeError("parser must be boolean|regexp|function");
			}
		}
	}
	has(header, matcher) {
		header = normalizeHeader(header);
		if (header) {
			const key = utils_default.findKey(this, header);
			return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
		}
		return false;
	}
	delete(header, matcher) {
		const self = this;
		let deleted = false;
		function deleteHeader(_header) {
			_header = normalizeHeader(_header);
			if (_header) {
				const key = utils_default.findKey(self, _header);
				if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
					delete self[key];
					deleted = true;
				}
			}
		}
		if (utils_default.isArray(header)) header.forEach(deleteHeader);
		else deleteHeader(header);
		return deleted;
	}
	clear(matcher) {
		const keys = Object.keys(this);
		let i = keys.length;
		let deleted = false;
		while (i--) {
			const key = keys[i];
			if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
				delete this[key];
				deleted = true;
			}
		}
		return deleted;
	}
	normalize(format) {
		const self = this;
		const headers = {};
		utils_default.forEach(this, (value, header) => {
			const key = utils_default.findKey(headers, header);
			if (key) {
				self[key] = normalizeValue(value);
				delete self[header];
				return;
			}
			const normalized = format ? formatHeader(header) : String(header).trim();
			if (normalized !== header) delete self[header];
			self[normalized] = normalizeValue(value);
			headers[normalized] = true;
		});
		return this;
	}
	concat(...targets) {
		return this.constructor.concat(this, ...targets);
	}
	toJSON(asStrings) {
		const obj = Object.create(null);
		utils_default.forEach(this, (value, header) => {
			value != null && value !== false && (obj[header] = asStrings && utils_default.isArray(value) ? value.join(", ") : value);
		});
		return obj;
	}
	[Symbol.iterator]() {
		return Object.entries(this.toJSON())[Symbol.iterator]();
	}
	toString() {
		return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
	}
	getSetCookie() {
		const value = this.get("set-cookie");
		return utils_default.isArray(value) ? value : value == null || value === false ? [] : [value];
	}
	get [Symbol.toStringTag]() {
		return "AxiosHeaders";
	}
	static from(thing) {
		return thing instanceof this ? thing : new this(thing);
	}
	static parseParameters(value) {
		return parseParameters(value);
	}
	static concat(first, ...targets) {
		const computed = new this(first);
		targets.forEach((target) => computed.set(target));
		return computed;
	}
	static accessor(header) {
		const accessors = (this[$internals$1] = this[$internals$1] = { accessors: {} }).accessors;
		const prototype = this.prototype;
		function defineAccessor(_header) {
			const lHeader = normalizeHeader(_header);
			if (!accessors[lHeader]) {
				buildAccessors(prototype, _header);
				accessors[lHeader] = true;
			}
		}
		utils_default.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
		return this;
	}
};
AxiosHeaders.accessor([
	"Content-Type",
	"Content-Length",
	"Accept",
	"Accept-Encoding",
	"User-Agent",
	"Authorization"
]);
utils_default.reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
	let mapped = key[0].toUpperCase() + key.slice(1);
	return {
		get: () => value,
		set(headerValue) {
			this[mapped] = headerValue;
		}
	};
});
utils_default.freezeMethods(AxiosHeaders);
// node_modules/axios/lib/core/AxiosError.js
var REDACTED = "[REDACTED ****]";
function hasOwnOrPrototypeToJSON(source) {
	if (utils_default.hasOwnProp(source, "toJSON")) return true;
	let prototype = Object.getPrototypeOf(source);
	while (prototype && prototype !== Object.prototype) {
		if (utils_default.hasOwnProp(prototype, "toJSON")) return true;
		prototype = Object.getPrototypeOf(prototype);
	}
	return false;
}
function redactConfig(config, redactKeys) {
	const lowerKeys = new Set(redactKeys.map((k) => String(k).toLowerCase()));
	const seen = [];
	const visit = (source) => {
		if (source === null || typeof source !== "object") return source;
		if (utils_default.isBuffer(source)) return source;
		if (seen.indexOf(source) !== -1) return void 0;
		if (source instanceof AxiosHeaders) source = source.toJSON();
		seen.push(source);
		let result;
		if (utils_default.isArray(source)) {
			result = [];
			source.forEach((v, i) => {
				const reducedValue = visit(v);
				if (!utils_default.isUndefined(reducedValue)) result[i] = reducedValue;
			});
		} else {
			if (!utils_default.isPlainObject(source) && hasOwnOrPrototypeToJSON(source)) {
				seen.pop();
				return source;
			}
			result = Object.create(null);
			for (const [key, value] of Object.entries(source)) {
				const reducedValue = lowerKeys.has(key.toLowerCase()) ? REDACTED : visit(value);
				if (!utils_default.isUndefined(reducedValue)) result[key] = reducedValue;
			}
		}
		seen.pop();
		return result;
	};
	return visit(config);
}
function stringifySafely$1(value) {
	try {
		return String(value);
	} catch (err) {
		return "";
	}
}
function aggregateErrorMessage(error) {
	return error.errors.map((entry) => {
		try {
			return entry && entry.message ? stringifySafely$1(entry.message) : stringifySafely$1(entry);
		} catch (err) {
			return "";
		}
	}).filter(Boolean).join("; ") || error.name || "AggregateError";
}
var AxiosError = class AxiosError extends Error {
	static from(error, code, config, request, response, customProps) {
		let message = error.message;
		if (!message && utils_default.isArray(error.errors) && error.errors.length) message = aggregateErrorMessage(error);
		const axiosError = new AxiosError(message, code || error.code, config, request, response);
		Object.defineProperty(axiosError, "cause", {
			__proto__: null,
			value: error,
			writable: true,
			enumerable: false,
			configurable: true
		});
		axiosError.name = error.name;
		if (error.status != null && axiosError.status == null) axiosError.status = error.status;
		customProps && Object.assign(axiosError, customProps);
		return axiosError;
	}
	/**
	* Create an Error with the specified message, config, error code, request and response.
	*
	* @param {string} message The error message.
	* @param {string} [code] The error code (for example, 'ECONNABORTED').
	* @param {Object} [config] The config.
	* @param {Object} [request] The request.
	* @param {Object} [response] The response.
	*
	* @returns {Error} The created error.
	*/
	constructor(message, code, config, request, response) {
		super(message);
		Object.defineProperty(this, "message", {
			__proto__: null,
			value: message,
			enumerable: true,
			writable: true,
			configurable: true
		});
		this.name = "AxiosError";
		this.isAxiosError = true;
		code && (this.code = code);
		config && (this.config = config);
		request && (this.request = request);
		if (response) {
			this.response = response;
			this.status = response.status;
		}
	}
	toJSON() {
		const config = this.config;
		const redactKeys = config && utils_default.hasOwnProp(config, "redact") ? config.redact : void 0;
		const serializedConfig = utils_default.isArray(redactKeys) && redactKeys.length > 0 ? redactConfig(config, redactKeys) : utils_default.toJSONObject(config);
		return {
			message: this.message,
			name: this.name,
			description: this.description,
			number: this.number,
			fileName: this.fileName,
			lineNumber: this.lineNumber,
			columnNumber: this.columnNumber,
			stack: this.stack,
			config: serializedConfig,
			code: this.code,
			status: this.status
		};
	}
};
AxiosError.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
AxiosError.ERR_BAD_OPTION = "ERR_BAD_OPTION";
AxiosError.ECONNABORTED = "ECONNABORTED";
AxiosError.ETIMEDOUT = "ETIMEDOUT";
AxiosError.ECONNREFUSED = "ECONNREFUSED";
AxiosError.ERR_NETWORK = "ERR_NETWORK";
AxiosError.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
AxiosError.ERR_DEPRECATED = "ERR_DEPRECATED";
AxiosError.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
AxiosError.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
AxiosError.ERR_CANCELED = "ERR_CANCELED";
AxiosError.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
AxiosError.ERR_INVALID_URL = "ERR_INVALID_URL";
AxiosError.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
// node_modules/delayed-stream/lib/delayed_stream.js
var require_delayed_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream = __require("stream").Stream;
	var util = __require("util");
	module.exports = DelayedStream;
	function DelayedStream() {
		this.source = null;
		this.dataSize = 0;
		this.maxDataSize = 1048576;
		this.pauseStream = true;
		this._maxDataSizeExceeded = false;
		this._released = false;
		this._bufferedEvents = [];
	}
	util.inherits(DelayedStream, Stream);
	DelayedStream.create = function(source, options) {
		var delayedStream = new this();
		options = options || {};
		for (var option in options) delayedStream[option] = options[option];
		delayedStream.source = source;
		var realEmit = source.emit;
		source.emit = function() {
			delayedStream._handleEmit(arguments);
			return realEmit.apply(source, arguments);
		};
		source.on("error", function() {});
		if (delayedStream.pauseStream) source.pause();
		return delayedStream;
	};
	Object.defineProperty(DelayedStream.prototype, "readable", {
		configurable: true,
		enumerable: true,
		get: function() {
			return this.source.readable;
		}
	});
	DelayedStream.prototype.setEncoding = function() {
		return this.source.setEncoding.apply(this.source, arguments);
	};
	DelayedStream.prototype.resume = function() {
		if (!this._released) this.release();
		this.source.resume();
	};
	DelayedStream.prototype.pause = function() {
		this.source.pause();
	};
	DelayedStream.prototype.release = function() {
		this._released = true;
		this._bufferedEvents.forEach(function(args) {
			this.emit.apply(this, args);
		}.bind(this));
		this._bufferedEvents = [];
	};
	DelayedStream.prototype.pipe = function() {
		var r = Stream.prototype.pipe.apply(this, arguments);
		this.resume();
		return r;
	};
	DelayedStream.prototype._handleEmit = function(args) {
		if (this._released) {
			this.emit.apply(this, args);
			return;
		}
		if (args[0] === "data") {
			this.dataSize += args[1].length;
			this._checkIfMaxDataSizeExceeded();
		}
		this._bufferedEvents.push(args);
	};
	DelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {
		if (this._maxDataSizeExceeded) return;
		if (this.dataSize <= this.maxDataSize) return;
		this._maxDataSizeExceeded = true;
		var message = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
		this.emit("error", new Error(message));
	};
}));
// node_modules/combined-stream/lib/combined_stream.js
var require_combined_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var util = __require("util");
	var Stream = __require("stream").Stream;
	var DelayedStream = require_delayed_stream();
	module.exports = CombinedStream;
	function CombinedStream() {
		this.writable = false;
		this.readable = true;
		this.dataSize = 0;
		this.maxDataSize = 2097152;
		this.pauseStreams = true;
		this._released = false;
		this._streams = [];
		this._currentStream = null;
		this._insideLoop = false;
		this._pendingNext = false;
	}
	util.inherits(CombinedStream, Stream);
	CombinedStream.create = function(options) {
		var combinedStream = new this();
		options = options || {};
		for (var option in options) combinedStream[option] = options[option];
		return combinedStream;
	};
	CombinedStream.isStreamLike = function(stream) {
		return typeof stream !== "function" && typeof stream !== "string" && typeof stream !== "boolean" && typeof stream !== "number" && !Buffer.isBuffer(stream);
	};
	CombinedStream.prototype.append = function(stream) {
		if (CombinedStream.isStreamLike(stream)) {
			if (!(stream instanceof DelayedStream)) {
				var newStream = DelayedStream.create(stream, {
					maxDataSize: Infinity,
					pauseStream: this.pauseStreams
				});
				stream.on("data", this._checkDataSize.bind(this));
				stream = newStream;
			}
			this._handleErrors(stream);
			if (this.pauseStreams) stream.pause();
		}
		this._streams.push(stream);
		return this;
	};
	CombinedStream.prototype.pipe = function(dest, options) {
		Stream.prototype.pipe.call(this, dest, options);
		this.resume();
		return dest;
	};
	CombinedStream.prototype._getNext = function() {
		this._currentStream = null;
		if (this._insideLoop) {
			this._pendingNext = true;
			return;
		}
		this._insideLoop = true;
		try {
			do {
				this._pendingNext = false;
				this._realGetNext();
			} while (this._pendingNext);
		} finally {
			this._insideLoop = false;
		}
	};
	CombinedStream.prototype._realGetNext = function() {
		var stream = this._streams.shift();
		if (typeof stream == "undefined") {
			this.end();
			return;
		}
		if (typeof stream !== "function") {
			this._pipeNext(stream);
			return;
		}
		stream(function(stream) {
			if (CombinedStream.isStreamLike(stream)) {
				stream.on("data", this._checkDataSize.bind(this));
				this._handleErrors(stream);
			}
			this._pipeNext(stream);
		}.bind(this));
	};
	CombinedStream.prototype._pipeNext = function(stream) {
		this._currentStream = stream;
		if (CombinedStream.isStreamLike(stream)) {
			stream.on("end", this._getNext.bind(this));
			stream.pipe(this, { end: false });
			return;
		}
		var value = stream;
		this.write(value);
		this._getNext();
	};
	CombinedStream.prototype._handleErrors = function(stream) {
		var self = this;
		stream.on("error", function(err) {
			self._emitError(err);
		});
	};
	CombinedStream.prototype.write = function(data) {
		this.emit("data", data);
	};
	CombinedStream.prototype.pause = function() {
		if (!this.pauseStreams) return;
		if (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function") this._currentStream.pause();
		this.emit("pause");
	};
	CombinedStream.prototype.resume = function() {
		if (!this._released) {
			this._released = true;
			this.writable = true;
			this._getNext();
		}
		if (this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function") this._currentStream.resume();
		this.emit("resume");
	};
	CombinedStream.prototype.end = function() {
		this._reset();
		this.emit("end");
	};
	CombinedStream.prototype.destroy = function() {
		this._reset();
		this.emit("close");
	};
	CombinedStream.prototype._reset = function() {
		this.writable = false;
		this._streams = [];
		this._currentStream = null;
	};
	CombinedStream.prototype._checkDataSize = function() {
		this._updateDataSize();
		if (this.dataSize <= this.maxDataSize) return;
		var message = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
		this._emitError(new Error(message));
	};
	CombinedStream.prototype._updateDataSize = function() {
		this.dataSize = 0;
		var self = this;
		this._streams.forEach(function(stream) {
			if (!stream.dataSize) return;
			self.dataSize += stream.dataSize;
		});
		if (this._currentStream && this._currentStream.dataSize) this.dataSize += this._currentStream.dataSize;
	};
	CombinedStream.prototype._emitError = function(err) {
		this._reset();
		this.emit("error", err);
	};
}));
// node_modules/mime-db/db.json
var db_exports = /* @__PURE__ */ __exportAll({ default: () => db_default });
var db_default;
var init_db = __esmMin((() => {
	db_default = {
		"application/1d-interleaved-parityfec": { "source": "iana" },
		"application/3gpdash-qoe-report+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/3gpp-ims+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/3gpphal+json": {
			"source": "iana",
			"compressible": true
		},
		"application/3gpphalforms+json": {
			"source": "iana",
			"compressible": true
		},
		"application/a2l": { "source": "iana" },
		"application/ace+cbor": { "source": "iana" },
		"application/activemessage": { "source": "iana" },
		"application/activity+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-costmap+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-costmapfilter+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-directory+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-endpointcost+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-endpointcostparams+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-endpointprop+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-endpointpropparams+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-error+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-networkmap+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-networkmapfilter+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-updatestreamcontrol+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-updatestreamparams+json": {
			"source": "iana",
			"compressible": true
		},
		"application/aml": { "source": "iana" },
		"application/andrew-inset": {
			"source": "iana",
			"extensions": ["ez"]
		},
		"application/applefile": { "source": "iana" },
		"application/applixware": {
			"source": "apache",
			"extensions": ["aw"]
		},
		"application/at+jwt": { "source": "iana" },
		"application/atf": { "source": "iana" },
		"application/atfx": { "source": "iana" },
		"application/atom+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["atom"]
		},
		"application/atomcat+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["atomcat"]
		},
		"application/atomdeleted+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["atomdeleted"]
		},
		"application/atomicmail": { "source": "iana" },
		"application/atomsvc+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["atomsvc"]
		},
		"application/atsc-dwd+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["dwd"]
		},
		"application/atsc-dynamic-event-message": { "source": "iana" },
		"application/atsc-held+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["held"]
		},
		"application/atsc-rdt+json": {
			"source": "iana",
			"compressible": true
		},
		"application/atsc-rsat+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rsat"]
		},
		"application/atxml": { "source": "iana" },
		"application/auth-policy+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/bacnet-xdd+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/batch-smtp": { "source": "iana" },
		"application/bdoc": {
			"compressible": false,
			"extensions": ["bdoc"]
		},
		"application/beep+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/calendar+json": {
			"source": "iana",
			"compressible": true
		},
		"application/calendar+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xcs"]
		},
		"application/call-completion": { "source": "iana" },
		"application/cals-1840": { "source": "iana" },
		"application/captive+json": {
			"source": "iana",
			"compressible": true
		},
		"application/cbor": { "source": "iana" },
		"application/cbor-seq": { "source": "iana" },
		"application/cccex": { "source": "iana" },
		"application/ccmp+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/ccxml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["ccxml"]
		},
		"application/cdfx+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["cdfx"]
		},
		"application/cdmi-capability": {
			"source": "iana",
			"extensions": ["cdmia"]
		},
		"application/cdmi-container": {
			"source": "iana",
			"extensions": ["cdmic"]
		},
		"application/cdmi-domain": {
			"source": "iana",
			"extensions": ["cdmid"]
		},
		"application/cdmi-object": {
			"source": "iana",
			"extensions": ["cdmio"]
		},
		"application/cdmi-queue": {
			"source": "iana",
			"extensions": ["cdmiq"]
		},
		"application/cdni": { "source": "iana" },
		"application/cea": { "source": "iana" },
		"application/cea-2018+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/cellml+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/cfw": { "source": "iana" },
		"application/city+json": {
			"source": "iana",
			"compressible": true
		},
		"application/clr": { "source": "iana" },
		"application/clue+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/clue_info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/cms": { "source": "iana" },
		"application/cnrp+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/coap-group+json": {
			"source": "iana",
			"compressible": true
		},
		"application/coap-payload": { "source": "iana" },
		"application/commonground": { "source": "iana" },
		"application/conference-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/cose": { "source": "iana" },
		"application/cose-key": { "source": "iana" },
		"application/cose-key-set": { "source": "iana" },
		"application/cpl+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["cpl"]
		},
		"application/csrattrs": { "source": "iana" },
		"application/csta+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/cstadata+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/csvm+json": {
			"source": "iana",
			"compressible": true
		},
		"application/cu-seeme": {
			"source": "apache",
			"extensions": ["cu"]
		},
		"application/cwt": { "source": "iana" },
		"application/cybercash": { "source": "iana" },
		"application/dart": { "compressible": true },
		"application/dash+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["mpd"]
		},
		"application/dash-patch+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["mpp"]
		},
		"application/dashdelta": { "source": "iana" },
		"application/davmount+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["davmount"]
		},
		"application/dca-rft": { "source": "iana" },
		"application/dcd": { "source": "iana" },
		"application/dec-dx": { "source": "iana" },
		"application/dialog-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/dicom": { "source": "iana" },
		"application/dicom+json": {
			"source": "iana",
			"compressible": true
		},
		"application/dicom+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/dii": { "source": "iana" },
		"application/dit": { "source": "iana" },
		"application/dns": { "source": "iana" },
		"application/dns+json": {
			"source": "iana",
			"compressible": true
		},
		"application/dns-message": { "source": "iana" },
		"application/docbook+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["dbk"]
		},
		"application/dots+cbor": { "source": "iana" },
		"application/dskpp+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/dssc+der": {
			"source": "iana",
			"extensions": ["dssc"]
		},
		"application/dssc+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xdssc"]
		},
		"application/dvcs": { "source": "iana" },
		"application/ecmascript": {
			"source": "iana",
			"compressible": true,
			"extensions": ["es", "ecma"]
		},
		"application/edi-consent": { "source": "iana" },
		"application/edi-x12": {
			"source": "iana",
			"compressible": false
		},
		"application/edifact": {
			"source": "iana",
			"compressible": false
		},
		"application/efi": { "source": "iana" },
		"application/elm+json": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/elm+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/emergencycalldata.cap+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/emergencycalldata.comment+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/emergencycalldata.control+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/emergencycalldata.deviceinfo+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/emergencycalldata.ecall.msd": { "source": "iana" },
		"application/emergencycalldata.providerinfo+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/emergencycalldata.serviceinfo+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/emergencycalldata.subscriberinfo+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/emergencycalldata.veds+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/emma+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["emma"]
		},
		"application/emotionml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["emotionml"]
		},
		"application/encaprtp": { "source": "iana" },
		"application/epp+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/epub+zip": {
			"source": "iana",
			"compressible": false,
			"extensions": ["epub"]
		},
		"application/eshop": { "source": "iana" },
		"application/exi": {
			"source": "iana",
			"extensions": ["exi"]
		},
		"application/expect-ct-report+json": {
			"source": "iana",
			"compressible": true
		},
		"application/express": {
			"source": "iana",
			"extensions": ["exp"]
		},
		"application/fastinfoset": { "source": "iana" },
		"application/fastsoap": { "source": "iana" },
		"application/fdt+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["fdt"]
		},
		"application/fhir+json": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/fhir+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/fido.trusted-apps+json": { "compressible": true },
		"application/fits": { "source": "iana" },
		"application/flexfec": { "source": "iana" },
		"application/font-sfnt": { "source": "iana" },
		"application/font-tdpfr": {
			"source": "iana",
			"extensions": ["pfr"]
		},
		"application/font-woff": {
			"source": "iana",
			"compressible": false
		},
		"application/framework-attributes+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/geo+json": {
			"source": "iana",
			"compressible": true,
			"extensions": ["geojson"]
		},
		"application/geo+json-seq": { "source": "iana" },
		"application/geopackage+sqlite3": { "source": "iana" },
		"application/geoxacml+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/gltf-buffer": { "source": "iana" },
		"application/gml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["gml"]
		},
		"application/gpx+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["gpx"]
		},
		"application/gxf": {
			"source": "apache",
			"extensions": ["gxf"]
		},
		"application/gzip": {
			"source": "iana",
			"compressible": false,
			"extensions": ["gz"]
		},
		"application/h224": { "source": "iana" },
		"application/held+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/hjson": { "extensions": ["hjson"] },
		"application/http": { "source": "iana" },
		"application/hyperstudio": {
			"source": "iana",
			"extensions": ["stk"]
		},
		"application/ibe-key-request+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/ibe-pkg-reply+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/ibe-pp-data": { "source": "iana" },
		"application/iges": { "source": "iana" },
		"application/im-iscomposing+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/index": { "source": "iana" },
		"application/index.cmd": { "source": "iana" },
		"application/index.obj": { "source": "iana" },
		"application/index.response": { "source": "iana" },
		"application/index.vnd": { "source": "iana" },
		"application/inkml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["ink", "inkml"]
		},
		"application/iotp": { "source": "iana" },
		"application/ipfix": {
			"source": "iana",
			"extensions": ["ipfix"]
		},
		"application/ipp": { "source": "iana" },
		"application/isup": { "source": "iana" },
		"application/its+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["its"]
		},
		"application/java-archive": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"jar",
				"war",
				"ear"
			]
		},
		"application/java-serialized-object": {
			"source": "apache",
			"compressible": false,
			"extensions": ["ser"]
		},
		"application/java-vm": {
			"source": "apache",
			"compressible": false,
			"extensions": ["class"]
		},
		"application/javascript": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true,
			"extensions": ["js", "mjs"]
		},
		"application/jf2feed+json": {
			"source": "iana",
			"compressible": true
		},
		"application/jose": { "source": "iana" },
		"application/jose+json": {
			"source": "iana",
			"compressible": true
		},
		"application/jrd+json": {
			"source": "iana",
			"compressible": true
		},
		"application/jscalendar+json": {
			"source": "iana",
			"compressible": true
		},
		"application/json": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true,
			"extensions": ["json", "map"]
		},
		"application/json-patch+json": {
			"source": "iana",
			"compressible": true
		},
		"application/json-seq": { "source": "iana" },
		"application/json5": { "extensions": ["json5"] },
		"application/jsonml+json": {
			"source": "apache",
			"compressible": true,
			"extensions": ["jsonml"]
		},
		"application/jwk+json": {
			"source": "iana",
			"compressible": true
		},
		"application/jwk-set+json": {
			"source": "iana",
			"compressible": true
		},
		"application/jwt": { "source": "iana" },
		"application/kpml-request+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/kpml-response+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/ld+json": {
			"source": "iana",
			"compressible": true,
			"extensions": ["jsonld"]
		},
		"application/lgr+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["lgr"]
		},
		"application/link-format": { "source": "iana" },
		"application/load-control+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/lost+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["lostxml"]
		},
		"application/lostsync+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/lpf+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/lxf": { "source": "iana" },
		"application/mac-binhex40": {
			"source": "iana",
			"extensions": ["hqx"]
		},
		"application/mac-compactpro": {
			"source": "apache",
			"extensions": ["cpt"]
		},
		"application/macwriteii": { "source": "iana" },
		"application/mads+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["mads"]
		},
		"application/manifest+json": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true,
			"extensions": ["webmanifest"]
		},
		"application/marc": {
			"source": "iana",
			"extensions": ["mrc"]
		},
		"application/marcxml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["mrcx"]
		},
		"application/mathematica": {
			"source": "iana",
			"extensions": [
				"ma",
				"nb",
				"mb"
			]
		},
		"application/mathml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["mathml"]
		},
		"application/mathml-content+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mathml-presentation+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbms-associated-procedure-description+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbms-deregister+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbms-envelope+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbms-msk+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbms-msk-response+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbms-protection-description+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbms-reception-report+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbms-register+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbms-register-response+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbms-schedule+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbms-user-service-description+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mbox": {
			"source": "iana",
			"extensions": ["mbox"]
		},
		"application/media-policy-dataset+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["mpf"]
		},
		"application/media_control+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mediaservercontrol+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["mscml"]
		},
		"application/merge-patch+json": {
			"source": "iana",
			"compressible": true
		},
		"application/metalink+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["metalink"]
		},
		"application/metalink4+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["meta4"]
		},
		"application/mets+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["mets"]
		},
		"application/mf4": { "source": "iana" },
		"application/mikey": { "source": "iana" },
		"application/mipc": { "source": "iana" },
		"application/missing-blocks+cbor-seq": { "source": "iana" },
		"application/mmt-aei+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["maei"]
		},
		"application/mmt-usd+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["musd"]
		},
		"application/mods+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["mods"]
		},
		"application/moss-keys": { "source": "iana" },
		"application/moss-signature": { "source": "iana" },
		"application/mosskey-data": { "source": "iana" },
		"application/mosskey-request": { "source": "iana" },
		"application/mp21": {
			"source": "iana",
			"extensions": ["m21", "mp21"]
		},
		"application/mp4": {
			"source": "iana",
			"extensions": ["mp4s", "m4p"]
		},
		"application/mpeg4-generic": { "source": "iana" },
		"application/mpeg4-iod": { "source": "iana" },
		"application/mpeg4-iod-xmt": { "source": "iana" },
		"application/mrb-consumer+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/mrb-publish+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/msc-ivr+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/msc-mixer+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/msword": {
			"source": "iana",
			"compressible": false,
			"extensions": ["doc", "dot"]
		},
		"application/mud+json": {
			"source": "iana",
			"compressible": true
		},
		"application/multipart-core": { "source": "iana" },
		"application/mxf": {
			"source": "iana",
			"extensions": ["mxf"]
		},
		"application/n-quads": {
			"source": "iana",
			"extensions": ["nq"]
		},
		"application/n-triples": {
			"source": "iana",
			"extensions": ["nt"]
		},
		"application/nasdata": { "source": "iana" },
		"application/news-checkgroups": {
			"source": "iana",
			"charset": "US-ASCII"
		},
		"application/news-groupinfo": {
			"source": "iana",
			"charset": "US-ASCII"
		},
		"application/news-transmission": { "source": "iana" },
		"application/nlsml+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/node": {
			"source": "iana",
			"extensions": ["cjs"]
		},
		"application/nss": { "source": "iana" },
		"application/oauth-authz-req+jwt": { "source": "iana" },
		"application/oblivious-dns-message": { "source": "iana" },
		"application/ocsp-request": { "source": "iana" },
		"application/ocsp-response": { "source": "iana" },
		"application/octet-stream": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"bin",
				"dms",
				"lrf",
				"mar",
				"so",
				"dist",
				"distz",
				"pkg",
				"bpk",
				"dump",
				"elc",
				"deploy",
				"exe",
				"dll",
				"deb",
				"dmg",
				"iso",
				"img",
				"msi",
				"msp",
				"msm",
				"buffer"
			]
		},
		"application/oda": {
			"source": "iana",
			"extensions": ["oda"]
		},
		"application/odm+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/odx": { "source": "iana" },
		"application/oebps-package+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["opf"]
		},
		"application/ogg": {
			"source": "iana",
			"compressible": false,
			"extensions": ["ogx"]
		},
		"application/omdoc+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["omdoc"]
		},
		"application/onenote": {
			"source": "apache",
			"extensions": [
				"onetoc",
				"onetoc2",
				"onetmp",
				"onepkg"
			]
		},
		"application/opc-nodeset+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/oscore": { "source": "iana" },
		"application/oxps": {
			"source": "iana",
			"extensions": ["oxps"]
		},
		"application/p21": { "source": "iana" },
		"application/p21+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/p2p-overlay+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["relo"]
		},
		"application/parityfec": { "source": "iana" },
		"application/passport": { "source": "iana" },
		"application/patch-ops-error+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xer"]
		},
		"application/pdf": {
			"source": "iana",
			"compressible": false,
			"extensions": ["pdf"]
		},
		"application/pdx": { "source": "iana" },
		"application/pem-certificate-chain": { "source": "iana" },
		"application/pgp-encrypted": {
			"source": "iana",
			"compressible": false,
			"extensions": ["pgp"]
		},
		"application/pgp-keys": {
			"source": "iana",
			"extensions": ["asc"]
		},
		"application/pgp-signature": {
			"source": "iana",
			"extensions": ["asc", "sig"]
		},
		"application/pics-rules": {
			"source": "apache",
			"extensions": ["prf"]
		},
		"application/pidf+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/pidf-diff+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/pkcs10": {
			"source": "iana",
			"extensions": ["p10"]
		},
		"application/pkcs12": { "source": "iana" },
		"application/pkcs7-mime": {
			"source": "iana",
			"extensions": ["p7m", "p7c"]
		},
		"application/pkcs7-signature": {
			"source": "iana",
			"extensions": ["p7s"]
		},
		"application/pkcs8": {
			"source": "iana",
			"extensions": ["p8"]
		},
		"application/pkcs8-encrypted": { "source": "iana" },
		"application/pkix-attr-cert": {
			"source": "iana",
			"extensions": ["ac"]
		},
		"application/pkix-cert": {
			"source": "iana",
			"extensions": ["cer"]
		},
		"application/pkix-crl": {
			"source": "iana",
			"extensions": ["crl"]
		},
		"application/pkix-pkipath": {
			"source": "iana",
			"extensions": ["pkipath"]
		},
		"application/pkixcmp": {
			"source": "iana",
			"extensions": ["pki"]
		},
		"application/pls+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["pls"]
		},
		"application/poc-settings+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/postscript": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"ai",
				"eps",
				"ps"
			]
		},
		"application/ppsp-tracker+json": {
			"source": "iana",
			"compressible": true
		},
		"application/problem+json": {
			"source": "iana",
			"compressible": true
		},
		"application/problem+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/provenance+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["provx"]
		},
		"application/prs.alvestrand.titrax-sheet": { "source": "iana" },
		"application/prs.cww": {
			"source": "iana",
			"extensions": ["cww"]
		},
		"application/prs.cyn": {
			"source": "iana",
			"charset": "7-BIT"
		},
		"application/prs.hpub+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/prs.nprend": { "source": "iana" },
		"application/prs.plucker": { "source": "iana" },
		"application/prs.rdf-xml-crypt": { "source": "iana" },
		"application/prs.xsf+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/pskc+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["pskcxml"]
		},
		"application/pvd+json": {
			"source": "iana",
			"compressible": true
		},
		"application/qsig": { "source": "iana" },
		"application/raml+yaml": {
			"compressible": true,
			"extensions": ["raml"]
		},
		"application/raptorfec": { "source": "iana" },
		"application/rdap+json": {
			"source": "iana",
			"compressible": true
		},
		"application/rdf+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rdf", "owl"]
		},
		"application/reginfo+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rif"]
		},
		"application/relax-ng-compact-syntax": {
			"source": "iana",
			"extensions": ["rnc"]
		},
		"application/remote-printing": { "source": "iana" },
		"application/reputon+json": {
			"source": "iana",
			"compressible": true
		},
		"application/resource-lists+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rl"]
		},
		"application/resource-lists-diff+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rld"]
		},
		"application/rfc+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/riscos": { "source": "iana" },
		"application/rlmi+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/rls-services+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rs"]
		},
		"application/route-apd+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rapd"]
		},
		"application/route-s-tsid+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["sls"]
		},
		"application/route-usd+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rusd"]
		},
		"application/rpki-ghostbusters": {
			"source": "iana",
			"extensions": ["gbr"]
		},
		"application/rpki-manifest": {
			"source": "iana",
			"extensions": ["mft"]
		},
		"application/rpki-publication": { "source": "iana" },
		"application/rpki-roa": {
			"source": "iana",
			"extensions": ["roa"]
		},
		"application/rpki-updown": { "source": "iana" },
		"application/rsd+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["rsd"]
		},
		"application/rss+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["rss"]
		},
		"application/rtf": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rtf"]
		},
		"application/rtploopback": { "source": "iana" },
		"application/rtx": { "source": "iana" },
		"application/samlassertion+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/samlmetadata+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/sarif+json": {
			"source": "iana",
			"compressible": true
		},
		"application/sarif-external-properties+json": {
			"source": "iana",
			"compressible": true
		},
		"application/sbe": { "source": "iana" },
		"application/sbml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["sbml"]
		},
		"application/scaip+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/scim+json": {
			"source": "iana",
			"compressible": true
		},
		"application/scvp-cv-request": {
			"source": "iana",
			"extensions": ["scq"]
		},
		"application/scvp-cv-response": {
			"source": "iana",
			"extensions": ["scs"]
		},
		"application/scvp-vp-request": {
			"source": "iana",
			"extensions": ["spq"]
		},
		"application/scvp-vp-response": {
			"source": "iana",
			"extensions": ["spp"]
		},
		"application/sdp": {
			"source": "iana",
			"extensions": ["sdp"]
		},
		"application/secevent+jwt": { "source": "iana" },
		"application/senml+cbor": { "source": "iana" },
		"application/senml+json": {
			"source": "iana",
			"compressible": true
		},
		"application/senml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["senmlx"]
		},
		"application/senml-etch+cbor": { "source": "iana" },
		"application/senml-etch+json": {
			"source": "iana",
			"compressible": true
		},
		"application/senml-exi": { "source": "iana" },
		"application/sensml+cbor": { "source": "iana" },
		"application/sensml+json": {
			"source": "iana",
			"compressible": true
		},
		"application/sensml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["sensmlx"]
		},
		"application/sensml-exi": { "source": "iana" },
		"application/sep+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/sep-exi": { "source": "iana" },
		"application/session-info": { "source": "iana" },
		"application/set-payment": { "source": "iana" },
		"application/set-payment-initiation": {
			"source": "iana",
			"extensions": ["setpay"]
		},
		"application/set-registration": { "source": "iana" },
		"application/set-registration-initiation": {
			"source": "iana",
			"extensions": ["setreg"]
		},
		"application/sgml": { "source": "iana" },
		"application/sgml-open-catalog": { "source": "iana" },
		"application/shf+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["shf"]
		},
		"application/sieve": {
			"source": "iana",
			"extensions": ["siv", "sieve"]
		},
		"application/simple-filter+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/simple-message-summary": { "source": "iana" },
		"application/simplesymbolcontainer": { "source": "iana" },
		"application/sipc": { "source": "iana" },
		"application/slate": { "source": "iana" },
		"application/smil": { "source": "iana" },
		"application/smil+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["smi", "smil"]
		},
		"application/smpte336m": { "source": "iana" },
		"application/soap+fastinfoset": { "source": "iana" },
		"application/soap+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/sparql-query": {
			"source": "iana",
			"extensions": ["rq"]
		},
		"application/sparql-results+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["srx"]
		},
		"application/spdx+json": {
			"source": "iana",
			"compressible": true
		},
		"application/spirits-event+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/sql": { "source": "iana" },
		"application/srgs": {
			"source": "iana",
			"extensions": ["gram"]
		},
		"application/srgs+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["grxml"]
		},
		"application/sru+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["sru"]
		},
		"application/ssdl+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["ssdl"]
		},
		"application/ssml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["ssml"]
		},
		"application/stix+json": {
			"source": "iana",
			"compressible": true
		},
		"application/swid+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["swidtag"]
		},
		"application/tamp-apex-update": { "source": "iana" },
		"application/tamp-apex-update-confirm": { "source": "iana" },
		"application/tamp-community-update": { "source": "iana" },
		"application/tamp-community-update-confirm": { "source": "iana" },
		"application/tamp-error": { "source": "iana" },
		"application/tamp-sequence-adjust": { "source": "iana" },
		"application/tamp-sequence-adjust-confirm": { "source": "iana" },
		"application/tamp-status-query": { "source": "iana" },
		"application/tamp-status-response": { "source": "iana" },
		"application/tamp-update": { "source": "iana" },
		"application/tamp-update-confirm": { "source": "iana" },
		"application/tar": { "compressible": true },
		"application/taxii+json": {
			"source": "iana",
			"compressible": true
		},
		"application/td+json": {
			"source": "iana",
			"compressible": true
		},
		"application/tei+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["tei", "teicorpus"]
		},
		"application/tetra_isi": { "source": "iana" },
		"application/thraud+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["tfi"]
		},
		"application/timestamp-query": { "source": "iana" },
		"application/timestamp-reply": { "source": "iana" },
		"application/timestamped-data": {
			"source": "iana",
			"extensions": ["tsd"]
		},
		"application/tlsrpt+gzip": { "source": "iana" },
		"application/tlsrpt+json": {
			"source": "iana",
			"compressible": true
		},
		"application/tnauthlist": { "source": "iana" },
		"application/token-introspection+jwt": { "source": "iana" },
		"application/toml": {
			"compressible": true,
			"extensions": ["toml"]
		},
		"application/trickle-ice-sdpfrag": { "source": "iana" },
		"application/trig": {
			"source": "iana",
			"extensions": ["trig"]
		},
		"application/ttml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["ttml"]
		},
		"application/tve-trigger": { "source": "iana" },
		"application/tzif": { "source": "iana" },
		"application/tzif-leap": { "source": "iana" },
		"application/ubjson": {
			"compressible": false,
			"extensions": ["ubj"]
		},
		"application/ulpfec": { "source": "iana" },
		"application/urc-grpsheet+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/urc-ressheet+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rsheet"]
		},
		"application/urc-targetdesc+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["td"]
		},
		"application/urc-uisocketdesc+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vcard+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vcard+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vemmi": { "source": "iana" },
		"application/vividence.scriptfile": { "source": "apache" },
		"application/vnd.1000minds.decision-model+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["1km"]
		},
		"application/vnd.3gpp-prose+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp-prose-pc3ch+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp-v2x-local-service-information": { "source": "iana" },
		"application/vnd.3gpp.5gnas": { "source": "iana" },
		"application/vnd.3gpp.access-transfer-events+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.bsf+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.gmop+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.gtpc": { "source": "iana" },
		"application/vnd.3gpp.interworking-data": { "source": "iana" },
		"application/vnd.3gpp.lpp": { "source": "iana" },
		"application/vnd.3gpp.mc-signalling-ear": { "source": "iana" },
		"application/vnd.3gpp.mcdata-affiliation-command+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcdata-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcdata-payload": { "source": "iana" },
		"application/vnd.3gpp.mcdata-service-config+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcdata-signalling": { "source": "iana" },
		"application/vnd.3gpp.mcdata-ue-config+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcdata-user-profile+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcptt-affiliation-command+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcptt-floor-request+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcptt-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcptt-location-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcptt-service-config+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcptt-signed+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcptt-ue-config+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcptt-ue-init-config+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcptt-user-profile+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcvideo-affiliation-command+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcvideo-affiliation-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcvideo-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcvideo-location-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcvideo-service-config+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcvideo-transmission-request+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcvideo-ue-config+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mcvideo-user-profile+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.mid-call+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.ngap": { "source": "iana" },
		"application/vnd.3gpp.pfcp": { "source": "iana" },
		"application/vnd.3gpp.pic-bw-large": {
			"source": "iana",
			"extensions": ["plb"]
		},
		"application/vnd.3gpp.pic-bw-small": {
			"source": "iana",
			"extensions": ["psb"]
		},
		"application/vnd.3gpp.pic-bw-var": {
			"source": "iana",
			"extensions": ["pvb"]
		},
		"application/vnd.3gpp.s1ap": { "source": "iana" },
		"application/vnd.3gpp.sms": { "source": "iana" },
		"application/vnd.3gpp.sms+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.srvcc-ext+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.srvcc-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.state-and-event-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp.ussd+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp2.bcmcsinfo+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.3gpp2.sms": { "source": "iana" },
		"application/vnd.3gpp2.tcap": {
			"source": "iana",
			"extensions": ["tcap"]
		},
		"application/vnd.3lightssoftware.imagescal": { "source": "iana" },
		"application/vnd.3m.post-it-notes": {
			"source": "iana",
			"extensions": ["pwn"]
		},
		"application/vnd.accpac.simply.aso": {
			"source": "iana",
			"extensions": ["aso"]
		},
		"application/vnd.accpac.simply.imp": {
			"source": "iana",
			"extensions": ["imp"]
		},
		"application/vnd.acucobol": {
			"source": "iana",
			"extensions": ["acu"]
		},
		"application/vnd.acucorp": {
			"source": "iana",
			"extensions": ["atc", "acutc"]
		},
		"application/vnd.adobe.air-application-installer-package+zip": {
			"source": "apache",
			"compressible": false,
			"extensions": ["air"]
		},
		"application/vnd.adobe.flash.movie": { "source": "iana" },
		"application/vnd.adobe.formscentral.fcdt": {
			"source": "iana",
			"extensions": ["fcdt"]
		},
		"application/vnd.adobe.fxp": {
			"source": "iana",
			"extensions": ["fxp", "fxpl"]
		},
		"application/vnd.adobe.partial-upload": { "source": "iana" },
		"application/vnd.adobe.xdp+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xdp"]
		},
		"application/vnd.adobe.xfdf": {
			"source": "iana",
			"extensions": ["xfdf"]
		},
		"application/vnd.aether.imp": { "source": "iana" },
		"application/vnd.afpc.afplinedata": { "source": "iana" },
		"application/vnd.afpc.afplinedata-pagedef": { "source": "iana" },
		"application/vnd.afpc.cmoca-cmresource": { "source": "iana" },
		"application/vnd.afpc.foca-charset": { "source": "iana" },
		"application/vnd.afpc.foca-codedfont": { "source": "iana" },
		"application/vnd.afpc.foca-codepage": { "source": "iana" },
		"application/vnd.afpc.modca": { "source": "iana" },
		"application/vnd.afpc.modca-cmtable": { "source": "iana" },
		"application/vnd.afpc.modca-formdef": { "source": "iana" },
		"application/vnd.afpc.modca-mediummap": { "source": "iana" },
		"application/vnd.afpc.modca-objectcontainer": { "source": "iana" },
		"application/vnd.afpc.modca-overlay": { "source": "iana" },
		"application/vnd.afpc.modca-pagesegment": { "source": "iana" },
		"application/vnd.age": {
			"source": "iana",
			"extensions": ["age"]
		},
		"application/vnd.ah-barcode": { "source": "iana" },
		"application/vnd.ahead.space": {
			"source": "iana",
			"extensions": ["ahead"]
		},
		"application/vnd.airzip.filesecure.azf": {
			"source": "iana",
			"extensions": ["azf"]
		},
		"application/vnd.airzip.filesecure.azs": {
			"source": "iana",
			"extensions": ["azs"]
		},
		"application/vnd.amadeus+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.amazon.ebook": {
			"source": "apache",
			"extensions": ["azw"]
		},
		"application/vnd.amazon.mobi8-ebook": { "source": "iana" },
		"application/vnd.americandynamics.acc": {
			"source": "iana",
			"extensions": ["acc"]
		},
		"application/vnd.amiga.ami": {
			"source": "iana",
			"extensions": ["ami"]
		},
		"application/vnd.amundsen.maze+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.android.ota": { "source": "iana" },
		"application/vnd.android.package-archive": {
			"source": "apache",
			"compressible": false,
			"extensions": ["apk"]
		},
		"application/vnd.anki": { "source": "iana" },
		"application/vnd.anser-web-certificate-issue-initiation": {
			"source": "iana",
			"extensions": ["cii"]
		},
		"application/vnd.anser-web-funds-transfer-initiation": {
			"source": "apache",
			"extensions": ["fti"]
		},
		"application/vnd.antix.game-component": {
			"source": "iana",
			"extensions": ["atx"]
		},
		"application/vnd.apache.arrow.file": { "source": "iana" },
		"application/vnd.apache.arrow.stream": { "source": "iana" },
		"application/vnd.apache.thrift.binary": { "source": "iana" },
		"application/vnd.apache.thrift.compact": { "source": "iana" },
		"application/vnd.apache.thrift.json": { "source": "iana" },
		"application/vnd.api+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.aplextor.warrp+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.apothekende.reservation+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.apple.installer+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["mpkg"]
		},
		"application/vnd.apple.keynote": {
			"source": "iana",
			"extensions": ["key"]
		},
		"application/vnd.apple.mpegurl": {
			"source": "iana",
			"extensions": ["m3u8"]
		},
		"application/vnd.apple.numbers": {
			"source": "iana",
			"extensions": ["numbers"]
		},
		"application/vnd.apple.pages": {
			"source": "iana",
			"extensions": ["pages"]
		},
		"application/vnd.apple.pkpass": {
			"compressible": false,
			"extensions": ["pkpass"]
		},
		"application/vnd.arastra.swi": { "source": "iana" },
		"application/vnd.aristanetworks.swi": {
			"source": "iana",
			"extensions": ["swi"]
		},
		"application/vnd.artisan+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.artsquare": { "source": "iana" },
		"application/vnd.astraea-software.iota": {
			"source": "iana",
			"extensions": ["iota"]
		},
		"application/vnd.audiograph": {
			"source": "iana",
			"extensions": ["aep"]
		},
		"application/vnd.autopackage": { "source": "iana" },
		"application/vnd.avalon+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.avistar+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.balsamiq.bmml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["bmml"]
		},
		"application/vnd.balsamiq.bmpr": { "source": "iana" },
		"application/vnd.banana-accounting": { "source": "iana" },
		"application/vnd.bbf.usp.error": { "source": "iana" },
		"application/vnd.bbf.usp.msg": { "source": "iana" },
		"application/vnd.bbf.usp.msg+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.bekitzur-stech+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.bint.med-content": { "source": "iana" },
		"application/vnd.biopax.rdf+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.blink-idb-value-wrapper": { "source": "iana" },
		"application/vnd.blueice.multipass": {
			"source": "iana",
			"extensions": ["mpm"]
		},
		"application/vnd.bluetooth.ep.oob": { "source": "iana" },
		"application/vnd.bluetooth.le.oob": { "source": "iana" },
		"application/vnd.bmi": {
			"source": "iana",
			"extensions": ["bmi"]
		},
		"application/vnd.bpf": { "source": "iana" },
		"application/vnd.bpf3": { "source": "iana" },
		"application/vnd.businessobjects": {
			"source": "iana",
			"extensions": ["rep"]
		},
		"application/vnd.byu.uapi+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.cab-jscript": { "source": "iana" },
		"application/vnd.canon-cpdl": { "source": "iana" },
		"application/vnd.canon-lips": { "source": "iana" },
		"application/vnd.capasystems-pg+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.cendio.thinlinc.clientconf": { "source": "iana" },
		"application/vnd.century-systems.tcp_stream": { "source": "iana" },
		"application/vnd.chemdraw+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["cdxml"]
		},
		"application/vnd.chess-pgn": { "source": "iana" },
		"application/vnd.chipnuts.karaoke-mmd": {
			"source": "iana",
			"extensions": ["mmd"]
		},
		"application/vnd.ciedi": { "source": "iana" },
		"application/vnd.cinderella": {
			"source": "iana",
			"extensions": ["cdy"]
		},
		"application/vnd.cirpack.isdn-ext": { "source": "iana" },
		"application/vnd.citationstyles.style+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["csl"]
		},
		"application/vnd.claymore": {
			"source": "iana",
			"extensions": ["cla"]
		},
		"application/vnd.cloanto.rp9": {
			"source": "iana",
			"extensions": ["rp9"]
		},
		"application/vnd.clonk.c4group": {
			"source": "iana",
			"extensions": [
				"c4g",
				"c4d",
				"c4f",
				"c4p",
				"c4u"
			]
		},
		"application/vnd.cluetrust.cartomobile-config": {
			"source": "iana",
			"extensions": ["c11amc"]
		},
		"application/vnd.cluetrust.cartomobile-config-pkg": {
			"source": "iana",
			"extensions": ["c11amz"]
		},
		"application/vnd.coffeescript": { "source": "iana" },
		"application/vnd.collabio.xodocuments.document": { "source": "iana" },
		"application/vnd.collabio.xodocuments.document-template": { "source": "iana" },
		"application/vnd.collabio.xodocuments.presentation": { "source": "iana" },
		"application/vnd.collabio.xodocuments.presentation-template": { "source": "iana" },
		"application/vnd.collabio.xodocuments.spreadsheet": { "source": "iana" },
		"application/vnd.collabio.xodocuments.spreadsheet-template": { "source": "iana" },
		"application/vnd.collection+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.collection.doc+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.collection.next+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.comicbook+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.comicbook-rar": { "source": "iana" },
		"application/vnd.commerce-battelle": { "source": "iana" },
		"application/vnd.commonspace": {
			"source": "iana",
			"extensions": ["csp"]
		},
		"application/vnd.contact.cmsg": {
			"source": "iana",
			"extensions": ["cdbcmsg"]
		},
		"application/vnd.coreos.ignition+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.cosmocaller": {
			"source": "iana",
			"extensions": ["cmc"]
		},
		"application/vnd.crick.clicker": {
			"source": "iana",
			"extensions": ["clkx"]
		},
		"application/vnd.crick.clicker.keyboard": {
			"source": "iana",
			"extensions": ["clkk"]
		},
		"application/vnd.crick.clicker.palette": {
			"source": "iana",
			"extensions": ["clkp"]
		},
		"application/vnd.crick.clicker.template": {
			"source": "iana",
			"extensions": ["clkt"]
		},
		"application/vnd.crick.clicker.wordbank": {
			"source": "iana",
			"extensions": ["clkw"]
		},
		"application/vnd.criticaltools.wbs+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["wbs"]
		},
		"application/vnd.cryptii.pipe+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.crypto-shade-file": { "source": "iana" },
		"application/vnd.cryptomator.encrypted": { "source": "iana" },
		"application/vnd.cryptomator.vault": { "source": "iana" },
		"application/vnd.ctc-posml": {
			"source": "iana",
			"extensions": ["pml"]
		},
		"application/vnd.ctct.ws+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.cups-pdf": { "source": "iana" },
		"application/vnd.cups-postscript": { "source": "iana" },
		"application/vnd.cups-ppd": {
			"source": "iana",
			"extensions": ["ppd"]
		},
		"application/vnd.cups-raster": { "source": "iana" },
		"application/vnd.cups-raw": { "source": "iana" },
		"application/vnd.curl": { "source": "iana" },
		"application/vnd.curl.car": {
			"source": "apache",
			"extensions": ["car"]
		},
		"application/vnd.curl.pcurl": {
			"source": "apache",
			"extensions": ["pcurl"]
		},
		"application/vnd.cyan.dean.root+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.cybank": { "source": "iana" },
		"application/vnd.cyclonedx+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.cyclonedx+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.d2l.coursepackage1p0+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.d3m-dataset": { "source": "iana" },
		"application/vnd.d3m-problem": { "source": "iana" },
		"application/vnd.dart": {
			"source": "iana",
			"compressible": true,
			"extensions": ["dart"]
		},
		"application/vnd.data-vision.rdz": {
			"source": "iana",
			"extensions": ["rdz"]
		},
		"application/vnd.datapackage+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dataresource+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dbf": {
			"source": "iana",
			"extensions": ["dbf"]
		},
		"application/vnd.debian.binary-package": { "source": "iana" },
		"application/vnd.dece.data": {
			"source": "iana",
			"extensions": [
				"uvf",
				"uvvf",
				"uvd",
				"uvvd"
			]
		},
		"application/vnd.dece.ttml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["uvt", "uvvt"]
		},
		"application/vnd.dece.unspecified": {
			"source": "iana",
			"extensions": ["uvx", "uvvx"]
		},
		"application/vnd.dece.zip": {
			"source": "iana",
			"extensions": ["uvz", "uvvz"]
		},
		"application/vnd.denovo.fcselayout-link": {
			"source": "iana",
			"extensions": ["fe_launch"]
		},
		"application/vnd.desmume.movie": { "source": "iana" },
		"application/vnd.dir-bi.plate-dl-nosuffix": { "source": "iana" },
		"application/vnd.dm.delegation+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dna": {
			"source": "iana",
			"extensions": ["dna"]
		},
		"application/vnd.document+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dolby.mlp": {
			"source": "apache",
			"extensions": ["mlp"]
		},
		"application/vnd.dolby.mobile.1": { "source": "iana" },
		"application/vnd.dolby.mobile.2": { "source": "iana" },
		"application/vnd.doremir.scorecloud-binary-document": { "source": "iana" },
		"application/vnd.dpgraph": {
			"source": "iana",
			"extensions": ["dpg"]
		},
		"application/vnd.dreamfactory": {
			"source": "iana",
			"extensions": ["dfac"]
		},
		"application/vnd.drive+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ds-keypoint": {
			"source": "apache",
			"extensions": ["kpxx"]
		},
		"application/vnd.dtg.local": { "source": "iana" },
		"application/vnd.dtg.local.flash": { "source": "iana" },
		"application/vnd.dtg.local.html": { "source": "iana" },
		"application/vnd.dvb.ait": {
			"source": "iana",
			"extensions": ["ait"]
		},
		"application/vnd.dvb.dvbisl+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dvb.dvbj": { "source": "iana" },
		"application/vnd.dvb.esgcontainer": { "source": "iana" },
		"application/vnd.dvb.ipdcdftnotifaccess": { "source": "iana" },
		"application/vnd.dvb.ipdcesgaccess": { "source": "iana" },
		"application/vnd.dvb.ipdcesgaccess2": { "source": "iana" },
		"application/vnd.dvb.ipdcesgpdd": { "source": "iana" },
		"application/vnd.dvb.ipdcroaming": { "source": "iana" },
		"application/vnd.dvb.iptv.alfec-base": { "source": "iana" },
		"application/vnd.dvb.iptv.alfec-enhancement": { "source": "iana" },
		"application/vnd.dvb.notif-aggregate-root+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dvb.notif-container+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dvb.notif-generic+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dvb.notif-ia-msglist+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dvb.notif-ia-registration-request+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dvb.notif-ia-registration-response+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dvb.notif-init+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dvb.pfr": { "source": "iana" },
		"application/vnd.dvb.service": {
			"source": "iana",
			"extensions": ["svc"]
		},
		"application/vnd.dxr": { "source": "iana" },
		"application/vnd.dynageo": {
			"source": "iana",
			"extensions": ["geo"]
		},
		"application/vnd.dzr": { "source": "iana" },
		"application/vnd.easykaraoke.cdgdownload": { "source": "iana" },
		"application/vnd.ecdis-update": { "source": "iana" },
		"application/vnd.ecip.rlp": { "source": "iana" },
		"application/vnd.eclipse.ditto+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ecowin.chart": {
			"source": "iana",
			"extensions": ["mag"]
		},
		"application/vnd.ecowin.filerequest": { "source": "iana" },
		"application/vnd.ecowin.fileupdate": { "source": "iana" },
		"application/vnd.ecowin.series": { "source": "iana" },
		"application/vnd.ecowin.seriesrequest": { "source": "iana" },
		"application/vnd.ecowin.seriesupdate": { "source": "iana" },
		"application/vnd.efi.img": { "source": "iana" },
		"application/vnd.efi.iso": { "source": "iana" },
		"application/vnd.emclient.accessrequest+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.enliven": {
			"source": "iana",
			"extensions": ["nml"]
		},
		"application/vnd.enphase.envoy": { "source": "iana" },
		"application/vnd.eprints.data+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.epson.esf": {
			"source": "iana",
			"extensions": ["esf"]
		},
		"application/vnd.epson.msf": {
			"source": "iana",
			"extensions": ["msf"]
		},
		"application/vnd.epson.quickanime": {
			"source": "iana",
			"extensions": ["qam"]
		},
		"application/vnd.epson.salt": {
			"source": "iana",
			"extensions": ["slt"]
		},
		"application/vnd.epson.ssf": {
			"source": "iana",
			"extensions": ["ssf"]
		},
		"application/vnd.ericsson.quickcall": { "source": "iana" },
		"application/vnd.espass-espass+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.eszigno3+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["es3", "et3"]
		},
		"application/vnd.etsi.aoc+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.asic-e+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.etsi.asic-s+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.etsi.cug+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.iptvcommand+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.iptvdiscovery+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.iptvprofile+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.iptvsad-bc+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.iptvsad-cod+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.iptvsad-npvr+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.iptvservice+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.iptvsync+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.iptvueprofile+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.mcid+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.mheg5": { "source": "iana" },
		"application/vnd.etsi.overload-control-policy-dataset+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.pstn+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.sci+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.simservs+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.timestamp-token": { "source": "iana" },
		"application/vnd.etsi.tsl+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.etsi.tsl.der": { "source": "iana" },
		"application/vnd.eu.kasparian.car+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.eudora.data": { "source": "iana" },
		"application/vnd.evolv.ecig.profile": { "source": "iana" },
		"application/vnd.evolv.ecig.settings": { "source": "iana" },
		"application/vnd.evolv.ecig.theme": { "source": "iana" },
		"application/vnd.exstream-empower+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.exstream-package": { "source": "iana" },
		"application/vnd.ezpix-album": {
			"source": "iana",
			"extensions": ["ez2"]
		},
		"application/vnd.ezpix-package": {
			"source": "iana",
			"extensions": ["ez3"]
		},
		"application/vnd.f-secure.mobile": { "source": "iana" },
		"application/vnd.familysearch.gedcom+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.fastcopy-disk-image": { "source": "iana" },
		"application/vnd.fdf": {
			"source": "iana",
			"extensions": ["fdf"]
		},
		"application/vnd.fdsn.mseed": {
			"source": "iana",
			"extensions": ["mseed"]
		},
		"application/vnd.fdsn.seed": {
			"source": "iana",
			"extensions": ["seed", "dataless"]
		},
		"application/vnd.ffsns": { "source": "iana" },
		"application/vnd.ficlab.flb+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.filmit.zfc": { "source": "iana" },
		"application/vnd.fints": { "source": "iana" },
		"application/vnd.firemonkeys.cloudcell": { "source": "iana" },
		"application/vnd.flographit": {
			"source": "iana",
			"extensions": ["gph"]
		},
		"application/vnd.fluxtime.clip": {
			"source": "iana",
			"extensions": ["ftc"]
		},
		"application/vnd.font-fontforge-sfd": { "source": "iana" },
		"application/vnd.framemaker": {
			"source": "iana",
			"extensions": [
				"fm",
				"frame",
				"maker",
				"book"
			]
		},
		"application/vnd.frogans.fnc": {
			"source": "iana",
			"extensions": ["fnc"]
		},
		"application/vnd.frogans.ltf": {
			"source": "iana",
			"extensions": ["ltf"]
		},
		"application/vnd.fsc.weblaunch": {
			"source": "iana",
			"extensions": ["fsc"]
		},
		"application/vnd.fujifilm.fb.docuworks": { "source": "iana" },
		"application/vnd.fujifilm.fb.docuworks.binder": { "source": "iana" },
		"application/vnd.fujifilm.fb.docuworks.container": { "source": "iana" },
		"application/vnd.fujifilm.fb.jfi+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.fujitsu.oasys": {
			"source": "iana",
			"extensions": ["oas"]
		},
		"application/vnd.fujitsu.oasys2": {
			"source": "iana",
			"extensions": ["oa2"]
		},
		"application/vnd.fujitsu.oasys3": {
			"source": "iana",
			"extensions": ["oa3"]
		},
		"application/vnd.fujitsu.oasysgp": {
			"source": "iana",
			"extensions": ["fg5"]
		},
		"application/vnd.fujitsu.oasysprs": {
			"source": "iana",
			"extensions": ["bh2"]
		},
		"application/vnd.fujixerox.art-ex": { "source": "iana" },
		"application/vnd.fujixerox.art4": { "source": "iana" },
		"application/vnd.fujixerox.ddd": {
			"source": "iana",
			"extensions": ["ddd"]
		},
		"application/vnd.fujixerox.docuworks": {
			"source": "iana",
			"extensions": ["xdw"]
		},
		"application/vnd.fujixerox.docuworks.binder": {
			"source": "iana",
			"extensions": ["xbd"]
		},
		"application/vnd.fujixerox.docuworks.container": { "source": "iana" },
		"application/vnd.fujixerox.hbpl": { "source": "iana" },
		"application/vnd.fut-misnet": { "source": "iana" },
		"application/vnd.futoin+cbor": { "source": "iana" },
		"application/vnd.futoin+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.fuzzysheet": {
			"source": "iana",
			"extensions": ["fzs"]
		},
		"application/vnd.genomatix.tuxedo": {
			"source": "iana",
			"extensions": ["txd"]
		},
		"application/vnd.gentics.grd+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.geo+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.geocube+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.geogebra.file": {
			"source": "iana",
			"extensions": ["ggb"]
		},
		"application/vnd.geogebra.slides": { "source": "iana" },
		"application/vnd.geogebra.tool": {
			"source": "iana",
			"extensions": ["ggt"]
		},
		"application/vnd.geometry-explorer": {
			"source": "iana",
			"extensions": ["gex", "gre"]
		},
		"application/vnd.geonext": {
			"source": "iana",
			"extensions": ["gxt"]
		},
		"application/vnd.geoplan": {
			"source": "iana",
			"extensions": ["g2w"]
		},
		"application/vnd.geospace": {
			"source": "iana",
			"extensions": ["g3w"]
		},
		"application/vnd.gerber": { "source": "iana" },
		"application/vnd.globalplatform.card-content-mgt": { "source": "iana" },
		"application/vnd.globalplatform.card-content-mgt-response": { "source": "iana" },
		"application/vnd.gmx": {
			"source": "iana",
			"extensions": ["gmx"]
		},
		"application/vnd.google-apps.document": {
			"compressible": false,
			"extensions": ["gdoc"]
		},
		"application/vnd.google-apps.presentation": {
			"compressible": false,
			"extensions": ["gslides"]
		},
		"application/vnd.google-apps.spreadsheet": {
			"compressible": false,
			"extensions": ["gsheet"]
		},
		"application/vnd.google-earth.kml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["kml"]
		},
		"application/vnd.google-earth.kmz": {
			"source": "iana",
			"compressible": false,
			"extensions": ["kmz"]
		},
		"application/vnd.gov.sk.e-form+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.gov.sk.e-form+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.gov.sk.xmldatacontainer+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.grafeq": {
			"source": "iana",
			"extensions": ["gqf", "gqs"]
		},
		"application/vnd.gridmp": { "source": "iana" },
		"application/vnd.groove-account": {
			"source": "iana",
			"extensions": ["gac"]
		},
		"application/vnd.groove-help": {
			"source": "iana",
			"extensions": ["ghf"]
		},
		"application/vnd.groove-identity-message": {
			"source": "iana",
			"extensions": ["gim"]
		},
		"application/vnd.groove-injector": {
			"source": "iana",
			"extensions": ["grv"]
		},
		"application/vnd.groove-tool-message": {
			"source": "iana",
			"extensions": ["gtm"]
		},
		"application/vnd.groove-tool-template": {
			"source": "iana",
			"extensions": ["tpl"]
		},
		"application/vnd.groove-vcard": {
			"source": "iana",
			"extensions": ["vcg"]
		},
		"application/vnd.hal+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.hal+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["hal"]
		},
		"application/vnd.handheld-entertainment+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["zmm"]
		},
		"application/vnd.hbci": {
			"source": "iana",
			"extensions": ["hbci"]
		},
		"application/vnd.hc+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.hcl-bireports": { "source": "iana" },
		"application/vnd.hdt": { "source": "iana" },
		"application/vnd.heroku+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.hhe.lesson-player": {
			"source": "iana",
			"extensions": ["les"]
		},
		"application/vnd.hl7cda+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/vnd.hl7v2+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/vnd.hp-hpgl": {
			"source": "iana",
			"extensions": ["hpgl"]
		},
		"application/vnd.hp-hpid": {
			"source": "iana",
			"extensions": ["hpid"]
		},
		"application/vnd.hp-hps": {
			"source": "iana",
			"extensions": ["hps"]
		},
		"application/vnd.hp-jlyt": {
			"source": "iana",
			"extensions": ["jlt"]
		},
		"application/vnd.hp-pcl": {
			"source": "iana",
			"extensions": ["pcl"]
		},
		"application/vnd.hp-pclxl": {
			"source": "iana",
			"extensions": ["pclxl"]
		},
		"application/vnd.httphone": { "source": "iana" },
		"application/vnd.hydrostatix.sof-data": {
			"source": "iana",
			"extensions": ["sfd-hdstx"]
		},
		"application/vnd.hyper+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.hyper-item+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.hyperdrive+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.hzn-3d-crossword": { "source": "iana" },
		"application/vnd.ibm.afplinedata": { "source": "iana" },
		"application/vnd.ibm.electronic-media": { "source": "iana" },
		"application/vnd.ibm.minipay": {
			"source": "iana",
			"extensions": ["mpy"]
		},
		"application/vnd.ibm.modcap": {
			"source": "iana",
			"extensions": [
				"afp",
				"listafp",
				"list3820"
			]
		},
		"application/vnd.ibm.rights-management": {
			"source": "iana",
			"extensions": ["irm"]
		},
		"application/vnd.ibm.secure-container": {
			"source": "iana",
			"extensions": ["sc"]
		},
		"application/vnd.iccprofile": {
			"source": "iana",
			"extensions": ["icc", "icm"]
		},
		"application/vnd.ieee.1905": { "source": "iana" },
		"application/vnd.igloader": {
			"source": "iana",
			"extensions": ["igl"]
		},
		"application/vnd.imagemeter.folder+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.imagemeter.image+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.immervision-ivp": {
			"source": "iana",
			"extensions": ["ivp"]
		},
		"application/vnd.immervision-ivu": {
			"source": "iana",
			"extensions": ["ivu"]
		},
		"application/vnd.ims.imsccv1p1": { "source": "iana" },
		"application/vnd.ims.imsccv1p2": { "source": "iana" },
		"application/vnd.ims.imsccv1p3": { "source": "iana" },
		"application/vnd.ims.lis.v2.result+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ims.lti.v2.toolconsumerprofile+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ims.lti.v2.toolproxy+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ims.lti.v2.toolproxy.id+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ims.lti.v2.toolsettings+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ims.lti.v2.toolsettings.simple+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.informedcontrol.rms+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.informix-visionary": { "source": "iana" },
		"application/vnd.infotech.project": { "source": "iana" },
		"application/vnd.infotech.project+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.innopath.wamp.notification": { "source": "iana" },
		"application/vnd.insors.igm": {
			"source": "iana",
			"extensions": ["igm"]
		},
		"application/vnd.intercon.formnet": {
			"source": "iana",
			"extensions": ["xpw", "xpx"]
		},
		"application/vnd.intergeo": {
			"source": "iana",
			"extensions": ["i2g"]
		},
		"application/vnd.intertrust.digibox": { "source": "iana" },
		"application/vnd.intertrust.nncp": { "source": "iana" },
		"application/vnd.intu.qbo": {
			"source": "iana",
			"extensions": ["qbo"]
		},
		"application/vnd.intu.qfx": {
			"source": "iana",
			"extensions": ["qfx"]
		},
		"application/vnd.iptc.g2.catalogitem+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.iptc.g2.conceptitem+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.iptc.g2.knowledgeitem+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.iptc.g2.newsitem+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.iptc.g2.newsmessage+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.iptc.g2.packageitem+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.iptc.g2.planningitem+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ipunplugged.rcprofile": {
			"source": "iana",
			"extensions": ["rcprofile"]
		},
		"application/vnd.irepository.package+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["irp"]
		},
		"application/vnd.is-xpr": {
			"source": "iana",
			"extensions": ["xpr"]
		},
		"application/vnd.isac.fcs": {
			"source": "iana",
			"extensions": ["fcs"]
		},
		"application/vnd.iso11783-10+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.jam": {
			"source": "iana",
			"extensions": ["jam"]
		},
		"application/vnd.japannet-directory-service": { "source": "iana" },
		"application/vnd.japannet-jpnstore-wakeup": { "source": "iana" },
		"application/vnd.japannet-payment-wakeup": { "source": "iana" },
		"application/vnd.japannet-registration": { "source": "iana" },
		"application/vnd.japannet-registration-wakeup": { "source": "iana" },
		"application/vnd.japannet-setstore-wakeup": { "source": "iana" },
		"application/vnd.japannet-verification": { "source": "iana" },
		"application/vnd.japannet-verification-wakeup": { "source": "iana" },
		"application/vnd.jcp.javame.midlet-rms": {
			"source": "iana",
			"extensions": ["rms"]
		},
		"application/vnd.jisp": {
			"source": "iana",
			"extensions": ["jisp"]
		},
		"application/vnd.joost.joda-archive": {
			"source": "iana",
			"extensions": ["joda"]
		},
		"application/vnd.jsk.isdn-ngn": { "source": "iana" },
		"application/vnd.kahootz": {
			"source": "iana",
			"extensions": ["ktz", "ktr"]
		},
		"application/vnd.kde.karbon": {
			"source": "iana",
			"extensions": ["karbon"]
		},
		"application/vnd.kde.kchart": {
			"source": "iana",
			"extensions": ["chrt"]
		},
		"application/vnd.kde.kformula": {
			"source": "iana",
			"extensions": ["kfo"]
		},
		"application/vnd.kde.kivio": {
			"source": "iana",
			"extensions": ["flw"]
		},
		"application/vnd.kde.kontour": {
			"source": "iana",
			"extensions": ["kon"]
		},
		"application/vnd.kde.kpresenter": {
			"source": "iana",
			"extensions": ["kpr", "kpt"]
		},
		"application/vnd.kde.kspread": {
			"source": "iana",
			"extensions": ["ksp"]
		},
		"application/vnd.kde.kword": {
			"source": "iana",
			"extensions": ["kwd", "kwt"]
		},
		"application/vnd.kenameaapp": {
			"source": "iana",
			"extensions": ["htke"]
		},
		"application/vnd.kidspiration": {
			"source": "iana",
			"extensions": ["kia"]
		},
		"application/vnd.kinar": {
			"source": "iana",
			"extensions": ["kne", "knp"]
		},
		"application/vnd.koan": {
			"source": "iana",
			"extensions": [
				"skp",
				"skd",
				"skt",
				"skm"
			]
		},
		"application/vnd.kodak-descriptor": {
			"source": "iana",
			"extensions": ["sse"]
		},
		"application/vnd.las": { "source": "iana" },
		"application/vnd.las.las+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.las.las+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["lasxml"]
		},
		"application/vnd.laszip": { "source": "iana" },
		"application/vnd.leap+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.liberty-request+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.llamagraphics.life-balance.desktop": {
			"source": "iana",
			"extensions": ["lbd"]
		},
		"application/vnd.llamagraphics.life-balance.exchange+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["lbe"]
		},
		"application/vnd.logipipe.circuit+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.loom": { "source": "iana" },
		"application/vnd.lotus-1-2-3": {
			"source": "iana",
			"extensions": ["123"]
		},
		"application/vnd.lotus-approach": {
			"source": "iana",
			"extensions": ["apr"]
		},
		"application/vnd.lotus-freelance": {
			"source": "iana",
			"extensions": ["pre"]
		},
		"application/vnd.lotus-notes": {
			"source": "iana",
			"extensions": ["nsf"]
		},
		"application/vnd.lotus-organizer": {
			"source": "iana",
			"extensions": ["org"]
		},
		"application/vnd.lotus-screencam": {
			"source": "iana",
			"extensions": ["scm"]
		},
		"application/vnd.lotus-wordpro": {
			"source": "iana",
			"extensions": ["lwp"]
		},
		"application/vnd.macports.portpkg": {
			"source": "iana",
			"extensions": ["portpkg"]
		},
		"application/vnd.mapbox-vector-tile": {
			"source": "iana",
			"extensions": ["mvt"]
		},
		"application/vnd.marlin.drm.actiontoken+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.marlin.drm.conftoken+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.marlin.drm.license+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.marlin.drm.mdcf": { "source": "iana" },
		"application/vnd.mason+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.maxar.archive.3tz+zip": {
			"source": "iana",
			"compressible": false
		},
		"application/vnd.maxmind.maxmind-db": { "source": "iana" },
		"application/vnd.mcd": {
			"source": "iana",
			"extensions": ["mcd"]
		},
		"application/vnd.medcalcdata": {
			"source": "iana",
			"extensions": ["mc1"]
		},
		"application/vnd.mediastation.cdkey": {
			"source": "iana",
			"extensions": ["cdkey"]
		},
		"application/vnd.meridian-slingshot": { "source": "iana" },
		"application/vnd.mfer": {
			"source": "iana",
			"extensions": ["mwf"]
		},
		"application/vnd.mfmp": {
			"source": "iana",
			"extensions": ["mfm"]
		},
		"application/vnd.micro+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.micrografx.flo": {
			"source": "iana",
			"extensions": ["flo"]
		},
		"application/vnd.micrografx.igx": {
			"source": "iana",
			"extensions": ["igx"]
		},
		"application/vnd.microsoft.portable-executable": { "source": "iana" },
		"application/vnd.microsoft.windows.thumbnail-cache": { "source": "iana" },
		"application/vnd.miele+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.mif": {
			"source": "iana",
			"extensions": ["mif"]
		},
		"application/vnd.minisoft-hp3000-save": { "source": "iana" },
		"application/vnd.mitsubishi.misty-guard.trustweb": { "source": "iana" },
		"application/vnd.mobius.daf": {
			"source": "iana",
			"extensions": ["daf"]
		},
		"application/vnd.mobius.dis": {
			"source": "iana",
			"extensions": ["dis"]
		},
		"application/vnd.mobius.mbk": {
			"source": "iana",
			"extensions": ["mbk"]
		},
		"application/vnd.mobius.mqy": {
			"source": "iana",
			"extensions": ["mqy"]
		},
		"application/vnd.mobius.msl": {
			"source": "iana",
			"extensions": ["msl"]
		},
		"application/vnd.mobius.plc": {
			"source": "iana",
			"extensions": ["plc"]
		},
		"application/vnd.mobius.txf": {
			"source": "iana",
			"extensions": ["txf"]
		},
		"application/vnd.mophun.application": {
			"source": "iana",
			"extensions": ["mpn"]
		},
		"application/vnd.mophun.certificate": {
			"source": "iana",
			"extensions": ["mpc"]
		},
		"application/vnd.motorola.flexsuite": { "source": "iana" },
		"application/vnd.motorola.flexsuite.adsi": { "source": "iana" },
		"application/vnd.motorola.flexsuite.fis": { "source": "iana" },
		"application/vnd.motorola.flexsuite.gotap": { "source": "iana" },
		"application/vnd.motorola.flexsuite.kmr": { "source": "iana" },
		"application/vnd.motorola.flexsuite.ttc": { "source": "iana" },
		"application/vnd.motorola.flexsuite.wem": { "source": "iana" },
		"application/vnd.motorola.iprm": { "source": "iana" },
		"application/vnd.mozilla.xul+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xul"]
		},
		"application/vnd.ms-3mfdocument": { "source": "iana" },
		"application/vnd.ms-artgalry": {
			"source": "iana",
			"extensions": ["cil"]
		},
		"application/vnd.ms-asf": { "source": "iana" },
		"application/vnd.ms-cab-compressed": {
			"source": "iana",
			"extensions": ["cab"]
		},
		"application/vnd.ms-color.iccprofile": { "source": "apache" },
		"application/vnd.ms-excel": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"xls",
				"xlm",
				"xla",
				"xlc",
				"xlt",
				"xlw"
			]
		},
		"application/vnd.ms-excel.addin.macroenabled.12": {
			"source": "iana",
			"extensions": ["xlam"]
		},
		"application/vnd.ms-excel.sheet.binary.macroenabled.12": {
			"source": "iana",
			"extensions": ["xlsb"]
		},
		"application/vnd.ms-excel.sheet.macroenabled.12": {
			"source": "iana",
			"extensions": ["xlsm"]
		},
		"application/vnd.ms-excel.template.macroenabled.12": {
			"source": "iana",
			"extensions": ["xltm"]
		},
		"application/vnd.ms-fontobject": {
			"source": "iana",
			"compressible": true,
			"extensions": ["eot"]
		},
		"application/vnd.ms-htmlhelp": {
			"source": "iana",
			"extensions": ["chm"]
		},
		"application/vnd.ms-ims": {
			"source": "iana",
			"extensions": ["ims"]
		},
		"application/vnd.ms-lrm": {
			"source": "iana",
			"extensions": ["lrm"]
		},
		"application/vnd.ms-office.activex+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ms-officetheme": {
			"source": "iana",
			"extensions": ["thmx"]
		},
		"application/vnd.ms-opentype": {
			"source": "apache",
			"compressible": true
		},
		"application/vnd.ms-outlook": {
			"compressible": false,
			"extensions": ["msg"]
		},
		"application/vnd.ms-package.obfuscated-opentype": { "source": "apache" },
		"application/vnd.ms-pki.seccat": {
			"source": "apache",
			"extensions": ["cat"]
		},
		"application/vnd.ms-pki.stl": {
			"source": "apache",
			"extensions": ["stl"]
		},
		"application/vnd.ms-playready.initiator+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ms-powerpoint": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"ppt",
				"pps",
				"pot"
			]
		},
		"application/vnd.ms-powerpoint.addin.macroenabled.12": {
			"source": "iana",
			"extensions": ["ppam"]
		},
		"application/vnd.ms-powerpoint.presentation.macroenabled.12": {
			"source": "iana",
			"extensions": ["pptm"]
		},
		"application/vnd.ms-powerpoint.slide.macroenabled.12": {
			"source": "iana",
			"extensions": ["sldm"]
		},
		"application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
			"source": "iana",
			"extensions": ["ppsm"]
		},
		"application/vnd.ms-powerpoint.template.macroenabled.12": {
			"source": "iana",
			"extensions": ["potm"]
		},
		"application/vnd.ms-printdevicecapabilities+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ms-printing.printticket+xml": {
			"source": "apache",
			"compressible": true
		},
		"application/vnd.ms-printschematicket+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ms-project": {
			"source": "iana",
			"extensions": ["mpp", "mpt"]
		},
		"application/vnd.ms-tnef": { "source": "iana" },
		"application/vnd.ms-windows.devicepairing": { "source": "iana" },
		"application/vnd.ms-windows.nwprinting.oob": { "source": "iana" },
		"application/vnd.ms-windows.printerpairing": { "source": "iana" },
		"application/vnd.ms-windows.wsd.oob": { "source": "iana" },
		"application/vnd.ms-wmdrm.lic-chlg-req": { "source": "iana" },
		"application/vnd.ms-wmdrm.lic-resp": { "source": "iana" },
		"application/vnd.ms-wmdrm.meter-chlg-req": { "source": "iana" },
		"application/vnd.ms-wmdrm.meter-resp": { "source": "iana" },
		"application/vnd.ms-word.document.macroenabled.12": {
			"source": "iana",
			"extensions": ["docm"]
		},
		"application/vnd.ms-word.template.macroenabled.12": {
			"source": "iana",
			"extensions": ["dotm"]
		},
		"application/vnd.ms-works": {
			"source": "iana",
			"extensions": [
				"wps",
				"wks",
				"wcm",
				"wdb"
			]
		},
		"application/vnd.ms-wpl": {
			"source": "iana",
			"extensions": ["wpl"]
		},
		"application/vnd.ms-xpsdocument": {
			"source": "iana",
			"compressible": false,
			"extensions": ["xps"]
		},
		"application/vnd.msa-disk-image": { "source": "iana" },
		"application/vnd.mseq": {
			"source": "iana",
			"extensions": ["mseq"]
		},
		"application/vnd.msign": { "source": "iana" },
		"application/vnd.multiad.creator": { "source": "iana" },
		"application/vnd.multiad.creator.cif": { "source": "iana" },
		"application/vnd.music-niff": { "source": "iana" },
		"application/vnd.musician": {
			"source": "iana",
			"extensions": ["mus"]
		},
		"application/vnd.muvee.style": {
			"source": "iana",
			"extensions": ["msty"]
		},
		"application/vnd.mynfc": {
			"source": "iana",
			"extensions": ["taglet"]
		},
		"application/vnd.nacamar.ybrid+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ncd.control": { "source": "iana" },
		"application/vnd.ncd.reference": { "source": "iana" },
		"application/vnd.nearst.inv+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.nebumind.line": { "source": "iana" },
		"application/vnd.nervana": { "source": "iana" },
		"application/vnd.netfpx": { "source": "iana" },
		"application/vnd.neurolanguage.nlu": {
			"source": "iana",
			"extensions": ["nlu"]
		},
		"application/vnd.nimn": { "source": "iana" },
		"application/vnd.nintendo.nitro.rom": { "source": "iana" },
		"application/vnd.nintendo.snes.rom": { "source": "iana" },
		"application/vnd.nitf": {
			"source": "iana",
			"extensions": ["ntf", "nitf"]
		},
		"application/vnd.noblenet-directory": {
			"source": "iana",
			"extensions": ["nnd"]
		},
		"application/vnd.noblenet-sealer": {
			"source": "iana",
			"extensions": ["nns"]
		},
		"application/vnd.noblenet-web": {
			"source": "iana",
			"extensions": ["nnw"]
		},
		"application/vnd.nokia.catalogs": { "source": "iana" },
		"application/vnd.nokia.conml+wbxml": { "source": "iana" },
		"application/vnd.nokia.conml+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.nokia.iptv.config+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.nokia.isds-radio-presets": { "source": "iana" },
		"application/vnd.nokia.landmark+wbxml": { "source": "iana" },
		"application/vnd.nokia.landmark+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.nokia.landmarkcollection+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.nokia.n-gage.ac+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["ac"]
		},
		"application/vnd.nokia.n-gage.data": {
			"source": "iana",
			"extensions": ["ngdat"]
		},
		"application/vnd.nokia.n-gage.symbian.install": {
			"source": "iana",
			"extensions": ["n-gage"]
		},
		"application/vnd.nokia.ncd": { "source": "iana" },
		"application/vnd.nokia.pcd+wbxml": { "source": "iana" },
		"application/vnd.nokia.pcd+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.nokia.radio-preset": {
			"source": "iana",
			"extensions": ["rpst"]
		},
		"application/vnd.nokia.radio-presets": {
			"source": "iana",
			"extensions": ["rpss"]
		},
		"application/vnd.novadigm.edm": {
			"source": "iana",
			"extensions": ["edm"]
		},
		"application/vnd.novadigm.edx": {
			"source": "iana",
			"extensions": ["edx"]
		},
		"application/vnd.novadigm.ext": {
			"source": "iana",
			"extensions": ["ext"]
		},
		"application/vnd.ntt-local.content-share": { "source": "iana" },
		"application/vnd.ntt-local.file-transfer": { "source": "iana" },
		"application/vnd.ntt-local.ogw_remote-access": { "source": "iana" },
		"application/vnd.ntt-local.sip-ta_remote": { "source": "iana" },
		"application/vnd.ntt-local.sip-ta_tcp_stream": { "source": "iana" },
		"application/vnd.oasis.opendocument.chart": {
			"source": "iana",
			"extensions": ["odc"]
		},
		"application/vnd.oasis.opendocument.chart-template": {
			"source": "iana",
			"extensions": ["otc"]
		},
		"application/vnd.oasis.opendocument.database": {
			"source": "iana",
			"extensions": ["odb"]
		},
		"application/vnd.oasis.opendocument.formula": {
			"source": "iana",
			"extensions": ["odf"]
		},
		"application/vnd.oasis.opendocument.formula-template": {
			"source": "iana",
			"extensions": ["odft"]
		},
		"application/vnd.oasis.opendocument.graphics": {
			"source": "iana",
			"compressible": false,
			"extensions": ["odg"]
		},
		"application/vnd.oasis.opendocument.graphics-template": {
			"source": "iana",
			"extensions": ["otg"]
		},
		"application/vnd.oasis.opendocument.image": {
			"source": "iana",
			"extensions": ["odi"]
		},
		"application/vnd.oasis.opendocument.image-template": {
			"source": "iana",
			"extensions": ["oti"]
		},
		"application/vnd.oasis.opendocument.presentation": {
			"source": "iana",
			"compressible": false,
			"extensions": ["odp"]
		},
		"application/vnd.oasis.opendocument.presentation-template": {
			"source": "iana",
			"extensions": ["otp"]
		},
		"application/vnd.oasis.opendocument.spreadsheet": {
			"source": "iana",
			"compressible": false,
			"extensions": ["ods"]
		},
		"application/vnd.oasis.opendocument.spreadsheet-template": {
			"source": "iana",
			"extensions": ["ots"]
		},
		"application/vnd.oasis.opendocument.text": {
			"source": "iana",
			"compressible": false,
			"extensions": ["odt"]
		},
		"application/vnd.oasis.opendocument.text-master": {
			"source": "iana",
			"extensions": ["odm"]
		},
		"application/vnd.oasis.opendocument.text-template": {
			"source": "iana",
			"extensions": ["ott"]
		},
		"application/vnd.oasis.opendocument.text-web": {
			"source": "iana",
			"extensions": ["oth"]
		},
		"application/vnd.obn": { "source": "iana" },
		"application/vnd.ocf+cbor": { "source": "iana" },
		"application/vnd.oci.image.manifest.v1+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oftn.l10n+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oipf.contentaccessdownload+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oipf.contentaccessstreaming+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oipf.cspg-hexbinary": { "source": "iana" },
		"application/vnd.oipf.dae.svg+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oipf.dae.xhtml+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oipf.mippvcontrolmessage+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oipf.pae.gem": { "source": "iana" },
		"application/vnd.oipf.spdiscovery+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oipf.spdlist+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oipf.ueprofile+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oipf.userprofile+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.olpc-sugar": {
			"source": "iana",
			"extensions": ["xo"]
		},
		"application/vnd.oma-scws-config": { "source": "iana" },
		"application/vnd.oma-scws-http-request": { "source": "iana" },
		"application/vnd.oma-scws-http-response": { "source": "iana" },
		"application/vnd.oma.bcast.associated-procedure-parameter+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.bcast.drm-trigger+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.bcast.imd+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.bcast.ltkm": { "source": "iana" },
		"application/vnd.oma.bcast.notification+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.bcast.provisioningtrigger": { "source": "iana" },
		"application/vnd.oma.bcast.sgboot": { "source": "iana" },
		"application/vnd.oma.bcast.sgdd+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.bcast.sgdu": { "source": "iana" },
		"application/vnd.oma.bcast.simple-symbol-container": { "source": "iana" },
		"application/vnd.oma.bcast.smartcard-trigger+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.bcast.sprov+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.bcast.stkm": { "source": "iana" },
		"application/vnd.oma.cab-address-book+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.cab-feature-handler+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.cab-pcc+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.cab-subs-invite+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.cab-user-prefs+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.dcd": { "source": "iana" },
		"application/vnd.oma.dcdc": { "source": "iana" },
		"application/vnd.oma.dd2+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["dd2"]
		},
		"application/vnd.oma.drm.risd+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.group-usage-list+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.lwm2m+cbor": { "source": "iana" },
		"application/vnd.oma.lwm2m+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.lwm2m+tlv": { "source": "iana" },
		"application/vnd.oma.pal+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.poc.detailed-progress-report+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.poc.final-report+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.poc.groups+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.poc.invocation-descriptor+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.poc.optimized-progress-report+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.push": { "source": "iana" },
		"application/vnd.oma.scidm.messages+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oma.xcap-directory+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.omads-email+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/vnd.omads-file+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/vnd.omads-folder+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/vnd.omaloc-supl-init": { "source": "iana" },
		"application/vnd.onepager": { "source": "iana" },
		"application/vnd.onepagertamp": { "source": "iana" },
		"application/vnd.onepagertamx": { "source": "iana" },
		"application/vnd.onepagertat": { "source": "iana" },
		"application/vnd.onepagertatp": { "source": "iana" },
		"application/vnd.onepagertatx": { "source": "iana" },
		"application/vnd.openblox.game+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["obgx"]
		},
		"application/vnd.openblox.game-binary": { "source": "iana" },
		"application/vnd.openeye.oeb": { "source": "iana" },
		"application/vnd.openofficeorg.extension": {
			"source": "apache",
			"extensions": ["oxt"]
		},
		"application/vnd.openstreetmap.data+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["osm"]
		},
		"application/vnd.opentimestamps.ots": { "source": "iana" },
		"application/vnd.openxmlformats-officedocument.custom-properties+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.drawing+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.extended-properties+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.presentation": {
			"source": "iana",
			"compressible": false,
			"extensions": ["pptx"]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slide": {
			"source": "iana",
			"extensions": ["sldx"]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
			"source": "iana",
			"extensions": ["ppsx"]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.template": {
			"source": "iana",
			"extensions": ["potx"]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
			"source": "iana",
			"compressible": false,
			"extensions": ["xlsx"]
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
			"source": "iana",
			"extensions": ["xltx"]
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.theme+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.themeoverride+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.vmldrawing": { "source": "iana" },
		"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
			"source": "iana",
			"compressible": false,
			"extensions": ["docx"]
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
			"source": "iana",
			"extensions": ["dotx"]
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-package.core-properties+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.openxmlformats-package.relationships+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oracle.resource+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.orange.indata": { "source": "iana" },
		"application/vnd.osa.netdeploy": { "source": "iana" },
		"application/vnd.osgeo.mapguide.package": {
			"source": "iana",
			"extensions": ["mgp"]
		},
		"application/vnd.osgi.bundle": { "source": "iana" },
		"application/vnd.osgi.dp": {
			"source": "iana",
			"extensions": ["dp"]
		},
		"application/vnd.osgi.subsystem": {
			"source": "iana",
			"extensions": ["esa"]
		},
		"application/vnd.otps.ct-kip+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oxli.countgraph": { "source": "iana" },
		"application/vnd.pagerduty+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.palm": {
			"source": "iana",
			"extensions": [
				"pdb",
				"pqa",
				"oprc"
			]
		},
		"application/vnd.panoply": { "source": "iana" },
		"application/vnd.paos.xml": { "source": "iana" },
		"application/vnd.patentdive": { "source": "iana" },
		"application/vnd.patientecommsdoc": { "source": "iana" },
		"application/vnd.pawaafile": {
			"source": "iana",
			"extensions": ["paw"]
		},
		"application/vnd.pcos": { "source": "iana" },
		"application/vnd.pg.format": {
			"source": "iana",
			"extensions": ["str"]
		},
		"application/vnd.pg.osasli": {
			"source": "iana",
			"extensions": ["ei6"]
		},
		"application/vnd.piaccess.application-licence": { "source": "iana" },
		"application/vnd.picsel": {
			"source": "iana",
			"extensions": ["efif"]
		},
		"application/vnd.pmi.widget": {
			"source": "iana",
			"extensions": ["wg"]
		},
		"application/vnd.poc.group-advertisement+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.pocketlearn": {
			"source": "iana",
			"extensions": ["plf"]
		},
		"application/vnd.powerbuilder6": {
			"source": "iana",
			"extensions": ["pbd"]
		},
		"application/vnd.powerbuilder6-s": { "source": "iana" },
		"application/vnd.powerbuilder7": { "source": "iana" },
		"application/vnd.powerbuilder7-s": { "source": "iana" },
		"application/vnd.powerbuilder75": { "source": "iana" },
		"application/vnd.powerbuilder75-s": { "source": "iana" },
		"application/vnd.preminet": { "source": "iana" },
		"application/vnd.previewsystems.box": {
			"source": "iana",
			"extensions": ["box"]
		},
		"application/vnd.proteus.magazine": {
			"source": "iana",
			"extensions": ["mgz"]
		},
		"application/vnd.psfs": { "source": "iana" },
		"application/vnd.publishare-delta-tree": {
			"source": "iana",
			"extensions": ["qps"]
		},
		"application/vnd.pvi.ptid1": {
			"source": "iana",
			"extensions": ["ptid"]
		},
		"application/vnd.pwg-multiplexed": { "source": "iana" },
		"application/vnd.pwg-xhtml-print+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.qualcomm.brew-app-res": { "source": "iana" },
		"application/vnd.quarantainenet": { "source": "iana" },
		"application/vnd.quark.quarkxpress": {
			"source": "iana",
			"extensions": [
				"qxd",
				"qxt",
				"qwd",
				"qwt",
				"qxl",
				"qxb"
			]
		},
		"application/vnd.quobject-quoxdocument": { "source": "iana" },
		"application/vnd.radisys.moml+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-audit+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-audit-conf+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-audit-conn+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-audit-dialog+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-audit-stream+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-conf+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-dialog+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-dialog-base+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-dialog-fax-detect+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-dialog-group+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-dialog-speech+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.radisys.msml-dialog-transform+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.rainstor.data": { "source": "iana" },
		"application/vnd.rapid": { "source": "iana" },
		"application/vnd.rar": {
			"source": "iana",
			"extensions": ["rar"]
		},
		"application/vnd.realvnc.bed": {
			"source": "iana",
			"extensions": ["bed"]
		},
		"application/vnd.recordare.musicxml": {
			"source": "iana",
			"extensions": ["mxl"]
		},
		"application/vnd.recordare.musicxml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["musicxml"]
		},
		"application/vnd.renlearn.rlprint": { "source": "iana" },
		"application/vnd.resilient.logic": { "source": "iana" },
		"application/vnd.restful+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.rig.cryptonote": {
			"source": "iana",
			"extensions": ["cryptonote"]
		},
		"application/vnd.rim.cod": {
			"source": "apache",
			"extensions": ["cod"]
		},
		"application/vnd.rn-realmedia": {
			"source": "apache",
			"extensions": ["rm"]
		},
		"application/vnd.rn-realmedia-vbr": {
			"source": "apache",
			"extensions": ["rmvb"]
		},
		"application/vnd.route66.link66+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["link66"]
		},
		"application/vnd.rs-274x": { "source": "iana" },
		"application/vnd.ruckus.download": { "source": "iana" },
		"application/vnd.s3sms": { "source": "iana" },
		"application/vnd.sailingtracker.track": {
			"source": "iana",
			"extensions": ["st"]
		},
		"application/vnd.sar": { "source": "iana" },
		"application/vnd.sbm.cid": { "source": "iana" },
		"application/vnd.sbm.mid2": { "source": "iana" },
		"application/vnd.scribus": { "source": "iana" },
		"application/vnd.sealed.3df": { "source": "iana" },
		"application/vnd.sealed.csf": { "source": "iana" },
		"application/vnd.sealed.doc": { "source": "iana" },
		"application/vnd.sealed.eml": { "source": "iana" },
		"application/vnd.sealed.mht": { "source": "iana" },
		"application/vnd.sealed.net": { "source": "iana" },
		"application/vnd.sealed.ppt": { "source": "iana" },
		"application/vnd.sealed.tiff": { "source": "iana" },
		"application/vnd.sealed.xls": { "source": "iana" },
		"application/vnd.sealedmedia.softseal.html": { "source": "iana" },
		"application/vnd.sealedmedia.softseal.pdf": { "source": "iana" },
		"application/vnd.seemail": {
			"source": "iana",
			"extensions": ["see"]
		},
		"application/vnd.seis+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.sema": {
			"source": "iana",
			"extensions": ["sema"]
		},
		"application/vnd.semd": {
			"source": "iana",
			"extensions": ["semd"]
		},
		"application/vnd.semf": {
			"source": "iana",
			"extensions": ["semf"]
		},
		"application/vnd.shade-save-file": { "source": "iana" },
		"application/vnd.shana.informed.formdata": {
			"source": "iana",
			"extensions": ["ifm"]
		},
		"application/vnd.shana.informed.formtemplate": {
			"source": "iana",
			"extensions": ["itp"]
		},
		"application/vnd.shana.informed.interchange": {
			"source": "iana",
			"extensions": ["iif"]
		},
		"application/vnd.shana.informed.package": {
			"source": "iana",
			"extensions": ["ipk"]
		},
		"application/vnd.shootproof+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.shopkick+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.shp": { "source": "iana" },
		"application/vnd.shx": { "source": "iana" },
		"application/vnd.sigrok.session": { "source": "iana" },
		"application/vnd.simtech-mindmapper": {
			"source": "iana",
			"extensions": ["twd", "twds"]
		},
		"application/vnd.siren+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.smaf": {
			"source": "iana",
			"extensions": ["mmf"]
		},
		"application/vnd.smart.notebook": { "source": "iana" },
		"application/vnd.smart.teacher": {
			"source": "iana",
			"extensions": ["teacher"]
		},
		"application/vnd.snesdev-page-table": { "source": "iana" },
		"application/vnd.software602.filler.form+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["fo"]
		},
		"application/vnd.software602.filler.form-xml-zip": { "source": "iana" },
		"application/vnd.solent.sdkm+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["sdkm", "sdkd"]
		},
		"application/vnd.spotfire.dxp": {
			"source": "iana",
			"extensions": ["dxp"]
		},
		"application/vnd.spotfire.sfs": {
			"source": "iana",
			"extensions": ["sfs"]
		},
		"application/vnd.sqlite3": { "source": "iana" },
		"application/vnd.sss-cod": { "source": "iana" },
		"application/vnd.sss-dtf": { "source": "iana" },
		"application/vnd.sss-ntf": { "source": "iana" },
		"application/vnd.stardivision.calc": {
			"source": "apache",
			"extensions": ["sdc"]
		},
		"application/vnd.stardivision.draw": {
			"source": "apache",
			"extensions": ["sda"]
		},
		"application/vnd.stardivision.impress": {
			"source": "apache",
			"extensions": ["sdd"]
		},
		"application/vnd.stardivision.math": {
			"source": "apache",
			"extensions": ["smf"]
		},
		"application/vnd.stardivision.writer": {
			"source": "apache",
			"extensions": ["sdw", "vor"]
		},
		"application/vnd.stardivision.writer-global": {
			"source": "apache",
			"extensions": ["sgl"]
		},
		"application/vnd.stepmania.package": {
			"source": "iana",
			"extensions": ["smzip"]
		},
		"application/vnd.stepmania.stepchart": {
			"source": "iana",
			"extensions": ["sm"]
		},
		"application/vnd.street-stream": { "source": "iana" },
		"application/vnd.sun.wadl+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["wadl"]
		},
		"application/vnd.sun.xml.calc": {
			"source": "apache",
			"extensions": ["sxc"]
		},
		"application/vnd.sun.xml.calc.template": {
			"source": "apache",
			"extensions": ["stc"]
		},
		"application/vnd.sun.xml.draw": {
			"source": "apache",
			"extensions": ["sxd"]
		},
		"application/vnd.sun.xml.draw.template": {
			"source": "apache",
			"extensions": ["std"]
		},
		"application/vnd.sun.xml.impress": {
			"source": "apache",
			"extensions": ["sxi"]
		},
		"application/vnd.sun.xml.impress.template": {
			"source": "apache",
			"extensions": ["sti"]
		},
		"application/vnd.sun.xml.math": {
			"source": "apache",
			"extensions": ["sxm"]
		},
		"application/vnd.sun.xml.writer": {
			"source": "apache",
			"extensions": ["sxw"]
		},
		"application/vnd.sun.xml.writer.global": {
			"source": "apache",
			"extensions": ["sxg"]
		},
		"application/vnd.sun.xml.writer.template": {
			"source": "apache",
			"extensions": ["stw"]
		},
		"application/vnd.sus-calendar": {
			"source": "iana",
			"extensions": ["sus", "susp"]
		},
		"application/vnd.svd": {
			"source": "iana",
			"extensions": ["svd"]
		},
		"application/vnd.swiftview-ics": { "source": "iana" },
		"application/vnd.sycle+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.syft+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.symbian.install": {
			"source": "apache",
			"extensions": ["sis", "sisx"]
		},
		"application/vnd.syncml+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true,
			"extensions": ["xsm"]
		},
		"application/vnd.syncml.dm+wbxml": {
			"source": "iana",
			"charset": "UTF-8",
			"extensions": ["bdm"]
		},
		"application/vnd.syncml.dm+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true,
			"extensions": ["xdm"]
		},
		"application/vnd.syncml.dm.notification": { "source": "iana" },
		"application/vnd.syncml.dmddf+wbxml": { "source": "iana" },
		"application/vnd.syncml.dmddf+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true,
			"extensions": ["ddf"]
		},
		"application/vnd.syncml.dmtnds+wbxml": { "source": "iana" },
		"application/vnd.syncml.dmtnds+xml": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true
		},
		"application/vnd.syncml.ds.notification": { "source": "iana" },
		"application/vnd.tableschema+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.tao.intent-module-archive": {
			"source": "iana",
			"extensions": ["tao"]
		},
		"application/vnd.tcpdump.pcap": {
			"source": "iana",
			"extensions": [
				"pcap",
				"cap",
				"dmp"
			]
		},
		"application/vnd.think-cell.ppttc+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.tmd.mediaflex.api+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.tml": { "source": "iana" },
		"application/vnd.tmobile-livetv": {
			"source": "iana",
			"extensions": ["tmo"]
		},
		"application/vnd.tri.onesource": { "source": "iana" },
		"application/vnd.trid.tpt": {
			"source": "iana",
			"extensions": ["tpt"]
		},
		"application/vnd.triscape.mxs": {
			"source": "iana",
			"extensions": ["mxs"]
		},
		"application/vnd.trueapp": {
			"source": "iana",
			"extensions": ["tra"]
		},
		"application/vnd.truedoc": { "source": "iana" },
		"application/vnd.ubisoft.webplayer": { "source": "iana" },
		"application/vnd.ufdl": {
			"source": "iana",
			"extensions": ["ufd", "ufdl"]
		},
		"application/vnd.uiq.theme": {
			"source": "iana",
			"extensions": ["utz"]
		},
		"application/vnd.umajin": {
			"source": "iana",
			"extensions": ["umj"]
		},
		"application/vnd.unity": {
			"source": "iana",
			"extensions": ["unityweb"]
		},
		"application/vnd.uoml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["uoml"]
		},
		"application/vnd.uplanet.alert": { "source": "iana" },
		"application/vnd.uplanet.alert-wbxml": { "source": "iana" },
		"application/vnd.uplanet.bearer-choice": { "source": "iana" },
		"application/vnd.uplanet.bearer-choice-wbxml": { "source": "iana" },
		"application/vnd.uplanet.cacheop": { "source": "iana" },
		"application/vnd.uplanet.cacheop-wbxml": { "source": "iana" },
		"application/vnd.uplanet.channel": { "source": "iana" },
		"application/vnd.uplanet.channel-wbxml": { "source": "iana" },
		"application/vnd.uplanet.list": { "source": "iana" },
		"application/vnd.uplanet.list-wbxml": { "source": "iana" },
		"application/vnd.uplanet.listcmd": { "source": "iana" },
		"application/vnd.uplanet.listcmd-wbxml": { "source": "iana" },
		"application/vnd.uplanet.signal": { "source": "iana" },
		"application/vnd.uri-map": { "source": "iana" },
		"application/vnd.valve.source.material": { "source": "iana" },
		"application/vnd.vcx": {
			"source": "iana",
			"extensions": ["vcx"]
		},
		"application/vnd.vd-study": { "source": "iana" },
		"application/vnd.vectorworks": { "source": "iana" },
		"application/vnd.vel+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.verimatrix.vcas": { "source": "iana" },
		"application/vnd.veritone.aion+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.veryant.thin": { "source": "iana" },
		"application/vnd.ves.encrypted": { "source": "iana" },
		"application/vnd.vidsoft.vidconference": { "source": "iana" },
		"application/vnd.visio": {
			"source": "iana",
			"extensions": [
				"vsd",
				"vst",
				"vss",
				"vsw"
			]
		},
		"application/vnd.visionary": {
			"source": "iana",
			"extensions": ["vis"]
		},
		"application/vnd.vividence.scriptfile": { "source": "iana" },
		"application/vnd.vsf": {
			"source": "iana",
			"extensions": ["vsf"]
		},
		"application/vnd.wap.sic": { "source": "iana" },
		"application/vnd.wap.slc": { "source": "iana" },
		"application/vnd.wap.wbxml": {
			"source": "iana",
			"charset": "UTF-8",
			"extensions": ["wbxml"]
		},
		"application/vnd.wap.wmlc": {
			"source": "iana",
			"extensions": ["wmlc"]
		},
		"application/vnd.wap.wmlscriptc": {
			"source": "iana",
			"extensions": ["wmlsc"]
		},
		"application/vnd.webturbo": {
			"source": "iana",
			"extensions": ["wtb"]
		},
		"application/vnd.wfa.dpp": { "source": "iana" },
		"application/vnd.wfa.p2p": { "source": "iana" },
		"application/vnd.wfa.wsc": { "source": "iana" },
		"application/vnd.windows.devicepairing": { "source": "iana" },
		"application/vnd.wmc": { "source": "iana" },
		"application/vnd.wmf.bootstrap": { "source": "iana" },
		"application/vnd.wolfram.mathematica": { "source": "iana" },
		"application/vnd.wolfram.mathematica.package": { "source": "iana" },
		"application/vnd.wolfram.player": {
			"source": "iana",
			"extensions": ["nbp"]
		},
		"application/vnd.wordperfect": {
			"source": "iana",
			"extensions": ["wpd"]
		},
		"application/vnd.wqd": {
			"source": "iana",
			"extensions": ["wqd"]
		},
		"application/vnd.wrq-hp3000-labelled": { "source": "iana" },
		"application/vnd.wt.stf": {
			"source": "iana",
			"extensions": ["stf"]
		},
		"application/vnd.wv.csp+wbxml": { "source": "iana" },
		"application/vnd.wv.csp+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.wv.ssp+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.xacml+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.xara": {
			"source": "iana",
			"extensions": ["xar"]
		},
		"application/vnd.xfdl": {
			"source": "iana",
			"extensions": ["xfdl"]
		},
		"application/vnd.xfdl.webform": { "source": "iana" },
		"application/vnd.xmi+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.xmpie.cpkg": { "source": "iana" },
		"application/vnd.xmpie.dpkg": { "source": "iana" },
		"application/vnd.xmpie.plan": { "source": "iana" },
		"application/vnd.xmpie.ppkg": { "source": "iana" },
		"application/vnd.xmpie.xlim": { "source": "iana" },
		"application/vnd.yamaha.hv-dic": {
			"source": "iana",
			"extensions": ["hvd"]
		},
		"application/vnd.yamaha.hv-script": {
			"source": "iana",
			"extensions": ["hvs"]
		},
		"application/vnd.yamaha.hv-voice": {
			"source": "iana",
			"extensions": ["hvp"]
		},
		"application/vnd.yamaha.openscoreformat": {
			"source": "iana",
			"extensions": ["osf"]
		},
		"application/vnd.yamaha.openscoreformat.osfpvg+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["osfpvg"]
		},
		"application/vnd.yamaha.remote-setup": { "source": "iana" },
		"application/vnd.yamaha.smaf-audio": {
			"source": "iana",
			"extensions": ["saf"]
		},
		"application/vnd.yamaha.smaf-phrase": {
			"source": "iana",
			"extensions": ["spf"]
		},
		"application/vnd.yamaha.through-ngn": { "source": "iana" },
		"application/vnd.yamaha.tunnel-udpencap": { "source": "iana" },
		"application/vnd.yaoweme": { "source": "iana" },
		"application/vnd.yellowriver-custom-menu": {
			"source": "iana",
			"extensions": ["cmp"]
		},
		"application/vnd.youtube.yt": { "source": "iana" },
		"application/vnd.zul": {
			"source": "iana",
			"extensions": ["zir", "zirz"]
		},
		"application/vnd.zzazz.deck+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["zaz"]
		},
		"application/voicexml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["vxml"]
		},
		"application/voucher-cms+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vq-rtcpxr": { "source": "iana" },
		"application/wasm": {
			"source": "iana",
			"compressible": true,
			"extensions": ["wasm"]
		},
		"application/watcherinfo+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["wif"]
		},
		"application/webpush-options+json": {
			"source": "iana",
			"compressible": true
		},
		"application/whoispp-query": { "source": "iana" },
		"application/whoispp-response": { "source": "iana" },
		"application/widget": {
			"source": "iana",
			"extensions": ["wgt"]
		},
		"application/winhlp": {
			"source": "apache",
			"extensions": ["hlp"]
		},
		"application/wita": { "source": "iana" },
		"application/wordperfect5.1": { "source": "iana" },
		"application/wsdl+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["wsdl"]
		},
		"application/wspolicy+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["wspolicy"]
		},
		"application/x-7z-compressed": {
			"source": "apache",
			"compressible": false,
			"extensions": ["7z"]
		},
		"application/x-abiword": {
			"source": "apache",
			"extensions": ["abw"]
		},
		"application/x-ace-compressed": {
			"source": "apache",
			"extensions": ["ace"]
		},
		"application/x-amf": { "source": "apache" },
		"application/x-apple-diskimage": {
			"source": "apache",
			"extensions": ["dmg"]
		},
		"application/x-arj": {
			"compressible": false,
			"extensions": ["arj"]
		},
		"application/x-authorware-bin": {
			"source": "apache",
			"extensions": [
				"aab",
				"x32",
				"u32",
				"vox"
			]
		},
		"application/x-authorware-map": {
			"source": "apache",
			"extensions": ["aam"]
		},
		"application/x-authorware-seg": {
			"source": "apache",
			"extensions": ["aas"]
		},
		"application/x-bcpio": {
			"source": "apache",
			"extensions": ["bcpio"]
		},
		"application/x-bdoc": {
			"compressible": false,
			"extensions": ["bdoc"]
		},
		"application/x-bittorrent": {
			"source": "apache",
			"extensions": ["torrent"]
		},
		"application/x-blorb": {
			"source": "apache",
			"extensions": ["blb", "blorb"]
		},
		"application/x-bzip": {
			"source": "apache",
			"compressible": false,
			"extensions": ["bz"]
		},
		"application/x-bzip2": {
			"source": "apache",
			"compressible": false,
			"extensions": ["bz2", "boz"]
		},
		"application/x-cbr": {
			"source": "apache",
			"extensions": [
				"cbr",
				"cba",
				"cbt",
				"cbz",
				"cb7"
			]
		},
		"application/x-cdlink": {
			"source": "apache",
			"extensions": ["vcd"]
		},
		"application/x-cfs-compressed": {
			"source": "apache",
			"extensions": ["cfs"]
		},
		"application/x-chat": {
			"source": "apache",
			"extensions": ["chat"]
		},
		"application/x-chess-pgn": {
			"source": "apache",
			"extensions": ["pgn"]
		},
		"application/x-chrome-extension": { "extensions": ["crx"] },
		"application/x-cocoa": {
			"source": "nginx",
			"extensions": ["cco"]
		},
		"application/x-compress": { "source": "apache" },
		"application/x-conference": {
			"source": "apache",
			"extensions": ["nsc"]
		},
		"application/x-cpio": {
			"source": "apache",
			"extensions": ["cpio"]
		},
		"application/x-csh": {
			"source": "apache",
			"extensions": ["csh"]
		},
		"application/x-deb": { "compressible": false },
		"application/x-debian-package": {
			"source": "apache",
			"extensions": ["deb", "udeb"]
		},
		"application/x-dgc-compressed": {
			"source": "apache",
			"extensions": ["dgc"]
		},
		"application/x-director": {
			"source": "apache",
			"extensions": [
				"dir",
				"dcr",
				"dxr",
				"cst",
				"cct",
				"cxt",
				"w3d",
				"fgd",
				"swa"
			]
		},
		"application/x-doom": {
			"source": "apache",
			"extensions": ["wad"]
		},
		"application/x-dtbncx+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["ncx"]
		},
		"application/x-dtbook+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["dtb"]
		},
		"application/x-dtbresource+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["res"]
		},
		"application/x-dvi": {
			"source": "apache",
			"compressible": false,
			"extensions": ["dvi"]
		},
		"application/x-envoy": {
			"source": "apache",
			"extensions": ["evy"]
		},
		"application/x-eva": {
			"source": "apache",
			"extensions": ["eva"]
		},
		"application/x-font-bdf": {
			"source": "apache",
			"extensions": ["bdf"]
		},
		"application/x-font-dos": { "source": "apache" },
		"application/x-font-framemaker": { "source": "apache" },
		"application/x-font-ghostscript": {
			"source": "apache",
			"extensions": ["gsf"]
		},
		"application/x-font-libgrx": { "source": "apache" },
		"application/x-font-linux-psf": {
			"source": "apache",
			"extensions": ["psf"]
		},
		"application/x-font-pcf": {
			"source": "apache",
			"extensions": ["pcf"]
		},
		"application/x-font-snf": {
			"source": "apache",
			"extensions": ["snf"]
		},
		"application/x-font-speedo": { "source": "apache" },
		"application/x-font-sunos-news": { "source": "apache" },
		"application/x-font-type1": {
			"source": "apache",
			"extensions": [
				"pfa",
				"pfb",
				"pfm",
				"afm"
			]
		},
		"application/x-font-vfont": { "source": "apache" },
		"application/x-freearc": {
			"source": "apache",
			"extensions": ["arc"]
		},
		"application/x-futuresplash": {
			"source": "apache",
			"extensions": ["spl"]
		},
		"application/x-gca-compressed": {
			"source": "apache",
			"extensions": ["gca"]
		},
		"application/x-glulx": {
			"source": "apache",
			"extensions": ["ulx"]
		},
		"application/x-gnumeric": {
			"source": "apache",
			"extensions": ["gnumeric"]
		},
		"application/x-gramps-xml": {
			"source": "apache",
			"extensions": ["gramps"]
		},
		"application/x-gtar": {
			"source": "apache",
			"extensions": ["gtar"]
		},
		"application/x-gzip": { "source": "apache" },
		"application/x-hdf": {
			"source": "apache",
			"extensions": ["hdf"]
		},
		"application/x-httpd-php": {
			"compressible": true,
			"extensions": ["php"]
		},
		"application/x-install-instructions": {
			"source": "apache",
			"extensions": ["install"]
		},
		"application/x-iso9660-image": {
			"source": "apache",
			"extensions": ["iso"]
		},
		"application/x-iwork-keynote-sffkey": { "extensions": ["key"] },
		"application/x-iwork-numbers-sffnumbers": { "extensions": ["numbers"] },
		"application/x-iwork-pages-sffpages": { "extensions": ["pages"] },
		"application/x-java-archive-diff": {
			"source": "nginx",
			"extensions": ["jardiff"]
		},
		"application/x-java-jnlp-file": {
			"source": "apache",
			"compressible": false,
			"extensions": ["jnlp"]
		},
		"application/x-javascript": { "compressible": true },
		"application/x-keepass2": { "extensions": ["kdbx"] },
		"application/x-latex": {
			"source": "apache",
			"compressible": false,
			"extensions": ["latex"]
		},
		"application/x-lua-bytecode": { "extensions": ["luac"] },
		"application/x-lzh-compressed": {
			"source": "apache",
			"extensions": ["lzh", "lha"]
		},
		"application/x-makeself": {
			"source": "nginx",
			"extensions": ["run"]
		},
		"application/x-mie": {
			"source": "apache",
			"extensions": ["mie"]
		},
		"application/x-mobipocket-ebook": {
			"source": "apache",
			"extensions": ["prc", "mobi"]
		},
		"application/x-mpegurl": { "compressible": false },
		"application/x-ms-application": {
			"source": "apache",
			"extensions": ["application"]
		},
		"application/x-ms-shortcut": {
			"source": "apache",
			"extensions": ["lnk"]
		},
		"application/x-ms-wmd": {
			"source": "apache",
			"extensions": ["wmd"]
		},
		"application/x-ms-wmz": {
			"source": "apache",
			"extensions": ["wmz"]
		},
		"application/x-ms-xbap": {
			"source": "apache",
			"extensions": ["xbap"]
		},
		"application/x-msaccess": {
			"source": "apache",
			"extensions": ["mdb"]
		},
		"application/x-msbinder": {
			"source": "apache",
			"extensions": ["obd"]
		},
		"application/x-mscardfile": {
			"source": "apache",
			"extensions": ["crd"]
		},
		"application/x-msclip": {
			"source": "apache",
			"extensions": ["clp"]
		},
		"application/x-msdos-program": { "extensions": ["exe"] },
		"application/x-msdownload": {
			"source": "apache",
			"extensions": [
				"exe",
				"dll",
				"com",
				"bat",
				"msi"
			]
		},
		"application/x-msmediaview": {
			"source": "apache",
			"extensions": [
				"mvb",
				"m13",
				"m14"
			]
		},
		"application/x-msmetafile": {
			"source": "apache",
			"extensions": [
				"wmf",
				"wmz",
				"emf",
				"emz"
			]
		},
		"application/x-msmoney": {
			"source": "apache",
			"extensions": ["mny"]
		},
		"application/x-mspublisher": {
			"source": "apache",
			"extensions": ["pub"]
		},
		"application/x-msschedule": {
			"source": "apache",
			"extensions": ["scd"]
		},
		"application/x-msterminal": {
			"source": "apache",
			"extensions": ["trm"]
		},
		"application/x-mswrite": {
			"source": "apache",
			"extensions": ["wri"]
		},
		"application/x-netcdf": {
			"source": "apache",
			"extensions": ["nc", "cdf"]
		},
		"application/x-ns-proxy-autoconfig": {
			"compressible": true,
			"extensions": ["pac"]
		},
		"application/x-nzb": {
			"source": "apache",
			"extensions": ["nzb"]
		},
		"application/x-perl": {
			"source": "nginx",
			"extensions": ["pl", "pm"]
		},
		"application/x-pilot": {
			"source": "nginx",
			"extensions": ["prc", "pdb"]
		},
		"application/x-pkcs12": {
			"source": "apache",
			"compressible": false,
			"extensions": ["p12", "pfx"]
		},
		"application/x-pkcs7-certificates": {
			"source": "apache",
			"extensions": ["p7b", "spc"]
		},
		"application/x-pkcs7-certreqresp": {
			"source": "apache",
			"extensions": ["p7r"]
		},
		"application/x-pki-message": { "source": "iana" },
		"application/x-rar-compressed": {
			"source": "apache",
			"compressible": false,
			"extensions": ["rar"]
		},
		"application/x-redhat-package-manager": {
			"source": "nginx",
			"extensions": ["rpm"]
		},
		"application/x-research-info-systems": {
			"source": "apache",
			"extensions": ["ris"]
		},
		"application/x-sea": {
			"source": "nginx",
			"extensions": ["sea"]
		},
		"application/x-sh": {
			"source": "apache",
			"compressible": true,
			"extensions": ["sh"]
		},
		"application/x-shar": {
			"source": "apache",
			"extensions": ["shar"]
		},
		"application/x-shockwave-flash": {
			"source": "apache",
			"compressible": false,
			"extensions": ["swf"]
		},
		"application/x-silverlight-app": {
			"source": "apache",
			"extensions": ["xap"]
		},
		"application/x-sql": {
			"source": "apache",
			"extensions": ["sql"]
		},
		"application/x-stuffit": {
			"source": "apache",
			"compressible": false,
			"extensions": ["sit"]
		},
		"application/x-stuffitx": {
			"source": "apache",
			"extensions": ["sitx"]
		},
		"application/x-subrip": {
			"source": "apache",
			"extensions": ["srt"]
		},
		"application/x-sv4cpio": {
			"source": "apache",
			"extensions": ["sv4cpio"]
		},
		"application/x-sv4crc": {
			"source": "apache",
			"extensions": ["sv4crc"]
		},
		"application/x-t3vm-image": {
			"source": "apache",
			"extensions": ["t3"]
		},
		"application/x-tads": {
			"source": "apache",
			"extensions": ["gam"]
		},
		"application/x-tar": {
			"source": "apache",
			"compressible": true,
			"extensions": ["tar"]
		},
		"application/x-tcl": {
			"source": "apache",
			"extensions": ["tcl", "tk"]
		},
		"application/x-tex": {
			"source": "apache",
			"extensions": ["tex"]
		},
		"application/x-tex-tfm": {
			"source": "apache",
			"extensions": ["tfm"]
		},
		"application/x-texinfo": {
			"source": "apache",
			"extensions": ["texinfo", "texi"]
		},
		"application/x-tgif": {
			"source": "apache",
			"extensions": ["obj"]
		},
		"application/x-ustar": {
			"source": "apache",
			"extensions": ["ustar"]
		},
		"application/x-virtualbox-hdd": {
			"compressible": true,
			"extensions": ["hdd"]
		},
		"application/x-virtualbox-ova": {
			"compressible": true,
			"extensions": ["ova"]
		},
		"application/x-virtualbox-ovf": {
			"compressible": true,
			"extensions": ["ovf"]
		},
		"application/x-virtualbox-vbox": {
			"compressible": true,
			"extensions": ["vbox"]
		},
		"application/x-virtualbox-vbox-extpack": {
			"compressible": false,
			"extensions": ["vbox-extpack"]
		},
		"application/x-virtualbox-vdi": {
			"compressible": true,
			"extensions": ["vdi"]
		},
		"application/x-virtualbox-vhd": {
			"compressible": true,
			"extensions": ["vhd"]
		},
		"application/x-virtualbox-vmdk": {
			"compressible": true,
			"extensions": ["vmdk"]
		},
		"application/x-wais-source": {
			"source": "apache",
			"extensions": ["src"]
		},
		"application/x-web-app-manifest+json": {
			"compressible": true,
			"extensions": ["webapp"]
		},
		"application/x-www-form-urlencoded": {
			"source": "iana",
			"compressible": true
		},
		"application/x-x509-ca-cert": {
			"source": "iana",
			"extensions": [
				"der",
				"crt",
				"pem"
			]
		},
		"application/x-x509-ca-ra-cert": { "source": "iana" },
		"application/x-x509-next-ca-cert": { "source": "iana" },
		"application/x-xfig": {
			"source": "apache",
			"extensions": ["fig"]
		},
		"application/x-xliff+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["xlf"]
		},
		"application/x-xpinstall": {
			"source": "apache",
			"compressible": false,
			"extensions": ["xpi"]
		},
		"application/x-xz": {
			"source": "apache",
			"extensions": ["xz"]
		},
		"application/x-zmachine": {
			"source": "apache",
			"extensions": [
				"z1",
				"z2",
				"z3",
				"z4",
				"z5",
				"z6",
				"z7",
				"z8"
			]
		},
		"application/x400-bp": { "source": "iana" },
		"application/xacml+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/xaml+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["xaml"]
		},
		"application/xcap-att+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xav"]
		},
		"application/xcap-caps+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xca"]
		},
		"application/xcap-diff+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xdf"]
		},
		"application/xcap-el+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xel"]
		},
		"application/xcap-error+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/xcap-ns+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xns"]
		},
		"application/xcon-conference-info+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/xcon-conference-info-diff+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/xenc+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xenc"]
		},
		"application/xhtml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xhtml", "xht"]
		},
		"application/xhtml-voice+xml": {
			"source": "apache",
			"compressible": true
		},
		"application/xliff+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xlf"]
		},
		"application/xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"xml",
				"xsl",
				"xsd",
				"rng"
			]
		},
		"application/xml-dtd": {
			"source": "iana",
			"compressible": true,
			"extensions": ["dtd"]
		},
		"application/xml-external-parsed-entity": { "source": "iana" },
		"application/xml-patch+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/xmpp+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/xop+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xop"]
		},
		"application/xproc+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["xpl"]
		},
		"application/xslt+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xsl", "xslt"]
		},
		"application/xspf+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": ["xspf"]
		},
		"application/xv+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"mxml",
				"xhvml",
				"xvml",
				"xvm"
			]
		},
		"application/yang": {
			"source": "iana",
			"extensions": ["yang"]
		},
		"application/yang-data+json": {
			"source": "iana",
			"compressible": true
		},
		"application/yang-data+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/yang-patch+json": {
			"source": "iana",
			"compressible": true
		},
		"application/yang-patch+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/yin+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["yin"]
		},
		"application/zip": {
			"source": "iana",
			"compressible": false,
			"extensions": ["zip"]
		},
		"application/zlib": { "source": "iana" },
		"application/zstd": { "source": "iana" },
		"audio/1d-interleaved-parityfec": { "source": "iana" },
		"audio/32kadpcm": { "source": "iana" },
		"audio/3gpp": {
			"source": "iana",
			"compressible": false,
			"extensions": ["3gpp"]
		},
		"audio/3gpp2": { "source": "iana" },
		"audio/aac": { "source": "iana" },
		"audio/ac3": { "source": "iana" },
		"audio/adpcm": {
			"source": "apache",
			"extensions": ["adp"]
		},
		"audio/amr": {
			"source": "iana",
			"extensions": ["amr"]
		},
		"audio/amr-wb": { "source": "iana" },
		"audio/amr-wb+": { "source": "iana" },
		"audio/aptx": { "source": "iana" },
		"audio/asc": { "source": "iana" },
		"audio/atrac-advanced-lossless": { "source": "iana" },
		"audio/atrac-x": { "source": "iana" },
		"audio/atrac3": { "source": "iana" },
		"audio/basic": {
			"source": "iana",
			"compressible": false,
			"extensions": ["au", "snd"]
		},
		"audio/bv16": { "source": "iana" },
		"audio/bv32": { "source": "iana" },
		"audio/clearmode": { "source": "iana" },
		"audio/cn": { "source": "iana" },
		"audio/dat12": { "source": "iana" },
		"audio/dls": { "source": "iana" },
		"audio/dsr-es201108": { "source": "iana" },
		"audio/dsr-es202050": { "source": "iana" },
		"audio/dsr-es202211": { "source": "iana" },
		"audio/dsr-es202212": { "source": "iana" },
		"audio/dv": { "source": "iana" },
		"audio/dvi4": { "source": "iana" },
		"audio/eac3": { "source": "iana" },
		"audio/encaprtp": { "source": "iana" },
		"audio/evrc": { "source": "iana" },
		"audio/evrc-qcp": { "source": "iana" },
		"audio/evrc0": { "source": "iana" },
		"audio/evrc1": { "source": "iana" },
		"audio/evrcb": { "source": "iana" },
		"audio/evrcb0": { "source": "iana" },
		"audio/evrcb1": { "source": "iana" },
		"audio/evrcnw": { "source": "iana" },
		"audio/evrcnw0": { "source": "iana" },
		"audio/evrcnw1": { "source": "iana" },
		"audio/evrcwb": { "source": "iana" },
		"audio/evrcwb0": { "source": "iana" },
		"audio/evrcwb1": { "source": "iana" },
		"audio/evs": { "source": "iana" },
		"audio/flexfec": { "source": "iana" },
		"audio/fwdred": { "source": "iana" },
		"audio/g711-0": { "source": "iana" },
		"audio/g719": { "source": "iana" },
		"audio/g722": { "source": "iana" },
		"audio/g7221": { "source": "iana" },
		"audio/g723": { "source": "iana" },
		"audio/g726-16": { "source": "iana" },
		"audio/g726-24": { "source": "iana" },
		"audio/g726-32": { "source": "iana" },
		"audio/g726-40": { "source": "iana" },
		"audio/g728": { "source": "iana" },
		"audio/g729": { "source": "iana" },
		"audio/g7291": { "source": "iana" },
		"audio/g729d": { "source": "iana" },
		"audio/g729e": { "source": "iana" },
		"audio/gsm": { "source": "iana" },
		"audio/gsm-efr": { "source": "iana" },
		"audio/gsm-hr-08": { "source": "iana" },
		"audio/ilbc": { "source": "iana" },
		"audio/ip-mr_v2.5": { "source": "iana" },
		"audio/isac": { "source": "apache" },
		"audio/l16": { "source": "iana" },
		"audio/l20": { "source": "iana" },
		"audio/l24": {
			"source": "iana",
			"compressible": false
		},
		"audio/l8": { "source": "iana" },
		"audio/lpc": { "source": "iana" },
		"audio/melp": { "source": "iana" },
		"audio/melp1200": { "source": "iana" },
		"audio/melp2400": { "source": "iana" },
		"audio/melp600": { "source": "iana" },
		"audio/mhas": { "source": "iana" },
		"audio/midi": {
			"source": "apache",
			"extensions": [
				"mid",
				"midi",
				"kar",
				"rmi"
			]
		},
		"audio/mobile-xmf": {
			"source": "iana",
			"extensions": ["mxmf"]
		},
		"audio/mp3": {
			"compressible": false,
			"extensions": ["mp3"]
		},
		"audio/mp4": {
			"source": "iana",
			"compressible": false,
			"extensions": ["m4a", "mp4a"]
		},
		"audio/mp4a-latm": { "source": "iana" },
		"audio/mpa": { "source": "iana" },
		"audio/mpa-robust": { "source": "iana" },
		"audio/mpeg": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"mpga",
				"mp2",
				"mp2a",
				"mp3",
				"m2a",
				"m3a"
			]
		},
		"audio/mpeg4-generic": { "source": "iana" },
		"audio/musepack": { "source": "apache" },
		"audio/ogg": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"oga",
				"ogg",
				"spx",
				"opus"
			]
		},
		"audio/opus": { "source": "iana" },
		"audio/parityfec": { "source": "iana" },
		"audio/pcma": { "source": "iana" },
		"audio/pcma-wb": { "source": "iana" },
		"audio/pcmu": { "source": "iana" },
		"audio/pcmu-wb": { "source": "iana" },
		"audio/prs.sid": { "source": "iana" },
		"audio/qcelp": { "source": "iana" },
		"audio/raptorfec": { "source": "iana" },
		"audio/red": { "source": "iana" },
		"audio/rtp-enc-aescm128": { "source": "iana" },
		"audio/rtp-midi": { "source": "iana" },
		"audio/rtploopback": { "source": "iana" },
		"audio/rtx": { "source": "iana" },
		"audio/s3m": {
			"source": "apache",
			"extensions": ["s3m"]
		},
		"audio/scip": { "source": "iana" },
		"audio/silk": {
			"source": "apache",
			"extensions": ["sil"]
		},
		"audio/smv": { "source": "iana" },
		"audio/smv-qcp": { "source": "iana" },
		"audio/smv0": { "source": "iana" },
		"audio/sofa": { "source": "iana" },
		"audio/sp-midi": { "source": "iana" },
		"audio/speex": { "source": "iana" },
		"audio/t140c": { "source": "iana" },
		"audio/t38": { "source": "iana" },
		"audio/telephone-event": { "source": "iana" },
		"audio/tetra_acelp": { "source": "iana" },
		"audio/tetra_acelp_bb": { "source": "iana" },
		"audio/tone": { "source": "iana" },
		"audio/tsvcis": { "source": "iana" },
		"audio/uemclip": { "source": "iana" },
		"audio/ulpfec": { "source": "iana" },
		"audio/usac": { "source": "iana" },
		"audio/vdvi": { "source": "iana" },
		"audio/vmr-wb": { "source": "iana" },
		"audio/vnd.3gpp.iufp": { "source": "iana" },
		"audio/vnd.4sb": { "source": "iana" },
		"audio/vnd.audiokoz": { "source": "iana" },
		"audio/vnd.celp": { "source": "iana" },
		"audio/vnd.cisco.nse": { "source": "iana" },
		"audio/vnd.cmles.radio-events": { "source": "iana" },
		"audio/vnd.cns.anp1": { "source": "iana" },
		"audio/vnd.cns.inf1": { "source": "iana" },
		"audio/vnd.dece.audio": {
			"source": "iana",
			"extensions": ["uva", "uvva"]
		},
		"audio/vnd.digital-winds": {
			"source": "iana",
			"extensions": ["eol"]
		},
		"audio/vnd.dlna.adts": { "source": "iana" },
		"audio/vnd.dolby.heaac.1": { "source": "iana" },
		"audio/vnd.dolby.heaac.2": { "source": "iana" },
		"audio/vnd.dolby.mlp": { "source": "iana" },
		"audio/vnd.dolby.mps": { "source": "iana" },
		"audio/vnd.dolby.pl2": { "source": "iana" },
		"audio/vnd.dolby.pl2x": { "source": "iana" },
		"audio/vnd.dolby.pl2z": { "source": "iana" },
		"audio/vnd.dolby.pulse.1": { "source": "iana" },
		"audio/vnd.dra": {
			"source": "iana",
			"extensions": ["dra"]
		},
		"audio/vnd.dts": {
			"source": "iana",
			"extensions": ["dts"]
		},
		"audio/vnd.dts.hd": {
			"source": "iana",
			"extensions": ["dtshd"]
		},
		"audio/vnd.dts.uhd": { "source": "iana" },
		"audio/vnd.dvb.file": { "source": "iana" },
		"audio/vnd.everad.plj": { "source": "iana" },
		"audio/vnd.hns.audio": { "source": "iana" },
		"audio/vnd.lucent.voice": {
			"source": "iana",
			"extensions": ["lvp"]
		},
		"audio/vnd.ms-playready.media.pya": {
			"source": "iana",
			"extensions": ["pya"]
		},
		"audio/vnd.nokia.mobile-xmf": { "source": "iana" },
		"audio/vnd.nortel.vbk": { "source": "iana" },
		"audio/vnd.nuera.ecelp4800": {
			"source": "iana",
			"extensions": ["ecelp4800"]
		},
		"audio/vnd.nuera.ecelp7470": {
			"source": "iana",
			"extensions": ["ecelp7470"]
		},
		"audio/vnd.nuera.ecelp9600": {
			"source": "iana",
			"extensions": ["ecelp9600"]
		},
		"audio/vnd.octel.sbc": { "source": "iana" },
		"audio/vnd.presonus.multitrack": { "source": "iana" },
		"audio/vnd.qcelp": { "source": "iana" },
		"audio/vnd.rhetorex.32kadpcm": { "source": "iana" },
		"audio/vnd.rip": {
			"source": "iana",
			"extensions": ["rip"]
		},
		"audio/vnd.rn-realaudio": { "compressible": false },
		"audio/vnd.sealedmedia.softseal.mpeg": { "source": "iana" },
		"audio/vnd.vmx.cvsd": { "source": "iana" },
		"audio/vnd.wave": { "compressible": false },
		"audio/vorbis": {
			"source": "iana",
			"compressible": false
		},
		"audio/vorbis-config": { "source": "iana" },
		"audio/wav": {
			"compressible": false,
			"extensions": ["wav"]
		},
		"audio/wave": {
			"compressible": false,
			"extensions": ["wav"]
		},
		"audio/webm": {
			"source": "apache",
			"compressible": false,
			"extensions": ["weba"]
		},
		"audio/x-aac": {
			"source": "apache",
			"compressible": false,
			"extensions": ["aac"]
		},
		"audio/x-aiff": {
			"source": "apache",
			"extensions": [
				"aif",
				"aiff",
				"aifc"
			]
		},
		"audio/x-caf": {
			"source": "apache",
			"compressible": false,
			"extensions": ["caf"]
		},
		"audio/x-flac": {
			"source": "apache",
			"extensions": ["flac"]
		},
		"audio/x-m4a": {
			"source": "nginx",
			"extensions": ["m4a"]
		},
		"audio/x-matroska": {
			"source": "apache",
			"extensions": ["mka"]
		},
		"audio/x-mpegurl": {
			"source": "apache",
			"extensions": ["m3u"]
		},
		"audio/x-ms-wax": {
			"source": "apache",
			"extensions": ["wax"]
		},
		"audio/x-ms-wma": {
			"source": "apache",
			"extensions": ["wma"]
		},
		"audio/x-pn-realaudio": {
			"source": "apache",
			"extensions": ["ram", "ra"]
		},
		"audio/x-pn-realaudio-plugin": {
			"source": "apache",
			"extensions": ["rmp"]
		},
		"audio/x-realaudio": {
			"source": "nginx",
			"extensions": ["ra"]
		},
		"audio/x-tta": { "source": "apache" },
		"audio/x-wav": {
			"source": "apache",
			"extensions": ["wav"]
		},
		"audio/xm": {
			"source": "apache",
			"extensions": ["xm"]
		},
		"chemical/x-cdx": {
			"source": "apache",
			"extensions": ["cdx"]
		},
		"chemical/x-cif": {
			"source": "apache",
			"extensions": ["cif"]
		},
		"chemical/x-cmdf": {
			"source": "apache",
			"extensions": ["cmdf"]
		},
		"chemical/x-cml": {
			"source": "apache",
			"extensions": ["cml"]
		},
		"chemical/x-csml": {
			"source": "apache",
			"extensions": ["csml"]
		},
		"chemical/x-pdb": { "source": "apache" },
		"chemical/x-xyz": {
			"source": "apache",
			"extensions": ["xyz"]
		},
		"font/collection": {
			"source": "iana",
			"extensions": ["ttc"]
		},
		"font/otf": {
			"source": "iana",
			"compressible": true,
			"extensions": ["otf"]
		},
		"font/sfnt": { "source": "iana" },
		"font/ttf": {
			"source": "iana",
			"compressible": true,
			"extensions": ["ttf"]
		},
		"font/woff": {
			"source": "iana",
			"extensions": ["woff"]
		},
		"font/woff2": {
			"source": "iana",
			"extensions": ["woff2"]
		},
		"image/aces": {
			"source": "iana",
			"extensions": ["exr"]
		},
		"image/apng": {
			"compressible": false,
			"extensions": ["apng"]
		},
		"image/avci": {
			"source": "iana",
			"extensions": ["avci"]
		},
		"image/avcs": {
			"source": "iana",
			"extensions": ["avcs"]
		},
		"image/avif": {
			"source": "iana",
			"compressible": false,
			"extensions": ["avif"]
		},
		"image/bmp": {
			"source": "iana",
			"compressible": true,
			"extensions": ["bmp"]
		},
		"image/cgm": {
			"source": "iana",
			"extensions": ["cgm"]
		},
		"image/dicom-rle": {
			"source": "iana",
			"extensions": ["drle"]
		},
		"image/emf": {
			"source": "iana",
			"extensions": ["emf"]
		},
		"image/fits": {
			"source": "iana",
			"extensions": ["fits"]
		},
		"image/g3fax": {
			"source": "iana",
			"extensions": ["g3"]
		},
		"image/gif": {
			"source": "iana",
			"compressible": false,
			"extensions": ["gif"]
		},
		"image/heic": {
			"source": "iana",
			"extensions": ["heic"]
		},
		"image/heic-sequence": {
			"source": "iana",
			"extensions": ["heics"]
		},
		"image/heif": {
			"source": "iana",
			"extensions": ["heif"]
		},
		"image/heif-sequence": {
			"source": "iana",
			"extensions": ["heifs"]
		},
		"image/hej2k": {
			"source": "iana",
			"extensions": ["hej2"]
		},
		"image/hsj2": {
			"source": "iana",
			"extensions": ["hsj2"]
		},
		"image/ief": {
			"source": "iana",
			"extensions": ["ief"]
		},
		"image/jls": {
			"source": "iana",
			"extensions": ["jls"]
		},
		"image/jp2": {
			"source": "iana",
			"compressible": false,
			"extensions": ["jp2", "jpg2"]
		},
		"image/jpeg": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"jpeg",
				"jpg",
				"jpe"
			]
		},
		"image/jph": {
			"source": "iana",
			"extensions": ["jph"]
		},
		"image/jphc": {
			"source": "iana",
			"extensions": ["jhc"]
		},
		"image/jpm": {
			"source": "iana",
			"compressible": false,
			"extensions": ["jpm"]
		},
		"image/jpx": {
			"source": "iana",
			"compressible": false,
			"extensions": ["jpx", "jpf"]
		},
		"image/jxr": {
			"source": "iana",
			"extensions": ["jxr"]
		},
		"image/jxra": {
			"source": "iana",
			"extensions": ["jxra"]
		},
		"image/jxrs": {
			"source": "iana",
			"extensions": ["jxrs"]
		},
		"image/jxs": {
			"source": "iana",
			"extensions": ["jxs"]
		},
		"image/jxsc": {
			"source": "iana",
			"extensions": ["jxsc"]
		},
		"image/jxsi": {
			"source": "iana",
			"extensions": ["jxsi"]
		},
		"image/jxss": {
			"source": "iana",
			"extensions": ["jxss"]
		},
		"image/ktx": {
			"source": "iana",
			"extensions": ["ktx"]
		},
		"image/ktx2": {
			"source": "iana",
			"extensions": ["ktx2"]
		},
		"image/naplps": { "source": "iana" },
		"image/pjpeg": { "compressible": false },
		"image/png": {
			"source": "iana",
			"compressible": false,
			"extensions": ["png"]
		},
		"image/prs.btif": {
			"source": "iana",
			"extensions": ["btif"]
		},
		"image/prs.pti": {
			"source": "iana",
			"extensions": ["pti"]
		},
		"image/pwg-raster": { "source": "iana" },
		"image/sgi": {
			"source": "apache",
			"extensions": ["sgi"]
		},
		"image/svg+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["svg", "svgz"]
		},
		"image/t38": {
			"source": "iana",
			"extensions": ["t38"]
		},
		"image/tiff": {
			"source": "iana",
			"compressible": false,
			"extensions": ["tif", "tiff"]
		},
		"image/tiff-fx": {
			"source": "iana",
			"extensions": ["tfx"]
		},
		"image/vnd.adobe.photoshop": {
			"source": "iana",
			"compressible": true,
			"extensions": ["psd"]
		},
		"image/vnd.airzip.accelerator.azv": {
			"source": "iana",
			"extensions": ["azv"]
		},
		"image/vnd.cns.inf2": { "source": "iana" },
		"image/vnd.dece.graphic": {
			"source": "iana",
			"extensions": [
				"uvi",
				"uvvi",
				"uvg",
				"uvvg"
			]
		},
		"image/vnd.djvu": {
			"source": "iana",
			"extensions": ["djvu", "djv"]
		},
		"image/vnd.dvb.subtitle": {
			"source": "iana",
			"extensions": ["sub"]
		},
		"image/vnd.dwg": {
			"source": "iana",
			"extensions": ["dwg"]
		},
		"image/vnd.dxf": {
			"source": "iana",
			"extensions": ["dxf"]
		},
		"image/vnd.fastbidsheet": {
			"source": "iana",
			"extensions": ["fbs"]
		},
		"image/vnd.fpx": {
			"source": "iana",
			"extensions": ["fpx"]
		},
		"image/vnd.fst": {
			"source": "iana",
			"extensions": ["fst"]
		},
		"image/vnd.fujixerox.edmics-mmr": {
			"source": "iana",
			"extensions": ["mmr"]
		},
		"image/vnd.fujixerox.edmics-rlc": {
			"source": "iana",
			"extensions": ["rlc"]
		},
		"image/vnd.globalgraphics.pgb": { "source": "iana" },
		"image/vnd.microsoft.icon": {
			"source": "iana",
			"compressible": true,
			"extensions": ["ico"]
		},
		"image/vnd.mix": { "source": "iana" },
		"image/vnd.mozilla.apng": { "source": "iana" },
		"image/vnd.ms-dds": {
			"compressible": true,
			"extensions": ["dds"]
		},
		"image/vnd.ms-modi": {
			"source": "iana",
			"extensions": ["mdi"]
		},
		"image/vnd.ms-photo": {
			"source": "apache",
			"extensions": ["wdp"]
		},
		"image/vnd.net-fpx": {
			"source": "iana",
			"extensions": ["npx"]
		},
		"image/vnd.pco.b16": {
			"source": "iana",
			"extensions": ["b16"]
		},
		"image/vnd.radiance": { "source": "iana" },
		"image/vnd.sealed.png": { "source": "iana" },
		"image/vnd.sealedmedia.softseal.gif": { "source": "iana" },
		"image/vnd.sealedmedia.softseal.jpg": { "source": "iana" },
		"image/vnd.svf": { "source": "iana" },
		"image/vnd.tencent.tap": {
			"source": "iana",
			"extensions": ["tap"]
		},
		"image/vnd.valve.source.texture": {
			"source": "iana",
			"extensions": ["vtf"]
		},
		"image/vnd.wap.wbmp": {
			"source": "iana",
			"extensions": ["wbmp"]
		},
		"image/vnd.xiff": {
			"source": "iana",
			"extensions": ["xif"]
		},
		"image/vnd.zbrush.pcx": {
			"source": "iana",
			"extensions": ["pcx"]
		},
		"image/webp": {
			"source": "apache",
			"extensions": ["webp"]
		},
		"image/wmf": {
			"source": "iana",
			"extensions": ["wmf"]
		},
		"image/x-3ds": {
			"source": "apache",
			"extensions": ["3ds"]
		},
		"image/x-cmu-raster": {
			"source": "apache",
			"extensions": ["ras"]
		},
		"image/x-cmx": {
			"source": "apache",
			"extensions": ["cmx"]
		},
		"image/x-freehand": {
			"source": "apache",
			"extensions": [
				"fh",
				"fhc",
				"fh4",
				"fh5",
				"fh7"
			]
		},
		"image/x-icon": {
			"source": "apache",
			"compressible": true,
			"extensions": ["ico"]
		},
		"image/x-jng": {
			"source": "nginx",
			"extensions": ["jng"]
		},
		"image/x-mrsid-image": {
			"source": "apache",
			"extensions": ["sid"]
		},
		"image/x-ms-bmp": {
			"source": "nginx",
			"compressible": true,
			"extensions": ["bmp"]
		},
		"image/x-pcx": {
			"source": "apache",
			"extensions": ["pcx"]
		},
		"image/x-pict": {
			"source": "apache",
			"extensions": ["pic", "pct"]
		},
		"image/x-portable-anymap": {
			"source": "apache",
			"extensions": ["pnm"]
		},
		"image/x-portable-bitmap": {
			"source": "apache",
			"extensions": ["pbm"]
		},
		"image/x-portable-graymap": {
			"source": "apache",
			"extensions": ["pgm"]
		},
		"image/x-portable-pixmap": {
			"source": "apache",
			"extensions": ["ppm"]
		},
		"image/x-rgb": {
			"source": "apache",
			"extensions": ["rgb"]
		},
		"image/x-tga": {
			"source": "apache",
			"extensions": ["tga"]
		},
		"image/x-xbitmap": {
			"source": "apache",
			"extensions": ["xbm"]
		},
		"image/x-xcf": { "compressible": false },
		"image/x-xpixmap": {
			"source": "apache",
			"extensions": ["xpm"]
		},
		"image/x-xwindowdump": {
			"source": "apache",
			"extensions": ["xwd"]
		},
		"message/cpim": { "source": "iana" },
		"message/delivery-status": { "source": "iana" },
		"message/disposition-notification": {
			"source": "iana",
			"extensions": ["disposition-notification"]
		},
		"message/external-body": { "source": "iana" },
		"message/feedback-report": { "source": "iana" },
		"message/global": {
			"source": "iana",
			"extensions": ["u8msg"]
		},
		"message/global-delivery-status": {
			"source": "iana",
			"extensions": ["u8dsn"]
		},
		"message/global-disposition-notification": {
			"source": "iana",
			"extensions": ["u8mdn"]
		},
		"message/global-headers": {
			"source": "iana",
			"extensions": ["u8hdr"]
		},
		"message/http": {
			"source": "iana",
			"compressible": false
		},
		"message/imdn+xml": {
			"source": "iana",
			"compressible": true
		},
		"message/news": { "source": "iana" },
		"message/partial": {
			"source": "iana",
			"compressible": false
		},
		"message/rfc822": {
			"source": "iana",
			"compressible": true,
			"extensions": ["eml", "mime"]
		},
		"message/s-http": { "source": "iana" },
		"message/sip": { "source": "iana" },
		"message/sipfrag": { "source": "iana" },
		"message/tracking-status": { "source": "iana" },
		"message/vnd.si.simp": { "source": "iana" },
		"message/vnd.wfa.wsc": {
			"source": "iana",
			"extensions": ["wsc"]
		},
		"model/3mf": {
			"source": "iana",
			"extensions": ["3mf"]
		},
		"model/e57": { "source": "iana" },
		"model/gltf+json": {
			"source": "iana",
			"compressible": true,
			"extensions": ["gltf"]
		},
		"model/gltf-binary": {
			"source": "iana",
			"compressible": true,
			"extensions": ["glb"]
		},
		"model/iges": {
			"source": "iana",
			"compressible": false,
			"extensions": ["igs", "iges"]
		},
		"model/mesh": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"msh",
				"mesh",
				"silo"
			]
		},
		"model/mtl": {
			"source": "iana",
			"extensions": ["mtl"]
		},
		"model/obj": {
			"source": "iana",
			"extensions": ["obj"]
		},
		"model/step": { "source": "iana" },
		"model/step+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["stpx"]
		},
		"model/step+zip": {
			"source": "iana",
			"compressible": false,
			"extensions": ["stpz"]
		},
		"model/step-xml+zip": {
			"source": "iana",
			"compressible": false,
			"extensions": ["stpxz"]
		},
		"model/stl": {
			"source": "iana",
			"extensions": ["stl"]
		},
		"model/vnd.collada+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["dae"]
		},
		"model/vnd.dwf": {
			"source": "iana",
			"extensions": ["dwf"]
		},
		"model/vnd.flatland.3dml": { "source": "iana" },
		"model/vnd.gdl": {
			"source": "iana",
			"extensions": ["gdl"]
		},
		"model/vnd.gs-gdl": { "source": "apache" },
		"model/vnd.gs.gdl": { "source": "iana" },
		"model/vnd.gtw": {
			"source": "iana",
			"extensions": ["gtw"]
		},
		"model/vnd.moml+xml": {
			"source": "iana",
			"compressible": true
		},
		"model/vnd.mts": {
			"source": "iana",
			"extensions": ["mts"]
		},
		"model/vnd.opengex": {
			"source": "iana",
			"extensions": ["ogex"]
		},
		"model/vnd.parasolid.transmit.binary": {
			"source": "iana",
			"extensions": ["x_b"]
		},
		"model/vnd.parasolid.transmit.text": {
			"source": "iana",
			"extensions": ["x_t"]
		},
		"model/vnd.pytha.pyox": { "source": "iana" },
		"model/vnd.rosette.annotated-data-model": { "source": "iana" },
		"model/vnd.sap.vds": {
			"source": "iana",
			"extensions": ["vds"]
		},
		"model/vnd.usdz+zip": {
			"source": "iana",
			"compressible": false,
			"extensions": ["usdz"]
		},
		"model/vnd.valve.source.compiled-map": {
			"source": "iana",
			"extensions": ["bsp"]
		},
		"model/vnd.vtu": {
			"source": "iana",
			"extensions": ["vtu"]
		},
		"model/vrml": {
			"source": "iana",
			"compressible": false,
			"extensions": ["wrl", "vrml"]
		},
		"model/x3d+binary": {
			"source": "apache",
			"compressible": false,
			"extensions": ["x3db", "x3dbz"]
		},
		"model/x3d+fastinfoset": {
			"source": "iana",
			"extensions": ["x3db"]
		},
		"model/x3d+vrml": {
			"source": "apache",
			"compressible": false,
			"extensions": ["x3dv", "x3dvz"]
		},
		"model/x3d+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["x3d", "x3dz"]
		},
		"model/x3d-vrml": {
			"source": "iana",
			"extensions": ["x3dv"]
		},
		"multipart/alternative": {
			"source": "iana",
			"compressible": false
		},
		"multipart/appledouble": { "source": "iana" },
		"multipart/byteranges": { "source": "iana" },
		"multipart/digest": { "source": "iana" },
		"multipart/encrypted": {
			"source": "iana",
			"compressible": false
		},
		"multipart/form-data": {
			"source": "iana",
			"compressible": false
		},
		"multipart/header-set": { "source": "iana" },
		"multipart/mixed": { "source": "iana" },
		"multipart/multilingual": { "source": "iana" },
		"multipart/parallel": { "source": "iana" },
		"multipart/related": {
			"source": "iana",
			"compressible": false
		},
		"multipart/report": { "source": "iana" },
		"multipart/signed": {
			"source": "iana",
			"compressible": false
		},
		"multipart/vnd.bint.med-plus": { "source": "iana" },
		"multipart/voice-message": { "source": "iana" },
		"multipart/x-mixed-replace": { "source": "iana" },
		"text/1d-interleaved-parityfec": { "source": "iana" },
		"text/cache-manifest": {
			"source": "iana",
			"compressible": true,
			"extensions": ["appcache", "manifest"]
		},
		"text/calendar": {
			"source": "iana",
			"extensions": ["ics", "ifb"]
		},
		"text/calender": { "compressible": true },
		"text/cmd": { "compressible": true },
		"text/coffeescript": { "extensions": ["coffee", "litcoffee"] },
		"text/cql": { "source": "iana" },
		"text/cql-expression": { "source": "iana" },
		"text/cql-identifier": { "source": "iana" },
		"text/css": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true,
			"extensions": ["css"]
		},
		"text/csv": {
			"source": "iana",
			"compressible": true,
			"extensions": ["csv"]
		},
		"text/csv-schema": { "source": "iana" },
		"text/directory": { "source": "iana" },
		"text/dns": { "source": "iana" },
		"text/ecmascript": { "source": "iana" },
		"text/encaprtp": { "source": "iana" },
		"text/enriched": { "source": "iana" },
		"text/fhirpath": { "source": "iana" },
		"text/flexfec": { "source": "iana" },
		"text/fwdred": { "source": "iana" },
		"text/gff3": { "source": "iana" },
		"text/grammar-ref-list": { "source": "iana" },
		"text/html": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"html",
				"htm",
				"shtml"
			]
		},
		"text/jade": { "extensions": ["jade"] },
		"text/javascript": {
			"source": "iana",
			"compressible": true
		},
		"text/jcr-cnd": { "source": "iana" },
		"text/jsx": {
			"compressible": true,
			"extensions": ["jsx"]
		},
		"text/less": {
			"compressible": true,
			"extensions": ["less"]
		},
		"text/markdown": {
			"source": "iana",
			"compressible": true,
			"extensions": ["markdown", "md"]
		},
		"text/mathml": {
			"source": "nginx",
			"extensions": ["mml"]
		},
		"text/mdx": {
			"compressible": true,
			"extensions": ["mdx"]
		},
		"text/mizar": { "source": "iana" },
		"text/n3": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true,
			"extensions": ["n3"]
		},
		"text/parameters": {
			"source": "iana",
			"charset": "UTF-8"
		},
		"text/parityfec": { "source": "iana" },
		"text/plain": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"txt",
				"text",
				"conf",
				"def",
				"list",
				"log",
				"in",
				"ini"
			]
		},
		"text/provenance-notation": {
			"source": "iana",
			"charset": "UTF-8"
		},
		"text/prs.fallenstein.rst": { "source": "iana" },
		"text/prs.lines.tag": {
			"source": "iana",
			"extensions": ["dsc"]
		},
		"text/prs.prop.logic": { "source": "iana" },
		"text/raptorfec": { "source": "iana" },
		"text/red": { "source": "iana" },
		"text/rfc822-headers": { "source": "iana" },
		"text/richtext": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rtx"]
		},
		"text/rtf": {
			"source": "iana",
			"compressible": true,
			"extensions": ["rtf"]
		},
		"text/rtp-enc-aescm128": { "source": "iana" },
		"text/rtploopback": { "source": "iana" },
		"text/rtx": { "source": "iana" },
		"text/sgml": {
			"source": "iana",
			"extensions": ["sgml", "sgm"]
		},
		"text/shaclc": { "source": "iana" },
		"text/shex": {
			"source": "iana",
			"extensions": ["shex"]
		},
		"text/slim": { "extensions": ["slim", "slm"] },
		"text/spdx": {
			"source": "iana",
			"extensions": ["spdx"]
		},
		"text/strings": { "source": "iana" },
		"text/stylus": { "extensions": ["stylus", "styl"] },
		"text/t140": { "source": "iana" },
		"text/tab-separated-values": {
			"source": "iana",
			"compressible": true,
			"extensions": ["tsv"]
		},
		"text/troff": {
			"source": "iana",
			"extensions": [
				"t",
				"tr",
				"roff",
				"man",
				"me",
				"ms"
			]
		},
		"text/turtle": {
			"source": "iana",
			"charset": "UTF-8",
			"extensions": ["ttl"]
		},
		"text/ulpfec": { "source": "iana" },
		"text/uri-list": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"uri",
				"uris",
				"urls"
			]
		},
		"text/vcard": {
			"source": "iana",
			"compressible": true,
			"extensions": ["vcard"]
		},
		"text/vnd.a": { "source": "iana" },
		"text/vnd.abc": { "source": "iana" },
		"text/vnd.ascii-art": { "source": "iana" },
		"text/vnd.curl": {
			"source": "iana",
			"extensions": ["curl"]
		},
		"text/vnd.curl.dcurl": {
			"source": "apache",
			"extensions": ["dcurl"]
		},
		"text/vnd.curl.mcurl": {
			"source": "apache",
			"extensions": ["mcurl"]
		},
		"text/vnd.curl.scurl": {
			"source": "apache",
			"extensions": ["scurl"]
		},
		"text/vnd.debian.copyright": {
			"source": "iana",
			"charset": "UTF-8"
		},
		"text/vnd.dmclientscript": { "source": "iana" },
		"text/vnd.dvb.subtitle": {
			"source": "iana",
			"extensions": ["sub"]
		},
		"text/vnd.esmertec.theme-descriptor": {
			"source": "iana",
			"charset": "UTF-8"
		},
		"text/vnd.familysearch.gedcom": {
			"source": "iana",
			"extensions": ["ged"]
		},
		"text/vnd.ficlab.flt": { "source": "iana" },
		"text/vnd.fly": {
			"source": "iana",
			"extensions": ["fly"]
		},
		"text/vnd.fmi.flexstor": {
			"source": "iana",
			"extensions": ["flx"]
		},
		"text/vnd.gml": { "source": "iana" },
		"text/vnd.graphviz": {
			"source": "iana",
			"extensions": ["gv"]
		},
		"text/vnd.hans": { "source": "iana" },
		"text/vnd.hgl": { "source": "iana" },
		"text/vnd.in3d.3dml": {
			"source": "iana",
			"extensions": ["3dml"]
		},
		"text/vnd.in3d.spot": {
			"source": "iana",
			"extensions": ["spot"]
		},
		"text/vnd.iptc.newsml": { "source": "iana" },
		"text/vnd.iptc.nitf": { "source": "iana" },
		"text/vnd.latex-z": { "source": "iana" },
		"text/vnd.motorola.reflex": { "source": "iana" },
		"text/vnd.ms-mediapackage": { "source": "iana" },
		"text/vnd.net2phone.commcenter.command": { "source": "iana" },
		"text/vnd.radisys.msml-basic-layout": { "source": "iana" },
		"text/vnd.senx.warpscript": { "source": "iana" },
		"text/vnd.si.uricatalogue": { "source": "iana" },
		"text/vnd.sosi": { "source": "iana" },
		"text/vnd.sun.j2me.app-descriptor": {
			"source": "iana",
			"charset": "UTF-8",
			"extensions": ["jad"]
		},
		"text/vnd.trolltech.linguist": {
			"source": "iana",
			"charset": "UTF-8"
		},
		"text/vnd.wap.si": { "source": "iana" },
		"text/vnd.wap.sl": { "source": "iana" },
		"text/vnd.wap.wml": {
			"source": "iana",
			"extensions": ["wml"]
		},
		"text/vnd.wap.wmlscript": {
			"source": "iana",
			"extensions": ["wmls"]
		},
		"text/vtt": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true,
			"extensions": ["vtt"]
		},
		"text/x-asm": {
			"source": "apache",
			"extensions": ["s", "asm"]
		},
		"text/x-c": {
			"source": "apache",
			"extensions": [
				"c",
				"cc",
				"cxx",
				"cpp",
				"h",
				"hh",
				"dic"
			]
		},
		"text/x-component": {
			"source": "nginx",
			"extensions": ["htc"]
		},
		"text/x-fortran": {
			"source": "apache",
			"extensions": [
				"f",
				"for",
				"f77",
				"f90"
			]
		},
		"text/x-gwt-rpc": { "compressible": true },
		"text/x-handlebars-template": { "extensions": ["hbs"] },
		"text/x-java-source": {
			"source": "apache",
			"extensions": ["java"]
		},
		"text/x-jquery-tmpl": { "compressible": true },
		"text/x-lua": { "extensions": ["lua"] },
		"text/x-markdown": {
			"compressible": true,
			"extensions": ["mkd"]
		},
		"text/x-nfo": {
			"source": "apache",
			"extensions": ["nfo"]
		},
		"text/x-opml": {
			"source": "apache",
			"extensions": ["opml"]
		},
		"text/x-org": {
			"compressible": true,
			"extensions": ["org"]
		},
		"text/x-pascal": {
			"source": "apache",
			"extensions": ["p", "pas"]
		},
		"text/x-processing": {
			"compressible": true,
			"extensions": ["pde"]
		},
		"text/x-sass": { "extensions": ["sass"] },
		"text/x-scss": { "extensions": ["scss"] },
		"text/x-setext": {
			"source": "apache",
			"extensions": ["etx"]
		},
		"text/x-sfv": {
			"source": "apache",
			"extensions": ["sfv"]
		},
		"text/x-suse-ymp": {
			"compressible": true,
			"extensions": ["ymp"]
		},
		"text/x-uuencode": {
			"source": "apache",
			"extensions": ["uu"]
		},
		"text/x-vcalendar": {
			"source": "apache",
			"extensions": ["vcs"]
		},
		"text/x-vcard": {
			"source": "apache",
			"extensions": ["vcf"]
		},
		"text/xml": {
			"source": "iana",
			"compressible": true,
			"extensions": ["xml"]
		},
		"text/xml-external-parsed-entity": { "source": "iana" },
		"text/yaml": {
			"compressible": true,
			"extensions": ["yaml", "yml"]
		},
		"video/1d-interleaved-parityfec": { "source": "iana" },
		"video/3gpp": {
			"source": "iana",
			"extensions": ["3gp", "3gpp"]
		},
		"video/3gpp-tt": { "source": "iana" },
		"video/3gpp2": {
			"source": "iana",
			"extensions": ["3g2"]
		},
		"video/av1": { "source": "iana" },
		"video/bmpeg": { "source": "iana" },
		"video/bt656": { "source": "iana" },
		"video/celb": { "source": "iana" },
		"video/dv": { "source": "iana" },
		"video/encaprtp": { "source": "iana" },
		"video/ffv1": { "source": "iana" },
		"video/flexfec": { "source": "iana" },
		"video/h261": {
			"source": "iana",
			"extensions": ["h261"]
		},
		"video/h263": {
			"source": "iana",
			"extensions": ["h263"]
		},
		"video/h263-1998": { "source": "iana" },
		"video/h263-2000": { "source": "iana" },
		"video/h264": {
			"source": "iana",
			"extensions": ["h264"]
		},
		"video/h264-rcdo": { "source": "iana" },
		"video/h264-svc": { "source": "iana" },
		"video/h265": { "source": "iana" },
		"video/iso.segment": {
			"source": "iana",
			"extensions": ["m4s"]
		},
		"video/jpeg": {
			"source": "iana",
			"extensions": ["jpgv"]
		},
		"video/jpeg2000": { "source": "iana" },
		"video/jpm": {
			"source": "apache",
			"extensions": ["jpm", "jpgm"]
		},
		"video/jxsv": { "source": "iana" },
		"video/mj2": {
			"source": "iana",
			"extensions": ["mj2", "mjp2"]
		},
		"video/mp1s": { "source": "iana" },
		"video/mp2p": { "source": "iana" },
		"video/mp2t": {
			"source": "iana",
			"extensions": ["ts"]
		},
		"video/mp4": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"mp4",
				"mp4v",
				"mpg4"
			]
		},
		"video/mp4v-es": { "source": "iana" },
		"video/mpeg": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"mpeg",
				"mpg",
				"mpe",
				"m1v",
				"m2v"
			]
		},
		"video/mpeg4-generic": { "source": "iana" },
		"video/mpv": { "source": "iana" },
		"video/nv": { "source": "iana" },
		"video/ogg": {
			"source": "iana",
			"compressible": false,
			"extensions": ["ogv"]
		},
		"video/parityfec": { "source": "iana" },
		"video/pointer": { "source": "iana" },
		"video/quicktime": {
			"source": "iana",
			"compressible": false,
			"extensions": ["qt", "mov"]
		},
		"video/raptorfec": { "source": "iana" },
		"video/raw": { "source": "iana" },
		"video/rtp-enc-aescm128": { "source": "iana" },
		"video/rtploopback": { "source": "iana" },
		"video/rtx": { "source": "iana" },
		"video/scip": { "source": "iana" },
		"video/smpte291": { "source": "iana" },
		"video/smpte292m": { "source": "iana" },
		"video/ulpfec": { "source": "iana" },
		"video/vc1": { "source": "iana" },
		"video/vc2": { "source": "iana" },
		"video/vnd.cctv": { "source": "iana" },
		"video/vnd.dece.hd": {
			"source": "iana",
			"extensions": ["uvh", "uvvh"]
		},
		"video/vnd.dece.mobile": {
			"source": "iana",
			"extensions": ["uvm", "uvvm"]
		},
		"video/vnd.dece.mp4": { "source": "iana" },
		"video/vnd.dece.pd": {
			"source": "iana",
			"extensions": ["uvp", "uvvp"]
		},
		"video/vnd.dece.sd": {
			"source": "iana",
			"extensions": ["uvs", "uvvs"]
		},
		"video/vnd.dece.video": {
			"source": "iana",
			"extensions": ["uvv", "uvvv"]
		},
		"video/vnd.directv.mpeg": { "source": "iana" },
		"video/vnd.directv.mpeg-tts": { "source": "iana" },
		"video/vnd.dlna.mpeg-tts": { "source": "iana" },
		"video/vnd.dvb.file": {
			"source": "iana",
			"extensions": ["dvb"]
		},
		"video/vnd.fvt": {
			"source": "iana",
			"extensions": ["fvt"]
		},
		"video/vnd.hns.video": { "source": "iana" },
		"video/vnd.iptvforum.1dparityfec-1010": { "source": "iana" },
		"video/vnd.iptvforum.1dparityfec-2005": { "source": "iana" },
		"video/vnd.iptvforum.2dparityfec-1010": { "source": "iana" },
		"video/vnd.iptvforum.2dparityfec-2005": { "source": "iana" },
		"video/vnd.iptvforum.ttsavc": { "source": "iana" },
		"video/vnd.iptvforum.ttsmpeg2": { "source": "iana" },
		"video/vnd.motorola.video": { "source": "iana" },
		"video/vnd.motorola.videop": { "source": "iana" },
		"video/vnd.mpegurl": {
			"source": "iana",
			"extensions": ["mxu", "m4u"]
		},
		"video/vnd.ms-playready.media.pyv": {
			"source": "iana",
			"extensions": ["pyv"]
		},
		"video/vnd.nokia.interleaved-multimedia": { "source": "iana" },
		"video/vnd.nokia.mp4vr": { "source": "iana" },
		"video/vnd.nokia.videovoip": { "source": "iana" },
		"video/vnd.objectvideo": { "source": "iana" },
		"video/vnd.radgamettools.bink": { "source": "iana" },
		"video/vnd.radgamettools.smacker": { "source": "iana" },
		"video/vnd.sealed.mpeg1": { "source": "iana" },
		"video/vnd.sealed.mpeg4": { "source": "iana" },
		"video/vnd.sealed.swf": { "source": "iana" },
		"video/vnd.sealedmedia.softseal.mov": { "source": "iana" },
		"video/vnd.uvvu.mp4": {
			"source": "iana",
			"extensions": ["uvu", "uvvu"]
		},
		"video/vnd.vivo": {
			"source": "iana",
			"extensions": ["viv"]
		},
		"video/vnd.youtube.yt": { "source": "iana" },
		"video/vp8": { "source": "iana" },
		"video/vp9": { "source": "iana" },
		"video/webm": {
			"source": "apache",
			"compressible": false,
			"extensions": ["webm"]
		},
		"video/x-f4v": {
			"source": "apache",
			"extensions": ["f4v"]
		},
		"video/x-fli": {
			"source": "apache",
			"extensions": ["fli"]
		},
		"video/x-flv": {
			"source": "apache",
			"compressible": false,
			"extensions": ["flv"]
		},
		"video/x-m4v": {
			"source": "apache",
			"extensions": ["m4v"]
		},
		"video/x-matroska": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"mkv",
				"mk3d",
				"mks"
			]
		},
		"video/x-mng": {
			"source": "apache",
			"extensions": ["mng"]
		},
		"video/x-ms-asf": {
			"source": "apache",
			"extensions": ["asf", "asx"]
		},
		"video/x-ms-vob": {
			"source": "apache",
			"extensions": ["vob"]
		},
		"video/x-ms-wm": {
			"source": "apache",
			"extensions": ["wm"]
		},
		"video/x-ms-wmv": {
			"source": "apache",
			"compressible": false,
			"extensions": ["wmv"]
		},
		"video/x-ms-wmx": {
			"source": "apache",
			"extensions": ["wmx"]
		},
		"video/x-ms-wvx": {
			"source": "apache",
			"extensions": ["wvx"]
		},
		"video/x-msvideo": {
			"source": "apache",
			"extensions": ["avi"]
		},
		"video/x-sgi-movie": {
			"source": "apache",
			"extensions": ["movie"]
		},
		"video/x-smv": {
			"source": "apache",
			"extensions": ["smv"]
		},
		"x-conference/x-cooltalk": {
			"source": "apache",
			"extensions": ["ice"]
		},
		"x-shader/x-fragment": { "compressible": true },
		"x-shader/x-vertex": { "compressible": true }
	};
}));
// node_modules/mime-db/index.js
var require_mime_db = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/*!
	* mime-db
	* Copyright(c) 2014 Jonathan Ong
	* Copyright(c) 2015-2022 Douglas Christopher Wilson
	* MIT Licensed
	*/
	/**
	* Module exports.
	*/
	module.exports = (init_db(), __toCommonJS(db_exports).default);
}));
// node_modules/mime-types/index.js
/*!
* mime-types
* Copyright(c) 2014 Jonathan Ong
* Copyright(c) 2015 Douglas Christopher Wilson
* MIT Licensed
*/
var require_mime_types = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Module dependencies.
	* @private
	*/
	var db = require_mime_db();
	var extname = __require("path").extname;
	/**
	* Module variables.
	* @private
	*/
	var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
	var TEXT_TYPE_REGEXP = /^text\//i;
	/**
	* Module exports.
	* @public
	*/
	exports.charset = charset;
	exports.charsets = { lookup: charset };
	exports.contentType = contentType;
	exports.extension = extension;
	exports.extensions = Object.create(null);
	exports.lookup = lookup;
	exports.types = Object.create(null);
	populateMaps(exports.extensions, exports.types);
	/**
	* Get the default charset for a MIME type.
	*
	* @param {string} type
	* @return {boolean|string}
	*/
	function charset(type) {
		if (!type || typeof type !== "string") return false;
		var match = EXTRACT_TYPE_REGEXP.exec(type);
		var mime = match && db[match[1].toLowerCase()];
		if (mime && mime.charset) return mime.charset;
		if (match && TEXT_TYPE_REGEXP.test(match[1])) return "UTF-8";
		return false;
	}
	/**
	* Create a full Content-Type header given a MIME type or extension.
	*
	* @param {string} str
	* @return {boolean|string}
	*/
	function contentType(str) {
		if (!str || typeof str !== "string") return false;
		var mime = str.indexOf("/") === -1 ? exports.lookup(str) : str;
		if (!mime) return false;
		if (mime.indexOf("charset") === -1) {
			var charset = exports.charset(mime);
			if (charset) mime += "; charset=" + charset.toLowerCase();
		}
		return mime;
	}
	/**
	* Get the default extension for a MIME type.
	*
	* @param {string} type
	* @return {boolean|string}
	*/
	function extension(type) {
		if (!type || typeof type !== "string") return false;
		var match = EXTRACT_TYPE_REGEXP.exec(type);
		var exts = match && exports.extensions[match[1].toLowerCase()];
		if (!exts || !exts.length) return false;
		return exts[0];
	}
	/**
	* Lookup the MIME type for a file path/extension.
	*
	* @param {string} path
	* @return {boolean|string}
	*/
	function lookup(path) {
		if (!path || typeof path !== "string") return false;
		var extension = extname("x." + path).toLowerCase().substr(1);
		if (!extension) return false;
		return exports.types[extension] || false;
	}
	/**
	* Populate the extensions and types maps.
	* @private
	*/
	function populateMaps(extensions, types) {
		var preference = [
			"nginx",
			"apache",
			void 0,
			"iana"
		];
		Object.keys(db).forEach(function forEachMimeType(type) {
			var mime = db[type];
			var exts = mime.extensions;
			if (!exts || !exts.length) return;
			extensions[type] = exts;
			for (var i = 0; i < exts.length; i++) {
				var extension = exts[i];
				if (types[extension]) {
					var from = preference.indexOf(db[types[extension]].source);
					var to = preference.indexOf(mime.source);
					if (types[extension] !== "application/octet-stream" && (from > to || from === to && types[extension].substr(0, 12) === "application/")) continue;
				}
				types[extension] = type;
			}
		});
	}
}));
// node_modules/asynckit/lib/defer.js
var require_defer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = defer;
	/**
	* Runs provided function on next iteration of the event loop
	*
	* @param {function} fn - function to run
	*/
	function defer(fn) {
		var nextTick = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
		if (nextTick) nextTick(fn);
		else setTimeout(fn, 0);
	}
}));
// node_modules/asynckit/lib/async.js
var require_async = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var defer = require_defer();
	module.exports = async;
	/**
	* Runs provided callback asynchronously
	* even if callback itself is not
	*
	* @param   {function} callback - callback to invoke
	* @returns {function} - augmented callback
	*/
	function async(callback) {
		var isAsync = false;
		defer(function() {
			isAsync = true;
		});
		return function async_callback(err, result) {
			if (isAsync) callback(err, result);
			else defer(function nextTick_callback() {
				callback(err, result);
			});
		};
	}
}));
// node_modules/asynckit/lib/abort.js
var require_abort = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = abort;
	/**
	* Aborts leftover active jobs
	*
	* @param {object} state - current state object
	*/
	function abort(state) {
		Object.keys(state.jobs).forEach(clean.bind(state));
		state.jobs = {};
	}
	/**
	* Cleans up leftover job by invoking abort function for the provided job id
	*
	* @this  state
	* @param {string|number} key - job id to abort
	*/
	function clean(key) {
		if (typeof this.jobs[key] == "function") this.jobs[key]();
	}
}));
// node_modules/asynckit/lib/iterate.js
var require_iterate = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var async = require_async();
	var abort = require_abort();
	module.exports = iterate;
	/**
	* Iterates over each job object
	*
	* @param {array|object} list - array or object (named list) to iterate over
	* @param {function} iterator - iterator to run
	* @param {object} state - current job status
	* @param {function} callback - invoked when all elements processed
	*/
	function iterate(list, iterator, state, callback) {
		var key = state["keyedList"] ? state["keyedList"][state.index] : state.index;
		state.jobs[key] = runJob(iterator, key, list[key], function(error, output) {
			if (!(key in state.jobs)) return;
			delete state.jobs[key];
			if (error) abort(state);
			else state.results[key] = output;
			callback(error, state.results);
		});
	}
	/**
	* Runs iterator over provided job element
	*
	* @param   {function} iterator - iterator to invoke
	* @param   {string|number} key - key/index of the element in the list of jobs
	* @param   {mixed} item - job description
	* @param   {function} callback - invoked after iterator is done with the job
	* @returns {function|mixed} - job abort function or something else
	*/
	function runJob(iterator, key, item, callback) {
		var aborter;
		if (iterator.length == 2) aborter = iterator(item, async(callback));
		else aborter = iterator(item, key, async(callback));
		return aborter;
	}
}));
// node_modules/asynckit/lib/state.js
var require_state = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = state;
	/**
	* Creates initial state object
	* for iteration over list
	*
	* @param   {array|object} list - list to iterate over
	* @param   {function|null} sortMethod - function to use for keys sort,
	*                                     or `null` to keep them as is
	* @returns {object} - initial state object
	*/
	function state(list, sortMethod) {
		var isNamedList = !Array.isArray(list), initState = {
			index: 0,
			keyedList: isNamedList || sortMethod ? Object.keys(list) : null,
			jobs: {},
			results: isNamedList ? {} : [],
			size: isNamedList ? Object.keys(list).length : list.length
		};
		if (sortMethod) initState.keyedList.sort(isNamedList ? sortMethod : function(a, b) {
			return sortMethod(list[a], list[b]);
		});
		return initState;
	}
}));
// node_modules/asynckit/lib/terminator.js
var require_terminator = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var abort = require_abort();
	var async = require_async();
	module.exports = terminator;
	/**
	* Terminates jobs in the attached state context
	*
	* @this  AsyncKitState#
	* @param {function} callback - final callback to invoke after termination
	*/
	function terminator(callback) {
		if (!Object.keys(this.jobs).length) return;
		this.index = this.size;
		abort(this);
		async(callback)(null, this.results);
	}
}));
// node_modules/asynckit/parallel.js
var require_parallel = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var iterate = require_iterate();
	var initState = require_state();
	var terminator = require_terminator();
	module.exports = parallel;
	/**
	* Runs iterator over provided array elements in parallel
	*
	* @param   {array|object} list - array or object (named list) to iterate over
	* @param   {function} iterator - iterator to run
	* @param   {function} callback - invoked when all elements processed
	* @returns {function} - jobs terminator
	*/
	function parallel(list, iterator, callback) {
		var state = initState(list);
		while (state.index < (state["keyedList"] || list).length) {
			iterate(list, iterator, state, function(error, result) {
				if (error) {
					callback(error, result);
					return;
				}
				if (Object.keys(state.jobs).length === 0) {
					callback(null, state.results);
					return;
				}
			});
			state.index++;
		}
		return terminator.bind(state, callback);
	}
}));
// node_modules/asynckit/serialOrdered.js
var require_serialOrdered = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var iterate = require_iterate();
	var initState = require_state();
	var terminator = require_terminator();
	module.exports = serialOrdered;
	module.exports.ascending = ascending;
	module.exports.descending = descending;
	/**
	* Runs iterator over provided sorted array elements in series
	*
	* @param   {array|object} list - array or object (named list) to iterate over
	* @param   {function} iterator - iterator to run
	* @param   {function} sortMethod - custom sort function
	* @param   {function} callback - invoked when all elements processed
	* @returns {function} - jobs terminator
	*/
	function serialOrdered(list, iterator, sortMethod, callback) {
		var state = initState(list, sortMethod);
		iterate(list, iterator, state, function iteratorHandler(error, result) {
			if (error) {
				callback(error, result);
				return;
			}
			state.index++;
			if (state.index < (state["keyedList"] || list).length) {
				iterate(list, iterator, state, iteratorHandler);
				return;
			}
			callback(null, state.results);
		});
		return terminator.bind(state, callback);
	}
	/**
	* sort helper to sort array elements in ascending order
	*
	* @param   {mixed} a - an item to compare
	* @param   {mixed} b - an item to compare
	* @returns {number} - comparison result
	*/
	function ascending(a, b) {
		return a < b ? -1 : a > b ? 1 : 0;
	}
	/**
	* sort helper to sort array elements in descending order
	*
	* @param   {mixed} a - an item to compare
	* @param   {mixed} b - an item to compare
	* @returns {number} - comparison result
	*/
	function descending(a, b) {
		return -1 * ascending(a, b);
	}
}));
// node_modules/asynckit/serial.js
var require_serial = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var serialOrdered = require_serialOrdered();
	module.exports = serial;
	/**
	* Runs iterator over provided array elements in series
	*
	* @param   {array|object} list - array or object (named list) to iterate over
	* @param   {function} iterator - iterator to run
	* @param   {function} callback - invoked when all elements processed
	* @returns {function} - jobs terminator
	*/
	function serial(list, iterator, callback) {
		return serialOrdered(list, iterator, null, callback);
	}
}));
// node_modules/asynckit/index.js
var require_asynckit = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		parallel: require_parallel(),
		serial: require_serial(),
		serialOrdered: require_serialOrdered()
	};
}));
// node_modules/es-object-atoms/index.js
var require_es_object_atoms = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('.')} */
	module.exports = Object;
}));
// node_modules/es-errors/index.js
var require_es_errors = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('.')} */
	module.exports = Error;
}));
// node_modules/es-errors/eval.js
var require_eval = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./eval')} */
	module.exports = EvalError;
}));
// node_modules/es-errors/range.js
var require_range = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./range')} */
	module.exports = RangeError;
}));
// node_modules/es-errors/ref.js
var require_ref = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./ref')} */
	module.exports = ReferenceError;
}));
// node_modules/es-errors/syntax.js
var require_syntax = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./syntax')} */
	module.exports = SyntaxError;
}));
// node_modules/es-errors/type.js
var require_type = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./type')} */
	module.exports = TypeError;
}));
// node_modules/es-errors/uri.js
var require_uri = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./uri')} */
	module.exports = URIError;
}));
// node_modules/math-intrinsics/abs.js
var require_abs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./abs')} */
	module.exports = Math.abs;
}));
// node_modules/math-intrinsics/floor.js
var require_floor = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./floor')} */
	module.exports = Math.floor;
}));
// node_modules/math-intrinsics/max.js
var require_max = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./max')} */
	module.exports = Math.max;
}));
// node_modules/math-intrinsics/min.js
var require_min = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./min')} */
	module.exports = Math.min;
}));
// node_modules/math-intrinsics/pow.js
var require_pow = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./pow')} */
	module.exports = Math.pow;
}));
// node_modules/math-intrinsics/round.js
var require_round = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./round')} */
	module.exports = Math.round;
}));
// node_modules/math-intrinsics/isNaN.js
var require_isNaN = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./isNaN')} */
	module.exports = Number.isNaN || function isNaN(a) {
		return a !== a;
	};
}));
// node_modules/math-intrinsics/sign.js
var require_sign = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $isNaN = require_isNaN();
	/** @type {import('./sign')} */
	module.exports = function sign(number) {
		if ($isNaN(number) || number === 0) return number;
		return number < 0 ? -1 : 1;
	};
}));
// node_modules/gopd/gOPD.js
var require_gOPD = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./gOPD')} */
	module.exports = Object.getOwnPropertyDescriptor;
}));
// node_modules/gopd/index.js
var require_gopd = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('.')} */
	var $gOPD = require_gOPD();
	if ($gOPD) try {
		$gOPD([], "length");
	} catch (e) {
		$gOPD = null;
	}
	module.exports = $gOPD;
}));
// node_modules/es-define-property/index.js
var require_es_define_property = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('.')} */
	var $defineProperty = Object.defineProperty || false;
	if ($defineProperty) try {
		$defineProperty({}, "a", { value: 1 });
	} catch (e) {
		$defineProperty = false;
	}
	module.exports = $defineProperty;
}));
// node_modules/has-symbols/shams.js
var require_shams$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./shams')} */
	module.exports = function hasSymbols() {
		if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") return false;
		if (typeof Symbol.iterator === "symbol") return true;
		/** @type {{ [k in symbol]?: unknown }} */
		var obj = {};
		var sym = Symbol("test");
		var symObj = Object(sym);
		if (typeof sym === "string") return false;
		if (Object.prototype.toString.call(sym) !== "[object Symbol]") return false;
		if (Object.prototype.toString.call(symObj) !== "[object Symbol]") return false;
		var symVal = 42;
		obj[sym] = symVal;
		for (var _ in obj) return false;
		if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) return false;
		if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) return false;
		var syms = Object.getOwnPropertySymbols(obj);
		if (syms.length !== 1 || syms[0] !== sym) return false;
		if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) return false;
		if (typeof Object.getOwnPropertyDescriptor === "function") {
			var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
			if (descriptor.value !== symVal || descriptor.enumerable !== true) return false;
		}
		return true;
	};
}));
// node_modules/has-symbols/index.js
var require_has_symbols = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var origSymbol = typeof Symbol !== "undefined" && Symbol;
	var hasSymbolSham = require_shams$1();
	/** @type {import('.')} */
	module.exports = function hasNativeSymbols() {
		if (typeof origSymbol !== "function") return false;
		if (typeof Symbol !== "function") return false;
		if (typeof origSymbol("foo") !== "symbol") return false;
		if (typeof Symbol("bar") !== "symbol") return false;
		return hasSymbolSham();
	};
}));
// node_modules/get-proto/Reflect.getPrototypeOf.js
var require_Reflect_getPrototypeOf = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./Reflect.getPrototypeOf')} */
	module.exports = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
}));
// node_modules/get-proto/Object.getPrototypeOf.js
var require_Object_getPrototypeOf = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./Object.getPrototypeOf')} */
	module.exports = require_es_object_atoms().getPrototypeOf || null;
}));
// node_modules/function-bind/implementation.js
var require_implementation = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
	var toStr = Object.prototype.toString;
	var max = Math.max;
	var funcType = "[object Function]";
	var concatty = function concatty(a, b) {
		var arr = [];
		for (var i = 0; i < a.length; i += 1) arr[i] = a[i];
		for (var j = 0; j < b.length; j += 1) arr[j + a.length] = b[j];
		return arr;
	};
	var slicy = function slicy(arrLike, offset) {
		var arr = [];
		for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) arr[j] = arrLike[i];
		return arr;
	};
	var joiny = function(arr, joiner) {
		var str = "";
		for (var i = 0; i < arr.length; i += 1) {
			str += arr[i];
			if (i + 1 < arr.length) str += joiner;
		}
		return str;
	};
	module.exports = function bind(that) {
		var target = this;
		if (typeof target !== "function" || toStr.apply(target) !== funcType) throw new TypeError(ERROR_MESSAGE + target);
		var args = slicy(arguments, 1);
		var bound;
		var binder = function() {
			if (this instanceof bound) {
				var result = target.apply(this, concatty(args, arguments));
				if (Object(result) === result) return result;
				return this;
			}
			return target.apply(that, concatty(args, arguments));
		};
		var boundLength = max(0, target.length - args.length);
		var boundArgs = [];
		for (var i = 0; i < boundLength; i++) boundArgs[i] = "$" + i;
		bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
		if (target.prototype) {
			var Empty = function Empty() {};
			Empty.prototype = target.prototype;
			bound.prototype = new Empty();
			Empty.prototype = null;
		}
		return bound;
	};
}));
// node_modules/function-bind/index.js
var require_function_bind = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var implementation = require_implementation();
	module.exports = Function.prototype.bind || implementation;
}));
// node_modules/call-bind-apply-helpers/functionCall.js
var require_functionCall = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./functionCall')} */
	module.exports = Function.prototype.call;
}));
// node_modules/call-bind-apply-helpers/functionApply.js
var require_functionApply = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./functionApply')} */
	module.exports = Function.prototype.apply;
}));
// node_modules/call-bind-apply-helpers/reflectApply.js
var require_reflectApply = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type {import('./reflectApply')} */
	module.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
}));
// node_modules/call-bind-apply-helpers/actualApply.js
var require_actualApply = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var bind = require_function_bind();
	var $apply = require_functionApply();
	var $call = require_functionCall();
	/** @type {import('./actualApply')} */
	module.exports = require_reflectApply() || bind.call($call, $apply);
}));
// node_modules/call-bind-apply-helpers/index.js
var require_call_bind_apply_helpers = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var bind = require_function_bind();
	var $TypeError = require_type();
	var $call = require_functionCall();
	var $actualApply = require_actualApply();
	/** @type {(args: [Function, thisArg?: unknown, ...args: unknown[]]) => Function} TODO FIXME, find a way to use import('.') */
	module.exports = function callBindBasic(args) {
		if (args.length < 1 || typeof args[0] !== "function") throw new $TypeError("a function is required");
		return $actualApply(bind, $call, args);
	};
}));
// node_modules/dunder-proto/get.js
var require_get = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var callBind = require_call_bind_apply_helpers();
	var gOPD = require_gopd();
	var hasProtoAccessor;
	try {
		hasProtoAccessor = [].__proto__ === Array.prototype;
	} catch (e) {
		if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") throw e;
	}
	var desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, "__proto__");
	var $Object = Object;
	var $getPrototypeOf = $Object.getPrototypeOf;
	/** @type {import('./get')} */
	module.exports = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? function getDunder(value) {
		return $getPrototypeOf(value == null ? value : $Object(value));
	} : false;
}));
// node_modules/get-proto/index.js
var require_get_proto = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var reflectGetProto = require_Reflect_getPrototypeOf();
	var originalGetProto = require_Object_getPrototypeOf();
	var getDunderProto = require_get();
	/** @type {import('.')} */
	module.exports = reflectGetProto ? function getProto(O) {
		return reflectGetProto(O);
	} : originalGetProto ? function getProto(O) {
		if (!O || typeof O !== "object" && typeof O !== "function") throw new TypeError("getProto: not an object");
		return originalGetProto(O);
	} : getDunderProto ? function getProto(O) {
		return getDunderProto(O);
	} : null;
}));
// node_modules/hasown/index.js
var require_hasown = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var call = Function.prototype.call;
	var $hasOwn = Object.prototype.hasOwnProperty;
	/** @type {import('.')} */
	module.exports = require_function_bind().call(call, $hasOwn);
}));
// node_modules/get-intrinsic/index.js
var require_get_intrinsic = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var undefined;
	var $Object = require_es_object_atoms();
	var $Error = require_es_errors();
	var $EvalError = require_eval();
	var $RangeError = require_range();
	var $ReferenceError = require_ref();
	var $SyntaxError = require_syntax();
	var $TypeError = require_type();
	var $URIError = require_uri();
	var abs = require_abs();
	var floor = require_floor();
	var max = require_max();
	var min = require_min();
	var pow = require_pow();
	var round = require_round();
	var sign = require_sign();
	var $Function = Function;
	var getEvalledConstructor = function(expressionSyntax) {
		try {
			return $Function("\"use strict\"; return (" + expressionSyntax + ").constructor;")();
		} catch (e) {}
	};
	var $gOPD = require_gopd();
	var $defineProperty = require_es_define_property();
	var throwTypeError = function() {
		throw new $TypeError();
	};
	var ThrowTypeError = $gOPD ? function() {
		try {
			arguments.callee;
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				return $gOPD(arguments, "callee").get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}() : throwTypeError;
	var hasSymbols = require_has_symbols()();
	var getProto = require_get_proto();
	var $ObjectGPO = require_Object_getPrototypeOf();
	var $ReflectGPO = require_Reflect_getPrototypeOf();
	var $apply = require_functionApply();
	var $call = require_functionCall();
	var needsEval = {};
	var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined : getProto(Uint8Array);
	var INTRINSICS = {
		__proto__: null,
		"%AggregateError%": typeof AggregateError === "undefined" ? undefined : AggregateError,
		"%Array%": Array,
		"%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined : ArrayBuffer,
		"%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
		"%AsyncFromSyncIteratorPrototype%": undefined,
		"%AsyncFunction%": needsEval,
		"%AsyncGenerator%": needsEval,
		"%AsyncGeneratorFunction%": needsEval,
		"%AsyncIteratorPrototype%": needsEval,
		"%Atomics%": typeof Atomics === "undefined" ? undefined : Atomics,
		"%BigInt%": typeof BigInt === "undefined" ? undefined : BigInt,
		"%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined : BigInt64Array,
		"%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined : BigUint64Array,
		"%Boolean%": Boolean,
		"%DataView%": typeof DataView === "undefined" ? undefined : DataView,
		"%Date%": Date,
		"%decodeURI%": decodeURI,
		"%decodeURIComponent%": decodeURIComponent,
		"%encodeURI%": encodeURI,
		"%encodeURIComponent%": encodeURIComponent,
		"%Error%": $Error,
		"%eval%": eval,
		"%EvalError%": $EvalError,
		"%Float16Array%": typeof Float16Array === "undefined" ? undefined : Float16Array,
		"%Float32Array%": typeof Float32Array === "undefined" ? undefined : Float32Array,
		"%Float64Array%": typeof Float64Array === "undefined" ? undefined : Float64Array,
		"%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined : FinalizationRegistry,
		"%Function%": $Function,
		"%GeneratorFunction%": needsEval,
		"%Int8Array%": typeof Int8Array === "undefined" ? undefined : Int8Array,
		"%Int16Array%": typeof Int16Array === "undefined" ? undefined : Int16Array,
		"%Int32Array%": typeof Int32Array === "undefined" ? undefined : Int32Array,
		"%isFinite%": isFinite,
		"%isNaN%": isNaN,
		"%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
		"%JSON%": typeof JSON === "object" ? JSON : undefined,
		"%Map%": typeof Map === "undefined" ? undefined : Map,
		"%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
		"%Math%": Math,
		"%Number%": Number,
		"%Object%": $Object,
		"%Object.getOwnPropertyDescriptor%": $gOPD,
		"%parseFloat%": parseFloat,
		"%parseInt%": parseInt,
		"%Promise%": typeof Promise === "undefined" ? undefined : Promise,
		"%Proxy%": typeof Proxy === "undefined" ? undefined : Proxy,
		"%RangeError%": $RangeError,
		"%ReferenceError%": $ReferenceError,
		"%Reflect%": typeof Reflect === "undefined" ? undefined : Reflect,
		"%RegExp%": RegExp,
		"%Set%": typeof Set === "undefined" ? undefined : Set,
		"%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
		"%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined : SharedArrayBuffer,
		"%String%": String,
		"%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined,
		"%Symbol%": hasSymbols ? Symbol : undefined,
		"%SyntaxError%": $SyntaxError,
		"%ThrowTypeError%": ThrowTypeError,
		"%TypedArray%": TypedArray,
		"%TypeError%": $TypeError,
		"%Uint8Array%": typeof Uint8Array === "undefined" ? undefined : Uint8Array,
		"%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined : Uint8ClampedArray,
		"%Uint16Array%": typeof Uint16Array === "undefined" ? undefined : Uint16Array,
		"%Uint32Array%": typeof Uint32Array === "undefined" ? undefined : Uint32Array,
		"%URIError%": $URIError,
		"%WeakMap%": typeof WeakMap === "undefined" ? undefined : WeakMap,
		"%WeakRef%": typeof WeakRef === "undefined" ? undefined : WeakRef,
		"%WeakSet%": typeof WeakSet === "undefined" ? undefined : WeakSet,
		"%Function.prototype.call%": $call,
		"%Function.prototype.apply%": $apply,
		"%Object.defineProperty%": $defineProperty,
		"%Object.getPrototypeOf%": $ObjectGPO,
		"%Math.abs%": abs,
		"%Math.floor%": floor,
		"%Math.max%": max,
		"%Math.min%": min,
		"%Math.pow%": pow,
		"%Math.round%": round,
		"%Math.sign%": sign,
		"%Reflect.getPrototypeOf%": $ReflectGPO
	};
	if (getProto) try {
		null.error;
	} catch (e) {
		INTRINSICS["%Error.prototype%"] = getProto(getProto(e));
	}
	var doEval = function doEval(name) {
		var value;
		if (name === "%AsyncFunction%") value = getEvalledConstructor("async function () {}");
		else if (name === "%GeneratorFunction%") value = getEvalledConstructor("function* () {}");
		else if (name === "%AsyncGeneratorFunction%") value = getEvalledConstructor("async function* () {}");
		else if (name === "%AsyncGenerator%") {
			var fn = doEval("%AsyncGeneratorFunction%");
			if (fn) value = fn.prototype;
		} else if (name === "%AsyncIteratorPrototype%") {
			var gen = doEval("%AsyncGenerator%");
			if (gen && getProto) value = getProto(gen.prototype);
		}
		INTRINSICS[name] = value;
		return value;
	};
	var LEGACY_ALIASES = {
		__proto__: null,
		"%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
		"%ArrayPrototype%": ["Array", "prototype"],
		"%ArrayProto_entries%": [
			"Array",
			"prototype",
			"entries"
		],
		"%ArrayProto_forEach%": [
			"Array",
			"prototype",
			"forEach"
		],
		"%ArrayProto_keys%": [
			"Array",
			"prototype",
			"keys"
		],
		"%ArrayProto_values%": [
			"Array",
			"prototype",
			"values"
		],
		"%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
		"%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
		"%AsyncGeneratorPrototype%": [
			"AsyncGeneratorFunction",
			"prototype",
			"prototype"
		],
		"%BooleanPrototype%": ["Boolean", "prototype"],
		"%DataViewPrototype%": ["DataView", "prototype"],
		"%DatePrototype%": ["Date", "prototype"],
		"%ErrorPrototype%": ["Error", "prototype"],
		"%EvalErrorPrototype%": ["EvalError", "prototype"],
		"%Float32ArrayPrototype%": ["Float32Array", "prototype"],
		"%Float64ArrayPrototype%": ["Float64Array", "prototype"],
		"%FunctionPrototype%": ["Function", "prototype"],
		"%Generator%": ["GeneratorFunction", "prototype"],
		"%GeneratorPrototype%": [
			"GeneratorFunction",
			"prototype",
			"prototype"
		],
		"%Int8ArrayPrototype%": ["Int8Array", "prototype"],
		"%Int16ArrayPrototype%": ["Int16Array", "prototype"],
		"%Int32ArrayPrototype%": ["Int32Array", "prototype"],
		"%JSONParse%": ["JSON", "parse"],
		"%JSONStringify%": ["JSON", "stringify"],
		"%MapPrototype%": ["Map", "prototype"],
		"%NumberPrototype%": ["Number", "prototype"],
		"%ObjectPrototype%": ["Object", "prototype"],
		"%ObjProto_toString%": [
			"Object",
			"prototype",
			"toString"
		],
		"%ObjProto_valueOf%": [
			"Object",
			"prototype",
			"valueOf"
		],
		"%PromisePrototype%": ["Promise", "prototype"],
		"%PromiseProto_then%": [
			"Promise",
			"prototype",
			"then"
		],
		"%Promise_all%": ["Promise", "all"],
		"%Promise_reject%": ["Promise", "reject"],
		"%Promise_resolve%": ["Promise", "resolve"],
		"%RangeErrorPrototype%": ["RangeError", "prototype"],
		"%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
		"%RegExpPrototype%": ["RegExp", "prototype"],
		"%SetPrototype%": ["Set", "prototype"],
		"%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
		"%StringPrototype%": ["String", "prototype"],
		"%SymbolPrototype%": ["Symbol", "prototype"],
		"%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
		"%TypedArrayPrototype%": ["TypedArray", "prototype"],
		"%TypeErrorPrototype%": ["TypeError", "prototype"],
		"%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
		"%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
		"%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
		"%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
		"%URIErrorPrototype%": ["URIError", "prototype"],
		"%WeakMapPrototype%": ["WeakMap", "prototype"],
		"%WeakSetPrototype%": ["WeakSet", "prototype"]
	};
	var bind = require_function_bind();
	var hasOwn = require_hasown();
	var $concat = bind.call($call, Array.prototype.concat);
	var $spliceApply = bind.call($apply, Array.prototype.splice);
	var $replace = bind.call($call, String.prototype.replace);
	var $strSlice = bind.call($call, String.prototype.slice);
	var $exec = bind.call($call, RegExp.prototype.exec);
	var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
	var reEscapeChar = /\\(\\)?/g;
	var stringToPath = function stringToPath(string) {
		var first = $strSlice(string, 0, 1);
		var last = $strSlice(string, -1);
		if (first === "%" && last !== "%") throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
		else if (last === "%" && first !== "%") throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
		var result = [];
		$replace(string, rePropName, function(match, number, quote, subString) {
			result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
		});
		return result;
	};
	var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
		var intrinsicName = name;
		var alias;
		if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
			alias = LEGACY_ALIASES[intrinsicName];
			intrinsicName = "%" + alias[0] + "%";
		}
		if (hasOwn(INTRINSICS, intrinsicName)) {
			var value = INTRINSICS[intrinsicName];
			if (value === needsEval) value = doEval(intrinsicName);
			if (typeof value === "undefined" && !allowMissing) throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
			return {
				alias,
				name: intrinsicName,
				value
			};
		}
		throw new $SyntaxError("intrinsic " + name + " does not exist!");
	};
	module.exports = function GetIntrinsic(name, allowMissing) {
		if (typeof name !== "string" || name.length === 0) throw new $TypeError("intrinsic name must be a non-empty string");
		if (arguments.length > 1 && typeof allowMissing !== "boolean") throw new $TypeError("\"allowMissing\" argument must be a boolean");
		if ($exec(/^%?[^%]*%?$/, name) === null) throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
		var parts = stringToPath(name);
		var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
		var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
		var intrinsicRealName = intrinsic.name;
		var value = intrinsic.value;
		var skipFurtherCaching = false;
		var alias = intrinsic.alias;
		if (alias) {
			intrinsicBaseName = alias[0];
			$spliceApply(parts, $concat([0, 1], alias));
		}
		for (var i = 1, isOwn = true; i < parts.length; i += 1) {
			var part = parts[i];
			var first = $strSlice(part, 0, 1);
			var last = $strSlice(part, -1);
			if ((first === "\"" || first === "'" || first === "`" || last === "\"" || last === "'" || last === "`") && first !== last) throw new $SyntaxError("property names with quotes must have matching quotes");
			if (part === "constructor" || !isOwn) skipFurtherCaching = true;
			intrinsicBaseName += "." + part;
			intrinsicRealName = "%" + intrinsicBaseName + "%";
			if (hasOwn(INTRINSICS, intrinsicRealName)) value = INTRINSICS[intrinsicRealName];
			else if (value != null) {
				if (!(part in value)) {
					if (!allowMissing) throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
					return;
				}
				if ($gOPD && i + 1 >= parts.length) {
					var desc = $gOPD(value, part);
					isOwn = !!desc;
					if (isOwn && "get" in desc && !("originalValue" in desc.get)) value = desc.get;
					else value = value[part];
				} else {
					isOwn = hasOwn(value, part);
					value = value[part];
				}
				if (isOwn && !skipFurtherCaching) INTRINSICS[intrinsicRealName] = value;
			}
		}
		return value;
	};
}));
// node_modules/has-tostringtag/shams.js
var require_shams = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var hasSymbols = require_shams$1();
	/** @type {import('.')} */
	module.exports = function hasToStringTagShams() {
		return hasSymbols() && !!Symbol.toStringTag;
	};
}));
// node_modules/es-set-tostringtag/index.js
var require_es_set_tostringtag = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $defineProperty = require_get_intrinsic()("%Object.defineProperty%", true);
	var hasToStringTag = require_shams()();
	var hasOwn = require_hasown();
	var $TypeError = require_type();
	var toStringTag = hasToStringTag ? Symbol.toStringTag : null;
	/** @type {import('.')} */
	module.exports = function setToStringTag(object, value) {
		var overrideIfSet = arguments.length > 2 && !!arguments[2] && arguments[2].force;
		var nonConfigurable = arguments.length > 2 && !!arguments[2] && arguments[2].nonConfigurable;
		if (typeof overrideIfSet !== "undefined" && typeof overrideIfSet !== "boolean" || typeof nonConfigurable !== "undefined" && typeof nonConfigurable !== "boolean") throw new $TypeError("if provided, the `overrideIfSet` and `nonConfigurable` options must be booleans");
		if (toStringTag && (overrideIfSet || !hasOwn(object, toStringTag))) {
			if ($defineProperty) $defineProperty(object, toStringTag, {
				configurable: !nonConfigurable,
				enumerable: false,
				value,
				writable: false
			});
			else object[toStringTag] = value;
		}
	};
}));
// node_modules/form-data/lib/populate.js
var require_populate = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(dst, src) {
		Object.keys(src).forEach(function(prop) {
			dst[prop] = dst[prop] || src[prop];
		});
		return dst;
	};
}));
var FormData_default = (/* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var CombinedStream = require_combined_stream();
	var util = __require("util");
	var path = __require("path");
	var http = __require("http");
	var https = __require("https");
	var parseUrl = __require("url").parse;
	var fs = __require("fs");
	var Stream = __require("stream").Stream;
	var crypto = __require("crypto");
	var mime = require_mime_types();
	var asynckit = require_asynckit();
	var setToStringTag = require_es_set_tostringtag();
	var hasOwn = require_hasown();
	var populate = require_populate();
	/**
	* Escape CR, LF, and `"` in a multipart `name`/`filename` parameter, so a field
	* name or filename can not break out of its header line to inject headers or
	* smuggle additional parts. Matches the WHATWG HTML multipart/form-data encoding.
	*
	* @param {string} str - the parameter value to escape
	* @returns {string} the escaped value
	*/
	function escapeHeaderParam(str) {
		return String(str).replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/"/g, "%22");
	}
	/**
	* Create readable "multipart/form-data" streams.
	* Can be used to submit forms
	* and file uploads to other web applications.
	*
	* @constructor
	* @param {object} options - Properties to be added/overriden for FormData and CombinedStream
	*/
	function FormData(options) {
		if (!(this instanceof FormData)) return new FormData(options);
		this._overheadLength = 0;
		this._valueLength = 0;
		this._valuesToMeasure = [];
		CombinedStream.call(this);
		options = options || {};
		for (var option in options) this[option] = options[option];
	}
	util.inherits(FormData, CombinedStream);
	FormData.LINE_BREAK = "\r\n";
	FormData.DEFAULT_CONTENT_TYPE = "application/octet-stream";
	FormData.prototype.append = function(field, value, options) {
		options = options || {};
		if (typeof options === "string") options = { filename: options };
		var append = CombinedStream.prototype.append.bind(this);
		if (typeof value === "number" || value == null) value = String(value);
		if (Array.isArray(value)) {
			this._error(/* @__PURE__ */ new Error("Arrays are not supported."));
			return;
		}
		var header = this._multiPartHeader(field, value, options);
		var footer = this._multiPartFooter();
		append(header);
		append(value);
		append(footer);
		this._trackLength(header, value, options);
	};
	FormData.prototype._trackLength = function(header, value, options) {
		var valueLength = 0;
		if (options.knownLength != null) valueLength += Number(options.knownLength);
		else if (Buffer.isBuffer(value)) valueLength = value.length;
		else if (typeof value === "string") valueLength = Buffer.byteLength(value);
		this._valueLength += valueLength;
		this._overheadLength += Buffer.byteLength(header) + FormData.LINE_BREAK.length;
		if (!value || !value.path && !(value.readable && hasOwn(value, "httpVersion")) && !(value instanceof Stream)) return;
		if (!options.knownLength) this._valuesToMeasure.push(value);
	};
	FormData.prototype._lengthRetriever = function(value, callback) {
		if (hasOwn(value, "fd")) {
			if (value.end != void 0 && value.end != Infinity && value.start != void 0) callback(null, value.end + 1 - (value.start ? value.start : 0));
			else fs.stat(value.path, function(err, stat) {
				if (err) {
					callback(err);
					return;
				}
				callback(null, stat.size - (value.start ? value.start : 0));
			});
		} else if (hasOwn(value, "httpVersion")) callback(null, Number(value.headers["content-length"]));
		else if (hasOwn(value, "httpModule")) {
			value.on("response", function(response) {
				value.pause();
				callback(null, Number(response.headers["content-length"]));
			});
			value.resume();
		} else callback("Unknown stream");
	};
	FormData.prototype._multiPartHeader = function(field, value, options) {
		if (typeof options.header === "string") return options.header;
		var contentDisposition = this._getContentDisposition(value, options);
		var contentType = this._getContentType(value, options);
		var contents = "";
		var headers = {
			"Content-Disposition": ["form-data", "name=\"" + escapeHeaderParam(field) + "\""].concat(contentDisposition || []),
			"Content-Type": [].concat(contentType || [])
		};
		if (typeof options.header === "object") populate(headers, options.header);
		var header;
		for (var prop in headers) if (hasOwn(headers, prop)) {
			header = headers[prop];
			if (header == null) continue;
			if (!Array.isArray(header)) header = [header];
			if (header.length) contents += prop + ": " + header.join("; ") + FormData.LINE_BREAK;
		}
		return "--" + this.getBoundary() + FormData.LINE_BREAK + contents + FormData.LINE_BREAK;
	};
	FormData.prototype._getContentDisposition = function(value, options) {
		var filename;
		if (typeof options.filepath === "string") filename = path.normalize(options.filepath).replace(/\\/g, "/");
		else if (options.filename || value && (value.name || value.path)) filename = path.basename(options.filename || value && (value.name || value.path));
		else if (value && value.readable && hasOwn(value, "httpVersion")) filename = path.basename(value.client._httpMessage.path || "");
		if (filename) return "filename=\"" + escapeHeaderParam(filename) + "\"";
	};
	FormData.prototype._getContentType = function(value, options) {
		var contentType = options.contentType;
		if (!contentType && value && value.name) contentType = mime.lookup(value.name);
		if (!contentType && value && value.path) contentType = mime.lookup(value.path);
		if (!contentType && value && value.readable && hasOwn(value, "httpVersion")) contentType = value.headers["content-type"];
		if (!contentType && (options.filepath || options.filename)) contentType = mime.lookup(options.filepath || options.filename);
		if (!contentType && value && typeof value === "object") contentType = FormData.DEFAULT_CONTENT_TYPE;
		return contentType;
	};
	FormData.prototype._multiPartFooter = function() {
		return function(next) {
			var footer = FormData.LINE_BREAK;
			if (this._streams.length === 0) footer += this._lastBoundary();
			next(footer);
		}.bind(this);
	};
	FormData.prototype._lastBoundary = function() {
		return "--" + this.getBoundary() + "--" + FormData.LINE_BREAK;
	};
	FormData.prototype.getHeaders = function(userHeaders) {
		var header;
		var formHeaders = { "content-type": "multipart/form-data; boundary=" + this.getBoundary() };
		for (header in userHeaders) if (hasOwn(userHeaders, header)) formHeaders[header.toLowerCase()] = userHeaders[header];
		return formHeaders;
	};
	FormData.prototype.setBoundary = function(boundary) {
		if (typeof boundary !== "string") throw new TypeError("FormData boundary must be a string");
		this._boundary = boundary;
	};
	FormData.prototype.getBoundary = function() {
		if (!this._boundary) this._generateBoundary();
		return this._boundary;
	};
	FormData.prototype.getBuffer = function() {
		var dataBuffer = new Buffer.alloc(0);
		var boundary = this.getBoundary();
		for (var i = 0, len = this._streams.length; i < len; i++) if (typeof this._streams[i] !== "function") {
			if (Buffer.isBuffer(this._streams[i])) dataBuffer = Buffer.concat([dataBuffer, this._streams[i]]);
			else dataBuffer = Buffer.concat([dataBuffer, Buffer.from(this._streams[i])]);
			if (typeof this._streams[i] !== "string" || this._streams[i].substring(2, boundary.length + 2) !== boundary) dataBuffer = Buffer.concat([dataBuffer, Buffer.from(FormData.LINE_BREAK)]);
		}
		return Buffer.concat([dataBuffer, Buffer.from(this._lastBoundary())]);
	};
	FormData.prototype._generateBoundary = function() {
		this._boundary = "--------------------------" + crypto.randomBytes(12).toString("hex");
	};
	FormData.prototype.getLengthSync = function() {
		var knownLength = this._overheadLength + this._valueLength;
		if (this._streams.length) knownLength += this._lastBoundary().length;
		if (!this.hasKnownLength()) this._error(/* @__PURE__ */ new Error("Cannot calculate proper length in synchronous way."));
		return knownLength;
	};
	FormData.prototype.hasKnownLength = function() {
		var hasKnownLength = true;
		if (this._valuesToMeasure.length) hasKnownLength = false;
		return hasKnownLength;
	};
	FormData.prototype.getLength = function(cb) {
		var knownLength = this._overheadLength + this._valueLength;
		if (this._streams.length) knownLength += this._lastBoundary().length;
		if (!this._valuesToMeasure.length) {
			process.nextTick(cb.bind(this, null, knownLength));
			return;
		}
		asynckit.parallel(this._valuesToMeasure, this._lengthRetriever, function(err, values) {
			if (err) {
				cb(err);
				return;
			}
			values.forEach(function(length) {
				knownLength += length;
			});
			cb(null, knownLength);
		});
	};
	FormData.prototype.submit = function(params, cb) {
		var request;
		var options;
		var defaults = { method: "post" };
		if (typeof params === "string") {
			params = parseUrl(params);
			options = populate({
				port: params.port,
				path: params.pathname,
				host: params.hostname,
				protocol: params.protocol
			}, defaults);
		} else {
			options = populate(params, defaults);
			if (!options.port) options.port = options.protocol === "https:" ? 443 : 80;
		}
		options.headers = this.getHeaders(params.headers);
		if (options.protocol === "https:") request = https.request(options);
		else request = http.request(options);
		this.getLength(function(err, length) {
			if (err && err !== "Unknown stream") {
				this._error(err);
				return;
			}
			if (length) request.setHeader("Content-Length", length);
			this.pipe(request);
			if (cb) {
				var onResponse;
				var callback = function(error, responce) {
					request.removeListener("error", callback);
					request.removeListener("response", onResponse);
					return cb.call(this, error, responce);
				};
				onResponse = callback.bind(this, null);
				request.on("error", callback);
				request.on("response", onResponse);
			}
		}.bind(this));
		return request;
	};
	FormData.prototype._error = function(err) {
		if (!this.error) {
			this.error = err;
			this.pause();
			this.emit("error", err);
		}
	};
	FormData.prototype.toString = function() {
		return "[object FormData]";
	};
	setToStringTag(FormData.prototype, "FormData");
	module.exports = FormData;
})))(), 1)).default;
// node_modules/axios/lib/platform/node/classes/Buffer.js
var Buffer_default = {
	isBufferAvailable() {
		return typeof Buffer !== "undefined";
	},
	from(value) {
		return Buffer.from(value);
	}
};
/**
* Determines if the given thing is a array or js object.
*
* @param {string} thing - The object or array to be visited.
*
* @returns {boolean}
*/
function isVisitable(thing) {
	return utils_default.isPlainObject(thing) || utils_default.isArray(thing);
}
/**
* It removes the brackets from the end of a string
*
* @param {string} key - The key of the parameter.
*
* @returns {string} the key without the brackets.
*/
function removeBrackets(key) {
	return utils_default.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
/**
* It takes a path, a key, and a boolean, and returns a string
*
* @param {string} path - The path to the current key.
* @param {string} key - The key of the current object being iterated over.
* @param {string} dots - If true, the key will be rendered with dots instead of brackets.
*
* @returns {string} The path to the current key.
*/
function renderKey(path, key, dots) {
	if (!path) return key;
	return path.concat(key).map(function each(token, i) {
		token = removeBrackets(token);
		return !dots && i ? "[" + token + "]" : token;
	}).join(dots ? "." : "");
}
/**
* If the array is an array and none of its elements are visitable, then it's a flat array.
*
* @param {Array<any>} arr - The array to check
*
* @returns {boolean}
*/
function isFlatArray(arr) {
	return utils_default.isArray(arr) && !arr.some(isVisitable);
}
var predicates = utils_default.toFlatObject(utils_default, {}, null, function filter(prop) {
	return /^is[A-Z]/.test(prop);
});
/**
* Convert a data object to FormData
*
* @param {Object} obj
* @param {?Object} [formData]
* @param {?Object} [options]
* @param {Function} [options.visitor]
* @param {Boolean} [options.metaTokens = true]
* @param {Boolean} [options.dots = false]
* @param {?Boolean} [options.indexes = false]
*
* @returns {Object}
**/
/**
* It converts an object into a FormData object
*
* @param {Object<any, any>} obj - The object to convert to form data.
* @param {string} formData - The FormData object to append to.
* @param {Object<string, any>} options
*
* @returns
*/
function toFormData(obj, formData, options) {
	if (!utils_default.isObject(obj)) throw new TypeError("target must be an object");
	formData = formData || new (FormData_default || FormData)();
	const option = (name, fallback) => {
		const value = utils_default.getSafeProp(options, name);
		return utils_default.isUndefined(value) ? fallback : value;
	};
	const metaTokens = option("metaTokens", true);
	const visitor = option("visitor") || defaultVisitor;
	const dots = option("dots", false);
	const indexes = option("indexes", false);
	const _Blob = option("Blob") || typeof Blob !== "undefined" && Blob;
	const maxDepth = option("maxDepth", 100);
	const useBlob = _Blob && utils_default.isSpecCompliantForm(formData);
	const stack = [];
	if (!utils_default.isFunction(visitor)) throw new TypeError("visitor must be a function");
	function convertValue(value) {
		if (value === null) return "";
		if (utils_default.isDate(value)) return value.toISOString();
		if (utils_default.isBoolean(value)) return value.toString();
		if (!useBlob && utils_default.isBlob(value)) throw new AxiosError("Blob is not supported. Use a Buffer instead.");
		if (utils_default.isArrayBuffer(value) || utils_default.isTypedArray(value)) {
			if (useBlob && typeof _Blob === "function") return new _Blob([value]);
			if (Buffer_default && Buffer_default.isBufferAvailable()) return Buffer_default.from(value);
			throw new AxiosError("Blob is not supported. Use a Buffer instead.", AxiosError.ERR_NOT_SUPPORT);
		}
		return value;
	}
	function throwIfMaxDepthExceeded(depth) {
		if (depth > maxDepth) throw new AxiosError("Object is too deeply nested (" + depth + " levels). Max depth: " + maxDepth, AxiosError.ERR_FORM_DATA_DEPTH_EXCEEDED);
	}
	function stringifyWithDepthLimit(value, depth) {
		if (maxDepth === Infinity) return JSON.stringify(value);
		const ancestors = [];
		return JSON.stringify(value, function limitDepth(_key, currentValue) {
			if (!utils_default.isObject(currentValue)) return currentValue;
			while (ancestors.length && ancestors[ancestors.length - 1] !== this) ancestors.pop();
			ancestors.push(currentValue);
			throwIfMaxDepthExceeded(depth + ancestors.length - 1);
			return currentValue;
		});
	}
	/**
	* Default visitor.
	*
	* @param {*} value
	* @param {String|Number} key
	* @param {Array<String|Number>} path
	* @this {FormData}
	*
	* @returns {boolean} return true to visit the each prop of the value recursively
	*/
	function defaultVisitor(value, key, path) {
		let arr = value;
		if (utils_default.isReactNative(formData) && utils_default.isReactNativeBlob(value)) {
			formData.append(renderKey(path, key, dots), convertValue(value));
			return false;
		}
		if (value && !path && typeof value === "object") {
			if (utils_default.endsWith(key, "{}")) {
				key = metaTokens ? key : key.slice(0, -2);
				value = stringifyWithDepthLimit(value, 1);
			} else if (utils_default.isArray(value) && isFlatArray(value) || (utils_default.isFileList(value) || utils_default.endsWith(key, "[]")) && (arr = utils_default.toArray(value))) {
				key = removeBrackets(key);
				arr.forEach(function each(el, index) {
					!(utils_default.isUndefined(el) || el === null) && formData.append(indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]", convertValue(el));
				});
				return false;
			}
		}
		if (isVisitable(value)) return true;
		formData.append(renderKey(path, key, dots), convertValue(value));
		return false;
	}
	const exposedHelpers = Object.assign(predicates, {
		defaultVisitor,
		convertValue,
		isVisitable
	});
	function build(value, path, depth = 0) {
		if (utils_default.isUndefined(value)) return;
		throwIfMaxDepthExceeded(depth);
		if (stack.indexOf(value) !== -1) throw new Error("Circular reference detected in " + path.join("."));
		stack.push(value);
		utils_default.forEach(value, function each(el, key) {
			if ((!(utils_default.isUndefined(el) || el === null) && visitor.call(formData, el, utils_default.isString(key) ? key.trim() : key, path, exposedHelpers)) === true) build(el, path ? path.concat(key) : [key], depth + 1);
		});
		stack.pop();
	}
	if (!utils_default.isObject(obj)) throw new TypeError("data must be an object");
	build(obj);
	return formData;
}
// node_modules/axios/lib/helpers/AxiosURLSearchParams.js
/**
* It encodes a string by replacing all characters that are not in the unreserved set with
* their percent-encoded equivalents
*
* @param {string} str - The string to encode.
*
* @returns {string} The encoded string.
*/
function encode$2(str) {
	const charMap = {
		"!": "%21",
		"'": "%27",
		"(": "%28",
		")": "%29",
		"~": "%7E",
		"%20": "+"
	};
	return encodeURIComponent(str).replace(/[!'()~]|%20/g, function replacer(match) {
		return charMap[match];
	});
}
/**
* It takes a params object and converts it to a FormData object
*
* @param {Object<string, any>} params - The parameters to be converted to a FormData object.
* @param {Object<string, any>} options - The options object passed to the Axios constructor.
*
* @returns {void}
*/
function AxiosURLSearchParams(params, options) {
	this._pairs = [];
	params && toFormData(params, this, options);
}
var prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
	this._pairs.push([name, value]);
};
prototype.toString = function toString(encoder) {
	const _encode = encoder ? (value) => encoder.call(this, value, encode$2) : encode$2;
	return this._pairs.map(function each(pair) {
		return _encode(pair[0]) + "=" + _encode(pair[1]);
	}, "").join("&");
};
// node_modules/axios/lib/helpers/buildURL.js
/**
* It replaces URL-encoded forms of `:`, `$`, `,`, and spaces with
* their plain counterparts (`:`, `$`, `,`, `+`).
*
* @param {string} val The value to be encoded.
*
* @returns {string} The encoded value.
*/
function encode$1(val) {
	return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
/**
* Build a URL by appending params to the end
*
* @param {string} url The base of the url (e.g., http://www.google.com)
* @param {object} [params] The params to be appended
* @param {?(object|Function)} options
*
* @returns {string} The formatted url
*/
function buildURL(url, params, options) {
	if (!params) return url;
	url = url || "";
	const _options = utils_default.isFunction(options) ? { serialize: options } : options;
	const _encode = utils_default.getSafeProp(_options, "encode") || encode$1;
	const serializeFn = utils_default.getSafeProp(_options, "serialize");
	let serializedParams;
	if (serializeFn) serializedParams = serializeFn(params, _options);
	else serializedParams = utils_default.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, _options).toString(_encode);
	if (serializedParams) {
		const hashmarkIndex = url.indexOf("#");
		if (hashmarkIndex !== -1) url = url.slice(0, hashmarkIndex);
		url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
	}
	return url;
}
// node_modules/axios/lib/core/InterceptorManager.js
var $internals = Symbol("internals");
function countHandlers(handlers) {
	return handlers ? handlers.length : 0;
}
function trimHandlers(handlers) {
	if (!handlers) return;
	while (handlers.length && handlers[handlers.length - 1] === null) handlers.pop();
}
function syncHandlerEntries(manager, internals) {
	const handlers = manager.handlers;
	const length = countHandlers(handlers);
	if (handlers !== internals.handlersRef) {
		internals.handlersRef = handlers;
		internals.handlerEntries.clear();
	} else if (length !== internals.handlersLength) {
		if (!length) internals.handlerEntries.clear();
		else internals.handlerEntries.forEach(function removeStaleEntry(entry, id) {
			if (handlers[entry.index] !== entry.handler) internals.handlerEntries.delete(id);
		});
	}
	internals.handlersLength = length;
}
var InterceptorManager = class {
	constructor() {
		this.handlers = [];
		this[$internals] = {
			handlersRef: this.handlers,
			handlersLength: this.handlers.length,
			handlerEntries: /* @__PURE__ */ new Map(),
			iterationDepth: 0,
			nextId: 0
		};
	}
	/**
	* Add a new interceptor to the stack
	*
	* @param {Function} fulfilled The function to handle `then` for a `Promise`
	* @param {Function} rejected The function to handle `reject` for a `Promise`
	* @param {Object} options The options for the interceptor, synchronous and runWhen
	*
	* @return {Number} An ID used to remove interceptor later
	*/
	use(fulfilled, rejected, options) {
		const handler = {
			fulfilled,
			rejected,
			synchronous: options ? options.synchronous : false,
			runWhen: options ? options.runWhen : null
		};
		const internals = this[$internals];
		if (this.handlers == null) this.handlers = [];
		syncHandlerEntries(this, internals);
		const id = internals.nextId++;
		this.handlers.push(handler);
		internals.handlerEntries.set(id, {
			handler,
			index: this.handlers.length - 1
		});
		internals.handlersLength = this.handlers.length;
		return id;
	}
	/**
	* Remove an interceptor from the stack
	*
	* @param {Number} id The ID that was returned by `use`
	*
	* @returns {void}
	*/
	eject(id) {
		const internals = this[$internals];
		syncHandlerEntries(this, internals);
		const entry = internals.handlerEntries.get(id);
		if (entry) {
			internals.handlerEntries.delete(id);
			if (this.handlers[entry.index] !== entry.handler) return;
			this.handlers[entry.index] = null;
			if (!internals.iterationDepth) {
				trimHandlers(this.handlers);
				internals.handlersLength = this.handlers.length;
			}
		}
	}
	/**
	* Clear all interceptors from the stack
	*
	* @returns {void}
	*/
	clear() {
		if (this.handlers) {
			this.handlers = [];
			syncHandlerEntries(this, this[$internals]);
		}
	}
	/**
	* Iterate over all the registered interceptors
	*
	* This method is particularly useful for skipping over any
	* interceptors that may have become `null` calling `eject`.
	*
	* @param {Function} fn The function to call for each interceptor
	*
	* @returns {void}
	*/
	forEach(fn) {
		const internals = this[$internals];
		syncHandlerEntries(this, internals);
		internals.iterationDepth++;
		try {
			utils_default.forEach(this.handlers, function forEachHandler(h) {
				if (h !== null) fn(h);
			});
		} finally {
			if (!--internals.iterationDepth) {
				syncHandlerEntries(this, internals);
				trimHandlers(this.handlers);
				internals.handlersLength = countHandlers(this.handlers);
			}
		}
	}
};
// node_modules/axios/lib/defaults/transitional.js
var transitional_default = {
	silentJSONParsing: true,
	forcedJSONParsing: true,
	clarifyTimeoutError: false,
	legacyInterceptorReqResOrdering: true,
	advertiseZstdAcceptEncoding: false,
	validateStatusUndefinedResolves: true
};
// node_modules/axios/lib/platform/node/classes/URLSearchParams.js
var URLSearchParams_default = url.URLSearchParams;
// node_modules/axios/lib/platform/node/index.js
var ALPHA = "abcdefghijklmnopqrstuvwxyz";
var DIGIT = "0123456789";
var ALPHABET = {
	DIGIT,
	ALPHA,
	ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};
var generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
	let str = "";
	const { length } = alphabet;
	const randomValues = new Uint32Array(size);
	crypto$1.randomFillSync(randomValues);
	for (let i = 0; i < size; i++) str += alphabet[randomValues[i] % length];
	return str;
};
var node_default = {
	isNode: true,
	classes: {
		URLSearchParams: URLSearchParams_default,
		FormData: FormData_default,
		Blob: typeof Blob !== "undefined" && Blob || null
	},
	ALPHABET,
	generateString,
	protocols: [
		"http",
		"https",
		"file",
		"data"
	]
};
// node_modules/axios/lib/platform/common/utils.js
var utils_exports = /* @__PURE__ */ __exportAll({
	hasBrowserEnv: () => hasBrowserEnv,
	hasStandardBrowserEnv: () => hasStandardBrowserEnv,
	hasStandardBrowserWebWorkerEnv: () => hasStandardBrowserWebWorkerEnv,
	navigator: () => _navigator,
	origin: () => origin
});
var hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
var _navigator = typeof navigator === "object" && navigator || void 0;
/**
* Determine if we're running in a standard browser environment
*
* This allows axios to run in a web worker, and react-native.
* Both environments support XMLHttpRequest, but not fully standard globals.
*
* web workers:
*  typeof window -> undefined
*  typeof document -> undefined
*
* react-native:
*  navigator.product -> 'ReactNative'
* nativescript
*  navigator.product -> 'NativeScript' or 'NS'
*
* @returns {boolean}
*/
var hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || [
	"ReactNative",
	"NativeScript",
	"NS"
].indexOf(_navigator.product) < 0);
/**
* Determine if we're running in a standard browser webWorker environment
*
* Although the `isStandardBrowserEnv` method indicates that
* `allows axios to run in a web worker`, the WebWorker will still be
* filtered out due to its judgment standard
* `typeof window !== 'undefined' && typeof document !== 'undefined'`.
* This leads to a problem when axios post `FormData` in webWorker
*/
var hasStandardBrowserWebWorkerEnv = (() => {
	return typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
var origin = hasBrowserEnv && window.location.href || "http://localhost";
// node_modules/axios/lib/platform/index.js
var platform_default = {
	...utils_exports,
	...node_default
};
// node_modules/axios/lib/helpers/toURLEncodedForm.js
function toURLEncodedForm(data, options) {
	return toFormData(data, new platform_default.classes.URLSearchParams(), {
		visitor: function(value, key, path, helpers) {
			if (platform_default.isNode && utils_default.isBuffer(value)) {
				this.append(key, value.toString("base64"));
				return false;
			}
			return helpers.defaultVisitor.apply(this, arguments);
		},
		...options
	});
}
// node_modules/axios/lib/helpers/formDataToJSON.js
var MAX_DEPTH = 100;
function throwIfDepthExceeded(index) {
	if (index > MAX_DEPTH) throw new AxiosError("FormData field is too deeply nested (" + index + " levels). Max depth: " + MAX_DEPTH, AxiosError.ERR_FORM_DATA_DEPTH_EXCEEDED);
}
/**
* It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
*
* @param {string} name - The name of the property to get.
*
* @returns An array of strings.
*/
function parsePropPath(name) {
	const path = [];
	const pattern = /[^.[\]]+|\[([^.[\]]*)]/g;
	let match;
	while ((match = pattern.exec(name)) !== null) {
		throwIfDepthExceeded(path.length);
		path.push(match[0] === "[]" ? "" : match[1] || match[0]);
	}
	return path;
}
/**
* Convert an array to an object.
*
* @param {Array<any>} arr - The array to convert to an object.
*
* @returns An object with the same keys and values as the array.
*/
function arrayToObject(arr) {
	const obj = {};
	const keys = Object.keys(arr);
	let i;
	const len = keys.length;
	let key;
	for (i = 0; i < len; i++) {
		key = keys[i];
		obj[key] = arr[key];
	}
	return obj;
}
/**
* It takes a FormData object and returns a JavaScript object
*
* @param {string} formData The FormData object to convert to JSON.
*
* @returns {Object<string, any> | null} The converted object.
*/
function formDataToJSON(formData) {
	function buildPath(path, value, target, index) {
		throwIfDepthExceeded(index);
		let name = path[index++];
		if (name === "__proto__") return true;
		const isNumericKey = Number.isFinite(+name);
		const isLast = index >= path.length;
		name = !name && utils_default.isArray(target) ? target.length : name;
		if (isLast) {
			if (utils_default.hasOwnProp(target, name)) target[name] = utils_default.isArray(target[name]) ? target[name].concat(value) : [target[name], value];
			else target[name] = value;
			return !isNumericKey;
		}
		if (!utils_default.hasOwnProp(target, name) || !utils_default.isObject(target[name])) target[name] = [];
		if (buildPath(path, value, target[name], index) && utils_default.isArray(target[name])) target[name] = arrayToObject(target[name]);
		return !isNumericKey;
	}
	if (utils_default.isFormData(formData) && utils_default.isFunction(formData.entries)) {
		const obj = {};
		utils_default.forEachEntry(formData, (name, value) => {
			buildPath(parsePropPath(name), value, obj, 0);
		});
		return obj;
	}
	return null;
}
// node_modules/axios/lib/core/methodList.js
var methodList = Object.freeze([
	"get",
	"delete",
	"head",
	"options",
	"post",
	"put",
	"patch",
	"purge",
	"link",
	"unlink",
	"query"
]);
// node_modules/axios/lib/defaults/index.js
var own = (obj, key) => obj != null && utils_default.hasOwnProp(obj, key) ? obj[key] : void 0;
/**
* It takes a string, tries to parse it, and if it fails, it returns the stringified version
* of the input
*
* @param {any} rawValue - The value to be stringified.
* @param {Function} parser - A function that parses a string into a JavaScript object.
* @param {Function} encoder - A function that takes a value and returns a string.
*
* @returns {string} A stringified version of the rawValue.
*/
function stringifySafely(rawValue, parser, encoder) {
	if (utils_default.isString(rawValue)) try {
		(parser || JSON.parse)(rawValue);
		return utils_default.trim(rawValue);
	} catch (e) {
		if (e.name !== "SyntaxError") throw e;
	}
	return (encoder || JSON.stringify)(rawValue);
}
var defaults = {
	transitional: transitional_default,
	adapter: [
		"xhr",
		"http",
		"fetch"
	],
	transformRequest: [function transformRequest(data, headers) {
		const contentType = headers.getContentType() || "";
		const hasJSONContentType = contentType.indexOf("application/json") > -1;
		const isObjectPayload = utils_default.isObject(data);
		if (isObjectPayload && utils_default.isHTMLForm(data)) data = new FormData(data);
		if (utils_default.isFormData(data)) return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
		if (utils_default.isArrayBuffer(data) || utils_default.isBuffer(data) || utils_default.isStream(data) || utils_default.isFile(data) || utils_default.isBlob(data) || utils_default.isReadableStream(data)) return data;
		if (utils_default.isArrayBufferView(data)) return data.buffer;
		if (utils_default.isURLSearchParams(data)) {
			headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
			return data.toString();
		}
		let isFileList;
		if (isObjectPayload) {
			const formSerializer = own(this, "formSerializer");
			if (contentType.indexOf("application/x-www-form-urlencoded") > -1) return toURLEncodedForm(data, formSerializer).toString();
			if ((isFileList = utils_default.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
				const env = own(this, "env");
				const _FormData = env && env.FormData;
				return toFormData(isFileList ? { "files[]": data } : data, _FormData && new _FormData(), formSerializer);
			}
		}
		if (isObjectPayload || hasJSONContentType) {
			headers.setContentType("application/json", false);
			return stringifySafely(data);
		}
		return data;
	}],
	transformResponse: [function transformResponse(data) {
		const transitional = own(this, "transitional") || defaults.transitional;
		const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
		const responseType = own(this, "responseType");
		const JSONRequested = responseType === "json";
		if (utils_default.isResponse(data) || utils_default.isReadableStream(data)) return data;
		if (data && utils_default.isString(data) && (forcedJSONParsing && !responseType || JSONRequested)) {
			const strictJSONParsing = !(transitional && transitional.silentJSONParsing) && JSONRequested;
			try {
				return JSON.parse(data, own(this, "parseReviver"));
			} catch (e) {
				if (strictJSONParsing) {
					if (e.name === "SyntaxError") throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, own(this, "response"));
					throw e;
				}
			}
		}
		return data;
	}],
	/**
	* A timeout in milliseconds to abort a request. If set to 0 (default) a
	* timeout is not created.
	*/
	timeout: 0,
	xsrfCookieName: "XSRF-TOKEN",
	xsrfHeaderName: "X-XSRF-TOKEN",
	maxContentLength: -1,
	maxBodyLength: -1,
	env: {
		FormData: platform_default.classes.FormData,
		Blob: platform_default.classes.Blob
	},
	validateStatus: function validateStatus(status) {
		return status >= 200 && status < 300;
	},
	headers: { common: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": void 0
	} }
};
utils_default.forEach(methodList, (method) => {
	defaults.headers[method] = {};
});
// node_modules/axios/lib/core/transformData.js
/**
* Transform the data for a request or a response
*
* @param {Array|Function} fns A single function or Array of functions
* @param {?Object} response The response object
*
* @returns {*} The resulting transformed data
*/
function transformData(fns, response) {
	const config = this || defaults;
	const context = response || config;
	const headers = AxiosHeaders.from(context.headers);
	let data = context.data;
	utils_default.forEach(fns, function transform(fn) {
		data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
	});
	headers.normalize();
	return data;
}
// node_modules/axios/lib/cancel/isCancel.js
function isCancel(value) {
	return !!(value && value.__CANCEL__);
}
// node_modules/axios/lib/cancel/CanceledError.js
var CanceledError = class extends AxiosError {
	/**
	* A `CanceledError` is an object that is thrown when an operation is canceled.
	*
	* @param {string=} message The message.
	* @param {Object=} config The config.
	* @param {Object=} request The request.
	*
	* @returns {CanceledError} The created error.
	*/
	constructor(message, config, request) {
		super(message == null ? "canceled" : message, AxiosError.ERR_CANCELED, config, request);
		this.name = "CanceledError";
		this.__CANCEL__ = true;
	}
};
// node_modules/axios/lib/core/settle.js
/**
* Resolve or reject a Promise based on response status.
*
* @param {Function} resolve A function that resolves the promise.
* @param {Function} reject A function that rejects the promise.
* @param {object} response The response.
*
* @returns {object} The response.
*/
function settle(resolve, reject, response) {
	const validateStatus = response.config.validateStatus;
	if (!response.status || !validateStatus || validateStatus(response.status)) resolve(response);
	else reject(new AxiosError("Request failed with status code " + response.status, response.status >= 400 && response.status < 500 ? AxiosError.ERR_BAD_REQUEST : AxiosError.ERR_BAD_RESPONSE, response.config, response.request, response));
}
// node_modules/axios/lib/helpers/isAbsoluteURL.js
/**
* Determines whether the specified URL is absolute
*
* @param {string} url The URL to test
*
* @returns {boolean} True if the specified URL is absolute, otherwise false
*/
function isAbsoluteURL(url) {
	if (typeof url !== "string") return false;
	return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
// node_modules/axios/lib/helpers/combineURLs.js
/**
* Creates a new URL by combining the specified URLs
*
* @param {string} baseURL The base URL
* @param {string} relativeURL The relative URL
*
* @returns {string} The combined URL
*/
function combineURLs(baseURL, relativeURL) {
	if (!relativeURL) return baseURL;
	let end = baseURL.length;
	while (end > 0 && baseURL.charCodeAt(end - 1) === 47) end--;
	return baseURL.slice(0, end) + "/" + relativeURL.replace(/^\/+/, "");
}
// node_modules/axios/lib/helpers/normalizeURLForProtocolCheck.js
var urlParserControlCharacters = /[\t\n\r]/g;
/**
* Match WHATWG URL preprocessing before checking a URL's protocol.
*
* @param {string} url
*
* @returns {string}
*/
function normalizeURLForProtocolCheck(url) {
	if (typeof url !== "string") return url;
	let start = 0;
	while (start < url.length && url.charCodeAt(start) <= 32) start++;
	return url.slice(start).replace(urlParserControlCharacters, "");
}
// node_modules/axios/lib/core/buildFullPath.js
var malformedHttpProtocol = /^https?:(?!\/\/)/i;
function redactFragment(fragment) {
	if (!fragment) return fragment;
	return fragment.replace(/(^|&)([^=&]*=)?[^&]+/g, (match, separator, parameterName = "") => {
		return `${separator}${parameterName}${REDACTED}`;
	});
}
function redactSensitiveURLParts(url) {
	const redactedURL = url.replace(/^(https?:\/{0,2})[^/?#]*@/i, `$1${REDACTED}@`);
	const fragmentIndex = redactedURL.indexOf("#");
	const redactedURLWithoutFragment = (fragmentIndex === -1 ? redactedURL : redactedURL.slice(0, fragmentIndex)).replace(/([?&][^=&#]*=)[^&#]*/g, `$1${REDACTED}`);
	if (fragmentIndex === -1) return redactedURLWithoutFragment;
	return `${redactedURLWithoutFragment}#${redactFragment(redactedURL.slice(fragmentIndex + 1))}`;
}
function assertValidHttpProtocolURL(url, config) {
	if (typeof url === "string") {
		const normalizedURL = normalizeURLForProtocolCheck(url);
		if (malformedHttpProtocol.test(normalizedURL)) throw new AxiosError(`Invalid URL ${JSON.stringify(redactSensitiveURLParts(normalizedURL))}: missing "//" after protocol`, AxiosError.ERR_INVALID_URL, config);
	}
}
/**
* Creates a new URL by combining the baseURL with the requestedURL,
* only when the requestedURL is not already an absolute URL.
* If the requestURL is absolute, this function returns the requestedURL untouched.
*
* @param {string} baseURL The base URL
* @param {string} requestedURL Absolute or relative URL to combine
*
* @returns {string} The combined full path
*/
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls, config) {
	assertValidHttpProtocolURL(requestedURL, config);
	let isRelativeUrl = !isAbsoluteURL(requestedURL);
	if (baseURL && (isRelativeUrl || allowAbsoluteUrls === false)) {
		assertValidHttpProtocolURL(baseURL, config);
		return combineURLs(baseURL, requestedURL);
	}
	return requestedURL;
}
// node_modules/proxy-from-env/index.js
var DEFAULT_PORTS$1 = {
	ftp: 21,
	gopher: 70,
	http: 80,
	https: 443,
	ws: 80,
	wss: 443
};
function parseUrl(urlString) {
	try {
		return new URL(urlString);
	} catch {
		return null;
	}
}
/**
* @param {string|object|URL} url - The URL as a string or URL instance, or a
*   compatible object (such as the result from legacy url.parse).
* @return {string} The URL of the proxy that should handle the request to the
*  given URL. If no proxy is set, this will be an empty string.
*/
function getProxyForUrl(url) {
	var parsedUrl = (typeof url === "string" ? parseUrl(url) : url) || {};
	var proto = parsedUrl.protocol;
	var hostname = parsedUrl.host;
	var port = parsedUrl.port;
	if (typeof hostname !== "string" || !hostname || typeof proto !== "string") return "";
	proto = proto.split(":", 1)[0];
	hostname = hostname.replace(/:\d*$/, "");
	port = parseInt(port) || DEFAULT_PORTS$1[proto] || 0;
	if (!shouldProxy(hostname, port)) return "";
	var proxy = getEnv(proto + "_proxy") || getEnv("all_proxy");
	if (proxy && proxy.indexOf("://") === -1) proxy = proto + "://" + proxy;
	return proxy;
}
/**
* Determines whether a given URL should be proxied.
*
* @param {string} hostname - The host name of the URL.
* @param {number} port - The effective port of the URL.
* @returns {boolean} Whether the given URL should be proxied.
* @private
*/
function shouldProxy(hostname, port) {
	var NO_PROXY = getEnv("no_proxy").toLowerCase();
	if (!NO_PROXY) return true;
	if (NO_PROXY === "*") return false;
	return NO_PROXY.split(/[,\s]/).every(function(proxy) {
		if (!proxy) return true;
		var parsedProxy = proxy.match(/^(.+):(\d+)$/);
		var parsedProxyHostname = parsedProxy ? parsedProxy[1] : proxy;
		var parsedProxyPort = parsedProxy ? parseInt(parsedProxy[2]) : 0;
		if (parsedProxyPort && parsedProxyPort !== port) return true;
		if (!/^[.*]/.test(parsedProxyHostname)) return hostname !== parsedProxyHostname;
		if (parsedProxyHostname.charAt(0) === "*") parsedProxyHostname = parsedProxyHostname.slice(1);
		return !hostname.endsWith(parsedProxyHostname);
	});
}
/**
* Get the value for an environment variable.
*
* @param {string} key - The name of the environment variable.
* @return {string} The value of the environment variable.
* @private
*/
function getEnv(key) {
	return process.env[key.toLowerCase()] || process.env[key.toUpperCase()] || "";
}
// node_modules/ms/index.js
var require_ms = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Helpers.
	*/
	var s = 1e3;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var w = d * 7;
	var y = d * 365.25;
	/**
	* Parse or format the given `val`.
	*
	* Options:
	*
	*  - `long` verbose formatting [false]
	*
	* @param {String|Number} val
	* @param {Object} [options]
	* @throws {Error} throw an error if val is not a non-empty string or a number
	* @return {String|Number}
	* @api public
	*/
	module.exports = function(val, options) {
		options = options || {};
		var type = typeof val;
		if (type === "string" && val.length > 0) return parse(val);
		else if (type === "number" && isFinite(val)) return options.long ? fmtLong(val) : fmtShort(val);
		throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
	};
	/**
	* Parse the given `str` and return milliseconds.
	*
	* @param {String} str
	* @return {Number}
	* @api private
	*/
	function parse(str) {
		str = String(str);
		if (str.length > 100) return;
		var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
		if (!match) return;
		var n = parseFloat(match[1]);
		switch ((match[2] || "ms").toLowerCase()) {
			case "years":
			case "year":
			case "yrs":
			case "yr":
			case "y": return n * y;
			case "weeks":
			case "week":
			case "w": return n * w;
			case "days":
			case "day":
			case "d": return n * d;
			case "hours":
			case "hour":
			case "hrs":
			case "hr":
			case "h": return n * h;
			case "minutes":
			case "minute":
			case "mins":
			case "min":
			case "m": return n * m;
			case "seconds":
			case "second":
			case "secs":
			case "sec":
			case "s": return n * s;
			case "milliseconds":
			case "millisecond":
			case "msecs":
			case "msec":
			case "ms": return n;
			default: return;
		}
	}
	/**
	* Short format for `ms`.
	*
	* @param {Number} ms
	* @return {String}
	* @api private
	*/
	function fmtShort(ms) {
		var msAbs = Math.abs(ms);
		if (msAbs >= d) return Math.round(ms / d) + "d";
		if (msAbs >= h) return Math.round(ms / h) + "h";
		if (msAbs >= m) return Math.round(ms / m) + "m";
		if (msAbs >= s) return Math.round(ms / s) + "s";
		return ms + "ms";
	}
	/**
	* Long format for `ms`.
	*
	* @param {Number} ms
	* @return {String}
	* @api private
	*/
	function fmtLong(ms) {
		var msAbs = Math.abs(ms);
		if (msAbs >= d) return plural(ms, msAbs, d, "day");
		if (msAbs >= h) return plural(ms, msAbs, h, "hour");
		if (msAbs >= m) return plural(ms, msAbs, m, "minute");
		if (msAbs >= s) return plural(ms, msAbs, s, "second");
		return ms + " ms";
	}
	/**
	* Pluralization helper.
	*/
	function plural(ms, msAbs, n, name) {
		var isPlural = msAbs >= n * 1.5;
		return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
	}
}));
// node_modules/debug/src/common.js
var require_common = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* This is the common logic for both the Node.js and web browser
	* implementations of `debug()`.
	*/
	function setup(env) {
		createDebug.debug = createDebug;
		createDebug.default = createDebug;
		createDebug.coerce = coerce;
		createDebug.disable = disable;
		createDebug.enable = enable;
		createDebug.enabled = enabled;
		createDebug.humanize = require_ms();
		createDebug.destroy = destroy;
		Object.keys(env).forEach((key) => {
			createDebug[key] = env[key];
		});
		/**
		* The currently active debug mode names, and names to skip.
		*/
		createDebug.names = [];
		createDebug.skips = [];
		/**
		* Map of special "%n" handling functions, for the debug "format" argument.
		*
		* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
		*/
		createDebug.formatters = {};
		/**
		* Selects a color for a debug namespace
		* @param {String} namespace The namespace string for the debug instance to be colored
		* @return {Number|String} An ANSI color code for the given namespace
		* @api private
		*/
		function selectColor(namespace) {
			let hash = 0;
			for (let i = 0; i < namespace.length; i++) {
				hash = (hash << 5) - hash + namespace.charCodeAt(i);
				hash |= 0;
			}
			return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
		}
		createDebug.selectColor = selectColor;
		/**
		* Create a debugger with the given `namespace`.
		*
		* @param {String} namespace
		* @return {Function}
		* @api public
		*/
		function createDebug(namespace) {
			let prevTime;
			let enableOverride = null;
			let namespacesCache;
			let enabledCache;
			function debug(...args) {
				if (!debug.enabled) return;
				const self = debug;
				const curr = Number(/* @__PURE__ */ new Date());
				self.diff = curr - (prevTime || curr);
				self.prev = prevTime;
				self.curr = curr;
				prevTime = curr;
				args[0] = createDebug.coerce(args[0]);
				if (typeof args[0] !== "string") args.unshift("%O");
				let index = 0;
				args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
					if (match === "%%") return "%";
					index++;
					const formatter = createDebug.formatters[format];
					if (typeof formatter === "function") {
						const val = args[index];
						match = formatter.call(self, val);
						args.splice(index, 1);
						index--;
					}
					return match;
				});
				createDebug.formatArgs.call(self, args);
				(self.log || createDebug.log).apply(self, args);
			}
			debug.namespace = namespace;
			debug.useColors = createDebug.useColors();
			debug.color = createDebug.selectColor(namespace);
			debug.extend = extend;
			debug.destroy = createDebug.destroy;
			Object.defineProperty(debug, "enabled", {
				enumerable: true,
				configurable: false,
				get: () => {
					if (enableOverride !== null) return enableOverride;
					if (namespacesCache !== createDebug.namespaces) {
						namespacesCache = createDebug.namespaces;
						enabledCache = createDebug.enabled(namespace);
					}
					return enabledCache;
				},
				set: (v) => {
					enableOverride = v;
				}
			});
			if (typeof createDebug.init === "function") createDebug.init(debug);
			return debug;
		}
		function extend(namespace, delimiter) {
			const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
			newDebug.log = this.log;
			return newDebug;
		}
		/**
		* Enables a debug mode by namespaces. This can include modes
		* separated by a colon and wildcards.
		*
		* @param {String} namespaces
		* @api public
		*/
		function enable(namespaces) {
			createDebug.save(namespaces);
			createDebug.namespaces = namespaces;
			createDebug.names = [];
			createDebug.skips = [];
			const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
			for (const ns of split) if (ns[0] === "-") createDebug.skips.push(ns.slice(1));
			else createDebug.names.push(ns);
		}
		/**
		* Checks if the given string matches a namespace template, honoring
		* asterisks as wildcards.
		*
		* @param {String} search
		* @param {String} template
		* @return {Boolean}
		*/
		function matchesTemplate(search, template) {
			let searchIndex = 0;
			let templateIndex = 0;
			let starIndex = -1;
			let matchIndex = 0;
			while (searchIndex < search.length) if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
				if (template[templateIndex] === "*") {
					starIndex = templateIndex;
					matchIndex = searchIndex;
					templateIndex++;
				} else {
					searchIndex++;
					templateIndex++;
				}
			} else if (starIndex !== -1) {
				templateIndex = starIndex + 1;
				matchIndex++;
				searchIndex = matchIndex;
			} else return false;
			while (templateIndex < template.length && template[templateIndex] === "*") templateIndex++;
			return templateIndex === template.length;
		}
		/**
		* Disable debug output.
		*
		* @return {String} namespaces
		* @api public
		*/
		function disable() {
			const namespaces = [...createDebug.names, ...createDebug.skips.map((namespace) => "-" + namespace)].join(",");
			createDebug.enable("");
			return namespaces;
		}
		/**
		* Returns true if the given mode name is enabled, false otherwise.
		*
		* @param {String} name
		* @return {Boolean}
		* @api public
		*/
		function enabled(name) {
			for (const skip of createDebug.skips) if (matchesTemplate(name, skip)) return false;
			for (const ns of createDebug.names) if (matchesTemplate(name, ns)) return true;
			return false;
		}
		/**
		* Coerce `val`.
		*
		* @param {Mixed} val
		* @return {Mixed}
		* @api private
		*/
		function coerce(val) {
			if (val instanceof Error) return val.stack || val.message;
			return val;
		}
		/**
		* XXX DO NOT USE. This is a temporary stub function.
		* XXX It WILL be removed in the next major release.
		*/
		function destroy() {
			console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
		}
		createDebug.enable(createDebug.load());
		return createDebug;
	}
	module.exports = setup;
}));
// node_modules/debug/src/browser.js
var require_browser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* This is the web browser implementation of `debug()`.
	*/
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = localstorage();
	exports.destroy = (() => {
		let warned = false;
		return () => {
			if (!warned) {
				warned = true;
				console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
			}
		};
	})();
	/**
	* Colors.
	*/
	exports.colors = [
		"#0000CC",
		"#0000FF",
		"#0033CC",
		"#0033FF",
		"#0066CC",
		"#0066FF",
		"#0099CC",
		"#0099FF",
		"#00CC00",
		"#00CC33",
		"#00CC66",
		"#00CC99",
		"#00CCCC",
		"#00CCFF",
		"#3300CC",
		"#3300FF",
		"#3333CC",
		"#3333FF",
		"#3366CC",
		"#3366FF",
		"#3399CC",
		"#3399FF",
		"#33CC00",
		"#33CC33",
		"#33CC66",
		"#33CC99",
		"#33CCCC",
		"#33CCFF",
		"#6600CC",
		"#6600FF",
		"#6633CC",
		"#6633FF",
		"#66CC00",
		"#66CC33",
		"#9900CC",
		"#9900FF",
		"#9933CC",
		"#9933FF",
		"#99CC00",
		"#99CC33",
		"#CC0000",
		"#CC0033",
		"#CC0066",
		"#CC0099",
		"#CC00CC",
		"#CC00FF",
		"#CC3300",
		"#CC3333",
		"#CC3366",
		"#CC3399",
		"#CC33CC",
		"#CC33FF",
		"#CC6600",
		"#CC6633",
		"#CC9900",
		"#CC9933",
		"#CCCC00",
		"#CCCC33",
		"#FF0000",
		"#FF0033",
		"#FF0066",
		"#FF0099",
		"#FF00CC",
		"#FF00FF",
		"#FF3300",
		"#FF3333",
		"#FF3366",
		"#FF3399",
		"#FF33CC",
		"#FF33FF",
		"#FF6600",
		"#FF6633",
		"#FF9900",
		"#FF9933",
		"#FFCC00",
		"#FFCC33"
	];
	/**
	* Currently only WebKit-based Web Inspectors, Firefox >= v31,
	* and the Firebug extension (any Firefox version) are known
	* to support "%c" CSS customizations.
	*
	* TODO: add a `localStorage` variable to explicitly enable/disable colors
	*/
	function useColors() {
		if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return true;
		if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return false;
		let m;
		return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
	}
	/**
	* Colorize log arguments if enabled.
	*
	* @api public
	*/
	function formatArgs(args) {
		args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
		if (!this.useColors) return;
		const c = "color: " + this.color;
		args.splice(1, 0, c, "color: inherit");
		let index = 0;
		let lastC = 0;
		args[0].replace(/%[a-zA-Z%]/g, (match) => {
			if (match === "%%") return;
			index++;
			if (match === "%c") lastC = index;
		});
		args.splice(lastC, 0, c);
	}
	/**
	* Invokes `console.debug()` when available.
	* No-op when `console.debug` is not a "function".
	* If `console.debug` is not available, falls back
	* to `console.log`.
	*
	* @api public
	*/
	exports.log = console.debug || console.log || (() => {});
	/**
	* Save `namespaces`.
	*
	* @param {String} namespaces
	* @api private
	*/
	function save(namespaces) {
		try {
			if (namespaces) exports.storage.setItem("debug", namespaces);
			else exports.storage.removeItem("debug");
		} catch (error) {}
	}
	/**
	* Load `namespaces`.
	*
	* @return {String} returns the previously persisted debug modes
	* @api private
	*/
	function load() {
		let r;
		try {
			r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
		} catch (error) {}
		if (!r && typeof process !== "undefined" && "env" in process) r = process.env.DEBUG;
		return r;
	}
	/**
	* Localstorage attempts to return the localstorage.
	*
	* This is necessary because safari throws
	* when a user disables cookies/localstorage
	* and you attempt to access it.
	*
	* @return {LocalStorage}
	* @api private
	*/
	function localstorage() {
		try {
			return localStorage;
		} catch (error) {}
	}
	module.exports = require_common()(exports);
	var { formatters } = module.exports;
	/**
	* Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	*/
	formatters.j = function(v) {
		try {
			return JSON.stringify(v);
		} catch (error) {
			return "[UnexpectedJSONParseError]: " + error.message;
		}
	};
}));
// node_modules/has-flag/index.js
var require_has_flag = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = (flag, argv = process.argv) => {
		const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
		const position = argv.indexOf(prefix + flag);
		const terminatorPosition = argv.indexOf("--");
		return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
	};
}));
// node_modules/supports-color/index.js
var require_supports_color = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var os = __require("os");
	var tty = __require("tty");
	var hasFlag = require_has_flag();
	var { env } = process;
	var forceColor;
	if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) forceColor = 0;
	else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) forceColor = 1;
	if ("FORCE_COLOR" in env) {
		if (env.FORCE_COLOR === "true") forceColor = 1;
		else if (env.FORCE_COLOR === "false") forceColor = 0;
		else forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
	}
	function translateLevel(level) {
		if (level === 0) return false;
		return {
			level,
			hasBasic: true,
			has256: level >= 2,
			has16m: level >= 3
		};
	}
	function supportsColor(haveStream, streamIsTTY) {
		if (forceColor === 0) return 0;
		if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) return 3;
		if (hasFlag("color=256")) return 2;
		if (haveStream && !streamIsTTY && forceColor === void 0) return 0;
		const min = forceColor || 0;
		if (env.TERM === "dumb") return min;
		if (process.platform === "win32") {
			const osRelease = os.release().split(".");
			if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) return Number(osRelease[2]) >= 14931 ? 3 : 2;
			return 1;
		}
		if ("CI" in env) {
			if ([
				"TRAVIS",
				"CIRCLECI",
				"APPVEYOR",
				"GITLAB_CI",
				"GITHUB_ACTIONS",
				"BUILDKITE"
			].some((sign) => sign in env) || env.CI_NAME === "codeship") return 1;
			return min;
		}
		if ("TEAMCITY_VERSION" in env) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
		if (env.COLORTERM === "truecolor") return 3;
		if ("TERM_PROGRAM" in env) {
			const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
			switch (env.TERM_PROGRAM) {
				case "iTerm.app": return version >= 3 ? 3 : 2;
				case "Apple_Terminal": return 2;
			}
		}
		if (/-256(color)?$/i.test(env.TERM)) return 2;
		if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) return 1;
		if ("COLORTERM" in env) return 1;
		return min;
	}
	function getSupportLevel(stream) {
		return translateLevel(supportsColor(stream, stream && stream.isTTY));
	}
	module.exports = {
		supportsColor: getSupportLevel,
		stdout: translateLevel(supportsColor(true, tty.isatty(1))),
		stderr: translateLevel(supportsColor(true, tty.isatty(2)))
	};
}));
// node_modules/debug/src/node.js
var require_node = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Module dependencies.
	*/
	var tty = __require("tty");
	var util = __require("util");
	/**
	* This is the Node.js implementation of `debug()`.
	*/
	exports.init = init;
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.destroy = util.deprecate(() => {}, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
	/**
	* Colors.
	*/
	exports.colors = [
		6,
		2,
		3,
		4,
		5,
		1
	];
	try {
		const supportsColor = require_supports_color();
		if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	} catch (error) {}
	/**
	* Build up the default `inspectOpts` object from the environment variables.
	*
	*   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
	*/
	exports.inspectOpts = Object.keys(process.env).filter((key) => {
		return /^debug_/i.test(key);
	}).reduce((obj, key) => {
		const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});
		let val = process.env[key];
		if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
		else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
		else if (val === "null") val = null;
		else val = Number(val);
		obj[prop] = val;
		return obj;
	}, {});
	/**
	* Is stdout a TTY? Colored output is enabled when `true`.
	*/
	function useColors() {
		return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
	}
	/**
	* Adds ANSI color escape codes if enabled.
	*
	* @api public
	*/
	function formatArgs(args) {
		const { namespace: name, useColors } = this;
		if (useColors) {
			const c = this.color;
			const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
			const prefix = `  ${colorCode};1m${name} \u001B[0m`;
			args[0] = prefix + args[0].split("\n").join("\n" + prefix);
			args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
		} else args[0] = getDate() + name + " " + args[0];
	}
	function getDate() {
		if (exports.inspectOpts.hideDate) return "";
		return (/* @__PURE__ */ new Date()).toISOString() + " ";
	}
	/**
	* Invokes `util.formatWithOptions()` with the specified arguments and writes to stderr.
	*/
	function log(...args) {
		return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + "\n");
	}
	/**
	* Save `namespaces`.
	*
	* @param {String} namespaces
	* @api private
	*/
	function save(namespaces) {
		if (namespaces) process.env.DEBUG = namespaces;
		else delete process.env.DEBUG;
	}
	/**
	* Load `namespaces`.
	*
	* @return {String} returns the previously persisted debug modes
	* @api private
	*/
	function load() {
		return process.env.DEBUG;
	}
	/**
	* Init logic for `debug` instances.
	*
	* Create a new `inspectOpts` object in case `useColors` is set
	* differently for a particular `debug` instance.
	*/
	function init(debug) {
		debug.inspectOpts = {};
		const keys = Object.keys(exports.inspectOpts);
		for (let i = 0; i < keys.length; i++) debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
	module.exports = require_common()(exports);
	var { formatters } = module.exports;
	/**
	* Map %o to `util.inspect()`, all on a single line.
	*/
	formatters.o = function(v) {
		this.inspectOpts.colors = this.useColors;
		return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
	};
	/**
	* Map %O to `util.inspect()`, allowing multiple lines if needed.
	*/
	formatters.O = function(v) {
		this.inspectOpts.colors = this.useColors;
		return util.inspect(v, this.inspectOpts);
	};
}));
// node_modules/debug/src/index.js
var require_src$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Detect Electron renderer / nwjs process, which is node, but we should
	* treat as a browser.
	*/
	if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) module.exports = require_browser();
	else module.exports = require_node();
}));
// node_modules/agent-base/dist/src/promisify.js
var require_promisify = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function promisify(fn) {
		return function(req, opts) {
			return new Promise((resolve, reject) => {
				fn.call(this, req, opts, (err, rtn) => {
					if (err) reject(err);
					else resolve(rtn);
				});
			});
		};
	}
	exports.default = promisify;
}));
// node_modules/agent-base/dist/src/index.js
var require_src = /* @__PURE__ */ __commonJSMin(((exports, module, this$4) => {
	var __importDefault = this$4 && this$4.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	var events_1 = __require("events");
	var debug_1 = __importDefault(require_src$1());
	var promisify_1 = __importDefault(require_promisify());
	var debug = debug_1.default("agent-base");
	function isAgent(v) {
		return Boolean(v) && typeof v.addRequest === "function";
	}
	function isSecureEndpoint() {
		const { stack } = /* @__PURE__ */ new Error();
		if (typeof stack !== "string") return false;
		return stack.split("\n").some((l) => l.indexOf("(https.js:") !== -1 || l.indexOf("node:https:") !== -1);
	}
	function createAgent(callback, opts) {
		return new createAgent.Agent(callback, opts);
	}
	(function(createAgent) {
		/**
		* Base `http.Agent` implementation.
		* No pooling/keep-alive is implemented by default.
		*
		* @param {Function} callback
		* @api public
		*/
		class Agent extends events_1.EventEmitter {
			constructor(callback, _opts) {
				super();
				let opts = _opts;
				if (typeof callback === "function") this.callback = callback;
				else if (callback) opts = callback;
				this.timeout = null;
				if (opts && typeof opts.timeout === "number") this.timeout = opts.timeout;
				this.maxFreeSockets = 1;
				this.maxSockets = 1;
				this.maxTotalSockets = Infinity;
				this.sockets = {};
				this.freeSockets = {};
				this.requests = {};
				this.options = {};
			}
			get defaultPort() {
				if (typeof this.explicitDefaultPort === "number") return this.explicitDefaultPort;
				return isSecureEndpoint() ? 443 : 80;
			}
			set defaultPort(v) {
				this.explicitDefaultPort = v;
			}
			get protocol() {
				if (typeof this.explicitProtocol === "string") return this.explicitProtocol;
				return isSecureEndpoint() ? "https:" : "http:";
			}
			set protocol(v) {
				this.explicitProtocol = v;
			}
			callback(req, opts, fn) {
				throw new Error("\"agent-base\" has no default implementation, you must subclass and override `callback()`");
			}
			/**
			* Called by node-core's "_http_client.js" module when creating
			* a new HTTP request with this Agent instance.
			*
			* @api public
			*/
			addRequest(req, _opts) {
				const opts = Object.assign({}, _opts);
				if (typeof opts.secureEndpoint !== "boolean") opts.secureEndpoint = isSecureEndpoint();
				if (opts.host == null) opts.host = "localhost";
				if (opts.port == null) opts.port = opts.secureEndpoint ? 443 : 80;
				if (opts.protocol == null) opts.protocol = opts.secureEndpoint ? "https:" : "http:";
				if (opts.host && opts.path) delete opts.path;
				delete opts.agent;
				delete opts.hostname;
				delete opts._defaultAgent;
				delete opts.defaultPort;
				delete opts.createConnection;
				req._last = true;
				req.shouldKeepAlive = false;
				let timedOut = false;
				let timeoutId = null;
				const timeoutMs = opts.timeout || this.timeout;
				const onerror = (err) => {
					if (req._hadError) return;
					req.emit("error", err);
					req._hadError = true;
				};
				const ontimeout = () => {
					timeoutId = null;
					timedOut = true;
					const err = /* @__PURE__ */ new Error(`A "socket" was not created for HTTP request before ${timeoutMs}ms`);
					err.code = "ETIMEOUT";
					onerror(err);
				};
				const callbackError = (err) => {
					if (timedOut) return;
					if (timeoutId !== null) {
						clearTimeout(timeoutId);
						timeoutId = null;
					}
					onerror(err);
				};
				const onsocket = (socket) => {
					if (timedOut) return;
					if (timeoutId != null) {
						clearTimeout(timeoutId);
						timeoutId = null;
					}
					if (isAgent(socket)) {
						debug("Callback returned another Agent instance %o", socket.constructor.name);
						socket.addRequest(req, opts);
						return;
					}
					if (socket) {
						socket.once("free", () => {
							this.freeSocket(socket, opts);
						});
						req.onSocket(socket);
						return;
					}
					const err = /* @__PURE__ */ new Error(`no Duplex stream was returned to agent-base for \`${req.method} ${req.path}\``);
					onerror(err);
				};
				if (typeof this.callback !== "function") {
					onerror(/* @__PURE__ */ new Error("`callback` is not defined"));
					return;
				}
				if (!this.promisifiedCallback) {
					if (this.callback.length >= 3) {
						debug("Converting legacy callback function to promise");
						this.promisifiedCallback = promisify_1.default(this.callback);
					} else this.promisifiedCallback = this.callback;
				}
				if (typeof timeoutMs === "number" && timeoutMs > 0) timeoutId = setTimeout(ontimeout, timeoutMs);
				if ("port" in opts && typeof opts.port !== "number") opts.port = Number(opts.port);
				try {
					debug("Resolving socket for %o request: %o", opts.protocol, `${req.method} ${req.path}`);
					Promise.resolve(this.promisifiedCallback(req, opts)).then(onsocket, callbackError);
				} catch (err) {
					Promise.reject(err).catch(callbackError);
				}
			}
			freeSocket(socket, opts) {
				debug("Freeing socket %o %o", socket.constructor.name, opts);
				socket.destroy();
			}
			destroy() {
				debug("Destroying agent %o", this.constructor.name);
			}
		}
		createAgent.Agent = Agent;
		createAgent.prototype = createAgent.Agent.prototype;
	})(createAgent || (createAgent = {}));
	module.exports = createAgent;
}));
// node_modules/https-proxy-agent/dist/parse-proxy-response.js
var require_parse_proxy_response = /* @__PURE__ */ __commonJSMin(((exports, module, this$3) => {
	var __importDefault = this$3 && this$3.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var debug = __importDefault(require_src$1()).default("https-proxy-agent:parse-proxy-response");
	function parseProxyResponse(socket) {
		return new Promise((resolve, reject) => {
			let buffersLength = 0;
			const buffers = [];
			function read() {
				const b = socket.read();
				if (b) ondata(b);
				else socket.once("readable", read);
			}
			function cleanup() {
				socket.removeListener("end", onend);
				socket.removeListener("error", onerror);
				socket.removeListener("close", onclose);
				socket.removeListener("readable", read);
			}
			function onclose(err) {
				debug("onclose had error %o", err);
			}
			function onend() {
				debug("onend");
			}
			function onerror(err) {
				cleanup();
				debug("onerror %o", err);
				reject(err);
			}
			function ondata(b) {
				buffers.push(b);
				buffersLength += b.length;
				const buffered = Buffer.concat(buffers, buffersLength);
				if (buffered.indexOf("\r\n\r\n") === -1) {
					debug("have not received end of HTTP headers yet...");
					read();
					return;
				}
				const firstLine = buffered.toString("ascii", 0, buffered.indexOf("\r\n"));
				const statusCode = +firstLine.split(" ")[1];
				debug("got proxy server response: %o", firstLine);
				resolve({
					statusCode,
					buffered
				});
			}
			socket.on("error", onerror);
			socket.on("close", onclose);
			socket.on("end", onend);
			read();
		});
	}
	exports.default = parseProxyResponse;
}));
// node_modules/https-proxy-agent/dist/agent.js
var require_agent = /* @__PURE__ */ __commonJSMin(((exports, module, this$2) => {
	var __awaiter = this$2 && this$2.__awaiter || function(thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P ? value : new P(function(resolve) {
				resolve(value);
			});
		}
		return new (P || (P = Promise))(function(resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
	var __importDefault = this$2 && this$2.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var net_1 = __importDefault(__require("net"));
	var tls_1 = __importDefault(__require("tls"));
	var url_1 = __importDefault(__require("url"));
	var assert_1 = __importDefault(__require("assert"));
	var debug_1 = __importDefault(require_src$1());
	var agent_base_1 = require_src();
	var parse_proxy_response_1 = __importDefault(require_parse_proxy_response());
	var debug = debug_1.default("https-proxy-agent:agent");
	/**
	* The `HttpsProxyAgent` implements an HTTP Agent subclass that connects to
	* the specified "HTTP(s) proxy server" in order to proxy HTTPS requests.
	*
	* Outgoing HTTP requests are first tunneled through the proxy server using the
	* `CONNECT` HTTP request method to establish a connection to the proxy server,
	* and then the proxy server connects to the destination target and issues the
	* HTTP request from the proxy server.
	*
	* `https:` requests have their socket connection upgraded to TLS once
	* the connection to the proxy server has been established.
	*
	* @api public
	*/
	var HttpsProxyAgent = class extends agent_base_1.Agent {
		constructor(_opts) {
			let opts;
			if (typeof _opts === "string") opts = url_1.default.parse(_opts);
			else opts = _opts;
			if (!opts) throw new Error("an HTTP(S) proxy server `host` and `port` must be specified!");
			debug("creating new HttpsProxyAgent instance: %o", opts);
			super(opts);
			const proxy = Object.assign({}, opts);
			this.secureProxy = opts.secureProxy || isHTTPS(proxy.protocol);
			proxy.host = proxy.hostname || proxy.host;
			if (typeof proxy.port === "string") proxy.port = parseInt(proxy.port, 10);
			if (!proxy.port && proxy.host) proxy.port = this.secureProxy ? 443 : 80;
			if (this.secureProxy && !("ALPNProtocols" in proxy)) proxy.ALPNProtocols = ["http 1.1"];
			if (proxy.host && proxy.path) {
				delete proxy.path;
				delete proxy.pathname;
			}
			this.proxy = proxy;
		}
		/**
		* Called when the node-core HTTP client library is creating a
		* new HTTP request.
		*
		* @api protected
		*/
		callback(req, opts) {
			return __awaiter(this, void 0, void 0, function* () {
				const { proxy, secureProxy } = this;
				let socket;
				if (secureProxy) {
					debug("Creating `tls.Socket`: %o", proxy);
					socket = tls_1.default.connect(proxy);
				} else {
					debug("Creating `net.Socket`: %o", proxy);
					socket = net_1.default.connect(proxy);
				}
				const headers = Object.assign({}, proxy.headers);
				let payload = `CONNECT ${`${opts.host}:${opts.port}`} HTTP/1.1\r\n`;
				if (proxy.auth) headers["Proxy-Authorization"] = `Basic ${Buffer.from(proxy.auth).toString("base64")}`;
				let { host, port, secureEndpoint } = opts;
				if (!isDefaultPort(port, secureEndpoint)) host += `:${port}`;
				headers.Host = host;
				headers.Connection = "close";
				for (const name of Object.keys(headers)) payload += `${name}: ${headers[name]}\r\n`;
				const proxyResponsePromise = parse_proxy_response_1.default(socket);
				socket.write(`${payload}\r\n`);
				const { statusCode, buffered } = yield proxyResponsePromise;
				if (statusCode === 200) {
					req.once("socket", resume);
					if (opts.secureEndpoint) {
						debug("Upgrading socket connection to TLS");
						const servername = opts.servername || opts.host;
						return tls_1.default.connect(Object.assign(Object.assign({}, omit(opts, "host", "hostname", "path", "port")), {
							socket,
							servername
						}));
					}
					return socket;
				}
				socket.destroy();
				const fakeSocket = new net_1.default.Socket({ writable: false });
				fakeSocket.readable = true;
				req.once("socket", (s) => {
					debug("replaying proxy buffer for failed request");
					assert_1.default(s.listenerCount("data") > 0);
					s.push(buffered);
					s.push(null);
				});
				return fakeSocket;
			});
		}
	};
	exports.default = HttpsProxyAgent;
	function resume(socket) {
		socket.resume();
	}
	function isDefaultPort(port, secure) {
		return Boolean(!secure && port === 80 || secure && port === 443);
	}
	function isHTTPS(protocol) {
		return typeof protocol === "string" ? /^https:?$/i.test(protocol) : false;
	}
	function omit(obj, ...keys) {
		const ret = {};
		let key;
		for (key in obj) if (!keys.includes(key)) ret[key] = obj[key];
		return ret;
	}
}));
// node_modules/https-proxy-agent/dist/index.js
var require_dist = /* @__PURE__ */ __commonJSMin(((exports, module, this$1) => {
	var agent_1 = (this$1 && this$1.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	})(require_agent());
	function createHttpsProxyAgent(opts) {
		return new agent_1.default(opts);
	}
	(function(createHttpsProxyAgent) {
		createHttpsProxyAgent.HttpsProxyAgent = agent_1.default;
		createHttpsProxyAgent.prototype = agent_1.default.prototype;
	})(createHttpsProxyAgent || (createHttpsProxyAgent = {}));
	module.exports = createHttpsProxyAgent;
}));
// node_modules/follow-redirects/debug.js
var require_debug = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var debug;
	module.exports = function() {
		if (!debug) {
			try {
				debug = require_src$1()("follow-redirects");
			} catch (error) {}
			if (typeof debug !== "function") debug = function() {};
		}
		debug.apply(null, arguments);
	};
}));
// node_modules/follow-redirects/index.js
var require_follow_redirects = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var url = __require("url");
	var URL = url.URL;
	var http = __require("http");
	var https = __require("https");
	var Writable = __require("stream").Writable;
	var assert = __require("assert");
	var debug = require_debug();
	// istanbul ignore next
	(function detectUnsupportedEnvironment() {
		var looksLikeNode = typeof process !== "undefined";
		var looksLikeBrowser = typeof window !== "undefined" && typeof document !== "undefined";
		var looksLikeV8 = isFunction(Error.captureStackTrace);
		if (!looksLikeNode && (looksLikeBrowser || !looksLikeV8)) console.warn("The follow-redirects package should be excluded from browser builds.");
	})();
	var useNativeURL = false;
	try {
		assert(new URL(""));
	} catch (error) {
		useNativeURL = error.code === "ERR_INVALID_URL";
	}
	var sensitiveHeaders = [
		"Authorization",
		"Proxy-Authorization",
		"Cookie"
	];
	var preservedUrlFields = [
		"auth",
		"host",
		"hostname",
		"href",
		"path",
		"pathname",
		"port",
		"protocol",
		"query",
		"search",
		"hash"
	];
	var events = [
		"abort",
		"aborted",
		"connect",
		"error",
		"socket",
		"timeout"
	];
	var eventHandlers = Object.create(null);
	events.forEach(function(event) {
		eventHandlers[event] = function(arg1, arg2, arg3) {
			this._redirectable.emit(event, arg1, arg2, arg3);
		};
	});
	var InvalidUrlError = createErrorType("ERR_INVALID_URL", "Invalid URL", TypeError);
	var RedirectionError = createErrorType("ERR_FR_REDIRECTION_FAILURE", "Redirected request failed");
	var TooManyRedirectsError = createErrorType("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded", RedirectionError);
	var MaxBodyLengthExceededError = createErrorType("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit");
	var WriteAfterEndError = createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
	// istanbul ignore next
	var destroy = Writable.prototype.destroy || noop;
	function RedirectableRequest(options, responseCallback) {
		Writable.call(this);
		this._sanitizeOptions(options);
		this._options = options;
		this._ended = false;
		this._ending = false;
		this._redirectCount = 0;
		this._redirects = [];
		this._requestBodyLength = 0;
		this._requestBodyBuffers = [];
		if (responseCallback) this.on("response", responseCallback);
		var self = this;
		this._onNativeResponse = function(response) {
			try {
				self._processResponse(response);
			} catch (cause) {
				self.emit("error", cause instanceof RedirectionError ? cause : new RedirectionError({ cause }));
			}
		};
		this._headerFilter = new RegExp("^(?:" + sensitiveHeaders.concat(options.sensitiveHeaders).map(escapeRegex).join("|") + ")$", "i");
		this._performRequest();
	}
	RedirectableRequest.prototype = Object.create(Writable.prototype);
	RedirectableRequest.prototype.abort = function() {
		destroyRequest(this._currentRequest);
		this._currentRequest.abort();
		this.emit("abort");
	};
	RedirectableRequest.prototype.destroy = function(error) {
		destroyRequest(this._currentRequest, error);
		destroy.call(this, error);
		return this;
	};
	RedirectableRequest.prototype.write = function(data, encoding, callback) {
		if (this._ending) throw new WriteAfterEndError();
		if (!isString(data) && !isBuffer(data)) throw new TypeError("data should be a string, Buffer or Uint8Array");
		if (isFunction(encoding)) {
			callback = encoding;
			encoding = null;
		}
		if (data.length === 0) {
			if (callback) callback();
			return;
		}
		if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
			this._requestBodyLength += data.length;
			this._requestBodyBuffers.push({
				data,
				encoding
			});
			this._currentRequest.write(data, encoding, callback);
		} else {
			this.emit("error", new MaxBodyLengthExceededError());
			this.abort();
		}
	};
	RedirectableRequest.prototype.end = function(data, encoding, callback) {
		if (isFunction(data)) {
			callback = data;
			data = encoding = null;
		} else if (isFunction(encoding)) {
			callback = encoding;
			encoding = null;
		}
		if (!data) {
			this._ended = this._ending = true;
			this._currentRequest.end(null, null, callback);
		} else {
			var self = this;
			var currentRequest = this._currentRequest;
			this.write(data, encoding, function() {
				self._ended = true;
				currentRequest.end(null, null, callback);
			});
			this._ending = true;
		}
	};
	RedirectableRequest.prototype.setHeader = function(name, value) {
		this._options.headers[name] = value;
		this._currentRequest.setHeader(name, value);
	};
	RedirectableRequest.prototype.removeHeader = function(name) {
		delete this._options.headers[name];
		this._currentRequest.removeHeader(name);
	};
	RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
		var self = this;
		function destroyOnTimeout(socket) {
			socket.setTimeout(msecs);
			socket.removeListener("timeout", socket.destroy);
			socket.addListener("timeout", socket.destroy);
		}
		function startTimer(socket) {
			if (self._timeout) clearTimeout(self._timeout);
			self._timeout = setTimeout(function() {
				self.emit("timeout");
				clearTimer();
			}, msecs);
			destroyOnTimeout(socket);
		}
		function clearTimer() {
			if (self._timeout) {
				clearTimeout(self._timeout);
				self._timeout = null;
			}
			self.removeListener("abort", clearTimer);
			self.removeListener("error", clearTimer);
			self.removeListener("response", clearTimer);
			self.removeListener("close", clearTimer);
			if (callback) self.removeListener("timeout", callback);
			if (!self.socket) self._currentRequest.removeListener("socket", startTimer);
		}
		if (callback) this.on("timeout", callback);
		if (this.socket) startTimer(this.socket);
		else this._currentRequest.once("socket", startTimer);
		this.on("socket", destroyOnTimeout);
		this.on("abort", clearTimer);
		this.on("error", clearTimer);
		this.on("response", clearTimer);
		this.on("close", clearTimer);
		return this;
	};
	[
		"flushHeaders",
		"getHeader",
		"setNoDelay",
		"setSocketKeepAlive"
	].forEach(function(method) {
		RedirectableRequest.prototype[method] = function(a, b) {
			return this._currentRequest[method](a, b);
		};
	});
	[
		"aborted",
		"connection",
		"socket"
	].forEach(function(property) {
		Object.defineProperty(RedirectableRequest.prototype, property, { get: function() {
			return this._currentRequest[property];
		} });
	});
	RedirectableRequest.prototype._sanitizeOptions = function(options) {
		if (!options.headers) options.headers = {};
		if (!isArray(options.sensitiveHeaders)) options.sensitiveHeaders = [];
		if (options.host) {
			if (!options.hostname) options.hostname = options.host;
			delete options.host;
		}
		if (!options.pathname && options.path) {
			var searchPos = options.path.indexOf("?");
			if (searchPos < 0) options.pathname = options.path;
			else {
				options.pathname = options.path.substring(0, searchPos);
				options.search = options.path.substring(searchPos);
			}
		}
	};
	RedirectableRequest.prototype._performRequest = function() {
		var protocol = this._options.protocol;
		var nativeProtocol = this._options.nativeProtocols[protocol];
		if (!nativeProtocol) throw new TypeError("Unsupported protocol " + protocol);
		if (this._options.agents) {
			var scheme = protocol.slice(0, -1);
			this._options.agent = this._options.agents[scheme];
		}
		var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
		request._redirectable = this;
		for (var event of events) request.on(event, eventHandlers[event]);
		this._currentUrl = /^\//.test(this._options.path) ? url.format(this._options) : this._options.path;
		if (this._isRedirect) {
			var i = 0;
			var self = this;
			var buffers = this._requestBodyBuffers;
			(function writeNext(error) {
				// istanbul ignore else
				if (request === self._currentRequest) {
					// istanbul ignore if
					if (error) self.emit("error", error);
					else if (i < buffers.length) {
						var buffer = buffers[i++];
						// istanbul ignore else
						if (!request.finished) request.write(buffer.data, buffer.encoding, writeNext);
					} else if (self._ended) request.end();
				}
			})();
		}
	};
	RedirectableRequest.prototype._processResponse = function(response) {
		var statusCode = response.statusCode;
		if (this._options.trackRedirects) this._redirects.push({
			url: this._currentUrl,
			headers: response.headers,
			statusCode
		});
		var location = response.headers.location;
		if (!location || this._options.followRedirects === false || statusCode < 300 || statusCode >= 400) {
			response.responseUrl = this._currentUrl;
			response.redirects = this._redirects;
			this.emit("response", response);
			this._requestBodyBuffers = [];
			return;
		}
		destroyRequest(this._currentRequest);
		response.destroy();
		if (++this._redirectCount > this._options.maxRedirects) throw new TooManyRedirectsError();
		var requestHeaders;
		var beforeRedirect = this._options.beforeRedirect;
		if (beforeRedirect) requestHeaders = Object.assign({ Host: response.req.getHeader("host") }, this._options.headers);
		var method = this._options.method;
		if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
			this._options.method = "GET";
			this._requestBodyBuffers = [];
			removeMatchingHeaders(/^content-/i, this._options.headers);
		}
		var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);
		var currentUrlParts = parseUrl(this._currentUrl);
		var currentHost = currentHostHeader || currentUrlParts.host;
		var currentUrl = /^\w+:/.test(location) ? this._currentUrl : url.format(Object.assign(currentUrlParts, { host: currentHost }));
		var redirectUrl = resolveUrl(location, currentUrl);
		debug("redirecting to", redirectUrl.href);
		this._isRedirect = true;
		spreadUrlObject(redirectUrl, this._options);
		if (redirectUrl.protocol !== currentUrlParts.protocol && redirectUrl.protocol !== "https:" || redirectUrl.host !== currentHost && !isSubdomain(redirectUrl.host, currentHost)) removeMatchingHeaders(this._headerFilter, this._options.headers);
		if (isFunction(beforeRedirect)) {
			var responseDetails = {
				headers: response.headers,
				statusCode
			};
			var requestDetails = {
				url: currentUrl,
				method,
				headers: requestHeaders
			};
			beforeRedirect(this._options, responseDetails, requestDetails);
			this._sanitizeOptions(this._options);
		}
		this._performRequest();
	};
	function wrap(protocols) {
		var exports = {
			maxRedirects: 21,
			maxBodyLength: 10485760
		};
		var nativeProtocols = {};
		Object.keys(protocols).forEach(function(scheme) {
			var protocol = scheme + ":";
			var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
			var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);
			function request(input, options, callback) {
				if (isURL(input)) input = spreadUrlObject(input);
				else if (isString(input)) input = spreadUrlObject(parseUrl(input));
				else {
					callback = options;
					options = validateUrl(input);
					input = { protocol };
				}
				if (isFunction(options)) {
					callback = options;
					options = null;
				}
				options = Object.assign({
					maxRedirects: exports.maxRedirects,
					maxBodyLength: exports.maxBodyLength
				}, input, options);
				options.nativeProtocols = nativeProtocols;
				if (!isString(options.host) && !isString(options.hostname)) options.hostname = "::1";
				assert.equal(options.protocol, protocol, "protocol mismatch");
				debug("options", options);
				return new RedirectableRequest(options, callback);
			}
			function get(input, options, callback) {
				var wrappedRequest = wrappedProtocol.request(input, options, callback);
				wrappedRequest.end();
				return wrappedRequest;
			}
			Object.defineProperties(wrappedProtocol, {
				request: {
					value: request,
					configurable: true,
					enumerable: true,
					writable: true
				},
				get: {
					value: get,
					configurable: true,
					enumerable: true,
					writable: true
				}
			});
		});
		return exports;
	}
	function noop() {}
	function parseUrl(input) {
		var parsed;
		// istanbul ignore else
		if (useNativeURL) parsed = new URL(input);
		else {
			parsed = validateUrl(url.parse(input));
			if (!isString(parsed.protocol)) throw new InvalidUrlError({ input });
		}
		return parsed;
	}
	function resolveUrl(relative, base) {
		// istanbul ignore next
		return useNativeURL ? new URL(relative, base) : parseUrl(url.resolve(base, relative));
	}
	function validateUrl(input) {
		if (/^\[/.test(input.hostname) && !/^\[[:0-9a-f]+\]$/i.test(input.hostname)) throw new InvalidUrlError({ input: input.href || input });
		if (/^\[/.test(input.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(input.host)) throw new InvalidUrlError({ input: input.href || input });
		return input;
	}
	function spreadUrlObject(urlObject, target) {
		var spread = target || {};
		for (var key of preservedUrlFields) spread[key] = urlObject[key];
		if (spread.hostname.startsWith("[")) spread.hostname = spread.hostname.slice(1, -1);
		if (spread.port !== "") spread.port = Number(spread.port);
		spread.path = spread.search ? spread.pathname + spread.search : spread.pathname;
		return spread;
	}
	function removeMatchingHeaders(regex, headers) {
		var lastValue;
		for (var header in headers) if (regex.test(header)) {
			lastValue = headers[header];
			delete headers[header];
		}
		return lastValue === null || typeof lastValue === "undefined" ? void 0 : String(lastValue).trim();
	}
	function createErrorType(code, message, baseClass) {
		function CustomError(properties) {
			// istanbul ignore else
			if (isFunction(Error.captureStackTrace)) Error.captureStackTrace(this, this.constructor);
			Object.assign(this, properties || {});
			this.code = code;
			this.message = this.cause ? message + ": " + this.cause.message : message;
		}
		CustomError.prototype = new (baseClass || Error)();
		Object.defineProperties(CustomError.prototype, {
			constructor: {
				value: CustomError,
				enumerable: false
			},
			name: {
				value: "Error [" + code + "]",
				enumerable: false
			}
		});
		return CustomError;
	}
	function destroyRequest(request, error) {
		for (var event of events) request.removeListener(event, eventHandlers[event]);
		request.on("error", noop);
		request.destroy(error);
	}
	function isSubdomain(subdomain, domain) {
		assert(isString(subdomain) && isString(domain));
		var dot = subdomain.length - domain.length - 1;
		return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
	}
	function isArray(value) {
		return value instanceof Array;
	}
	function isString(value) {
		return typeof value === "string" || value instanceof String;
	}
	function isFunction(value) {
		return typeof value === "function";
	}
	function isBuffer(value) {
		return typeof value === "object" && "length" in value;
	}
	function isURL(value) {
		return URL && value instanceof URL;
	}
	function escapeRegex(regex) {
		return regex.replace(/[\]\\/()*+?.$]/g, "\\$&");
	}
	module.exports = wrap({
		http,
		https
	});
	module.exports.wrap = wrap;
}));
// node_modules/axios/lib/env/data.js
var import_dist = /* @__PURE__ */ __toESM(require_dist(), 1);
var import_follow_redirects = /* @__PURE__ */ __toESM(require_follow_redirects(), 1);
var VERSION = "1.20.0";
// node_modules/axios/lib/helpers/parseProtocol.js
function parseProtocol(url) {
	const match = /^([-+\w]{1,25}):(?:\/\/)?/.exec(url);
	return match && match[1] || "";
}
// node_modules/axios/lib/helpers/fromDataURI.js
var DATA_URL_PATTERN = /^([^,;/]+\/[^,;/]+)?((?:;[^,;=]+=[^,;]+)*)(;base64)?,([\s\S]*)$/;
/**
* Parse data uri to a Buffer or Blob
*
* @param {String} uri
* @param {?Boolean} asBlob
* @param {?Object} options
* @param {?Function} options.Blob
*
* @returns {Buffer|Blob}
*/
function fromDataURI(uri, asBlob, options) {
	const _Blob = options && options.Blob || platform_default.classes.Blob;
	const protocol = parseProtocol(uri);
	if (asBlob === void 0 && _Blob) asBlob = true;
	if (protocol === "data") {
		uri = protocol.length ? uri.slice(protocol.length + 1) : uri;
		const match = DATA_URL_PATTERN.exec(uri);
		if (!match) throw new AxiosError("Invalid URL", AxiosError.ERR_INVALID_URL);
		const type = match[1];
		const params = match[2];
		const encoding = match[3] ? "base64" : "utf8";
		const body = match[4];
		let mime = "";
		if (type) mime = params ? type + params : type;
		else if (params) mime = "text/plain" + params;
		const buffer = encoding === "base64" ? Buffer.from(body, "base64") : Buffer.from(decodeURIComponent(body), encoding);
		if (asBlob) {
			if (!_Blob) throw new AxiosError("Blob is not supported", AxiosError.ERR_NOT_SUPPORT);
			return new _Blob([buffer], { type: mime });
		}
		return buffer;
	}
	throw new AxiosError("Unsupported protocol " + protocol, AxiosError.ERR_NOT_SUPPORT);
}
// node_modules/axios/lib/core/setFormDataHeaders.js
var FORM_DATA_CONTENT_HEADERS = ["content-type", "content-length"];
/**
* Apply the headers generated by a FormData implementation to the request headers,
* honoring the `formDataHeaderPolicy` option: with 'content-only', copy only the
* content-* headers; otherwise merge all of them.
*
* @param {AxiosHeaders} headers - the request headers to mutate
* @param {Object | null | undefined} formHeaders - headers produced by the FormData implementation
* @param {String} [policy] - the resolved `formDataHeaderPolicy` config value
*
* @returns {void}
*/
function setFormDataHeaders(headers, formHeaders, policy) {
	if (policy !== "content-only") {
		headers.set(formHeaders);
		return;
	}
	Object.entries(formHeaders || {}).forEach(([key, val]) => {
		if (FORM_DATA_CONTENT_HEADERS.includes(key.toLowerCase())) headers.set(key, val);
	});
}
// node_modules/axios/lib/helpers/AxiosTransformStream.js
var kInternals = Symbol("internals");
var AxiosTransformStream = class extends stream.Transform {
	constructor(options) {
		options = utils_default.toFlatObject(options, {
			maxRate: 0,
			chunkSize: 65536,
			minChunkSize: 100,
			timeWindow: 500,
			ticksRate: 2,
			samplesCount: 15
		}, null, (prop, source) => {
			return !utils_default.isUndefined(source[prop]);
		});
		super({ readableHighWaterMark: options.chunkSize });
		const internals = this[kInternals] = {
			timeWindow: options.timeWindow,
			chunkSize: options.chunkSize,
			maxRate: options.maxRate,
			minChunkSize: options.minChunkSize,
			bytesSeen: 0,
			isCaptured: false,
			notifiedBytesLoaded: 0,
			ts: Date.now(),
			bytes: 0,
			onReadCallback: null
		};
		this.on("newListener", (event) => {
			if (event === "progress") {
				if (!internals.isCaptured) internals.isCaptured = true;
			}
		});
	}
	_read(size) {
		const internals = this[kInternals];
		if (internals.onReadCallback) internals.onReadCallback();
		return super._read(size);
	}
	_transform(chunk, encoding, callback) {
		const internals = this[kInternals];
		const maxRate = internals.maxRate;
		const readableHighWaterMark = this.readableHighWaterMark;
		const timeWindow = internals.timeWindow;
		const bytesThreshold = maxRate / (1e3 / timeWindow);
		const minChunkSize = internals.minChunkSize !== false ? Math.max(internals.minChunkSize, bytesThreshold * .01) : 0;
		const pushChunk = (_chunk, _callback) => {
			const bytes = Buffer.byteLength(_chunk);
			internals.bytesSeen += bytes;
			internals.bytes += bytes;
			internals.isCaptured && this.emit("progress", internals.bytesSeen);
			if (this.push(_chunk)) process.nextTick(_callback);
			else internals.onReadCallback = () => {
				internals.onReadCallback = null;
				process.nextTick(_callback);
			};
		};
		const transformChunk = (_chunk, _callback) => {
			const chunkSize = Buffer.byteLength(_chunk);
			let chunkRemainder = null;
			let maxChunkSize = readableHighWaterMark;
			let bytesLeft;
			let passed = 0;
			if (maxRate) {
				const now = Date.now();
				if (!internals.ts || (passed = now - internals.ts) >= timeWindow) {
					internals.ts = now;
					bytesLeft = bytesThreshold - internals.bytes;
					internals.bytes = bytesLeft < 0 ? -bytesLeft : 0;
					passed = 0;
				}
				bytesLeft = bytesThreshold - internals.bytes;
			}
			if (maxRate) {
				if (bytesLeft <= 0) return setTimeout(() => {
					_callback(null, _chunk);
				}, timeWindow - passed);
				if (bytesLeft < maxChunkSize) maxChunkSize = bytesLeft;
			}
			if (maxChunkSize && chunkSize > maxChunkSize && chunkSize - maxChunkSize > minChunkSize) {
				chunkRemainder = _chunk.subarray(maxChunkSize);
				_chunk = _chunk.subarray(0, maxChunkSize);
			}
			pushChunk(_chunk, chunkRemainder ? () => {
				process.nextTick(_callback, null, chunkRemainder);
			} : _callback);
		};
		transformChunk(chunk, function transformNextChunk(err, _chunk) {
			if (err) return callback(err);
			if (_chunk) transformChunk(_chunk, transformNextChunk);
			else callback(null);
		});
	}
};
// node_modules/axios/lib/helpers/readBlob.js
var { asyncIterator } = Symbol;
var readBlob = async function* (blob) {
	if (blob.stream) yield* blob.stream();
	else if (blob.arrayBuffer) yield await blob.arrayBuffer();
	else if (blob[asyncIterator]) yield* blob[asyncIterator]();
	else yield blob;
};
// node_modules/axios/lib/helpers/formDataToStream.js
var BOUNDARY_ALPHABET = platform_default.ALPHABET.ALPHA_DIGIT + "-_";
var textEncoder = typeof TextEncoder === "function" ? new TextEncoder() : new util.TextEncoder();
var CRLF = "\r\n";
var CRLF_BYTES = textEncoder.encode(CRLF);
var CRLF_BYTES_COUNT = 2;
var FormDataPart = class {
	constructor(name, value) {
		const { escapeName } = this.constructor;
		const isStringValue = utils_default.isString(value);
		let headers = `Content-Disposition: form-data; name="${escapeName(name)}"${!isStringValue && value.name ? `; filename="${escapeName(value.name)}"` : ""}${CRLF}`;
		if (isStringValue) value = textEncoder.encode(String(value).replace(/\r?\n|\r\n?/g, CRLF));
		else {
			const safeType = String(value.type || "application/octet-stream").replace(/[\r\n]/g, "");
			headers += `Content-Type: ${safeType}${CRLF}`;
		}
		this.headers = textEncoder.encode(headers + CRLF);
		this.contentLength = isStringValue ? value.byteLength : value.size;
		this.size = this.headers.byteLength + this.contentLength + CRLF_BYTES_COUNT;
		this.name = name;
		this.value = value;
	}
	async *encode() {
		yield this.headers;
		const { value } = this;
		if (utils_default.isTypedArray(value)) yield value;
		else yield* readBlob(value);
		yield CRLF_BYTES;
	}
	static escapeName(name) {
		return String(name).replace(/[\r\n"]/g, (match) => ({
			"\r": "%0D",
			"\n": "%0A",
			"\"": "%22"
		})[match]);
	}
};
var formDataToStream = (form, headersHandler, options) => {
	const { tag = "form-data-boundary", size = 25, boundary = tag + "-" + platform_default.generateString(size, BOUNDARY_ALPHABET) } = options || {};
	if (!utils_default.isFormData(form)) throw new TypeError("FormData instance required");
	if (boundary.length < 1 || boundary.length > 70) throw new Error("boundary must be 1-70 characters long");
	const boundaryBytes = textEncoder.encode("--" + boundary + CRLF);
	const footerBytes = textEncoder.encode("--" + boundary + "--\r\n");
	let contentLength = footerBytes.byteLength;
	const parts = Array.from(form.entries()).map(([name, value]) => {
		const part = new FormDataPart(name, value);
		contentLength += part.size;
		return part;
	});
	contentLength += boundaryBytes.byteLength * parts.length;
	contentLength = utils_default.toFiniteNumber(contentLength);
	const computedHeaders = { "Content-Type": `multipart/form-data; boundary=${boundary}` };
	if (Number.isFinite(contentLength)) computedHeaders["Content-Length"] = contentLength;
	headersHandler && headersHandler(computedHeaders);
	return Readable.from((async function* () {
		for (const part of parts) {
			yield boundaryBytes;
			yield* part.encode();
		}
		yield footerBytes;
	})());
};
// node_modules/axios/lib/helpers/ZlibHeaderTransformStream.js
var ZlibHeaderTransformStream = class extends stream.Transform {
	__transform(chunk, encoding, callback) {
		this.push(chunk);
		callback();
	}
	_transform(chunk, encoding, callback) {
		if (chunk.length !== 0) {
			this._transform = this.__transform;
			if (chunk[0] !== 120) {
				const header = Buffer.alloc(2);
				header[0] = 120;
				header[1] = 156;
				this.push(header, encoding);
			}
		}
		this.__transform(chunk, encoding, callback);
	}
};
// node_modules/axios/lib/helpers/Http2Sessions.js
var Http2Sessions = class {
	constructor() {
		this.sessions = Object.create(null);
	}
	getSession(authority, options) {
		options = Object.assign(Object.create(null), { sessionTimeout: 1e3 }, options);
		let authoritySessions = this.sessions[authority];
		if (authoritySessions) {
			let len = authoritySessions.length;
			for (let i = 0; i < len; i++) {
				const [sessionHandle, sessionOptions] = authoritySessions[i];
				if (!sessionHandle.destroyed && !sessionHandle.closed && util.isDeepStrictEqual(sessionOptions, options)) return sessionHandle;
			}
		}
		const session = http2.connect(authority, options);
		let removed;
		let timer;
		const removeSession = () => {
			if (removed) return;
			removed = true;
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
			let entries = authoritySessions, len = entries.length, i = len;
			while (i--) if (entries[i][0] === session) {
				if (len === 1) delete this.sessions[authority];
				else entries.splice(i, 1);
				if (!session.closed) session.close();
				return;
			}
		};
		const originalRequestFn = session.request;
		const { sessionTimeout } = options;
		if (sessionTimeout != null) {
			let streamsCount = 0;
			session.request = function() {
				const stream = originalRequestFn.apply(this, arguments);
				streamsCount++;
				if (timer) {
					clearTimeout(timer);
					timer = null;
				}
				stream.once("close", () => {
					if (!--streamsCount) timer = setTimeout(() => {
						timer = null;
						removeSession();
					}, sessionTimeout);
				});
				return stream;
			};
		}
		session.once("close", removeSession);
		session.once("error", removeSession);
		let entry = [session, options];
		authoritySessions ? authoritySessions.push(entry) : authoritySessions = this.sessions[authority] = [entry];
		return session;
	}
};
// node_modules/axios/lib/helpers/callbackify.js
var callbackify = (fn, reducer) => {
	return utils_default.isAsyncFn(fn) ? function(...args) {
		const cb = args.pop();
		fn.apply(this, args).then((value) => {
			try {
				reducer ? cb(null, ...reducer(value)) : cb(null, value);
			} catch (err) {
				cb(err);
			}
		}, cb);
	} : fn;
};
// node_modules/axios/lib/helpers/shouldBypassProxy.js
var LOOPBACK_HOSTNAMES = /* @__PURE__ */ new Set(["localhost", "0.0.0.0"]);
var trimTrailingDots = (value) => {
	let end = value.length;
	while (end && value.charCodeAt(end - 1) === 46) end--;
	return end === value.length ? value : value.slice(0, end);
};
var isIPv4Loopback = (host) => {
	const parts = host.split(".");
	if (parts.length !== 4) return false;
	if (parts[0] !== "127") return false;
	return parts.every((p) => /^\d+$/.test(p) && Number(p) >= 0 && Number(p) <= 255);
};
/**
* Canonicalize an IPv4 address written in shorthand, octal, or hex form into
* dotted-decimal. IPv6 addresses and non-IP strings are returned unchanged so
* the existing IPv4-mapped IPv6 unmap path and the isLoopback path can still
* see them.
*
* Shorthand expansion mirrors Node's URL parser: literal parts fill from the
* left, the final part fills the remaining octets from the right with
* zero-padding on the left.
*   127.1     -> 127.0.0.1
*   127.0.1   -> 127.0.0.1
*   1.2.3     -> 1.2.0.3
*
* Each octet is parsed with an explicit base: 16 for `0x`/`0X` prefix, 8 for
* zero-prefixed multi-digit all-`0-7` parts, 10 otherwise. Zero-prefixed
* decimal-looking parts that contain `8` or `9` are rejected to match Node's
* URL parser, and the comparison layer falls through to non-bypass if either
* side rejects the form (fail-safe).
*
* Returns the input unchanged on any parse failure, out-of-range octet, or
* unusual shape (1-part, 5+ parts) so the comparison layer fails closed.
*/
var parseIPv4Octet = (text) => {
	if (/^0[xX][0-9a-fA-F]+$/.test(text)) {
		const n = parseInt(text.slice(2), 16);
		return Number.isFinite(n) ? n : null;
	}
	if (text.length > 1 && /^0[0-7]+$/.test(text)) {
		const n = parseInt(text, 8);
		return Number.isFinite(n) ? n : null;
	}
	if (text.length > 1 && /^0[0-9]+$/.test(text)) return null;
	if (/^[0-9]+$/.test(text)) {
		const n = parseInt(text, 10);
		return Number.isFinite(n) ? n : null;
	}
	return null;
};
var normalizeIPAddress = (host) => {
	if (typeof host !== "string" || !host || host.indexOf(":") !== -1) return host;
	let h = host;
	if (h.charAt(0) === "[" && h.charAt(h.length - 1) === "]") h = h.slice(1, -1);
	h = trimTrailingDots(h);
	if (!/^[0-9.xXa-fA-F]+$/.test(h)) return host;
	const parts = h.split(".");
	if (parts.some((p) => p === "")) return host;
	if (parts.length === 4) {
		const octets = parts.map(parseIPv4Octet);
		if (octets.some((n) => n === null || n < 0 || n > 255)) return host;
		return octets.join(".");
	}
	if (parts.length > 4) return host;
	if (parts.length === 1) return host;
	const literalOctets = parts.slice(0, -1);
	const tail = parts[parts.length - 1];
	const tailSlots = 4 - literalOctets.length;
	const tailValue = parseIPv4Octet(tail);
	if (tailValue === null) return host;
	const maxTail = (1 << 8 * tailSlots) - 1;
	if (tailValue < 0 || tailValue > maxTail) return host;
	const tailOctets = new Array(tailSlots).fill(0);
	for (let i = tailSlots - 1, v = tailValue; i >= 0; i--, v >>= 8) tailOctets[i] = v & 255;
	const literal = literalOctets.map(parseIPv4Octet);
	if (literal.some((n) => n === null || n < 0 || n > 255)) return host;
	return [...literal, ...tailOctets].join(".");
};
var isIPv6ZeroGroup = (group) => /^0{1,4}$/.test(group);
var isIPv6Unspecified = (host) => {
	if (host === "::") return true;
	const compressionIndex = host.indexOf("::");
	if (compressionIndex !== -1) {
		if (compressionIndex !== host.lastIndexOf("::")) return false;
		const left = host.slice(0, compressionIndex);
		const right = host.slice(compressionIndex + 2);
		const leftGroups = left ? left.split(":") : [];
		const rightGroups = right ? right.split(":") : [];
		return leftGroups.length + rightGroups.length < 8 && leftGroups.every(isIPv6ZeroGroup) && rightGroups.every(isIPv6ZeroGroup);
	}
	const groups = host.split(":");
	return groups.length === 8 && groups.every(isIPv6ZeroGroup);
};
var isIPv6Loopback = (host) => {
	if (host === "::1") return true;
	const v4MappedDotted = host.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
	if (v4MappedDotted) return isIPv4Loopback(v4MappedDotted[1]);
	const v4MappedHex = host.match(/^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/i);
	if (v4MappedHex) {
		const high = parseInt(v4MappedHex[1], 16);
		return high >= 32512 && high <= 32767;
	}
	const groups = host.split(":");
	if (groups.length === 8) {
		for (let i = 0; i < 7; i++) if (!/^0+$/.test(groups[i])) return false;
		return /^0*1$/.test(groups[7]);
	}
	return false;
};
var isLoopback = (host) => {
	if (!host) return false;
	if (LOOPBACK_HOSTNAMES.has(host)) return true;
	if (isIPv4Loopback(host)) return true;
	if (isIPv6Unspecified(host)) return true;
	return isIPv6Loopback(host);
};
var DEFAULT_PORTS = {
	http: 80,
	https: 443,
	ws: 80,
	wss: 443,
	ftp: 21
};
var parseNoProxyEntry = (entry) => {
	let entryHost = entry;
	let entryPort = 0;
	if (entryHost.charAt(0) === "[") {
		const bracketIndex = entryHost.indexOf("]");
		if (bracketIndex !== -1) {
			const host = entryHost.slice(1, bracketIndex);
			const rest = entryHost.slice(bracketIndex + 1);
			if (rest.charAt(0) === ":" && /^\d+$/.test(rest.slice(1))) entryPort = Number.parseInt(rest.slice(1), 10);
			return [host, entryPort];
		}
	}
	const firstColon = entryHost.indexOf(":");
	const lastColon = entryHost.lastIndexOf(":");
	if (firstColon !== -1 && firstColon === lastColon && /^\d+$/.test(entryHost.slice(lastColon + 1))) {
		entryPort = Number.parseInt(entryHost.slice(lastColon + 1), 10);
		entryHost = entryHost.slice(0, lastColon);
	}
	return [entryHost, entryPort];
};
var IPV4_MAPPED_DOTTED_RE = /^(?:::|(?:0{1,4}:){1,4}:|(?:0{1,4}:){5})ffff:(\d+\.\d+\.\d+\.\d+)$/i;
var IPV4_MAPPED_HEX_RE = /^(?:::|(?:0{1,4}:){1,4}:|(?:0{1,4}:){5})ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/i;
var unmapIPv4MappedIPv6 = (host) => {
	if (typeof host !== "string" || host.indexOf(":") === -1) return host;
	const dotted = host.match(IPV4_MAPPED_DOTTED_RE);
	if (dotted) return dotted[1];
	const hex = host.match(IPV4_MAPPED_HEX_RE);
	if (hex) {
		const high = parseInt(hex[1], 16);
		const low = parseInt(hex[2], 16);
		return `${high >> 8}.${high & 255}.${low >> 8}.${low & 255}`;
	}
	return host;
};
var IPV4_OCTET_RE = /^(?:0|[1-9]\d{0,2})$/;
var ipv4ToBytes = (host) => {
	const parts = host.split(".");
	return parts.length === 4 && parts.every((part) => IPV4_OCTET_RE.test(part) && Number(part) <= 255) ? parts.map(Number) : null;
};
var IPV6_GROUP_RE = /^[0-9a-f]{1,4}$/i;
var ipv6ToBytes = (host) => {
	const halves = host.split("::");
	if (halves.length > 2) return null;
	const groups = halves[0] ? halves[0].split(":") : [];
	if (halves.length === 2) {
		const rear = halves[1] ? halves[1].split(":") : [];
		const missing = 8 - groups.length - rear.length;
		if (missing < 1) return null;
		groups.push(...new Array(missing).fill("0"), ...rear);
	}
	if (groups.length !== 8 || groups.some((group) => !IPV6_GROUP_RE.test(group))) return null;
	return groups.flatMap((group) => {
		const value = Number.parseInt(group, 16);
		return [value >> 8 & 255, value & 255];
	});
};
var ipToBytes = (host) => {
	if (typeof host !== "string" || !host) return null;
	return host.indexOf(":") !== -1 ? ipv6ToBytes(host) : ipv4ToBytes(host);
};
var normalizeNoProxyHost = (hostname) => {
	if (!hostname) return hostname;
	if (hostname.charAt(0) === "[" && hostname.charAt(hostname.length - 1) === "]") hostname = hostname.slice(1, -1);
	const trimmed = trimTrailingDots(hostname);
	const ipv4 = normalizeIPAddress(trimmed);
	if (ipv4 !== trimmed) return ipv4;
	return unmapIPv4MappedIPv6(trimmed);
};
var normalizeCidrBase = (input) => {
	let base = input;
	const startsBracket = base.charAt(0) === "[";
	const endsBracket = base.charAt(base.length - 1) === "]";
	const hasBracket = base.includes("[") || base.includes("]");
	if (startsBracket || endsBracket) {
		if (!startsBracket || !endsBracket) return null;
		base = base.slice(1, -1);
		if (base.indexOf(":") === -1 || base.includes("[") || base.includes("]")) return null;
	} else if (hasBracket) return null;
	if (!base || base.charAt(base.length - 1) === ".") return null;
	const wasIPv6 = base.indexOf(":") !== -1;
	if (wasIPv6) try {
		base = new URL(`http://[${base}]/`).hostname.slice(1, -1);
	} catch (_err) {
		return null;
	}
	else {
		base = normalizeIPAddress(base);
		if (!ipv4ToBytes(base)) return null;
	}
	return {
		normalized: unmapIPv4MappedIPv6(base),
		wasIPv6
	};
};
var CIDR_ENTRY_RE = /^(.+)\/(0|[1-9]\d{0,2})$/;
var parseCidrEntry = (entry) => {
	if (entry.indexOf("/") === -1) return;
	const match = CIDR_ENTRY_RE.exec(entry);
	if (!match) return null;
	let prefix = Number(match[2]);
	const parsedBase = normalizeCidrBase(match[1]);
	if (!parsedBase) return null;
	const { normalized, wasIPv6 } = parsedBase;
	if (wasIPv6 && normalized.indexOf(":") === -1) {
		if (prefix < 96) return null;
		prefix -= 96;
	}
	const bytes = ipToBytes(normalized);
	if (!bytes || prefix > bytes.length * 8) return null;
	return {
		bytes,
		prefix
	};
};
var isInSubnet = (addressBytes, networkBytes, prefix) => {
	const fullBytes = prefix >> 3;
	for (let i = 0; i < fullBytes; i++) if (addressBytes[i] !== networkBytes[i]) return false;
	const remainingBits = prefix & 7;
	if (remainingBits) {
		const mask = 255 << 8 - remainingBits & 255;
		if ((addressBytes[fullBytes] & mask) !== (networkBytes[fullBytes] & mask)) return false;
	}
	return true;
};
function shouldBypassProxy(location) {
	let parsed;
	try {
		parsed = new URL(location);
	} catch (_err) {
		return false;
	}
	const noProxy = (process.env.no_proxy || process.env.NO_PROXY || "").toLowerCase();
	if (!noProxy) return false;
	if (noProxy === "*") return true;
	const port = Number.parseInt(parsed.port, 10) || DEFAULT_PORTS[parsed.protocol.split(":", 1)[0]] || 0;
	const hostname = normalizeNoProxyHost(parsed.hostname.toLowerCase());
	const hostnameBytes = ipToBytes(hostname);
	return noProxy.split(/[\s,]+/).some((entry) => {
		if (!entry) return false;
		if (entry === "*") return true;
		const cidr = parseCidrEntry(entry);
		if (cidr !== void 0) return cidr !== null && !!hostnameBytes && hostnameBytes.length === cidr.bytes.length && isInSubnet(hostnameBytes, cidr.bytes, cidr.prefix);
		let [entryHost, entryPort] = parseNoProxyEntry(entry);
		entryHost = normalizeNoProxyHost(entryHost);
		if (!entryHost) return false;
		if (entryPort && entryPort !== port) return false;
		if (entryHost.charAt(0) === "*") entryHost = entryHost.slice(1);
		if (entryHost.charAt(0) === ".") return hostname.endsWith(entryHost);
		return hostname === entryHost || isLoopback(hostname) && isLoopback(entryHost);
	});
}
// node_modules/axios/lib/helpers/speedometer.js
/**
* Calculate data maxRate
* @param {Number} [samplesCount= 10]
* @param {Number} [min= 1000]
* @returns {Function}
*/
function speedometer(samplesCount, min) {
	samplesCount = samplesCount || 10;
	const bytes = new Array(samplesCount);
	const timestamps = new Array(samplesCount);
	let head = 0;
	let tail = 0;
	let firstSampleTS;
	min = min !== void 0 ? min : 1e3;
	return function push(chunkLength) {
		const now = Date.now();
		const startedAt = timestamps[tail];
		if (!firstSampleTS) firstSampleTS = now;
		bytes[head] = chunkLength;
		timestamps[head] = now;
		let i = tail;
		let bytesCount = 0;
		while (i !== head) {
			bytesCount += bytes[i++];
			i = i % samplesCount;
		}
		head = (head + 1) % samplesCount;
		if (head === tail) tail = (tail + 1) % samplesCount;
		if (now - firstSampleTS < min) return;
		const passed = startedAt && now - startedAt;
		return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
	};
}
// node_modules/axios/lib/helpers/throttle.js
/**
* Throttle decorator
* @param {Function} fn
* @param {Number} freq
* @return {Array<Function>}
*/
function throttle(fn, freq) {
	let timestamp = 0;
	let threshold = 1e3 / freq;
	let lastArgs;
	let timer;
	const invoke = (args, now = Date.now()) => {
		timestamp = now;
		lastArgs = null;
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
		fn(...args);
	};
	const throttled = (...args) => {
		const now = Date.now();
		const passed = now - timestamp;
		if (passed >= threshold) invoke(args, now);
		else {
			lastArgs = args;
			if (!timer) timer = setTimeout(() => {
				timer = null;
				invoke(lastArgs);
			}, threshold - passed);
		}
	};
	const flush = () => lastArgs && invoke(lastArgs);
	const flushWith = (...args) => invoke(args);
	return [
		throttled,
		flush,
		flushWith
	];
}
// node_modules/axios/lib/helpers/progressEventReducer.js
var progressEventReducer = (listener, isDownloadStream, freq = 3) => {
	let bytesNotified = 0;
	const _speedometer = speedometer(50, 250);
	return throttle((e) => {
		if (!e || !utils_default.isNumber(e.loaded)) return;
		const rawLoaded = e.loaded;
		const total = e.lengthComputable ? e.total : void 0;
		const loaded = Math.max(0, total != null ? Math.min(rawLoaded, total) : rawLoaded);
		const progressBytes = Math.max(0, loaded - bytesNotified);
		const rate = _speedometer(progressBytes);
		bytesNotified = Math.max(bytesNotified, loaded);
		listener({
			loaded,
			total,
			progress: total ? loaded / total : void 0,
			bytes: progressBytes,
			rate: rate ? rate : void 0,
			estimated: rate && total ? (total - loaded) / rate : void 0,
			event: e,
			lengthComputable: total != null,
			[isDownloadStream ? "download" : "upload"]: true
		});
	}, freq);
};
var progressEventDecorator = (total, throttled) => {
	const lengthComputable = total != null;
	return [(loaded) => throttled[0]({
		lengthComputable,
		total,
		loaded
	}), throttled[1]];
};
var asyncDecorator = (fn, scheduler = utils_default.asap) => (...args) => scheduler(() => fn(...args));
// node_modules/axios/lib/helpers/estimateDataURLDecodedBytes.js
/**
* Estimate data: URL byte lengths *without* allocating large buffers.
* - Fetch percent-decodes a base64 body before decoding it.
* - Node's Buffer.from(body, 'base64') sizes its backing allocation from the
*   raw body, including ignored characters and content after padding.
* - Non-base64 data is percent-decoded and then encoded as UTF-8.
*/
var isHexDigit = (charCode) => charCode >= 48 && charCode <= 57 || charCode >= 65 && charCode <= 70 || charCode >= 97 && charCode <= 102;
var isPercentEncodedByte = (str, i, len) => i + 2 < len && isHexDigit(str.charCodeAt(i + 1)) && isHexDigit(str.charCodeAt(i + 2));
var hexValue = (charCode) => charCode <= 57 ? charCode - 48 : (charCode & 223) - 55;
var isBase64Char = (charCode) => charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122 || charCode >= 48 && charCode <= 57 || charCode === 43 || charCode === 47 || charCode === 45 || charCode === 95;
var isBase64Whitespace = (charCode) => charCode === 9 || charCode === 10 || charCode === 12 || charCode === 13 || charCode === 32;
var base64Bytes = (significant) => {
	const groups = Math.floor(significant / 4);
	const remainder = significant % 4;
	return groups * 3 + (remainder === 2 ? 1 : remainder === 3 ? 2 : 0);
};
var estimateBase64BufferAllocation = (body) => {
	const len = body.length;
	let padding = 0;
	if (len > 0 && body.charCodeAt(len - 1) === 61) {
		padding++;
		if (len > 1 && body.charCodeAt(len - 2) === 61) padding++;
	}
	return Math.floor((len - padding) * 3 / 4);
};
var estimatePercentDecodedBase64Bytes = (body) => {
	const len = body.length;
	let significant = 0;
	let padding = 0;
	let invalid = false;
	for (let i = 0; i < len; i++) {
		let code = body.charCodeAt(i);
		if (code === 37 && isPercentEncodedByte(body, i, len)) {
			code = hexValue(body.charCodeAt(i + 1)) * 16 + hexValue(body.charCodeAt(i + 2));
			i += 2;
		}
		if (isBase64Whitespace(code)) continue;
		if (code === 61) {
			padding++;
			continue;
		}
		if (!isBase64Char(code) || padding > 0) {
			invalid = true;
			continue;
		}
		significant++;
	}
	if (invalid || padding > 2 || padding > 0 && (significant + padding) % 4 !== 0 || significant % 4 === 1) return estimateBase64BufferAllocation(body);
	return base64Bytes(significant);
};
var estimateDataURLBytes = (url, estimateBase64) => {
	if (!url || typeof url !== "string") return 0;
	if (!url.startsWith("data:")) return 0;
	const comma = url.indexOf(",");
	if (comma < 0) return 0;
	const meta = url.slice(5, comma);
	const body = url.slice(comma + 1);
	if (/;base64/i.test(meta)) return estimateBase64(body);
	let bytes = 0;
	for (let i = 0, len = body.length; i < len; i++) {
		const c = body.charCodeAt(i);
		if (c === 37 && isPercentEncodedByte(body, i, len)) {
			bytes += 1;
			i += 2;
		} else if (c < 128) bytes += 1;
		else if (c < 2048) bytes += 2;
		else if (c >= 55296 && c <= 56319 && i + 1 < len) {
			const next = body.charCodeAt(i + 1);
			if (next >= 56320 && next <= 57343) {
				bytes += 4;
				i++;
			} else bytes += 3;
		} else bytes += 3;
	}
	return bytes;
};
/**
* Estimate the percent-decoded payload size used by Fetch data: URLs.
*
* @param {string} url
* @returns {number}
*/
function estimateDataURLDecodedBytes(url) {
	const fragmentIndex = typeof url === "string" ? url.indexOf("#") : -1;
	return estimateDataURLBytes(fragmentIndex === -1 ? url : url.slice(0, fragmentIndex), estimatePercentDecodedBase64Bytes);
}
/**
* Estimate the Buffer backing allocation used by Node's raw base64 decoder.
*
* @param {string} url
* @returns {number}
*/
function estimateDataURLBufferAllocation(url) {
	return estimateDataURLBytes(url, estimateBase64BufferAllocation);
}
// node_modules/axios/lib/adapters/http.js
var zlibOptions = {
	flush: zlib.constants.Z_SYNC_FLUSH,
	finishFlush: zlib.constants.Z_SYNC_FLUSH
};
var brotliOptions = {
	flush: zlib.constants.BROTLI_OPERATION_FLUSH,
	finishFlush: zlib.constants.BROTLI_OPERATION_FLUSH
};
var zstdOptions = {
	flush: zlib.constants.ZSTD_e_flush,
	finishFlush: zlib.constants.ZSTD_e_flush
};
var isBrotliSupported = utils_default.isFunction(zlib.createBrotliDecompress);
var isZstdSupported = utils_default.isFunction(zlib.createZstdDecompress);
var ACCEPT_ENCODING = "gzip, compress, deflate" + (isBrotliSupported ? ", br" : "");
var ACCEPT_ENCODING_WITH_ZSTD = ACCEPT_ENCODING + (isZstdSupported ? ", zstd" : "");
var scheduleProgress = typeof process !== "undefined" && process.nextTick ? process.nextTick.bind(process) : utils_default.asap;
var { http: httpFollow, https: httpsFollow } = import_follow_redirects.default;
var isHttps = /https:?/;
var kAxiosSocketListener = Symbol("axios.http.socketListener");
var kAxiosCurrentReq = Symbol("axios.http.currentReq");
function handleSocketError(err) {
	const current = this[kAxiosCurrentReq];
	if (current && !current.destroyed) current.destroy(err);
}
var kAxiosInstalledTunnel = Symbol("axios.http.installedTunnel");
var tunnelingAgentCache = /* @__PURE__ */ new Map();
var tunnelingAgentCacheUser = /* @__PURE__ */ new WeakMap();
var NODE_NATIVE_ENV_PROXY_SUPPORT = {
	22: 21,
	24: 5
};
function isNodeNativeEnvProxySupported(nodeVersion = process.versions && process.versions.node) {
	if (!nodeVersion) return false;
	const [major, minor] = nodeVersion.split(".").map((part) => Number(part));
	if (!Number.isInteger(major) || !Number.isInteger(minor)) return false;
	if (major > 24) return true;
	return NODE_NATIVE_ENV_PROXY_SUPPORT[major] != null && minor >= NODE_NATIVE_ENV_PROXY_SUPPORT[major];
}
function isNodeEnvProxyEnabled(agent, nodeVersion = process.versions && process.versions.node) {
	if (!isNodeNativeEnvProxySupported(nodeVersion)) return false;
	const agentOptions = agent && agent.options;
	return Boolean(agentOptions && utils_default.hasOwnProp(agentOptions, "proxyEnv") && agentOptions.proxyEnv != null);
}
function getProxyEnvAgent(options, configHttpAgent, configHttpsAgent) {
	return isHttps.test(options.protocol) ? configHttpsAgent || https.globalAgent : configHttpAgent || http.globalAgent;
}
function getTunnelingAgent(agentOptions, userHttpsAgent) {
	const key = agentOptions.protocol + "//" + agentOptions.hostname + ":" + (agentOptions.port || "") + "#" + (agentOptions.auth || "");
	const cache = userHttpsAgent ? tunnelingAgentCacheUser.get(userHttpsAgent) || tunnelingAgentCacheUser.set(userHttpsAgent, /* @__PURE__ */ new Map()).get(userHttpsAgent) : tunnelingAgentCache;
	let agent = cache.get(key);
	if (agent) return agent;
	const merged = userHttpsAgent && userHttpsAgent.options ? {
		...userHttpsAgent.options,
		...agentOptions
	} : agentOptions;
	agent = new import_dist.default(merged);
	if (userHttpsAgent && userHttpsAgent.options) {
		const originTLSOptions = { ...userHttpsAgent.options };
		const callback = agent.callback;
		agent.callback = function axiosTunnelingAgentCallback(req, opts) {
			return callback.call(this, req, {
				...originTLSOptions,
				...opts
			});
		};
	}
	agent[kAxiosInstalledTunnel] = true;
	cache.set(key, agent);
	return agent;
}
var supportedProtocols = platform_default.protocols.map((protocol) => {
	return protocol + ":";
});
var decodeURIComponentSafe$1 = (value) => {
	if (!utils_default.isString(value)) return value;
	try {
		return decodeURIComponent(value);
	} catch (error) {
		return value;
	}
};
var flushOnFinish = (stream, [throttled, flush]) => {
	stream.on("end", flush).on("error", flush);
	return throttled;
};
var http2Sessions = new Http2Sessions();
/**
* If the proxy, auth, sensitive header, or config beforeRedirects functions are defined,
* call them with the options object.
*
* @param {Object<string, any>} options - The options object that was passed to the request.
*
* @returns {Object<string, any>}
*/
function dispatchBeforeRedirect(options, responseDetails, requestDetails) {
	if (options.beforeRedirects.proxy) options.beforeRedirects.proxy(options);
	if (options.beforeRedirects.auth) options.beforeRedirects.auth(options);
	if (options.beforeRedirects.sensitiveHeaders) options.beforeRedirects.sensitiveHeaders(options, requestDetails);
	if (options.beforeRedirects.config) options.beforeRedirects.config(options, responseDetails, requestDetails);
}
function stripMatchingHeaders(headers, sensitiveSet) {
	if (!headers) return;
	Object.keys(headers).forEach((header) => {
		if (sensitiveSet.has(header.toLowerCase())) delete headers[header];
	});
}
function isSameOriginRedirect(redirectOptions, requestDetails) {
	if (!requestDetails) return false;
	try {
		return new URL(requestDetails.url).origin === new URL(redirectOptions.href).origin;
	} catch (e) {
		return false;
	}
}
/**
* If the proxy or config afterRedirects functions are defined, call them with the options
*
* @param {http.ClientRequestArgs} options
* @param {AxiosProxyConfig} configProxy configuration from Axios options object
* @param {string} location
* @param {boolean} [allowEnvProxy=true] whether environment proxy configuration can be used
*
* @returns {boolean} whether a proxy applies to the selected transport
*/
function setProxy(options, configProxy, location, isRedirect, configHttpsAgent, configHttpAgent, allowEnvProxy = true) {
	let proxy = configProxy;
	const proxyEnvAgent = getProxyEnvAgent(options, configHttpAgent, configHttpsAgent);
	if (!proxy && proxy !== false && allowEnvProxy && !isNodeEnvProxyEnabled(proxyEnvAgent)) {
		const proxyUrl = getProxyForUrl(location);
		if (proxyUrl) {
			if (!shouldBypassProxy(location)) proxy = new URL(proxyUrl);
		}
	}
	if (isRedirect && options.headers) {
		for (const name of Object.keys(options.headers)) if (name.toLowerCase() === "proxy-authorization") delete options.headers[name];
	}
	if (isRedirect && options.agent && options.agent[kAxiosInstalledTunnel]) options.agent = void 0;
	if (proxy) {
		const isProxyURL = proxy instanceof URL;
		const readProxyField = (key) => isProxyURL || utils_default.hasOwnProp(proxy, key) ? proxy[key] : void 0;
		const proxyUsername = readProxyField("username");
		const proxyPassword = readProxyField("password");
		let proxyAuth = utils_default.hasOwnProp(proxy, "auth") ? proxy.auth : void 0;
		if (proxyUsername) proxyAuth = (proxyUsername || "") + ":" + (proxyPassword || "");
		if (proxyAuth) {
			const authIsObject = typeof proxyAuth === "object";
			const authUsername = authIsObject && utils_default.hasOwnProp(proxyAuth, "username") ? proxyAuth.username : void 0;
			const authPassword = authIsObject && utils_default.hasOwnProp(proxyAuth, "password") ? proxyAuth.password : void 0;
			if (Boolean(authUsername || authPassword)) proxyAuth = (authUsername || "") + ":" + (authPassword || "");
			else if (authIsObject) throw new AxiosError("Invalid proxy authorization", AxiosError.ERR_BAD_OPTION, { proxy });
		}
		if (isHttps.test(options.protocol)) {
			if (!(configHttpsAgent instanceof import_dist.default)) {
				const proxyHost = readProxyField("hostname") || readProxyField("host");
				const proxyPort = readProxyField("port");
				const rawProxyProtocol = readProxyField("protocol");
				const normalizedProtocol = rawProxyProtocol ? rawProxyProtocol.includes(":") ? rawProxyProtocol : `${rawProxyProtocol}:` : "http:";
				const proxyHostForURL = proxyHost && proxyHost.includes(":") && !proxyHost.startsWith("[") ? `[${proxyHost}]` : proxyHost;
				const proxyURL = new URL(`${normalizedProtocol}//${proxyHostForURL}${proxyPort ? ":" + proxyPort : ""}`);
				const agentOptions = {
					protocol: proxyURL.protocol,
					hostname: proxyURL.hostname.replace(/^\[|\]$/g, ""),
					port: proxyURL.port,
					auth: proxyAuth && typeof proxyAuth === "string" ? proxyAuth : void 0
				};
				if (proxyURL.protocol === "https:") agentOptions.ALPNProtocols = ["http/1.1"];
				const tunnelingAgent = getTunnelingAgent(agentOptions, configHttpsAgent);
				options.agent = tunnelingAgent;
				if (options.agents) options.agents.https = tunnelingAgent;
			}
		} else {
			if (proxyAuth) {
				const base64 = Buffer.from(proxyAuth, "utf8").toString("base64");
				options.headers["Proxy-Authorization"] = "Basic " + base64;
			}
			let hasUserHostHeader = false;
			for (const name of Object.keys(options.headers)) if (name.toLowerCase() === "host") {
				hasUserHostHeader = true;
				break;
			}
			if (!hasUserHostHeader) options.headers.host = options.hostname + (options.port ? ":" + options.port : "");
			const proxyHost = readProxyField("hostname") || readProxyField("host");
			options.hostname = proxyHost;
			options.host = proxyHost;
			options.port = readProxyField("port");
			options.path = location;
			const proxyProtocol = readProxyField("protocol");
			if (proxyProtocol) options.protocol = proxyProtocol.includes(":") ? proxyProtocol : `${proxyProtocol}:`;
		}
	}
	options.beforeRedirects.proxy = function beforeRedirect(redirectOptions) {
		setProxy(redirectOptions, configProxy, redirectOptions.href, true, configHttpsAgent, configHttpAgent, allowEnvProxy);
	};
	return Boolean(proxy || configProxy !== false && allowEnvProxy && isNodeEnvProxyEnabled(proxyEnvAgent));
}
var isHttpAdapterSupported = typeof process !== "undefined" && utils_default.kindOf(process) === "process";
var wrapAsync = (asyncExecutor) => {
	return new Promise((resolve, reject) => {
		let onDone;
		let isDone;
		const done = (value, isRejected) => {
			if (isDone) return;
			isDone = true;
			onDone && onDone(value, isRejected);
		};
		const _resolve = (value) => {
			done(value);
			resolve(value);
		};
		const _reject = (reason) => {
			done(reason, true);
			reject(reason);
		};
		asyncExecutor(_resolve, _reject, (onDoneHandler) => onDone = onDoneHandler).catch(_reject);
	});
};
var resolveFamily = ({ address, family }) => {
	if (!utils_default.isString(address)) throw new AxiosError("address must be a string", AxiosError.ERR_BAD_OPTION_VALUE);
	return {
		address,
		family: family || (address.indexOf(".") < 0 ? 6 : 4)
	};
};
var buildAddressEntry = (address, family) => resolveFamily(utils_default.isObject(address) ? address : {
	address,
	family
});
var normalizedLookupCache = /* @__PURE__ */ new WeakMap();
var normalizeLookup = (lookup) => {
	let normalized = normalizedLookupCache.get(lookup);
	if (normalized) return normalized;
	const callbackLookup = callbackify(lookup, (value) => utils_default.isArray(value) ? value : [value]);
	normalized = (hostname, opt, cb) => {
		callbackLookup(hostname, opt, (err, arg0, arg1) => {
			if (err) return cb(err);
			let addresses;
			try {
				addresses = utils_default.isArray(arg0) ? arg0.map((addr) => buildAddressEntry(addr)) : [buildAddressEntry(arg0, arg1)];
			} catch (error) {
				return cb(error);
			}
			opt.all ? cb(err, addresses) : cb(err, addresses[0].address, addresses[0].family);
		});
	};
	normalizedLookupCache.set(lookup, normalized);
	return normalized;
};
var http2Transport = { request(options, cb) {
	const authority = options.protocol + "//" + options.hostname + ":" + (options.port || (options.protocol === "https:" ? 443 : 80));
	const { http2Options, headers } = options;
	const session = http2Sessions.getSession(authority, http2Options);
	const { HTTP2_HEADER_SCHEME, HTTP2_HEADER_METHOD, HTTP2_HEADER_PATH, HTTP2_HEADER_STATUS } = http2.constants;
	const http2Headers = {
		[HTTP2_HEADER_SCHEME]: options.protocol.replace(":", ""),
		[HTTP2_HEADER_METHOD]: options.method,
		[HTTP2_HEADER_PATH]: options.path
	};
	utils_default.forEach(headers, (header, name) => {
		name.charAt(0) !== ":" && (http2Headers[name] = header);
	});
	const req = session.request(http2Headers);
	req.once("response", (responseHeaders) => {
		const response = req;
		responseHeaders = Object.assign({}, responseHeaders);
		const status = responseHeaders[HTTP2_HEADER_STATUS];
		delete responseHeaders[HTTP2_HEADER_STATUS];
		response.headers = responseHeaders;
		response.statusCode = +status;
		cb(response);
	});
	return req;
} };
var http_default = isHttpAdapterSupported && function httpAdapter(config) {
	return wrapAsync(async function dispatchHttpRequest(resolve$1, reject, onDone) {
		const own = (key) => utils_default.getSafeProp(config, key);
		const transitional = own("transitional") || transitional_default;
		let data = own("data");
		let lookup = own("lookup");
		let family = own("family");
		let httpVersion = own("httpVersion");
		if (httpVersion === void 0) httpVersion = 1;
		const rawHttpVersion = httpVersion;
		let http2Options = own("http2Options");
		const httpAgent = own("httpAgent");
		const httpsAgent = own("httpsAgent");
		const configProxy = own("proxy");
		const responseType = own("responseType");
		const responseEncoding = own("responseEncoding");
		const socketPath = own("socketPath");
		const method = own("method").toUpperCase();
		const maxRedirects = own("maxRedirects");
		const maxBodyLength = own("maxBodyLength");
		const maxContentLength = own("maxContentLength");
		const decompress = own("decompress");
		let isDone;
		let rejected = false;
		let req;
		let connectPhaseTimer;
		try {
			httpVersion = +httpVersion;
		} catch (err) {
			throw new AxiosError("Invalid protocol version: value is not a number", AxiosError.ERR_BAD_OPTION_VALUE, config);
		}
		if (Number.isNaN(httpVersion)) throw new AxiosError(`Invalid protocol version: '${rawHttpVersion}' is not a number`, AxiosError.ERR_BAD_OPTION_VALUE, config);
		if (httpVersion !== 1 && httpVersion !== 2) throw new AxiosError(`Unsupported protocol version '${httpVersion}'`, AxiosError.ERR_BAD_OPTION_VALUE, config);
		const isHttp2 = httpVersion === 2;
		if (lookup) lookup = normalizeLookup(lookup);
		const abortEmitter = new EventEmitter();
		function abort(reason) {
			try {
				abortEmitter.emit("abort", !reason || reason.type ? new CanceledError(null, config, req) : reason);
			} catch (err) {}
		}
		function clearConnectPhaseTimer() {
			if (connectPhaseTimer) {
				clearTimeout(connectPhaseTimer);
				connectPhaseTimer = null;
			}
		}
		function createTimeoutError() {
			const configTimeout = own("timeout");
			let timeoutErrorMessage = configTimeout ? "timeout of " + configTimeout + "ms exceeded" : "timeout exceeded";
			const configTimeoutErrorMessage = own("timeoutErrorMessage");
			if (configTimeoutErrorMessage) timeoutErrorMessage = configTimeoutErrorMessage;
			return new AxiosError(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED, config, req);
		}
		abortEmitter.once("abort", reject);
		const onFinished = () => {
			clearConnectPhaseTimer();
			if (config.cancelToken) config.cancelToken.unsubscribe(abort);
			if (config.signal) config.signal.removeEventListener("abort", abort);
			abortEmitter.removeAllListeners();
		};
		if (config.cancelToken || config.signal) {
			config.cancelToken && config.cancelToken.subscribe(abort);
			if (config.signal) config.signal.aborted ? abort() : config.signal.addEventListener("abort", abort);
		}
		onDone((response, isRejected) => {
			isDone = true;
			clearConnectPhaseTimer();
			if (isRejected) {
				rejected = true;
				onFinished();
				return;
			}
			const { data } = response;
			if (data instanceof stream.Readable || data instanceof stream.Duplex) {
				const offListeners = stream.finished(data, () => {
					offListeners();
					onFinished();
				});
			} else onFinished();
		});
		const fullPath = buildFullPath(own("baseURL"), own("url"), own("allowAbsoluteUrls"), config);
		const urlBase = socketPath ? "http://localhost" : platform_default.hasBrowserEnv ? platform_default.origin : void 0;
		const parsed = new URL(fullPath, urlBase);
		const protocol = parsed.protocol || supportedProtocols[0];
		if (protocol === "data:") {
			if (maxContentLength > -1) {
				if (estimateDataURLBufferAllocation(String(own("url") || fullPath || "")) > maxContentLength) return reject(new AxiosError("maxContentLength size of " + maxContentLength + " exceeded", AxiosError.ERR_BAD_RESPONSE, config));
			}
			let convertedData;
			if (method !== "GET") return settle(resolve$1, reject, {
				status: 405,
				statusText: "method not allowed",
				headers: {},
				config
			});
			try {
				convertedData = fromDataURI(own("url"), responseType === "blob", { Blob: config.env && config.env.Blob });
			} catch (err) {
				throw AxiosError.from(err, AxiosError.ERR_BAD_REQUEST, config);
			}
			if (responseType === "text") {
				convertedData = convertedData.toString(responseEncoding);
				if (!responseEncoding || responseEncoding === "utf8") convertedData = utils_default.stripBOM(convertedData);
			} else if (responseType === "stream") convertedData = stream.Readable.from(convertedData);
			return settle(resolve$1, reject, {
				data: convertedData,
				status: 200,
				statusText: "OK",
				headers: new AxiosHeaders(),
				config
			});
		}
		if (supportedProtocols.indexOf(protocol) === -1) return reject(new AxiosError("Unsupported protocol " + protocol, AxiosError.ERR_BAD_REQUEST, config));
		const headers = AxiosHeaders.from(config.headers).normalize();
		headers.set("User-Agent", "axios/1.20.0", false);
		const { onUploadProgress, onDownloadProgress } = config;
		const maxRate = config.maxRate;
		let maxUploadRate = void 0;
		let maxDownloadRate = void 0;
		if (utils_default.isSpecCompliantForm(data)) {
			const userBoundary = headers.getContentType(/boundary=([-_\w\d]{10,70})/i);
			data = formDataToStream(data, (formHeaders) => {
				headers.set(formHeaders);
			}, {
				tag: `axios-1.20.0-boundary`,
				boundary: userBoundary && userBoundary[1] || void 0
			});
		} else if (utils_default.isFormData(data) && utils_default.isFunction(data.getHeaders) && data.getHeaders !== Object.prototype.getHeaders) {
			setFormDataHeaders(headers, data.getHeaders(), own("formDataHeaderPolicy"));
			if (!headers.hasContentLength()) try {
				const knownLength = await util.promisify(data.getLength).call(data);
				Number.isFinite(knownLength) && knownLength >= 0 && headers.setContentLength(knownLength);
			} catch (e) {}
		} else if (utils_default.isBlob(data) || utils_default.isFile(data)) {
			data.size && headers.setContentType(data.type || "application/octet-stream");
			headers.setContentLength(data.size || 0);
			data = stream.Readable.from(readBlob(data));
		} else if (data && !utils_default.isStream(data)) {
			if (Buffer.isBuffer(data)) {} else if (utils_default.isArrayBuffer(data)) data = Buffer.from(new Uint8Array(data));
			else if (utils_default.isString(data)) data = Buffer.from(data, "utf-8");
			else return reject(new AxiosError("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream", AxiosError.ERR_BAD_REQUEST, config));
			headers.setContentLength(data.length, false);
			if (maxBodyLength > -1 && data.length > maxBodyLength) return reject(new AxiosError("Request body larger than maxBodyLength limit", AxiosError.ERR_BAD_REQUEST, config));
		}
		const contentLength = utils_default.toFiniteNumber(headers.getContentLength());
		if (utils_default.isArray(maxRate)) {
			maxUploadRate = maxRate[0];
			maxDownloadRate = maxRate[1];
		} else maxUploadRate = maxDownloadRate = maxRate;
		if (data && (onUploadProgress || maxUploadRate)) {
			if (!utils_default.isStream(data)) data = stream.Readable.from(data, { objectMode: false });
			data = stream.pipeline([data, new AxiosTransformStream({ maxRate: utils_default.toFiniteNumber(maxUploadRate) })], utils_default.noop);
			onUploadProgress && data.on("progress", flushOnFinish(data, progressEventDecorator(contentLength, progressEventReducer(asyncDecorator(onUploadProgress, scheduleProgress), false, 3))));
		}
		let auth = void 0;
		const configAuth = own("auth");
		if (configAuth) {
			const username = utils_default.getSafeProp(configAuth, "username") || "";
			const password = utils_default.getSafeProp(configAuth, "password") || "";
			auth = username + ":" + password;
		}
		if (!auth && (parsed.username || parsed.password)) {
			const urlUsername = decodeURIComponentSafe$1(parsed.username);
			const urlPassword = decodeURIComponentSafe$1(parsed.password);
			auth = urlUsername + ":" + urlPassword;
		}
		auth && headers.delete("authorization");
		let path;
		try {
			path = buildURL(parsed.pathname + parsed.search, own("params"), own("paramsSerializer")).replace(/^\?/, "");
		} catch (err) {
			return reject(AxiosError.from(err, AxiosError.ERR_BAD_REQUEST, config, null, null, {
				url: own("url"),
				exists: true
			}));
		}
		headers.set("Accept-Encoding", utils_default.hasOwnProp(transitional, "advertiseZstdAcceptEncoding") && transitional.advertiseZstdAcceptEncoding === true ? ACCEPT_ENCODING_WITH_ZSTD : ACCEPT_ENCODING, false);
		if (isHttp2 && lookup) http2Options = Object.assign(Object.create(null), http2Options, { lookup });
		const options = Object.assign(Object.create(null), {
			path,
			method,
			headers: toByteStringHeaderObject(headers),
			agents: {
				http: httpAgent,
				https: httpsAgent
			},
			auth,
			protocol,
			family,
			beforeRedirect: dispatchBeforeRedirect,
			beforeRedirects: Object.create(null),
			http2Options,
			createConnection: void 0
		});
		!utils_default.isUndefined(lookup) && (options.lookup = lookup);
		let proxyApplied = false;
		if (socketPath) {
			if (typeof socketPath !== "string") return reject(new AxiosError("socketPath must be a string", AxiosError.ERR_BAD_OPTION_VALUE, config));
			const allowedSocketPaths = own("allowedSocketPaths");
			if (allowedSocketPaths != null) {
				const allowed = Array.isArray(allowedSocketPaths) ? allowedSocketPaths : [allowedSocketPaths];
				const resolvedSocket = resolve(socketPath);
				if (!allowed.some((entry) => typeof entry === "string" && resolve(entry) === resolvedSocket)) return reject(new AxiosError(`socketPath "${socketPath}" is not permitted by allowedSocketPaths`, AxiosError.ERR_BAD_OPTION_VALUE, config));
			}
			options.socketPath = socketPath;
		} else {
			options.hostname = parsed.hostname.startsWith("[") ? parsed.hostname.slice(1, -1) : parsed.hostname;
			options.port = parsed.port;
			proxyApplied = setProxy(options, configProxy, protocol + "//" + parsed.hostname + (parsed.port ? ":" + parsed.port : "") + options.path, false, httpsAgent, httpAgent, !isHttp2);
		}
		let transport;
		let isNativeTransport = false;
		let transportEnforcesMaxBodyLength = false;
		const isHttpsRequest = isHttps.test(options.protocol);
		if (options.agent == null) options.agent = isHttpsRequest ? httpsAgent : httpAgent;
		if (isHttp2) {
			if (proxyApplied) return reject(new AxiosError("HTTP/2 requests with a proxy are not supported", AxiosError.ERR_NOT_SUPPORT, config));
			transport = http2Transport;
		} else {
			const configTransport = own("transport");
			if (configTransport) transport = configTransport;
			else if (maxRedirects === 0) {
				transport = isHttpsRequest ? https : http;
				isNativeTransport = true;
			} else {
				transportEnforcesMaxBodyLength = true;
				options.sensitiveHeaders = [];
				if (maxRedirects) options.maxRedirects = maxRedirects;
				const configBeforeRedirect = own("beforeRedirect");
				if (configBeforeRedirect) options.beforeRedirects.config = configBeforeRedirect;
				if (auth) {
					const requestOrigin = parsed.origin;
					const authToRestore = auth;
					options.beforeRedirects.auth = function beforeRedirectAuth(redirectOptions) {
						try {
							if (new URL(redirectOptions.href).origin === requestOrigin) redirectOptions.auth = authToRestore;
						} catch (e) {}
					};
				}
				const sensitiveHeaders = own("sensitiveHeaders");
				if (sensitiveHeaders != null) {
					if (!utils_default.isArray(sensitiveHeaders)) return reject(new AxiosError("sensitiveHeaders must be an array of strings", AxiosError.ERR_BAD_OPTION_VALUE, config));
					const sensitiveSet = /* @__PURE__ */ new Set();
					for (const header of sensitiveHeaders) {
						if (!utils_default.isString(header)) return reject(new AxiosError("sensitiveHeaders must be an array of strings", AxiosError.ERR_BAD_OPTION_VALUE, config));
						sensitiveSet.add(header.toLowerCase());
					}
					if (sensitiveSet.size) {
						options.sensitiveHeaders = Array.from(sensitiveSet);
						options.beforeRedirects.sensitiveHeaders = function beforeRedirectSensitiveHeaders(redirectOptions, requestDetails) {
							if (!isSameOriginRedirect(redirectOptions, requestDetails)) stripMatchingHeaders(redirectOptions.headers, sensitiveSet);
						};
					}
				}
				transport = isHttpsRequest ? httpsFollow : httpFollow;
			}
		}
		if (maxBodyLength > -1) options.maxBodyLength = maxBodyLength;
		else options.maxBodyLength = Infinity;
		options.insecureHTTPParser = Boolean(own("insecureHTTPParser"));
		req = transport.request(options, function handleResponse(res) {
			clearConnectPhaseTimer();
			if (req.destroyed) return;
			const streams = [res];
			const responseLength = utils_default.toFiniteNumber(res.headers["content-length"]);
			if (onDownloadProgress || maxDownloadRate) {
				const transformStream = new AxiosTransformStream({ maxRate: utils_default.toFiniteNumber(maxDownloadRate) });
				onDownloadProgress && transformStream.on("progress", flushOnFinish(transformStream, progressEventDecorator(responseLength, progressEventReducer(asyncDecorator(onDownloadProgress, scheduleProgress), true, 3))));
				streams.push(transformStream);
			}
			let responseStream = res;
			const lastRequest = res.req || req;
			if (decompress !== false && res.headers["content-encoding"]) {
				if (method === "HEAD" || res.statusCode === 204) delete res.headers["content-encoding"];
				switch ((res.headers["content-encoding"] || "").toLowerCase()) {
					case "gzip":
					case "x-gzip":
					case "compress":
					case "x-compress":
						streams.push(zlib.createUnzip(zlibOptions));
						delete res.headers["content-encoding"];
						break;
					case "deflate":
						streams.push(new ZlibHeaderTransformStream());
						streams.push(zlib.createUnzip(zlibOptions));
						delete res.headers["content-encoding"];
						break;
					case "br":
						if (isBrotliSupported) {
							streams.push(zlib.createBrotliDecompress(brotliOptions));
							delete res.headers["content-encoding"];
						}
						break;
					case "zstd": if (isZstdSupported) {
						streams.push(zlib.createZstdDecompress(zstdOptions));
						delete res.headers["content-encoding"];
					}
				}
			}
			responseStream = streams.length > 1 ? stream.pipeline(streams, utils_default.noop) : streams[0];
			const response = {
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: new AxiosHeaders(res.headers),
				config,
				request: lastRequest
			};
			if (responseType === "stream") {
				if (maxContentLength > -1) {
					const limit = maxContentLength;
					const source = responseStream;
					async function* enforceMaxContentLength() {
						let totalResponseBytes = 0;
						for await (const chunk of source) {
							totalResponseBytes += chunk.length;
							if (totalResponseBytes > limit) throw new AxiosError("maxContentLength size of " + limit + " exceeded", AxiosError.ERR_BAD_RESPONSE, config, lastRequest);
							yield chunk;
						}
					}
					responseStream = stream.Readable.from(enforceMaxContentLength(), { objectMode: false });
				}
				response.data = responseStream;
				settle(resolve$1, reject, response);
			} else {
				const responseBuffer = [];
				let totalResponseBytes = 0;
				responseStream.on("data", function handleStreamData(chunk) {
					responseBuffer.push(chunk);
					totalResponseBytes += chunk.length;
					if (maxContentLength > -1 && totalResponseBytes > maxContentLength) {
						rejected = true;
						responseStream.destroy();
						abort(new AxiosError("maxContentLength size of " + maxContentLength + " exceeded", AxiosError.ERR_BAD_RESPONSE, config, lastRequest));
					}
				});
				responseStream.on("aborted", function handlerStreamAborted() {
					if (rejected) return;
					const err = new AxiosError("stream has been aborted", AxiosError.ERR_BAD_RESPONSE, config, lastRequest, response);
					responseStream.destroy(err);
					reject(err);
				});
				responseStream.on("error", function handleStreamError(err) {
					if (rejected) return;
					reject(AxiosError.from(err, null, config, lastRequest, response));
				});
				responseStream.on("end", function handleStreamEnd() {
					try {
						let responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);
						if (responseType !== "arraybuffer") {
							responseData = responseData.toString(responseEncoding);
							if (!responseEncoding || responseEncoding === "utf8") responseData = utils_default.stripBOM(responseData);
						}
						response.data = responseData;
					} catch (err) {
						return reject(AxiosError.from(err, null, config, response.request, response));
					}
					settle(resolve$1, reject, response);
				});
			}
			abortEmitter.once("abort", (err) => {
				if (!responseStream.destroyed) {
					responseStream.emit("error", err);
					responseStream.destroy();
				}
			});
		});
		abortEmitter.once("abort", (err) => {
			if (req.close) req.close();
			else req.destroy(err);
		});
		req.on("error", function handleRequestError(err) {
			reject(AxiosError.from(err, null, config, req));
		});
		const boundSockets = /* @__PURE__ */ new Set();
		req.on("socket", function handleRequestSocket(socket) {
			if (typeof socket.setKeepAlive === "function") socket.setKeepAlive(true, 6e4);
			if (!socket[kAxiosSocketListener]) {
				socket.on("error", handleSocketError);
				socket[kAxiosSocketListener] = true;
			}
			socket[kAxiosCurrentReq] = req;
			boundSockets.add(socket);
		});
		req.once("close", function clearCurrentReq() {
			clearConnectPhaseTimer();
			for (const socket of boundSockets) if (socket[kAxiosCurrentReq] === req) socket[kAxiosCurrentReq] = null;
			boundSockets.clear();
		});
		if (own("timeout")) {
			const timeout = parseInt(own("timeout"), 10);
			if (Number.isNaN(timeout)) {
				abort(new AxiosError("error trying to parse `config.timeout` to int", AxiosError.ERR_BAD_OPTION_VALUE, config, req));
				return;
			}
			const handleTimeout = function handleTimeout() {
				if (isDone) return;
				abort(createTimeoutError());
			};
			if (isNativeTransport && timeout > 0) connectPhaseTimer = setTimeout(handleTimeout, timeout);
			req.setTimeout(timeout, handleTimeout);
		} else req.setTimeout(0);
		if (utils_default.isStream(data)) {
			let ended = false;
			let errored = false;
			data.on("end", () => {
				ended = true;
			});
			data.once("error", (err) => {
				errored = true;
				req.destroy(err);
			});
			data.on("close", () => {
				if (!ended && !errored) abort(new CanceledError("Request stream has been aborted", config, req));
			});
			let uploadStream = data;
			if (maxBodyLength > -1 && !transportEnforcesMaxBodyLength) {
				const limit = maxBodyLength;
				let bytesSent = 0;
				uploadStream = stream.pipeline([data, new stream.Transform({ transform(chunk, _enc, cb) {
					bytesSent += chunk.length;
					if (bytesSent > limit) return cb(new AxiosError("Request body larger than maxBodyLength limit", AxiosError.ERR_BAD_REQUEST, config, req));
					cb(null, chunk);
				} })], utils_default.noop);
				uploadStream.on("error", (err) => {
					if (!req.destroyed) req.destroy(err);
				});
			}
			uploadStream.pipe(req);
		} else {
			data && req.write(data);
			req.end();
		}
	});
};
// node_modules/axios/lib/helpers/isURLSameOrigin.js
var isURLSameOrigin_default = platform_default.hasStandardBrowserEnv ? ((origin, isMSIE) => (url) => {
	url = new URL(url, platform_default.origin);
	return origin.protocol === url.protocol && origin.host === url.host && (isMSIE || origin.port === url.port);
})(new URL(platform_default.origin), platform_default.navigator && /(msie|trident)/i.test(platform_default.navigator.userAgent)) : () => true;
// node_modules/axios/lib/helpers/cookies.js
var cookies_default = platform_default.hasStandardBrowserEnv ? {
	write(name, value, expires, path, domain, secure, sameSite) {
		if (typeof document === "undefined") return;
		const cookie = [`${name}=${encodeURIComponent(value)}`];
		if (utils_default.isNumber(expires)) cookie.push(`expires=${new Date(expires).toUTCString()}`);
		if (utils_default.isString(path)) cookie.push(`path=${path}`);
		if (utils_default.isString(domain)) cookie.push(`domain=${domain}`);
		if (secure === true) cookie.push("secure");
		if (utils_default.isString(sameSite)) cookie.push(`SameSite=${sameSite}`);
		document.cookie = cookie.join("; ");
	},
	read(name) {
		if (typeof document === "undefined") return null;
		const cookies = document.cookie.split(";");
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].replace(/^\s+/, "");
			const eq = cookie.indexOf("=");
			if (eq !== -1 && cookie.slice(0, eq) === name) try {
				return decodeURIComponent(cookie.slice(eq + 1));
			} catch (e) {
				return cookie.slice(eq + 1);
			}
		}
		return null;
	},
	remove(name) {
		this.write(name, "", Date.now() - 864e5, "/");
	}
} : {
	write() {},
	read() {
		return null;
	},
	remove() {}
};
// node_modules/axios/lib/core/mergeConfig.js
var headersToObject = (thing) => thing instanceof AxiosHeaders ? { ...thing } : thing;
var ownEnumerableKeys = (thing) => {
	if (Object.getOwnPropertySymbols && Object.getOwnPropertyDescriptor) return Object.keys(thing).concat(Object.getOwnPropertySymbols(thing).filter((symbol) => Object.getOwnPropertyDescriptor(thing, symbol).enumerable));
	return Object.keys(thing);
};
/**
* Config-specific merge-function which creates a new config-object
* by merging two configuration objects together.
*
* @param {Object} config1
* @param {Object} config2
*
* @returns {Object} New object resulting from merging config2 to config1
*/
function mergeConfig(config1, config2) {
	config1 = config1 || {};
	config2 = config2 || {};
	const config = Object.create(null);
	Object.defineProperty(config, "hasOwnProperty", {
		__proto__: null,
		value: Object.prototype.hasOwnProperty,
		enumerable: false,
		writable: true,
		configurable: true
	});
	function getMergedValue(target, source, prop, caseless) {
		if (utils_default.isPlainObject(target) && utils_default.isPlainObject(source)) return utils_default.merge.call({ caseless }, target, source);
		else if (utils_default.isPlainObject(source)) return utils_default.merge({}, source);
		else if (utils_default.isArray(source)) return source.slice();
		return source;
	}
	function mergeDeepProperties(a, b, prop, caseless) {
		if (!utils_default.isUndefined(b)) return getMergedValue(a, b, prop, caseless);
		else if (!utils_default.isUndefined(a)) return getMergedValue(void 0, a, prop, caseless);
	}
	function valueFromConfig2(a, b) {
		if (!utils_default.isUndefined(b)) return getMergedValue(void 0, b);
	}
	function defaultToConfig2(a, b) {
		if (!utils_default.isUndefined(b)) return getMergedValue(void 0, b);
		else if (!utils_default.isUndefined(a)) return getMergedValue(void 0, a);
	}
	function getMergedTransitionalOption(prop) {
		const transitional2 = utils_default.hasOwnProp(config2, "transitional") ? config2.transitional : void 0;
		if (!utils_default.isUndefined(transitional2)) {
			if (utils_default.isPlainObject(transitional2)) {
				if (utils_default.hasOwnProp(transitional2, prop)) return transitional2[prop];
			} else return;
		}
		const transitional1 = utils_default.hasOwnProp(config1, "transitional") ? config1.transitional : void 0;
		if (utils_default.isPlainObject(transitional1) && utils_default.hasOwnProp(transitional1, prop)) return transitional1[prop];
	}
	function mergeDirectKeys(a, b, prop) {
		if (utils_default.hasOwnProp(config2, prop)) return getMergedValue(a, b);
		else if (utils_default.hasOwnProp(config1, prop)) return getMergedValue(void 0, a);
	}
	const mergeMap = {
		url: valueFromConfig2,
		method: valueFromConfig2,
		data: valueFromConfig2,
		baseURL: defaultToConfig2,
		transformRequest: defaultToConfig2,
		transformResponse: defaultToConfig2,
		paramsSerializer: defaultToConfig2,
		timeout: defaultToConfig2,
		timeoutErrorMessage: defaultToConfig2,
		withCredentials: defaultToConfig2,
		withXSRFToken: defaultToConfig2,
		adapter: defaultToConfig2,
		responseType: defaultToConfig2,
		xsrfCookieName: defaultToConfig2,
		xsrfHeaderName: defaultToConfig2,
		onUploadProgress: defaultToConfig2,
		onDownloadProgress: defaultToConfig2,
		decompress: defaultToConfig2,
		maxContentLength: defaultToConfig2,
		maxBodyLength: defaultToConfig2,
		beforeRedirect: defaultToConfig2,
		transport: defaultToConfig2,
		httpAgent: defaultToConfig2,
		httpsAgent: defaultToConfig2,
		cancelToken: defaultToConfig2,
		socketPath: defaultToConfig2,
		allowedSocketPaths: defaultToConfig2,
		responseEncoding: defaultToConfig2,
		validateStatus: mergeDirectKeys,
		headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
	};
	utils_default.forEach(ownEnumerableKeys({
		...config1,
		...config2
	}), function computeConfigValue(prop) {
		if (prop === "__proto__" || prop === "constructor" || prop === "prototype") return;
		const merge = utils_default.hasOwnProp(mergeMap, prop) ? mergeMap[prop] : mergeDeepProperties;
		const configValue = merge(utils_default.hasOwnProp(config1, prop) ? config1[prop] : void 0, utils_default.hasOwnProp(config2, prop) ? config2[prop] : void 0, prop);
		utils_default.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
	});
	if (utils_default.hasOwnProp(config2, "validateStatus") && utils_default.isUndefined(config2.validateStatus) && getMergedTransitionalOption("validateStatusUndefinedResolves") === false) {
		if (utils_default.hasOwnProp(config1, "validateStatus")) config.validateStatus = getMergedValue(void 0, config1.validateStatus);
		else delete config.validateStatus;
	}
	return config;
}
// node_modules/axios/lib/helpers/resolveConfig.js
/**
* Encode a UTF-8 string to a Latin-1 byte string for use with btoa().
* This is a modern replacement for the deprecated unescape(encodeURIComponent(str)) pattern.
*
* @param {string} str The string to encode
*
* @returns {string} UTF-8 bytes as a Latin-1 string
*/
var encodeUTF8$1 = (str) => encodeURIComponent(str).replace(/%([0-9A-F]{2})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
function resolveConfig(config) {
	const newConfig = mergeConfig({}, config);
	const own = (key) => utils_default.hasOwnProp(newConfig, key) ? newConfig[key] : void 0;
	const data = own("data");
	let withXSRFToken = own("withXSRFToken");
	const xsrfHeaderName = own("xsrfHeaderName");
	const xsrfCookieName = own("xsrfCookieName");
	let headers = own("headers");
	const auth = own("auth");
	const baseURL = own("baseURL");
	const allowAbsoluteUrls = own("allowAbsoluteUrls");
	const url = own("url");
	newConfig.headers = headers = AxiosHeaders.from(headers);
	newConfig.url = buildURL(buildFullPath(baseURL, url, allowAbsoluteUrls, newConfig), own("params"), own("paramsSerializer"));
	if (auth) {
		const username = utils_default.getSafeProp(auth, "username") || "";
		const password = utils_default.getSafeProp(auth, "password") || "";
		try {
			headers.set("Authorization", "Basic " + btoa(username + ":" + (password ? encodeUTF8$1(password) : "")));
		} catch (e) {
			throw AxiosError.from(e, AxiosError.ERR_BAD_OPTION_VALUE, config);
		}
	}
	if (utils_default.isFormData(data)) {
		const getHeaders = utils_default.getSafeProp(data, "getHeaders");
		if (platform_default.hasStandardBrowserEnv || platform_default.hasStandardBrowserWebWorkerEnv || utils_default.isReactNative(data)) headers.setContentType(void 0);
		else if (utils_default.isFunction(getHeaders)) setFormDataHeaders(headers, getHeaders.call(data), own("formDataHeaderPolicy"));
	}
	if (platform_default.hasStandardBrowserEnv) {
		if (utils_default.isFunction(withXSRFToken)) withXSRFToken = withXSRFToken(newConfig);
		if (withXSRFToken === true || withXSRFToken == null && isURLSameOrigin_default(newConfig.url)) {
			const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies_default.read(xsrfCookieName);
			if (xsrfValue) headers.set(xsrfHeaderName, xsrfValue);
		}
	}
	return newConfig;
}
var xhr_default = typeof XMLHttpRequest !== "undefined" && function(config) {
	return new Promise(function dispatchXhrRequest(resolve, reject) {
		const _config = resolveConfig(config);
		let requestData = _config.data;
		const requestHeaders = AxiosHeaders.from(_config.headers).normalize();
		let { responseType, onUploadProgress, onDownloadProgress } = _config;
		let onCanceled;
		let uploadThrottled, downloadThrottled;
		let flushUpload, flushDownload, flushDownloadWithEvent;
		function done() {
			flushUpload && flushUpload();
			flushDownload && flushDownload();
			_config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
			_config.signal && _config.signal.removeEventListener("abort", onCanceled);
		}
		let request = new XMLHttpRequest();
		request.open(_config.method.toUpperCase(), _config.url, true);
		request.timeout = _config.timeout;
		function onloadend(event) {
			if (!request) return;
			if (request.status === 0 && (parseProtocol(normalizeURLForProtocolCheck(_config.url)) || parseProtocol(platform_default.origin)) !== "file" && !(request.responseURL && request.responseURL.startsWith("file:"))) {
				reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config, request));
				done();
				request = null;
				return;
			}
			try {
				if (event) flushDownloadWithEvent && flushDownloadWithEvent(event);
				else flushDownload && flushDownload();
			} catch (err) {
				setTimeout(() => {
					throw err;
				});
			}
			if (!request) return;
			const responseHeaders = AxiosHeaders.from("getAllResponseHeaders" in request && request.getAllResponseHeaders());
			settle(function _resolve(value) {
				resolve(value);
				done();
			}, function _reject(err) {
				reject(err);
				done();
			}, {
				data: !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response,
				status: request.status,
				statusText: request.statusText,
				headers: responseHeaders,
				config,
				request
			});
			request = null;
		}
		if ("onloadend" in request) request.onloadend = onloadend;
		else request.onreadystatechange = function handleLoad() {
			if (!request || request.readyState !== 4) return;
			if (request.status === 0 && !(request.responseURL && request.responseURL.startsWith("file:"))) return;
			setTimeout(onloadend);
		};
		request.onabort = function handleAbort() {
			if (!request) return;
			reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config, request));
			done();
			request = null;
		};
		request.onerror = function handleError(event) {
			const err = new AxiosError(event && event.message ? event.message : "Network Error", AxiosError.ERR_NETWORK, config, request);
			err.event = event || null;
			reject(err);
			done();
			request = null;
		};
		request.ontimeout = function handleTimeout() {
			let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
			const transitional = _config.transitional || transitional_default;
			if (_config.timeoutErrorMessage) timeoutErrorMessage = _config.timeoutErrorMessage;
			reject(new AxiosError(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED, config, request));
			done();
			request = null;
		};
		requestData === void 0 && requestHeaders.setContentType(null);
		if ("setRequestHeader" in request) utils_default.forEach(toByteStringHeaderObject(requestHeaders), function setRequestHeader(val, key) {
			request.setRequestHeader(key, val);
		});
		if (!utils_default.isUndefined(_config.withCredentials)) request.withCredentials = !!_config.withCredentials;
		if (responseType && responseType !== "json") request.responseType = _config.responseType;
		if (onDownloadProgress) {
			[downloadThrottled, flushDownload, flushDownloadWithEvent] = progressEventReducer(onDownloadProgress, true);
			request.addEventListener("progress", downloadThrottled);
		}
		if (onUploadProgress && request.upload) {
			[uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
			request.upload.addEventListener("progress", uploadThrottled);
			request.upload.addEventListener("loadend", flushUpload);
		}
		if (_config.cancelToken || _config.signal) {
			onCanceled = (cancel) => {
				if (!request) return;
				reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
				request.abort();
				done();
				request = null;
			};
			_config.cancelToken && _config.cancelToken.subscribe(onCanceled);
			if (_config.signal) _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
		}
		const protocol = parseProtocol(_config.url);
		if (protocol && !platform_default.protocols.includes(protocol)) {
			reject(new AxiosError("Unsupported protocol " + protocol + ":", AxiosError.ERR_BAD_REQUEST, config));
			done();
			return;
		}
		request.send(requestData || null);
	});
};
// node_modules/axios/lib/helpers/composeSignals.js
var composeSignals = (signals, timeout) => {
	signals = signals ? signals.filter(Boolean) : [];
	if (!timeout && !signals.length) return;
	const controller = new AbortController();
	let aborted = false;
	const onabort = function(reason) {
		if (!aborted) {
			aborted = true;
			unsubscribe();
			const err = reason instanceof Error ? reason : this.reason;
			controller.abort(err instanceof AxiosError ? err : new CanceledError(err instanceof Error ? err.message : err));
		}
	};
	let timer = timeout && setTimeout(() => {
		timer = null;
		onabort(new AxiosError(`timeout of ${timeout}ms exceeded`, AxiosError.ETIMEDOUT));
	}, timeout);
	const unsubscribe = () => {
		if (!signals) return;
		timer && clearTimeout(timer);
		timer = null;
		signals.forEach((signal) => {
			signal.unsubscribe ? signal.unsubscribe(onabort) : signal.removeEventListener("abort", onabort);
		});
		signals = null;
	};
	signals.forEach((signal) => {
		if (aborted) return;
		if (signal.aborted) {
			onabort.call(signal);
			return;
		}
		signal.addEventListener("abort", onabort, { once: true });
	});
	const { signal } = controller;
	signal.unsubscribe = () => utils_default.asap(unsubscribe);
	return signal;
};
// node_modules/axios/lib/helpers/trackStream.js
var streamChunk = function* (chunk, chunkSize) {
	let len = chunk.byteLength;
	if (!chunkSize || len < chunkSize) {
		yield chunk;
		return;
	}
	let pos = 0;
	let end;
	while (pos < len) {
		end = pos + chunkSize;
		yield chunk.slice(pos, end);
		pos = end;
	}
};
var readBytes = async function* (iterable, chunkSize) {
	for await (const chunk of readStream(iterable)) yield* streamChunk(chunk, chunkSize);
};
var readStream = async function* (stream) {
	if (stream[Symbol.asyncIterator]) {
		yield* stream;
		return;
	}
	const reader = stream.getReader();
	try {
		for (;;) {
			const { done, value } = await reader.read();
			if (done) break;
			yield value;
		}
	} finally {
		await reader.cancel();
	}
};
var trackStream = (stream, chunkSize, onProgress, onFinish) => {
	const iterator = readBytes(stream, chunkSize);
	let bytes = 0;
	let done;
	let _onFinish = (e) => {
		if (!done) {
			done = true;
			onFinish && onFinish(e);
		}
	};
	return new ReadableStream({
		async pull(controller) {
			try {
				const { done, value } = await iterator.next();
				if (done) {
					_onFinish();
					controller.close();
					return;
				}
				let len = value.byteLength;
				if (onProgress) onProgress(bytes += len);
				controller.enqueue(new Uint8Array(value));
			} catch (err) {
				_onFinish(err);
				throw err;
			}
		},
		cancel(reason) {
			_onFinish(reason);
			return iterator.return();
		}
	}, { highWaterMark: 2 });
};
// node_modules/axios/lib/adapters/fetch.js
var DEFAULT_CHUNK_SIZE = 65536;
var DEFAULT_REQUEST_OPTIONS = {
	cache: "default",
	redirect: "follow",
	referrer: "about:client",
	referrerPolicy: "",
	mode: "cors",
	integrity: "",
	keepalive: false,
	priority: "auto",
	window: null
};
var { isFunction } = utils_default;
/**
* Encode a UTF-8 string to a Latin-1 byte string for use with btoa().
* This is a modern replacement for the deprecated unescape(encodeURIComponent(str)) pattern.
*
* @param {string} str The string to encode
*
* @returns {string} UTF-8 bytes as a Latin-1 string
*/
var encodeUTF8 = (str) => encodeURIComponent(str).replace(/%([0-9A-F]{2})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
var decodeURIComponentSafe = (value) => {
	if (!utils_default.isString(value)) return value;
	try {
		return decodeURIComponent(value);
	} catch (error) {
		return value;
	}
};
var test = (fn, ...args) => {
	try {
		return !!fn(...args);
	} catch (e) {
		return false;
	}
};
var maybeWithAuthCredentials = (url) => {
	const protocolIndex = url.indexOf("://");
	let urlToCheck = url;
	if (protocolIndex !== -1) urlToCheck = urlToCheck.slice(protocolIndex + 3);
	return urlToCheck.includes("@") || urlToCheck.includes(":");
};
var factory = (env) => {
	const globalObject = utils_default.global !== void 0 && utils_default.global !== null ? utils_default.global : globalThis;
	const { ReadableStream, TextEncoder } = globalObject;
	env = utils_default.merge.call({ skipUndefined: true }, {
		Request: globalObject.Request,
		Response: globalObject.Response
	}, env);
	const { fetch: envFetch, Request, Response } = env;
	const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === "function";
	const isRequestSupported = isFunction(Request);
	const isResponseSupported = isFunction(Response);
	if (!isFetchSupported) return false;
	const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream);
	const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));
	const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
		let duplexAccessed = false;
		const request = new Request(platform_default.origin, {
			body: new ReadableStream(),
			method: "POST",
			get duplex() {
				duplexAccessed = true;
				return "half";
			}
		});
		const hasContentType = request.headers.has("Content-Type");
		if (request.body != null) request.body.cancel();
		return duplexAccessed && !hasContentType;
	});
	const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(() => utils_default.isReadableStream(new Response("").body));
	const resolvers = { stream: supportsResponseStream && ((res) => res.body) };
	isFetchSupported && (() => {
		[
			"text",
			"arrayBuffer",
			"blob",
			"formData",
			"stream"
		].forEach((type) => {
			!resolvers[type] && (resolvers[type] = (res, config) => {
				let method = res && res[type];
				if (method) return method.call(res);
				throw new AxiosError(`Response type '${type}' is not supported`, AxiosError.ERR_NOT_SUPPORT, config);
			});
		});
	})();
	const getBodyLength = async (body) => {
		if (body == null) return 0;
		if (utils_default.isBlob(body)) return body.size;
		if (utils_default.isSpecCompliantForm(body)) return (await new Request(platform_default.origin, {
			method: "POST",
			body
		}).arrayBuffer()).byteLength;
		if (utils_default.isArrayBufferView(body) || utils_default.isArrayBuffer(body)) return body.byteLength;
		if (utils_default.isURLSearchParams(body)) body = body + "";
		if (utils_default.isString(body)) return (await encodeText(body)).byteLength;
	};
	const resolveBodyLength = async (headers, body) => {
		const length = utils_default.toFiniteNumber(headers.getContentLength());
		return length == null ? getBodyLength(body) : length;
	};
	return async (config) => {
		let { url, method, data, signal, cancelToken, timeout, onDownloadProgress, onUploadProgress, responseType, headers, withCredentials = "same-origin", fetchOptions, maxContentLength, maxBodyLength, maxRedirects } = resolveConfig(config);
		const hasMaxContentLength = utils_default.isNumber(maxContentLength) && maxContentLength > -1;
		const hasMaxBodyLength = utils_default.isNumber(maxBodyLength) && maxBodyLength > -1;
		const own = (key) => utils_default.hasOwnProp(config, key) ? config[key] : void 0;
		let _fetch = envFetch || fetch;
		responseType = responseType ? (responseType + "").toLowerCase() : "text";
		let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
		let request = null;
		const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
			composedSignal.unsubscribe();
		});
		let requestContentLength;
		let pendingBodyError = null;
		const maxBodyLengthError = () => new AxiosError("Request body larger than maxBodyLength limit", AxiosError.ERR_BAD_REQUEST, config, request);
		try {
			let auth = void 0;
			const configAuth = own("auth");
			if (configAuth) auth = {
				username: utils_default.getSafeProp(configAuth, "username") || "",
				password: utils_default.getSafeProp(configAuth, "password") || ""
			};
			if (maybeWithAuthCredentials(url)) {
				const parsedURL = new URL(url, platform_default.origin);
				if (!auth && (parsedURL.username || parsedURL.password)) auth = {
					username: decodeURIComponentSafe(parsedURL.username),
					password: decodeURIComponentSafe(parsedURL.password)
				};
				if (parsedURL.username || parsedURL.password) {
					parsedURL.username = "";
					parsedURL.password = "";
					url = parsedURL.href;
				}
			}
			if (auth) {
				headers.delete("authorization");
				headers.set("Authorization", "Basic " + btoa(encodeUTF8((auth.username || "") + ":" + (auth.password || ""))));
			}
			if (hasMaxContentLength && typeof url === "string" && url.startsWith("data:")) {
				if (estimateDataURLDecodedBytes(url) > maxContentLength) throw new AxiosError("maxContentLength size of " + maxContentLength + " exceeded", AxiosError.ERR_BAD_RESPONSE, config, request);
			}
			if (hasMaxBodyLength && method !== "get" && method !== "head") {
				const outboundLength = await getBodyLength(data);
				if (typeof outboundLength === "number" && isFinite(outboundLength)) {
					requestContentLength = outboundLength;
					if (outboundLength > maxBodyLength) throw maxBodyLengthError();
				}
			}
			const mustEnforceStreamBody = hasMaxBodyLength && (utils_default.isReadableStream(data) || utils_default.isStream(data));
			const trackRequestStream = (stream, onProgress, flush) => trackStream(stream, DEFAULT_CHUNK_SIZE, (loadedBytes) => {
				if (hasMaxBodyLength && loadedBytes > maxBodyLength) throw pendingBodyError = maxBodyLengthError();
				onProgress && onProgress(loadedBytes);
			}, flush);
			if (supportsRequestStream && method !== "get" && method !== "head" && (onUploadProgress || mustEnforceStreamBody)) {
				requestContentLength = requestContentLength == null ? await resolveBodyLength(headers, data) : requestContentLength;
				if (requestContentLength !== 0 || mustEnforceStreamBody) {
					let _request = new Request(url, {
						method: "POST",
						body: data,
						duplex: "half"
					});
					let contentTypeHeader;
					if (utils_default.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) headers.setContentType(contentTypeHeader);
					if (_request.body) {
						const [onProgress, flush] = onUploadProgress && progressEventDecorator(requestContentLength, progressEventReducer(asyncDecorator(onUploadProgress))) || [];
						data = trackRequestStream(_request.body, onProgress, flush);
					}
				}
			} else if (mustEnforceStreamBody && !isRequestSupported && isReadableStreamSupported && method !== "get" && method !== "head") data = trackRequestStream(data);
			else if (mustEnforceStreamBody && isRequestSupported && !supportsRequestStream && method !== "get" && method !== "head") throw new AxiosError("Stream request bodies are not supported by the current fetch implementation", AxiosError.ERR_NOT_SUPPORT, config, request);
			if (!utils_default.isString(withCredentials)) withCredentials = withCredentials ? "include" : "omit";
			const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;
			if (utils_default.isFormData(data)) {
				const contentType = headers.getContentType();
				if (contentType && /^multipart\/form-data/i.test(contentType) && !/boundary=/i.test(contentType)) headers.delete("content-type");
			}
			headers.set("User-Agent", "axios/" + VERSION, false);
			const safeFetchOptions = fetchOptions == null ? fetchOptions : Object.assign(Object.create(null), fetchOptions);
			if (safeFetchOptions) {
				delete safeFetchOptions.body;
				delete safeFetchOptions.headers;
				delete safeFetchOptions.method;
				delete safeFetchOptions.signal;
				delete safeFetchOptions.duplex;
				delete safeFetchOptions.credentials;
			}
			const resolvedOptions = Object.assign(Object.create(null), safeFetchOptions, {
				signal: composedSignal,
				method: method.toUpperCase(),
				headers: toByteStringHeaderObject(headers.normalize()),
				body: data,
				duplex: "half",
				credentials: isCredentialsSupported ? withCredentials : void 0
			});
			if (isRequestSupported) {
				utils_default.forEach(DEFAULT_REQUEST_OPTIONS, (value, key) => {
					if (resolvedOptions[key] === void 0) resolvedOptions[key] = value;
				});
				if (resolvedOptions.signal === void 0) resolvedOptions.signal = null;
				if (resolvedOptions.body === void 0) resolvedOptions.body = null;
			}
			if (maxRedirects === 0) {
				resolvedOptions.redirect = "manual";
				if (safeFetchOptions) safeFetchOptions.redirect = "manual";
			}
			request = isRequestSupported && new Request(url, resolvedOptions);
			let response = await (isRequestSupported ? _fetch(request, safeFetchOptions) : _fetch(url, resolvedOptions));
			const responseHeaders = AxiosHeaders.from(response.headers);
			if (hasMaxContentLength) {
				const declaredLength = utils_default.toFiniteNumber(responseHeaders.getContentLength());
				if (declaredLength != null && declaredLength > maxContentLength) throw new AxiosError("maxContentLength size of " + maxContentLength + " exceeded", AxiosError.ERR_BAD_RESPONSE, config, request);
			}
			const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
			if (supportsResponseStream && response.body && (onDownloadProgress || hasMaxContentLength || isStreamResponse && unsubscribe)) {
				const options = {};
				[
					"status",
					"statusText",
					"headers"
				].forEach((prop) => {
					options[prop] = response[prop];
				});
				const responseContentLength = utils_default.toFiniteNumber(responseHeaders.getContentLength());
				const [onProgress, flush] = onDownloadProgress && progressEventDecorator(responseContentLength, progressEventReducer(asyncDecorator(onDownloadProgress), true)) || [];
				let bytesRead = 0;
				const onChunkProgress = (loadedBytes) => {
					if (hasMaxContentLength) {
						bytesRead = loadedBytes;
						if (bytesRead > maxContentLength) throw new AxiosError("maxContentLength size of " + maxContentLength + " exceeded", AxiosError.ERR_BAD_RESPONSE, config, request);
					}
					onProgress && onProgress(loadedBytes);
				};
				response = new Response(trackStream(response.body, DEFAULT_CHUNK_SIZE, onChunkProgress, () => {
					flush && flush();
					unsubscribe && unsubscribe();
				}), options);
			}
			responseType = responseType || "text";
			let responseData = await resolvers[utils_default.findKey(resolvers, responseType) || "text"](response, config);
			if (hasMaxContentLength && !supportsResponseStream && !isStreamResponse) {
				let materializedSize;
				if (responseData != null) {
					if (typeof responseData.byteLength === "number") materializedSize = responseData.byteLength;
					else if (typeof responseData.size === "number") materializedSize = responseData.size;
					else if (typeof responseData === "string") materializedSize = typeof TextEncoder === "function" ? new TextEncoder().encode(responseData).byteLength : responseData.length;
				}
				if (typeof materializedSize === "number" && materializedSize > maxContentLength) throw new AxiosError("maxContentLength size of " + maxContentLength + " exceeded", AxiosError.ERR_BAD_RESPONSE, config, request);
			}
			!isStreamResponse && unsubscribe && unsubscribe();
			return await new Promise((resolve, reject) => {
				settle(resolve, reject, {
					data: responseData,
					headers: AxiosHeaders.from(response.headers),
					status: response.status,
					statusText: response.statusText,
					config,
					request
				});
			});
		} catch (err) {
			unsubscribe && unsubscribe();
			if (composedSignal && composedSignal.aborted && composedSignal.reason instanceof AxiosError) {
				const canceledError = composedSignal.reason;
				canceledError.config = config;
				request && (canceledError.request = request);
				if (err !== canceledError) Object.defineProperty(canceledError, "cause", {
					__proto__: null,
					value: err,
					writable: true,
					enumerable: false,
					configurable: true
				});
				throw canceledError;
			}
			if (pendingBodyError) {
				request && !pendingBodyError.request && (pendingBodyError.request = request);
				throw pendingBodyError;
			}
			if (err instanceof AxiosError) {
				request && !err.request && (err.request = request);
				throw err;
			}
			if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
				const networkError = new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request, err && err.response);
				Object.defineProperty(networkError, "cause", {
					__proto__: null,
					value: err.cause || err,
					writable: true,
					enumerable: false,
					configurable: true
				});
				throw networkError;
			}
			throw AxiosError.from(err, err && err.code, config, request, err && err.response);
		}
	};
};
var seedCache = /* @__PURE__ */ new Map();
var getFetch = (config) => {
	let env = config && config.env || {};
	const { fetch, Request, Response } = env;
	const seeds = [
		Request,
		Response,
		fetch
	];
	let i = seeds.length, seed, target, map = seedCache;
	while (i--) {
		seed = seeds[i];
		target = map.get(seed);
		target === void 0 && map.set(seed, target = i ? /* @__PURE__ */ new Map() : factory(env));
		map = target;
	}
	return target;
};
getFetch();
// node_modules/axios/lib/adapters/adapters.js
/**
* Known adapters mapping.
* Provides environment-specific adapters for Axios:
* - `http` for Node.js
* - `xhr` for browsers
* - `fetch` for fetch API-based requests
*
* @type {Object<string, Function|Object>}
*/
var knownAdapters = {
	http: http_default,
	xhr: xhr_default,
	fetch: { get: getFetch }
};
utils_default.forEach(knownAdapters, (fn, value) => {
	if (fn) {
		try {
			Object.defineProperty(fn, "name", {
				__proto__: null,
				value
			});
		} catch (e) {}
		Object.defineProperty(fn, "adapterName", {
			__proto__: null,
			value
		});
	}
});
/**
* Render a rejection reason string for unknown or unsupported adapters
*
* @param {string} reason
* @returns {string}
*/
var renderReason = (reason) => `- ${reason}`;
/**
* Check if the adapter is resolved (function, null, or false)
*
* @param {Function|null|false} adapter
* @returns {boolean}
*/
var isResolvedHandle = (adapter) => utils_default.isFunction(adapter) || adapter === null || adapter === false;
/**
* Get the first suitable adapter from the provided list.
* Tries each adapter in order until a supported one is found.
* Throws an AxiosError if no adapter is suitable.
*
* @param {Array<string|Function>|string|Function} adapters - Adapter(s) by name or function.
* @param {Object} config - Axios request configuration
* @throws {AxiosError} If no suitable adapter is available
* @returns {Function} The resolved adapter function
*/
function getAdapter(adapters, config) {
	adapters = utils_default.isArray(adapters) ? adapters : [adapters];
	const { length } = adapters;
	let nameOrAdapter;
	let adapter;
	const rejectedReasons = {};
	for (let i = 0; i < length; i++) {
		nameOrAdapter = adapters[i];
		let id;
		adapter = nameOrAdapter;
		if (!isResolvedHandle(nameOrAdapter)) {
			adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
			if (adapter === void 0) throw new AxiosError(`Unknown adapter '${id}'`);
		}
		if (adapter && (utils_default.isFunction(adapter) || (adapter = adapter.get(config)))) break;
		rejectedReasons[id || "#" + i] = adapter;
	}
	if (!adapter) {
		const reasons = Object.entries(rejectedReasons).map(([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build"));
		throw new AxiosError(`There is no suitable adapter to dispatch the request ` + (length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified"), AxiosError.ERR_NOT_SUPPORT);
	}
	return adapter;
}
/**
* Exports Axios adapters and utility to resolve an adapter
*/
var adapters_default = {
	/**
	* Resolve an adapter from a list of adapter names or functions.
	* @type {Function}
	*/
	getAdapter,
	/**
	* Exposes all known adapters
	* @type {Object<string, Function|Object>}
	*/
	adapters: knownAdapters
};
// node_modules/axios/lib/core/dispatchRequest.js
/**
* Throws a `CanceledError` if cancellation has been requested.
*
* @param {Object} config The config that is to be used for the request
*
* @returns {void}
*/
function throwIfCancellationRequested(config) {
	if (config.cancelToken) config.cancelToken.throwIfRequested();
	if (config.signal && config.signal.aborted) throw new CanceledError(null, config);
}
/**
* Dispatch a request to the server using the configured adapter.
*
* @param {object} config The config that is to be used for the request
*
* @returns {Promise} The Promise to be fulfilled
*/
function dispatchRequest(_config) {
	const config = utils_default.toSafeFlatObject(_config);
	throwIfCancellationRequested(config);
	config.headers = AxiosHeaders.from(utils_default.getSafeProp(config, "headers"));
	config.data = transformData.call(config, config.transformRequest);
	if ([
		"post",
		"put",
		"patch"
	].indexOf(config.method) !== -1) config.headers.setContentType("application/x-www-form-urlencoded", false);
	return adapters_default.getAdapter(config.adapter || defaults.adapter, config)(config).then(function onAdapterResolution(response) {
		throwIfCancellationRequested(config);
		config.response = response;
		try {
			response.data = transformData.call(config, config.transformResponse, response);
		} finally {
			delete config.response;
		}
		response.headers = AxiosHeaders.from(response.headers);
		return response;
	}, function onAdapterRejection(reason) {
		if (!isCancel(reason)) {
			throwIfCancellationRequested(config);
			if (reason && reason.response) {
				config.response = reason.response;
				try {
					reason.response.data = transformData.call(config, config.transformResponse, reason.response);
				} finally {
					delete config.response;
				}
				reason.response.headers = AxiosHeaders.from(reason.response.headers);
			}
		}
		return Promise.reject(reason);
	});
}
// node_modules/axios/lib/helpers/validator.js
var validators$1 = {};
[
	"object",
	"boolean",
	"number",
	"function",
	"string",
	"symbol"
].forEach((type, i) => {
	validators$1[type] = function validator(thing) {
		return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
	};
});
var deprecatedWarnings = {};
/**
* Transitional option validator
*
* @param {function|boolean?} validator - set to false if the transitional option has been removed
* @param {string?} version - deprecated version / removed since version
* @param {string?} message - some message with additional info
*
* @returns {function}
*/
validators$1.transitional = function transitional(validator, version, message) {
	function formatMessage(opt, desc) {
		return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
	}
	return (value, opt, opts) => {
		if (validator === false) throw new AxiosError(formatMessage(opt, " has been removed" + (version ? " in " + version : "")), AxiosError.ERR_DEPRECATED);
		if (version && !deprecatedWarnings[opt]) {
			deprecatedWarnings[opt] = true;
			console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
		}
		return validator ? validator(value, opt, opts) : true;
	};
};
validators$1.spelling = function spelling(correctSpelling) {
	return (value, opt) => {
		console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
		return true;
	};
};
/**
* Assert object's properties type
*
* @param {object} options
* @param {object} schema
* @param {boolean?} allowUnknown
*
* @returns {object}
*/
function assertOptions(options, schema, allowUnknown) {
	if (typeof options !== "object" || options === null) throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
	const keys = Object.keys(options);
	let i = keys.length;
	while (i-- > 0) {
		const opt = keys[i];
		const validator = Object.prototype.hasOwnProperty.call(schema, opt) ? schema[opt] : void 0;
		if (validator) {
			const value = options[opt];
			const result = value === void 0 || validator(value, opt, options);
			if (result !== true) throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
			continue;
		}
		if (allowUnknown !== true) throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
	}
}
var validator_default = {
	assertOptions,
	validators: validators$1
};
// node_modules/axios/lib/core/Axios.js
var validators = validator_default.validators;
/**
* Create a new instance of Axios
*
* @param {Object} instanceConfig The default config for the instance
*
* @return {Axios} A new instance of Axios
*/
var Axios = class {
	constructor(instanceConfig) {
		this.defaults = instanceConfig || {};
		this.interceptors = {
			request: new InterceptorManager(),
			response: new InterceptorManager()
		};
	}
	/**
	* Dispatch a request
	*
	* @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
	* @param {?Object} config
	*
	* @returns {Promise} The Promise to be fulfilled
	*/
	async request(configOrUrl, config) {
		try {
			return await this._request(configOrUrl, config);
		} catch (err) {
			if (err instanceof Error) try {
				let dummy = {};
				Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = /* @__PURE__ */ new Error();
				const dummyStack = dummy.stack;
				let stack = "";
				if (typeof dummyStack === "string") {
					const firstNewlineIndex = dummyStack.indexOf("\n");
					stack = firstNewlineIndex === -1 ? "" : dummyStack.slice(firstNewlineIndex + 1);
				}
				if (!err.stack) err.stack = stack;
				else if (stack) {
					const firstNewlineIndex = stack.indexOf("\n");
					const secondNewlineIndex = firstNewlineIndex === -1 ? -1 : stack.indexOf("\n", firstNewlineIndex + 1);
					const stackWithoutTwoTopLines = secondNewlineIndex === -1 ? "" : stack.slice(secondNewlineIndex + 1);
					if (!String(err.stack).endsWith(stackWithoutTwoTopLines)) err.stack += "\n" + stack;
				}
			} catch (e) {}
			throw err;
		}
	}
	_request(configOrUrl, config) {
		if (typeof configOrUrl === "string") {
			config = config || {};
			config.url = configOrUrl;
		} else config = configOrUrl || {};
		config = mergeConfig(this.defaults, config);
		const { transitional, paramsSerializer, headers } = config;
		if (transitional !== void 0) validator_default.assertOptions(transitional, {
			silentJSONParsing: validators.transitional(validators.boolean),
			forcedJSONParsing: validators.transitional(validators.boolean),
			clarifyTimeoutError: validators.transitional(validators.boolean),
			legacyInterceptorReqResOrdering: validators.transitional(validators.boolean),
			advertiseZstdAcceptEncoding: validators.transitional(validators.boolean),
			validateStatusUndefinedResolves: validators.transitional(validators.boolean)
		}, false);
		if (paramsSerializer != null) {
			if (utils_default.isFunction(paramsSerializer)) config.paramsSerializer = { serialize: paramsSerializer };
			else validator_default.assertOptions(paramsSerializer, {
				encode: validators.function,
				serialize: validators.function
			}, true);
		}
		if (config.allowAbsoluteUrls !== void 0) {} else if (this.defaults.allowAbsoluteUrls !== void 0) config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
		else config.allowAbsoluteUrls = true;
		validator_default.assertOptions(config, {
			baseUrl: validators.spelling("baseURL"),
			withXsrfToken: validators.spelling("withXSRFToken")
		}, true);
		config.method = (utils_default.getSafeProp(config, "method") || utils_default.getSafeProp(this.defaults, "method") || "get").toLowerCase();
		let contextHeaders = headers && utils_default.merge(headers.common, headers[config.method]);
		headers && utils_default.forEach(methodList.concat("common"), (method) => {
			delete headers[method];
		});
		config.headers = AxiosHeaders.concat(contextHeaders, headers);
		const requestInterceptorChain = [];
		let synchronousRequestInterceptors = true;
		this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
			if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) return;
			synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
			const transitional = config.transitional || transitional_default;
			if (transitional && transitional.legacyInterceptorReqResOrdering) requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
			else requestInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
		});
		const responseInterceptorChain = [];
		this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
			responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
		});
		let promise;
		let i = 0;
		let len;
		if (!synchronousRequestInterceptors) {
			const chain = [dispatchRequest.bind(this), void 0];
			chain.unshift(...requestInterceptorChain);
			chain.push(...responseInterceptorChain);
			len = chain.length;
			promise = Promise.resolve(config);
			while (i < len) promise = promise.then(chain[i++], chain[i++]);
			return promise;
		}
		len = requestInterceptorChain.length;
		let newConfig = config;
		while (i < len) {
			const onFulfilled = requestInterceptorChain[i++];
			const onRejected = requestInterceptorChain[i++];
			try {
				newConfig = onFulfilled ? onFulfilled(newConfig) : newConfig;
			} catch (error) {
				if (!onRejected) {
					promise = Promise.reject(error);
					break;
				}
				try {
					const rejectedResult = onRejected.call(this, error);
					if (utils_default.isThenable(rejectedResult)) promise = Promise.resolve(rejectedResult).then(() => dispatchRequest.call(this, newConfig));
				} catch (rejectedError) {
					promise = Promise.reject(rejectedError);
				}
				break;
			}
		}
		if (!promise) try {
			promise = dispatchRequest.call(this, newConfig);
		} catch (error) {
			promise = Promise.reject(error);
		}
		i = 0;
		len = responseInterceptorChain.length;
		while (i < len) promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
		return promise;
	}
	getUri(config) {
		config = mergeConfig(this.defaults, config);
		return buildURL(buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls, config), config.params, config.paramsSerializer);
	}
};
utils_default.forEach([
	"delete",
	"get",
	"head",
	"options"
], function forEachMethodNoData(method) {
	Axios.prototype[method] = function(url, config) {
		return this.request(mergeConfig(config || {}, {
			method,
			url,
			data: config && utils_default.hasOwnProp(config, "data") ? config.data : void 0
		}));
	};
});
utils_default.forEach([
	"post",
	"put",
	"patch",
	"query"
], function forEachMethodWithData(method) {
	function generateHTTPMethod(isForm) {
		return function httpMethod(url, data, config) {
			return this.request(mergeConfig(config || {}, {
				method,
				headers: isForm ? { "Content-Type": "multipart/form-data" } : {},
				url,
				data
			}));
		};
	}
	Axios.prototype[method] = generateHTTPMethod();
	if (method !== "query") Axios.prototype[method + "Form"] = generateHTTPMethod(true);
});
// node_modules/axios/lib/cancel/CancelToken.js
/**
* A `CancelToken` is an object that can be used to request cancellation of an operation.
*
* @param {Function} executor The executor function.
*
* @returns {CancelToken}
*/
var CancelToken = class CancelToken {
	constructor(executor) {
		if (typeof executor !== "function") throw new TypeError("executor must be a function.");
		let resolvePromise;
		this.promise = new Promise(function promiseExecutor(resolve) {
			resolvePromise = resolve;
		});
		const token = this;
		this.promise.then((cancel) => {
			if (!token._listeners) return;
			let i = token._listeners.length;
			while (i-- > 0) token._listeners[i](cancel);
			token._listeners = null;
		});
		this.promise.then = (onfulfilled) => {
			let _resolve;
			const promise = new Promise((resolve) => {
				token.subscribe(resolve);
				_resolve = resolve;
			}).then(onfulfilled);
			promise.cancel = function reject() {
				token.unsubscribe(_resolve);
			};
			return promise;
		};
		executor(function cancel(message, config, request) {
			if (token.reason) return;
			token.reason = new CanceledError(message, config, request);
			resolvePromise(token.reason);
		});
	}
	/**
	* Throws a `CanceledError` if cancellation has been requested.
	*/
	throwIfRequested() {
		if (this.reason) throw this.reason;
	}
	/**
	* Subscribe to the cancel signal
	*/
	subscribe(listener) {
		if (this.reason) {
			listener(this.reason);
			return;
		}
		if (this._listeners) this._listeners.push(listener);
		else this._listeners = [listener];
	}
	/**
	* Unsubscribe from the cancel signal
	*/
	unsubscribe(listener) {
		if (!this._listeners) return;
		const index = this._listeners.indexOf(listener);
		if (index !== -1) this._listeners.splice(index, 1);
	}
	toAbortSignal() {
		const controller = new AbortController();
		const abort = (err) => {
			controller.abort(err);
		};
		this.subscribe(abort);
		controller.signal.unsubscribe = () => this.unsubscribe(abort);
		return controller.signal;
	}
	/**
	* Returns an object that contains a new `CancelToken` and a function that, when called,
	* cancels the `CancelToken`.
	*/
	static source() {
		let cancel;
		return {
			token: new CancelToken(function executor(c) {
				cancel = c;
			}),
			cancel
		};
	}
};
// node_modules/axios/lib/helpers/spread.js
/**
* Syntactic sugar for invoking a function and expanding an array for arguments.
*
* Common use case would be to use `Function.prototype.apply`.
*
*  ```js
*  function f(x, y, z) {}
*  const args = [1, 2, 3];
*  f.apply(null, args);
*  ```
*
* With `spread` this example can be re-written.
*
*  ```js
*  spread(function(x, y, z) {})([1, 2, 3]);
*  ```
*
* @param {Function} callback
*
* @returns {Function}
*/
function spread(callback) {
	return function wrap(arr) {
		return callback.apply(null, arr);
	};
}
// node_modules/axios/lib/helpers/isAxiosError.js
/**
* Determines whether the payload is an error thrown by Axios
*
* @param {*} payload The value to test
*
* @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
*/
function isAxiosError(payload) {
	return utils_default.isObject(payload) && payload.isAxiosError === true;
}
// node_modules/axios/lib/helpers/HttpStatusCode.js
var HttpStatusCode = {
	Continue: 100,
	SwitchingProtocols: 101,
	Processing: 102,
	EarlyHints: 103,
	Ok: 200,
	Created: 201,
	Accepted: 202,
	NonAuthoritativeInformation: 203,
	NoContent: 204,
	ResetContent: 205,
	PartialContent: 206,
	MultiStatus: 207,
	AlreadyReported: 208,
	ImUsed: 226,
	MultipleChoices: 300,
	MovedPermanently: 301,
	Found: 302,
	SeeOther: 303,
	NotModified: 304,
	UseProxy: 305,
	Unused: 306,
	TemporaryRedirect: 307,
	PermanentRedirect: 308,
	BadRequest: 400,
	Unauthorized: 401,
	PaymentRequired: 402,
	Forbidden: 403,
	NotFound: 404,
	MethodNotAllowed: 405,
	NotAcceptable: 406,
	ProxyAuthenticationRequired: 407,
	RequestTimeout: 408,
	Conflict: 409,
	Gone: 410,
	LengthRequired: 411,
	PreconditionFailed: 412,
	/**
	* @deprecated Use `ContentTooLarge` instead.
	*/
	PayloadTooLarge: 413,
	ContentTooLarge: 413,
	UriTooLong: 414,
	UnsupportedMediaType: 415,
	RangeNotSatisfiable: 416,
	ExpectationFailed: 417,
	ImATeapot: 418,
	MisdirectedRequest: 421,
	/**
	* @deprecated Use `UnprocessableContent` instead.
	*/
	UnprocessableEntity: 422,
	UnprocessableContent: 422,
	Locked: 423,
	FailedDependency: 424,
	TooEarly: 425,
	UpgradeRequired: 426,
	PreconditionRequired: 428,
	TooManyRequests: 429,
	RequestHeaderFieldsTooLarge: 431,
	UnavailableForLegalReasons: 451,
	InternalServerError: 500,
	NotImplemented: 501,
	BadGateway: 502,
	ServiceUnavailable: 503,
	GatewayTimeout: 504,
	HttpVersionNotSupported: 505,
	VariantAlsoNegotiates: 506,
	InsufficientStorage: 507,
	LoopDetected: 508,
	NotExtended: 510,
	NetworkAuthenticationRequired: 511,
	WebServerReturnsAnUnknownError: 520,
	WebServerIsDown: 521,
	ConnectionTimedOut: 522,
	OriginIsUnreachable: 523,
	TimeoutOccurred: 524,
	SslHandshakeFailed: 525,
	InvalidSslCertificate: 526
};
Object.entries(HttpStatusCode).forEach(([key, value]) => {
	if (HttpStatusCode[value] === void 0) HttpStatusCode[value] = key;
});
// node_modules/axios/lib/axios.js
/**
* Create an instance of Axios
*
* @param {Object} defaultConfig The default config for the instance
*
* @returns {Axios} A new instance of Axios
*/
function createInstance(defaultConfig) {
	const context = new Axios(defaultConfig);
	const instance = bind(Axios.prototype.request, context);
	utils_default.extend(instance, Axios.prototype, context, { allOwnKeys: true });
	utils_default.extend(instance, context, null, { allOwnKeys: true });
	instance.create = function create(instanceConfig) {
		return createInstance(mergeConfig(defaultConfig, instanceConfig));
	};
	return instance;
}
var axios = createInstance(defaults);
axios.Axios = Axios;
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;
axios.AxiosError = AxiosError;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
	return Promise.all(promises);
};
axios.spread = spread;
axios.isAxiosError = isAxiosError;
axios.mergeConfig = mergeConfig;
axios.AxiosHeaders = AxiosHeaders;
axios.formToJSON = (thing) => formDataToJSON(utils_default.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters_default.getAdapter;
axios.HttpStatusCode = HttpStatusCode;
axios.default = axios;
// node_modules/@base44/sdk/dist/utils/common.js
var isNode = typeof window === "undefined";
var isInIFrame = !isNode && window.self !== window.top;
var isReactNative$1 = !isNode && typeof document === "undefined";
var generateUuid = () => {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
// node_modules/uuid/dist-node/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) byteToHex.push((i + 256).toString(16).slice(1));
function unsafeStringify(arr, offset = 0) {
	return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
// node_modules/uuid/dist-node/rng.js
var rnds8Pool = /* @__PURE__ */ new Uint8Array(256);
var poolPtr = rnds8Pool.length;
function rng() {
	if (poolPtr > rnds8Pool.length - 16) {
		randomFillSync(rnds8Pool);
		poolPtr = 0;
	}
	return rnds8Pool.slice(poolPtr, poolPtr += 16);
}
// node_modules/uuid/dist-node/native.js
var native_default = { randomUUID };
// node_modules/uuid/dist-node/v4.js
function _v4(options, buf, offset) {
	options = options || {};
	const rnds = options.random ?? options.rng?.() ?? rng();
	if (rnds.length < 16) throw new Error("Random bytes length must be >= 16");
	rnds[6] = rnds[6] & 15 | 64;
	rnds[8] = rnds[8] & 63 | 128;
	if (buf) {
		offset = offset || 0;
		if (offset < 0 || offset + 16 > buf.length) throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
		for (let i = 0; i < 16; ++i) buf[offset + i] = rnds[i];
		return buf;
	}
	return unsafeStringify(rnds);
}
function v4(options, buf, offset) {
	if (native_default.randomUUID && !buf && !options) return native_default.randomUUID();
	return _v4(options, buf, offset);
}
// node_modules/@base44/sdk/dist/utils/sharedInstance.js
var windowObj = typeof window !== "undefined" ? window : { base44SharedInstances: {} };
function getSharedInstance(name, factory) {
	if (!windowObj.base44SharedInstances) windowObj.base44SharedInstances = {};
	if (!windowObj.base44SharedInstances[name]) windowObj.base44SharedInstances[name] = { instance: factory() };
	return windowObj.base44SharedInstances[name].instance;
}
// node_modules/@base44/sdk/dist/modules/analytics.js
var USER_HEARTBEAT_EVENT_NAME = "__user_heartbeat_event__";
var ANALYTICS_INITIALIZATION_EVENT_NAME = "__initialization_event__";
var ANALYTICS_SESSION_DURATION_EVENT_NAME = "__session_duration_event__";
var ANALYTICS_CONFIG_ENABLE_URL_PARAM_KEY = "analytics-enable";
var ANALYTICS_SESSION_ID_LOCAL_STORAGE_KEY = "base44_analytics_session_id";
var ANALYTICS_DENIED_LOCAL_STORAGE_KEY = "base44_analytics_denied";
function readAnalyticsDenied() {
	try {
		return localStorage.getItem(ANALYTICS_DENIED_LOCAL_STORAGE_KEY) === "1";
	} catch (_a) {
		return false;
	}
}
function writeAnalyticsDenied(denied) {
	try {
		if (denied) localStorage.setItem(ANALYTICS_DENIED_LOCAL_STORAGE_KEY, "1");
		else localStorage.removeItem(ANALYTICS_DENIED_LOCAL_STORAGE_KEY);
	} catch (_a) {}
}
/** Whether a page in this mode may track before any consent signal. */
function initialConsentGranted(mode) {
	if (mode === "consent") return false;
	if (mode === "on") return !readAnalyticsDenied();
	return true;
}
function readAnalyticsMode() {
	var _a;
	if (typeof document === "undefined") return null;
	try {
		const content = (_a = document.querySelector(`meta[name="base44-analytics"]`)) === null || _a === void 0 ? void 0 : _a.getAttribute("content");
		return content === "off" || content === "consent" || content === "on" ? content : null;
	} catch (_b) {
		return null;
	}
}
var defaultConfiguration = {
	enabled: true,
	maxQueueSize: 1e3,
	throttleTime: 1e3,
	batchSize: 30,
	heartBeatInterval: 6e4
};
var analyticsSharedState = getSharedInstance("analytics", () => ({
	requestsQueue: [],
	isProcessing: false,
	isHeartBeatProcessing: false,
	wasInitializationTracked: false,
	sessionContext: null,
	sessionStartTime: null,
	fallbackSessionId: null,
	config: {
		...defaultConfiguration,
		...getAnalyticsConfigFromUrlParams()
	}
}));
var consentSharedState = getSharedInstance("analytics-consent", () => {
	const analyticsMode = readAnalyticsMode();
	return {
		analyticsMode,
		consentGranted: initialConsentGranted(analyticsMode),
		isWatchingConsent: false,
		listeners: []
	};
});
/** Whether analytics may run and store the session id on this page. */
function isAnalyticsAllowed() {
	const { analyticsMode, consentGranted } = consentSharedState;
	return analyticsMode !== "off" && consentGranted;
}
function setConsentGranted(granted) {
	var _a;
	writeAnalyticsDenied(!granted);
	if (consentSharedState.consentGranted === granted) return;
	consentSharedState.consentGranted = granted;
	if (!granted) try {
		const sessionId = localStorage.getItem(ANALYTICS_SESSION_ID_LOCAL_STORAGE_KEY);
		if (sessionId) (_a = analyticsSharedState.fallbackSessionId) !== null && _a !== void 0 || (analyticsSharedState.fallbackSessionId = sessionId);
		localStorage.removeItem(ANALYTICS_SESSION_ID_LOCAL_STORAGE_KEY);
	} catch (_b) {}
	for (const listener of [...consentSharedState.listeners]) listener(granted);
}
function watchAnalyticsConsent() {
	const state = consentSharedState;
	if (state.isWatchingConsent) return;
	state.isWatchingConsent = true;
	if (state.analyticsMode !== "consent" && state.analyticsMode !== "on") return;
	const b44Consent = typeof window !== "undefined" ? window.__b44Consent : void 0;
	b44Consent === null || b44Consent === void 0 || b44Consent.on("analytics_storage", () => setConsentGranted(true), () => setConsentGranted(false));
}
function onConsentChange(listener) {
	consentSharedState.listeners.push(listener);
	return () => {
		const listeners = consentSharedState.listeners;
		const index = listeners.indexOf(listener);
		if (index >= 0) listeners.splice(index, 1);
	};
}
var createAnalyticsModule = ({ axiosClient, serverUrl, appId, userAuthModule, enabled }) => {
	var _a;
	const { maxQueueSize, throttleTime, batchSize } = analyticsSharedState.config;
	watchAnalyticsConsent();
	if (!enabled || !((_a = analyticsSharedState.config) === null || _a === void 0 ? void 0 : _a.enabled) || isReactNative$1 || consentSharedState.analyticsMode === "off") return {
		track: () => {},
		cleanup: () => {}
	};
	let clearHeartBeatProcessor = void 0;
	const trackBatchUrl = `${serverUrl}/api/apps/${appId}/analytics/track/batch`;
	const batchRequestFallback = async (events) => {
		await axiosClient.request({
			method: "POST",
			url: `/apps/${appId}/analytics/track/batch`,
			data: { events }
		});
	};
	const beaconRequest = (events) => {
		try {
			const beaconPayload = JSON.stringify({ events });
			const blob = new Blob([beaconPayload], { type: "application/json" });
			return typeof navigator === "undefined" || beaconPayload.length > 6e4 || !navigator.sendBeacon(trackBatchUrl, blob);
		} catch (_a) {
			return false;
		}
	};
	const flush = async (eventsData, options = {}) => {
		if (eventsData.length === 0 || !isAnalyticsAllowed()) return;
		const sessionContext_ = await getSessionContext(userAuthModule);
		const events = eventsData.map(transformEventDataToApiRequestData(sessionContext_));
		try {
			if (!options.isBeacon || !beaconRequest(events)) await batchRequestFallback(events);
		} catch (_a) {}
	};
	const startProcessing = () => {
		startAnalyticsProcessor(flush, {
			throttleTime,
			batchSize
		});
	};
	const track = (params) => {
		if (!isAnalyticsAllowed() || analyticsSharedState.requestsQueue.length >= maxQueueSize) return;
		const intrinsicData = getEventIntrinsicData();
		analyticsSharedState.requestsQueue.push({
			...params,
			...intrinsicData
		});
		startProcessing();
	};
	const onDocVisible = () => {
		startAnalyticsProcessor(flush, {
			throttleTime,
			batchSize
		});
		clearHeartBeatProcessor = startHeartBeatProcessor(track);
		setSessionDurationTimerStart();
	};
	const onDocHidden = () => {
		stopAnalyticsProcessor();
		clearHeartBeatProcessor === null || clearHeartBeatProcessor === void 0 || clearHeartBeatProcessor();
		trackSessionDurationEvent(track);
		const eventsData = analyticsSharedState.requestsQueue.splice(0);
		flush(eventsData, { isBeacon: true });
	};
	const onVisibilityChange = () => {
		if (typeof window === "undefined") return;
		if (document.visibilityState === "hidden") onDocHidden();
		else if (document.visibilityState === "visible") onDocVisible();
	};
	let isStarted = false;
	const start = () => {
		if (isStarted) return;
		isStarted = true;
		startProcessing();
		clearHeartBeatProcessor = startHeartBeatProcessor(track);
		trackInitializationEvent(track);
		if (typeof window !== "undefined") window.addEventListener("visibilitychange", onVisibilityChange);
	};
	const stop = () => {
		isStarted = false;
		stopAnalyticsProcessor();
		clearHeartBeatProcessor === null || clearHeartBeatProcessor === void 0 || clearHeartBeatProcessor();
		if (typeof window !== "undefined") window.removeEventListener("visibilitychange", onVisibilityChange);
	};
	const stopWatchingConsent = onConsentChange((granted) => {
		if (granted) start();
		else {
			stop();
			analyticsSharedState.requestsQueue.splice(0);
		}
	});
	const cleanup = () => {
		stopWatchingConsent();
		stop();
	};
	if (isAnalyticsAllowed()) start();
	return {
		track,
		cleanup
	};
};
function stopAnalyticsProcessor() {
	analyticsSharedState.isProcessing = false;
}
async function startAnalyticsProcessor(handleTrack, options) {
	if (analyticsSharedState.isProcessing) return;
	analyticsSharedState.isProcessing = true;
	const { throttleTime = 1e3, batchSize = 30 } = options !== null && options !== void 0 ? options : {};
	while (analyticsSharedState.isProcessing && analyticsSharedState.requestsQueue.length > 0) {
		const requests = analyticsSharedState.requestsQueue.splice(0, batchSize);
		requests.length && await handleTrack(requests);
		await new Promise((resolve) => setTimeout(resolve, throttleTime));
	}
	analyticsSharedState.isProcessing = false;
}
function startHeartBeatProcessor(track) {
	var _a;
	if (typeof window === "undefined" || analyticsSharedState.isHeartBeatProcessing || ((_a = analyticsSharedState.config.heartBeatInterval) !== null && _a !== void 0 ? _a : 0) < 10) return () => {};
	analyticsSharedState.isHeartBeatProcessing = true;
	const interval = setInterval(() => {
		track({ eventName: USER_HEARTBEAT_EVENT_NAME });
	}, analyticsSharedState.config.heartBeatInterval);
	return () => {
		clearInterval(interval);
		analyticsSharedState.isHeartBeatProcessing = false;
	};
}
function trackInitializationEvent(track) {
	if (typeof window === "undefined" || analyticsSharedState.wasInitializationTracked) return;
	analyticsSharedState.wasInitializationTracked = true;
	track({
		eventName: ANALYTICS_INITIALIZATION_EVENT_NAME,
		properties: {
			referrer: document === null || document === void 0 ? void 0 : document.referrer,
			...getAttributionParams()
		}
	});
}
var ATTRIBUTION_PARAM_KEYS = [
	"utm_source",
	"utm_medium",
	"utm_campaign",
	"utm_term",
	"utm_content",
	"utm_id",
	"gclid",
	"gbraid",
	"wbraid",
	"gad_source",
	"gad_campaignid",
	"fbclid",
	"msclkid",
	"ttclid",
	"li_fat_id"
];
function getAttributionParams() {
	try {
		const params = new URLSearchParams(window.location.search);
		const out = {};
		for (const key of ATTRIBUTION_PARAM_KEYS) {
			const value = params.get(key);
			if (value) out[key] = value.slice(0, 500);
		}
		return out;
	} catch (_a) {
		return {};
	}
}
function setSessionDurationTimerStart() {
	if (typeof window === "undefined" || analyticsSharedState.sessionStartTime !== null) return;
	analyticsSharedState.sessionStartTime = (/* @__PURE__ */ new Date()).toISOString();
}
function trackSessionDurationEvent(track) {
	if (typeof window === "undefined" || analyticsSharedState.sessionStartTime === null) return;
	const sessionDuration = (/* @__PURE__ */ new Date()).getTime() - new Date(analyticsSharedState.sessionStartTime).getTime();
	analyticsSharedState.sessionStartTime = null;
	track({
		eventName: ANALYTICS_SESSION_DURATION_EVENT_NAME,
		properties: { sessionDuration }
	});
}
function getEventIntrinsicData() {
	var _a, _b;
	return {
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		pageUrl: typeof window !== "undefined" ? (_b = (_a = window.location) === null || _a === void 0 ? void 0 : _a.pathname) !== null && _b !== void 0 ? _b : null : null
	};
}
function transformEventDataToApiRequestData(sessionContext) {
	return (eventData) => ({
		event_name: eventData.eventName,
		properties: eventData.properties,
		timestamp: eventData.timestamp,
		page_url: eventData.pageUrl,
		...sessionContext
	});
}
var sessionContextPromise = null;
/**
* Clears the memoized analytics session context.
*
* The context holds the `user_id` resolved by `auth.me()` and is reused for the
* lifetime of the session, so it has to be dropped whenever the identity
* changes. Without this, a visitor who loads a page anonymously and then logs in
* keeps reporting `user_id: null` on every subsequent event.
*
* @internal
*/
function resetAnalyticsSessionContext() {
	analyticsSharedState.sessionContext = null;
	sessionContextPromise = null;
}
async function getSessionContext(userAuthModule) {
	if (!analyticsSharedState.sessionContext) {
		if (!userAuthModule.hasToken()) return {
			user_id: null,
			session_id: getAnalyticsSessionId()
		};
		if (!sessionContextPromise) {
			const sessionId = getAnalyticsSessionId();
			sessionContextPromise = userAuthModule.me().then((user) => ({
				user_id: user.id,
				session_id: sessionId
			})).catch(() => ({
				user_id: null,
				session_id: sessionId
			}));
		}
		const pending = sessionContextPromise;
		const context = await pending;
		if (sessionContextPromise === pending) analyticsSharedState.sessionContext = context;
		return context;
	}
	return analyticsSharedState.sessionContext;
}
function getAnalyticsConfigFromUrlParams() {
	if (typeof window === "undefined" || !window.location) return void 0;
	const analyticsEnable = new URLSearchParams(window.location.search).get(ANALYTICS_CONFIG_ENABLE_URL_PARAM_KEY);
	if (analyticsEnable == null || !analyticsEnable.length) return void 0;
	const newUrlParams = new URLSearchParams(window.location.search);
	newUrlParams.delete(ANALYTICS_CONFIG_ENABLE_URL_PARAM_KEY);
	const newUrl = window.location.pathname + (newUrlParams.toString() ? "?" + newUrlParams.toString() : "");
	window.history.replaceState({}, "", newUrl);
	return { enabled: analyticsEnable === "true" };
}
function getFallbackSessionId() {
	var _a;
	return (_a = analyticsSharedState.fallbackSessionId) !== null && _a !== void 0 ? _a : analyticsSharedState.fallbackSessionId = generateUuid();
}
function getAnalyticsSessionId() {
	var _a;
	if (typeof window === "undefined" || !isAnalyticsAllowed()) return getFallbackSessionId();
	try {
		const sessionId = localStorage.getItem(ANALYTICS_SESSION_ID_LOCAL_STORAGE_KEY);
		if (!sessionId) {
			const newSessionId = (_a = analyticsSharedState.fallbackSessionId) !== null && _a !== void 0 ? _a : generateUuid();
			localStorage.setItem(ANALYTICS_SESSION_ID_LOCAL_STORAGE_KEY, newSessionId);
			return newSessionId;
		}
		return sessionId;
	} catch (_b) {
		return getFallbackSessionId();
	}
}
// node_modules/@base44/sdk/dist/utils/axios-client.js
/**
* Custom error class for Base44 SDK errors.
*
* This error is thrown when API requests fail. It extends the standard `Error` class and includes additional information about the HTTP status, error code, and response data from the server.
*
* @example
* ```typescript
* try {
*   await client.entities.Todo.get('invalid-id');
* } catch (error) {
*   if (error instanceof Base44Error) {
*     console.error('Status:', error.status);      // 404
*     console.error('Message:', error.message);    // "Not found"
*     console.error('Code:', error.code);          // "NOT_FOUND"
*     console.error('Data:', error.data);          // Full response data
*   }
* }
* ```
*
*/
var Base44Error = class extends Error {
	/**
	* Creates a new Base44Error instance.
	*
	* @param message - Human-readable error message
	* @param status - HTTP status code
	* @param code - Error code from the API
	* @param data - Full response data from the server
	* @param originalError - Original axios error object
	* @internal
	*/
	constructor(message, status, code, data, originalError) {
		super(message);
		this.name = "Base44Error";
		this.status = status;
		this.code = code;
		this.data = data;
		this.originalError = originalError;
	}
	/**
	* Serializes the error to a JSON-safe object.
	*
	* Useful for logging or sending error information to external services
	* without circular reference issues.
	*
	* @returns JSON-safe representation of the error.
	*
	* @example
	* ```typescript
	* try {
	*   await client.entities.Todo.get('invalid-id');
	* } catch (error) {
	*   if (error instanceof Base44Error) {
	*     const json = error.toJSON();
	*     console.log(json);
	*     // {
	*     //   name: "Base44Error",
	*     //   message: "Not found",
	*     //   status: 404,
	*     //   code: "NOT_FOUND",
	*     //   data: { ... }
	*     // }
	*   }
	* }
	* ```
	*/
	toJSON() {
		return {
			name: this.name,
			message: this.message,
			status: this.status,
			code: this.code,
			data: this.data
		};
	}
};
/**
* Creates an axios client with default configuration and interceptors.
*
* Sets up an axios instance with:
* - Default headers
* - Authentication token injection
* - Response data unwrapping
* - Error transformation to Base44Error
* - iframe messaging support
*
* @param options - Client configuration options
* @returns Configured axios instance
* @internal
*/
function createAxiosClient({ baseURL, headers = {}, token, interceptResponses = true, onError }) {
	const client = axios.create({
		baseURL,
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			...headers
		}
	});
	if (token) client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	client.interceptors.request.use((config) => {
		if (typeof window !== "undefined") {
			if (window.location) config.headers.set("X-Origin-URL", window.location.href);
			if (!config.headers.get("Authorization")) config.headers.set("X-Base44-Anonymous-Id", getAnalyticsSessionId());
		}
		const requestId = v4();
		config.requestId = requestId;
		if (isInIFrame) try {
			window.parent.postMessage({
				type: "api-request-start",
				requestId,
				data: {
					url: baseURL + config.url,
					method: config.method,
					body: config.data instanceof FormData ? "[FormData object]" : config.data
				}
			}, "*");
		} catch (_a) {}
		return config;
	});
	if (interceptResponses) client.interceptors.response.use((response) => {
		var _a;
		const requestId = (_a = response.config) === null || _a === void 0 ? void 0 : _a.requestId;
		try {
			if (isInIFrame && requestId) window.parent.postMessage({
				type: "api-request-end",
				requestId,
				data: {
					statusCode: response.status,
					response: response.data
				}
			}, "*");
		} catch (_b) {}
		return response.data;
	}, (error) => {
		var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
		const data = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data;
		const base44Error = new Base44Error(((_b = data === null || data === void 0 ? void 0 : data.error) === null || _b === void 0 ? void 0 : _b.message) || (data === null || data === void 0 ? void 0 : data.message) || (data === null || data === void 0 ? void 0 : data.detail) || error.message, (_c = error.response) === null || _c === void 0 ? void 0 : _c.status, (_k = (_f = (_e = (_d = data === null || data === void 0 ? void 0 : data.error) === null || _d === void 0 ? void 0 : _d.code) !== null && _e !== void 0 ? _e : data === null || data === void 0 ? void 0 : data.code) !== null && _f !== void 0 ? _f : (_j = (_h = (_g = error.response) === null || _g === void 0 ? void 0 : _g.headers) === null || _h === void 0 ? void 0 : _h.get) === null || _j === void 0 ? void 0 : _j.call(_h, "x-base44-connector-error")) !== null && _k !== void 0 ? _k : (_m = (_l = error.response) === null || _l === void 0 ? void 0 : _l.headers) === null || _m === void 0 ? void 0 : _m["x-base44-connector-error"], data, error);
		onError === null || onError === void 0 || onError(base44Error);
		return Promise.reject(base44Error);
	});
	return client;
}
// node_modules/@base44/sdk/dist/modules/entities.js
/**
* Creates the entities module for the Base44 SDK.
*
* @param config - Configuration object containing axios, appId, and getSocket
* @returns Entities module with dynamic entity access
* @internal
*/
function createEntitiesModule(config) {
	const { axios, appId, getSocket } = config;
	return new Proxy({}, { get(target, entityName) {
		if (typeof entityName !== "string" || entityName === "then" || entityName.startsWith("_")) return;
		return createEntityHandler(axios, appId, entityName, getSocket);
	} });
}
/**
* Parses the realtime message data and extracts event information.
* @internal
*/
function parseRealtimeMessage(dataStr) {
	var _a;
	try {
		const parsed = JSON.parse(dataStr);
		return {
			type: parsed.type,
			data: parsed.data,
			id: parsed.id || ((_a = parsed.data) === null || _a === void 0 ? void 0 : _a.id),
			timestamp: parsed.timestamp || (/* @__PURE__ */ new Date()).toISOString()
		};
	} catch (error) {
		console.warn("[Base44 SDK] Failed to parse realtime message:", error);
		return null;
	}
}
var DEFAULT_PAGE_LIMIT = 100;
function isPageOptions(value) {
	return typeof value === "object" && value !== null;
}
/**
* Creates a handler for a specific entity.
*
* @param axios - Axios instance
* @param appId - Application ID
* @param entityName - Entity name
* @param getSocket - Function to get the socket instance
* @returns Entity handler with CRUD methods
* @internal
*/
function createEntityHandler(axios, appId, entityName, getSocket) {
	const baseURL = `/apps/${appId}/entities/${entityName}`;
	const fieldsParam = (fields) => Array.isArray(fields) ? fields.join(",") : fields;
	const readArray = (sort, limit, skip, fields, query) => {
		const params = {};
		if (query) params.q = JSON.stringify(query);
		if (sort) params.sort = sort;
		if (limit) params.limit = limit;
		if (skip) params.skip = skip;
		if (fields) params.fields = fieldsParam(fields);
		return axios.get(baseURL, { params });
	};
	const readPage = (options, query) => {
		const params = {};
		if (query) params.q = JSON.stringify(query);
		params.limit = options.limit || DEFAULT_PAGE_LIMIT;
		if (options.cursor) params.cursor = options.cursor;
		if ("distinct" in options) params.distinct = options.distinct;
		else {
			if (options.sort) params.sort = options.sort;
			if (options.fields) params.fields = fieldsParam(options.fields);
		}
		return axios.get(`${baseURL}/v2/list`, { params });
	};
	return {
		async list(...args) {
			const [sort, limit, skip, fields] = args;
			return isPageOptions(sort) ? readPage(sort) : readArray(sort, limit, skip, fields);
		},
		async filter(query, ...args) {
			const [sort, limit, skip, fields] = args;
			return isPageOptions(sort) ? readPage(sort, query) : readArray(sort, limit, skip, fields, query);
		},
		async get(id) {
			return axios.get(`${baseURL}/${id}`);
		},
		async create(data) {
			return axios.post(baseURL, data);
		},
		async update(id, data) {
			return axios.put(`${baseURL}/${id}`, data);
		},
		async delete(id) {
			return axios.delete(`${baseURL}/${id}`);
		},
		async deleteMany(query) {
			return axios.delete(baseURL, { data: query });
		},
		async bulkCreate(data) {
			return axios.post(`${baseURL}/bulk`, data);
		},
		async updateMany(query, data) {
			return axios.patch(`${baseURL}/update-many`, {
				query,
				data
			});
		},
		async count(query) {
			const params = {};
			if (query) params.q = JSON.stringify(query);
			return (await axios.get(`${baseURL}/count`, { params })).count;
		},
		async aggregate(spec) {
			return axios.post(`${baseURL}/aggregate`, spec);
		},
		async upsert(records, options) {
			return axios.post(`${baseURL}/upsert`, {
				records,
				key: options.key
			});
		},
		async bulkUpdate(data) {
			return axios.put(`${baseURL}/bulk`, data);
		},
		async importEntities(file) {
			const formData = new FormData();
			formData.append("file", file, file.name);
			return axios.post(`${baseURL}/import`, formData, { headers: { "Content-Type": "multipart/form-data" } });
		},
		subscribe(callback) {
			const room = `entities:${appId}:${entityName}`;
			return getSocket().subscribeToRoom(room, { update_model: (msg) => {
				var _a;
				const event = parseRealtimeMessage(msg.data);
				if (!event) return;
				if (event.type !== "delete" && ((_a = event.data) === null || _a === void 0 ? void 0 : _a._oversize)) console.error(`[Base44 SDK] Realtime broadcast for ${entityName}#${event.id} was oversize and got slimmed for transport. Fields >10 KB are empty and the rest of the record may be a stub. Call \`entities.${entityName}.get("${event.id}")\` to fetch the full record.`);
				try {
					callback(event);
				} catch (error) {
					console.error("[Base44 SDK] Subscription callback error:", error);
				}
			} });
		}
	};
}
// node_modules/@base44/sdk/dist/modules/custom-integrations.js
/**
* Creates the custom integrations module for the Base44 SDK.
*
* @param axios - Axios instance for making HTTP requests
* @param appId - Application ID
* @returns Custom integrations module with `call()` method
* @internal
*/
function createCustomIntegrationsModule(axios, appId) {
	return { async call(slug, operationId, params) {
		if (!(slug === null || slug === void 0 ? void 0 : slug.trim())) throw new Error("Integration slug is required and cannot be empty");
		if (!(operationId === null || operationId === void 0 ? void 0 : operationId.trim())) throw new Error("Operation ID is required and cannot be empty");
		const { pathParams, queryParams, ...rest } = params !== null && params !== void 0 ? params : {};
		const body = {
			...rest,
			...pathParams && { path_params: pathParams },
			...queryParams && { query_params: queryParams }
		};
		return await axios.post(`/apps/${appId}/integrations/custom/${slug}/${operationId}`, body);
	} };
}
// node_modules/@base44/sdk/dist/modules/integrations.js
/**
* Creates the integrations module for the Base44 SDK.
*
* @param axios - Axios instance
* @param appId - Application ID
* @returns Integrations module with dynamic access to integration endpoints
* @internal
*/
function createIntegrationsModule(axios, appId) {
	const customModule = createCustomIntegrationsModule(axios, appId);
	return new Proxy({}, { get(target, packageName) {
		if (typeof packageName !== "string" || packageName === "then" || packageName.startsWith("_")) return;
		if (packageName === "custom") return customModule;
		return new Proxy({}, { get(target, endpointName) {
			if (typeof endpointName !== "string" || endpointName === "then" || endpointName.startsWith("_")) return;
			return async (data) => {
				if (typeof data === "string") throw new Error(`Integration ${endpointName} must receive an object with named parameters, received: ${data}`);
				let formData;
				let contentType;
				if (data instanceof FormData || data && Object.values(data).some((value) => value instanceof File)) {
					formData = new FormData();
					Object.keys(data).forEach((key) => {
						if (data[key] instanceof File) formData.append(key, data[key], data[key].name);
						else if (typeof data[key] === "object" && data[key] !== null) formData.append(key, JSON.stringify(data[key]));
						else formData.append(key, data[key]);
					});
					contentType = "multipart/form-data";
				} else {
					formData = data;
					contentType = "application/json";
				}
				if (packageName === "Core") return axios.post(`/apps/${appId}/integration-endpoints/Core/${endpointName}`, formData || data, { headers: { "Content-Type": contentType } });
				return axios.post(`/apps/${appId}/integration-endpoints/installable/${packageName}/integration-endpoints/${endpointName}`, formData || data, { headers: { "Content-Type": contentType } });
			};
		} });
	} });
}
// node_modules/@base44/sdk/dist/utils/auth-utils.js
/**
* Retrieves an access token from URL parameters or local storage.
*
* Low-level utility for manually retrieving tokens. In most cases, the Base44 client handles
* token management automatically. This function is useful for custom authentication flows or when you need direct access to stored tokens. Requires a browser environment and can't be used in the backend.
*
* @internal
*
* @param options - Configuration options for token retrieval.
* @returns The access token string if found, null otherwise.
*
* @example
* ```typescript
* // Get access token from URL or local storage
* const token = getAccessToken();
*
* if (token) {
*   console.log('User is authenticated');
* } else {
*   console.log('No token found, redirect to login');
* }
* ```
* @example
* ```typescript
* // Get access token from custom local storage key
* const token = getAccessToken({ storageKey: 'my_app_token' });
* ```
* @example
* ```typescript
* // Get access token from URL but don't save or remove it
* const token = getAccessToken({
*   saveToStorage: false,
*   removeFromUrl: false
* });
* ```
*/
function getAccessToken(options = {}) {
	const { storageKey = "base44_access_token", paramName = "access_token", saveToStorage = true, removeFromUrl = true } = options;
	let token = null;
	if (typeof window !== "undefined" && window.location) try {
		const urlParams = new URLSearchParams(window.location.search);
		token = urlParams.get(paramName);
		if (token) {
			if (saveToStorage) saveAccessToken(token, { storageKey });
			if (removeFromUrl) {
				urlParams.delete(paramName);
				const newUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""}${window.location.hash}`;
				window.history.replaceState({}, document.title, newUrl);
			}
			return token;
		}
	} catch (e) {
		console.error("Error retrieving token from URL:", e);
	}
	if (typeof window !== "undefined" && window.localStorage) try {
		token = window.localStorage.getItem(storageKey);
		return token;
	} catch (e) {
		console.error("Error retrieving token from local storage:", e);
	}
	return null;
}
/**
* Saves an access token to local storage.
*
* Low-level utility for manually saving tokens. In most cases, the Base44 client handles token management automatically. This function is useful for custom authentication flows or managing custom tokens. Requires a browser environment and can't be used in the backend.
*
* @internal
*
* @param token - The access token string to save.
* @param options - Configuration options for saving the token.
* @returns Returns`true` if the token was saved successfully, `false` otherwise.
*
* @example
* ```typescript
* // Save access token after login
* const response = await base44.auth.loginViaEmailPassword(email, password);
* const success = saveAccessToken(response.access_token, {});
*
* if (success) {
*   console.log('User is now authenticated');
*   // Token is now available for future page loads
* }
* ```
* @example
* ```typescript
* // Save access token to local storage using custom key
* const success = saveAccessToken(token, {
*   storageKey: `my_custom_token_key`
* });
* ```
*/
function saveAccessToken(token, options) {
	const { storageKey = "base44_access_token" } = options;
	if (typeof window === "undefined" || !window.localStorage || !token) return false;
	try {
		window.localStorage.setItem(storageKey, token);
		window.localStorage.setItem("token", token);
		return true;
	} catch (e) {
		console.error("Error saving token to local storage:", e);
		return false;
	}
}
/**
* Removes the access token from local storage.
*
* Low-level utility for manually removing tokens from the browser's local storage. In most cases, the Base44 client handles token management automatically. For standard logout flows, use {@linkcode AuthModule.logout | base44.auth.logout()} instead, which handles token removal and redirects automatically. This function is useful for custom authentication flows or when you need to manually remove tokens. Requires a browser environment and can't be used in the backend.
*
* @internal
*
* @param options - Configuration options for token removal.
* @returns Returns `true` if the token was removed successfully, `false` otherwise.
*
* @example
* ```typescript
* // Remove custom token key
* const success = removeAccessToken({
*   storageKey: 'my_custom_token_key'
* });
* ```
*
* @example
* ```typescript
* // Standard logout flow with token removal and redirect
* base44.auth.logout('/login');
* ```
*/
function removeAccessToken(options) {
	const { storageKey = "base44_access_token" } = options;
	if (typeof window === "undefined" || !window.localStorage) return false;
	try {
		window.localStorage.removeItem(storageKey);
		return true;
	} catch (e) {
		console.error("Error removing token from local storage:", e);
		return false;
	}
}
// node_modules/@base44/sdk/dist/modules/auth.js
function isInsideIframe() {
	if (typeof window === "undefined") return false;
	return window !== window.parent;
}
/**
* Opens a URL in a centered popup and waits for the backend to postMessage
* the auth result back. On success, redirects the current window to
* redirectUrl with the token params appended, preserving the same behaviour
* as a normal full-page redirect flow.
*
* @param url - The login URL to open in the popup (should include popup_origin).
* @param redirectUrl - Where to redirect after auth (the original fromUrl).
* @param expectedOrigin - The origin we expect the postMessage to come from.
*/
function loginViaPopup(url, redirectUrl, expectedOrigin) {
	const width = 500;
	const height = 600;
	const left = Math.round(window.screenX + (window.outerWidth - width) / 2);
	const top = Math.round(window.screenY + (window.outerHeight - height) / 2);
	const popup = window.open(url, "base44_auth", `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`);
	if (!popup) return;
	const cleanup = () => {
		window.removeEventListener("message", onMessage);
		clearInterval(pollTimer);
		if (!popup.closed) popup.close();
	};
	const onMessage = (event) => {
		var _a;
		if (event.origin !== expectedOrigin) return;
		if (event.source !== popup) return;
		if (!((_a = event.data) === null || _a === void 0 ? void 0 : _a.access_token)) return;
		cleanup();
		const callbackUrl = new URL(redirectUrl);
		const { access_token, is_new_user } = event.data;
		callbackUrl.searchParams.set("access_token", access_token);
		if (is_new_user != null) callbackUrl.searchParams.set("is_new_user", String(is_new_user));
		window.location.href = callbackUrl.toString();
	};
	const pollTimer = setInterval(() => {
		if (popup.closed) cleanup();
	}, 500);
	window.addEventListener("message", onMessage);
}
function removeStoredAccessTokens() {
	removeAccessToken({});
	removeAccessToken({ storageKey: "token" });
}
var isStoredAccessToken = (authorization) => authorization === `Bearer ${getAccessToken({
	saveToStorage: false,
	removeFromUrl: false
})}`;
function clearTokenOnRejection(error, sentAuthorization) {
	if (error.status === 401 && isStoredAccessToken(sentAuthorization)) removeStoredAccessTokens();
}
/**
* Creates the auth module for the Base44 SDK.
*
* @param axios - Axios instance for API requests
* @param functionsAxiosClient - Axios instance for functions API requests
* @param appId - Application ID
* @param options - Configuration options including server URLs
* @returns Auth module with authentication and user management methods
* @internal
*/
function createAuthModule(axios, functionsAxiosClient, appId, options) {
	let pendingMe = null;
	const clearPendingMe = () => {
		pendingMe = null;
	};
	let hasAccessToken = Boolean(options.token);
	return {
		hasToken() {
			return hasAccessToken;
		},
		async me() {
			const sentAuthorization = axios.defaults.headers.common["Authorization"];
			const request = pendingMe !== null && pendingMe !== void 0 ? pendingMe : axios.get(`/apps/${appId}/entities/User/me`).catch((error) => {
				clearTokenOnRejection(error, sentAuthorization);
				throw error;
			}).finally(() => {
				if (pendingMe === request) pendingMe = null;
			});
			pendingMe = request;
			return request;
		},
		async updateMe(data) {
			return axios.put(`/apps/${appId}/entities/User/me`, data);
		},
		redirectToLogin(nextUrl) {
			if (typeof window === "undefined") throw new Error("Login method can only be used in a browser environment");
			const redirectUrl = nextUrl ? new URL(nextUrl, window.location.origin).toString() : window.location.href;
			const loginUrl = `${options.appBaseUrl}/login?from_url=${encodeURIComponent(redirectUrl)}`;
			window.location.href = loginUrl;
		},
		loginWithProvider(provider, fromUrl = "/") {
			const redirectUrl = new URL(fromUrl, window.location.origin).toString();
			const queryParams = `app_id=${appId}&from_url=${encodeURIComponent(redirectUrl)}`;
			let authPath;
			if (provider === "sso") authPath = `/apps/${appId}/auth/sso/login`;
			else authPath = `/apps/auth${provider === "google" ? "" : `/${provider}`}/login`;
			const loginUrl = `${options.appBaseUrl}/api${authPath}?${queryParams}`;
			if (isInsideIframe()) return loginViaPopup(`${loginUrl}&popup_origin=${encodeURIComponent(window.location.origin)}`, redirectUrl, window.location.origin);
			window.location.href = loginUrl;
		},
		logout(redirectUrl) {
			delete axios.defaults.headers.common["Authorization"];
			clearPendingMe();
			resetAnalyticsSessionContext();
			hasAccessToken = false;
			if (typeof window !== "undefined") {
				removeStoredAccessTokens();
				const fromUrl = redirectUrl || window.location.href;
				const logoutUrl = `${options.appBaseUrl}/api/apps/auth/logout?from_url=${encodeURIComponent(fromUrl)}`;
				window.location.href = logoutUrl;
			}
		},
		setToken(token, saveToStorage = true) {
			if (!token) return;
			clearPendingMe();
			resetAnalyticsSessionContext();
			hasAccessToken = true;
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			functionsAxiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			if (saveToStorage && typeof window !== "undefined" && window.localStorage) try {
				window.localStorage.setItem("base44_access_token", token);
				window.localStorage.setItem("token", token);
			} catch (e) {
				console.error("Failed to save token to localStorage:", e);
			}
		},
		async loginViaEmailPassword(email, password, turnstileToken) {
			var _a;
			try {
				const { access_token, user } = await axios.post(`/apps/${appId}/auth/login`, {
					email,
					password,
					...turnstileToken && { turnstile_token: turnstileToken }
				});
				if (access_token) this.setToken(access_token);
				return {
					access_token,
					user
				};
			} catch (error) {
				if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 401) await this.logout();
				throw error;
			}
		},
		async isAuthenticated() {
			try {
				await this.me();
				return true;
			} catch (error) {
				return false;
			}
		},
		inviteUser(userEmail, role) {
			return axios.post(`/apps/${appId}/users/invite-user`, {
				user_email: userEmail,
				role
			});
		},
		register(payload) {
			return axios.post(`/apps/${appId}/auth/register`, payload);
		},
		verifyOtp({ email, otpCode }) {
			return axios.post(`/apps/${appId}/auth/verify-otp`, {
				email,
				otp_code: otpCode
			});
		},
		resendOtp(email) {
			return axios.post(`/apps/${appId}/auth/resend-otp`, { email });
		},
		resetPasswordRequest(email) {
			return axios.post(`/apps/${appId}/auth/reset-password-request`, { email });
		},
		resetPassword({ resetToken, newPassword }) {
			return axios.post(`/apps/${appId}/auth/reset-password`, {
				reset_token: resetToken,
				new_password: newPassword
			});
		},
		changePassword({ userId, currentPassword, newPassword }) {
			return axios.post(`/apps/${appId}/auth/change-password`, {
				user_id: userId,
				current_password: currentPassword,
				new_password: newPassword
			});
		}
	};
}
// node_modules/@base44/sdk/dist/modules/sso.js
/**
* Creates the SSO module for the Base44 SDK.
*
* @param axios - Axios instance
* @param appId - Application ID
* @returns SSO module with authentication methods
* @internal
*/
function createSsoModule(axios, appId) {
	return {
		async getAccessToken(userid) {
			const url = `/apps/${appId}/auth/sso/accesstoken/${userid}`;
			return axios.get(url);
		},
		async getIdToken(userid) {
			const url = `/apps/${appId}/auth/sso/idtoken/${userid}`;
			return axios.get(url);
		}
	};
}
// node_modules/@base44/sdk/dist/modules/browser.js
/**
* Creates the Browser module for the Base44 SDK.
*
* @param axios - Axios instance (should be service role client)
* @returns Browser module with methods to create and end remote browser sessions
* @internal
*/
function createBrowserModule(axios) {
	const endSession = async (sessionId) => {
		if (!sessionId || typeof sessionId !== "string") throw new Error("Session ID is required and must be a string");
		await axios.delete(`/v1/browser-sessions/${encodeURIComponent(sessionId)}`);
	};
	return {
		async getSession(options = {}) {
			var _a;
			const data = await axios.post("/v1/browser-sessions", {
				capture_debug_artifacts: (_a = options.captureDebugArtifacts) !== null && _a !== void 0 ? _a : true,
				...options.sessionTimeoutSeconds !== void 0 && { session_timeout_seconds: options.sessionTimeoutSeconds }
			});
			return {
				sessionId: data.session_id,
				connectionUrl: data.connection_url,
				connectionScope: data.connection_scope,
				...data.connection_expires_at && { connectionExpiresAt: data.connection_expires_at },
				...data.session_expires_at && { sessionExpiresAt: data.session_expires_at },
				end: () => endSession(data.session_id)
			};
		},
		endSession
	};
}
// node_modules/@base44/sdk/dist/modules/voice.js
/**
* Creates the Voice module for the Base44 SDK.
*
* The module passes every value through unchanged. Base44 validates them, so
* a backend rule change never needs an SDK release.
*
* @param axios - Axios instance (should be service role client)
* @param config - Module configuration
* @returns Voice module with methods to create and end live voice sessions
* @internal
*/
function createVoiceModule(axios, { functionsVersion } = {}) {
	const endSession = async (sessionId) => {
		if (!sessionId || typeof sessionId !== "string") throw new Error("Session ID is required and must be a string");
		await axios.delete(`/v1/voice-sessions/${encodeURIComponent(sessionId)}`);
	};
	return {
		async createSession(options) {
			const data = await axios.post("/v1/voice-sessions", {
				sdp: options.sdp,
				mcp_profile_id: options.mcpProfileId,
				voice_instructions: options.voiceInstructions,
				agent_instructions: options.agentInstructions,
				...options.voiceModel !== void 0 && { voice_model: options.voiceModel },
				...options.agentModel !== void 0 && { agent_model: options.agentModel },
				...options.voice !== void 0 && { voice: options.voice },
				...options.initialMessages !== void 0 && { initial_messages: options.initialMessages }
			}, { headers: functionsVersion ? { "Base44-Functions-Version": functionsVersion } : void 0 });
			return {
				sessionId: data.session_id,
				sdp: data.sdp,
				expiresAt: data.expires_at,
				environment: data.environment
			};
		},
		endSession
	};
}
// node_modules/@base44/sdk/dist/modules/connectors.js
var CONNECTOR_API_METHODS = /* @__PURE__ */ new Set([
	"GET",
	"POST",
	"PUT",
	"PATCH",
	"DELETE",
	"HEAD"
]);
/**
* Creates the Connectors module for the Base44 SDK.
*
* @param axios - Axios instance (should be service role client)
* @param appId - Application ID
* @returns Connectors module with methods to retrieve OAuth tokens
* @internal
*/
function createConnectorsModule(axios, appId) {
	return {
		/**
		* Retrieve an OAuth access token for a specific external integration type.
		* @deprecated Use getConnection(integrationType) and use the returned accessToken (and connectionConfig when needed) instead.
		*/
		async getAccessToken(integrationType) {
			if (!integrationType || typeof integrationType !== "string") throw new Error("Integration type is required and must be a string");
			return (await axios.get(`/apps/${appId}/external-auth/tokens/${encodeURIComponent(integrationType)}`)).access_token;
		},
		async getConnection(integrationType) {
			var _a;
			if (!integrationType || typeof integrationType !== "string") throw new Error("Integration type is required and must be a string");
			const data = await axios.get(`/apps/${appId}/external-auth/tokens/${encodeURIComponent(integrationType)}`);
			return {
				accessToken: data.access_token,
				connectionConfig: (_a = data.connection_config) !== null && _a !== void 0 ? _a : null
			};
		},
		async getWorkspaceConnection(connectorId) {
			var _a;
			if (!connectorId || typeof connectorId !== "string") throw new Error("Connector ID is required and must be a string");
			const data = await axios.get(`/apps/${appId}/external-auth/tokens/connectors/${encodeURIComponent(connectorId)}`);
			return {
				accessToken: data.access_token,
				connectionConfig: (_a = data.connection_config) !== null && _a !== void 0 ? _a : null
			};
		},
		/**
		* @deprecated Use getCurrentAppUserConnection(connectorId) and use the returned accessToken (and connectionConfig when needed) instead.
		*/
		async getCurrentAppUserAccessToken(connectorId) {
			if (!connectorId || typeof connectorId !== "string") throw new Error("Connector ID is required and must be a string");
			return (await axios.get(`/apps/${appId}/app-user-auth/connectors/${encodeURIComponent(connectorId)}/token`)).access_token;
		},
		async getCurrentAppUserConnection(connectorId) {
			var _a;
			if (!connectorId || typeof connectorId !== "string") throw new Error("Connector ID is required and must be a string");
			const data = await axios.get(`/apps/${appId}/app-user-auth/connectors/${encodeURIComponent(connectorId)}/token`);
			return {
				accessToken: data.access_token,
				connectionConfig: (_a = data.connection_config) !== null && _a !== void 0 ? _a : null
			};
		},
		async callApi(integrationType, request) {
			assertNonEmptyString(integrationType, "Integration type");
			return proxyCall(axios, `/apps/${appId}/connectors/${encodeURIComponent(integrationType)}/call`, request);
		}
	};
}
function assertNonEmptyString(value, label) {
	if (!value || typeof value !== "string") throw new Error(`${label} is required and must be a string`);
}
/**
* POST a request to the connector proxy and normalize the response.
*
* The proxy reports upstream outcomes in the body rather than as HTTP status, so
* a provider 4xx/5xx arrives here as a resolved response with `success: false` —
* only Base44-side failures reject through the axios error interceptor.
*
* @internal
*/
async function proxyCall(axios, url, request) {
	var _a, _b, _c, _d, _e, _f, _g, _h, _j;
	if (!request || typeof request !== "object") throw new Error("Request is required and must be an object");
	assertNonEmptyString(request.path, "Request path");
	const method = (_a = request.method) !== null && _a !== void 0 ? _a : "GET";
	if (!CONNECTOR_API_METHODS.has(method)) throw new Error("Request method must be one of GET, POST, PUT, PATCH, DELETE, or HEAD");
	const data = await axios.post(url, {
		method,
		...request.host == null ? {} : { host: request.host },
		path: request.path,
		query: (_b = request.query) !== null && _b !== void 0 ? _b : {},
		headers: (_c = request.headers) !== null && _c !== void 0 ? _c : {},
		body: (_d = request.body) !== null && _d !== void 0 ? _d : null
	});
	return {
		success: data.success,
		phase: data.phase,
		status: (_e = data.status_code) !== null && _e !== void 0 ? _e : null,
		data: data.data,
		dataBase64: (_f = data.data_base64) !== null && _f !== void 0 ? _f : null,
		contentType: (_g = data.content_type) !== null && _g !== void 0 ? _g : null,
		headers: (_h = data.headers) !== null && _h !== void 0 ? _h : {},
		creditsCharged: (_j = data.credits_charged) !== null && _j !== void 0 ? _j : 0
	};
}
/**
* Creates the user-scoped Connectors module (app-user OAuth flows).
*
* @param axios - Axios instance (user-scoped client)
* @param appId - Application ID
* @returns User connectors module with app-user OAuth methods
* @internal
*/
function createUserConnectorsModule(axios, appId) {
	return {
		async connectAppUser(connectorId) {
			if (!connectorId || typeof connectorId !== "string") throw new Error("Connector ID is required and must be a string");
			return (await axios.post(`/apps/${appId}/app-user-auth/connectors/${encodeURIComponent(connectorId)}/initiate`)).redirect_url;
		},
		async disconnectAppUser(connectorId) {
			if (!connectorId || typeof connectorId !== "string") throw new Error("Connector ID is required and must be a string");
			await axios.delete(`/apps/${appId}/app-user-auth/connectors/${encodeURIComponent(connectorId)}`);
		}
	};
}
// node_modules/@base44/sdk/dist/utils/fetch-with-auth.js
/**
* Builds the client's `fetchWithAuth`: a `fetch` to the app's own origin that
* carries whatever credentials this client holds.
*
* That is the user's access token in a browser, and from
* `createClientFromRequest()` the full set that function reads back — so a
* route reached this way rebuilds the caller's client, service role included.
* The service credential is minted per request for the app as a whole, not for
* one route, so a handler in the same worker already runs with that authority;
* reaching it through a route hop is the privilege it would have had by
* importing a shared function. What must never happen is a credential leaving
* the app, and the relative-path rule, not a shorter header list, is what
* prevents that.
*
* @param axios - The user-scoped instance. Its `Authorization` default is the
* live token: it follows `setToken()` and is deleted on `logout()`, so a
* request never carries a token the user no longer has. From
* `createClientFromRequest()` it holds the caller's own token.
* @param serviceRoleAxios - The service-role instance, holding the app's
* per-request credential as its own `Authorization` default. A browser client
* has none, so nothing is sent.
* @internal
*/
function createFetchWithAuth({ axios, serviceRoleAxios, appId, serverUrl, functionsVersion, platformHeaders }) {
	const inherited = new Headers(platformHeaders);
	const bearer = (client) => {
		const header = client.defaults.headers.common["Authorization"];
		return typeof header === "string" && header.startsWith("Bearer ") ? header : null;
	};
	return async function fetchWithAuth(path, init = {}) {
		assertOwnOriginPath(path);
		const { fetch: transport = fetch, ...requestInit } = init;
		const headers = new Headers(init.headers);
		const inherit = (name, value) => {
			if (value && !headers.has(name)) headers.set(name, value);
		};
		inherit("Authorization", bearer(axios));
		inherit("Base44-Service-Authorization", bearer(serviceRoleAxios));
		inherit("Base44-App-Id", appId);
		inherit("Base44-Api-Url", serverUrl);
		inherit("Base44-Functions-Version", functionsVersion);
		inherit("Base44-State", inherited.get("Base44-State"));
		inherit("X-Data-Env", inherited.get("X-Data-Env"));
		return transport(path, {
			...requestInit,
			headers
		});
	};
}
function assertOwnOriginPath(path) {
	if (typeof path !== "string" || path === "") throw new Error("fetchWithAuth() requires a path, such as '/api/orders'.");
	const asParsed = path.replace(/[\t\n\r]/g, "").replace(/^[\x00-\x20]+/, "");
	if (!asParsed.startsWith("/") || asParsed.startsWith("//") || asParsed.startsWith("/\\")) throw new Error(`fetchWithAuth() only sends requests to your app's own origin, so your app's credentials never reach a third party. "${path}" is not a path on it — pass a relative path such as '/api/orders'. Use base44.functions.fetch() to call a Base44 backend function, or plain fetch() for another origin.`);
}
// node_modules/@base44/sdk/dist/utils/build-commit.js
/** Header the backend reads to tell which frontend build sent a request. */
var BUILD_COMMIT_HEADER = "X-Base44-Build";
/**
* The build-commit header to send from this client, if any.
*
* Only a browser sends it: the value names the browser bundle, so a server
* (Node, Deno, a backend function) or React Native would report a commit that
* isn't the one running.
*
* @internal
*/
function getBuildCommitHeaders() {
	if (isNode || isReactNative$1) return {};
	return {};
}
// node_modules/@base44/sdk/dist/modules/functions.js
/**
* Creates the functions module for the Base44 SDK.
*
* @param axios - Axios instance
* @param appId - Application ID
* @param config - Optional configuration for fetch functionality
* @returns Functions module with methods to invoke custom backend functions
* @internal
*/
function createFunctionsModule(axios, appId, config) {
	const joinBaseUrl = (base, path) => {
		if (!base) return path;
		return `${String(base).replace(/\/$/, "")}${path}`;
	};
	const toHeaders = (inputHeaders) => {
		const headers = new Headers();
		if (config === null || config === void 0 ? void 0 : config.getAuthHeaders) {
			const authHeaders = config.getAuthHeaders();
			Object.entries(authHeaders).forEach(([key, value]) => {
				if (value !== void 0 && value !== null) headers.set(key, String(value));
			});
		}
		if (inputHeaders) new Headers(inputHeaders).forEach((value, key) => {
			headers.set(key, value);
		});
		return headers;
	};
	return {
		async invoke(functionName, data) {
			if (typeof data === "string") throw new Error(`Function ${functionName} must receive an object with named parameters, received: ${data}`);
			let formData;
			let contentType;
			if (data instanceof FormData || data && Object.values(data).some((value) => value instanceof File)) {
				formData = new FormData();
				Object.keys(data).forEach((key) => {
					if (data[key] instanceof File) formData.append(key, data[key], data[key].name);
					else if (typeof data[key] === "object" && data[key] !== null) formData.append(key, JSON.stringify(data[key]));
					else formData.append(key, data[key]);
				});
				contentType = "multipart/form-data";
			} else {
				formData = data;
				contentType = "application/json";
			}
			return axios.post(`/apps/${appId}/functions/${functionName}`, formData || data, { headers: { "Content-Type": contentType } });
		},
		async fetch(path, init = {}) {
			const primaryPath = `/functions${path.startsWith("/") ? path : `/${path}`}`;
			const headers = toHeaders(init.headers);
			const requestInit = {
				...init,
				headers
			};
			return await fetch(joinBaseUrl(config === null || config === void 0 ? void 0 : config.baseURL, primaryPath), requestInit);
		}
	};
}
// node_modules/@base44/sdk/dist/modules/agents.js
function createAgentsModule({ axios, getSocket, appId, serverUrl, token }) {
	const baseURL = `/apps/${appId}/agents`;
	const currentConversations = {};
	const getConversations = () => {
		return axios.get(`${baseURL}/conversations`);
	};
	const getConversation = (conversationId) => {
		return axios.get(`${baseURL}/conversations/${conversationId}`);
	};
	const listConversations = (filterParams) => {
		return axios.get(`${baseURL}/conversations`, { params: filterParams });
	};
	const createConversation = (conversation) => {
		return axios.post(`${baseURL}/conversations`, conversation);
	};
	const addMessage = async (conversation, message) => {
		return axios.post(`${baseURL}/conversations/v2/${conversation.id}/messages`, message);
	};
	const subscribeToConversation = (conversationId, onUpdate) => {
		const room = `/agent-conversations/${conversationId}`;
		const socket = getSocket();
		const conversationPromise = getConversation(conversationId).then((conv) => {
			currentConversations[conversationId] = conv;
			return conv;
		});
		return socket.subscribeToRoom(room, {
			connect: () => {},
			update_model: async ({ data: jsonStr }) => {
				const data = JSON.parse(jsonStr);
				if (data._message) {
					await conversationPromise;
					const message = data._message;
					const currentConversation = currentConversations[conversationId];
					if (currentConversation) {
						const messages = currentConversation.messages || [];
						const existingIndex = messages.findIndex((m) => m.id === message.id);
						const updatedMessages = existingIndex !== -1 ? messages.map((m, i) => i === existingIndex ? message : m) : [...messages, message];
						currentConversations[conversationId] = {
							...currentConversation,
							messages: updatedMessages
						};
						onUpdate === null || onUpdate === void 0 || onUpdate(currentConversations[conversationId]);
					}
				}
			}
		});
	};
	const getWhatsAppConnectURL = (agentName) => {
		const baseUrl = `${serverUrl}/api/apps/${appId}/agents/${encodeURIComponent(agentName)}/whatsapp`;
		const accessToken = token !== null && token !== void 0 ? token : getAccessToken();
		if (accessToken) return `${baseUrl}?token=${accessToken}`;
		else return baseUrl;
	};
	const getTelegramConnectURL = (agentName) => {
		const baseUrl = `${serverUrl}/api/apps/${appId}/agents/${encodeURIComponent(agentName)}/telegram`;
		const accessToken = token !== null && token !== void 0 ? token : getAccessToken();
		if (accessToken) return `${baseUrl}?token=${accessToken}`;
		else return baseUrl;
	};
	return {
		getConversations,
		getConversation,
		listConversations,
		createConversation,
		addMessage,
		subscribeToConversation,
		getWhatsAppConnectURL,
		getTelegramConnectURL
	};
}
// node_modules/@base44/sdk/dist/modules/ai-gateway.js
var PROVIDER_PATHS = {
	openai: "openai",
	typesafe: "typesafe"
};
function createAiGatewayModule({ serverUrl, token, appId, headers = {} }) {
	const connection = ({ provider = "openai" } = {}) => {
		var _a;
		if (!Object.prototype.hasOwnProperty.call(PROVIDER_PATHS, provider)) throw new Error(`Unsupported AI Gateway provider: ${provider}`);
		return {
			baseURL: `${serverUrl}/api/apps/${appId}/ai/${PROVIDER_PATHS[provider]}/v1`,
			token: (_a = token !== null && token !== void 0 ? token : getAccessToken()) !== null && _a !== void 0 ? _a : "",
			headers: { ...headers }
		};
	};
	return { connection };
}
// node_modules/@base44/sdk/dist/modules/app-logs.js
/**
* Creates the app logs module for the Base44 SDK.
*
* @param axios - Axios instance
* @param appId - Application ID
* @returns App logs module with methods for tracking and analyzing app usage
* @internal
*/
function createAppLogsModule(axios, appId) {
	const baseURL = `/app-logs/${appId}`;
	return {
		async logUserInApp(pageName) {
			if (!isAnalyticsAllowed()) return;
			await axios.post(`${baseURL}/log-user-in-app/${pageName}`);
		},
		async fetchLogs(params = {}) {
			return await axios.get(baseURL, { params });
		},
		async getStats(params = {}) {
			return await axios.get(`${baseURL}/stats`, { params });
		}
	};
}
// node_modules/@base44/sdk/dist/modules/app.js
/**
* Creates the app module for the Base44 SDK.
*
* @param axios - Axios instance
* @param appId - Application ID
* @returns App module for reading the app's own configuration
* @internal
*/
function createAppModule(axios, appId) {
	return { async getPublicSettings() {
		return axios.get(`/apps/public/prod/public-settings/by-id/${appId}`);
	} };
}
// node_modules/@base44/sdk/dist/modules/users.js
/**
* Creates the users module for the Base44 SDK
* @param {AxiosInstance} axios - Axios instance
* @param {string} appId - Application ID
* @returns {Object} Users module
*/
function createUsersModule(axios, appId) {
	return { 
	/**
	* Invite a user to the application
	* @param {string} user_email - User's email address
	* @param {'user'|'admin'} role - User's role (user or admin)
	* @returns {Promise<any>}
	*/
async inviteUser(user_email, role) {
		if (role !== "user" && role !== "admin") throw new Error(`Invalid role: "${role}". Role must be either "user" or "admin".`);
		return await axios.post(`/apps/${appId}/runtime/users/invite-user`, {
			user_email,
			role
		});
	} };
}
/**
* Wrapper for built-in http.js to emulate the browser XMLHttpRequest object.
*
* This can be used with JS designed for browsers to improve reuse of code and
* allow the use of existing libraries.
*
* Usage: include("XMLHttpRequest.js") and use XMLHttpRequest per W3C specs.
*
* @author Dan DeFelippi <dan@driverdan.com>
* @contributor David Ellis <d.f.ellis@ieee.org>
* @license MIT
*/
// node_modules/engine.io-parser/build/esm/commons.js
var import_XMLHttpRequest = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs = __require("fs");
	var Url = __require("url");
	var spawn = __require("child_process").spawn;
	/**
	* Module exports.
	*/
	module.exports = XMLHttpRequest;
	XMLHttpRequest.XMLHttpRequest = XMLHttpRequest;
	/**
	* `XMLHttpRequest` constructor.
	*
	* Supported options for the `opts` object are:
	*
	*  - `agent`: An http.Agent instance; http.globalAgent may be used; if 'undefined', agent usage is disabled
	*
	* @param {Object} opts optional "options" object
	*/
	function XMLHttpRequest(opts) {
		"use strict";
		opts = opts || {};
		/**
		* Private variables
		*/
		var self = this;
		var http = __require("http");
		var https = __require("https");
		var request;
		var response;
		var settings = {};
		var disableHeaderCheck = false;
		var defaultHeaders = {
			"User-Agent": "node-XMLHttpRequest",
			"Accept": "*/*"
		};
		var headers = Object.assign({}, defaultHeaders);
		var forbiddenRequestHeaders = [
			"accept-charset",
			"accept-encoding",
			"access-control-request-headers",
			"access-control-request-method",
			"connection",
			"content-length",
			"content-transfer-encoding",
			"cookie",
			"cookie2",
			"date",
			"expect",
			"host",
			"keep-alive",
			"origin",
			"referer",
			"te",
			"trailer",
			"transfer-encoding",
			"upgrade",
			"via"
		];
		var forbiddenRequestMethods = [
			"TRACE",
			"TRACK",
			"CONNECT"
		];
		var sendFlag = false;
		var errorFlag = false;
		var abortedFlag = false;
		var listeners = {};
		/**
		* Constants
		*/
		this.UNSENT = 0;
		this.OPENED = 1;
		this.HEADERS_RECEIVED = 2;
		this.LOADING = 3;
		this.DONE = 4;
		/**
		* Public vars
		*/
		this.readyState = this.UNSENT;
		this.onreadystatechange = null;
		this.responseText = "";
		this.responseXML = "";
		this.response = Buffer.alloc(0);
		this.status = null;
		this.statusText = null;
		/**
		* Private methods
		*/
		/**
		* Check if the specified header is allowed.
		*
		* @param string header Header to validate
		* @return boolean False if not allowed, otherwise true
		*/
		var isAllowedHttpHeader = function(header) {
			return disableHeaderCheck || header && forbiddenRequestHeaders.indexOf(header.toLowerCase()) === -1;
		};
		/**
		* Check if the specified method is allowed.
		*
		* @param string method Request method to validate
		* @return boolean False if not allowed, otherwise true
		*/
		var isAllowedHttpMethod = function(method) {
			return method && forbiddenRequestMethods.indexOf(method) === -1;
		};
		/**
		* Public methods
		*/
		/**
		* Open the connection. Currently supports local server requests.
		*
		* @param string method Connection method (eg GET, POST)
		* @param string url URL for the connection.
		* @param boolean async Asynchronous connection. Default is true.
		* @param string user Username for basic authentication (optional)
		* @param string password Password for basic authentication (optional)
		*/
		this.open = function(method, url, async, user, password) {
			this.abort();
			errorFlag = false;
			abortedFlag = false;
			if (!isAllowedHttpMethod(method)) throw new Error("SecurityError: Request method not allowed");
			settings = {
				"method": method,
				"url": url.toString(),
				"async": typeof async !== "boolean" ? true : async,
				"user": user || null,
				"password": password || null
			};
			setState(this.OPENED);
		};
		/**
		* Disables or enables isAllowedHttpHeader() check the request. Enabled by default.
		* This does not conform to the W3C spec.
		*
		* @param boolean state Enable or disable header checking.
		*/
		this.setDisableHeaderCheck = function(state) {
			disableHeaderCheck = state;
		};
		/**
		* Sets a header for the request.
		*
		* @param string header Header name
		* @param string value Header value
		* @return boolean Header added
		*/
		this.setRequestHeader = function(header, value) {
			if (this.readyState != this.OPENED) throw new Error("INVALID_STATE_ERR: setRequestHeader can only be called when state is OPEN");
			if (!isAllowedHttpHeader(header)) {
				console.warn("Refused to set unsafe header \"" + header + "\"");
				return false;
			}
			if (sendFlag) throw new Error("INVALID_STATE_ERR: send flag is true");
			headers[header] = value;
			return true;
		};
		/**
		* Gets a header from the server response.
		*
		* @param string header Name of header to get.
		* @return string Text of the header or null if it doesn't exist.
		*/
		this.getResponseHeader = function(header) {
			if (typeof header === "string" && this.readyState > this.OPENED && response.headers[header.toLowerCase()] && !errorFlag) return response.headers[header.toLowerCase()];
			return null;
		};
		/**
		* Gets all the response headers.
		*
		* @return string A string with all response headers separated by CR+LF
		*/
		this.getAllResponseHeaders = function() {
			if (this.readyState < this.HEADERS_RECEIVED || errorFlag) return "";
			var result = "";
			for (var i in response.headers) if (i !== "set-cookie" && i !== "set-cookie2") result += i + ": " + response.headers[i] + "\r\n";
			return result.substr(0, result.length - 2);
		};
		/**
		* Gets a request header
		*
		* @param string name Name of header to get
		* @return string Returns the request header or empty string if not set
		*/
		this.getRequestHeader = function(name) {
			if (typeof name === "string" && headers[name]) return headers[name];
			return "";
		};
		/**
		* Sends the request to the server.
		*
		* @param string data Optional data to send as request body.
		*/
		this.send = function(data) {
			if (this.readyState != this.OPENED) throw new Error("INVALID_STATE_ERR: connection must be opened before send() is called");
			if (sendFlag) throw new Error("INVALID_STATE_ERR: send has already been called");
			var ssl = false, local = false;
			var url = Url.parse(settings.url);
			var host;
			switch (url.protocol) {
				case "https:": ssl = true;
				case "http:":
					host = url.hostname;
					break;
				case "file:":
					local = true;
					break;
				case void 0:
				case "":
					host = "localhost";
					break;
				default: throw new Error("Protocol not supported.");
			}
			if (local) {
				if (settings.method !== "GET") throw new Error("XMLHttpRequest: Only GET method is supported");
				if (settings.async) fs.readFile(unescape(url.pathname), function(error, data) {
					if (error) self.handleError(error, error.errno || -1);
					else {
						self.status = 200;
						self.responseText = data.toString("utf8");
						self.response = data;
						setState(self.DONE);
					}
				});
				else try {
					this.response = fs.readFileSync(unescape(url.pathname));
					this.responseText = this.response.toString("utf8");
					this.status = 200;
					setState(self.DONE);
				} catch (e) {
					this.handleError(e, e.errno || -1);
				}
				return;
			}
			var port = url.port || (ssl ? 443 : 80);
			var uri = url.pathname + (url.search ? url.search : "");
			headers["Host"] = host;
			if (!(ssl && port === 443 || port === 80)) headers["Host"] += ":" + url.port;
			if (settings.user) {
				if (typeof settings.password == "undefined") settings.password = "";
				var authBuf = new Buffer(settings.user + ":" + settings.password);
				headers["Authorization"] = "Basic " + authBuf.toString("base64");
			}
			if (settings.method === "GET" || settings.method === "HEAD") data = null;
			else if (data) {
				headers["Content-Length"] = Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data);
				if (!Object.keys(headers).some(function(h) {
					return h.toLowerCase() === "content-type";
				})) headers["Content-Type"] = "text/plain;charset=UTF-8";
			} else if (settings.method === "POST") headers["Content-Length"] = 0;
			var agent = opts.agent || false;
			var options = {
				host,
				port,
				path: uri,
				method: settings.method,
				headers,
				agent
			};
			if (ssl) {
				options.pfx = opts.pfx;
				options.key = opts.key;
				options.passphrase = opts.passphrase;
				options.cert = opts.cert;
				options.ca = opts.ca;
				options.ciphers = opts.ciphers;
				options.rejectUnauthorized = opts.rejectUnauthorized === false ? false : true;
			}
			errorFlag = false;
			if (settings.async) {
				var doRequest = ssl ? https.request : http.request;
				sendFlag = true;
				self.dispatchEvent("readystatechange");
				var responseHandler = function(resp) {
					response = resp;
					if (response.statusCode === 302 || response.statusCode === 303 || response.statusCode === 307) {
						settings.url = response.headers.location;
						var url = Url.parse(settings.url);
						host = url.hostname;
						var newOptions = {
							hostname: url.hostname,
							port: url.port,
							path: url.path,
							method: response.statusCode === 303 ? "GET" : settings.method,
							headers
						};
						if (ssl) {
							newOptions.pfx = opts.pfx;
							newOptions.key = opts.key;
							newOptions.passphrase = opts.passphrase;
							newOptions.cert = opts.cert;
							newOptions.ca = opts.ca;
							newOptions.ciphers = opts.ciphers;
							newOptions.rejectUnauthorized = opts.rejectUnauthorized === false ? false : true;
						}
						request = doRequest(newOptions, responseHandler).on("error", errorHandler);
						request.end();
						return;
					}
					setState(self.HEADERS_RECEIVED);
					self.status = response.statusCode;
					response.on("data", function(chunk) {
						if (chunk) {
							var data = Buffer.from(chunk);
							self.response = Buffer.concat([self.response, data]);
						}
						if (sendFlag) setState(self.LOADING);
					});
					response.on("end", function() {
						if (sendFlag) {
							sendFlag = false;
							setState(self.DONE);
							self.responseText = self.response.toString("utf8");
						}
					});
					response.on("error", function(error) {
						self.handleError(error);
					});
				};
				var errorHandler = function(error) {
					if (request.reusedSocket && error.code === "ECONNRESET") return doRequest(options, responseHandler).on("error", errorHandler);
					self.handleError(error);
				};
				request = doRequest(options, responseHandler).on("error", errorHandler);
				if (opts.autoUnref) request.on("socket", (socket) => {
					socket.unref();
				});
				if (data) request.write(data);
				request.end();
				self.dispatchEvent("loadstart");
			} else {
				var contentFile = ".node-xmlhttprequest-content-" + process.pid;
				var syncFile = ".node-xmlhttprequest-sync-" + process.pid;
				fs.writeFileSync(syncFile, "", "utf8");
				var execString = "var http = require('http'), https = require('https'), fs = require('fs');var doRequest = http" + (ssl ? "s" : "") + ".request;var options = " + JSON.stringify(options) + ";var responseText = '';var responseData = Buffer.alloc(0);var req = doRequest(options, function(response) {response.on('data', function(chunk) {  var data = Buffer.from(chunk);  responseText += data.toString('utf8');  responseData = Buffer.concat([responseData, data]);});response.on('end', function() {fs.writeFileSync('" + contentFile + "', JSON.stringify({err: null, data: {statusCode: response.statusCode, headers: response.headers, text: responseText, data: responseData.toString('base64')}}), 'utf8');fs.unlinkSync('" + syncFile + "');});response.on('error', function(error) {fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');fs.unlinkSync('" + syncFile + "');});}).on('error', function(error) {fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');fs.unlinkSync('" + syncFile + "');});" + (data ? "req.write('" + JSON.stringify(data).slice(1, -1).replace(/'/g, "\\'") + "');" : "") + "req.end();";
				var syncProc = spawn(process.argv[0], ["-e", execString]);
				while (fs.existsSync(syncFile));
				self.responseText = fs.readFileSync(contentFile, "utf8");
				syncProc.stdin.end();
				fs.unlinkSync(contentFile);
				if (self.responseText.match(/^NODE-XMLHTTPREQUEST-ERROR:/)) {
					var errorObj = JSON.parse(self.responseText.replace(/^NODE-XMLHTTPREQUEST-ERROR:/, ""));
					self.handleError(errorObj, 503);
				} else {
					self.status = self.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:([0-9]*),.*/, "$1");
					var resp = JSON.parse(self.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:[0-9]*,(.*)/, "$1"));
					response = {
						statusCode: self.status,
						headers: resp.data.headers
					};
					self.responseText = resp.data.text;
					self.response = Buffer.from(resp.data.data, "base64");
					setState(self.DONE, true);
				}
			}
		};
		/**
		* Called when an error is encountered to deal with it.
		* @param  status  {number}    HTTP status code to use rather than the default (0) for XHR errors.
		*/
		this.handleError = function(error, status) {
			this.status = status || 0;
			this.statusText = error;
			this.responseText = error.stack;
			errorFlag = true;
			setState(this.DONE);
		};
		/**
		* Aborts a request.
		*/
		this.abort = function() {
			if (request) {
				request.abort();
				request = null;
			}
			headers = Object.assign({}, defaultHeaders);
			this.responseText = "";
			this.responseXML = "";
			this.response = Buffer.alloc(0);
			errorFlag = abortedFlag = true;
			if (this.readyState !== this.UNSENT && (this.readyState !== this.OPENED || sendFlag) && this.readyState !== this.DONE) {
				sendFlag = false;
				setState(this.DONE);
			}
			this.readyState = this.UNSENT;
		};
		/**
		* Adds an event listener. Preferred method of binding to events.
		*/
		this.addEventListener = function(event, callback) {
			if (!(event in listeners)) listeners[event] = [];
			listeners[event].push(callback);
		};
		/**
		* Remove an event callback that has already been bound.
		* Only works on the matching funciton, cannot be a copy.
		*/
		this.removeEventListener = function(event, callback) {
			if (event in listeners) listeners[event] = listeners[event].filter(function(ev) {
				return ev !== callback;
			});
		};
		/**
		* Dispatch any events, including both "on" methods and events attached using addEventListener.
		*/
		this.dispatchEvent = function(event) {
			if (typeof self["on" + event] === "function") {
				if (this.readyState === this.DONE && settings.async) setTimeout(function() {
					self["on" + event]();
				}, 0);
				else self["on" + event]();
			}
			if (event in listeners) for (let i = 0, len = listeners[event].length; i < len; i++) if (this.readyState === this.DONE) setTimeout(function() {
				listeners[event][i].call(self);
			}, 0);
			else listeners[event][i].call(self);
		};
		/**
		* Changes readyState and calls onreadystatechange.
		*
		* @param int state New state
		*/
		var setState = function(state) {
			if (self.readyState === state || self.readyState === self.UNSENT && abortedFlag) return;
			self.readyState = state;
			if (settings.async || self.readyState < self.OPENED || self.readyState === self.DONE) self.dispatchEvent("readystatechange");
			if (self.readyState === self.DONE) {
				let fire;
				if (abortedFlag) fire = "abort";
				else if (errorFlag) fire = "error";
				else fire = "load";
				self.dispatchEvent(fire);
				self.dispatchEvent("loadend");
			}
		};
	}
})))());
var PACKET_TYPES = Object.create(null);
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
var PACKET_TYPES_REVERSE = Object.create(null);
Object.keys(PACKET_TYPES).forEach((key) => {
	PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
var ERROR_PACKET = {
	type: "error",
	data: "parser error"
};
// node_modules/engine.io-parser/build/esm/encodePacket.js
var encodePacket = ({ type, data }, supportsBinary, callback) => {
	if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) return callback(supportsBinary ? data : "b" + toBuffer(data, true).toString("base64"));
	return callback(PACKET_TYPES[type] + (data || ""));
};
var toBuffer = (data, forceBufferConversion) => {
	if (Buffer.isBuffer(data) || data instanceof Uint8Array && !forceBufferConversion) return data;
	else if (data instanceof ArrayBuffer) return Buffer.from(data);
	else return Buffer.from(data.buffer, data.byteOffset, data.byteLength);
};
var TEXT_ENCODER;
function encodePacketToBinary(packet, callback) {
	if (packet.data instanceof ArrayBuffer || ArrayBuffer.isView(packet.data)) return callback(toBuffer(packet.data, false));
	encodePacket(packet, true, (encoded) => {
		if (!TEXT_ENCODER) TEXT_ENCODER = new TextEncoder();
		callback(TEXT_ENCODER.encode(encoded));
	});
}
// node_modules/engine.io-parser/build/esm/decodePacket.js
var decodePacket = (encodedPacket, binaryType) => {
	if (typeof encodedPacket !== "string") return {
		type: "message",
		data: mapBinary(encodedPacket, binaryType)
	};
	const type = encodedPacket.charAt(0);
	if (type === "b") return {
		type: "message",
		data: mapBinary(Buffer.from(encodedPacket.substring(1), "base64"), binaryType)
	};
	if (!PACKET_TYPES_REVERSE[type]) return ERROR_PACKET;
	return encodedPacket.length > 1 ? {
		type: PACKET_TYPES_REVERSE[type],
		data: encodedPacket.substring(1)
	} : { type: PACKET_TYPES_REVERSE[type] };
};
var mapBinary = (data, binaryType) => {
	switch (binaryType) {
		case "arraybuffer": if (data instanceof ArrayBuffer) return data;
		else if (Buffer.isBuffer(data)) return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
		else return data.buffer;
		default: if (Buffer.isBuffer(data)) return data;
		else return Buffer.from(data);
	}
};
// node_modules/engine.io-parser/build/esm/index.js
var SEPARATOR = String.fromCharCode(30);
var encodePayload = (packets, callback) => {
	const length = packets.length;
	const encodedPackets = new Array(length);
	let count = 0;
	packets.forEach((packet, i) => {
		encodePacket(packet, false, (encodedPacket) => {
			encodedPackets[i] = encodedPacket;
			if (++count === length) callback(encodedPackets.join(SEPARATOR));
		});
	});
};
var decodePayload = (encodedPayload, binaryType) => {
	const encodedPackets = encodedPayload.split(SEPARATOR);
	const packets = [];
	for (let i = 0; i < encodedPackets.length; i++) {
		const decodedPacket = decodePacket(encodedPackets[i], binaryType);
		packets.push(decodedPacket);
		if (decodedPacket.type === "error") break;
	}
	return packets;
};
function createPacketEncoderStream() {
	return new TransformStream({ transform(packet, controller) {
		encodePacketToBinary(packet, (encodedPacket) => {
			const payloadLength = encodedPacket.length;
			let header;
			if (payloadLength < 126) {
				header = /* @__PURE__ */ new Uint8Array(1);
				new DataView(header.buffer).setUint8(0, payloadLength);
			} else if (payloadLength < 65536) {
				header = /* @__PURE__ */ new Uint8Array(3);
				const view = new DataView(header.buffer);
				view.setUint8(0, 126);
				view.setUint16(1, payloadLength);
			} else {
				header = /* @__PURE__ */ new Uint8Array(9);
				const view = new DataView(header.buffer);
				view.setUint8(0, 127);
				view.setBigUint64(1, BigInt(payloadLength));
			}
			if (packet.data && typeof packet.data !== "string") header[0] |= 128;
			controller.enqueue(header);
			controller.enqueue(encodedPacket);
		});
	} });
}
var TEXT_DECODER;
function totalLength(chunks) {
	return chunks.reduce((acc, chunk) => acc + chunk.length, 0);
}
function concatChunks(chunks, size) {
	if (chunks[0].length === size) return chunks.shift();
	const buffer = new Uint8Array(size);
	let j = 0;
	for (let i = 0; i < size; i++) {
		buffer[i] = chunks[0][j++];
		if (j === chunks[0].length) {
			chunks.shift();
			j = 0;
		}
	}
	if (chunks.length && j < chunks[0].length) chunks[0] = chunks[0].slice(j);
	return buffer;
}
function createPacketDecoderStream(maxPayload, binaryType) {
	if (!TEXT_DECODER) TEXT_DECODER = new TextDecoder();
	const chunks = [];
	let state = 0;
	let expectedLength = -1;
	let isBinary = false;
	return new TransformStream({ transform(chunk, controller) {
		chunks.push(chunk);
		while (true) {
			if (state === 0) {
				if (totalLength(chunks) < 1) break;
				const header = concatChunks(chunks, 1);
				isBinary = (header[0] & 128) === 128;
				expectedLength = header[0] & 127;
				if (expectedLength < 126) state = 3;
				else if (expectedLength === 126) state = 1;
				else state = 2;
			} else if (state === 1) {
				if (totalLength(chunks) < 2) break;
				const headerArray = concatChunks(chunks, 2);
				expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
				state = 3;
			} else if (state === 2) {
				if (totalLength(chunks) < 8) break;
				const headerArray = concatChunks(chunks, 8);
				const view = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length);
				const n = view.getUint32(0);
				if (n > Math.pow(2, 21) - 1) {
					controller.enqueue(ERROR_PACKET);
					break;
				}
				expectedLength = n * Math.pow(2, 32) + view.getUint32(4);
				state = 3;
			} else {
				if (totalLength(chunks) < expectedLength) break;
				const data = concatChunks(chunks, expectedLength);
				controller.enqueue(decodePacket(isBinary ? data : TEXT_DECODER.decode(data), binaryType));
				state = 0;
			}
			if (expectedLength === 0 || expectedLength > maxPayload) {
				controller.enqueue(ERROR_PACKET);
				break;
			}
		}
	} });
}
// node_modules/@socket.io/component-emitter/lib/esm/index.js
/**
* Initialize a new `Emitter`.
*
* @api public
*/
function Emitter(obj) {
	if (obj) return mixin(obj);
}
/**
* Mixin the emitter properties.
*
* @param {Object} obj
* @return {Object}
* @api private
*/
function mixin(obj) {
	for (var key in Emitter.prototype) obj[key] = Emitter.prototype[key];
	return obj;
}
/**
* Listen on the given `event` with `fn`.
*
* @param {String} event
* @param {Function} fn
* @return {Emitter}
* @api public
*/
Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
	this._callbacks = this._callbacks || {};
	(this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
	return this;
};
/**
* Adds an `event` listener that will be invoked a single
* time then automatically removed.
*
* @param {String} event
* @param {Function} fn
* @return {Emitter}
* @api public
*/
Emitter.prototype.once = function(event, fn) {
	function on() {
		this.off(event, on);
		fn.apply(this, arguments);
	}
	on.fn = fn;
	this.on(event, on);
	return this;
};
/**
* Remove the given callback for `event` or all
* registered callbacks.
*
* @param {String} event
* @param {Function} fn
* @return {Emitter}
* @api public
*/
Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
	this._callbacks = this._callbacks || {};
	if (0 == arguments.length) {
		this._callbacks = {};
		return this;
	}
	var callbacks = this._callbacks["$" + event];
	if (!callbacks) return this;
	if (1 == arguments.length) {
		delete this._callbacks["$" + event];
		return this;
	}
	var cb;
	for (var i = 0; i < callbacks.length; i++) {
		cb = callbacks[i];
		if (cb === fn || cb.fn === fn) {
			callbacks.splice(i, 1);
			break;
		}
	}
	if (callbacks.length === 0) delete this._callbacks["$" + event];
	return this;
};
/**
* Emit `event` with the given args.
*
* @param {String} event
* @param {Mixed} ...
* @return {Emitter}
*/
Emitter.prototype.emit = function(event) {
	this._callbacks = this._callbacks || {};
	var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
	for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
	if (callbacks) {
		callbacks = callbacks.slice(0);
		for (var i = 0, len = callbacks.length; i < len; ++i) callbacks[i].apply(this, args);
	}
	return this;
};
Emitter.prototype.emitReserved = Emitter.prototype.emit;
/**
* Return array of callbacks for `event`.
*
* @param {String} event
* @return {Array}
* @api public
*/
Emitter.prototype.listeners = function(event) {
	this._callbacks = this._callbacks || {};
	return this._callbacks["$" + event] || [];
};
/**
* Check if this emitter has `event` handlers.
*
* @param {String} event
* @return {Boolean}
* @api public
*/
Emitter.prototype.hasListeners = function(event) {
	return !!this.listeners(event).length;
};
// node_modules/engine.io-client/build/esm-debug/globals.node.js
var nextTick = process.nextTick;
var globalThisShim = global;
var defaultBinaryType = "nodebuffer";
function createCookieJar() {
	return new CookieJar();
}
/**
* @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
*/
function parse$1(setCookieString) {
	const parts = setCookieString.split("; ");
	const i = parts[0].indexOf("=");
	if (i === -1) return;
	const name = parts[0].substring(0, i).trim();
	if (!name.length) return;
	let value = parts[0].substring(i + 1).trim();
	if (value.charCodeAt(0) === 34) value = value.slice(1, -1);
	const cookie = {
		name,
		value
	};
	for (let j = 1; j < parts.length; j++) {
		const subParts = parts[j].split("=");
		if (subParts.length !== 2) continue;
		const key = subParts[0].trim();
		const value = subParts[1].trim();
		switch (key) {
			case "Expires":
				cookie.expires = new Date(value);
				break;
			case "Max-Age":
				const expiration = /* @__PURE__ */ new Date();
				expiration.setUTCSeconds(expiration.getUTCSeconds() + parseInt(value, 10));
				cookie.expires = expiration;
		}
	}
	return cookie;
}
var CookieJar = class {
	constructor() {
		this._cookies = /* @__PURE__ */ new Map();
	}
	parseCookies(values) {
		if (!values) return;
		values.forEach((value) => {
			const parsed = parse$1(value);
			if (parsed) this._cookies.set(parsed.name, parsed);
		});
	}
	get cookies() {
		const now = Date.now();
		this._cookies.forEach((cookie, name) => {
			var _a;
			if (((_a = cookie.expires) === null || _a === void 0 ? void 0 : _a.getTime()) < now) this._cookies.delete(name);
		});
		return this._cookies.entries();
	}
	addCookies(xhr) {
		const cookies = [];
		for (const [name, cookie] of this.cookies) cookies.push(`${name}=${cookie.value}`);
		if (cookies.length) {
			xhr.setDisableHeaderCheck(true);
			xhr.setRequestHeader("cookie", cookies.join("; "));
		}
	}
	appendCookies(headers) {
		for (const [name, cookie] of this.cookies) headers.append("cookie", `${name}=${cookie.value}`);
	}
};
// node_modules/engine.io-client/build/esm-debug/util.js
function pick(obj, ...attr) {
	return attr.reduce((acc, k) => {
		if (obj.hasOwnProperty(k)) acc[k] = obj[k];
		return acc;
	}, {});
}
var NATIVE_SET_TIMEOUT = globalThisShim.setTimeout;
var NATIVE_CLEAR_TIMEOUT = globalThisShim.clearTimeout;
function installTimerFunctions(obj, opts) {
	if (opts.useNativeTimers) {
		obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim);
		obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim);
	} else {
		obj.setTimeoutFn = globalThisShim.setTimeout.bind(globalThisShim);
		obj.clearTimeoutFn = globalThisShim.clearTimeout.bind(globalThisShim);
	}
}
var BASE64_OVERHEAD = 1.33;
function byteLength(obj) {
	if (typeof obj === "string") return utf8Length(obj);
	return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
}
function utf8Length(str) {
	let c = 0, length = 0;
	for (let i = 0, l = str.length; i < l; i++) {
		c = str.charCodeAt(i);
		if (c < 128) length += 1;
		else if (c < 2048) length += 2;
		else if (c < 55296 || c >= 57344) length += 3;
		else {
			i++;
			length += 4;
		}
	}
	return length;
}
/**
* Generates a random 8-characters string.
*/
function randomString() {
	return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
// node_modules/engine.io-client/build/esm-debug/contrib/parseqs.js
/**
* Compiles a querystring
* Returns string representation of the object
*
* @param {Object}
* @api private
*/
function encode(obj) {
	let str = "";
	for (let i in obj) if (obj.hasOwnProperty(i)) {
		if (str.length) str += "&";
		str += encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]);
	}
	return str;
}
/**
* Parses a simple querystring into an object
*
* @param {String} qs
* @api private
*/
function decode(qs) {
	let qry = {};
	let pairs = qs.split("&");
	for (let i = 0, l = pairs.length; i < l; i++) {
		let pair = pairs[i].split("=");
		qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	}
	return qry;
}
// node_modules/engine.io-client/build/esm-debug/transport.js
var import_src = /* @__PURE__ */ __toESM(require_src$1());
var debug$10 = (0, import_src.default)("engine.io-client:transport");
var TransportError = class extends Error {
	constructor(reason, description, context) {
		super(reason);
		this.description = description;
		this.context = context;
		this.type = "TransportError";
	}
};
var Transport = class extends Emitter {
	/**
	* Transport abstract constructor.
	*
	* @param {Object} opts - options
	* @protected
	*/
	constructor(opts) {
		super();
		this.writable = false;
		installTimerFunctions(this, opts);
		this.opts = opts;
		this.query = opts.query;
		this.socket = opts.socket;
		this.supportsBinary = !opts.forceBase64;
	}
	/**
	* Emits an error.
	*
	* @param {String} reason
	* @param description
	* @param context - the error context
	* @return {Transport} for chaining
	* @protected
	*/
	onError(reason, description, context) {
		super.emitReserved("error", new TransportError(reason, description, context));
		return this;
	}
	/**
	* Opens the transport.
	*/
	open() {
		this.readyState = "opening";
		this.doOpen();
		return this;
	}
	/**
	* Closes the transport.
	*/
	close() {
		if (this.readyState === "opening" || this.readyState === "open") {
			this.doClose();
			this.onClose();
		}
		return this;
	}
	/**
	* Sends multiple packets.
	*
	* @param {Array} packets
	*/
	send(packets) {
		if (this.readyState === "open") this.write(packets);
		else debug$10("transport is not open, discarding packets");
	}
	/**
	* Called upon open
	*
	* @protected
	*/
	onOpen() {
		this.readyState = "open";
		this.writable = true;
		super.emitReserved("open");
	}
	/**
	* Called with data.
	*
	* @param {String} data
	* @protected
	*/
	onData(data) {
		const packet = decodePacket(data, this.socket.binaryType);
		this.onPacket(packet);
	}
	/**
	* Called with a decoded packet.
	*
	* @protected
	*/
	onPacket(packet) {
		super.emitReserved("packet", packet);
	}
	/**
	* Called upon close.
	*
	* @protected
	*/
	onClose(details) {
		this.readyState = "closed";
		super.emitReserved("close", details);
	}
	/**
	* Pauses the transport, in order not to lose packets during an upgrade.
	*
	* @param onPause
	*/
	pause(onPause) {}
	createUri(schema, query = {}) {
		return schema + "://" + this._hostname() + this._port() + this.opts.path + this._query(query);
	}
	_hostname() {
		const hostname = this.opts.hostname;
		return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
	}
	_port() {
		if (this.opts.port && (this.opts.secure && Number(this.opts.port) !== 443 || !this.opts.secure && Number(this.opts.port) !== 80)) return ":" + this.opts.port;
		else return "";
	}
	_query(query) {
		const encodedQuery = encode(query);
		return encodedQuery.length ? "?" + encodedQuery : "";
	}
};
// node_modules/engine.io-client/build/esm-debug/transports/polling.js
var debug$9 = (0, import_src.default)("engine.io-client:polling");
var Polling = class extends Transport {
	constructor() {
		super(...arguments);
		this._polling = false;
	}
	get name() {
		return "polling";
	}
	/**
	* Opens the socket (triggers polling). We write a PING message to determine
	* when the transport is open.
	*
	* @protected
	*/
	doOpen() {
		this._poll();
	}
	/**
	* Pauses polling.
	*
	* @param {Function} onPause - callback upon buffers are flushed and transport is paused
	* @package
	*/
	pause(onPause) {
		this.readyState = "pausing";
		const pause = () => {
			debug$9("paused");
			this.readyState = "paused";
			onPause();
		};
		if (this._polling || !this.writable) {
			let total = 0;
			if (this._polling) {
				debug$9("we are currently polling - waiting to pause");
				total++;
				this.once("pollComplete", function() {
					debug$9("pre-pause polling complete");
					--total || pause();
				});
			}
			if (!this.writable) {
				debug$9("we are currently writing - waiting to pause");
				total++;
				this.once("drain", function() {
					debug$9("pre-pause writing complete");
					--total || pause();
				});
			}
		} else pause();
	}
	/**
	* Starts polling cycle.
	*
	* @private
	*/
	_poll() {
		debug$9("polling");
		this._polling = true;
		this.doPoll();
		this.emitReserved("poll");
	}
	/**
	* Overloads onData to detect payloads.
	*
	* @protected
	*/
	onData(data) {
		debug$9("polling got data %s", data);
		const callback = (packet) => {
			if ("opening" === this.readyState && packet.type === "open") this.onOpen();
			if ("close" === packet.type) {
				this.onClose({ description: "transport closed by the server" });
				return false;
			}
			this.onPacket(packet);
		};
		decodePayload(data, this.socket.binaryType).forEach(callback);
		if ("closed" !== this.readyState) {
			this._polling = false;
			this.emitReserved("pollComplete");
			if ("open" === this.readyState) this._poll();
			else debug$9("ignoring poll - transport state \"%s\"", this.readyState);
		}
	}
	/**
	* For polling, send a close packet.
	*
	* @protected
	*/
	doClose() {
		const close = () => {
			debug$9("writing close packet");
			this.write([{ type: "close" }]);
		};
		if ("open" === this.readyState) {
			debug$9("transport open - closing");
			close();
		} else {
			debug$9("transport not open - deferring close");
			this.once("open", close);
		}
	}
	/**
	* Writes a packets payload.
	*
	* @param {Array} packets - data packets
	* @protected
	*/
	write(packets) {
		this.writable = false;
		encodePayload(packets, (data) => {
			this.doWrite(data, () => {
				this.writable = true;
				this.emitReserved("drain");
			});
		});
	}
	/**
	* Generates uri for connection.
	*
	* @private
	*/
	uri() {
		const schema = this.opts.secure ? "https" : "http";
		const query = this.query || {};
		if (false !== this.opts.timestampRequests) query[this.opts.timestampParam] = randomString();
		if (!this.supportsBinary && !query.sid) query.b64 = 1;
		return this.createUri(schema, query);
	}
};
// node_modules/engine.io-client/build/esm-debug/contrib/has-cors.js
var value = false;
try {
	value = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
} catch (err) {}
var hasCORS = value;
// node_modules/engine.io-client/build/esm-debug/transports/polling-xhr.js
var debug$8 = (0, import_src.default)("engine.io-client:polling");
function empty() {}
var BaseXHR = class extends Polling {
	/**
	* XHR Polling constructor.
	*
	* @param {Object} opts
	* @package
	*/
	constructor(opts) {
		super(opts);
		if (typeof location !== "undefined") {
			const isSSL = "https:" === location.protocol;
			let port = location.port;
			if (!port) port = isSSL ? "443" : "80";
			this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
		}
	}
	/**
	* Sends data.
	*
	* @param {String} data - data to send.
	* @param {Function} fn - called upon flush.
	* @private
	*/
	doWrite(data, fn) {
		const req = this.request({
			method: "POST",
			data
		});
		req.on("success", fn);
		req.on("error", (xhrStatus, context) => {
			this.onError("xhr post error", xhrStatus, context);
		});
	}
	/**
	* Starts a poll cycle.
	*
	* @private
	*/
	doPoll() {
		debug$8("xhr poll");
		const req = this.request();
		req.on("data", this.onData.bind(this));
		req.on("error", (xhrStatus, context) => {
			this.onError("xhr poll error", xhrStatus, context);
		});
		this.pollXhr = req;
	}
};
var Request = class Request extends Emitter {
	/**
	* Request constructor
	*
	* @param {Object} options
	* @package
	*/
	constructor(createRequest, uri, opts) {
		super();
		this.createRequest = createRequest;
		installTimerFunctions(this, opts);
		this._opts = opts;
		this._method = opts.method || "GET";
		this._uri = uri;
		this._data = void 0 !== opts.data ? opts.data : null;
		this._create();
	}
	/**
	* Creates the XHR object and sends the request.
	*
	* @private
	*/
	_create() {
		var _a;
		const opts = pick(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
		opts.xdomain = !!this._opts.xd;
		const xhr = this._xhr = this.createRequest(opts);
		try {
			debug$8("xhr open %s: %s", this._method, this._uri);
			xhr.open(this._method, this._uri, true);
			try {
				if (this._opts.extraHeaders) {
					xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
					for (let i in this._opts.extraHeaders) if (this._opts.extraHeaders.hasOwnProperty(i)) xhr.setRequestHeader(i, this._opts.extraHeaders[i]);
				}
			} catch (e) {}
			if ("POST" === this._method) try {
				xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
			} catch (e) {}
			try {
				xhr.setRequestHeader("Accept", "*/*");
			} catch (e) {}
			(_a = this._opts.cookieJar) === null || _a === void 0 || _a.addCookies(xhr);
			if ("withCredentials" in xhr) xhr.withCredentials = this._opts.withCredentials;
			if (this._opts.requestTimeout) xhr.timeout = this._opts.requestTimeout;
			xhr.onreadystatechange = () => {
				var _a;
				if (xhr.readyState === 3) (_a = this._opts.cookieJar) === null || _a === void 0 || _a.parseCookies(xhr.getResponseHeader("set-cookie"));
				if (4 !== xhr.readyState) return;
				if (200 === xhr.status || 1223 === xhr.status) this._onLoad();
				else this.setTimeoutFn(() => {
					this._onError(typeof xhr.status === "number" ? xhr.status : 0);
				}, 0);
			};
			debug$8("xhr data %s", this._data);
			xhr.send(this._data);
		} catch (e) {
			this.setTimeoutFn(() => {
				this._onError(e);
			}, 0);
			return;
		}
		if (typeof document !== "undefined") {
			this._index = Request.requestsCount++;
			Request.requests[this._index] = this;
		}
	}
	/**
	* Called upon error.
	*
	* @private
	*/
	_onError(err) {
		this.emitReserved("error", err, this._xhr);
		this._cleanup(true);
	}
	/**
	* Cleans up house.
	*
	* @private
	*/
	_cleanup(fromError) {
		if ("undefined" === typeof this._xhr || null === this._xhr) return;
		this._xhr.onreadystatechange = empty;
		if (fromError) try {
			this._xhr.abort();
		} catch (e) {}
		if (typeof document !== "undefined") delete Request.requests[this._index];
		this._xhr = null;
	}
	/**
	* Called upon load.
	*
	* @private
	*/
	_onLoad() {
		const data = this._xhr.responseText;
		if (data !== null) {
			this.emitReserved("data", data);
			this.emitReserved("success");
			this._cleanup();
		}
	}
	/**
	* Aborts the request.
	*
	* @package
	*/
	abort() {
		this._cleanup();
	}
};
Request.requestsCount = 0;
Request.requests = {};
/**
* Aborts pending requests when unloading the window. This is needed to prevent
* memory leaks (e.g. when using IE) and to ensure that no spurious error is
* emitted.
*/
if (typeof document !== "undefined") {
	if (typeof attachEvent === "function") attachEvent("onunload", unloadHandler);
	else if (typeof addEventListener === "function") {
		const terminationEvent = "onpagehide" in globalThisShim ? "pagehide" : "unload";
		addEventListener(terminationEvent, unloadHandler, false);
	}
}
function unloadHandler() {
	for (let i in Request.requests) if (Request.requests.hasOwnProperty(i)) Request.requests[i].abort();
}
(function() {
	const xhr = newRequest({ xdomain: false });
	return xhr && xhr.responseType !== null;
})();
function newRequest(opts) {
	const xdomain = opts.xdomain;
	try {
		if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) return new XMLHttpRequest();
	} catch (e) {}
	if (!xdomain) try {
		return new globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
	} catch (e) {}
}
// node_modules/engine.io-client/build/esm-debug/transports/polling-xhr.node.js
var XMLHttpRequest$1 = import_XMLHttpRequest.default || import_XMLHttpRequest;
/**
* HTTP long-polling based on the `XMLHttpRequest` object provided by the `xmlhttprequest-ssl` package.
*
* Usage: Node.js, Deno (compat), Bun (compat)
*
* @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
*/
var XHR = class extends BaseXHR {
	request(opts = {}) {
		var _a;
		Object.assign(opts, {
			xd: this.xd,
			cookieJar: (_a = this.socket) === null || _a === void 0 ? void 0 : _a._cookieJar
		}, this.opts);
		return new Request((opts) => new XMLHttpRequest$1(opts), this.uri(), opts);
	}
};
// node_modules/engine.io-client/build/esm-debug/transports/websocket.js
init_wrapper();
var debug$7 = (0, import_src.default)("engine.io-client:websocket");
var isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
var BaseWS = class extends Transport {
	get name() {
		return "websocket";
	}
	doOpen() {
		const uri = this.uri();
		const protocols = this.opts.protocols;
		const opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
		if (this.opts.extraHeaders) opts.headers = this.opts.extraHeaders;
		try {
			this.ws = this.createSocket(uri, protocols, opts);
		} catch (err) {
			return this.emitReserved("error", err);
		}
		this.ws.binaryType = this.socket.binaryType;
		this.addEventListeners();
	}
	/**
	* Adds event listeners to the socket
	*
	* @private
	*/
	addEventListeners() {
		this.ws.onopen = () => {
			if (this.opts.autoUnref) this.ws._socket.unref();
			this.onOpen();
		};
		this.ws.onclose = (closeEvent) => this.onClose({
			description: "websocket connection closed",
			context: closeEvent
		});
		this.ws.onmessage = (ev) => this.onData(ev.data);
		this.ws.onerror = (e) => this.onError("websocket error", e);
	}
	write(packets) {
		this.writable = false;
		for (let i = 0; i < packets.length; i++) {
			const packet = packets[i];
			const lastPacket = i === packets.length - 1;
			encodePacket(packet, this.supportsBinary, (data) => {
				try {
					this.doWrite(packet, data);
				} catch (e) {
					debug$7("websocket closed before onclose event");
				}
				if (lastPacket) nextTick(() => {
					this.writable = true;
					this.emitReserved("drain");
				}, this.setTimeoutFn);
			});
		}
	}
	doClose() {
		if (typeof this.ws !== "undefined") {
			this.ws.onerror = () => {};
			this.ws.close();
			this.ws = null;
		}
	}
	/**
	* Generates uri for connection.
	*
	* @private
	*/
	uri() {
		const schema = this.opts.secure ? "wss" : "ws";
		const query = this.query || {};
		if (this.opts.timestampRequests) query[this.opts.timestampParam] = randomString();
		if (!this.supportsBinary) query.b64 = 1;
		return this.createUri(schema, query);
	}
};
globalThisShim.WebSocket || globalThisShim.MozWebSocket;
// node_modules/engine.io-client/build/esm-debug/transports/websocket.node.js
/**
* WebSocket transport based on the `WebSocket` object provided by the `ws` package.
*
* Usage: Node.js, Deno (compat), Bun (compat)
*
* @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
* @see https://caniuse.com/mdn-api_websocket
*/
var WS = class extends BaseWS {
	createSocket(uri, protocols, opts) {
		var _a;
		if ((_a = this.socket) === null || _a === void 0 ? void 0 : _a._cookieJar) {
			opts.headers = opts.headers || {};
			opts.headers.cookie = typeof opts.headers.cookie === "string" ? [opts.headers.cookie] : opts.headers.cookie || [];
			for (const [name, cookie] of this.socket._cookieJar.cookies) opts.headers.cookie.push(`${name}=${cookie.value}`);
		}
		return new import_websocket.default(uri, protocols, opts);
	}
	doWrite(packet, data) {
		const opts = {};
		if (packet.options) opts.compress = packet.options.compress;
		if (this.opts.perMessageDeflate) {
			if (("string" === typeof data ? Buffer.byteLength(data) : data.length) < this.opts.perMessageDeflate.threshold) opts.compress = false;
		}
		this.ws.send(data, opts);
	}
};
// node_modules/engine.io-client/build/esm-debug/transports/webtransport.js
var debug$6 = (0, import_src.default)("engine.io-client:webtransport");
/**
* WebTransport transport based on the built-in `WebTransport` object.
*
* Usage: browser, Node.js (with the `@fails-components/webtransport` package)
*
* @see https://developer.mozilla.org/en-US/docs/Web/API/WebTransport
* @see https://caniuse.com/webtransport
*/
var WT = class extends Transport {
	get name() {
		return "webtransport";
	}
	doOpen() {
		try {
			this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
		} catch (err) {
			return this.emitReserved("error", err);
		}
		this._transport.closed.then(() => {
			debug$6("transport closed gracefully");
			this.onClose();
		}).catch((err) => {
			debug$6("transport closed due to %s", err);
			this.onError("webtransport error", err);
		});
		this._transport.ready.then(() => {
			this._transport.createBidirectionalStream().then((stream) => {
				const decoderStream = createPacketDecoderStream(Number.MAX_SAFE_INTEGER, this.socket.binaryType);
				const reader = stream.readable.pipeThrough(decoderStream).getReader();
				const encoderStream = createPacketEncoderStream();
				encoderStream.readable.pipeTo(stream.writable);
				this._writer = encoderStream.writable.getWriter();
				const read = () => {
					reader.read().then(({ done, value }) => {
						if (done) {
							debug$6("session is closed");
							return;
						}
						debug$6("received chunk: %o", value);
						this.onPacket(value);
						read();
					}).catch((err) => {
						debug$6("an error occurred while reading: %s", err);
					});
				};
				read();
				const packet = { type: "open" };
				if (this.query.sid) packet.data = `{"sid":"${this.query.sid}"}`;
				this._writer.write(packet).then(() => this.onOpen());
			});
		});
	}
	write(packets) {
		this.writable = false;
		for (let i = 0; i < packets.length; i++) {
			const packet = packets[i];
			const lastPacket = i === packets.length - 1;
			this._writer.write(packet).then(() => {
				if (lastPacket) nextTick(() => {
					this.writable = true;
					this.emitReserved("drain");
				}, this.setTimeoutFn);
			});
		}
	}
	doClose() {
		var _a;
		(_a = this._transport) === null || _a === void 0 || _a.close();
	}
};
// node_modules/engine.io-client/build/esm-debug/transports/index.js
var transports = {
	websocket: WS,
	webtransport: WT,
	polling: XHR
};
// node_modules/engine.io-client/build/esm-debug/contrib/parseuri.js
/**
* Parses a URI
*
* Note: we could also have used the built-in URL object, but it isn't supported on all platforms.
*
* See:
* - https://developer.mozilla.org/en-US/docs/Web/API/URL
* - https://caniuse.com/url
* - https://www.rfc-editor.org/rfc/rfc3986#appendix-B
*
* History of the parse() method:
* - first commit: https://github.com/socketio/socket.io-client/commit/4ee1d5d94b3906a9c052b459f1a818b15f38f91c
* - export into its own module: https://github.com/socketio/engine.io-client/commit/de2c561e4564efeb78f1bdb1ba39ef81b2822cb3
* - reimport: https://github.com/socketio/engine.io-client/commit/df32277c3f6d622eec5ed09f493cae3f3391d242
*
* @author Steven Levithan <stevenlevithan.com> (MIT license)
* @api private
*/
var re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
var parts = [
	"source",
	"protocol",
	"authority",
	"userInfo",
	"user",
	"password",
	"host",
	"port",
	"relative",
	"path",
	"directory",
	"file",
	"query",
	"anchor"
];
function parse(str) {
	if (str.length > 8e3) throw "URI too long";
	const src = str, b = str.indexOf("["), e = str.indexOf("]");
	if (b != -1 && e != -1) str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length);
	let m = re.exec(str || ""), uri = {}, i = 14;
	while (i--) uri[parts[i]] = m[i] || "";
	if (b != -1 && e != -1) {
		uri.source = src;
		uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
		uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
		uri.ipv6uri = true;
	}
	uri.pathNames = pathNames(uri, uri["path"]);
	uri.queryKey = queryKey(uri, uri["query"]);
	return uri;
}
function pathNames(obj, path) {
	const names = path.replace(/\/{2,9}/g, "/").split("/");
	if (path.slice(0, 1) == "/" || path.length === 0) names.splice(0, 1);
	if (path.slice(-1) == "/") names.splice(names.length - 1, 1);
	return names;
}
function queryKey(uri, query) {
	const data = {};
	query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
		if ($1) data[$1] = $2;
	});
	return data;
}
// node_modules/engine.io-client/build/esm-debug/socket.js
var debug$5 = (0, import_src.default)("engine.io-client:socket");
var withEventListeners = typeof addEventListener === "function" && typeof removeEventListener === "function";
var OFFLINE_EVENT_LISTENERS = [];
if (withEventListeners) addEventListener("offline", () => {
	debug$5("closing %d connection(s) because the network was lost", OFFLINE_EVENT_LISTENERS.length);
	OFFLINE_EVENT_LISTENERS.forEach((listener) => listener());
}, false);
/**
* This class provides a WebSocket-like interface to connect to an Engine.IO server. The connection will be established
* with one of the available low-level transports, like HTTP long-polling, WebSocket or WebTransport.
*
* This class comes without upgrade mechanism, which means that it will keep the first low-level transport that
* successfully establishes the connection.
*
* In order to allow tree-shaking, there are no transports included, that's why the `transports` option is mandatory.
*
* @example
* import { SocketWithoutUpgrade, WebSocket } from "engine.io-client";
*
* const socket = new SocketWithoutUpgrade({
*   transports: [WebSocket]
* });
*
* socket.on("open", () => {
*   socket.send("hello");
* });
*
* @see SocketWithUpgrade
* @see Socket
*/
var SocketWithoutUpgrade = class SocketWithoutUpgrade extends Emitter {
	/**
	* Socket constructor.
	*
	* @param {String|Object} uri - uri or options
	* @param {Object} opts - options
	*/
	constructor(uri, opts) {
		super();
		this.binaryType = defaultBinaryType;
		this.writeBuffer = [];
		this._prevBufferLen = 0;
		this._pingInterval = -1;
		this._pingTimeout = -1;
		this._maxPayload = -1;
		/**
		* The expiration timestamp of the {@link _pingTimeoutTimer} object is tracked, in case the timer is throttled and the
		* callback is not fired on time. This can happen for example when a laptop is suspended or when a phone is locked.
		*/
		this._pingTimeoutTime = Infinity;
		if (uri && "object" === typeof uri) {
			opts = uri;
			uri = null;
		}
		if (uri) {
			const parsedUri = parse(uri);
			opts.hostname = parsedUri.host;
			opts.secure = parsedUri.protocol === "https" || parsedUri.protocol === "wss";
			opts.port = parsedUri.port;
			if (parsedUri.query) opts.query = parsedUri.query;
		} else if (opts.host) opts.hostname = parse(opts.host).host;
		installTimerFunctions(this, opts);
		this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
		if (opts.hostname && !opts.port) opts.port = this.secure ? "443" : "80";
		this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
		this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
		this.transports = [];
		this._transportsByName = {};
		opts.transports.forEach((t) => {
			const transportName = t.prototype.name;
			this.transports.push(transportName);
			this._transportsByName[transportName] = t;
		});
		this.opts = Object.assign({
			path: "/engine.io",
			agent: false,
			withCredentials: false,
			upgrade: true,
			timestampParam: "t",
			rememberUpgrade: false,
			addTrailingSlash: true,
			rejectUnauthorized: true,
			perMessageDeflate: { threshold: 1024 },
			transportOptions: {},
			closeOnBeforeunload: false
		}, opts);
		this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : "");
		if (typeof this.opts.query === "string") this.opts.query = decode(this.opts.query);
		if (withEventListeners) {
			if (this.opts.closeOnBeforeunload) {
				this._beforeunloadEventListener = () => {
					if (this.transport) {
						this.transport.removeAllListeners();
						this.transport.close();
					}
				};
				addEventListener("beforeunload", this._beforeunloadEventListener, false);
			}
			if (this.hostname !== "localhost") {
				debug$5("adding listener for the 'offline' event");
				this._offlineEventListener = () => {
					this._onClose("transport close", { description: "network connection lost" });
				};
				OFFLINE_EVENT_LISTENERS.push(this._offlineEventListener);
			}
		}
		if (this.opts.withCredentials) this._cookieJar = createCookieJar();
		this._open();
	}
	/**
	* Creates transport of the given type.
	*
	* @param {String} name - transport name
	* @return {Transport}
	* @private
	*/
	createTransport(name) {
		debug$5("creating transport \"%s\"", name);
		const query = Object.assign({}, this.opts.query);
		query.EIO = 4;
		query.transport = name;
		if (this.id) query.sid = this.id;
		const opts = Object.assign({}, this.opts, {
			query,
			socket: this,
			hostname: this.hostname,
			secure: this.secure,
			port: this.port
		}, this.opts.transportOptions[name]);
		debug$5("options: %j", opts);
		return new this._transportsByName[name](opts);
	}
	/**
	* Initializes transport to use and starts probe.
	*
	* @private
	*/
	_open() {
		if (this.transports.length === 0) {
			this.setTimeoutFn(() => {
				this.emitReserved("error", "No transports available");
			}, 0);
			return;
		}
		const transportName = this.opts.rememberUpgrade && SocketWithoutUpgrade.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
		this.readyState = "opening";
		const transport = this.createTransport(transportName);
		transport.open();
		this.setTransport(transport);
	}
	/**
	* Sets the current transport. Disables the existing one (if any).
	*
	* @private
	*/
	setTransport(transport) {
		debug$5("setting transport %s", transport.name);
		if (this.transport) {
			debug$5("clearing existing transport %s", this.transport.name);
			this.transport.removeAllListeners();
		}
		this.transport = transport;
		transport.on("drain", this._onDrain.bind(this)).on("packet", this._onPacket.bind(this)).on("error", this._onError.bind(this)).on("close", (reason) => this._onClose("transport close", reason));
	}
	/**
	* Called when connection is deemed open.
	*
	* @private
	*/
	onOpen() {
		debug$5("socket open");
		this.readyState = "open";
		SocketWithoutUpgrade.priorWebsocketSuccess = "websocket" === this.transport.name;
		this.emitReserved("open");
		this.flush();
	}
	/**
	* Handles a packet.
	*
	* @private
	*/
	_onPacket(packet) {
		if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
			debug$5("socket receive: type \"%s\", data \"%s\"", packet.type, packet.data);
			this.emitReserved("packet", packet);
			this.emitReserved("heartbeat");
			switch (packet.type) {
				case "open":
					this.onHandshake(JSON.parse(packet.data));
					break;
				case "ping":
					this._sendPacket("pong");
					this.emitReserved("ping");
					this.emitReserved("pong");
					this._resetPingTimeout();
					break;
				case "error":
					const err = /* @__PURE__ */ new Error("server error");
					err.code = packet.data;
					this._onError(err);
					break;
				case "message":
					this.emitReserved("data", packet.data);
					this.emitReserved("message", packet.data);
			}
		} else debug$5("packet received with socket readyState \"%s\"", this.readyState);
	}
	/**
	* Called upon handshake completion.
	*
	* @param {Object} data - handshake obj
	* @private
	*/
	onHandshake(data) {
		this.emitReserved("handshake", data);
		this.id = data.sid;
		this.transport.query.sid = data.sid;
		this._pingInterval = data.pingInterval;
		this._pingTimeout = data.pingTimeout;
		this._maxPayload = data.maxPayload;
		this.onOpen();
		if ("closed" === this.readyState) return;
		this._resetPingTimeout();
	}
	/**
	* Sets and resets ping timeout timer based on server pings.
	*
	* @private
	*/
	_resetPingTimeout() {
		this.clearTimeoutFn(this._pingTimeoutTimer);
		const delay = this._pingInterval + this._pingTimeout;
		this._pingTimeoutTime = Date.now() + delay;
		this._pingTimeoutTimer = this.setTimeoutFn(() => {
			this._onClose("ping timeout");
		}, delay);
		if (this.opts.autoUnref) this._pingTimeoutTimer.unref();
	}
	/**
	* Called on `drain` event
	*
	* @private
	*/
	_onDrain() {
		this.writeBuffer.splice(0, this._prevBufferLen);
		this._prevBufferLen = 0;
		if (0 === this.writeBuffer.length) this.emitReserved("drain");
		else this.flush();
	}
	/**
	* Flush write buffers.
	*
	* @private
	*/
	flush() {
		if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
			const packets = this._getWritablePackets();
			debug$5("flushing %d packets in socket", packets.length);
			this.transport.send(packets);
			this._prevBufferLen = packets.length;
			this.emitReserved("flush");
		}
	}
	/**
	* Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
	* long-polling)
	*
	* @private
	*/
	_getWritablePackets() {
		if (!(this._maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1)) return this.writeBuffer;
		let payloadSize = 1;
		for (let i = 0; i < this.writeBuffer.length; i++) {
			const data = this.writeBuffer[i].data;
			if (data) payloadSize += byteLength(data);
			if (i > 0 && payloadSize > this._maxPayload) {
				debug$5("only send %d out of %d packets", i, this.writeBuffer.length);
				return this.writeBuffer.slice(0, i);
			}
			payloadSize += 2;
		}
		debug$5("payload size is %d (max: %d)", payloadSize, this._maxPayload);
		return this.writeBuffer;
	}
	/**
	* Checks whether the heartbeat timer has expired but the socket has not yet been notified.
	*
	* Note: this method is private for now because it does not really fit the WebSocket API, but if we put it in the
	* `write()` method then the message would not be buffered by the Socket.IO client.
	*
	* @return {boolean}
	* @private
	*/
	_hasPingExpired() {
		if (!this._pingTimeoutTime) return true;
		const hasExpired = Date.now() > this._pingTimeoutTime;
		if (hasExpired) {
			debug$5("throttled timer detected, scheduling connection close");
			this._pingTimeoutTime = 0;
			nextTick(() => {
				this._onClose("ping timeout");
			}, this.setTimeoutFn);
		}
		return hasExpired;
	}
	/**
	* Sends a message.
	*
	* @param {String} msg - message.
	* @param {Object} options.
	* @param {Function} fn - callback function.
	* @return {Socket} for chaining.
	*/
	write(msg, options, fn) {
		this._sendPacket("message", msg, options, fn);
		return this;
	}
	/**
	* Sends a message. Alias of {@link Socket#write}.
	*
	* @param {String} msg - message.
	* @param {Object} options.
	* @param {Function} fn - callback function.
	* @return {Socket} for chaining.
	*/
	send(msg, options, fn) {
		this._sendPacket("message", msg, options, fn);
		return this;
	}
	/**
	* Sends a packet.
	*
	* @param {String} type - packet type.
	* @param {String} data.
	* @param {Object} options.
	* @param {Function} fn - callback function.
	* @private
	*/
	_sendPacket(type, data, options, fn) {
		if ("function" === typeof data) {
			fn = data;
			data = void 0;
		}
		if ("function" === typeof options) {
			fn = options;
			options = null;
		}
		if ("closing" === this.readyState || "closed" === this.readyState) return;
		options = options || {};
		options.compress = false !== options.compress;
		const packet = {
			type,
			data,
			options
		};
		this.emitReserved("packetCreate", packet);
		this.writeBuffer.push(packet);
		if (fn) this.once("flush", fn);
		this.flush();
	}
	/**
	* Closes the connection.
	*/
	close() {
		const close = () => {
			this._onClose("forced close");
			debug$5("socket closing - telling transport to close");
			this.transport.close();
		};
		const cleanupAndClose = () => {
			this.off("upgrade", cleanupAndClose);
			this.off("upgradeError", cleanupAndClose);
			close();
		};
		const waitForUpgrade = () => {
			this.once("upgrade", cleanupAndClose);
			this.once("upgradeError", cleanupAndClose);
		};
		if ("opening" === this.readyState || "open" === this.readyState) {
			this.readyState = "closing";
			if (this.writeBuffer.length) this.once("drain", () => {
				if (this.upgrading) waitForUpgrade();
				else close();
			});
			else if (this.upgrading) waitForUpgrade();
			else close();
		}
		return this;
	}
	/**
	* Called upon transport error
	*
	* @private
	*/
	_onError(err) {
		debug$5("socket error %j", err);
		SocketWithoutUpgrade.priorWebsocketSuccess = false;
		if (this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening") {
			debug$5("trying next transport");
			this.transports.shift();
			return this._open();
		}
		this.emitReserved("error", err);
		this._onClose("transport error", err);
	}
	/**
	* Called upon transport close.
	*
	* @private
	*/
	_onClose(reason, description) {
		if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
			debug$5("socket close with reason: \"%s\"", reason);
			this.clearTimeoutFn(this._pingTimeoutTimer);
			this.transport.removeAllListeners("close");
			this.transport.close();
			this.transport.removeAllListeners();
			if (withEventListeners) {
				if (this._beforeunloadEventListener) removeEventListener("beforeunload", this._beforeunloadEventListener, false);
				if (this._offlineEventListener) {
					const i = OFFLINE_EVENT_LISTENERS.indexOf(this._offlineEventListener);
					if (i !== -1) {
						debug$5("removing listener for the 'offline' event");
						OFFLINE_EVENT_LISTENERS.splice(i, 1);
					}
				}
			}
			this.readyState = "closed";
			this.id = null;
			this.emitReserved("close", reason, description);
			this.writeBuffer = [];
			this._prevBufferLen = 0;
		}
	}
};
SocketWithoutUpgrade.protocol = 4;
/**
* This class provides a WebSocket-like interface to connect to an Engine.IO server. The connection will be established
* with one of the available low-level transports, like HTTP long-polling, WebSocket or WebTransport.
*
* This class comes with an upgrade mechanism, which means that once the connection is established with the first
* low-level transport, it will try to upgrade to a better transport.
*
* In order to allow tree-shaking, there are no transports included, that's why the `transports` option is mandatory.
*
* @example
* import { SocketWithUpgrade, WebSocket } from "engine.io-client";
*
* const socket = new SocketWithUpgrade({
*   transports: [WebSocket]
* });
*
* socket.on("open", () => {
*   socket.send("hello");
* });
*
* @see SocketWithoutUpgrade
* @see Socket
*/
var SocketWithUpgrade = class extends SocketWithoutUpgrade {
	constructor() {
		super(...arguments);
		this._upgrades = [];
	}
	onOpen() {
		super.onOpen();
		if ("open" === this.readyState && this.opts.upgrade) {
			debug$5("starting upgrade probes");
			for (let i = 0; i < this._upgrades.length; i++) this._probe(this._upgrades[i]);
		}
	}
	/**
	* Probes a transport.
	*
	* @param {String} name - transport name
	* @private
	*/
	_probe(name) {
		debug$5("probing transport \"%s\"", name);
		let transport = this.createTransport(name);
		let failed = false;
		SocketWithoutUpgrade.priorWebsocketSuccess = false;
		const onTransportOpen = () => {
			if (failed) return;
			debug$5("probe transport \"%s\" opened", name);
			transport.send([{
				type: "ping",
				data: "probe"
			}]);
			transport.once("packet", (msg) => {
				if (failed) return;
				if ("pong" === msg.type && "probe" === msg.data) {
					debug$5("probe transport \"%s\" pong", name);
					this.upgrading = true;
					this.emitReserved("upgrading", transport);
					if (!transport) return;
					SocketWithoutUpgrade.priorWebsocketSuccess = "websocket" === transport.name;
					debug$5("pausing current transport \"%s\"", this.transport.name);
					this.transport.pause(() => {
						if (failed) return;
						if ("closed" === this.readyState) return;
						debug$5("changing transport and sending upgrade packet");
						cleanup();
						this.setTransport(transport);
						transport.send([{ type: "upgrade" }]);
						this.emitReserved("upgrade", transport);
						transport = null;
						this.upgrading = false;
						this.flush();
					});
				} else {
					debug$5("probe transport \"%s\" failed", name);
					const err = /* @__PURE__ */ new Error("probe error");
					err.transport = transport.name;
					this.emitReserved("upgradeError", err);
				}
			});
		};
		function freezeTransport() {
			if (failed) return;
			failed = true;
			cleanup();
			transport.close();
			transport = null;
		}
		const onerror = (err) => {
			const error = /* @__PURE__ */ new Error("probe error: " + err);
			error.transport = transport.name;
			freezeTransport();
			debug$5("probe transport \"%s\" failed because of error: %s", name, err);
			this.emitReserved("upgradeError", error);
		};
		function onTransportClose() {
			onerror("transport closed");
		}
		function onclose() {
			onerror("socket closed");
		}
		function onupgrade(to) {
			if (transport && to.name !== transport.name) {
				debug$5("\"%s\" works - aborting \"%s\"", to.name, transport.name);
				freezeTransport();
			}
		}
		const cleanup = () => {
			transport.removeListener("open", onTransportOpen);
			transport.removeListener("error", onerror);
			transport.removeListener("close", onTransportClose);
			this.off("close", onclose);
			this.off("upgrading", onupgrade);
		};
		transport.once("open", onTransportOpen);
		transport.once("error", onerror);
		transport.once("close", onTransportClose);
		this.once("close", onclose);
		this.once("upgrading", onupgrade);
		if (this._upgrades.indexOf("webtransport") !== -1 && name !== "webtransport") this.setTimeoutFn(() => {
			if (!failed) transport.open();
		}, 200);
		else transport.open();
	}
	onHandshake(data) {
		this._upgrades = this._filterUpgrades(data.upgrades);
		super.onHandshake(data);
	}
	/**
	* Filters upgrades, returning only those matching client transports.
	*
	* @param {Array} upgrades - server upgrades
	* @private
	*/
	_filterUpgrades(upgrades) {
		const filteredUpgrades = [];
		for (let i = 0; i < upgrades.length; i++) if (~this.transports.indexOf(upgrades[i])) filteredUpgrades.push(upgrades[i]);
		return filteredUpgrades;
	}
};
/**
* This class provides a WebSocket-like interface to connect to an Engine.IO server. The connection will be established
* with one of the available low-level transports, like HTTP long-polling, WebSocket or WebTransport.
*
* This class comes with an upgrade mechanism, which means that once the connection is established with the first
* low-level transport, it will try to upgrade to a better transport.
*
* @example
* import { Socket } from "engine.io-client";
*
* const socket = new Socket();
*
* socket.on("open", () => {
*   socket.send("hello");
* });
*
* @see SocketWithoutUpgrade
* @see SocketWithUpgrade
*/
var Socket$1 = class extends SocketWithUpgrade {
	constructor(uri, opts = {}) {
		const isOptionsOnly = typeof uri === "object";
		const o = isOptionsOnly ? { ...uri } : { ...opts };
		if (!o.transports || o.transports && typeof o.transports[0] === "string") o.transports = (o.transports || [
			"polling",
			"websocket",
			"webtransport"
		]).map((transportName) => transports[transportName]).filter((t) => !!t);
		super(isOptionsOnly ? o : uri, o);
	}
};
Socket$1.protocol;
// node_modules/socket.io-client/build/esm-debug/url.js
var debug$4 = (0, import_src.default)("socket.io-client:url");
/**
* URL parser.
*
* @param uri - url
* @param path - the request path of the connection
* @param loc - An object meant to mimic window.location.
*        Defaults to window.location.
* @public
*/
function url$1(uri, path = "", loc) {
	let obj = uri;
	loc = loc || typeof location !== "undefined" && location;
	if (null == uri) uri = loc.protocol + "//" + loc.host;
	if (typeof uri === "string") {
		if ("/" === uri.charAt(0)) {
			if ("/" === uri.charAt(1)) uri = loc.protocol + uri;
			else uri = loc.host + uri;
		}
		if (!/^(https?|wss?):\/\//.test(uri)) {
			debug$4("protocol-less url %s", uri);
			if ("undefined" !== typeof loc) uri = loc.protocol + "//" + uri;
			else uri = "https://" + uri;
		}
		debug$4("parse %s", uri);
		obj = parse(uri);
	}
	if (!obj.port) {
		if (/^(http|ws)$/.test(obj.protocol)) obj.port = "80";
		else if (/^(http|ws)s$/.test(obj.protocol)) obj.port = "443";
	}
	obj.path = obj.path || "/";
	const host = obj.host.indexOf(":") !== -1 ? "[" + obj.host + "]" : obj.host;
	obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
	obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
	return obj;
}
// node_modules/socket.io-parser/build/esm-debug/is-binary.js
var withNativeArrayBuffer = typeof ArrayBuffer === "function";
var isView = (obj) => {
	return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
};
var toString = Object.prototype.toString;
var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
/**
* Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
*
* @private
*/
function isBinary(obj) {
	return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
}
function hasBinary(obj, toJSON) {
	if (!obj || typeof obj !== "object") return false;
	if (Array.isArray(obj)) {
		for (let i = 0, l = obj.length; i < l; i++) if (hasBinary(obj[i])) return true;
		return false;
	}
	if (isBinary(obj)) return true;
	if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) return hasBinary(obj.toJSON(), true);
	for (const key in obj) if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) return true;
	return false;
}
// node_modules/socket.io-parser/build/esm-debug/binary.js
/**
* Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
*
* @param {Object} packet - socket.io event packet
* @return {Object} with deconstructed packet and list of buffers
* @public
*/
function deconstructPacket(packet) {
	const buffers = [];
	const packetData = packet.data;
	const pack = packet;
	pack.data = _deconstructPacket(packetData, buffers);
	pack.attachments = buffers.length;
	return {
		packet: pack,
		buffers
	};
}
function _deconstructPacket(data, buffers, toJSON) {
	if (!data) return data;
	if (isBinary(data)) {
		const placeholder = {
			_placeholder: true,
			num: buffers.length
		};
		buffers.push(data);
		return placeholder;
	} else if (Array.isArray(data)) {
		const newData = new Array(data.length);
		for (let i = 0; i < data.length; i++) newData[i] = _deconstructPacket(data[i], buffers);
		return newData;
	} else if (typeof data === "object" && !(data instanceof Date)) {
		if (data.toJSON && typeof data.toJSON === "function" && !toJSON) return _deconstructPacket(data.toJSON(), buffers, true);
		const newData = {};
		for (const key in data) if (Object.prototype.hasOwnProperty.call(data, key)) newData[key] = _deconstructPacket(data[key], buffers);
		return newData;
	}
	return data;
}
/**
* Reconstructs a binary packet from its placeholder packet and buffers
*
* @param {Object} packet - event packet with placeholders
* @param {Array} buffers - binary buffers to put in placeholder positions
* @return {Object} reconstructed packet
* @public
*/
function reconstructPacket(packet, buffers) {
	packet.data = _reconstructPacket(packet.data, buffers);
	delete packet.attachments;
	return packet;
}
function _reconstructPacket(data, buffers) {
	if (!data) return data;
	if (data && data._placeholder === true) {
		if (typeof data.num === "number" && data.num >= 0 && data.num < buffers.length) return buffers[data.num];
		else throw new Error("illegal attachments");
	} else if (Array.isArray(data)) for (let i = 0; i < data.length; i++) data[i] = _reconstructPacket(data[i], buffers);
	else if (typeof data === "object") {
		for (const key in data) if (Object.prototype.hasOwnProperty.call(data, key)) data[key] = _reconstructPacket(data[key], buffers);
	}
	return data;
}
// node_modules/socket.io-parser/build/esm-debug/index.js
var esm_debug_exports = /* @__PURE__ */ __exportAll({
	Decoder: () => Decoder,
	Encoder: () => Encoder,
	PacketType: () => PacketType,
	isPacketValid: () => isPacketValid,
	protocol: () => 5
});
var debug$3 = (0, import_src.default)("socket.io-parser");
/**
* These strings must not be used as event names, as they have a special meaning.
*/
var RESERVED_EVENTS$1 = [
	"connect",
	"connect_error",
	"disconnect",
	"disconnecting",
	"newListener",
	"removeListener"
];
var PacketType;
(function(PacketType) {
	PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
	PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
	PacketType[PacketType["EVENT"] = 2] = "EVENT";
	PacketType[PacketType["ACK"] = 3] = "ACK";
	PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
	PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
	PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (PacketType = {}));
/**
* A socket.io Encoder instance
*/
var Encoder = class {
	/**
	* Encoder constructor
	*
	* @param {function} replacer - custom replacer to pass down to JSON.parse
	*/
	constructor(replacer) {
		this.replacer = replacer;
	}
	/**
	* Encode a packet as a single string if non-binary, or as a
	* buffer sequence, depending on packet type.
	*
	* @param {Object} obj - packet object
	*/
	encode(obj) {
		debug$3("encoding packet %j", obj);
		if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
			if (hasBinary(obj)) return this.encodeAsBinary({
				type: obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
				nsp: obj.nsp,
				data: obj.data,
				id: obj.id
			});
		}
		return [this.encodeAsString(obj)];
	}
	/**
	* Encode packet as string.
	*/
	encodeAsString(obj) {
		let str = "" + obj.type;
		if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) str += obj.attachments + "-";
		if (obj.nsp && "/" !== obj.nsp) str += obj.nsp + ",";
		if (null != obj.id) str += obj.id;
		if (null != obj.data) str += JSON.stringify(obj.data, this.replacer);
		debug$3("encoded %j as %s", obj, str);
		return str;
	}
	/**
	* Encode packet as 'buffer sequence' by removing blobs, and
	* deconstructing packet into object with placeholders and
	* a list of buffers.
	*/
	encodeAsBinary(obj) {
		const deconstruction = deconstructPacket(obj);
		const pack = this.encodeAsString(deconstruction.packet);
		const buffers = deconstruction.buffers;
		buffers.unshift(pack);
		return buffers;
	}
};
/**
* A socket.io Decoder instance
*
* @return {Object} decoder
*/
var Decoder = class Decoder extends Emitter {
	/**
	* Decoder constructor
	*/
	constructor(opts) {
		super();
		this.opts = Object.assign({
			reviver: void 0,
			maxAttachments: 10
		}, typeof opts === "function" ? { reviver: opts } : opts);
	}
	/**
	* Decodes an encoded packet string into packet JSON.
	*
	* @param {String} obj - encoded packet
	*/
	add(obj) {
		let packet;
		if (typeof obj === "string") {
			if (this.reconstructor) throw new Error("got plaintext data when reconstructing a packet");
			packet = this.decodeString(obj);
			const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
			if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
				packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
				this.reconstructor = new BinaryReconstructor(packet);
			} else super.emitReserved("decoded", packet);
		} else if (isBinary(obj) || obj.base64) {
			if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
			else {
				packet = this.reconstructor.takeBinaryData(obj);
				if (packet) {
					this.reconstructor = null;
					super.emitReserved("decoded", packet);
				}
			}
		} else throw new Error("Unknown type: " + obj);
	}
	/**
	* Decode a packet String (JSON data)
	*
	* @param {String} str
	* @return {Object} packet
	*/
	decodeString(str) {
		let i = 0;
		const p = { type: Number(str.charAt(0)) };
		if (PacketType[p.type] === void 0) throw new Error("unknown packet type " + p.type);
		if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
			const start = i + 1;
			while (str.charAt(++i) !== "-" && i != str.length);
			const buf = str.substring(start, i);
			if (buf != Number(buf) || str.charAt(i) !== "-") throw new Error("Illegal attachments");
			const n = Number(buf);
			if (!isInteger(n) || n < 1) throw new Error("Illegal attachments");
			else if (n > this.opts.maxAttachments) throw new Error("too many attachments");
			p.attachments = n;
		}
		if ("/" === str.charAt(i + 1)) {
			const start = i + 1;
			while (++i) {
				if ("," === str.charAt(i)) break;
				if (i === str.length) break;
			}
			p.nsp = str.substring(start, i);
		} else p.nsp = "/";
		const next = str.charAt(i + 1);
		if ("" !== next && Number(next) == next) {
			const start = i + 1;
			while (++i) {
				const c = str.charAt(i);
				if (null == c || Number(c) != c) {
					--i;
					break;
				}
				if (i === str.length) break;
			}
			p.id = Number(str.substring(start, i + 1));
		}
		if (str.charAt(++i)) {
			const payload = this.tryParse(str.substr(i));
			if (Decoder.isPayloadValid(p.type, payload)) p.data = payload;
			else throw new Error("invalid payload");
		}
		debug$3("decoded %s as %j", str, p);
		return p;
	}
	tryParse(str) {
		try {
			return JSON.parse(str, this.opts.reviver);
		} catch (e) {
			return false;
		}
	}
	static isPayloadValid(type, payload) {
		switch (type) {
			case PacketType.CONNECT: return isObject(payload);
			case PacketType.DISCONNECT: return payload === void 0;
			case PacketType.CONNECT_ERROR: return typeof payload === "string" || isObject(payload);
			case PacketType.EVENT:
			case PacketType.BINARY_EVENT: return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS$1.indexOf(payload[0]) === -1);
			case PacketType.ACK:
			case PacketType.BINARY_ACK: return Array.isArray(payload);
		}
	}
	/**
	* Deallocates a parser's resources
	*/
	destroy() {
		if (this.reconstructor) {
			this.reconstructor.finishedReconstruction();
			this.reconstructor = null;
		}
	}
};
/**
* A manager of a binary event's 'buffer sequence'. Should
* be constructed whenever a packet of type BINARY_EVENT is
* decoded.
*
* @param {Object} packet
* @return {BinaryReconstructor} initialized reconstructor
*/
var BinaryReconstructor = class {
	constructor(packet) {
		this.packet = packet;
		this.buffers = [];
		this.reconPack = packet;
	}
	/**
	* Method to be called when binary data received from connection
	* after a BINARY_EVENT packet.
	*
	* @param {Buffer | ArrayBuffer} binData - the raw binary data received
	* @return {null | Object} returns null if more binary data is expected or
	*   a reconstructed packet object if all buffers have been received.
	*/
	takeBinaryData(binData) {
		this.buffers.push(binData);
		if (this.buffers.length === this.reconPack.attachments) {
			const packet = reconstructPacket(this.reconPack, this.buffers);
			this.finishedReconstruction();
			return packet;
		}
		return null;
	}
	/**
	* Cleans up binary packet reconstruction variables.
	*/
	finishedReconstruction() {
		this.reconPack = null;
		this.buffers = [];
	}
};
function isNamespaceValid(nsp) {
	return typeof nsp === "string";
}
var isInteger = Number.isInteger || function(value) {
	return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};
function isAckIdValid(id) {
	return id === void 0 || isInteger(id);
}
function isObject(value) {
	return Object.prototype.toString.call(value) === "[object Object]";
}
function isDataValid(type, payload) {
	switch (type) {
		case PacketType.CONNECT: return payload === void 0 || isObject(payload);
		case PacketType.DISCONNECT: return payload === void 0;
		case PacketType.EVENT: return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS$1.indexOf(payload[0]) === -1);
		case PacketType.ACK: return Array.isArray(payload);
		case PacketType.CONNECT_ERROR: return typeof payload === "string" || isObject(payload);
		default: return false;
	}
}
function isPacketValid(packet) {
	return isNamespaceValid(packet.nsp) && isAckIdValid(packet.id) && isDataValid(packet.type, packet.data);
}
// node_modules/socket.io-client/build/esm-debug/on.js
function on(obj, ev, fn) {
	obj.on(ev, fn);
	return function subDestroy() {
		obj.off(ev, fn);
	};
}
// node_modules/socket.io-client/build/esm-debug/socket.js
var debug$2 = (0, import_src.default)("socket.io-client:socket");
/**
* Internal events.
* These events can't be emitted by the user.
*/
var RESERVED_EVENTS = Object.freeze({
	connect: 1,
	connect_error: 1,
	disconnect: 1,
	disconnecting: 1,
	newListener: 1,
	removeListener: 1
});
/**
* A Socket is the fundamental class for interacting with the server.
*
* A Socket belongs to a certain Namespace (by default /) and uses an underlying {@link Manager} to communicate.
*
* @example
* const socket = io();
*
* socket.on("connect", () => {
*   console.log("connected");
* });
*
* // send an event to the server
* socket.emit("foo", "bar");
*
* socket.on("foobar", () => {
*   // an event was received from the server
* });
*
* // upon disconnection
* socket.on("disconnect", (reason) => {
*   console.log(`disconnected due to ${reason}`);
* });
*/
var Socket = class extends Emitter {
	/**
	* `Socket` constructor.
	*/
	constructor(io, nsp, opts) {
		super();
		/**
		* Whether the socket is currently connected to the server.
		*
		* @example
		* const socket = io();
		*
		* socket.on("connect", () => {
		*   console.log(socket.connected); // true
		* });
		*
		* socket.on("disconnect", () => {
		*   console.log(socket.connected); // false
		* });
		*/
		this.connected = false;
		/**
		* Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
		* be transmitted by the server.
		*/
		this.recovered = false;
		/**
		* Buffer for packets received before the CONNECT packet
		*/
		this.receiveBuffer = [];
		/**
		* Buffer for packets that will be sent once the socket is connected
		*/
		this.sendBuffer = [];
		/**
		* The queue of packets to be sent with retry in case of failure.
		*
		* Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
		* @private
		*/
		this._queue = [];
		/**
		* A sequence to generate the ID of the {@link QueuedPacket}.
		* @private
		*/
		this._queueSeq = 0;
		this.ids = 0;
		/**
		* A map containing acknowledgement handlers.
		*
		* The `withError` attribute is used to differentiate handlers that accept an error as first argument:
		*
		* - `socket.emit("test", (err, value) => { ... })` with `ackTimeout` option
		* - `socket.timeout(5000).emit("test", (err, value) => { ... })`
		* - `const value = await socket.emitWithAck("test")`
		*
		* From those that don't:
		*
		* - `socket.emit("test", (value) => { ... });`
		*
		* In the first case, the handlers will be called with an error when:
		*
		* - the timeout is reached
		* - the socket gets disconnected
		*
		* In the second case, the handlers will be simply discarded upon disconnection, since the client will never receive
		* an acknowledgement from the server.
		*
		* @private
		*/
		this.acks = {};
		this.flags = {};
		this.io = io;
		this.nsp = nsp;
		if (opts && opts.auth) this.auth = opts.auth;
		this._opts = Object.assign({}, opts);
		if (this.io._autoConnect) this.open();
	}
	/**
	* Whether the socket is currently disconnected
	*
	* @example
	* const socket = io();
	*
	* socket.on("connect", () => {
	*   console.log(socket.disconnected); // false
	* });
	*
	* socket.on("disconnect", () => {
	*   console.log(socket.disconnected); // true
	* });
	*/
	get disconnected() {
		return !this.connected;
	}
	/**
	* Subscribe to open, close and packet events
	*
	* @private
	*/
	subEvents() {
		if (this.subs) return;
		const io = this.io;
		this.subs = [
			on(io, "open", this.onopen.bind(this)),
			on(io, "packet", this.onpacket.bind(this)),
			on(io, "error", this.onerror.bind(this)),
			on(io, "close", this.onclose.bind(this))
		];
	}
	/**
	* Whether the Socket will try to reconnect when its Manager connects or reconnects.
	*
	* @example
	* const socket = io();
	*
	* console.log(socket.active); // true
	*
	* socket.on("disconnect", (reason) => {
	*   if (reason === "io server disconnect") {
	*     // the disconnection was initiated by the server, you need to manually reconnect
	*     console.log(socket.active); // false
	*   }
	*   // else the socket will automatically try to reconnect
	*   console.log(socket.active); // true
	* });
	*/
	get active() {
		return !!this.subs;
	}
	/**
	* "Opens" the socket.
	*
	* @example
	* const socket = io({
	*   autoConnect: false
	* });
	*
	* socket.connect();
	*/
	connect() {
		if (this.connected) return this;
		this.subEvents();
		if (!this.io["_reconnecting"]) this.io.open();
		if ("open" === this.io._readyState) this.onopen();
		return this;
	}
	/**
	* Alias for {@link connect()}.
	*/
	open() {
		return this.connect();
	}
	/**
	* Sends a `message` event.
	*
	* This method mimics the WebSocket.send() method.
	*
	* @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
	*
	* @example
	* socket.send("hello");
	*
	* // this is equivalent to
	* socket.emit("message", "hello");
	*
	* @return self
	*/
	send(...args) {
		args.unshift("message");
		this.emit.apply(this, args);
		return this;
	}
	/**
	* Override `emit`.
	* If the event is in `events`, it's emitted normally.
	*
	* @example
	* socket.emit("hello", "world");
	*
	* // all serializable datastructures are supported (no need to call JSON.stringify)
	* socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
	*
	* // with an acknowledgement from the server
	* socket.emit("hello", "world", (val) => {
	*   // ...
	* });
	*
	* @return self
	*/
	emit(ev, ...args) {
		var _a, _b, _c;
		if (RESERVED_EVENTS.hasOwnProperty(ev)) throw new Error("\"" + ev.toString() + "\" is a reserved event name");
		args.unshift(ev);
		if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
			this._addToQueue(args);
			return this;
		}
		const packet = {
			type: PacketType.EVENT,
			data: args
		};
		packet.options = {};
		packet.options.compress = this.flags.compress !== false;
		if ("function" === typeof args[args.length - 1]) {
			const id = this.ids++;
			debug$2("emitting packet with ack id %d", id);
			const ack = args.pop();
			this._registerAckCallback(id, ack);
			packet.id = id;
		}
		const isTransportWritable = (_b = (_a = this.io.engine) === null || _a === void 0 ? void 0 : _a.transport) === null || _b === void 0 ? void 0 : _b.writable;
		const isConnected = this.connected && !((_c = this.io.engine) === null || _c === void 0 ? void 0 : _c._hasPingExpired());
		if (this.flags.volatile && !isTransportWritable) debug$2("discard packet as the transport is not currently writable");
		else if (isConnected) {
			this.notifyOutgoingListeners(packet);
			this.packet(packet);
		} else this.sendBuffer.push(packet);
		this.flags = {};
		return this;
	}
	/**
	* @private
	*/
	_registerAckCallback(id, ack) {
		var _a;
		const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
		if (timeout === void 0) {
			this.acks[id] = ack;
			return;
		}
		const timer = this.io.setTimeoutFn(() => {
			delete this.acks[id];
			for (let i = 0; i < this.sendBuffer.length; i++) if (this.sendBuffer[i].id === id) {
				debug$2("removing packet with ack id %d from the buffer", id);
				this.sendBuffer.splice(i, 1);
			}
			debug$2("event with ack id %d has timed out after %d ms", id, timeout);
			ack.call(this, /* @__PURE__ */ new Error("operation has timed out"));
		}, timeout);
		const fn = (...args) => {
			this.io.clearTimeoutFn(timer);
			ack.apply(this, args);
		};
		fn.withError = true;
		this.acks[id] = fn;
	}
	/**
	* Emits an event and waits for an acknowledgement
	*
	* @example
	* // without timeout
	* const response = await socket.emitWithAck("hello", "world");
	*
	* // with a specific timeout
	* try {
	*   const response = await socket.timeout(1000).emitWithAck("hello", "world");
	* } catch (err) {
	*   // the server did not acknowledge the event in the given delay
	* }
	*
	* @return a Promise that will be fulfilled when the server acknowledges the event
	*/
	emitWithAck(ev, ...args) {
		return new Promise((resolve, reject) => {
			const fn = (arg1, arg2) => {
				return arg1 ? reject(arg1) : resolve(arg2);
			};
			fn.withError = true;
			args.push(fn);
			this.emit(ev, ...args);
		});
	}
	/**
	* Add the packet to the queue.
	* @param args
	* @private
	*/
	_addToQueue(args) {
		let ack;
		if (typeof args[args.length - 1] === "function") ack = args.pop();
		const packet = {
			id: this._queueSeq++,
			tryCount: 0,
			pending: false,
			args,
			flags: Object.assign({ fromQueue: true }, this.flags)
		};
		args.push((err, ...responseArgs) => {
			if (packet !== this._queue[0]) return debug$2("packet [%d] already acknowledged", packet.id);
			if (err !== null) {
				if (packet.tryCount > this._opts.retries) {
					debug$2("packet [%d] is discarded after %d tries", packet.id, packet.tryCount);
					this._queue.shift();
					if (ack) ack(err);
				}
			} else {
				debug$2("packet [%d] was successfully sent", packet.id);
				this._queue.shift();
				if (ack) ack(null, ...responseArgs);
			}
			packet.pending = false;
			return this._drainQueue();
		});
		this._queue.push(packet);
		this._drainQueue();
	}
	/**
	* Send the first packet of the queue, and wait for an acknowledgement from the server.
	* @param force - whether to resend a packet that has not been acknowledged yet
	*
	* @private
	*/
	_drainQueue(force = false) {
		debug$2("draining queue");
		if (!this.connected || this._queue.length === 0) return;
		const packet = this._queue[0];
		if (packet.pending && !force) {
			debug$2("packet [%d] has already been sent and is waiting for an ack", packet.id);
			return;
		}
		packet.pending = true;
		packet.tryCount++;
		debug$2("sending packet [%d] (try n°%d)", packet.id, packet.tryCount);
		this.flags = packet.flags;
		this.emit.apply(this, packet.args);
	}
	/**
	* Sends a packet.
	*
	* @param packet
	* @private
	*/
	packet(packet) {
		packet.nsp = this.nsp;
		this.io._packet(packet);
	}
	/**
	* Called upon engine `open`.
	*
	* @private
	*/
	onopen() {
		debug$2("transport is open - connecting");
		if (typeof this.auth == "function") this.auth((data) => {
			this._sendConnectPacket(data);
		});
		else this._sendConnectPacket(this.auth);
	}
	/**
	* Sends a CONNECT packet to initiate the Socket.IO session.
	*
	* @param data
	* @private
	*/
	_sendConnectPacket(data) {
		this.packet({
			type: PacketType.CONNECT,
			data: this._pid ? Object.assign({
				pid: this._pid,
				offset: this._lastOffset
			}, data) : data
		});
	}
	/**
	* Called upon engine or manager `error`.
	*
	* @param err
	* @private
	*/
	onerror(err) {
		if (!this.connected) this.emitReserved("connect_error", err);
	}
	/**
	* Called upon engine `close`.
	*
	* @param reason
	* @param description
	* @private
	*/
	onclose(reason, description) {
		debug$2("close (%s)", reason);
		this.connected = false;
		delete this.id;
		this.emitReserved("disconnect", reason, description);
		this._clearAcks();
	}
	/**
	* Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
	* the server.
	*
	* @private
	*/
	_clearAcks() {
		Object.keys(this.acks).forEach((id) => {
			if (!this.sendBuffer.some((packet) => String(packet.id) === id)) {
				const ack = this.acks[id];
				delete this.acks[id];
				if (ack.withError) ack.call(this, /* @__PURE__ */ new Error("socket has been disconnected"));
			}
		});
	}
	/**
	* Called with socket packet.
	*
	* @param packet
	* @private
	*/
	onpacket(packet) {
		if (!(packet.nsp === this.nsp)) return;
		switch (packet.type) {
			case PacketType.CONNECT:
				if (packet.data && packet.data.sid) this.onconnect(packet.data.sid, packet.data.pid);
				else this.emitReserved("connect_error", /* @__PURE__ */ new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
				break;
			case PacketType.EVENT:
			case PacketType.BINARY_EVENT:
				this.onevent(packet);
				break;
			case PacketType.ACK:
			case PacketType.BINARY_ACK:
				this.onack(packet);
				break;
			case PacketType.DISCONNECT:
				this.ondisconnect();
				break;
			case PacketType.CONNECT_ERROR:
				this.destroy();
				const err = new Error(packet.data.message);
				err.data = packet.data.data;
				this.emitReserved("connect_error", err);
		}
	}
	/**
	* Called upon a server event.
	*
	* @param packet
	* @private
	*/
	onevent(packet) {
		const args = packet.data || [];
		debug$2("emitting event %j", args);
		if (null != packet.id) {
			debug$2("attaching ack callback to event");
			args.push(this.ack(packet.id));
		}
		if (this.connected) this.emitEvent(args);
		else this.receiveBuffer.push(Object.freeze(args));
	}
	emitEvent(args) {
		if (this._anyListeners && this._anyListeners.length) {
			const listeners = this._anyListeners.slice();
			for (const listener of listeners) listener.apply(this, args);
		}
		super.emit.apply(this, args);
		if (this._pid && args.length && typeof args[args.length - 1] === "string") this._lastOffset = args[args.length - 1];
	}
	/**
	* Produces an ack callback to emit with an event.
	*
	* @private
	*/
	ack(id) {
		const self = this;
		let sent = false;
		return function(...args) {
			if (sent) return;
			sent = true;
			debug$2("sending ack %j", args);
			self.packet({
				type: PacketType.ACK,
				id,
				data: args
			});
		};
	}
	/**
	* Called upon a server acknowledgement.
	*
	* @param packet
	* @private
	*/
	onack(packet) {
		const ack = this.acks[packet.id];
		if (typeof ack !== "function") {
			debug$2("bad ack %s", packet.id);
			return;
		}
		delete this.acks[packet.id];
		debug$2("calling ack %s with %j", packet.id, packet.data);
		if (ack.withError) packet.data.unshift(null);
		ack.apply(this, packet.data);
	}
	/**
	* Called upon server connect.
	*
	* @private
	*/
	onconnect(id, pid) {
		debug$2("socket connected with id %s", id);
		this.id = id;
		this.recovered = pid && this._pid === pid;
		this._pid = pid;
		this.connected = true;
		this.emitBuffered();
		this._drainQueue(true);
		this.emitReserved("connect");
	}
	/**
	* Emit buffered events (received and emitted).
	*
	* @private
	*/
	emitBuffered() {
		this.receiveBuffer.forEach((args) => this.emitEvent(args));
		this.receiveBuffer = [];
		this.sendBuffer.forEach((packet) => {
			this.notifyOutgoingListeners(packet);
			this.packet(packet);
		});
		this.sendBuffer = [];
	}
	/**
	* Called upon server disconnect.
	*
	* @private
	*/
	ondisconnect() {
		debug$2("server disconnect (%s)", this.nsp);
		this.destroy();
		this.onclose("io server disconnect");
	}
	/**
	* Called upon forced client/server side disconnections,
	* this method ensures the manager stops tracking us and
	* that reconnections don't get triggered for this.
	*
	* @private
	*/
	destroy() {
		if (this.subs) {
			this.subs.forEach((subDestroy) => subDestroy());
			this.subs = void 0;
		}
		this.io["_destroy"](this);
	}
	/**
	* Disconnects the socket manually. In that case, the socket will not try to reconnect.
	*
	* If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
	*
	* @example
	* const socket = io();
	*
	* socket.on("disconnect", (reason) => {
	*   // console.log(reason); prints "io client disconnect"
	* });
	*
	* socket.disconnect();
	*
	* @return self
	*/
	disconnect() {
		if (this.connected) {
			debug$2("performing disconnect (%s)", this.nsp);
			this.packet({ type: PacketType.DISCONNECT });
		}
		this.destroy();
		if (this.connected) this.onclose("io client disconnect");
		return this;
	}
	/**
	* Alias for {@link disconnect()}.
	*
	* @return self
	*/
	close() {
		return this.disconnect();
	}
	/**
	* Sets the compress flag.
	*
	* @example
	* socket.compress(false).emit("hello");
	*
	* @param compress - if `true`, compresses the sending data
	* @return self
	*/
	compress(compress) {
		this.flags.compress = compress;
		return this;
	}
	/**
	* Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
	* ready to send messages.
	*
	* @example
	* socket.volatile.emit("hello"); // the server may or may not receive it
	*
	* @returns self
	*/
	get volatile() {
		this.flags.volatile = true;
		return this;
	}
	/**
	* Sets a modifier for a subsequent event emission that the callback will be called with an error when the
	* given number of milliseconds have elapsed without an acknowledgement from the server:
	*
	* @example
	* socket.timeout(5000).emit("my-event", (err) => {
	*   if (err) {
	*     // the server did not acknowledge the event in the given delay
	*   }
	* });
	*
	* @returns self
	*/
	timeout(timeout) {
		this.flags.timeout = timeout;
		return this;
	}
	/**
	* Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
	* callback.
	*
	* @example
	* socket.onAny((event, ...args) => {
	*   console.log(`got ${event}`);
	* });
	*
	* @param listener
	*/
	onAny(listener) {
		this._anyListeners = this._anyListeners || [];
		this._anyListeners.push(listener);
		return this;
	}
	/**
	* Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
	* callback. The listener is added to the beginning of the listeners array.
	*
	* @example
	* socket.prependAny((event, ...args) => {
	*   console.log(`got event ${event}`);
	* });
	*
	* @param listener
	*/
	prependAny(listener) {
		this._anyListeners = this._anyListeners || [];
		this._anyListeners.unshift(listener);
		return this;
	}
	/**
	* Removes the listener that will be fired when any event is emitted.
	*
	* @example
	* const catchAllListener = (event, ...args) => {
	*   console.log(`got event ${event}`);
	* }
	*
	* socket.onAny(catchAllListener);
	*
	* // remove a specific listener
	* socket.offAny(catchAllListener);
	*
	* // or remove all listeners
	* socket.offAny();
	*
	* @param listener
	*/
	offAny(listener) {
		if (!this._anyListeners) return this;
		if (listener) {
			const listeners = this._anyListeners;
			for (let i = 0; i < listeners.length; i++) if (listener === listeners[i]) {
				listeners.splice(i, 1);
				return this;
			}
		} else this._anyListeners = [];
		return this;
	}
	/**
	* Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
	* e.g. to remove listeners.
	*/
	listenersAny() {
		return this._anyListeners || [];
	}
	/**
	* Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
	* callback.
	*
	* Note: acknowledgements sent to the server are not included.
	*
	* @example
	* socket.onAnyOutgoing((event, ...args) => {
	*   console.log(`sent event ${event}`);
	* });
	*
	* @param listener
	*/
	onAnyOutgoing(listener) {
		this._anyOutgoingListeners = this._anyOutgoingListeners || [];
		this._anyOutgoingListeners.push(listener);
		return this;
	}
	/**
	* Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
	* callback. The listener is added to the beginning of the listeners array.
	*
	* Note: acknowledgements sent to the server are not included.
	*
	* @example
	* socket.prependAnyOutgoing((event, ...args) => {
	*   console.log(`sent event ${event}`);
	* });
	*
	* @param listener
	*/
	prependAnyOutgoing(listener) {
		this._anyOutgoingListeners = this._anyOutgoingListeners || [];
		this._anyOutgoingListeners.unshift(listener);
		return this;
	}
	/**
	* Removes the listener that will be fired when any event is emitted.
	*
	* @example
	* const catchAllListener = (event, ...args) => {
	*   console.log(`sent event ${event}`);
	* }
	*
	* socket.onAnyOutgoing(catchAllListener);
	*
	* // remove a specific listener
	* socket.offAnyOutgoing(catchAllListener);
	*
	* // or remove all listeners
	* socket.offAnyOutgoing();
	*
	* @param [listener] - the catch-all listener (optional)
	*/
	offAnyOutgoing(listener) {
		if (!this._anyOutgoingListeners) return this;
		if (listener) {
			const listeners = this._anyOutgoingListeners;
			for (let i = 0; i < listeners.length; i++) if (listener === listeners[i]) {
				listeners.splice(i, 1);
				return this;
			}
		} else this._anyOutgoingListeners = [];
		return this;
	}
	/**
	* Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
	* e.g. to remove listeners.
	*/
	listenersAnyOutgoing() {
		return this._anyOutgoingListeners || [];
	}
	/**
	* Notify the listeners for each packet sent
	*
	* @param packet
	*
	* @private
	*/
	notifyOutgoingListeners(packet) {
		if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
			const listeners = this._anyOutgoingListeners.slice();
			for (const listener of listeners) listener.apply(this, packet.data);
		}
	}
};
// node_modules/socket.io-client/build/esm-debug/contrib/backo2.js
/**
* Initialize backoff timer with `opts`.
*
* - `min` initial timeout in milliseconds [100]
* - `max` max timeout [10000]
* - `jitter` [0]
* - `factor` [2]
*
* @param {Object} opts
* @api public
*/
function Backoff(opts) {
	opts = opts || {};
	this.ms = opts.min || 100;
	this.max = opts.max || 1e4;
	this.factor = opts.factor || 2;
	this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
	this.attempts = 0;
}
/**
* Return the backoff duration.
*
* @return {Number}
* @api public
*/
Backoff.prototype.duration = function() {
	var ms = this.ms * Math.pow(this.factor, this.attempts++);
	if (this.jitter) {
		var rand = Math.random();
		var deviation = Math.floor(rand * this.jitter * ms);
		ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
	}
	return Math.min(ms, this.max) | 0;
};
/**
* Reset the number of attempts.
*
* @api public
*/
Backoff.prototype.reset = function() {
	this.attempts = 0;
};
/**
* Set the minimum duration
*
* @api public
*/
Backoff.prototype.setMin = function(min) {
	this.ms = min;
};
/**
* Set the maximum duration
*
* @api public
*/
Backoff.prototype.setMax = function(max) {
	this.max = max;
};
/**
* Set the jitter
*
* @api public
*/
Backoff.prototype.setJitter = function(jitter) {
	this.jitter = jitter;
};
// node_modules/socket.io-client/build/esm-debug/manager.js
var debug$1 = (0, import_src.default)("socket.io-client:manager");
var Manager = class extends Emitter {
	constructor(uri, opts) {
		var _a;
		super();
		this.nsps = {};
		this.subs = [];
		if (uri && "object" === typeof uri) {
			opts = uri;
			uri = void 0;
		}
		opts = opts || {};
		opts.path = opts.path || "/socket.io";
		this.opts = opts;
		installTimerFunctions(this, opts);
		this.reconnection(opts.reconnection !== false);
		this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
		this.reconnectionDelay(opts.reconnectionDelay || 1e3);
		this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
		this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : .5);
		this.backoff = new Backoff({
			min: this.reconnectionDelay(),
			max: this.reconnectionDelayMax(),
			jitter: this.randomizationFactor()
		});
		this.timeout(null == opts.timeout ? 2e4 : opts.timeout);
		this._readyState = "closed";
		this.uri = uri;
		const _parser = opts.parser || esm_debug_exports;
		this.encoder = new _parser.Encoder();
		this.decoder = new _parser.Decoder();
		this._autoConnect = opts.autoConnect !== false;
		if (this._autoConnect) this.open();
	}
	reconnection(v) {
		if (!arguments.length) return this._reconnection;
		this._reconnection = !!v;
		if (!v) this.skipReconnect = true;
		return this;
	}
	reconnectionAttempts(v) {
		if (v === void 0) return this._reconnectionAttempts;
		this._reconnectionAttempts = v;
		return this;
	}
	reconnectionDelay(v) {
		var _a;
		if (v === void 0) return this._reconnectionDelay;
		this._reconnectionDelay = v;
		(_a = this.backoff) === null || _a === void 0 || _a.setMin(v);
		return this;
	}
	randomizationFactor(v) {
		var _a;
		if (v === void 0) return this._randomizationFactor;
		this._randomizationFactor = v;
		(_a = this.backoff) === null || _a === void 0 || _a.setJitter(v);
		return this;
	}
	reconnectionDelayMax(v) {
		var _a;
		if (v === void 0) return this._reconnectionDelayMax;
		this._reconnectionDelayMax = v;
		(_a = this.backoff) === null || _a === void 0 || _a.setMax(v);
		return this;
	}
	timeout(v) {
		if (!arguments.length) return this._timeout;
		this._timeout = v;
		return this;
	}
	/**
	* Starts trying to reconnect if reconnection is enabled and we have not
	* started reconnecting yet
	*
	* @private
	*/
	maybeReconnectOnOpen() {
		if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) this.reconnect();
	}
	/**
	* Sets the current transport `socket`.
	*
	* @param {Function} fn - optional, callback
	* @return self
	* @public
	*/
	open(fn) {
		debug$1("readyState %s", this._readyState);
		if (~this._readyState.indexOf("open")) return this;
		debug$1("opening %s", this.uri);
		this.engine = new Socket$1(this.uri, this.opts);
		const socket = this.engine;
		const self = this;
		this._readyState = "opening";
		this.skipReconnect = false;
		const openSubDestroy = on(socket, "open", function() {
			self.onopen();
			fn && fn();
		});
		const onError = (err) => {
			debug$1("error");
			this.cleanup();
			this._readyState = "closed";
			this.emitReserved("error", err);
			if (fn) fn(err);
			else this.maybeReconnectOnOpen();
		};
		const errorSub = on(socket, "error", onError);
		if (false !== this._timeout) {
			const timeout = this._timeout;
			debug$1("connect attempt will timeout after %d", timeout);
			const timer = this.setTimeoutFn(() => {
				debug$1("connect attempt timed out after %d", timeout);
				openSubDestroy();
				onError(/* @__PURE__ */ new Error("timeout"));
				socket.close();
			}, timeout);
			if (this.opts.autoUnref) timer.unref();
			this.subs.push(() => {
				this.clearTimeoutFn(timer);
			});
		}
		this.subs.push(openSubDestroy);
		this.subs.push(errorSub);
		return this;
	}
	/**
	* Alias for open()
	*
	* @return self
	* @public
	*/
	connect(fn) {
		return this.open(fn);
	}
	/**
	* Called upon transport open.
	*
	* @private
	*/
	onopen() {
		debug$1("open");
		this.cleanup();
		this._readyState = "open";
		this.emitReserved("open");
		const socket = this.engine;
		this.subs.push(on(socket, "ping", this.onping.bind(this)), on(socket, "data", this.ondata.bind(this)), on(socket, "error", this.onerror.bind(this)), on(socket, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
	}
	/**
	* Called upon a ping.
	*
	* @private
	*/
	onping() {
		this.emitReserved("ping");
	}
	/**
	* Called with data.
	*
	* @private
	*/
	ondata(data) {
		try {
			this.decoder.add(data);
		} catch (e) {
			this.onclose("parse error", e);
		}
	}
	/**
	* Called when parser fully decodes a packet.
	*
	* @private
	*/
	ondecoded(packet) {
		nextTick(() => {
			this.emitReserved("packet", packet);
		}, this.setTimeoutFn);
	}
	/**
	* Called upon socket error.
	*
	* @private
	*/
	onerror(err) {
		debug$1("error", err);
		this.emitReserved("error", err);
	}
	/**
	* Creates a new socket for the given `nsp`.
	*
	* @return {Socket}
	* @public
	*/
	socket(nsp, opts) {
		let socket = this.nsps[nsp];
		if (!socket) {
			socket = new Socket(this, nsp, opts);
			this.nsps[nsp] = socket;
		} else if (this._autoConnect && !socket.active) socket.connect();
		return socket;
	}
	/**
	* Called upon a socket close.
	*
	* @param socket
	* @private
	*/
	_destroy(socket) {
		const nsps = Object.keys(this.nsps);
		for (const nsp of nsps) if (this.nsps[nsp].active) {
			debug$1("socket %s is still active, skipping close", nsp);
			return;
		}
		this._close();
	}
	/**
	* Writes a packet.
	*
	* @param packet
	* @private
	*/
	_packet(packet) {
		debug$1("writing packet %j", packet);
		const encodedPackets = this.encoder.encode(packet);
		for (let i = 0; i < encodedPackets.length; i++) this.engine.write(encodedPackets[i], packet.options);
	}
	/**
	* Clean up transport subscriptions and packet buffer.
	*
	* @private
	*/
	cleanup() {
		debug$1("cleanup");
		this.subs.forEach((subDestroy) => subDestroy());
		this.subs.length = 0;
		this.decoder.destroy();
	}
	/**
	* Close the current socket.
	*
	* @private
	*/
	_close() {
		debug$1("disconnect");
		this.skipReconnect = true;
		this._reconnecting = false;
		this.onclose("forced close");
	}
	/**
	* Alias for close()
	*
	* @private
	*/
	disconnect() {
		return this._close();
	}
	/**
	* Called when:
	*
	* - the low-level engine is closed
	* - the parser encountered a badly formatted packet
	* - all sockets are disconnected
	*
	* @private
	*/
	onclose(reason, description) {
		var _a;
		debug$1("closed due to %s", reason);
		this.cleanup();
		(_a = this.engine) === null || _a === void 0 || _a.close();
		this.backoff.reset();
		this._readyState = "closed";
		this.emitReserved("close", reason, description);
		if (this._reconnection && !this.skipReconnect) this.reconnect();
	}
	/**
	* Attempt a reconnection.
	*
	* @private
	*/
	reconnect() {
		if (this._reconnecting || this.skipReconnect) return this;
		const self = this;
		if (this.backoff.attempts >= this._reconnectionAttempts) {
			debug$1("reconnect failed");
			this.backoff.reset();
			this.emitReserved("reconnect_failed");
			this._reconnecting = false;
		} else {
			const delay = this.backoff.duration();
			debug$1("will wait %dms before reconnect attempt", delay);
			this._reconnecting = true;
			const timer = this.setTimeoutFn(() => {
				if (self.skipReconnect) return;
				debug$1("attempting reconnect");
				this.emitReserved("reconnect_attempt", self.backoff.attempts);
				if (self.skipReconnect) return;
				self.open((err) => {
					if (err) {
						debug$1("reconnect attempt error");
						self._reconnecting = false;
						self.reconnect();
						this.emitReserved("reconnect_error", err);
					} else {
						debug$1("reconnect success");
						self.onreconnect();
					}
				});
			}, delay);
			if (this.opts.autoUnref) timer.unref();
			this.subs.push(() => {
				this.clearTimeoutFn(timer);
			});
		}
	}
	/**
	* Called upon successful reconnect.
	*
	* @private
	*/
	onreconnect() {
		const attempt = this.backoff.attempts;
		this._reconnecting = false;
		this.backoff.reset();
		this.emitReserved("reconnect", attempt);
	}
};
// node_modules/socket.io-client/build/esm-debug/index.js
var debug = (0, import_src.default)("socket.io-client");
/**
* Managers cache.
*/
var cache = {};
function lookup(uri, opts) {
	if (typeof uri === "object") {
		opts = uri;
		uri = void 0;
	}
	opts = opts || {};
	const parsed = url$1(uri, opts.path || "/socket.io");
	const source = parsed.source;
	const id = parsed.id;
	const path = parsed.path;
	const sameNamespace = cache[id] && path in cache[id]["nsps"];
	const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
	let io;
	if (newConnection) {
		debug("ignoring socket cache for %s", source);
		io = new Manager(source, opts);
	} else {
		if (!cache[id]) {
			debug("new io instance for %s", source);
			cache[id] = new Manager(source, opts);
		}
		io = cache[id];
	}
	if (parsed.query && !opts.query) opts.query = parsed.queryKey;
	return io.socket(parsed.path, opts);
}
Object.assign(lookup, {
	Manager,
	Socket,
	io: lookup,
	connect: lookup
});
// node_modules/@base44/sdk/dist/utils/socket-utils.js
var ROOM_LEAVE_GRACE_MS = 250;
function initializeSocket(config, handlers) {
	var _a;
	const resolvedToken = (_a = config.token) !== null && _a !== void 0 ? _a : getAccessToken();
	const query = { app_id: config.appId };
	if (resolvedToken) query.token = resolvedToken;
	else query.anonymous_id = getAnalyticsSessionId();
	const socket = lookup(config.serverUrl, {
		path: config.mountPath,
		transports: config.transports,
		query
	});
	socket.on("connect", async () => {
		var _a;
		console.log("connect", socket.id);
		return (_a = handlers.connect) === null || _a === void 0 ? void 0 : _a.call(handlers);
	});
	socket.on("update_model", async (msg) => {
		var _a;
		return (_a = handlers.update_model) === null || _a === void 0 ? void 0 : _a.call(handlers, msg);
	});
	socket.on("error", async (error) => {
		var _a;
		return (_a = handlers.error) === null || _a === void 0 ? void 0 : _a.call(handlers, error);
	});
	socket.on("connect_error", async (error) => {
		var _a;
		console.error("connect_error", error);
		return (_a = handlers.error) === null || _a === void 0 ? void 0 : _a.call(handlers, error);
	});
	return socket;
}
function RoomsSocket({ config }) {
	let currentConfig = { ...config };
	const roomsToListeners = {};
	const pendingRoomLeaves = {};
	const handlers = {
		connect: async () => {
			const promises = [];
			Object.keys(roomsToListeners).forEach((room) => {
				const listeners = getListeners(room);
				if (listeners.length === 0) return;
				joinRoom(room);
				listeners.forEach(({ connect }) => {
					const promise = async () => connect === null || connect === void 0 ? void 0 : connect();
					promises.push(promise());
				});
			});
			await Promise.all(promises);
		},
		update_model: async (msg) => {
			const promises = getListeners(msg.room).map((listener) => {
				var _a;
				return (_a = listener.update_model) === null || _a === void 0 ? void 0 : _a.call(listener, msg);
			});
			await Promise.all(promises);
		},
		error: async (error) => {
			console.error("error", error);
			const promises = Object.values(roomsToListeners).flat().map((listener) => {
				var _a;
				return (_a = listener.error) === null || _a === void 0 ? void 0 : _a.call(listener, error);
			});
			await Promise.all(promises);
		}
	};
	let socket = initializeSocket(config, handlers);
	function cleanup() {
		disconnect();
	}
	function disconnect() {
		clearPendingRoomLeaves();
		if (socket) socket.disconnect();
	}
	function updateConfig(config) {
		cleanup();
		currentConfig = {
			...currentConfig,
			...config
		};
		socket = initializeSocket(currentConfig, handlers);
	}
	function joinRoom(room) {
		socket.emit("join", room);
	}
	function leaveRoom(room) {
		socket.emit("leave", room);
	}
	async function updateModel(room, data) {
		var _a;
		const dataStr = JSON.stringify(data);
		return (_a = handlers.update_model) === null || _a === void 0 ? void 0 : _a.call(handlers, {
			room,
			data: dataStr
		});
	}
	function getListeners(room) {
		var _a;
		return (_a = roomsToListeners[room]) !== null && _a !== void 0 ? _a : [];
	}
	function cancelPendingRoomLeave(room) {
		const pendingLeave = pendingRoomLeaves[room];
		if (!pendingLeave) return;
		clearTimeout(pendingLeave);
		delete pendingRoomLeaves[room];
	}
	function clearPendingRoomLeaves() {
		Object.keys(pendingRoomLeaves).forEach((room) => {
			var _a, _b;
			clearTimeout(pendingRoomLeaves[room]);
			delete pendingRoomLeaves[room];
			if (((_b = (_a = roomsToListeners[room]) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) === 0) delete roomsToListeners[room];
		});
	}
	function scheduleRoomLeave(room) {
		cancelPendingRoomLeave(room);
		pendingRoomLeaves[room] = setTimeout(() => {
			var _a, _b;
			delete pendingRoomLeaves[room];
			if (((_b = (_a = roomsToListeners[room]) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0) return;
			leaveRoom(room);
			delete roomsToListeners[room];
		}, ROOM_LEAVE_GRACE_MS);
	}
	const subscribeToRoom = (room, handlers) => {
		if (roomsToListeners[room]) cancelPendingRoomLeave(room);
		else {
			joinRoom(room);
			roomsToListeners[room] = [];
		}
		roomsToListeners[room].push(handlers);
		let unsubscribed = false;
		return () => {
			var _a, _b;
			if (unsubscribed) return;
			unsubscribed = true;
			roomsToListeners[room] = (_b = (_a = roomsToListeners[room]) === null || _a === void 0 ? void 0 : _a.filter((listener) => listener !== handlers)) !== null && _b !== void 0 ? _b : [];
			if (roomsToListeners[room].length === 0) scheduleRoomLeave(room);
		};
	};
	return {
		socket,
		subscribeToRoom,
		updateConfig,
		updateModel,
		disconnect
	};
}
// node_modules/@base44/sdk/dist/modules/payments-checkout.js
var ALLOWED_SCRIPT_HOSTS = {
	paypal: ["www.paypal.com", "www.sandbox.paypal.com"],
	stripe: ["js.stripe.com"]
};
async function scriptUrlFor(provider, deps) {
	var _a, _b;
	const value = (_b = (_a = await deps.getConfig()) === null || _a === void 0 ? void 0 : _a[provider]) === null || _b === void 0 ? void 0 : _b.script_url;
	let url;
	try {
		url = value ? new URL(value) : void 0;
	} catch (_c) {
		url = void 0;
	}
	if (!url || url.protocol !== "https:" || url.port !== "" || url.username !== "" || url.password !== "" || !ALLOWED_SCRIPT_HOSTS[provider].includes(url.hostname)) throw new Error(`The payments config has no valid ${provider === "paypal" ? "PayPal" : "Stripe"} script URL`);
	return url.href;
}
function browserGlobals() {
	return window;
}
var scriptLoads = /* @__PURE__ */ new Map();
/**
* Appends a script tag once per URL and resolves when it loads.
* @internal
*/
var loadScript = (src) => {
	let load = scriptLoads.get(src);
	if (!load) {
		load = new Promise((resolve, reject) => {
			const script = document.createElement("script");
			script.src = src;
			script.async = true;
			script.onload = () => resolve();
			script.onerror = () => {
				scriptLoads.delete(src);
				script.remove();
				reject(/* @__PURE__ */ new Error(`Failed to load ${src}`));
			};
			document.head.appendChild(script);
		});
		scriptLoads.set(src, load);
	}
	return load;
};
async function loadGlobal(src, read, load) {
	if (!read()) await load(src);
	const value = read();
	if (!value) throw new Error(`${src} loaded but didn't define its global`);
	return value;
}
var stripeInstances = /* @__PURE__ */ new Map();
var stripeQueue = Promise.resolve();
var activeStripeCheckout = null;
function mountStripe(element, scriptUrl, embedded, deps) {
	const mount = stripeQueue.then(async () => {
		var _a;
		const Stripe = await loadGlobal(scriptUrl, () => browserGlobals().Stripe, deps.loadScript);
		let stripe = stripeInstances.get(embedded.publishable_key);
		if (!stripe) {
			stripe = Stripe(embedded.publishable_key);
			stripeInstances.set(embedded.publishable_key, stripe);
		}
		const create = (_a = stripe.initEmbeddedCheckout) !== null && _a !== void 0 ? _a : stripe.createEmbeddedCheckoutPage;
		if (typeof create !== "function") throw new Error("Stripe.js doesn't support Embedded Checkout");
		activeStripeCheckout === null || activeStripeCheckout === void 0 || activeStripeCheckout.destroy();
		const checkout = await create.call(stripe, { fetchClientSecret: () => Promise.resolve(embedded.client_secret) });
		try {
			checkout.mount(element);
		} catch (error) {
			checkout.destroy();
			throw error;
		}
		let destroyed = false;
		const handle = {
			destroy() {
				if (destroyed) return;
				destroyed = true;
				if (activeStripeCheckout === handle) activeStripeCheckout = null;
				checkout.destroy();
			},
			setDisabled: () => void 0
		};
		activeStripeCheckout = handle;
		return handle;
	});
	stripeQueue = mount.catch(() => void 0);
	return mount;
}
async function mountPayPal(element, scriptUrl, currency, embedded, checkout, options, deps) {
	var _a;
	const paypal = await loadGlobal(scriptUrl, () => browserGlobals().paypal, deps.loadScript);
	if (typeof paypal.createInstance !== "function") throw new Error("Another PayPal JS SDK version is already loaded on this page. Remove it to use mountCheckout().");
	const subscription = embedded.intent === "subscription";
	const sdk = await paypal.createInstance({
		clientId: embedded.client_id,
		merchantId: embedded.merchant_id,
		...embedded.partner_attribution_id ? { partnerAttributionId: embedded.partner_attribution_id } : {},
		components: [subscription ? "paypal-subscriptions" : "paypal-payments"],
		pageType: "checkout"
	});
	if (!(await sdk.findEligibleMethods({
		currencyCode: currency.toUpperCase(),
		...subscription ? { paymentFlow: "RECURRING_PAYMENT" } : {}
	})).isEligible("paypal")) throw new Error("PayPal isn't available for this checkout");
	const createSession = subscription ? (_a = sdk.createPayPalSubscriptionPaymentSession) !== null && _a !== void 0 ? _a : sdk.createPayPalSubscriptionSession : sdk.createPayPalOneTimePaymentSession;
	if (typeof createSession !== "function") throw new Error("The loaded PayPal JS SDK can't create this checkout");
	let destroyed = false;
	let completing = false;
	let paid = false;
	let starting = false;
	let checkoutId = typeof checkout === "string" ? checkout : void 0;
	const notify = (callback) => {
		if (destroyed) return;
		try {
			callback();
		} catch (error) {
			console.error("[Base44 SDK] A mountCheckout() callback threw", error);
		}
	};
	const button = document.createElement("paypal-button");
	const session = createSession.call(sdk, {
		async onApprove() {
			completing = true;
			button.disabled = true;
			let result;
			try {
				if (!checkoutId) throw new Error("PayPal approved a checkout that wasn't created");
				result = await deps.completeCheckout(checkoutId);
			} catch (error) {
				completing = false;
				button.disabled = false;
				notify(() => {
					var _a;
					return (_a = options.onError) === null || _a === void 0 ? void 0 : _a.call(options, error);
				});
				return;
			}
			completing = false;
			paid = true;
			notify(() => {
				var _a;
				return (_a = options.onComplete) === null || _a === void 0 ? void 0 : _a.call(options, result);
			});
		},
		onCancel() {
			notify(() => {
				var _a;
				return (_a = options.onCancel) === null || _a === void 0 ? void 0 : _a.call(options);
			});
		},
		onError(error) {
			notify(() => {
				var _a;
				return (_a = options.onError) === null || _a === void 0 ? void 0 : _a.call(options, error);
			});
		}
	});
	button.setAttribute("type", subscription ? "subscribe" : "pay");
	const onClick = () => {
		if (paid || completing || starting || button.disabled) return;
		starting = true;
		const id = Promise.resolve().then(typeof checkout === "string" ? () => checkout : checkout).then((resolved) => {
			checkoutId = resolved;
			return subscription ? { subscriptionId: resolved } : { orderId: resolved };
		});
		const report = (error) => notify(() => {
			var _a;
			return (_a = options.onError) === null || _a === void 0 ? void 0 : _a.call(options, error);
		});
		try {
			Promise.resolve(session.start({ presentationMode: "auto" }, id)).catch(report).finally(() => {
				starting = false;
			});
		} catch (error) {
			starting = false;
			report(error);
		}
	};
	button.addEventListener("click", onClick);
	element.appendChild(button);
	return {
		destroy() {
			var _a;
			if (destroyed) return;
			destroyed = true;
			button.removeEventListener("click", onClick);
			button.remove();
			(_a = session.destroy) === null || _a === void 0 || _a.call(session);
		},
		setDisabled(disabled) {
			if (!completing && !paid) button.disabled = disabled;
		}
	};
}
/** The new checkout's id, refused unless it is the checkout the button was drawn for. */
function onClickCheckoutId(spec, button) {
	return async () => {
		var _a;
		const checkout = await spec.createCheckout();
		const embedded = checkout === null || checkout === void 0 ? void 0 : checkout.embedded;
		if ((embedded === null || embedded === void 0 ? void 0 : embedded.provider) !== "paypal" || embedded.intent !== spec.intent || embedded.merchant_id !== button.merchant_id || ((_a = checkout.currency) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== spec.currency.toLowerCase()) throw new Error("createCheckout() returned a checkout that doesn't match the PayPal button. Check its provider, intent and currency.");
		return checkout.checkout_id;
	};
}
/**
* Fetches the payments config and loads the provider's script ahead of mountCheckout().
* @internal
*/
async function preloadCheckout(provider, deps) {
	if (typeof window === "undefined" || typeof document === "undefined") return;
	const read = () => provider === "paypal" ? browserGlobals().paypal : browserGlobals().Stripe;
	try {
		if (!read()) await deps.loadScript(await scriptUrlFor(provider, deps));
	} catch (_a) {}
}
/**
* Mounts the embedded checkout that createCheckout() returned.
* @internal
*/
async function mountCheckout(element, checkout, options, deps) {
	if (typeof window === "undefined" || typeof document === "undefined") throw new Error("mountCheckout() requires a browser environment");
	if (!element) throw new Error("mountCheckout() requires an element to render in");
	if ("createCheckout" in checkout) return mountPayPalOnClick(element, checkout, options, deps);
	const embedded = checkout === null || checkout === void 0 ? void 0 : checkout.embedded;
	if (!embedded) throw new Error("This checkout isn't embedded. Create it with presentation: 'embedded', or send the buyer to its redirect_url.");
	switch (embedded.provider) {
		case "stripe": return mountStripe(element, await scriptUrlFor("stripe", deps), embedded, deps);
		case "paypal": return mountPayPal(element, await scriptUrlFor("paypal", deps), checkout.currency, embedded, checkout.checkout_id, options, deps);
		default: throw new Error(`Embedded checkout isn't supported for provider ${embedded.provider}`);
	}
}
async function mountPayPalOnClick(element, spec, options, deps) {
	var _a, _b;
	if (spec.provider !== "paypal" || typeof spec.createCheckout !== "function") throw new Error("Only PayPal can create its checkout on click");
	const scriptUrl = await scriptUrlFor("paypal", deps);
	const button = (_b = (_a = await deps.getConfig()) === null || _a === void 0 ? void 0 : _a.paypal) === null || _b === void 0 ? void 0 : _b.button;
	if (!(button === null || button === void 0 ? void 0 : button.client_id) || !button.merchant_id) throw new Error("PayPal isn't ready to take payments in this app yet");
	const embedded = {
		provider: "paypal",
		...button,
		intent: spec.intent
	};
	return mountPayPal(element, scriptUrl, spec.currency, embedded, onClickCheckoutId(spec, button), options, deps);
}
// node_modules/@base44/sdk/dist/modules/payments.js
function requireId(value, name) {
	if (!value || typeof value !== "string") throw new Error(`${name} is required and must be a string`);
	return encodeURIComponent(value);
}
function createPaymentsRequests(axios, appId) {
	const base = `/apps/${appId}/payments`;
	return {
		async completeCheckout(checkoutId) {
			const id = requireId(checkoutId, "Checkout ID");
			return axios.post(`${base}/checkout-sessions/${id}/complete`);
		},
		async listPurchases(params = {}) {
			return axios.get(`${base}/purchases`, { params });
		},
		async createCheckout(params) {
			return axios.post(`${base}/checkout-sessions`, params);
		},
		async refund(params) {
			return axios.post(`${base}/refunds`, params);
		},
		async cancelSubscription(subscriptionId, options = {}) {
			const id = requireId(subscriptionId, "Subscription ID");
			return axios.post(`${base}/subscriptions/${id}/cancel`, options);
		},
		async pauseSubscription(subscriptionId) {
			const id = requireId(subscriptionId, "Subscription ID");
			return axios.post(`${base}/subscriptions/${id}/pause`);
		},
		async resumeSubscription(subscriptionId) {
			const id = requireId(subscriptionId, "Subscription ID");
			return axios.post(`${base}/subscriptions/${id}/resume`);
		}
	};
}
/**
* Creates the payments module for anonymous and user authentication.
*
* @param axios - Axios instance
* @param appId - Application ID
* @returns Payments module for the browser
* @internal
*/
function createPaymentsModule(axios, appId) {
	const requests = createPaymentsRequests(axios, appId);
	let config;
	const getConfig = () => {
		config !== null && config !== void 0 || (config = axios.get(`/apps/${appId}/payments/config`).catch((error) => {
			config = void 0;
			throw error;
		}));
		return config;
	};
	return {
		completeCheckout: requests.completeCheckout,
		listPurchases: requests.listPurchases,
		mountCheckout(element, checkout, options = {}) {
			return mountCheckout(element, checkout, options, {
				completeCheckout: requests.completeCheckout,
				getConfig,
				loadScript
			});
		},
		preloadCheckout(provider) {
			return preloadCheckout(provider, {
				getConfig,
				loadScript
			});
		}
	};
}
/**
* Creates the payments module for service role authentication.
*
* @param axios - Axios instance (should be service role client)
* @param appId - Application ID
* @returns Payments module for backend functions
* @internal
*/
function createServiceRolePaymentsModule(axios, appId) {
	return createPaymentsRequests(axios, appId);
}
// node_modules/partysocket/dist/chunk-TPTC3KUF.mjs
if (!globalThis.EventTarget || !globalThis.Event) console.error(`
  PartySocket requires a global 'EventTarget' class to be available!
  You can polyfill this global by adding this to your code before any partysocket imports: 
  
  \`\`\`
  import 'partysocket/event-target-polyfill';
  \`\`\`
  Please file an issue at https://github.com/partykit/partykit if you're still having trouble.
`);
var ErrorEvent = class extends Event {
	message;
	error;
	constructor(error, target) {
		super("error", target);
		this.message = error.message;
		this.error = error;
	}
};
var CloseEvent = class extends Event {
	code;
	reason;
	wasClean = true;
	constructor(code = 1e3, reason = "", target) {
		super("close", target);
		this.code = code;
		this.reason = reason;
	}
};
var Events = {
	Event,
	ErrorEvent,
	CloseEvent
};
function assert(condition, msg) {
	if (!condition) throw new Error(msg);
}
function cloneEventBrowser(e) {
	return new e.constructor(e.type, e);
}
function cloneEventNode(e) {
	if ("data" in e) return new MessageEvent(e.type, e);
	if ("code" in e || "reason" in e) return new CloseEvent(e.code || 1999, e.reason || "unknown reason", e);
	if ("error" in e) return new ErrorEvent(e.error, e);
	return new Event(e.type, e);
}
var cloneEvent = typeof process !== "undefined" && typeof process.versions?.node !== "undefined" && typeof document === "undefined" ? cloneEventNode : cloneEventBrowser;
var DEFAULT = {
	maxReconnectionDelay: 1e4,
	minReconnectionDelay: 1e3 + Math.random() * 4e3,
	minUptime: 5e3,
	reconnectionDelayGrowFactor: 1.3,
	connectionTimeout: 4e3,
	maxRetries: Infinity,
	maxEnqueuedMessages: Infinity,
	startClosed: false,
	debug: false
};
var didWarnAboutMissingWebSocket = false;
var ReconnectingWebSocket = class _ReconnectingWebSocket extends EventTarget {
	_ws;
	_retryCount = -1;
	_uptimeTimeout;
	_connectTimeout;
	_shouldReconnect = true;
	_connectLock = false;
	_binaryType = "blob";
	_closeCalled = false;
	_messageQueue = [];
	_url;
	_protocols;
	_options;
	constructor(url, protocols, options = {}) {
		super();
		this._url = url;
		this._protocols = protocols;
		this._options = options;
		if (this._options.startClosed) this._shouldReconnect = false;
		this._connect();
	}
	static get CONNECTING() {
		return 0;
	}
	static get OPEN() {
		return 1;
	}
	static get CLOSING() {
		return 2;
	}
	static get CLOSED() {
		return 3;
	}
	get CONNECTING() {
		return _ReconnectingWebSocket.CONNECTING;
	}
	get OPEN() {
		return _ReconnectingWebSocket.OPEN;
	}
	get CLOSING() {
		return _ReconnectingWebSocket.CLOSING;
	}
	get CLOSED() {
		return _ReconnectingWebSocket.CLOSED;
	}
	get binaryType() {
		return this._ws ? this._ws.binaryType : this._binaryType;
	}
	set binaryType(value) {
		this._binaryType = value;
		if (this._ws) this._ws.binaryType = value;
	}
	/**
	* Returns the number or connection retries
	*/
	get retryCount() {
		return Math.max(this._retryCount, 0);
	}
	/**
	* The number of bytes of data that have been queued using calls to send() but not yet
	* transmitted to the network. This value resets to zero once all queued data has been sent.
	* This value does not reset to zero when the connection is closed; if you keep calling send(),
	* this will continue to climb. Read only
	*/
	get bufferedAmount() {
		return this._messageQueue.reduce((acc, message) => {
			if (typeof message === "string") acc += message.length;
			else if (message instanceof Blob) acc += message.size;
			else acc += message.byteLength;
			return acc;
		}, 0) + (this._ws ? this._ws.bufferedAmount : 0);
	}
	/**
	* The extensions selected by the server. This is currently only the empty string or a list of
	* extensions as negotiated by the connection
	*/
	get extensions() {
		return this._ws ? this._ws.extensions : "";
	}
	/**
	* A string indicating the name of the sub-protocol the server selected;
	* this will be one of the strings specified in the protocols parameter when creating the
	* WebSocket object
	*/
	get protocol() {
		return this._ws ? this._ws.protocol : "";
	}
	/**
	* The current state of the connection; this is one of the Ready state constants
	*/
	get readyState() {
		if (this._ws) return this._ws.readyState;
		return this._options.startClosed ? _ReconnectingWebSocket.CLOSED : _ReconnectingWebSocket.CONNECTING;
	}
	/**
	* The URL as resolved by the constructor
	*/
	get url() {
		return this._ws ? this._ws.url : "";
	}
	/**
	* Whether the websocket object is now in reconnectable state
	*/
	get shouldReconnect() {
		return this._shouldReconnect;
	}
	/**
	* An event listener to be called when the WebSocket connection's readyState changes to CLOSED
	*/
	onclose = null;
	/**
	* An event listener to be called when an error occurs
	*/
	onerror = null;
	/**
	* An event listener to be called when a message is received from the server
	*/
	onmessage = null;
	/**
	* An event listener to be called when the WebSocket connection's readyState changes to OPEN;
	* this indicates that the connection is ready to send and receive data
	*/
	onopen = null;
	/**
	* Closes the WebSocket connection or connection attempt, if any. If the connection is already
	* CLOSED, this method does nothing
	*/
	close(code = 1e3, reason) {
		this._closeCalled = true;
		this._shouldReconnect = false;
		this._clearTimeouts();
		if (!this._ws) {
			this._debug("close enqueued: no ws instance");
			return;
		}
		if (this._ws.readyState === this.CLOSED) {
			this._debug("close: already closed");
			return;
		}
		this._ws.close(code, reason);
	}
	/**
	* Closes the WebSocket connection or connection attempt and connects again.
	* Resets retry counter;
	*/
	reconnect(code, reason) {
		this._shouldReconnect = true;
		this._closeCalled = false;
		this._retryCount = -1;
		if (!this._ws || this._ws.readyState === this.CLOSED) this._connect();
		else {
			this._disconnect(code, reason);
			this._connect();
		}
	}
	/**
	* Enqueue specified data to be transmitted to the server over the WebSocket connection
	*/
	send(data) {
		if (this._ws && this._ws.readyState === this.OPEN) {
			this._debug("send", data);
			this._ws.send(data);
		} else {
			const { maxEnqueuedMessages = DEFAULT.maxEnqueuedMessages } = this._options;
			if (this._messageQueue.length < maxEnqueuedMessages) {
				this._debug("enqueue", data);
				this._messageQueue.push(data);
			}
		}
	}
	_debug(...args) {
		if (this._options.debug) console.log.apply(console, ["RWS>", ...args]);
	}
	_getNextDelay() {
		const { reconnectionDelayGrowFactor = DEFAULT.reconnectionDelayGrowFactor, minReconnectionDelay = DEFAULT.minReconnectionDelay, maxReconnectionDelay = DEFAULT.maxReconnectionDelay } = this._options;
		let delay = 0;
		if (this._retryCount > 0) {
			delay = minReconnectionDelay * Math.pow(reconnectionDelayGrowFactor, this._retryCount - 1);
			if (delay > maxReconnectionDelay) delay = maxReconnectionDelay;
		}
		this._debug("next delay", delay);
		return delay;
	}
	_wait() {
		return new Promise((resolve) => {
			setTimeout(resolve, this._getNextDelay());
		});
	}
	_getNextProtocols(protocolsProvider) {
		if (!protocolsProvider) return Promise.resolve(null);
		if (typeof protocolsProvider === "string" || Array.isArray(protocolsProvider)) return Promise.resolve(protocolsProvider);
		if (typeof protocolsProvider === "function") {
			const protocols = protocolsProvider();
			if (!protocols) return Promise.resolve(null);
			if (typeof protocols === "string" || Array.isArray(protocols)) return Promise.resolve(protocols);
			if (protocols.then) return protocols;
		}
		throw Error("Invalid protocols");
	}
	_getNextUrl(urlProvider) {
		if (typeof urlProvider === "string") return Promise.resolve(urlProvider);
		if (typeof urlProvider === "function") {
			const url = urlProvider();
			if (typeof url === "string") return Promise.resolve(url);
			if (url.then) return url;
		}
		throw Error("Invalid URL");
	}
	_connect() {
		if (this._connectLock || !this._shouldReconnect) return;
		this._connectLock = true;
		const { maxRetries = DEFAULT.maxRetries, connectionTimeout = DEFAULT.connectionTimeout } = this._options;
		if (this._retryCount >= maxRetries) {
			this._debug("max retries reached", this._retryCount, ">=", maxRetries);
			return;
		}
		this._retryCount++;
		this._debug("connect", this._retryCount);
		this._removeListeners();
		this._wait().then(() => Promise.all([this._getNextUrl(this._url), this._getNextProtocols(this._protocols || null)])).then(([url, protocols]) => {
			if (this._closeCalled) {
				this._connectLock = false;
				return;
			}
			if (!this._options.WebSocket && typeof WebSocket === "undefined" && !didWarnAboutMissingWebSocket) {
				console.error(`\u203C\uFE0F No WebSocket implementation available. You should define options.WebSocket. 

For example, if you're using node.js, run \`npm install ws\`, and then in your code:

import PartySocket from 'partysocket';
import WS from 'ws';

const partysocket = new PartySocket({
  host: "127.0.0.1:1999",
  room: "test-room",
  WebSocket: WS
});

`);
				didWarnAboutMissingWebSocket = true;
			}
			const WS = this._options.WebSocket || WebSocket;
			this._debug("connect", {
				url,
				protocols
			});
			this._ws = protocols ? new WS(url, protocols) : new WS(url);
			this._ws.binaryType = this._binaryType;
			this._connectLock = false;
			this._addListeners();
			this._connectTimeout = setTimeout(() => this._handleTimeout(), connectionTimeout);
		}).catch((err) => {
			this._connectLock = false;
			this._handleError(new Events.ErrorEvent(Error(err.message), this));
		});
	}
	_handleTimeout() {
		this._debug("timeout event");
		this._handleError(new Events.ErrorEvent(Error("TIMEOUT"), this));
	}
	_disconnect(code = 1e3, reason) {
		this._clearTimeouts();
		if (!this._ws) return;
		this._removeListeners();
		try {
			this._ws.close(code, reason);
			this._handleClose(new Events.CloseEvent(code, reason, this));
		} catch (error) {}
	}
	_acceptOpen() {
		this._debug("accept open");
		this._retryCount = 0;
	}
	_handleOpen = (event) => {
		this._debug("open event");
		const { minUptime = DEFAULT.minUptime } = this._options;
		clearTimeout(this._connectTimeout);
		this._uptimeTimeout = setTimeout(() => this._acceptOpen(), minUptime);
		assert(this._ws, "WebSocket is not defined");
		this._ws.binaryType = this._binaryType;
		this._messageQueue.forEach((message) => this._ws?.send(message));
		this._messageQueue = [];
		if (this.onopen) this.onopen(event);
		this.dispatchEvent(cloneEvent(event));
	};
	_handleMessage = (event) => {
		this._debug("message event");
		if (this.onmessage) this.onmessage(event);
		this.dispatchEvent(cloneEvent(event));
	};
	_handleError = (event) => {
		this._debug("error event", event.message);
		this._disconnect(void 0, event.message === "TIMEOUT" ? "timeout" : void 0);
		if (this.onerror) this.onerror(event);
		this._debug("exec error listeners");
		this.dispatchEvent(cloneEvent(event));
		this._connect();
	};
	_handleClose = (event) => {
		this._debug("close event");
		this._clearTimeouts();
		if (this._shouldReconnect) this._connect();
		if (this.onclose) this.onclose(event);
		this.dispatchEvent(cloneEvent(event));
	};
	_removeListeners() {
		if (!this._ws) return;
		this._debug("removeListeners");
		this._ws.removeEventListener("open", this._handleOpen);
		this._ws.removeEventListener("close", this._handleClose);
		this._ws.removeEventListener("message", this._handleMessage);
		this._ws.removeEventListener("error", this._handleError);
	}
	_addListeners() {
		if (!this._ws) return;
		this._debug("addListeners");
		this._ws.addEventListener("open", this._handleOpen);
		this._ws.addEventListener("close", this._handleClose);
		this._ws.addEventListener("message", this._handleMessage);
		this._ws.addEventListener("error", this._handleError);
	}
	_clearTimeouts() {
		clearTimeout(this._connectTimeout);
		clearTimeout(this._uptimeTimeout);
	}
};
/*!
* Reconnecting WebSocket
* by Pedro Ladaria <pedro.ladaria@gmail.com>
* https://github.com/pladaria/reconnecting-websocket
* License MIT
*/
// node_modules/@base44/sdk/dist/modules/actors.js
var PING_MS = 1e3;
var DEAD_MS = 3e3;
var PROXY_FALLBACK_STATUSES = /* @__PURE__ */ new Set([
	405,
	409,
	422,
	503
]);
var TERMINAL_MINT_STATUSES = /* @__PURE__ */ new Set([
	400,
	403,
	404
]);
/** The mint's rejection can be anything; a `Base44Error` carries a numeric
* `.status` (absent for network failures). */
function mintErrorStatus(err) {
	const status = err && typeof err === "object" ? err.status : void 0;
	return typeof status === "number" ? status : void 0;
}
function toError(err) {
	return err instanceof Error ? err : new Error(String(err));
}
/**
* A live connection to an actor instance. Only obtainable from
* {@link ActorRef.connect}, so `subscribe`/`send` are always valid — the socket
* exists for this object's whole lifetime.
*/
var Connection = class {
	constructor(actorName, instanceId, config, options, onClose) {
		var _a;
		this.onClose = onClose;
		this.listeners = /* @__PURE__ */ new Set();
		this.heartbeat = null;
		this.closed = false;
		this.id = (_a = options === null || options === void 0 ? void 0 : options.id) !== null && _a !== void 0 ? _a : crypto.randomUUID();
		let useProxy = config.transport === "proxy";
		const urlProvider = async () => {
			var _a;
			if (this.closed) throw new Error("Actor connection is closed");
			if (!useProxy) try {
				const { websocket_url, token } = await config.mintConnectionToken(actorName, instanceId, this.id);
				return `${websocket_url}${websocket_url.includes("?") ? "&" : "?"}token=${encodeURIComponent(token)}`;
			} catch (err) {
				const status = mintErrorStatus(err);
				if (!(config.transport !== "direct" && status !== void 0 && PROXY_FALLBACK_STATUSES.has(status))) {
					if (status !== void 0 && TERMINAL_MINT_STATUSES.has(status)) this.close();
					try {
						(_a = config.onMintError) === null || _a === void 0 || _a.call(config, toError(err));
					} catch (_b) {}
					throw err;
				}
				useProxy = true;
			}
			return buildProxyActorUrl(config.host, actorName, instanceId, this.id, config.appId, config.getAuthToken(), config.functionsVersion);
		};
		const ws = new ReconnectingWebSocket(urlProvider);
		this.ws = ws;
		let lastMsg = Date.now();
		const bumpAlive = () => {
			lastMsg = Date.now();
		};
		ws.addEventListener("open", bumpAlive);
		ws.addEventListener("message", (ev) => {
			bumpAlive();
			let data;
			try {
				data = JSON.parse(ev.data);
			} catch (_a) {
				return;
			}
			if ((data && typeof data === "object" ? data.type : void 0) === "__pong") return;
			for (const listener of this.listeners) listener(data);
		});
		this.heartbeat = setInterval(() => {
			if (Date.now() - lastMsg > DEAD_MS) {
				bumpAlive();
				if (ws.readyState === ws.OPEN) ws.reconnect();
				return;
			}
			try {
				ws.send(JSON.stringify({ type: "__ping" }));
			} catch (_a) {}
		}, PING_MS);
	}
	subscribe(callback) {
		this.listeners.add(callback);
		return { unsubscribe: () => {
			this.listeners.delete(callback);
		} };
	}
	send(data) {
		if (this.closed) return;
		this.ws.send(JSON.stringify(data));
	}
	close() {
		if (this.closed) return;
		this.closed = true;
		if (this.heartbeat) {
			clearInterval(this.heartbeat);
			this.heartbeat = null;
		}
		this.listeners.clear();
		this.ws.close();
		this.onClose();
	}
};
/** Handle for one actor instance: `connect()` opens the socket (idempotent). */
function makeActorRef(actorName, instanceId, config, connections) {
	let conn = null;
	return { connect(options) {
		if (conn) return conn;
		const c = new Connection(actorName, instanceId, config, options, () => {
			connections.delete(c);
			if (conn === c) conn = null;
		});
		conn = c;
		connections.add(c);
		return c;
	} };
}
/**
* The legacy platform-proxy URL, byte-for-byte what PartySocket built before
* the direct path existed: same scheme swap (including its localhost-needs-a-
* port quirk), case-preserved party segment, `_pk` first in the query. The
* `handler` param is load-bearing — the proxy reads it for the actor name.
*/
function buildProxyActorUrl(rawHost, actorName, instanceId, connectionId, appId, token, functionsVersion) {
	let host = rawHost.replace(/^(http|https|ws|wss):\/\//, "");
	if (host.endsWith("/")) host = host.slice(0, -1);
	const insecure = host.startsWith("localhost:") || host.startsWith("127.0.0.1:") || host.startsWith("192.168.") || host.startsWith("10.") || host.startsWith("172.") && host.split(".")[1] >= "16" && host.split(".")[1] <= "31" || host.startsWith("[::ffff:7f00:1]:");
	const query = new URLSearchParams([
		["_pk", connectionId],
		["app_id", appId],
		["handler", actorName]
	]);
	if (token) query.append("token", token);
	if (functionsVersion) query.append("fv", functionsVersion);
	return `${insecure ? "ws" : "wss"}://${host}/parties/${actorName}/${instanceId}?${query}`;
}
/**
* Absolute host for the proxy-fallback actor URL. A relative/empty `serverUrl`
* can't be dialed (same-origin apps use a relative `/api`, so `serverUrl` is
* often `""`), so fall back to the page origin.
*/
function resolveActorsHost(serverUrl, browserOrigin) {
	return serverUrl && !serverUrl.startsWith("/") ? serverUrl : browserOrigin !== null && browserOrigin !== void 0 ? browserOrigin : serverUrl;
}
function createActorsModule(config) {
	const connections = /* @__PURE__ */ new Set();
	return {
		module: new Proxy({}, { get(_, key) {
			if (typeof key !== "string" || key === "then") return void 0;
			return (instanceId) => makeActorRef(key, instanceId, config, connections);
		} }),
		closeAll: () => {
			for (const c of [...connections]) c.close();
		}
	};
}
// node_modules/@base44/sdk/dist/client.js
/**
* Creates a Base44 client.
*
* This is the main entry point for the Base44 SDK. It creates a client that provides access to the SDK's modules, such as {@linkcode EntitiesModule | entities}, {@linkcode AuthModule | auth}, and {@linkcode FunctionsModule | functions}.
*
* How you get a client depends on your context:
* - **Inside a Base44 app:** The client is automatically created and configured for you. Import it from `@/api/base44Client`.
* - **External app using Base44 as a backend:** Call `createClient()` directly in your code to create and configure the client.
*
* The client supports three authentication modes:
* - **Anonymous**: Access modules without authentication using `base44.moduleName`. Operations are scoped to public data and permissions.
* - **User authentication**: Access modules with user-level permissions using `base44.moduleName`. Operations are scoped to the authenticated user's data and permissions. Use `base44.auth.loginViaEmailPassword()` or other auth methods to get a token.
* - **Service role authentication**: Access modules with elevated permissions using `base44.asServiceRole.moduleName`. Operations bypass entity access rules and field-level security, giving full read and write access to all of the app's data. Only available in Base44-hosted backend functions. Create a client with service role authentication using {@linkcode createClientFromRequest | createClientFromRequest()}.
*
* For example, when using the {@linkcode EntitiesModule | entities} module:
* - **Anonymous**: Can only read public data.
* - **User authentication**: Can access the current user's data.
* - **Service role authentication**: Can read and write any record, bypassing access rules.
*
* Most modules are available in all three modes, but with different permission levels. However, some modules are only available in specific authentication modes.
*
* @param config - Configuration object for the client.
* @returns A configured Base44 client instance with access to all SDK modules.
*
* @example
* ```typescript
* // Create a client for your app
* import { createClient } from '@base44/sdk';
*
* const base44 = createClient({
*   appId: 'my-app-id'
* });
*
* // Use the client to access your data
* const products = await base44.entities.Products.list();
* ```
*/
function createClient(config) {
	return buildClient(config, { sendBuildCommit: true });
}
function buildClient(config, { sendBuildCommit }) {
	var _a, _b, _c, _d;
	const { serverUrl = "https://base44.app", appId, analytics, token, serviceToken, requiresAuth = false, appBaseUrl, options, functionsVersion, headers: optionalHeaders } = config;
	const normalizedAppBaseUrl = typeof appBaseUrl === "string" ? appBaseUrl : "";
	const socketConfig = {
		serverUrl,
		mountPath: "/ws-user-apps/socket.io/",
		transports: ["websocket"],
		appId,
		token
	};
	let socket = null;
	const getSocket = () => {
		if (!socket) socket = RoomsSocket({ config: socketConfig });
		return socket;
	};
	const callerBuildCommit = Object.entries(optionalHeaders !== null && optionalHeaders !== void 0 ? optionalHeaders : {}).find(([name]) => name.toLowerCase() === BUILD_COMMIT_HEADER.toLowerCase());
	const buildCommitHeaders = callerBuildCommit ? { [BUILD_COMMIT_HEADER]: callerBuildCommit[1] } : sendBuildCommit ? getBuildCommitHeaders() : {};
	const headers = {
		...callerBuildCommit ? {} : buildCommitHeaders,
		...optionalHeaders,
		"X-App-Id": String(appId)
	};
	const stateHeader = optionalHeaders === null || optionalHeaders === void 0 ? void 0 : optionalHeaders["Base44-State"];
	const aiGatewayHeaders = stateHeader ? { "Base44-State": stateHeader } : {};
	const functionHeaders = functionsVersion ? {
		...headers,
		"Base44-Functions-Version": functionsVersion
	} : headers;
	const axiosClient = createAxiosClient({
		baseURL: `${serverUrl}/api`,
		headers,
		token,
		onError: options === null || options === void 0 ? void 0 : options.onError
	});
	const functionsAxiosClient = createAxiosClient({
		baseURL: `${serverUrl}/api`,
		headers: functionHeaders,
		token,
		interceptResponses: false,
		onError: options === null || options === void 0 ? void 0 : options.onError
	});
	const serviceRoleHeaders = {
		...headers,
		...token ? { "on-behalf-of": `Bearer ${token}` } : {}
	};
	const serviceRoleAxiosClient = createAxiosClient({
		baseURL: `${serverUrl}/api`,
		headers: serviceRoleHeaders,
		token: serviceToken,
		onError: options === null || options === void 0 ? void 0 : options.onError
	});
	const serviceRoleFunctionsAxiosClient = createAxiosClient({
		baseURL: `${serverUrl}/api`,
		headers: functionHeaders,
		token: serviceToken,
		interceptResponses: false
	});
	const actorsAxiosClient = createAxiosClient({
		baseURL: `${serverUrl}/api`,
		headers
	});
	const userAuthModule = createAuthModule(axiosClient, functionsAxiosClient, appId, {
		appBaseUrl: normalizedAppBaseUrl,
		serverUrl,
		token
	});
	if (typeof window !== "undefined") {
		const accessToken = token || getAccessToken();
		if (accessToken) userAuthModule.setToken(accessToken);
	}
	const actorsModule = createActorsModule({
		appId,
		host: resolveActorsHost(serverUrl, typeof window !== "undefined" ? (_a = window.location) === null || _a === void 0 ? void 0 : _a.origin : void 0),
		functionsVersion,
		getAuthToken: () => token || getAccessToken(),
		mintConnectionToken: async (actorName, room, connectionId) => {
			const authToken = token || getAccessToken();
			return await actorsAxiosClient.post(`/apps/${appId}/actors/${encodeURIComponent(actorName)}/connection-token`, {
				room,
				connection_id: connectionId
			}, { headers: {
				...authToken ? { Authorization: `Bearer ${authToken}` } : {},
				...functionsVersion ? { "Base44-Functions-Version": functionsVersion } : {}
			} });
		},
		transport: options === null || options === void 0 ? void 0 : options.actorsTransport,
		onMintError: options === null || options === void 0 ? void 0 : options.onError
	});
	const userModules = {
		entities: createEntitiesModule({
			axios: axiosClient,
			appId,
			getSocket
		}),
		integrations: createIntegrationsModule(axiosClient, appId),
		connectors: createUserConnectorsModule(axiosClient, appId),
		auth: userAuthModule,
		functions: createFunctionsModule(functionsAxiosClient, appId, {
			getAuthHeaders: () => {
				const headers = { ...buildCommitHeaders };
				const currentToken = token || getAccessToken();
				if (currentToken) headers["Authorization"] = `Bearer ${currentToken}`;
				return headers;
			},
			baseURL: (_b = functionsAxiosClient.defaults) === null || _b === void 0 ? void 0 : _b.baseURL
		}),
		agents: createAgentsModule({
			axios: axiosClient,
			getSocket,
			appId,
			serverUrl,
			token
		}),
		aiGateway: createAiGatewayModule({
			serverUrl,
			token,
			appId,
			headers: aiGatewayHeaders
		}),
		appLogs: createAppLogsModule(axiosClient, appId),
		app: createAppModule(axiosClient, appId),
		users: createUsersModule(axiosClient, appId),
		payments: createPaymentsModule(axiosClient, appId),
		analytics: createAnalyticsModule({
			axiosClient,
			serverUrl,
			appId,
			userAuthModule,
			enabled: (_c = analytics === null || analytics === void 0 ? void 0 : analytics.enabled) !== null && _c !== void 0 ? _c : true
		}),
		actors: actorsModule.module,
		cleanup: () => {
			userModules.analytics.cleanup();
			actorsModule.closeAll();
			if (socket) socket.disconnect();
		}
	};
	const serviceRoleModules = {
		entities: createEntitiesModule({
			axios: serviceRoleAxiosClient,
			appId,
			getSocket
		}),
		integrations: createIntegrationsModule(serviceRoleAxiosClient, appId),
		sso: createSsoModule(serviceRoleAxiosClient, appId),
		browser: createBrowserModule(serviceRoleAxiosClient),
		voice: createVoiceModule(serviceRoleAxiosClient, { functionsVersion }),
		connectors: createConnectorsModule(serviceRoleAxiosClient, appId),
		functions: createFunctionsModule(serviceRoleFunctionsAxiosClient, appId, {
			getAuthHeaders: () => {
				const headers = {};
				if (serviceToken) headers["Authorization"] = `Bearer ${serviceToken}`;
				return headers;
			},
			baseURL: (_d = serviceRoleFunctionsAxiosClient.defaults) === null || _d === void 0 ? void 0 : _d.baseURL
		}),
		agents: createAgentsModule({
			axios: serviceRoleAxiosClient,
			getSocket,
			appId,
			serverUrl,
			token
		}),
		aiGateway: createAiGatewayModule({
			serverUrl,
			token: serviceToken,
			appId,
			headers: aiGatewayHeaders
		}),
		appLogs: createAppLogsModule(serviceRoleAxiosClient, appId),
		payments: createServiceRolePaymentsModule(serviceRoleAxiosClient, appId),
		cleanup: () => {
			if (socket) socket.disconnect();
		}
	};
	if (requiresAuth && typeof window !== "undefined") setTimeout(async () => {
		try {
			if (!await userModules.auth.isAuthenticated()) userModules.auth.redirectToLogin(window.location.href);
		} catch (error) {
			console.error("Authentication check failed:", error);
			userModules.auth.redirectToLogin(window.location.href);
		}
	}, 0);
	return {
		...userModules,
		/** See {@link Base44Client.fetchWithAuth}. */
		fetchWithAuth: createFetchWithAuth({
			axios: axiosClient,
			serviceRoleAxios: serviceRoleAxiosClient,
			appId: String(appId),
			serverUrl,
			functionsVersion,
			platformHeaders: optionalHeaders
		}),
		/**
		* Sets a new authentication token for all subsequent requests.
		*
		* @param newToken - The new authentication token
		*
		* @example
		* ```typescript
		* // Update token after login
		* const { access_token } = await base44.auth.loginViaEmailPassword(
		*   'user@example.com',
		*   'password'
		* );
		* base44.setToken(access_token);
		* ```
		*/
		setToken(newToken) {
			userModules.auth.setToken(newToken);
			if (socket) socket.updateConfig({ token: newToken });
			socketConfig.token = newToken;
		},
		/**
		* Gets the current client configuration.
		*
		* @internal
		*/
		getConfig() {
			return {
				serverUrl,
				appId,
				requiresAuth
			};
		},
		/**
		* Provides access to service role modules.
		*
		* Service role authentication provides elevated permissions for backend operations. Unlike user authentication, which is scoped to a specific user's permissions, service role authentication bypasses entity access rules and field-level security entirely, giving full read and write access to all of the app's data.
		*
		* @throws {Error} When accessed without providing a serviceToken during client creation.
		*
		* @example
		* ```typescript
		* const base44 = createClient({
		*   appId: 'my-app-id',
		*   serviceToken: 'service-role-token'
		* });
		*
		* // Read every user record, bypassing the User entity's access rules
		* const allUsers = await base44.asServiceRole.entities.User.list();
		* ```
		*/
		get asServiceRole() {
			if (!serviceToken) throw new Error("Service token is required to use asServiceRole. Please provide a serviceToken when creating the client.");
			return serviceRoleModules;
		}
	};
}
/**
* Creates a Base44 client from an HTTP request.
*
* This function is designed for use in Base44-hosted backend functions. For frontends and external backends, use {@linkcode createClient | createClient()} instead.
*
* When used in a Base44-hosted backend function, `createClientFromRequest()` automatically extracts authentication tokens from the request headers that Base44 injects when forwarding requests. The returned client includes service role access using `base44.asServiceRole`, which bypasses entity access rules and field-level security.
*
* To learn more about the Base44 client, see {@linkcode createClient | createClient()}.
*
* @param request - The incoming HTTP request object containing Base44 authentication headers.
* @returns A configured Base44 client instance with authentication from the incoming request.
*
* @example
* ```typescript
* // User authentication in backend function
* import { createClientFromRequest } from 'npm:@base44/sdk';
*
* Deno.serve(async (req) => {
*   try {
*     const base44 = createClientFromRequest(req);
*     const user = await base44.auth.me();
*
*     if (!user) {
*       return Response.json({ error: 'Unauthorized' }, { status: 401 });
*     }
*
*     // Access user's data
*     const userOrders = await base44.entities.Orders.filter({ userId: user.id });
*     return Response.json({ orders: userOrders });
*   } catch (error) {
*     return Response.json({ error: error.message }, { status: 500 });
*   }
* });
* ```
*
* @example
* ```typescript
* // Service role authentication in backend function
* import { createClientFromRequest } from 'npm:@base44/sdk';
*
* Deno.serve(async (req) => {
*   try {
*     const base44 = createClientFromRequest(req);
*
*     // Read across all users, bypassing the Orders entity's access rules
*     const recentOrders = await base44.asServiceRole.entities.Orders.list('-created_at', 50);
*
*     return Response.json({ orders: recentOrders });
*   } catch (error) {
*     return Response.json({ error: error.message }, { status: 500 });
*   }
* });
* ```
*
*/
function createClientFromRequest(request) {
	const authHeader = request.headers.get("Authorization");
	const serviceRoleAuthHeader = request.headers.get("Base44-Service-Authorization");
	const appId = request.headers.get("Base44-App-Id");
	const serverUrlHeader = request.headers.get("Base44-Api-Url");
	const functionsVersion = request.headers.get("Base44-Functions-Version");
	const stateHeader = request.headers.get("Base44-State");
	const dataEnvHeader = request.headers.get("X-Data-Env");
	if (!appId) throw new Error("Base44-App-Id header is required, but is was not found on the request");
	let serviceRoleToken;
	let userToken;
	if (serviceRoleAuthHeader !== null) {
		if (serviceRoleAuthHeader === "" || !serviceRoleAuthHeader.startsWith("Bearer ") || serviceRoleAuthHeader.split(" ").length !== 2) throw new Error("Invalid authorization header format. Expected \"Bearer <token>\"");
		serviceRoleToken = serviceRoleAuthHeader.split(" ")[1];
	}
	if (authHeader !== null) {
		if (authHeader === "" || !authHeader.startsWith("Bearer ") || authHeader.split(" ").length !== 2) throw new Error("Invalid authorization header format. Expected \"Bearer <token>\"");
		userToken = authHeader.split(" ")[1];
	}
	const additionalHeaders = {};
	if (stateHeader) additionalHeaders["Base44-State"] = stateHeader;
	if (dataEnvHeader === "dev" || dataEnvHeader === "prod") additionalHeaders["X-Data-Env"] = dataEnvHeader;
	return buildClient({
		serverUrl: serverUrlHeader || "https://base44.app",
		appId,
		token: userToken,
		serviceToken: serviceRoleToken,
		functionsVersion: functionsVersion !== null && functionsVersion !== void 0 ? functionsVersion : void 0,
		headers: additionalHeaders
	}, { sendBuildCommit: false });
}
export { createClient, createClientFromRequest, getAccessToken };
