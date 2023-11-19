<script setup lang="ts">
import { computed, defineComponent, nextTick, onMounted, onUnmounted, reactive, watch } from 'vue'
import { PREFIX } from '../_constants'
import { useExtend } from '../_hooks'
import { getMainClass } from '../_utils'
import { type IData, countupEmits, countupProps } from './countup'

const props = defineProps(countupProps)
const emit = defineEmits(countupEmits)
defineExpose({ machineLuck })
const classes = computed(() => {
  return getMainClass(props, componentName)
})
const data = reactive<IData>({
  valFlag: false,
  current: 0,
  sortFlag: 'add',
  initDigit1: 0,
  initDigit2: 0,
  to0_10: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
  to10_0: [0, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1],
  timer: null,
  totalCount: 0, // 正整数
  pointNum: 0, // 小数位
  numberVal: 0, // 数字
  num_total_len: 0, // 数字长度
  relNum: 0, // 去除小数点
  customNumber: 1,
  prizeLevelTrun: 0,
  prizeY: [],
  prizeYPrev: [],
  // machineTransition: 'none',
  finshMachine: 0,
  notPrize: [],
  typeMachine: '',
})
const { startFlag, scrolling, customBgImg, type } = reactive(props)
watch(
  () => props.customChangeNum,
  (count, prevCount) => {
    clearIntervalTime()
    // data.customNumber = count;
    countGo(0)
  },
)
watch(
  () => props.machinePrizeLevel,
  (count, prevCount) => {
    data.prizeLevelTrun = count
  },
)
watch(
  () => props.initNum,
  (count, prevCount) => {
    data.current = count
    data.valFlag = false
    valChange()
  },
)
watch(
  () => props.endNum,
  (count, prevCount) => {
    data.current = props.initNum
    data.valFlag = false
    valChange()
  },
)
function valChange() {
  if (data.valFlag)
    return false

  if (startFlag) {
    if (scrolling || customBgImg) {
      if (type !== 'machine')
        countGo()
    }
    else {
      countChange()
      setTimeout(() => {
        data.valFlag = true
      }, 300)
    }
  }
}
// 清空定时器
function clearIntervalTime() {
  clearInterval(Number(data.timer))
  data.timer = null
}
// 精确计算
function calculation(num1: number, num2: number, type: string) {
  const num1Digits = (num1.toString().split('.')[1] || '').length
  const num2Digits = (num2.toString().split('.')[1] || '').length
  const baseNum = 10 ** Math.max(num1Digits, num2Digits)
  if (type === '-') {
    const n = Number((num1 * baseNum - num2 * baseNum).toFixed(0))
    return n / baseNum
  }
  else {
    const m = Number((num1 * baseNum + num2 * baseNum).toFixed(0))
    return m / baseNum
  }
}
// 数字滚动-top值
function topNumber(index: number) {
  const { num_total_len, pointNum, initDigit1, initDigit2, sortFlag } = data
  const idx1
        = sortFlag === 'add' || sortFlag === 'equal'
          ? String(initDigit2)[index - (num_total_len - pointNum)]
          : 10 - Number(String(initDigit2)[index - (num_total_len - pointNum)])
  const idx2
        = sortFlag === 'add' || sortFlag === 'equal' ? String(initDigit1)[index] : 10 - Number(String(initDigit1)[index])
  let num
        = index > num_total_len - pointNum - 1
          ? `${-idx1 * 100}%`
          : index <= String(initDigit1).length - 1
            ? `${-idx2 * 100}%`
            : 0
  if (num === '-1000%')
    num = 0

  return num
}
// 数字滚动-到哪里了
function turnNumber(index: number) {
  const { num_total_len, pointNum, initDigit1, initDigit2, sortFlag } = data
  const idx1 = String(initDigit2)[index - (num_total_len - pointNum)]
  const num
        = index > num_total_len - pointNum - 1
          ? idx1 || 0
          : index <= String(initDigit1).length - 1
            ? String(initDigit1)[index]
            : 0
  return num
}
// 基础用法
function countChange() {
  const { endNum, initNum, speed, toFixed } = props
  const countTimer = setInterval(() => {
    if (initNum > endNum) {
      // 减少
      if (data.current <= endNum || data.current <= speed) {
        // 数字减小，有可能导致current小于speed
        data.current = Number(endNum.toFixed(toFixed))
        clearInterval(countTimer)
        emit('scrollEnd')
        data.valFlag = false
      }
      else {
        data.current = Number((Number.parseFloat(String(data.current)) - Number.parseFloat(String(speed))).toFixed(toFixed))
      }
    }
    else {
      // 增加
      if (data.current >= endNum) {
        data.current = Number(endNum.toFixed(toFixed))
        clearInterval(countTimer)
        emit('scrollEnd')
        data.valFlag = false
      }
      else {
        data.current = Number((Number.parseFloat(String(data.current)) + Number.parseFloat(String(speed))).toFixed(toFixed))
      }
    }
  }, props.during)
}
function countGo(flag?: number): void {
  let { initNum, endNum, toFixed, customBgImg } = props
  if (customBgImg)
    initNum = props.customChangeNum

  // --------------
  let startNumber1, startNumber2, endNumber1, endNumber2
  if (initNum !== 0) {
    if (toFixed !== 0)
      initNum = Number(initNum.toFixed(toFixed))

    if (String(initNum).includes('.')) {
      startNumber1 = String(initNum).split('.')[0].length
      startNumber2 = String(initNum).split('.')[1].length
    }
    else {
      startNumber1 = String(initNum).length
      startNumber2 = 0
    }
  }
  else {
    startNumber1 = 1
    startNumber2 = 0
  }
  if (endNum !== 0) {
    if (toFixed !== 0)
      endNum = Number(endNum.toFixed(toFixed))

    if (String(endNum).includes('.')) {
      endNumber1 = String(endNum).split('.')[0].length
      endNumber2 = String(endNum).split('.')[1].length
    }
    else {
      endNumber1 = String(endNum).length
      endNumber2 = 0
    }
  }
  else {
    endNumber1 = 1
    endNumber2 = 0
  }
  const len1 = startNumber1 >= endNumber1 ? startNumber1 : endNumber1
  const len2 = startNumber2 >= endNumber2 ? startNumber2 : endNumber2
  data.num_total_len = len1 + len2

  data.pointNum = len2

  // --------------
  if (initNum > endNum) {
    // 减少
    data.sortFlag = 'reduce'
    data.to0_10 = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    data.totalCount = calculation(initNum, endNum, '-')
    data.numberVal = Number(String(initNum))
  }
  else if (initNum < endNum) {
    // 增加
    data.sortFlag = 'add'
    data.to0_10 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    data.totalCount = calculation(endNum, initNum, '-')
    data.numberVal = Number(String(endNum))
  }
  else {
    data.sortFlag = 'equal'
  }
  // 将小数位数计算后，补0
  let unit = 1
  for (let i = 0; i < data.pointNum; i++)
    unit *= 10

  const rel_big = data.numberVal * unit // 去除小数点后的数，unit几个零表示有几个小数
  data.relNum = rel_big
  // this.totalCount = rel_big;
  if (toFixed !== 0) {
    // 计算小数点后的位数，小数位
    data.pointNum = String(data.numberVal).split('.')[1] ? String(data.numberVal).split('.')[1].length : 0
    // 数字长度
    data.num_total_len = String(rel_big).length
  }
  if (String(initNum).includes('.')) {
    const n = String(initNum).split('.')
    data.initDigit1 = Number(n[0])
    data.initDigit2 = Number(n[1])
  }
  else {
    data.initDigit1 = initNum
    data.initDigit2 = 0
  }

  if (scrolling && !customBgImg) {
    // #ifdef H5
  // 数字都是从小加到大的，所以我们循环转动最后一个数字，传入最后一个数字的DOM
    nextTick(() => {
      if (data.sortFlag === 'equal')
        return false

      const refsDom: HTMLCollectionOf<Element> = document.getElementsByClassName('nut-countup__number-item')

      const element = refsDom[data.num_total_len - 1]
      runTurn(element)
    })
    // #endif
  }
  else {
    if (flag !== 0)
      imgNumberScroll()
  }
}
function runTurn(el: Element) {
  clearIntervalTime()
  let m = 1
  if (data.pointNum !== 0)
    m = 1 / 10 ** data.pointNum;

  // 设置定时器
  (data.timer as any) = setInterval(() => {
    runStep(el)
    data.totalCount = calculation(data.totalCount, m, '-')
    // that.totalCount--;
    if (data.totalCount <= 0) {
      clearIntervalTime()
      emit('scrollEnd')
      data.valFlag = false
    }
  }, props.during)
}

