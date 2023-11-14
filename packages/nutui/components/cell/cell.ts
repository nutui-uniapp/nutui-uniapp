import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumericProp, makeStringProp } from '../_utils'
import { CLICK_EVENT } from '../_constants'

export const cellProps = {
  ...commonProps,
  /**
   * @description 标题名称
   */
  title: makeStringProp(''),
  /**
   * @description 左侧副标题
   */
  subTitle: makeStringProp(''),
  /**
   * @description 右侧描述
   */
  desc: makeStringProp(''),
  /**
   * @description 右侧描述文本对齐方式 [text-align](https://www.w3school.com.cn/cssref/pr_text_text-align.asp)
   */
  descTextAlign: makeStringProp<'right' | 'left' | 'center' | 'justify' | 'inherit'>('right'),
  /**
   * @description 是否展示右侧箭头并开启点击反馈
   */
  isLink: Boolean,
  /**
   * @description 点击后跳转的目标路由对象，
   */
  to: makeStringProp(''),
  /**
   * @description 圆角半径
   */
  roundRadius: makeNumericProp(''),
  /**
   * @description 是否使内容垂直居中
   */
  center: Boolean,
  /**
   * @description 单元格大小，可选值为 `large`
   */
  size: makeStringProp(''),
}

export type CellProps = ExtractPropTypes<typeof cellProps>

export const cellEmits = {
  [CLICK_EVENT]: (event: Event) => event instanceof Object,
}

export type CellEmits = typeof cellEmits
