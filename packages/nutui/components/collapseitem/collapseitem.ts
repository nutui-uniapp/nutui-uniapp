import type { ExtractPropTypes, PropType } from 'vue'
import { commonProps, makeNumericProp, makeRequiredProp, makeStringProp, truthProp } from '../_utils'

export const collapseitemProps = {
  ...commonProps,
  /**
   * @description 折叠面板的引用对象
   */
  collapseRef: Object,
  /**
   * @description 标题栏左侧内容，支持插槽传入（`props` 传入的优先级更高）
   */
  title: makeStringProp(''),
  /**
   * @description 唯一标识符，必填
   */
  name: {
    ...makeRequiredProp([String, Number] as PropType<string | number>),
    default: -1,
  },
  /**
   * @description 标题栏右侧内容，支持插槽传入（`props` 传入的优先级更高）
   */
  value: makeStringProp(''),
  /**
   * @description 标题栏描述信息
   */
  label: makeStringProp(''),
  /**
   * @description 标题栏是否禁用
   */
  disabled: Boolean,
  /**
   * @description 是否显示边框
   * @type boolean
   * @default true
   */
  border: truthProp,
  /**
   * @description 标题栏左侧图标组件，等同于 `nutui-icon` 组件
   */
  icon: makeStringProp('down-arrow'),
  /**
   * @description 点击折叠和展开的旋转角度，在自定义图标模式下生效
   */
  rotate: makeNumericProp(180),
}

export type CollapseItemProps = ExtractPropTypes<typeof collapseitemProps>
