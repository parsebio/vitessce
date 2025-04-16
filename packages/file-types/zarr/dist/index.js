var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter2) => {
  __accessCheck(obj, member, "write to private field");
  setter2 ? setter2.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _bytes, _encoder, _data, _stride, _TypedArray, _BYTES_PER_ELEMENT, _shape, _endian, _encoder_config, _decoder_config, _order, _inverseOrder, _shape2, _strides, _metadata, _metadata2, _a, _b, _overrides, _use_suffix_request, _merge_init, merge_init_fn, _overrides2, _refs, _opts, _overrides3;
class NodeNotFoundError extends Error {
  constructor(context, options = {}) {
    super(`Node not found: ${context}`, options);
    this.name = "NodeNotFoundError";
  }
}
class KeyError extends Error {
  constructor(path) {
    super(`Missing key: ${path}`);
    this.name = "KeyError";
  }
}
class BoolArray {
  constructor(x, byteOffset, length) {
    __privateAdd(this, _bytes, void 0);
    if (typeof x === "number") {
      __privateSet(this, _bytes, new Uint8Array(x));
    } else if (x instanceof ArrayBuffer) {
      __privateSet(this, _bytes, new Uint8Array(x, byteOffset, length));
    } else {
      __privateSet(this, _bytes, new Uint8Array(Array.from(x, (v) => v ? 1 : 0)));
    }
  }
  get BYTES_PER_ELEMENT() {
    return 1;
  }
  get byteOffset() {
    return __privateGet(this, _bytes).byteOffset;
  }
  get byteLength() {
    return __privateGet(this, _bytes).byteLength;
  }
  get buffer() {
    return __privateGet(this, _bytes).buffer;
  }
  get length() {
    return __privateGet(this, _bytes).length;
  }
  get(idx) {
    let value = __privateGet(this, _bytes)[idx];
    return typeof value === "number" ? value !== 0 : value;
  }
  set(idx, value) {
    __privateGet(this, _bytes)[idx] = value ? 1 : 0;
  }
  fill(value) {
    __privateGet(this, _bytes).fill(value ? 1 : 0);
  }
  *[Symbol.iterator]() {
    for (let i = 0; i < this.length; i++) {
      yield this.get(i);
    }
  }
}
_bytes = new WeakMap();
class ByteStringArray {
  constructor(chars, x, byteOffset, length) {
    __publicField(this, "_data");
    __publicField(this, "chars");
    __privateAdd(this, _encoder, void 0);
    this.chars = chars;
    __privateSet(this, _encoder, new TextEncoder());
    if (typeof x === "number") {
      this._data = new Uint8Array(x * chars);
    } else if (x instanceof ArrayBuffer) {
      if (length)
        length = length * chars;
      this._data = new Uint8Array(x, byteOffset, length);
    } else {
      let values = Array.from(x);
      this._data = new Uint8Array(values.length * chars);
      for (let i = 0; i < values.length; i++) {
        this.set(i, values[i]);
      }
    }
  }
  get BYTES_PER_ELEMENT() {
    return this.chars;
  }
  get byteOffset() {
    return this._data.byteOffset;
  }
  get byteLength() {
    return this._data.byteLength;
  }
  get buffer() {
    return this._data.buffer;
  }
  get length() {
    return this.byteLength / this.BYTES_PER_ELEMENT;
  }
  get(idx) {
    const view = new Uint8Array(this.buffer, this.byteOffset + this.chars * idx, this.chars);
    return new TextDecoder().decode(view).replace(/\x00/g, "");
  }
  set(idx, value) {
    const view = new Uint8Array(this.buffer, this.byteOffset + this.chars * idx, this.chars);
    view.fill(0);
    view.set(__privateGet(this, _encoder).encode(value));
  }
  fill(value) {
    const encoded = __privateGet(this, _encoder).encode(value);
    for (let i = 0; i < this.length; i++) {
      this._data.set(encoded, i * this.chars);
    }
  }
  *[Symbol.iterator]() {
    for (let i = 0; i < this.length; i++) {
      yield this.get(i);
    }
  }
}
_encoder = new WeakMap();
const _UnicodeStringArray = class {
  constructor(chars, x, byteOffset, length) {
    __privateAdd(this, _data, void 0);
    __publicField(this, "chars");
    this.chars = chars;
    if (typeof x === "number") {
      __privateSet(this, _data, new Int32Array(x * chars));
    } else if (x instanceof ArrayBuffer) {
      if (length)
        length *= chars;
      __privateSet(this, _data, new Int32Array(x, byteOffset, length));
    } else {
      const values = x;
      const d = new _UnicodeStringArray(chars, 1);
      __privateSet(this, _data, new Int32Array(function* () {
        for (let str of values) {
          d.set(0, str);
          yield* __privateGet(d, _data);
        }
      }()));
    }
  }
  get BYTES_PER_ELEMENT() {
    return __privateGet(this, _data).BYTES_PER_ELEMENT * this.chars;
  }
  get byteLength() {
    return __privateGet(this, _data).byteLength;
  }
  get byteOffset() {
    return __privateGet(this, _data).byteOffset;
  }
  get buffer() {
    return __privateGet(this, _data).buffer;
  }
  get length() {
    return __privateGet(this, _data).length / this.chars;
  }
  get(idx) {
    const offset = this.chars * idx;
    let result = "";
    for (let i = 0; i < this.chars; i++) {
      result += String.fromCodePoint(__privateGet(this, _data)[offset + i]);
    }
    return result.replace(/\u0000/g, "");
  }
  set(idx, value) {
    const offset = this.chars * idx;
    const view = __privateGet(this, _data).subarray(offset, offset + this.chars);
    view.fill(0);
    for (let i = 0; i < this.chars; i++) {
      view[i] = value.codePointAt(i) ?? 0;
    }
  }
  fill(value) {
    this.set(0, value);
    let encoded = __privateGet(this, _data).subarray(0, this.chars);
    for (let i = 1; i < this.length; i++) {
      __privateGet(this, _data).set(encoded, i * this.chars);
    }
  }
  *[Symbol.iterator]() {
    for (let i = 0; i < this.length; i++) {
      yield this.get(i);
    }
  }
};
let UnicodeStringArray = _UnicodeStringArray;
_data = new WeakMap();
function json_decode_object(bytes) {
  const str = new TextDecoder().decode(bytes);
  return JSON.parse(str);
}
function byteswap_inplace(view, bytes_per_element2) {
  const numFlips = bytes_per_element2 / 2;
  const endByteIndex = bytes_per_element2 - 1;
  let t2 = 0;
  for (let i = 0; i < view.length; i += bytes_per_element2) {
    for (let j = 0; j < numFlips; j += 1) {
      t2 = view[i + j];
      view[i + j] = view[i + endByteIndex - j];
      view[i + endByteIndex - j] = t2;
    }
  }
}
function get_ctr(data_type) {
  if (data_type === "v2:object") {
    return globalThis.Array;
  }
  let match = data_type.match(/v2:([US])(\d+)/);
  if (match) {
    let [, kind, chars] = match;
    return (kind === "U" ? UnicodeStringArray : ByteStringArray).bind(null, Number(chars));
  }
  let ctr = {
    int8: Int8Array,
    int16: Int16Array,
    int32: Int32Array,
    int64: globalThis.BigInt64Array,
    uint8: Uint8Array,
    uint16: Uint16Array,
    uint32: Uint32Array,
    uint64: globalThis.BigUint64Array,
    float16: globalThis.Float16Array,
    float32: Float32Array,
    float64: Float64Array,
    bool: BoolArray
  }[data_type];
  assert$1(ctr, `Unknown or unsupported data_type: ${data_type}`);
  return ctr;
}
function get_strides(shape, order) {
  const rank = shape.length;
  if (typeof order === "string") {
    order = order === "C" ? Array.from({ length: rank }, (_, i) => i) : Array.from({ length: rank }, (_, i) => rank - 1 - i);
  }
  assert$1(rank === order.length, "Order length must match the number of dimensions.");
  let step = 1;
  let stride = new Array(rank);
  for (let i = order.length - 1; i >= 0; i--) {
    stride[order[i]] = step;
    step *= shape[order[i]];
  }
  return stride;
}
function create_chunk_key_encoder({ name, configuration }) {
  if (name === "default") {
    const separator = (configuration == null ? void 0 : configuration.separator) ?? "/";
    return (chunk_coords) => ["c", ...chunk_coords].join(separator);
  }
  if (name === "v2") {
    const separator = (configuration == null ? void 0 : configuration.separator) ?? ".";
    return (chunk_coords) => chunk_coords.join(separator) || "0";
  }
  throw new Error(`Unknown chunk key encoding: ${name}`);
}
function coerce_dtype(dtype) {
  if (dtype === "|O") {
    return { data_type: "v2:object" };
  }
  let match = dtype.match(/^([<|>])(.*)$/);
  assert$1(match, `Invalid dtype: ${dtype}`);
  let [, endian, rest] = match;
  let data_type = {
    b1: "bool",
    i1: "int8",
    u1: "uint8",
    i2: "int16",
    u2: "uint16",
    i4: "int32",
    u4: "uint32",
    i8: "int64",
    u8: "uint64",
    f2: "float16",
    f4: "float32",
    f8: "float64"
  }[rest] ?? (rest.startsWith("S") || rest.startsWith("U") ? `v2:${rest}` : void 0);
  assert$1(data_type, `Unsupported or unknown dtype: ${dtype}`);
  if (endian === "|") {
    return { data_type };
  }
  return { data_type, endian: endian === "<" ? "little" : "big" };
}
function v2_to_v3_array_metadata(meta, attributes = {}) {
  let codecs = [];
  let dtype = coerce_dtype(meta.dtype);
  if (meta.order === "F") {
    codecs.push({ name: "transpose", configuration: { order: "F" } });
  }
  if ("endian" in dtype && dtype.endian === "big") {
    codecs.push({ name: "bytes", configuration: { endian: "big" } });
  }
  for (let { id, ...configuration } of meta.filters ?? []) {
    codecs.push({ name: id, configuration });
  }
  if (meta.compressor) {
    let { id, ...configuration } = meta.compressor;
    codecs.push({ name: id, configuration });
  }
  return {
    zarr_format: 3,
    node_type: "array",
    shape: meta.shape,
    data_type: dtype.data_type,
    chunk_grid: {
      name: "regular",
      configuration: {
        chunk_shape: meta.chunks
      }
    },
    chunk_key_encoding: {
      name: "v2",
      configuration: {
        separator: meta.dimension_separator ?? "."
      }
    },
    codecs,
    fill_value: meta.fill_value,
    attributes
  };
}
function v2_to_v3_group_metadata(_meta, attributes = {}) {
  return {
    zarr_format: 3,
    node_type: "group",
    attributes
  };
}
function is_dtype(dtype, query) {
  if (query !== "number" && query !== "bigint" && query !== "boolean" && query !== "object" && query !== "string") {
    return dtype === query;
  }
  let is_boolean = dtype === "bool";
  if (query === "boolean")
    return is_boolean;
  let is_string = dtype.startsWith("v2:U") || dtype.startsWith("v2:S");
  if (query === "string")
    return is_string;
  let is_bigint = dtype === "int64" || dtype === "uint64";
  if (query === "bigint")
    return is_bigint;
  let is_object = dtype === "v2:object";
  if (query === "object")
    return is_object;
  return !is_string && !is_bigint && !is_boolean && !is_object;
}
function is_sharding_codec(codec) {
  return (codec == null ? void 0 : codec.name) === "sharding_indexed";
}
function ensure_correct_scalar(metadata) {
  if ((metadata.data_type === "uint64" || metadata.data_type === "int64") && metadata.fill_value != null) {
    return BigInt(metadata.fill_value);
  }
  return metadata.fill_value;
}
function rethrow_unless(error, ...errors) {
  if (!errors.some((ErrorClass) => error instanceof ErrorClass)) {
    throw error;
  }
}
function assert$1(expression, msg = "") {
  if (!expression) {
    throw new Error(msg);
  }
}
class BitroundCodec {
  constructor(configuration, _meta) {
    __publicField(this, "kind", "array_to_array");
    assert$1(configuration.keepbits >= 0, "keepbits must be zero or positive");
  }
  static fromConfig(configuration, meta) {
    return new BitroundCodec(configuration, meta);
  }
  /**
   * Encode a chunk of data with bit-rounding.
   * @param _arr - The chunk to encode
   */
  encode(_arr) {
    throw new Error("`BitroundCodec.encode` is not implemented. Please open an issue at https://github.com/manzt/zarrita.js/issues.");
  }
  /**
   * Decode a chunk of data (no-op).
   * @param arr - The chunk to decode
   * @returns The decoded chunk
   */
  decode(arr) {
    return arr;
  }
}
const LITTLE_ENDIAN_OS = system_is_little_endian();
function system_is_little_endian() {
  const a = new Uint32Array([305419896]);
  const b = new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
  return !(b[0] === 18);
}
function bytes_per_element(TypedArray) {
  if ("BYTES_PER_ELEMENT" in TypedArray) {
    return TypedArray.BYTES_PER_ELEMENT;
  }
  return 4;
}
const _BytesCodec = class {
  constructor(configuration, meta) {
    __publicField(this, "kind", "array_to_bytes");
    __privateAdd(this, _stride, void 0);
    __privateAdd(this, _TypedArray, void 0);
    __privateAdd(this, _BYTES_PER_ELEMENT, void 0);
    __privateAdd(this, _shape, void 0);
    __privateAdd(this, _endian, void 0);
    __privateSet(this, _endian, configuration == null ? void 0 : configuration.endian);
    __privateSet(this, _TypedArray, get_ctr(meta.data_type));
    __privateSet(this, _shape, meta.shape);
    __privateSet(this, _stride, get_strides(meta.shape, "C"));
    const sample = new (__privateGet(this, _TypedArray))(0);
    __privateSet(this, _BYTES_PER_ELEMENT, sample.BYTES_PER_ELEMENT);
  }
  static fromConfig(configuration, meta) {
    return new _BytesCodec(configuration, meta);
  }
  encode(arr) {
    let bytes = new Uint8Array(arr.data.buffer);
    if (LITTLE_ENDIAN_OS && __privateGet(this, _endian) === "big") {
      byteswap_inplace(bytes, bytes_per_element(__privateGet(this, _TypedArray)));
    }
    return bytes;
  }
  decode(bytes) {
    if (LITTLE_ENDIAN_OS && __privateGet(this, _endian) === "big") {
      byteswap_inplace(bytes, bytes_per_element(__privateGet(this, _TypedArray)));
    }
    return {
      data: new (__privateGet(this, _TypedArray))(bytes.buffer, bytes.byteOffset, bytes.byteLength / __privateGet(this, _BYTES_PER_ELEMENT)),
      shape: __privateGet(this, _shape),
      stride: __privateGet(this, _stride)
    };
  }
};
let BytesCodec = _BytesCodec;
_stride = new WeakMap();
_TypedArray = new WeakMap();
_BYTES_PER_ELEMENT = new WeakMap();
_shape = new WeakMap();
_endian = new WeakMap();
class Crc32cCodec {
  constructor() {
    __publicField(this, "kind", "bytes_to_bytes");
  }
  static fromConfig() {
    return new Crc32cCodec();
  }
  encode(_) {
    throw new Error("Not implemented");
  }
  decode(arr) {
    return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength - 4);
  }
}
function throw_on_nan_replacer(_key, value) {
  assert$1(!Number.isNaN(value), "JsonCodec allow_nan is false but NaN was encountered during encoding.");
  assert$1(value !== Number.POSITIVE_INFINITY, "JsonCodec allow_nan is false but Infinity was encountered during encoding.");
  assert$1(value !== Number.NEGATIVE_INFINITY, "JsonCodec allow_nan is false but -Infinity was encountered during encoding.");
  return value;
}
function sort_keys_replacer(_key, value) {
  return value instanceof Object && !Array.isArray(value) ? Object.keys(value).sort().reduce((sorted, key) => {
    sorted[key] = value[key];
    return sorted;
  }, {}) : value;
}
const _JsonCodec = class {
  constructor(configuration = {}) {
    __publicField(this, "configuration");
    __publicField(this, "kind", "array_to_bytes");
    __privateAdd(this, _encoder_config, void 0);
    __privateAdd(this, _decoder_config, void 0);
    this.configuration = configuration;
    const { encoding = "utf-8", skipkeys = false, ensure_ascii = true, check_circular = true, allow_nan = true, sort_keys = true, indent, strict = true } = configuration;
    let separators = configuration.separators;
    if (!separators) {
      if (!indent) {
        separators = [",", ":"];
      } else {
        separators = [", ", ": "];
      }
    }
    __privateSet(this, _encoder_config, {
      encoding,
      skipkeys,
      ensure_ascii,
      check_circular,
      allow_nan,
      indent,
      separators,
      sort_keys
    });
    __privateSet(this, _decoder_config, { strict });
  }
  static fromConfig(configuration) {
    return new _JsonCodec(configuration);
  }
  encode(buf) {
    const { indent, encoding, ensure_ascii, check_circular, allow_nan, sort_keys } = __privateGet(this, _encoder_config);
    assert$1(encoding === "utf-8", "JsonCodec does not yet support non-utf-8 encoding.");
    const replacer_functions = [];
    assert$1(check_circular, "JsonCodec does not yet support skipping the check for circular references during encoding.");
    if (!allow_nan) {
      replacer_functions.push(throw_on_nan_replacer);
    }
    if (sort_keys) {
      replacer_functions.push(sort_keys_replacer);
    }
    const items = Array.from(buf.data);
    items.push("|O");
    items.push(buf.shape);
    let replacer = void 0;
    if (replacer_functions.length) {
      replacer = (key, value) => {
        let new_value = value;
        for (let sub_replacer of replacer_functions) {
          new_value = sub_replacer(key, new_value);
        }
        return new_value;
      };
    }
    let json_str = JSON.stringify(items, replacer, indent);
    if (ensure_ascii) {
      json_str = json_str.replace(/[\u007F-\uFFFF]/g, (chr) => {
        const full_str = `0000${chr.charCodeAt(0).toString(16)}`;
        const sub_str = full_str.substring(full_str.length - 4);
        return `\\u${sub_str}`;
      });
    }
    return new TextEncoder().encode(json_str);
  }
  decode(bytes) {
    const { strict } = __privateGet(this, _decoder_config);
    assert$1(strict, "JsonCodec does not yet support non-strict decoding.");
    const items = json_decode_object(bytes);
    const shape = items.pop();
    items.pop();
    assert$1(shape, "0D not implemented for JsonCodec.");
    const stride = get_strides(shape, "C");
    const data = items;
    return { data, shape, stride };
  }
};
let JsonCodec = _JsonCodec;
_encoder_config = new WeakMap();
_decoder_config = new WeakMap();
function proxy(arr) {
  if (arr instanceof BoolArray || arr instanceof ByteStringArray || arr instanceof UnicodeStringArray) {
    const arrp = new Proxy(arr, {
      get(target, prop) {
        return target.get(Number(prop));
      },
      set(target, prop, value) {
        target.set(Number(prop), value);
        return true;
      }
    });
    return arrp;
  }
  return arr;
}
function empty_like(chunk, order) {
  let data;
  if (chunk.data instanceof ByteStringArray || chunk.data instanceof UnicodeStringArray) {
    data = new chunk.constructor(
      // @ts-expect-error
      chunk.data.length,
      chunk.data.chars
    );
  } else {
    data = new chunk.constructor(chunk.data.length);
  }
  return {
    data,
    shape: chunk.shape,
    stride: get_strides(chunk.shape, order)
  };
}
function convert_array_order(src, target) {
  let out = empty_like(src, target);
  let n_dims = src.shape.length;
  let size = src.data.length;
  let index = Array(n_dims).fill(0);
  let src_data = proxy(src.data);
  let out_data = proxy(out.data);
  for (let src_idx = 0; src_idx < size; src_idx++) {
    let out_idx = 0;
    for (let dim = 0; dim < n_dims; dim++) {
      out_idx += index[dim] * out.stride[dim];
    }
    out_data[out_idx] = src_data[src_idx];
    index[0] += 1;
    for (let dim = 0; dim < n_dims; dim++) {
      if (index[dim] === src.shape[dim]) {
        if (dim + 1 === n_dims) {
          break;
        }
        index[dim] = 0;
        index[dim + 1] += 1;
      }
    }
  }
  return out;
}
function get_order(chunk) {
  let rank = chunk.shape.length;
  assert$1(rank === chunk.stride.length, "Shape and stride must have the same length.");
  return chunk.stride.map((s, i) => ({ stride: s, index: i })).sort((a, b) => b.stride - a.stride).map((entry) => entry.index);
}
function matches_order(chunk, target) {
  let source = get_order(chunk);
  assert$1(source.length === target.length, "Orders must match");
  return source.every((dim, i) => dim === target[i]);
}
const _TransposeCodec = class {
  constructor(configuration, meta) {
    __publicField(this, "kind", "array_to_array");
    __privateAdd(this, _order, void 0);
    __privateAdd(this, _inverseOrder, void 0);
    let value = configuration.order ?? "C";
    let rank = meta.shape.length;
    let order = new Array(rank);
    let inverseOrder = new Array(rank);
    if (value === "C") {
      for (let i = 0; i < rank; ++i) {
        order[i] = i;
        inverseOrder[i] = i;
      }
    } else if (value === "F") {
      for (let i = 0; i < rank; ++i) {
        order[i] = rank - i - 1;
        inverseOrder[i] = rank - i - 1;
      }
    } else {
      order = value;
      order.forEach((x, i) => {
        assert$1(inverseOrder[x] === void 0, `Invalid permutation: ${JSON.stringify(value)}`);
        inverseOrder[x] = i;
      });
    }
    __privateSet(this, _order, order);
    __privateSet(this, _inverseOrder, inverseOrder);
  }
  static fromConfig(configuration, meta) {
    return new _TransposeCodec(configuration, meta);
  }
  encode(arr) {
    if (matches_order(arr, __privateGet(this, _inverseOrder))) {
      return arr;
    }
    return convert_array_order(arr, __privateGet(this, _inverseOrder));
  }
  decode(arr) {
    return {
      data: arr.data,
      shape: arr.shape,
      stride: get_strides(arr.shape, __privateGet(this, _order))
    };
  }
};
let TransposeCodec = _TransposeCodec;
_order = new WeakMap();
_inverseOrder = new WeakMap();
const _VLenUTF8 = class {
  constructor(shape) {
    __publicField(this, "kind", "array_to_bytes");
    __privateAdd(this, _shape2, void 0);
    __privateAdd(this, _strides, void 0);
    __privateSet(this, _shape2, shape);
    __privateSet(this, _strides, get_strides(shape, "C"));
  }
  static fromConfig(_, meta) {
    return new _VLenUTF8(meta.shape);
  }
  encode(_chunk) {
    throw new Error("Method not implemented.");
  }
  decode(bytes) {
    let decoder = new TextDecoder();
    let view = new DataView(bytes.buffer);
    let data = Array(view.getUint32(0, true));
    let pos = 4;
    for (let i = 0; i < data.length; i++) {
      let item_length = view.getUint32(pos, true);
      pos += 4;
      data[i] = decoder.decode(bytes.buffer.slice(pos, pos + item_length));
      pos += item_length;
    }
    return { data, shape: __privateGet(this, _shape2), stride: __privateGet(this, _strides) };
  }
};
let VLenUTF8 = _VLenUTF8;
_shape2 = new WeakMap();
_strides = new WeakMap();
function create_default_registry() {
  return (/* @__PURE__ */ new Map()).set("blosc", () => import("./blosc-537fd004.js").then((m) => m.default)).set("gzip", () => import("./gzip-6a24f0fe.js").then((m) => m.default)).set("lz4", () => import("./lz4-bbd18009.js").then((m) => m.default)).set("zlib", () => import("./zlib-175cd38d.js").then((m) => m.default)).set("zstd", () => import("./zstd-561fda0e.js").then((m) => m.default)).set("transpose", () => TransposeCodec).set("bytes", () => BytesCodec).set("crc32c", () => Crc32cCodec).set("vlen-utf8", () => VLenUTF8).set("json2", () => JsonCodec).set("bitround", () => BitroundCodec);
}
const registry = create_default_registry();
function create_codec_pipeline(chunk_metadata) {
  let codecs;
  return {
    async encode(chunk) {
      if (!codecs)
        codecs = await load_codecs(chunk_metadata);
      for (const codec of codecs.array_to_array) {
        chunk = await codec.encode(chunk);
      }
      let bytes = await codecs.array_to_bytes.encode(chunk);
      for (const codec of codecs.bytes_to_bytes) {
        bytes = await codec.encode(bytes);
      }
      return bytes;
    },
    async decode(bytes) {
      if (!codecs)
        codecs = await load_codecs(chunk_metadata);
      for (let i = codecs.bytes_to_bytes.length - 1; i >= 0; i--) {
        bytes = await codecs.bytes_to_bytes[i].decode(bytes);
      }
      let chunk = await codecs.array_to_bytes.decode(bytes);
      for (let i = codecs.array_to_array.length - 1; i >= 0; i--) {
        chunk = await codecs.array_to_array[i].decode(chunk);
      }
      return chunk;
    }
  };
}
async function load_codecs(chunk_meta) {
  let promises = chunk_meta.codecs.map(async (meta) => {
    var _a2;
    let Codec = await ((_a2 = registry.get(meta.name)) == null ? void 0 : _a2());
    assert$1(Codec, `Unknown codec: ${meta.name}`);
    return { Codec, meta };
  });
  let array_to_array = [];
  let array_to_bytes;
  let bytes_to_bytes = [];
  for await (let { Codec, meta } of promises) {
    let codec = Codec.fromConfig(meta.configuration, chunk_meta);
    switch (codec.kind) {
      case "array_to_array":
        array_to_array.push(codec);
        break;
      case "array_to_bytes":
        array_to_bytes = codec;
        break;
      default:
        bytes_to_bytes.push(codec);
    }
  }
  if (!array_to_bytes) {
    assert$1(is_typed_array_like_meta(chunk_meta), `Cannot encode ${chunk_meta.data_type} to bytes without a codec`);
    array_to_bytes = BytesCodec.fromConfig({ endian: "little" }, chunk_meta);
  }
  return { array_to_array, array_to_bytes, bytes_to_bytes };
}
function is_typed_array_like_meta(meta) {
  return meta.data_type !== "v2:object";
}
const MAX_BIG_UINT = 18446744073709551615n;
function create_sharded_chunk_getter(location, shard_shape, encode_shard_key, sharding_config) {
  assert$1(location.store.getRange, "Store does not support range requests");
  let get_range = location.store.getRange.bind(location.store);
  let index_shape = shard_shape.map((d, i) => d / sharding_config.chunk_shape[i]);
  let index_codec = create_codec_pipeline({
    data_type: "uint64",
    shape: [...index_shape, 2],
    codecs: sharding_config.index_codecs
  });
  let cache = {};
  return async (chunk_coord) => {
    let shard_coord = chunk_coord.map((d, i) => Math.floor(d / index_shape[i]));
    let shard_path = location.resolve(encode_shard_key(shard_coord)).path;
    let index;
    if (shard_path in cache) {
      index = cache[shard_path];
    } else {
      let checksum_size = 4;
      let index_size = 16 * index_shape.reduce((a, b) => a * b, 1);
      let bytes = await get_range(shard_path, {
        suffixLength: index_size + checksum_size
      });
      index = cache[shard_path] = bytes ? await index_codec.decode(bytes) : null;
    }
    if (index === null) {
      return void 0;
    }
    let { data, shape, stride } = index;
    let linear_offset = chunk_coord.map((d, i) => d % shape[i]).reduce((acc, sel, idx) => acc + sel * stride[idx], 0);
    let offset = data[linear_offset];
    let length = data[linear_offset + 1];
    if (offset === MAX_BIG_UINT && length === MAX_BIG_UINT) {
      return void 0;
    }
    return get_range(shard_path, {
      offset: Number(offset),
      length: Number(length)
    });
  };
}
class Location {
  constructor(store, path = "/") {
    __publicField(this, "store");
    __publicField(this, "path");
    this.store = store;
    this.path = path;
  }
  resolve(path) {
    let root2 = new URL(`file://${this.path.endsWith("/") ? this.path : `${this.path}/`}`);
    return new Location(this.store, new URL(path, root2).pathname);
  }
}
function root$2(store) {
  return new Location(store ?? /* @__PURE__ */ new Map());
}
class Group extends Location {
  constructor(store, path, metadata) {
    super(store, path);
    __publicField(this, "kind", "group");
    __privateAdd(this, _metadata, void 0);
    __privateSet(this, _metadata, metadata);
  }
  get attrs() {
    return __privateGet(this, _metadata).attributes;
  }
}
_metadata = new WeakMap();
function get_array_order(codecs) {
  var _a2;
  const maybe_transpose_codec = codecs.find((c) => c.name === "transpose");
  return ((_a2 = maybe_transpose_codec == null ? void 0 : maybe_transpose_codec.configuration) == null ? void 0 : _a2.order) ?? "C";
}
const CONTEXT_MARKER = Symbol("zarrita.context");
function get_context(obj) {
  return obj[CONTEXT_MARKER];
}
function create_context(location, metadata) {
  let { configuration } = metadata.codecs.find(is_sharding_codec) ?? {};
  let shared_context = {
    encode_chunk_key: create_chunk_key_encoder(metadata.chunk_key_encoding),
    TypedArray: get_ctr(metadata.data_type),
    fill_value: metadata.fill_value
  };
  if (configuration) {
    let native_order2 = get_array_order(configuration.codecs);
    return {
      ...shared_context,
      kind: "sharded",
      chunk_shape: configuration.chunk_shape,
      codec: create_codec_pipeline({
        data_type: metadata.data_type,
        shape: configuration.chunk_shape,
        codecs: configuration.codecs
      }),
      get_strides(shape) {
        return get_strides(shape, native_order2);
      },
      get_chunk_bytes: create_sharded_chunk_getter(location, metadata.chunk_grid.configuration.chunk_shape, shared_context.encode_chunk_key, configuration)
    };
  }
  let native_order = get_array_order(metadata.codecs);
  return {
    ...shared_context,
    kind: "regular",
    chunk_shape: metadata.chunk_grid.configuration.chunk_shape,
    codec: create_codec_pipeline({
      data_type: metadata.data_type,
      shape: metadata.chunk_grid.configuration.chunk_shape,
      codecs: metadata.codecs
    }),
    get_strides(shape) {
      return get_strides(shape, native_order);
    },
    async get_chunk_bytes(chunk_coords, options) {
      let chunk_key = shared_context.encode_chunk_key(chunk_coords);
      let chunk_path = location.resolve(chunk_key).path;
      return location.store.get(chunk_path, options);
    }
  };
}
let Array$1 = (_b = class extends Location {
  constructor(store, path, metadata) {
    super(store, path);
    __publicField(this, "kind", "array");
    __privateAdd(this, _metadata2, void 0);
    __publicField(this, _a);
    __privateSet(this, _metadata2, {
      ...metadata,
      fill_value: ensure_correct_scalar(metadata)
    });
    this[CONTEXT_MARKER] = create_context(this, metadata);
  }
  get attrs() {
    return __privateGet(this, _metadata2).attributes;
  }
  get shape() {
    return __privateGet(this, _metadata2).shape;
  }
  get chunks() {
    return this[CONTEXT_MARKER].chunk_shape;
  }
  get dtype() {
    return __privateGet(this, _metadata2).data_type;
  }
  async getChunk(chunk_coords, options) {
    let context = this[CONTEXT_MARKER];
    let maybe_bytes = await context.get_chunk_bytes(chunk_coords, options);
    if (!maybe_bytes) {
      let size = context.chunk_shape.reduce((a, b) => a * b, 1);
      let data = new context.TypedArray(size);
      data.fill(context.fill_value);
      return {
        data,
        shape: context.chunk_shape,
        stride: context.get_strides(context.chunk_shape)
      };
    }
    return context.codec.decode(maybe_bytes);
  }
  /**
   * A helper method to narrow `zarr.Array` Dtype.
   *
   * ```typescript
   * let arr: zarr.Array<DataType, FetchStore> = zarr.open(store, { kind: "array" });
   *
   * // Option 1: narrow by scalar type (e.g. "bool", "raw", "bigint", "number")
   * if (arr.is("bigint")) {
   *   // zarr.Array<"int64" | "uint64", FetchStore>
   * }
   *
   * // Option 3: exact match
   * if (arr.is("float32")) {
   *   // zarr.Array<"float32", FetchStore, "/">
   * }
   * ```
   */
  is(query) {
    return is_dtype(this.dtype, query);
  }
}, _a = CONTEXT_MARKER, _metadata2 = new WeakMap(), _b);
let VERSION_COUNTER = create_version_counter();
function create_version_counter() {
  let version_counts = /* @__PURE__ */ new WeakMap();
  function get_counts(store) {
    let counts = version_counts.get(store) ?? { v2: 0, v3: 0 };
    version_counts.set(store, counts);
    return counts;
  }
  return {
    increment(store, version) {
      get_counts(store)[version] += 1;
    },
    version_max(store) {
      let counts = get_counts(store);
      return counts.v3 > counts.v2 ? "v3" : "v2";
    }
  };
}
async function load_attrs(location) {
  let meta_bytes = await location.store.get(location.resolve(".zattrs").path);
  if (!meta_bytes)
    return {};
  return json_decode_object(meta_bytes);
}
async function open_v2(location, options = {}) {
  let loc = "store" in location ? location : new Location(location);
  let attrs = {};
  if (options.attrs ?? true)
    attrs = await load_attrs(loc);
  if (options.kind === "array")
    return open_array_v2(loc, attrs);
  if (options.kind === "group")
    return open_group_v2(loc, attrs);
  return open_array_v2(loc, attrs).catch((err) => {
    rethrow_unless(err, NodeNotFoundError);
    return open_group_v2(loc, attrs);
  });
}
async function open_array_v2(location, attrs) {
  let { path } = location.resolve(".zarray");
  let meta = await location.store.get(path);
  if (!meta) {
    throw new NodeNotFoundError("v2 array", {
      cause: new KeyError(path)
    });
  }
  VERSION_COUNTER.increment(location.store, "v2");
  return new Array$1(location.store, location.path, v2_to_v3_array_metadata(json_decode_object(meta), attrs));
}
async function open_group_v2(location, attrs) {
  let { path } = location.resolve(".zgroup");
  let meta = await location.store.get(path);
  if (!meta) {
    throw new NodeNotFoundError("v2 group", {
      cause: new KeyError(path)
    });
  }
  VERSION_COUNTER.increment(location.store, "v2");
  return new Group(location.store, location.path, v2_to_v3_group_metadata(json_decode_object(meta), attrs));
}
async function _open_v3(location) {
  let { store, path } = location.resolve("zarr.json");
  let meta = await location.store.get(path);
  if (!meta) {
    throw new NodeNotFoundError("v3 array or group", {
      cause: new KeyError(path)
    });
  }
  let meta_doc = json_decode_object(meta);
  if (meta_doc.node_type === "array") {
    meta_doc.fill_value = ensure_correct_scalar(meta_doc);
  }
  return meta_doc.node_type === "array" ? new Array$1(store, location.path, meta_doc) : new Group(store, location.path, meta_doc);
}
async function open_v3(location, options = {}) {
  let loc = "store" in location ? location : new Location(location);
  let node = await _open_v3(loc);
  VERSION_COUNTER.increment(loc.store, "v3");
  if (options.kind === void 0)
    return node;
  if (options.kind === "array" && node instanceof Array$1)
    return node;
  if (options.kind === "group" && node instanceof Group)
    return node;
  let kind = node instanceof Array$1 ? "array" : "group";
  throw new Error(`Expected node of kind ${options.kind}, found ${kind}.`);
}
async function open(location, options = {}) {
  let store = "store" in location ? location.store : location;
  let version_max = VERSION_COUNTER.version_max(store);
  let open_primary = version_max === "v2" ? open.v2 : open.v3;
  let open_secondary = version_max === "v2" ? open.v3 : open.v2;
  return open_primary(location, options).catch((err) => {
    rethrow_unless(err, NodeNotFoundError);
    return open_secondary(location, options);
  });
}
open.v2 = open_v2;
open.v3 = open_v3;
function* range$4(start, stop, step = 1) {
  if (stop === void 0) {
    stop = start;
    start = 0;
  }
  for (let i = start; i < stop; i += step) {
    yield i;
  }
}
function* product$1(...iterables) {
  if (iterables.length === 0) {
    return;
  }
  const iterators = iterables.map((it) => it[Symbol.iterator]());
  const results = iterators.map((it) => it.next());
  if (results.some((r) => r.done)) {
    throw new Error("Input contains an empty iterator.");
  }
  for (let i = 0; ; ) {
    if (results[i].done) {
      iterators[i] = iterables[i][Symbol.iterator]();
      results[i] = iterators[i].next();
      if (++i >= iterators.length) {
        return;
      }
    } else {
      yield results.map(({ value }) => value);
      i = 0;
    }
    results[i] = iterators[i].next();
  }
}
function slice_indices({ start, stop, step }, length) {
  if (step === 0) {
    throw new Error("slice step cannot be zero");
  }
  step = step ?? 1;
  const step_is_negative = step < 0;
  const [lower, upper] = step_is_negative ? [-1, length - 1] : [0, length];
  if (start === null) {
    start = step_is_negative ? upper : lower;
  } else {
    if (start < 0) {
      start += length;
      if (start < lower) {
        start = lower;
      }
    } else if (start > upper) {
      start = upper;
    }
  }
  if (stop === null) {
    stop = step_is_negative ? lower : upper;
  } else {
    if (stop < 0) {
      stop += length;
      if (stop < lower) {
        stop = lower;
      }
    } else if (stop > upper) {
      stop = upper;
    }
  }
  return [start, stop, step];
}
function slice(start, stop, step = null) {
  if (stop === void 0) {
    stop = start;
    start = null;
  }
  return {
    start,
    stop,
    step
  };
}
function create_queue() {
  const promises = [];
  return {
    add: (fn) => promises.push(fn()),
    onIdle: () => Promise.all(promises)
  };
}
class IndexError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "IndexError";
  }
}
function err_too_many_indices(selection, shape) {
  throw new IndexError(`too many indicies for array; expected ${shape.length}, got ${selection.length}`);
}
function err_boundscheck(dim_len) {
  throw new IndexError(`index out of bounds for dimension with length ${dim_len}`);
}
function err_negative_step() {
  throw new IndexError("only slices with step >= 1 are supported");
}
function check_selection_length(selection, shape) {
  if (selection.length > shape.length) {
    err_too_many_indices(selection, shape);
  }
}
function normalize_integer_selection(dim_sel, dim_len) {
  dim_sel = Math.trunc(dim_sel);
  if (dim_sel < 0) {
    dim_sel = dim_len + dim_sel;
  }
  if (dim_sel >= dim_len || dim_sel < 0) {
    err_boundscheck(dim_len);
  }
  return dim_sel;
}
class IntDimIndexer {
  constructor({ dim_sel, dim_len, dim_chunk_len }) {
    __publicField(this, "dim_sel");
    __publicField(this, "dim_len");
    __publicField(this, "dim_chunk_len");
    __publicField(this, "nitems");
    dim_sel = normalize_integer_selection(dim_sel, dim_len);
    this.dim_sel = dim_sel;
    this.dim_len = dim_len;
    this.dim_chunk_len = dim_chunk_len;
    this.nitems = 1;
  }
  *[Symbol.iterator]() {
    const dim_chunk_ix = Math.floor(this.dim_sel / this.dim_chunk_len);
    const dim_offset = dim_chunk_ix * this.dim_chunk_len;
    const dim_chunk_sel = this.dim_sel - dim_offset;
    yield { dim_chunk_ix, dim_chunk_sel };
  }
}
class SliceDimIndexer {
  constructor({ dim_sel, dim_len, dim_chunk_len }) {
    __publicField(this, "start");
    __publicField(this, "stop");
    __publicField(this, "step");
    __publicField(this, "dim_len");
    __publicField(this, "dim_chunk_len");
    __publicField(this, "nitems");
    __publicField(this, "nchunks");
    const [start, stop, step] = slice_indices(dim_sel, dim_len);
    this.start = start;
    this.stop = stop;
    this.step = step;
    if (this.step < 1)
      err_negative_step();
    this.dim_len = dim_len;
    this.dim_chunk_len = dim_chunk_len;
    this.nitems = Math.max(0, Math.ceil((this.stop - this.start) / this.step));
    this.nchunks = Math.ceil(this.dim_len / this.dim_chunk_len);
  }
  *[Symbol.iterator]() {
    const dim_chunk_ix_from = Math.floor(this.start / this.dim_chunk_len);
    const dim_chunk_ix_to = Math.ceil(this.stop / this.dim_chunk_len);
    for (const dim_chunk_ix of range$4(dim_chunk_ix_from, dim_chunk_ix_to)) {
      const dim_offset = dim_chunk_ix * this.dim_chunk_len;
      const dim_limit = Math.min(this.dim_len, (dim_chunk_ix + 1) * this.dim_chunk_len);
      const dim_chunk_len = dim_limit - dim_offset;
      let dim_out_offset = 0;
      let dim_chunk_sel_start = 0;
      if (this.start < dim_offset) {
        const remainder = (dim_offset - this.start) % this.step;
        if (remainder)
          dim_chunk_sel_start += this.step - remainder;
        dim_out_offset = Math.ceil((dim_offset - this.start) / this.step);
      } else {
        dim_chunk_sel_start = this.start - dim_offset;
      }
      const dim_chunk_sel_stop = this.stop > dim_limit ? dim_chunk_len : this.stop - dim_offset;
      const dim_chunk_sel = [
        dim_chunk_sel_start,
        dim_chunk_sel_stop,
        this.step
      ];
      const dim_chunk_nitems = Math.ceil((dim_chunk_sel_stop - dim_chunk_sel_start) / this.step);
      const dim_out_sel = [
        dim_out_offset,
        dim_out_offset + dim_chunk_nitems,
        1
      ];
      yield { dim_chunk_ix, dim_chunk_sel, dim_out_sel };
    }
  }
}
function normalize_selection(selection, shape) {
  let normalized = [];
  if (selection === null) {
    normalized = shape.map((_) => slice(null));
  } else if (Array.isArray(selection)) {
    normalized = selection.map((s) => s ?? slice(null));
  }
  check_selection_length(normalized, shape);
  return normalized;
}
class BasicIndexer {
  constructor({ selection, shape, chunk_shape }) {
    __publicField(this, "dim_indexers");
    __publicField(this, "shape");
    this.dim_indexers = normalize_selection(selection, shape).map((dim_sel, i) => {
      return new (typeof dim_sel === "number" ? IntDimIndexer : SliceDimIndexer)({
        // @ts-expect-error ts inference not strong enough to know correct chunk
        dim_sel,
        dim_len: shape[i],
        dim_chunk_len: chunk_shape[i]
      });
    });
    this.shape = this.dim_indexers.filter((ixr) => ixr instanceof SliceDimIndexer).map((sixr) => sixr.nitems);
  }
  *[Symbol.iterator]() {
    for (const dim_projections of product$1(...this.dim_indexers)) {
      const chunk_coords = dim_projections.map((p) => p.dim_chunk_ix);
      const mapping = dim_projections.map((p) => {
        if ("dim_out_sel" in p) {
          return { from: p.dim_chunk_sel, to: p.dim_out_sel };
        }
        return { from: p.dim_chunk_sel, to: null };
      });
      yield { chunk_coords, mapping };
    }
  }
}
function unwrap(arr, idx) {
  return "get" in arr ? arr.get(idx) : arr[idx];
}
async function get$2(arr, selection, opts2, setter2) {
  var _a2;
  let context = get_context(arr);
  let indexer = new BasicIndexer({
    selection,
    shape: arr.shape,
    chunk_shape: arr.chunks
  });
  let out = setter2.prepare(new context.TypedArray(indexer.shape.reduce((a, b) => a * b, 1)), indexer.shape, context.get_strides(indexer.shape));
  let queue = ((_a2 = opts2.create_queue) == null ? void 0 : _a2.call(opts2)) ?? create_queue();
  for (const { chunk_coords, mapping } of indexer) {
    queue.add(async () => {
      let { data, shape, stride } = await arr.getChunk(chunk_coords, opts2.opts);
      let chunk = setter2.prepare(data, shape, stride);
      setter2.set_from_chunk(out, chunk, mapping);
    });
  }
  await queue.onIdle();
  return indexer.shape.length === 0 ? unwrap(out.data, 0) : out;
}
function object_array_view(arr, offset = 0, size) {
  let length = size ?? arr.length - offset;
  return {
    length,
    subarray(from, to = length) {
      return object_array_view(arr, offset + from, to - from);
    },
    set(data, start = 0) {
      for (let i = 0; i < data.length; i++) {
        arr[offset + start + i] = data.get(i);
      }
    },
    get(index) {
      return arr[offset + index];
    }
  };
}
function compat_chunk(arr) {
  if (globalThis.Array.isArray(arr.data)) {
    return {
      // @ts-expect-error
      data: object_array_view(arr.data),
      stride: arr.stride,
      bytes_per_element: 1
    };
  }
  return {
    data: new Uint8Array(arr.data.buffer, arr.data.byteOffset, arr.data.byteLength),
    stride: arr.stride,
    bytes_per_element: arr.data.BYTES_PER_ELEMENT
  };
}
function get_typed_array_constructor(arr) {
  if ("chars" in arr) {
    return arr.constructor.bind(null, arr.chars);
  }
  return arr.constructor;
}
function compat_scalar(arr, value) {
  if (globalThis.Array.isArray(arr.data)) {
    return object_array_view([value]);
  }
  let TypedArray = get_typed_array_constructor(arr.data);
  let data = new TypedArray([value]);
  return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
}
const setter = {
  prepare(data, shape, stride) {
    return { data, shape, stride };
  },
  set_scalar(dest, sel, value) {
    let view = compat_chunk(dest);
    set_scalar_binary(view, sel, compat_scalar(dest, value), view.bytes_per_element);
  },
  set_from_chunk(dest, src, projections) {
    let view = compat_chunk(dest);
    set_from_chunk_binary(view, compat_chunk(src), view.bytes_per_element, projections);
  }
};
async function get$1(arr, selection = null, opts2 = {}) {
  return get$2(arr, selection, opts2, setter);
}
function indices_len(start, stop, step) {
  if (step < 0 && stop < start) {
    return Math.floor((start - stop - 1) / -step) + 1;
  }
  if (start < stop)
    return Math.floor((stop - start - 1) / step) + 1;
  return 0;
}
function set_scalar_binary(out, out_selection, value, bytes_per_element2) {
  if (out_selection.length === 0) {
    out.data.set(value, 0);
    return;
  }
  const [slice2, ...slices] = out_selection;
  const [curr_stride, ...stride] = out.stride;
  if (typeof slice2 === "number") {
    const data = out.data.subarray(curr_stride * slice2 * bytes_per_element2);
    set_scalar_binary({ data, stride }, slices, value, bytes_per_element2);
    return;
  }
  const [from, to, step] = slice2;
  const len = indices_len(from, to, step);
  if (slices.length === 0) {
    for (let i = 0; i < len; i++) {
      out.data.set(value, curr_stride * (from + step * i) * bytes_per_element2);
    }
    return;
  }
  for (let i = 0; i < len; i++) {
    const data = out.data.subarray(curr_stride * (from + step * i) * bytes_per_element2);
    set_scalar_binary({ data, stride }, slices, value, bytes_per_element2);
  }
}
function set_from_chunk_binary(dest, src, bytes_per_element2, projections) {
  const [proj, ...projs] = projections;
  const [dstride, ...dstrides] = dest.stride;
  const [sstride, ...sstrides] = src.stride;
  if (proj.from === null) {
    if (projs.length === 0) {
      dest.data.set(src.data.subarray(0, bytes_per_element2), proj.to * bytes_per_element2);
      return;
    }
    set_from_chunk_binary({
      data: dest.data.subarray(dstride * proj.to * bytes_per_element2),
      stride: dstrides
    }, src, bytes_per_element2, projs);
    return;
  }
  if (proj.to === null) {
    if (projs.length === 0) {
      let offset = proj.from * bytes_per_element2;
      dest.data.set(src.data.subarray(offset, offset + bytes_per_element2), 0);
      return;
    }
    set_from_chunk_binary(dest, {
      data: src.data.subarray(sstride * proj.from * bytes_per_element2),
      stride: sstrides
    }, bytes_per_element2, projs);
    return;
  }
  const [from, to, step] = proj.to;
  const [sfrom, _, sstep] = proj.from;
  const len = indices_len(from, to, step);
  if (projs.length === 0) {
    if (step === 1 && sstep === 1 && dstride === 1 && sstride === 1) {
      let offset = sfrom * bytes_per_element2;
      let size = len * bytes_per_element2;
      dest.data.set(src.data.subarray(offset, offset + size), from * bytes_per_element2);
      return;
    }
    for (let i = 0; i < len; i++) {
      let offset = sstride * (sfrom + sstep * i) * bytes_per_element2;
      dest.data.set(src.data.subarray(offset, offset + bytes_per_element2), dstride * (from + step * i) * bytes_per_element2);
    }
    return;
  }
  for (let i = 0; i < len; i++) {
    set_from_chunk_binary({
      data: dest.data.subarray(dstride * (from + i * step) * bytes_per_element2),
      stride: dstrides
    }, {
      data: src.data.subarray(sstride * (sfrom + i * sstep) * bytes_per_element2),
      stride: sstrides
    }, bytes_per_element2, projs);
  }
}
function fetch_range$1(url, offset, length, opts2 = {}) {
  if (offset !== void 0 && length !== void 0) {
    opts2 = {
      ...opts2,
      headers: {
        ...opts2.headers,
        Range: `bytes=${offset}-${offset + length - 1}`
      }
    };
  }
  return fetch(url, opts2);
}
function merge_init$1(storeOverrides, requestOverrides) {
  return {
    ...storeOverrides,
    ...requestOverrides,
    headers: {
      ...storeOverrides.headers,
      ...requestOverrides.headers
    }
  };
}
function resolve(root2, path) {
  const base = typeof root2 === "string" ? new URL(root2) : root2;
  if (!base.pathname.endsWith("/")) {
    base.pathname += "/";
  }
  const resolved = new URL(path.slice(1), base);
  resolved.search = base.search;
  return resolved;
}
async function handle_response(response) {
  if (response.status === 404) {
    return void 0;
  }
  if (response.status === 200 || response.status === 206) {
    return new Uint8Array(await response.arrayBuffer());
  }
  throw new Error(`Unexpected response status ${response.status} ${response.statusText}`);
}
async function fetch_suffix(url, suffix_length, init, use_suffix_request) {
  if (use_suffix_request) {
    return fetch(url, {
      ...init,
      headers: { ...init.headers, Range: `bytes=-${suffix_length}` }
    });
  }
  let response = await fetch(url, { ...init, method: "HEAD" });
  if (!response.ok) {
    return response;
  }
  let content_length = response.headers.get("Content-Length");
  let length = Number(content_length);
  return fetch_range$1(url, length - suffix_length, length, init);
}
class FetchStore {
  constructor(url, options = {}) {
    __privateAdd(this, _merge_init);
    __publicField(this, "url");
    __privateAdd(this, _overrides, void 0);
    __privateAdd(this, _use_suffix_request, void 0);
    this.url = url;
    __privateSet(this, _overrides, options.overrides ?? {});
    __privateSet(this, _use_suffix_request, options.useSuffixRequest ?? false);
  }
  async get(key, options = {}) {
    let href = resolve(this.url, key).href;
    let response = await fetch(href, __privateMethod(this, _merge_init, merge_init_fn).call(this, options));
    return handle_response(response);
  }
  async getRange(key, range2, options = {}) {
    let url = resolve(this.url, key);
    let init = __privateMethod(this, _merge_init, merge_init_fn).call(this, options);
    let response;
    if ("suffixLength" in range2) {
      response = await fetch_suffix(url, range2.suffixLength, init, __privateGet(this, _use_suffix_request));
    } else {
      response = await fetch_range$1(url, range2.offset, range2.length, init);
    }
    return handle_response(response);
  }
}
_overrides = new WeakMap();
_use_suffix_request = new WeakMap();
_merge_init = new WeakSet();
merge_init_fn = function(overrides) {
  return merge_init$1(__privateGet(this, _overrides), overrides);
};
const FetchStore$1 = FetchStore;
function getV2DataType(dtype) {
  const mapping = {
    int8: "|i1",
    uint8: "|u1",
    int16: "<i2",
    uint16: "<u2",
    int32: "<i4",
    uint32: "<u4",
    int64: "<i8",
    uint64: "<u8",
    float32: "<f4",
    float64: "<f8"
  };
  if (!(dtype in mapping)) {
    throw new Error(`Unsupported dtype ${dtype}`);
  }
  return mapping[dtype];
}
function createZarrArrayAdapter(arr) {
  return new Proxy(arr, {
    get(target, prop) {
      if (prop === "getRaw") {
        return (selection) => get$1(target, selection ? selection.map((s) => {
          if (typeof s === "object" && s !== null) {
            return slice(s.start, s.stop, s.step);
          }
          return s;
        }) : target.shape.map(() => null));
      }
      if (prop === "getRawChunk") {
        throw new Error("getRawChunk should not have been called");
      }
      if (prop === "dtype") {
        return getV2DataType(target.dtype);
      }
      return Reflect.get(target, prop);
    }
  });
}
function readBlobAsArrayBuffer(blob) {
  if (blob.arrayBuffer) {
    return blob.arrayBuffer();
  }
  return new Promise((resolve2, reject) => {
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
      resolve2(reader.result);
    });
    reader.addEventListener("error", reject);
    reader.readAsArrayBuffer(blob);
  });
}
async function readBlobAsUint8Array(blob) {
  const arrayBuffer = await readBlobAsArrayBuffer(blob);
  return new Uint8Array(arrayBuffer);
}
function isBlob(v) {
  return typeof Blob !== "undefined" && v instanceof Blob;
}
function isSharedArrayBuffer(b) {
  return typeof SharedArrayBuffer !== "undefined" && b instanceof SharedArrayBuffer;
}
const isNode = typeof process !== "undefined" && process.versions && typeof process.versions.node !== "undefined" && typeof process.versions.electron === "undefined";
function isTypedArraySameAsArrayBuffer(typedArray) {
  return typedArray.byteOffset === 0 && typedArray.byteLength === typedArray.buffer.byteLength;
}
class ArrayBufferReader {
  constructor(arrayBufferOrView) {
    this.typedArray = arrayBufferOrView instanceof ArrayBuffer || isSharedArrayBuffer(arrayBufferOrView) ? new Uint8Array(arrayBufferOrView) : new Uint8Array(arrayBufferOrView.buffer, arrayBufferOrView.byteOffset, arrayBufferOrView.byteLength);
  }
  async getLength() {
    return this.typedArray.byteLength;
  }
  async read(offset, length) {
    return new Uint8Array(this.typedArray.buffer, this.typedArray.byteOffset + offset, length);
  }
}
let BlobReader$1 = class BlobReader {
  constructor(blob) {
    this.blob = blob;
  }
  async getLength() {
    return this.blob.size;
  }
  async read(offset, length) {
    const blob = this.blob.slice(offset, offset + length);
    const arrayBuffer = await readBlobAsArrayBuffer(blob);
    return new Uint8Array(arrayBuffer);
  }
  async sliceAsBlob(offset, length, type = "") {
    return this.blob.slice(offset, offset + length, type);
  }
};
function inflate(data, buf) {
  var u8 = Uint8Array;
  if (data[0] == 3 && data[1] == 0)
    return buf ? buf : new u8(0);
  var bitsF = _bitsF, bitsE = _bitsE, decodeTiny = _decodeTiny, get17 = _get17;
  var noBuf = buf == null;
  if (noBuf)
    buf = new u8(data.length >>> 2 << 3);
  var BFINAL = 0, BTYPE = 0, HLIT = 0, HDIST = 0, HCLEN = 0, ML = 0, MD = 0;
  var off = 0, pos = 0;
  var lmap, dmap;
  while (BFINAL == 0) {
    BFINAL = bitsF(data, pos, 1);
    BTYPE = bitsF(data, pos + 1, 2);
    pos += 3;
    if (BTYPE == 0) {
      if ((pos & 7) != 0)
        pos += 8 - (pos & 7);
      var p8 = (pos >>> 3) + 4, len = data[p8 - 4] | data[p8 - 3] << 8;
      if (noBuf)
        buf = _check(buf, off + len);
      buf.set(new u8(data.buffer, data.byteOffset + p8, len), off);
      pos = p8 + len << 3;
      off += len;
      continue;
    }
    if (noBuf)
      buf = _check(buf, off + (1 << 17));
    if (BTYPE == 1) {
      lmap = U.flmap;
      dmap = U.fdmap;
      ML = (1 << 9) - 1;
      MD = (1 << 5) - 1;
    }
    if (BTYPE == 2) {
      HLIT = bitsE(data, pos, 5) + 257;
      HDIST = bitsE(data, pos + 5, 5) + 1;
      HCLEN = bitsE(data, pos + 10, 4) + 4;
      pos += 14;
      for (var i = 0; i < 38; i += 2) {
        U.itree[i] = 0;
        U.itree[i + 1] = 0;
      }
      var tl = 1;
      for (var i = 0; i < HCLEN; i++) {
        var l = bitsE(data, pos + i * 3, 3);
        U.itree[(U.ordr[i] << 1) + 1] = l;
        if (l > tl)
          tl = l;
      }
      pos += 3 * HCLEN;
      makeCodes(U.itree, tl);
      codes2map(U.itree, tl, U.imap);
      lmap = U.lmap;
      dmap = U.dmap;
      pos = decodeTiny(U.imap, (1 << tl) - 1, HLIT + HDIST, data, pos, U.ttree);
      var mx0 = _copyOut(U.ttree, 0, HLIT, U.ltree);
      ML = (1 << mx0) - 1;
      var mx1 = _copyOut(U.ttree, HLIT, HDIST, U.dtree);
      MD = (1 << mx1) - 1;
      makeCodes(U.ltree, mx0);
      codes2map(U.ltree, mx0, lmap);
      makeCodes(U.dtree, mx1);
      codes2map(U.dtree, mx1, dmap);
    }
    while (true) {
      var code = lmap[get17(data, pos) & ML];
      pos += code & 15;
      var lit = code >>> 4;
      if (lit >>> 8 == 0) {
        buf[off++] = lit;
      } else if (lit == 256) {
        break;
      } else {
        var end = off + lit - 254;
        if (lit > 264) {
          var ebs = U.ldef[lit - 257];
          end = off + (ebs >>> 3) + bitsE(data, pos, ebs & 7);
          pos += ebs & 7;
        }
        var dcode = dmap[get17(data, pos) & MD];
        pos += dcode & 15;
        var dlit = dcode >>> 4;
        var dbs = U.ddef[dlit], dst = (dbs >>> 4) + bitsF(data, pos, dbs & 15);
        pos += dbs & 15;
        if (noBuf)
          buf = _check(buf, off + (1 << 17));
        while (off < end) {
          buf[off] = buf[off++ - dst];
          buf[off] = buf[off++ - dst];
          buf[off] = buf[off++ - dst];
          buf[off] = buf[off++ - dst];
        }
        off = end;
      }
    }
  }
  return buf.length == off ? buf : buf.slice(0, off);
}
function _check(buf, len) {
  var bl = buf.length;
  if (len <= bl)
    return buf;
  var nbuf = new Uint8Array(Math.max(bl << 1, len));
  nbuf.set(buf, 0);
  return nbuf;
}
function _decodeTiny(lmap, LL, len, data, pos, tree) {
  var bitsE = _bitsE, get17 = _get17;
  var i = 0;
  while (i < len) {
    var code = lmap[get17(data, pos) & LL];
    pos += code & 15;
    var lit = code >>> 4;
    if (lit <= 15) {
      tree[i] = lit;
      i++;
    } else {
      var ll = 0, n = 0;
      if (lit == 16) {
        n = 3 + bitsE(data, pos, 2);
        pos += 2;
        ll = tree[i - 1];
      } else if (lit == 17) {
        n = 3 + bitsE(data, pos, 3);
        pos += 3;
      } else if (lit == 18) {
        n = 11 + bitsE(data, pos, 7);
        pos += 7;
      }
      var ni = i + n;
      while (i < ni) {
        tree[i] = ll;
        i++;
      }
    }
  }
  return pos;
}
function _copyOut(src, off, len, tree) {
  var mx = 0, i = 0, tl = tree.length >>> 1;
  while (i < len) {
    var v = src[i + off];
    tree[i << 1] = 0;
    tree[(i << 1) + 1] = v;
    if (v > mx)
      mx = v;
    i++;
  }
  while (i < tl) {
    tree[i << 1] = 0;
    tree[(i << 1) + 1] = 0;
    i++;
  }
  return mx;
}
function makeCodes(tree, MAX_BITS) {
  var max_code = tree.length;
  var code, bits, n, i, len;
  var bl_count = U.bl_count;
  for (var i = 0; i <= MAX_BITS; i++)
    bl_count[i] = 0;
  for (i = 1; i < max_code; i += 2)
    bl_count[tree[i]]++;
  var next_code = U.next_code;
  code = 0;
  bl_count[0] = 0;
  for (bits = 1; bits <= MAX_BITS; bits++) {
    code = code + bl_count[bits - 1] << 1;
    next_code[bits] = code;
  }
  for (n = 0; n < max_code; n += 2) {
    len = tree[n + 1];
    if (len != 0) {
      tree[n] = next_code[len];
      next_code[len]++;
    }
  }
}
function codes2map(tree, MAX_BITS, map) {
  var max_code = tree.length;
  var r15 = U.rev15;
  for (var i = 0; i < max_code; i += 2)
    if (tree[i + 1] != 0) {
      var lit = i >> 1;
      var cl = tree[i + 1], val = lit << 4 | cl;
      var rest = MAX_BITS - cl, i0 = tree[i] << rest, i1 = i0 + (1 << rest);
      while (i0 != i1) {
        var p0 = r15[i0] >>> 15 - MAX_BITS;
        map[p0] = val;
        i0++;
      }
    }
}
function revCodes(tree, MAX_BITS) {
  var r15 = U.rev15, imb = 15 - MAX_BITS;
  for (var i = 0; i < tree.length; i += 2) {
    var i0 = tree[i] << MAX_BITS - tree[i + 1];
    tree[i] = r15[i0] >>> imb;
  }
}
function _bitsE(dt, pos, length) {
  return (dt[pos >>> 3] | dt[(pos >>> 3) + 1] << 8) >>> (pos & 7) & (1 << length) - 1;
}
function _bitsF(dt, pos, length) {
  return (dt[pos >>> 3] | dt[(pos >>> 3) + 1] << 8 | dt[(pos >>> 3) + 2] << 16) >>> (pos & 7) & (1 << length) - 1;
}
function _get17(dt, pos) {
  return (dt[pos >>> 3] | dt[(pos >>> 3) + 1] << 8 | dt[(pos >>> 3) + 2] << 16) >>> (pos & 7);
}
const U = function() {
  var u16 = Uint16Array, u32 = Uint32Array;
  return {
    next_code: new u16(16),
    bl_count: new u16(16),
    ordr: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
    of0: [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 999, 999, 999],
    exb: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0],
    ldef: new u16(32),
    df0: [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535],
    dxb: [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0],
    ddef: new u32(32),
    flmap: new u16(512),
    fltree: [],
    fdmap: new u16(32),
    fdtree: [],
    lmap: new u16(32768),
    ltree: [],
    ttree: [],
    dmap: new u16(32768),
    dtree: [],
    imap: new u16(512),
    itree: [],
    //rev9 : new u16(  512)
    rev15: new u16(1 << 15),
    lhst: new u32(286),
    dhst: new u32(30),
    ihst: new u32(19),
    lits: new u32(15e3),
    strt: new u16(1 << 16),
    prev: new u16(1 << 15)
  };
}();
(function() {
  var len = 1 << 15;
  for (var i = 0; i < len; i++) {
    var x = i;
    x = (x & 2863311530) >>> 1 | (x & 1431655765) << 1;
    x = (x & 3435973836) >>> 2 | (x & 858993459) << 2;
    x = (x & 4042322160) >>> 4 | (x & 252645135) << 4;
    x = (x & 4278255360) >>> 8 | (x & 16711935) << 8;
    U.rev15[i] = (x >>> 16 | x << 16) >>> 17;
  }
  function pushV(tgt, n, sv) {
    while (n-- != 0)
      tgt.push(0, sv);
  }
  for (var i = 0; i < 32; i++) {
    U.ldef[i] = U.of0[i] << 3 | U.exb[i];
    U.ddef[i] = U.df0[i] << 4 | U.dxb[i];
  }
  pushV(U.fltree, 144, 8);
  pushV(U.fltree, 255 - 143, 9);
  pushV(U.fltree, 279 - 255, 7);
  pushV(U.fltree, 287 - 279, 8);
  makeCodes(U.fltree, 9);
  codes2map(U.fltree, 9, U.flmap);
  revCodes(U.fltree, 9);
  pushV(U.fdtree, 32, 5);
  makeCodes(U.fdtree, 5);
  codes2map(U.fdtree, 5, U.fdmap);
  revCodes(U.fdtree, 5);
  pushV(U.itree, 19, 0);
  pushV(U.ltree, 286, 0);
  pushV(U.dtree, 30, 0);
  pushV(U.ttree, 320, 0);
})();
const crc = {
  table: function() {
    var tab = new Uint32Array(256);
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) {
        if (c & 1)
          c = 3988292384 ^ c >>> 1;
        else
          c = c >>> 1;
      }
      tab[n] = c;
    }
    return tab;
  }(),
  update: function(c, buf, off, len) {
    for (var i = 0; i < len; i++)
      c = crc.table[(c ^ buf[off + i]) & 255] ^ c >>> 8;
    return c;
  },
  crc: function(b, o, l) {
    return crc.update(4294967295, b, o, l) ^ 4294967295;
  }
};
function inflateRaw(file, buf) {
  return inflate(file, buf);
}
const config = {
  numWorkers: 1,
  workerURL: "",
  useWorkers: false
};
let nextId = 0;
const waitingForWorkerQueue = [];
function startWorker(url) {
  return new Promise((resolve2, reject) => {
    const worker = new Worker(url);
    worker.onmessage = (e) => {
      if (e.data === "start") {
        worker.onerror = void 0;
        worker.onmessage = void 0;
        resolve2(worker);
      } else {
        reject(new Error(`unexpected message: ${e.data}`));
      }
    };
    worker.onerror = reject;
  });
}
function dynamicRequire(mod, request) {
  return mod.require ? mod.require(request) : {};
}
(function() {
  if (isNode) {
    const { Worker: Worker2 } = dynamicRequire(module, "worker_threads");
    return {
      async createWorker(url) {
        return new Worker2(url);
      },
      addEventListener(worker, fn) {
        worker.on("message", (data) => {
          fn({ target: worker, data });
        });
      },
      async terminate(worker) {
        await worker.terminate();
      }
    };
  } else {
    return {
      async createWorker(url) {
        try {
          const worker = await startWorker(url);
          return worker;
        } catch (e) {
          console.warn("could not load worker:", url);
        }
        let text;
        try {
          const req = await fetch(url, { mode: "cors" });
          if (!req.ok) {
            throw new Error(`could not load: ${url}`);
          }
          text = await req.text();
          url = URL.createObjectURL(new Blob([text], { type: "application/javascript" }));
          const worker = await startWorker(url);
          config.workerURL = url;
          return worker;
        } catch (e) {
          console.warn("could not load worker via fetch:", url);
        }
        if (text !== void 0) {
          try {
            url = `data:application/javascript;base64,${btoa(text)}`;
            const worker = await startWorker(url);
            config.workerURL = url;
            return worker;
          } catch (e) {
            console.warn("could not load worker via dataURI");
          }
        }
        console.warn("workers will not be used");
        throw new Error("can not start workers");
      },
      addEventListener(worker, fn) {
        worker.addEventListener("message", fn);
      },
      async terminate(worker) {
        worker.terminate();
      }
    };
  }
})();
function inflateRawLocal(src, uncompressedSize, type, resolve2) {
  const dst = new Uint8Array(uncompressedSize);
  inflateRaw(src, dst);
  resolve2(type ? new Blob([dst], { type }) : dst.buffer);
}
async function processWaitingForWorkerQueue() {
  if (waitingForWorkerQueue.length === 0) {
    return;
  }
  while (waitingForWorkerQueue.length) {
    const { src, uncompressedSize, type, resolve: resolve2 } = waitingForWorkerQueue.shift();
    let data = src;
    if (isBlob(src)) {
      data = await readBlobAsUint8Array(src);
    }
    inflateRawLocal(data, uncompressedSize, type, resolve2);
  }
}
function inflateRawAsync(src, uncompressedSize, type) {
  return new Promise((resolve2, reject) => {
    waitingForWorkerQueue.push({ src, uncompressedSize, type, resolve: resolve2, reject, id: nextId++ });
    processWaitingForWorkerQueue();
  });
}
function dosDateTimeToDate(date, time) {
  const day = date & 31;
  const month = (date >> 5 & 15) - 1;
  const year = (date >> 9 & 127) + 1980;
  const millisecond = 0;
  const second = (time & 31) * 2;
  const minute = time >> 5 & 63;
  const hour = time >> 11 & 31;
  return new Date(year, month, day, hour, minute, second, millisecond);
}
class ZipEntry {
  constructor(reader, rawEntry) {
    this._reader = reader;
    this._rawEntry = rawEntry;
    this.name = rawEntry.name;
    this.nameBytes = rawEntry.nameBytes;
    this.size = rawEntry.uncompressedSize;
    this.compressedSize = rawEntry.compressedSize;
    this.comment = rawEntry.comment;
    this.commentBytes = rawEntry.commentBytes;
    this.compressionMethod = rawEntry.compressionMethod;
    this.lastModDate = dosDateTimeToDate(rawEntry.lastModFileDate, rawEntry.lastModFileTime);
    this.isDirectory = rawEntry.uncompressedSize === 0 && rawEntry.name.endsWith("/");
    this.encrypted = !!(rawEntry.generalPurposeBitFlag & 1);
    this.externalFileAttributes = rawEntry.externalFileAttributes;
    this.versionMadeBy = rawEntry.versionMadeBy;
  }
  // returns a promise that returns a Blob for this entry
  async blob(type = "application/octet-stream") {
    return await readEntryDataAsBlob(this._reader, this._rawEntry, type);
  }
  // returns a promise that returns an ArrayBuffer for this entry
  async arrayBuffer() {
    return await readEntryDataAsArrayBuffer(this._reader, this._rawEntry);
  }
  // returns text, assumes the text is valid utf8. If you want more options decode arrayBuffer yourself
  async text() {
    const buffer = await this.arrayBuffer();
    return decodeBuffer(new Uint8Array(buffer));
  }
  // returns text with JSON.parse called on it. If you want more options decode arrayBuffer yourself
  async json() {
    const text = await this.text();
    return JSON.parse(text);
  }
}
const EOCDR_WITHOUT_COMMENT_SIZE = 22;
const MAX_COMMENT_SIZE = 65535;
const EOCDR_SIGNATURE = 101010256;
const ZIP64_EOCDR_SIGNATURE = 101075792;
async function readAs(reader, offset, length) {
  return await reader.read(offset, length);
}
async function readAsBlobOrTypedArray(reader, offset, length, type) {
  if (reader.sliceAsBlob) {
    return await reader.sliceAsBlob(offset, length, type);
  }
  return await reader.read(offset, length);
}
const crc$1 = {
  unsigned() {
    return 0;
  }
};
function getUint16LE(uint8View, offset) {
  return uint8View[offset] + uint8View[offset + 1] * 256;
}
function getUint32LE(uint8View, offset) {
  return uint8View[offset] + uint8View[offset + 1] * 256 + uint8View[offset + 2] * 65536 + uint8View[offset + 3] * 16777216;
}
function getUint64LE(uint8View, offset) {
  return getUint32LE(uint8View, offset) + getUint32LE(uint8View, offset + 4) * 4294967296;
}
const utf8Decoder = new TextDecoder();
function decodeBuffer(uint8View, isUTF8) {
  if (isSharedArrayBuffer(uint8View.buffer)) {
    uint8View = new Uint8Array(uint8View);
  }
  return utf8Decoder.decode(uint8View);
}
async function findEndOfCentralDirector(reader, totalLength) {
  const size = Math.min(EOCDR_WITHOUT_COMMENT_SIZE + MAX_COMMENT_SIZE, totalLength);
  const readStart = totalLength - size;
  const data = await readAs(reader, readStart, size);
  for (let i = size - EOCDR_WITHOUT_COMMENT_SIZE; i >= 0; --i) {
    if (getUint32LE(data, i) !== EOCDR_SIGNATURE) {
      continue;
    }
    const eocdr = new Uint8Array(data.buffer, data.byteOffset + i, data.byteLength - i);
    const diskNumber = getUint16LE(eocdr, 4);
    if (diskNumber !== 0) {
      throw new Error(`multi-volume zip files are not supported. This is volume: ${diskNumber}`);
    }
    const entryCount = getUint16LE(eocdr, 10);
    const centralDirectorySize = getUint32LE(eocdr, 12);
    const centralDirectoryOffset = getUint32LE(eocdr, 16);
    const commentLength = getUint16LE(eocdr, 20);
    const expectedCommentLength = eocdr.length - EOCDR_WITHOUT_COMMENT_SIZE;
    if (commentLength !== expectedCommentLength) {
      throw new Error(`invalid comment length. expected: ${expectedCommentLength}, actual: ${commentLength}`);
    }
    const commentBytes = new Uint8Array(eocdr.buffer, eocdr.byteOffset + 22, commentLength);
    const comment = decodeBuffer(commentBytes);
    if (entryCount === 65535 || centralDirectoryOffset === 4294967295) {
      return await readZip64CentralDirectory(reader, readStart + i, comment, commentBytes);
    } else {
      return await readEntries(reader, centralDirectoryOffset, centralDirectorySize, entryCount, comment, commentBytes);
    }
  }
  throw new Error("could not find end of central directory. maybe not zip file");
}
const END_OF_CENTRAL_DIRECTORY_LOCATOR_SIGNATURE = 117853008;
async function readZip64CentralDirectory(reader, offset, comment, commentBytes) {
  const zip64EocdlOffset = offset - 20;
  const eocdl = await readAs(reader, zip64EocdlOffset, 20);
  if (getUint32LE(eocdl, 0) !== END_OF_CENTRAL_DIRECTORY_LOCATOR_SIGNATURE) {
    throw new Error("invalid zip64 end of central directory locator signature");
  }
  const zip64EocdrOffset = getUint64LE(eocdl, 8);
  const zip64Eocdr = await readAs(reader, zip64EocdrOffset, 56);
  if (getUint32LE(zip64Eocdr, 0) !== ZIP64_EOCDR_SIGNATURE) {
    throw new Error("invalid zip64 end of central directory record signature");
  }
  const entryCount = getUint64LE(zip64Eocdr, 32);
  const centralDirectorySize = getUint64LE(zip64Eocdr, 40);
  const centralDirectoryOffset = getUint64LE(zip64Eocdr, 48);
  return readEntries(reader, centralDirectoryOffset, centralDirectorySize, entryCount, comment, commentBytes);
}
const CENTRAL_DIRECTORY_FILE_HEADER_SIGNATURE = 33639248;
async function readEntries(reader, centralDirectoryOffset, centralDirectorySize, rawEntryCount, comment, commentBytes) {
  let readEntryCursor = 0;
  const allEntriesBuffer = await readAs(reader, centralDirectoryOffset, centralDirectorySize);
  const rawEntries = [];
  for (let e = 0; e < rawEntryCount; ++e) {
    const buffer = allEntriesBuffer.subarray(readEntryCursor, readEntryCursor + 46);
    const signature = getUint32LE(buffer, 0);
    if (signature !== CENTRAL_DIRECTORY_FILE_HEADER_SIGNATURE) {
      throw new Error(`invalid central directory file header signature: 0x${signature.toString(16)}`);
    }
    const rawEntry = {
      // 4 - Version made by
      versionMadeBy: getUint16LE(buffer, 4),
      // 6 - Version needed to extract (minimum)
      versionNeededToExtract: getUint16LE(buffer, 6),
      // 8 - General purpose bit flag
      generalPurposeBitFlag: getUint16LE(buffer, 8),
      // 10 - Compression method
      compressionMethod: getUint16LE(buffer, 10),
      // 12 - File last modification time
      lastModFileTime: getUint16LE(buffer, 12),
      // 14 - File last modification date
      lastModFileDate: getUint16LE(buffer, 14),
      // 16 - CRC-32
      crc32: getUint32LE(buffer, 16),
      // 20 - Compressed size
      compressedSize: getUint32LE(buffer, 20),
      // 24 - Uncompressed size
      uncompressedSize: getUint32LE(buffer, 24),
      // 28 - File name length (n)
      fileNameLength: getUint16LE(buffer, 28),
      // 30 - Extra field length (m)
      extraFieldLength: getUint16LE(buffer, 30),
      // 32 - File comment length (k)
      fileCommentLength: getUint16LE(buffer, 32),
      // 34 - Disk number where file starts
      // 36 - Internal file attributes
      internalFileAttributes: getUint16LE(buffer, 36),
      // 38 - External file attributes
      externalFileAttributes: getUint32LE(buffer, 38),
      // 42 - Relative offset of local file header
      relativeOffsetOfLocalHeader: getUint32LE(buffer, 42)
    };
    if (rawEntry.generalPurposeBitFlag & 64) {
      throw new Error("strong encryption is not supported");
    }
    readEntryCursor += 46;
    const data = allEntriesBuffer.subarray(readEntryCursor, readEntryCursor + rawEntry.fileNameLength + rawEntry.extraFieldLength + rawEntry.fileCommentLength);
    rawEntry.nameBytes = data.slice(0, rawEntry.fileNameLength);
    rawEntry.name = decodeBuffer(rawEntry.nameBytes);
    const fileCommentStart = rawEntry.fileNameLength + rawEntry.extraFieldLength;
    const extraFieldBuffer = data.slice(rawEntry.fileNameLength, fileCommentStart);
    rawEntry.extraFields = [];
    let i = 0;
    while (i < extraFieldBuffer.length - 3) {
      const headerId = getUint16LE(extraFieldBuffer, i + 0);
      const dataSize = getUint16LE(extraFieldBuffer, i + 2);
      const dataStart = i + 4;
      const dataEnd = dataStart + dataSize;
      if (dataEnd > extraFieldBuffer.length) {
        throw new Error("extra field length exceeds extra field buffer size");
      }
      rawEntry.extraFields.push({
        id: headerId,
        data: extraFieldBuffer.slice(dataStart, dataEnd)
      });
      i = dataEnd;
    }
    rawEntry.commentBytes = data.slice(fileCommentStart, fileCommentStart + rawEntry.fileCommentLength);
    rawEntry.comment = decodeBuffer(rawEntry.commentBytes);
    readEntryCursor += data.length;
    if (rawEntry.uncompressedSize === 4294967295 || rawEntry.compressedSize === 4294967295 || rawEntry.relativeOffsetOfLocalHeader === 4294967295) {
      const zip64ExtraField = rawEntry.extraFields.find((e2) => e2.id === 1);
      if (!zip64ExtraField) {
        throw new Error("expected zip64 extended information extra field");
      }
      const zip64EiefBuffer = zip64ExtraField.data;
      let index = 0;
      if (rawEntry.uncompressedSize === 4294967295) {
        if (index + 8 > zip64EiefBuffer.length) {
          throw new Error("zip64 extended information extra field does not include uncompressed size");
        }
        rawEntry.uncompressedSize = getUint64LE(zip64EiefBuffer, index);
        index += 8;
      }
      if (rawEntry.compressedSize === 4294967295) {
        if (index + 8 > zip64EiefBuffer.length) {
          throw new Error("zip64 extended information extra field does not include compressed size");
        }
        rawEntry.compressedSize = getUint64LE(zip64EiefBuffer, index);
        index += 8;
      }
      if (rawEntry.relativeOffsetOfLocalHeader === 4294967295) {
        if (index + 8 > zip64EiefBuffer.length) {
          throw new Error("zip64 extended information extra field does not include relative header offset");
        }
        rawEntry.relativeOffsetOfLocalHeader = getUint64LE(zip64EiefBuffer, index);
        index += 8;
      }
    }
    const nameField = rawEntry.extraFields.find((e2) => e2.id === 28789 && e2.data.length >= 6 && // too short to be meaningful
    e2.data[0] === 1 && // Version       1 byte      version of this extra field, currently 1
    getUint32LE(e2.data, 1), crc$1.unsigned(rawEntry.nameBytes));
    if (nameField) {
      rawEntry.fileName = decodeBuffer(nameField.data.slice(5));
    }
    if (rawEntry.compressionMethod === 0) {
      let expectedCompressedSize = rawEntry.uncompressedSize;
      if ((rawEntry.generalPurposeBitFlag & 1) !== 0) {
        expectedCompressedSize += 12;
      }
      if (rawEntry.compressedSize !== expectedCompressedSize) {
        throw new Error(`compressed size mismatch for stored file: ${rawEntry.compressedSize} != ${expectedCompressedSize}`);
      }
    }
    rawEntries.push(rawEntry);
  }
  const zip = {
    comment,
    commentBytes
  };
  return {
    zip,
    entries: rawEntries.map((e) => new ZipEntry(reader, e))
  };
}
async function readEntryDataHeader(reader, rawEntry) {
  if (rawEntry.generalPurposeBitFlag & 1) {
    throw new Error("encrypted entries not supported");
  }
  const buffer = await readAs(reader, rawEntry.relativeOffsetOfLocalHeader, 30);
  const totalLength = await reader.getLength();
  const signature = getUint32LE(buffer, 0);
  if (signature !== 67324752) {
    throw new Error(`invalid local file header signature: 0x${signature.toString(16)}`);
  }
  const fileNameLength = getUint16LE(buffer, 26);
  const extraFieldLength = getUint16LE(buffer, 28);
  const localFileHeaderEnd = rawEntry.relativeOffsetOfLocalHeader + buffer.length + fileNameLength + extraFieldLength;
  let decompress;
  if (rawEntry.compressionMethod === 0) {
    decompress = false;
  } else if (rawEntry.compressionMethod === 8) {
    decompress = true;
  } else {
    throw new Error(`unsupported compression method: ${rawEntry.compressionMethod}`);
  }
  const fileDataStart = localFileHeaderEnd;
  const fileDataEnd = fileDataStart + rawEntry.compressedSize;
  if (rawEntry.compressedSize !== 0) {
    if (fileDataEnd > totalLength) {
      throw new Error(`file data overflows file bounds: ${fileDataStart} +  ${rawEntry.compressedSize}  > ${totalLength}`);
    }
  }
  return {
    decompress,
    fileDataStart
  };
}
async function readEntryDataAsArrayBuffer(reader, rawEntry) {
  const { decompress, fileDataStart } = await readEntryDataHeader(reader, rawEntry);
  if (!decompress) {
    const dataView = await readAs(reader, fileDataStart, rawEntry.compressedSize);
    return isTypedArraySameAsArrayBuffer(dataView) ? dataView.buffer : dataView.slice().buffer;
  }
  const typedArrayOrBlob = await readAsBlobOrTypedArray(reader, fileDataStart, rawEntry.compressedSize);
  const result = await inflateRawAsync(typedArrayOrBlob, rawEntry.uncompressedSize);
  return result;
}
async function readEntryDataAsBlob(reader, rawEntry, type) {
  const { decompress, fileDataStart } = await readEntryDataHeader(reader, rawEntry);
  if (!decompress) {
    const typedArrayOrBlob2 = await readAsBlobOrTypedArray(reader, fileDataStart, rawEntry.compressedSize, type);
    if (isBlob(typedArrayOrBlob2)) {
      return typedArrayOrBlob2;
    }
    return new Blob([isSharedArrayBuffer(typedArrayOrBlob2.buffer) ? new Uint8Array(typedArrayOrBlob2) : typedArrayOrBlob2], { type });
  }
  const typedArrayOrBlob = await readAsBlobOrTypedArray(reader, fileDataStart, rawEntry.compressedSize);
  const result = await inflateRawAsync(typedArrayOrBlob, rawEntry.uncompressedSize, type);
  return result;
}
async function unzipRaw(source) {
  let reader;
  if (typeof Blob !== "undefined" && source instanceof Blob) {
    reader = new BlobReader$1(source);
  } else if (source instanceof ArrayBuffer || source && source.buffer && source.buffer instanceof ArrayBuffer) {
    reader = new ArrayBufferReader(source);
  } else if (isSharedArrayBuffer(source) || isSharedArrayBuffer(source.buffer)) {
    reader = new ArrayBufferReader(source);
  } else if (typeof source === "string") {
    const req = await fetch(source);
    if (!req.ok) {
      throw new Error(`failed http request ${source}, status: ${req.status}: ${req.statusText}`);
    }
    const blob = await req.blob();
    reader = new BlobReader$1(blob);
  } else if (typeof source.getLength === "function" && typeof source.read === "function") {
    reader = source;
  } else {
    throw new Error("unsupported source type");
  }
  const totalLength = await reader.getLength();
  if (totalLength > Number.MAX_SAFE_INTEGER) {
    throw new Error(`file too large. size: ${totalLength}. Only file sizes up 4503599627370496 bytes are supported`);
  }
  return await findEndOfCentralDirector(reader, totalLength);
}
async function unzip(source) {
  const { zip, entries } = await unzipRaw(source);
  return {
    zip,
    entries: Object.fromEntries(entries.map((v) => [v.name, v]))
  };
}
function strip_prefix(path) {
  return path.slice(1);
}
function uri2href(url) {
  let [protocol, rest] = (typeof url === "string" ? url : url.href).split("://");
  if (protocol === "https" || protocol === "http") {
    return url;
  }
  if (protocol === "gc") {
    return `https://storage.googleapis.com/${rest}`;
  }
  if (protocol === "s3") {
    return `https://s3.amazonaws.com/${rest}`;
  }
  throw Error(`Protocol not supported, got: ${JSON.stringify(protocol)}`);
}
function fetch_range(url, offset, length, opts2 = {}) {
  if (offset !== void 0 && length !== void 0) {
    opts2 = {
      ...opts2,
      headers: {
        ...opts2.headers,
        Range: `bytes=${offset}-${offset + length - 1}`
      }
    };
  }
  return fetch(url, opts2);
}
function merge_init(storeOverrides, requestOverrides) {
  return {
    ...storeOverrides,
    ...requestOverrides,
    headers: {
      ...storeOverrides.headers,
      ...requestOverrides.headers
    }
  };
}
function assert(expression, msg = "") {
  if (!expression)
    throw new Error(msg);
}
class BlobReader2 {
  constructor(blob) {
    __publicField(this, "blob");
    this.blob = blob;
  }
  async getLength() {
    return this.blob.size;
  }
  async read(offset, length) {
    const blob = this.blob.slice(offset, offset + length);
    return new Uint8Array(await blob.arrayBuffer());
  }
}
class HTTPRangeReader {
  constructor(url, opts2 = {}) {
    __publicField(this, "url");
    __publicField(this, "length");
    __privateAdd(this, _overrides2, void 0);
    this.url = url;
    __privateSet(this, _overrides2, opts2.overrides ?? {});
  }
  async getLength() {
    if (this.length === void 0) {
      const req = await fetch(this.url, {
        ...__privateGet(this, _overrides2),
        method: "HEAD"
      });
      assert(req.ok, `failed http request ${this.url}, status: ${req.status}: ${req.statusText}`);
      this.length = Number(req.headers.get("content-length"));
      if (Number.isNaN(this.length)) {
        throw Error("could not get length");
      }
    }
    return this.length;
  }
  async read(offset, size) {
    if (size === 0) {
      return new Uint8Array(0);
    }
    const req = await fetch_range(this.url, offset, size, __privateGet(this, _overrides2));
    assert(req.ok, `failed http request ${this.url}, status: ${req.status} offset: ${offset} size: ${size}: ${req.statusText}`);
    return new Uint8Array(await req.arrayBuffer());
  }
}
_overrides2 = new WeakMap();
class ZipFileStore {
  constructor(reader) {
    __publicField(this, "info");
    this.info = unzip(reader);
  }
  async get(key) {
    let entry = (await this.info).entries[strip_prefix(key)];
    if (!entry)
      return;
    return new Uint8Array(await entry.arrayBuffer());
  }
  async has(key) {
    return strip_prefix(key) in (await this.info).entries;
  }
  static fromUrl(href, opts2 = {}) {
    return new ZipFileStore(new HTTPRangeReader(href, opts2));
  }
  static fromBlob(blob) {
    return new ZipFileStore(new BlobReader2(blob));
  }
}
const ZipFileStore$1 = ZipFileStore;
function parse$8(template, re2 = /{{(.*?)}}/) {
  let result = re2.exec(template);
  const parts = [];
  let pos;
  while (result) {
    pos = result.index;
    if (pos !== 0) {
      parts.push({ match: false, str: template.substring(0, pos) });
      template = template.slice(pos);
    }
    parts.push({ match: true, str: result[0] });
    template = template.slice(result[0].length);
    result = re2.exec(template);
  }
  if (template) {
    parts.push({ match: false, str: template });
  }
  return parts;
}
function matchFn(str) {
  const match = str.match(/(?<fname>[A-Z_][A-Z_1-9]*)\((?<args>[^)]+)\)/i);
  if (!(match == null ? void 0 : match.groups))
    return;
  const { fname, args } = match.groups;
  const ctx = Object.fromEntries(
    args.split(",").map((kwarg) => {
      var _a2;
      const { key, num, str: str2 } = ((_a2 = kwarg.match(
        /(?<key>[a-z_0-9]*)\s*=\s*((?<num>[0-9.]+)|('|")(?<str>.*)('|"))/i
      )) == null ? void 0 : _a2.groups) ?? {};
      if (!key || !(num || str2)) {
        throw Error(`Failed to match fn kwarg: ${kwarg}`);
      }
      return [key, num ? Number(num) : str2];
    })
  );
  return { fname, ctx };
}
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const numbers = "01234569789";
const expr = "()*/+-";
const space = " ";
const valid$3 = new Set(
  alphabet + alphabet.toUpperCase() + numbers + expr + space
);
function matchMathEval(str) {
  for (let i = 0; i < str.length; i++) {
    if (!valid$3.has(str.charAt(i)))
      return;
  }
  return parse$8(str, /[A-Za-z_][A-Za-z0-9_]*/gi);
}
function render(template, context) {
  const grps = parse$8(template);
  return grps.map((grp) => {
    if (!grp.match) {
      return grp.str;
    }
    let inner = grp.str.split(/{{|}}/).filter(Boolean)[0].trim();
    if (inner in context) {
      return context[inner];
    }
    const fnMatch = matchFn(inner);
    if (fnMatch) {
      const { fname, ctx } = fnMatch;
      const fn = context[fname];
      if (typeof fn === "function") {
        return fn(ctx);
      }
      throw Error(
        `Cannot find function named ${fname} in rendering context.`
      );
    }
    const matches = matchMathEval(inner);
    if (matches) {
      const exprParts = matches.map((match) => {
        if (!match.match)
          return match.str;
        const value = context[match.str];
        if (value == null) {
          throw Error(
            `Cannot find number named ${match.str} in rendering context.`
          );
        }
        if (typeof value !== "number") {
          throw Error(
            `The provided value for ${match.str} must be a number.`
          );
        }
        return value;
      });
      return Function('"use strict";return (' + exprParts.join("") + ")")();
    }
    throw new Error(`Unable to match ${grp.str}`);
  }).join("");
}
function parse$7(spec, renderString = render) {
  return "version" in spec ? parseV1(spec, renderString) : parseV0(spec);
}
function parseV0(spec) {
  return new Map(Object.entries(spec));
}
function parseV1(spec, renderString) {
  var _a2;
  const context = {};
  for (const [key, template] of Object.entries(spec.templates ?? {})) {
    if (template.includes("{{")) {
      context[key] = (ctx) => renderString(template, ctx);
    } else {
      context[key] = template;
    }
  }
  const render2 = (t2, o) => {
    return renderString(t2, { ...context, ...o });
  };
  const refs = /* @__PURE__ */ new Map();
  for (const [key, ref] of Object.entries(spec.refs ?? {})) {
    if (typeof ref === "string") {
      refs.set(key, ref);
    } else {
      const url = ((_a2 = ref[0]) == null ? void 0 : _a2.includes("{{")) ? render2(ref[0]) : ref[0];
      refs.set(key, ref.length === 1 ? [url] : [url, ref[1], ref[2]]);
    }
  }
  for (const g of spec.gen ?? []) {
    for (const dims of iterDims(g.dimensions)) {
      const key = render2(g.key, dims);
      const url = render2(g.url, dims);
      if ("offset" in g && "length" in g) {
        const offset = render2(g.offset, dims);
        const length = render2(g.length, dims);
        refs.set(key, [url, parseInt(offset), parseInt(length)]);
      } else {
        refs.set(key, [url]);
      }
    }
  }
  return refs;
}
function* iterDims(dimensions) {
  const keys2 = Object.keys(dimensions);
  const iterables = Object.values(dimensions).map(
    (i) => Array.isArray(i) ? i : [...range$3(i)]
  );
  for (const values of product(...iterables)) {
    yield Object.fromEntries(keys2.map((key, i) => [key, values[i]]));
  }
}
function* product(...iterables) {
  if (iterables.length === 0) {
    return;
  }
  const iterators = iterables.map((it) => it[Symbol.iterator]());
  const results = iterators.map((it) => it.next());
  if (results.some((r) => r.done)) {
    throw new Error("Input contains an empty iterator.");
  }
  for (let i = 0; ; ) {
    if (results[i].done) {
      iterators[i] = iterables[i][Symbol.iterator]();
      results[i] = iterators[i].next();
      if (++i >= iterators.length) {
        return;
      }
    } else {
      yield results.map(({ value }) => value);
      i = 0;
    }
    results[i] = iterators[i].next();
  }
}
function* range$3({ stop, start = 0, step = 1 }) {
  for (let i = start; i < stop; i += step) {
    yield i;
  }
}
(() => {
  var table2 = new Uint8Array(128);
  for (var i = 0; i < 64; i++) {
    table2[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i;
  }
  return (base64) => {
    var n = base64.length;
    var bytes = new Uint8Array(
      // @ts-expect-error
      (n - (base64[n - 1] == "=") - (base64[n - 2] == "=")) * 3 / 4 | 0
    );
    for (var i2 = 0, j = 0; i2 < n; ) {
      var c0 = table2[base64.charCodeAt(i2++)], c1 = table2[base64.charCodeAt(i2++)];
      var c2 = table2[base64.charCodeAt(i2++)], c3 = table2[base64.charCodeAt(i2++)];
      bytes[j++] = c0 << 2 | c1 >> 4;
      bytes[j++] = c1 << 4 | c2 >> 2;
      bytes[j++] = c2 << 6 | c3;
    }
    return bytes;
  };
})();
new TextEncoder();
let table = new Uint8Array(128);
for (let i = 0; i < 64; i++) {
  table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i;
}
function to_binary(base64) {
  const n = base64.length;
  const bytes = new Uint8Array(
    // @ts-ignore
    (n - (base64[n - 1] === "=") - (base64[n - 2] === "=")) * 3 / 4 | 0
  );
  for (let i = 0, j = 0; i < n; ) {
    const c0 = table[base64.charCodeAt(i++)];
    const c1 = table[base64.charCodeAt(i++)];
    const c2 = table[base64.charCodeAt(i++)];
    const c3 = table[base64.charCodeAt(i++)];
    bytes[j++] = c0 << 2 | c1 >> 4;
    bytes[j++] = c1 << 4 | c2 >> 2;
    bytes[j++] = c2 << 6 | c3;
  }
  return bytes;
}
const _ReferenceStore = class {
  constructor(refs, opts2 = {}) {
    __privateAdd(this, _refs, void 0);
    __privateAdd(this, _opts, void 0);
    __privateAdd(this, _overrides3, void 0);
    __privateSet(this, _refs, Promise.resolve(refs));
    __privateSet(this, _opts, opts2);
    __privateSet(this, _overrides3, opts2.overrides || {});
  }
  async get(key, opts2 = {}) {
    let ref = (await __privateGet(this, _refs)).get(strip_prefix(key));
    if (!ref)
      return;
    if (typeof ref === "string") {
      if (ref.startsWith("base64:")) {
        return to_binary(ref.slice("base64:".length));
      }
      return new TextEncoder().encode(ref);
    }
    let [urlOrNull, offset, size] = ref;
    let url = urlOrNull ?? __privateGet(this, _opts).target;
    if (!url) {
      throw Error(`No url for key ${key}, and no target url provided.`);
    }
    let res = await fetch_range(uri2href(url), offset, size, merge_init(__privateGet(this, _overrides3), opts2));
    if (res.status === 200 || res.status === 206) {
      return new Uint8Array(await res.arrayBuffer());
    }
    throw new Error(`Request unsuccessful for key ${key}. Response status: ${res.status}.`);
  }
  static fromSpec(spec, opts2) {
    let refs = Promise.resolve(spec).then((spec2) => parse$7(spec2));
    return new _ReferenceStore(refs, opts2);
  }
  static fromUrl(url, opts2) {
    let spec = fetch(url, opts2 == null ? void 0 : opts2.overrides).then((res) => res.json());
    return _ReferenceStore.fromSpec(spec, opts2);
  }
};
let ReferenceStore = _ReferenceStore;
_refs = new WeakMap();
_opts = new WeakMap();
_overrides3 = new WeakMap();
const ReferenceStore$1 = ReferenceStore;
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        var args = [null];
        args.push.apply(args, arguments);
        var Ctor = Function.bind.apply(f, args);
        return new Ctor();
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else
    a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var loglevel = { exports: {} };
(function(module2) {
  (function(root2, definition) {
    if (module2.exports) {
      module2.exports = definition();
    } else {
      root2.log = definition();
    }
  })(commonjsGlobal, function() {
    var noop = function() {
    };
    var undefinedType2 = "undefined";
    var isIE = typeof window !== undefinedType2 && typeof window.navigator !== undefinedType2 && /Trident\/|MSIE /.test(window.navigator.userAgent);
    var logMethods = [
      "trace",
      "debug",
      "info",
      "warn",
      "error"
    ];
    var _loggersByName = {};
    var defaultLogger = null;
    function bindMethod(obj, methodName) {
      var method = obj[methodName];
      if (typeof method.bind === "function") {
        return method.bind(obj);
      } else {
        try {
          return Function.prototype.bind.call(method, obj);
        } catch (e) {
          return function() {
            return Function.prototype.apply.apply(method, [obj, arguments]);
          };
        }
      }
    }
    function traceForIE() {
      if (console.log) {
        if (console.log.apply) {
          console.log.apply(console, arguments);
        } else {
          Function.prototype.apply.apply(console.log, [console, arguments]);
        }
      }
      if (console.trace)
        console.trace();
    }
    function realMethod(methodName) {
      if (methodName === "debug") {
        methodName = "log";
      }
      if (typeof console === undefinedType2) {
        return false;
      } else if (methodName === "trace" && isIE) {
        return traceForIE;
      } else if (console[methodName] !== void 0) {
        return bindMethod(console, methodName);
      } else if (console.log !== void 0) {
        return bindMethod(console, "log");
      } else {
        return noop;
      }
    }
    function replaceLoggingMethods() {
      var level = this.getLevel();
      for (var i = 0; i < logMethods.length; i++) {
        var methodName = logMethods[i];
        this[methodName] = i < level ? noop : this.methodFactory(methodName, level, this.name);
      }
      this.log = this.debug;
      if (typeof console === undefinedType2 && level < this.levels.SILENT) {
        return "No console available for logging";
      }
    }
    function enableLoggingWhenConsoleArrives(methodName) {
      return function() {
        if (typeof console !== undefinedType2) {
          replaceLoggingMethods.call(this);
          this[methodName].apply(this, arguments);
        }
      };
    }
    function defaultMethodFactory(methodName, _level, _loggerName) {
      return realMethod(methodName) || enableLoggingWhenConsoleArrives.apply(this, arguments);
    }
    function Logger(name, factory) {
      var self2 = this;
      var inheritedLevel;
      var defaultLevel;
      var userLevel;
      var storageKey = "loglevel";
      if (typeof name === "string") {
        storageKey += ":" + name;
      } else if (typeof name === "symbol") {
        storageKey = void 0;
      }
      function persistLevelIfPossible(levelNum) {
        var levelName = (logMethods[levelNum] || "silent").toUpperCase();
        if (typeof window === undefinedType2 || !storageKey)
          return;
        try {
          window.localStorage[storageKey] = levelName;
          return;
        } catch (ignore) {
        }
        try {
          window.document.cookie = encodeURIComponent(storageKey) + "=" + levelName + ";";
        } catch (ignore) {
        }
      }
      function getPersistedLevel() {
        var storedLevel;
        if (typeof window === undefinedType2 || !storageKey)
          return;
        try {
          storedLevel = window.localStorage[storageKey];
        } catch (ignore) {
        }
        if (typeof storedLevel === undefinedType2) {
          try {
            var cookie = window.document.cookie;
            var cookieName = encodeURIComponent(storageKey);
            var location = cookie.indexOf(cookieName + "=");
            if (location !== -1) {
              storedLevel = /^([^;]+)/.exec(
                cookie.slice(location + cookieName.length + 1)
              )[1];
            }
          } catch (ignore) {
          }
        }
        if (self2.levels[storedLevel] === void 0) {
          storedLevel = void 0;
        }
        return storedLevel;
      }
      function clearPersistedLevel() {
        if (typeof window === undefinedType2 || !storageKey)
          return;
        try {
          window.localStorage.removeItem(storageKey);
        } catch (ignore) {
        }
        try {
          window.document.cookie = encodeURIComponent(storageKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        } catch (ignore) {
        }
      }
      function normalizeLevel(input) {
        var level = input;
        if (typeof level === "string" && self2.levels[level.toUpperCase()] !== void 0) {
          level = self2.levels[level.toUpperCase()];
        }
        if (typeof level === "number" && level >= 0 && level <= self2.levels.SILENT) {
          return level;
        } else {
          throw new TypeError("log.setLevel() called with invalid level: " + input);
        }
      }
      self2.name = name;
      self2.levels = {
        "TRACE": 0,
        "DEBUG": 1,
        "INFO": 2,
        "WARN": 3,
        "ERROR": 4,
        "SILENT": 5
      };
      self2.methodFactory = factory || defaultMethodFactory;
      self2.getLevel = function() {
        if (userLevel != null) {
          return userLevel;
        } else if (defaultLevel != null) {
          return defaultLevel;
        } else {
          return inheritedLevel;
        }
      };
      self2.setLevel = function(level, persist) {
        userLevel = normalizeLevel(level);
        if (persist !== false) {
          persistLevelIfPossible(userLevel);
        }
        return replaceLoggingMethods.call(self2);
      };
      self2.setDefaultLevel = function(level) {
        defaultLevel = normalizeLevel(level);
        if (!getPersistedLevel()) {
          self2.setLevel(level, false);
        }
      };
      self2.resetLevel = function() {
        userLevel = null;
        clearPersistedLevel();
        replaceLoggingMethods.call(self2);
      };
      self2.enableAll = function(persist) {
        self2.setLevel(self2.levels.TRACE, persist);
      };
      self2.disableAll = function(persist) {
        self2.setLevel(self2.levels.SILENT, persist);
      };
      self2.rebuild = function() {
        if (defaultLogger !== self2) {
          inheritedLevel = normalizeLevel(defaultLogger.getLevel());
        }
        replaceLoggingMethods.call(self2);
        if (defaultLogger === self2) {
          for (var childName in _loggersByName) {
            _loggersByName[childName].rebuild();
          }
        }
      };
      inheritedLevel = normalizeLevel(
        defaultLogger ? defaultLogger.getLevel() : "WARN"
      );
      var initialLevel = getPersistedLevel();
      if (initialLevel != null) {
        userLevel = normalizeLevel(initialLevel);
      }
      replaceLoggingMethods.call(self2);
    }
    defaultLogger = new Logger();
    defaultLogger.getLogger = function getLogger(name) {
      if (typeof name !== "symbol" && typeof name !== "string" || name === "") {
        throw new TypeError("You must supply a name when creating a logger.");
      }
      var logger = _loggersByName[name];
      if (!logger) {
        logger = _loggersByName[name] = new Logger(
          name,
          defaultLogger.methodFactory
        );
      }
      return logger;
    };
    var _log = typeof window !== undefinedType2 ? window.log : void 0;
    defaultLogger.noConflict = function() {
      if (typeof window !== undefinedType2 && window.log === defaultLogger) {
        window.log = _log;
      }
      return defaultLogger;
    };
    defaultLogger.getLoggers = function getLoggers() {
      return _loggersByName;
    };
    defaultLogger["default"] = defaultLogger;
    return defaultLogger;
  });
})(loglevel);
var loglevelExports = loglevel.exports;
const log = /* @__PURE__ */ getDefaultExportFromCjs(loglevelExports);
const DEFAULT_DEBUG_MODE = false;
let GLOBAL_DEBUG_MODE = DEFAULT_DEBUG_MODE;
function getDebugMode() {
  return GLOBAL_DEBUG_MODE;
}
class RelaxedFetchStore extends FetchStore$1 {
  // This allows returning `undefined` for 403 responses,
  // as opposed to completely erroring.
  // Needed due to https://github.com/manzt/zarrita.js/pull/212
  // In the future, perhaps we could contribute a way to pass a
  // custom error handling function or additional options
  // to the zarrita FetchStore so that a subclass is not required.
  async get(key, options = {}) {
    var _a2;
    try {
      return await super.get(key, options);
    } catch (e) {
      if (((_a2 = e == null ? void 0 : e.message) == null ? void 0 : _a2.startsWith("Unexpected response status 403")) && !getDebugMode()) {
        return void 0;
      }
      throw e;
    }
  }
}
function zarrOpenRoot(url, fileType, opts2) {
  let store;
  if (fileType && fileType.endsWith(".zip")) {
    store = ZipFileStore$1.fromUrl(url, { overrides: opts2 == null ? void 0 : opts2.requestInit });
  } else if (fileType && fileType.endsWith(".h5ad")) {
    if (!(opts2 == null ? void 0 : opts2.refSpecUrl)) {
      throw new Error("refSpecUrl is required for H5AD files");
    }
    const referenceSpecPromise = fetch(opts2.refSpecUrl).then((res) => res.json()).then((referenceSpec) => Object.fromEntries(
      // We want ReferenceStore.fromSpec to use our `target` URL option regardless
      // of what target URL(s) are specified in the reference spec JSON.
      // Reference: https://github.com/manzt/zarrita.js/pull/155
      Object.entries(referenceSpec).map(([key, entry]) => {
        if (Array.isArray(entry) && entry.length >= 1) {
          entry[0] = null;
        }
        return [key, entry];
      })
    ));
    store = ReferenceStore$1.fromSpec(referenceSpecPromise, { target: url, overrides: opts2 == null ? void 0 : opts2.requestInit });
  } else {
    store = new RelaxedFetchStore(url, { overrides: opts2 == null ? void 0 : opts2.requestInit });
  }
  return root$2(store);
}
class ZarrDataSource {
  /**
   * @param {DataSourceParams & { refSpecUrl?: string }} params The parameters object.
   */
  constructor({ url, requestInit: requestInit2, refSpecUrl, store, fileType }) {
    if (store) {
      this.storeRoot = root$2(store);
    } else if (url) {
      this.storeRoot = zarrOpenRoot(url, fileType, { requestInit: requestInit2, refSpecUrl });
    } else {
      throw new Error("Either a store or a URL must be provided to the ZarrDataSource constructor.");
    }
  }
  /**
   *
   * @param {string} path
   * @returns {ZarrLocation<Readable>}
   */
  getStoreRoot(path) {
    return this.storeRoot.resolve(path);
  }
  /**
   * Method for accessing JSON attributes, relative to the store root.
   * @param {string} key A path to the item.
   * @param {ZarrLocation<Readable>|null} storeRootParam An optional location,
   * which if provided will override the default store root.
   * @returns {Promise<any>} This async function returns a promise
   * that resolves to the parsed JSON if successful.
   * @throws This may throw an error.
   */
  async getJson(key, storeRootParam = null) {
    const { storeRoot } = this;
    const storeRootToUse = storeRootParam || storeRoot;
    let dirKey = key;
    if (key.endsWith(".zattrs") || key.endsWith(".zarray") || key.endsWith(".zgroup")) {
      dirKey = key.substring(0, key.length - 8);
    }
    return (await open(storeRootToUse.resolve(dirKey))).attrs;
  }
}
function dirname(path) {
  const arr = path.split("/");
  arr.pop();
  return arr.join("/");
}
function basename(path) {
  const arr = path.split("/");
  const result = arr.at(-1);
  if (!result) {
    log.error("basename of path is empty", path);
    return "";
  }
  return result;
}
function prependSlash(path) {
  if (typeof path === "string" && path.length >= 1) {
    if (path.charAt(0) === "/") {
      return path;
    }
    return `/${path}`;
  }
  return path;
}
class AnnDataSource extends ZarrDataSource {
  /**
   *
   * @param {DataSourceParams} params
   */
  constructor(params) {
    super(params);
    this.promises = /* @__PURE__ */ new Map();
  }
  /**
   *
   * @param {string[]} paths Paths to multiple string-valued columns
   * within the obs dataframe.
   * @returns {Promise<(undefined | string[] | string[][])[]>} Returns
   * each column as an array of strings,
   * ordered the same as the paths.
   */
  loadObsColumns(paths) {
    return this._loadColumns(paths);
  }
  /**
   *
   * @param {string[]} paths Paths to multiple string-valued columns
   * within the var dataframe.
   * @returns {Promise<(undefined | string[] | string[][])[]>} Returns
   * each column as an array of strings,
   * ordered the same as the paths.
   */
  loadVarColumns(paths) {
    return this._loadColumns(paths);
  }
  /**
   * Class method for loading obs variables.
   * Takes the location as an argument because this is shared across objects,
   * which have different ways of specifying location.
   * @param {string[] | string[][]} paths An array of strings like
   * "obs/leiden" or "obs/bulk_labels."
   * @returns {Promise<(undefined | string[] | string[][])[]>} A promise
   * for an array of ids with one per cell.
   */
  _loadColumns(paths) {
    const promises = paths.map((path) => {
      const getCol = (col) => {
        if (!this.promises.has(col)) {
          const obsPromise = this._loadColumn(col).catch((err) => {
            this.promises.delete(col);
            throw err;
          });
          this.promises.set(col, obsPromise);
        }
        return (
          /** @type {Promise<string[]>} */
          this.promises.get(col)
        );
      };
      if (!path) {
        return Promise.resolve(void 0);
      }
      if (Array.isArray(path)) {
        return Promise.resolve(Promise.all(path.map(getCol)));
      }
      return getCol(path);
    });
    return Promise.all(promises);
  }
  /**
   *
   * @param {string} pathOrig
   * @returns
   */
  async _loadColumn(pathOrig) {
    const { storeRoot } = this;
    const path = prependSlash(pathOrig);
    const prefixOrig = dirname(path);
    const prefix = prependSlash(prefixOrig);
    const { categories, "encoding-type": encodingType } = await this.getJson(`${path}/.zattrs`);
    let categoriesValues;
    let codesPath;
    if (categories) {
      const { dtype } = await open(
        storeRoot.resolve(`${prefix}/${categories}`),
        { kind: "array" }
      );
      if (dtype === "v2:object" || dtype === "|O") {
        categoriesValues = await this.getFlatArrDecompressed(
          `${prefix}/${categories}`
        );
      }
    } else if (encodingType === "categorical") {
      const { dtype } = await open(
        storeRoot.resolve(`${path}/categories`),
        { kind: "array" }
      );
      if (dtype === "v2:object" || dtype === "|O") {
        categoriesValues = await this.getFlatArrDecompressed(
          `${path}/categories`
        );
      }
      codesPath = `${path}/codes`;
    } else if (encodingType === "string-array") {
      return this.getFlatArrDecompressed(path);
    } else {
      const { dtype } = await open(
        storeRoot.resolve(path),
        { kind: "array" }
      );
      if (dtype === "v2:object" || dtype === "|O") {
        return this.getFlatArrDecompressed(path);
      }
    }
    const arr = await open(
      storeRoot.resolve(codesPath || path),
      { kind: "array" }
    );
    const values = await get$1(arr, [null]);
    const { data } = values;
    const mappedValues = Array.from(data).map(
      (i) => !categoriesValues ? String(i) : categoriesValues[
        /** @type {number} */
        i
      ]
    );
    return mappedValues;
  }
  /**
   * Class method for loading general numeric arrays.
   * @param {string} path A string like obsm.X_pca.
   * @returns {Promise<Chunk<any>>} A promise for a zarr array containing the data.
   */
  async loadNumeric(path) {
    const { storeRoot } = this;
    return open(storeRoot.resolve(path), { kind: "array" }).then((arr) => get$1(arr));
  }
  /**
   * Class method for loading specific columns of numeric arrays.
   * @param {string} path A string like obsm.X_pca.
   * @param {[number, number]} dims The column indices to load.
   * @returns {Promise<{
   *  data: [ZarrTypedArray<any>, ZarrTypedArray<any>],
   *  shape: [number, number],
   * }>} A promise for a zarr array containing the data.
   */
  async loadNumericForDims(path, dims) {
    const { storeRoot } = this;
    const arr = open(storeRoot.resolve(path), { kind: "array" });
    return Promise.all(
      dims.map((dim) => arr.then(
        (loadedArr) => get$1(loadedArr, [null, dim])
      ))
    ).then((cols) => ({
      data: (
        /** @type {[ZarrTypedArray<any>, ZarrTypedArray<any>]} */
        cols.map((col) => col.data)
      ),
      shape: [dims.length, cols[0].shape[0]]
    }));
  }
  /**
   * A common method for loading flattened data
   * i.e that which has shape [n] where n is a natural number.
   * @param {string} path A path to a flat array location, like obs/_index
   * @returns {Promise<string[]>} The data from the zarr array.
   */
  async getFlatArrDecompressed(path) {
    var _a2;
    const { storeRoot } = this;
    const arr = await open(storeRoot.resolve(path), { kind: "array" });
    const data = await get$1(arr);
    if ((_a2 = data.data) == null ? void 0 : _a2[Symbol.iterator]) {
      return (
        /** @type {string[]} */
        Array.from(data.data)
      );
    }
    return (
      /** @type {string[]} */
      data.data
    );
  }
  /**
   * Class method for loading the obs index.
   * @param {string|undefined} path Used by subclasses.
   * @returns {Promise<string[]>} An promise for a zarr array
   * containing the indices.
   */
  loadObsIndex(path = void 0) {
    if (this.obsIndex) {
      return this.obsIndex;
    }
    this.obsIndex = this.getJson("obs/.zattrs").then(({ _index }) => this._loadColumn(`/obs/${_index}`));
    return this.obsIndex;
  }
  /**
   * Class method for loading the obs index.
   * @param {string|undefined} path Used by subclasses.
   * @returns {Promise<string[]>} An promise for a zarr array
   * containing the indices.
   */
  loadDataFrameIndex(path = void 0) {
    const dfPath = path ? dirname(path) : "";
    return this.getJson(`${dfPath}/.zattrs`).then(({ _index }) => this._loadColumn(`${dfPath.length > 0 ? "/" : ""}${dfPath}/${_index}`));
  }
  /**
   * Class method for loading the var index.
   * @param {string|undefined} path Used by subclasses.
   * @returns {Promise<string[]>} An promise for a zarr array containing the indices.
   */
  loadVarIndex(path = void 0) {
    if (this.varIndex) {
      return this.varIndex;
    }
    this.varIndex = this.getJson("var/.zattrs").then(({ _index }) => this._loadColumn(`/var/${_index}`));
    return this.varIndex;
  }
  /**
   * Class method for loading the var alias.
   * @param {string} varPath
   * @param {string|undefined} matrixPath
   * @returns {Promise<string[]>} An promise for a zarr array containing the aliased names.
   */
  async loadVarAlias(varPath, matrixPath = void 0) {
    if (this.varAlias) {
      return this.varAlias;
    }
    [this.varAlias] = await this.loadVarColumns([varPath]);
    const index = await this.loadVarIndex();
    this.varAlias = this.varAlias.map(
      /** @type {(val: string, ind: number) => string} */
      (val, ind) => val ? val.concat(` (${index[ind]})`) : index[ind]
    );
    return this.varAlias;
  }
  /**
   *
   * @param {string} path
   * @returns {Promise<object>}
   */
  async _loadAttrs(path) {
    return this.getJson(`${path}/.zattrs`);
  }
  /**
   *
   * @param {string} path
   * @returns {Promise<string>}
   */
  async _loadString(path) {
    const { storeRoot } = this;
    const zattrs = await this._loadAttrs(path);
    if ("encoding-type" in zattrs && "encoding-version" in zattrs) {
      const {
        "encoding-type": encodingType,
        "encoding-version": encodingVersion
      } = zattrs;
      if (encodingType === "string" && encodingVersion === "0.2.0") {
        const arr = await open(storeRoot.resolve(path), { kind: "array" });
        const { data } = (
          /** @type {{ data: ByteStringArray }} */
          await arr.getChunk([])
        );
        return data.get(0);
      }
      throw new Error(`Unsupported encoding type ${encodingType} and version ${encodingVersion} in AnnDataSource._loadString`);
    }
    throw new Error("Keys for encoding-type or encoding-version not found in AnnDataSource._loadString");
  }
  /**
   *
   * @param {string} path
   * @returns {Promise<string[]>}
   */
  async _loadStringArray(path) {
    const zattrs = await this._loadAttrs(path);
    if ("encoding-type" in zattrs && "encoding-version" in zattrs) {
      const { "encoding-type": encodingType, "encoding-version": encodingVersion } = zattrs;
      if (encodingType === "string-array" && encodingVersion === "0.2.0") {
        return this.getFlatArrDecompressed(path);
      }
      throw new Error(`Unsupported encoding type ${encodingType} and version ${encodingVersion} in AnnDataSource._loadStringArray`);
    }
    throw new Error("Keys for encoding-type or encoding-version not found in AnnDataSource._loadString");
  }
  /**
   *
   * @param {string} path
   * @returns
   */
  async _loadElement(path) {
    const zattrs = await this._loadAttrs(path);
    if ("encoding-type" in zattrs) {
      const { "encoding-type": encodingType } = zattrs;
      if (encodingType === "string") {
        return this._loadString(path);
      }
      if (encodingType === "string-array") {
        return this._loadStringArray(path);
      }
    }
    return null;
  }
  /**
   *
   * @param {string} path
   * @param {string[]} keys
   * @returns
   */
  async _loadDict(path, keys2) {
    const zattrs = await this._loadAttrs(path);
    if ("encoding-type" in zattrs && "encoding-version" in zattrs) {
      const {
        "encoding-type": encodingType,
        "encoding-version": encodingVersion
      } = zattrs;
      if (encodingType === "dict" && encodingVersion === "0.1.0") {
        const result = {};
        await Promise.all(keys2.map(async (key) => {
          let val;
          try {
            val = await this._loadElement(`${path}/${key}`);
          } catch (e) {
            log.error(`Error in _loadDict: could not load ${key}`);
          }
          result[key] = val;
        }));
        return result;
      }
      throw new Error(`Unsupported encoding type ${encodingType} and version ${encodingVersion} in AnnDataSource._loadDict`);
    }
    throw new Error("Keys for encoding-type or encoding-version not found in AnnDataSource._loadString");
  }
}
const regex = /^mod\/([^/]*)\/(.*)$/;
function getModPrefix(arrPath) {
  if (arrPath) {
    const matches = arrPath.match(regex);
    if (matches && matches.length === 3) {
      return `mod/${matches[1]}/`;
    }
  }
  return "";
}
function getObsPath(arrPath) {
  return `${getModPrefix(arrPath)}obs`;
}
function getVarPath(arrPath) {
  return `${getModPrefix(arrPath)}var`;
}
class MuDataSource extends AnnDataSource {
  /**
   * Class method for loading the obs index.
   * @returns {Promise} An promise for a zarr array containing the indices.
   */
  loadObsIndex(path = null) {
    if (!this.obsIndex) {
      this.obsIndex = {};
    }
    const obsPath = getObsPath(path);
    if (this.obsIndex[obsPath]) {
      return this.obsIndex[obsPath];
    }
    this.obsIndex[obsPath] = this.getJson(`${obsPath}/.zattrs`).then(({ _index }) => this.getFlatArrDecompressed(`${obsPath}/${_index}`));
    return this.obsIndex[obsPath];
  }
  /**
   * Class method for loading the var index.
   * @returns {Promise} An promise for a zarr array containing the indices.
   */
  loadVarIndex(path = null) {
    if (!this.varIndex) {
      this.varIndex = {};
    }
    const varPath = getVarPath(path);
    if (this.varIndex[varPath]) {
      return this.varIndex[varPath];
    }
    this.varIndex[varPath] = this.getJson(`${varPath}/.zattrs`).then(({ _index }) => this.getFlatArrDecompressed(`${varPath}/${_index}`));
    return this.varIndex[varPath];
  }
  /**
   * Class method for loading the var alias.
   * @returns {Promise} An promise for a zarr array containing the aliased names.
   */
  async loadVarAlias(varPath, matrixPath) {
    if (!this.varAlias) {
      this.varAlias = {};
    }
    if (this.varAlias[varPath]) {
      return this.varAlias[varPath];
    }
    const [varAliasData] = await this.loadVarColumns([varPath]);
    this.varAlias[varPath] = varAliasData;
    const index = await this.loadVarIndex(matrixPath);
    this.varAlias[varPath] = this.varAlias[varPath].map(
      (val, ind) => val ? val.concat(` (${index[ind]})`) : index[ind]
    );
    return this.varAlias[varPath];
  }
}
class LoaderResult {
  /**
   * @param {LoaderDataType} data
   * @param {object[]|string|null} url Single URL or array of { url, name } objects.
   * @param {object|null} coordinationValues
   * @param {RequestInit|null} requestInit
   */
  constructor(data, url, coordinationValues = null, requestInit2 = null) {
    this.data = data;
    this.url = url;
    this.coordinationValues = coordinationValues;
    this.requestInit = requestInit2;
  }
}
class AbstractLoader {
  /**
   *
   * @param {LoaderParams} params
   */
  constructor({ type, fileType, url, requestInit: requestInit2, options, coordinationValues }) {
    this.fileType = fileType;
    this.type = type;
    this.url = url;
    this.requestInit = requestInit2;
    this.options = options;
    this.coordinationValues = coordinationValues;
  }
  /**
   *
   * @returns {Promise<LoaderResult<any>>}
   */
  // eslint-disable-next-line class-methods-use-this
  async load() {
    return Promise.resolve(new LoaderResult(true, null));
  }
}
class AbstractTwoStepLoader extends AbstractLoader {
  /**
   *
   * @param {DataSourceType} dataSource
   * @param {LoaderParams} params
   */
  constructor(dataSource, params) {
    super(params);
    this.dataSource = dataSource;
  }
}
class AbstractLoaderError {
  constructor(message) {
    this.message = message;
  }
  // eslint-disable-next-line class-methods-use-this
  warnInConsole() {
    throw new Error("The warnInConsole() method has not been implemented.");
  }
}
class MatrixZarrAsObsFeatureMatrixLoader extends AbstractTwoStepLoader {
  async loadAttrs() {
    if (this.attrs) {
      return this.attrs;
    }
    this.attrs = {
      data: await this.dataSource.getJson(".zattrs"),
      url: null
    };
    return this.attrs;
  }
  async loadArr() {
    const { storeRoot } = this.dataSource;
    if (this.arr) {
      return this.arr;
    }
    const z2 = await open(storeRoot, { kind: "array" });
    this.arr = await createZarrArrayAdapter(z2).getRaw([null, null]);
    return this.arr;
  }
  load() {
    return Promise.all([this.loadAttrs(), this.loadArr()]).then(([attrs, arr]) => Promise.resolve(new LoaderResult(
      { obsIndex: attrs.data.rows, featureIndex: attrs.data.cols, obsFeatureMatrix: arr },
      null
    )));
  }
}
class IncorrectDataTypeError extends Error {
  constructor(message) {
    super(message);
    this.name = "IncorrectDataTypeError";
  }
}
function convertBigInt64ArrayToInt32Array(arr) {
  if (!(arr instanceof BigInt64Array)) {
    throw new IncorrectDataTypeError("Expected a BigInt64Array");
  }
  const out = new Int32Array(arr.length);
  const view = new Int32Array(arr.buffer);
  for (let i = 0; i < arr.length; i++) {
    out[i] = view[i * 2];
  }
  return out;
}
const maybeDowncastInt64 = (data) => {
  try {
    return convertBigInt64ArrayToInt32Array(data);
  } catch (error) {
    if (error instanceof IncorrectDataTypeError) {
      return data;
    }
    throw error;
  }
};
const concatenateColumnVectors = (arr) => {
  const numCols = arr.length;
  const numRows = arr[0].length;
  const { BYTES_PER_ELEMENT } = arr[0];
  const view = new DataView(new ArrayBuffer(numCols * numRows * BYTES_PER_ELEMENT));
  const TypedArray = arr[0].constructor;
  const dtype = TypedArray.name.replace("Array", "");
  for (let i = 0; i < numCols; i += 1) {
    for (let j = 0; j < numRows; j += 1) {
      view[`set${dtype}`](BYTES_PER_ELEMENT * (j * numCols + i), arr[i][j], true);
    }
  }
  return new TypedArray(view.buffer);
};
const toObject = (data) => ({ data });
class ObsFeatureMatrixAnndataLoader extends AbstractTwoStepLoader {
  getOptions() {
    return this.options;
  }
  /**
   * Class method for loading the genes list from AnnData.var,
   * filtered if a there is a `geneFilterZarr` present in the view config.
   * @returns {Promise} A promise for the zarr array contianing the gene names.
   */
  async loadFilteredGeneNames() {
    if (this.filteredGeneNames) {
      return this.filteredGeneNames;
    }
    const { path, featureFilterPath: geneFilterZarr, geneAlias } = this.getOptions();
    const getFilterFn = async () => {
      if (!geneFilterZarr)
        return (data) => data;
      const geneFilter = await this.dataSource.getFlatArrDecompressed(geneFilterZarr);
      return (data) => data.filter((_, j) => geneFilter[j]);
    };
    const geneNamesPromise = geneAlias ? this.dataSource.loadVarAlias(geneAlias, path) : this.dataSource.loadVarIndex(path);
    this.filteredGeneNames = Promise.all([
      geneNamesPromise,
      getFilterFn()
    ]).then(([data, filter]) => filter(data));
    return this.filteredGeneNames;
  }
  /**
   * Class method for loading a filtered subset of the genes list
   * @param {String} filterZarr A location in the zarr store to fetch a boolean array from.
   * @returns {Array} A list of filtered genes.
   */
  async _getFilteredGenes(filterZarr) {
    const filter = await this.dataSource.getFlatArrDecompressed(filterZarr);
    const geneNames = await this.loadFilteredGeneNames();
    const genes = geneNames.filter((_, i) => filter[i]);
    return genes;
  }
  /**
   * Class method for getting the integer indices of a selection of genes within a list.
   * @param {Array} selection A list of gene names.
   * @returns {Array} A list of integer indices.
   */
  async _getGeneIndices(selection) {
    const geneNames = await this.loadFilteredGeneNames();
    return selection.map((gene) => geneNames.indexOf(gene));
  }
  /**
   * Class method for getting the number of cells i.e entries in `obs`.
   * @returns {Number} The number of cells.
   */
  async _getNumCells() {
    const { path } = this.getOptions();
    const cells = await this.dataSource.loadObsIndex(path);
    return cells.length;
  }
  /**
   * Class method for getting the number of genes i.e entries in `var`,
   * potentially filtered by `genesFilter`.
   * @returns {Number} The number of genes.
   */
  async _getNumGenes() {
    const genes = await this.loadFilteredGeneNames();
    return genes.length;
  }
  /**
   * Class method for opening the sparse matrix arrays in zarr.
   * @returns {Array} A list of promises pointing to the indptr, indices, and data of the matrix.
   */
  async _openSparseArrays() {
    const { path: matrix } = this.getOptions();
    const { storeRoot } = this.dataSource;
    if (this.sparseArrays) {
      return this.sparseArrays;
    }
    this.sparseArrays = Promise.all(
      ["indptr", "indices", "data"].map((name) => open(storeRoot.resolve(`${matrix}/${name}`), { kind: "array" }))
    );
    return this.sparseArrays;
  }
  /**
   * Class method for loading a gene selection from a CSC matrix.
   * @param {Array} selection A list of gene names whose data should be fetched.
   * @returns {Promise} A Promise.all array of promises containing Uint8Arrays, one per selection.
   */
  async _loadCSCGeneSelection(selection) {
    const indices = await this._getGeneIndices(selection);
    const [indptrArr, indexArr, cellXGeneArr] = await this._openSparseArrays();
    const numCells = await this._getNumCells();
    const { data: cols } = await createZarrArrayAdapter(indptrArr).getRaw(null);
    return Promise.all(
      indices.map(async (index) => {
        const startRowIndex = cols[index];
        const endRowIndex = cols[index + 1];
        const isColumnAllZeros = startRowIndex === endRowIndex;
        const geneData = new Float32Array(numCells).fill(0);
        if (isColumnAllZeros) {
          return geneData;
        }
        const { data: rowIndices } = await get$1(indexArr, [
          slice(startRowIndex, endRowIndex)
        ]);
        let { data: cellXGeneData } = await get$1(cellXGeneArr, [
          slice(startRowIndex, endRowIndex)
        ]);
        cellXGeneData = maybeDowncastInt64(cellXGeneData);
        for (let rowIndex = 0; rowIndex < rowIndices.length; rowIndex += 1) {
          geneData[rowIndices[rowIndex]] = cellXGeneData[rowIndex];
        }
        return geneData;
      })
    );
  }
  /**
   * Class method for loading a gene selection from a CSR matrix.
   * @param {Array} selection A list of gene names whose data should be fetched.
   * @returns {Promise} A Promise.all array of promises containing Uint8Arrays, one per selection.
   */
  async _loadCSRGeneSelection(selection) {
    const indices = await this._getGeneIndices(selection);
    const numGenes = await this._getNumGenes();
    const numCells = await this._getNumCells();
    const cellXGene = await this._loadCSRSparseCellXGene();
    return indices.map((index) => {
      const geneData = new Float32Array(numCells).fill(0);
      for (let i = 0; i < numCells; i += 1) {
        geneData[i] = cellXGene[i * numGenes + index];
      }
      return geneData;
    });
  }
  /**
   * Class method for loading row oriented (CSR) sparse data from zarr.
   *
   * @returns {Object} A { data: Float32Array } contianing the CellXGene matrix.
   */
  async _loadCSRSparseCellXGene() {
    if (this._sparseMatrix) {
      return this._sparseMatrix;
    }
    this._sparseMatrix = this._openSparseArrays().then(async (sparseArrays) => {
      const { path: matrix } = this.getOptions();
      const { shape } = await this.dataSource.getJson(`${matrix}/.zattrs`);
      let [rows, cols, cellXGene] = await Promise.all(
        sparseArrays.map(async (arr) => {
          const { data } = await createZarrArrayAdapter(arr).getRaw(null);
          return data;
        })
      );
      cellXGene = maybeDowncastInt64(cellXGene);
      const cellXGeneMatrix = new Float32Array(shape[0] * shape[1]).fill(0);
      let row = 0;
      rows.forEach((_, index) => {
        const rowStart = rows[index];
        const rowEnd = rows[index + 1];
        for (let i = rowStart; i < rowEnd; i += 1) {
          const val = cellXGene[i];
          const col = cols[i];
          cellXGeneMatrix[row * shape[1] + col] = val;
        }
        row += 1;
      });
      return cellXGeneMatrix;
    });
    return this._sparseMatrix;
  }
  /**
   * Class method for loading column oriented (CSC) sparse data from zarr.
   * @returns {Object} A { data: Float32Array } contianing the CellXGene matrix.
   */
  async _loadCSCSparseCellXGene() {
    if (this._sparseMatrix) {
      return this._sparseMatrix;
    }
    this._sparseMatrix = this._openSparseArrays().then(async (sparseArrays) => {
      const { path: matrix } = this.getOptions();
      const { shape } = await this.dataSource.getJson(`${matrix}/.zattrs`);
      let [cols, rows, cellXGene] = await Promise.all(
        sparseArrays.map(async (arr) => {
          const { data } = await createZarrArrayAdapter(arr).getRaw(null);
          return data;
        })
      );
      cellXGene = maybeDowncastInt64(cellXGene);
      const cellXGeneMatrix = new Float32Array(shape[0] * shape[1]).fill(0);
      let col = 0;
      cols.forEach((_, index) => {
        const colStart = cols[index];
        const colEnd = cols[index + 1];
        for (let i = colStart; i < colEnd; i += 1) {
          const val = cellXGene[i];
          const row = rows[i];
          cellXGeneMatrix[row * shape[1] + col] = val;
        }
        col += 1;
      });
      return cellXGeneMatrix;
    });
    return this._sparseMatrix;
  }
  /**
   * Class method for loading the cell x gene matrix.
   * @returns {Promise} A promise for the zarr array contianing the cell x gene data.
   */
  async loadCellXGene() {
    const { storeRoot } = this.dataSource;
    if (this.cellXGene) {
      return this.cellXGene;
    }
    const {
      path: matrix,
      initialFeatureFilterPath: matrixGeneFilter
    } = this.getOptions();
    if (!this._matrixZattrs) {
      this._matrixZattrs = await this.dataSource.getJson(`${matrix}/.zattrs`);
    }
    const encodingType = this._matrixZattrs["encoding-type"];
    if (!matrixGeneFilter) {
      if (encodingType === "csr_matrix") {
        this.cellXGene = this._loadCSRSparseCellXGene().then((data) => toObject(data));
      } else if (encodingType === "csc_matrix") {
        this.cellXGene = this._loadCSCSparseCellXGene().then((data) => toObject(data));
      } else {
        if (!this.arr) {
          this.arr = open(storeRoot.resolve(matrix), { kind: "array" });
        }
        this.cellXGene = this.arr.then((z2) => createZarrArrayAdapter(z2).getRaw(null)).then(({ data }) => toObject(maybeDowncastInt64(data)));
      }
    } else if (encodingType === "csr_matrix") {
      this.cellXGene = this._loadCSRSparseCellXGene().then(
        async (cellXGene) => {
          const filteredGenes = await this._getFilteredGenes(matrixGeneFilter);
          const numGenesFiltered = filteredGenes.length;
          const geneNames = await this.loadFilteredGeneNames();
          const numGenes = geneNames.length;
          const numCells = await this._getNumCells();
          const cellXGeneMatrixFiltered = new Float32Array(
            numCells * numGenesFiltered
          ).fill(0);
          for (let i = 0; i < numGenesFiltered; i += 1) {
            const index = geneNames.indexOf(filteredGenes[i]);
            for (let j = 0; j < numCells; j += 1) {
              cellXGeneMatrixFiltered[j * numGenesFiltered + i] = cellXGene[j * numGenes + index];
            }
          }
          return toObject(cellXGeneMatrixFiltered);
        }
      );
    } else {
      const genes = await this._getFilteredGenes(matrixGeneFilter);
      this.cellXGene = this.loadGeneSelection({ selection: genes }).then(({ data }) => toObject(concatenateColumnVectors(data)));
    }
    return this.cellXGene;
  }
  /**
   * Class method for loading a gene selection.
   * @param {Object} args
   * @param {Array} args.selection A list of gene names whose data should be fetched.
   * @returns {Object} { data } containing an array of gene expression data.
   */
  async loadGeneSelection({ selection }) {
    const { path: matrix } = this.getOptions();
    const { storeRoot } = this.dataSource;
    if (!this._matrixZattrs) {
      this._matrixZattrs = await this.dataSource.getJson(`${matrix}/.zattrs`);
    }
    const encodingType = this._matrixZattrs["encoding-type"];
    let genes;
    if (encodingType === "csc_matrix") {
      genes = await this._loadCSCGeneSelection(selection);
    } else if (encodingType === "csr_matrix") {
      genes = await this._loadCSRGeneSelection(selection);
    } else {
      if (!this.arr) {
        this.arr = open(storeRoot.resolve(matrix), { kind: "array" });
      }
      const indices = await this._getGeneIndices(selection);
      genes = await Promise.all(
        indices.map((index) => this.arr.then((z2) => get$1(z2, [null, index])).then(({ data }) => maybeDowncastInt64(data)))
      );
    }
    return { data: genes, url: null };
  }
  /**
   * Class method for loading only attributes i.e rows and columns
   * @param {Array} selection A list of gene names whose data should be fetched.
   * @returns {Object} { data: { rows, cols }, url } containing row and col labels for the matrix.
   */
  loadAttrs() {
    const { path } = this.getOptions();
    return Promise.all([this.dataSource.loadObsIndex(path), this.loadFilteredGeneNames()]).then((d) => {
      const [cellNames, geneNames] = d;
      const attrs = { rows: cellNames, cols: geneNames };
      return {
        data: attrs,
        url: null
      };
    });
  }
  async loadInitialFilteredGeneNames() {
    const filteredGeneNames = await this.loadFilteredGeneNames();
    const {
      initialFeatureFilterPath: matrixGeneFilterZarr
    } = this.getOptions();
    if (matrixGeneFilterZarr) {
      const matrixGeneFilter = await this.dataSource.getFlatArrDecompressed(
        matrixGeneFilterZarr
      );
      return filteredGeneNames.filter((_, i) => matrixGeneFilter[i]);
    }
    return filteredGeneNames;
  }
  async load() {
    const { path } = this.getOptions();
    const superResult = await super.load().catch((reason) => Promise.resolve(reason));
    if (superResult instanceof AbstractLoaderError) {
      return Promise.reject(superResult);
    }
    return Promise.all([
      this.dataSource.loadObsIndex(path),
      this.loadInitialFilteredGeneNames(),
      this.loadCellXGene()
    ]).then(([obsIndex, featureIndex, obsFeatureMatrix]) => Promise.resolve(new LoaderResult(
      { obsIndex, featureIndex, obsFeatureMatrix },
      null
    )));
  }
}
class ObsEmbeddingAnndataLoader extends AbstractTwoStepLoader {
  /**
   * Class method for loading embedding coordinates, such as those from UMAP or t-SNE.
   * @returns {Promise<MatrixResult>} A promise for an array of columns.
   */
  async loadEmbedding() {
    const { path, dims = [0, 1] } = this.options;
    if (this.embedding) {
      return (
        /** @type {MatrixResult} */
        this.embedding
      );
    }
    if (!this.embedding) {
      this.embedding = await this.dataSource.loadNumericForDims(path, dims);
      return (
        /** @type {MatrixResult} */
        this.embedding
      );
    }
    return this.embedding;
  }
  /**
   *
   * @returns {Promise<LoaderResult<ObsEmbeddingData>>}
   */
  async load() {
    const { path } = this.options;
    const superResult = await super.load().catch((reason) => Promise.resolve(reason));
    if (superResult instanceof AbstractLoaderError) {
      return Promise.reject(superResult);
    }
    return Promise.all([
      // Pass in the obsEmbedding path,
      // to handle the MuData case where the obsIndex is located at
      // `mod/rna/index` rather than `index`.
      this.dataSource.loadObsIndex(path),
      this.loadEmbedding()
    ]).then(([obsIndex, obsEmbedding]) => Promise.resolve(new LoaderResult(
      { obsIndex, obsEmbedding },
      null
    )));
  }
}
const ViewType$1 = {
  DESCRIPTION: "description",
  STATUS: "status",
  SCATTERPLOT: "scatterplot",
  SPATIAL: "spatial",
  SPATIAL_BETA: "spatialBeta",
  HEATMAP: "heatmap",
  LAYER_CONTROLLER: "layerController",
  LAYER_CONTROLLER_BETA: "layerControllerBeta",
  GENOMIC_PROFILES: "genomicProfiles",
  GATING: "gating",
  FEATURE_LIST: "featureList",
  OBS_SETS: "obsSets",
  OBS_SET_SIZES: "obsSetSizes",
  OBS_SET_FEATURE_VALUE_DISTRIBUTION: "obsSetFeatureValueDistribution",
  FEATURE_VALUE_HISTOGRAM: "featureValueHistogram",
  DOT_PLOT: "dotPlot",
  FEATURE_BAR_PLOT: "featureBarPlot",
  VOLCANO_PLOT: "volcanoPlot",
  OBS_SET_COMPOSITION_BAR_PLOT: "obsSetCompositionBarPlot",
  FEATURE_SET_ENRICHMENT_BAR_PLOT: "featureSetEnrichmentBarPlot",
  BIOMARKER_SELECT: "biomarkerSelect",
  COMPARATIVE_HEADING: "comparativeHeading",
  LINK_CONTROLLER: "linkController",
  NEUROGLANCER: "neuroglancer",
  DUAL_SCATTERPLOT: "dualScatterplot",
  TREEMAP: "treemap",
  SAMPLE_SET_PAIR_MANAGER: "sampleSetPairManager",
  FEATURE_STATS_TABLE: "featureStatsTable"
};
const DataType$1 = {
  OBS_LABELS: "obsLabels",
  OBS_EMBEDDING: "obsEmbedding",
  OBS_FEATURE_MATRIX: "obsFeatureMatrix",
  OBS_SETS: "obsSets",
  FEATURE_LABELS: "featureLabels",
  IMAGE: "image",
  OBS_SEGMENTATIONS: "obsSegmentations",
  NEIGHBORHOODS: "neighborhoods",
  GENOMIC_PROFILES: "genomic-profiles",
  OBS_SPOTS: "obsSpots",
  OBS_POINTS: "obsPoints",
  OBS_LOCATIONS: "obsLocations",
  SAMPLE_SETS: "sampleSets",
  SAMPLE_EDGES: "sampleEdges",
  COMPARISON_METADATA: "comparisonMetadata",
  FEATURE_STATS: "featureStats",
  FEATURE_SET_STATS: "featureSetStats",
  OBS_SET_STATS: "obsSetStats"
};
const FileType$1 = {
  // Joint file types
  ANNDATA_ZARR: "anndata.zarr",
  ANNDATA_ZARR_ZIP: "anndata.zarr.zip",
  ANNDATA_H5AD: "anndata.h5ad",
  SPATIALDATA_ZARR: "spatialdata.zarr",
  // Atomic file types
  OBS_EMBEDDING_CSV: "obsEmbedding.csv",
  OBS_SPOTS_CSV: "obsSpots.csv",
  OBS_POINTS_CSV: "obsPoints.csv",
  OBS_LOCATIONS_CSV: "obsLocations.csv",
  OBS_LABELS_CSV: "obsLabels.csv",
  FEATURE_LABELS_CSV: "featureLabels.csv",
  OBS_FEATURE_MATRIX_CSV: "obsFeatureMatrix.csv",
  OBS_SEGMENTATIONS_JSON: "obsSegmentations.json",
  OBS_SETS_CSV: "obsSets.csv",
  OBS_SETS_JSON: "obsSets.json",
  SAMPLE_SETS_CSV: "sampleSets.csv",
  // OME-Zarr
  IMAGE_OME_ZARR: "image.ome-zarr",
  OBS_SEGMENTATIONS_OME_ZARR: "obsSegmentations.ome-zarr",
  // OME-Zarr - Zipped
  IMAGE_OME_ZARR_ZIP: "image.ome-zarr.zip",
  OBS_SEGMENTATIONS_OME_ZARR_ZIP: "obsSegmentations.ome-zarr.zip",
  // AnnData
  OBS_FEATURE_MATRIX_ANNDATA_ZARR: "obsFeatureMatrix.anndata.zarr",
  OBS_FEATURE_COLUMNS_ANNDATA_ZARR: "obsFeatureColumns.anndata.zarr",
  OBS_SETS_ANNDATA_ZARR: "obsSets.anndata.zarr",
  OBS_EMBEDDING_ANNDATA_ZARR: "obsEmbedding.anndata.zarr",
  OBS_SPOTS_ANNDATA_ZARR: "obsSpots.anndata.zarr",
  OBS_POINTS_ANNDATA_ZARR: "obsPoints.anndata.zarr",
  OBS_LOCATIONS_ANNDATA_ZARR: "obsLocations.anndata.zarr",
  OBS_SEGMENTATIONS_ANNDATA_ZARR: "obsSegmentations.anndata.zarr",
  OBS_LABELS_ANNDATA_ZARR: "obsLabels.anndata.zarr",
  FEATURE_LABELS_ANNDATA_ZARR: "featureLabels.anndata.zarr",
  SAMPLE_EDGES_ANNDATA_ZARR: "sampleEdges.anndata.zarr",
  SAMPLE_SETS_ANNDATA_ZARR: "sampleSets.anndata.zarr",
  COMPARISON_METADATA_ANNDATA_ZARR: "comparisonMetadata.anndata.zarr",
  COMPARATIVE_FEATURE_STATS_ANNDATA_ZARR: "comparativeFeatureStats.anndata.zarr",
  COMPARATIVE_FEATURE_SET_STATS_ANNDATA_ZARR: "comparativeFeatureSetStats.anndata.zarr",
  COMPARATIVE_OBS_SET_STATS_ANNDATA_ZARR: "comparativeObsSetStats.anndata.zarr",
  // AnnData - zipped
  OBS_FEATURE_MATRIX_ANNDATA_ZARR_ZIP: "obsFeatureMatrix.anndata.zarr.zip",
  OBS_FEATURE_COLUMNS_ANNDATA_ZARR_ZIP: "obsFeatureColumns.anndata.zarr.zip",
  OBS_SETS_ANNDATA_ZARR_ZIP: "obsSets.anndata.zarr.zip",
  OBS_EMBEDDING_ANNDATA_ZARR_ZIP: "obsEmbedding.anndata.zarr.zip",
  OBS_SPOTS_ANNDATA_ZARR_ZIP: "obsSpots.anndata.zarr.zip",
  OBS_POINTS_ANNDATA_ZARR_ZIP: "obsPoints.anndata.zarr.zip",
  OBS_LOCATIONS_ANNDATA_ZARR_ZIP: "obsLocations.anndata.zarr.zip",
  OBS_SEGMENTATIONS_ANNDATA_ZARR_ZIP: "obsSegmentations.anndata.zarr.zip",
  OBS_LABELS_ANNDATA_ZARR_ZIP: "obsLabels.anndata.zarr.zip",
  FEATURE_LABELS_ANNDATA_ZARR_ZIP: "featureLabels.anndata.zarr.zip",
  SAMPLE_EDGES_ANNDATA_ZARR_ZIP: "sampleEdges.anndata.zarr.zip",
  SAMPLE_SETS_ANNDATA_ZARR_ZIP: "sampleSets.anndata.zarr.zip",
  COMPARISON_METADATA_ANNDATA_ZARR_ZIP: "comparisonMetadata.anndata.zarr.zip",
  COMPARATIVE_FEATURE_STATS_ANNDATA_ZARR_ZIP: "comparativeFeatureStats.anndata.zarr.zip",
  COMPARATIVE_FEATURE_SET_STATS_ANNDATA_ZARR_ZIP: "comparativeFeatureSetStats.anndata.zarr.zip",
  COMPARATIVE_OBS_SET_STATS_ANNDATA_ZARR_ZIP: "comparativeObsSetStats.anndata.zarr.zip",
  // AnnData - h5ad via reference spec
  OBS_FEATURE_MATRIX_ANNDATA_H5AD: "obsFeatureMatrix.anndata.h5ad",
  OBS_FEATURE_COLUMNS_ANNDATA_H5AD: "obsFeatureColumns.anndata.h5ad",
  OBS_SETS_ANNDATA_H5AD: "obsSets.anndata.h5ad",
  OBS_EMBEDDING_ANNDATA_H5AD: "obsEmbedding.anndata.h5ad",
  OBS_SPOTS_ANNDATA_H5AD: "obsSpots.anndata.h5ad",
  OBS_POINTS_ANNDATA_H5AD: "obsPoints.anndata.h5ad",
  OBS_LOCATIONS_ANNDATA_H5AD: "obsLocations.anndata.h5ad",
  OBS_SEGMENTATIONS_ANNDATA_H5AD: "obsSegmentations.anndata.h5ad",
  OBS_LABELS_ANNDATA_H5AD: "obsLabels.anndata.h5ad",
  FEATURE_LABELS_ANNDATA_H5AD: "featureLabels.anndata.h5ad",
  SAMPLE_EDGES_ANNDATA_H5AD: "sampleEdges.anndata.h5ad",
  SAMPLE_SETS_ANNDATA_H5AD: "sampleSets.anndata.h5ad",
  COMPARISON_METADATA_ANNDATA_H5AD: "comparisonMetadata.anndata.h5ad",
  COMPARATIVE_FEATURE_STATS_ANNDATA_H5AD: "comparativeFeatureStats.anndata.h5ad",
  COMPARATIVE_FEATURE_SET_STATS_ANNDATA_H5AD: "comparativeFeatureSetStats.anndata.h5ad",
  COMPARATIVE_OBS_SET_STATS_ANNDATA_H5AD: "comparativeObsSetStats.anndata.h5ad",
  // SpatialData
  IMAGE_SPATIALDATA_ZARR: "image.spatialdata.zarr",
  LABELS_SPATIALDATA_ZARR: "labels.spatialdata.zarr",
  SHAPES_SPATIALDATA_ZARR: "shapes.spatialdata.zarr",
  OBS_FEATURE_MATRIX_SPATIALDATA_ZARR: "obsFeatureMatrix.spatialdata.zarr",
  OBS_SETS_SPATIALDATA_ZARR: "obsSets.spatialdata.zarr",
  OBS_SPOTS_SPATIALDATA_ZARR: "obsSpots.spatialdata.zarr",
  FEATURE_LABELS_SPATIALDATA_ZARR: "featureLabels.spatialdata.zarr",
  // TODO:
  // OBS_POINTS_SPATIALDATA_ZARR: 'obsPoints.spatialdata.zarr',
  // OBS_LOCATIONS_SPATIALDATA_ZARR: 'obsLocations.spatialdata.zarr',
  // MuData
  OBS_FEATURE_MATRIX_MUDATA_ZARR: "obsFeatureMatrix.mudata.zarr",
  OBS_SETS_MUDATA_ZARR: "obsSets.mudata.zarr",
  OBS_EMBEDDING_MUDATA_ZARR: "obsEmbedding.mudata.zarr",
  OBS_SPOTS_MUDATA_ZARR: "obsSpots.mudata.zarr",
  OBS_POINTS_MUDATA_ZARR: "obsPoints.mudata.zarr",
  OBS_LOCATIONS_MUDATA_ZARR: "obsLocations.mudata.zarr",
  OBS_SEGMENTATIONS_MUDATA_ZARR: "obsSegmentations.mudata.zarr",
  OBS_LABELS_MUDATA_ZARR: "obsLabels.mudata.zarr",
  FEATURE_LABELS_MUDATA_ZARR: "featureLabels.mudata.zarr",
  GENOMIC_PROFILES_ZARR: "genomic-profiles.zarr",
  NEIGHBORHOODS_JSON: "neighborhoods.json",
  // OME-TIFF
  IMAGE_OME_TIFF: "image.ome-tiff",
  OBS_SEGMENTATIONS_OME_TIFF: "obsSegmentations.ome-tiff",
  // GLB
  OBS_SEGMENTATIONS_GLB: "obsSegmentations.glb",
  // New file types to support old file types:
  // - cells.json
  OBS_EMBEDDING_CELLS_JSON: "obsEmbedding.cells.json",
  OBS_SEGMENTATIONS_CELLS_JSON: "obsSegmentations.cells.json",
  OBS_LOCATIONS_CELLS_JSON: "obsLocations.cells.json",
  OBS_LABELS_CELLS_JSON: "obsLabels.cells.json",
  // - cell-sets.json
  OBS_SETS_CELL_SETS_JSON: "obsSets.cell-sets.json",
  // - genes.json
  OBS_FEATURE_MATRIX_GENES_JSON: "obsFeatureMatrix.genes.json",
  // - clusters.json
  OBS_FEATURE_MATRIX_CLUSTERS_JSON: "obsFeatureMatrix.clusters.json",
  // - expression-matrix.zarr
  OBS_FEATURE_MATRIX_EXPRESSION_MATRIX_ZARR: "obsFeatureMatrix.expression-matrix.zarr",
  // - raster.json
  IMAGE_RASTER_JSON: "image.raster.json",
  OBS_SEGMENTATIONS_RASTER_JSON: "obsSegmentations.raster.json",
  // - molecules.json
  OBS_LOCATIONS_MOLECULES_JSON: "obsLocations.molecules.json",
  OBS_LABELS_MOLECULES_JSON: "obsLabels.molecules.json",
  // Legacy joint file types
  CELLS_JSON: "cells.json",
  CELL_SETS_JSON: "cell-sets.json",
  ANNDATA_CELL_SETS_ZARR: "anndata-cell-sets.zarr",
  ANNDATA_CELLS_ZARR: "anndata-cells.zarr",
  EXPRESSION_MATRIX_ZARR: "expression-matrix.zarr",
  MOLECULES_JSON: "molecules.json",
  RASTER_JSON: "raster.json",
  RASTER_OME_ZARR: "raster.ome-zarr",
  CLUSTERS_JSON: "clusters.json",
  GENES_JSON: "genes.json",
  ANNDATA_EXPRESSION_MATRIX_ZARR: "anndata-expression-matrix.zarr"
};
const CoordinationType$1 = {
  META_COORDINATION_SCOPES: "metaCoordinationScopes",
  META_COORDINATION_SCOPES_BY: "metaCoordinationScopesBy",
  DATASET: "dataset",
  // Entity types
  OBS_TYPE: "obsType",
  FEATURE_TYPE: "featureType",
  FEATURE_VALUE_TYPE: "featureValueType",
  OBS_LABELS_TYPE: "obsLabelsType",
  FEATURE_LABELS_TYPE: "featureLabelsType",
  // Other types
  EMBEDDING_TYPE: "embeddingType",
  EMBEDDING_ZOOM: "embeddingZoom",
  EMBEDDING_ROTATION: "embeddingRotation",
  EMBEDDING_TARGET_X: "embeddingTargetX",
  EMBEDDING_TARGET_Y: "embeddingTargetY",
  EMBEDDING_TARGET_Z: "embeddingTargetZ",
  EMBEDDING_OBS_SET_POLYGONS_VISIBLE: "embeddingObsSetPolygonsVisible",
  EMBEDDING_OBS_SET_LABELS_VISIBLE: "embeddingObsSetLabelsVisible",
  EMBEDDING_OBS_SET_LABEL_SIZE: "embeddingObsSetLabelSize",
  EMBEDDING_OBS_RADIUS: "embeddingObsRadius",
  EMBEDDING_OBS_RADIUS_MODE: "embeddingObsRadiusMode",
  EMBEDDING_OBS_OPACITY: "embeddingObsOpacity",
  EMBEDDING_OBS_OPACITY_MODE: "embeddingObsOpacityMode",
  SPATIAL_ZOOM: "spatialZoom",
  SPATIAL_ROTATION: "spatialRotation",
  SPATIAL_TARGET_X: "spatialTargetX",
  SPATIAL_TARGET_Y: "spatialTargetY",
  SPATIAL_TARGET_Z: "spatialTargetZ",
  SPATIAL_TARGET_T: "spatialTargetT",
  SPATIAL_ROTATION_X: "spatialRotationX",
  SPATIAL_ROTATION_Y: "spatialRotationY",
  SPATIAL_ROTATION_Z: "spatialRotationZ",
  SPATIAL_ROTATION_ORBIT: "spatialRotationOrbit",
  SPATIAL_ORBIT_AXIS: "spatialOrbitAxis",
  SPATIAL_AXIS_FIXED: "spatialAxisFixed",
  HEATMAP_ZOOM_X: "heatmapZoomX",
  HEATMAP_ZOOM_Y: "heatmapZoomY",
  HEATMAP_TARGET_X: "heatmapTargetX",
  HEATMAP_TARGET_Y: "heatmapTargetY",
  OBS_HIGHLIGHT: "obsHighlight",
  OBS_SELECTION: "obsSelection",
  OBS_SET_SELECTION: "obsSetSelection",
  OBS_SELECTION_MODE: "obsSelectionMode",
  OBS_FILTER: "obsFilter",
  OBS_SET_FILTER: "obsSetFilter",
  OBS_FILTER_MODE: "obsFilterMode",
  OBS_SET_HIGHLIGHT: "obsSetHighlight",
  OBS_SET_EXPANSION: "obsSetExpansion",
  OBS_SET_COLOR: "obsSetColor",
  FEATURE_HIGHLIGHT: "featureHighlight",
  FEATURE_SELECTION: "featureSelection",
  FEATURE_SET_SELECTION: "featureSetSelection",
  FEATURE_SELECTION_MODE: "featureSelectionMode",
  FEATURE_FILTER: "featureFilter",
  FEATURE_SET_FILTER: "featureSetFilter",
  FEATURE_FILTER_MODE: "featureFilterMode",
  FEATURE_VALUE_COLORMAP: "featureValueColormap",
  FEATURE_VALUE_TRANSFORM: "featureValueTransform",
  FEATURE_VALUE_COLORMAP_RANGE: "featureValueColormapRange",
  FEATURE_AGGREGATION_STRATEGY: "featureAggregationStrategy",
  OBS_COLOR_ENCODING: "obsColorEncoding",
  SPATIAL_IMAGE_LAYER: "spatialImageLayer",
  SPATIAL_SEGMENTATION_LAYER: "spatialSegmentationLayer",
  SPATIAL_POINT_LAYER: "spatialPointLayer",
  SPATIAL_NEIGHBORHOOD_LAYER: "spatialNeighborhoodLayer",
  GENOMIC_ZOOM_X: "genomicZoomX",
  GENOMIC_ZOOM_Y: "genomicZoomY",
  GENOMIC_TARGET_X: "genomicTargetX",
  GENOMIC_TARGET_Y: "genomicTargetY",
  ADDITIONAL_OBS_SETS: "additionalObsSets",
  // TODO: use obsHighlight rather than moleculeHighlight.
  MOLECULE_HIGHLIGHT: "moleculeHighlight",
  GATING_FEATURE_SELECTION_X: "gatingFeatureSelectionX",
  GATING_FEATURE_SELECTION_Y: "gatingFeatureSelectionY",
  FEATURE_VALUE_TRANSFORM_COEFFICIENT: "featureValueTransformCoefficient",
  FEATURE_VALUE_POSITIVITY_THRESHOLD: "featureValuePositivityThreshold",
  TOOLTIPS_VISIBLE: "tooltipsVisible",
  FILE_UID: "fileUid",
  IMAGE_LAYER: "imageLayer",
  IMAGE_CHANNEL: "imageChannel",
  SEGMENTATION_LAYER: "segmentationLayer",
  SEGMENTATION_CHANNEL: "segmentationChannel",
  SPATIAL_TARGET_C: "spatialTargetC",
  SPATIAL_LAYER_VISIBLE: "spatialLayerVisible",
  SPATIAL_LAYER_OPACITY: "spatialLayerOpacity",
  SPATIAL_LAYER_COLORMAP: "spatialLayerColormap",
  SPATIAL_LAYER_TRANSPARENT_COLOR: "spatialLayerTransparentColor",
  SPATIAL_LAYER_MODEL_MATRIX: "spatialLayerModelMatrix",
  SPATIAL_SEGMENTATION_FILLED: "spatialSegmentationFilled",
  SPATIAL_SEGMENTATION_STROKE_WIDTH: "spatialSegmentationStrokeWidth",
  SPATIAL_CHANNEL_COLOR: "spatialChannelColor",
  SPATIAL_CHANNEL_VISIBLE: "spatialChannelVisible",
  SPATIAL_CHANNEL_OPACITY: "spatialChannelOpacity",
  SPATIAL_CHANNEL_WINDOW: "spatialChannelWindow",
  PHOTOMETRIC_INTERPRETATION: "photometricInterpretation",
  // For 3D volume rendering
  SPATIAL_RENDERING_MODE: "spatialRenderingMode",
  // For whole spatial view
  VOLUMETRIC_RENDERING_ALGORITHM: "volumetricRenderingAlgorithm",
  // Could be per-image-layer
  SPATIAL_TARGET_RESOLUTION: "spatialTargetResolution",
  // Per-spatial-layer
  // For clipping plane sliders
  SPATIAL_SLICE_X: "spatialSliceX",
  SPATIAL_SLICE_Y: "spatialSliceY",
  SPATIAL_SLICE_Z: "spatialSliceZ",
  // For spatial spot and point layers
  SPOT_LAYER: "spotLayer",
  POINT_LAYER: "pointLayer",
  SPATIAL_SPOT_RADIUS: "spatialSpotRadius",
  // In micrometers?
  SPATIAL_SPOT_FILLED: "spatialSpotFilled",
  SPATIAL_SPOT_STROKE_WIDTH: "spatialSpotStrokeWidth",
  SPATIAL_LAYER_COLOR: "spatialLayerColor",
  PIXEL_HIGHLIGHT: "pixelHighlight",
  // Per-image-layer
  TOOLTIP_CROSSHAIRS_VISIBLE: "tooltipCrosshairsVisible",
  LEGEND_VISIBLE: "legendVisible",
  SPATIAL_CHANNEL_LABELS_VISIBLE: "spatialChannelLabelsVisible",
  SPATIAL_CHANNEL_LABELS_ORIENTATION: "spatialChannelLabelsOrientation",
  SPATIAL_CHANNEL_LABEL_SIZE: "spatialChannelLabelSize",
  // Multi-sample / comparative
  SAMPLE_TYPE: "sampleType",
  SAMPLE_SELECTION: "sampleSelection",
  SAMPLE_SET_SELECTION: "sampleSetSelection",
  SAMPLE_SELECTION_MODE: "sampleSelectionMode",
  SAMPLE_FILTER: "sampleFilter",
  SAMPLE_SET_FILTER: "sampleSetFilter",
  SAMPLE_FILTER_MODE: "sampleFilterMode",
  SAMPLE_SET_COLOR: "sampleSetColor",
  SAMPLE_HIGHLIGHT: "sampleHighlight",
  EMBEDDING_POINTS_VISIBLE: "embeddingPointsVisible",
  EMBEDDING_CONTOURS_VISIBLE: "embeddingContoursVisible",
  EMBEDDING_CONTOURS_FILLED: "embeddingContoursFilled",
  EMBEDDING_CONTOUR_PERCENTILES: "embeddingContourPercentiles",
  CONTOUR_COLOR_ENCODING: "contourColorEncoding",
  CONTOUR_COLOR: "contourColor",
  // For volcano plot:
  FEATURE_POINT_SIGNIFICANCE_THRESHOLD: "featurePointSignificanceThreshold",
  FEATURE_LABEL_SIGNIFICANCE_THRESHOLD: "featureLabelSignificanceThreshold",
  FEATURE_POINT_FOLD_CHANGE_THRESHOLD: "featurePointFoldChangeThreshold",
  FEATURE_LABEL_FOLD_CHANGE_THRESHOLD: "featureLabelFoldChangeThreshold",
  // Treemap
  HIERARCHY_LEVELS: "hierarchyLevels"
};
const DEFAULT_CELLS_LAYER = {
  opacity: 1,
  radius: 50,
  visible: true,
  stroked: false
};
function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var pluralize = { exports: {} };
(function(module2, exports2) {
  (function(root2, pluralize2) {
    if (typeof commonjsRequire === "function" && true && true) {
      module2.exports = pluralize2();
    } else {
      root2.pluralize = pluralize2();
    }
  })(commonjsGlobal, function() {
    var pluralRules = [];
    var singularRules = [];
    var uncountables = {};
    var irregularPlurals = {};
    var irregularSingles = {};
    function sanitizeRule(rule) {
      if (typeof rule === "string") {
        return new RegExp("^" + rule + "$", "i");
      }
      return rule;
    }
    function restoreCase(word, token) {
      if (word === token)
        return token;
      if (word === word.toLowerCase())
        return token.toLowerCase();
      if (word === word.toUpperCase())
        return token.toUpperCase();
      if (word[0] === word[0].toUpperCase()) {
        return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
      }
      return token.toLowerCase();
    }
    function interpolate(str, args) {
      return str.replace(/\$(\d{1,2})/g, function(match, index) {
        return args[index] || "";
      });
    }
    function replace(word, rule) {
      return word.replace(rule[0], function(match, index) {
        var result = interpolate(rule[1], arguments);
        if (match === "") {
          return restoreCase(word[index - 1], result);
        }
        return restoreCase(match, result);
      });
    }
    function sanitizeWord(token, word, rules) {
      if (!token.length || uncountables.hasOwnProperty(token)) {
        return word;
      }
      var len = rules.length;
      while (len--) {
        var rule = rules[len];
        if (rule[0].test(word))
          return replace(word, rule);
      }
      return word;
    }
    function replaceWord(replaceMap, keepMap, rules) {
      return function(word) {
        var token = word.toLowerCase();
        if (keepMap.hasOwnProperty(token)) {
          return restoreCase(word, token);
        }
        if (replaceMap.hasOwnProperty(token)) {
          return restoreCase(word, replaceMap[token]);
        }
        return sanitizeWord(token, word, rules);
      };
    }
    function checkWord(replaceMap, keepMap, rules, bool) {
      return function(word) {
        var token = word.toLowerCase();
        if (keepMap.hasOwnProperty(token))
          return true;
        if (replaceMap.hasOwnProperty(token))
          return false;
        return sanitizeWord(token, token, rules) === token;
      };
    }
    function pluralize2(word, count, inclusive) {
      var pluralized = count === 1 ? pluralize2.singular(word) : pluralize2.plural(word);
      return (inclusive ? count + " " : "") + pluralized;
    }
    pluralize2.plural = replaceWord(
      irregularSingles,
      irregularPlurals,
      pluralRules
    );
    pluralize2.isPlural = checkWord(
      irregularSingles,
      irregularPlurals,
      pluralRules
    );
    pluralize2.singular = replaceWord(
      irregularPlurals,
      irregularSingles,
      singularRules
    );
    pluralize2.isSingular = checkWord(
      irregularPlurals,
      irregularSingles,
      singularRules
    );
    pluralize2.addPluralRule = function(rule, replacement) {
      pluralRules.push([sanitizeRule(rule), replacement]);
    };
    pluralize2.addSingularRule = function(rule, replacement) {
      singularRules.push([sanitizeRule(rule), replacement]);
    };
    pluralize2.addUncountableRule = function(word) {
      if (typeof word === "string") {
        uncountables[word.toLowerCase()] = true;
        return;
      }
      pluralize2.addPluralRule(word, "$0");
      pluralize2.addSingularRule(word, "$0");
    };
    pluralize2.addIrregularRule = function(single, plural) {
      plural = plural.toLowerCase();
      single = single.toLowerCase();
      irregularSingles[single] = plural;
      irregularPlurals[plural] = single;
    };
    [
      // Pronouns.
      ["I", "we"],
      ["me", "us"],
      ["he", "they"],
      ["she", "they"],
      ["them", "them"],
      ["myself", "ourselves"],
      ["yourself", "yourselves"],
      ["itself", "themselves"],
      ["herself", "themselves"],
      ["himself", "themselves"],
      ["themself", "themselves"],
      ["is", "are"],
      ["was", "were"],
      ["has", "have"],
      ["this", "these"],
      ["that", "those"],
      // Words ending in with a consonant and `o`.
      ["echo", "echoes"],
      ["dingo", "dingoes"],
      ["volcano", "volcanoes"],
      ["tornado", "tornadoes"],
      ["torpedo", "torpedoes"],
      // Ends with `us`.
      ["genus", "genera"],
      ["viscus", "viscera"],
      // Ends with `ma`.
      ["stigma", "stigmata"],
      ["stoma", "stomata"],
      ["dogma", "dogmata"],
      ["lemma", "lemmata"],
      ["schema", "schemata"],
      ["anathema", "anathemata"],
      // Other irregular rules.
      ["ox", "oxen"],
      ["axe", "axes"],
      ["die", "dice"],
      ["yes", "yeses"],
      ["foot", "feet"],
      ["eave", "eaves"],
      ["goose", "geese"],
      ["tooth", "teeth"],
      ["quiz", "quizzes"],
      ["human", "humans"],
      ["proof", "proofs"],
      ["carve", "carves"],
      ["valve", "valves"],
      ["looey", "looies"],
      ["thief", "thieves"],
      ["groove", "grooves"],
      ["pickaxe", "pickaxes"],
      ["passerby", "passersby"]
    ].forEach(function(rule) {
      return pluralize2.addIrregularRule(rule[0], rule[1]);
    });
    [
      [/s?$/i, "s"],
      [/[^\u0000-\u007F]$/i, "$0"],
      [/([^aeiou]ese)$/i, "$1"],
      [/(ax|test)is$/i, "$1es"],
      [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, "$1es"],
      [/(e[mn]u)s?$/i, "$1s"],
      [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, "$1"],
      [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1i"],
      [/(alumn|alg|vertebr)(?:a|ae)$/i, "$1ae"],
      [/(seraph|cherub)(?:im)?$/i, "$1im"],
      [/(her|at|gr)o$/i, "$1oes"],
      [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, "$1a"],
      [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, "$1a"],
      [/sis$/i, "ses"],
      [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, "$1$2ves"],
      [/([^aeiouy]|qu)y$/i, "$1ies"],
      [/([^ch][ieo][ln])ey$/i, "$1ies"],
      [/(x|ch|ss|sh|zz)$/i, "$1es"],
      [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, "$1ices"],
      [/\b((?:tit)?m|l)(?:ice|ouse)$/i, "$1ice"],
      [/(pe)(?:rson|ople)$/i, "$1ople"],
      [/(child)(?:ren)?$/i, "$1ren"],
      [/eaux$/i, "$0"],
      [/m[ae]n$/i, "men"],
      ["thou", "you"]
    ].forEach(function(rule) {
      return pluralize2.addPluralRule(rule[0], rule[1]);
    });
    [
      [/s$/i, ""],
      [/(ss)$/i, "$1"],
      [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, "$1fe"],
      [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, "$1f"],
      [/ies$/i, "y"],
      [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, "$1ie"],
      [/\b(mon|smil)ies$/i, "$1ey"],
      [/\b((?:tit)?m|l)ice$/i, "$1ouse"],
      [/(seraph|cherub)im$/i, "$1"],
      [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i, "$1"],
      [/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i, "$1sis"],
      [/(movie|twelve|abuse|e[mn]u)s$/i, "$1"],
      [/(test)(?:is|es)$/i, "$1is"],
      [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1us"],
      [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, "$1um"],
      [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, "$1on"],
      [/(alumn|alg|vertebr)ae$/i, "$1a"],
      [/(cod|mur|sil|vert|ind)ices$/i, "$1ex"],
      [/(matr|append)ices$/i, "$1ix"],
      [/(pe)(rson|ople)$/i, "$1rson"],
      [/(child)ren$/i, "$1"],
      [/(eau)x?$/i, "$1"],
      [/men$/i, "man"]
    ].forEach(function(rule) {
      return pluralize2.addSingularRule(rule[0], rule[1]);
    });
    [
      // Singular words with no plurals.
      "adulthood",
      "advice",
      "agenda",
      "aid",
      "aircraft",
      "alcohol",
      "ammo",
      "analytics",
      "anime",
      "athletics",
      "audio",
      "bison",
      "blood",
      "bream",
      "buffalo",
      "butter",
      "carp",
      "cash",
      "chassis",
      "chess",
      "clothing",
      "cod",
      "commerce",
      "cooperation",
      "corps",
      "debris",
      "diabetes",
      "digestion",
      "elk",
      "energy",
      "equipment",
      "excretion",
      "expertise",
      "firmware",
      "flounder",
      "fun",
      "gallows",
      "garbage",
      "graffiti",
      "hardware",
      "headquarters",
      "health",
      "herpes",
      "highjinks",
      "homework",
      "housework",
      "information",
      "jeans",
      "justice",
      "kudos",
      "labour",
      "literature",
      "machinery",
      "mackerel",
      "mail",
      "media",
      "mews",
      "moose",
      "music",
      "mud",
      "manga",
      "news",
      "only",
      "personnel",
      "pike",
      "plankton",
      "pliers",
      "police",
      "pollution",
      "premises",
      "rain",
      "research",
      "rice",
      "salmon",
      "scissors",
      "series",
      "sewage",
      "shambles",
      "shrimp",
      "software",
      "species",
      "staff",
      "swine",
      "tennis",
      "traffic",
      "transportation",
      "trout",
      "tuna",
      "wealth",
      "welfare",
      "whiting",
      "wildebeest",
      "wildlife",
      "you",
      /pok[eé]mon$/i,
      // Regexes.
      /[^aeiou]ese$/i,
      // "chinese", "japanese"
      /deer$/i,
      // "deer", "reindeer"
      /fish$/i,
      // "fish", "blowfish", "angelfish"
      /measles$/i,
      /o[iu]s$/i,
      // "carnivorous"
      /pox$/i,
      // "chickpox", "smallpox"
      /sheep$/i
    ].forEach(pluralize2.addUncountableRule);
    return pluralize2;
  });
})(pluralize);
var pluralizeExports = pluralize.exports;
const plur = /* @__PURE__ */ getDefaultExportFromCjs(pluralizeExports);
plur.addPluralRule("glomerulus", "glomeruli");
plur.addPluralRule("interstitium", "interstitia");
function capitalize(word) {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : "";
}
function getNextScope(prevScopes) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nextCharIndices = [0];
  function next() {
    const r = [];
    nextCharIndices.forEach((charIndex) => {
      r.unshift(chars[charIndex]);
    });
    let increment = true;
    for (let i = 0; i < nextCharIndices.length; i++) {
      const val = ++nextCharIndices[i];
      if (val >= chars.length) {
        nextCharIndices[i] = 0;
      } else {
        increment = false;
        break;
      }
    }
    if (increment) {
      nextCharIndices.push(0);
    }
    return r.join("");
  }
  let nextScope;
  do {
    nextScope = next();
  } while (prevScopes.includes(nextScope));
  return nextScope;
}
const PALETTE = [
  [68, 119, 170],
  [136, 204, 238],
  [68, 170, 153],
  [17, 119, 51],
  [153, 153, 51],
  [221, 204, 119],
  [204, 102, 119],
  [136, 34, 85],
  [170, 68, 153]
];
class CoordinationLevel {
  constructor(value) {
    this.value = value;
    this.cachedValue = null;
  }
  setCached(processedLevel) {
    this.cachedValue = processedLevel;
  }
  getCached() {
    return this.cachedValue;
  }
  isCached() {
    return this.cachedValue !== null;
  }
}
function CL(value) {
  return new CoordinationLevel(value);
}
class ObsSpotsAnndataLoader extends AbstractTwoStepLoader {
  /**
   * Class method for loading embedding coordinates, such as those from UMAP or t-SNE.
   * @returns {Promise} A promise for an array of columns.
   */
  async loadSpots() {
    const { path, dims = [0, 1] } = this.options;
    if (this.locations) {
      return this.locations;
    }
    if (!this.locations) {
      this.locations = await this.dataSource.loadNumericForDims(path, dims);
      return this.locations;
    }
    this.locations = Promise.resolve(null);
    return this.locations;
  }
  async load() {
    const { path } = this.options;
    const superResult = await super.load().catch((reason) => Promise.resolve(reason));
    if (superResult instanceof AbstractLoaderError) {
      return Promise.reject(superResult);
    }
    const coordinationValues = {
      spotLayer: CL({
        obsType: "spot",
        // obsColorEncoding: 'spatialLayerColor',
        // spatialLayerColor: [255, 255, 255],
        spatialLayerVisible: true,
        spatialLayerOpacity: 1,
        spatialSpotRadius: 10
        // TODO: get this from adata.uns if possible.
        // TODO: spatialSpotRadiusUnit: 'µm' or 'um'
        // after resolving https://github.com/vitessce/vitessce/issues/1760
        // featureValueColormapRange: [0, 1],
        // obsHighlight: null,
        // obsSetColor: null,
        // obsSetSelection: null,
        // additionalObsSets: null,
      })
    };
    return Promise.all([
      this.dataSource.loadObsIndex(path),
      this.loadSpots()
    ]).then(([obsIndex, obsSpots]) => Promise.resolve(new LoaderResult(
      { obsIndex, obsSpots },
      null,
      coordinationValues
    )));
  }
}
class ObsPointsAnndataLoader extends AbstractTwoStepLoader {
  /**
   * Class method for loading embedding coordinates, such as those from UMAP or t-SNE.
   * @returns {Promise} A promise for an array of columns.
   */
  async loadPoints() {
    const { path, dims = [0, 1] } = this.options;
    if (this.locations) {
      return this.locations;
    }
    if (!this.locations) {
      this.locations = await this.dataSource.loadNumericForDims(path, dims);
      return this.locations;
    }
    this.locations = Promise.resolve(null);
    return this.locations;
  }
  async load() {
    const { path } = this.options;
    const superResult = await super.load().catch((reason) => Promise.resolve(reason));
    if (superResult instanceof AbstractLoaderError) {
      return Promise.reject(superResult);
    }
    const coordinationValues = {
      pointLayer: CL({
        obsType: "point",
        // obsColorEncoding: 'spatialLayerColor',
        // spatialLayerColor: [255, 255, 255],
        spatialLayerVisible: true,
        spatialLayerOpacity: 1
        // TODO: support a point radius?
        // featureValueColormapRange: [0, 1],
        // obsHighlight: null,
        // obsSetColor: null,
        // obsSetSelection: null,
        // additionalObsSets: null,
        // obsLabelsType: null,
      })
    };
    return Promise.all([
      this.dataSource.loadObsIndex(path),
      this.loadPoints()
    ]).then(([obsIndex, obsPoints]) => Promise.resolve(new LoaderResult(
      { obsIndex, obsPoints },
      null,
      coordinationValues
    )));
  }
}
class ObsLocationsAnndataLoader extends AbstractTwoStepLoader {
  /**
   * Class method for loading embedding coordinates, such as those from UMAP or t-SNE.
   * @returns {Promise} A promise for an array of columns.
   */
  async loadLocations() {
    const { path, dims = [0, 1] } = this.options;
    if (this.locations) {
      return this.locations;
    }
    if (!this.locations) {
      this.locations = await this.dataSource.loadNumericForDims(path, dims);
      return this.locations;
    }
    this.locations = Promise.resolve(null);
    return this.locations;
  }
  async load() {
    const { path } = this.options;
    const superResult = await super.load().catch((reason) => Promise.resolve(reason));
    if (superResult instanceof AbstractLoaderError) {
      return Promise.reject(superResult);
    }
    return Promise.all([
      this.dataSource.loadObsIndex(path),
      this.loadLocations()
    ]).then(([obsIndex, obsLocations]) => Promise.resolve(new LoaderResult(
      { obsIndex, obsLocations },
      null
    )));
  }
}
class ObsSegmentationsAnndataLoader extends AbstractTwoStepLoader {
  /**
   * Class method for loading embedding coordinates, such as those from UMAP or t-SNE.
   * @returns {Promise} A promise for an array of columns.
   */
  async loadSegmentations() {
    const { path } = this.options;
    if (this.segmentations) {
      return this.segmentations;
    }
    if (!this.segmentations) {
      const arr = await this.dataSource.loadNumeric(path);
      const { stride, shape, data } = arr;
      const result = [];
      let i = 0;
      for (let polyI = 0; polyI < shape[0]; polyI++) {
        const poly = [];
        for (let vertexI = 0; vertexI < shape[1]; vertexI++) {
          i = polyI * stride[0] + vertexI * stride[1];
          poly.push([data[i], data[i + 1]]);
        }
        result.push(poly);
      }
      this.segmentations = {
        ...arr,
        // Bug introduced from DeckGL v8.6.x to v8.8.x:
        // Polygon vertices cannot be passed via Uint32Arrays, which is how they load via Zarr.
        // For now, a workaround is to cast each vertex to a plain Array.
        data: result
      };
      return this.segmentations;
    }
    this.segmentations = Promise.resolve(null);
    return this.segmentations;
  }
  async load() {
    var _a2;
    const { path } = this.options;
    const superResult = await super.load().catch((reason) => Promise.resolve(reason));
    if (superResult instanceof AbstractLoaderError) {
      return Promise.reject(superResult);
    }
    const channelCoordination = [{
      // obsType: null,
      spatialChannelColor: [255, 255, 255],
      spatialChannelVisible: true,
      spatialChannelOpacity: 1,
      spatialChannelWindow: null,
      // featureType: 'feature',
      // featureValueType: 'value',
      obsColorEncoding: "spatialChannelColor",
      spatialSegmentationFilled: true,
      spatialSegmentationStrokeWidth: 1,
      obsHighlight: null
    }];
    const coordinationValues = {
      // Old
      spatialSegmentationLayer: DEFAULT_CELLS_LAYER,
      // New
      // spatialTargetZ: imageWrapper.getDefaultTargetZ(),
      // spatialTargetT: imageWrapper.getDefaultTargetT(),
      segmentationLayer: CL([
        {
          fileUid: ((_a2 = this.coordinationValues) == null ? void 0 : _a2.fileUid) || null,
          spatialLayerOpacity: 1,
          spatialLayerVisible: true,
          segmentationChannel: CL(channelCoordination)
        }
      ])
    };
    return Promise.all([
      this.dataSource.loadObsIndex(path),
      this.loadSegmentations()
    ]).then(([obsIndex, obsSegmentations]) => Promise.resolve(new LoaderResult(
      {
        obsIndex,
        obsSegmentations,
        obsSegmentationsType: "polygon"
      },
      null,
      coordinationValues
    )));
  }
}
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const native = {
  randomUUID
};
function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
const freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal$1 || freeSelf || Function("return this")();
const root$1 = root;
var Symbol$1 = root$1.Symbol;
const Symbol$2 = Symbol$1;
var objectProto$e = Object.prototype;
var hasOwnProperty$b = objectProto$e.hasOwnProperty;
var nativeObjectToString$1 = objectProto$e.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$b.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$d = Object.prototype;
var nativeObjectToString = objectProto$d.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var symbolTag$3 = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$3;
}
var isArray = Array.isArray;
const isArray$1 = isArray;
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
var reTrimStart = /^\s+/;
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var INFINITY = 1 / 0, MAX_INTEGER = 17976931348623157e292;
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root$1["__core-js_shared__"];
const coreJsData$1 = coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$1 = Function.prototype;
var funcToString$1 = funcProto$1.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype, objectProto$c = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$a = objectProto$c.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString.call(hasOwnProperty$a).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var WeakMap$1 = getNative(root$1, "WeakMap");
const WeakMap$2 = WeakMap$1;
var objectCreate = Object.create;
var baseCreate = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
const baseCreate$1 = baseCreate;
function copyArray(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var defineProperty = function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
const defineProperty$1 = defineProperty;
function arrayEach(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var MAX_SAFE_INTEGER$3 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$3 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty$1) {
    defineProperty$1(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
function eq$4(value, other) {
  return value === other || value !== value && other !== other;
}
var objectProto$b = Object.prototype;
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$9.call(object, key) && eq$4(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}
var MAX_SAFE_INTEGER$2 = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$2;
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
    return eq$4(object[index], value);
  }
  return false;
}
var objectProto$a = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$a;
  return value === proto;
}
function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var argsTag$3 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$3;
}
var objectProto$9 = Object.prototype;
var hasOwnProperty$8 = objectProto$9.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$9.propertyIsEnumerable;
var isArguments = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$8.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
const isArguments$1 = isArguments;
function stubFalse() {
  return false;
}
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
var Buffer$1 = moduleExports$2 ? root$1.Buffer : void 0;
var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse;
const isBuffer$1 = isBuffer;
var argsTag$2 = "[object Arguments]", arrayTag$2 = "[object Array]", boolTag$3 = "[object Boolean]", dateTag$3 = "[object Date]", errorTag$2 = "[object Error]", funcTag$1 = "[object Function]", mapTag$5 = "[object Map]", numberTag$3 = "[object Number]", objectTag$3 = "[object Object]", regexpTag$3 = "[object RegExp]", setTag$5 = "[object Set]", stringTag$3 = "[object String]", weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$3 = "[object ArrayBuffer]", dataViewTag$4 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] = typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] = typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] = typedArrayTags[errorTag$2] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$5] = typedArrayTags[numberTag$3] = typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$3] = typedArrayTags[setTag$5] = typedArrayTags[stringTag$3] = typedArrayTags[weakMapTag$2] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var freeProcess = moduleExports$1 && freeGlobal$1.process;
var nodeUtil = function() {
  try {
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
const nodeUtil$1 = nodeUtil;
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
const isTypedArray$1 = isTypedArray;
var objectProto$8 = Object.prototype;
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray$1(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$7.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var nativeKeys = overArg(Object.keys, Object);
const nativeKeys$1 = nativeKeys;
var objectProto$7 = Object.prototype;
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys$1(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$6.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$5.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var nativeCreate = getNative(Object, "create");
const nativeCreate$1 = nativeCreate;
function hashClear() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
  this.size = 0;
}
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate$1) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? void 0 : result;
  }
  return hasOwnProperty$4.call(data, key) ? data[key] : void 0;
}
var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$3.call(data, key);
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED$1 : value;
  return this;
}
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$4(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  return index < 0 ? void 0 : data[index][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
var Map$1 = getNative(root$1, "Map");
const Map$2 = Map$1;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$2 || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function mapCacheDelete(key) {
  var result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
function arrayPush(array, values) {
  var index = -1, length = values.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
var getPrototype = overArg(Object.getPrototypeOf, Object);
const getPrototype$1 = getPrototype;
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
function stackGet(key) {
  return this.__data__.get(key);
}
function stackHas(key) {
  return this.__data__.has(key);
}
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer2 = moduleExports ? root$1.Buffer : void 0, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
function stubArray() {
  return [];
}
var objectProto$3 = Object.prototype;
var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols$1 ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
const getSymbols$1 = getSymbols;
function copySymbols(source, object) {
  return copyObject(source, getSymbols$1(source), object);
}
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols$1(object));
    object = getPrototype$1(object);
  }
  return result;
};
const getSymbolsIn$1 = getSymbolsIn;
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn$1(source), object);
}
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
}
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols$1);
}
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn$1);
}
var DataView$1 = getNative(root$1, "DataView");
const DataView$2 = DataView$1;
var Promise$1 = getNative(root$1, "Promise");
const Promise$2 = Promise$1;
var Set$1 = getNative(root$1, "Set");
const Set$2 = Set$1;
var mapTag$4 = "[object Map]", objectTag$2 = "[object Object]", promiseTag = "[object Promise]", setTag$4 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
var dataViewTag$3 = "[object DataView]";
var dataViewCtorString = toSource(DataView$2), mapCtorString = toSource(Map$2), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$2), weakMapCtorString = toSource(WeakMap$2);
var getTag = baseGetTag;
if (DataView$2 && getTag(new DataView$2(new ArrayBuffer(1))) != dataViewTag$3 || Map$2 && getTag(new Map$2()) != mapTag$4 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$2 && getTag(new Set$2()) != setTag$4 || WeakMap$2 && getTag(new WeakMap$2()) != weakMapTag$1) {
  getTag = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag$2 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$3;
        case mapCtorString:
          return mapTag$4;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$4;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
const getTag$1 = getTag;
var objectProto$2 = Object.prototype;
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
function initCloneArray(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty$2.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var Uint8Array$1 = root$1.Uint8Array;
const Uint8Array$2 = Uint8Array$1;
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$2(result).set(new Uint8Array$2(arrayBuffer));
  return result;
}
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var reFlags = /\w*$/;
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : void 0;
function cloneSymbol(symbol) {
  return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
}
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", mapTag$3 = "[object Map]", numberTag$2 = "[object Number]", regexpTag$2 = "[object RegExp]", setTag$3 = "[object Set]", stringTag$2 = "[object String]", symbolTag$2 = "[object Symbol]";
var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$2:
      return cloneArrayBuffer(object);
    case boolTag$2:
    case dateTag$2:
      return new Ctor(+object);
    case dataViewTag$2:
      return cloneDataView(object, isDeep);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(object, isDeep);
    case mapTag$3:
      return new Ctor();
    case numberTag$2:
    case stringTag$2:
      return new Ctor(object);
    case regexpTag$2:
      return cloneRegExp(object);
    case setTag$3:
      return new Ctor();
    case symbolTag$2:
      return cloneSymbol(object);
  }
}
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate$1(getPrototype$1(object)) : {};
}
var mapTag$2 = "[object Map]";
function baseIsMap(value) {
  return isObjectLike(value) && getTag$1(value) == mapTag$2;
}
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
const isMap$1 = isMap;
var setTag$2 = "[object Set]";
function baseIsSet(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$2;
}
var nodeIsSet = nodeUtil$1 && nodeUtil$1.isSet;
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
const isSet$1 = isSet;
var CLONE_DEEP_FLAG$1 = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$1 = 4;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag$1 = "[object Map]", numberTag$1 = "[object Number]", objectTag$1 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$1 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag$1] = cloneableTags[arrayTag$1] = cloneableTags[arrayBufferTag$1] = cloneableTags[dataViewTag$1] = cloneableTags[boolTag$1] = cloneableTags[dateTag$1] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag$1] = cloneableTags[numberTag$1] = cloneableTags[objectTag$1] = cloneableTags[regexpTag$1] = cloneableTags[setTag$1] = cloneableTags[stringTag$1] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag$1] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG$1, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray$1(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value), isFunc = tag == funcTag || tag == genTag;
    if (isBuffer$1(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag$1 || tag == argsTag$1 || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet$1(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap$1(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}
function setCacheHas(value) {
  return this.__data__.has(value);
}
function SetCache(values) {
  var index = -1, length = values == null ? 0 : values.length;
  this.__data__ = new MapCache();
  while (++index < length) {
    this.add(values[index]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
function arraySome(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
function cacheHas(cache, key) {
  return cache.has(key);
}
var COMPARE_PARTIAL_FLAG$3 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$1 ? new SetCache() : void 0;
  stack.set(array, other);
  stack.set(other, array);
  while (++index < arrLength) {
    var arrValue = array[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!arraySome(other, function(othValue2, othIndex) {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result;
}
function mapToArray(map) {
  var index = -1, result = Array(map.size);
  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
function setToArray(set) {
  var index = -1, result = Array(set.size);
  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
var COMPARE_PARTIAL_FLAG$2 = 1, COMPARE_UNORDERED_FLAG = 2;
var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$2(object), new Uint8Array$2(other))) {
        return false;
      }
      return true;
    case boolTag:
    case dateTag:
    case numberTag:
      return eq$4(+object, +other);
    case errorTag:
      return object.name == other.name && object.message == other.message;
    case regexpTag:
    case stringTag:
      return object == other + "";
    case mapTag:
      var convert = mapToArray;
    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2;
      convert || (convert = setToArray);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object);
      return result;
    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}
var COMPARE_PARTIAL_FLAG$1 = 1;
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result;
}
var COMPARE_PARTIAL_FLAG = 1;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray$1(object), othIsArr = isArray$1(other), objTag = objIsArr ? arrayTag : getTag$1(object), othTag = othIsArr ? arrayTag : getTag$1(other);
  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;
  var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer$1(object)) {
    if (!isBuffer$1(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack());
    return objIsArr || isTypedArray$1(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack());
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}
function isEqual(value, other) {
  return baseIsEqual(value, other);
}
var nativeCeil = Math.ceil, nativeMax = Math.max;
function baseRange(start, end, step, fromRight) {
  var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result = Array(length);
  while (length--) {
    result[fromRight ? length : ++index] = start;
    start += step;
  }
  return result;
}
function createRange(fromRight) {
  return function(start, end, step) {
    if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
      end = step = void 0;
    }
    start = toFinite(start);
    if (end === void 0) {
      end = start;
      start = 0;
    } else {
      end = toFinite(end);
    }
    step = step === void 0 ? start < end ? 1 : -1 : toFinite(step);
    return baseRange(start, end, step, fromRight);
  };
}
var range$1 = createRange();
const range$2 = range$1;
var concaveman$1 = { exports: {} };
var rbush_min = { exports: {} };
(function(module2, exports2) {
  !function(t2, i) {
    module2.exports = i();
  }(commonjsGlobal, function() {
    function t2(t3, r2, e2, a2, h2) {
      !function t4(n2, r3, e3, a3, h3) {
        for (; a3 > e3; ) {
          if (a3 - e3 > 600) {
            var o2 = a3 - e3 + 1, s2 = r3 - e3 + 1, l2 = Math.log(o2), f2 = 0.5 * Math.exp(2 * l2 / 3), u2 = 0.5 * Math.sqrt(l2 * f2 * (o2 - f2) / o2) * (s2 - o2 / 2 < 0 ? -1 : 1), m2 = Math.max(e3, Math.floor(r3 - s2 * f2 / o2 + u2)), c2 = Math.min(a3, Math.floor(r3 + (o2 - s2) * f2 / o2 + u2));
            t4(n2, r3, m2, c2, h3);
          }
          var p2 = n2[r3], d2 = e3, x = a3;
          for (i(n2, e3, r3), h3(n2[a3], p2) > 0 && i(n2, e3, a3); d2 < x; ) {
            for (i(n2, d2, x), d2++, x--; h3(n2[d2], p2) < 0; )
              d2++;
            for (; h3(n2[x], p2) > 0; )
              x--;
          }
          0 === h3(n2[e3], p2) ? i(n2, e3, x) : i(n2, ++x, a3), x <= r3 && (e3 = x + 1), r3 <= x && (a3 = x - 1);
        }
      }(t3, r2, e2 || 0, a2 || t3.length - 1, h2 || n);
    }
    function i(t3, i2, n2) {
      var r2 = t3[i2];
      t3[i2] = t3[n2], t3[n2] = r2;
    }
    function n(t3, i2) {
      return t3 < i2 ? -1 : t3 > i2 ? 1 : 0;
    }
    var r = function(t3) {
      void 0 === t3 && (t3 = 9), this._maxEntries = Math.max(4, t3), this._minEntries = Math.max(2, Math.ceil(0.4 * this._maxEntries)), this.clear();
    };
    function e(t3, i2, n2) {
      if (!n2)
        return i2.indexOf(t3);
      for (var r2 = 0; r2 < i2.length; r2++)
        if (n2(t3, i2[r2]))
          return r2;
      return -1;
    }
    function a(t3, i2) {
      h(t3, 0, t3.children.length, i2, t3);
    }
    function h(t3, i2, n2, r2, e2) {
      e2 || (e2 = p(null)), e2.minX = 1 / 0, e2.minY = 1 / 0, e2.maxX = -1 / 0, e2.maxY = -1 / 0;
      for (var a2 = i2; a2 < n2; a2++) {
        var h2 = t3.children[a2];
        o(e2, t3.leaf ? r2(h2) : h2);
      }
      return e2;
    }
    function o(t3, i2) {
      return t3.minX = Math.min(t3.minX, i2.minX), t3.minY = Math.min(t3.minY, i2.minY), t3.maxX = Math.max(t3.maxX, i2.maxX), t3.maxY = Math.max(t3.maxY, i2.maxY), t3;
    }
    function s(t3, i2) {
      return t3.minX - i2.minX;
    }
    function l(t3, i2) {
      return t3.minY - i2.minY;
    }
    function f(t3) {
      return (t3.maxX - t3.minX) * (t3.maxY - t3.minY);
    }
    function u(t3) {
      return t3.maxX - t3.minX + (t3.maxY - t3.minY);
    }
    function m(t3, i2) {
      return t3.minX <= i2.minX && t3.minY <= i2.minY && i2.maxX <= t3.maxX && i2.maxY <= t3.maxY;
    }
    function c(t3, i2) {
      return i2.minX <= t3.maxX && i2.minY <= t3.maxY && i2.maxX >= t3.minX && i2.maxY >= t3.minY;
    }
    function p(t3) {
      return { children: t3, height: 1, leaf: true, minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 };
    }
    function d(i2, n2, r2, e2, a2) {
      for (var h2 = [n2, r2]; h2.length; )
        if (!((r2 = h2.pop()) - (n2 = h2.pop()) <= e2)) {
          var o2 = n2 + Math.ceil((r2 - n2) / e2 / 2) * e2;
          t2(i2, o2, n2, r2, a2), h2.push(n2, o2, o2, r2);
        }
    }
    return r.prototype.all = function() {
      return this._all(this.data, []);
    }, r.prototype.search = function(t3) {
      var i2 = this.data, n2 = [];
      if (!c(t3, i2))
        return n2;
      for (var r2 = this.toBBox, e2 = []; i2; ) {
        for (var a2 = 0; a2 < i2.children.length; a2++) {
          var h2 = i2.children[a2], o2 = i2.leaf ? r2(h2) : h2;
          c(t3, o2) && (i2.leaf ? n2.push(h2) : m(t3, o2) ? this._all(h2, n2) : e2.push(h2));
        }
        i2 = e2.pop();
      }
      return n2;
    }, r.prototype.collides = function(t3) {
      var i2 = this.data;
      if (!c(t3, i2))
        return false;
      for (var n2 = []; i2; ) {
        for (var r2 = 0; r2 < i2.children.length; r2++) {
          var e2 = i2.children[r2], a2 = i2.leaf ? this.toBBox(e2) : e2;
          if (c(t3, a2)) {
            if (i2.leaf || m(t3, a2))
              return true;
            n2.push(e2);
          }
        }
        i2 = n2.pop();
      }
      return false;
    }, r.prototype.load = function(t3) {
      if (!t3 || !t3.length)
        return this;
      if (t3.length < this._minEntries) {
        for (var i2 = 0; i2 < t3.length; i2++)
          this.insert(t3[i2]);
        return this;
      }
      var n2 = this._build(t3.slice(), 0, t3.length - 1, 0);
      if (this.data.children.length)
        if (this.data.height === n2.height)
          this._splitRoot(this.data, n2);
        else {
          if (this.data.height < n2.height) {
            var r2 = this.data;
            this.data = n2, n2 = r2;
          }
          this._insert(n2, this.data.height - n2.height - 1, true);
        }
      else
        this.data = n2;
      return this;
    }, r.prototype.insert = function(t3) {
      return t3 && this._insert(t3, this.data.height - 1), this;
    }, r.prototype.clear = function() {
      return this.data = p([]), this;
    }, r.prototype.remove = function(t3, i2) {
      if (!t3)
        return this;
      for (var n2, r2, a2, h2 = this.data, o2 = this.toBBox(t3), s2 = [], l2 = []; h2 || s2.length; ) {
        if (h2 || (h2 = s2.pop(), r2 = s2[s2.length - 1], n2 = l2.pop(), a2 = true), h2.leaf) {
          var f2 = e(t3, h2.children, i2);
          if (-1 !== f2)
            return h2.children.splice(f2, 1), s2.push(h2), this._condense(s2), this;
        }
        a2 || h2.leaf || !m(h2, o2) ? r2 ? (n2++, h2 = r2.children[n2], a2 = false) : h2 = null : (s2.push(h2), l2.push(n2), n2 = 0, r2 = h2, h2 = h2.children[0]);
      }
      return this;
    }, r.prototype.toBBox = function(t3) {
      return t3;
    }, r.prototype.compareMinX = function(t3, i2) {
      return t3.minX - i2.minX;
    }, r.prototype.compareMinY = function(t3, i2) {
      return t3.minY - i2.minY;
    }, r.prototype.toJSON = function() {
      return this.data;
    }, r.prototype.fromJSON = function(t3) {
      return this.data = t3, this;
    }, r.prototype._all = function(t3, i2) {
      for (var n2 = []; t3; )
        t3.leaf ? i2.push.apply(i2, t3.children) : n2.push.apply(n2, t3.children), t3 = n2.pop();
      return i2;
    }, r.prototype._build = function(t3, i2, n2, r2) {
      var e2, h2 = n2 - i2 + 1, o2 = this._maxEntries;
      if (h2 <= o2)
        return a(e2 = p(t3.slice(i2, n2 + 1)), this.toBBox), e2;
      r2 || (r2 = Math.ceil(Math.log(h2) / Math.log(o2)), o2 = Math.ceil(h2 / Math.pow(o2, r2 - 1))), (e2 = p([])).leaf = false, e2.height = r2;
      var s2 = Math.ceil(h2 / o2), l2 = s2 * Math.ceil(Math.sqrt(o2));
      d(t3, i2, n2, l2, this.compareMinX);
      for (var f2 = i2; f2 <= n2; f2 += l2) {
        var u2 = Math.min(f2 + l2 - 1, n2);
        d(t3, f2, u2, s2, this.compareMinY);
        for (var m2 = f2; m2 <= u2; m2 += s2) {
          var c2 = Math.min(m2 + s2 - 1, u2);
          e2.children.push(this._build(t3, m2, c2, r2 - 1));
        }
      }
      return a(e2, this.toBBox), e2;
    }, r.prototype._chooseSubtree = function(t3, i2, n2, r2) {
      for (; r2.push(i2), !i2.leaf && r2.length - 1 !== n2; ) {
        for (var e2 = 1 / 0, a2 = 1 / 0, h2 = void 0, o2 = 0; o2 < i2.children.length; o2++) {
          var s2 = i2.children[o2], l2 = f(s2), u2 = (m2 = t3, c2 = s2, (Math.max(c2.maxX, m2.maxX) - Math.min(c2.minX, m2.minX)) * (Math.max(c2.maxY, m2.maxY) - Math.min(c2.minY, m2.minY)) - l2);
          u2 < a2 ? (a2 = u2, e2 = l2 < e2 ? l2 : e2, h2 = s2) : u2 === a2 && l2 < e2 && (e2 = l2, h2 = s2);
        }
        i2 = h2 || i2.children[0];
      }
      var m2, c2;
      return i2;
    }, r.prototype._insert = function(t3, i2, n2) {
      var r2 = n2 ? t3 : this.toBBox(t3), e2 = [], a2 = this._chooseSubtree(r2, this.data, i2, e2);
      for (a2.children.push(t3), o(a2, r2); i2 >= 0 && e2[i2].children.length > this._maxEntries; )
        this._split(e2, i2), i2--;
      this._adjustParentBBoxes(r2, e2, i2);
    }, r.prototype._split = function(t3, i2) {
      var n2 = t3[i2], r2 = n2.children.length, e2 = this._minEntries;
      this._chooseSplitAxis(n2, e2, r2);
      var h2 = this._chooseSplitIndex(n2, e2, r2), o2 = p(n2.children.splice(h2, n2.children.length - h2));
      o2.height = n2.height, o2.leaf = n2.leaf, a(n2, this.toBBox), a(o2, this.toBBox), i2 ? t3[i2 - 1].children.push(o2) : this._splitRoot(n2, o2);
    }, r.prototype._splitRoot = function(t3, i2) {
      this.data = p([t3, i2]), this.data.height = t3.height + 1, this.data.leaf = false, a(this.data, this.toBBox);
    }, r.prototype._chooseSplitIndex = function(t3, i2, n2) {
      for (var r2, e2, a2, o2, s2, l2, u2, m2 = 1 / 0, c2 = 1 / 0, p2 = i2; p2 <= n2 - i2; p2++) {
        var d2 = h(t3, 0, p2, this.toBBox), x = h(t3, p2, n2, this.toBBox), v = (e2 = d2, a2 = x, o2 = void 0, s2 = void 0, l2 = void 0, u2 = void 0, o2 = Math.max(e2.minX, a2.minX), s2 = Math.max(e2.minY, a2.minY), l2 = Math.min(e2.maxX, a2.maxX), u2 = Math.min(e2.maxY, a2.maxY), Math.max(0, l2 - o2) * Math.max(0, u2 - s2)), M = f(d2) + f(x);
        v < m2 ? (m2 = v, r2 = p2, c2 = M < c2 ? M : c2) : v === m2 && M < c2 && (c2 = M, r2 = p2);
      }
      return r2 || n2 - i2;
    }, r.prototype._chooseSplitAxis = function(t3, i2, n2) {
      var r2 = t3.leaf ? this.compareMinX : s, e2 = t3.leaf ? this.compareMinY : l;
      this._allDistMargin(t3, i2, n2, r2) < this._allDistMargin(t3, i2, n2, e2) && t3.children.sort(r2);
    }, r.prototype._allDistMargin = function(t3, i2, n2, r2) {
      t3.children.sort(r2);
      for (var e2 = this.toBBox, a2 = h(t3, 0, i2, e2), s2 = h(t3, n2 - i2, n2, e2), l2 = u(a2) + u(s2), f2 = i2; f2 < n2 - i2; f2++) {
        var m2 = t3.children[f2];
        o(a2, t3.leaf ? e2(m2) : m2), l2 += u(a2);
      }
      for (var c2 = n2 - i2 - 1; c2 >= i2; c2--) {
        var p2 = t3.children[c2];
        o(s2, t3.leaf ? e2(p2) : p2), l2 += u(s2);
      }
      return l2;
    }, r.prototype._adjustParentBBoxes = function(t3, i2, n2) {
      for (var r2 = n2; r2 >= 0; r2--)
        o(i2[r2], t3);
    }, r.prototype._condense = function(t3) {
      for (var i2 = t3.length - 1, n2 = void 0; i2 >= 0; i2--)
        0 === t3[i2].children.length ? i2 > 0 ? (n2 = t3[i2 - 1].children).splice(n2.indexOf(t3[i2]), 1) : this.clear() : a(t3[i2], this.toBBox);
    }, r;
  });
})(rbush_min);
var rbush_minExports = rbush_min.exports;
class TinyQueue {
  constructor(data = [], compare2 = defaultCompare) {
    this.data = data;
    this.length = this.data.length;
    this.compare = compare2;
    if (this.length > 0) {
      for (let i = (this.length >> 1) - 1; i >= 0; i--)
        this._down(i);
    }
  }
  push(item) {
    this.data.push(item);
    this.length++;
    this._up(this.length - 1);
  }
  pop() {
    if (this.length === 0)
      return void 0;
    const top = this.data[0];
    const bottom = this.data.pop();
    this.length--;
    if (this.length > 0) {
      this.data[0] = bottom;
      this._down(0);
    }
    return top;
  }
  peek() {
    return this.data[0];
  }
  _up(pos) {
    const { data, compare: compare2 } = this;
    const item = data[pos];
    while (pos > 0) {
      const parent = pos - 1 >> 1;
      const current = data[parent];
      if (compare2(item, current) >= 0)
        break;
      data[pos] = current;
      pos = parent;
    }
    data[pos] = item;
  }
  _down(pos) {
    const { data, compare: compare2 } = this;
    const halfLength = this.length >> 1;
    const item = data[pos];
    while (pos < halfLength) {
      let left = (pos << 1) + 1;
      let best = data[left];
      const right = left + 1;
      if (right < this.length && compare2(data[right], best) < 0) {
        left = right;
        best = data[right];
      }
      if (compare2(best, item) >= 0)
        break;
      data[pos] = best;
      pos = left;
    }
    data[pos] = item;
  }
}
function defaultCompare(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}
const tinyqueue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TinyQueue
}, Symbol.toStringTag, { value: "Module" }));
const require$$1 = /* @__PURE__ */ getAugmentedNamespace(tinyqueue);
var pointInPolygon$1 = { exports: {} };
var flat = function pointInPolygonFlat(point, vs, start, end) {
  var x = point[0], y = point[1];
  var inside2 = false;
  if (start === void 0)
    start = 0;
  if (end === void 0)
    end = vs.length;
  var len = (end - start) / 2;
  for (var i = 0, j = len - 1; i < len; j = i++) {
    var xi = vs[start + i * 2 + 0], yi = vs[start + i * 2 + 1];
    var xj = vs[start + j * 2 + 0], yj = vs[start + j * 2 + 1];
    var intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect)
      inside2 = !inside2;
  }
  return inside2;
};
var nested = function pointInPolygonNested(point, vs, start, end) {
  var x = point[0], y = point[1];
  var inside2 = false;
  if (start === void 0)
    start = 0;
  if (end === void 0)
    end = vs.length;
  var len = end - start;
  for (var i = 0, j = len - 1; i < len; j = i++) {
    var xi = vs[i + start][0], yi = vs[i + start][1];
    var xj = vs[j + start][0], yj = vs[j + start][1];
    var intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect)
      inside2 = !inside2;
  }
  return inside2;
};
var pointInPolygonFlat2 = flat;
var pointInPolygonNested2 = nested;
pointInPolygon$1.exports = function pointInPolygon(point, vs, start, end) {
  if (vs.length > 0 && Array.isArray(vs[0])) {
    return pointInPolygonNested2(point, vs, start, end);
  } else {
    return pointInPolygonFlat2(point, vs, start, end);
  }
};
pointInPolygon$1.exports.nested = pointInPolygonNested2;
pointInPolygon$1.exports.flat = pointInPolygonFlat2;
var pointInPolygonExports = pointInPolygon$1.exports;
var orient2d_min = { exports: {} };
(function(module2, exports2) {
  !function(t2, e) {
    e(exports2);
  }(commonjsGlobal, function(t2) {
    const e = 134217729, n = 33306690738754706e-32;
    function r(t3, e2, n2, r2, o2) {
      let f2, i2, u2, c2, s2 = e2[0], a2 = r2[0], d2 = 0, l2 = 0;
      a2 > s2 == a2 > -s2 ? (f2 = s2, s2 = e2[++d2]) : (f2 = a2, a2 = r2[++l2]);
      let p = 0;
      if (d2 < t3 && l2 < n2)
        for (a2 > s2 == a2 > -s2 ? (u2 = f2 - ((i2 = s2 + f2) - s2), s2 = e2[++d2]) : (u2 = f2 - ((i2 = a2 + f2) - a2), a2 = r2[++l2]), f2 = i2, 0 !== u2 && (o2[p++] = u2); d2 < t3 && l2 < n2; )
          a2 > s2 == a2 > -s2 ? (u2 = f2 - ((i2 = f2 + s2) - (c2 = i2 - f2)) + (s2 - c2), s2 = e2[++d2]) : (u2 = f2 - ((i2 = f2 + a2) - (c2 = i2 - f2)) + (a2 - c2), a2 = r2[++l2]), f2 = i2, 0 !== u2 && (o2[p++] = u2);
      for (; d2 < t3; )
        u2 = f2 - ((i2 = f2 + s2) - (c2 = i2 - f2)) + (s2 - c2), s2 = e2[++d2], f2 = i2, 0 !== u2 && (o2[p++] = u2);
      for (; l2 < n2; )
        u2 = f2 - ((i2 = f2 + a2) - (c2 = i2 - f2)) + (a2 - c2), a2 = r2[++l2], f2 = i2, 0 !== u2 && (o2[p++] = u2);
      return 0 === f2 && 0 !== p || (o2[p++] = f2), p;
    }
    function o(t3) {
      return new Float64Array(t3);
    }
    const f = 33306690738754716e-32, i = 22204460492503146e-32, u = 11093356479670487e-47, c = o(4), s = o(8), a = o(12), d = o(16), l = o(4);
    t2.orient2d = function(t3, o2, p, b, y, h) {
      const M = (o2 - h) * (p - y), x = (t3 - y) * (b - h), j = M - x;
      if (0 === M || 0 === x || M > 0 != x > 0)
        return j;
      const m = Math.abs(M + x);
      return Math.abs(j) >= f * m ? j : -function(t4, o3, f2, p2, b2, y2, h2) {
        let M2, x2, j2, m2, _, v, w, A, F, O, P, g, k, q, z2, B, C, D;
        const E = t4 - b2, G = f2 - b2, H = o3 - y2, I = p2 - y2;
        _ = (z2 = (A = E - (w = (v = e * E) - (v - E))) * (O = I - (F = (v = e * I) - (v - I))) - ((q = E * I) - w * F - A * F - w * O)) - (P = z2 - (C = (A = H - (w = (v = e * H) - (v - H))) * (O = G - (F = (v = e * G) - (v - G))) - ((B = H * G) - w * F - A * F - w * O))), c[0] = z2 - (P + _) + (_ - C), _ = (k = q - ((g = q + P) - (_ = g - q)) + (P - _)) - (P = k - B), c[1] = k - (P + _) + (_ - B), _ = (D = g + P) - g, c[2] = g - (D - _) + (P - _), c[3] = D;
        let J = function(t5, e2) {
          let n2 = e2[0];
          for (let r2 = 1; r2 < t5; r2++)
            n2 += e2[r2];
          return n2;
        }(4, c), K = i * h2;
        if (J >= K || -J >= K)
          return J;
        if (M2 = t4 - (E + (_ = t4 - E)) + (_ - b2), j2 = f2 - (G + (_ = f2 - G)) + (_ - b2), x2 = o3 - (H + (_ = o3 - H)) + (_ - y2), m2 = p2 - (I + (_ = p2 - I)) + (_ - y2), 0 === M2 && 0 === x2 && 0 === j2 && 0 === m2)
          return J;
        if (K = u * h2 + n * Math.abs(J), (J += E * m2 + I * M2 - (H * j2 + G * x2)) >= K || -J >= K)
          return J;
        _ = (z2 = (A = M2 - (w = (v = e * M2) - (v - M2))) * (O = I - (F = (v = e * I) - (v - I))) - ((q = M2 * I) - w * F - A * F - w * O)) - (P = z2 - (C = (A = x2 - (w = (v = e * x2) - (v - x2))) * (O = G - (F = (v = e * G) - (v - G))) - ((B = x2 * G) - w * F - A * F - w * O))), l[0] = z2 - (P + _) + (_ - C), _ = (k = q - ((g = q + P) - (_ = g - q)) + (P - _)) - (P = k - B), l[1] = k - (P + _) + (_ - B), _ = (D = g + P) - g, l[2] = g - (D - _) + (P - _), l[3] = D;
        const L = r(4, c, 4, l, s);
        _ = (z2 = (A = E - (w = (v = e * E) - (v - E))) * (O = m2 - (F = (v = e * m2) - (v - m2))) - ((q = E * m2) - w * F - A * F - w * O)) - (P = z2 - (C = (A = H - (w = (v = e * H) - (v - H))) * (O = j2 - (F = (v = e * j2) - (v - j2))) - ((B = H * j2) - w * F - A * F - w * O))), l[0] = z2 - (P + _) + (_ - C), _ = (k = q - ((g = q + P) - (_ = g - q)) + (P - _)) - (P = k - B), l[1] = k - (P + _) + (_ - B), _ = (D = g + P) - g, l[2] = g - (D - _) + (P - _), l[3] = D;
        const N = r(L, s, 4, l, a);
        _ = (z2 = (A = M2 - (w = (v = e * M2) - (v - M2))) * (O = m2 - (F = (v = e * m2) - (v - m2))) - ((q = M2 * m2) - w * F - A * F - w * O)) - (P = z2 - (C = (A = x2 - (w = (v = e * x2) - (v - x2))) * (O = j2 - (F = (v = e * j2) - (v - j2))) - ((B = x2 * j2) - w * F - A * F - w * O))), l[0] = z2 - (P + _) + (_ - C), _ = (k = q - ((g = q + P) - (_ = g - q)) + (P - _)) - (P = k - B), l[1] = k - (P + _) + (_ - B), _ = (D = g + P) - g, l[2] = g - (D - _) + (P - _), l[3] = D;
        const Q = r(N, a, 4, l, d);
        return d[Q - 1];
      }(t3, o2, p, b, y, h, m);
    }, t2.orient2dfast = function(t3, e2, n2, r2, o2, f2) {
      return (e2 - f2) * (n2 - o2) - (t3 - o2) * (r2 - f2);
    }, Object.defineProperty(t2, "__esModule", { value: true });
  });
})(orient2d_min, orient2d_min.exports);
var orient2d_minExports = orient2d_min.exports;
var RBush = rbush_minExports;
var Queue = require$$1;
var pointInPolygon2 = pointInPolygonExports;
var orient = orient2d_minExports.orient2d;
if (Queue.default) {
  Queue = Queue.default;
}
concaveman$1.exports = concaveman;
concaveman$1.exports.default = concaveman;
function concaveman(points, concavity, lengthThreshold) {
  concavity = Math.max(0, concavity === void 0 ? 2 : concavity);
  lengthThreshold = lengthThreshold || 0;
  var hull = fastConvexHull(points);
  var tree = new RBush(16);
  tree.toBBox = function(a2) {
    return {
      minX: a2[0],
      minY: a2[1],
      maxX: a2[0],
      maxY: a2[1]
    };
  };
  tree.compareMinX = function(a2, b2) {
    return a2[0] - b2[0];
  };
  tree.compareMinY = function(a2, b2) {
    return a2[1] - b2[1];
  };
  tree.load(points);
  var queue = [];
  for (var i = 0, last; i < hull.length; i++) {
    var p = hull[i];
    tree.remove(p);
    last = insertNode(p, last);
    queue.push(last);
  }
  var segTree = new RBush(16);
  for (i = 0; i < queue.length; i++)
    segTree.insert(updateBBox(queue[i]));
  var sqConcavity = concavity * concavity;
  var sqLenThreshold = lengthThreshold * lengthThreshold;
  while (queue.length) {
    var node = queue.shift();
    var a = node.p;
    var b = node.next.p;
    var sqLen = getSqDist(a, b);
    if (sqLen < sqLenThreshold)
      continue;
    var maxSqLen = sqLen / sqConcavity;
    p = findCandidate(tree, node.prev.p, a, b, node.next.next.p, maxSqLen, segTree);
    if (p && Math.min(getSqDist(p, a), getSqDist(p, b)) <= maxSqLen) {
      queue.push(node);
      queue.push(insertNode(p, node));
      tree.remove(p);
      segTree.remove(node);
      segTree.insert(updateBBox(node));
      segTree.insert(updateBBox(node.next));
    }
  }
  node = last;
  var concave = [];
  do {
    concave.push(node.p);
    node = node.next;
  } while (node !== last);
  concave.push(node.p);
  return concave;
}
function findCandidate(tree, a, b, c, d, maxDist, segTree) {
  var queue = new Queue([], compareDist);
  var node = tree.data;
  while (node) {
    for (var i = 0; i < node.children.length; i++) {
      var child = node.children[i];
      var dist = node.leaf ? sqSegDist(child, b, c) : sqSegBoxDist(b, c, child);
      if (dist > maxDist)
        continue;
      queue.push({
        node: child,
        dist
      });
    }
    while (queue.length && !queue.peek().node.children) {
      var item = queue.pop();
      var p = item.node;
      var d0 = sqSegDist(p, a, b);
      var d1 = sqSegDist(p, c, d);
      if (item.dist < d0 && item.dist < d1 && noIntersections(b, p, segTree) && noIntersections(c, p, segTree))
        return p;
    }
    node = queue.pop();
    if (node)
      node = node.node;
  }
  return null;
}
function compareDist(a, b) {
  return a.dist - b.dist;
}
function sqSegBoxDist(a, b, bbox) {
  if (inside(a, bbox) || inside(b, bbox))
    return 0;
  var d1 = sqSegSegDist(a[0], a[1], b[0], b[1], bbox.minX, bbox.minY, bbox.maxX, bbox.minY);
  if (d1 === 0)
    return 0;
  var d2 = sqSegSegDist(a[0], a[1], b[0], b[1], bbox.minX, bbox.minY, bbox.minX, bbox.maxY);
  if (d2 === 0)
    return 0;
  var d3 = sqSegSegDist(a[0], a[1], b[0], b[1], bbox.maxX, bbox.minY, bbox.maxX, bbox.maxY);
  if (d3 === 0)
    return 0;
  var d4 = sqSegSegDist(a[0], a[1], b[0], b[1], bbox.minX, bbox.maxY, bbox.maxX, bbox.maxY);
  if (d4 === 0)
    return 0;
  return Math.min(d1, d2, d3, d4);
}
function inside(a, bbox) {
  return a[0] >= bbox.minX && a[0] <= bbox.maxX && a[1] >= bbox.minY && a[1] <= bbox.maxY;
}
function noIntersections(a, b, segTree) {
  var minX = Math.min(a[0], b[0]);
  var minY = Math.min(a[1], b[1]);
  var maxX = Math.max(a[0], b[0]);
  var maxY = Math.max(a[1], b[1]);
  var edges = segTree.search({ minX, minY, maxX, maxY });
  for (var i = 0; i < edges.length; i++) {
    if (intersects$2(edges[i].p, edges[i].next.p, a, b))
      return false;
  }
  return true;
}
function cross(p1, p2, p3) {
  return orient(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
}
function intersects$2(p1, q1, p2, q2) {
  return p1 !== q2 && q1 !== p2 && cross(p1, q1, p2) > 0 !== cross(p1, q1, q2) > 0 && cross(p2, q2, p1) > 0 !== cross(p2, q2, q1) > 0;
}
function updateBBox(node) {
  var p1 = node.p;
  var p2 = node.next.p;
  node.minX = Math.min(p1[0], p2[0]);
  node.minY = Math.min(p1[1], p2[1]);
  node.maxX = Math.max(p1[0], p2[0]);
  node.maxY = Math.max(p1[1], p2[1]);
  return node;
}
function fastConvexHull(points) {
  var left = points[0];
  var top = points[0];
  var right = points[0];
  var bottom = points[0];
  for (var i = 0; i < points.length; i++) {
    var p = points[i];
    if (p[0] < left[0])
      left = p;
    if (p[0] > right[0])
      right = p;
    if (p[1] < top[1])
      top = p;
    if (p[1] > bottom[1])
      bottom = p;
  }
  var cull = [left, top, right, bottom];
  var filtered = cull.slice();
  for (i = 0; i < points.length; i++) {
    if (!pointInPolygon2(points[i], cull))
      filtered.push(points[i]);
  }
  return convexHull(filtered);
}
function insertNode(p, prev) {
  var node = {
    p,
    prev: null,
    next: null,
    minX: 0,
    minY: 0,
    maxX: 0,
    maxY: 0
  };
  if (!prev) {
    node.prev = node;
    node.next = node;
  } else {
    node.next = prev.next;
    node.prev = prev;
    prev.next.prev = node;
    prev.next = node;
  }
  return node;
}
function getSqDist(p1, p2) {
  var dx = p1[0] - p2[0], dy = p1[1] - p2[1];
  return dx * dx + dy * dy;
}
function sqSegDist(p, p1, p2) {
  var x = p1[0], y = p1[1], dx = p2[0] - x, dy = p2[1] - y;
  if (dx !== 0 || dy !== 0) {
    var t2 = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
    if (t2 > 1) {
      x = p2[0];
      y = p2[1];
    } else if (t2 > 0) {
      x += dx * t2;
      y += dy * t2;
    }
  }
  dx = p[0] - x;
  dy = p[1] - y;
  return dx * dx + dy * dy;
}
function sqSegSegDist(x0, y0, x1, y1, x2, y2, x3, y3) {
  var ux = x1 - x0;
  var uy = y1 - y0;
  var vx = x3 - x2;
  var vy = y3 - y2;
  var wx = x0 - x2;
  var wy = y0 - y2;
  var a = ux * ux + uy * uy;
  var b = ux * vx + uy * vy;
  var c = vx * vx + vy * vy;
  var d = ux * wx + uy * wy;
  var e = vx * wx + vy * wy;
  var D = a * c - b * b;
  var sc, sN, tc, tN;
  var sD = D;
  var tD = D;
  if (D === 0) {
    sN = 0;
    sD = 1;
    tN = e;
    tD = c;
  } else {
    sN = b * e - c * d;
    tN = a * e - b * d;
    if (sN < 0) {
      sN = 0;
      tN = e;
      tD = c;
    } else if (sN > sD) {
      sN = sD;
      tN = e + b;
      tD = c;
    }
  }
  if (tN < 0) {
    tN = 0;
    if (-d < 0)
      sN = 0;
    else if (-d > a)
      sN = sD;
    else {
      sN = -d;
      sD = a;
    }
  } else if (tN > tD) {
    tN = tD;
    if (-d + b < 0)
      sN = 0;
    else if (-d + b > a)
      sN = sD;
    else {
      sN = -d + b;
      sD = a;
    }
  }
  sc = sN === 0 ? 0 : sN / sD;
  tc = tN === 0 ? 0 : tN / tD;
  var cx = (1 - sc) * x0 + sc * x1;
  var cy = (1 - sc) * y0 + sc * y1;
  var cx2 = (1 - tc) * x2 + tc * x3;
  var cy2 = (1 - tc) * y2 + tc * y3;
  var dx = cx2 - cx;
  var dy = cy2 - cy;
  return dx * dx + dy * dy;
}
function compareByX(a, b) {
  return a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];
}
function convexHull(points) {
  points.sort(compareByX);
  var lower = [];
  for (var i = 0; i < points.length; i++) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
      lower.pop();
    }
    lower.push(points[i]);
  }
  var upper = [];
  for (var ii = points.length - 1; ii >= 0; ii--) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], points[ii]) <= 0) {
      upper.pop();
    }
    upper.push(points[ii]);
  }
  upper.pop();
  lower.pop();
  return lower.concat(upper);
}
var util;
(function(util2) {
  util2.assertEqual = (val) => val;
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys2 = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys2.push(key);
      }
    }
    return keys2;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
const ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
const getParsedType = (data) => {
  const t2 = typeof data;
  switch (t2) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};
const ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
const quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
class ZodError extends Error {
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  get errors() {
    return this.issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
        fieldErrors[sub.path[0]].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
}
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};
const errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
let overrideErrorMap = errorMap;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
const makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: issueData.message || errorMessage
  };
};
const EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      getErrorMap(),
      errorMap
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
class ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      syncPairs.push({
        key: await pair.key,
        value: await pair.value
      });
    }
    return ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
}
const INVALID = Object.freeze({
  status: "aborted"
});
const DIRTY = (value) => ({ status: "dirty", value });
const OK = (value) => ({ status: "valid", value });
const isAborted = (x) => x.status === "aborted";
const isDirty = (x) => x.status === "dirty";
const isValid = (x) => x.status === "valid";
const isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
})(errorUtil || (errorUtil = {}));
class ParseInputLazyPath {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (this._key instanceof Array) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
}
const handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    if (typeof ctx.data === "undefined") {
      return { message: required_error !== null && required_error !== void 0 ? required_error : ctx.defaultError };
    }
    return { message: invalid_type_error !== null && invalid_type_error !== void 0 ? invalid_type_error : ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
class ZodType {
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    var _a2;
    const ctx = {
      common: {
        issues: [],
        async: (_a2 = params === null || params === void 0 ? void 0 : params.async) !== null && _a2 !== void 0 ? _a2 : false,
        contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
      },
      path: (params === null || params === void 0 ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
        async: true
      },
      path: (params === null || params === void 0 ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this, this._def);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const cuidRegex = /^c[^\s-]{8,}$/i;
const cuid2Regex = /^[a-z][a-z0-9]*$/;
const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/;
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
const emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
const _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
let emojiRegex;
const ipv4Regex = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/;
const ipv6Regex = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
const datetimeRegex = (args) => {
  if (args.precision) {
    if (args.offset) {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
    } else {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}Z$`);
    }
  } else if (args.precision === 0) {
    if (args.offset) {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
    } else {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$`);
    }
  } else {
    if (args.offset) {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$`);
    } else {
      return new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$`);
    }
  }
};
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
class ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(
        ctx2,
        {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.string,
          received: ctx2.parsedType
        }
        //
      );
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch (_a2) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex2 = datetimeRegex(check);
        if (!regex2.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex2, validation, message) {
    return this.refinement((data) => regex2.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    var _a2;
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
      offset: (_a2 = options === null || options === void 0 ? void 0 : options.offset) !== null && _a2 !== void 0 ? _a2 : false,
      ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
    });
  }
  regex(regex2, message) {
    return this._addCheck({
      kind: "regex",
      regex: regex2,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options === null || options === void 0 ? void 0 : options.position,
      ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * @deprecated Use z.string().min(1) instead.
   * @see {@link ZodString.min}
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodString.create = (params) => {
  var _a2;
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: (_a2 = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a2 !== void 0 ? _a2 : false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / Math.pow(10, decCount);
}
class ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null, min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
}
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
};
class ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = BigInt(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.bigint,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodBigInt.create = (params) => {
  var _a2;
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: (_a2 = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a2 !== void 0 ? _a2 : false,
    ...processCreateParams(params)
  });
};
class ZodBoolean extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
};
class ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
}
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
class ZodSymbol extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
class ZodUndefined extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
class ZodNull extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
class ZodAny extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
class ZodUnknown extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
class ZodNever extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
}
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
class ZodVoid extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
class ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
class ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys2 = util.objectKeys(shape);
    return this._cached = { shape, keys: keys2 };
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip")
        ;
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          syncPairs.push({
            key,
            value: await pair.value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          var _a2, _b2, _c, _d;
          const defaultError = (_c = (_b2 = (_a2 = this._def).errorMap) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    util.objectKeys(mask).forEach((key) => {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
}
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
class ZodUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
}
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
const getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return Object.keys(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else {
    return null;
  }
};
class ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
}
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
class ZodIntersection extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
}
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
class ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple({
      ...this._def,
      rest
    });
  }
}
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
class ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key))
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
}
class ZodMap extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
}
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
class ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
class ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
}
class ZodLazy extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
}
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
class ZodLiteral extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
}
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
class ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (this._def.values.indexOf(input.data) === -1) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values) {
    return ZodEnum.create(values);
  }
  exclude(values) {
    return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)));
  }
}
ZodEnum.create = createZodEnum;
class ZodNativeEnum extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (nativeEnumValues.indexOf(input.data) === -1) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
}
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
class ZodPromise extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
}
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
class ZodEffects extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.issues.length) {
        return {
          status: "dirty",
          value: ctx.data
        };
      }
      if (ctx.common.async) {
        return Promise.resolve(processed).then((processed2) => {
          return this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
        });
      } else {
        return this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return base;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return base;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
        });
      }
    }
    util.assertNever(effect);
  }
}
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
class ZodOptional extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
class ZodNullable extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
class ZodDefault extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
class ZodCatch extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
class ZodNaN extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
}
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
const BRAND = Symbol("zod_brand");
class ZodBranded extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
}
class ZodReadonly extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    if (isValid(result)) {
      result.value = Object.freeze(result.value);
    }
    return result;
  }
}
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
const custom = (check, params = {}, fatal) => {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      var _a2, _b2;
      if (!check(data)) {
        const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
        const _fatal = (_b2 = (_a2 = p.fatal) !== null && _a2 !== void 0 ? _a2 : fatal) !== null && _b2 !== void 0 ? _b2 : true;
        const p2 = typeof p === "string" ? { message: p } : p;
        ctx.addIssue({ code: "custom", ...p2, fatal: _fatal });
      }
    });
  return ZodAny.create();
};
const late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
const instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
const stringType = ZodString.create;
const numberType = ZodNumber.create;
const nanType = ZodNaN.create;
const bigIntType = ZodBigInt.create;
const booleanType = ZodBoolean.create;
const dateType = ZodDate.create;
const symbolType = ZodSymbol.create;
const undefinedType = ZodUndefined.create;
const nullType = ZodNull.create;
const anyType = ZodAny.create;
const unknownType = ZodUnknown.create;
const neverType = ZodNever.create;
const voidType = ZodVoid.create;
const arrayType = ZodArray.create;
const objectType = ZodObject.create;
const strictObjectType = ZodObject.strictCreate;
const unionType = ZodUnion.create;
const discriminatedUnionType = ZodDiscriminatedUnion.create;
const intersectionType = ZodIntersection.create;
const tupleType = ZodTuple.create;
const recordType = ZodRecord.create;
const mapType = ZodMap.create;
const setType = ZodSet.create;
const functionType = ZodFunction.create;
const lazyType = ZodLazy.create;
const literalType = ZodLiteral.create;
const enumType = ZodEnum.create;
const nativeEnumType = ZodNativeEnum.create;
const promiseType = ZodPromise.create;
const effectsType = ZodEffects.create;
const optionalType = ZodOptional.create;
const nullableType = ZodNullable.create;
const preprocessType = ZodEffects.createWithPreprocess;
const pipelineType = ZodPipeline.create;
const ostring = () => stringType().optional();
const onumber = () => numberType().optional();
const oboolean = () => booleanType().optional();
const coerce$2 = {
  string: (arg) => ZodString.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
  boolean: (arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  }),
  bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate.create({ ...arg, coerce: true })
};
const NEVER = INVALID;
var z = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: errorMap,
  setErrorMap,
  getErrorMap,
  makeIssue,
  EMPTY_PATH,
  addIssueToContext,
  ParseStatus,
  INVALID,
  DIRTY,
  OK,
  isAborted,
  isDirty,
  isValid,
  isAsync,
  get util() {
    return util;
  },
  get objectUtil() {
    return objectUtil;
  },
  ZodParsedType,
  getParsedType,
  ZodType,
  ZodString,
  ZodNumber,
  ZodBigInt,
  ZodBoolean,
  ZodDate,
  ZodSymbol,
  ZodUndefined,
  ZodNull,
  ZodAny,
  ZodUnknown,
  ZodNever,
  ZodVoid,
  ZodArray,
  ZodObject,
  ZodUnion,
  ZodDiscriminatedUnion,
  ZodIntersection,
  ZodTuple,
  ZodRecord,
  ZodMap,
  ZodSet,
  ZodFunction,
  ZodLazy,
  ZodLiteral,
  ZodEnum,
  ZodNativeEnum,
  ZodPromise,
  ZodEffects,
  ZodTransformer: ZodEffects,
  ZodOptional,
  ZodNullable,
  ZodDefault,
  ZodCatch,
  ZodNaN,
  BRAND,
  ZodBranded,
  ZodPipeline,
  ZodReadonly,
  custom,
  Schema: ZodType,
  ZodSchema: ZodType,
  late,
  get ZodFirstPartyTypeKind() {
    return ZodFirstPartyTypeKind;
  },
  coerce: coerce$2,
  any: anyType,
  array: arrayType,
  bigint: bigIntType,
  boolean: booleanType,
  date: dateType,
  discriminatedUnion: discriminatedUnionType,
  effect: effectsType,
  "enum": enumType,
  "function": functionType,
  "instanceof": instanceOfType,
  intersection: intersectionType,
  lazy: lazyType,
  literal: literalType,
  map: mapType,
  nan: nanType,
  nativeEnum: nativeEnumType,
  never: neverType,
  "null": nullType,
  nullable: nullableType,
  number: numberType,
  object: objectType,
  oboolean,
  onumber,
  optional: optionalType,
  ostring,
  pipeline: pipelineType,
  preprocess: preprocessType,
  promise: promiseType,
  record: recordType,
  set: setType,
  strictObject: strictObjectType,
  string: stringType,
  symbol: symbolType,
  transformer: effectsType,
  tuple: tupleType,
  "undefined": undefinedType,
  union: unionType,
  unknown: unknownType,
  "void": voidType,
  NEVER,
  ZodIssueCode,
  quotelessJson,
  ZodError
});
const coordinationTypeName = z.string();
const coordinationScopeName = z.string();
const stringOrStringArray = z.union([
  z.string(),
  z.array(z.string())
]);
const oneOrMoreCoordinationScopeNames = stringOrStringArray;
const componentCoordinationScopes = z.record(coordinationTypeName, oneOrMoreCoordinationScopeNames);
const componentCoordinationScopesBy = z.record(coordinationTypeName, z.record(coordinationTypeName, z.record(coordinationScopeName, oneOrMoreCoordinationScopeNames)));
const rgbArray = z.array(z.number()).length(3);
const treeNodeBase = z.object({
  name: z.string(),
  color: rgbArray.optional()
});
const treeNodeLeaf = treeNodeBase.extend({
  set: z.array(z.string())
});
const treeNodeNonLeaf = treeNodeBase.extend({
  children: z.lazy(() => z.array(z.union([treeNodeNonLeaf, treeNodeLeaf])))
});
const cellSets2 = z.object({
  version: z.literal("0.1.2"),
  tree: z.array(treeNodeNonLeaf)
});
const treeNodeLeafProbabilistic = treeNodeBase.extend({
  set: z.array(z.tuple([z.string(), z.number().nullable()]))
});
const treeNodeNonLeafProbabilistic = treeNodeBase.extend({
  children: z.lazy(() => z.array(z.union([treeNodeNonLeafProbabilistic, treeNodeLeafProbabilistic])))
});
const cellSets3 = z.object({
  version: z.literal("0.1.3"),
  tree: z.array(treeNodeNonLeafProbabilistic)
});
function nodeTransform(node, predicate, transform, transformedPaths, currPath = null) {
  let newPath;
  if (!currPath) {
    newPath = [node.name];
  } else {
    newPath = [...currPath];
  }
  if (predicate(node, newPath)) {
    transformedPaths.push(newPath);
    return transform(node, newPath);
  }
  if ("children" in node) {
    return {
      ...node,
      children: node.children.map((child) => nodeTransform(child, predicate, transform, transformedPaths, newPath.concat([child.name])))
    };
  }
  return node;
}
const obsSetsSchema = z.union([cellSets3, cellSets2]).transform((v) => {
  if (v.version === "0.1.3")
    return v;
  return {
    ...v,
    version: "0.1.3",
    tree: v.tree.map((levelZeroNode) => nodeTransform(levelZeroNode, (n) => !("children" in n) && Array.isArray(n.set), (n) => ({ ...n, set: n.set.map((itemId) => [itemId, null]) }), []))
  };
});
z.array(z.object({
  groupName: z.string(),
  setName: z.string(),
  setColor: rgbArray.optional(),
  obsId: z.string(),
  predictionScore: z.number().nullable().optional()
}));
z.array(z.string());
const requestInit = z.object({
  method: z.string().optional(),
  headers: z.record(z.any()).optional(),
  body: z.string().optional(),
  mode: z.string().optional(),
  credentials: z.string().optional(),
  cache: z.string().optional(),
  redirect: z.string().optional(),
  referrer: z.string().optional(),
  integrity: z.string().optional()
});
const nameSchema = z.string();
const publicFlagSchema = z.boolean().optional();
const descriptionSchema = z.string().optional();
const configSchema0_1_0 = z.object({
  version: z.literal("0.1.0"),
  name: nameSchema,
  public: publicFlagSchema,
  description: descriptionSchema,
  layers: z.array(z.object({
    name: z.string(),
    type: z.string(),
    fileType: z.string(),
    url: z.string()
  })),
  staticLayout: z.array(z.object({
    component: z.string(),
    props: z.record(z.any()).optional(),
    x: z.number().int(),
    y: z.number().int(),
    w: z.number().int().optional(),
    h: z.number().int().optional()
  }))
});
const fileOptionsSchema = z.any();
const coordinationSpaceSchema = z.object({}).catchall(z.record(coordinationScopeName, z.any()));
const initStrategySchema = z.enum(["none", "auto"]);
const layoutSchema1_0_0 = z.array(z.object({
  component: z.string(),
  props: z.record(z.any()).optional(),
  x: z.number().int(),
  y: z.number().int(),
  w: z.number().int().optional(),
  h: z.number().int().optional(),
  coordinationScopes: z.record(z.string()).optional()
}));
const datasetsSchema1_0_0 = z.array(z.object({
  uid: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  files: z.array(z.object({
    name: z.string().optional(),
    fileType: z.string(),
    url: z.string().optional(),
    options: fileOptionsSchema.optional(),
    requestInit: requestInit.optional()
  }))
}));
const configSchema1_0_0 = z.object({
  version: z.literal("1.0.0"),
  name: nameSchema,
  public: publicFlagSchema,
  description: descriptionSchema,
  datasets: datasetsSchema1_0_0,
  coordinationSpace: coordinationSpaceSchema.optional(),
  layout: layoutSchema1_0_0,
  initStrategy: initStrategySchema
});
const configSchema1_0_1 = configSchema1_0_0.extend({
  version: z.literal("1.0.1")
});
const configSchema1_0_2 = configSchema1_0_0.extend({
  version: z.literal("1.0.2")
});
const configSchema1_0_3 = configSchema1_0_0.extend({
  version: z.literal("1.0.3")
});
const configSchema1_0_4 = configSchema1_0_0.extend({
  version: z.literal("1.0.4")
});
const configSchema1_0_5 = configSchema1_0_0.extend({
  version: z.literal("1.0.5")
});
const configSchema1_0_6 = configSchema1_0_0.extend({
  version: z.literal("1.0.6")
});
const configSchema1_0_7 = configSchema1_0_0.extend({
  version: z.literal("1.0.7")
});
const polyphonyStyleCoordinationScopes = z.record(z.union([
  z.string(),
  z.array(z.string()),
  z.record(z.string())
]));
const layoutSchema1_0_8 = z.array(z.object({
  component: z.string(),
  props: z.record(z.any()).optional(),
  x: z.number().int(),
  y: z.number().int(),
  w: z.number().int().optional(),
  h: z.number().int().optional(),
  // New: can be one of
  // - coordinationType: string
  // - dataset: string[]
  // - coordinationType: { datasetA: string, datasetB: string }
  coordinationScopes: polyphonyStyleCoordinationScopes.optional()
}));
const configSchema1_0_8 = configSchema1_0_0.extend({
  version: z.literal("1.0.8"),
  layout: layoutSchema1_0_8
});
const configSchema1_0_9 = configSchema1_0_8.extend({
  version: z.literal("1.0.9")
});
const layoutSchema1_0_10 = z.array(z.object({
  // New: uid property allowed.
  uid: z.string().optional(),
  component: z.string(),
  props: z.record(z.any()).optional(),
  x: z.number().int(),
  y: z.number().int(),
  w: z.number().int().optional(),
  h: z.number().int().optional(),
  coordinationScopes: polyphonyStyleCoordinationScopes.optional()
}));
const configSchema1_0_10 = configSchema1_0_8.extend({
  version: z.literal("1.0.10"),
  layout: layoutSchema1_0_10
});
const configSchema1_0_11 = configSchema1_0_10.extend({
  version: z.literal("1.0.11")
});
const configSchema1_0_12 = configSchema1_0_10.extend({
  version: z.literal("1.0.12")
});
const latestFileDefSchema = z.object({
  name: z.string().optional(),
  fileType: z.string(),
  url: z.string().optional(),
  options: fileOptionsSchema.optional(),
  requestInit: requestInit.optional(),
  // New: file def can have coordinationValues.
  coordinationValues: z.record(z.string()).optional()
});
const datasetsSchema1_0_13 = z.array(z.object({
  uid: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  files: z.array(latestFileDefSchema)
}));
const configSchema1_0_13 = configSchema1_0_10.extend({
  version: z.literal("1.0.13"),
  datasets: datasetsSchema1_0_13
});
const configSchema1_0_14 = configSchema1_0_13.extend({
  version: z.literal("1.0.14")
});
const configSchema1_0_15 = configSchema1_0_13.extend({
  version: z.literal("1.0.15")
});
const configSchema1_0_16 = configSchema1_0_13.extend({
  version: z.literal("1.0.16"),
  uid: z.string().optional(),
  layout: z.array(z.object({
    uid: z.string().optional(),
    component: z.string(),
    props: z.record(z.any()).optional(),
    x: z.number().int(),
    y: z.number().int(),
    w: z.number().int().optional(),
    h: z.number().int().optional(),
    // Updates coordinationScopes and coordinationScopesBy
    coordinationScopes: componentCoordinationScopes.optional(),
    coordinationScopesBy: componentCoordinationScopesBy.optional()
  }))
});
const configSchema1_0_17 = configSchema1_0_16.extend({
  version: z.literal("1.0.17")
});
configSchema1_0_0.shape.coordinationSpace.unwrap();
configSchema1_0_0.shape.layout.element.shape.coordinationScopes.unwrap();
function upgradeReplaceViewProp(prefix, view, coordinationSpace) {
  const prevZScopes = Object.keys(coordinationSpace[`${prefix}Zoom`]);
  const prevTXScopes = Object.keys(coordinationSpace[`${prefix}TargetX`]);
  const prevTYScopes = Object.keys(coordinationSpace[`${prefix}TargetY`]);
  const nextZScope = getNextScope(prevZScopes);
  const nextTXScope = getNextScope(prevTXScopes);
  const nextTYScope = getNextScope(prevTYScopes);
  const { zoom, target: [targetX, targetY] } = view;
  coordinationSpace[`${prefix}Zoom`][nextZScope] = zoom;
  coordinationSpace[`${prefix}TargetX`][nextTXScope] = targetX;
  coordinationSpace[`${prefix}TargetY`][nextTYScope] = targetY;
  return {
    [`${prefix}Zoom`]: nextZScope,
    [`${prefix}TargetX`]: nextTXScope,
    [`${prefix}TargetY`]: nextTYScope
  };
}
function upgradeFrom0_1_0(config2, datasetUid = null) {
  const coordinationSpace = {
    embeddingType: {},
    embeddingZoom: {},
    embeddingTargetX: {},
    embeddingTargetY: {},
    spatialZoom: {},
    spatialTargetX: {},
    spatialTargetY: {}
  };
  const layout = [];
  config2.staticLayout.forEach((componentDef) => {
    var _a2, _b2, _c;
    let newComponentDef = {
      ...componentDef,
      coordinationScopes: {}
    };
    if (componentDef.component === "scatterplot") {
      if (((_a2 = componentDef.props) == null ? void 0 : _a2.mapping) && typeof componentDef.props.mapping === "string") {
        coordinationSpace.embeddingType[componentDef.props.mapping] = componentDef.props.mapping;
        newComponentDef = {
          ...newComponentDef,
          coordinationScopes: {
            ...newComponentDef.coordinationScopes,
            embeddingType: componentDef.props.mapping
          }
        };
      }
      if ((_b2 = componentDef.props) == null ? void 0 : _b2.view) {
        const newScopeValues = upgradeReplaceViewProp("embedding", componentDef.props.view, coordinationSpace);
        newComponentDef = {
          ...newComponentDef,
          coordinationScopes: {
            ...newComponentDef.coordinationScopes,
            ...newScopeValues
          }
        };
      }
    }
    if (componentDef.component === "spatial") {
      if ((_c = componentDef == null ? void 0 : componentDef.props) == null ? void 0 : _c.view) {
        const newScopeValues = upgradeReplaceViewProp("spatial", componentDef.props.view, coordinationSpace);
        newComponentDef = {
          ...newComponentDef,
          coordinationScopes: {
            ...newComponentDef.coordinationScopes,
            ...newScopeValues
          }
        };
      }
    }
    layout.push(newComponentDef);
  });
  const lcDef = layout.find((c) => c.component === "layerController");
  const spatialDef = layout.find((c) => c.component === "spatial");
  if (lcDef && spatialDef && "coordinationScopes" in spatialDef) {
    lcDef.coordinationScopes = spatialDef.coordinationScopes;
  }
  const newDatasetUid = datasetUid || v4();
  return {
    version: "1.0.0",
    name: config2.name,
    description: config2.description,
    public: config2.public,
    datasets: [
      {
        uid: newDatasetUid,
        name: newDatasetUid,
        files: config2.layers.map((layer) => ({
          fileType: layer.fileType,
          url: layer.url
        }))
      }
    ],
    initStrategy: "auto",
    coordinationSpace,
    layout
  };
}
function upgradeFrom1_0_0(config2) {
  const newConfig = cloneDeep(config2);
  const { coordinationSpace } = newConfig;
  function replaceLayerType(layerType, cSpace) {
    const isRaster = layerType === "raster";
    cSpace[`spatial${capitalize(layerType)}Layer${isRaster ? "s" : ""}`] = {};
    Object.entries(cSpace.spatialLayers).forEach(([scope, layers]) => {
      if (Array.isArray(layers) && layers.find((layer) => layer.type === layerType)) {
        const typedLayers = layers.filter((layer) => layer.type === layerType).map((layer) => {
          const newLayer = { ...layer };
          delete newLayer.type;
          return newLayer;
        });
        cSpace[`spatial${capitalize(layerType)}Layer${isRaster ? "s" : ""}`][scope] = isRaster ? typedLayers : typedLayers[0];
      } else {
        cSpace[`spatial${capitalize(layerType)}Layer${isRaster ? "s" : ""}`][scope] = null;
      }
    });
  }
  if (coordinationSpace && "spatialLayers" in coordinationSpace) {
    replaceLayerType("raster", coordinationSpace);
    replaceLayerType("cells", coordinationSpace);
    replaceLayerType("molecules", coordinationSpace);
    replaceLayerType("neighborhoods", coordinationSpace);
    delete coordinationSpace.spatialLayers;
  }
  const layout = newConfig.layout.map((component) => {
    const newComponent = { ...component };
    function replaceCoordinationScope(layerType, cScopes) {
      const isRaster = layerType === "raster";
      if (["spatial", "layerController"].includes(newComponent.component) || newComponent.component === "description" && isRaster) {
        cScopes[`spatial${capitalize(layerType)}Layer${isRaster ? "s" : ""}`] = cScopes.spatialLayers;
      }
    }
    if (newComponent.coordinationScopes && newComponent.coordinationScopes.spatialLayers) {
      replaceCoordinationScope("raster", newComponent.coordinationScopes);
      replaceCoordinationScope("cells", newComponent.coordinationScopes);
      replaceCoordinationScope("molecules", newComponent.coordinationScopes);
      replaceCoordinationScope("neighborhoods", newComponent.coordinationScopes);
      delete newComponent.coordinationScopes.spatialLayers;
    }
    return newComponent;
  });
  return {
    ...newConfig,
    coordinationSpace,
    layout,
    version: "1.0.1"
  };
}
function upgradeFrom1_0_1(config2) {
  var _a2;
  const layout = config2.layout.map((component) => {
    const newComponent = { ...component };
    if (newComponent.component === "layerController") {
      newComponent.props = {
        ...newComponent.props,
        globalDisable3d: true
      };
    }
    return newComponent;
  });
  const newConfig = cloneDeep(config2);
  Object.keys(((_a2 = newConfig == null ? void 0 : newConfig.coordinationSpace) == null ? void 0 : _a2.spatialRasterLayers) || {}).forEach((key) => {
    var _a3, _b2;
    if ((_b2 = (_a3 = newConfig.coordinationSpace) == null ? void 0 : _a3.spatialRasterLayers) == null ? void 0 : _b2[key]) {
      newConfig.coordinationSpace.spatialRasterLayers[key].forEach((layer, index) => {
        if (newConfig.coordinationSpace) {
          newConfig.coordinationSpace.spatialRasterLayers[key][index].type = ["bitmask", "raster"].includes(layer.type) ? layer.type : "raster";
        }
      });
    }
  });
  return {
    ...newConfig,
    layout,
    version: "1.0.2"
  };
}
function upgradeFrom1_0_2(config2) {
  const layout = config2.layout.map((component) => {
    const newComponent = { ...component };
    if (newComponent.component === "layerController") {
      newComponent.props = {
        ...newComponent.props,
        disableChannelsIfRgbDetected: true
      };
    }
    return newComponent;
  });
  const newConfig = cloneDeep(config2);
  return {
    ...newConfig,
    layout,
    version: "1.0.3"
  };
}
function upgradeFrom1_0_3(config2) {
  const newConfig = cloneDeep(config2);
  return {
    ...newConfig,
    version: "1.0.4"
  };
}
function upgradeFrom1_0_4(config2) {
  const newConfig = cloneDeep(config2);
  return {
    ...newConfig,
    version: "1.0.5"
  };
}
function upgradeFrom1_0_5(config2) {
  const newConfig = cloneDeep(config2);
  return {
    ...newConfig,
    version: "1.0.6"
  };
}
function upgradeFrom1_0_6(config2) {
  const newConfig = cloneDeep(config2);
  return {
    ...newConfig,
    version: "1.0.7"
  };
}
function upgradeFrom1_0_7(config2) {
  const newConfig = cloneDeep(config2);
  return {
    ...newConfig,
    version: "1.0.8"
  };
}
function upgradeFrom1_0_8(config2) {
  const newConfig = cloneDeep(config2);
  return {
    ...newConfig,
    version: "1.0.9"
  };
}
function upgradeFrom1_0_9(config2) {
  const newConfig = cloneDeep(config2);
  return {
    ...newConfig,
    version: "1.0.10"
  };
}
function upgradeFrom1_0_10(config2) {
  const coordinationSpace = { ...config2.coordinationSpace };
  const scopeAnalogies = {
    // Spatial layer types
    spatialRasterLayers: "spatialImageLayer",
    spatialCellsLayer: "spatialSegmentationLayer",
    spatialMoleculesLayer: "spatialPointLayer",
    spatialNeighborhoodsLayer: "spatialNeighborhoodLayer",
    // Other types
    cellFilter: "obsFilter",
    cellHighlight: "obsHighlight",
    cellSelection: "obsSelection",
    cellSetSelection: "obsSetSelection",
    cellSetHighlight: "obsSetHighlight",
    cellSetColor: "obsSetColor",
    geneFilter: "featureFilter",
    geneHighlight: "featureHighlight",
    geneSelection: "featureSelection",
    geneExpressionColormap: "featureValueColormap",
    geneExpressionColormapRange: "featureValueColormapRange",
    cellColorEncoding: "obsColorEncoding",
    additionalCellSets: "additionalObsSets",
    embeddingCellSetPolygonsVisible: "embeddingObsSetPolygonsVisible",
    embeddingCellSetLabelsVisible: "embeddingObsSetLabelsVisible",
    embeddingCellSetLabelSize: "embeddingObsSetLabelSize",
    embeddingCellRadius: "embeddingObsRadius",
    embeddingCellRadiusMode: "embeddingObsRadiusMode",
    embeddingCellOpacity: "embeddingObsOpacity",
    embeddingCellOpacityMode: "embeddingObsOpacityMode"
  };
  Object.entries(scopeAnalogies).forEach(([oldKey, newKey]) => {
    if (coordinationSpace[oldKey]) {
      coordinationSpace[newKey] = coordinationSpace[oldKey];
      delete coordinationSpace[oldKey];
    }
  });
  const layout = config2.layout.map((component) => {
    const newComponent = { ...component };
    const { coordinationScopes = {} } = newComponent;
    Object.entries(scopeAnalogies).forEach(([oldKey, newKey]) => {
      if (coordinationScopes[oldKey]) {
        coordinationScopes[newKey] = coordinationScopes[oldKey];
        delete coordinationScopes[oldKey];
      }
    });
    return {
      ...newComponent,
      coordinationScopes
    };
  });
  return {
    ...config2,
    coordinationSpace,
    layout,
    version: "1.0.11"
  };
}
function upgradeFrom1_0_11(config2) {
  const newConfig = cloneDeep(config2);
  const { datasets, coordinationSpace } = newConfig;
  if (coordinationSpace == null ? void 0 : coordinationSpace.embeddingType) {
    const embeddingTypes = Object.values(coordinationSpace.embeddingType);
    datasets.forEach((dataset, i) => {
      const { files } = dataset;
      files.forEach((fileDef, j) => {
        const { fileType } = fileDef;
        if (fileType === "cells.json") {
          datasets[i].files[j].options = {
            embeddingTypes
          };
        }
      });
    });
  }
  return {
    ...newConfig,
    datasets,
    version: "1.0.12"
  };
}
function upgradeFrom1_0_12(config2) {
  const newConfig = cloneDeep(config2);
  const { datasets, coordinationSpace, layout } = newConfig;
  const newCoordinationSpace = coordinationSpace || {};
  const datasetUidToObsLabelsTypeScopes = {};
  datasets.forEach((dataset) => {
    const { files, uid } = dataset;
    files.forEach((fileDef) => {
      const { fileType, options } = fileDef;
      if (fileType === "anndata-cells.zarr") {
        if (options && "factors" in options && Array.isArray(options.factors)) {
          const obsLabelsTypeScopes = [];
          options.factors.forEach((olt) => {
            const nextScope = getNextScope(Object.keys((coordinationSpace == null ? void 0 : coordinationSpace.obsLabelsType) || {}));
            newCoordinationSpace.obsLabelsType = {
              ...newCoordinationSpace.obsLabelsType,
              // Need to remove the obs/ prefix.
              [nextScope]: olt.split("/").at(-1)
            };
            obsLabelsTypeScopes.push(nextScope);
          });
          datasetUidToObsLabelsTypeScopes[uid] = obsLabelsTypeScopes;
        }
      }
    });
  });
  function getDatasetUidForView(viewDef) {
    var _a2, _b2;
    if (((_a2 = viewDef.coordinationScopes) == null ? void 0 : _a2.dataset) && typeof ((_b2 = viewDef.coordinationScopes) == null ? void 0 : _b2.dataset) === "string") {
      return newCoordinationSpace.dataset[viewDef.coordinationScopes.dataset];
    }
    if (datasets.length > 0) {
      return datasets[0].uid;
    }
    return null;
  }
  const newLayout = layout.map((viewDef) => {
    const viewDatasetUid = getDatasetUidForView(viewDef);
    if (typeof viewDatasetUid === "string") {
      const datasetObsLabelsTypeScopes = datasetUidToObsLabelsTypeScopes[viewDatasetUid];
      if (datasetObsLabelsTypeScopes) {
        return {
          ...viewDef,
          coordinationScopes: {
            ...viewDef.coordinationScopes,
            obsLabelsType: datasetObsLabelsTypeScopes
          }
        };
      }
    }
    return viewDef;
  });
  return {
    ...newConfig,
    coordinationSpace: newCoordinationSpace,
    layout: newLayout,
    version: "1.0.13"
  };
}
function upgradeFrom1_0_13(config2) {
  const newConfig = cloneDeep(config2);
  return {
    ...newConfig,
    version: "1.0.14"
  };
}
function upgradeFrom1_0_14(config2) {
  const newConfig = cloneDeep(config2);
  const { layout } = newConfig;
  const viewTypeAnalogies = {
    genes: "featureList",
    cellSets: "obsSets",
    cellSetSizes: "obsSetSizes",
    cellSetExpression: "obsSetFeatureValueDistribution",
    expressionHistogram: "featureValueHistogram"
  };
  const newLayout = layout.map((viewDef) => {
    if (viewTypeAnalogies[viewDef.component]) {
      return {
        ...viewDef,
        component: viewTypeAnalogies[viewDef.component]
      };
    }
    return viewDef;
  });
  const propAnalogies = {
    variablesLabelOverride: "featureType",
    observationsLabelOverride: "obsType"
  };
  newLayout.forEach((viewDef) => {
    Object.entries(propAnalogies).forEach(([oldProp, newType]) => {
      var _a2;
      if ((_a2 = viewDef.props) == null ? void 0 : _a2[oldProp]) {
        log.warn(`Warning: the '${oldProp}' prop on the ${viewDef.component} view is deprecated. Please use the '${newType}' coordination type instead.`);
      }
    });
  });
  return {
    ...newConfig,
    version: "1.0.15",
    layout: newLayout
  };
}
function upgradeFrom1_0_15(config2) {
  const newConfig = cloneDeep(config2);
  const { layout } = newConfig;
  const newLayout = layout.map((view) => {
    const { coordinationScopes } = view;
    const newCoordinationScopes = {};
    if ((coordinationScopes == null ? void 0 : coordinationScopes.dataset) && Array.isArray(coordinationScopes.dataset)) {
      const coordinationScopesBy = {
        dataset: {}
      };
      Object.entries(coordinationScopes).forEach(([coordinationType, coordinationScope]) => {
        if (!Array.isArray(coordinationScope) && typeof coordinationScope === "object") {
          if (coordinationType === "dataset") {
            log.error("Expected coordinationScopes.dataset value to be either string or string[], but got object.");
          }
          coordinationScopesBy.dataset[coordinationType] = coordinationScope;
        } else if (Array.isArray(coordinationScope) || typeof coordinationScope === "string") {
          newCoordinationScopes[coordinationType] = coordinationScope;
        }
      });
      return {
        ...view,
        coordinationScopes: newCoordinationScopes,
        coordinationScopesBy
      };
    }
    if (coordinationScopes) {
      Object.entries(coordinationScopes).forEach(([coordinationType, coordinationScope]) => {
        if (Array.isArray(coordinationScope) || typeof coordinationScope === "string") {
          newCoordinationScopes[coordinationType] = coordinationScope;
        }
      });
    }
    return {
      ...view,
      coordinationScopes: newCoordinationScopes
    };
  });
  return {
    ...newConfig,
    layout: newLayout,
    version: "1.0.16"
  };
}
function upgradeFrom1_0_16(config2) {
  const newConfig = cloneDeep(config2);
  const { datasets } = newConfig;
  const newDatasets = datasets.map((datasetDef) => {
    const { files } = datasetDef;
    const newFiles = files.map((fileDef) => {
      const { fileType, options } = fileDef;
      if (fileType === "obsSets.anndata.zarr") {
        return {
          ...fileDef,
          options: {
            obsSets: options
          }
        };
      }
      if (fileType === "obsFeatureColumns.anndata.zarr") {
        return {
          ...fileDef,
          options: {
            obsFeatureColumns: options
          }
        };
      }
      return fileDef;
    });
    return {
      ...datasetDef,
      files: newFiles
    };
  });
  return {
    ...newConfig,
    datasets: newDatasets,
    version: "1.0.17"
  };
}
const latestConfigSchema = configSchema1_0_17;
const SCHEMA_HANDLERS = [
  [configSchema0_1_0, upgradeFrom0_1_0],
  [configSchema1_0_0, upgradeFrom1_0_0],
  [configSchema1_0_1, upgradeFrom1_0_1],
  [configSchema1_0_2, upgradeFrom1_0_2],
  [configSchema1_0_3, upgradeFrom1_0_3],
  [configSchema1_0_4, upgradeFrom1_0_4],
  [configSchema1_0_5, upgradeFrom1_0_5],
  [configSchema1_0_6, upgradeFrom1_0_6],
  [configSchema1_0_7, upgradeFrom1_0_7],
  [configSchema1_0_8, upgradeFrom1_0_8],
  [configSchema1_0_9, upgradeFrom1_0_9],
  [configSchema1_0_10, upgradeFrom1_0_10],
  [configSchema1_0_11, upgradeFrom1_0_11],
  [configSchema1_0_12, upgradeFrom1_0_12],
  [configSchema1_0_13, upgradeFrom1_0_13],
  [configSchema1_0_14, upgradeFrom1_0_14],
  [configSchema1_0_15, upgradeFrom1_0_15],
  [configSchema1_0_16, upgradeFrom1_0_16]
];
var re$3 = { exports: {} };
const SEMVER_SPEC_VERSION = "2.0.0";
const MAX_LENGTH$2 = 256;
const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991;
const MAX_SAFE_COMPONENT_LENGTH = 16;
var constants$1 = {
  SEMVER_SPEC_VERSION,
  MAX_LENGTH: MAX_LENGTH$2,
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
  MAX_SAFE_COMPONENT_LENGTH
};
const debug$1 = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
};
var debug_1 = debug$1;
(function(module2, exports2) {
  const { MAX_SAFE_COMPONENT_LENGTH: MAX_SAFE_COMPONENT_LENGTH2 } = constants$1;
  const debug2 = debug_1;
  exports2 = module2.exports = {};
  const re2 = exports2.re = [];
  const src = exports2.src = [];
  const t2 = exports2.t = {};
  let R = 0;
  const createToken = (name, value, isGlobal) => {
    const index = R++;
    debug2(name, index, value);
    t2[name] = index;
    src[index] = value;
    re2[index] = new RegExp(value, isGlobal ? "g" : void 0);
  };
  createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
  createToken("NUMERICIDENTIFIERLOOSE", "[0-9]+");
  createToken("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*");
  createToken("MAINVERSION", `(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})`);
  createToken("MAINVERSIONLOOSE", `(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})`);
  createToken("PRERELEASEIDENTIFIER", `(?:${src[t2.NUMERICIDENTIFIER]}|${src[t2.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t2.NUMERICIDENTIFIERLOOSE]}|${src[t2.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASE", `(?:-(${src[t2.PRERELEASEIDENTIFIER]}(?:\\.${src[t2.PRERELEASEIDENTIFIER]})*))`);
  createToken("PRERELEASELOOSE", `(?:-?(${src[t2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t2.PRERELEASEIDENTIFIERLOOSE]})*))`);
  createToken("BUILDIDENTIFIER", "[0-9A-Za-z-]+");
  createToken("BUILD", `(?:\\+(${src[t2.BUILDIDENTIFIER]}(?:\\.${src[t2.BUILDIDENTIFIER]})*))`);
  createToken("FULLPLAIN", `v?${src[t2.MAINVERSION]}${src[t2.PRERELEASE]}?${src[t2.BUILD]}?`);
  createToken("FULL", `^${src[t2.FULLPLAIN]}$`);
  createToken("LOOSEPLAIN", `[v=\\s]*${src[t2.MAINVERSIONLOOSE]}${src[t2.PRERELEASELOOSE]}?${src[t2.BUILD]}?`);
  createToken("LOOSE", `^${src[t2.LOOSEPLAIN]}$`);
  createToken("GTLT", "((?:<|>)?=?)");
  createToken("XRANGEIDENTIFIERLOOSE", `${src[t2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
  createToken("XRANGEIDENTIFIER", `${src[t2.NUMERICIDENTIFIER]}|x|X|\\*`);
  createToken("XRANGEPLAIN", `[v=\\s]*(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:${src[t2.PRERELEASE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:${src[t2.PRERELEASELOOSE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAIN]}$`);
  createToken("XRANGELOOSE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COERCE", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH2}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?(?:$|[^\\d])`);
  createToken("COERCERTL", src[t2.COERCE], true);
  createToken("LONETILDE", "(?:~>?)");
  createToken("TILDETRIM", `(\\s*)${src[t2.LONETILDE]}\\s+`, true);
  exports2.tildeTrimReplace = "$1~";
  createToken("TILDE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAIN]}$`);
  createToken("TILDELOOSE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("LONECARET", "(?:\\^)");
  createToken("CARETTRIM", `(\\s*)${src[t2.LONECARET]}\\s+`, true);
  exports2.caretTrimReplace = "$1^";
  createToken("CARET", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAIN]}$`);
  createToken("CARETLOOSE", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COMPARATORLOOSE", `^${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]})$|^$`);
  createToken("COMPARATOR", `^${src[t2.GTLT]}\\s*(${src[t2.FULLPLAIN]})$|^$`);
  createToken("COMPARATORTRIM", `(\\s*)${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]}|${src[t2.XRANGEPLAIN]})`, true);
  exports2.comparatorTrimReplace = "$1$2$3";
  createToken("HYPHENRANGE", `^\\s*(${src[t2.XRANGEPLAIN]})\\s+-\\s+(${src[t2.XRANGEPLAIN]})\\s*$`);
  createToken("HYPHENRANGELOOSE", `^\\s*(${src[t2.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t2.XRANGEPLAINLOOSE]})\\s*$`);
  createToken("STAR", "(<|>)?=?\\s*\\*");
  createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
  createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(re$3, re$3.exports);
var reExports = re$3.exports;
const opts = ["includePrerelease", "loose", "rtl"];
const parseOptions$2 = (options) => !options ? {} : typeof options !== "object" ? { loose: true } : opts.filter((k) => options[k]).reduce((o, k) => {
  o[k] = true;
  return o;
}, {});
var parseOptions_1 = parseOptions$2;
const numeric = /^[0-9]+$/;
const compareIdentifiers$1 = (a, b) => {
  const anum = numeric.test(a);
  const bnum = numeric.test(b);
  if (anum && bnum) {
    a = +a;
    b = +b;
  }
  return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
};
const rcompareIdentifiers = (a, b) => compareIdentifiers$1(b, a);
var identifiers$1 = {
  compareIdentifiers: compareIdentifiers$1,
  rcompareIdentifiers
};
const debug = debug_1;
const { MAX_LENGTH: MAX_LENGTH$1, MAX_SAFE_INTEGER } = constants$1;
const { re: re$2, t: t$2 } = reExports;
const parseOptions$1 = parseOptions_1;
const { compareIdentifiers } = identifiers$1;
let SemVer$d = class SemVer {
  constructor(version, options) {
    options = parseOptions$1(options);
    if (version instanceof SemVer) {
      if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
        return version;
      } else {
        version = version.version;
      }
    } else if (typeof version !== "string") {
      throw new TypeError(`Invalid Version: ${version}`);
    }
    if (version.length > MAX_LENGTH$1) {
      throw new TypeError(
        `version is longer than ${MAX_LENGTH$1} characters`
      );
    }
    debug("SemVer", version, options);
    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease;
    const m = version.trim().match(options.loose ? re$2[t$2.LOOSE] : re$2[t$2.FULL]);
    if (!m) {
      throw new TypeError(`Invalid Version: ${version}`);
    }
    this.raw = version;
    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];
    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError("Invalid major version");
    }
    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError("Invalid minor version");
    }
    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError("Invalid patch version");
    }
    if (!m[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m[4].split(".").map((id) => {
        if (/^[0-9]+$/.test(id)) {
          const num = +id;
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num;
          }
        }
        return id;
      });
    }
    this.build = m[5] ? m[5].split(".") : [];
    this.format();
  }
  format() {
    this.version = `${this.major}.${this.minor}.${this.patch}`;
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join(".")}`;
    }
    return this.version;
  }
  toString() {
    return this.version;
  }
  compare(other) {
    debug("SemVer.compare", this.version, this.options, other);
    if (!(other instanceof SemVer)) {
      if (typeof other === "string" && other === this.version) {
        return 0;
      }
      other = new SemVer(other, this.options);
    }
    if (other.version === this.version) {
      return 0;
    }
    return this.compareMain(other) || this.comparePre(other);
  }
  compareMain(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
  }
  comparePre(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    if (this.prerelease.length && !other.prerelease.length) {
      return -1;
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1;
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0;
    }
    let i = 0;
    do {
      const a = this.prerelease[i];
      const b = other.prerelease[i];
      debug("prerelease compare", i, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }
  compareBuild(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    let i = 0;
    do {
      const a = this.build[i];
      const b = other.build[i];
      debug("prerelease compare", i, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(release, identifier) {
    switch (release) {
      case "premajor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc("pre", identifier);
        break;
      case "preminor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc("pre", identifier);
        break;
      case "prepatch":
        this.prerelease.length = 0;
        this.inc("patch", identifier);
        this.inc("pre", identifier);
        break;
      case "prerelease":
        if (this.prerelease.length === 0) {
          this.inc("patch", identifier);
        }
        this.inc("pre", identifier);
        break;
      case "major":
        if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
          this.major++;
        }
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;
      case "minor":
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++;
        }
        this.patch = 0;
        this.prerelease = [];
        break;
      case "patch":
        if (this.prerelease.length === 0) {
          this.patch++;
        }
        this.prerelease = [];
        break;
      case "pre":
        if (this.prerelease.length === 0) {
          this.prerelease = [0];
        } else {
          let i = this.prerelease.length;
          while (--i >= 0) {
            if (typeof this.prerelease[i] === "number") {
              this.prerelease[i]++;
              i = -2;
            }
          }
          if (i === -1) {
            this.prerelease.push(0);
          }
        }
        if (identifier) {
          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = [identifier, 0];
            }
          } else {
            this.prerelease = [identifier, 0];
          }
        }
        break;
      default:
        throw new Error(`invalid increment argument: ${release}`);
    }
    this.format();
    this.raw = this.version;
    return this;
  }
};
var semver = SemVer$d;
const { MAX_LENGTH } = constants$1;
const { re: re$1, t: t$1 } = reExports;
const SemVer$c = semver;
const parseOptions = parseOptions_1;
const parse$6 = (version, options) => {
  options = parseOptions(options);
  if (version instanceof SemVer$c) {
    return version;
  }
  if (typeof version !== "string") {
    return null;
  }
  if (version.length > MAX_LENGTH) {
    return null;
  }
  const r = options.loose ? re$1[t$1.LOOSE] : re$1[t$1.FULL];
  if (!r.test(version)) {
    return null;
  }
  try {
    return new SemVer$c(version, options);
  } catch (er) {
    return null;
  }
};
var parse_1 = parse$6;
const parse$5 = parse_1;
const valid$2 = (version, options) => {
  const v = parse$5(version, options);
  return v ? v.version : null;
};
var valid_1 = valid$2;
const parse$4 = parse_1;
const clean$1 = (version, options) => {
  const s = parse$4(version.trim().replace(/^[=v]+/, ""), options);
  return s ? s.version : null;
};
var clean_1 = clean$1;
const SemVer$b = semver;
const inc$1 = (version, release, options, identifier) => {
  if (typeof options === "string") {
    identifier = options;
    options = void 0;
  }
  try {
    return new SemVer$b(
      version instanceof SemVer$b ? version.version : version,
      options
    ).inc(release, identifier).version;
  } catch (er) {
    return null;
  }
};
var inc_1 = inc$1;
const SemVer$a = semver;
const compare$b = (a, b, loose) => new SemVer$a(a, loose).compare(new SemVer$a(b, loose));
var compare_1 = compare$b;
const compare$a = compare_1;
const eq$3 = (a, b, loose) => compare$a(a, b, loose) === 0;
var eq_1 = eq$3;
const parse$3 = parse_1;
const eq$2 = eq_1;
const diff$1 = (version1, version2) => {
  if (eq$2(version1, version2)) {
    return null;
  } else {
    const v1 = parse$3(version1);
    const v2 = parse$3(version2);
    const hasPre = v1.prerelease.length || v2.prerelease.length;
    const prefix = hasPre ? "pre" : "";
    const defaultResult = hasPre ? "prerelease" : "";
    for (const key in v1) {
      if (key === "major" || key === "minor" || key === "patch") {
        if (v1[key] !== v2[key]) {
          return prefix + key;
        }
      }
    }
    return defaultResult;
  }
};
var diff_1 = diff$1;
const SemVer$9 = semver;
const major$1 = (a, loose) => new SemVer$9(a, loose).major;
var major_1 = major$1;
const SemVer$8 = semver;
const minor$1 = (a, loose) => new SemVer$8(a, loose).minor;
var minor_1 = minor$1;
const SemVer$7 = semver;
const patch$1 = (a, loose) => new SemVer$7(a, loose).patch;
var patch_1 = patch$1;
const parse$2 = parse_1;
const prerelease$1 = (version, options) => {
  const parsed = parse$2(version, options);
  return parsed && parsed.prerelease.length ? parsed.prerelease : null;
};
var prerelease_1 = prerelease$1;
const compare$9 = compare_1;
const rcompare$1 = (a, b, loose) => compare$9(b, a, loose);
var rcompare_1 = rcompare$1;
const compare$8 = compare_1;
const compareLoose$1 = (a, b) => compare$8(a, b, true);
var compareLoose_1 = compareLoose$1;
const SemVer$6 = semver;
const compareBuild$3 = (a, b, loose) => {
  const versionA = new SemVer$6(a, loose);
  const versionB = new SemVer$6(b, loose);
  return versionA.compare(versionB) || versionA.compareBuild(versionB);
};
var compareBuild_1 = compareBuild$3;
const compareBuild$2 = compareBuild_1;
const sort$1 = (list, loose) => list.sort((a, b) => compareBuild$2(a, b, loose));
var sort_1 = sort$1;
const compareBuild$1 = compareBuild_1;
const rsort$1 = (list, loose) => list.sort((a, b) => compareBuild$1(b, a, loose));
var rsort_1 = rsort$1;
const compare$7 = compare_1;
const gt$4 = (a, b, loose) => compare$7(a, b, loose) > 0;
var gt_1 = gt$4;
const compare$6 = compare_1;
const lt$3 = (a, b, loose) => compare$6(a, b, loose) < 0;
var lt_1 = lt$3;
const compare$5 = compare_1;
const neq$2 = (a, b, loose) => compare$5(a, b, loose) !== 0;
var neq_1 = neq$2;
const compare$4 = compare_1;
const gte$3 = (a, b, loose) => compare$4(a, b, loose) >= 0;
var gte_1 = gte$3;
const compare$3 = compare_1;
const lte$3 = (a, b, loose) => compare$3(a, b, loose) <= 0;
var lte_1 = lte$3;
const eq$1 = eq_1;
const neq$1 = neq_1;
const gt$3 = gt_1;
const gte$2 = gte_1;
const lt$2 = lt_1;
const lte$2 = lte_1;
const cmp$1 = (a, op, b, loose) => {
  switch (op) {
    case "===":
      if (typeof a === "object") {
        a = a.version;
      }
      if (typeof b === "object") {
        b = b.version;
      }
      return a === b;
    case "!==":
      if (typeof a === "object") {
        a = a.version;
      }
      if (typeof b === "object") {
        b = b.version;
      }
      return a !== b;
    case "":
    case "=":
    case "==":
      return eq$1(a, b, loose);
    case "!=":
      return neq$1(a, b, loose);
    case ">":
      return gt$3(a, b, loose);
    case ">=":
      return gte$2(a, b, loose);
    case "<":
      return lt$2(a, b, loose);
    case "<=":
      return lte$2(a, b, loose);
    default:
      throw new TypeError(`Invalid operator: ${op}`);
  }
};
var cmp_1 = cmp$1;
const SemVer$5 = semver;
const parse$1 = parse_1;
const { re, t } = reExports;
const coerce$1 = (version, options) => {
  if (version instanceof SemVer$5) {
    return version;
  }
  if (typeof version === "number") {
    version = String(version);
  }
  if (typeof version !== "string") {
    return null;
  }
  options = options || {};
  let match = null;
  if (!options.rtl) {
    match = version.match(re[t.COERCE]);
  } else {
    let next;
    while ((next = re[t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length)) {
      if (!match || next.index + next[0].length !== match.index + match[0].length) {
        match = next;
      }
      re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
    }
    re[t.COERCERTL].lastIndex = -1;
  }
  if (match === null) {
    return null;
  }
  return parse$1(`${match[2]}.${match[3] || "0"}.${match[4] || "0"}`, options);
};
var coerce_1 = coerce$1;
var iterator;
var hasRequiredIterator;
function requireIterator() {
  if (hasRequiredIterator)
    return iterator;
  hasRequiredIterator = 1;
  iterator = function(Yallist2) {
    Yallist2.prototype[Symbol.iterator] = function* () {
      for (let walker = this.head; walker; walker = walker.next) {
        yield walker.value;
      }
    };
  };
  return iterator;
}
var yallist = Yallist$1;
Yallist$1.Node = Node;
Yallist$1.create = Yallist$1;
function Yallist$1(list) {
  var self2 = this;
  if (!(self2 instanceof Yallist$1)) {
    self2 = new Yallist$1();
  }
  self2.tail = null;
  self2.head = null;
  self2.length = 0;
  if (list && typeof list.forEach === "function") {
    list.forEach(function(item) {
      self2.push(item);
    });
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self2.push(arguments[i]);
    }
  }
  return self2;
}
Yallist$1.prototype.removeNode = function(node) {
  if (node.list !== this) {
    throw new Error("removing node which does not belong to this list");
  }
  var next = node.next;
  var prev = node.prev;
  if (next) {
    next.prev = prev;
  }
  if (prev) {
    prev.next = next;
  }
  if (node === this.head) {
    this.head = next;
  }
  if (node === this.tail) {
    this.tail = prev;
  }
  node.list.length--;
  node.next = null;
  node.prev = null;
  node.list = null;
  return next;
};
Yallist$1.prototype.unshiftNode = function(node) {
  if (node === this.head) {
    return;
  }
  if (node.list) {
    node.list.removeNode(node);
  }
  var head = this.head;
  node.list = this;
  node.next = head;
  if (head) {
    head.prev = node;
  }
  this.head = node;
  if (!this.tail) {
    this.tail = node;
  }
  this.length++;
};
Yallist$1.prototype.pushNode = function(node) {
  if (node === this.tail) {
    return;
  }
  if (node.list) {
    node.list.removeNode(node);
  }
  var tail = this.tail;
  node.list = this;
  node.prev = tail;
  if (tail) {
    tail.next = node;
  }
  this.tail = node;
  if (!this.head) {
    this.head = node;
  }
  this.length++;
};
Yallist$1.prototype.push = function() {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i]);
  }
  return this.length;
};
Yallist$1.prototype.unshift = function() {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i]);
  }
  return this.length;
};
Yallist$1.prototype.pop = function() {
  if (!this.tail) {
    return void 0;
  }
  var res = this.tail.value;
  this.tail = this.tail.prev;
  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }
  this.length--;
  return res;
};
Yallist$1.prototype.shift = function() {
  if (!this.head) {
    return void 0;
  }
  var res = this.head.value;
  this.head = this.head.next;
  if (this.head) {
    this.head.prev = null;
  } else {
    this.tail = null;
  }
  this.length--;
  return res;
};
Yallist$1.prototype.forEach = function(fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.next;
  }
};
Yallist$1.prototype.forEachReverse = function(fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.prev;
  }
};
Yallist$1.prototype.get = function(n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    walker = walker.next;
  }
  if (i === n && walker !== null) {
    return walker.value;
  }
};
Yallist$1.prototype.getReverse = function(n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    walker = walker.prev;
  }
  if (i === n && walker !== null) {
    return walker.value;
  }
};
Yallist$1.prototype.map = function(fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$1();
  for (var walker = this.head; walker !== null; ) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.next;
  }
  return res;
};
Yallist$1.prototype.mapReverse = function(fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$1();
  for (var walker = this.tail; walker !== null; ) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.prev;
  }
  return res;
};
Yallist$1.prototype.reduce = function(fn, initial) {
  var acc;
  var walker = this.head;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.head) {
    walker = this.head.next;
    acc = this.head.value;
  } else {
    throw new TypeError("Reduce of empty list with no initial value");
  }
  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i);
    walker = walker.next;
  }
  return acc;
};
Yallist$1.prototype.reduceReverse = function(fn, initial) {
  var acc;
  var walker = this.tail;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.tail) {
    walker = this.tail.prev;
    acc = this.tail.value;
  } else {
    throw new TypeError("Reduce of empty list with no initial value");
  }
  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i);
    walker = walker.prev;
  }
  return acc;
};
Yallist$1.prototype.toArray = function() {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.next;
  }
  return arr;
};
Yallist$1.prototype.toArrayReverse = function() {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.prev;
  }
  return arr;
};
Yallist$1.prototype.slice = function(from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist$1();
  if (to < from || to < 0) {
    return ret;
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next;
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value);
  }
  return ret;
};
Yallist$1.prototype.sliceReverse = function(from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist$1();
  if (to < from || to < 0) {
    return ret;
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev;
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value);
  }
  return ret;
};
Yallist$1.prototype.splice = function(start, deleteCount, ...nodes) {
  if (start > this.length) {
    start = this.length - 1;
  }
  if (start < 0) {
    start = this.length + start;
  }
  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next;
  }
  var ret = [];
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value);
    walker = this.removeNode(walker);
  }
  if (walker === null) {
    walker = this.tail;
  }
  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev;
  }
  for (var i = 0; i < nodes.length; i++) {
    walker = insert(this, walker, nodes[i]);
  }
  return ret;
};
Yallist$1.prototype.reverse = function() {
  var head = this.head;
  var tail = this.tail;
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev;
    walker.prev = walker.next;
    walker.next = p;
  }
  this.head = tail;
  this.tail = head;
  return this;
};
function insert(self2, node, value) {
  var inserted = node === self2.head ? new Node(value, null, node, self2) : new Node(value, node, node.next, self2);
  if (inserted.next === null) {
    self2.tail = inserted;
  }
  if (inserted.prev === null) {
    self2.head = inserted;
  }
  self2.length++;
  return inserted;
}
function push(self2, item) {
  self2.tail = new Node(item, self2.tail, null, self2);
  if (!self2.head) {
    self2.head = self2.tail;
  }
  self2.length++;
}
function unshift(self2, item) {
  self2.head = new Node(item, null, self2.head, self2);
  if (!self2.tail) {
    self2.tail = self2.head;
  }
  self2.length++;
}
function Node(value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list);
  }
  this.list = list;
  this.value = value;
  if (prev) {
    prev.next = this;
    this.prev = prev;
  } else {
    this.prev = null;
  }
  if (next) {
    next.prev = this;
    this.next = next;
  } else {
    this.next = null;
  }
}
try {
  requireIterator()(Yallist$1);
} catch (er) {
}
const Yallist = yallist;
const MAX = Symbol("max");
const LENGTH = Symbol("length");
const LENGTH_CALCULATOR = Symbol("lengthCalculator");
const ALLOW_STALE = Symbol("allowStale");
const MAX_AGE = Symbol("maxAge");
const DISPOSE = Symbol("dispose");
const NO_DISPOSE_ON_SET = Symbol("noDisposeOnSet");
const LRU_LIST = Symbol("lruList");
const CACHE = Symbol("cache");
const UPDATE_AGE_ON_GET = Symbol("updateAgeOnGet");
const naiveLength = () => 1;
class LRUCache {
  constructor(options) {
    if (typeof options === "number")
      options = { max: options };
    if (!options)
      options = {};
    if (options.max && (typeof options.max !== "number" || options.max < 0))
      throw new TypeError("max must be a non-negative number");
    this[MAX] = options.max || Infinity;
    const lc = options.length || naiveLength;
    this[LENGTH_CALCULATOR] = typeof lc !== "function" ? naiveLength : lc;
    this[ALLOW_STALE] = options.stale || false;
    if (options.maxAge && typeof options.maxAge !== "number")
      throw new TypeError("maxAge must be a number");
    this[MAX_AGE] = options.maxAge || 0;
    this[DISPOSE] = options.dispose;
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
    this.reset();
  }
  // resize the cache when the max changes.
  set max(mL) {
    if (typeof mL !== "number" || mL < 0)
      throw new TypeError("max must be a non-negative number");
    this[MAX] = mL || Infinity;
    trim(this);
  }
  get max() {
    return this[MAX];
  }
  set allowStale(allowStale) {
    this[ALLOW_STALE] = !!allowStale;
  }
  get allowStale() {
    return this[ALLOW_STALE];
  }
  set maxAge(mA) {
    if (typeof mA !== "number")
      throw new TypeError("maxAge must be a non-negative number");
    this[MAX_AGE] = mA;
    trim(this);
  }
  get maxAge() {
    return this[MAX_AGE];
  }
  // resize the cache when the lengthCalculator changes.
  set lengthCalculator(lC) {
    if (typeof lC !== "function")
      lC = naiveLength;
    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC;
      this[LENGTH] = 0;
      this[LRU_LIST].forEach((hit) => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
        this[LENGTH] += hit.length;
      });
    }
    trim(this);
  }
  get lengthCalculator() {
    return this[LENGTH_CALCULATOR];
  }
  get length() {
    return this[LENGTH];
  }
  get itemCount() {
    return this[LRU_LIST].length;
  }
  rforEach(fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST].tail; walker !== null; ) {
      const prev = walker.prev;
      forEachStep(this, fn, walker, thisp);
      walker = prev;
    }
  }
  forEach(fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST].head; walker !== null; ) {
      const next = walker.next;
      forEachStep(this, fn, walker, thisp);
      walker = next;
    }
  }
  keys() {
    return this[LRU_LIST].toArray().map((k) => k.key);
  }
  values() {
    return this[LRU_LIST].toArray().map((k) => k.value);
  }
  reset() {
    if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
      this[LRU_LIST].forEach((hit) => this[DISPOSE](hit.key, hit.value));
    }
    this[CACHE] = /* @__PURE__ */ new Map();
    this[LRU_LIST] = new Yallist();
    this[LENGTH] = 0;
  }
  dump() {
    return this[LRU_LIST].map((hit) => isStale(this, hit) ? false : {
      k: hit.key,
      v: hit.value,
      e: hit.now + (hit.maxAge || 0)
    }).toArray().filter((h) => h);
  }
  dumpLru() {
    return this[LRU_LIST];
  }
  set(key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE];
    if (maxAge && typeof maxAge !== "number")
      throw new TypeError("maxAge must be a number");
    const now = maxAge ? Date.now() : 0;
    const len = this[LENGTH_CALCULATOR](value, key);
    if (this[CACHE].has(key)) {
      if (len > this[MAX]) {
        del(this, this[CACHE].get(key));
        return false;
      }
      const node = this[CACHE].get(key);
      const item = node.value;
      if (this[DISPOSE]) {
        if (!this[NO_DISPOSE_ON_SET])
          this[DISPOSE](key, item.value);
      }
      item.now = now;
      item.maxAge = maxAge;
      item.value = value;
      this[LENGTH] += len - item.length;
      item.length = len;
      this.get(key);
      trim(this);
      return true;
    }
    const hit = new Entry(key, value, len, now, maxAge);
    if (hit.length > this[MAX]) {
      if (this[DISPOSE])
        this[DISPOSE](key, value);
      return false;
    }
    this[LENGTH] += hit.length;
    this[LRU_LIST].unshift(hit);
    this[CACHE].set(key, this[LRU_LIST].head);
    trim(this);
    return true;
  }
  has(key) {
    if (!this[CACHE].has(key))
      return false;
    const hit = this[CACHE].get(key).value;
    return !isStale(this, hit);
  }
  get(key) {
    return get(this, key, true);
  }
  peek(key) {
    return get(this, key, false);
  }
  pop() {
    const node = this[LRU_LIST].tail;
    if (!node)
      return null;
    del(this, node);
    return node.value;
  }
  del(key) {
    del(this, this[CACHE].get(key));
  }
  load(arr) {
    this.reset();
    const now = Date.now();
    for (let l = arr.length - 1; l >= 0; l--) {
      const hit = arr[l];
      const expiresAt = hit.e || 0;
      if (expiresAt === 0)
        this.set(hit.k, hit.v);
      else {
        const maxAge = expiresAt - now;
        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge);
        }
      }
    }
  }
  prune() {
    this[CACHE].forEach((value, key) => get(this, key, false));
  }
}
const get = (self2, key, doUse) => {
  const node = self2[CACHE].get(key);
  if (node) {
    const hit = node.value;
    if (isStale(self2, hit)) {
      del(self2, node);
      if (!self2[ALLOW_STALE])
        return void 0;
    } else {
      if (doUse) {
        if (self2[UPDATE_AGE_ON_GET])
          node.value.now = Date.now();
        self2[LRU_LIST].unshiftNode(node);
      }
    }
    return hit.value;
  }
};
const isStale = (self2, hit) => {
  if (!hit || !hit.maxAge && !self2[MAX_AGE])
    return false;
  const diff2 = Date.now() - hit.now;
  return hit.maxAge ? diff2 > hit.maxAge : self2[MAX_AGE] && diff2 > self2[MAX_AGE];
};
const trim = (self2) => {
  if (self2[LENGTH] > self2[MAX]) {
    for (let walker = self2[LRU_LIST].tail; self2[LENGTH] > self2[MAX] && walker !== null; ) {
      const prev = walker.prev;
      del(self2, walker);
      walker = prev;
    }
  }
};
const del = (self2, node) => {
  if (node) {
    const hit = node.value;
    if (self2[DISPOSE])
      self2[DISPOSE](hit.key, hit.value);
    self2[LENGTH] -= hit.length;
    self2[CACHE].delete(hit.key);
    self2[LRU_LIST].removeNode(node);
  }
};
class Entry {
  constructor(key, value, length, now, maxAge) {
    this.key = key;
    this.value = value;
    this.length = length;
    this.now = now;
    this.maxAge = maxAge || 0;
  }
}
const forEachStep = (self2, fn, node, thisp) => {
  let hit = node.value;
  if (isStale(self2, hit)) {
    del(self2, node);
    if (!self2[ALLOW_STALE])
      hit = void 0;
  }
  if (hit)
    fn.call(thisp, hit.value, hit.key, self2);
};
var lruCache = LRUCache;
var range;
var hasRequiredRange;
function requireRange() {
  if (hasRequiredRange)
    return range;
  hasRequiredRange = 1;
  class Range2 {
    constructor(range2, options) {
      options = parseOptions2(options);
      if (range2 instanceof Range2) {
        if (range2.loose === !!options.loose && range2.includePrerelease === !!options.includePrerelease) {
          return range2;
        } else {
          return new Range2(range2.raw, options);
        }
      }
      if (range2 instanceof Comparator2) {
        this.raw = range2.value;
        this.set = [[range2]];
        this.format();
        return this;
      }
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      this.raw = range2;
      this.set = range2.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
      if (!this.set.length) {
        throw new TypeError(`Invalid SemVer Range: ${range2}`);
      }
      if (this.set.length > 1) {
        const first = this.set[0];
        this.set = this.set.filter((c) => !isNullSet(c[0]));
        if (this.set.length === 0) {
          this.set = [first];
        } else if (this.set.length > 1) {
          for (const c of this.set) {
            if (c.length === 1 && isAny(c[0])) {
              this.set = [c];
              break;
            }
          }
        }
      }
      this.format();
    }
    format() {
      this.range = this.set.map((comps) => {
        return comps.join(" ").trim();
      }).join("||").trim();
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(range2) {
      range2 = range2.trim();
      const memoOpts = Object.keys(this.options).join(",");
      const memoKey = `parseRange:${memoOpts}:${range2}`;
      const cached = cache.get(memoKey);
      if (cached) {
        return cached;
      }
      const loose = this.options.loose;
      const hr = loose ? re2[t2.HYPHENRANGELOOSE] : re2[t2.HYPHENRANGE];
      range2 = range2.replace(hr, hyphenReplace(this.options.includePrerelease));
      debug2("hyphen replace", range2);
      range2 = range2.replace(re2[t2.COMPARATORTRIM], comparatorTrimReplace);
      debug2("comparator trim", range2);
      range2 = range2.replace(re2[t2.TILDETRIM], tildeTrimReplace);
      range2 = range2.replace(re2[t2.CARETTRIM], caretTrimReplace);
      range2 = range2.split(/\s+/).join(" ");
      let rangeList = range2.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
      if (loose) {
        rangeList = rangeList.filter((comp) => {
          debug2("loose invalid filter", comp, this.options);
          return !!comp.match(re2[t2.COMPARATORLOOSE]);
        });
      }
      debug2("range list", rangeList);
      const rangeMap = /* @__PURE__ */ new Map();
      const comparators = rangeList.map((comp) => new Comparator2(comp, this.options));
      for (const comp of comparators) {
        if (isNullSet(comp)) {
          return [comp];
        }
        rangeMap.set(comp.value, comp);
      }
      if (rangeMap.size > 1 && rangeMap.has("")) {
        rangeMap.delete("");
      }
      const result = [...rangeMap.values()];
      cache.set(memoKey, result);
      return result;
    }
    intersects(range2, options) {
      if (!(range2 instanceof Range2)) {
        throw new TypeError("a Range is required");
      }
      return this.set.some((thisComparators) => {
        return isSatisfiable(thisComparators, options) && range2.set.some((rangeComparators) => {
          return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
            return rangeComparators.every((rangeComparator) => {
              return thisComparator.intersects(rangeComparator, options);
            });
          });
        });
      });
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(version) {
      if (!version) {
        return false;
      }
      if (typeof version === "string") {
        try {
          version = new SemVer3(version, this.options);
        } catch (er) {
          return false;
        }
      }
      for (let i = 0; i < this.set.length; i++) {
        if (testSet(this.set[i], version, this.options)) {
          return true;
        }
      }
      return false;
    }
  }
  range = Range2;
  const LRU = lruCache;
  const cache = new LRU({ max: 1e3 });
  const parseOptions2 = parseOptions_1;
  const Comparator2 = requireComparator();
  const debug2 = debug_1;
  const SemVer3 = semver;
  const {
    re: re2,
    t: t2,
    comparatorTrimReplace,
    tildeTrimReplace,
    caretTrimReplace
  } = reExports;
  const isNullSet = (c) => c.value === "<0.0.0-0";
  const isAny = (c) => c.value === "";
  const isSatisfiable = (comparators, options) => {
    let result = true;
    const remainingComparators = comparators.slice();
    let testComparator = remainingComparators.pop();
    while (result && remainingComparators.length) {
      result = remainingComparators.every((otherComparator) => {
        return testComparator.intersects(otherComparator, options);
      });
      testComparator = remainingComparators.pop();
    }
    return result;
  };
  const parseComparator = (comp, options) => {
    debug2("comp", comp, options);
    comp = replaceCarets(comp, options);
    debug2("caret", comp);
    comp = replaceTildes(comp, options);
    debug2("tildes", comp);
    comp = replaceXRanges(comp, options);
    debug2("xrange", comp);
    comp = replaceStars(comp, options);
    debug2("stars", comp);
    return comp;
  };
  const isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
  const replaceTildes = (comp, options) => comp.trim().split(/\s+/).map((c) => {
    return replaceTilde(c, options);
  }).join(" ");
  const replaceTilde = (comp, options) => {
    const r = options.loose ? re2[t2.TILDELOOSE] : re2[t2.TILDE];
    return comp.replace(r, (_, M, m, p, pr) => {
      debug2("tilde", comp, _, M, m, p, pr);
      let ret;
      if (isX(M)) {
        ret = "";
      } else if (isX(m)) {
        ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
      } else if (isX(p)) {
        ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
      } else if (pr) {
        debug2("replaceTilde pr", pr);
        ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
      } else {
        ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
      }
      debug2("tilde return", ret);
      return ret;
    });
  };
  const replaceCarets = (comp, options) => comp.trim().split(/\s+/).map((c) => {
    return replaceCaret(c, options);
  }).join(" ");
  const replaceCaret = (comp, options) => {
    debug2("caret", comp, options);
    const r = options.loose ? re2[t2.CARETLOOSE] : re2[t2.CARET];
    const z2 = options.includePrerelease ? "-0" : "";
    return comp.replace(r, (_, M, m, p, pr) => {
      debug2("caret", comp, _, M, m, p, pr);
      let ret;
      if (isX(M)) {
        ret = "";
      } else if (isX(m)) {
        ret = `>=${M}.0.0${z2} <${+M + 1}.0.0-0`;
      } else if (isX(p)) {
        if (M === "0") {
          ret = `>=${M}.${m}.0${z2} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.0${z2} <${+M + 1}.0.0-0`;
        }
      } else if (pr) {
        debug2("replaceCaret pr", pr);
        if (M === "0") {
          if (m === "0") {
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
          }
        } else {
          ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
        }
      } else {
        debug2("no pr");
        if (M === "0") {
          if (m === "0") {
            ret = `>=${M}.${m}.${p}${z2} <${M}.${m}.${+p + 1}-0`;
          } else {
            ret = `>=${M}.${m}.${p}${z2} <${M}.${+m + 1}.0-0`;
          }
        } else {
          ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
        }
      }
      debug2("caret return", ret);
      return ret;
    });
  };
  const replaceXRanges = (comp, options) => {
    debug2("replaceXRanges", comp, options);
    return comp.split(/\s+/).map((c) => {
      return replaceXRange(c, options);
    }).join(" ");
  };
  const replaceXRange = (comp, options) => {
    comp = comp.trim();
    const r = options.loose ? re2[t2.XRANGELOOSE] : re2[t2.XRANGE];
    return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
      debug2("xRange", comp, ret, gtlt, M, m, p, pr);
      const xM = isX(M);
      const xm = xM || isX(m);
      const xp = xm || isX(p);
      const anyX = xp;
      if (gtlt === "=" && anyX) {
        gtlt = "";
      }
      pr = options.includePrerelease ? "-0" : "";
      if (xM) {
        if (gtlt === ">" || gtlt === "<") {
          ret = "<0.0.0-0";
        } else {
          ret = "*";
        }
      } else if (gtlt && anyX) {
        if (xm) {
          m = 0;
        }
        p = 0;
        if (gtlt === ">") {
          gtlt = ">=";
          if (xm) {
            M = +M + 1;
            m = 0;
            p = 0;
          } else {
            m = +m + 1;
            p = 0;
          }
        } else if (gtlt === "<=") {
          gtlt = "<";
          if (xm) {
            M = +M + 1;
          } else {
            m = +m + 1;
          }
        }
        if (gtlt === "<") {
          pr = "-0";
        }
        ret = `${gtlt + M}.${m}.${p}${pr}`;
      } else if (xm) {
        ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
      } else if (xp) {
        ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
      }
      debug2("xRange return", ret);
      return ret;
    });
  };
  const replaceStars = (comp, options) => {
    debug2("replaceStars", comp, options);
    return comp.trim().replace(re2[t2.STAR], "");
  };
  const replaceGTE0 = (comp, options) => {
    debug2("replaceGTE0", comp, options);
    return comp.trim().replace(re2[options.includePrerelease ? t2.GTE0PRE : t2.GTE0], "");
  };
  const hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) => {
    if (isX(fM)) {
      from = "";
    } else if (isX(fm)) {
      from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
    } else if (isX(fp)) {
      from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
    } else if (fpr) {
      from = `>=${from}`;
    } else {
      from = `>=${from}${incPr ? "-0" : ""}`;
    }
    if (isX(tM)) {
      to = "";
    } else if (isX(tm)) {
      to = `<${+tM + 1}.0.0-0`;
    } else if (isX(tp)) {
      to = `<${tM}.${+tm + 1}.0-0`;
    } else if (tpr) {
      to = `<=${tM}.${tm}.${tp}-${tpr}`;
    } else if (incPr) {
      to = `<${tM}.${tm}.${+tp + 1}-0`;
    } else {
      to = `<=${to}`;
    }
    return `${from} ${to}`.trim();
  };
  const testSet = (set, version, options) => {
    for (let i = 0; i < set.length; i++) {
      if (!set[i].test(version)) {
        return false;
      }
    }
    if (version.prerelease.length && !options.includePrerelease) {
      for (let i = 0; i < set.length; i++) {
        debug2(set[i].semver);
        if (set[i].semver === Comparator2.ANY) {
          continue;
        }
        if (set[i].semver.prerelease.length > 0) {
          const allowed = set[i].semver;
          if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
            return true;
          }
        }
      }
      return false;
    }
    return true;
  };
  return range;
}
var comparator;
var hasRequiredComparator;
function requireComparator() {
  if (hasRequiredComparator)
    return comparator;
  hasRequiredComparator = 1;
  const ANY2 = Symbol("SemVer ANY");
  class Comparator2 {
    static get ANY() {
      return ANY2;
    }
    constructor(comp, options) {
      options = parseOptions2(options);
      if (comp instanceof Comparator2) {
        if (comp.loose === !!options.loose) {
          return comp;
        } else {
          comp = comp.value;
        }
      }
      debug2("comparator", comp, options);
      this.options = options;
      this.loose = !!options.loose;
      this.parse(comp);
      if (this.semver === ANY2) {
        this.value = "";
      } else {
        this.value = this.operator + this.semver.version;
      }
      debug2("comp", this);
    }
    parse(comp) {
      const r = this.options.loose ? re2[t2.COMPARATORLOOSE] : re2[t2.COMPARATOR];
      const m = comp.match(r);
      if (!m) {
        throw new TypeError(`Invalid comparator: ${comp}`);
      }
      this.operator = m[1] !== void 0 ? m[1] : "";
      if (this.operator === "=") {
        this.operator = "";
      }
      if (!m[2]) {
        this.semver = ANY2;
      } else {
        this.semver = new SemVer3(m[2], this.options.loose);
      }
    }
    toString() {
      return this.value;
    }
    test(version) {
      debug2("Comparator.test", version, this.options.loose);
      if (this.semver === ANY2 || version === ANY2) {
        return true;
      }
      if (typeof version === "string") {
        try {
          version = new SemVer3(version, this.options);
        } catch (er) {
          return false;
        }
      }
      return cmp2(version, this.operator, this.semver, this.options);
    }
    intersects(comp, options) {
      if (!(comp instanceof Comparator2)) {
        throw new TypeError("a Comparator is required");
      }
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (this.operator === "") {
        if (this.value === "") {
          return true;
        }
        return new Range2(comp.value, options).test(this.value);
      } else if (comp.operator === "") {
        if (comp.value === "") {
          return true;
        }
        return new Range2(this.value, options).test(comp.semver);
      }
      const sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
      const sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
      const sameSemVer = this.semver.version === comp.semver.version;
      const differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
      const oppositeDirectionsLessThan = cmp2(this.semver, "<", comp.semver, options) && (this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<");
      const oppositeDirectionsGreaterThan = cmp2(this.semver, ">", comp.semver, options) && (this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">");
      return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
    }
  }
  comparator = Comparator2;
  const parseOptions2 = parseOptions_1;
  const { re: re2, t: t2 } = reExports;
  const cmp2 = cmp_1;
  const debug2 = debug_1;
  const SemVer3 = semver;
  const Range2 = requireRange();
  return comparator;
}
const Range$9 = requireRange();
const satisfies$4 = (version, range2, options) => {
  try {
    range2 = new Range$9(range2, options);
  } catch (er) {
    return false;
  }
  return range2.test(version);
};
var satisfies_1 = satisfies$4;
const Range$8 = requireRange();
const toComparators$1 = (range2, options) => new Range$8(range2, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
var toComparators_1 = toComparators$1;
const SemVer$4 = semver;
const Range$7 = requireRange();
const maxSatisfying$1 = (versions, range2, options) => {
  let max = null;
  let maxSV = null;
  let rangeObj = null;
  try {
    rangeObj = new Range$7(range2, options);
  } catch (er) {
    return null;
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      if (!max || maxSV.compare(v) === -1) {
        max = v;
        maxSV = new SemVer$4(max, options);
      }
    }
  });
  return max;
};
var maxSatisfying_1 = maxSatisfying$1;
const SemVer$3 = semver;
const Range$6 = requireRange();
const minSatisfying$1 = (versions, range2, options) => {
  let min = null;
  let minSV = null;
  let rangeObj = null;
  try {
    rangeObj = new Range$6(range2, options);
  } catch (er) {
    return null;
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      if (!min || minSV.compare(v) === 1) {
        min = v;
        minSV = new SemVer$3(min, options);
      }
    }
  });
  return min;
};
var minSatisfying_1 = minSatisfying$1;
const SemVer$2 = semver;
const Range$5 = requireRange();
const gt$2 = gt_1;
const minVersion$1 = (range2, loose) => {
  range2 = new Range$5(range2, loose);
  let minver = new SemVer$2("0.0.0");
  if (range2.test(minver)) {
    return minver;
  }
  minver = new SemVer$2("0.0.0-0");
  if (range2.test(minver)) {
    return minver;
  }
  minver = null;
  for (let i = 0; i < range2.set.length; ++i) {
    const comparators = range2.set[i];
    let setMin = null;
    comparators.forEach((comparator2) => {
      const compver = new SemVer$2(comparator2.semver.version);
      switch (comparator2.operator) {
        case ">":
          if (compver.prerelease.length === 0) {
            compver.patch++;
          } else {
            compver.prerelease.push(0);
          }
          compver.raw = compver.format();
        case "":
        case ">=":
          if (!setMin || gt$2(compver, setMin)) {
            setMin = compver;
          }
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${comparator2.operator}`);
      }
    });
    if (setMin && (!minver || gt$2(minver, setMin))) {
      minver = setMin;
    }
  }
  if (minver && range2.test(minver)) {
    return minver;
  }
  return null;
};
var minVersion_1 = minVersion$1;
const Range$4 = requireRange();
const validRange$1 = (range2, options) => {
  try {
    return new Range$4(range2, options).range || "*";
  } catch (er) {
    return null;
  }
};
var valid$1 = validRange$1;
const SemVer$1 = semver;
const Comparator$2 = requireComparator();
const { ANY: ANY$1 } = Comparator$2;
const Range$3 = requireRange();
const satisfies$3 = satisfies_1;
const gt$1 = gt_1;
const lt$1 = lt_1;
const lte$1 = lte_1;
const gte$1 = gte_1;
const outside$3 = (version, range2, hilo, options) => {
  version = new SemVer$1(version, options);
  range2 = new Range$3(range2, options);
  let gtfn, ltefn, ltfn, comp, ecomp;
  switch (hilo) {
    case ">":
      gtfn = gt$1;
      ltefn = lte$1;
      ltfn = lt$1;
      comp = ">";
      ecomp = ">=";
      break;
    case "<":
      gtfn = lt$1;
      ltefn = gte$1;
      ltfn = gt$1;
      comp = "<";
      ecomp = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (satisfies$3(version, range2, options)) {
    return false;
  }
  for (let i = 0; i < range2.set.length; ++i) {
    const comparators = range2.set[i];
    let high = null;
    let low = null;
    comparators.forEach((comparator2) => {
      if (comparator2.semver === ANY$1) {
        comparator2 = new Comparator$2(">=0.0.0");
      }
      high = high || comparator2;
      low = low || comparator2;
      if (gtfn(comparator2.semver, high.semver, options)) {
        high = comparator2;
      } else if (ltfn(comparator2.semver, low.semver, options)) {
        low = comparator2;
      }
    });
    if (high.operator === comp || high.operator === ecomp) {
      return false;
    }
    if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
      return false;
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false;
    }
  }
  return true;
};
var outside_1 = outside$3;
const outside$2 = outside_1;
const gtr$1 = (version, range2, options) => outside$2(version, range2, ">", options);
var gtr_1 = gtr$1;
const outside$1 = outside_1;
const ltr$1 = (version, range2, options) => outside$1(version, range2, "<", options);
var ltr_1 = ltr$1;
const Range$2 = requireRange();
const intersects$1 = (r1, r2, options) => {
  r1 = new Range$2(r1, options);
  r2 = new Range$2(r2, options);
  return r1.intersects(r2);
};
var intersects_1 = intersects$1;
const satisfies$2 = satisfies_1;
const compare$2 = compare_1;
var simplify = (versions, range2, options) => {
  const set = [];
  let first = null;
  let prev = null;
  const v = versions.sort((a, b) => compare$2(a, b, options));
  for (const version of v) {
    const included = satisfies$2(version, range2, options);
    if (included) {
      prev = version;
      if (!first) {
        first = version;
      }
    } else {
      if (prev) {
        set.push([first, prev]);
      }
      prev = null;
      first = null;
    }
  }
  if (first) {
    set.push([first, null]);
  }
  const ranges = [];
  for (const [min, max] of set) {
    if (min === max) {
      ranges.push(min);
    } else if (!max && min === v[0]) {
      ranges.push("*");
    } else if (!max) {
      ranges.push(`>=${min}`);
    } else if (min === v[0]) {
      ranges.push(`<=${max}`);
    } else {
      ranges.push(`${min} - ${max}`);
    }
  }
  const simplified = ranges.join(" || ");
  const original = typeof range2.raw === "string" ? range2.raw : String(range2);
  return simplified.length < original.length ? simplified : range2;
};
const Range$1 = requireRange();
const Comparator$1 = requireComparator();
const { ANY } = Comparator$1;
const satisfies$1 = satisfies_1;
const compare$1 = compare_1;
const subset$1 = (sub, dom, options = {}) => {
  if (sub === dom) {
    return true;
  }
  sub = new Range$1(sub, options);
  dom = new Range$1(dom, options);
  let sawNonNull = false;
  OUTER:
    for (const simpleSub of sub.set) {
      for (const simpleDom of dom.set) {
        const isSub = simpleSubset(simpleSub, simpleDom, options);
        sawNonNull = sawNonNull || isSub !== null;
        if (isSub) {
          continue OUTER;
        }
      }
      if (sawNonNull) {
        return false;
      }
    }
  return true;
};
const simpleSubset = (sub, dom, options) => {
  if (sub === dom) {
    return true;
  }
  if (sub.length === 1 && sub[0].semver === ANY) {
    if (dom.length === 1 && dom[0].semver === ANY) {
      return true;
    } else if (options.includePrerelease) {
      sub = [new Comparator$1(">=0.0.0-0")];
    } else {
      sub = [new Comparator$1(">=0.0.0")];
    }
  }
  if (dom.length === 1 && dom[0].semver === ANY) {
    if (options.includePrerelease) {
      return true;
    } else {
      dom = [new Comparator$1(">=0.0.0")];
    }
  }
  const eqSet = /* @__PURE__ */ new Set();
  let gt2, lt2;
  for (const c of sub) {
    if (c.operator === ">" || c.operator === ">=") {
      gt2 = higherGT(gt2, c, options);
    } else if (c.operator === "<" || c.operator === "<=") {
      lt2 = lowerLT(lt2, c, options);
    } else {
      eqSet.add(c.semver);
    }
  }
  if (eqSet.size > 1) {
    return null;
  }
  let gtltComp;
  if (gt2 && lt2) {
    gtltComp = compare$1(gt2.semver, lt2.semver, options);
    if (gtltComp > 0) {
      return null;
    } else if (gtltComp === 0 && (gt2.operator !== ">=" || lt2.operator !== "<=")) {
      return null;
    }
  }
  for (const eq2 of eqSet) {
    if (gt2 && !satisfies$1(eq2, String(gt2), options)) {
      return null;
    }
    if (lt2 && !satisfies$1(eq2, String(lt2), options)) {
      return null;
    }
    for (const c of dom) {
      if (!satisfies$1(eq2, String(c), options)) {
        return false;
      }
    }
    return true;
  }
  let higher, lower;
  let hasDomLT, hasDomGT;
  let needDomLTPre = lt2 && !options.includePrerelease && lt2.semver.prerelease.length ? lt2.semver : false;
  let needDomGTPre = gt2 && !options.includePrerelease && gt2.semver.prerelease.length ? gt2.semver : false;
  if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt2.operator === "<" && needDomLTPre.prerelease[0] === 0) {
    needDomLTPre = false;
  }
  for (const c of dom) {
    hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
    hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
    if (gt2) {
      if (needDomGTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
          needDomGTPre = false;
        }
      }
      if (c.operator === ">" || c.operator === ">=") {
        higher = higherGT(gt2, c, options);
        if (higher === c && higher !== gt2) {
          return false;
        }
      } else if (gt2.operator === ">=" && !satisfies$1(gt2.semver, String(c), options)) {
        return false;
      }
    }
    if (lt2) {
      if (needDomLTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
          needDomLTPre = false;
        }
      }
      if (c.operator === "<" || c.operator === "<=") {
        lower = lowerLT(lt2, c, options);
        if (lower === c && lower !== lt2) {
          return false;
        }
      } else if (lt2.operator === "<=" && !satisfies$1(lt2.semver, String(c), options)) {
        return false;
      }
    }
    if (!c.operator && (lt2 || gt2) && gtltComp !== 0) {
      return false;
    }
  }
  if (gt2 && hasDomLT && !lt2 && gtltComp !== 0) {
    return false;
  }
  if (lt2 && hasDomGT && !gt2 && gtltComp !== 0) {
    return false;
  }
  if (needDomGTPre || needDomLTPre) {
    return false;
  }
  return true;
};
const higherGT = (a, b, options) => {
  if (!a) {
    return b;
  }
  const comp = compare$1(a.semver, b.semver, options);
  return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
};
const lowerLT = (a, b, options) => {
  if (!a) {
    return b;
  }
  const comp = compare$1(a.semver, b.semver, options);
  return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
};
var subset_1 = subset$1;
const internalRe = reExports;
const constants = constants$1;
const SemVer2 = semver;
const identifiers = identifiers$1;
const parse = parse_1;
const valid = valid_1;
const clean = clean_1;
const inc = inc_1;
const diff = diff_1;
const major = major_1;
const minor = minor_1;
const patch = patch_1;
const prerelease = prerelease_1;
const compare = compare_1;
const rcompare = rcompare_1;
const compareLoose = compareLoose_1;
const compareBuild = compareBuild_1;
const sort = sort_1;
const rsort = rsort_1;
const gt = gt_1;
const lt = lt_1;
const eq = eq_1;
const neq = neq_1;
const gte = gte_1;
const lte = lte_1;
const cmp = cmp_1;
const coerce = coerce_1;
const Comparator = requireComparator();
const Range = requireRange();
const satisfies = satisfies_1;
const toComparators = toComparators_1;
const maxSatisfying = maxSatisfying_1;
const minSatisfying = minSatisfying_1;
const minVersion = minVersion_1;
const validRange = valid$1;
const outside = outside_1;
const gtr = gtr_1;
const ltr = ltr_1;
const intersects = intersects_1;
const simplifyRange = simplify;
const subset = subset_1;
({
  parse,
  valid,
  clean,
  inc,
  diff,
  major,
  minor,
  patch,
  prerelease,
  compare,
  rcompare,
  compareLoose,
  compareBuild,
  sort,
  rsort,
  gt,
  lt,
  eq,
  neq,
  gte,
  lte,
  cmp,
  coerce,
  Comparator,
  Range,
  satisfies,
  toComparators,
  maxSatisfying,
  minSatisfying,
  minVersion,
  validRange,
  outside,
  gtr,
  ltr,
  intersects,
  simplifyRange,
  subset,
  SemVer: SemVer2,
  re: internalRe.re,
  src: internalRe.src,
  tokens: internalRe.t,
  SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
  compareIdentifiers: identifiers.compareIdentifiers,
  rcompareIdentifiers: identifiers.rcompareIdentifiers
});
const ViewType = {
  GENES: [
    "genes",
    "This view type was renamed to featureList in schema version 1.0.15."
  ],
  CELL_SETS: [
    "cellSets",
    "This view type was renamed to obsSets in schema version 1.0.15."
  ],
  CELL_SET_SIZES: [
    "cellSetSizes",
    "This view type was renamed to obsSetSizes in schema version 1.0.15."
  ],
  CELL_SET_EXPRESSION: [
    "cellSetExpression",
    "This view type was renamed to obsSetFeatureValueDistribution in schema version 1.0.15."
  ],
  EXPRESSION_HISTOGRAM: [
    "expressionHistogram",
    "This view type was renamed to featureValueHistogram in schema version 1.0.15."
  ]
};
const DataType = {
  CELLS: [
    "cells",
    "This data type was removed. Associated file types were re-implemented as joint file types. See obsEmbedding instead."
  ],
  CELL_SETS: [
    "cell-sets",
    "This data type was removed. Associated file types were re-implemented as joint file types. See obsSets instead."
  ],
  EXPRESSION_MATRIX: [
    "expression-matrix",
    "This data type was removed. Associated file types were re-implemented as joint file types. See obsFeatureMatrix instead."
  ],
  MOLECULES: [
    "molecules",
    "This data type was removed. Associated file types were re-implemented as joint file types. See obsLocations instead."
  ],
  RASTER: [
    "raster",
    "This data type was removed. Associated file types were re-implemented as joint file types. See image and obsSegmentations instead."
  ]
};
const FileType = {};
function makeChangeMessage(newTypeName, newVersion) {
  return [
    `This coordination type was changed to ${newTypeName} in view config schema version ${newVersion}`,
    newVersion,
    newTypeName
  ];
}
const CoordinationType = {
  SPATIAL_LAYERS: [
    "spatialLayers",
    "This coordination type was split into multiple coordination types in view config schema version 1.0.1",
    "1.0.1",
    "multiple"
    // Not used for spatialLayers (since it was split into multiple).
  ],
  // Spatial layers
  SPATIAL_RASTER_LAYERS: [
    "spatialRasterLayers",
    ...makeChangeMessage("spatialImageLayer", "1.0.11")
  ],
  SPATIAL_CELLS_LAYER: [
    "spatialCellsLayer",
    ...makeChangeMessage("spatialSegmentationLayer", "1.0.11")
  ],
  SPATIAL_MOLECULES_LAYER: [
    "spatialMoleculesLayer",
    ...makeChangeMessage("spatialPointLayer", "1.0.11")
  ],
  SPATIAL_NEIGHBORHOODS_LAYER: [
    "spatialNeighborhoodsLayer",
    ...makeChangeMessage("spatialNeighborhoodLayer", "1.0.11")
  ],
  // Cell -> Obs
  EMBEDDING_CELL_SET_POLYGONS_VISIBLE: [
    "embeddingCellSetPolygonsVisible",
    ...makeChangeMessage("embeddingObsSetPolygonsVisible", "1.0.11")
  ],
  EMBEDDING_CELL_SET_LABELS_VISIBLE: [
    "embeddingCellSetLabelsVisible",
    ...makeChangeMessage("embeddingObsSetLabelsVisible", "1.0.11")
  ],
  EMBEDDING_CELL_SET_LABEL_SIZE: [
    "embeddingCellSetLabelSize",
    ...makeChangeMessage("embeddingObsSetLabelSize", "1.0.11")
  ],
  EMBEDDING_CELL_RADIUS: [
    "embeddingCellRadius",
    ...makeChangeMessage("embeddingObsRadius", "1.0.11")
  ],
  EMBEDDING_CELL_RADIUS_MODE: [
    "embeddingCellRadiusMode",
    ...makeChangeMessage("embeddingObsRadiusMode", "1.0.11")
  ],
  EMBEDDING_CELL_OPACITY: [
    "embeddingCellOpacity",
    ...makeChangeMessage("embeddingObsOpacity", "1.0.11")
  ],
  EMBEDDING_CELL_OPACITY_MODE: [
    "embeddingCellOpacityMode",
    ...makeChangeMessage("embeddingObsOpacityMode", "1.0.11")
  ],
  CELL_FILTER: [
    "cellFilter",
    ...makeChangeMessage("obsFilter", "1.0.11")
  ],
  CELL_HIGHLIGHT: [
    "cellHighlight",
    ...makeChangeMessage("obsHighlight", "1.0.11")
  ],
  CELL_SET_SELECTION: [
    "cellSetSelection",
    ...makeChangeMessage("obsSetSelection", "1.0.11")
  ],
  CELL_SET_HIGHLIGHT: [
    "cellSetHighlight",
    ...makeChangeMessage("obsSetHighlight", "1.0.11")
  ],
  CELL_SET_COLOR: [
    "cellSetColor",
    ...makeChangeMessage("obsSetColor", "1.0.11")
  ],
  CELL_COLOR_ENCODING: [
    "cellColorEncoding",
    ...makeChangeMessage("obsColorEncoding", "1.0.11")
  ],
  ADDITIONAL_CELL_SETS: [
    "additionalCellSets",
    ...makeChangeMessage("additionalObsSets", "1.0.11")
  ],
  // Gene -> Feature
  GENE_FILTER: [
    "geneFilter",
    ...makeChangeMessage("featureFilter", "1.0.11")
  ],
  GENE_HIGHLIGHT: [
    "geneHighlight",
    ...makeChangeMessage("featureHighlight", "1.0.11")
  ],
  GENE_SELECTION: [
    "geneSelection",
    ...makeChangeMessage("featureSelection", "1.0.11")
  ],
  GENE_EXPRESSION_COLORMAP: [
    "geneExpressionColormap",
    ...makeChangeMessage("featureValueColormap", "1.0.11")
  ],
  GENE_EXPRESSION_TRANSFORM: [
    "geneExpressionTransform",
    ...makeChangeMessage("featureValueTransform", "1.0.11")
  ],
  GENE_EXPRESSION_COLORMAP_RANGE: [
    "geneExpressionColormapRange",
    ...makeChangeMessage("featureValueColormapRange", "1.0.11")
  ]
};
function makeConstantWithDeprecationMessage(currObj, oldObj) {
  const handler = {
    get(obj, prop) {
      const oldKeys = Object.keys(oldObj);
      const propKey = String(prop);
      if (oldKeys.includes(propKey)) {
        log.warn(`Notice about the constant mapping ${propKey}: '${oldObj[propKey][0]}':
${oldObj[propKey][1]}`);
        return oldObj[propKey];
      }
      return obj[prop];
    }
  };
  const objWithMessage = new Proxy(currObj, handler);
  return objWithMessage;
}
makeConstantWithDeprecationMessage(ViewType$1, ViewType);
makeConstantWithDeprecationMessage(DataType$1, DataType);
makeConstantWithDeprecationMessage(FileType$1, FileType);
makeConstantWithDeprecationMessage(CoordinationType$1, CoordinationType);
function configSchemaToVersion(zodSchema) {
  return zodSchema.shape.version._def.value;
}
({
  ...Object.fromEntries(SCHEMA_HANDLERS.map(([zodSchema]) => {
    const version = configSchemaToVersion(zodSchema);
    return [version, zodSchema];
  })),
  // eslint-disable-next-line no-underscore-dangle
  [latestConfigSchema.shape.version._def.value]: latestConfigSchema
});
const image = z.object({
  name: z.string(),
  url: z.string(),
  type: z.string(),
  metadata: z.object({
    dimensions: z.array(z.object({
      field: z.string(),
      type: z.enum(["quantitative", "nominal", "ordinal", "temporal"]),
      values: z.array(z.string()).nullable()
    })).optional(),
    isPyramid: z.boolean().optional(),
    transform: z.union([
      z.object({
        scale: z.number(),
        translate: z.object({
          y: z.number(),
          x: z.number()
        })
      }),
      z.object({
        matrix: z.array(z.number()).length(16)
      })
    ]).optional(),
    isBitmask: z.boolean().optional(),
    omeTiffOffsetsUrl: z.string().optional()
  }).optional(),
  requestInit: requestInit.optional()
});
z.object({
  schemaVersion: z.literal("0.0.2"),
  usePhysicalSizeScaling: z.boolean().optional(),
  renderLayers: z.array(z.string()).optional(),
  images: z.array(image)
});
const annDataObs = z.object({
  path: z.string()
});
const annDataObsm = z.object({
  path: z.string(),
  dims: z.array(z.number()).optional()
});
const annDataConvenienceObsLabelsItem = z.object({
  path: z.string(),
  obsLabelsType: z.string()
});
const annDataConvenienceFeatureLabelsItem = z.object({
  path: z.string(),
  featureLabelsType: z.string()
});
const annDataConvenienceObsEmbeddingItem = z.object({
  path: z.string(),
  dims: z.array(z.number()).optional(),
  embeddingType: z.string()
});
z.object({
  path: z.string().describe("Path to the comparison metadata, such as /uns/comparison_metadata")
});
z.object({
  // TODO: implement a featureStats.anndata.zarr loader
  // which does not depend on comparisonMetadata
  // (instead, would point directly to the root of
  // the dataframe containing a set of diff exp results)
  // path: z.string().describe('Path to the dataframe containing the results.'),
  metadataPath: z.string().describe("Path to the comparison metadata."),
  indexColumn: z.string().optional().describe("Provide a column to use for the feature index, if different than the default dataframe index."),
  pValueColumn: z.string(),
  foldChangeColumn: z.string(),
  pValueTransformation: z.enum(["minuslog10"]).optional(),
  pValueAdjusted: z.boolean().optional(),
  foldChangeTransformation: z.enum(["log2"]).optional()
});
z.object({
  metadataPath: z.string().describe("Path to the comparison metadata."),
  indexColumn: z.string().optional().describe("Provide a column to use for the feature set index, if different than the default dataframe index."),
  termColumn: z.string().optional(),
  pValueColumn: z.string(),
  pValueAdjusted: z.boolean().optional(),
  featureSetLibrary: z.string().optional().describe("Optionally, provide a feature set library name. By default, Reactome_2022."),
  analysisType: z.string().optional().describe("Optionally, provide an analysis_type name. By default, pertpy_hypergeometric.")
});
z.object({
  metadataPath: z.string().describe("Path to the comparison metadata."),
  indexColumn: z.string().optional().describe("Provide a column to use for the obs set index, if different than the default dataframe index."),
  interceptExpectedSampleColumn: z.string().describe("If we had a new sample (with no active covariates) with a total number of cells equal to the mean sampling depth of the dataset, then this distribution over the cell types would be most likely."),
  effectExpectedSampleColumn: z.string().describe("If we had a new sample (with no active covariates) with a total number of cells equal to the mean sampling depth of the dataset, then this distribution over the cell types would be most likely."),
  foldChangeColumn: z.string().describe("The log-fold change is then calculated between this expected sample and the expected sample with no active covariates from the intercept section."),
  foldChangeTransformation: z.enum(["log2"]).optional(),
  isCredibleEffectColumn: z.string().describe("Column which annotates effects as being credible or not (boolean)."),
  analysisType: z.string().optional().describe("Optionally, provide an analysis_type name. By default, sccoda_df.")
});
const annDataObsLabels = annDataObs;
const annDataFeatureLabels = annDataObs;
const annDataSampleEdges = annDataObs;
const annDataObsFeatureMatrix = z.object({
  path: z.string(),
  featureFilterPath: z.string().optional().describe("If the feature index should be filtered, put a boolean column here (analogous to the previous geneFilter option). e.g., var/in_obsm_X_small_matrix"),
  initialFeatureFilterPath: z.string().optional().describe("If only a subset of the matrix should be loaded initially, put a boolean column along the feature axis here (analogous to the previous matrixGeneFilter option). e.g., var/highly_variable")
});
const annDataObsSetsArr = z.array(z.object({
  name: z.string().describe("The display name for the set, like 'Cell Type' or 'Louvain.'"),
  path: z.union([
    z.string().describe("The location in the AnnData store for the set, like 'obs/louvain' or 'obs/celltype.'"),
    z.array(z.string()).describe("An array of locations in the AnnData store for a hierarchy of set names, from coarse to fine levels.")
  ]),
  scorePath: z.string().optional().describe("The location in the AnnData store for the set confidence scores, like 'obs/celltype_prediction_score.'")
}));
z.object({
  obsSets: annDataObsSetsArr
});
z.object({
  sampleSets: annDataObsSetsArr
});
const annDataObsFeatureColumnsArr = z.array(z.object({
  path: z.string()
}));
z.object({
  obsFeatureColumns: annDataObsFeatureColumnsArr
});
const annDataObsSpots = annDataObsm;
const annDataObsPoints = annDataObsm;
const annDataObsLocations = annDataObsm;
const annDataObsEmbedding = annDataObsm;
const annDataObsSegmentations = annDataObs;
const omeCoordinateTransformations = z.array(z.union([
  z.object({
    type: z.literal("identity")
  }),
  z.object({
    type: z.literal("translation"),
    translation: z.array(z.number())
  }),
  z.object({
    type: z.literal("scale"),
    scale: z.array(z.number())
  })
]));
const imageOmeTiffSchema = z.object({
  offsetsUrl: z.string().optional(),
  coordinateTransformations: omeCoordinateTransformations.optional()
});
imageOmeTiffSchema.extend({
  obsTypesFromChannelNames: z.boolean().optional()
});
const imageOmeZarrSchema = z.object({
  coordinateTransformations: omeCoordinateTransformations.optional()
});
imageOmeZarrSchema.extend({
  obsTypesFromChannelNames: z.boolean().optional()
});
const imageSpatialdataSchema = z.object({
  path: z.string(),
  coordinateSystem: z.string().optional().describe('The name of a coordinate transformation output used to transform the image. If not provided, the "global" coordinate system is assumed.')
});
const obsSegmentationsSpatialdataSchema = z.object({
  // TODO: should this be renamed labelsSpatialdataSchema?
  // TODO: support obsTypesFromChannelNames?
  path: z.string(),
  tablePath: z.string().optional().describe("The path to a table which annotates the labels. If available but not specified, the spot identifiers may not be aligned with associated tabular data as expected."),
  coordinateSystem: z.string().optional().describe('The name of a coordinate transformation output used to transform the image. If not provided, the "global" coordinate system is assumed.')
});
z.object({
  path: z.string(),
  coordinateSystem: z.string().optional().describe('The name of a coordinate transformation output used to transform the coordinates. If not provided, the "global" coordinate system is assumed.')
});
const obsSpotsSpatialdataSchema = z.object({
  path: z.string(),
  tablePath: z.string().optional().describe("The path to a table which annotates the spots. If available but not specified, the spot identifiers may not be aligned with associated tabular data as expected."),
  coordinateSystem: z.string().optional().describe('The name of a coordinate transformation output used to transform the coordinates and radii. If not provided, the "global" coordinate system is assumed.')
});
const obsFeatureMatrixSpatialdataSchema = annDataObsFeatureMatrix.extend({
  region: z.string().describe("The name of a region to use to filter instances (i.e., rows) in the table").optional(),
  coordinateSystem: z.string().optional().describe('The name of a coordinate transformation output used to transform the image. If not provided, the "global" coordinate system is assumed.')
});
const obsSetsSpatialdataSchema = z.object({
  region: z.string().describe("The name of a region to use to filter instances (i.e., rows) in the table").optional(),
  tablePath: z.string().optional().describe("The path to a table which contains the index for the set values."),
  obsSets: annDataObsSetsArr
});
z.object({
  targetX: z.number(),
  targetY: z.number(),
  targetZ: z.number(),
  rotationX: z.number(),
  rotationY: z.number(),
  rotationZ: z.number(),
  scaleX: z.number(),
  scaleY: z.number(),
  scaleZ: z.number(),
  sceneRotationX: z.number(),
  sceneRotationY: z.number(),
  sceneRotationZ: z.number(),
  sceneScaleX: z.number(),
  sceneScaleY: z.number(),
  sceneScaleZ: z.number(),
  materialSide: z.enum(["front", "back"])
}).partial().nullable();
z.object({
  obsIndex: z.string(),
  obsEmbedding: z.array(z.string()).length(2)
  // TODO: support 3D?
});
z.object({
  obsIndex: z.string(),
  obsSpots: z.array(z.string()).length(2)
  // TODO: support 3D?
});
z.object({
  obsIndex: z.string(),
  obsPoints: z.array(z.string()).length(3)
});
z.object({
  obsIndex: z.string(),
  obsLocations: z.array(z.string()).length(2)
  // TODO: support 3D?
});
z.object({
  obsIndex: z.string(),
  obsLabels: z.string()
});
z.object({
  featureIndex: z.string(),
  featureLabels: z.string()
});
z.object({
  obsIndex: z.string(),
  obsSets: z.array(z.object({
    name: z.string(),
    column: z.union([
      z.string(),
      z.array(z.string())
    ]),
    scoreColumn: z.string().optional()
  }))
});
z.object({
  sampleIndex: z.string(),
  sampleSets: z.array(z.object({
    name: z.string(),
    column: z.union([
      z.string(),
      z.array(z.string())
    ]),
    scoreColumn: z.string().optional()
  }))
});
const anndataZarrSchema = z.object({
  obsLabels: z.union([
    annDataObsLabels,
    z.array(annDataConvenienceObsLabelsItem)
  ]),
  featureLabels: z.union([
    annDataFeatureLabels,
    z.array(annDataConvenienceFeatureLabelsItem)
  ]),
  obsFeatureMatrix: annDataObsFeatureMatrix,
  obsSets: annDataObsSetsArr,
  obsSpots: annDataObsSpots,
  obsPoints: annDataObsPoints,
  obsLocations: annDataObsLocations,
  obsSegmentations: annDataObsSegmentations,
  obsEmbedding: z.union([
    annDataObsEmbedding,
    z.array(annDataConvenienceObsEmbeddingItem)
  ]),
  sampleEdges: annDataSampleEdges
}).partial();
anndataZarrSchema.extend({
  refSpecUrl: z.string()
});
z.object({
  // TODO: should `image` be a special schema
  // to allow specifying fileUid (like for embeddingType)?
  // TODO: allow multiple images
  image: imageSpatialdataSchema,
  // TODO: should this be a special schema
  // to allow specifying fileUid (like for embeddingType)?
  // TODO: allow multiple labels
  labels: obsSegmentationsSpatialdataSchema,
  obsFeatureMatrix: obsFeatureMatrixSpatialdataSchema,
  obsSpots: obsSpotsSpatialdataSchema,
  // TODO: obsPoints
  // TODO: obsLocations
  obsSets: obsSetsSpatialdataSchema,
  // TODO: obsEmbedding
  // TODO: obsLabels
  // TODO: featureLabels
  coordinateSystem: z.string().optional().describe("The name of a coordinate transformation output used to transform all elements which lack a per-element coordinateSystem property.")
}).partial();
z.object({
  obsLabelsTypes: z.array(z.string()).optional(),
  embeddingTypes: z.array(z.string()).optional()
}).optional();
z.object({
  xy: z.string().optional(),
  poly: z.string().optional(),
  factors: z.array(z.string()).optional(),
  mappings: z.record(z.object({
    key: z.string(),
    dims: z.array(z.number()).length(2)
  })).optional()
});
z.array(z.object({
  groupName: z.string(),
  setName: z.union([
    z.string(),
    z.array(z.string())
  ]),
  scoreName: z.string().optional()
}));
z.object({
  matrix: z.string(),
  geneFilter: z.string().optional(),
  matrixGeneFilter: z.string().optional(),
  geneAlias: z.string().optional()
});
z.array(z.object({
  channels: z.array(z.object({
    color: z.array(z.number()).describe("The color to use when rendering this channel under the null colormap.").optional(),
    selection: z.record(z.any()).describe("Determines the channel selection, e.g. some Z and time slice."),
    slider: z.array(z.number()).describe("Determines the range for color mapping.").optional(),
    visible: z.boolean().describe("Determines whether this channel of the layer will be rendered in the spatial component.").optional()
  }).strict()),
  colormap: z.string().nullable(),
  transparentColor: z.array(z.number().describe("One of R G or B (0 - 255).")).length(3).describe("Determines the color to be set to opacity 0").nullable().optional(),
  index: z.number().describe("The index of the layer among the array of layers available in the image file."),
  opacity: z.number(),
  modelMatrix: z.array(z.number()).length(16).describe("transformation matrix for this layer").optional(),
  domainType: z.enum(["Full", "Min/Max"]).describe("Determines the extent of the channel slider input element in the layer controller.").optional(),
  resolution: z.number().describe("Resolution of 3D volumetric rendering").optional(),
  xSlice: z.array(z.any()).length(2).describe("Slice bounds").nullable().optional(),
  renderingMode: z.string().describe("Rendering mode of 3D volumetric rendering").optional(),
  ySlice: z.array(z.any()).length(2).describe("Slice bounds").nullable().optional(),
  zSlice: z.array(z.any()).length(2).describe("Slice bounds").nullable().optional(),
  type: z.enum(["raster", "bitmask"]).optional(),
  use3d: z.boolean().optional(),
  visible: z.boolean().describe("Determines whether this entire layer will be rendered in the spatial component.").optional()
}).strict().describe("The properties of this object are the rendering settings for the raster layer."));
z.object({
  visible: z.boolean(),
  stroked: z.boolean(),
  radius: z.number(),
  opacity: z.number()
});
z.object({
  visible: z.boolean()
});
z.object({
  visible: z.boolean(),
  radius: z.number(),
  opacity: z.number()
});
const SETS_DATATYPE_OBS = "obs";
const HIERARCHICAL_SCHEMAS = {
  latestVersion: "0.1.3",
  schema: obsSetsSchema
};
var tinycolor = { exports: {} };
(function(module2) {
  (function(Math2) {
    var trimLeft = /^\s+/, trimRight = /\s+$/, tinyCounter = 0, mathRound = Math2.round, mathMin = Math2.min, mathMax = Math2.max, mathRandom = Math2.random;
    function tinycolor2(color, opts2) {
      color = color ? color : "";
      opts2 = opts2 || {};
      if (color instanceof tinycolor2) {
        return color;
      }
      if (!(this instanceof tinycolor2)) {
        return new tinycolor2(color, opts2);
      }
      var rgb = inputToRGB(color);
      this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = mathRound(100 * this._a) / 100, this._format = opts2.format || rgb.format;
      this._gradientType = opts2.gradientType;
      if (this._r < 1) {
        this._r = mathRound(this._r);
      }
      if (this._g < 1) {
        this._g = mathRound(this._g);
      }
      if (this._b < 1) {
        this._b = mathRound(this._b);
      }
      this._ok = rgb.ok;
      this._tc_id = tinyCounter++;
    }
    tinycolor2.prototype = {
      isDark: function() {
        return this.getBrightness() < 128;
      },
      isLight: function() {
        return !this.isDark();
      },
      isValid: function() {
        return this._ok;
      },
      getOriginalInput: function() {
        return this._originalInput;
      },
      getFormat: function() {
        return this._format;
      },
      getAlpha: function() {
        return this._a;
      },
      getBrightness: function() {
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
      },
      getLuminance: function() {
        var rgb = this.toRgb();
        var RsRGB, GsRGB, BsRGB, R, G, B;
        RsRGB = rgb.r / 255;
        GsRGB = rgb.g / 255;
        BsRGB = rgb.b / 255;
        if (RsRGB <= 0.03928) {
          R = RsRGB / 12.92;
        } else {
          R = Math2.pow((RsRGB + 0.055) / 1.055, 2.4);
        }
        if (GsRGB <= 0.03928) {
          G = GsRGB / 12.92;
        } else {
          G = Math2.pow((GsRGB + 0.055) / 1.055, 2.4);
        }
        if (BsRGB <= 0.03928) {
          B = BsRGB / 12.92;
        } else {
          B = Math2.pow((BsRGB + 0.055) / 1.055, 2.4);
        }
        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
      },
      setAlpha: function(value) {
        this._a = boundAlpha(value);
        this._roundA = mathRound(100 * this._a) / 100;
        return this;
      },
      toHsv: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
      },
      toHsvString: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
        return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
      },
      toHsl: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
      },
      toHslString: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
        return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
      },
      toHex: function(allow3Char) {
        return rgbToHex(this._r, this._g, this._b, allow3Char);
      },
      toHexString: function(allow3Char) {
        return "#" + this.toHex(allow3Char);
      },
      toHex8: function(allow4Char) {
        return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
      },
      toHex8String: function(allow4Char) {
        return "#" + this.toHex8(allow4Char);
      },
      toRgb: function() {
        return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
      },
      toRgbString: function() {
        return this._a == 1 ? "rgb(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" : "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
      },
      toPercentageRgb: function() {
        return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
      },
      toPercentageRgbString: function() {
        return this._a == 1 ? "rgb(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" : "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
      },
      toName: function() {
        if (this._a === 0) {
          return "transparent";
        }
        if (this._a < 1) {
          return false;
        }
        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
      },
      toFilter: function(secondColor) {
        var hex8String = "#" + rgbaToArgbHex(this._r, this._g, this._b, this._a);
        var secondHex8String = hex8String;
        var gradientType = this._gradientType ? "GradientType = 1, " : "";
        if (secondColor) {
          var s = tinycolor2(secondColor);
          secondHex8String = "#" + rgbaToArgbHex(s._r, s._g, s._b, s._a);
        }
        return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
      },
      toString: function(format) {
        var formatSet = !!format;
        format = format || this._format;
        var formattedString = false;
        var hasAlpha = this._a < 1 && this._a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");
        if (needsAlphaFormat) {
          if (format === "name" && this._a === 0) {
            return this.toName();
          }
          return this.toRgbString();
        }
        if (format === "rgb") {
          formattedString = this.toRgbString();
        }
        if (format === "prgb") {
          formattedString = this.toPercentageRgbString();
        }
        if (format === "hex" || format === "hex6") {
          formattedString = this.toHexString();
        }
        if (format === "hex3") {
          formattedString = this.toHexString(true);
        }
        if (format === "hex4") {
          formattedString = this.toHex8String(true);
        }
        if (format === "hex8") {
          formattedString = this.toHex8String();
        }
        if (format === "name") {
          formattedString = this.toName();
        }
        if (format === "hsl") {
          formattedString = this.toHslString();
        }
        if (format === "hsv") {
          formattedString = this.toHsvString();
        }
        return formattedString || this.toHexString();
      },
      clone: function() {
        return tinycolor2(this.toString());
      },
      _applyModification: function(fn, args) {
        var color = fn.apply(null, [this].concat([].slice.call(args)));
        this._r = color._r;
        this._g = color._g;
        this._b = color._b;
        this.setAlpha(color._a);
        return this;
      },
      lighten: function() {
        return this._applyModification(lighten, arguments);
      },
      brighten: function() {
        return this._applyModification(brighten, arguments);
      },
      darken: function() {
        return this._applyModification(darken, arguments);
      },
      desaturate: function() {
        return this._applyModification(desaturate, arguments);
      },
      saturate: function() {
        return this._applyModification(saturate, arguments);
      },
      greyscale: function() {
        return this._applyModification(greyscale, arguments);
      },
      spin: function() {
        return this._applyModification(spin, arguments);
      },
      _applyCombination: function(fn, args) {
        return fn.apply(null, [this].concat([].slice.call(args)));
      },
      analogous: function() {
        return this._applyCombination(analogous, arguments);
      },
      complement: function() {
        return this._applyCombination(complement, arguments);
      },
      monochromatic: function() {
        return this._applyCombination(monochromatic, arguments);
      },
      splitcomplement: function() {
        return this._applyCombination(splitcomplement, arguments);
      },
      triad: function() {
        return this._applyCombination(triad, arguments);
      },
      tetrad: function() {
        return this._applyCombination(tetrad, arguments);
      }
    };
    tinycolor2.fromRatio = function(color, opts2) {
      if (typeof color == "object") {
        var newColor = {};
        for (var i in color) {
          if (color.hasOwnProperty(i)) {
            if (i === "a") {
              newColor[i] = color[i];
            } else {
              newColor[i] = convertToPercentage(color[i]);
            }
          }
        }
        color = newColor;
      }
      return tinycolor2(color, opts2);
    };
    function inputToRGB(color) {
      var rgb = { r: 0, g: 0, b: 0 };
      var a = 1;
      var s = null;
      var v = null;
      var l = null;
      var ok = false;
      var format = false;
      if (typeof color == "string") {
        color = stringInputToObject(color);
      }
      if (typeof color == "object") {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
          rgb = rgbToRgb(color.r, color.g, color.b);
          ok = true;
          format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
        } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
          s = convertToPercentage(color.s);
          v = convertToPercentage(color.v);
          rgb = hsvToRgb(color.h, s, v);
          ok = true;
          format = "hsv";
        } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
          s = convertToPercentage(color.s);
          l = convertToPercentage(color.l);
          rgb = hslToRgb(color.h, s, l);
          ok = true;
          format = "hsl";
        }
        if (color.hasOwnProperty("a")) {
          a = color.a;
        }
      }
      a = boundAlpha(a);
      return {
        ok,
        format: color.format || format,
        r: mathMin(255, mathMax(rgb.r, 0)),
        g: mathMin(255, mathMax(rgb.g, 0)),
        b: mathMin(255, mathMax(rgb.b, 0)),
        a
      };
    }
    function rgbToRgb(r, g, b) {
      return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255
      };
    }
    function rgbToHsl(r, g, b) {
      r = bound01(r, 255);
      g = bound01(g, 255);
      b = bound01(b, 255);
      var max = mathMax(r, g, b), min = mathMin(r, g, b);
      var h, s, l = (max + min) / 2;
      if (max == min) {
        h = s = 0;
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }
      return { h, s, l };
    }
    function hslToRgb(h, s, l) {
      var r, g, b;
      h = bound01(h, 360);
      s = bound01(s, 100);
      l = bound01(l, 100);
      function hue2rgb(p2, q2, t2) {
        if (t2 < 0)
          t2 += 1;
        if (t2 > 1)
          t2 -= 1;
        if (t2 < 1 / 6)
          return p2 + (q2 - p2) * 6 * t2;
        if (t2 < 1 / 2)
          return q2;
        if (t2 < 2 / 3)
          return p2 + (q2 - p2) * (2 / 3 - t2) * 6;
        return p2;
      }
      if (s === 0) {
        r = g = b = l;
      } else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      return { r: r * 255, g: g * 255, b: b * 255 };
    }
    function rgbToHsv(r, g, b) {
      r = bound01(r, 255);
      g = bound01(g, 255);
      b = bound01(b, 255);
      var max = mathMax(r, g, b), min = mathMin(r, g, b);
      var h, s, v = max;
      var d = max - min;
      s = max === 0 ? 0 : d / max;
      if (max == min) {
        h = 0;
      } else {
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }
      return { h, s, v };
    }
    function hsvToRgb(h, s, v) {
      h = bound01(h, 360) * 6;
      s = bound01(s, 100);
      v = bound01(v, 100);
      var i = Math2.floor(h), f = h - i, p = v * (1 - s), q = v * (1 - f * s), t2 = v * (1 - (1 - f) * s), mod = i % 6, r = [v, q, p, p, t2, v][mod], g = [t2, v, v, q, p, p][mod], b = [p, p, t2, v, v, q][mod];
      return { r: r * 255, g: g * 255, b: b * 255 };
    }
    function rgbToHex(r, g, b, allow3Char) {
      var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
      ];
      if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
      }
      return hex.join("");
    }
    function rgbaToHex(r, g, b, a, allow4Char) {
      var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16)),
        pad2(convertDecimalToHex(a))
      ];
      if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
      }
      return hex.join("");
    }
    function rgbaToArgbHex(r, g, b, a) {
      var hex = [
        pad2(convertDecimalToHex(a)),
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
      ];
      return hex.join("");
    }
    tinycolor2.equals = function(color1, color2) {
      if (!color1 || !color2) {
        return false;
      }
      return tinycolor2(color1).toRgbString() == tinycolor2(color2).toRgbString();
    };
    tinycolor2.random = function() {
      return tinycolor2.fromRatio({
        r: mathRandom(),
        g: mathRandom(),
        b: mathRandom()
      });
    };
    function desaturate(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = tinycolor2(color).toHsl();
      hsl.s -= amount / 100;
      hsl.s = clamp01(hsl.s);
      return tinycolor2(hsl);
    }
    function saturate(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = tinycolor2(color).toHsl();
      hsl.s += amount / 100;
      hsl.s = clamp01(hsl.s);
      return tinycolor2(hsl);
    }
    function greyscale(color) {
      return tinycolor2(color).desaturate(100);
    }
    function lighten(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = tinycolor2(color).toHsl();
      hsl.l += amount / 100;
      hsl.l = clamp01(hsl.l);
      return tinycolor2(hsl);
    }
    function brighten(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var rgb = tinycolor2(color).toRgb();
      rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
      rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
      rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
      return tinycolor2(rgb);
    }
    function darken(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = tinycolor2(color).toHsl();
      hsl.l -= amount / 100;
      hsl.l = clamp01(hsl.l);
      return tinycolor2(hsl);
    }
    function spin(color, amount) {
      var hsl = tinycolor2(color).toHsl();
      var hue = (hsl.h + amount) % 360;
      hsl.h = hue < 0 ? 360 + hue : hue;
      return tinycolor2(hsl);
    }
    function complement(color) {
      var hsl = tinycolor2(color).toHsl();
      hsl.h = (hsl.h + 180) % 360;
      return tinycolor2(hsl);
    }
    function triad(color) {
      var hsl = tinycolor2(color).toHsl();
      var h = hsl.h;
      return [
        tinycolor2(color),
        tinycolor2({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
        tinycolor2({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
      ];
    }
    function tetrad(color) {
      var hsl = tinycolor2(color).toHsl();
      var h = hsl.h;
      return [
        tinycolor2(color),
        tinycolor2({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
        tinycolor2({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
        tinycolor2({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
      ];
    }
    function splitcomplement(color) {
      var hsl = tinycolor2(color).toHsl();
      var h = hsl.h;
      return [
        tinycolor2(color),
        tinycolor2({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }),
        tinycolor2({ h: (h + 216) % 360, s: hsl.s, l: hsl.l })
      ];
    }
    function analogous(color, results, slices) {
      results = results || 6;
      slices = slices || 30;
      var hsl = tinycolor2(color).toHsl();
      var part = 360 / slices;
      var ret = [tinycolor2(color)];
      for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(tinycolor2(hsl));
      }
      return ret;
    }
    function monochromatic(color, results) {
      results = results || 6;
      var hsv = tinycolor2(color).toHsv();
      var h = hsv.h, s = hsv.s, v = hsv.v;
      var ret = [];
      var modification = 1 / results;
      while (results--) {
        ret.push(tinycolor2({ h, s, v }));
        v = (v + modification) % 1;
      }
      return ret;
    }
    tinycolor2.mix = function(color1, color2, amount) {
      amount = amount === 0 ? 0 : amount || 50;
      var rgb1 = tinycolor2(color1).toRgb();
      var rgb2 = tinycolor2(color2).toRgb();
      var p = amount / 100;
      var rgba = {
        r: (rgb2.r - rgb1.r) * p + rgb1.r,
        g: (rgb2.g - rgb1.g) * p + rgb1.g,
        b: (rgb2.b - rgb1.b) * p + rgb1.b,
        a: (rgb2.a - rgb1.a) * p + rgb1.a
      };
      return tinycolor2(rgba);
    };
    tinycolor2.readability = function(color1, color2) {
      var c1 = tinycolor2(color1);
      var c2 = tinycolor2(color2);
      return (Math2.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math2.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
    };
    tinycolor2.isReadable = function(color1, color2, wcag2) {
      var readability = tinycolor2.readability(color1, color2);
      var wcag2Parms, out;
      out = false;
      wcag2Parms = validateWCAG2Parms(wcag2);
      switch (wcag2Parms.level + wcag2Parms.size) {
        case "AAsmall":
        case "AAAlarge":
          out = readability >= 4.5;
          break;
        case "AAlarge":
          out = readability >= 3;
          break;
        case "AAAsmall":
          out = readability >= 7;
          break;
      }
      return out;
    };
    tinycolor2.mostReadable = function(baseColor, colorList, args) {
      var bestColor = null;
      var bestScore = 0;
      var readability;
      var includeFallbackColors, level, size;
      args = args || {};
      includeFallbackColors = args.includeFallbackColors;
      level = args.level;
      size = args.size;
      for (var i = 0; i < colorList.length; i++) {
        readability = tinycolor2.readability(baseColor, colorList[i]);
        if (readability > bestScore) {
          bestScore = readability;
          bestColor = tinycolor2(colorList[i]);
        }
      }
      if (tinycolor2.isReadable(baseColor, bestColor, { "level": level, "size": size }) || !includeFallbackColors) {
        return bestColor;
      } else {
        args.includeFallbackColors = false;
        return tinycolor2.mostReadable(baseColor, ["#fff", "#000"], args);
      }
    };
    var names = tinycolor2.names = {
      aliceblue: "f0f8ff",
      antiquewhite: "faebd7",
      aqua: "0ff",
      aquamarine: "7fffd4",
      azure: "f0ffff",
      beige: "f5f5dc",
      bisque: "ffe4c4",
      black: "000",
      blanchedalmond: "ffebcd",
      blue: "00f",
      blueviolet: "8a2be2",
      brown: "a52a2a",
      burlywood: "deb887",
      burntsienna: "ea7e5d",
      cadetblue: "5f9ea0",
      chartreuse: "7fff00",
      chocolate: "d2691e",
      coral: "ff7f50",
      cornflowerblue: "6495ed",
      cornsilk: "fff8dc",
      crimson: "dc143c",
      cyan: "0ff",
      darkblue: "00008b",
      darkcyan: "008b8b",
      darkgoldenrod: "b8860b",
      darkgray: "a9a9a9",
      darkgreen: "006400",
      darkgrey: "a9a9a9",
      darkkhaki: "bdb76b",
      darkmagenta: "8b008b",
      darkolivegreen: "556b2f",
      darkorange: "ff8c00",
      darkorchid: "9932cc",
      darkred: "8b0000",
      darksalmon: "e9967a",
      darkseagreen: "8fbc8f",
      darkslateblue: "483d8b",
      darkslategray: "2f4f4f",
      darkslategrey: "2f4f4f",
      darkturquoise: "00ced1",
      darkviolet: "9400d3",
      deeppink: "ff1493",
      deepskyblue: "00bfff",
      dimgray: "696969",
      dimgrey: "696969",
      dodgerblue: "1e90ff",
      firebrick: "b22222",
      floralwhite: "fffaf0",
      forestgreen: "228b22",
      fuchsia: "f0f",
      gainsboro: "dcdcdc",
      ghostwhite: "f8f8ff",
      gold: "ffd700",
      goldenrod: "daa520",
      gray: "808080",
      green: "008000",
      greenyellow: "adff2f",
      grey: "808080",
      honeydew: "f0fff0",
      hotpink: "ff69b4",
      indianred: "cd5c5c",
      indigo: "4b0082",
      ivory: "fffff0",
      khaki: "f0e68c",
      lavender: "e6e6fa",
      lavenderblush: "fff0f5",
      lawngreen: "7cfc00",
      lemonchiffon: "fffacd",
      lightblue: "add8e6",
      lightcoral: "f08080",
      lightcyan: "e0ffff",
      lightgoldenrodyellow: "fafad2",
      lightgray: "d3d3d3",
      lightgreen: "90ee90",
      lightgrey: "d3d3d3",
      lightpink: "ffb6c1",
      lightsalmon: "ffa07a",
      lightseagreen: "20b2aa",
      lightskyblue: "87cefa",
      lightslategray: "789",
      lightslategrey: "789",
      lightsteelblue: "b0c4de",
      lightyellow: "ffffe0",
      lime: "0f0",
      limegreen: "32cd32",
      linen: "faf0e6",
      magenta: "f0f",
      maroon: "800000",
      mediumaquamarine: "66cdaa",
      mediumblue: "0000cd",
      mediumorchid: "ba55d3",
      mediumpurple: "9370db",
      mediumseagreen: "3cb371",
      mediumslateblue: "7b68ee",
      mediumspringgreen: "00fa9a",
      mediumturquoise: "48d1cc",
      mediumvioletred: "c71585",
      midnightblue: "191970",
      mintcream: "f5fffa",
      mistyrose: "ffe4e1",
      moccasin: "ffe4b5",
      navajowhite: "ffdead",
      navy: "000080",
      oldlace: "fdf5e6",
      olive: "808000",
      olivedrab: "6b8e23",
      orange: "ffa500",
      orangered: "ff4500",
      orchid: "da70d6",
      palegoldenrod: "eee8aa",
      palegreen: "98fb98",
      paleturquoise: "afeeee",
      palevioletred: "db7093",
      papayawhip: "ffefd5",
      peachpuff: "ffdab9",
      peru: "cd853f",
      pink: "ffc0cb",
      plum: "dda0dd",
      powderblue: "b0e0e6",
      purple: "800080",
      rebeccapurple: "663399",
      red: "f00",
      rosybrown: "bc8f8f",
      royalblue: "4169e1",
      saddlebrown: "8b4513",
      salmon: "fa8072",
      sandybrown: "f4a460",
      seagreen: "2e8b57",
      seashell: "fff5ee",
      sienna: "a0522d",
      silver: "c0c0c0",
      skyblue: "87ceeb",
      slateblue: "6a5acd",
      slategray: "708090",
      slategrey: "708090",
      snow: "fffafa",
      springgreen: "00ff7f",
      steelblue: "4682b4",
      tan: "d2b48c",
      teal: "008080",
      thistle: "d8bfd8",
      tomato: "ff6347",
      turquoise: "40e0d0",
      violet: "ee82ee",
      wheat: "f5deb3",
      white: "fff",
      whitesmoke: "f5f5f5",
      yellow: "ff0",
      yellowgreen: "9acd32"
    };
    var hexNames = tinycolor2.hexNames = flip(names);
    function flip(o) {
      var flipped = {};
      for (var i in o) {
        if (o.hasOwnProperty(i)) {
          flipped[o[i]] = i;
        }
      }
      return flipped;
    }
    function boundAlpha(a) {
      a = parseFloat(a);
      if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
      }
      return a;
    }
    function bound01(n, max) {
      if (isOnePointZero(n)) {
        n = "100%";
      }
      var processPercent = isPercentage(n);
      n = mathMin(max, mathMax(0, parseFloat(n)));
      if (processPercent) {
        n = parseInt(n * max, 10) / 100;
      }
      if (Math2.abs(n - max) < 1e-6) {
        return 1;
      }
      return n % max / parseFloat(max);
    }
    function clamp01(val) {
      return mathMin(1, mathMax(0, val));
    }
    function parseIntFromHex(val) {
      return parseInt(val, 16);
    }
    function isOnePointZero(n) {
      return typeof n == "string" && n.indexOf(".") != -1 && parseFloat(n) === 1;
    }
    function isPercentage(n) {
      return typeof n === "string" && n.indexOf("%") != -1;
    }
    function pad2(c) {
      return c.length == 1 ? "0" + c : "" + c;
    }
    function convertToPercentage(n) {
      if (n <= 1) {
        n = n * 100 + "%";
      }
      return n;
    }
    function convertDecimalToHex(d) {
      return Math2.round(parseFloat(d) * 255).toString(16);
    }
    function convertHexToDecimal(h) {
      return parseIntFromHex(h) / 255;
    }
    var matchers = function() {
      var CSS_INTEGER = "[-\\+]?\\d+%?";
      var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
      var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
      var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
      var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
      return {
        CSS_UNIT: new RegExp(CSS_UNIT),
        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
        hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
      };
    }();
    function isValidCSSUnit(color) {
      return !!matchers.CSS_UNIT.exec(color);
    }
    function stringInputToObject(color) {
      color = color.replace(trimLeft, "").replace(trimRight, "").toLowerCase();
      var named = false;
      if (names[color]) {
        color = names[color];
        named = true;
      } else if (color == "transparent") {
        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
      }
      var match;
      if (match = matchers.rgb.exec(color)) {
        return { r: match[1], g: match[2], b: match[3] };
      }
      if (match = matchers.rgba.exec(color)) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
      }
      if (match = matchers.hsl.exec(color)) {
        return { h: match[1], s: match[2], l: match[3] };
      }
      if (match = matchers.hsla.exec(color)) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
      }
      if (match = matchers.hsv.exec(color)) {
        return { h: match[1], s: match[2], v: match[3] };
      }
      if (match = matchers.hsva.exec(color)) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
      }
      if (match = matchers.hex8.exec(color)) {
        return {
          r: parseIntFromHex(match[1]),
          g: parseIntFromHex(match[2]),
          b: parseIntFromHex(match[3]),
          a: convertHexToDecimal(match[4]),
          format: named ? "name" : "hex8"
        };
      }
      if (match = matchers.hex6.exec(color)) {
        return {
          r: parseIntFromHex(match[1]),
          g: parseIntFromHex(match[2]),
          b: parseIntFromHex(match[3]),
          format: named ? "name" : "hex"
        };
      }
      if (match = matchers.hex4.exec(color)) {
        return {
          r: parseIntFromHex(match[1] + "" + match[1]),
          g: parseIntFromHex(match[2] + "" + match[2]),
          b: parseIntFromHex(match[3] + "" + match[3]),
          a: convertHexToDecimal(match[4] + "" + match[4]),
          format: named ? "name" : "hex8"
        };
      }
      if (match = matchers.hex3.exec(color)) {
        return {
          r: parseIntFromHex(match[1] + "" + match[1]),
          g: parseIntFromHex(match[2] + "" + match[2]),
          b: parseIntFromHex(match[3] + "" + match[3]),
          format: named ? "name" : "hex"
        };
      }
      return false;
    }
    function validateWCAG2Parms(parms) {
      var level, size;
      parms = parms || { "level": "AA", "size": "small" };
      level = (parms.level || "AA").toUpperCase();
      size = (parms.size || "small").toLowerCase();
      if (level !== "AA" && level !== "AAA") {
        level = "AA";
      }
      if (size !== "small" && size !== "large") {
        size = "small";
      }
      return { "level": level, "size": size };
    }
    if (module2.exports) {
      module2.exports = tinycolor2;
    } else {
      window.tinycolor = tinycolor2;
    }
  })(Math);
})(tinycolor);
function nodeToSet(currNode) {
  if (!currNode) {
    return [];
  }
  if (!currNode.children) {
    return currNode.set || [];
  }
  return currNode.children.flatMap((c) => nodeToSet(c));
}
function nodeToHeight(currNode, level = 0) {
  if (!currNode.children) {
    return level;
  }
  const newLevel = level + 1;
  const childrenHeights = currNode.children.map((c) => nodeToHeight(c, newLevel));
  return Math.max(...childrenHeights, newLevel);
}
function nodeFindNodeByNamePath(node, path, currLevelIndex) {
  const currNodeName = path[currLevelIndex];
  if (node.name === currNodeName) {
    if (currLevelIndex === path.length - 1) {
      return node;
    }
    if (node.children) {
      const foundNodes = node.children.map((child) => nodeFindNodeByNamePath(child, path, currLevelIndex + 1)).filter(Boolean);
      if (foundNodes.length === 1) {
        return foundNodes[0];
      }
    }
  }
  return null;
}
function treeFindNodeByNamePath(currTree, targetNamePath) {
  const foundNodes = currTree.tree.map((levelZeroNode) => nodeFindNodeByNamePath(levelZeroNode, targetNamePath, 0)).filter(Boolean);
  if (foundNodes.length === 1) {
    return foundNodes[0];
  }
  return null;
}
function nodeAppendChild(currNode, newChild) {
  return {
    ...currNode,
    children: [...currNode.children, newChild]
  };
}
function nodeToLevelDescendantNamePaths(node, level, prevPath, stopEarly = false) {
  if (!node.children) {
    if (!stopEarly) {
      return null;
    }
    return [[...prevPath, node.name]];
  }
  if (level === 0) {
    return [[...prevPath, node.name]];
  }
  return node.children.flatMap((c) => nodeToLevelDescendantNamePaths(c, level - 1, [...prevPath, node.name], stopEarly)).filter(Boolean);
}
function treeInitialize(datatype) {
  return {
    version: HIERARCHICAL_SCHEMAS.latestVersion,
    datatype,
    tree: []
  };
}
function initializeCellSetColor(cellSets, cellSetColor) {
  const nextCellSetColor = [...cellSetColor || []];
  const nodeCountPerTreePerLevel = cellSets.tree.map((tree) => Array.from({
    length: nodeToHeight(tree) + 1
    // Need to add one because its an array.
  }).fill(0));
  function processNode(node, prevPath, hierarchyLevel, treeIndex) {
    const index = nodeCountPerTreePerLevel[treeIndex][hierarchyLevel];
    const nodePath = [...prevPath, node.name];
    const nodeColor = nextCellSetColor.find((d) => isEqual(d.path, nodePath));
    if (!nodeColor) {
      const nodeColorArray = node.color ? node.color : PALETTE[index % PALETTE.length];
      nextCellSetColor.push({
        path: nodePath,
        color: nodeColorArray
      });
    }
    nodeCountPerTreePerLevel[treeIndex][hierarchyLevel] += 1;
    if (node.children) {
      node.children.forEach((c) => processNode(c, nodePath, hierarchyLevel + 1, treeIndex));
    }
  }
  cellSets.tree.forEach((lzn, treeIndex) => processNode(lzn, [], 0, treeIndex));
  return nextCellSetColor;
}
function treeToMembershipMap(currTree) {
  const result = /* @__PURE__ */ new Map();
  if (currTree) {
    currTree.tree.forEach((lzn) => {
      const height = nodeToHeight(lzn);
      range$2(height).forEach((i) => {
        const levelIndex = i + 1;
        const levelNodePaths = nodeToLevelDescendantNamePaths(lzn, levelIndex, [], true);
        levelNodePaths.forEach((setNamePath) => {
          const node = treeFindNodeByNamePath(currTree, setNamePath);
          if (node && !node.children) {
            const nodeSet = nodeToSet(node);
            nodeSet.forEach(([obsId]) => {
              if (result.has(obsId)) {
                result.get(obsId).push(setNamePath);
              } else {
                result.set(obsId, [setNamePath]);
              }
            });
          }
        });
      });
    });
  }
  return result;
}
var json2csv_umd = { exports: {} };
(function(module2, exports2) {
  (function(global2, factory) {
    factory(exports2);
  })(commonjsGlobal, function(exports3) {
    var domain;
    function EventHandlers() {
    }
    EventHandlers.prototype = /* @__PURE__ */ Object.create(null);
    function EventEmitter() {
      EventEmitter.init.call(this);
    }
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.usingDomains = false;
    EventEmitter.prototype.domain = void 0;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._maxListeners = void 0;
    EventEmitter.defaultMaxListeners = 10;
    EventEmitter.init = function() {
      this.domain = null;
      if (EventEmitter.usingDomains) {
        if (domain.active)
          ;
      }
      if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
        this._events = new EventHandlers();
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || isNaN(n))
        throw new TypeError('"n" argument must be a positive number');
      this._maxListeners = n;
      return this;
    };
    function $getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
      return $getMaxListeners(this);
    };
    function emitNone(handler, isFn, self2) {
      if (isFn)
        handler.call(self2);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].call(self2);
      }
    }
    function emitOne(handler, isFn, self2, arg1) {
      if (isFn)
        handler.call(self2, arg1);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].call(self2, arg1);
      }
    }
    function emitTwo(handler, isFn, self2, arg1, arg2) {
      if (isFn)
        handler.call(self2, arg1, arg2);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].call(self2, arg1, arg2);
      }
    }
    function emitThree(handler, isFn, self2, arg1, arg2, arg3) {
      if (isFn)
        handler.call(self2, arg1, arg2, arg3);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].call(self2, arg1, arg2, arg3);
      }
    }
    function emitMany(handler, isFn, self2, args) {
      if (isFn)
        handler.apply(self2, args);
      else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          listeners[i].apply(self2, args);
      }
    }
    EventEmitter.prototype.emit = function emit(type2) {
      var er, handler, len, args, i, events, domain2;
      var doError = type2 === "error";
      events = this._events;
      if (events)
        doError = doError && events.error == null;
      else if (!doError)
        return false;
      domain2 = this.domain;
      if (doError) {
        er = arguments[1];
        if (domain2) {
          if (!er)
            er = new Error('Uncaught, unspecified "error" event');
          er.domainEmitter = this;
          er.domain = domain2;
          er.domainThrown = false;
          domain2.emit("error", er);
        } else if (er instanceof Error) {
          throw er;
        } else {
          var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
          err.context = er;
          throw err;
        }
        return false;
      }
      handler = events[type2];
      if (!handler)
        return false;
      var isFn = typeof handler === "function";
      len = arguments.length;
      switch (len) {
        case 1:
          emitNone(handler, isFn, this);
          break;
        case 2:
          emitOne(handler, isFn, this, arguments[1]);
          break;
        case 3:
          emitTwo(handler, isFn, this, arguments[1], arguments[2]);
          break;
        case 4:
          emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
          break;
        default:
          args = new Array(len - 1);
          for (i = 1; i < len; i++)
            args[i - 1] = arguments[i];
          emitMany(handler, isFn, this, args);
      }
      return true;
    };
    function _addListener(target, type2, listener, prepend) {
      var m;
      var events;
      var existing;
      if (typeof listener !== "function")
        throw new TypeError('"listener" argument must be a function');
      events = target._events;
      if (!events) {
        events = target._events = new EventHandlers();
        target._eventsCount = 0;
      } else {
        if (events.newListener) {
          target.emit(
            "newListener",
            type2,
            listener.listener ? listener.listener : listener
          );
          events = target._events;
        }
        existing = events[type2];
      }
      if (!existing) {
        existing = events[type2] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type2] = prepend ? [listener, existing] : [existing, listener];
        } else {
          if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
        }
        if (!existing.warned) {
          m = $getMaxListeners(target);
          if (m && m > 0 && existing.length > m) {
            existing.warned = true;
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + type2 + " listeners added. Use emitter.setMaxListeners() to increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type2;
            w.count = existing.length;
            emitWarning(w);
          }
        }
      }
      return target;
    }
    function emitWarning(e) {
      typeof console.warn === "function" ? console.warn(e) : console.log(e);
    }
    EventEmitter.prototype.addListener = function addListener(type2, listener) {
      return _addListener(this, type2, listener, false);
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.prependListener = function prependListener2(type2, listener) {
      return _addListener(this, type2, listener, true);
    };
    function _onceWrap(target, type2, listener) {
      var fired = false;
      function g() {
        target.removeListener(type2, g);
        if (!fired) {
          fired = true;
          listener.apply(target, arguments);
        }
      }
      g.listener = listener;
      return g;
    }
    EventEmitter.prototype.once = function once(type2, listener) {
      if (typeof listener !== "function")
        throw new TypeError('"listener" argument must be a function');
      this.on(type2, _onceWrap(this, type2, listener));
      return this;
    };
    EventEmitter.prototype.prependOnceListener = function prependOnceListener(type2, listener) {
      if (typeof listener !== "function")
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type2, _onceWrap(this, type2, listener));
      return this;
    };
    EventEmitter.prototype.removeListener = function removeListener(type2, listener) {
      var list, events, position, i, originalListener;
      if (typeof listener !== "function")
        throw new TypeError('"listener" argument must be a function');
      events = this._events;
      if (!events)
        return this;
      list = events[type2];
      if (!list)
        return this;
      if (list === listener || list.listener && list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = new EventHandlers();
        else {
          delete events[type2];
          if (events.removeListener)
            this.emit("removeListener", type2, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i = list.length; i-- > 0; ) {
          if (list[i] === listener || list[i].listener && list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0)
          return this;
        if (list.length === 1) {
          list[0] = void 0;
          if (--this._eventsCount === 0) {
            this._events = new EventHandlers();
            return this;
          } else {
            delete events[type2];
          }
        } else {
          spliceOne(list, position);
        }
        if (events.removeListener)
          this.emit("removeListener", type2, originalListener || listener);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(type2) {
      var listeners, events;
      events = this._events;
      if (!events)
        return this;
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = new EventHandlers();
          this._eventsCount = 0;
        } else if (events[type2]) {
          if (--this._eventsCount === 0)
            this._events = new EventHandlers();
          else
            delete events[type2];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys3 = Object.keys(events);
        for (var i = 0, key; i < keys3.length; ++i) {
          key = keys3[i];
          if (key === "removeListener")
            continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = new EventHandlers();
        this._eventsCount = 0;
        return this;
      }
      listeners = events[type2];
      if (typeof listeners === "function") {
        this.removeListener(type2, listeners);
      } else if (listeners) {
        do {
          this.removeListener(type2, listeners[listeners.length - 1]);
        } while (listeners[0]);
      }
      return this;
    };
    EventEmitter.prototype.listeners = function listeners(type2) {
      var evlistener;
      var ret;
      var events = this._events;
      if (!events)
        ret = [];
      else {
        evlistener = events[type2];
        if (!evlistener)
          ret = [];
        else if (typeof evlistener === "function")
          ret = [evlistener.listener || evlistener];
        else
          ret = unwrapListeners(evlistener);
      }
      return ret;
    };
    EventEmitter.listenerCount = function(emitter, type2) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type2);
      } else {
        return listenerCount.call(emitter, type2);
      }
    };
    EventEmitter.prototype.listenerCount = listenerCount;
    function listenerCount(type2) {
      var events = this._events;
      if (events) {
        var evlistener = events[type2];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
    };
    function spliceOne(list, index) {
      for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
        list[i] = list[k];
      list.pop();
    }
    function arrayClone(arr, i) {
      var copy = new Array(i);
      while (i--)
        copy[i] = arr[i];
      return copy;
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    var global$1 = typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var inited = false;
    function init() {
      inited = true;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (var i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
    }
    function toByteArray(b64) {
      if (!inited) {
        init();
      }
      var i, j, l, tmp, placeHolders, arr;
      var len = b64.length;
      if (len % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      placeHolders = b64[len - 2] === "=" ? 2 : b64[len - 1] === "=" ? 1 : 0;
      arr = new Arr(len * 3 / 4 - placeHolders);
      l = placeHolders > 0 ? len - 4 : len;
      var L = 0;
      for (i = 0, j = 0; i < l; i += 4, j += 3) {
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[L++] = tmp >> 16 & 255;
        arr[L++] = tmp >> 8 & 255;
        arr[L++] = tmp & 255;
      }
      if (placeHolders === 2) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[L++] = tmp & 255;
      } else if (placeHolders === 1) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[L++] = tmp >> 8 & 255;
        arr[L++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i = start; i < end; i += 3) {
        tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      if (!inited) {
        init();
      }
      var tmp;
      var len = uint8.length;
      var extraBytes = len % 3;
      var output = "";
      var parts = [];
      var maxChunkLength = 16383;
      for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
        parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len - 1];
        output += lookup[tmp >> 2];
        output += lookup[tmp << 4 & 63];
        output += "==";
      } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        output += lookup[tmp >> 10];
        output += lookup[tmp >> 4 & 63];
        output += lookup[tmp << 2 & 63];
        output += "=";
      }
      parts.push(output);
      return parts.join("");
    }
    function read(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    }
    function write(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset + i - d] |= s * 128;
    }
    var toString = {}.toString;
    var isArray2 = Array.isArray || function(arr) {
      return toString.call(arr) == "[object Array]";
    };
    var INSPECT_MAX_BYTES = 50;
    Buffer3.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== void 0 ? global$1.TYPED_ARRAY_SUPPORT : true;
    function kMaxLength() {
      return Buffer3.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
    }
    function createBuffer(that, length) {
      if (kMaxLength() < length) {
        throw new RangeError("Invalid typed array length");
      }
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        that = new Uint8Array(length);
        that.__proto__ = Buffer3.prototype;
      } else {
        if (that === null) {
          that = new Buffer3(length);
        }
        that.length = length;
      }
      return that;
    }
    function Buffer3(arg, encodingOrOffset, length) {
      if (!Buffer3.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer3)) {
        return new Buffer3(arg, encodingOrOffset, length);
      }
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new Error(
            "If encoding is specified then the first argument must be a string"
          );
        }
        return allocUnsafe2(this, arg);
      }
      return from(this, arg, encodingOrOffset, length);
    }
    Buffer3.poolSize = 8192;
    Buffer3._augment = function(arr) {
      arr.__proto__ = Buffer3.prototype;
      return arr;
    };
    function from(that, value, encodingOrOffset, length) {
      if (typeof value === "number") {
        throw new TypeError('"value" argument must not be a number');
      }
      if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
        return fromArrayBuffer(that, value, encodingOrOffset, length);
      }
      if (typeof value === "string") {
        return fromString(that, value, encodingOrOffset);
      }
      return fromObject(that, value);
    }
    Buffer3.from = function(value, encodingOrOffset, length) {
      return from(null, value, encodingOrOffset, length);
    };
    if (Buffer3.TYPED_ARRAY_SUPPORT) {
      Buffer3.prototype.__proto__ = Uint8Array.prototype;
      Buffer3.__proto__ = Uint8Array;
    }
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be a number');
      } else if (size < 0) {
        throw new RangeError('"size" argument must not be negative');
      }
    }
    function alloc(that, size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(that, size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
      }
      return createBuffer(that, size);
    }
    Buffer3.alloc = function(size, fill, encoding) {
      return alloc(null, size, fill, encoding);
    };
    function allocUnsafe2(that, size) {
      assertSize(size);
      that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
      if (!Buffer3.TYPED_ARRAY_SUPPORT) {
        for (var i = 0; i < size; ++i) {
          that[i] = 0;
        }
      }
      return that;
    }
    Buffer3.allocUnsafe = function(size) {
      return allocUnsafe2(null, size);
    };
    Buffer3.allocUnsafeSlow = function(size) {
      return allocUnsafe2(null, size);
    };
    function fromString(that, string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer3.isEncoding(encoding)) {
        throw new TypeError('"encoding" must be a valid string encoding');
      }
      var length = byteLength(string, encoding) | 0;
      that = createBuffer(that, length);
      var actual = that.write(string, encoding);
      if (actual !== length) {
        that = that.slice(0, actual);
      }
      return that;
    }
    function fromArrayLike(that, array) {
      var length = array.length < 0 ? 0 : checked(array.length) | 0;
      that = createBuffer(that, length);
      for (var i = 0; i < length; i += 1) {
        that[i] = array[i] & 255;
      }
      return that;
    }
    function fromArrayBuffer(that, array, byteOffset, length) {
      array.byteLength;
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError("'offset' is out of bounds");
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError("'length' is out of bounds");
      }
      if (byteOffset === void 0 && length === void 0) {
        array = new Uint8Array(array);
      } else if (length === void 0) {
        array = new Uint8Array(array, byteOffset);
      } else {
        array = new Uint8Array(array, byteOffset, length);
      }
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        that = array;
        that.__proto__ = Buffer3.prototype;
      } else {
        that = fromArrayLike(that, array);
      }
      return that;
    }
    function fromObject(that, obj) {
      if (internalIsBuffer(obj)) {
        var len = checked(obj.length) | 0;
        that = createBuffer(that, len);
        if (that.length === 0) {
          return that;
        }
        obj.copy(that, 0, 0, len);
        return that;
      }
      if (obj) {
        if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
          if (typeof obj.length !== "number" || isnan(obj.length)) {
            return createBuffer(that, 0);
          }
          return fromArrayLike(that, obj);
        }
        if (obj.type === "Buffer" && isArray2(obj.data)) {
          return fromArrayLike(that, obj.data);
        }
      }
      throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
    }
    function checked(length) {
      if (length >= kMaxLength()) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
      }
      return length | 0;
    }
    Buffer3.isBuffer = isBuffer2;
    function internalIsBuffer(b) {
      return !!(b != null && b._isBuffer);
    }
    Buffer3.compare = function compare2(a, b) {
      if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
        throw new TypeError("Arguments must be Buffers");
      }
      if (a === b)
        return 0;
      var x = a.length;
      var y = b.length;
      for (var i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    Buffer3.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer3.concat = function concat(list, length) {
      if (!isArray2(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer3.alloc(0);
      }
      var i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      var buffer = Buffer3.allocUnsafe(length);
      var pos = 0;
      for (i = 0; i < list.length; ++i) {
        var buf = list[i];
        if (!internalIsBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        buf.copy(buffer, pos);
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string, encoding) {
      if (internalIsBuffer(string)) {
        return string.length;
      }
      if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        string = "" + string;
      }
      var len = string.length;
      if (len === 0)
        return 0;
      var loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
          case void 0:
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase)
              return utf8ToBytes(string).length;
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer3.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      var loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding)
        encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer3.prototype._isBuffer = true;
    function swap(b, n, m) {
      var i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer3.prototype.swap16 = function swap16() {
      var len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (var i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer3.prototype.swap32 = function swap32() {
      var len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (var i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer3.prototype.swap64 = function swap64() {
      var len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (var i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer3.prototype.toString = function toString2() {
      var length = this.length | 0;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer3.prototype.equals = function equals(b) {
      if (!internalIsBuffer(b))
        throw new TypeError("Argument must be a Buffer");
      if (this === b)
        return true;
      return Buffer3.compare(this, b) === 0;
    };
    Buffer3.prototype.inspect = function inspect2() {
      var str = "";
      var max = INSPECT_MAX_BYTES;
      if (this.length > 0) {
        str = this.toString("hex", 0, max).match(/.{2}/g).join(" ");
        if (this.length > max)
          str += " ... ";
      }
      return "<Buffer " + str + ">";
    };
    Buffer3.prototype.compare = function compare2(target, start, end, thisStart, thisEnd) {
      if (!internalIsBuffer(target)) {
        throw new TypeError("Argument must be a Buffer");
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      var x = thisEnd - thisStart;
      var y = end - start;
      var len = Math.min(x, y);
      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);
      for (var i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0)
        return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (isNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0)
        byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir)
          return -1;
        else
          byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir)
          byteOffset = 0;
        else
          return -1;
      }
      if (typeof val === "string") {
        val = Buffer3.from(val, encoding);
      }
      if (internalIsBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (Buffer3.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      var indexSize = 1;
      var arrLength = arr.length;
      var valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read2(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      var i;
      if (dir) {
        var foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read2(arr, i) === read2(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1)
              foundIndex = i;
            if (i - foundIndex + 1 === valLength)
              return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1)
              i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          var found = true;
          for (var j = 0; j < valLength; j++) {
            if (read2(arr, i + j) !== read2(val, j)) {
              found = false;
              break;
            }
          }
          if (found)
            return i;
        }
      }
      return -1;
    }
    Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer3.prototype.indexOf = function indexOf2(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      var remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      var strLen = string.length;
      if (strLen % 2 !== 0)
        throw new TypeError("Invalid hex string");
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      for (var i = 0; i < length; ++i) {
        var parsed = parseInt(string.substr(i * 2, 2), 16);
        if (isNaN(parsed))
          return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function latin1Write(buf, string, offset, length) {
      return asciiWrite(buf, string, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer3.prototype.write = function write2(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset | 0;
        if (isFinite(length)) {
          length = length | 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      var remaining = this.length - offset;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      var loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
            return asciiWrite(this, string, offset, length);
          case "latin1":
          case "binary":
            return latin1Write(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer3.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return fromByteArray(buf);
      } else {
        return fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      var res = [];
      var i = start;
      while (i < end) {
        var firstByte = buf[i];
        var codePoint = null;
        var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          var secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      var len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      var res = "";
      var i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      var ret = "";
      end = Math.min(buf.length, end);
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      var ret = "";
      end = Math.min(buf.length, end);
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      var len = buf.length;
      if (!start || start < 0)
        start = 0;
      if (!end || end < 0 || end > len)
        end = len;
      var out = "";
      for (var i = start; i < end; ++i) {
        out += toHex(buf[i]);
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      var bytes = buf.slice(start, end);
      var res = "";
      for (var i = 0; i < bytes.length; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer3.prototype.slice = function slice2(start, end) {
      var len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      var newBuf;
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        newBuf = this.subarray(start, end);
        newBuf.__proto__ = Buffer3.prototype;
      } else {
        var sliceLen = end - start;
        newBuf = new Buffer3(sliceLen, void 0);
        for (var i = 0; i < sliceLen; ++i) {
          newBuf[i] = this[i + start];
        }
      }
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0)
        throw new RangeError("offset is not uint");
      if (offset + ext > length)
        throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      var val = this[offset + --byteLength2];
      var mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      var i = byteLength2;
      var mul = 1;
      var val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      var val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return read(this, offset, true, 23, 4);
    };
    Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return read(this, offset, false, 23, 4);
    };
    Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return read(this, offset, true, 52, 8);
    };
    Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!internalIsBuffer(buf))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
    }
    Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var mul = 1;
      var i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      if (!Buffer3.TYPED_ARRAY_SUPPORT)
        value = Math.floor(value);
      this[offset] = value & 255;
      return offset + 1;
    };
    function objectWriteUInt16(buf, value, offset, littleEndian) {
      if (value < 0)
        value = 65535 + value + 1;
      for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
        buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
      }
    }
    Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt16(this, value, offset, true);
      }
      return offset + 2;
    };
    Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
      } else {
        objectWriteUInt16(this, value, offset, false);
      }
      return offset + 2;
    };
    function objectWriteUInt32(buf, value, offset, littleEndian) {
      if (value < 0)
        value = 4294967295 + value + 1;
      for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
        buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 255;
      }
    }
    Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, true);
      }
      return offset + 4;
    };
    Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, false);
      }
      return offset + 4;
    };
    Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (!Buffer3.TYPED_ARRAY_SUPPORT)
        value = Math.floor(value);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt16(this, value, offset, true);
      }
      return offset + 2;
    };
    Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
      } else {
        objectWriteUInt16(this, value, offset, false);
      }
      return offset + 2;
    };
    Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
      } else {
        objectWriteUInt32(this, value, offset, true);
      }
      return offset + 4;
    };
    Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      if (Buffer3.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, false);
      }
      return offset + 4;
    };
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
      if (offset < 0)
        throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4);
      }
      write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8);
      }
      write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("sourceStart out of bounds");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      var len = end - start;
      var i;
      if (this === target && start < targetStart && targetStart < end) {
        for (i = len - 1; i >= 0; --i) {
          target[i + targetStart] = this[i + start];
        }
      } else if (len < 1e3 || !Buffer3.TYPED_ARRAY_SUPPORT) {
        for (i = 0; i < len; ++i) {
          target[i + targetStart] = this[i + start];
        }
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, start + len),
          targetStart
        );
      }
      return len;
    };
    Buffer3.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (val.length === 1) {
          var code = val.charCodeAt(0);
          if (code < 256) {
            val = code;
          }
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
      } else if (typeof val === "number") {
        val = val & 255;
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      var i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        var bytes = internalIsBuffer(val) ? val : utf8ToBytes(new Buffer3(val, encoding).toString());
        var len = bytes.length;
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = stringtrim(str).replace(INVALID_BASE64_RE, "");
      if (str.length < 2)
        return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function stringtrim(str) {
      if (str.trim)
        return str.trim();
      return str.replace(/^\s+|\s+$/g, "");
    }
    function toHex(n) {
      if (n < 16)
        return "0" + n.toString(16);
      return n.toString(16);
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      var codePoint;
      var length = string.length;
      var leadSurrogate = null;
      var bytes = [];
      for (var i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0)
            break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0)
            break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0)
            break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0)
            break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      var c, hi, lo;
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0)
          break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      for (var i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length)
          break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isnan(val) {
      return val !== val;
    }
    function isBuffer2(obj) {
      return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj));
    }
    function isFastBuffer(obj) {
      return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
    }
    function isSlowBuffer(obj) {
      return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isFastBuffer(obj.slice(0, 0));
    }
    function defaultSetTimout() {
      throw new Error("setTimeout has not been defined");
    }
    function defaultClearTimeout() {
      throw new Error("clearTimeout has not been defined");
    }
    var cachedSetTimeout = defaultSetTimout;
    var cachedClearTimeout = defaultClearTimeout;
    if (typeof global$1.setTimeout === "function") {
      cachedSetTimeout = setTimeout;
    }
    if (typeof global$1.clearTimeout === "function") {
      cachedClearTimeout = clearTimeout;
    }
    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
        return setTimeout(fun, 0);
      }
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }
      try {
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e2) {
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }
    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
        return clearTimeout(marker);
      }
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }
      try {
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          return cachedClearTimeout.call(null, marker);
        } catch (e2) {
          return cachedClearTimeout.call(this, marker);
        }
      }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    function cleanUpNextTick() {
      if (!draining || !currentQueue) {
        return;
      }
      draining = false;
      if (currentQueue.length) {
        queue = currentQueue.concat(queue);
      } else {
        queueIndex = -1;
      }
      if (queue.length) {
        drainQueue();
      }
    }
    function drainQueue() {
      if (draining) {
        return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
          if (currentQueue) {
            currentQueue[queueIndex].run();
          }
        }
        queueIndex = -1;
        len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }
    function nextTick(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i];
        }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
      }
    }
    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    var performance = global$1.performance || {};
    performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function() {
      return (/* @__PURE__ */ new Date()).getTime();
    };
    var inherits;
    if (typeof Object.create === "function") {
      inherits = function inherits2(ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      };
    } else {
      inherits = function inherits2(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      };
    }
    var inherits$1 = inherits;
    var formatRegExp = /%[sdj%]/g;
    function format(f) {
      if (!isString(f)) {
        var objects = [];
        for (var i = 0; i < arguments.length; i++) {
          objects.push(inspect(arguments[i]));
        }
        return objects.join(" ");
      }
      var i = 1;
      var args = arguments;
      var len = args.length;
      var str = String(f).replace(formatRegExp, function(x2) {
        if (x2 === "%%")
          return "%";
        if (i >= len)
          return x2;
        switch (x2) {
          case "%s":
            return String(args[i++]);
          case "%d":
            return Number(args[i++]);
          case "%j":
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return "[Circular]";
            }
          default:
            return x2;
        }
      });
      for (var x = args[i]; i < len; x = args[++i]) {
        if (isNull(x) || !isObject2(x)) {
          str += " " + x;
        } else {
          str += " " + inspect(x);
        }
      }
      return str;
    }
    function deprecate(fn, msg) {
      if (isUndefined(global$1.process)) {
        return function() {
          return deprecate(fn, msg).apply(this, arguments);
        };
      }
      var warned = false;
      function deprecated() {
        if (!warned) {
          {
            console.error(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }
      return deprecated;
    }
    var debugs = {};
    var debugEnviron;
    function debuglog(set) {
      if (isUndefined(debugEnviron))
        debugEnviron = "";
      set = set.toUpperCase();
      if (!debugs[set]) {
        if (new RegExp("\\b" + set + "\\b", "i").test(debugEnviron)) {
          var pid = 0;
          debugs[set] = function() {
            var msg = format.apply(null, arguments);
            console.error("%s %d: %s", set, pid, msg);
          };
        } else {
          debugs[set] = function() {
          };
        }
      }
      return debugs[set];
    }
    function inspect(obj, opts2) {
      var ctx = {
        seen: [],
        stylize: stylizeNoColor
      };
      if (arguments.length >= 3)
        ctx.depth = arguments[2];
      if (arguments.length >= 4)
        ctx.colors = arguments[3];
      if (isBoolean(opts2)) {
        ctx.showHidden = opts2;
      } else if (opts2) {
        _extend(ctx, opts2);
      }
      if (isUndefined(ctx.showHidden))
        ctx.showHidden = false;
      if (isUndefined(ctx.depth))
        ctx.depth = 2;
      if (isUndefined(ctx.colors))
        ctx.colors = false;
      if (isUndefined(ctx.customInspect))
        ctx.customInspect = true;
      if (ctx.colors)
        ctx.stylize = stylizeWithColor;
      return formatValue(ctx, obj, ctx.depth);
    }
    inspect.colors = {
      "bold": [1, 22],
      "italic": [3, 23],
      "underline": [4, 24],
      "inverse": [7, 27],
      "white": [37, 39],
      "grey": [90, 39],
      "black": [30, 39],
      "blue": [34, 39],
      "cyan": [36, 39],
      "green": [32, 39],
      "magenta": [35, 39],
      "red": [31, 39],
      "yellow": [33, 39]
    };
    inspect.styles = {
      "special": "cyan",
      "number": "yellow",
      "boolean": "yellow",
      "undefined": "grey",
      "null": "bold",
      "string": "green",
      "date": "magenta",
      // "name": intentionally not styling
      "regexp": "red"
    };
    function stylizeWithColor(str, styleType) {
      var style = inspect.styles[styleType];
      if (style) {
        return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
      } else {
        return str;
      }
    }
    function stylizeNoColor(str, styleType) {
      return str;
    }
    function arrayToHash(array) {
      var hash = {};
      array.forEach(function(val, idx) {
        hash[val] = true;
      });
      return hash;
    }
    function formatValue(ctx, value, recurseTimes) {
      if (ctx.customInspect && value && isFunction2(value.inspect) && // Filter out the util module, it's inspect function is special
      value.inspect !== inspect && // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
        var ret = value.inspect(recurseTimes, ctx);
        if (!isString(ret)) {
          ret = formatValue(ctx, ret, recurseTimes);
        }
        return ret;
      }
      var primitive = formatPrimitive(ctx, value);
      if (primitive) {
        return primitive;
      }
      var keys3 = Object.keys(value);
      var visibleKeys = arrayToHash(keys3);
      if (ctx.showHidden) {
        keys3 = Object.getOwnPropertyNames(value);
      }
      if (isError(value) && (keys3.indexOf("message") >= 0 || keys3.indexOf("description") >= 0)) {
        return formatError(value);
      }
      if (keys3.length === 0) {
        if (isFunction2(value)) {
          var name = value.name ? ": " + value.name : "";
          return ctx.stylize("[Function" + name + "]", "special");
        }
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        }
        if (isDate(value)) {
          return ctx.stylize(Date.prototype.toString.call(value), "date");
        }
        if (isError(value)) {
          return formatError(value);
        }
      }
      var base = "", array = false, braces = ["{", "}"];
      if (isArray$12(value)) {
        array = true;
        braces = ["[", "]"];
      }
      if (isFunction2(value)) {
        var n = value.name ? ": " + value.name : "";
        base = " [Function" + n + "]";
      }
      if (isRegExp(value)) {
        base = " " + RegExp.prototype.toString.call(value);
      }
      if (isDate(value)) {
        base = " " + Date.prototype.toUTCString.call(value);
      }
      if (isError(value)) {
        base = " " + formatError(value);
      }
      if (keys3.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
      }
      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        } else {
          return ctx.stylize("[Object]", "special");
        }
      }
      ctx.seen.push(value);
      var output;
      if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys3);
      } else {
        output = keys3.map(function(key) {
          return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
      }
      ctx.seen.pop();
      return reduceToSingleString(output, base, braces);
    }
    function formatPrimitive(ctx, value) {
      if (isUndefined(value))
        return ctx.stylize("undefined", "undefined");
      if (isString(value)) {
        var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return ctx.stylize(simple, "string");
      }
      if (isNumber(value))
        return ctx.stylize("" + value, "number");
      if (isBoolean(value))
        return ctx.stylize("" + value, "boolean");
      if (isNull(value))
        return ctx.stylize("null", "null");
    }
    function formatError(value) {
      return "[" + Error.prototype.toString.call(value) + "]";
    }
    function formatArray(ctx, value, recurseTimes, visibleKeys, keys3) {
      var output = [];
      for (var i = 0, l = value.length; i < l; ++i) {
        if (hasOwnProperty2(value, String(i))) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            String(i),
            true
          ));
        } else {
          output.push("");
        }
      }
      keys3.forEach(function(key) {
        if (!key.match(/^\d+$/)) {
          output.push(formatProperty(
            ctx,
            value,
            recurseTimes,
            visibleKeys,
            key,
            true
          ));
        }
      });
      return output;
    }
    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
      var name, str, desc;
      desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
      if (desc.get) {
        if (desc.set) {
          str = ctx.stylize("[Getter/Setter]", "special");
        } else {
          str = ctx.stylize("[Getter]", "special");
        }
      } else {
        if (desc.set) {
          str = ctx.stylize("[Setter]", "special");
        }
      }
      if (!hasOwnProperty2(visibleKeys, key)) {
        name = "[" + key + "]";
      }
      if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
          if (isNull(recurseTimes)) {
            str = formatValue(ctx, desc.value, null);
          } else {
            str = formatValue(ctx, desc.value, recurseTimes - 1);
          }
          if (str.indexOf("\n") > -1) {
            if (array) {
              str = str.split("\n").map(function(line) {
                return "  " + line;
              }).join("\n").substr(2);
            } else {
              str = "\n" + str.split("\n").map(function(line) {
                return "   " + line;
              }).join("\n");
            }
          }
        } else {
          str = ctx.stylize("[Circular]", "special");
        }
      }
      if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify("" + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.substr(1, name.length - 2);
          name = ctx.stylize(name, "name");
        } else {
          name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
          name = ctx.stylize(name, "string");
        }
      }
      return name + ": " + str;
    }
    function reduceToSingleString(output, base, braces) {
      var length = output.reduce(function(prev, cur) {
        if (cur.indexOf("\n") >= 0)
          ;
        return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
      }, 0);
      if (length > 60) {
        return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
      }
      return braces[0] + base + " " + output.join(", ") + " " + braces[1];
    }
    function isArray$12(ar) {
      return Array.isArray(ar);
    }
    function isBoolean(arg) {
      return typeof arg === "boolean";
    }
    function isNull(arg) {
      return arg === null;
    }
    function isNumber(arg) {
      return typeof arg === "number";
    }
    function isString(arg) {
      return typeof arg === "string";
    }
    function isUndefined(arg) {
      return arg === void 0;
    }
    function isRegExp(re2) {
      return isObject2(re2) && objectToString2(re2) === "[object RegExp]";
    }
    function isObject2(arg) {
      return typeof arg === "object" && arg !== null;
    }
    function isDate(d) {
      return isObject2(d) && objectToString2(d) === "[object Date]";
    }
    function isError(e) {
      return isObject2(e) && (objectToString2(e) === "[object Error]" || e instanceof Error);
    }
    function isFunction2(arg) {
      return typeof arg === "function";
    }
    function objectToString2(o) {
      return Object.prototype.toString.call(o);
    }
    function _extend(origin, add) {
      if (!add || !isObject2(add))
        return origin;
      var keys3 = Object.keys(add);
      var i = keys3.length;
      while (i--) {
        origin[keys3[i]] = add[keys3[i]];
      }
      return origin;
    }
    function hasOwnProperty2(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    function BufferList() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
    BufferList.prototype.push = function(v2) {
      var entry = { data: v2, next: null };
      if (this.length > 0)
        this.tail.next = entry;
      else
        this.head = entry;
      this.tail = entry;
      ++this.length;
    };
    BufferList.prototype.unshift = function(v2) {
      var entry = { data: v2, next: this.head };
      if (this.length === 0)
        this.tail = entry;
      this.head = entry;
      ++this.length;
    };
    BufferList.prototype.shift = function() {
      if (this.length === 0)
        return;
      var ret = this.head.data;
      if (this.length === 1)
        this.head = this.tail = null;
      else
        this.head = this.head.next;
      --this.length;
      return ret;
    };
    BufferList.prototype.clear = function() {
      this.head = this.tail = null;
      this.length = 0;
    };
    BufferList.prototype.join = function(s) {
      if (this.length === 0)
        return "";
      var p = this.head;
      var ret = "" + p.data;
      while (p = p.next) {
        ret += s + p.data;
      }
      return ret;
    };
    BufferList.prototype.concat = function(n) {
      if (this.length === 0)
        return Buffer3.alloc(0);
      if (this.length === 1)
        return this.head.data;
      var ret = Buffer3.allocUnsafe(n >>> 0);
      var p = this.head;
      var i = 0;
      while (p) {
        p.data.copy(ret, i);
        i += p.data.length;
        p = p.next;
      }
      return ret;
    };
    var isBufferEncoding = Buffer3.isEncoding || function(encoding) {
      switch (encoding && encoding.toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
          return true;
        default:
          return false;
      }
    };
    function assertEncoding(encoding) {
      if (encoding && !isBufferEncoding(encoding)) {
        throw new Error("Unknown encoding: " + encoding);
      }
    }
    function StringDecoder(encoding) {
      this.encoding = (encoding || "utf8").toLowerCase().replace(/[-_]/, "");
      assertEncoding(encoding);
      switch (this.encoding) {
        case "utf8":
          this.surrogateSize = 3;
          break;
        case "ucs2":
        case "utf16le":
          this.surrogateSize = 2;
          this.detectIncompleteChar = utf16DetectIncompleteChar;
          break;
        case "base64":
          this.surrogateSize = 3;
          this.detectIncompleteChar = base64DetectIncompleteChar;
          break;
        default:
          this.write = passThroughWrite;
          return;
      }
      this.charBuffer = new Buffer3(6);
      this.charReceived = 0;
      this.charLength = 0;
    }
    StringDecoder.prototype.write = function(buffer) {
      var charStr = "";
      while (this.charLength) {
        var available = buffer.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : buffer.length;
        buffer.copy(this.charBuffer, this.charReceived, 0, available);
        this.charReceived += available;
        if (this.charReceived < this.charLength) {
          return "";
        }
        buffer = buffer.slice(available, buffer.length);
        charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
        var charCode = charStr.charCodeAt(charStr.length - 1);
        if (charCode >= 55296 && charCode <= 56319) {
          this.charLength += this.surrogateSize;
          charStr = "";
          continue;
        }
        this.charReceived = this.charLength = 0;
        if (buffer.length === 0) {
          return charStr;
        }
        break;
      }
      this.detectIncompleteChar(buffer);
      var end = buffer.length;
      if (this.charLength) {
        buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
        end -= this.charReceived;
      }
      charStr += buffer.toString(this.encoding, 0, end);
      var end = charStr.length - 1;
      var charCode = charStr.charCodeAt(end);
      if (charCode >= 55296 && charCode <= 56319) {
        var size = this.surrogateSize;
        this.charLength += size;
        this.charReceived += size;
        this.charBuffer.copy(this.charBuffer, size, 0, size);
        buffer.copy(this.charBuffer, 0, 0, size);
        return charStr.substring(0, end);
      }
      return charStr;
    };
    StringDecoder.prototype.detectIncompleteChar = function(buffer) {
      var i = buffer.length >= 3 ? 3 : buffer.length;
      for (; i > 0; i--) {
        var c = buffer[buffer.length - i];
        if (i == 1 && c >> 5 == 6) {
          this.charLength = 2;
          break;
        }
        if (i <= 2 && c >> 4 == 14) {
          this.charLength = 3;
          break;
        }
        if (i <= 3 && c >> 3 == 30) {
          this.charLength = 4;
          break;
        }
      }
      this.charReceived = i;
    };
    StringDecoder.prototype.end = function(buffer) {
      var res = "";
      if (buffer && buffer.length)
        res = this.write(buffer);
      if (this.charReceived) {
        var cr = this.charReceived;
        var buf = this.charBuffer;
        var enc = this.encoding;
        res += buf.slice(0, cr).toString(enc);
      }
      return res;
    };
    function passThroughWrite(buffer) {
      return buffer.toString(this.encoding);
    }
    function utf16DetectIncompleteChar(buffer) {
      this.charReceived = buffer.length % 2;
      this.charLength = this.charReceived ? 2 : 0;
    }
    function base64DetectIncompleteChar(buffer) {
      this.charReceived = buffer.length % 3;
      this.charLength = this.charReceived ? 3 : 0;
    }
    Readable.ReadableState = ReadableState;
    var debug2 = debuglog("stream");
    inherits$1(Readable, EventEmitter);
    function prependListener(emitter, event, fn) {
      if (typeof emitter.prependListener === "function") {
        return emitter.prependListener(event, fn);
      } else {
        if (!emitter._events || !emitter._events[event])
          emitter.on(event, fn);
        else if (Array.isArray(emitter._events[event]))
          emitter._events[event].unshift(fn);
        else
          emitter._events[event] = [fn, emitter._events[event]];
      }
    }
    function listenerCount$1(emitter, type2) {
      return emitter.listeners(type2).length;
    }
    function ReadableState(options, stream) {
      options = options || {};
      this.objectMode = !!options.objectMode;
      if (stream instanceof Duplex)
        this.objectMode = this.objectMode || !!options.readableObjectMode;
      var hwm = options.highWaterMark;
      var defaultHwm = this.objectMode ? 16 : 16 * 1024;
      this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
      this.highWaterMark = ~~this.highWaterMark;
      this.buffer = new BufferList();
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false;
      this.sync = true;
      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
      this.resumeScheduled = false;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.ranOut = false;
      this.awaitDrain = 0;
      this.readingMore = false;
      this.decoder = null;
      this.encoding = null;
      if (options.encoding) {
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
      }
    }
    function Readable(options) {
      if (!(this instanceof Readable))
        return new Readable(options);
      this._readableState = new ReadableState(options, this);
      this.readable = true;
      if (options && typeof options.read === "function")
        this._read = options.read;
      EventEmitter.call(this);
    }
    Readable.prototype.push = function(chunk, encoding) {
      var state = this._readableState;
      if (!state.objectMode && typeof chunk === "string") {
        encoding = encoding || state.defaultEncoding;
        if (encoding !== state.encoding) {
          chunk = Buffer3.from(chunk, encoding);
          encoding = "";
        }
      }
      return readableAddChunk(this, state, chunk, encoding, false);
    };
    Readable.prototype.unshift = function(chunk) {
      var state = this._readableState;
      return readableAddChunk(this, state, chunk, "", true);
    };
    Readable.prototype.isPaused = function() {
      return this._readableState.flowing === false;
    };
    function readableAddChunk(stream, state, chunk, encoding, addToFront) {
      var er = chunkInvalid(state, chunk);
      if (er) {
        stream.emit("error", er);
      } else if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
      } else if (state.objectMode || chunk && chunk.length > 0) {
        if (state.ended && !addToFront) {
          var e = new Error("stream.push() after EOF");
          stream.emit("error", e);
        } else if (state.endEmitted && addToFront) {
          var _e = new Error("stream.unshift() after end event");
          stream.emit("error", _e);
        } else {
          var skipAdd;
          if (state.decoder && !addToFront && !encoding) {
            chunk = state.decoder.write(chunk);
            skipAdd = !state.objectMode && chunk.length === 0;
          }
          if (!addToFront)
            state.reading = false;
          if (!skipAdd) {
            if (state.flowing && state.length === 0 && !state.sync) {
              stream.emit("data", chunk);
              stream.read(0);
            } else {
              state.length += state.objectMode ? 1 : chunk.length;
              if (addToFront)
                state.buffer.unshift(chunk);
              else
                state.buffer.push(chunk);
              if (state.needReadable)
                emitReadable(stream);
            }
          }
          maybeReadMore(stream, state);
        }
      } else if (!addToFront) {
        state.reading = false;
      }
      return needMoreData(state);
    }
    function needMoreData(state) {
      return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
    }
    Readable.prototype.setEncoding = function(enc) {
      this._readableState.decoder = new StringDecoder(enc);
      this._readableState.encoding = enc;
      return this;
    };
    var MAX_HWM = 8388608;
    function computeNewHighWaterMark(n) {
      if (n >= MAX_HWM) {
        n = MAX_HWM;
      } else {
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
      }
      return n;
    }
    function howMuchToRead(n, state) {
      if (n <= 0 || state.length === 0 && state.ended)
        return 0;
      if (state.objectMode)
        return 1;
      if (n !== n) {
        if (state.flowing && state.length)
          return state.buffer.head.data.length;
        else
          return state.length;
      }
      if (n > state.highWaterMark)
        state.highWaterMark = computeNewHighWaterMark(n);
      if (n <= state.length)
        return n;
      if (!state.ended) {
        state.needReadable = true;
        return 0;
      }
      return state.length;
    }
    Readable.prototype.read = function(n) {
      debug2("read", n);
      n = parseInt(n, 10);
      var state = this._readableState;
      var nOrig = n;
      if (n !== 0)
        state.emittedReadable = false;
      if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
        debug2("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended)
          endReadable(this);
        else
          emitReadable(this);
        return null;
      }
      n = howMuchToRead(n, state);
      if (n === 0 && state.ended) {
        if (state.length === 0)
          endReadable(this);
        return null;
      }
      var doRead = state.needReadable;
      debug2("need readable", doRead);
      if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug2("length less than watermark", doRead);
      }
      if (state.ended || state.reading) {
        doRead = false;
        debug2("reading or ended", doRead);
      } else if (doRead) {
        debug2("do read");
        state.reading = true;
        state.sync = true;
        if (state.length === 0)
          state.needReadable = true;
        this._read(state.highWaterMark);
        state.sync = false;
        if (!state.reading)
          n = howMuchToRead(nOrig, state);
      }
      var ret;
      if (n > 0)
        ret = fromList(n, state);
      else
        ret = null;
      if (ret === null) {
        state.needReadable = true;
        n = 0;
      } else {
        state.length -= n;
      }
      if (state.length === 0) {
        if (!state.ended)
          state.needReadable = true;
        if (nOrig !== n && state.ended)
          endReadable(this);
      }
      if (ret !== null)
        this.emit("data", ret);
      return ret;
    };
    function chunkInvalid(state, chunk) {
      var er = null;
      if (!isBuffer2(chunk) && typeof chunk !== "string" && chunk !== null && chunk !== void 0 && !state.objectMode) {
        er = new TypeError("Invalid non-string/buffer chunk");
      }
      return er;
    }
    function onEofChunk(stream, state) {
      if (state.ended)
        return;
      if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }
      state.ended = true;
      emitReadable(stream);
    }
    function emitReadable(stream) {
      var state = stream._readableState;
      state.needReadable = false;
      if (!state.emittedReadable) {
        debug2("emitReadable", state.flowing);
        state.emittedReadable = true;
        if (state.sync)
          nextTick(emitReadable_, stream);
        else
          emitReadable_(stream);
      }
    }
    function emitReadable_(stream) {
      debug2("emit readable");
      stream.emit("readable");
      flow(stream);
    }
    function maybeReadMore(stream, state) {
      if (!state.readingMore) {
        state.readingMore = true;
        nextTick(maybeReadMore_, stream, state);
      }
    }
    function maybeReadMore_(stream, state) {
      var len = state.length;
      while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
        debug2("maybeReadMore read 0");
        stream.read(0);
        if (len === state.length)
          break;
        else
          len = state.length;
      }
      state.readingMore = false;
    }
    Readable.prototype._read = function(n) {
      this.emit("error", new Error("not implemented"));
    };
    Readable.prototype.pipe = function(dest, pipeOpts) {
      var src = this;
      var state = this._readableState;
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1;
      debug2("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
      var doEnd = !pipeOpts || pipeOpts.end !== false;
      var endFn = doEnd ? onend2 : cleanup;
      if (state.endEmitted)
        nextTick(endFn);
      else
        src.once("end", endFn);
      dest.on("unpipe", onunpipe);
      function onunpipe(readable) {
        debug2("onunpipe");
        if (readable === src) {
          cleanup();
        }
      }
      function onend2() {
        debug2("onend");
        dest.end();
      }
      var ondrain = pipeOnDrain(src);
      dest.on("drain", ondrain);
      var cleanedUp = false;
      function cleanup() {
        debug2("cleanup");
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        dest.removeListener("drain", ondrain);
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend2);
        src.removeListener("end", cleanup);
        src.removeListener("data", ondata);
        cleanedUp = true;
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
          ondrain();
      }
      var increasedAwaitDrain = false;
      src.on("data", ondata);
      function ondata(chunk) {
        debug2("ondata");
        increasedAwaitDrain = false;
        var ret = dest.write(chunk);
        if (false === ret && !increasedAwaitDrain) {
          if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
            debug2("false write response, pause", src._readableState.awaitDrain);
            src._readableState.awaitDrain++;
            increasedAwaitDrain = true;
          }
          src.pause();
        }
      }
      function onerror(er) {
        debug2("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if (listenerCount$1(dest, "error") === 0)
          dest.emit("error", er);
      }
      prependListener(dest, "error", onerror);
      function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
      }
      dest.once("close", onclose);
      function onfinish() {
        debug2("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
      }
      dest.once("finish", onfinish);
      function unpipe() {
        debug2("unpipe");
        src.unpipe(dest);
      }
      dest.emit("pipe", src);
      if (!state.flowing) {
        debug2("pipe resume");
        src.resume();
      }
      return dest;
    };
    function pipeOnDrain(src) {
      return function() {
        var state = src._readableState;
        debug2("pipeOnDrain", state.awaitDrain);
        if (state.awaitDrain)
          state.awaitDrain--;
        if (state.awaitDrain === 0 && src.listeners("data").length) {
          state.flowing = true;
          flow(src);
        }
      };
    }
    Readable.prototype.unpipe = function(dest) {
      var state = this._readableState;
      if (state.pipesCount === 0)
        return this;
      if (state.pipesCount === 1) {
        if (dest && dest !== state.pipes)
          return this;
        if (!dest)
          dest = state.pipes;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest)
          dest.emit("unpipe", this);
        return this;
      }
      if (!dest) {
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for (var _i = 0; _i < len; _i++) {
          dests[_i].emit("unpipe", this);
        }
        return this;
      }
      var i = indexOf(state.pipes, dest);
      if (i === -1)
        return this;
      state.pipes.splice(i, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1)
        state.pipes = state.pipes[0];
      dest.emit("unpipe", this);
      return this;
    };
    Readable.prototype.on = function(ev, fn) {
      var res = EventEmitter.prototype.on.call(this, ev, fn);
      if (ev === "data") {
        if (this._readableState.flowing !== false)
          this.resume();
      } else if (ev === "readable") {
        var state = this._readableState;
        if (!state.endEmitted && !state.readableListening) {
          state.readableListening = state.needReadable = true;
          state.emittedReadable = false;
          if (!state.reading) {
            nextTick(nReadingNextTick, this);
          } else if (state.length) {
            emitReadable(this);
          }
        }
      }
      return res;
    };
    Readable.prototype.addListener = Readable.prototype.on;
    function nReadingNextTick(self2) {
      debug2("readable nexttick read 0");
      self2.read(0);
    }
    Readable.prototype.resume = function() {
      var state = this._readableState;
      if (!state.flowing) {
        debug2("resume");
        state.flowing = true;
        resume(this, state);
      }
      return this;
    };
    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        nextTick(resume_, stream, state);
      }
    }
    function resume_(stream, state) {
      if (!state.reading) {
        debug2("resume read 0");
        stream.read(0);
      }
      state.resumeScheduled = false;
      state.awaitDrain = 0;
      stream.emit("resume");
      flow(stream);
      if (state.flowing && !state.reading)
        stream.read(0);
    }
    Readable.prototype.pause = function() {
      debug2("call pause flowing=%j", this._readableState.flowing);
      if (false !== this._readableState.flowing) {
        debug2("pause");
        this._readableState.flowing = false;
        this.emit("pause");
      }
      return this;
    };
    function flow(stream) {
      var state = stream._readableState;
      debug2("flow", state.flowing);
      while (state.flowing && stream.read() !== null) {
      }
    }
    Readable.prototype.wrap = function(stream) {
      var state = this._readableState;
      var paused = false;
      var self2 = this;
      stream.on("end", function() {
        debug2("wrapped end");
        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length)
            self2.push(chunk);
        }
        self2.push(null);
      });
      stream.on("data", function(chunk) {
        debug2("wrapped data");
        if (state.decoder)
          chunk = state.decoder.write(chunk);
        if (state.objectMode && (chunk === null || chunk === void 0))
          return;
        else if (!state.objectMode && (!chunk || !chunk.length))
          return;
        var ret = self2.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
      for (var i in stream) {
        if (this[i] === void 0 && typeof stream[i] === "function") {
          this[i] = function(method2) {
            return function() {
              return stream[method2].apply(stream, arguments);
            };
          }(i);
        }
      }
      var events = ["error", "close", "destroy", "pause", "resume"];
      forEach(events, function(ev) {
        stream.on(ev, self2.emit.bind(self2, ev));
      });
      self2._read = function(n) {
        debug2("wrapped _read", n);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
      return self2;
    };
    Readable._fromList = fromList;
    function fromList(n, state) {
      if (state.length === 0)
        return null;
      var ret;
      if (state.objectMode)
        ret = state.buffer.shift();
      else if (!n || n >= state.length) {
        if (state.decoder)
          ret = state.buffer.join("");
        else if (state.buffer.length === 1)
          ret = state.buffer.head.data;
        else
          ret = state.buffer.concat(state.length);
        state.buffer.clear();
      } else {
        ret = fromListPartial(n, state.buffer, state.decoder);
      }
      return ret;
    }
    function fromListPartial(n, list, hasStrings) {
      var ret;
      if (n < list.head.data.length) {
        ret = list.head.data.slice(0, n);
        list.head.data = list.head.data.slice(n);
      } else if (n === list.head.data.length) {
        ret = list.shift();
      } else {
        ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
      }
      return ret;
    }
    function copyFromBufferString(n, list) {
      var p = list.head;
      var c = 1;
      var ret = p.data;
      n -= ret.length;
      while (p = p.next) {
        var str = p.data;
        var nb = n > str.length ? str.length : n;
        if (nb === str.length)
          ret += str;
        else
          ret += str.slice(0, n);
        n -= nb;
        if (n === 0) {
          if (nb === str.length) {
            ++c;
            if (p.next)
              list.head = p.next;
            else
              list.head = list.tail = null;
          } else {
            list.head = p;
            p.data = str.slice(nb);
          }
          break;
        }
        ++c;
      }
      list.length -= c;
      return ret;
    }
    function copyFromBuffer(n, list) {
      var ret = Buffer3.allocUnsafe(n);
      var p = list.head;
      var c = 1;
      p.data.copy(ret);
      n -= p.data.length;
      while (p = p.next) {
        var buf = p.data;
        var nb = n > buf.length ? buf.length : n;
        buf.copy(ret, ret.length - n, 0, nb);
        n -= nb;
        if (n === 0) {
          if (nb === buf.length) {
            ++c;
            if (p.next)
              list.head = p.next;
            else
              list.head = list.tail = null;
          } else {
            list.head = p;
            p.data = buf.slice(nb);
          }
          break;
        }
        ++c;
      }
      list.length -= c;
      return ret;
    }
    function endReadable(stream) {
      var state = stream._readableState;
      if (state.length > 0)
        throw new Error('"endReadable()" called on non-empty stream');
      if (!state.endEmitted) {
        state.ended = true;
        nextTick(endReadableNT, state, stream);
      }
    }
    function endReadableNT(state, stream) {
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit("end");
      }
    }
    function forEach(xs, f) {
      for (var i = 0, l = xs.length; i < l; i++) {
        f(xs[i], i);
      }
    }
    function indexOf(xs, x) {
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x)
          return i;
      }
      return -1;
    }
    Writable.WritableState = WritableState;
    inherits$1(Writable, EventEmitter);
    function nop() {
    }
    function WriteReq(chunk, encoding, cb) {
      this.chunk = chunk;
      this.encoding = encoding;
      this.callback = cb;
      this.next = null;
    }
    function WritableState(options, stream) {
      Object.defineProperty(this, "buffer", {
        get: deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.")
      });
      options = options || {};
      this.objectMode = !!options.objectMode;
      if (stream instanceof Duplex)
        this.objectMode = this.objectMode || !!options.writableObjectMode;
      var hwm = options.highWaterMark;
      var defaultHwm = this.objectMode ? 16 : 16 * 1024;
      this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
      this.highWaterMark = ~~this.highWaterMark;
      this.needDrain = false;
      this.ending = false;
      this.ended = false;
      this.finished = false;
      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.length = 0;
      this.writing = false;
      this.corked = 0;
      this.sync = true;
      this.bufferProcessing = false;
      this.onwrite = function(er) {
        onwrite(stream, er);
      };
      this.writecb = null;
      this.writelen = 0;
      this.bufferedRequest = null;
      this.lastBufferedRequest = null;
      this.pendingcb = 0;
      this.prefinished = false;
      this.errorEmitted = false;
      this.bufferedRequestCount = 0;
      this.corkedRequestsFree = new CorkedRequest(this);
    }
    WritableState.prototype.getBuffer = function writableStateGetBuffer() {
      var current = this.bufferedRequest;
      var out = [];
      while (current) {
        out.push(current);
        current = current.next;
      }
      return out;
    };
    function Writable(options) {
      if (!(this instanceof Writable) && !(this instanceof Duplex))
        return new Writable(options);
      this._writableState = new WritableState(options, this);
      this.writable = true;
      if (options) {
        if (typeof options.write === "function")
          this._write = options.write;
        if (typeof options.writev === "function")
          this._writev = options.writev;
      }
      EventEmitter.call(this);
    }
    Writable.prototype.pipe = function() {
      this.emit("error", new Error("Cannot pipe, not readable"));
    };
    function writeAfterEnd(stream, cb) {
      var er = new Error("write after end");
      stream.emit("error", er);
      nextTick(cb, er);
    }
    function validChunk(stream, state, chunk, cb) {
      var valid2 = true;
      var er = false;
      if (chunk === null) {
        er = new TypeError("May not write null values to stream");
      } else if (!Buffer3.isBuffer(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
        er = new TypeError("Invalid non-string/buffer chunk");
      }
      if (er) {
        stream.emit("error", er);
        nextTick(cb, er);
        valid2 = false;
      }
      return valid2;
    }
    Writable.prototype.write = function(chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (Buffer3.isBuffer(chunk))
        encoding = "buffer";
      else if (!encoding)
        encoding = state.defaultEncoding;
      if (typeof cb !== "function")
        cb = nop;
      if (state.ended)
        writeAfterEnd(this, cb);
      else if (validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, chunk, encoding, cb);
      }
      return ret;
    };
    Writable.prototype.cork = function() {
      var state = this._writableState;
      state.corked++;
    };
    Writable.prototype.uncork = function() {
      var state = this._writableState;
      if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest)
          clearBuffer(this, state);
      }
    };
    Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
      if (typeof encoding === "string")
        encoding = encoding.toLowerCase();
      if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
        throw new TypeError("Unknown encoding: " + encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    };
    function decodeChunk(state, chunk, encoding) {
      if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
        chunk = Buffer3.from(chunk, encoding);
      }
      return chunk;
    }
    function writeOrBuffer(stream, state, chunk, encoding, cb) {
      chunk = decodeChunk(state, chunk, encoding);
      if (Buffer3.isBuffer(chunk))
        encoding = "buffer";
      var len = state.objectMode ? 1 : chunk.length;
      state.length += len;
      var ret = state.length < state.highWaterMark;
      if (!ret)
        state.needDrain = true;
      if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
        if (last) {
          last.next = state.lastBufferedRequest;
        } else {
          state.bufferedRequest = state.lastBufferedRequest;
        }
        state.bufferedRequestCount += 1;
      } else {
        doWrite(stream, state, false, len, chunk, encoding, cb);
      }
      return ret;
    }
    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (writev)
        stream._writev(chunk, state.onwrite);
      else
        stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    function onwriteError(stream, state, sync, er, cb) {
      --state.pendingcb;
      if (sync)
        nextTick(cb, er);
      else
        cb(er);
      stream._writableState.errorEmitted = true;
      stream.emit("error", er);
    }
    function onwriteStateUpdate(state) {
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
    }
    function onwrite(stream, er) {
      var state = stream._writableState;
      var sync = state.sync;
      var cb = state.writecb;
      onwriteStateUpdate(state);
      if (er)
        onwriteError(stream, state, sync, er, cb);
      else {
        var finished = needFinish(state);
        if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
          clearBuffer(stream, state);
        }
        if (sync) {
          nextTick(afterWrite, stream, state, finished, cb);
        } else {
          afterWrite(stream, state, finished, cb);
        }
      }
    }
    function afterWrite(stream, state, finished, cb) {
      if (!finished)
        onwriteDrain(stream, state);
      state.pendingcb--;
      cb();
      finishMaybe(stream, state);
    }
    function onwriteDrain(stream, state) {
      if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit("drain");
      }
    }
    function clearBuffer(stream, state) {
      state.bufferProcessing = true;
      var entry = state.bufferedRequest;
      if (stream._writev && entry && entry.next) {
        var l = state.bufferedRequestCount;
        var buffer = new Array(l);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;
        while (entry) {
          buffer[count] = entry;
          entry = entry.next;
          count += 1;
        }
        doWrite(stream, state, true, state.length, buffer, "", holder.finish);
        state.pendingcb++;
        state.lastBufferedRequest = null;
        if (holder.next) {
          state.corkedRequestsFree = holder.next;
          holder.next = null;
        } else {
          state.corkedRequestsFree = new CorkedRequest(state);
        }
      } else {
        while (entry) {
          var chunk = entry.chunk;
          var encoding = entry.encoding;
          var cb = entry.callback;
          var len = state.objectMode ? 1 : chunk.length;
          doWrite(stream, state, false, len, chunk, encoding, cb);
          entry = entry.next;
          if (state.writing) {
            break;
          }
        }
        if (entry === null)
          state.lastBufferedRequest = null;
      }
      state.bufferedRequestCount = 0;
      state.bufferedRequest = entry;
      state.bufferProcessing = false;
    }
    Writable.prototype._write = function(chunk, encoding, cb) {
      cb(new Error("not implemented"));
    };
    Writable.prototype._writev = null;
    Writable.prototype.end = function(chunk, encoding, cb) {
      var state = this._writableState;
      if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (chunk !== null && chunk !== void 0)
        this.write(chunk, encoding);
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
      if (!state.ending && !state.finished)
        endWritable(this, state, cb);
    };
    function needFinish(state) {
      return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
    }
    function prefinish(stream, state) {
      if (!state.prefinished) {
        state.prefinished = true;
        stream.emit("prefinish");
      }
    }
    function finishMaybe(stream, state) {
      var need = needFinish(state);
      if (need) {
        if (state.pendingcb === 0) {
          prefinish(stream, state);
          state.finished = true;
          stream.emit("finish");
        } else {
          prefinish(stream, state);
        }
      }
      return need;
    }
    function endWritable(stream, state, cb) {
      state.ending = true;
      finishMaybe(stream, state);
      if (cb) {
        if (state.finished)
          nextTick(cb);
        else
          stream.once("finish", cb);
      }
      state.ended = true;
      stream.writable = false;
    }
    function CorkedRequest(state) {
      var _this = this;
      this.next = null;
      this.entry = null;
      this.finish = function(err) {
        var entry = _this.entry;
        _this.entry = null;
        while (entry) {
          var cb = entry.callback;
          state.pendingcb--;
          cb(err);
          entry = entry.next;
        }
        if (state.corkedRequestsFree) {
          state.corkedRequestsFree.next = _this;
        } else {
          state.corkedRequestsFree = _this;
        }
      };
    }
    inherits$1(Duplex, Readable);
    var keys2 = Object.keys(Writable.prototype);
    for (var v = 0; v < keys2.length; v++) {
      var method = keys2[v];
      if (!Duplex.prototype[method])
        Duplex.prototype[method] = Writable.prototype[method];
    }
    function Duplex(options) {
      if (!(this instanceof Duplex))
        return new Duplex(options);
      Readable.call(this, options);
      Writable.call(this, options);
      if (options && options.readable === false)
        this.readable = false;
      if (options && options.writable === false)
        this.writable = false;
      this.allowHalfOpen = true;
      if (options && options.allowHalfOpen === false)
        this.allowHalfOpen = false;
      this.once("end", onend);
    }
    function onend() {
      if (this.allowHalfOpen || this._writableState.ended)
        return;
      nextTick(onEndNT, this);
    }
    function onEndNT(self2) {
      self2.end();
    }
    inherits$1(Transform, Duplex);
    function TransformState(stream) {
      this.afterTransform = function(er, data) {
        return afterTransform(stream, er, data);
      };
      this.needTransform = false;
      this.transforming = false;
      this.writecb = null;
      this.writechunk = null;
      this.writeencoding = null;
    }
    function afterTransform(stream, er, data) {
      var ts = stream._transformState;
      ts.transforming = false;
      var cb = ts.writecb;
      if (!cb)
        return stream.emit("error", new Error("no writecb in Transform class"));
      ts.writechunk = null;
      ts.writecb = null;
      if (data !== null && data !== void 0)
        stream.push(data);
      cb(er);
      var rs = stream._readableState;
      rs.reading = false;
      if (rs.needReadable || rs.length < rs.highWaterMark) {
        stream._read(rs.highWaterMark);
      }
    }
    function Transform(options) {
      if (!(this instanceof Transform))
        return new Transform(options);
      Duplex.call(this, options);
      this._transformState = new TransformState(this);
      var stream = this;
      this._readableState.needReadable = true;
      this._readableState.sync = false;
      if (options) {
        if (typeof options.transform === "function")
          this._transform = options.transform;
        if (typeof options.flush === "function")
          this._flush = options.flush;
      }
      this.once("prefinish", function() {
        if (typeof this._flush === "function")
          this._flush(function(er) {
            done(stream, er);
          });
        else
          done(stream);
      });
    }
    Transform.prototype.push = function(chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    };
    Transform.prototype._transform = function(chunk, encoding, cb) {
      throw new Error("Not implemented");
    };
    Transform.prototype._write = function(chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
          this._read(rs.highWaterMark);
      }
    };
    Transform.prototype._read = function(n) {
      var ts = this._transformState;
      if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        ts.needTransform = true;
      }
    };
    function done(stream, er) {
      if (er)
        return stream.emit("error", er);
      var ws = stream._writableState;
      var ts = stream._transformState;
      if (ws.length)
        throw new Error("Calling transform done when ws.length != 0");
      if (ts.transforming)
        throw new Error("Calling transform done when still transforming");
      return stream.push(null);
    }
    inherits$1(PassThrough, Transform);
    function PassThrough(options) {
      if (!(this instanceof PassThrough))
        return new PassThrough(options);
      Transform.call(this, options);
    }
    PassThrough.prototype._transform = function(chunk, encoding, cb) {
      cb(null, chunk);
    };
    inherits$1(Stream, EventEmitter);
    Stream.Readable = Readable;
    Stream.Writable = Writable;
    Stream.Duplex = Duplex;
    Stream.Transform = Transform;
    Stream.PassThrough = PassThrough;
    Stream.Stream = Stream;
    function Stream() {
      EventEmitter.call(this);
    }
    Stream.prototype.pipe = function(dest, options) {
      var source = this;
      function ondata(chunk) {
        if (dest.writable) {
          if (false === dest.write(chunk) && source.pause) {
            source.pause();
          }
        }
      }
      source.on("data", ondata);
      function ondrain() {
        if (source.readable && source.resume) {
          source.resume();
        }
      }
      dest.on("drain", ondrain);
      if (!dest._isStdio && (!options || options.end !== false)) {
        source.on("end", onend2);
        source.on("close", onclose);
      }
      var didOnEnd = false;
      function onend2() {
        if (didOnEnd)
          return;
        didOnEnd = true;
        dest.end();
      }
      function onclose() {
        if (didOnEnd)
          return;
        didOnEnd = true;
        if (typeof dest.destroy === "function")
          dest.destroy();
      }
      function onerror(er) {
        cleanup();
        if (EventEmitter.listenerCount(this, "error") === 0) {
          throw er;
        }
      }
      source.on("error", onerror);
      dest.on("error", onerror);
      function cleanup() {
        source.removeListener("data", ondata);
        dest.removeListener("drain", ondrain);
        source.removeListener("end", onend2);
        source.removeListener("close", onclose);
        source.removeListener("error", onerror);
        dest.removeListener("error", onerror);
        source.removeListener("end", cleanup);
        source.removeListener("close", cleanup);
        dest.removeListener("close", cleanup);
      }
      source.on("end", cleanup);
      source.on("close", cleanup);
      dest.on("close", cleanup);
      dest.emit("pipe", source);
      return dest;
    };
    function _typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _possibleConstructorReturn(self2, call) {
      if (call && (typeof call === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self2);
    }
    function _toArray(arr) {
      return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest();
    }
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++)
          arr2[i] = arr[i];
        return arr2;
      }
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    function _iterableToArray(iter) {
      if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]")
        return Array.from(iter);
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
    var _endianness;
    function endianness() {
      if (typeof _endianness === "undefined") {
        var a = new ArrayBuffer(2);
        var b = new Uint8Array(a);
        var c = new Uint16Array(a);
        b[0] = 1;
        b[1] = 2;
        if (c[0] === 258) {
          _endianness = "BE";
        } else if (c[0] === 513) {
          _endianness = "LE";
        } else {
          throw new Error("unable to figure out endianess");
        }
      }
      return _endianness;
    }
    function hostname() {
      if (typeof global$1.location !== "undefined") {
        return global$1.location.hostname;
      } else
        return "";
    }
    function loadavg() {
      return [];
    }
    function uptime() {
      return 0;
    }
    function freemem() {
      return Number.MAX_VALUE;
    }
    function totalmem() {
      return Number.MAX_VALUE;
    }
    function cpus() {
      return [];
    }
    function type() {
      return "Browser";
    }
    function release() {
      if (typeof global$1.navigator !== "undefined") {
        return global$1.navigator.appVersion;
      }
      return "";
    }
    function networkInterfaces() {
    }
    function getNetworkInterfaces() {
    }
    function tmpDir() {
      return "/tmp";
    }
    var tmpdir = tmpDir;
    var EOL = "\n";
    var os = {
      EOL,
      tmpdir,
      tmpDir,
      networkInterfaces,
      getNetworkInterfaces,
      release,
      type,
      cpus,
      totalmem,
      freemem,
      uptime,
      loadavg,
      hostname,
      endianness
    };
    var commonjsGlobal$1 = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : {};
    var FUNC_ERROR_TEXT = "Expected a function";
    var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
    var INFINITY2 = 1 / 0;
    var funcTag2 = "[object Function]", genTag2 = "[object GeneratorFunction]", symbolTag2 = "[object Symbol]";
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, reLeadingDot = /^\./, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reRegExpChar2 = /[\\^$.*+?()[\]{}|]/g;
    var reEscapeChar = /\\(\\)?/g;
    var reIsHostCtor2 = /^\[object .+?Constructor\]$/;
    var freeGlobal2 = typeof commonjsGlobal$1 == "object" && commonjsGlobal$1 && commonjsGlobal$1.Object === Object && commonjsGlobal$1;
    var freeSelf2 = typeof self == "object" && self && self.Object === Object && self;
    var root2 = freeGlobal2 || freeSelf2 || Function("return this")();
    function getValue2(object, key) {
      return object == null ? void 0 : object[key];
    }
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e) {
        }
      }
      return result;
    }
    var arrayProto2 = Array.prototype, funcProto2 = Function.prototype, objectProto2 = Object.prototype;
    var coreJsData2 = root2["__core-js_shared__"];
    var maskSrcKey2 = function() {
      var uid = /[^.]+$/.exec(coreJsData2 && coreJsData2.keys && coreJsData2.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    var funcToString2 = funcProto2.toString;
    var hasOwnProperty$12 = objectProto2.hasOwnProperty;
    var objectToString$1 = objectProto2.toString;
    var reIsNative2 = RegExp(
      "^" + funcToString2.call(hasOwnProperty$12).replace(reRegExpChar2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    var Symbol$12 = root2.Symbol, splice2 = arrayProto2.splice;
    var Map2 = getNative2(root2, "Map"), nativeCreate2 = getNative2(Object, "create");
    var symbolProto2 = Symbol$12 ? Symbol$12.prototype : void 0, symbolToString = symbolProto2 ? symbolProto2.toString : void 0;
    function Hash2(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear2() {
      this.__data__ = nativeCreate2 ? nativeCreate2(null) : {};
    }
    function hashDelete2(key) {
      return this.has(key) && delete this.__data__[key];
    }
    function hashGet2(key) {
      var data = this.__data__;
      if (nativeCreate2) {
        var result = data[key];
        return result === HASH_UNDEFINED2 ? void 0 : result;
      }
      return hasOwnProperty$12.call(data, key) ? data[key] : void 0;
    }
    function hashHas2(key) {
      var data = this.__data__;
      return nativeCreate2 ? data[key] !== void 0 : hasOwnProperty$12.call(data, key);
    }
    function hashSet2(key, value) {
      var data = this.__data__;
      data[key] = nativeCreate2 && value === void 0 ? HASH_UNDEFINED2 : value;
      return this;
    }
    Hash2.prototype.clear = hashClear2;
    Hash2.prototype["delete"] = hashDelete2;
    Hash2.prototype.get = hashGet2;
    Hash2.prototype.has = hashHas2;
    Hash2.prototype.set = hashSet2;
    function ListCache2(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear2() {
      this.__data__ = [];
    }
    function listCacheDelete2(key) {
      var data = this.__data__, index = assocIndexOf2(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice2.call(data, index, 1);
      }
      return true;
    }
    function listCacheGet2(key) {
      var data = this.__data__, index = assocIndexOf2(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas2(key) {
      return assocIndexOf2(this.__data__, key) > -1;
    }
    function listCacheSet2(key, value) {
      var data = this.__data__, index = assocIndexOf2(data, key);
      if (index < 0) {
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    ListCache2.prototype.clear = listCacheClear2;
    ListCache2.prototype["delete"] = listCacheDelete2;
    ListCache2.prototype.get = listCacheGet2;
    ListCache2.prototype.has = listCacheHas2;
    ListCache2.prototype.set = listCacheSet2;
    function MapCache2(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear2() {
      this.__data__ = {
        "hash": new Hash2(),
        "map": new (Map2 || ListCache2)(),
        "string": new Hash2()
      };
    }
    function mapCacheDelete2(key) {
      return getMapData2(this, key)["delete"](key);
    }
    function mapCacheGet2(key) {
      return getMapData2(this, key).get(key);
    }
    function mapCacheHas2(key) {
      return getMapData2(this, key).has(key);
    }
    function mapCacheSet2(key, value) {
      getMapData2(this, key).set(key, value);
      return this;
    }
    MapCache2.prototype.clear = mapCacheClear2;
    MapCache2.prototype["delete"] = mapCacheDelete2;
    MapCache2.prototype.get = mapCacheGet2;
    MapCache2.prototype.has = mapCacheHas2;
    MapCache2.prototype.set = mapCacheSet2;
    function assocIndexOf2(array, key) {
      var length = array.length;
      while (length--) {
        if (eq2(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    function baseGet(object, path) {
      path = isKey(path, object) ? [path] : castPath(path);
      var index = 0, length = path.length;
      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return index && index == length ? object : void 0;
    }
    function baseIsNative2(value) {
      if (!isObject$1(value) || isMasked2(value)) {
        return false;
      }
      var pattern = isFunction$1(value) || isHostObject(value) ? reIsNative2 : reIsHostCtor2;
      return pattern.test(toSource2(value));
    }
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isSymbol2(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY2 ? "-0" : result;
    }
    function castPath(value) {
      return isArray$2(value) ? value : stringToPath(value);
    }
    function getMapData2(map, key) {
      var data = map.__data__;
      return isKeyable2(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getNative2(object, key) {
      var value = getValue2(object, key);
      return baseIsNative2(value) ? value : void 0;
    }
    function isKey(value, object) {
      if (isArray$2(value)) {
        return false;
      }
      var type2 = typeof value;
      if (type2 == "number" || type2 == "symbol" || type2 == "boolean" || value == null || isSymbol2(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    function isKeyable2(value) {
      var type2 = typeof value;
      return type2 == "string" || type2 == "number" || type2 == "symbol" || type2 == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked2(func) {
      return !!maskSrcKey2 && maskSrcKey2 in func;
    }
    var stringToPath = memoize(function(string) {
      string = toString$1(string);
      var result = [];
      if (reLeadingDot.test(string)) {
        result.push("");
      }
      string.replace(rePropName, function(match, number, quote, string2) {
        result.push(quote ? string2.replace(reEscapeChar, "$1") : number || match);
      });
      return result;
    });
    function toKey(value) {
      if (typeof value == "string" || isSymbol2(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY2 ? "-0" : result;
    }
    function toSource2(func) {
      if (func != null) {
        try {
          return funcToString2.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    function memoize(func, resolver) {
      if (typeof func != "function" || resolver && typeof resolver != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result);
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache2)();
      return memoized;
    }
    memoize.Cache = MapCache2;
    function eq2(value, other) {
      return value === other || value !== value && other !== other;
    }
    var isArray$2 = Array.isArray;
    function isFunction$1(value) {
      var tag = isObject$1(value) ? objectToString$1.call(value) : "";
      return tag == funcTag2 || tag == genTag2;
    }
    function isObject$1(value) {
      var type2 = typeof value;
      return !!value && (type2 == "object" || type2 == "function");
    }
    function isObjectLike2(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol2(value) {
      return typeof value == "symbol" || isObjectLike2(value) && objectToString$1.call(value) == symbolTag2;
    }
    function toString$1(value) {
      return value == null ? "" : baseToString(value);
    }
    function get2(object, path, defaultValue) {
      var result = object == null ? void 0 : baseGet(object, path);
      return result === void 0 ? defaultValue : result;
    }
    var lodash_get = get2;
    function getProp(obj, path, defaultValue) {
      return obj[path] === void 0 ? defaultValue : obj[path];
    }
    function setProp(obj, path, value) {
      var pathArray = Array.isArray(path) ? path : path.split(".");
      var _pathArray = _toArray(pathArray), key = _pathArray[0], restPath = _pathArray.slice(1);
      return _objectSpread({}, obj, _defineProperty({}, key, pathArray.length > 1 ? setProp(obj[key] || {}, restPath, value) : value));
    }
    function unsetProp(obj, path) {
      var pathArray = Array.isArray(path) ? path : path.split(".");
      var _pathArray2 = _toArray(pathArray), key = _pathArray2[0], restPath = _pathArray2.slice(1);
      if (_typeof(obj[key]) !== "object") {
        return obj;
      }
      if (pathArray.length === 1) {
        return Object.keys(obj).filter(function(prop) {
          return prop !== key;
        }).reduce(function(acc, prop) {
          return Object.assign(acc, _defineProperty({}, prop, obj[prop]));
        }, {});
      }
      return Object.keys(obj).reduce(function(acc, prop) {
        return _objectSpread({}, acc, _defineProperty({}, prop, prop !== key ? obj[prop] : unsetProp(obj[key], restPath)));
      }, {});
    }
    function flattenReducer(acc, arr) {
      try {
        acc.push.apply(acc, _toConsumableArray(arr));
        return acc;
      } catch (err) {
        return acc.concat(arr);
      }
    }
    function fastJoin(arr, separator) {
      var isFirst = true;
      return arr.reduce(function(acc, elem) {
        if (elem === null || elem === void 0) {
          elem = "";
        }
        if (isFirst) {
          isFirst = false;
          return "".concat(elem);
        }
        return "".concat(acc).concat(separator).concat(elem);
      }, "");
    }
    var utils = {
      getProp,
      setProp,
      unsetProp,
      fastJoin,
      flattenReducer
    };
    var getProp$1 = utils.getProp, fastJoin$1 = utils.fastJoin, flattenReducer$1 = utils.flattenReducer;
    var JSON2CSVBase = /* @__PURE__ */ function() {
      function JSON2CSVBase2(opts2) {
        _classCallCheck(this, JSON2CSVBase2);
        this.opts = this.preprocessOpts(opts2);
      }
      _createClass(JSON2CSVBase2, [{
        key: "preprocessOpts",
        value: function preprocessOpts(opts2) {
          var processedOpts = Object.assign({}, opts2);
          processedOpts.transforms = !Array.isArray(processedOpts.transforms) ? processedOpts.transforms ? [processedOpts.transforms] : [] : processedOpts.transforms;
          processedOpts.delimiter = processedOpts.delimiter || ",";
          processedOpts.eol = processedOpts.eol || os.EOL;
          processedOpts.quote = typeof processedOpts.quote === "string" ? processedOpts.quote : '"';
          processedOpts.escapedQuote = typeof processedOpts.escapedQuote === "string" ? processedOpts.escapedQuote : "".concat(processedOpts.quote).concat(processedOpts.quote);
          processedOpts.header = processedOpts.header !== false;
          processedOpts.includeEmptyRows = processedOpts.includeEmptyRows || false;
          processedOpts.withBOM = processedOpts.withBOM || false;
          return processedOpts;
        }
        /**
         * Check and normalize the fields configuration.
         *
         * @param {(string|object)[]} fields Fields configuration provided by the user
         * or inferred from the data
         * @returns {object[]} preprocessed FieldsInfo array
         */
      }, {
        key: "preprocessFieldsInfo",
        value: function preprocessFieldsInfo(fields) {
          var _this = this;
          return fields.map(function(fieldInfo) {
            if (typeof fieldInfo === "string") {
              return {
                label: fieldInfo,
                value: fieldInfo.includes(".") || fieldInfo.includes("[") ? function(row) {
                  return lodash_get(row, fieldInfo, _this.opts.defaultValue);
                } : function(row) {
                  return getProp$1(row, fieldInfo, _this.opts.defaultValue);
                }
              };
            }
            if (_typeof(fieldInfo) === "object") {
              var defaultValue = "default" in fieldInfo ? fieldInfo.default : _this.opts.defaultValue;
              if (typeof fieldInfo.value === "string") {
                return {
                  label: fieldInfo.label || fieldInfo.value,
                  value: fieldInfo.value.includes(".") || fieldInfo.value.includes("[") ? function(row) {
                    return lodash_get(row, fieldInfo.value, defaultValue);
                  } : function(row) {
                    return getProp$1(row, fieldInfo.value, defaultValue);
                  }
                };
              }
              if (typeof fieldInfo.value === "function") {
                var label = fieldInfo.label || fieldInfo.value.name || "";
                var field = {
                  label,
                  default: defaultValue
                };
                return {
                  label,
                  value: function value(row) {
                    var value2 = fieldInfo.value(row, field);
                    return value2 === null || value2 === void 0 ? defaultValue : value2;
                  }
                };
              }
            }
            throw new Error("Invalid field info option. " + JSON.stringify(fieldInfo));
          });
        }
        /**
         * Create the title row with all the provided fields as column headings
         *
         * @returns {String} titles as a string
         */
      }, {
        key: "getHeader",
        value: function getHeader() {
          var _this2 = this;
          return fastJoin$1(this.opts.fields.map(function(fieldInfo) {
            return _this2.processValue(fieldInfo.label);
          }), this.opts.delimiter);
        }
        /**
         * Preprocess each object according to the given transforms (unwind, flatten, etc.).
         * @param {Object} row JSON object to be converted in a CSV row
         */
      }, {
        key: "preprocessRow",
        value: function preprocessRow(row) {
          return this.opts.transforms.reduce(function(rows, transform) {
            return rows.map(function(row2) {
              return transform(row2);
            }).reduce(flattenReducer$1, []);
          }, [row]);
        }
        /**
         * Create the content of a specific CSV row
         *
         * @param {Object} row JSON object to be converted in a CSV row
         * @returns {String} CSV string (row)
         */
      }, {
        key: "processRow",
        value: function processRow(row) {
          var _this3 = this;
          if (!row) {
            return void 0;
          }
          var processedRow = this.opts.fields.map(function(fieldInfo) {
            return _this3.processCell(row, fieldInfo);
          });
          if (!this.opts.includeEmptyRows && processedRow.every(function(field) {
            return field === void 0;
          })) {
            return void 0;
          }
          return fastJoin$1(processedRow, this.opts.delimiter);
        }
        /**
         * Create the content of a specfic CSV row cell
         *
         * @param {Object} row JSON object representing the  CSV row that the cell belongs to
         * @param {FieldInfo} fieldInfo Details of the field to process to be a CSV cell
         * @returns {String} CSV string (cell)
         */
      }, {
        key: "processCell",
        value: function processCell(row, fieldInfo) {
          return this.processValue(fieldInfo.value(row));
        }
        /**
         * Create the content of a specfic CSV row cell
         *
         * @param {Any} value Value to be included in a CSV cell
         * @returns {String} Value stringified and processed
         */
      }, {
        key: "processValue",
        value: function processValue(value) {
          if (value === null || value === void 0) {
            return void 0;
          }
          var valueType = _typeof(value);
          if (valueType !== "boolean" && valueType !== "number" && valueType !== "string") {
            value = JSON.stringify(value);
            if (value === void 0) {
              return void 0;
            }
            if (value[0] === '"') {
              value = value.replace(/^"(.+)"$/, "$1");
            }
          }
          if (typeof value === "string") {
            if (this.opts.excelStrings) {
              if (value.includes(this.opts.quote)) {
                value = value.replace(new RegExp(this.opts.quote, "g"), "".concat(this.opts.escapedQuote).concat(this.opts.escapedQuote));
              }
              value = '"=""'.concat(value, '"""');
            } else {
              if (value.includes(this.opts.quote)) {
                value = value.replace(new RegExp(this.opts.quote, "g"), this.opts.escapedQuote);
              }
              value = "".concat(this.opts.quote).concat(value).concat(this.opts.quote);
            }
          }
          return value;
        }
      }]);
      return JSON2CSVBase2;
    }();
    var JSON2CSVBase_1 = JSON2CSVBase;
    var fastJoin$2 = utils.fastJoin, flattenReducer$2 = utils.flattenReducer;
    var JSON2CSVParser = /* @__PURE__ */ function(_JSON2CSVBase) {
      _inherits(JSON2CSVParser2, _JSON2CSVBase);
      function JSON2CSVParser2(opts2) {
        var _this;
        _classCallCheck(this, JSON2CSVParser2);
        _this = _possibleConstructorReturn(this, _getPrototypeOf(JSON2CSVParser2).call(this, opts2));
        if (_this.opts.fields) {
          _this.opts.fields = _this.preprocessFieldsInfo(_this.opts.fields);
        }
        return _this;
      }
      _createClass(JSON2CSVParser2, [{
        key: "parse",
        value: function parse3(data) {
          var processedData = this.preprocessData(data);
          if (!this.opts.fields) {
            this.opts.fields = processedData.reduce(function(fields, item) {
              Object.keys(item).forEach(function(field) {
                if (!fields.includes(field)) {
                  fields.push(field);
                }
              });
              return fields;
            }, []);
            this.opts.fields = this.preprocessFieldsInfo(this.opts.fields);
          }
          var header = this.opts.header ? this.getHeader() : "";
          var rows = this.processData(processedData);
          var csv = (this.opts.withBOM ? "\uFEFF" : "") + header + (header && rows ? this.opts.eol : "") + rows;
          return csv;
        }
        /**
         * Preprocess the data according to the give opts (unwind, flatten, etc.)
          and calculate the fields and field names if they are not provided.
         *
         * @param {Array|Object} data Array or object to be converted to CSV
         */
      }, {
        key: "preprocessData",
        value: function preprocessData(data) {
          var _this2 = this;
          var processedData = Array.isArray(data) ? data : [data];
          if (!this.opts.fields && (processedData.length === 0 || _typeof(processedData[0]) !== "object")) {
            throw new Error('Data should not be empty or the "fields" option should be included');
          }
          if (this.opts.transforms.length === 0)
            return processedData;
          return processedData.map(function(row) {
            return _this2.preprocessRow(row);
          }).reduce(flattenReducer$2, []);
        }
        /**
         * Create the content row by row below the header
         *
         * @param {Array} data Array of JSON objects to be converted to CSV
         * @returns {String} CSV string (body)
         */
      }, {
        key: "processData",
        value: function processData(data) {
          var _this3 = this;
          return fastJoin$2(
            data.map(function(row) {
              return _this3.processRow(row);
            }).filter(function(row) {
              return row;
            }),
            // Filter empty rows
            this.opts.eol
          );
        }
      }]);
      return JSON2CSVParser2;
    }(JSON2CSVBase_1);
    var JSON2CSVParser_1 = JSON2CSVParser;
    var C = {};
    var LEFT_BRACE = C.LEFT_BRACE = 1;
    var RIGHT_BRACE = C.RIGHT_BRACE = 2;
    var LEFT_BRACKET = C.LEFT_BRACKET = 3;
    var RIGHT_BRACKET = C.RIGHT_BRACKET = 4;
    var COLON = C.COLON = 5;
    var COMMA = C.COMMA = 6;
    var TRUE = C.TRUE = 7;
    var FALSE = C.FALSE = 8;
    var NULL = C.NULL = 9;
    var STRING = C.STRING = 10;
    var NUMBER = C.NUMBER = 11;
    var START = C.START = 17;
    var STOP = C.STOP = 18;
    var TRUE1 = C.TRUE1 = 33;
    var TRUE2 = C.TRUE2 = 34;
    var TRUE3 = C.TRUE3 = 35;
    var FALSE1 = C.FALSE1 = 49;
    var FALSE2 = C.FALSE2 = 50;
    var FALSE3 = C.FALSE3 = 51;
    var FALSE4 = C.FALSE4 = 52;
    var NULL1 = C.NULL1 = 65;
    var NULL2 = C.NULL2 = 66;
    var NULL3 = C.NULL3 = 67;
    var NUMBER1 = C.NUMBER1 = 81;
    var NUMBER3 = C.NUMBER3 = 83;
    var STRING1 = C.STRING1 = 97;
    var STRING2 = C.STRING2 = 98;
    var STRING3 = C.STRING3 = 99;
    var STRING4 = C.STRING4 = 100;
    var STRING5 = C.STRING5 = 101;
    var STRING6 = C.STRING6 = 102;
    var VALUE = C.VALUE = 113;
    var KEY = C.KEY = 114;
    var OBJECT = C.OBJECT = 129;
    var ARRAY = C.ARRAY = 130;
    var BACK_SLASH = "\\".charCodeAt(0);
    var FORWARD_SLASH = "/".charCodeAt(0);
    var BACKSPACE = "\b".charCodeAt(0);
    var FORM_FEED = "\f".charCodeAt(0);
    var NEWLINE = "\n".charCodeAt(0);
    var CARRIAGE_RETURN = "\r".charCodeAt(0);
    var TAB = "	".charCodeAt(0);
    var STRING_BUFFER_SIZE = 64 * 1024;
    function Parser() {
      this.tState = START;
      this.value = void 0;
      this.string = void 0;
      this.stringBuffer = Buffer3.alloc ? Buffer3.alloc(STRING_BUFFER_SIZE) : new Buffer3(STRING_BUFFER_SIZE);
      this.stringBufferOffset = 0;
      this.unicode = void 0;
      this.highSurrogate = void 0;
      this.key = void 0;
      this.mode = void 0;
      this.stack = [];
      this.state = VALUE;
      this.bytes_remaining = 0;
      this.bytes_in_sequence = 0;
      this.temp_buffs = { "2": new Buffer3(2), "3": new Buffer3(3), "4": new Buffer3(4) };
      this.offset = -1;
    }
    Parser.toknam = function(code) {
      var keys3 = Object.keys(C);
      for (var i = 0, l = keys3.length; i < l; i++) {
        var key = keys3[i];
        if (C[key] === code) {
          return key;
        }
      }
      return code && "0x" + code.toString(16);
    };
    var proto = Parser.prototype;
    proto.onError = function(err) {
      throw err;
    };
    proto.charError = function(buffer, i) {
      this.tState = STOP;
      this.onError(new Error("Unexpected " + JSON.stringify(String.fromCharCode(buffer[i])) + " at position " + i + " in state " + Parser.toknam(this.tState)));
    };
    proto.appendStringChar = function(char) {
      if (this.stringBufferOffset >= STRING_BUFFER_SIZE) {
        this.string += this.stringBuffer.toString("utf8");
        this.stringBufferOffset = 0;
      }
      this.stringBuffer[this.stringBufferOffset++] = char;
    };
    proto.appendStringBuf = function(buf, start, end) {
      var size = buf.length;
      if (typeof start === "number") {
        if (typeof end === "number") {
          if (end < 0) {
            size = buf.length - start + end;
          } else {
            size = end - start;
          }
        } else {
          size = buf.length - start;
        }
      }
      if (size < 0) {
        size = 0;
      }
      if (this.stringBufferOffset + size > STRING_BUFFER_SIZE) {
        this.string += this.stringBuffer.toString("utf8", 0, this.stringBufferOffset);
        this.stringBufferOffset = 0;
      }
      buf.copy(this.stringBuffer, this.stringBufferOffset, start, end);
      this.stringBufferOffset += size;
    };
    proto.write = function(buffer) {
      if (typeof buffer === "string")
        buffer = new Buffer3(buffer);
      var n;
      for (var i = 0, l = buffer.length; i < l; i++) {
        if (this.tState === START) {
          n = buffer[i];
          this.offset++;
          if (n === 123) {
            this.onToken(LEFT_BRACE, "{");
          } else if (n === 125) {
            this.onToken(RIGHT_BRACE, "}");
          } else if (n === 91) {
            this.onToken(LEFT_BRACKET, "[");
          } else if (n === 93) {
            this.onToken(RIGHT_BRACKET, "]");
          } else if (n === 58) {
            this.onToken(COLON, ":");
          } else if (n === 44) {
            this.onToken(COMMA, ",");
          } else if (n === 116) {
            this.tState = TRUE1;
          } else if (n === 102) {
            this.tState = FALSE1;
          } else if (n === 110) {
            this.tState = NULL1;
          } else if (n === 34) {
            this.string = "";
            this.stringBufferOffset = 0;
            this.tState = STRING1;
          } else if (n === 45) {
            this.string = "-";
            this.tState = NUMBER1;
          } else {
            if (n >= 48 && n < 64) {
              this.string = String.fromCharCode(n);
              this.tState = NUMBER3;
            } else if (n === 32 || n === 9 || n === 10 || n === 13)
              ;
            else {
              return this.charError(buffer, i);
            }
          }
        } else if (this.tState === STRING1) {
          n = buffer[i];
          if (this.bytes_remaining > 0) {
            for (var j = 0; j < this.bytes_remaining; j++) {
              this.temp_buffs[this.bytes_in_sequence][this.bytes_in_sequence - this.bytes_remaining + j] = buffer[j];
            }
            this.appendStringBuf(this.temp_buffs[this.bytes_in_sequence]);
            this.bytes_in_sequence = this.bytes_remaining = 0;
            i = i + j - 1;
          } else if (this.bytes_remaining === 0 && n >= 128) {
            if (n <= 193 || n > 244) {
              return this.onError(new Error("Invalid UTF-8 character at position " + i + " in state " + Parser.toknam(this.tState)));
            }
            if (n >= 194 && n <= 223)
              this.bytes_in_sequence = 2;
            if (n >= 224 && n <= 239)
              this.bytes_in_sequence = 3;
            if (n >= 240 && n <= 244)
              this.bytes_in_sequence = 4;
            if (this.bytes_in_sequence + i > buffer.length) {
              for (var k = 0; k <= buffer.length - 1 - i; k++) {
                this.temp_buffs[this.bytes_in_sequence][k] = buffer[i + k];
              }
              this.bytes_remaining = i + this.bytes_in_sequence - buffer.length;
              i = buffer.length - 1;
            } else {
              this.appendStringBuf(buffer, i, i + this.bytes_in_sequence);
              i = i + this.bytes_in_sequence - 1;
            }
          } else if (n === 34) {
            this.tState = START;
            this.string += this.stringBuffer.toString("utf8", 0, this.stringBufferOffset);
            this.stringBufferOffset = 0;
            this.onToken(STRING, this.string);
            this.offset += Buffer3.byteLength(this.string, "utf8") + 1;
            this.string = void 0;
          } else if (n === 92) {
            this.tState = STRING2;
          } else if (n >= 32) {
            this.appendStringChar(n);
          } else {
            return this.charError(buffer, i);
          }
        } else if (this.tState === STRING2) {
          n = buffer[i];
          if (n === 34) {
            this.appendStringChar(n);
            this.tState = STRING1;
          } else if (n === 92) {
            this.appendStringChar(BACK_SLASH);
            this.tState = STRING1;
          } else if (n === 47) {
            this.appendStringChar(FORWARD_SLASH);
            this.tState = STRING1;
          } else if (n === 98) {
            this.appendStringChar(BACKSPACE);
            this.tState = STRING1;
          } else if (n === 102) {
            this.appendStringChar(FORM_FEED);
            this.tState = STRING1;
          } else if (n === 110) {
            this.appendStringChar(NEWLINE);
            this.tState = STRING1;
          } else if (n === 114) {
            this.appendStringChar(CARRIAGE_RETURN);
            this.tState = STRING1;
          } else if (n === 116) {
            this.appendStringChar(TAB);
            this.tState = STRING1;
          } else if (n === 117) {
            this.unicode = "";
            this.tState = STRING3;
          } else {
            return this.charError(buffer, i);
          }
        } else if (this.tState === STRING3 || this.tState === STRING4 || this.tState === STRING5 || this.tState === STRING6) {
          n = buffer[i];
          if (n >= 48 && n < 64 || n > 64 && n <= 70 || n > 96 && n <= 102) {
            this.unicode += String.fromCharCode(n);
            if (this.tState++ === STRING6) {
              var intVal = parseInt(this.unicode, 16);
              this.unicode = void 0;
              if (this.highSurrogate !== void 0 && intVal >= 56320 && intVal < 57343 + 1) {
                this.appendStringBuf(new Buffer3(String.fromCharCode(this.highSurrogate, intVal)));
                this.highSurrogate = void 0;
              } else if (this.highSurrogate === void 0 && intVal >= 55296 && intVal < 56319 + 1) {
                this.highSurrogate = intVal;
              } else {
                if (this.highSurrogate !== void 0) {
                  this.appendStringBuf(new Buffer3(String.fromCharCode(this.highSurrogate)));
                  this.highSurrogate = void 0;
                }
                this.appendStringBuf(new Buffer3(String.fromCharCode(intVal)));
              }
              this.tState = STRING1;
            }
          } else {
            return this.charError(buffer, i);
          }
        } else if (this.tState === NUMBER1 || this.tState === NUMBER3) {
          n = buffer[i];
          switch (n) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
            case 46:
            case 101:
            case 69:
            case 43:
            case 45:
              this.string += String.fromCharCode(n);
              this.tState = NUMBER3;
              break;
            default:
              this.tState = START;
              var result = Number(this.string);
              if (isNaN(result)) {
                return this.charError(buffer, i);
              }
              if (this.string.match(/[0-9]+/) == this.string && result.toString() != this.string) {
                this.onToken(STRING, this.string);
              } else {
                this.onToken(NUMBER, result);
              }
              this.offset += this.string.length - 1;
              this.string = void 0;
              i--;
              break;
          }
        } else if (this.tState === TRUE1) {
          if (buffer[i] === 114) {
            this.tState = TRUE2;
          } else {
            return this.charError(buffer, i);
          }
        } else if (this.tState === TRUE2) {
          if (buffer[i] === 117) {
            this.tState = TRUE3;
          } else {
            return this.charError(buffer, i);
          }
        } else if (this.tState === TRUE3) {
          if (buffer[i] === 101) {
            this.tState = START;
            this.onToken(TRUE, true);
            this.offset += 3;
          } else {
            return this.charError(buffer, i);
          }
        } else if (this.tState === FALSE1) {
          if (buffer[i] === 97) {
            this.tState = FALSE2;
          } else {
            return this.charError(buffer, i);
          }
        } else if (this.tState === FALSE2) {
          if (buffer[i] === 108) {
            this.tState = FALSE3;
          } else {
            return this.charError(buffer, i);
          }
        } else if (this.tState === FALSE3) {
          if (buffer[i] === 115) {
            this.tState = FALSE4;
          } else {
            return this.charError(buffer, i);
          }
        } else if (this.tState === FALSE4) {
          if (buffer[i] === 101) {
            this.tState = START;
            this.onToken(FALSE, false);
            this.offset += 4;
          } else {
            return this.charError(buffer, i);
          }
        } else if (this.tState === NULL1) {
          if (buffer[i] === 117) {
            this.tState = NULL2;
          } else {
            return this.charError(buffer, i);
          }
        } else if (this.tState === NULL2) {
          if (buffer[i] === 108) {
            this.tState = NULL3;
          } else {
            return this.charError(buffer, i);
          }
        } else if (this.tState === NULL3) {
          if (buffer[i] === 108) {
            this.tState = START;
            this.onToken(NULL, null);
            this.offset += 3;
          } else {
            return this.charError(buffer, i);
          }
        }
      }
    };
    proto.onToken = function(token, value) {
    };
    proto.parseError = function(token, value) {
      this.tState = STOP;
      this.onError(new Error("Unexpected " + Parser.toknam(token) + (value ? "(" + JSON.stringify(value) + ")" : "") + " in state " + Parser.toknam(this.state)));
    };
    proto.push = function() {
      this.stack.push({ value: this.value, key: this.key, mode: this.mode });
    };
    proto.pop = function() {
      var value = this.value;
      var parent = this.stack.pop();
      this.value = parent.value;
      this.key = parent.key;
      this.mode = parent.mode;
      this.emit(value);
      if (!this.mode) {
        this.state = VALUE;
      }
    };
    proto.emit = function(value) {
      if (this.mode) {
        this.state = COMMA;
      }
      this.onValue(value);
    };
    proto.onValue = function(value) {
    };
    proto.onToken = function(token, value) {
      if (this.state === VALUE) {
        if (token === STRING || token === NUMBER || token === TRUE || token === FALSE || token === NULL) {
          if (this.value) {
            this.value[this.key] = value;
          }
          this.emit(value);
        } else if (token === LEFT_BRACE) {
          this.push();
          if (this.value) {
            this.value = this.value[this.key] = {};
          } else {
            this.value = {};
          }
          this.key = void 0;
          this.state = KEY;
          this.mode = OBJECT;
        } else if (token === LEFT_BRACKET) {
          this.push();
          if (this.value) {
            this.value = this.value[this.key] = [];
          } else {
            this.value = [];
          }
          this.key = 0;
          this.mode = ARRAY;
          this.state = VALUE;
        } else if (token === RIGHT_BRACE) {
          if (this.mode === OBJECT) {
            this.pop();
          } else {
            return this.parseError(token, value);
          }
        } else if (token === RIGHT_BRACKET) {
          if (this.mode === ARRAY) {
            this.pop();
          } else {
            return this.parseError(token, value);
          }
        } else {
          return this.parseError(token, value);
        }
      } else if (this.state === KEY) {
        if (token === STRING) {
          this.key = value;
          this.state = COLON;
        } else if (token === RIGHT_BRACE) {
          this.pop();
        } else {
          return this.parseError(token, value);
        }
      } else if (this.state === COLON) {
        if (token === COLON) {
          this.state = VALUE;
        } else {
          return this.parseError(token, value);
        }
      } else if (this.state === COMMA) {
        if (token === COMMA) {
          if (this.mode === ARRAY) {
            this.key++;
            this.state = VALUE;
          } else if (this.mode === OBJECT) {
            this.state = KEY;
          }
        } else if (token === RIGHT_BRACKET && this.mode === ARRAY || token === RIGHT_BRACE && this.mode === OBJECT) {
          this.pop();
        } else {
          return this.parseError(token, value);
        }
      } else {
        return this.parseError(token, value);
      }
    };
    Parser.C = C;
    var jsonparse = Parser;
    var Transform$1 = Stream.Transform;
    var JSON2CSVTransform = /* @__PURE__ */ function(_Transform) {
      _inherits(JSON2CSVTransform2, _Transform);
      function JSON2CSVTransform2(opts2, transformOpts) {
        var _this;
        _classCallCheck(this, JSON2CSVTransform2);
        _this = _possibleConstructorReturn(this, _getPrototypeOf(JSON2CSVTransform2).call(this, transformOpts));
        Object.getOwnPropertyNames(JSON2CSVBase_1.prototype).forEach(function(key) {
          return _this[key] = JSON2CSVBase_1.prototype[key];
        });
        _this.opts = _this.preprocessOpts(opts2);
        _this._data = "";
        _this._hasWritten = false;
        if (_this._readableState.objectMode) {
          _this.initObjectModeParse();
        } else if (_this.opts.ndjson) {
          _this.initNDJSONParse();
        } else {
          _this.initJSONParser();
        }
        if (_this.opts.withBOM) {
          _this.push("\uFEFF");
        }
        if (_this.opts.fields) {
          _this.opts.fields = _this.preprocessFieldsInfo(_this.opts.fields);
          _this.pushHeader();
        }
        return _this;
      }
      _createClass(JSON2CSVTransform2, [{
        key: "initObjectModeParse",
        value: function initObjectModeParse() {
          var transform = this;
          this.parser = {
            write: function write2(line) {
              transform.pushLine(line);
            },
            getPendingData: function getPendingData() {
              return void 0;
            }
          };
        }
        /**
         * Init the transform with a parser to process NDJSON data.
         * It maintains a buffer of received data, parses each line
         * as JSON and send it to `pushLine for processing.
         */
      }, {
        key: "initNDJSONParse",
        value: function initNDJSONParse() {
          var transform = this;
          this.parser = {
            _data: "",
            write: function write2(chunk) {
              this._data += chunk.toString();
              var lines = this._data.split("\n").map(function(line) {
                return line.trim();
              }).filter(function(line) {
                return line !== "";
              });
              var pendingData = false;
              lines.forEach(function(line, i) {
                try {
                  transform.pushLine(JSON.parse(line));
                } catch (e) {
                  if (i === lines.length - 1) {
                    pendingData = true;
                  } else {
                    e.message = "Invalid JSON (".concat(line, ")");
                    transform.emit("error", e);
                  }
                }
              });
              this._data = pendingData ? this._data.slice(this._data.lastIndexOf("\n")) : "";
            },
            getPendingData: function getPendingData() {
              return this._data;
            }
          };
        }
        /**
         * Init the transform with a parser to process JSON data.
         * It maintains a buffer of received data, parses each as JSON 
         * item if the data is an array or the data itself otherwise
         * and send it to `pushLine` for processing.
         */
      }, {
        key: "initJSONParser",
        value: function initJSONParser() {
          var transform = this;
          this.parser = new jsonparse();
          this.parser.onValue = function(value) {
            if (this.stack.length !== this.depthToEmit)
              return;
            transform.pushLine(value);
          };
          this.parser._onToken = this.parser.onToken;
          this.parser.onToken = function(token, value) {
            transform.parser._onToken(token, value);
            if (this.stack.length === 0 && !transform.opts.fields && this.mode !== jsonparse.C.ARRAY && this.mode !== jsonparse.C.OBJECT) {
              this.onError(new Error('Data should not be empty or the "fields" option should be included'));
            }
            if (this.stack.length === 1) {
              if (this.depthToEmit === void 0) {
                this.depthToEmit = this.mode === jsonparse.C.ARRAY ? 1 : 0;
              }
              if (this.depthToEmit !== 0 && this.stack.length === 1) {
                this.value = void 0;
              }
            }
          };
          this.parser.getPendingData = function() {
            return this.value;
          };
          this.parser.onError = function(err) {
            if (err.message.includes("Unexpected")) {
              err.message = "Invalid JSON (".concat(err.message, ")");
            }
            transform.emit("error", err);
          };
        }
        /**
         * Main function that send data to the parse to be processed.
         *
         * @param {Buffer} chunk Incoming data
         * @param {String} encoding Encoding of the incoming data. Defaults to 'utf8'
         * @param {Function} done Called when the proceesing of the supplied chunk is done
         */
      }, {
        key: "_transform",
        value: function _transform(chunk, encoding, done2) {
          this.parser.write(chunk);
          done2();
        }
      }, {
        key: "_flush",
        value: function _flush(done2) {
          if (this.parser.getPendingData()) {
            done2(new Error("Invalid data received from stdin", this.parser.getPendingData()));
          }
          done2();
        }
        /**
         * Generate the csv header and pushes it downstream.
         */
      }, {
        key: "pushHeader",
        value: function pushHeader() {
          if (this.opts.header) {
            var header = this.getHeader();
            this.emit("header", header);
            this.push(header);
            this._hasWritten = true;
          }
        }
        /**
         * Transforms an incoming json data to csv and pushes it downstream.
         *
         * @param {Object} data JSON object to be converted in a CSV row
         */
      }, {
        key: "pushLine",
        value: function pushLine(data) {
          var _this2 = this;
          var processedData = this.preprocessRow(data);
          if (!this._hasWritten) {
            this.opts.fields = this.opts.fields || this.preprocessFieldsInfo(Object.keys(processedData[0]));
            this.pushHeader();
          }
          processedData.forEach(function(row) {
            var line = _this2.processRow(row, _this2.opts);
            if (line === void 0)
              return;
            _this2.emit("line", line);
            _this2.push(_this2._hasWritten ? _this2.opts.eol + line : line);
            _this2._hasWritten = true;
          });
        }
      }]);
      return JSON2CSVTransform2;
    }(Transform$1);
    var JSON2CSVTransform_1 = JSON2CSVTransform;
    var Transform$2 = Stream.Transform;
    var fastJoin$3 = utils.fastJoin;
    var JSON2CSVAsyncParser = /* @__PURE__ */ function() {
      function JSON2CSVAsyncParser2(opts2, transformOpts) {
        _classCallCheck(this, JSON2CSVAsyncParser2);
        this.input = new Transform$2(transformOpts);
        this.input._read = function() {
        };
        this.transform = new JSON2CSVTransform_1(opts2, transformOpts);
        this.processor = this.input.pipe(this.transform);
      }
      _createClass(JSON2CSVAsyncParser2, [{
        key: "fromInput",
        value: function fromInput(input) {
          if (this._input) {
            throw new Error("Async parser already has an input.");
          }
          this._input = input;
          this.input = this._input.pipe(this.processor);
          return this;
        }
      }, {
        key: "throughTransform",
        value: function throughTransform(transform) {
          if (this._output) {
            throw new Error("Can't add transforms once an output has been added.");
          }
          this.processor = this.processor.pipe(transform);
          return this;
        }
      }, {
        key: "toOutput",
        value: function toOutput(output) {
          if (this._output) {
            throw new Error("Async parser already has an output.");
          }
          this._output = output;
          this.processor = this.processor.pipe(output);
          return this;
        }
      }, {
        key: "promise",
        value: function promise() {
          var _this = this;
          var returnCSV = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
          return new Promise(function(resolve2, reject) {
            if (!returnCSV) {
              _this.processor.on("finish", function() {
                return resolve2();
              }).on("error", function(err) {
                return reject(err);
              });
              return;
            }
            var csvBuffer = [];
            _this.processor.on("data", function(chunk) {
              return csvBuffer.push(chunk.toString());
            }).on("finish", function() {
              return resolve2(fastJoin$3(csvBuffer, ""));
            }).on("error", function(err) {
              return reject(err);
            });
          });
        }
      }]);
      return JSON2CSVAsyncParser2;
    }();
    var JSON2CSVAsyncParser_1 = JSON2CSVAsyncParser;
    function flatten() {
      var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref$objects = _ref.objects, objects = _ref$objects === void 0 ? true : _ref$objects, _ref$arrays = _ref.arrays, arrays = _ref$arrays === void 0 ? false : _ref$arrays, _ref$separator = _ref.separator, separator = _ref$separator === void 0 ? "." : _ref$separator;
      function step(obj, flatDataRow, currentPath) {
        Object.keys(obj).forEach(function(key) {
          var newPath = currentPath ? "".concat(currentPath).concat(separator).concat(key) : key;
          var value = obj[key];
          if (objects && _typeof(value) === "object" && value !== null && !Array.isArray(value) && Object.prototype.toString.call(value.toJSON) !== "[object Function]" && Object.keys(value).length) {
            step(value, flatDataRow, newPath);
            return;
          }
          if (arrays && Array.isArray(value)) {
            step(value, flatDataRow, newPath);
            return;
          }
          flatDataRow[newPath] = value;
        });
        return flatDataRow;
      }
      return function(dataRow) {
        return step(dataRow, {});
      };
    }
    var flatten_1 = flatten;
    var setProp$1 = utils.setProp, unsetProp$1 = utils.unsetProp, flattenReducer$3 = utils.flattenReducer;
    function getUnwindablePaths(obj, currentPath) {
      return Object.keys(obj).reduce(function(unwindablePaths, key) {
        var newPath = currentPath ? "".concat(currentPath, ".").concat(key) : key;
        var value = obj[key];
        if (_typeof(value) === "object" && value !== null && !Array.isArray(value) && Object.prototype.toString.call(value.toJSON) !== "[object Function]" && Object.keys(value).length) {
          unwindablePaths = unwindablePaths.concat(getUnwindablePaths(value, newPath));
        } else if (Array.isArray(value)) {
          unwindablePaths.push(newPath);
          unwindablePaths = unwindablePaths.concat(value.map(function(arrObj) {
            return getUnwindablePaths(arrObj, newPath);
          }).reduce(flattenReducer$3, []).filter(function(item, index, arr) {
            return arr.indexOf(item) !== index;
          }));
        }
        return unwindablePaths;
      }, []);
    }
    function unwind() {
      var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref$paths = _ref.paths, paths = _ref$paths === void 0 ? void 0 : _ref$paths, _ref$blankOut = _ref.blankOut, blankOut = _ref$blankOut === void 0 ? false : _ref$blankOut;
      function unwindReducer(rows, unwindPath) {
        return rows.map(function(row) {
          var unwindArray = lodash_get(row, unwindPath);
          if (!Array.isArray(unwindArray)) {
            return row;
          }
          if (!unwindArray.length) {
            return unsetProp$1(row, unwindPath);
          }
          return unwindArray.map(function(unwindRow, index) {
            var clonedRow = blankOut && index > 0 ? {} : row;
            return setProp$1(clonedRow, unwindPath, unwindRow);
          });
        }).reduce(flattenReducer$3, []);
      }
      paths = Array.isArray(paths) ? paths : paths ? [paths] : void 0;
      return function(dataRow) {
        return (paths || getUnwindablePaths(dataRow)).reduce(unwindReducer, [dataRow]);
      };
    }
    var unwind_1 = unwind;
    var Readable$1 = Stream.Readable;
    var Parser$1 = JSON2CSVParser_1;
    var AsyncParser = JSON2CSVAsyncParser_1;
    var Transform$3 = JSON2CSVTransform_1;
    var parse2 = function parse3(data, opts2) {
      return new JSON2CSVParser_1(opts2).parse(data);
    };
    var parseAsync = function parseAsync2(data, opts2, transformOpts) {
      try {
        if (!(data instanceof Readable$1)) {
          transformOpts = Object.assign({}, transformOpts, {
            objectMode: true
          });
        }
        var asyncParser = new JSON2CSVAsyncParser_1(opts2, transformOpts);
        var promise = asyncParser.promise();
        if (Array.isArray(data)) {
          data.forEach(function(item) {
            return asyncParser.input.push(item);
          });
          asyncParser.input.push(null);
        } else if (data instanceof Readable$1) {
          asyncParser.fromInput(data);
        } else {
          asyncParser.input.push(data);
          asyncParser.input.push(null);
        }
        return promise;
      } catch (err) {
        return Promise.reject(err);
      }
    };
    var transforms = {
      flatten: flatten_1,
      unwind: unwind_1
    };
    var json2csv = {
      Parser: Parser$1,
      AsyncParser,
      Transform: Transform$3,
      parse: parse2,
      parseAsync,
      transforms
    };
    exports3.AsyncParser = AsyncParser;
    exports3.Parser = Parser$1;
    exports3.Transform = Transform$3;
    exports3.default = json2csv;
    exports3.parse = parse2;
    exports3.parseAsync = parseAsync;
    exports3.transforms = transforms;
    Object.defineProperty(exports3, "__esModule", { value: true });
  });
})(json2csv_umd, json2csv_umd.exports);
class InternMap extends Map {
  constructor(entries, key = keyof) {
    super();
    Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: key } });
    if (entries != null)
      for (const [key2, value] of entries)
        this.set(key2, value);
  }
  get(key) {
    return super.get(intern_get(this, key));
  }
  has(key) {
    return super.has(intern_get(this, key));
  }
  set(key, value) {
    return super.set(intern_set(this, key), value);
  }
  delete(key) {
    return super.delete(intern_delete(this, key));
  }
}
function intern_get({ _intern, _key }, value) {
  const key = _key(value);
  return _intern.has(key) ? _intern.get(key) : value;
}
function intern_set({ _intern, _key }, value) {
  const key = _key(value);
  if (_intern.has(key))
    return _intern.get(key);
  _intern.set(key, value);
  return value;
}
function intern_delete({ _intern, _key }, value) {
  const key = _key(value);
  if (_intern.has(key)) {
    value = _intern.get(key);
    _intern.delete(key);
  }
  return value;
}
function keyof(value) {
  return value !== null && typeof value === "object" ? value.valueOf() : value;
}
function dataToCellSetsTree(data, options) {
  const [cellNames, cellSets, cellSetScores] = data;
  const cellSetsTree = treeInitialize(SETS_DATATYPE_OBS);
  cellSets.forEach((cellSetIds, j) => {
    const { name } = options[j];
    let levelZeroNode = {
      name,
      children: []
    };
    if (cellSetIds.length > 0 && Array.isArray(cellSetIds[0])) {
      const levelSets = new InternMap([], JSON.stringify);
      cellNames[j].forEach((id, i) => {
        const classes = cellSetIds.map((col) => col[i]);
        if (levelSets.has(classes)) {
          levelSets.get(classes).push([id, null]);
        } else {
          levelSets.set(classes, [[id, null]]);
        }
      });
      const levels = Array.from(levelSets.keys());
      const getNextLevelNames = (levelSuffixes) => {
        const nextLevelNames = Array.from(new Set(levelSuffixes.map((l) => l[0])));
        return nextLevelNames.sort((a, b) => a.localeCompare(b));
      };
      const getNode = (parentLevelPrefixes, currLevelName, childLevelSuffixes) => {
        const isLeaf = childLevelSuffixes.length === 0;
        const resultNode = {
          name: currLevelName
        };
        if (isLeaf) {
          resultNode.set = levelSets.get([...parentLevelPrefixes, currLevelName]);
        } else {
          const shouldBeLeaf = childLevelSuffixes.length === 1 && currLevelName === childLevelSuffixes[0][childLevelSuffixes[0].length - 1];
          if (shouldBeLeaf) {
            resultNode.set = levelSets.get([...parentLevelPrefixes, currLevelName, ...childLevelSuffixes[0]]);
          } else {
            const nextLevelNames = getNextLevelNames(childLevelSuffixes);
            resultNode.children = nextLevelNames.map((nextLevelName) => getNode([...parentLevelPrefixes, currLevelName], nextLevelName, childLevelSuffixes.filter((l) => l[0] === nextLevelName).map((l) => l.slice(1)).filter((v) => v.length > 0)));
          }
        }
        return resultNode;
      };
      const levelOneNodes = getNextLevelNames(levels).map((levelOneName) => getNode([], levelOneName, levels.filter((l) => l[0] === levelOneName).map((l) => l.slice(1))));
      levelZeroNode.children = levelOneNodes;
    } else {
      const uniqueCellSetIds = Array.from(new Set(cellSetIds)).sort();
      const clusters = {};
      uniqueCellSetIds.forEach((id) => clusters[id] = { name: id, set: [] });
      if (cellSetScores[j]) {
        cellSetIds.forEach((id, i) => clusters[id].set.push([cellNames[j][i], cellSetScores[j][i]]));
      } else {
        cellSetIds.forEach((id, i) => clusters[id].set.push([cellNames[j][i], null]));
      }
      Object.values(clusters).forEach(
        // eslint-disable-next-line no-return-assign
        (cluster) => levelZeroNode = nodeAppendChild(levelZeroNode, cluster)
      );
    }
    cellSetsTree.tree.push(levelZeroNode);
  });
  return cellSetsTree;
}
const schemeRdBu = [[103, 0, 31], [178, 24, 43], [214, 96, 77], [244, 165, 130], [253, 219, 199], [247, 247, 247], [209, 229, 240], [146, 197, 222], [67, 147, 195], [33, 102, 172], [5, 48, 97]];
const schemePlasma = [[13, 8, 135], [16, 7, 136], [19, 7, 137], [22, 7, 138], [25, 6, 140], [27, 6, 141], [29, 6, 142], [32, 6, 143], [34, 6, 144], [36, 6, 145], [38, 5, 145], [40, 5, 146], [42, 5, 147], [44, 5, 148], [46, 5, 149], [47, 5, 150], [49, 5, 151], [51, 5, 151], [53, 4, 152], [55, 4, 153], [56, 4, 154], [58, 4, 154], [60, 4, 155], [62, 4, 156], [63, 4, 156], [65, 4, 157], [67, 3, 158], [68, 3, 158], [70, 3, 159], [72, 3, 159], [73, 3, 160], [75, 3, 161], [76, 2, 161], [78, 2, 162], [80, 2, 162], [81, 2, 163], [83, 2, 163], [85, 2, 164], [86, 1, 164], [88, 1, 164], [89, 1, 165], [91, 1, 165], [92, 1, 166], [94, 1, 166], [96, 1, 166], [97, 0, 167], [99, 0, 167], [100, 0, 167], [102, 0, 167], [103, 0, 168], [105, 0, 168], [106, 0, 168], [108, 0, 168], [110, 0, 168], [111, 0, 168], [113, 0, 168], [114, 1, 168], [116, 1, 168], [117, 1, 168], [119, 1, 168], [120, 1, 168], [122, 2, 168], [123, 2, 168], [125, 3, 168], [126, 3, 168], [128, 4, 168], [129, 4, 167], [131, 5, 167], [132, 5, 167], [134, 6, 166], [135, 7, 166], [136, 8, 166], [138, 9, 165], [139, 10, 165], [141, 11, 165], [142, 12, 164], [143, 13, 164], [145, 14, 163], [146, 15, 163], [148, 16, 162], [149, 17, 161], [150, 19, 161], [152, 20, 160], [153, 21, 159], [154, 22, 159], [156, 23, 158], [157, 24, 157], [158, 25, 157], [160, 26, 156], [161, 27, 155], [162, 29, 154], [163, 30, 154], [165, 31, 153], [166, 32, 152], [167, 33, 151], [168, 34, 150], [170, 35, 149], [171, 36, 148], [172, 38, 148], [173, 39, 147], [174, 40, 146], [176, 41, 145], [177, 42, 144], [178, 43, 143], [179, 44, 142], [180, 46, 141], [181, 47, 140], [182, 48, 139], [183, 49, 138], [184, 50, 137], [186, 51, 136], [187, 52, 136], [188, 53, 135], [189, 55, 134], [190, 56, 133], [191, 57, 132], [192, 58, 131], [193, 59, 130], [194, 60, 129], [195, 61, 128], [196, 62, 127], [197, 64, 126], [198, 65, 125], [199, 66, 124], [200, 67, 123], [201, 68, 122], [202, 69, 122], [203, 70, 121], [204, 71, 120], [204, 73, 119], [205, 74, 118], [206, 75, 117], [207, 76, 116], [208, 77, 115], [209, 78, 114], [210, 79, 113], [211, 81, 113], [212, 82, 112], [213, 83, 111], [213, 84, 110], [214, 85, 109], [215, 86, 108], [216, 87, 107], [217, 88, 106], [218, 90, 106], [218, 91, 105], [219, 92, 104], [220, 93, 103], [221, 94, 102], [222, 95, 101], [222, 97, 100], [223, 98, 99], [224, 99, 99], [225, 100, 98], [226, 101, 97], [226, 102, 96], [227, 104, 95], [228, 105, 94], [229, 106, 93], [229, 107, 93], [230, 108, 92], [231, 110, 91], [231, 111, 90], [232, 112, 89], [233, 113, 88], [233, 114, 87], [234, 116, 87], [235, 117, 86], [235, 118, 85], [236, 119, 84], [237, 121, 83], [237, 122, 82], [238, 123, 81], [239, 124, 81], [239, 126, 80], [240, 127, 79], [240, 128, 78], [241, 129, 77], [241, 131, 76], [242, 132, 75], [243, 133, 75], [243, 135, 74], [244, 136, 73], [244, 137, 72], [245, 139, 71], [245, 140, 70], [246, 141, 69], [246, 143, 68], [247, 144, 68], [247, 145, 67], [247, 147, 66], [248, 148, 65], [248, 149, 64], [249, 151, 63], [249, 152, 62], [249, 154, 62], [250, 155, 61], [250, 156, 60], [250, 158, 59], [251, 159, 58], [251, 161, 57], [251, 162, 56], [252, 163, 56], [252, 165, 55], [252, 166, 54], [252, 168, 53], [252, 169, 52], [253, 171, 51], [253, 172, 51], [253, 174, 50], [253, 175, 49], [253, 177, 48], [253, 178, 47], [253, 180, 47], [253, 181, 46], [254, 183, 45], [254, 184, 44], [254, 186, 44], [254, 187, 43], [254, 189, 42], [254, 190, 42], [254, 192, 41], [253, 194, 41], [253, 195, 40], [253, 197, 39], [253, 198, 39], [253, 200, 39], [253, 202, 38], [253, 203, 38], [252, 205, 37], [252, 206, 37], [252, 208, 37], [252, 210, 37], [251, 211, 36], [251, 213, 36], [251, 215, 36], [250, 216, 36], [250, 218, 36], [249, 220, 36], [249, 221, 37], [248, 223, 37], [248, 225, 37], [247, 226, 37], [247, 228, 37], [246, 230, 38], [246, 232, 38], [245, 233, 38], [245, 235, 39], [244, 237, 39], [243, 238, 39], [243, 240, 39], [242, 242, 39], [241, 244, 38], [241, 245, 37], [240, 247, 36], [240, 249, 33]];
function rgbSpline(spline) {
  return (colors) => {
    const n = colors.length;
    const r = new Array(n);
    const g = new Array(n);
    const b = new Array(n);
    let i;
    let color;
    for (i = 0; i < n; ++i) {
      color = [colors[i][0], colors[i][1], colors[i][2]];
      r[i] = color[0] || 0;
      g[i] = color[1] || 0;
      b[i] = color[2] || 0;
    }
    const rFunc = spline(r);
    const gFunc = spline(g);
    const bFunc = spline(b);
    return (t2) => [rFunc(t2), gFunc(t2), bFunc(t2)];
  };
}
function basis(values) {
  function innerBasis(t1, v0, v1, v2, v3) {
    const t2 = t1 * t1;
    const t3 = t2 * t1;
    return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
  }
  const n = values.length - 1;
  return (t2) => {
    const i = t2 <= 0 ? t2 = 0 : t2 >= 1 ? (t2 = 1, n - 1) : Math.floor(t2 * n);
    const v1 = values[i];
    const v2 = values[i + 1];
    const v0 = i > 0 ? values[i - 1] : 2 * v1 - v2;
    const v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return innerBasis((t2 - i / n) * n, v0, v1, v2, v3);
  };
}
const interpolateRgbBasis = rgbSpline(basis);
function interpolateSequentialMulti(range2) {
  const n = range2.length;
  return (t2) => range2[Math.max(0, Math.min(n - 1, Math.floor(t2 * n)))];
}
interpolateRgbBasis(schemeRdBu);
interpolateSequentialMulti(schemePlasma);
class ObsSetsAnndataLoader extends AbstractTwoStepLoader {
  constructor(dataSource, params) {
    super(dataSource, params);
    this.region = null;
    this.tablePath = null;
  }
  loadObsIndices() {
    var _a2;
    const { options } = this;
    const obsIndexPromises = (_a2 = options.obsSets) == null ? void 0 : _a2.map(({ path }) => path).map((pathOrPaths) => {
      if (Array.isArray(pathOrPaths)) {
        if (pathOrPaths.length > 0) {
          return this.dataSource.loadObsIndex(pathOrPaths[0]);
        }
        return this.dataSource.loadObsIndex();
      }
      return this.dataSource.loadObsIndex(pathOrPaths);
    });
    return Promise.all(obsIndexPromises);
  }
  loadCellSetIds() {
    var _a2;
    const { options } = this;
    const cellSetZarrLocation = (_a2 = options.obsSets) == null ? void 0 : _a2.map(({ path }) => path);
    return this.dataSource.loadObsColumns(cellSetZarrLocation);
  }
  loadCellSetScores() {
    var _a2;
    const { options } = this;
    const cellSetScoreZarrLocation = (_a2 = options.obsSets) == null ? void 0 : _a2.map((option) => option.scorePath || void 0);
    return this.dataSource.loadObsColumns(cellSetScoreZarrLocation);
  }
  async load() {
    const superResult = await super.load().catch((reason) => Promise.resolve(reason));
    if (superResult instanceof AbstractLoaderError) {
      return Promise.reject(superResult);
    }
    if (!this.cachedResult) {
      const { options } = this;
      this.cachedResult = Promise.all([
        this.dataSource.loadObsIndex(this.tablePath),
        this.loadObsIndices(),
        this.loadCellSetIds(),
        this.loadCellSetScores()
      ]).then((data) => [data[0], dataToCellSetsTree([data[1], data[2], data[3]], options.obsSets)]);
    }
    const [obsIndex, obsSets] = await this.cachedResult;
    const obsSetsMembership = treeToMembershipMap(obsSets);
    const coordinationValues = {};
    const { tree } = obsSets;
    const newAutoSetSelectionParentName = tree[0].name;
    const newAutoSetSelections = tree[0].children.map((node) => [
      newAutoSetSelectionParentName,
      node.name
    ]);
    const newAutoSetColors = initializeCellSetColor(obsSets, []);
    coordinationValues.obsSetSelection = newAutoSetSelections;
    coordinationValues.obsSetColor = newAutoSetColors;
    return Promise.resolve(
      new LoaderResult({ obsIndex, obsSets, obsSetsMembership }, null, coordinationValues)
    );
  }
}
class ObsLabelsAnndataLoader extends AbstractTwoStepLoader {
  /**
   * Class method for loading observation string labels.
   * @returns {Promise} A promise for the array.
   */
  async loadLabels() {
    const { path } = this.options;
    if (this.labels) {
      return this.labels;
    }
    if (!this.labels) {
      this.labels = await this.dataSource._loadColumn(path);
      return this.labels;
    }
    this.labels = Promise.resolve(null);
    return this.labels;
  }
  async load() {
    const { path } = this.options;
    const superResult = await super.load().catch((reason) => Promise.resolve(reason));
    if (superResult instanceof AbstractLoaderError) {
      return Promise.reject(superResult);
    }
    return Promise.all([
      this.dataSource.loadObsIndex(path),
      this.loadLabels()
    ]).then(([obsIndex, obsLabels]) => Promise.resolve(new LoaderResult(
      { obsIndex, obsLabels },
      null
    )));
  }
}
class FeatureLabelsAnndataLoader extends AbstractTwoStepLoader {
  /**
   * Class method for loading feature string labels.
   * @returns {Promise<string[]>} A promise for the array.
   */
  async loadLabels() {
    const { path } = this.options;
    if (this.labels) {
      return this.labels;
    }
    if (!this.labels) {
      this.labels = this.dataSource._loadColumn(path);
      return this.labels;
    }
    return this.labels;
  }
  /**
   *
   * @returns {Promise<LoaderResult<FeatureLabelsData>>}
   */
  async load() {
    const { path } = this.options;
    const superResult = await super.load().catch((reason) => Promise.resolve(reason));
    if (superResult instanceof AbstractLoaderError) {
      return Promise.reject(superResult);
    }
    return Promise.all([
      // Pass in the obsEmbedding path,
      // to handle the MuData case where the obsIndex is located at
      // `mod/rna/index` rather than `index`.
      this.dataSource.loadVarIndex(path),
      this.loadLabels()
    ]).then(([featureIndex, featureLabels]) => Promise.resolve(new LoaderResult(
      {
        featureIndex,
        featureLabels,
        featureLabelsMap: new Map(featureIndex.map((key, i) => [key, featureLabels == null ? void 0 : featureLabels[i]]))
      },
      null
    )));
  }
}
class ObsFeatureColumnsAnndataLoader extends AbstractTwoStepLoader {
  /**
   * Class method for loading embedding coordinates, such as those from UMAP or t-SNE.
   * @returns {Promise} A promise for an array of columns.
   */
  async loadObsFeatureColumns() {
    var _a2;
    const { options } = this;
    if (this.obsFeatureColumns) {
      return this.obsFeatureColumns;
    }
    if (!this.obsFeatureColumns) {
      const colPaths = (_a2 = options.obsFeatureColumns) == null ? void 0 : _a2.map(({ path }) => path);
      const firstPath = colPaths[0];
      const obsIndex = await this.dataSource.loadObsIndex(firstPath);
      const featureIndex = colPaths.map((colPath) => basename(colPath));
      const shape = [obsIndex.length, featureIndex.length];
      const out = new Float32Array(shape[0] * shape[1]);
      const data = await Promise.all(
        colPaths.map((colPath) => this.dataSource.loadNumeric(colPath))
      );
      data.forEach((colData, featureI) => {
        obsIndex.forEach((obsId, obsI) => {
          out[obsI * shape[1] + featureI] = colData.data[obsI];
        });
      });
      const obsFeatureMatrix = { data: out };
      this.obsFeatureColumns = { obsIndex, featureIndex, obsFeatureMatrix };
      return this.obsFeatureColumns;
    }
    this.obsFeatureColumns = Promise.resolve(null);
    return this.obsFeatureColumns;
  }
  async load() {
    const superResult = await super.load().catch((reason) => Promise.resolve(reason));
    if (superResult instanceof AbstractLoaderError) {
      return Promise.reject(superResult);
    }
    return Promise.all([
      this.loadObsFeatureColumns()
    ]).then(([{ obsIndex, obsFeatureMatrix, featureIndex }]) => Promise.resolve(new LoaderResult(
      { obsIndex, obsFeatureMatrix, featureIndex },
      null
    )));
  }
}
class SampleEdgesAnndataLoader extends AbstractTwoStepLoader {
  /**
     * Class method for loading observation string labels.
     * @returns {Promise} A promise for the array.
     */
  async loadLabels() {
    const { path } = this.options;
    if (this.labels) {
      return this.labels;
    }
    if (!this.labels) {
      this.labels = await this.dataSource._loadColumn(path);
      return this.labels;
    }
    this.labels = Promise.resolve(null);
    return this.labels;
  }
  async load() {
    const { path } = this.options;
    const superResult = await super.load().catch((reason) => Promise.resolve(reason));
    if (superResult instanceof AbstractLoaderError) {
      return Promise.reject(superResult);
    }
    return Promise.all([
      this.dataSource.loadObsIndex(path),
      this.loadLabels()
    ]).then(([obsIndex, sampleIds]) => {
      const sampleEdges = new Map(obsIndex.map((obsId, i) => [obsId, sampleIds[i]]));
      return Promise.resolve(new LoaderResult(
        { sampleEdges },
        null
      ));
    });
  }
}
class SampleSetsAnndataLoader extends AbstractTwoStepLoader {
  loadObsIndices() {
    var _a2;
    const { options } = this;
    const obsIndexPromises = (_a2 = options.sampleSets) == null ? void 0 : _a2.map(({ path }) => path).map((pathOrPaths) => {
      if (Array.isArray(pathOrPaths)) {
        if (pathOrPaths.length > 0) {
          return this.dataSource.loadDataFrameIndex(pathOrPaths[0]);
        }
        return this.dataSource.loadDataFrameIndex();
      }
      return this.dataSource.loadDataFrameIndex(pathOrPaths);
    });
    return Promise.all(obsIndexPromises);
  }
  loadCellSetIds() {
    var _a2;
    const { options } = this;
    const cellSetZarrLocation = (_a2 = options.sampleSets) == null ? void 0 : _a2.map(({ path }) => path);
    return this.dataSource.loadObsColumns(cellSetZarrLocation);
  }
  loadCellSetScores() {
    var _a2;
    const { options } = this;
    const cellSetScoreZarrLocation = (_a2 = options.sampleSets) == null ? void 0 : _a2.map((option) => option.scorePath || void 0);
    return this.dataSource.loadObsColumns(cellSetScoreZarrLocation);
  }
  async load() {
    const superResult = await super.load().catch((reason) => Promise.resolve(reason));
    if (superResult instanceof AbstractLoaderError) {
      return Promise.reject(superResult);
    }
    if (!this.cachedResult) {
      const { options } = this;
      this.cachedResult = Promise.all([
        this.dataSource.loadDataFrameIndex(),
        this.loadObsIndices(),
        this.loadCellSetIds(),
        this.loadCellSetScores()
      ]).then((data) => [
        data[0],
        dataToCellSetsTree([data[1], data[2], data[3]], options.sampleSets)
      ]);
    }
    const [obsIndex, obsSets] = await this.cachedResult;
    const obsSetsMembership = treeToMembershipMap(obsSets);
    const coordinationValues = {};
    const { tree } = obsSets;
    const newAutoSetSelectionParentName = tree[0].name;
    tree[0].children.map((node) => [
      newAutoSetSelectionParentName,
      node.name
    ]);
    const newAutoSetColors = initializeCellSetColor(obsSets, []);
    coordinationValues.sampleSetColor = newAutoSetColors;
    return Promise.resolve(
      new LoaderResult({
        sampleIndex: obsIndex,
        sampleSets: obsSets,
        sampleSetsMembership: obsSetsMembership
      }, null, coordinationValues)
    );
  }
}
function isEqualPathPair(pathPairA, pathPairB) {
  return isEqual(pathPairA[0], pathPairB[0]) && isEqual(pathPairA[1], pathPairB[1]) || isEqual(pathPairA[0], pathPairB[1]) && isEqual(pathPairA[1], pathPairB[0]);
}
async function loadComparisonMetadata(dataSource, metadataPath) {
  const metadata = JSON.parse(await dataSource._loadString(metadataPath));
  if (!(metadata.schema_version === "0.0.1" || metadata.schema_version === "0.0.2")) {
    throw new Error("Unsupported comparison_metadata schema version.");
  }
  return metadata;
}
class ComparisonMetadataAnndataLoader extends AbstractTwoStepLoader {
  /**
   *
   * @returns {Promise<LoaderResult<ComparisonMetadata>>}
   */
  async load() {
    const { path } = this.options;
    const superResult = await super.load().catch((reason) => Promise.resolve(reason));
    if (superResult instanceof AbstractLoaderError) {
      return Promise.reject(superResult);
    }
    const metadata = await loadComparisonMetadata(this.dataSource, path);
    return Promise.resolve(new LoaderResult(
      {
        // Should a more complex class be wrapping this
        // JSON object to help with downstream querying?
        comparisonMetadata: metadata
      },
      null
    ));
  }
}
let FeatureStatsAnndataLoader$1 = class FeatureStatsAnndataLoader extends AbstractTwoStepLoader {
  /**
   * Class method for loading feature string labels.
   * @returns {Promise<any>} A promise for the array.
   */
  async loadSignificances(dfPath) {
    const { pValueColumn, pValueTransformation } = this.options;
    const values = await this.dataSource.loadNumeric(`${dfPath}/${pValueColumn}`);
    if (pValueTransformation === "minuslog10") {
      values.data = values.data.map((val) => 10 ** -val);
    }
    return values.data;
  }
  /**
   * Class method for loading feature string labels.
   * @returns {Promise<any>} A promise for the array.
   */
  async loadFoldChanges(dfPath) {
    const { foldChangeColumn, foldChangeTransformation } = this.options;
    const values = await this.dataSource.loadNumeric(`${dfPath}/${foldChangeColumn}`);
    if (foldChangeTransformation === "log2") {
      values.data = values.data.map((val) => 2 ** val);
    }
    return values.data;
  }
  async loadFeatureNames(dfPath) {
    const { indexColumn } = this.options;
    if (indexColumn) {
      return this.dataSource._loadColumn(`${dfPath}/${indexColumn}`);
    }
    return this.dataSource.loadDataFrameIndex(dfPath);
  }
  async loadDataFrame(dfPath) {
    const [
      featureId,
      featureFoldChange,
      featureSignificance
    ] = await Promise.all([
      this.loadFeatureNames(dfPath),
      this.loadFoldChanges(dfPath),
      this.loadSignificances(dfPath)
    ]);
    return {
      featureId,
      featureFoldChange,
      featureSignificance
    };
  }
  /**
   *
   * @returns {Promise<StatsMeta[]>}
   */
  async loadMetadata() {
    const { metadataPath } = this.options;
    if (this.metadata) {
      return this.metadata;
    }
    if (!this.metadata) {
      this.metadata = await loadComparisonMetadata(this.dataSource, metadataPath);
      return this.metadata;
    }
    return this.metadata;
  }
  /**
   * Load data from multiple dataframes, merged.
   * @param {object} volcanoOptions
   * @param {string[]|null} [volcanoOptions.sampleFacet]
   * @param {string[]|null} [volcanoOptions.obsSetFacet]
   * @param {number|null} [volcanoOptions.topK]
   * @param {string[][]|null} [volcanoOptions.sampleSetSelection]
   * @returns {Promise<LoaderResult<FeatureStatsData>>}
   */
  async loadMulti(volcanoOptions) {
    const { analysisType: targetAnalysisType = "rank_genes_groups" } = this.options;
    const { sampleSetSelection, obsSetSelection } = volcanoOptions || {};
    const rawObsSetSelection = obsSetSelection;
    const rawSampleSetSelection = sampleSetSelection;
    if (sampleSetSelection) {
      if (sampleSetSelection.length !== 2) {
        return null;
      }
    }
    if (!obsSetSelection) {
      return null;
    }
    const metadata = await this.loadMetadata();
    const matchingComparisons = [];
    Object.values(metadata.comparisons).forEach((comparisonGroupObject) => {
      const { results } = comparisonGroupObject;
      results.forEach((resultObject) => {
        const {
          analysis_type,
          // analysis_params,
          coordination_values
          // path,
        } = resultObject;
        if (analysis_type === targetAnalysisType) {
          if (sampleSetSelection) {
            rawObsSetSelection.forEach((obsSetPath) => {
              if (isEqual([obsSetPath], coordination_values.obsSetFilter)) {
                if (isEqualPathPair(rawSampleSetSelection, coordination_values.sampleSetFilter)) {
                  matchingComparisons.push(resultObject);
                }
              }
            });
          } else if (obsSetSelection) {
            rawObsSetSelection.forEach((obsSetPath) => {
              if (isEqual([obsSetPath], coordination_values.obsSetSelection)) {
                matchingComparisons.push(resultObject);
              }
            });
          }
        }
      });
    });
    const result = await Promise.all(matchingComparisons.map(async (comparisonObject) => {
      const df = await this.loadDataFrame(comparisonObject.path);
      return {
        df,
        metadata: comparisonObject
      };
    }));
    return new LoaderResult({ featureStats: result }, null);
  }
  // eslint-disable-next-line class-methods-use-this
  async load() {
    throw new Error("The load() method is not implemented for FeatureStatsAnndataLoader.");
  }
};
class FeatureStatsAnndataLoader2 extends AbstractTwoStepLoader {
  /**
   * Class method for loading feature string labels.
   * @returns {Promise<any>} A promise for the array.
   */
  async loadSignificances(dfPath) {
    const { pValueColumn } = this.options;
    const values = await this.dataSource.loadNumeric(`${dfPath}/${pValueColumn}`);
    return values.data;
  }
  async loadFeatureSetNames(dfPath) {
    const { indexColumn } = this.options;
    if (indexColumn) {
      return this.dataSource._loadColumn(`${dfPath}/${indexColumn}`);
    }
    return this.dataSource.loadDataFrameIndex(dfPath);
  }
  async loadFeatureSetTerms(dfPath) {
    const { termColumn } = this.options;
    return this.dataSource._loadColumn(`${dfPath}/${termColumn}`);
  }
  async loadDataFrame(dfPath) {
    const [
      featureSetName,
      featureSetTerm,
      featureSetSignificance
    ] = await Promise.all([
      this.loadFeatureSetNames(dfPath),
      this.loadFeatureSetTerms(dfPath),
      this.loadSignificances(dfPath)
    ]);
    const cleanName = (s) => {
      if (s.includes("R-HSA-")) {
        return s.substring(0, s.indexOf("R-HSA-") - 1);
      }
      return s;
    };
    const cleanTerm = (s) => {
      if (s.includes("R-HSA-")) {
        return `REACTOME:${s.substring(s.indexOf("R-HSA-"))}`;
      }
      return s;
    };
    return {
      featureSetName: featureSetName.map((s) => cleanName(s)),
      featureSetTerm: featureSetTerm.map((s) => cleanTerm(s)),
      featureSetSignificance
    };
  }
  /**
   *
   * @returns {Promise<StatsMeta[]>}
   */
  async loadMetadata() {
    const { metadataPath } = this.options;
    if (this.metadata) {
      return this.metadata;
    }
    if (!this.metadata) {
      this.metadata = await loadComparisonMetadata(this.dataSource, metadataPath);
      return this.metadata;
    }
    return this.metadata;
  }
  /**
   * Load data from multiple dataframes, merged.
   * @param {object} volcanoOptions
   * @param {string[]|null} [volcanoOptions.sampleFacet]
   * @param {string[]|null} [volcanoOptions.obsSetFacet]
   * @param {number|null} [volcanoOptions.topK]
   * @param {string[][]|null} [volcanoOptions.sampleSetSelection]
   * @returns {Promise<LoaderResult<FeatureStatsData>>}
   */
  async loadMulti(volcanoOptions) {
    const {
      analysisType: targetAnalysisType = "pertpy_hypergeometric",
      featureSetLibrary: targetFeatureSetLibrary = "Reactome_2022"
    } = this.options;
    const { sampleSetSelection, obsSetSelection } = volcanoOptions || {};
    const rawObsSetSelection = obsSetSelection;
    const rawSampleSetSelection = sampleSetSelection;
    if (sampleSetSelection) {
      if (sampleSetSelection.length !== 2) {
        return null;
      }
    }
    if (!obsSetSelection) {
      return null;
    }
    const metadata = await this.loadMetadata();
    const matchingComparisons = [];
    Object.values(metadata.comparisons).forEach((comparisonGroupObject) => {
      const { results } = comparisonGroupObject;
      results.forEach((resultObject) => {
        var _a2;
        const {
          analysis_type,
          analysis_params,
          coordination_values
          // path,
        } = resultObject;
        if (analysis_type === targetAnalysisType && ((_a2 = analysis_params == null ? void 0 : analysis_params.pertpy_hypergeometric) == null ? void 0 : _a2.enrichr_library_name) === targetFeatureSetLibrary) {
          if (sampleSetSelection) {
            rawObsSetSelection.forEach((obsSetPath) => {
              if (isEqual([obsSetPath], coordination_values.obsSetFilter)) {
                if (isEqualPathPair(rawSampleSetSelection, coordination_values.sampleSetFilter)) {
                  matchingComparisons.push(resultObject);
                }
              }
            });
          } else if (obsSetSelection) {
            rawObsSetSelection.forEach((obsSetPath) => {
              if (isEqual([obsSetPath], coordination_values.obsSetSelection)) {
                matchingComparisons.push(resultObject);
              }
            });
          }
        }
      });
    });
    const result = await Promise.all(matchingComparisons.map(async (comparisonObject) => {
      const df = await this.loadDataFrame(comparisonObject.path);
      return {
        df,
        metadata: comparisonObject
      };
    }));
    return new LoaderResult({ featureSetStats: result }, null);
  }
  // eslint-disable-next-line class-methods-use-this
  async load() {
    throw new Error("The load() method is not implemented for FeatureSetStatsAnndataLoader.");
  }
}
class ObsSetStatsAnndataLoader extends AbstractTwoStepLoader {
  /**
   * Class method for loading feature string labels.
   * @returns {Promise<any>} A promise for the array.
   */
  async loadInterceptValues(dfPath) {
    const { interceptExpectedSampleColumn } = this.options;
    const values = await this.dataSource.loadNumeric(`${dfPath}/${interceptExpectedSampleColumn}`);
    return values.data;
  }
  /**
   * Class method for loading feature string labels.
   * @returns {Promise<any>} A promise for the array.
   */
  async loadEffectValues(dfPath) {
    const { effectExpectedSampleColumn } = this.options;
    const values = await this.dataSource.loadNumeric(`${dfPath}/${effectExpectedSampleColumn}`);
    return values.data;
  }
  /**
   * Class method for loading feature string labels.
   * @returns {Promise<any>} A promise for the array.
   */
  async loadIsCredible(dfPath) {
    const { isCredibleEffectColumn } = this.options;
    const values = await this.dataSource.loadNumeric(`${dfPath}/${isCredibleEffectColumn}`);
    return Array.from(values.data);
  }
  /**
   * Class method for loading feature string labels.
   * @returns {Promise<any>} A promise for the array.
   */
  async loadFoldChanges(dfPath) {
    const { foldChangeColumn, foldChangeTransformation } = this.options;
    const values = await this.dataSource.loadNumeric(`${dfPath}/${foldChangeColumn}`);
    if (foldChangeTransformation === "log2") {
      values.data = values.data.map((val) => 2 ** val);
    }
    return values.data;
  }
  async loadObsSetNames(dfPath) {
    const { indexColumn } = this.options;
    if (indexColumn) {
      return this.dataSource._loadColumn(`${dfPath}/${indexColumn}`);
    }
    return this.dataSource.loadDataFrameIndex(dfPath);
  }
  async loadDataFrame(dfPath) {
    const [
      obsSetId,
      obsSetFoldChange,
      interceptExpectedSample,
      effectExpectedSample,
      isCredibleEffect
      // TODO: rather than passing this down,
      // do the fold change direction swapping in the loader
      // (as opposed to in the view).
    ] = await Promise.all([
      this.loadObsSetNames(dfPath),
      this.loadFoldChanges(dfPath),
      this.loadInterceptValues(dfPath),
      this.loadEffectValues(dfPath),
      this.loadIsCredible(dfPath)
    ]);
    return {
      obsSetId,
      obsSetFoldChange,
      interceptExpectedSample,
      effectExpectedSample,
      isCredibleEffect
    };
  }
  /**
   *
   * @returns {Promise<StatsMeta[]>}
   */
  async loadMetadata() {
    const { metadataPath } = this.options;
    if (this.metadata) {
      return this.metadata;
    }
    if (!this.metadata) {
      this.metadata = await loadComparisonMetadata(this.dataSource, metadataPath);
      return this.metadata;
    }
    return this.metadata;
  }
  /**
   * Load data from multiple dataframes, merged.
   * @param {object} volcanoOptions
   * @param {string[]|null} [volcanoOptions.sampleFacet]
   * @param {string[]|null} [volcanoOptions.obsSetFacet]
   * @param {number|null} [volcanoOptions.topK]
   * @param {string[][]|null} [volcanoOptions.sampleSetSelection]
   * @returns {Promise<LoaderResult<ObsSetStatsData>>}
   */
  async loadMulti(volcanoOptions) {
    const { analysisType: targetAnalysisType = "sccoda_df" } = this.options;
    const { sampleSetSelection, obsSetSelection } = volcanoOptions || {};
    const rawObsSetSelection = obsSetSelection;
    const rawSampleSetSelection = sampleSetSelection;
    if (!sampleSetSelection || (sampleSetSelection == null ? void 0 : sampleSetSelection.length) !== 2) {
      return null;
    }
    if (!obsSetSelection) {
      return null;
    }
    const metadata = await this.loadMetadata();
    const rawObsSetGroups = Array.from(
      new Set(rawObsSetSelection.map((setPath) => setPath == null ? void 0 : setPath[0]))
    );
    const matchingComparisons = [];
    Object.values(metadata.comparisons).forEach((comparisonGroupObject) => {
      const { results } = comparisonGroupObject;
      results.forEach((resultObject) => {
        const {
          analysis_type,
          // analysis_params,
          coordination_values
          // path,
        } = resultObject;
        if (analysis_type === targetAnalysisType) {
          if (sampleSetSelection) {
            if (isEqual([rawObsSetGroups], coordination_values.obsSetSelection)) {
              if (isEqualPathPair(rawSampleSetSelection, coordination_values.sampleSetFilter)) {
                matchingComparisons.push(resultObject);
              }
            }
          }
        }
      });
    });
    const result = await Promise.all(matchingComparisons.map(async (comparisonObject) => {
      const df = await this.loadDataFrame(comparisonObject.path);
      return {
        df,
        metadata: comparisonObject
      };
    }));
    return new LoaderResult({ obsSetStats: result }, null);
  }
  // eslint-disable-next-line class-methods-use-this
  async load() {
    throw new Error("The load() method is not implemented for ObsSetStatsAnndataLoader.");
  }
}
class GenomicProfilesZarrLoader extends AbstractTwoStepLoader {
  loadAttrs() {
    if (this.attrs) {
      return this.attrs;
    }
    this.attrs = this.dataSource.getJson(".zattrs");
    return this.attrs;
  }
  load() {
    const { url, requestInit: requestInit2 } = this;
    return this.loadAttrs().then((attrs) => Promise.resolve(new LoaderResult(
      attrs,
      url,
      null,
      requestInit2
    )));
  }
}
export {
  AnnDataSource,
  ComparisonMetadataAnndataLoader,
  FeatureLabelsAnndataLoader,
  FeatureStatsAnndataLoader2 as FeatureSetStatsAnndataLoader,
  FeatureStatsAnndataLoader$1 as FeatureStatsAnndataLoader,
  GenomicProfilesZarrLoader,
  MatrixZarrAsObsFeatureMatrixLoader,
  MuDataSource,
  ObsEmbeddingAnndataLoader,
  ObsFeatureColumnsAnndataLoader,
  ObsFeatureMatrixAnndataLoader,
  ObsLabelsAnndataLoader,
  ObsLocationsAnndataLoader,
  ObsPointsAnndataLoader,
  ObsSegmentationsAnndataLoader,
  ObsSetStatsAnndataLoader,
  ObsSetsAnndataLoader,
  ObsSpotsAnndataLoader,
  SampleEdgesAnndataLoader,
  SampleSetsAnndataLoader,
  ZarrDataSource,
  basename,
  dirname
};
