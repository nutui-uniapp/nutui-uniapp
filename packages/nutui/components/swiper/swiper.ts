import type { ExtractPropTypes } from 'vue'
import { commonProps, isNumber, makeNumericProp, makeStringProp, truthProp } from '../_utils'
import { CHANGE_EVENT } from '../_constants'

export const swiperProps = {
  ...commonProps,
  /**
   * @description 轮播卡片的宽度
   */
  width: makeNumericProp(uni.getSystemInfoSync().windowWidth),
  /**
   * @description 轮播卡片的高度
   */
  height: makeNumericProp(0),
  /**
   * @description 轮播方向,可选值 `horizontal`, `vertical`
   */
  direction: makeStringProp<'horizontal' | 'vertical'>('horizontal'),
  /**
   * @description 分页指示器是否展示
   */
  paginationVisible: Boolean,
  /**
   * @description 分页指示器选中的颜色
   */
  paginationColor: makeStringProp('#fff'),
  /**
   * @description 是否循环轮播
   */
  loop: truthProp,
  /**
   * @description 动画时长（单位是ms）
   */
  duration: makeNumericProp(500),
  /**
   * @description 自动轮播时长，0表示不会自动轮播
   */
  autoPlay: makeNumericProp(0),
  /**
   * @description 是否自动播放
   */
  isAutoPlay: truthProp,
  /**
   * @description 初始化索引值
   */
  initPage: makeNumericProp(0),
  /**
   * @description 是否可触摸滑动
   */
  touchable: truthProp,
  /**
   * @description 滑动过程中是否禁用默认事件
   */
  isPreventDefault: truthProp,
  /**
   * @description 滑动过程中是否禁止冒泡
   */
  isStopPropagation: truthProp,
  /**
   * @description 轮播列表数据
   */
  list: {
    type: Array,
    default: () => [],
  },
}

export type SwiperProps = ExtractPropTypes<typeof swiperProps>

export const swiperEmits = {
  [CHANGE_EVENT]: (val: number) => isNumber(val),
}

export type SwiperEmits = typeof swiperEmits

export const SWIPER_KEY = Symbol('swiper')

export interface SwiperInst {
  /**
   * @description 切换到上一页
   */
  prev: () => void
  /**
   * @description 切换到下一页
   */
  next: () => void
  /**
   * @description 切换到指定轮播
   * @param index
   * @returns
   */
  to: (index: number) => void
}