function runStep(el: any) {
  // let currentTurn = el.getAttribute('turn-number');
  const currentTurn = el.style.all
  let turningNum: number
  if (data.sortFlag === 'add')
    turningNum = Number.parseInt(String(currentTurn)) + 1
  else
    turningNum = Number.parseInt(String(currentTurn)) - 1 >= 0 ? Number.parseInt(String(currentTurn)) - 1 : 9

  // el.setAttribute('turn-number', String(turningNum));
  el.style.all = String(turningNum)

  if (el.style.transition === 'none' || turningNum === 1 || !el.style.transition)
    el.style.transition = `all linear ${props.during}ms`

  if (turningNum === 10 || (data.sortFlag === 'reduce' && turningNum === 0)) {
    let timeOut: any = null
    // el.style.top = `-${turningNum * 100}%`;
    el.style.top = `-${data.sortFlag === 'add' ? turningNum * 100 : (10 - turningNum) * 100}%`
    // el.setAttribute('turn-number', '0');
    el.style.all = '0'
    timeOut = setTimeout(() => {
      timeOut && clearTimeout(timeOut)
      el.style.transition = 'none'
      el.style.top = '0'
      // 前面数字的滚动，用于递增
      if (turningNum === 10) {
        if (el.previousSibling)
          runStep(el.previousSibling as HTMLElement)
      }
    }, 0.975 * props.during)
  }
  else {
    // el.style.top = `-${(10-turningNum)*100}%`;
    el.style.top = `-${data.sortFlag === 'add' ? turningNum * 100 : (10 - turningNum) * 100}%`
  }
  // 用于递减的时候
  if (el.style.top === '-100%' && data.sortFlag === 'reduce')
    runStep(el.previousSibling as HTMLElement)
}
// 自定义图片
function imgNumberScroll() {
  let m = 1
  if (data.pointNum !== 0)
    m = 10 ** data.pointNum
  // #ifdef H5
  nextTick(() => {
    const f = document.getElementsByClassName('nut-countup__numberimg')[0]
    // setTimeout(() => {
    //   data.relNum = calculation(data.relNum, m * props.speed, '+');
    // }, props.during);
    f.addEventListener('webkitTransitionEnd', () => {
      emit('scrollEnd')
      data.valFlag = false
      // setTimeout(() => {
      //   data.relNum = calculation(data.relNum, m * props.speed, '+');
      // }, props.during);
    })
  })
  // #endif
}
// 不中奖设置随机数
function generateRandom() {
  data.notPrize = []
  while (data.notPrize.length < 3) {
    const rand: number = Math.floor(Math.random() * props.machinePrizeNum + 1)
    if (!data.notPrize.includes(rand))
      data.notPrize.push(rand)
  }
}
// 抽奖
function machineLuck() {
  const machineTurnMoreNum = props.machineTurnMore < 0 ? 0 : props.machineTurnMore
  const distance = props.numHeight * props.machinePrizeNum // 所有奖品的高度，雪碧图的高度
  if (data.prizeLevelTrun < 0)
    generateRandom()

  for (let i = 0; i < props.machineNum; i++) {
    setTimeout(() => {
      const turn = distance * (i + 1 + Number.parseFloat(String(machineTurnMoreNum)))
      if (data.prizeYPrev.length !== 0) {
        // this.machineTransition = 'none';
        // console.log(this.prizeYPrev[i]-(this.numHeight * this.machinePrizeNum));
        // this.$set(data.prizeY, i, data.prizeYPrev[i]);
        data.prizeY[i] = data.prizeYPrev[i]
      }
      const local = data.prizeYPrev[i] ? data.prizeYPrev[i] : 0
      let newLocation
            = turn + local + (props.machinePrizeNum - data.prizeLevelTrun + 1) * props.numHeight + (distance - local)
      if (data.prizeLevelTrun < 0)
        newLocation += props.numHeight * data.notPrize[i]

      scrollTime(
        i,
        // parseFloat((this.machinePrizeNum-(this.prizeLevelTrun-1))*this.numHeight + turn + local),
        newLocation,
        local,
      )
    }, 500 * i)
  }
}
useExtend({ machineLuck })
function scrollTime(index: number, total: number, num: number) {
  // this.machineTransition = `all linear ${this.during/this.machinePrizeNum}ms`;
  let t: any = setInterval(() => {
    if (num <= total) {
      num += 10
      data.prizeY[index] = Number.parseFloat(String(num))
    }
    else {
      clearInterval(t)
      t = null
      data.finshMachine += 1
      data.prizeY[index] = total
      if (data.finshMachine === props.machineNum) {
        const distance = props.numHeight * props.machinePrizeNum
        data.prizeYPrev = []
        const prevAry = JSON.parse(JSON.stringify(data.prizeY))
        prevAry.forEach((item: any) => {
          let n = item
          while (n > distance)
            n -= distance

          data.prizeYPrev.push(n)
        })
        setTimeout(() => {
          data.finshMachine = 0
          if (data.prizeLevelTrun < 0) {
            emit('scrollEnd', false)
            data.valFlag = false
          }
          else {
            emit('scrollEnd', true)
            data.valFlag = false
          }
        }, 130)
      }
    }
  }, 30)
}

