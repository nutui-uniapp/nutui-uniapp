import type { ExtractPropTypes } from 'vue'

export const countupProps = {
  initNum: {
    type: Number,
    default: 0,
  },
  endNum: {
    type: Number,
    default: 0,
  },
  speed: {
    type: Number,
    default: 1,
  },
  toFixed: {
    type: Number,
    default: 0,
  },
  during: {
    type: Number,
    default: 1000,
  },
  startFlag: {
    type: Boolean,
    default: true,
  },
  // 数字滚动
  numWidth: {
    type: Number,
    default: 20,
  },
  numHeight: {
    type: Number,
    default: 20,
  },
  scrolling: {
    type: Boolean,
    default: false,
  },
  // 自定义图片
  customBgImg: {
    type: String,
    default: '',
  },
  customSpacNum: {
    type: Number,
    default: 0,
  },
  customChangeNum: {
    type: Number,
    default: 1,
  },
  // 抽奖
  type: {
    type: String,
    default: '',
  },
  machineNum: {
    type: Number,
    default: 3,
  },
  machinePrizeNum: {
    type: Number,
    default: 0,
  },
  machinePrizeLevel: {
    type: Number,
    default: 0,
  },
  machineTrunMore: {
    type: Number,
    default: 0,
  },
}

export type CountUpProps = ExtractPropTypes<typeof countupProps>

export const countupEmits = {
  click: () => true,
  scrollEnd: (val?: boolean) => true,
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
  machineLuck: () => void
}
