import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumericProp, makeStringProp } from '../_utils'

export const rowProps = {
  ...commonProps,
  /**
   * @description 布局方式，可选值为 `flex`
   */
  type: makeStringProp<'flex' | ''>(''),
  /**
   * @description 列元素之间的间距（单位为 `px`）
   */
  gutter: makeNumericProp(''),
  /**
   * @description `Flex` 主轴对齐方式，可选值为 `start` `end` `center` `space-around` `space-between` `space-evenly`
   */
  justify: makeStringProp<'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'>('start'),
  /**
   * @description `Flex` 交叉轴对齐方式，可选值为 `flex-start` `center` `flex-end`
   */
  align: makeStringProp<'flex-start' | 'center' | 'flex-end'>('flex-start'),
  /**
   * @description `Flex` 是否换行，可选值为 `nowrap` `wrap` `reverse`
   */
  flexWrap: makeStringProp<'nowrap' | 'wrap' | 'reverse'>('nowrap'),
}

export type RowProps = ExtractPropTypes<typeof rowProps>
