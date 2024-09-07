<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
import { PREFIX } from '../../_constants'
import NutButton from '../../button/button.vue'
import NutSwipe from '../../swipe/swipe.vue'
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
  useContentInfoSlot: Boolean,
  useContentIconsSlot: Boolean,
  useContentAddrsSlot: Boolean,
  useLongpressAllSlot: Boolean,
  useSwipeRightBtnSlot: Boolean,
})

const emit = defineEmits(['delIcon', 'editIcon', 'clickItem', 'longDown', 'longCopy', 'longSet', 'longDel', 'swipeDel'])

const moveRef = ref<boolean>(false)
const showMaskRef = ref<boolean>(false)

function handleDelIconClick(event: any) {
  event.stopPropagation()

  emit('delIcon', event, props.address)
}

function handleEditIconClick(event: any) {
  event.stopPropagation()

  emit('editIcon', event, props.address)
}

function handleItemClick(event: any) {
  event.stopPropagation()

  if (moveRef.value)
    return

  emit('clickItem', event, props.address)
}

function handleLongDelClick(event: any) {
  event.stopPropagation()

  emit('longDel', event, props.address)
}

let timer: NodeJS.Timeout | null = null

function destroyTimer() {
  if (timer == null)
    return

  clearTimeout(timer)
  timer = null
}

function startTimer(event: any) {
  timer = setTimeout(() => {
    showMaskRef.value = true

    emit('longDown', event, props.address)
  }, 300)
}

// 长按功能实现
function handleTouchStart(event: any) {
  startTimer(event)
}

function handleTouchMove() {
  // 滑动不触发长按
  destroyTimer()
}

function handleTouchEnd() {
  // 删除定时器，防止重复注册
  destroyTimer()
}

function handleHideMaskClick() {
  showMaskRef.value = false
}

function handleLongCopyClick(event: any) {
  event.stopPropagation()

  emit('longCopy', event, props.address)
}

function handleLongSetClick(event: any) {
  event.stopPropagation()

  emit('longSet', event, props.address)
}

function handleMaskClick(event: any) {
  event.stopPropagation()
  event.preventDefault()

  if (timer != null) {
    // 排除长按时触发点击的情况
    showMaskRef.value = false
  }
}

function handleSwipeDelClick(event: any) {
  event.stopPropagation()

  emit('swipeDel', event, props.address)
}

function handleSwipeStart() {
  moveRef.value = false
}

function handleSwipeMove() {
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
  <view v-if="!props.swipeEdition" class="nut-address-list-general">
    <ItemContents
      :item="props.address"
      :use-content-top-slot="props.useContentInfoSlot"
      :use-content-icon-slot="props.useContentIconsSlot"
      :use-content-addr-slot="props.useContentAddrsSlot"
      @del-icon="handleDelIconClick"
      @edit-icon="handleEditIconClick"
      @click-item="handleItemClick"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
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

    <view v-if="props.longPress && showMaskRef" class="nut-address-list-general__mask" @click="handleMaskClick">
      <slot v-if="props.useLongpressAllSlot" name="longpress-all" />

      <template v-else>
        <view class="nut-address-list-general__mask-copy" @click="handleLongCopyClick">
          复制地址
        </view>
        <view class="nut-address-list-general__mask-set" @click="handleLongSetClick">
          设置默认
        </view>
        <view class="nut-address-list-general__mask-del" @click="handleLongDelClick">
          删除地址
        </view>
      </template>
    </view>

    <view v-if="showMaskRef" class="nut-address-list__mask-bottom" @click="handleHideMaskClick" />
  </view>

  <NutSwipe v-else>
    <view class="nut-address-list-swipe">
      <ItemContents
        :item="props.address"
        :use-content-top-slot="props.useContentInfoSlot"
        :use-content-icon-slot="props.useContentIconsSlot"
        :use-content-addr-slot="props.useContentAddrsSlot"
        @del-icon="handleDelIconClick"
        @edit-icon="handleEditIconClick"
        @click-item="handleItemClick"
        @touchstart="handleSwipeStart"
        @touchmove="handleSwipeMove"
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
    </view>

    <template #right>
      <view style="height: 100%;">
        <slot v-if="props.useSwipeRightBtnSlot" name="swipe-right-btn" />

        <template v-else>
          <NutButton
            shape="square"
            custom-style="height: 100%;"
            type="danger"
            @tap.stop="handleSwipeDelClick"
          >
            删除
          </NutButton>
        </template>
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
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
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
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2000;
    background-color: transparent;
  }
}
</style>
