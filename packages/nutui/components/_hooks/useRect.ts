import type { ComponentInternalInstance } from 'vue'
import { useSelectorQuery } from './useSelectorQuery'

export function useRect(id: string, instance?: ComponentInternalInstance): Promise<UniApp.NodeInfo> {
  const { getSelectorNodeInfo } = useSelectorQuery(instance)
  return getSelectorNodeInfo(`#${id}`)
}
