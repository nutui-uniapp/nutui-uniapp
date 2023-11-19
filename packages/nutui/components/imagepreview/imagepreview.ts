import type { ExtractPropTypes, PropType } from 'vue'
import { type Interceptor, commonProps, isNumber, makeArrayProp, makeNumberProp, makeNumericProp, makeStringProp, truthProp } from '../_utils'
import { CLOSE_EVENT } from '../_constants'
import type { ImageInterface } from './types'

export const imagepreviewProps = {
  ...commonProps,
  /**
   * @description 是否展示预览图片
   */
  show: Boolean,
  /**
   * @description 是否缩放图片
   */
  scale: Boolean,
  /**
   * @description 预览图片数组
   */
  images: makeArrayProp<ImageInterface>([]),
  /**
   * @description 点击图片可以退出预览
   */
  contentClose: truthProp,
  /**
   * @description 初始页码
   */
  initNo: makeNumberProp(0),
  /**
   * @description 分页指示器是否展示
   */
  paginationVisible: Boolean,
  /**
   * @description 分页指示器选中的颜色
   */
  paginationColor: makeStringProp('#fff'),
  /**
   * @description 自动轮播时长，0 表示不会自动轮播
   */
  autoplay: makeNumericProp(3000),
  /**
   * @description 是否显示页码
   */
  showIndex: truthProp,
  /**
   * 是否显示关闭图标
   * @description 是否显示关闭图标
   */
  closeable: Boolean,
  /**
   * @description 关闭图标位置，可选值：`top-left`
   */
  closeIconPosition: makeStringProp<'top-right' | 'top-left'>('top-right'),
  /**
   * @description 关闭前的回调函数，返回 `false` 可阻止关闭，支持返回 `Promise`
   */
  beforeClose: Function as PropType<Interceptor>,
  /**
   * @description 是否循环播放
   */
  isLoop: truthProp,
}

export type ImagePreviewProps = ExtractPropTypes<typeof imagepreviewProps>

export const imagepreviewEmits = {
  [CLOSE_EVENT]: () => true,
  change: (val: number) => isNumber(val),
  longPress: (image: ImageInterface) => image instanceof Object,
}

export type ImagePreviewEmits = typeof imagepreviewEmits
