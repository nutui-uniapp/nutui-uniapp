<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, reactive, ref, useSlots, watch } from 'vue'
import { CHANGE_EVENT, CLOSE_EVENT, UPDATE_MODEL_EVENT } from '../_constants'
import { useRect } from '../_hooks'
import { getMainClass, getRandomId } from '../_utils'
import NutIcon from '../icon/icon.vue'
import NutPopover from '../popover/popover.vue'
import { tourEmits, tourProps } from './tour'

const COMPONENT_NAME = 'nut-tour'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(tourProps)

const emit = defineEmits(tourEmits)

const slots = useSlots()

const instance = getCurrentInstance()!

const elId = getRandomId()

const state = reactive({
  showTour: props.modelValue,
  active: 0,
})

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

const showPopup = ref([false])

const maskRect: any[] = []

const maskStyles = ref<any[]>([])

function updateMaskStyle(index: number) {
  const { offset, maskWidth, maskHeight } = props

  if (!maskRect[index])
    return

  const { width, height, left, top } = maskRect[index]

  // 中心点：[横，纵]
  const center = [left + width / 2, top + height / 2]
  const w = Number(maskWidth || width)
  const h = Number(maskHeight || height)

  maskStyles.value[index] = {
    width: `${w + +offset[1] * 2}px`,
    height: `${h + +offset[0] * 2}px`,
    top: `${center[1] - h / 2 - +offset[0]}px`,
    left: `${center[0] - w / 2 - +offset[1]}px`,
  }
}

function changeStep(type: string) {
  const current = state.active

  let next = current
  if (type === 'next')
    next = current + 1
  else
    next = current - 1

  showPopup.value[current] = false

  setTimeout(() => {
    showPopup.value[next] = true

    state.active = next
  }, 300)

  emit(CHANGE_EVENT, state.active)
}

function getRootPosition() {
  props.steps.forEach(async (item, index) => {
    let rect
    // #ifdef H5
    rect = await useRect(item.target)
    // #endif

    // #ifndef H5
    // TODO  uniapp微信小程序无法实现，获取不到组件外节点的信息
    rect = await useRect(item.target, instance.root)
    if (rect.left! < 0)
      rect.left = -rect.left!

    if (rect.top! < 0)
      rect.top = -rect.top!
    if (rect.right! < 0)
      rect.right = -rect.right!
    if (rect.bottom! < 0)
      rect.bottom = -rect.bottom!
    // #endif

    maskRect[index] = rect

    updateMaskStyle(index)
  })
}

function close() {
  state.showTour = false
  showPopup.value[state.active] = false

  emit(CLOSE_EVENT, state.active)
  emit(UPDATE_MODEL_EVENT, false)
}

function handleMaskClick() {
  if (props.closeOnClickOverlay) {
    close()
  }
}

watch(() => props.modelValue, (value) => {
  if (value) {
    state.active = 0
    getRootPosition()
  }

  state.showTour = value
  showPopup.value[state.active] = value
})

onMounted(() => {
  setTimeout(() => {
    getRootPosition()
  }, 500)
})
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <view v-if="state.showTour" class="nut-tour-masked" @click="handleMaskClick" />

    <view v-for="(item, index) in props.steps" :key="index" style="height: 0;">
      <view
        v-if="state.showTour"
        :id="`nut-tour-popid${index}${elId}`"
        class="nut-tour-mask"
        :class="[props.mask ? (showPopup[index] ? '' : 'nut-tour-mask-hidden') : 'nut-tour-mask-none']"
        :style="maskStyles[index]"
      />

      <NutPopover
        v-if="state.showTour"
        v-model:visible="showPopup[index]"
        :location="item.location || props.location"
        :target-id="`nut-tour-popid${index}${elId}`"
        :bg-color="props.bgColor"
        :theme="props.theme"
        :close-on-click-outside="false"
        :offset="item.popoverOffset || [0, 12]"
        :arrow-offset="item.arrowOffset || 0"
        :duration="200"
      >
        <template #content>
          <slot v-if="slots.default" />

          <template v-else>
            <view v-if="props.type === 'step'" class="nut-tour-content">
              <view v-if="props.showTitleBar" class="nut-tour-content-top">
                <view @click="close">
                  <NutIcon class="nut-tour-content-top-close" name="close" size="10px" />
                </view>
              </view>

              <view class="nut-tour-content-inner">
                {{ item.content }}
              </view>

              <view class="nut-tour-content-bottom">
                <view class="nut-tour-content-bottom-init">
                  {{ state.active + 1 }}/{{ props.steps.length }}
                </view>

                <view class="nut-tour-content-bottom-operate">
                  <slot v-if="slots['prev-step']" name="prev-step" />

                  <template v-else>
                    <view
                      v-if="state.active !== 0 && props.showPrevStep"
                      class="nut-tour-content-bottom-operate-btn"
                      @click="changeStep('prev')"
                    >
                      {{ props.prevStepTxt }}
                    </view>
                  </template>

                  <view
                    v-if="props.steps.length - 1 === state.active"
                    class="nut-tour-content-bottom-operate-btn active"
                    @click="close"
                  >
                    {{ props.completeTxt }}
                  </view>

                  <slot v-if="slots['next-step']" name="next-step" />

                  <template v-else>
                    <view
                      v-if="props.steps.length - 1 !== state.active"
                      class="nut-tour-content-bottom-operate-btn active"
                      @click="changeStep('next')"
                    >
                      {{ props.nextStepTxt }}
                    </view>
                  </template>
                </view>
              </view>
            </view>

            <view v-if="props.type === 'tile'" class="nut-tour-content nut-tour-content-tile">
              <view class="nut-tour-content-inner">
                {{ item.content }}
              </view>
            </view>
          </template>
        </template>
      </NutPopover>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
