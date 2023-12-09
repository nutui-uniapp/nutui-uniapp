<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { Goods, Sku, imagePathMap } from './data'

interface Skus {
  id: number
  name: string
  list: SkuItem[]
  [key: string]: any
}

interface SkuItem {
  id: number
  name: string
  imagePath: string
  [key: string]: any
}

interface Data {
  skuData: Skus[]
  goodsInfo: any
  imagePathMap: any
}

export default defineComponent({
  setup() {
    const popup = reactive({
      base: false,
      notSell: false,
      customStepper: false,
      customBySlot: false,

      showAddressPopup: false,
    })

    const data = reactive<Data>({
      skuData: [],
      goodsInfo: {},
      imagePathMap: {},
    })

    const stepperExtraText = () => {
      return '<view style="width:100%;text-align:right;color:#F00">2 件起售</view>'
    }

    const btnExtraText = ref('抱歉，此商品在所选区域暂无存货')
    const addressDesc = ref('(配送地会影响库存，请先确认)')
    const existAddress = ref([
      {
        id: 1,
        addressDetail: 'th ',
        cityName: '石景山区',
        countyName: '城区',
        provinceName: '北京',
        selectedAddress: true,
        townName: '',
      },
      {
        id: 2,
        addressDetail: '12_ ',
        cityName: '电饭锅',
        countyName: '扶绥县',
        provinceName: '北京',
        selectedAddress: false,
        townName: '',
      },
      {
        id: 3,
        addressDetail: '发大水比 ',
        cityName: '放到',
        countyName: '广宁街道',
        provinceName: '钓鱼岛全区',
        selectedAddress: false,
        townName: '',
      },
      {
        id: 4,
        addressDetail: '还是想吧百度吧 ',
        cityName: '研发',
        countyName: '八里庄街道',
        provinceName: '北京',
        selectedAddress: false,
        townName: '',
      },
    ])
    const getData = () => {
      setTimeout(() => {
        /* eslint-disable no-console */

        data.skuData = Sku as any
        data.goodsInfo = Goods
        data.imagePathMap = imagePathMap

        console.log(Goods)
      }, 500)
    }
    onMounted(() => {
      getData()
    })

    const selectSku = (s: any) => {
      const { sku, parentIndex } = s

      if (sku.disable)
        return false

      data.skuData[parentIndex].list.forEach((s) => {
        s.active = s.id === sku.id
      })

      data.goodsInfo = {
        skuId: sku.id,
        price: '4599.00', // 商品信息展示区，商品价格
      }

      data.skuData[0].list.forEach((el) => {
        if (el.active && !el.disable)
          data.goodsInfo.imagePath = data.imagePathMap[el.id]
      })
    }

    // stepper 更改
    const changeStepper = (count: number) => {
      console.log('购买数量', count)
    }

    // stepper 极限值
    const overLimit = (val: any) => {
      if (val.action === 'reduce')
        console.log(`至少买${val.value}件哦`)
      else
        console.log(`最多买${val.value}件哦`)
    }

    const clickBtnOperate = (value: { type: string, value: string | number }) => {
      console.log('点击了操作按钮', value)
    }
    // 关闭弹框
    const close = () => {
      console.log('选择弹框关闭')
    }

    const selectedAddress = (prevExistAdd: any, nowExistAdd: any) => {
      const { provinceName, countyName, cityName } = nowExistAdd
      addressDesc.value = `${provinceName}${countyName}${cityName}`
    }

    return {
      selectSku,
      changeStepper,
      clickBtnOperate,
      close,
      existAddress,
      selectedAddress,
      addressDesc,
      stepperExtraText,
      btnExtraText,
      overLimit,
      ...toRefs(popup),
      ...toRefs(data),
    }
  },
})
</script>

