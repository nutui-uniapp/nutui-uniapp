import type { ExtractPropTypes } from 'vue'
import { commonProps, isNumber, isString, makeArrayProp, makeObjectProp, truthProp } from '../_utils'

interface OptionsType {
  [key: string]: string
}
export const addresslistProps = {
  ...commonProps,
  /**
   * @description 地址数组
   */
  data: makeArrayProp<unknown>([]),

  /**
   * @description 长按功能
   */
  longPress: Boolean,

  /**
   * @description 右滑功能
   */
  swipeEdition: Boolean,

  /**
   * @description 是否展示底部按钮
   */
  showBottomButton: truthProp,

  /**
   * @description 自定义 `key` 值时，设置映射关系
   */
  options: makeObjectProp<OptionsType>({}),
}

export type AddressListProps = ExtractPropTypes<typeof addresslistProps>

export const addresslistEmits = {
  delIcon: (val: Event, item: unknown, index: number | string) => (val instanceof Object) && (item instanceof Object) && (isNumber(index) || isString(index)),
  editIcon: (val: Event, item: unknown, index: number | string) => (val instanceof Object) && (item instanceof Object) && (isNumber(index) || isString(index)),
  clickItem: (val: Event, item: unknown, index: number | string) => (val instanceof Object) && (item instanceof Object) && (isNumber(index) || isString(index)),
  longCopy: (val: Event, item: unknown, index: number | string) => (val instanceof Object) && (item instanceof Object) && (isNumber(index) || isString(index)),
  longSet: (val: Event, item: unknown, index: number | string) => (val instanceof Object) && (item instanceof Object) && (isNumber(index) || isString(index)),
  longDel: (val: Event, item: unknown, index: number | string) => (val instanceof Object) && (item instanceof Object) && (isNumber(index) || isString(index)),
  swipeDel: (val: Event, item: unknown, index: number | string) => (val instanceof Object) && (item instanceof Object) && (isNumber(index) || isString(index)),
  add: (val: Event) => val instanceof Object,

}

export type AddressListEmits = typeof addresslistEmits