onMounted(() => {
  data.current = props.initNum
  nextTick(() => {
    valChange()
  })
})

onUnmounted(() => {
  clearIntervalTime()
  data.timer = null
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-countup`

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
  <view :class="classes" :style="customStyle">
    <template v-if="customBgImg !== ''">
      <template v-if="type === 'machine'">
        <view class="nut-countup__machine" :style="{ height: `${numHeight}px` }">
          <view
            v-for="(val, index) of machineNum"
            :key="`mImg${index}`"
            class="nut-countup__machine-item"
            :style="{
              width: `${numWidth}px`,
              height: `${numHeight}px`,
              background: `url(${customBgImg}) `,
              backgroundPosition: `0 ${data.prizeY[index]}px`,
            }"
          />
        </view>
      </template>
      <template v-else>
        <view class="nut-countup__numberimg" :style="{ height: `${numHeight}px` }">
          <view
            v-for="(val, index) of data.num_total_len"
            :key="`cImg${index}`"
            class="nut-countup__numberimg__item"
            :style="{
              width: `${numWidth}px`,
              height: `${numHeight}px`,
              left:
                `${numWidth
                  * (index > data.num_total_len - data.pointNum - 1
                    ? index === data.num_total_len - data.pointNum
                      ? index * 1.5
                      : index * 1.3
                    : index)
                }px`,
              backgroundImage: `url(${customBgImg})`,
              backgroundPosition:
                `0 ${-(+String(data.relNum)[index] * numHeight + customSpacNum * +String(data.relNum)[index])}px`,
              transition: `all linear ${during / 10}ms`,
            }"
          />
          <view
            v-if="data.pointNum > 0"
            class="nut-countup-pointstyl"
            :style="{
              width: `${numWidth / 2}px`,
              bottom: 0,
              left: `${numWidth * (data.num_total_len - data.pointNum) * 1.1}px`,
              fontSize: '30px',
            }"
          >
            .
          </view>
        </view>
      </template>
    </template>
    <template v-else>
      <view
        v-if="scrolling"
        class="nut-countup__number"
        :style="{
          width: `${numWidth * data.num_total_len + numWidth / 3}px`,
          height: `${numHeight}px`,
          lineHeight: `${numHeight}px`,
        }"
      >
        <view
          v-for="(val, index) of data.num_total_len"
          :key="val"
          class="nut-countup__number-item"
          :style="{
            all: turnNumber(index) as any,
            top: topNumber(index),
            left: `${numWidth * (index > data.num_total_len - data.pointNum - 1 ? index * 1.1 : index)}px`,
          }"
          :turn-number="turnNumber(index)"
        >
          <view
            v-for="(item, idx) of data.to0_10"
            :key="`dote${idx}`"
            class="nut-countup__number-item__span"
            :style="{
              width: `${numWidth}px`,
              height: `${numHeight}px`,
              lineHeight: `${numHeight}px`,
            }"
          >
            {{ item }}
          </view>
        </view>
        <view
          v-if="data.pointNum > 0"
          class="nut-countup-pointstyl"
          :style="{
            width: `${numWidth / 3}px`,
            height: `${numHeight}px`,
            lineHeight: `${numHeight}px`,
            top: 0,
            left: `${numWidth * (data.num_total_len - data.pointNum)}px`,
          }"
        >
          .
        </view>
      </view>
      <template v-else>
        {{ data.current }}
      </template>
    </template>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
