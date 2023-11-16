import type { ExtractPropTypes } from 'vue'
import { popupProps } from '../popup'
import { commonProps, isBoolean, makeArrayProp, makeNumericProp, makeStringProp, truthProp } from '../_utils'
import { CHANGE_EVENT, CLOSE_EVENT, SELECTED_EVENT, UPDATE_MODEL_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'
import type { AddressExistRegionData, AddressRegionData, AddressType } from './type'

export const addressProps = {
  ...popupProps,
  ...commonProps,
  /**
   * @description 设置默认选中值
   */
  modelValue: makeArrayProp<any>([]),

  /**
   * @description 是否打开地址选择
   */
  visible: Boolean,

  /**
   * @description 地址选择类型：'exist' | 'custom' | 'custom2'
   */
  type: makeStringProp<AddressType>('custom'),

  /**
   * @description 自定义地址选择标题
   */
  customAddressTitle: makeStringProp(''),

  /**
   * @description 省份数据
   */
  province: makeArrayProp<AddressRegionData>([]),

  /**
   * @description 城市数据
   */
  city: makeArrayProp<AddressRegionData>([]),

  /**
   * @description 县区数据
   */
  country: makeArrayProp<AddressRegionData>([]),

  /**
   * @description 乡镇数据
   */
  town: makeArrayProp<AddressRegionData>([]),

  /**
   * @description 是否显示 '选择其他地区' 按钮。仅在类型为 'exist' 时生效
   */
  isShowCustomAddress: truthProp,

  /**
   * @description 现存地址列表
   */
  existAddress: makeArrayProp<AddressExistRegionData>([]),

  /**
   * @description 已有地址标题
   */
  existAddressTitle: makeStringProp(''),

  /**
   * @description 切换自定义地址和已有地址的按钮标题
   */
  customAndExistTitle: makeStringProp(''),

  /**
   * @description 弹层中内容容器的高度
   */
  height: makeNumericProp('200'),

  /**
   * @description 列提示文字
   */
  columnsPlaceholder: {
    type: [String, Array],
    default: '',
  },
}

export type AddressProps = ExtractPropTypes<typeof addressProps>

export const addressEmits = {
  [UPDATE_VISIBLE_EVENT]: (val: boolean) => isBoolean(val),
  [UPDATE_MODEL_EVENT]: () => true,
  [CLOSE_EVENT]: (val: {
    data: any
    type: string
  }) => val instanceof Object,
  [CHANGE_EVENT]: (val: {
    next?: string
    value?: AddressRegionData
    custom: string
  }) => val instanceof Object,
  switchModule: (val: { type: AddressType }) => val instanceof Object,
  closeMask: (val: { closeWay: 'self' | 'mask' | 'cross' }) => val instanceof Object,
  [SELECTED_EVENT]: (prevExistAdd: AddressExistRegionData, item: AddressExistRegionData, copyExistAdd: AddressExistRegionData[]) => prevExistAdd instanceof Object && item instanceof Object && copyExistAdd instanceof Object,

}

export type AddressEmits = typeof addressEmits
