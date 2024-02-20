export const avatarSize = ['large', 'normal', 'small'] as const
export type AvatarSize = (typeof avatarSize)[number]
export const avatarShape = ['round', 'square'] as const
export type AvatarShape = (typeof avatarShape)[number]
