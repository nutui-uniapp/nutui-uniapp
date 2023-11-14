import type { ExtractPropTypes } from 'vue'
import type { PopoverLocation, PopoverTheme } from '../popover/type'
import { commonProps, isBoolean, isNumber, makeArrayProp, makeNumberProp, makeNumericProp, makeStringProp, truthProp } from '../_utils'
import { CHANGE_EVENT, CLOSE_EVENT, UPDATE_MODEL_EVENT } from '../_constants'

export interface StepOptions {
  target: string
  content?: string
  location?: PopoverLocation
  popoverOffset?: number[]
  arrowOffset?: number
}
export const tourProps = {
  ...commonProps,
  /**
   * @description 是否展示引导弹出层
   */
  modelValue: Boolean,
  /**
   * @description 引导类型
   * - 默认值为 'step'
   */
  type: makeStringProp('step'),
  /**
   * @description 引导步骤内容
   * - 类型为 `StepOptions[]`
   * - 默认
   */
  steps: makeArrayProp<StepOptions>([]),
  /**
   * @description 弹出层位置,同 Popopver 的location 属性
   * - 默认值为 `'bottom'`
   */
  location: makeStringProp<PopoverLocation>('bottom'),
  /**
   * @description 类型为 `step` 时，默认展示第几步
   * - 默认值为 `0`
   */
  current: makeNumberProp(0),
  /**
   * @description 下一步按钮文案
   * - 默认值为 `'下一步'`
   */
  nextStepTxt: makeStringProp('下一步'),
  /**
   * @description 上一步按钮文案
   * - 默认值为 `'上一步'`
   */
  prevStepTxt: makeStringProp('上一步'),
  /**
   * @description 完成按钮文案
   * - 默认值为 `'完成'`
   */
  completeTxt: makeStringProp('完成'),
  /**
   * @description 是否显示镂空遮罩
   * - 默认值为 `true`
   */
  mask: truthProp,
  /**
   * @description 镂空遮罩相对于目标元素的偏移量
   * - 默认值为 `[8, 10]`
   */
  offset: makeArrayProp<number>([8, 10]),
  /**
   * @description 自定义背景色
   * - 默认值为 `''`
   */
  bgColor: String,
  /**
   * @description 气泡遮罩层主题,同 Popopver 的theme 属性
   */
  theme: makeStringProp<PopoverTheme>('light'),
  /**
   * @description 镂空遮罩层宽度
   */
  maskWidth: makeNumericProp(''),
  /**
   * @description 镂空遮罩层高度
   */
  maskHeight: makeNumericProp(''),
  /**
   * @description 是否在点击镂空遮罩层后关闭,同 Popopver 的closeOnClickOverlay 属性
   */
  closeOnClickOverlay: truthProp,
  /**
   * @description 是否展示上一步按钮
   */
  showPrevStep: truthProp,
  /**
   * @description 是否展示标题栏
   */
  showTitleBar: truthProp,
}

export type TourProps = ExtractPropTypes<typeof tourProps>

export const tourEmits = {
  [UPDATE_MODEL_EVENT]: (val: boolean) => isBoolean(val),
  [CLOSE_EVENT]: (val: number) => isNumber(val),
  [CHANGE_EVENT]: (val: number) => isNumber(val),
}

export type TourEmits = typeof tourEmits
