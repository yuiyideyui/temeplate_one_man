// directives/transitionText.ts
import { TransitionPresets, useTransition } from '@vueuse/core'
import { watchEffect, computed, type DirectiveBinding, ref, type Ref } from 'vue'

interface ElWithTransition extends HTMLElement {
  __transitionText__?: {
    source: Ref<number>
    decimalPlaces: Ref<number>
    animated: Ref<number>
    stop: () => void
  }
}

export default {
  mounted(el: ElWithTransition, binding: DirectiveBinding<number>) {
    setupTransition(el, binding.value)
  },

  updated(el: ElWithTransition, binding: DirectiveBinding<number>) {
    if (typeof binding.value === 'number' && el.__transitionText__) {
      el.__transitionText__.source.value = binding.value
    } else {
      el.textContent = ''
    }
  },

  unmounted(el: ElWithTransition) {
    // 清理副作用
    el.__transitionText__?.stop()
    delete el.__transitionText__
  },
}

function setupTransition(el: ElWithTransition, value: number) {
  if (typeof value !== 'number') {
    el.textContent = ''
    return
  }

  const source = ref(value)
  const animated = useTransition(source, {
    duration: 1000,
    transition: TransitionPresets.easeInOutCubic,
  })

  const decimalPlaces = computed(() => {
    const str = value.toString()
    const dotIndex = str.indexOf('.')
    return dotIndex === -1 ? 0 : str.length - dotIndex - 1
  })

  const stop = watchEffect(() => {
    el.textContent = animated.value.toFixed(decimalPlaces.value)
  })

  el.__transitionText__ = {
    source,
    animated,
    decimalPlaces,
    stop,
  }
}
