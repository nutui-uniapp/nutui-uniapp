<script setup lang="ts">
import type { PropType } from 'vue'
import { defineComponent, onMounted, ref, watch } from 'vue'
import NutIcon from '../../icon/icon.vue'
import { PREFIX } from '../../_constants'

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
  <view :class="`nut-comment-images nut-comment-images--${type}`">
    <!-- videos -->
    <view
      v-for="(itV, index) in videos" :key="itV.id" class="nut-comment-images__item nut-comment-images__item--video"
      @click="showImages('video', index)"
    >
      <image :src="itV.mainUrl" />
      <view class="nut-comment-images__play" />
    </view>
    <!-- images -->
    <template v-for="(itI, index) in images" :key="itI.id">
      <view
        v-if="(type === 'multi' && videos.length + index < 9) || type !== 'multi'"
        class="nut-comment-images__item nut-comment-images__item--imgbox"
        @click="showImages('img', index + videos.length)"
      >
        <image :src="itI.smallImgUrl ? itI.smallImgUrl : itI.imgUrl" />

        <view
          v-if="type === 'multi' && totalImages.length > 9 && videos.length + index > 7"
          class="nut-comment-images__mask"
        >
          <text>共 {{ totalImages.length }} 张</text>
          <NutIcon name="right" size="12px" />
        </view>
      </view>
    </template>
  </view>
</template>

<style lang="scss">
.nut-comment {
  &-images {
    display: flex;
    margin: 10px 0 12px;
    overflow-x: auto;
    overflow-y: hidden;

    &__item {
      position: relative;
      flex-shrink: 0;
      width: 80px;
      height: 80px;
      margin-right: 5px;
      overflow: hidden;
      border-radius: 6px;

      image {
        width: 80px;
        height: 80px;
      }

      // &--imgbox {
      //   //   background: #f00;
      // }

      &--video {

        /* stylelint-disable-next-line rule-empty-line-before */
        image {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          // height: auto;
        }
      }
    }

    &__mask {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 90px;
      font-size: 12px;
      line-height: 90px;
      color: rgb(255 255 255 / 100%);
      background: rgb(0 0 0 / 50%);
    }
  }

  &-images--multi {
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin: 10px auto 15px;
    overflow: hidden;

    .nut-comment-images__item {
      width: calc(34% - 8px);
      height: 90px;
      margin: 8px 8px 0 0;

      image {
        width: 100%;
        height: 100%;
      }

      .svg-demo {
        width: 40px;
        height: 40px;
      }

      &:nth-child(3n) {
        margin-right: 0;
      }
    }

    &::after {
      display: block;
      width: 105px;
      content: '';
    }
  }

  &-images__play {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    background: rgb(0 0 0 / 50%);
    border-radius: 50%;
    transform: translate(-50%);
    transform: translate(-50%, -50%);

    &::after {
      position: absolute;
      top: 11px;
      left: 15px;
      display: block;
      content: '';
      border-top: 9px solid transparent;
      border-bottom: 9px solid transparent;
      border-left: 15px solid #fff;
    }
  }
}
</style>
