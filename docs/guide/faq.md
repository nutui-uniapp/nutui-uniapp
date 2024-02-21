# 常见问题

这里列举了一些已知问题和暂时的解决方案

::: details 支持的平台
目前只有微信小程序与 H5是经过我们测试的，支付宝小程序目前存在一些问题，其他小程序平台后续也会逐步适配
:::

::: details 使用hbx创建的项目，无法正常使用 popup等组件
当一个组件依赖组件库中另一个组件时，hbuilderx编译组件时会生成错误的文件，例如 popup组件依赖overlay组件，所以你需要同时使用overlay 组件，即可正常使用popup组件。
我们强烈建议使用 vite cli创建项目，不会有这些问题，还可以使用[uni-helper](https://github.com/uni-helper)团队带来的一系列优秀的库和 vite 生态中的部分插件，你可以通过[官方cli](https://uniapp.dcloud.net.cn/quickstart-cli.html)或是[create-uni](https://github.com/uni-helper/create-uni)创建项目，如果你需要一个功能丰富的起始模板，可以使用我的[uniapp-template](https://github.com/yang1206/uniapp-template)
:::

::: details 无法自定义组件的class和 style
默认情况下，uniapp在小程序环境组件的 class 和 style 不会被成功编译，如果你想自定义某些组件的 class 或 style，请传递props customClass和customStyle

另外，也可以在manifest.json的mp-weixin字段下添加 `"mergeVirtualHostAttributes": true` 配置，用于合并组件虚拟节点外层属性，之后大部分单根节点的组件即可支持 class 及 style 属性
:::

::: details cli样式引入无效
请详细参考文档  [快速开始](/guide/quick-start)
:::

::: details 某些组件在小程序有一些问题，仅支持 H5
如 tour等这些在文档中有标注 <Badge type="warning">H5</Badge> 的组件，代表仅支持 H5
:::

::: details 为什么使用某些插槽需要传递一个 props 属性，如`calendar`组件的footer 插槽
由于 uni-app混乱的插槽机制，导致在微信小程序平台中某些具有默认内容的具名插槽无法正常使用，因此只能增加一个属性判断是否使用该插槽，具体可以查看这个 [issue](https://github.com/dcloudio/uni-app/issues/4229#issuecomment-1612487232)
:::
