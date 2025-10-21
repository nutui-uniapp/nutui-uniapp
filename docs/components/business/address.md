# Address 地址

### 介绍

用于进行四级地址选择。

### 选择自定义地址

```html
<template>
  <nut-address
    v-model:visible="visible"
    :province="address.province"
    :city="address.city"
    :country="address.country"
    :town="address.town"
    @change="onChange"
    @close="onClose"
  ></nut-address>
</template>
```

```ts
const visible = ref(false);

const address = reactive({
  province: [
    { id: 1, name: "北京" },
    { id: 2, name: "广西" },
    { id: 3, name: "江西" },
    { id: 4, name: "四川" }
  ],
  city: [
    { id: 7, name: "朝阳区" },
    { id: 8, name: "崇文区" },
    { id: 9, name: "昌平区" },
    { id: 6, name: "石景山区" }
  ],
  country: [
    { id: 3, name: "八里庄街道" },
    { id: 9, name: "北苑" },
    { id: 4, name: "常营乡" }
  ],
  town: []
});

function onChange(event) {
  const name = address[event.next];

  if (!name || name.length < 1) {
    visible.value = false;
  }
}

function onClose(event) {
  console.log(event);
}
```

### 选择省市区

如果想选中某个省市区，需要在 `model-value` 中按照 `province`、`city`、`country`、`town` 的顺序配置想要展示的地区 id 值，
并且保证有能查询到对应的省市区数据即可。

```html
<template>
  <nut-address
    v-model="value"
    v-model:visible="visible"
    :province="address.province"
    :city="address.city"
    :country="address.country"
    :town="address.town"
    @change="onChange"
    @close="onClose"
  ></nut-address>
</template>
```

```ts
const visible = ref(false);

const value = ref([1, 7, 3]);

const address = reactive({
  province: [
    { id: 1, name: "北京" },
    { id: 2, name: "广西" },
    { id: 3, name: "江西" },
    { id: 4, name: "四川" }
  ],
  city: [
    { id: 7, name: "朝阳区" },
    { id: 8, name: "崇文区" },
    { id: 9, name: "昌平区" },
    { id: 6, name: "石景山区" }
  ],
  country: [
    { id: 3, name: "八里庄街道" },
    { id: 9, name: "北苑" },
    { id: 4, name: "常营乡" }
  ],
  town: []
});

function onChange(event) {
  const name = address[event.next];

  if (!name || name.length < 1) {
    visible.value = false;
  }
}

function onClose(event) {
  value.value = [
    event.data.province.id,
    event.data.city.id,
    event.data.country.id
  ];
}
```

### 选择自定义地址2

```html
<template>
  <nut-address
    v-model="value"
    v-model:visible="visible"
    type="custom2"
    :province="address.province"
    :city="address.city"
    :country="address.country"
    :town="address.town"
    @change="onChange"
    @close="onClose"
  ></nut-address>
</template>
```

```ts
const visible = ref(false);

const value = ref([1, 7, 3]);

const address = reactive({
  province: [
    { id: 1, name: "北京", title: "B" },
    { id: 2, name: "广西", title: "G" },
    { id: 3, name: "江西", title: "J" },
    { id: 4, name: "四川", title: "S" },
    { id: 5, name: "浙江", title: "Z" }
  ],
  city: [
    { id: 7, name: "朝阳区", title: "C" },
    { id: 8, name: "崇文区", title: "C" },
    { id: 9, name: "昌平区", title: "C" },
    { id: 6, name: "石景山区", title: "S" },
    { id: 3, name: "八里庄街道", title: "B" },
    { id: 9, name: "北苑", title: "B" }
  ],
  country: [
    { id: 3, name: "八里庄街道", title: "B" },
    { id: 9, name: "北苑", title: "B" },
    { id: 4, name: "常营乡", title: "C" }
  ],
  town: []
});

function onChange(event) {
  const name = address[event.next];

  if (!name || name.length < 1) {
    visible.value = false;
  }
}

function onClose(event) {
  value.value = [
    event.data.province.id,
    event.data.city.id,
    event.data.country.id
  ];
}
```

### 选择已有地址

```html
<template>
  <nut-address
    v-model:visible="visible"
    type="exist"
    :exist-address="existAddress"
    exist-address-title="配送至"
    :is-show-custom-address="false"
    @selected="onSelected"
    @close="onClose"
  ></nut-address>
</template>
```

