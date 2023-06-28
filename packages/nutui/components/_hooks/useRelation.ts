import type { ComponentPublicInstance } from 'vue'
import { getCurrentInstance } from 'vue'

export function useExtend<T>(apis: T) {
  const instance = getCurrentInstance()
  if (instance)
    Object.assign(instance.proxy as ComponentPublicInstance, apis)
}
