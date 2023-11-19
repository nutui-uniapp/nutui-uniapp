import type { ExtractPropTypes } from 'vue'
import { commonProps, makeNumberProp } from '../_utils'
import { CLICK_EVENT } from '../_constants'

export const hiteggsProps = {
  ...commonProps,
  /**
   * @description 金蛋个数
   */
  num: makeNumberProp(9),
  /**
   * @description 完整金蛋图片地址
   */
  intactImg: {
    type: String,
    default:
      '//img10.360buyimg.com/imagetools/jfs/t1/217651/2/1901/114207/617770f2E74551438/5342f7b949e7bec3.png',
  },
  /**
   * @description 锤子图片
   */
  hammer: {
    type: String,
    default:
      '//img13.360buyimg.com/imagetools/jfs/t1/95159/30/17834/9845/61444874E0f463263/924741cae55efb85.png',
  },
  /**
   * @description
   */
  splitImg: {
    type: String,
    default:
      '//img13.360buyimg.com/imagetools/jfs/t1/219949/29/1870/75442/61776f7aE5d1a8e07/a8de5321e4e8071e.png',
  },
  /**
   * @description 金蛋图片宽度
   */
  width: {
    type: String,
    default: '80px',
  },
  /**
   * @description 金蛋图片高度
   */
  height: {
    type: String,
    default: '80px',
  },
}

export type HitEggsProps = ExtractPropTypes<typeof hiteggsProps>

export const hiteggsEmits = {
  [CLICK_EVENT]: () => true,
}

export type HitEggsEmits = typeof hiteggsEmits
