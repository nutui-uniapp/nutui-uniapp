import type { ExtractPropTypes, PropType } from 'vue'

export const skuProps = {
  visible: {
    type: Boolean,
    default: false,
  },

  sku: {
    type: Array,
    default: [],
  },

  goods: {
    type: Object,
    default: {},
  },

  // stepper 最大值
  stepperMax: {
    type: [Number, String],
    default: 99999,
  },

  // stepper 最小值
  stepperMin: {
    type: [Number, String],
    default: 1,
  },

  // 底部按钮配置  confirm cart  buy
  btnOptions: {
    type: Array as PropType<string[]>,
    default: () => ['confirm'],
  },

  // 数量选择左侧文案
  stepperTitle: {
    type: String,
    default: '',
  },

  // stepper 前面文案
  stepperExtraText: {
    type: [Function, Boolean],
    default: false,
  },

  btnExtraText: {
    type: String,
    default: '',
  },

  // 立即购买文案
  buyText: {
    type: String,
    default: '',
  },

  // 加入购物车文案
  addCartText: {
    type: String,
    default: '',
  },

  // 确定文案
  confirmText: {
    type: String,
    default: '',
  },
}

export type SkuProps = ExtractPropTypes<typeof skuProps>

export const skuEmits = {
  'update:visible': (val: boolean) => true,
  'selectSku': (val: any) => true,
  'changeStepper': (val: number) => true,
  'clickBtnOperate': (val: {
    type: string
    value: string | number
  }) => true,
  'clickCloseIcon': () => true,
  'clickOverlay': () => true,
  'close': () => true,
  'reduce': (val: number) => true,
  'add': (val: number) => true,
  'overLimit': (val: any) => true,
}

export type SkuEmits = typeof skuEmits
