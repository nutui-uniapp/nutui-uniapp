import type { ExtractPropTypes, PropType } from 'vue'

export const timedetailProps = {
  times: {
    type: Array as PropType<any[]>,
    default: () => {
      return []
    },
  },
}

export type TimeDetailProps = ExtractPropTypes<typeof timedetailProps>

export const timedetailEmits = {
  select: (time: string) => true,
}

export type TimeDetailEmits = typeof timedetailEmits
