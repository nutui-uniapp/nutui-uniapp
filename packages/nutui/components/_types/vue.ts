import type { Ref } from 'vue'

export type MaybeRef<T> = T | Ref<T>

export type RefsObject<T> = { [K in keyof T]: Ref<T[K]> }
