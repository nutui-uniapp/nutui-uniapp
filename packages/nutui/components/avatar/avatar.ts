import type { ExtractPropTypes, PropType } from 'vue'
import { commonProps } from '../_utils'

export type AvatarSize = 'large' | 'normal' | 'small'
export type AvatarShape = 'round' | 'square'

export const avatarProps = {
  ...commonProps,
  size: {
    type: [String, Number] as PropType<AvatarSize | string | number>,
    default: 'normal',
  },
  shape: {
    type: String as PropType<AvatarShape>,
    default: 'round',
  },
  bgColor: {
    type: String,
    default: '#eee',
  },
  customColor: {
    type: String,
    default: '#666',
  },
}

export type AvatarProps = ExtractPropTypes<typeof avatarProps>
