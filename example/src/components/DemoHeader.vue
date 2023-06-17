<script lang="ts">
import { computed, defineComponent } from 'vue'
import config from '../../config.json'

export default defineComponent({
  name: 'DemoHeader',
  setup() {
    // 返回demo页
    const navigateTo = () => {
      uni.navigateBack()
    }

    const compName = computed(() => {
      let allComps: any = []
      const hashCompName = location.hash.split('pages/')[1].replace('/index', '')
      config.nav.forEach((item) => {
        allComps = [...allComps, ...item.packages]
      })

      const targetComp = allComps.filter((item: any) => hashCompName === item.name.toLowerCase())

      return targetComp[0].name
    })

    return { navigateTo, compName }
  },
})
</script>

<template>
  <div class="applets-demo-header">
    <div class="back" @click="navigateTo">
      <nut-icon name="left" />
    </div>
    <div class="applets-icon">
      <image
        class="image"
        src="https://img13.360buyimg.com/imagetools/jfs/t1/67106/30/23857/9375/63b4df85Fce5fd959/35265019206515fe.png"
      />
    </div>
    <div>{{ compName }}</div>
  </div>
</template>

<style lang="scss">
.applets-demo-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  height: 38px;
  font-size: 20px;
  font-weight: bold;
  line-height: 57px;
  color: rgb(51 51 51 / 100%);
  text-align: center;
  background: $white;
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 7%);

  .back {
    position: absolute;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 100%;
    cursor: pointer;
  }

  .applets-icon {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 100%;
    cursor: pointer;

    > .image {
      width: 87px;
      height: 36px;
    }
  }
}
</style>
