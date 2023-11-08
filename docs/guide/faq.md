# 常见问题

这里列举了一些已知问题和暂时的解决方案

::: details 使用hbx创建的项目，无法正常使用 popup组件
临时的解决方案是同时在模板中引入 overlay组件，即可正常使用popup组件。
建议使用 vite cli创建项目，不会有这些奇怪的问题
:::

::: details 无法自定义组件的class和 style
uniapp在小程序环境组件的 class 和 style 不会被成功编译，如果你想自定义某些组件的 class 或 style，请传递props customClass和customStyle，目前不是每个组件都支持，后续会考虑支持到每个组件
:::

::: details cli样式引入无效
请详细参考文档  [快速开始](/guide/quick-start)
:::

::: details 某些组件在小程序有一些问题，仅支持 H5
如 tour,signature等这些在文档中有标注 <Badge type="warning">H5</Badge> 的组件，代表仅支持 H5
:::

::: details 为什么使用某些插槽需要传递一个 props 属性，如`calendar`组件的footer 插槽
由于 uni-app混乱的插槽机制，导致在微信小程序平台中某些具有默认内容的具名插槽无法正常使用，因此只能增加一个属性判断是否使用该插槽，具体可以查看这个 [issue](https://github.com/dcloudio/uni-app/issues/4229#issuecomment-1612487232)
:::
