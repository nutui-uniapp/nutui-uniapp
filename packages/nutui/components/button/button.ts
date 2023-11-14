import type { ExtractPropTypes, PropType } from 'vue'
import type { ButtonLang, ButtonOnAddgroupappEvent, ButtonOnAgreeprivacyauthorizationEvent, ButtonOnChooseaddressEvent, ButtonOnChooseavatarEvent, ButtonOnChooseinvoicetitleEvent, ButtonOnErrorEvent, ButtonOnGetphonenumberEvent, ButtonOnLaunchappEvent, ButtonOnLoginEvent, ButtonOnOpensettingEvent, ButtonOnSubscribeEvent, ButtonOpenType } from '@uni-helper/uni-app-types'
import { commonProps, makeStringProp } from '../_utils'
import { CLICK_EVENT } from '../_constants'
import type { ButtonFormType, ButtonShape, ButtonSize, ButtonType } from './type'

export const buttonProps = {
  ...commonProps,
  /**
   * @description 按钮颜色，支持传入 `linear-gradient` 渐变色
   */
  customColor: String,
  /**
   * @description 形状，可选值为 `square` `round`
   */
  shape: makeStringProp<ButtonShape>('round'),
  /**
   * @description 是否为朴素按钮
   */
  plain: Boolean,
  /**
   * @description 按钮 `loading` 状态
   */
  loading: Boolean,
  /**
   * @description 是否禁用按钮
   */
  disabled: Boolean,
  /**
   * @description 按钮类型，可选值为 `primary` `info` `warning` `danger` `success` `default`
   */
  type: makeStringProp<ButtonType>('default'),
  /**
   * @description 表单类型，可选值 `button` `submit` `reset`
   */
  formType: makeStringProp<ButtonFormType>('button'),
  /**
   * @description 尺寸，可选值为 `large` `small` `mini` `normal`
   */
  size: makeStringProp<ButtonSize>('normal'),
  /**
   * @description 是否为块级元素
   */
  block: Boolean,
  /**
   * @description 小程序开放能力
   */
  openType: String as PropType<ButtonOpenType>,
  /**
   * @description 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文
   */
  lang: makeStringProp<ButtonLang>('en'),
  /**
   * @description 会话来源，openType="contact"时有效
   */
  sessionFrom: String,
  /**
   * @description 会话内消息卡片标题，openType="contact"时有效
   */
  sendMessageTitle: String,
  /**
   * @description 会话内消息卡片点击跳转小程序路径，openType="contact"时有效
   */
  sendMessagePath: String,
  /**
   * @description 会话内消息卡片图片，openType="contact"时有效
   */
  sendMessageImg: String,
  /**
   * @description 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，openType="contact"时有效
   */
  showMessageCard: Boolean,
  /**
   * @description 打开群资料卡时，传递的群号，openType="openGroupProfile"时有效
   */
  groupId: String,
  /**
   * @description 打开频道页面时，传递的频道号 openType="openGuildProfile"时有效
   */
  guildId: {
    type: String,
    default: '',
  },
  /**
   * @description 打开公众号资料卡时，传递的号码 openType="openPublicProfile"时有效
   */
  publicId: String,
  /**
   * @description 客服的抖音号,openType="im"时有效
   */
  dataImId: String,
  /**
   * @description IM卡片类型,openType="im"时有效
   */
  dataImType: String,
  /**
   * @description 商品的id，仅支持泛知识课程库和生活服务商品库中的商品,openType="im"时有效
   */
  dataGoodsId: String,
  /**
   * @description 订单的id，仅支持交易2.0订单, openType="im"时有效
   */
  dataOrderId: String,
  /**
   * @description 商品类型，“1”代表生活服务，“2”代表泛知识。openType="im"时有效
   */
  dataBizLine: String,

}

export const buttonEmits = {
  [CLICK_EVENT]: (evt: MouseEvent) => evt instanceof Object,
  getphonenumber: (evt: ButtonOnGetphonenumberEvent) => evt instanceof Object,
  getuserinfo: (evt: any) => evt instanceof Object,
  error: (evt: ButtonOnErrorEvent) => evt instanceof Object,
  opensetting: (evt: ButtonOnOpensettingEvent) => evt instanceof Object,
  launchapp: (evt: ButtonOnLaunchappEvent) => evt instanceof Object,
  contact: (evt: any) => evt instanceof Object,
  chooseavatar: (evt: ButtonOnChooseavatarEvent) => evt instanceof Object,
  agreeprivacyauthorization: (evt: ButtonOnAgreeprivacyauthorizationEvent) => evt instanceof Object,
  addgroupapp: (evt: ButtonOnAddgroupappEvent) => evt instanceof Object,
  chooseaddress: (evt: ButtonOnChooseaddressEvent) => evt instanceof Object,
  chooseinvoicetitle: (evt: ButtonOnChooseinvoicetitleEvent) => evt instanceof Object,
  subscribe: (evt: ButtonOnSubscribeEvent) => evt instanceof Object,
  login: (evt: ButtonOnLoginEvent) => evt instanceof Object,
  im: (evt: any) => evt instanceof Object,
}

export type ButtonEmits = typeof buttonEmits

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
