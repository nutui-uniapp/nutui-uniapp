<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
import NutButton from '../../button/button.vue'
import NutSwipe from '../../swipe/swipe.vue'
import { PREFIX } from '../../_constants'
import ItemContents from './Itemcontents.vue'

const props = defineProps({
  address: {
    type: Object,
  },
  longPress: {
    type: Boolean,
    default: false,
  },
  swipeEdition: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['delIcon', 'editIcon', 'clickItem', 'longDown', 'longCopy', 'longSet', 'longDel', 'swipeDel'])
let loop: any = null
const moveRef = ref(false)
const showMaskRef = ref(false)
function delClick(event: Event) {
  emit('delIcon', event, props.address)
  event.stopPropagation()
}
function editClick(event: Event) {
  emit('editIcon', event, props.address)
  event.stopPropagation()
}
function clickItem(event: Event) {
  if (moveRef.value)
    return
  emit('clickItem', event, props.address)
  event.stopPropagation()
}
function delLongClick(event: Event) {
  emit('longDel', event, props.address)
  event.stopPropagation()
}
function holdingFunc(event: Event) {
  loop = 0
  showMaskRef.value = true
  emit('longDown', event, props.address)
}
// 长按功能实现
function holddownstart(event: Event) {
  loop = setTimeout(() => {
    holdingFunc(event)
  }, 300)
}
function holddownmove() {
  // 滑动不触发长按
  clearTimeout(loop)
}
function holddownend() {
  // 删除定时器，防止重复注册
  clearTimeout(loop)
}
function hideMaskClick() {
  showMaskRef.value = false
}
function copyCLick(event: Event) {
  emit('longCopy', event, props.address)
  event.stopPropagation()
}
function setDefault(event: Event) {
  emit('longSet', event, props.address)
  event.stopPropagation()
}
function maskClick(event: Event) {
  if (loop !== 0) {
    // 排除长按时触发点击的情况
    showMaskRef.value = false
  }
  event.stopPropagation()
  event.preventDefault()
}
function swipeDelClick(event: Event) {
  emit('swipeDel', event, props.address)
  event.stopPropagation()
}
function swipestart() {
  moveRef.value = false
}
function swipemove() {
  moveRef.value = true
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-address-list-general`

export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    // #ifndef H5
    styleIsolation: 'shared',
    // #endif
  },
})
</script>

<template>
  <div v-if="!swipeEdition" class="nut-address-list-general">
    <ItemContents
      :item="address" @delIcon="delClick" @editIcon="editClick" @clickItem="clickItem"
      @touchstart="holddownstart" @touchend="holddownend" @touchmove="holddownmove"
    >
      <template #content-top>
        <slot name="content-info" />
      </template>
      <template #content-icon>
        <slot name="content-icons" />
      </template>
      <template #content-addr>
        <slot name="content-addrs" />
      </template>
    </ItemContents>
    <div v-if="longPress && showMaskRef" class="nut-address-list-general__mask" @click="maskClick">
      <slot name="longpress-all">
        <div class="nut-address-list-general__mask-copy" @click="copyCLick">
          复制地址
        </div>
        <div class="nut-address-list-general__mask-set" @click="setDefault">
          设置默认
        </div>
        <div class="nut-address-list-general__mask-del" @click="delLongClick">
          删除地址
        </div>
      </slot>
    </div>
    <div v-if="showMaskRef" class="nut-address-list__mask-bottom" @click="hideMaskClick" />
  </div>
  <NutSwipe v-else>
    <div class="nut-address-list-swipe">
      <ItemContents
        :item="address" @delIcon="delClick" @editIcon="editClick" @clickItem="clickItem"
        @touchmove="swipemove" @touchstart="swipestart"
      >
        <template #content-top>
          <slot name="content-info" />
        </template>
        <template #content-icon>
          <slot name="content-icons" />
        </template>
        <template #content-addr>
          <slot name="content-addrs" />
        </template>
      </ItemContents>
    </div>
    <template #right>
      <view style="height: 100%;">
        <slot name="swipe-right-btn">
          <NutButton shape="square" custom-style="height: 100%;" type="danger" @tap.stop="swipeDelClick">
            删除
          </NutButton>
        </slot>
      </view>
    </template>
  </NutSwipe>
</template>

<style lang="scss">
.nut-theme-dark {
  .nut-address-list {
    &-swipe,
    &-general {
      color: $dark-color;
      background-color: $dark-background2;
      border-bottom: 1px solid $dark-color-gray;

      &__mask {
        background-color: $dark-color3;

        &-copy {
          color: $dark-color-gray;
          background-color: $dark-color;
        }
      }
    }
  }

}

.nut-address-list {
  &-swipe,
  &-general {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 76px;
    padding: 5px 10px;
    font-size: $addresslist-font-size;
    color: $addresslist-font-color;
    background-color: $addresslist-bg;
    border-bottom: 1px solid $addresslist-border;

    &__mask {
      position: absolute;
      inset: 0;
      z-index: 2001;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0 40px;
      background-color: $addresslist-mask-bg;

      &-copy,
      &-set,
      &-del {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 55px;
        height: 55px;
        padding: 0 10px;
        font-size: 14px;
        text-align: center;
        background-color: $white;
        border-radius: 50%;
      }

      &-set {
        color: $white;
        background-color: $addresslist-set-bg;
      }

      &-del {
        color: $white;
        background-color: $addresslist-del-bg;
      }
    }
  }

  &-general {
    &:last-child {
      border-bottom: none;
    }
  }

  .nut-swipe {
    &:last-of-type {
      .nut-address-list-swipe {
        border-bottom: none;
      }
    }
  }

  .nut-address-list__mask-bottom {
    position: fixed;
    inset: 0;
    z-index: 2000;
    background-color: transparent;
  }
}
</style>
