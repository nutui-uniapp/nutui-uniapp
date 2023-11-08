<script lang="ts" setup>
import { defineComponent } from 'vue'
import { PREFIX } from '../../_constants'
import { useTranslate } from '../../../locale'
import NutIcon from '../../icon/icon.vue'

const props = defineProps({
  item: {
    type: Object,
    default: () => { },
  },
})
const emit = defineEmits(['delIcon', 'editIcon', 'clickItem'])

function delClick(event: Event) {
  emit('delIcon', event, props.item)
  event.stopPropagation()
}
function editClick(event: Event) {
  emit('editIcon', event, props.item)
  event.stopPropagation()
}
function contentsClick(event: Event) {
  emit('clickItem', event, props.item)
  event.stopPropagation()
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
  <div class="nut-address-list-item" @click="contentsClick">
    <div class="nut-address-list-item__info">
      <div class="nut-address-list-item__info-contact">
        <slot name="content-top">
          <div class="nut-address-list-item__info-contact-name">
            {{ item.addressName }}
          </div>
          <div class="nut-address-list-item__info-contact-tel">
            {{ item.phone }}
          </div>
          <div v-if="item.defaultAddress" class="nut-address-list-item__info-contact-default">
            {{
              translate('default')
            }}
          </div>
        </slot>
      </div>
      <div class="nut-address-list-item__info-handle">
        <slot name="content-icon">
          <NutIcon name="del" custom-class="nut-address-list-item__info-handle-del" @tap.stop="delClick" />
          <NutIcon name="edit" custom-class="nut-address-list-item__info-handle-edit" @tap.stop="editClick" />
        </slot>
      </div>
    </div>
    <div class="nut-address-list-item__addr">
      <slot name="content-addr">
        {{ item.fullAddress }}
      </slot>
    </div>
  </div>
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
