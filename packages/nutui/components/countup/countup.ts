import type { ExtractPropTypes } from 'vue'
import { commonProps, isBoolean, makeNumberProp, makeStringProp, truthProp } from '../_utils'

export const countupProps = {
  ...commonProps,
  /**
   * @description 初始数字
   */
  initNum: makeNumberProp(0),
  /**
   * @description 结束数字
   */
  endNum: makeNumberProp(0),
  /**
   * @description 间隔数字，目前仅支持基础用法
   */
  speed: makeNumberProp(1),
  /**
   * @description 保留小数点后几位
   */
  toFixed: makeNumberProp(0),
  /**
   * @description 触发数字滚动的标识
   */
  startFlag: truthProp,
  /**
   * @description 滚动一次运行时间
   */
  during: makeNumberProp(1000),
  /**
   * @description 数字宽度，常用于自定义无缝滚动
   */
  numWidth: makeNumberProp(20),
  /**
   * @description 数字高度，常用于自定义无缝滚动（抽奖功能必传）
   */
  numHeight: makeNumberProp(20),
  scrolling: Boolean,
  /**
   * @description 要变化的数字（用于自定义图片，`initNum`、`endNum` 在此无效）
   */
  customChangeNum: makeNumberProp(1),
  /**
   * @description 自定义图片（建议使用雪碧图实现，使用抽奖功能必须使用雪碧图）
   */
  customBgImg: makeStringProp(''),
  /**
   * @description 图片中数字之间可能会存在间距
   */
  customSpacNum: makeNumberProp(0),
  /**
   * @description 抽奖功能传 machine，可选值为 `machine` `' '`
   */
  type: makeStringProp(''),
  /**
   * @description 奖品个数，一共多少个奖品，必传
   */
  machinePrizeNum: makeNumberProp(0),
  /**
   * @description 抽奖位，即滚动几个，必传
   */
  machineNum: makeNumberProp(3),
  /**
   * @description 中奖图标，图标在雪碧图中的位置
   */
  machinePrizeLevel: makeNumberProp(0),
  /**
   * @description 滚动圈数
   */
  machineTurnMore: makeNumberProp(0),
}

export type CountUpProps = ExtractPropTypes<typeof countupProps>

export const countupEmits = {
  scrollEnd: (val?: boolean) => isBoolean(val) || val === undefined,
}

export type CountUpEmits = typeof countupEmits

export interface IData {
  valFlag: boolean
  current: number
  sortFlag: string
  initDigit1: number
  initDigit2: number
  to0_10: number[]
  to10_0: Array<number>
  timer: null | any
  totalCount: number // 正整数
  pointNum: number // 小数位
  numberVal: number // 数字
  num_total_len: number // 数字长度
  relNum: number // 去除小数点
  customNumber: number
  prizeLevelTrun: number
  prizeY: Array<any>
  prizeYPrev: Array<any>
  // machineTransition: 'none',
  finshMachine: number
  notPrize: Array<any>
  typeMachine: string
}

export interface CountUpInst {
  /**
   * @description 抽奖
   */
  machineLuck: () => void
}
