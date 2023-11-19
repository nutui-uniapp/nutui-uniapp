import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumberProp, makeNumericProp, makeStringProp } from '../_utils'

export const loadingpageProps = {
  ...commonProps,
  /**
   * @description 提示内容
   */
  loadingText: makeStringProp('正在加载'),
  /**
   * @description 文字上方用于替换loading动画的图片
   */
  image: makeStringProp(''),
  /**
   * @description 是否加载中
   */
  loading: Boolean,
  /**
   * @description 背景颜色
   */
  bgColor: makeStringProp('#ffffff'),
  /**
   * @description 字体颜色
   */
  customColor: makeStringProp('#C8C8C8'),
  /**
   * @description 字体大小
   */
  fontSize: makeNumericProp(19),
  /**
   * @description 图标大小
   */
  iconSize: makeNumericProp(28),
  /**
   * @@description 边框和线条颜色
   */
  loadingColor: makeStringProp('#C8C8C8'),
  /**
   * @description 层级
   */
  zIndex: makeNumberProp(9999),
}

export type LoadingPageProps = ExtractPropTypes<typeof loadingpageProps>
