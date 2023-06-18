import type { ExtractPropTypes, PropType } from 'vue'

export type AvatarSize = 'large' | 'normal' | 'small'
export const avatarProps = {
  size: {
    type: String as PropType<AvatarSize> || Number,
    default: '',
  },
  shape: {
    type: String,
    default: 'round',
  },
  bgColor: {
    type: String,
    default: '#eee',
  },
  color: {
    type: String,
    default: '#666',
  },
}

export type AvatarProps = ExtractPropTypes<typeof avatarProps>
