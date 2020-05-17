<template>
  <div class="chart-container">
    <chart height="100%" width="100%" :data="chartData" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/LineStat'
import { serviceStat, serviceDetail } from '@/api/service'

export default {
  name: 'ServiceStat',
  components: { Chart },
  data() {
    return {
      chartData: {
        'title': '',
        'today': [],
        'yesterday': []
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.fetchStat(id)
  },
  methods: {
    fetchStat(id) {
      const query = { 'id': id }
      serviceStat(query).then(response1 => {
        serviceDetail(query).then(response2 => {
          this.chartData = {
            'title': response2.data.info.service_name + '服务统计',
            'today': response1.data.today,
            'yesterday': response1.data.yesterday
          }
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
