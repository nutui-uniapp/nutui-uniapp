<script lang="ts" setup>
import { defineComponent } from 'vue'
import { PREFIX } from '../../_constants'
import { useTranslate } from '../../../locale'
import NutIcon from '../../icon/icon.vue'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  useContentTopSlot: Boolean,
  useContentIconSlot: Boolean,
  useContentAddrSlot: Boolean,
})

const emit = defineEmits(['delIcon', 'editIcon', 'clickItem'])

function handleDelIconClick(event: any) {
  event.stopPropagation()

  emit('delIcon', event, props.item)
}

function handleEditIconClick(event: any) {
  event.stopPropagation()

  emit('editIcon', event, props.item)
}

function handleContentsClick(event: any) {
  event.stopPropagation()

  emit('clickItem', event, props.item)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-address-list-item`
const { translate } = useTranslate(`${PREFIX}-address-list`)
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
  <view class="nut-address-list-item" @click="handleContentsClick">
    <view class="nut-address-list-item__info">
      <view class="nut-address-list-item__info-contact">
        <slot v-if="props.useContentTopSlot" name="content-top" />

        <template v-else>
          <view class="nut-address-list-item__info-contact-name">
            {{ props.item.addressName }}
          </view>
          <view class="nut-address-list-item__info-contact-tel">
            {{ props.item.phone }}
          </view>
          <view v-if="props.item.defaultAddress" class="nut-address-list-item__info-contact-default">
            {{ translate('default') }}
          </view>
        </template>
      </view>

      <view class="nut-address-list-item__info-handle">
        <slot v-if="props.useContentIconSlot" name="content-icon" />

        <template v-else>
          <NutIcon name="del" custom-class="nut-address-list-item__info-handle-del" @tap.stop="handleDelIconClick" />
          <NutIcon name="edit" custom-class="nut-address-list-item__info-handle-edit" @tap.stop="handleEditIconClick" />
        </template>
      </view>
    </view>

    <view class="nut-address-list-item__addr">
      <slot v-if="props.useContentAddrSlot" name="content-addr" />

      <template v-else>
        {{ props.item.fullAddress }}
      </template>
    </view>
  </view>
</template>

<style lang="scss">
.nut-theme-dark {
  .nut-address-list {
    &-item {
      &__addr {
        color: $dark-color-gray;
      }
    }
  }
}

.nut-address-list {
  &-item {
    width: 100%;

    &__info {
      display: flex;
      justify-content: space-between;

      &-contact {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-weight: bold;

        &-name {
          max-width: 145px;
          word-wrap: break-word;
        }

        &-tel {
          max-width: 110px;
          margin-left: 8px;
          word-wrap: break-word;
        }

        &-default {
          height: 16px;
          padding: 0 6px;
          margin-left: 5px;
          font-size: 12px;
          line-height: 16px;
          color: $addresslist-contnts-contact-color;
          background: $addresslist-contnts-contact-default;
          border-radius: 2px;
        }
      }

      &-handle {
        &-edit {
          margin-left: 15px;
        }
      }
    }

    &__addr {
      margin-top: 5px;
      font-size: $addresslist-addr-font-size;
      color: $addresslist-addr-font-color;
    }
  }
}
</style>
