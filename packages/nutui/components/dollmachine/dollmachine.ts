import type { ExtractPropTypes } from 'vue'

export const dollmachineProps = {
  defaultClaw: {
    type: String,
    default:
      'https://img14.360buyimg.com/imagetools/jfs/t1/146467/34/22553/4178/61b088afE198f676e/21952e7018d1d141.png',
  },
  activeClaw: {
    type: String,
    default:
      'https://img13.360buyimg.com/imagetools/jfs/t1/218082/28/7092/15914/61b088afEf9c253f7/8392e2b14bd8f43a.png',
  },
  speed: {
    type: Number,
    default: 20,
  },
  prizeList: {
    type: Array<any>,
    default: () => [],
  },
  prizeIndex: {
    type: Number,
    default: -1,
  },
}

export type DollMachineProps = ExtractPropTypes<typeof dollmachineProps>

export const dollmachineEmits = {
  click: () => true,
  startTurns: () => true,
  endTurns: () => true,
}

export type DollMachineEmits = typeof dollmachineEmits
