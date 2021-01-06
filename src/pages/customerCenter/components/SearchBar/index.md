# API

`antd-mobile` 上的字段都可在业务组件 `SearchBar` 上使用

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
| --- | --- | --- | --- | --- |
| type | 浅色和深色的类型标签 | `'light' | 'dark'` | light | 否 |
| placeholder | placeholder | string | '' | 否 |
| cancelText | 右侧的文字 | string | 取消 | 否 |
| defaultValue | 初次进入页面的搜索框默认值 | string | '' | 是 |
| onOk | 确认搜索事件 | `(e: string) => void` |  | 否 |
| data | 左侧 filter 类型数据源 | `any[]` |  | 否 |
| filterValue | filter 选中值 | `string | number` |  | 否 |
| alias | data 的别名 | `{label: string, value: string }` | `{label: 'label', value: 'value' }` | 否 |
| filterChange | filter 选择改变事件 | `(e: string | number) => void` |  | 否 |
