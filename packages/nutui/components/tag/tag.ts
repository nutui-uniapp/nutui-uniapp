import type { ExtractPropTypes } from 'vue'
import { commonProps, makeStringProp } from '../_utils'
import { CLICK_EVENT, CLOSE_EVENT } from '../_constants'

export type TagType = 'primary' | 'success' | 'danger' | 'warning' | 'default'

export const tagProps = {
  ...commonProps,
  /**
   * @description 标签颜色
   */
  customColor: String,
  /**
   * @description 文本颜色，优先级高于 color 属性
   */
  textColor: String,
  /**
   * @description 标签类型，可选值为 primary、success、danger、warning
   */
  type: makeStringProp<TagType>('default'),
  /**
   * @description 是否为空心样式
   */
  plain: Boolean,
  /**
   * @description 是否为圆角样式
   */
  round: Boolean,
  /**
   * @description 是否为标记样式
   */
  mark: Boolean,
  /**
   * @description 是否为可关闭标签
   */
  closeable: Boolean,
}

export type TagProps = ExtractPropTypes<typeof tagProps>

export const tagEmits = {
  [CLICK_EVENT]: (evt: Event) => evt instanceof Object,
  [CLOSE_EVENT]: (evt: Event) => evt instanceof Object,

}

export type TagEmits = typeof tagEmits
