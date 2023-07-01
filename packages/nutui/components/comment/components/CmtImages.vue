<script setup lang="ts">
import type { PropType } from 'vue'
import { defineComponent, onMounted, ref, watch } from 'vue'
import NutIcon from '../../icon/icon.vue'
import { PREFIX } from '../../_utils'

const props = defineProps({
  type: {
    type: String,
    default: 'one', // one multi
  },
  videos: {
    type: Array as PropType<VideosType[]>,
    default: () => [],
  },
  images: {
    type: Array as PropType<ImagesType[]>,
    default: () => [],
  },
})

const emit = defineEmits(['click', 'clickImages'])

interface VideosType {
  id: number | string
  mainUrl: string
  videoUrl: string
}
interface ImagesType {
  smallImgUrl: string
  bigImgUrl: string
  imgUrl: string
}
const isShowImage = ref(false)
const initIndex = ref(1)
const totalImages = ref<(VideosType | ImagesType)[]>([])

watch(
  () => [props.videos, props.images],
  (value) => {
    if (value[0].length > 0) {
      value[0].forEach((el: any) => {
        el.type = 'video'
      })
    }
    totalImages.value = (value[0] as any).concat(value[1])
  },
  { deep: true },
)

onMounted(() => {
  if (props.videos.length > 0) {
    props.videos.forEach((el: any) => {
      el.type = 'video'
    })
  }
  totalImages.value = (props.videos as any).concat(props.images)
})

function showImages(type: string, index: string | number) {
  const { videos, images } = props

  const i = type === 'img' ? (index as number) - videos.length : index
  emit('clickImages', {
    type,
    index: i,
    value: type === 'img' ? images[i as number] : videos[i as number],
  })
}
</script>

<script  lang="ts">
const componentName = `${PREFIX}-comment-images`

export default defineComponent ({
  name: componentName,
  options: {
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <view :class="`nut-comment-images nut-comment-images--${type}`">
    <!-- videos -->
    <view
      v-for="(itV, index) in videos"
      :key="itV.id"
      class="nut-comment-images__item nut-comment-images__item--video"
      @click="showImages('video', index)"
    >
      <img :src="itV.mainUrl">
      <view class="nut-comment-images__play" />
    </view>
    <!-- images -->
    <template v-for="(itI, index) in images" :key="itI.id">
      <view
        v-if="(type === 'multi' && videos.length + index < 9) || type !== 'multi'"
        class="nut-comment-images__item nut-comment-images__item--imgbox"
        @click="showImages('img', index + videos.length)"
      >
        <img :src="itI.smallImgUrl ? itI.smallImgUrl : itI.imgUrl">

        <view
          v-if="type === 'multi' && totalImages.length > 9 && videos.length + index > 7"
          class="nut-comment-images__mask"
        >
          <span>共 {{ totalImages.length }} 张</span>
          <NutIcon name="right" size="12px" />
        </view>
      </view>
    </template>
  </view>
</template>
