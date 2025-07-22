# Demo

# vJsxDom

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

# vvTransitionText

```vue
<template>
  <span
    class="ccc"
    m-18
    v-transition-text="{ value: yuiss, format: true }"
  ></span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const yuiss = ref(0)
setInterval(() => {
  yuiss.value += 1000
}, 1000)
</script>
<style scoped></style>
```

## vJsxTable

[在customTable.md](../components/customTable/customTable.md)
