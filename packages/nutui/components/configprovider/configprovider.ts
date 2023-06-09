import type { ExtractPropTypes } from 'vue'

export const configProviderProps = {
  theme: { type: String, default: '' },
  themeVars: { type: Object, default: {} },
}

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>
