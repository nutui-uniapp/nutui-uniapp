import type { ExtractPropTypes, PropType } from 'vue'
import type { AvatarShape, AvatarSize } from '../avatar'

export const AVATAR_KEY = Symbol('avatarGroup')
export const avatargroupProps = {
  maxContent: {
    type: String,
    default: '',
  },
  maxCount: {
    type: [Number, String],
    default: '',
  },
  maxBgColor: {
    type: String,
    default: '#eee',
  },
  maxColor: {
    type: String,
    default: '#666',
  },
  size: {
    type: String as PropType<AvatarSize> || Number,
    default: 'normal',
  },
  shape: {
    type: String as PropType<AvatarShape>,
    default: 'round',
  },
  span: {
    type: String,
    default: '-8',
  },
  zIndex: {
    type: String,
    default: 'left',
  },
}

export type AvatarGroupProps = ExtractPropTypes<typeof avatargroupProps>
