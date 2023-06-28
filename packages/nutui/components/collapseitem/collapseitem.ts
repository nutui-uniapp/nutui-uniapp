import type { ExtractPropTypes } from 'vue'

export const collapseitemProps = {
  collapseRef: {
    type: Object,
  },
  title: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  name: {
    type: [Number, String],
    default: -1,
    required: true,
  },
  border: {
    type: Boolean,
    default: true,
  },
  icon: {
    type: String,
    default: () => 'down-arrow',
  },
  rotate: {
    type: [String, Number],
    default: 180,
  },
}

export type CollapseItemProps = ExtractPropTypes<typeof collapseitemProps>
