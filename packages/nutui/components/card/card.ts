import type { ExtractPropTypes } from 'vue'
import { commonProps, makeStringProp, truthProp } from '../_utils'

export const cardProps = {
  ...commonProps,
  /**
   * @description 左侧图片 `Url`
   */
  imgUrl: makeStringProp(''),

  /**
   * @description 标题
   */
  title: makeStringProp(''),

  /**
   * @description 商品价格
   */
  price: makeStringProp(''),

  /**
   * @description 会员价格
   */
  vipPrice: makeStringProp(''),

  /**
   * @description 店铺介绍
   */
  shopDesc: makeStringProp(''),

  /**
   * @description 配送方式
   */
  delivery: makeStringProp(''),

  /**
   * @description 店铺名称
   */
  shopName: makeStringProp(''),

  /**
   * @description 是否需要价格展示
   */
  isNeedPrice: truthProp,
}

export type CardProps = ExtractPropTypes<typeof cardProps>
