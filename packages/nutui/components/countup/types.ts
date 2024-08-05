export interface CountUpData {
  valFlag: boolean
  current: number
  sortFlag: string
  initDigit1: number
  initDigit2: number
  to0_10: number[]
  to10_0: number[]
  timer: null | any
  totalCount: number // 正整数
  pointNum: number // 小数位
  numberVal: number // 数字
  num_total_len: number // 数字长度
  relNum: number // 去除小数点
  customNumber: number
  prizeLevelTrun: number
  prizeY: any[]
  prizeYPrev: any[]
  // machineTransition: 'none',
  finshMachine: number
  notPrize: any[]
  typeMachine: string
}

export interface CountUpInst {
  /**
   * @description 抽奖
   */
  machineLuck: () => void
}
