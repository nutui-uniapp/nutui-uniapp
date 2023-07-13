import type { ExtractPropTypes } from 'vue'

export const hiteggsProps = {
  num: {
    type: Number,
    default: 9,
  },
  intactImg: {
    type: String,
    default:
      '//img10.360buyimg.com/imagetools/jfs/t1/217651/2/1901/114207/617770f2E74551438/5342f7b949e7bec3.png',
  },
  hammer: {
    type: String,
    default:
      '//img13.360buyimg.com/imagetools/jfs/t1/95159/30/17834/9845/61444874E0f463263/924741cae55efb85.png',
  },
  splitImg: {
    type: String,
    default:
      '//img13.360buyimg.com/imagetools/jfs/t1/219949/29/1870/75442/61776f7aE5d1a8e07/a8de5321e4e8071e.png',
  },
  width: {
    type: String,
    default: '80px',
  },
  height: {
    type: String,
    default: '80px',
  },
}

export type HitEggsProps = ExtractPropTypes<typeof hiteggsProps>

export const hiteggsEmits = {
  click: () => true,
}

export type HitEggsEmits = typeof hiteggsEmits
