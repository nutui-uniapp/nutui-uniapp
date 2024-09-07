import type { ExtractPropTypes } from 'vue'
import { UPDATE_MODEL_EVENT } from '../_constants'
import {
  commonProps,
  isNumber,
  isString,
  makeArrayProp,
  makeNumberProp,
  makeNumericProp,
  makeStringProp,
  truthProp,
} from '../_utils'
import type { EcardChangeEvent, EcardDataItem, EcardDataValue } from './type'

export const ecardProps = {
  ...commonProps,
  /**
   * @description 购买电子卡所需价钱
   */
  modelValue: makeNumericProp(0),
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
  cardAmountMin: makeNumericProp(1),
  /**
   * @description 其他面值最大值
   */
  cardAmountMax: makeNumericProp(9999),
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
  [UPDATE_MODEL_EVENT]: (val: EcardDataValue) => isNumber(val) || isString(val),
  update: (val: EcardDataValue) => isNumber(val) || isString(val),
  change: (evt: EcardChangeEvent) => evt instanceof Object,
  inputChange: (val: string) => isString(val),
  changeStep: (val1: number, val2: EcardDataValue) => isNumber(val1) && (isNumber(val2) || isString(val2)),
  inputClick: () => true,
}

export type ECardEmits = typeof ecardEmits
