import type { ExtractPropTypes } from 'vue'
import { commonProps, isBoolean, makeArrayProp, makeStringProp, truthProp } from '../_utils'
import { SELECTED_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'

export const fixednavProps = {
  ...commonProps,
  /**
   * @description 是否打开
   */
  visible: Boolean,

  /**
   * @description 悬浮列表内容数据
   */
  navList: makeArrayProp<any>([]),

  /**
   * @description 选中按钮文案颜色
   */
  activeColor: makeStringProp(''),

  /**
   * @description 收起列表按钮文案
   */
  activeText: makeStringProp(''),

  /**
   * @description 展开列表按钮文案
   */
  unActiveText: makeStringProp(''),

  /**
   * @description 导航方向，可选值 'left'、'right'
   */
  type: makeStringProp<'left' | 'right'>('right'),

  /**
   * @description 展开时是否显示遮罩
   */
  overlay: truthProp,

  /**
   * @description fixed 垂直位置
   */
  position: {
    default: () => {
      return {
        top: 'auto',
        bottom: 'auto',
      }
    },
    type: Object,
  },
}

export type FixednavProps = ExtractPropTypes<typeof fixednavProps>

export const fixednavEmits = {
  [UPDATE_VISIBLE_EVENT]: (val: boolean) => isBoolean(val),
  [SELECTED_EVENT]: (val: { item: any; event: Event }) => val instanceof Object,
}

export type FixednavEmits = typeof fixednavEmits
