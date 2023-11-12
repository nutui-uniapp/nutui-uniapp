import type { ExtractPropTypes } from 'vue'
import { commonProps } from '../_utils'

export const iconProps = {
  ...commonProps,
  popClass: { type: String, default: '' },
  width: { type: [String, Number], default: '' },
  height: { type: [String, Number], default: '' },
  name: { type: String, default: '' },
  size: { type: [String, Number], default: '' },
  classPrefix: { type: String, default: 'nut-icon' },
  fontClassName: { type: String, default: 'nutui-iconfont' },
  customColor: { type: String, default: '' },
}

export type IconProps = ExtractPropTypes<typeof iconProps>

export const iconEmits = {
  click: (evt: Event) => evt instanceof Object,
}

export type IconEmits = typeof iconEmits
