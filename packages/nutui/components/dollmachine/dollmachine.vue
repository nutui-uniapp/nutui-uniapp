<script lang="ts" setup>
import type { ComponentInternalInstance } from 'vue'
import { computed, getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { getMainClass } from '../_utils'
import { dollmachineEmits, dollmachineProps } from './dollmachine'

const COMPONENT_NAME = 'nut-doll-machine'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(dollmachineProps)

const emit = defineEmits(dollmachineEmits)

const instance = getCurrentInstance()!

const giftPrize = ref()
const machineBoxDom = ref()
const machineToolsDom = ref()

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

const toolsStyles = reactive({
  left: '50%',
  marginLeft: '0',
})

function leftCenter() {
  toolsStyles.left = '50%'
  const toolDomW = machineToolsDom.value.width
  toolsStyles.marginLeft = `-${toolDomW / 2}px`
}

function leftRightMove(flag: string) {
  const query = uni.createSelectorQuery().in(instance)
  query.select('.machine-box').boundingClientRect()
  query.select('.machine-tools').boundingClientRect()
  query.exec((res) => {
    machineBoxDom.value = res[0]
    machineToolsDom.value = res[1]
    setTimeout(() => {
      const toolDomLeft = machineToolsDom.value.left
      const boxDomW = machineBoxDom.value.width
      const toolDomW = machineToolsDom.value.width
      const max = boxDomW - toolDomW
      if (
        (flag === 'left' && toolDomLeft === 0)
        || (flag === 'right' && toolDomLeft === max)
      ) {
        return false
      }

      const distance = flag === 'left' ? -30 : 30
      const left: number = toolDomLeft + distance

      if (flag === 'left')
        toolsStyles.left = `${left < 0 ? 0 : left}px`

      else
        toolsStyles.left = `${left > max ? max : left}px`
    }, 200)
  })
}

function moveTools(flag: string) {
  toolsStyles.marginLeft = '0'
  if (flag === 'left' || flag === 'right')
    leftRightMove(flag)
}

const clawStyles = ref({
  'background-image': `url(${props.defaultClaw})`,
  'background-size': '100% 100%',
  'background-position': 'center',
  'background-repeat': 'no-repeat',
})

const machineRopeDom = ref()
const machineClawDom = ref()
const machineOperateDom = ref()
const machineLock = ref(false)
const initLock = ref(false)

const ropeDomHeight = ref({
  height: '20px',
})

function startGame() {
  emit('startTurns')
  giftPrize.value = ''
  machineLock.value = true
  initLock.value = true
  clawStyles.value['background-image'] = `url(${props.activeClaw})`
  const heightBox = machineBoxDom.value.height
  const heightTools = machineToolsDom.value.height
  const heightOpe = machineOperateDom.value.height
  ropeDomHeight.value.height = `${heightBox - heightOpe - heightTools - 20}px`
}

function initGame() {
  ropeDomHeight.value.height = '20px'
}

function ropeHeightEnd() {
  const query = uni.createSelectorQuery().in(instance)
  query.select('.machine-rope').boundingClientRect()
  query.exec((res) => {
    machineRopeDom.value = res[0]
    initLock.value = false
    if (machineRopeDom.value.height === 20) {
      machineLock.value = false
      emit('endTurns')
    }
    clawStyles.value['background-image'] = `url(${props.defaultClaw})`
    giftPrize.value = props.prizeList[props.prizeIndex].imagePath
    setTimeout(() => {
      initGame()
    }, 200)
  })
}

const giftEle: any[] = reactive([])

function setGiftEle() {
  const left = Math.floor(Math.random() * 325)
  const top = Math.floor(Math.random() * (150 - 70) + 70)
  const angle = Math.floor(Math.random() * 90)
  giftEle.push({
    left: `${left}px`,
    top: `${top}px`,
    transform: `rotate(${angle}deg)`,
  })
}

function init() {
  giftPrize.value = ''
  leftCenter()
  initGame()
}

onMounted(() => {
  uni.$once('dollMachineMounted', () => {
    const query = uni.createSelectorQuery().in(instance)
    query.select('.machine-box').boundingClientRect()
    query.select('.machine-tools').boundingClientRect()
    query.select('.machine-operate').boundingClientRect()
    query.select('.machine-rope').boundingClientRect()
    query.exec((res) => {
      machineBoxDom.value = res[0]
      machineToolsDom.value = res[1]
      machineOperateDom.value = res[2]
      machineRopeDom.value = res[3]
      setTimeout(() => {
        leftCenter()
        // ropeHeightEnd()
      }, 300)
    })
  })
  uni.$emit('dollMachineMounted')
})
</script>

<template>
  <div :class="classes" :style="props.customClass">
    <div class="machine-box">
      <div class="machine-tools" :style="toolsStyles">
        <div
          id="machine-rope"
          class="machine-rope"
          :style="ropeDomHeight"
          @transitionend="ropeHeightEnd"
          @webkitTransitionEnd="ropeHeightEnd"
        />

        <div ref="machineClawDom" class="machine-claw" :style="clawStyles">
          <image
            v-if="giftPrize"
            :src="giftPrize"
            alt="加载失败"
            class="gift-prize"
          />
        </div>
      </div>

      <div class="machine-gift-box">
        <div class="box-glass">
          <image
            v-for="(item, index) of props.prizeList"
            :id="`gift${index}`"
            :key="index"
            :ref="setGiftEle"
            :src="item.imagePath"
            class="gift-img"
            :style="giftEle[index]"
            @load="setGiftEle"
          />
        </div>

        <div class="machine-operate">
          <div class="machine-direction" :class="[machineLock ? 'disabledClick' : '']">
            <span class="direction-block direction-block-left" @click="moveTools('left')" />

            <span class="direction-block direction-block-right" @click="moveTools('right')" />
          </div>

          <div
            class="machine-btn"
            :class="[machineLock ? 'machine-disabled disabledClick' : 'machine-start']"
            @click="startGame"
          />

          <div
            class="machine-reset-btn"
            :class="[initLock ? 'disabledClick' : '']"
            @click="init"
          >
            重置
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "./index";
</style>
