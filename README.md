# node 版本

20.3.0

# 一、注意

创建plane时候

views/planeCom/（plane名称）/（plane名称）(Left/Right/Center).left 规范写法会自动动态导入到 compoments/plane 上的plane组件中
面板操作案例

```js
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
```
