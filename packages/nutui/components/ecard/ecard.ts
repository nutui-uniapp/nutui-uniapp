import type { ExtractPropTypes } from 'vue'
import { commonProps, isNull, isNumber, isString, makeArrayProp, makeNumberProp, makeStringProp } from '../_utils'
import { UPDATE_MODEL_EVENT } from '../_constants'

interface dataList {
  price: string | number
}
export const ecardProps = {
  ...commonProps,
  /**
   * @description 购买电子卡所需价钱
   */
  modelValue: makeNumberProp(0),

  /**
   * @description 选择面值文案
   */
  chooseText: makeStringProp(''),

  /**
   * @description 其他面值文案
   */
  otherValueText: makeStringProp(''),

  /**
   * @description 电子卡面值列表
   */
  list: makeArrayProp<dataList>([]),

  /**
   * @description 其它面值最小值
   */
  cardAmountMin: makeNumberProp(1),

  /**
   * @description 其他面值最大值
   */
  cardAmountMax: makeNumberProp(9999),

  /**
   * @description 购买数量最小值
   */
  cardBuyMin: makeNumberProp(1),

  /**
   * @description 购买数量最大值
   */
  cardBuyMax: makeNumberProp(9999),

  /**
   * @description 其他面值默认提示语
   */
  placeholder: makeStringProp(''),

  /**
   * @description 符号标示
   */
  suffix: makeStringProp('¥'),
}

export type ECardProps = ExtractPropTypes<typeof ecardProps>

export const ecardEmits = {
  inputChange: (val: number) => isNumber(val),
  changeStep: (val1: number | string, val2: number | string) => (isNumber(val1) || isString(val1)) && (isNumber(val2) || isString(val2) || isNull(val2)),
  inputClick: () => true,
  change: (item: {
    price: number | string
  }) => item instanceof Object,
  [UPDATE_MODEL_EVENT]: (val: number) => isNumber(val),

}

export type ECardEmits = typeof ecardEmits
