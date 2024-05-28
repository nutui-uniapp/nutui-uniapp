export type Primitive = boolean | number | string | symbol | bigint | null | undefined
export type BrowserNativeObject = Date | FileList | File | Blob | RegExp

export type OptionalValue<T> = T | undefined
export type OptionalNumber = OptionalValue<number>
export type OptionalString = OptionalValue<string>
export type OptionalBoolean = OptionalValue<boolean>

export type NullableValue<T> = T | null
export type NullableNumber = NullableValue<number>
export type NullableString = NullableValue<string>
export type NullableBoolean = NullableValue<boolean>

export type Awaitable<T> = T | Promise<T>
export type Arrayable<T> = T | T[]

export type NumberLike = number | `${number}`

export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> }

export type FlatObjectTuple<T> = { [K in keyof T]: T[K] }
export type PartialByKeys<T, K extends keyof T = keyof T> = FlatObjectTuple<Partial<Pick<T, Extract<keyof T, K>>> & Omit<T, K>>
export type RequiredByKey<T, K extends keyof T = keyof T> = FlatObjectTuple<Required<Pick<T, Extract<keyof T, K>>> & Omit<T, K>>