```ts
const visible = ref(false);

const existAddress = ref([
  {
    id: 1,
    addressDetail: "",
    cityName: "次渠镇",
    countyName: "通州区",
    provinceName: "北京市",
    selectedAddress: true,
    townName: "",
    name: "探探鱼",
    phone: "182****1718"
  },
  {
    id: 2,
    addressDetail: "",
    cityName: "钓鱼岛全区",
    countyName: "",
    provinceName: "钓鱼岛",
    selectedAddress: false,
    townName: "",
    name: "探探鱼",
    phone: "182****1718"
  },
  {
    id: 3,
    addressDetail: "京东大厦",
    cityName: "大兴区",
    countyName: "科创十一街18号院",
    provinceName: "北京市",
    selectedAddress: false,
    townName: "",
    name: "探探鱼",
    phone: "182****1718"
  }
]);

function onSelected(prev, item, list) {
  console.log(prev);
  console.log(item);
  console.log(list);
}

function onClose(event) {
  if (event.type == "exist") {
    const { provinceName, cityName, countyName, townName, addressDetail } = event.data;

    console.log(provinceName + cityName + countyName + townName + addressDetail);
  } else {
    console.log(event);
  }
}
```

### 自定义图标

```html
<template>
  <nut-address v-model:visible="visible">
    <template #unselectedIcon>
      <nut-icon name="heart1"></nut-icon>
    </template>

    <template #icon>
      <nut-icon name="heart-fill" color="#ff0000"></nut-icon>
    </template>

    <template #bottom>
      <nut-button>自定义按钮</nut-button>
    </template>
  </nut-address>
</template>
```

### 自定义地址与已有地址切换

```html
<template>
  <nut-address
    v-model:visible="visible"
    type="exist"
    :exist-address="existAddress"
    :province="address.province"
    :city="address.city"
    :country="address.country"
    :town="address.town"
    @change="onChange"
    @selected="onSelected"
    @switch-module="onSwitchModule"
    @close-mask="onMaskClose"
    @close="onClose"
  ></nut-address>
</template>
```

```ts
const visible = ref(false);

const address = reactive({
  province: [
    { id: 1, name: "北京" },
    { id: 2, name: "广西" },
    { id: 3, name: "江西" },
    { id: 4, name: "四川" }
  ],
  city: [
    { id: 7, name: "朝阳区" },
    { id: 8, name: "崇文区" },
    { id: 9, name: "昌平区" },
    { id: 6, name: "石景山区" }
  ],
  country: [
    { id: 3, name: "八里庄街道" },
    { id: 9, name: "北苑" },
    { id: 4, name: "常营乡" }
  ],
  town: []
});

const existAddress = ref([
  {
    id: 1,
    addressDetail: "",
    cityName: "次渠镇",
    countyName: "通州区",
    provinceName: "北京市",
    selectedAddress: true,
    townName: "",
    name: "探探鱼",
    phone: "182****1718"
  },
  {
    id: 2,
    addressDetail: "",
    cityName: "钓鱼岛全区",
    countyName: "",
    provinceName: "钓鱼岛",
    selectedAddress: false,
    townName: "",
    name: "探探鱼",
    phone: "182****1718"
  },
  {
    id: 3,
    addressDetail: "京东大厦",
    cityName: "大兴区",
    countyName: "科创十一街18号院",
    provinceName: "北京市",
    selectedAddress: false,
    townName: "",
    name: "探探鱼",
    phone: "182****1718"
  }
]);

function onChange(event) {
  console.log("change", event);
}

function onSelected(prev, item, list) {
  console.log("selected", prev, item, list);
}

function onSwitchModule(event) {
  console.log("switch-module", event);
}

function onMaskClose(event) {
  console.log("close-mask", event);
}

function onClose(event) {
  console.log("close", event);
}
```

## API

### Props

