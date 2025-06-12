<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, watch, onBeforeUnmount, nextTick } from 'vue'
import { type EChartsOption } from 'echarts'
const emits = defineEmits(['clickEcharts', 'clickXAxisCategory'])
interface Props {
  option: EChartsOption
}

const props = defineProps<Props>()

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null

const initChart = () => {
  if (!chartRef.value) return
  chartInstance = echarts.init(chartRef.value)
  chartInstance.clear()
  chartInstance.setOption(props.option)
  chartInstance.on('click', params => {
    emits('clickEcharts', params)
  })
  chartInstance.on('click', 'xAxis.category', function (params) {
    //点击X轴标签
    emits('clickXAxisCategory', params.value)
  })
}

const resizeChart = () => {
  chartInstance?.resize()
}

onMounted(() => {
  nextTick(() => {
    initChart()
    window.addEventListener('resize', resizeChart)
  })
})

watch(
  () => props.option,
  newOption => {
    if (chartInstance) {
      chartInstance.clear()
      chartInstance.setOption(newOption, false)
    }
  },
  { deep: true },
)

onBeforeUnmount(() => {
  chartInstance?.dispose()
  window.removeEventListener('resize', resizeChart)
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
