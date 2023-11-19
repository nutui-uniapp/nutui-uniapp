import type { ExtractPropTypes } from 'vue'
import { commonProps, isBoolean, isNumber, isString, makeArrayProp, makeNumericProp } from '../_utils'
import { CLOSE_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'

export const skuProps = {
  ...commonProps,
  /**
   * @description 是否显示商品规格弹框
   */
  visible: Boolean,
  /**
   * @description 商品 sku 数据
   */
  sku: makeArrayProp<any>([]),
  /**
   * @description 商品信息
   */
  goods: Object,
  /**
   * @description 设置 inputNumber 最大值
   */
  stepperMax: makeNumericProp(99999),
  /**
   * @description 设置 inputNumber 最小值
   */
  stepperMin: makeNumericProp(1),
  /**
   * 底部按钮设置。[`confirm`, `buy`, `cart`] 分别对应确定、立即购买、加入购物车
   * @description 底部按钮设置
   */
  btnOptions: makeArrayProp<string>(['confirm']),
  /**
   * @description 按钮上部添加文案，默认为空，有值时显示
   */
  btnExtraText: String,
  /**
   * @description 数量选择组件左侧文案
   */
  stepperTitle: String,
  /**
   * @description InputNumber 与标题之间的文案
   */
  stepperExtraText: {
    type: [Function, Boolean],
    default: false,
  },
  /**
   * @description 立即购买按钮文案
   */
  buyText: String,
  /**
   * @description 加入购物车按钮文案
   */
  addCartText: String,
  /**
   * @description 确定按钮文案
   */
  confirmText: String,
}

export type SkuProps = ExtractPropTypes<typeof skuProps>

export const skuEmits = {
  [UPDATE_VISIBLE_EVENT]: (val: boolean) => isBoolean(val),
  selectSku: (val: any) => val instanceof Object,
  changeStepper: (val: number) => isNumber(val),
  clickBtnOperate: (val: {
    type: string
    value: string | number
  }) => val instanceof Object,
  clickCloseIcon: () => true,
  clickOverlay: () => true,
  [CLOSE_EVENT]: () => true,
  reduce: (val: number | object) => isNumber(val) || isString(val) || val instanceof Object,
  add: (val: number | object) => isNumber(val) || isString(val) || val instanceof Object,
  overLimit: (val: any) => val instanceof Object,
}

export type SkuEmits = typeof skuEmits
