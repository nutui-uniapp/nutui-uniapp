import type { ExtractPropTypes } from 'vue'
import { commonProps, isString, makeArrayProp, makeObjectProp, makeStringProp } from '../_utils'
import { CLICK_EVENT } from '../_constants'
import type { FollowType, ImagesType, InfoType, VideosType } from './type'

export const commentProps = {
  ...commonProps,
  /**
   * @description 头部样式展示类型，可选： `default`，`complex`
   */
  headerType: makeStringProp<'default' | 'complex'>('default'),
  /**
   * @description 评论图片展示行数，可选： `one`，`multi`
   */
  imagesRows: makeStringProp<'one' | 'multi'>('one'),
  /**
   * @description 设置评论内容省略行数
   */
  ellipsis: {
    type: [String, Number, Boolean],
    default: false,
  },
  /**
   * @description 视频信息
   */
  videos: makeArrayProp<VideosType>([]),
  /**
   * @description 图片信息
   */
  images: makeArrayProp<ImagesType>([]),
  /**
   * @description 评论详情
   */
  info: makeObjectProp<InfoType>({} as InfoType),
  /**
   * @description
   */
  labels: {
    type: Function,
    default: () => '',
  },
  /**
   * @description 追评内容
   */
  follow: makeObjectProp<FollowType>({} as FollowType),
  /**
   * @description 配置底部按钮
   */
  operation: makeArrayProp<'replay' | 'like' | 'more'>(['replay', 'like', 'more']),
}

export type CommentProps = ExtractPropTypes<typeof commentProps>

export const commentEmits = {
  [CLICK_EVENT]: (val: object) => val instanceof Object,
  clickOperate: (val: string) => isString(val),
  clickImages: (val: any) => val instanceof Object,
}

export type CommentEmits = typeof commentEmits
