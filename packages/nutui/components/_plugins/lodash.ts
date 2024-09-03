// #ifdef MP
const globals = [
  Array,
  DataView,
  Date,
  Error,
  Float32Array,
  Float64Array,
  Function,
  Int8Array,
  Int16Array,
  Int32Array,
  Map,
  Math,
  Object,
  Promise,
  RegExp,
  Set,
  String,
  Symbol,
  TypeError,
  Uint8Array,
  Uint8ClampedArray,
  Uint16Array,
  Uint32Array,
  WeakMap,
  clearTimeout,
  // eslint-disable-next-line unicorn/prefer-number-properties
  isFinite,
  // eslint-disable-next-line unicorn/prefer-number-properties
  parseInt,
  setTimeout,
]

for (const item of globals) {
  try {
    // @ts-expect-error whatever
    // eslint-disable-next-line no-restricted-globals
    global[item.name] = item
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (e) {}
}
// #endif

export * from 'lodash-es'
