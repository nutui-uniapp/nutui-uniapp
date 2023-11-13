import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumericProp, makeStringProp } from '../_utils'
import { CLICK_EVENT } from '../_constants'

export const iconProps = {
  ...commonProps,
  popClass: { type: String, default: '' },
  /**
   * @description 图标宽度
   */
  width: makeNumericProp(''),
  /**
   * @description 图标高度
   */
  height: makeNumericProp(''),
  /**
   * @description 图标名称
   */
  name: makeStringProp(''),
  /**
   * @description 图标大小
   */
  size: makeNumericProp(''),
  /**
   * @description 自定义 `icon` 类名前缀，用于使用自定义图标
   */
  classPrefix: { type: String, default: 'nut-icon' },
  /**
   * @description  自定义 `icon` 字体基础类名
   */
  fontClassName: { type: String, default: 'nutui-iconfont' },
  /**
   * @description 图标颜色
   */
  customColor: { type: String, default: '' },
}

export type IconProps = ExtractPropTypes<typeof iconProps>

export const iconEmits = {
  [CLICK_EVENT]: (evt: Event) => evt instanceof Object,
}

export type IconEmits = typeof iconEmits
