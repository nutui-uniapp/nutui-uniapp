<script setup lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import { CLICK_EVENT, PREFIX } from '../_constants'
import { getMainClass } from '../_utils'
import { hiteggsEmits, hiteggsProps } from './hiteggs'

const props = defineProps(hiteggsProps)

const emit = defineEmits(hiteggsEmits)
const hitIndex = ref()
const hitClick = ref(false)
const arr = reactive<any>([])
const classes = computed(() => {
  return getMainClass(props, componentName)
})
function hitEggs(index: number) {
  if (hitClick.value)
    return
  hitClick.value = true
  hitIndex.value = index
  setTimeout(() => {
    arr.push(index)
    hitIndex.value = props.num + 1
    hitClick.value = false
    emit(CLICK_EVENT)
  }, 1500)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-hiteggs`

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
  <div :class="classes" :style="customStyle">
    <div v-for="(item, index) in num" :key="index" class="nut-eggs-item" :style="{ width, height }">
      <image v-if="!(arr.indexOf(index) > -1)" class="intactImg" :src="intactImg" alt="" @click="hitEggs(index)" />
      <image v-if="arr.indexOf(index) > -1" class="splitImg" :src="splitImg" alt="" />
      <image
        v-show="index === hitIndex" class="hammer" style="animation: shake-rotate 0.5s linear 0s infinite" :src="hammer"
        alt=""
      />
    </div>
  </div>
</template>

<style lang="scss">
@import './index';
</style>
