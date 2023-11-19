import type { ExtractPropTypes } from 'vue'
import { commonProps, makeArrayProp, makeNumberProp } from '../_utils'
import { CLICK_EVENT } from '../_constants'

export const dollmachineProps = {
  ...commonProps,
  /**
   * @description 初始化爪子的图片链接
   */
  defaultClaw: {
    type: String,
    default:
      'https://img14.360buyimg.com/imagetools/jfs/t1/146467/34/22553/4178/61b088afE198f676e/21952e7018d1d141.png',
  },
  /**
   * @description 爪子抓到奖品的图片链接
   */
  activeClaw: {
    type: String,
    default:
      'https://img13.360buyimg.com/imagetools/jfs/t1/218082/28/7092/15914/61b088afEf9c253f7/8392e2b14bd8f43a.png',
  },
  /**
   * @description 速度
   */
  speed: makeNumberProp(20),
  /**
   * @description 奖品列表
   */
  prizeList: makeArrayProp<any>([]),
  /**
   * @description 中奖奖品在列表的索引位置
   */
  prizeIndex: makeNumberProp(-1),
}

export type DollMachineProps = ExtractPropTypes<typeof dollmachineProps>

export const dollmachineEmits = {
  [CLICK_EVENT]: () => true,
  startTurns: () => true,
  endTurns: () => true,
}

export type DollMachineEmits = typeof dollmachineEmits
