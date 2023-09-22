import type { ExtractPropTypes, PropType } from 'vue'
import { popupProps } from '../popup'
import { isBoolean } from '../_utils'
import type { RegionData, existRegionData } from './type'

export const addressProps = {
  ...popupProps,
  modelValue: {
    type: Array,
    default: () => [],
  },
  visible: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'custom',
  },
  customAddressTitle: {
    type: String,
    default: '',
  },
  province: {
    type: Array as PropType<RegionData[]>,
    default: () => [],
  },
  city: {
    type: Array as PropType<RegionData[]>,
    default: () => [],
  }, // 市
  country: {
    type: Array as PropType<RegionData[]>,
    default: () => [],
  }, // 县
  town: {
    type: Array as PropType<RegionData[]>,
    default: () => [],
  }, // 镇
  isShowCustomAddress: {
    type: Boolean,
    default: true,
  }, // 是否显示‘选择其他地区’按钮 type=‘exist’ 生效
  existAddress: {
    type: Array as PropType<existRegionData[]>,
    default: () => [],
  }, // 现存地址列表
  existAddressTitle: {
    type: String,
    default: '',
  },
  customAndExistTitle: {
    type: String,
    default: '',
  },
  height: {
    type: [String, Number],
    default: '200',
  },
  columnsPlaceholder: {
    type: [String, Array],
    default: '',
  },
}

export type AddressProps = ExtractPropTypes<typeof addressProps>

export const addressEmits = {
  'update:visible': (val: boolean) => isBoolean(val),
  'update:modelValue': () => true,
  'type': () => true,
  'close': (val: {
    data: any
    type: string
  }) => true,
  'change': (val: any) => true,
  'switchModule': (val: any) => true,
  'closeMask': (val: any) => true,
  'selected': (val: any, item: any, copyExistAdd: any[]) => true,

}

export type AddressEmits = typeof addressEmits
