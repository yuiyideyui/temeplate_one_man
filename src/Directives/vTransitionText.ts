import {
  type DirectiveBinding,
  watchEffect,
  ref,
  computed,
  type Ref,
  type VNode,
} from 'vue'
import { useTransition, TransitionPresets } from '@vueuse/core'

type TransitionCurve = keyof typeof TransitionPresets

interface TransitionOptions {
  value: number
  duration?: number
  transition?: TransitionCurve
  format?: boolean // 是否千分位格式化
}

interface ElWithTransition extends HTMLElement {
  __transitionNumber__?: {
    source: Ref<number>
    stop: () => void
  }
}

function formatNumber(
  num: number,
  decimals: number,
  useFormat: boolean,
): string {
  return useFormat
    ? num.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : num.toFixed(decimals)
}

function setupTransition(el: ElWithTransition, options: TransitionOptions) {
  const {
    value,
    duration = 1000,
    transition = 'easeInOutCubic',
    format = false,
  } = options

  if (typeof value !== 'number') {
    el.textContent = ''
    return
  }

  const source = ref(value)

  const animated = useTransition(source, {
    duration,
    transition: TransitionPresets[transition],
  })

  const decimalPlaces = computed(() => {
    const str = value.toString()
    const dotIndex = str.indexOf('.')
    return dotIndex === -1 ? 0 : str.length - dotIndex - 1
  })

  const stop = watchEffect(() => {
    el.textContent = formatNumber(animated.value, decimalPlaces.value, format)
  })

  el.__transitionNumber__ = { source, stop }
}

export default {
  mounted(
    el: ElWithTransition,
    binding: DirectiveBinding<TransitionOptions>,
    vnode: VNode,
  ) {
    if (
      typeof binding.value === 'object' &&
      typeof binding.value.value === 'number'
    ) {
      setupTransition(el, binding.value)
    } else {
      el.textContent = ''
    }
  },

  updated(
    el: ElWithTransition,
    binding: DirectiveBinding<TransitionOptions>,
    vnode: VNode,
  ) {
    const opts = binding.value
    if (typeof opts === 'object' && typeof opts.value === 'number') {
      if (el.__transitionNumber__) {
        el.__transitionNumber__.source.value = opts.value
      } else {
        setupTransition(el, opts)
      }
    } else {
      el.textContent = ''
    }
  },

  unmounted(el: ElWithTransition) {
    el.__transitionNumber__?.stop()
    delete el.__transitionNumber__
  },
}
