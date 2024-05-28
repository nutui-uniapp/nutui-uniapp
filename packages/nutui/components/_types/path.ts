import type { BrowserNativeObject, Primitive } from './base'

export type IsTuple<T extends ReadonlyArray<any>> = number extends T['length'] ? false : true

export type ArrayMethodKey = keyof any[]
export type TupleKey<T extends ReadonlyArray<any>> = Exclude<keyof T, ArrayMethodKey>
export type ArrayKey = number

export type PathImpl<K extends string | number, V> = V extends
  | Primitive
  | BrowserNativeObject
  ? `${K}`
  : `${K}` | `${K}.${Path<V>}`

export type Path<T> = T extends ReadonlyArray<infer V>
  ? IsTuple<T> extends true
    ? {
        [K in TupleKey<T>]-?: PathImpl<Exclude<K, symbol>, T[K]>
      }[TupleKey<T>] // tuple
    : PathImpl<ArrayKey, V> // array
  : {
      [K in keyof T]-?: PathImpl<Exclude<K, symbol>, T[K]>
    }[keyof T] // object

export type FieldPath<T> = T extends object ? Path<T> : never
