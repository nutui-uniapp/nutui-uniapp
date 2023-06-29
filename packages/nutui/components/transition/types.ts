import type { defaultAnimations } from './use-transition'

export type TransitionName = keyof typeof defaultAnimations

export interface NutAnimation {
  enter: string
  leave: string
}

export type NutAnimationName = 'fade' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom' | 'none'
export type NutAnimationtimingFunction = 'linear' | 'ease' | 'ease-in' | 'ease-in-out' | 'ease-out' | 'step-start' | 'step-end'
export interface NutAnimations {
  [key: string]: NutAnimation
}
