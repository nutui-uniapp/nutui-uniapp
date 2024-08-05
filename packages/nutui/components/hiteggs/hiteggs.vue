<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { CLICK_EVENT } from '../_constants'
import { getMainClass } from '../_utils'
import { hiteggsEmits, hiteggsProps } from './hiteggs'

const COMPONENT_NAME = 'nut-hiteggs'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(hiteggsProps)

const emit = defineEmits(hiteggsEmits)

const hitIndex = ref()
const hitClick = ref(false)
const arr = reactive<any>([])

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
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

<template>
  <view :class="classes" :style="props.customStyle">
    <view
      v-for="(item, index) in props.num"
      :key="index"
      class="nut-eggs-item"
      :style="{ width: props.width, height: props.height }"
    >
      <image
        v-if="!(arr.indexOf(index) > -1)"
        class="intactImg"
        :src="props.intactImg"
        alt=""
        @click="hitEggs(index)"
      />

      <image
        v-if="arr.indexOf(index) > -1"
        class="splitImg"
        :src="props.splitImg"
        alt=""
      />

      <image
        class="hammer"
        :class="{ 'nut-hidden': index !== hitIndex }"
        style="animation: shake-rotate 0.5s linear 0s infinite"
        :src="props.hammer"
        alt=""
      />
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
