export const progressStatus = ['text', 'active', 'icon'] as const
export type ProgressStatus = (typeof progressStatus)[number]
