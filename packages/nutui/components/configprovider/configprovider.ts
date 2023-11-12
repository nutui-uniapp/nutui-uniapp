import type { ExtractPropTypes } from 'vue'
import { makeStringProp } from '../_utils'

export const configProviderProps = {
  /**
   * @description 主题风格，设置为 `dark` 来开启深色模式，全局生效
   */
  // eslint-disable-next-line ts/ban-types
  theme: makeStringProp<string | 'dark' & {}>(''),
  /**
   * @description 自定义主题变量
   */
  themeVars: { type: Object, default: {} },
}

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>
