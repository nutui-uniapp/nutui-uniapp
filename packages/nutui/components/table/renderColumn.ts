import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'

export default defineComponent({
  props: {
    slots: Array as PropType<Array<() => void | undefined>>,
    record: Object,
  },
  setup(props: any) {
    return () => h('view', {}, props.slots[0] ? props.slots[0](props.record) : props.slots[1](props.record))
  },
})
