export interface CascaderPane {
  nodes: CascaderOption[]
  selectedNode: CascaderOption | null
}

export interface CascaderConfig {
  value?: string
  text?: string
  children?: string
}
export interface CascaderTabs {
  title: string
  paneKey: string
  disabled: boolean
}

export interface CascaderOption {
  text?: string
  value?: number | string
  disabled?: boolean
  children?: CascaderOption[]
  leaf?: boolean
  level?: number
  loading?: boolean

  [key: PropertyKey]: any
}

export type CascaderValue = CascaderOption['value'][]

export interface convertConfig {
  topId?: string | number | null
  idKey?: string
  pidKey?: string
  sortKey?: string
}
