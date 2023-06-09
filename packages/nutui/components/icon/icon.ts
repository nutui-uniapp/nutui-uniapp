import type { ExtractPropTypes, PropType } from 'vue'

export const iconProps = {
  class: { type: String, default: '' },
  popClass: { type: String, default: '' },
  name: { type: String, default: '' },
  size: { type: [String, Number], default: '' },
  classPrefix: { type: String, default: 'nut-icon' },
  fontClassName: { type: String, default: 'nutui-iconfont' },
  color: { type: String, default: '' },
  tag: { type: String as PropType<keyof HTMLElementTagNameMap>, default: 'i' },
}

export type IconProps = ExtractPropTypes<typeof iconProps>

export const iconEmits = {
  click: (evt: Event) => evt instanceof Event,
}
