import type { ExtractPropTypes, PropType } from 'vue'

export const configProviderProps = {
  theme: { type: String as PropType<'dark' | string>, default: '' },
  themeVars: { type: Object, default: {} },
}

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>
