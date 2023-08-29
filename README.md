# react-multipage-cli

#### 介绍

基于 webpack + ts + node 搭建的 react 多页面脚手架

#### 安装教程

1. yarn add react-mutatipage-cli | npm install react-mutatipage-cli -g
2. create-react-mutatipage-cli
3. yarn | npm install
4. yarn start | yarn build

#### 使用说明

- 新增页面

在`/src/pages/` 下新增 index.tsx文件与App.tsx组件

```tsx
// index.tsx
import * as React from "react"

import renderMain from "@/main"
import App from "./App"

renderMain(<App />)

//  App .tsx
import React from "react"

export default () => {
  return <div>App demo page</div>
}
```
