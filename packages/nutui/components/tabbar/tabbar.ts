import type { ExtractPropTypes } from 'vue'
import { commonProps, isNumber, isString, makeNumericProp, makeStringProp } from '../_utils'
import { UPDATE_MODEL_EVENT } from '../_constants'

export const tabbarProps = {
  ...commonProps,
  /**
   * @description 选中标签的索引值或者名称
   */
  modelValue: makeNumericProp(0),
  /**
   * @description 是否固定在页面底部
   */
  bottom: Boolean,
  /**
   * @description icon未激活的颜色
   */
  unactiveColor: String,
  /**
   * @description icon激活的颜色
   */
  activeColor: String,
  /**
   * @description 是否开启iphone系列全面屏底部安全区适配
   */
  safeAreaInsetBottom: Boolean,
  /**
   * @description 固定在底部时，是否在标签位置生成一个等高的占位元素
   */
  placeholder: Boolean,
  /**
   * @description icon的尺寸
   */
  size: makeStringProp('20px'),
  /**
   * @description 是否显示小红点
   */
  dot: Boolean,
}

export type TabBarProps = ExtractPropTypes<typeof tabbarProps>

export const tabbarEmits = {
  tabSwitch: (val: any, index: number | string) => (val instanceof Object) && (isNumber(index) || isString(index)),
  [UPDATE_MODEL_EVENT]: (val: string | number) => isString(val) || isNumber(val),
}

export type TabBarEmits = typeof tabbarEmits
