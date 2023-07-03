<script lang="ts" setup>
import { defineComponent } from 'vue'
import { PREFIX } from '../../_utils'
import { useTranslate } from '../../../locale'
import NutIcon from '../../icon/icon.vue'

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
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
          <NutIcon name="del" custom-class="nut-address-list-item__info-handle-del" @click="delClick" />
          <NutIcon name="edit" custom-class="nut-address-list-item__info-handle-edit" @click="editClick" />
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
@import '../index';
</style>
