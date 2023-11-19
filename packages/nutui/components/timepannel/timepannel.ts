import type { ExtractPropTypes } from 'vue'
import { commonProps, isNumber, isString, makeNumericProp } from '../_utils'
import { CHANGE_EVENT } from '../_constants'

export const timepannelProps = {
  ...commonProps,
  /**
   * @description 显示的名称
   */
  name: String,
  /**
   * @description 唯一标识，和 current-key一起标识当前选择的天
   */
  pannelKey: makeNumericProp(0),
}

export type TimePannelProps = ExtractPropTypes<typeof timepannelProps>

export const timepannelEmits = {
  [CHANGE_EVENT]: (pannelKey: number | string) => isNumber(pannelKey) || isString(pannelKey),
}

export type TimePannelEmits = typeof timepannelEmits