<template>
  <div class="demo h-100vh!">
    <h2 class="title">
      基础用法
    </h2>
    <nut-cell title="基础用法" desc="" @click="base = true" />

    <h2 class="title">
      不可售
    </h2>
    <nut-cell title="不可售" desc="" @click="notSell = true" />

    <h2 class="title">
      自定义计步器
    </h2>
    <nut-cell title="自定义计步器" desc="" @click="customStepper = true" />

    <h2 class="title">
      自定义插槽
    </h2>
    <nut-cell title="通过插槽自定义设置" desc="" @click="customBySlot = true" />

    <nut-sku
      v-model:visible="base"
      :goods="goodsInfo"
      :sku="skuData"
      @select-sku="selectSku"
      @close="close"
    >
      <template #skuHeader>
        <nut-sku-header :goods="goodsInfo" />
      </template>
      <template #skuOperate>
        <nut-sku-operate
          @click-btn-operate="clickBtnOperate"
        />
      </template>
    </nut-sku>

    <nut-sku
      v-model:visible="notSell"
      :sku="skuData"
      :btn-extra-text="btnExtraText"
      :btn-options="['buy', 'cart']"
      @change-stepper="changeStepper"
      @select-sku="selectSku"
      @close="close"
    >
      <template #skuHeader>
        <nut-sku-header :goods="goodsInfo" />
      </template>
      <template #skuOperate>
        <div class="sku-operate-box">
          <nut-button custom-class="sku-operate-box-dis" type="warning">
            查看相似商品
          </nut-button>
          <nut-button custom-class="sku-operate-box-dis" type="info">
            到货通知
          </nut-button>
        </div>
      </template>
    </nut-sku>

    <nut-sku
      v-model:visible="customStepper"
      :sku="skuData"
      :goods="goodsInfo"
      :stepper-max="7"
      :stepper-min="2"
      :stepper-extra-text="stepperExtraText"
      :btn-options="['buy', 'cart']"
      @change-stepper="changeStepper"
      @over-limit="overLimit"
      @select-sku="selectSku"
      @click-btn-operate="clickBtnOperate"
      @close="close"
    >
      <template #skuHeader>
        <nut-sku-header :goods="goodsInfo" />
      </template>
      <template #skuOperate>
        <nut-sku-operate
          :btn-options="['buy', 'cart']"
          @click-btn-operate="clickBtnOperate"
        />
      </template>
    </nut-sku>

    <nut-sku
      v-model:visible="customBySlot"
      :sku="skuData"
      :goods="goodsInfo"
      :btn-options="['buy', 'cart']"
      @select-sku="selectSku"
      @click-btn-operate="clickBtnOperate"
      @close="close()"
    >
      <template #skuHeader>
        <nut-sku-header :goods="goodsInfo">
          <template #skuHeaderPrice>
            <div>
              <nut-price :price="goodsInfo.price" :need-symbol="true" :thousands="false" />
              <span class="tag" />
            </div>
          </template>
          <template #skuHeaderExtra>
            <span class="text-12px c-skyblue">重量：0.1kg 编号：{{ goodsInfo.skuId }} </span>
          </template>
        </nut-sku-header>
      </template>

      <template #skuOperate>
        <div class="sku-operate-box">
          <nut-button custom-class="sku-operate-item" shape="square" type="warning">
            加入购物车
          </nut-button>
          <nut-button custom-class="sku-operate-item" shape="square" type="primary">
            立即购买
          </nut-button>
        </div>
      </template>

      <template #skuSelectTop>
        <div class="address">
          <nut-cell
            style="box-shadow: none; padding: 13px 0"
            title="送至"
            :desc="addressDesc"
            @click="showAddressPopup = true"
          />
        </div>
      </template>
    </nut-sku>

    <nut-address
      v-model:visible="showAddressPopup"
      type="exist"
      :exist-address="existAddress"
      :is-show-custom-address="false"
      exist-address-title="配送至"
      @close="close"
      @selected="selectedAddress"
    />
  </div>
</template>

<style lang="scss">
.tag {
  display: inline-block;
  width: 50px;
  height: 15px;
  font-size: 12px;
  margin-left: 10px;
  background: url('//storage.360buyimg.com/imgtools/bbdf6c9a2a-e3f6fbc0-fb4d-11eb-a27f-676da10c85f4.png') no-repeat
    center center;
  background-size: 100% 100%;
}

.sku-operate-box {
  width: 100%;
  display: flex;
  padding: 8px 10px;
  box-sizing: border-box;

  .sku-operate-item {
    width: 100%;
    flex-shrink: 1;
    &:first-child {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }
    &:last-child {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }
  }

  .sku-operate-box-dis {
    width: 100%;
    flex-shrink: 1;
    &:first-child {
      margin-right: 18px;
    }
  }
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Sku"
  }
}
</route>
