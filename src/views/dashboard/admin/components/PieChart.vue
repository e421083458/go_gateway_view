<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    chartData: {
      type: Object,
      default: function() {
        return {
          'legend': ['HTTP', 'TCP', 'GRPC'],
          'data': [
            { value: 320, name: 'HTTP' },
            { value: 240, name: 'TCP' },
            { value: 149, name: 'GRPC' }
          ]
        }
      }
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
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
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ legend, data } = {}) {
      this.chart.setOption({
        title: {
          text: '服务类型占比',
          textStyle: {
            fontSize: 15
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: legend
        },
        series: [
          {
            name: '服务类型占比',
            type: 'pie',
            roseType: 'angle',
            radius: '55%',
            center: ['50%', '43%'],
            data: data,
            labelLine: {
              lineStyle: {
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            }
          }
        ]
      })
    }
  }
}
</script>
