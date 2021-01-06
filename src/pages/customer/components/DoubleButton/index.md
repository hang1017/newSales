# DoubleButton 多按钮-陈书航

`antd-mobile` 上的字段都可在业务组件 `DoubleButton` 上的 `leftButton` 和 `rightButton` 上 使用

<code src="./demo.tsx" />

## API

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
| --- | --- | --- | --- | --- |
| leftButton | 左侧按钮内容 | IButtonProps | {} | 是 |
| rightButton | 右侧按钮内容 | IButtonProps | {} | 是 |
| fixed | 是否吸底 | boolean | false | 否 |
| footContent | 按钮底部样式 | `string` or `node` | '' | 否 |
| headContent | 按钮顶部样式 | `string` or `node` | '' | 否 |
| errorMessage | 若未勾选时的错误提示信息 | string | '' | 否 |
| initCheck | 初始化勾选值 | boolean | false | 否 |
| hasCheck | 当存在 `headContent` 时是否存在确认勾选框 | boolean | true | 否 |

## IButtonProps

| 参数    | 说明     | 类型    | 默认值 | 是否必填 |
| ------- | -------- | ------- | ------ | -------- |
| content | 按钮内容 | `string | node`  |          | 是 |
