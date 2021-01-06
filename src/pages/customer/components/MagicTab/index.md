# MagicTab - 卡片风格 tab(秦传龙)

<code src="./demo.tsx" />

# Api MagicTabProps 参数说明

| 参数         | 说明                        | 类型                 | 默认值 | 是否必填 |
| ------------ | --------------------------- | -------------------- | ------ | -------- |
| initiazePage | 初始切换到 tab 页面         | number               | 0      | 否       |
| data         | tab 数据，暂时最多支持 2 个 | MagicTabDataProps[]  | -      | 是       |
| onTabClick   | tab 切换点击事件            | (e: number) => void; | -      | 否       |

# MagicTabDataProps 参数说明

| 参数  | 说明       | 类型   | 默认值 | 是否必填 |
| ----- | ---------- | ------ | ------ | -------- |
| title | 显示的文字 | string | -      | 是       |
| key   | 唯一标识符 | string | -      | 是       |
