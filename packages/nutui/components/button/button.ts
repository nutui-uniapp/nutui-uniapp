import type { ExtractPropTypes, PropType } from 'vue'
import type { ButtonLang, ButtonOnAddgroupappEvent, ButtonOnAgreeprivacyauthorizationEvent, ButtonOnChooseaddressEvent, ButtonOnChooseavatarEvent, ButtonOnChooseinvoicetitleEvent, ButtonOnErrorEvent, ButtonOnGetphonenumberEvent, ButtonOnLaunchappEvent, ButtonOnLoginEvent, ButtonOnOpensettingEvent, ButtonOnSubscribeEvent, ButtonOpenType } from '@uni-helper/uni-app-types'
import { commonProps } from '../_utils'
import type { ButtonFormType, ButtonShape, ButtonSize, ButtonType } from './type'

export const buttonProps = {
  ...commonProps,
  customColor: String,
  shape: {
    type: String as PropType<ButtonShape>,
    default: 'round',
  },
  plain: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<ButtonType>,
    default: 'default',
  },
  formType: {
    type: String as PropType<ButtonFormType>,
    default: 'button',
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'normal',
  },
  block: {
    type: Boolean,
    default: false,
  },
  openType: {
    type: String as PropType<ButtonOpenType>,
    default: '',
  },
  lang: {
    type: String as PropType<ButtonLang>,
    default: 'en',
  },
  sessionFrom: {
    type: String,
    default: '',
  },
  sendMessageTitle: {
    type: String,
    default: '',
  },
  sendMessagePath: {
    type: String,
    default: '',
  },
  sendMessageImg: {
    type: String,
    default: '',
  },
  showMessageCard: {
    type: Boolean,
    default: false,
  },
  groupId: {
    type: String,
    default: '',
  },
  guildId: {
    type: String,
    default: '',
  },
  publicId: {
    type: String,
    default: '',
  },
  dataImId: {
    type: String,
    default: '',
  },
  dataImType: {
    type: String,
    default: '',
  },
  dataGoodsId: {
    type: String,
    default: '',
  },
  dataOrderId: {
    type: String,
    default: '',
  },
  dataBizLine: {
    type: String,
    default: '',
  },

}

export const buttonEmits = {
  click: (evt: MouseEvent) => evt,
  getphonenumber: (evt: ButtonOnGetphonenumberEvent) => evt,
  getuserinfo: (evt: any) => evt,
  error: (evt: ButtonOnErrorEvent) => evt,
  opensetting: (evt: ButtonOnOpensettingEvent) => evt,
  launchapp: (evt: ButtonOnLaunchappEvent) => evt,
  contact: (evt: any) => evt,
  chooseavatar: (evt: ButtonOnChooseavatarEvent) => evt,
  agreeprivacyauthorization: (evt: ButtonOnAgreeprivacyauthorizationEvent) => evt,
  addgroupapp: (evt: ButtonOnAddgroupappEvent) => evt,
  chooseaddress: (evt: ButtonOnChooseaddressEvent) => evt,
  chooseinvoicetitle: (evt: ButtonOnChooseinvoicetitleEvent) => evt,
  subscribe: (evt: ButtonOnSubscribeEvent) => evt,
  login: (evt: ButtonOnLoginEvent) => evt,
  im: (evt: any) => evt,

}

export type ButtonEmits = typeof buttonEmits

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
