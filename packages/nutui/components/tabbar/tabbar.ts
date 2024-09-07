import type { ExtractPropTypes, InjectionKey } from 'vue'
import { UPDATE_MODEL_EVENT } from '../_constants'
import { commonProps, isNumber, isString, makeNumericProp } from '../_utils'
import type { TabbarContext } from './types'

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
   * @description icon激活的颜色
   */
  activeColor: String,
  /**
   * @description icon未激活的颜色
   */
  unactiveColor: String,
  /**
   * @description 是否开启iphone系列全面屏底部安全区适配
   */
  safeAreaInsetBottom: Boolean,
  /**
   * @description 固定在底部时，是否在标签位置生成一个等高的占位元素
   */
  placeholder: Boolean,
}

export type TabBarProps = ExtractPropTypes<typeof tabbarProps>

export const tabbarEmits = {
  tabSwitch: (val: any, index: number | string) => (val instanceof Object) && (isNumber(index) || isString(index)),
  [UPDATE_MODEL_EVENT]: (val: string | number) => isString(val) || isNumber(val),
}

export type TabBarEmits = typeof tabbarEmits

export const TABBAR_CONTEXT_KEY: InjectionKey<TabbarContext> = Symbol('TABBAR_CONTEXT')
