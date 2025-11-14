import { defineConfig, presetAttributify } from 'unocss'

const designWidth = 1920 // 设计稿宽度

// 将 px 转换为 vw
const px2vw = (px: string) => {
  const num = parseFloat(px)
  if (isNaN(num)) return px
  return `${(num / designWidth) * 100}vw`
}

export default defineConfig({
  presets: [
    presetAttributify(), // 支持属性语法
  ],
  rules: [
    // margin
    [/^m-([\d.]+)$/, ([_, num]) => ({ margin: px2vw(num) })],
    [/^p-([\d.]+)$/, ([_, num]) => ({ padding: px2vw(num) })],

    // gap
    [/^gap-([\d.]+)$/, ([_, num]) => ({ gap: px2vw(num) })],
    [/^gap-x-([\d.]+)$/, ([_, num]) => ({ columnGap: px2vw(num) })],
    [/^gap-y-([\d.]+)$/, ([_, num]) => ({ rowGap: px2vw(num) })],

    // flex display
    ['flex', { display: 'flex' }],

    // flex direction
    ['flex-row', { 'flex-direction': 'row' }],
    ['flex-col', { 'flex-direction': 'column' }],

    // justify-content
    ['justify-start', { 'justify-content': 'flex-start' }],
    ['justify-center', { 'justify-content': 'center' }],
    ['justify-end', { 'justify-content': 'flex-end' }],
    ['justify-between', { 'justify-content': 'space-between' }],
    ['justify-around', { 'justify-content': 'space-around' }],
    ['justify-evenly', { 'justify-content': 'space-evenly' }],

    // align-items
    ['items-start', { 'align-items': 'flex-start' }],
    ['items-center', { 'align-items': 'center' }],
    ['items-end', { 'align-items': 'flex-end' }],
    ['items-stretch', { 'align-items': 'stretch' }],
    ['items-baseline', { 'align-items': 'baseline' }],

    // flex-wrap
    ['flex-wrap', { 'flex-wrap': 'wrap' }],
    ['flex-nowrap', { 'flex-wrap': 'nowrap' }],
    ['flex-wrap-reverse', { 'flex-wrap': 'wrap-reverse' }],

    // flex grow/shrink
    [/^flex-(\d+)$/, ([_, n]) => ({ flex: n })],

    // center
    [
      'flex-center',
      {
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
      },
    ],
  ],
})
