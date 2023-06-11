import type { ExtractPropTypes } from 'vue'

export const cellgroupProps = {
  title: { type: String, default: '' },
  desc: { type: String, default: '' },
}

export type CellGroupProps = ExtractPropTypes<typeof cellgroupProps>
