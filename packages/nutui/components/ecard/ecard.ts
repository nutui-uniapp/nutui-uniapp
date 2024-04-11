import type { ExtractPropTypes } from 'vue'
import { commonProps, isNull, isNumber, makeArrayProp, makeNumberProp, makeStringProp, truthProp } from '../_utils'
import { UPDATE_MODEL_EVENT } from '../_constants'
import type { EcardChangeEvent, EcardDataItem } from './type'

export const ecardProps = {
  ...commonProps,
  /**
   * @description 购买电子卡所需价钱
   */
  modelValue: makeNumberProp(null),
  /**
   * @description 电子卡面值列表
   */
  list: makeArrayProp<EcardDataItem>([]),
  /**
   * @description 选择面值文案
   */
  chooseText: makeStringProp(''),
  /**
   * @description 是否显示其他面值
   */
  showOther: truthProp,
  /**
   * @description 其他面值文案
   */
  otherValueText: makeStringProp(''),
  /**
   * @description 其他面值默认提示语
   */
  placeholder: makeStringProp(''),
  /**
   * @description 符号标示
   */
  suffix: makeStringProp('¥'),
  /**
   * @description 其它面值最小值
   */
  cardAmountMin: makeNumberProp(1),
  /**
   * @description 其他面值最大值
   */
  cardAmountMax: makeNumberProp(9999),
  /**
   * @description 是否显示步进
   */
  showStep: truthProp,
  /**
   * @description 购买数量最小值
   */
  cardBuyMin: makeNumberProp(1),
  /**
   * @description 购买数量最大值
   */
  cardBuyMax: makeNumberProp(9999),
}

export type ECardProps = ExtractPropTypes<typeof ecardProps>

export const ecardEmits = {
  [UPDATE_MODEL_EVENT]: (val: number) => isNumber(val),
  change: (evt: EcardChangeEvent) => evt instanceof Object,
  inputChange: (val: number) => isNumber(val),
  changeStep: (val1: number, val2: number | null) => isNumber(val1) && (isNumber(val2) || isNull(val2)),
  inputClick: () => true,
}

export type ECardEmits = typeof ecardEmits
