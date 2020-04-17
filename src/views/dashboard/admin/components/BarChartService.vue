<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'infographic')
      this.chart.setOption({
        title: {
          text: '中国苹果汁出口贸易数据'
        },
        dataset: {
          source: [
            ['score', 'amount', 'product'],
            [89.3, 58212, 'Matcha Latte'],
            [57.1, 78254, 'Milk Tea'],
            [74.4, 41032, 'Cheese Cocoa'],
            [50.1, 12755, 'Cheese Brownie'],
            [89.7, 20145, 'Matcha Cocoa'],
            [68.1, 79146, 'Tea'],
            [19.6, 91852, 'Orange Juice'],
            [10.6, 101852, 'Lemon Juice'],
            [32.7, 20112, 'Walnut Brownie']
          ]
        },
        grid: { containLabel: true },
        xAxis: { name: 'amount', splitLine: { show: false }, axisLine: { show: false }, axisTick: { show: false }, axisLabel: { show: false }},
        yAxis: { type: 'category', axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            margin: 10,
            textStyle: {
              color: '#999',
              fontSize: 16
            }
          }},
        series: [
          {
            type: 'pictorialBar',
            symbol: 'rect',
            itemStyle: {
              normal: {
                color: '#007eb1'
              }
            },
            encode: {
              // Map the "amount" column to X axis.
              x: 'amount',
              // Map the "product" column to Y axis
              y: 'product'
            },
            z: 10

          },
          {
            // full data
            type: 'pictorialBar',
            itemStyle: {
              normal: {
                color: '#7dbad2',
                opacity: 0.2
              }
            },
            symbol: 'rect',
            symbolBoundingData: 200000,
            encode: {
              // Map the "amount" column to X axis.
              x: 'amount',
              // Map the "product" column to Y axis
              y: 'product'
            },
            z: 5
          }
        ]
      })
    }
  }
}
</script>
