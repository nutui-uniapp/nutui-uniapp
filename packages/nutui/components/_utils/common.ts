import { isDef, isObject } from './is'

// 变量类型判断
export function TypeOfFun(value: any) {
  if (value === null)
    return 'null'

  const type = typeof value
  if (type === 'undefined' || type === 'string')
    return type

  const typeString = toString.call(value)
  switch (typeString) {
    case '[object Array]':
      return 'array'
    case '[object Date]':
      return 'date'
    case '[object Boolean]':
      return 'boolean'
    case '[object Number]':
      return 'number'
    case '[object Function]':
      return 'function'
    case '[object RegExp]':
      return 'regexp'
    case '[object Object]':
      if (undefined !== value.nodeType) {
        if (value.nodeType === 3)
          return /\S/.test(value.nodeValue) ? 'textnode' : 'whitespace'
        else
          return 'element'
      }
      else {
        return 'object'
      }
    default:
      return 'unknow'
  }
}
//
export const objectToString = Object.prototype.toString
export const toTypeString = (value: unknown): string => objectToString.call(value)

export function toRawType(value: unknown): string {
  // extract "RawType" from strings like "[object RawType]"
  return toTypeString(value).slice(8, -1)
}

export const win = window

export const docu = document

export const body = docu.body

export function getPropByPath(obj: any, keyPath: string) {
  try {
    return keyPath.split('.').reduce((prev, curr) => prev[curr], obj)
  }
  catch (error) {
    return ''
  }
}

export function floatData(format: any, dataOp: any, mapOps: any) {
  const mergeFormat = Object.assign({}, format)
  const mergeMapOps = Object.assign({}, mapOps)

  if (Object.keys(dataOp).length > 0) {
    Object.keys(mergeFormat).forEach((keys) => {
      if (Object.prototype.hasOwnProperty.call(mergeMapOps, keys)) {
        const tof = TypeOfFun(mergeMapOps[keys])
        if (tof === 'function')
          mergeFormat[keys] = mergeMapOps[keys](dataOp)

        if (tof === 'string')
          mergeFormat[keys] = dataOp[mergeMapOps[keys]]
      }
      else {
        if (dataOp[keys])
          mergeFormat[keys] = dataOp[keys]
      }
    })
    return mergeFormat
  }

  return format
}

export function myFixed(num: any, digit = 2) {
  if (Object.is(Number.parseFloat(num), Number.NaN))
    return console.warn(`传入的值：${num}不是一个数字`)

  num = Number.parseFloat(num)
  return (Math.round((num + Number.EPSILON) * 10 ** digit) / 10 ** digit).toFixed(digit)
}

export function preventDefault(event: Event, isStopPropagation?: boolean) {
  if (typeof event.cancelable !== 'boolean' || event.cancelable)
    event.preventDefault()

  if (isStopPropagation)
    event.stopPropagation()
}

function cacheStringFunction<T extends (str: string) => string>(fn: T): T {
  const cache: Record<string, string> = Object.create(null)
  return ((str: string) => {
    const hit = cache[str]

    return hit || (cache[str] = fn(str))
  }) as T
}

const hyphenateRE = /\B([A-Z])/g
export const hyphenate = cacheStringFunction((str: string) =>
  str.replace(hyphenateRE, '-$1').toLowerCase(),
)

export function padZero(num: number | string, length = 2): string {
  num += ''
  while ((num as string).length < length)
    num = `0${num}`

  return num.toString()
}

export const clamp = (num: number, min: number, max: number): number => Math.min(Math.max(num, min), max)

export function getScrollTopRoot(): number {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
}

type ObjectIndex = Record<string, unknown>

const { hasOwnProperty } = Object.prototype

function assignKey(to: ObjectIndex, from: ObjectIndex, key: string) {
  const val = from[key]

  if (!isDef(val))
    return

  if (!hasOwnProperty.call(to, key) || !isObject(val))
    to[key] = val

  else

    to[key] = deepAssign(Object(to[key]), val)
}

export function deepAssign(to: ObjectIndex, from: ObjectIndex): ObjectIndex {
  Object.keys(from).forEach((key) => {
    assignKey(to, from, key)
  })

  return to
}

export function omit(obj: Record<string, unknown>, keys: string[]) {
  if (Object.prototype.toString.call(obj) === '[object Object]')
    return obj

  return Object.keys(obj).reduce((prev, key) => {
    if (!keys.includes(key))
      prev[key] = obj[key]

    return prev
  }, {} as Record<string, unknown>)
}

export interface Deferred<T> extends Promise<T> {
  resolve: (value?: T) => void
  reject: (value?: any) => void
}

export function createDeferred<T>(): Deferred<T> {
  let resolve: Deferred<T>['resolve'] = noop
  let reject: Deferred<T>['reject'] = noop
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  }) as unknown as Deferred<T>

  promise.resolve = resolve
  promise.reject = reject
  return promise
}

export function toArray<T>(value?: T | T[]): T[] {
  if (!value)
    return []
  return Array.isArray(value) ? value : [value]
}

export function noop() { }
