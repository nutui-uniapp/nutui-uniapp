import type { defaultAnimations } from './use-transition'

export type TransitionName = keyof typeof defaultAnimations

export interface NutAnimation {
  enter: string
  leave: string
}

export const nutAnimationName = ['fade', 'fade-up', 'fade-down', 'fade-left', 'fade-right', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'zoom', 'none'] as const
export type NutAnimationName = (typeof nutAnimationName)[number]

export const nutAnimationtimingFunction = ['linear', 'ease', 'ease-in', 'ease-in-out', 'ease-out', 'step-start', 'step-end'] as const
export type NutAnimationtimingFunction = (typeof nutAnimationtimingFunction)[number]

export interface NutAnimations {
  [key: string]: NutAnimation
}
