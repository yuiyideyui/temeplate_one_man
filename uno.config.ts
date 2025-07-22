import { defineConfig, presetAttributify } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(), // 支持属性语法
  ],
  rules: [
    // margin
    [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    [/^p-([\.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
    // gap
    [/^gap-([\d.]+)$/, ([_, num]) => ({ gap: `${num}px` })],
    [/^gap-x-([\d.]+)$/, ([_, num]) => ({ columnGap: `${num}px` })],
    [/^gap-y-([\d.]+)$/, ([_, num]) => ({ rowGap: `${num}px` })],

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
