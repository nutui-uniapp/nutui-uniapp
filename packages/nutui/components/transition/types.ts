import type { animations } from './use-transition'

export type TransitionName = keyof typeof animations

export interface NutAnimation {
  enter: string
  leave: string
}

export type NutAnimationName = 'fade' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom'
export type NutAnimationtimingFunction = 'linear' | 'ease' | 'ease-in' | 'ease-in-out' | 'ease-out' | 'step-start' | 'step-end'
export interface NutAnimations {
  [key: string]: NutAnimation
}
