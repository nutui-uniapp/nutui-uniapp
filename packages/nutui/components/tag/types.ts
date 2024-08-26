export const tagType = ['primary', 'success', 'danger', 'warning', 'default'] as const
export type TagType = (typeof tagType)[number]
