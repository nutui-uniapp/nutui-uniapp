export const avatarSize = ['large', 'normal', 'small'] as const
export type AvatarSize = (typeof avatarSize)[number]

export const avatarShape = ['round', 'square'] as const
export type AvatarShape = (typeof avatarShape)[number]

export interface AvatarFinalSize {
  /**
   * 是否为预设尺寸
   */
  preset: boolean
  /**
   * 尺寸值
   */
  value: string
}
