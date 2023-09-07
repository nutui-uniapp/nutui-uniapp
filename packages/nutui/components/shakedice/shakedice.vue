<script setup lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { PREFIX } from '../_constants'
import { shakediceEmits, shakediceProps } from './shakedice'

const props = defineProps(shakediceProps)

const emit = defineEmits(shakediceEmits)
defineExpose({ shake })
const dice = ref<number>(6)
const clickTag = ref<boolean>(false)
const animationStyle = ref({})
const isShake = ref(false)
const transformStyle = ref({
  transform: '',
})

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
  }
})
watch(
  () => isShake.value,
  (value) => {
    if (value) {
      const params = {
        animation: `rotate ${props.time}s infinite linear`,
      }
      animationStyle.value = { ...animationStyle.value, ...params }
      setTimeout(() => {
        isShake.value = false
        animationStyle.value = { animation: 'none' }
        const posible: any = [
          { value: 1, x: 0, y: 0 },
          { value: 1, x: 0, y: 0 },
          { value: 2, x: 90, y: 0 },
          { value: 3, x: 0, y: -90 },
          { value: 4, x: 0, y: 90 },
          { value: 5, x: -90, y: 0 },
          { value: 6, x: 0, y: 180 },
        ]
        const _result = posible[props.id]
        setTimeout(() => {
          transformStyle.value.transform = `rotateX(${_result.x}deg) rotateY(${_result.y}deg)`
        }, 0)
        emit('end')
      }, props.speed)
    }
    else {
      animationStyle.value = {}
    }
  },
)
function shake() {
  if (clickTag.value)
    return false
  clickTag.value = true
  isShake.value = true
  setTimeout(() => {
    clickTag.value = false
  }, props.speed)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-shakedice`

export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <div :class="classes" :style="[animationStyle, transformStyle]">
    <div v-for="(item, index) in new Array(dice)" :key="index" class="page" :class="[`page${index + 1}`]">
      <text v-for="(item2, index2) in new Array(index + 1)" :key="index2" />
    </div>
  </div>
</template>

<style lang="scss">
@import './index';
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "ShakeDice"
  }
}
</route>
