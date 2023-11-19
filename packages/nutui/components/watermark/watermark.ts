import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumberProp, makeNumericProp, makeStringProp, truthProp } from '../_utils'
import { CLICK_EVENT } from '../_constants'

export const watermarkProps = {
  ...commonProps,
  /**
   * @description 水印的名称
   */
  name: String,
  /**
   * @description 水印之间的垂直间距
   */
  gapY: makeNumberProp(48),
  /**
   * @description 水印之间的水平间距
   */
  gapX: makeNumberProp(24),
  /**
   * @description 追加的水印元素的z-index
   */
  zIndex: makeNumberProp(2000),
  /**
   * @description 水印的宽度
   */
  width: makeNumberProp(120),
  /**
   * @description 水印的高度
   */
  height: makeNumberProp(64),
  /**
   * @description 水印绘制时，旋转的角度
   */
  rotate: makeNumberProp(-22),
  /**
   * @description 图片源，建议导出 2 倍或 3 倍图，优先使用图片渲染水印
   */
  image: String,
  /**
   * @description 图片宽度
   */
  imageWidth: makeNumberProp(120),
  /**
   * @description 图片高度
   */
  imageHeight: makeNumberProp(64),
  /**
   * @description 水印文字内容
   */
  content: String,
  /**
   * @description 水印文字颜色
   */
  fontColor: makeStringProp('rgba(0,0,0,.15)'),
  /**
   * @description 水印文字样式
   */
  fontStyle: makeStringProp('normal'),
  /**
   * @description 水印文字字体
   */
  fontFamily: makeStringProp('PingFang SC'),
  /**
   * @description 水印文字粗细
   */
  fontWeight: makeStringProp('normal'),
  /**
   * @description 水印文字大小
   */
  fontSize: makeNumericProp(14),
  /**
   * @description 是否覆盖整个页面
   */
  fullPage: truthProp,
}

export type WaterMarkProps = ExtractPropTypes<typeof watermarkProps>

export const watermarkEmits = {
  [CLICK_EVENT]: (val: Event) => val instanceof Object,
}

export type WaterMarkEmits = typeof watermarkEmits
