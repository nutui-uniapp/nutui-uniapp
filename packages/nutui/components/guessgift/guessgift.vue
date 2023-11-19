<script setup lang="ts">
import { type ComponentInternalInstance, computed, defineComponent, getCurrentInstance, onMounted, reactive, ref, watch } from 'vue'
import { PREFIX, refRandomId } from '../_constants'
import { useRect, useSelectorQuery } from '../_hooks'
import { getMainClass } from '../_utils'
import { guessgiftEmits, guessgiftProps } from './guessgift'

const props = defineProps(guessgiftProps)

const emit = defineEmits(guessgiftEmits)
const instance = getCurrentInstance() as ComponentInternalInstance
const { query } = useSelectorQuery(instance)

defineExpose({ start })
const bowlList = reactive([1, 2, 3])
const num = ref(0)
const lock = ref(false)
// 点击的哪一个碗，index索引
const bowlRaiseIndex = ref(0)
const bowlRaiseIndexTop = ref('0')
// 碗是否可点击
const bowlLock = ref(true)
// 豆子的展示与否
const showBean = ref(false)
// 3只碗
let bowlEle: any = reactive([])
// 碗父级盒子
const bowlBox: any = ref(null)

watch(
  () => showBean.value,
  (n, o) => {
    bowlEle = []
  },
)

const classes = computed(() => {
  return getMainClass(props, componentName, {
    'guess-gift': true,
    'disabledClick': bowlLock.value,
  })
})

// 打乱数组顺序
const shuffleNewary = ref([])
function shuffle(ary: Array<any>) {
  const array = JSON.parse(JSON.stringify(ary))
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  shuffleNewary.value = array
  return array
}

// 获取每个碗的位置定位信息
const bowlLocation: any = reactive([])
let bowlElement: any = reactive([])
const guessGiftEle: any = ref()
const goldBeanEle: any = ref()
onMounted(() => {
  query.selectAll('.bowl-item').boundingClientRect()
  query.selectAll('.guess-gift').boundingClientRect()
  query.selectAll('.gold-bean').boundingClientRect()
  query.exec((res) => {
    bowlElement = [...res[0]]
    guessGiftEle.value = res[1][0]
    goldBeanEle.value = res[2][0]
    res[0].forEach((element: Element) => {
      bowlLocation.push(element)
    })
  })
})

const goldBeanDom: any = ref(null)
const goldBeanDomLeft: any = ref('30px')
let orginBowlCopy: any = reactive([])
function changePosition() {
  const orginBowl = bowlLocation
  orginBowlCopy = shuffle(bowlLocation)
  // 通过对比原始值和打乱顺序后的值，判断哪些元素应该移动
  bowlEle.forEach((element: any, index: number) => {
    const originDom = orginBowl[index].left
    const newDom = orginBowlCopy[index].left
    element.style.left = `${(originDom - newDom) * -1}px`
  })
}

const timer = ref<any>(null)
function init() {
  showBean.value = false
  clearTimeout(timer) // 初始化timeout定时器，防止定时器重叠
  timer.value = setTimeout(() => {
    changePosition() // 循环调用函数自身，以达到循环的效果
    if (num.value < props.turnNumber) {
      init()
      num.value++
    }
    else {
      clearTimeout(timer)
      num.value = 0
      setTimeout(() => {
        lock.value = false
        bowlLock.value = false
      }, 500)
    }
  }, props.turnsFrequency)
}

function start() {
  const _index = bowlRaiseIndex.value
  if (lock.value) {
    return false
  }
  else {
    if (_index > -1) {
      // bowlEle[_index].style.top = 0;
      bowlRaiseIndexTop.value = '0'
    }
  }
  showBean.value = true
  lock.value = true
  const idx = _index + 1 > 2 ? 0 : _index + 1

  bowlRaiseIndex.value = idx
  // const item = bowlEle[idx];
  const _item = bowlElement[idx]
  const m: any = shuffleNewary.value[idx] || _item
  setTimeout(() => {
    if (_index > -1) {
      const _itemParentLeft = guessGiftEle.value.left || 0
      const _left
        = `${m.left
        + m.width / 2
        - _itemParentLeft
        - goldBeanEle.value.width / 2
        }px`
      goldBeanDomLeft.value = _left
    }
    setTimeout(() => {
      // item.style.top = `-${props.raiseHeight}px`;
      bowlRaiseIndexTop.value = `-${props.raiseHeight}px`
      setTimeout(() => {
        // item.style.top = 0;
        bowlRaiseIndexTop.value = '0'
      }, 800)
      setTimeout(() => {
        init()
      }, 1300)
    }, 400)
  }, 100)
}

function raise(index: number) {
  if (lock.value)
    return false

  if (props.prizeIndex > -1) {
    showBean.value = true
    const _item = orginBowlCopy[index]
    const _itemParentLeft = guessGiftEle.value.left || 0
    // setTimeout(() => {
    const _left
      = `${_item.left
      + _item.width / 2
      - _itemParentLeft
      - goldBeanEle.value.width / 2
      }px`
    goldBeanDomLeft.value = _left
    // }, 100);
  }
  else {
    showBean.value = false
  }
  bowlRaiseIndex.value = index
  bowlRaiseIndexTop.value = `-${props.raiseHeight}px`
  // bowlEle[index].style.top = `-${props.raiseHeight}px`;
  setTimeout(() => {
    emit('endTurns')
    bowlLock.value = true
  }, 300)

  watch(() => bowlList, (val) => {
    val.forEach(async (item, index) => {
      const rect = await useRect(`${refRandomId}-${index}`, instance)

      bowlEle.push(rect)
    })
  }, { immediate: true, deep: true })
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-guess-gift`

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
  <view ref="bowlBox" :class="classes" :style="customStyle">
    <view
      v-for="(item, idx) of bowlList" :id="`${refRandomId}-${idx}`" :key="`bowl${item}`" class="bowl-item"
      :style="{ top: bowlRaiseIndex === idx ? bowlRaiseIndexTop : '0' }" @click="raise(idx)"
    />
    <view
      ref="goldBeanDom" class="gold-bean" :class="[showBean ? '_opacity1' : '_opacity0']"
      :style="{ left: goldBeanDomLeft }"
    />
  </view>
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
