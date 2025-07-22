# node 版本

20.3.0

## 一、注意

创建plane时候

views/planeCom/（plane名称）/（plane名称）(Left/Right/Center).left 规范写法会自动动态导入到 compoments/plane 上的plane组件中
面板操作案例

```vue
<script setup>
//面板前进
import { usePlaneStore } from '@/stores/planeStore'
const testChangePlane = () => {
  if (planeStore.planeMsg.nowPlane.left == 'test') {
    planeStore.changeNowPlane({
      left: 'home',
      right: 'home',
      center: 'home',
    })
  } else {
    planeStore.changeNowPlane({
      left: 'test',
      right: 'test',
    })
  }
}
//面板回退
const backPlane = () => {
  planeStore.backPlane()
}
</script>
```

## 自定义jsxDom

```vue
<template>
  <div v-jsx-dom="[formattedContent]"></div>
</template>
<script setup lang="tsx">
import { render } from 'vue'
const formattedContent = (el: Element, binding: IbindingDom, Vnode: any) => {
  render(
    <div style="width: 100%; height: 100%; background: #000; color: #fff; display: flex; justify-content: center; align-items: center;">
      Hello World
    </div>,
    el,
  )
}
</script>
```

## 自定义表单dom

在customTable.md

## useQueryApi使用

### 需要缓存的请求->缓存时间为staleTime 5分钟

```vue
<template>
  <div></div>
</template>

<script setup lang="ts">
import { getSubDeviceList } from '@/api/test'
import { useQueryApiStore } from '@/stores/useQueryApi'
const queryApiStore = useQueryApiStore()
const { isPending, isError, data, error } = queryApiStore.useTodos(
  'getSubDeviceList',
  getSubDeviceList,
  {
    limit: 1,
  },
)
</script>

<style scoped></style>
```
