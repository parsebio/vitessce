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
var _overrides, _use_suffix_request, _merge_init, merge_init_fn, _overrides2, _refs, _opts, _overrides3;
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
function root(store) {
  return new Location(store ?? /* @__PURE__ */ new Map());
}
const CONTEXT_MARKER = Symbol("zarrita.context");
function get_context(obj) {
  return obj[CONTEXT_MARKER];
}
function* range$1(start, stop, step = 1) {
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
    for (const dim_chunk_ix of range$1(dim_chunk_ix_from, dim_chunk_ix_to)) {
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
async function get$1(arr, selection, opts, setter2) {
  var _a;
  let context = get_context(arr);
  let indexer = new BasicIndexer({
    selection,
    shape: arr.shape,
    chunk_shape: arr.chunks
  });
  let out = setter2.prepare(new context.TypedArray(indexer.shape.reduce((a, b) => a * b, 1)), indexer.shape, context.get_strides(indexer.shape));
  let queue = ((_a = opts.create_queue) == null ? void 0 : _a.call(opts)) ?? create_queue();
  for (const { chunk_coords, mapping } of indexer) {
    queue.add(async () => {
      let { data, shape, stride } = await arr.getChunk(chunk_coords, opts.opts);
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
async function get(arr, selection = null, opts = {}) {
  return get$1(arr, selection, opts, setter);
}
function indices_len(start, stop, step) {
  if (step < 0 && stop < start) {
    return Math.floor((start - stop - 1) / -step) + 1;
  }
  if (start < stop)
    return Math.floor((stop - start - 1) / step) + 1;
  return 0;
}
function set_scalar_binary(out, out_selection, value, bytes_per_element) {
  if (out_selection.length === 0) {
    out.data.set(value, 0);
    return;
  }
  const [slice2, ...slices] = out_selection;
  const [curr_stride, ...stride] = out.stride;
  if (typeof slice2 === "number") {
    const data = out.data.subarray(curr_stride * slice2 * bytes_per_element);
    set_scalar_binary({ data, stride }, slices, value, bytes_per_element);
    return;
  }
  const [from, to, step] = slice2;
  const len = indices_len(from, to, step);
  if (slices.length === 0) {
    for (let i = 0; i < len; i++) {
      out.data.set(value, curr_stride * (from + step * i) * bytes_per_element);
    }
    return;
  }
  for (let i = 0; i < len; i++) {
    const data = out.data.subarray(curr_stride * (from + step * i) * bytes_per_element);
    set_scalar_binary({ data, stride }, slices, value, bytes_per_element);
  }
}
function set_from_chunk_binary(dest, src, bytes_per_element, projections) {
  const [proj, ...projs] = projections;
  const [dstride, ...dstrides] = dest.stride;
  const [sstride, ...sstrides] = src.stride;
  if (proj.from === null) {
    if (projs.length === 0) {
      dest.data.set(src.data.subarray(0, bytes_per_element), proj.to * bytes_per_element);
      return;
    }
    set_from_chunk_binary({
      data: dest.data.subarray(dstride * proj.to * bytes_per_element),
      stride: dstrides
    }, src, bytes_per_element, projs);
    return;
  }
  if (proj.to === null) {
    if (projs.length === 0) {
      let offset = proj.from * bytes_per_element;
      dest.data.set(src.data.subarray(offset, offset + bytes_per_element), 0);
      return;
    }
    set_from_chunk_binary(dest, {
      data: src.data.subarray(sstride * proj.from * bytes_per_element),
      stride: sstrides
    }, bytes_per_element, projs);
    return;
  }
  const [from, to, step] = proj.to;
  const [sfrom, _, sstep] = proj.from;
  const len = indices_len(from, to, step);
  if (projs.length === 0) {
    if (step === 1 && sstep === 1 && dstride === 1 && sstride === 1) {
      let offset = sfrom * bytes_per_element;
      let size = len * bytes_per_element;
      dest.data.set(src.data.subarray(offset, offset + size), from * bytes_per_element);
      return;
    }
    for (let i = 0; i < len; i++) {
      let offset = sstride * (sfrom + sstep * i) * bytes_per_element;
      dest.data.set(src.data.subarray(offset, offset + bytes_per_element), dstride * (from + step * i) * bytes_per_element);
    }
    return;
  }
  for (let i = 0; i < len; i++) {
    set_from_chunk_binary({
      data: dest.data.subarray(dstride * (from + i * step) * bytes_per_element),
      stride: dstrides
    }, {
      data: src.data.subarray(sstride * (sfrom + i * sstep) * bytes_per_element),
      stride: sstrides
    }, bytes_per_element, projs);
  }
}
function fetch_range$1(url, offset, length, opts = {}) {
  if (offset !== void 0 && length !== void 0) {
    opts = {
      ...opts,
      headers: {
        ...opts.headers,
        Range: `bytes=${offset}-${offset + length - 1}`
      }
    };
  }
  return fetch(url, opts);
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
        return (selection) => get(
          target,
          selection ? selection.map((s) => {
            if (typeof s === "object" && s !== null) {
              return slice(s.start, s.stop, s.step);
            }
            return s;
          }) : target.shape.map(() => null)
        );
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
function fetch_range(url, offset, length, opts = {}) {
  if (offset !== void 0 && length !== void 0) {
    opts = {
      ...opts,
      headers: {
        ...opts.headers,
        Range: `bytes=${offset}-${offset + length - 1}`
      }
    };
  }
  return fetch(url, opts);
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
  constructor(url, opts = {}) {
    __publicField(this, "url");
    __publicField(this, "length");
    __privateAdd(this, _overrides2, void 0);
    this.url = url;
    __privateSet(this, _overrides2, opts.overrides ?? {});
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
  static fromUrl(href, opts = {}) {
    return new ZipFileStore(new HTTPRangeReader(href, opts));
  }
  static fromBlob(blob) {
    return new ZipFileStore(new BlobReader2(blob));
  }
}
const ZipFileStore$1 = ZipFileStore;
function parse$1(template, re = /{{(.*?)}}/) {
  let result = re.exec(template);
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
    result = re.exec(template);
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
      var _a;
      const { key, num, str: str2 } = ((_a = kwarg.match(
        /(?<key>[a-z_0-9]*)\s*=\s*((?<num>[0-9.]+)|('|")(?<str>.*)('|"))/i
      )) == null ? void 0 : _a.groups) ?? {};
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
const valid = new Set(
  alphabet + alphabet.toUpperCase() + numbers + expr + space
);
function matchMathEval(str) {
  for (let i = 0; i < str.length; i++) {
    if (!valid.has(str.charAt(i)))
      return;
  }
  return parse$1(str, /[A-Za-z_][A-Za-z0-9_]*/gi);
}
function render(template, context) {
  const grps = parse$1(template);
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
function parse(spec, renderString = render) {
  return "version" in spec ? parseV1(spec, renderString) : parseV0(spec);
}
function parseV0(spec) {
  return new Map(Object.entries(spec));
}
function parseV1(spec, renderString) {
  var _a;
  const context = {};
  for (const [key, template] of Object.entries(spec.templates ?? {})) {
    if (template.includes("{{")) {
      context[key] = (ctx) => renderString(template, ctx);
    } else {
      context[key] = template;
    }
  }
  const render2 = (t, o) => {
    return renderString(t, { ...context, ...o });
  };
  const refs = /* @__PURE__ */ new Map();
  for (const [key, ref] of Object.entries(spec.refs ?? {})) {
    if (typeof ref === "string") {
      refs.set(key, ref);
    } else {
      const url = ((_a = ref[0]) == null ? void 0 : _a.includes("{{")) ? render2(ref[0]) : ref[0];
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
  const keys = Object.keys(dimensions);
  const iterables = Object.values(dimensions).map(
    (i) => Array.isArray(i) ? i : [...range(i)]
  );
  for (const values of product(...iterables)) {
    yield Object.fromEntries(keys.map((key, i) => [key, values[i]]));
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
function* range({ stop, start = 0, step = 1 }) {
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
  constructor(refs, opts = {}) {
    __privateAdd(this, _refs, void 0);
    __privateAdd(this, _opts, void 0);
    __privateAdd(this, _overrides3, void 0);
    __privateSet(this, _refs, Promise.resolve(refs));
    __privateSet(this, _opts, opts);
    __privateSet(this, _overrides3, opts.overrides || {});
  }
  async get(key, opts = {}) {
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
    let res = await fetch_range(uri2href(url), offset, size, merge_init(__privateGet(this, _overrides3), opts));
    if (res.status === 200 || res.status === 206) {
      return new Uint8Array(await res.arrayBuffer());
    }
    throw new Error(`Request unsuccessful for key ${key}. Response status: ${res.status}.`);
  }
  static fromSpec(spec, opts) {
    let refs = Promise.resolve(spec).then((spec2) => parse(spec2));
    return new _ReferenceStore(refs, opts);
  }
  static fromUrl(url, opts) {
    let spec = fetch(url, opts == null ? void 0 : opts.overrides).then((res) => res.json());
    return _ReferenceStore.fromSpec(spec, opts);
  }
};
let ReferenceStore = _ReferenceStore;
_refs = new WeakMap();
_opts = new WeakMap();
_overrides3 = new WeakMap();
const ReferenceStore$1 = ReferenceStore;
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
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
    var undefinedType = "undefined";
    var isIE = typeof window !== undefinedType && typeof window.navigator !== undefinedType && /Trident\/|MSIE /.test(window.navigator.userAgent);
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
      if (typeof console === undefinedType) {
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
      if (typeof console === undefinedType && level < this.levels.SILENT) {
        return "No console available for logging";
      }
    }
    function enableLoggingWhenConsoleArrives(methodName) {
      return function() {
        if (typeof console !== undefinedType) {
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
        if (typeof window === undefinedType || !storageKey)
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
        if (typeof window === undefinedType || !storageKey)
          return;
        try {
          storedLevel = window.localStorage[storageKey];
        } catch (ignore) {
        }
        if (typeof storedLevel === undefinedType) {
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
        if (typeof window === undefinedType || !storageKey)
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
    var _log = typeof window !== undefinedType ? window.log : void 0;
    defaultLogger.noConflict = function() {
      if (typeof window !== undefinedType && window.log === defaultLogger) {
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
    var _a;
    try {
      return await super.get(key, options);
    } catch (e) {
      if (((_a = e == null ? void 0 : e.message) == null ? void 0 : _a.startsWith("Unexpected response status 403")) && !getDebugMode()) {
        return void 0;
      }
      throw e;
    }
  }
}
function zarrOpenRoot(url, fileType, opts) {
  let store;
  if (fileType && fileType.endsWith(".zip")) {
    store = ZipFileStore$1.fromUrl(url, { overrides: opts == null ? void 0 : opts.requestInit });
  } else if (fileType && fileType.endsWith(".h5ad")) {
    if (!(opts == null ? void 0 : opts.refSpecUrl)) {
      throw new Error("refSpecUrl is required for H5AD files");
    }
    const referenceSpecPromise = fetch(opts.refSpecUrl).then((res) => res.json()).then((referenceSpec) => Object.fromEntries(
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
    store = ReferenceStore$1.fromSpec(
      referenceSpecPromise,
      { target: url, overrides: opts == null ? void 0 : opts.requestInit }
    );
  } else {
    store = new RelaxedFetchStore(url, { overrides: opts == null ? void 0 : opts.requestInit });
  }
  return root(store);
}
function base64Decode(encoded) {
  return Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0));
}
function createStoreFromMapContents(mapContents) {
  const map = new Map(mapContents);
  return new Proxy(map, {
    get: (target, prop) => {
      if (prop === "get") {
        return (key) => {
          const encodedVal = target.get(key);
          if (encodedVal) {
            return base64Decode(encodedVal);
          }
          return void 0;
        };
      }
      return Reflect.get(target, prop);
    }
  });
}
export {
  createStoreFromMapContents,
  createZarrArrayAdapter,
  zarrOpenRoot
};