| 参数                     | 说明                                                                                                               | 类型              | 可选值                      | 默认值     |
|------------------------|------------------------------------------------------------------------------------------------------------------|-----------------|--------------------------|---------|
| v-model                | 设置默认选中值                                                                                                          | Array           | -                        | `[]`    |
| v-model:visible        | 是否打开地址选择                                                                                                         | boolean         | -                        | `false` |
| type                   | 地址选择类型                                                                                                           | string          | exist / custom / custom2 | custom  |
| province               | 省，每个省的对象中，必须有 `name` 字段，如果类型选择 `custom2`，必须指定 `title` 字段为首字母                                                     | Array           | -                        | `[]`    |
| city                   | 市，每个市的对象中，必须有 `name` 字段，如果类型选择 `custom2`，必须指定 `title` 字段为首字母                                                     | Array           | -                        | `[]`    |
| country                | 县，每个县的对象中，必须有 `name` 字段，如果类型选择 `custom2`，必须指定 `title` 字段为首字母                                                     | Array           | -                        | `[]`    |
| town                   | 乡 / 镇，每个乡 / 镇的对象中，必须有 `name` 字段，如果类型选择 `custom2`，必须指定 `title` 字段为首字母                                             | Array           | -                        | `[]`    |
| height                 | 弹层中内容容器的高度（`type` 为 `custom2` 时有效）                                                                               | string / number | -                        | 200px   |
| exist-address          | 已存在地址列表，每个地址对象中，必传值 `provinceName`、`cityName`、`countyName`、`townName`、`addressDetail`、`selectedAddress`（字段解释见下表） | Array           | -                        | `[]`    |
| is-show-custom-address | 是否可以切换自定义地址选择（`type` 为 `exist` 时有效）                                                                              | boolean         | -                        | `true`  |
| custom-address-title   | 自定义地址选择文案（`type` 为 `custom` 时有效）                                                                                 | string          | -                        | 请选择所在地区 |
| exist-address-title    | 已有地址文案（`type` 为 `exist` 时有效）                                                                                     | string          | -                        | 配送至     |
| custom-and-exist-title | 自定义地址与已有地址切换按钮文案（`type` 为 `exist` 时有效）                                                                           | string          | -                        | 选择其他地址  |
| columns-placeholder    | 列提示文字                                                                                                            | string / Array  | -                        | 请选择     |

#### 字段解释

| 字段              | 含义               |
|-----------------|------------------|
| provinceName    | 省的名字             |
| cityName        | 市的名字             |
| countyName      | 县的名字             |
| townName        | 乡 / 镇的名字         |
| addressDetail   | 具体地址             |
| selectedAddress | 字段用于判断当前地址列表的选中项 |

### Events

| 事件名           | 说明                          | 类型                                   |
|---------------|-----------------------------|--------------------------------------|
| change        | 自定义选择地址时，选择地区时触发            | `(event: ChangeEvent) => void`       |
| selected      | 选择已有地址列表时触发                 | `(prev, item, list) => void`         |
| close         | 地址选择弹框关闭时触发                 | `(event: CloseEvent) => void`        |
| close-mask    | 点击遮罩层或点击右上角叉号关闭时触发          | `(event: MaskCloseEvent) => void`    |
| switch-module | 点击“选择其他地址”或自定义地址选择左上角返回按钮触发 | `(event: ModuleSwitchEvent) => void` |

#### ChangeEvent

| 参数     | 说明                                                      |
|--------|---------------------------------------------------------|
| custom | 当前点击的行政区域（province：省 / city：市 / country：县 / town：乡）     |
| next   | 当前点击的行政区域的下一级（province：省 / city：市 / country：县 / town：乡） |
| value  | 当前点击的行政区域的值                                             |

#### SelectedEvent

| 参数            | 说明           |
|---------------|--------------|
| prev（第 1 个参数） | 选择前选中的地址     |
| item（第 2 个参数） | 当前选中的地址      |
| list（第 3 个参数） | 选择完之后的已有地址列表 |

#### CloseEvent

| 参数   | 说明                               |
|------|----------------------------------|
| type | 地址选择类型（exist / custom / custom2） |
| data | 选择地址的值                           |

#### MaskCloseEvent

| 参数       | 说明                        |
|----------|---------------------------|
| closeWay | 关闭方式（self / mask / cross） |

#### ModuleSwitchEvent

| 参数   | 说明                             |
|------|--------------------------------|
| type | 切换类型（exist / custom / custom2） |

### Slots

| 名称             | 说明                 |
|----------------|--------------------|
| bottom         | 可自定义底部             |
| icon           | 自定义选中项的图标          |
| unselectedIcon | 未选中地址时的图标          |
| closeIcon      | 关闭弹层的图标            |
| backIcon       | 自定义地址与已有地址切换时返回的图标 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                               | 默认值                                                                           |
|--------------------------------------------------|-------------------------------------------------------------------------------|
| --nut-address-region-tab-line                    | linear-gradient(90deg, var(--nut-primary-color) 0%, rgba(#fa2c19, 0.15) 100%) |
| --nut-address-icon-color                         | var(--nut-primary-color)                                                      |
| --nut-address-header-title-font-size             | 18px                                                                          |
| --nut-address-header-title-color                 | #262626                                                                       |
| --nut-address-region-tab-font-size               | 13px                                                                          |
| --nut-address-region-tab-color                   | #1d1e1e                                                                       |
| --nut-address-region-tab-active-item-font-weight | bold                                                                          |
| --nut-address-region-tab-line-border-radius      | 0                                                                             |
| --nut-address-region-tab-line-opacity            | 1                                                                             |
| --nut-address-region-item-color                  | #333                                                                          |
| --nut-address-region-item-font-size              | var(--nut-font-size-1)                                                        |
| --nut-address-item-margin-right                  | 9px                                                                           |
